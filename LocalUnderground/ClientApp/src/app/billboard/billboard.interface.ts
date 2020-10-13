export interface BillboardCreateRequestModel {
    title: string
    description: string;
    categoryId: number;
    categoryName: string;
    price: number;
    byteData1: FormData;
}
