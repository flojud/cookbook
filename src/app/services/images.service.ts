import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ref, Storage, uploadBytes, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
    public readonly downloadUrl$: Observable<string>;
    private storageRef: any;
    public url: string;

    constructor(storage: Storage) {
        this.storageRef = ref(storage);
    }

    async uploadImage(file: File){
        const fileName = file.name;
        console.log("Filename: " + fileName);

        // Upload file and metadata to the object 'images/mountains.jpg'
        const imageRef = ref(this.storageRef, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(imageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
        }, 
        (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;
            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                return downloadURL
            }); 
        }
        );
    }
}