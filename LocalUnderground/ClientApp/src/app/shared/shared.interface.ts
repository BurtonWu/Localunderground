export interface HTMLInputEvent extends Event {
    target : HTMLInputElement & EventTarget
}

export interface Category {
    categoryId: number,
    categoryName: string
}