import SVGInteractive from "@lib/interactive/SVGInteractive.js";
import Collisions from "@lib/helpers/Collisions.js";

export default class SolidBlocks {

    /** @type {SVGInteractive[]} */
    static collection = [];

    static add(obj) {
        if (!(obj instanceof SVGInteractive))
            throw 'Invalid instance of SVGInterative';

        this.collection.push(obj);
    }

    static validateMove(origin) {

        let result = this.collection.find((target) => Collisions.rect(origin, target));
        return !(result instanceof SVGInteractive);
    }

}