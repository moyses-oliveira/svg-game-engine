export default class Collisions {

    /**
     *
     * @param origin {SVGInteractive}
     * @param target {SVGInteractive}
     */
    static rect(origin, target) {
        if(origin.elementId === target.elementId)
            return false;

        let dw = Math.ceil((origin.w + target.w) / 2);
        let dh = Math.ceil((origin.h + target.h) / 2);
        const a = Math.abs(origin.x - target.x)  <= dw;
        const b = Math.abs(origin.y - target.y)  <= dh;
        return a && b;
    }
}