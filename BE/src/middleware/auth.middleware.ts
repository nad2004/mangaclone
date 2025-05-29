// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // You can replace `any` with a more specific type if you know what `decoded` should be
  }
}
const SECRET_KEY = process.env.JWT_SECRET || '';

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;           // lấy token từ cookie

  if (!token) {
    res.status(403).json({ message: 'Không có token.' });
    return;                                   // ✔️ kết thúc hàm, KHÔNG return Response
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // (mở rộng req.user nếu muốn)
    req.user = decoded as any;
    next();
  } catch {
    res.status(401).json({ message: 'Token không hợp lệ.' });
  }
};
