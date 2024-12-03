import { MultipartFile } from "@fastify/multipart";
import { google } from "googleapis";

// https://drive.google.com/uc?export=view&id= + Id da imagem salvada para concatenar e ter uma imagem estática

export async function uploadFile(
  nameArchive: string,
  typeArchive: string,
  arquivo: MultipartFile
): Promise<string | null | undefined> {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./google-drive.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveService = google.drive({
      version: "v3",
      auth,
    });

    const fileMetaData = {
      name: nameArchive,
      parents: ['1Tw4PYvrXK91kFxV1_j_BU4OOUj-VLb51'],
    };

    const media = {
      mimeType: typeArchive,
      body: arquivo.file,
    };

    const response = await driveService.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: "id",
    });

    return response.data.id;
  } catch (e) {
    console.error("Upload file error: ", e);
  }
}

export async function deleteFile(id: string): Promise<number | undefined> {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./google-drive.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveService = google.drive({
      version: "v3",
      auth,
    });

    const response = await driveService.files.delete({
      fileId: id,
    });

    return response.status;
  } catch (e) {
    console.error("Upload file error: ", e);
  }
}
