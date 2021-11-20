import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ref, Storage, uploadBytes, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
    
    private storage: any;
    constructor(storage: Storage, private logger: NGXLogger) {
        this.storage = storage;
    }

    async upload( folder: string, name: string, file: File): Promise<string> {
        const ext = name.split('.').pop();
        const path = `${folder}/${name}`;
        const storageRef = ref(this.storage, path);
        this.logger.info("path: " + path);
        this.logger.info("storage: " + storageRef.fullPath);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        this.logger.info("download url: " + url);
        return url;
    }
}