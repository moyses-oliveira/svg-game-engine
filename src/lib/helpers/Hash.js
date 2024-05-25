export default class Hash {

    static math() {
        return Math.random().toString(32).substring(2);
    }

    static guid() {
        return ([this.math(), this.math(), this.math()]).join('-');
    }
}