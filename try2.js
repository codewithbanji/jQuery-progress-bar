$(document).ready(() => {
    var bar = $("#progress-bar");
    var currIndex = 0;
    const maxIndex = 5;
    var stop = false;

    bar.on("loading", () => {
        setDisabledState(pauseButton, false);
        setDisabledState(startButton, true);
        setDisabledState(resetButton, true);
        bar.toggleClass("progress-bar-animated");
    });

    bar.on("pause", () => {
        stop = true;
        setDisabledState(pauseButton, true);
    });

    bar.on("reset", () => {
        setBar(0);
        currIndex = 0;
        setDisabledState(resetButton, true);
        setDisabledState(startButton,false);
    });

    bar.on("done", () => {
        stop = true;
        setDisabledState(startButton, true);
        setDisabledState(pauseButton, true);
    });

    bar.on("stop", () => {
        bar.toggleClass("progress-bar-animated");
        stop = false;
        setDisabledState(resetButton, false);
        if(currIndex<maxIndex) setDisabledState(startButton,false);
    });

    var resetButton = $("#reset-button").on("click", () => {
        bar.trigger("reset");
    });

    var pauseButton = $("#pause-button").on("click", () => {
        bar.trigger("pause");
    });

    var startButton = $("#start-button").on("click", () => {
        bar.trigger("loading");
        nextItem();
    });

    function incrementIndex(){
        currIndex++;
        if(currIndex == maxIndex){
            bar.trigger("done");
            
        }
    }

    function setBar(val){
        bar.width(val + "%");
        bar.text(val + "%");
    }

    function setDisabledState(elem, disabled){
        elem.prop('disabled', disabled);
    }

    function nextItem(){
        setTimeout(() => {
            incrementIndex();
            setBar(currIndex/maxIndex*100);
			if(stop){
                bar.trigger("stop");
				return;
            }
			nextItem();
		}, 1000)
    }

});