import { Component, OnDestroy, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';

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
    public image: File;

    public constructor(
        fb: FormBuilder
    ) {
    }

    public ngOnInit() {
    }

    @HostListener('dragover', ['$event']) onDragOver(evt) {
        // console.log('dragover', evt);
    }

    @HostListener('dragleave', ['$event']) onDragLeave(evt) {
        // console.log('dragleave', evt);
    }

    @HostListener('drop', ['$event']) onDrop(evt) {
        // console.log('drop', evt);
        this.image = evt[0];
    }

    public imageUploadHandler(event: FileList) {
        console.log('dnd', event.item(0));
        const formData = new FormData();
        formData.append('image', event.item(0), event.item(0).name);
        this.imageUploadChange.emit(formData);
    }


}
