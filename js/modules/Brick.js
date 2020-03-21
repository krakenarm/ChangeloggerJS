class Brick {
    constructor (type, message='') {
        this.type = type;
        this.message = message;
    }
    addText(text) {
        this.message += text;
        return this;
    }
    clear() {
        this.message = '';
        return this;
    }
}


Brick.TYPES = {
    added: 'added',
    changed: 'changed',
    deprecated: 'deprecated',
    removed: 'removed',
    fixed: 'fixed',
    security: 'security',
    unreleased: 'unreleased'
}
export {Brick}