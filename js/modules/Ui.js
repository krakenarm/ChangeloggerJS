import { Parser } from './Parser.js';

class Ui {

}
Ui.Component = class extends HTMLElement {
    constructor (attributes={}) {
        super();
        for (let [key, val] of Object.entries(attributes))
            this.setAttribute(key, val);
    }
}
/**
 * @return {HTMLSpanElement}
 */
Ui.Variable = function (type, value, attributes = {}) {
    let output = document.createElement('span');
    for (let [key, val] of Object.entries(attributes))
        output.setAttribute(key, val);
    output.classList.add('Variable');
    output.classList.add(type);
    output.textContent = value;
    return output;
}
Ui.Variable.prototype = HTMLSpanElement.prototype;
/**
 * @param {Brick} brick
 */
Ui.Brick =class {
    /**
     * @param {Brick} brick
     */
    constructor (brick) {
        this.brick = brick;
    }

    /**
     *
     * @param {Object} options
     * @param {boolean} [options.includeType=true] - If true it will add the type like [added] to the log
     * @param {string} [options.lineStart='- '] - The start of the line e.g. "- renamed x to y". Only works if options.includeType is false
     * @param {string} [options.brickCSSClass='Brick'] - The used css class on brick. You can add multiple classes by separating the string with " ".
     * @param {number} [options.intendLength=4] - The number of used " " to intend.
     * @param {number} [options.intends=0] - the umber of intends.
     * @param {string} [options.surroundBrickType="[$type$]"] - How to surround the brick type where $type$ is the type.
     * @param {function|false} [options.typeCaster= string.prototype.toUpperCase] - function that is used for casting the type
     * @param {string} [options.endWith='.'] - Ends the message with this string.
     * @return {HTMLElement}
     */
    getHTML(options= {}) {
        let output = document.createElement('div');
        let message = this.brick.message||'';
        let vars = Parser.Variable.from.string(message);

        let htmls = [];
        for (let v of vars) {
            htmls.push(Ui.Variable(v.type, v.value));
        }
        for (let i=0;i<htmls.length;i++){
            message = message.replace(vars[i].outerText, htmls[i].outerHTML);
        }
        let brickClass = kaiutils.defaultify(options.brickCSSClass, 'Brick')
        if (Boolean(brickClass) !== false){
            let split = brickClass.split(' ');
            for (let cls of split)
                output.classList.add(cls);
        }

        if (kaiutils.defaultify(options.includeType, true)){
            let type = this.brick.type;
            let typeFormat = kaiutils.defaultify(options.surroundBrickType, "[$type$]");

            if (Boolean(typeFormat))
                type = typeFormat.replace("$type$", type);
            let typeParser = kaiutils.defaultify(options.typeCaster, String.prototype.toUpperCase);
            if (typeof typeParser === 'function')
                type = typeParser.call(type, type);
            message = Ui.Variable(this.brick.type, type).outerHTML + message;
        }
        else {
            if (options.lineStart !== '')
                message = kaiutils.defaultify(options.lineStart, '- ')+ message;
        }
        let intends =kaiutils.defaultify(options.intends, 0);
        if ( intends > 0)
            message = " ".repeat(kaiutils.defaultify(options.intendLength, 4)*intends) + message;
        message += kaiutils.defaultify(options.endWith, '.');
        output.innerHTML = message;

        return output;
    }
}



export {Ui}