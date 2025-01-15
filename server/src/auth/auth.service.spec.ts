import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
// IMPORTANT: Default import of bcrypt
import bcrypt from 'bcrypt';

// ---------------------
// 1) Mock the entire 'bcrypt' module.
//    Because we do "import bcrypt from 'bcrypt';", we must provide a `default` property.
// ---------------------
vi.mock('bcrypt', () => {
  return {
    default: {
      // We'll mock whichever bcrypt functions we need:
      compareSync: vi.fn(),
      hashSync: vi.fn(),
    },
  };
});

// ---------------------
// 2) Mock other dependencies used in AuthService
// ---------------------
const mockPrismaService = {
  user: {
    findUnique: vi.fn(),
  },
};

const mockJwtService = {
  sign: vi.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    // Reset all mocked methods before each test so calls don't accumulate
    mockPrismaService.user.findUnique.mockReset();
    mockJwtService.sign.mockReset();

    // Because we've mocked bcrypt as "default", we refer to bcrypt.compareSync, etc.
    (bcrypt.compareSync as vi.Mock).mockReset();
    (bcrypt.hashSync as vi.Mock).mockReset();

    // Instantiate AuthService with our mocked services
    authService = new AuthService(
      mockPrismaService as unknown as PrismaService,
      mockJwtService as unknown as JwtService,
    );
  });

  describe('validateUser', () => {
    it('should return user if email and password are correct', async () => {
      // 1. Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword', // what we store in DB
        name: 'Test User',
      };
      // Prisma returns this mockUser
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      // bcrypt.compareSync returns true, simulating correct password
      (bcrypt.compareSync as vi.Mock).mockReturnValue(true);

      // 2. Act
      const result = await authService.validateUser('test@example.com', 'password123');

      // 3. Assert
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.compareSync).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await authService.validateUser('notfound@example.com', 'password123');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const mockUser = {
        id: 2,
        email: 'test2@example.com',
        password: 'someHash',
        name: 'Another User',
      };
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compareSync as vi.Mock).mockReturnValue(false); // wrong password

      const result = await authService.validateUser('test2@example.com', 'wrongPassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access_token if user is provided', () => {
      // 1. Arrange
      const mockUser = {
        id: 3,
        email: 'jwt@example.com',
        password: 'hashedPassword',
        name: 'JWT User',
      };
      mockJwtService.sign.mockReturnValue('fake-jwt-token');

      // 2. Act
      const result = authService.login(mockUser);

      // 3. Assert
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: 'jwt@example.com',
        sub: 3,
        name: 'JWT User',
      });
      expect(result).toEqual({ access_token: 'fake-jwt-token' });
    });
  });
});
