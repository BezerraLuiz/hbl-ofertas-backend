import { server } from "../public";

export function generateToken(payload: object) {
    return server.jwt.sign(payload);
}
