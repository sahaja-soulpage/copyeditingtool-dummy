import S3 from "aws-sdk/clients/s3";

const s3Uploader = async (name, buffer) => {
  const s3 = new S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
  });

  try {
    const params: any = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: "text/html",
      ACL: "public-read",
    };
    await s3.putObject(params).promise();

    const BUCKET_URL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${name}`;
    return BUCKET_URL;
  } catch (err) {
    return err;
  }
};

export default s3Uploader;
