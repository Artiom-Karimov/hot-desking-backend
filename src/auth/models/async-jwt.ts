import { Algorithm, sign, verify } from 'jsonwebtoken';
import { UserRole } from 'src/users/dto';

const ALGORITHM: Algorithm = 'HS256';

export type JWTData = {
  /** @description User ID */
  sub: string;

  /** @description Issued at */
  iat: number;

  /** @description Expires at */
  exp: number;

  /** @description User Role */
  role: UserRole;
};

export class AsyncJWT {
  constructor(private readonly secret: string) {}

  public async sign(data: JWTData): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(data, this.secret, { algorithm: ALGORITHM }, (error, encoded) => {
        if (error) return reject(error);
        if (!encoded) {
          return reject(
            new Error('Cannot sign JWT. Got undefined instead of token.'),
          );
        }

        return resolve(encoded);
      });
    });
  }

  public async verify(token: string): Promise<JWTData> {
    return new Promise((resolve, reject) => {
      verify(
        token,
        this.secret,
        { algorithms: [ALGORITHM] },
        (error, decoded) => {
          if (error) return reject(error);
          if (!decoded) {
            return reject(
              new Error('Cannot verify JWT. Got undefined instead of payload.'),
            );
          }

          if (!this.checkPayload(decoded)) {
            return reject(
              new Error('Cannot verify JWT. Got unknown payload format.'),
            );
          }

          return resolve(decoded);
        },
      );
    });
  }

  private checkPayload(decoded: unknown): decoded is JWTData {
    const data = decoded as JWTData;
    return Boolean(
      data &&
        typeof data === 'object' &&
        typeof data.exp === 'number' &&
        typeof data.iat === 'number' &&
        typeof data.role === 'string' &&
        typeof data.sub === 'string',
    );
  }
}
