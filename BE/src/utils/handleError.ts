import { Response } from 'express';

const errorCodeMap: Record<string, number> = {
  INVALID_CREDENTIAL: 401,
  EMAIL_EXISTS: 400,
  GOOGLE_VERIFY_FAIL: 401,
  TOKEN_INVALID: 403,
  TOKEN_MISMATCH: 403,
  INVALID_USER: 401,
};

export function handleError(res: Response, err: any) {
  const status = errorCodeMap[err.message] || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Lỗi máy chủ.',
  });
}
