import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }
  

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = payload; // optional: definisikan di typings/express.d.ts
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
    return;    
  }
};
