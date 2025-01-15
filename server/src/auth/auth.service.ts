// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isMatch = bcrypt.compareSync(pass, user.password);
        if (!isMatch) return null;

        return user;
    }

    login(user: any) {
        // Typically you might define a payload with 'sub' = user.id
        const payload = { email: user.email, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
