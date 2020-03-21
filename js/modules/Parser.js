const Parser = {};
Parser.Variable = {
    START:'{{',
    END: '}}',
    SEPARATOR: '|',
    from: {},
    create: {}
}

Parser.Variable.from.string = str => {
    let start = Parser.Variable.START;
    let end = Parser.Variable.END;
    let lastIndex =0;
    let output = [];
    let maxloops = str.length;
    if (str.indexOf(start)>-1 && str.indexOf(end)>-1)
        while (str.indexOf(start, lastIndex)>-1 && maxloops>0) {
            let lastVar = {};
            lastIndex = str.indexOf(start, lastIndex)+start.length;
            lastVar.begin = lastIndex;
            lastIndex = str.indexOf(end, lastIndex);
            if (lastIndex===-1)
                return output;
            lastVar.end = lastIndex;
            lastIndex += end.length;
            lastVar.text = str.substring(lastVar.begin, lastVar.end);
            let split = lastVar.text.split(Parser.Variable.SEPARATOR);
            lastVar.value = split.pop();
            lastVar.type = split.shift() || 'none';
            lastVar.outerText = start+lastVar.text+end;
            output.push(lastVar);
            maxloops--;
        }
    return output;
}
Parser.Variable.from.args = (type, value) => Parser.Variable.START+type+Parser.Variable.SEPARATOR+value+Parser.Variable.END;
Parser.Variable.create.path = (path) => Parser.Variable.from.args(Parser.Variable.IDENTIFIERS.path, path);
Parser.Variable.create.func = (fName) => Parser.Variable.from.args(Parser.Variable.IDENTIFIERS.function, fName);
Parser.Variable.create.module = (moduleName) => Parser.Variable.from.args(Parser.Variable.IDENTIFIERS.module, moduleName);
Parser.Variable.create.directory = (dirName) => Parser.Variable.from.args(Parser.Variable.IDENTIFIERS.directory, dirName);
Parser.Variable.create.file = (fileName) => Parser.Variable.from.args(Parser.Variable.IDENTIFIERS.file, fileName);
Parser.Variable.IDENTIFIERS = {
    path: 'path',
    function: 'func',
    module: 'module',
    directory: 'dir',
    file: 'file'
};
Parser.json = (str) => {
    return JSON.parse(str, (key, value) => {
        if (key === 'message')
            return Parser.Variable.from.string(value);
        return value;
    });
}
Parser.Date = {};
Parser.Date.format = (date) => {
    return ''+
        date.getFullYear()+'-'+
        (date.getMonth()+1).toString().padStart(2, '0')+'-'+
        date.getDate().toString().padStart(2, '0') + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0');
};
Parser.Message = {};
Parser.Message.create = {};
Parser.Message.create.in = (what, where) => Parser.Variable.from.args('what', what) + ' in ' + Parser.Variable.create.Path(where)
Parser.Message.create.moved = (what, from, to) => Parser.Variable.from.args('what', what) + ' in ' + Parser.Variable.create.Path(where)

export {Parser};