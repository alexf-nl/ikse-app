export class Product {
    public naam: string;
    public description: string;
    public imagePath: string;
    public price: number;

    constructor(naam: string, description: string, imagePath: string, price: number) {
        this.naam = naam;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
    }
}