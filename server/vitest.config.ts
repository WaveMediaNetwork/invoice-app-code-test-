import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
        },
        include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    },
});
