import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable-serverless";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FormFields {
  [key: string]: string | string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const form = new formidable.IncomingForm();
  switch (method) {
    case "POST":
      form.parse(req, async (err: Error | null, fields: FormFields, files: { image: { path: string } }) => {
        if (!files.image) {
          return res.status(400).json({ message: "Image is required" });
        }
        if (err) {
          return res.status(500).json({ message: "Error processing the image" });
        }
        try {
          const result = await cloudinary.uploader.upload(files.image.path);
          var image = result.secure_url.replace(/\.(png|jpeg|jpg)$/, ".webp");
          return res.status(200).json(image);
        } catch (error) {
          return res.status(500).json({ error });
        }
      });
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` })
      break;
  }
}
