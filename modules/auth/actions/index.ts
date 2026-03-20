"use server";

import {auth} from "@/auth";
import { db } from  "@/lib/db";



 // Get user by ID
// Used when we already know the user's id

export const getUserById = async (id: string) => {
  try {

    // Query database for a user with this id
    const user = await db.user.findUnique({
      where: { id },

      // Also fetch OAuth accounts linked to the user
      include: {
        accounts: true
      }
    });

    return user;

  } catch (error) {
    console.log(error);
    return null;
  }
};



/**
 * Get OAuth account linked to a user
 */
export const getAccountByUserId = async (userId: string) => {
  try {

    const account = await db.account.findFirst({
      where: {
        userId
      }
    });

    return account;

  } catch (error) {
    console.log(error);
    return null;
  }
};



/**
 * Get currently logged-in user from session
 */
export const currentUser = async () => {

  // Get session from NextAuth
  const session = await auth();

  // session?.user ensures safe access
  return session?.user;
};