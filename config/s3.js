import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
})

export const getFileContent = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader(file);
    reader.onload = async (e) => {
      resolve(e.target.result);
    }
    
    reader.readAsBinaryString(file);
  })
}

export const uploadToBucket = ({ filename, fileContent, type }) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: filename,
    Body: Buffer.from(fileContent, 'binary'),
    ContentType: type
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data.Location)
    })
  })
}
