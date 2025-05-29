import { RequestHandler } from 'express';
import {
  setTokenCookie,
  clearTokenCookie,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../utils/generateToken';
import { AuthService } from '../services/user.service';
import { IUser, User } from '../models/user.model';
import { handleError } from '../utils/handleError';
import { BaseController } from './base.controller';
import { Model } from 'mongoose';
export class UserController extends BaseController<IUser> {
  private authService = new AuthService(User);
  constructor(private userModel: Model<IUser>) {
    super(userModel);
  }
  /* -------- Local login -------- */
  login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
      const { user, accessToken, refreshToken } = await this.authService.login(
        email,
        password,
      );
      setTokenCookie(res, accessToken);
      setRefreshTokenCookie(res, refreshToken);
      res.json({ success: true, token: accessToken, user });
    } catch (err) {
      handleError(res, err);
    }
  };

  /* -------- Local register -------- */
  register: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const { user, accessToken, refreshToken } =
        await this.authService.register(name, email, password);
      setTokenCookie(res, accessToken);
      setRefreshTokenCookie(res, refreshToken);
      res.json({ success: true, token: accessToken, user });
    } catch (err) {
      handleError(res, err);
    }
  };

  /* -------- Google login -------- */
  googleLogin: RequestHandler = async (req, res) => {
    const { credential   } = req.body; // <-- frontend gửi { idToken }
    try {
      const { user, accessToken, refreshToken } =
        await this.authService.loginWithGoogle(credential);
      setTokenCookie(res, accessToken);
      setRefreshTokenCookie(res, refreshToken);
      res.json({ success: true, token: accessToken, user });
    } catch (err) {
      handleError(res, err);
    }
  };

  /* -------- Logout -------- */
  logout: RequestHandler = async (req, res) => {
    const { email } = req.body;
    try {
      await this.authService.logout(email);
      clearTokenCookie(res);
      clearRefreshTokenCookie(res);
      res.json({ success: true, message: 'Đăng xuất thành công.' });
    } catch (err) {
      handleError(res, err);
    }
  };

  /* -------- Refresh token -------- */
  refreshToken: RequestHandler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
      const { user, accessToken, refreshToken: newRefresh } =
        await this.authService.refresh(refreshToken);
      setTokenCookie(res, accessToken);
      res.json({ success: true, token: accessToken, user });
    } catch (err) {
      handleError(res, err);
    }
  };

}
