import {Ui} from './modules/Ui.js'
import { Parser } from './modules/Parser.js';
import { Brick } from './modules/Brick.js';
function main () {
    kaiutils.logStart('main()');
    test();
    end();
}
function end() {
    kaiutils.logEnd('main()');
}
function test() {
    console.group('TESTING');
    for (let t of tests)
        t();
    console.groupEnd();
}
const tests = [
    () => {
        let testStr = 'added {{module|Parser}} in {{path|./js/modules/Parser.js}}';
        //console.log(Parser.getVars(testStr));
        console.log(Parser.json(JSON.stringify([ {type: 'added', message:testStr},{a:'a', arr:[1,2,3,4]}, {c:{d:1, e: false}}])));
    },
    () => {

        let bricks = [
            new Ui.Brick(new Brick(Brick.TYPES.added)
                .addText(Parser.Variable.create.file('Application.js'))
                .addText(' in ')
                .addText(Parser.Variable.create.directory('./js/modules/'))
            ),
            new Ui.Brick(new Brick(Brick.TYPES.deprecated)
                .addText("The usage of ")
                .addText(Parser.Variable.create.module('Parser'))
                .addText(' will be removed in future versions')
            ),
            new Ui.Brick(new Brick(Brick.TYPES.changed)
                .addText("The function ")
                .addText(Parser.Variable.create.func('log()'))
                .addText(' was renamed to ')
                .addText(Parser.Variable.create.func('debug()'))
            ),
            new Ui.Brick(new Brick(Brick.TYPES.removed)
                .addText("The function ")
                .addText(Parser.Variable.create.func('unusableFunction()'))
                .addText(' was finally removed')
            ),
            new Ui.Brick(new Brick(Brick.TYPES.security)
                .addText("The function ")
                .addText(Parser.Variable.create.func('eval()'))
                .addText(' is evil and should <b>not</b> ever be used')
            ),
            new Ui.Brick(new Brick(Brick.TYPES.unreleased)
                .addText("Plannded feature: Making an user interface")
            )
        ];
        for (let brick of bricks)
            document.body.appendChild(brick.getHTML({surroundBrickType: '', includeType:false}));
    }
];


main();