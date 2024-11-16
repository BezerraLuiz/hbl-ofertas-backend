import { FastifyInstance } from 'fastify';
import { uploadImageHandler } from '../controllers/imageController';

export default async function imageRoutes(server: FastifyInstance) {
  server.post('/upload-image', uploadImageHandler);
}
