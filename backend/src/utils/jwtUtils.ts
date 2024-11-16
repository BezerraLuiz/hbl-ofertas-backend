import { server } from "../app";

export function generateToken(payload: object) {
    return server.jwt.sign(payload);
}
