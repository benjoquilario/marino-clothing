import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from '@/db/drizzle';
import { credentialsValidator } from '@/lib/validators/credentials';
import { eq } from 'drizzle-orm';
import { users } from './db/schema/auth';
import { compareSync } from 'bcrypt-ts-edge';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(credentials) {
        const cred = await credentialsValidator.parseAsync(credentials);
        if (!cred.email || !cred.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, cred.email),
        });

        if (user && user.password) {
          const isPasswordCorrect = compareSync(cred.password, user.password);

          if (isPasswordCorrect) {
            return {
              id: user.id,
              image: user.image,
              email: user.email,
              name: user.name,
            };
          }
        }

        return null;
      },
    }),
  ],
});
