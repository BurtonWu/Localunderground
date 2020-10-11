import { Component, OnDestroy, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { HTMLInputEvent } from './shared.interface';

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
        this.reader.onload = (e) => {
            this.images.push(e.target.result as string);
        }
    }

    public ngOnInit() {
    }

    // @HostListener('dragover', ['$event']) onDragOver(evt) {
    //     // console.log('dragover', evt);
    // }

    // @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    //     // console.log('dragleave', evt);
    // }

    // @HostListener('drop', ['$event']) onDrop(evt: HTMLInputEvent) {
    //     this.reader.readAsDataURL(evt.target.files.item(0));
    // }

    public imageUploadHandler(files: FileList) {
        this.reader.readAsDataURL(files.item(0));
        this.files = files;
        this.getImageFormData();
        // const formData = new FormData();
        // formData.append('image', event.item(0), event.item(0).name);
        // this.imageUploadChange.emit(formData);
    }

    public getImageFormData() {
        const formData = new FormData();
        for(let i = 0; i < this.files.length; i++) {
            formData.append('image' + i, this.files.item(i), this.files.item(i).name);
        }
        this.imageUploadChange.emit(formData);
    }


}
