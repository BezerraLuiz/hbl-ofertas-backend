import fs from "fs";
import { google } from "googleapis";

const google_api_folder_id = "1Tw4PYvrXK91kFxV1_j_BU4OOUj-VLb51";

export async function uploadFile(nameArchive, typeArchive, arquivo) {
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
      parents: [google_api_folder_id],
    };

    const media = {
      mimeType: typeArchive,
      body: fs.createReadStream(arquivo),
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

uploadFile().then((fileId) => {
  if (fileId) {
    console.log("File uploaded successfully! File ID:", fileId);
    // https://drive.google.com/uc?export=view&id= + Id da imagem salvada para concatenar e ter uma imagem estática
  } else {
    console.log("Failed to upload file.");
  }
});
