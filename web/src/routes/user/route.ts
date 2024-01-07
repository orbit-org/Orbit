import { supernova } from "@algorithms/supernova";
import { NextFunction, Request, Response, Router } from "express";

const app: Router = Router();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
   console.log(res.locals.uid);
   console.log(await supernova("Test"))
   res.json({});
});

export default app;
