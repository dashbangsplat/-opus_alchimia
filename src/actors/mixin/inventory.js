import PropInventoryItem from '../../props/prop-inventory-item';

export class ItemGroup {
    constructor (propInventoryItem, amount = 1) {
        if (!(propInventoryItem instanceof PropInventoryItem)) throw 'Item being added as an item group is not of type PropInventoryItem!';

        this._propInventoryItem = propInventoryItem;
        this._type = propInventoryItem.type;
        this._quantity = amount;
    }

    get item () { return this._propInventoryItem; }

    get type () { return this._type; }

    get quantity () { return this._quantity; }

    increment (amount = 1) { this._quantity += amount; }

    decrement (amount = 1) { this._quantity -= amount; if (this._quantity < 0) this._quantity = 0; }
}

export class Inventory {
    constructor () {
        this.list = [];
    }

    add (propInventoryItem, amount = 1) {
        if (!(propInventoryItem instanceof PropInventoryItem)) throw 'Item being increased in amount is not of type PropInventoryItem!';

        let itemGroup = this.find(propInventoryItem.type);

        if (!itemGroup) {
            itemGroup = new ItemGroup(propInventoryItem, amount);
            this.list.push(itemGroup); 
        }
        else {
            itemGroup.increment(amount);
        }

        return itemGroup;
    }

    remove (propInventoryItem, amount = 1) {
        if (!(propInventoryItem instanceof PropInventoryItem)) throw 'Item being decreased in amount is not of type PropInventoryItem!';

        let itemGroup = this.find(propInventoryItem.type);

        if (!itemGroup) {
            itemGroup = new ItemGroup(propInventoryItem, 0);
        }
        else {
            itemGroup.decrement(amount);
            if (itemGroup.quantity === 0) this.drop(propInventoryItem);
        }

        return itemGroup;
    }

    drop (type) {
        let itemType = (type instanceof PropInventoryItem) ? type.type : type;

        let itemGroup = this.find(itemType);

        this.list = this.list.filter(itemGroup => { return itemGroup.type !== itemType; });

        return itemGroup;
    }

    find (type) {
        let itemType = (type instanceof PropInventoryItem) ? type.type : type;

        return _.head(this.list.filter(itemGroup => { return itemGroup.type === itemType; }));
    }
}

export default (superclass) => class MyInventory extends superclass {
    get inventory () {
        if (!this._inventory) this._inventory = new Inventory();

        return this._inventory;
    }
}