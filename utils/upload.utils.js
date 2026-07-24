const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg",
    folder: "Movie_Ticket",
  });

  return result;
}

async function deleteFile(fileId) {
  await imagekit.files.delete(fileId);
}

module.exports = {
  uploadFile,
  deleteFile,
};
