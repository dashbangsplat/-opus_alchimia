import InventoryItem from './inventory-item';
import InventoryItemGroup from './inventory-item-group';

export default class Inventory {
    constructor () {
        this.list = [];
    }

    add (inventoryItem, amount = 1) {
        if (!(inventoryItem instanceof InventoryItem)) throw 'Item being increased in amount is not of type InventoryItem!';

        let itemGroup = this.find(inventoryItem.type);

        if (!itemGroup) {
            itemGroup = new InventoryItemGroup(inventoryItem, amount);
            this.list.push(itemGroup); 
        }
        else {
            itemGroup.increment(amount);
        }

        return itemGroup;
    }

    remove (inventoryItem, amount = 1) {
        if (!(inventoryItem instanceof InventoryItem)) throw 'Item being decreased in amount is not of type InventoryItem!';

        let itemGroup = this.find(inventoryItem.type);

        if (!itemGroup) {
            itemGroup = new InventoryItemGroup(inventoryItem, 0);
        }
        else {
            itemGroup.decrement(amount);
            if (itemGroup.quantity === 0) this.drop(propInventoryItem);
        }

        return itemGroup;
    }

    drop (type) {
        let itemType = (type instanceof InventoryItem) ? type.type : type;

        let itemGroup = this.find(itemType);

        this.list = this.list.filter(itemGroup => { return itemGroup.type !== itemType; });

        return itemGroup;
    }

    find (type) {
        let itemType = (type instanceof InventoryItem) ? type.type : type;

        return _.head(this.list.filter(itemGroup => { return itemGroup.type === itemType; }));
    }
}