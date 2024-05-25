export default class KeyboardListener {

    static actions = {};

    static pressed = [];

    static pressedUntil = {}

    static onPress(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.key) > -1) {
            e.preventDefault();
        }
        this.setPressed(e.key);
    }

    static setPressed(key) {
        let i = this.pressed.indexOf(key);
        this.pressedUntil[key] = Date.now();
        if(i > -1)
            return;

        this.pressed.push(key);
    }

    static onRelease(e) {
        this.unset(e.key);
    }

    static unset(key) {
        let i = this.pressed.indexOf(key);
        if(i < 0)
            return;

        this.pressed.splice(i, 1);
        delete this.pressedUntil[key];
    }

    static init() {
        document.addEventListener("keydown", (e) => this.onPress(e), false);
        document.addEventListener("keyup", (e) => this.onRelease(e));
        setInterval(() => this.timer(), 1000 / 60);
    }

    static timer() {
        this.pressed.forEach(key => this.doAction(key));
    }

    static doAction(key) {
        const action = this.actions[key] || null;
        if(typeof action === "function")
            action();
    }

    static setAction(key, pressed) {
        this.actions[key] = pressed;
    }

    /**
     * @param player {SVGInteractive}
     * @param step {number}
     */
    static setPlayer(player, step) {
        KeyboardListener.setAction('ArrowRight', ()=>player.moveX(step))
        KeyboardListener.setAction('ArrowLeft', ()=>player.moveX(-step))
        KeyboardListener.setAction('ArrowUp', ()=>player.moveY(-step))
        KeyboardListener.setAction('ArrowDown', ()=>player.moveY(step))
    }
}