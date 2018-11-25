import AirEssence from './essence/air';
import DarkEssence from './essence/dark';
import EarthEssence from './essence/earth';
import FireEssence from './essence/fire';
import LightEssence from './essence/light';
import MagicEssence from './essence/magic';
import WaterEssence from './essence/water';

import PropFactory from '../prop-factory';

export default class EssenceFactory extends PropFactory {
    constructor(scene, PropClassList = [AirEssence, DarkEssence, EarthEssence, FireEssence, LightEssence, MagicEssence, WaterEssence]) {
        super(scene, PropClassList);
    }
}