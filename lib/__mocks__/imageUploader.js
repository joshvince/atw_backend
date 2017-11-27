/* MOCK ACTIONS FOR UPLOADING IMAGES */

async function createPresignedUrl(filename, filetype) {
  return await {
    signedRequest: "yes",
    url: "url"
  }
}

module.exports = {
  createPresignedUrl: createPresignedUrl
}