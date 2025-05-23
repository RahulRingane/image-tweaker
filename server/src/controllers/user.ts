import { Request, Response } from "express";
import prisma from "../client";
import { UserCreateSchema, UserLoginSchema } from "../schema/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getToken } from "../lib/pass";

export async function handleSignupUser(req: Request, resp: Response) {
  const user = UserCreateSchema.safeParse(req.body);

  if (!user.success) {
     resp.status(400).send(user.error.errors);
     return;
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        username: user.data.username,
        email: user.data.email,
        password: user.data.password,
      },
    });
    resp.status(200).send(newUser);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
         resp.status(400).send({
          message: `Signup failed, user with this ${(
            e?.meta?.target as []
          ).join(",")} already exists`,
          status: "failed",
        });
        return;
      }
    }
    resp.status(500).send({
      message: "Internal Server Error",
      status: "failed",
    });
  }
}

export async function handleLoginUser(req: Request, resp: Response) {
  const user = UserLoginSchema.safeParse(req.body);

  if (!user.success) {
     resp.status(400).send(user.error.errors);
     return;
  }

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        username: user.data.username,
        password: user.data.password,
      },
    });
    if (!foundUser) {
       resp.status(404).send({
        message: "User not found",
        status: "failed",
      });
      return;
    }
    resp.cookie("token", getToken(foundUser.username, foundUser.password));
    resp.status(200).send({
      message: "Successfully logged in",
      status: "success",
    });
  } catch (e) {
     resp.status(500).send({
      message: "Internal Server Error",
      status: "failed",
    });
    return;
  }
}