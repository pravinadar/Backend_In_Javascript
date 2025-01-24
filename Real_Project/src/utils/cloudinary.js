import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {  // "localFilePath" is a variable expected
            resource_type: "auto"
        })

        // console.log(`file is uploaded to cloudinary ${response.url}`)
        // console.log(`file is uploaded to cloudinary: ${JSON.stringify(response, null, 2)}`)

        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {

        // Attempt to remove the temporary file
        try {
            fs.unlinkSync(localFilePath);   // to remove the locally saved temporary file as the upload got failed
            console.log(`Temporary file ${localFilePath} removed after upload failure.`);
        } catch (unlinkError) {
            console.error(`Failed to remove temporary file ${localFilePath}:`, unlinkError.message);
        }

        return null

    }

}

export {uploadOnCloudinary}