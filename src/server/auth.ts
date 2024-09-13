import { registerValidator } from '@/lib/validators/credentials';
import { hashSync } from 'bcrypt-ts-edge';
import db from '@/db/drizzle';
import { users } from '@/db/schema/auth';
import { AuthUsers } from '@/lib/validators/auth';
import { eq } from 'drizzle-orm';

export async function register(values: AuthUsers) {
  const parsedValues = registerValidator.safeParse(values);

  if (!parsedValues.success) {
    return { success: false, error: 'Invalid Fields', statusCode: 400 };
  }

  const { name, email, password } = parsedValues.data;

  try {
    const isEmailExist = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (isEmailExist)
      return {
        message: 'Email Exist',
      };

    const hashedPassword = hashSync(password, 12);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Internal Server Error', statusCode: 500 };
  }
}
