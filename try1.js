$(document).ready(() => {
    var bar = $("#progress-bar");
    var currIndex = 0;
    const maxIndex = 5;
    var stop = false;

    var resetButton = $("#reset-button").on("click", () => {
        setBar(0);
        currIndex = 0;
        setDisabledState(resetButton, true);
        setDisabledState(startButton,false);
    });

    var pauseButton = $("#pause-button").on("click", () => {
        stop = true;
        setDisabledState(pauseButton, true);
    });

    var startButton = $("#start-button").on("click", () => {
        setDisabledState(pauseButton, false);
        setDisabledState(startButton, true);
        setDisabledState(resetButton, true);
        bar.toggleClass("progress-bar-animated");
        nextItem();

    });

    function incrementIndex(){
        currIndex++;
        if(currIndex == maxIndex){
            stop = true;
            setDisabledState(startButton, true);
            setDisabledState(pauseButton, true);
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
                bar.toggleClass("progress-bar-animated");
                stop = false;
                setDisabledState(resetButton, false);
                if(currIndex<maxIndex) setDisabledState(startButton,false);
				return;
            }
			nextItem();
		}, 1000)
    }

});