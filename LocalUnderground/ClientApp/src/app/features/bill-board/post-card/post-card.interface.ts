
export interface PostCardModel {
    storyBoardId: number;
    title: string;
    synopsis: string;
    coverPortrait?: string;
    createdDate: Date;
    lastModifiedDate: Date;
}

export interface PostCardGetParams {
    categoryId?: number;
    sortOrder?: number;
    sortDirection?: number;
    currentIndex?: number;
    loadCount?: number;
    filterText?: string;
}