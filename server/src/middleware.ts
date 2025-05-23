import { NextFunction, Request, Response } from "express";
import prisma from "./client";
import { decodeToken } from "./lib/pass";

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  console.log("token",token)
  if (!token) {
     res.status(401).send({
      message: "Unauthorized Access, Please login to continue",
      status: "failed",
    });
    return;
  }
  try {
    const { username } = decodeToken(token);
    console.log(decodeToken(token))
    const userExists = await prisma.user.findFirst({
      where: { username }
    });
    if (userExists) {
        res.status(402).send({
        message: "Unauthorized Access, Please login to continue",
        status: "failed",
      });
      return;
    }
    res.locals.user = userExists;
    next();
  } catch (error) {
      res.status(403).send({
      message: "Unauthorized Access, Please login to continue",
      status: "failed",
    });
    return;
  }
}