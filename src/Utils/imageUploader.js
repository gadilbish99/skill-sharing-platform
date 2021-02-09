import { upload } from "../Services/service";

export default async function uploadImage(event) {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUrl = await upload(formData);
    console.log(imageUrl);


    return { uploadedImageName: image.name, imageUrl: ''};
}