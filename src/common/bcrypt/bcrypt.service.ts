import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export class AuthService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  generatePassword(length = 12): string {
    return randomBytes(length).toString('base64').slice(0, length);
  }
}
