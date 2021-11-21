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
        this.logger.info("start upload Image with path: " + path  + " to storage: " + storageRef.fullPath);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        this.logger.info("upload finished");
        const url = await getDownloadURL(storageRef);
        return url;
    }
}