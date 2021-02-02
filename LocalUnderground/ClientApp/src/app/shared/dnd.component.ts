import { Component, OnDestroy, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { HTMLInputEvent } from './shared.interface';
import { FormDataImageKeys } from './shared.models';

@Component({
    selector: 'dnd',
    templateUrl: './dnd.component.html'
})

export class DndComponent implements OnInit {

    @Output() imageUploadChange = new EventEmitter<FormData>();

    public submitted: boolean;

    public billboardForm: FormGroup;
    public emblem: string;
    public title: string;
    public description: string;
    public images: string[] = [];
    public reader: FileReader;
    public files: FileList;
    public constructor(
        fb: FormBuilder
    ) {
        this.reader = new FileReader();
        this.reader.onload = (e: ProgressEvent<FileReader>) => {
            this.images.push(e.target.result as string);
        }
    }

    public ngOnInit() {
    }
    
    public imageUploadHandler(files: FileList) {
        console.log(files);
        const validatedFiles = this.validateImageFiles(files);
        console.log(validatedFiles);
        validatedFiles.forEach((file) => {
            this.reader.readAsDataURL(file);
        });
        this.generateImageFormData(validatedFiles);
    }

    public generateImageFormData(files: File[]) {
        const formData = new FormData();
        console.log(files);
        files.forEach((file, i) => {
            formData.append(FormDataImageKeys[i], file, file.name);
        });
        this.imageUploadChange.emit(formData);
    }

    private validateImageFiles(files: FileList): File[] {
        const validatedFiles = [];
        for(let i = 0; i < files.length; i++) {
            if(files.item(i).type == 'image/jpeg' || files.item(i).type == 'image/png') {
                validatedFiles.push(files.item(i));
            }
        }
        return validatedFiles;
    }
    

}
