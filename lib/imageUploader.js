/* ACTIONS FOR UPLOADING IMAGES */

// Currently Local, eventually s3.

function uploadImage(params) {
  console.log(`Received response from Nicolas Cage S3!`)
  return "http://overmental.com/wp-content/uploads/2015/03/nic-cage-face.png"
}

module.exports = uploadImage
