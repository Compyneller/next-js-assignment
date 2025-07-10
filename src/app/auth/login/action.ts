'use server'

import {z} from 'zod'

const mockUser = {
    id : 1,
    email : "mock@user.com",
    password : "12345"
}

  const loginSchema = z.object({
    email: z
      .string()
      .email({
        message: "Invalid email address",
      })
      .trim(),
    password: z
      .string()
      .min(3, {
        message: "Password must be at least 3 characters long",
      })
      .trim(),
  });


  export async function login(prevState : any , fromData : FormData) {
    'use server'
    const formData = Object.fromEntries(fromData.entries());
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      return {error: result.error.errors[0].message};
    }

    const {email, password} = result.data;

    // Simulate a login check
    if (email !== mockUser.email || password !== mockUser.password) {
      return {error: "Invalid email or password"};
    }

    // Simulate successful login
    return {success: true, user: mockUser};
  }

export async function logoutAction() {
  'use server'
  // Simulate logout action
  return {success: true, message: "Logged out successfully"};
}

