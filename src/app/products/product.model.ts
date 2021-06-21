export class Product {
    public id: string;
    public naam: string;
    public description: string;
    public imagePath: string;
    public price: string;

    constructor(naam: string, description: string, imagePath: string, price: string, id?: string) {
        this.naam = naam;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
        this.id = id;
    }
}