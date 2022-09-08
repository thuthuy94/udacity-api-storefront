import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "");

    next();
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

export default verifyToken;
