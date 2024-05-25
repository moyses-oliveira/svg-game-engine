import SVGInteractive from '@lib/interactive/SVGInteractive.js';
import axios from "axios";
export default class SVGLoader {

    /** @type {SVGInteractive[]} */
    collection = [];

    /** @type {HTMLElement} */
    container = null;

    constructor(container) {
        this.container = container;
    }

    add(svgInstance) {
        if (!(svgInstance instanceof SVGInteractive))
            throw 'Invalid instance of SVGInterative';

        this.collection.push(svgInstance);
    }

    addCollection(collection) {
        collection.forEach((svgInstance) => this.add(svgInstance));
    }

    import() {
        let requests = this.collection.map((svgInstance) => this.call(svgInstance));
        Promise.all(requests)
            .then((res) => {})
            .catch((err) => {
            })
            .finally(() => this.render())
    }

    call(svgInstance) {
        let request = axios.get(svgInstance.src, {responseType: 'document'});
        request.then((r) => this.process(svgInstance, r));
        return request;
    }

    process(svgInstance, r) {
        if (!(r.data instanceof Document))
            return;

        let svgCollection = r.data.getElementsByTagName('svg')
        if (!(svgCollection instanceof HTMLCollection))
            return;

        if (svgCollection.length < 1)
            return;

        let content = svgCollection.item(0);
        if(svgInstance.w === null){
            svgInstance.setWidth(parseInt(content.attributes.width.value));
        }
        if(svgInstance.h === null) {
            svgInstance.setHeight(parseInt(content.attributes.height.value));
        }

        const gContainer = this.mkG();
        const gElm = this.mkG();
        gElm.innerHTML = content.innerHTML
        let pElm = {x: -1 * Math.round(svgInstance.w/2),y: -1 * Math.round(svgInstance.w/2)}
        gElm.setAttribute('transform', `translate(${pElm.x},${pElm.y})`)
        gContainer.append(gElm);
        gContainer.setAttribute('transform', `translate(${svgInstance.x},${svgInstance.y})`)
        gContainer.setAttribute('id', svgInstance.elementId);
        svgInstance.gElm = gContainer;
    }

    mkG() {
        return document.createElementNS('http://www.w3.org/2000/svg', 'g');
    }


    render() {
        this.collection.forEach((svgInstance) => {
            this.container.append(svgInstance.gElm);
            svgInstance.element = document.getElementById(svgInstance.elementId);
            svgInstance.fitPosition()
        });
        this.afterRender();
    }

    afterRender() {

    }
}