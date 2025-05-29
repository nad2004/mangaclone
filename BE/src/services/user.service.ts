import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/generateToken';
import { verifyGoogleToken } from '../utils/googleAuth';
import { IUser } from '../models/user.model';

function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
  return (payload as JwtPayload).id !== undefined;
}

export interface AuthResult {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  constructor(private userModel: Model<IUser>) {}

  /* ---------- Local login ---------- */
  async login(email: string, password: string): Promise<AuthResult> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('INVALID_CREDENTIAL');

    // Google-user đăng nhập local?
    if (user.googleId) return this.issueTokens(user);

    const ok = await bcrypt.compare(password, user.password_hash || '');
    if (!ok) throw new Error('INVALID_CREDENTIAL');
    return this.issueTokens(user);
  }

  /* ---------- Local register ---------- */
  async register(name: string, email: string, rawPassword: string): Promise<AuthResult> {
    const existed = await this.userModel.findOne({ email });
    if (existed) throw new Error('EMAIL_EXISTS');

    const hash = await bcrypt.hash(rawPassword, 10);
    const user = await this.userModel.create({
      name,
      email,
      password_hash: hash,
      role: 'user',
    });
    return this.issueTokens(user);
  }

  /* ---------- Google login ---------- */
  async loginWithGoogle(idToken: string): Promise<AuthResult> {
    const payload = await verifyGoogleToken(idToken);
    if (!payload?.email) throw new Error('GOOGLE_VERIFY_FAIL');

    const { email, sub: googleId, name, picture } = payload;
    let user = await this.userModel.findOne({ email });
    if (!user) {
      user = await this.userModel.create({
        email,
        username: name,
        googleId,
        avatar: picture,
        role: 'user',
      });
    }
    return this.issueTokens(user);
  }

  /* ---------- Refresh access-token ---------- */
  async refresh(refreshToken: string): Promise<AuthResult> {
    const payload = verifyToken(refreshToken);
    if (!isJwtPayload(payload)) throw new Error('TOKEN_INVALID');

    const user = await this.userModel.findById(payload.id);
    if (!user || user.refresh_token !== refreshToken) throw new Error('TOKEN_MISMATCH');
    return this.issueTokens(user);
  }

  /* ---------- Logout ---------- */
  async logout(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('INVALID_USER');
    user.refresh_token = '';
    await user.save();
  }

  /* ---------- Helper ---------- */
  private async issueTokens(user: IUser): Promise<AuthResult> {
    // Chỉ lấy dữ liệu thuần để ký JWT
    const plain = user.toObject ? user.toObject() : (user as IUser);
    const payload = {
        id: plain._id,
        email: plain.email,
        role: plain.role,
      };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await user.updateOne({ refresh_token: refreshToken });
    await user.save();
    return { user: plain, accessToken, refreshToken };
  }
}
