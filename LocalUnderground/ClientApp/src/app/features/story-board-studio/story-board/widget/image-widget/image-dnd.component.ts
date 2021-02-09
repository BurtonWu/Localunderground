import { Component, OnDestroy, OnInit, HostListener, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { CdkDragStart, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Base64ImageData, ImageWidgetCreateParams } from './image-widget.interface';
import { FormDataImageKeys } from './image-widget.models';
import { ImageWidgetService } from './image-widget.services';

@Component({
    selector: 'image-dnd',
    templateUrl: './image-dnd.component.html'
})

export class ImageDndComponent implements OnInit {

    @Input() public models: Base64ImageData[] = [];

    public submitted: boolean;
    public dragging: boolean;

    public emblem: string;
    public title: string;
    public description: string;
    public reader: FileReader;
    public files: FileList;
    _imageWidgetService: ImageWidgetService;
    public constructor(
        fb: FormBuilder,
        imageWidgetService: ImageWidgetService,

    ) {
        this._imageWidgetService = imageWidgetService;

        this.reader = new FileReader();
        this.reader.onload = (e: ProgressEvent<FileReader>) => {
            const imageData: Base64ImageData = {
                base64ImageData: e.target.result as string,
                sort: this.models.length + 1,
            };
            this.models.push(imageData);
            console.log(this.models);
        };
    }

    public ngOnInit() {
    }

    public ngOnChanges(changes: SimpleChanges) {
    }

    public delete(index: number) {
        this.models.splice(index, 1);
        this._saveWidgetOrder();
    }

    public save() {
        // const formData = new FormData();
        // this.models.forEach((imageData, i) => {
        //     formData.append(FormDataImageKeys[i], imageData.base64ImageData);
        // });
    }

    public drop(event: CdkDragDrop<Base64ImageData[]>) {
        console.log('drop', event);
        // this.textWidgets.forEach(function(widget, i) {
        //     widget.sort = i + 1;
        //     this[i].sort = i + 1;
        //     console.log(this[i], i+1)
        // }, this.textWidgets);

        moveItemInArray(this.models, event.previousIndex, event.currentIndex);
        this._saveWidgetOrder();
    }

    private _saveWidgetOrder() {
        this.models.forEach((widget, i) => {
            widget.sort = i + 1;
            console.log(widget, i + 1);
        });
        this.models.sort(function (a, b) {
            if (a.sort > b.sort) return 1;
            else if (a.sort < b.sort) return -1;
            return 0;
        });
        // const sortModels = this.textWidgets.map((x) => <WidgetSortModel>{
        //     id: x.id,
        //     sort: x.sort,
        //     widgetType: WidgetType.Text
        // });
        // const params: WidgetSortParams = {
        //     storyBoardId: this.model.id,
        //     widgetSortModels: sortModels
        // };
        // this._widgetService.updateWidgetSort(params).subscribe(() => { });
    }


    public imageUploadHandler(files: FileList) {
        const validatedFiles = this.validateImageFiles(files);
        validatedFiles.forEach((file) => {
            this.reader.readAsDataURL(file);
        });
        // this.appendFormData(validatedFiles);
    }

    // public appendFormData(files: File[]) {
    //     const formData = new FormData();
    //     files.forEach((file, i) => {
    //         formData.append(FormDataImageKeys[i], file, file.name);
    //     });
    //     const params: ImageWidgetCreateParams = {
    //         imageData: formData,
    //         sort: 1,
    //         storyBoardId: 1
    //     };
    //     this._imageWidgetService.createWidget(params).subscribe(() => {});
    // }

    public handleDragStart(event: CdkDragStart): void {
        console.log('drag start', event.source.element);
        this.dragging = true;
    }

    // public handleClick(): void {
    //     if (this.dragging) {
    //         this.dragging = false;
    //         return;
    //     }
    // }

    private validateImageFiles(files: FileList): File[] {
        const validatedFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (files.item(i).type == 'image/jpeg' || files.item(i).type == 'image/png') {
                validatedFiles.push(files.item(i));
            }
        }
        return validatedFiles;
    }


}
