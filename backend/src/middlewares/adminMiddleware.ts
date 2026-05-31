import type { Response, NextFunction } from "express";
import type { ExtendRequest } from "../types/ExtendRequest.ts";

export const verifyAdmin = (req: ExtendRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).send("Access Denied: Admin role required");
    }
};
