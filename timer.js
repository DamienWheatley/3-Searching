let timer = class {
    constructor(){
        this.start = null;
        this.end = null;
    }

    setStart(){
        this.start = new Date().getTime();
    };
    setEnd(){
        this.end = new Date().getTime();
    };
    getStringReport(){
        let milliseconds = this.end - this.start;
        milliseconds = 1000*Math.round(milliseconds/1000);
        let d = new Date(milliseconds);
        return d.getUTCMinutes() + ' minutes ' + d.getUTCSeconds() + " seconds";
    }; 
};

module.exports.timerClass = timer;