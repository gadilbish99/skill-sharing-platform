import { upload } from "../Services/service";
import { BASE_URL } from "../Services/config";

export default async function uploadImage(event) {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    try {
        const result = await upload(formData);        
        return { uploadedImageName: image.name, imageUrl: BASE_URL + '/' + result};
    } catch (error) {
        return error;
    }
}