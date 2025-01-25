import { v2 as cloudinary } from "cloudinary"

const cloudinaryConnect = () => {
    // Configuration
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_CLOUD_KEY,
            api_secret: process.env.CLOUDINARY_CLOUD_SECRET
        });
    }
    catch (err) {
        console.log(err)
    }
}

export default cloudinaryConnect;
