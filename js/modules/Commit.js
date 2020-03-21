import { Brick } from './Brick.js';

class Commit {
    constructor (dateTime, message, version) {
        this.dateTime = dateTime;
        this.message = message;
        this.version = version;
        /** @type {Brick[]} */
        this.bricks = [];
    }
    getBricksOfType(type){
        return this.bricks.filter(brick => brick.type===type);
    }
}
Commit.DEFAULT ={};
Commit.DEFAULT.typeOrder = [
    Brick.TYPES.added,
    Brick.TYPES.changed,
    Brick.TYPES.fixed,
    Brick.TYPES.deprecated,
    Brick.TYPES.removed,
    Brick.TYPES.security,
    Brick.TYPES.unreleased
];

export {Commit}