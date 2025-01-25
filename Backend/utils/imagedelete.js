import { v2 as cloudinary } from 'cloudinary'

const imagedelete = async (url, folder) => {
    const publicId = `${folder}` + "/" + url.split("/").pop().split(".")[0];
    const fileType = url.split(".").pop();
    try {
        return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error)
    }
}

export default imagedelete