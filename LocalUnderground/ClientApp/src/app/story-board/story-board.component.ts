import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { StoryBoardModel, StoryBoardCreateRequestModel, TextWidgetModel } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { StoryBoardModule } from './story-board.module';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { TextWidgetModalComponent } from '../text-widget/text-widget-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'story-board',
    templateUrl: './story-board.component.html',
    styleUrls: ['./story-board-style.css']
})

export class StoryBoardComponent implements OnInit, OnChanges {

    @Input() public model: StoryBoardModel;
    // @ViewChild('textWidgetModal') textWidgetModal :TextWidgetModalComponent;

    public submitted: boolean;
    public storyBoardForm: FormGroup;
    public imageData: FormData;
    public textWidgets: TextWidgetModel[] = [];
    public textWidgetModal: NgbModalRef;
    //test widget
    public textWidgetControls: FormArray = new FormArray([]);

    // public storyBoardCreateModel: StoryBoardModel;
    private _storyBoardService: StoryBoardService;
    private _modalService: NgbModal;
    public dragging: boolean;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder,
        modalService: NgbModal
    ) {
        this._storyBoardService = storyBoardService;
        this._modalService = modalService;

        this.storyBoardForm = fb.group({
            title: ['default Title', [Validators.required, Validators.maxLength(20)]],
            synopsis: [''],
            textWidgets: [[], [Validators.required]]
        });
    }

    public ngOnInit() {

    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['model'].currentValue) {
            console.log('model', this.model);
            if (this.model.textModels) {
                this.model.textModels.forEach((model) => {
                    const textFormControl = new FormControl(model.body);
                    this.textWidgetControls.push(textFormControl);
                });
            }
        }
    }

    public drop(event: CdkDragDrop<TextWidgetModel[]>) {
        console.log('drop', event);
        this.textWidgets[event.previousIndex].sort = event.currentIndex;
        this.textWidgets[event.currentIndex].sort = event.previousIndex;
        moveItemInArray(this.textWidgets, event.previousIndex, event.currentIndex);
    }

    public handleDragStart(event: CdkDragStart): void {
        console.log('drag start', event)
        this.dragging = true;
    }

    public handleClick(textWidget: TextWidgetModel, index: number): void {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        // this.textWidgetModal.open(null);
        this.textWidgetModal = this._modalService.open(TextWidgetModalComponent);
        console.log('clicked', event);
        this.textWidgetModal.componentInstance['model'] = textWidget;
        console.log(this.textWidgetModal.componentInstance);
        console.log('active instances', this._modalService.activeInstances);
    }

    public createTextWidget() {
        let textWidget: TextWidgetModel = {
            body: Math.random().toString(4),
            sort: this.textWidgets.length
        };
        this.textWidgetControls.push(new FormControl(textWidget.body));
        this.textWidgets.push(textWidget);
    }

    public save() {
        this.submitted = true;
        this.textWidgets.forEach((textWidget, i) => {
            textWidget.sort = i;
        });
        console.log(this.textWidgets);
        // const params: StoryBoardCreateRequestModel = {
        //     title: this.title.value,
        //     synopsis: this.synopsis.value
        // };
        // this.submitted = true;
        // console.log(params);
        // this._storyBoardService.createStoryBoard(params).subscribe((id) => {
        //     console.log(id);
        // })
    }

    public imageUploadHandler(files: FileList) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('imageData' + i, files.item(i), files.item(i).name);
        }
        this.imageData = formData;
    }

    get title() { return this.storyBoardForm.get('title'); }
    get synopsis() { return this.storyBoardForm.get('synopsis'); }

}


// if(req.body as FormData && req.method == "POST") {
//     req.headers.append('enctype', 'multipart/form-data');
// }
