export interface StoryBoardModel {
    title: string;
    synopsis: string;
    cover: FormData;
}

export interface StoryboardCreateRequestModel {
    title: string
    synopsis: string;
}

export interface StoryBoardCore {
    id: number;
    title: string;
    synopsis: string;
}