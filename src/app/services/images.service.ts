import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ref, Storage, uploadBytes, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
    
    private storage: any;
    constructor(storage: Storage) {
        this.storage = storage;
    }

    async upload( folder: string, name: string, file: File): Promise<string> {
        const ext = file!.name.split('.').pop();
        const path = `${folder}/${name}.${ext}`;
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
    }
}