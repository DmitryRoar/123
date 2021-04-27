export default class OrderChangeDto {
    products: Product[];
}
declare class Product {
    id: string;
    order: number;
}
export {};
