import { Parser } from './Parser.js';

class Changelog {
    constructor (name) {
        this.name = name;
        /**
         * @type {Commit[]}
         */
        this.commits = [];
    }
    addCommits(commits){
        if (!Array.isArray(commits))
            commits = [commits];
        for (let commit of commits){
            if (!this.commits.includes(commit))
                this.commits.unshift(commit);
        }
        return this;
    }
    getLastCommit(){
        return this.commits[0];
    }
    get length() {
        return this.commits.length;
    }
    getDate(formatted = false){
        let l = this.length;
        if (l){
            let last = this.getLastCommit();
            return (formatted) ? Parser.Date.format(last.dateTime) : last.dateTime;
        }
        return (formatted) ? Parser.Date.format(new Date()) : new Date();

    }
    /**
     * @param {number|string} identifier - Can search for string: message or dateTime, integer: index, float: version
     * @return {Commit|boolean}
     */
    getCommit(identifier){
        switch (typeof identifier){
            case 'number':
                if (Number.isInteger(identifier))
                    return this.commits.length>identifier ? this.commits[identifier] : false;
                else {
                    let found = this.commits.find(commit => commit.version === identifier)
                    return found || false;
                }

            case 'string':
                let found = this.commits.find(commit => (commit.message===identifier||commit.dateTime === identifier))
                return found || false;
            default:
                return false;
        }
    }
}