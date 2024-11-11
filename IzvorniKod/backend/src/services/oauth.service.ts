// src/services/authService.ts
import { AppUser } from '../models/appuser.model';

export const findOrCreateUser = async (email: string, name: string, oauthProvider: string, oauthId: string) => {
  let user = await AppUser.findOne({ where: { email } });
  if (!user) {
    user = await AppUser.create({ email, name, oauthProvider, oauthId });
  }
  return user;
};