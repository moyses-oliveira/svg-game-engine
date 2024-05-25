import Hash from "@lib/helpers/Hash.js";
import SceneSetup from "@lib/bootstrap/SceneSetup.js";
import SolidBlocks from "@lib/interactive/SolidBlocks.js";

export default class SVGInteractive {
    gElm = null;
    element = null;
    elementId = null;
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    sw = 0;
    sh = 0;
    collisions = true;

    constructor() {
        this.elementId = Hash.guid();
    }

    setWidth(w) {
        this.w = w;
        this.sw = Math.ceil(w / 2);
    }

    setHeight(h) {
        this.h = h;
        this.sh = Math.ceil(h / 2);
    }

    static make(src, x = 0, y = 0, w = null, h = null) {
        let o = new SVGInteractive();
        o.src = src;
        o.x = x;
        o.y = y;
        o.setWidth(w);
        o.setHeight(h);
        return o;
    }


    position(x, y) {
        this.x = x;
        this.y = y;
        this.translate();
    }

    translate() {
        this.element.setAttribute('transform', `translate(${this.x},${this.y})`);
    }

    fitPosition() {
        console.log(this.getAvailableXPos(this.x), this.getAvailableYPos(this.y))
        this.position(this.getAvailableXPos(this.x), this.getAvailableYPos(this.y));
    }

    getAvailableYPos(y) {
        if (y < this.sh)
            return this.sh;
        else if (y + this.sh > SceneSetup.height)
            return SceneSetup.height - this.sh;

        return y;
    }

    getAvailableXPos(x) {
        if (x < this.sw)
            return this.sw;
        else if (x + this.sw > SceneSetup.width)
            return SceneSetup.width - this.sw;

        return x;
    }

    moveY(y) {
        const c = this.y;
        this.y = this.getAvailableYPos(this.y + y);

        if (SolidBlocks.validateMove(this))
            this.translate();
        else
            this.y = c;
    }

    moveX(x) {
        let c = this.x;
        this.x = this.getAvailableXPos(this.x + x);

        if (SolidBlocks.validateMove(this))
            this.position(this.x, this.y);
        else
            this.x = c;


    }

    fitXY() {

    }
}