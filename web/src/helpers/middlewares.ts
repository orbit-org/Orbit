import { baas } from "@config/firebase-admin.config";
import express, { NextFunction } from "express";
import admin from 'firebase-admin';
import { validateJWT } from "./jwt";

export const checkIfSessionTokenIsValid = async (req: express.Request, res: express.Response, next: NextFunction) => {
   const authorization = req.headers.authorization
   const jwt = authorization?.split("Bearer ")[1]

   if (jwt) {
      validateJWT(jwt).then((payload) => {
         baas()

         const uid: string = payload.uid as string
         const db = admin.firestore()

         const docRef = db.collection('sessions').doc(uid);

         docRef.get()
            .then(async (snapshot) => {
               if (jwt == snapshot.data()?.token)
                  next()
               else
                  throw new Error('Invalid token')
            })
            .catch((error) => {
               res.json({ success: false, message: error.message }).status(400) //TODO @TacitNeptune redirect to the login page in the frontend
            })
      }).catch((error) => {
         res.json({ success: false, message: error.message }).status(400)
      })
   } else
      res.json({ success: false, message: 'Invalid token' }).status(400)
}

export async function checkIfAccessTokenIsValid(authorization: string): Promise<string> {
   return new Promise(async (resolve, reject) => {
      try {
         baas()
         const jwt = authorization.split("Bearer ")[1]
         const decodedjwt = await admin.auth().verifyIdToken(jwt) //verify token using firebase, it also check if the token is expired
         const uid: string = decodedjwt.uid
         resolve(uid)
      } catch (error) {
         reject(new Error('Invalid token'))
      }
   })
}