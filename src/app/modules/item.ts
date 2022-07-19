class Item {
    id: number;
    title: string;
    description?: string;
    amount: number;
    unit?: string;
    done: boolean;
    constructor(id: number, title: string, amount: number) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.done = false;
    }
}
export default Item;