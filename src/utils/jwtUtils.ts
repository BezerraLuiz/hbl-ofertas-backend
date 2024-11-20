import { server } from "../app.js";

export function generateToken(payload: object) {
    return server.jwt.sign(payload);
}
