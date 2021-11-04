export class Category{

    public constructor(init?: Partial<Category>) {
        Object.assign(this, init);
    }

    id: number; 
    name: string;
}