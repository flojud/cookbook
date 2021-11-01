export class Recipe{

    public constructor(init?: Partial<Recipe>) {
        Object.assign(this, init);
    }

    id: number; 
    name: string;
    category: string;
    description : string;
    ingredients: string;
    url?: string;
    image?: string;
}