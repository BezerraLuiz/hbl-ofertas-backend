import { server } from "..";

export function generateToken(payload: object) {
    return server.jwt.sign(payload);
}
