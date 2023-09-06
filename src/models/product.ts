export class Product {
    id: string;
    number: string;
    name: string;
    image?: string[] | undefined;
    price?: number;
    quantity?: number;
    specification?: string;

    constructor(id: string = '', number: string = '', image: string[] = [], name: string = '', price: number = 0, quantity: number = 0, specification: string = '') {
        this.id = id;
        this.number = number;
        this.image = image;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.specification = specification;
    }
}