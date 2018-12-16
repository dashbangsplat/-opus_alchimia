import InventoryItem from './inventory-item';

export default class InventoryItemGroup {
    constructor (inventoryItem, amount = 1) {
        if (!(inventoryItem instanceof InventoryItem)) throw 'Item being added as an item group is not of type InventoryItem!';

        this._inventoryItem = inventoryItem;
        this._type = inventoryItem.type;
        this._quantity = amount;
    }

    get item () { return this._inventoryItem; }

    get type () { return this._type; }

    get quantity () { return this._quantity; }

    increment (amount = 1) { this._quantity += amount; }

    decrement (amount = 1) { this._quantity -= amount; if (this._quantity < 0) this._quantity = 0; }
}