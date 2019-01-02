export function extractInteractiveIconFromPropFactoryForScene(params) {
    let { scene, propFactory, x, y } = params;

    if (typeof propFactory !== 'function') throw "propFactory is not a function";

    let prop = propFactory();
    let icon = prop.inventoryItem.generateIcon(scene, x, y);
    icon.setScale(2);
    icon.setInteractive();
    prop.remove();

    return icon; 
}