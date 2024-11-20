import buildServer from "../app.js";

const server = buildServer();

export function generateToken(payload: object) {
    return server.jwt.sign(payload);
}
