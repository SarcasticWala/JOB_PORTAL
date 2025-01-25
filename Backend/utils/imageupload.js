import {v2 as cloudinary} from 'cloudinary'

const imageupload = async(file, folder, quality)=>{

    try {
        let option = {
            folder,
            quality,
            resource_type: "auto"
        }

        const response = await  cloudinary.uploader.upload(file.tempFilePath,option)
        return response
        
    } catch (err) {
        console.log(err)
    }
}

export default imageupload