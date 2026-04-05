import { Request } from 'express';
import { JWTUser } from '../models';

export type RequestWithUser = Request & { user: JWTUser };
