import Prop from './prop';

export default class PropFactory {
    constructor (scene, PropClassList = Prop) {
        this.scene = scene;

        // Make sure PropClassList is an array
        if (!Array.isArray(PropClassList)) PropClassList = [PropClassList];
        this.PropClassList = PropClassList;
    }

    createOne (x = 0, y = 0, PropClass) {
        let SelectedPropClass;
        if (PropClass) {
            SelectedPropClass = _.head(this.PropClassList.filter(pc => { return pc === PropClass; }));
            if (!SelectedPropClass) throw 'Desired prop class not found in prop list';
        }
        else {
            SelectedPropClass = this.PropClassList[0];
        }

        let createdProp = new SelectedPropClass(this.scene, x, y);

        return createdProp;
    }
}