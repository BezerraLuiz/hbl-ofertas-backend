import { server } from '../Server';

export function generateToken(payload: object) {
  return server.jwt.sign(payload);
}