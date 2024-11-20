import { FastifyInstance } from 'fastify';
import { uploadImageHandler } from '../controllers/imageController.js';

export default async function imageRoutes(server: FastifyInstance) {
  server.post('/upload-image', uploadImageHandler);
};
