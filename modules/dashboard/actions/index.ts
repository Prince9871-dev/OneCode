"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions/index";
import { revalidatePath } from "next/cache";


// ✅ GET ALL PLAYGROUNDS (WITH STAR INFO)
export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const playgrounds = await db.playground.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        StarMark: {
          where: {
            userId: user.id,
          },
          select: {
            isMarked: true,
          },
        },
      },
    });

    return playgrounds;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch playgrounds");
  }
};


// ✅ CREATE
export const createPlaygroundForUser = async (data: {
  title: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  description?: string;
}) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const created = await db.playground.create({
      data: {
        title: data.title,
        description: data.description,
        template: data.template,
        userId: user.id,
      },
      select: { id: true },
    });

    return created;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create playground");
  }
};


// ✅ DELETE
export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: { id },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Playground deleted successfully",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete playground");
  }
};


// ✅ EDIT
export const editProjectById = async (
  id: string,
  data: { title: string; description: string }
) => {
  try {
    await db.playground.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Playground edited successfully",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit playground");
  }
};


// ✅ DUPLICATE
export const duplicateProjectById = async (id: string) => {
  try {
    const original = await db.playground.findUnique({
      where: { id },
    });

    if (!original) {
      throw new Error("Playground not found");
    }

    const duplicated = await db.playground.create({
      data: {
        title: `${original.title} Copy`,
        description: original.description,
        template: original.template,
        userId: original.userId,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Playground duplicated successfully",
      duplicatedPlayground: duplicated,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to duplicate playground");
  }
};



// ⭐ NEW: TOGGLE STAR FUNCTION
export const toggleStarMarked = async (
  playgroundId: string,
  isChecked: boolean
) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User Id is Required");
  }

  try {
    if (isChecked) {
      // ADD ⭐ (or already exists -> update)
      await db.starMark.upsert({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId,
          },
        },
        update: { isMarked: true },
        create: {
          userId,
          playgroundId,
          isMarked: true,
        },
      });
    } else {
      // REMOVE ❌ (safe even if it doesn't exist)
      await db.starMark.delete({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId,
          },
        },
      });
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      isMarked: isChecked,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to toggle star",
    };
  }
};