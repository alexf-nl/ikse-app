export class Product {
    public productId: number
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;

    constructor(productId: number, name: string, description: string, imagePath: string, price: number) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
    }
}