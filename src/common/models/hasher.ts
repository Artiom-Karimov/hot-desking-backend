import * as argon2 from 'argon2';

export class Hasher {
  public static hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  public static async verify(hash: string, password: string): Promise<boolean> {
    try {
      return await this.verify(hash, password);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
