export class Rate{

    public constructor(init?: Partial<Rate>) {
        Object.assign(this, init);
    }

    id: number; 
    recipeid: number;
    value: number;
}