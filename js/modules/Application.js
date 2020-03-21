class Application {
    constructor (name='Changelogger') {
        this.name = name;
        document.head.getElementsByTagName('title')[0].textContent = name;
        this.changelogs = [];
    }
}

export {Application}