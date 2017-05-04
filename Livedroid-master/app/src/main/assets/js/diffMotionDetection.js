var $motionBox = $(".motion-box");

var scale = 10;
var isActivated = false;
var isTargetInSight = false;
var isKnockedOver = false;
var lostTimeout;

function initSuccess(){
    DiffCamEngine.start();
}

function initError(){
    alert("Something went wrong");
}

function startComplete(){
    setTimeout(activate, 500);
}

function activate(){
    isActivated = true;
    play("activated");
}

function capture(payload){
    if(!isActivated || isKnockedOver){
        return;
    }

    var box = payload.motionBox;
    if(box){

        var right = box.x.min * scale + 1;
        var top = box.y.min * scale + 1;
        var width = (box.x.max - box.x.min) * scale;
        var height = (box.y.max - box.y.min) * scale;

        $motionBox.css({
            display: 'block',
            right: right,
            top: top,
            width: width,
            height: height
        });

        if(!isTargetInSight){
            isTargetInSight = true;
        } else{}

        clearTimeout(lostTimeout);
        lostTimeout = setTimeout(declareLost, 2000);
    }

    if(payload.checkMotionPixel(0, 0)){
            knockOver();
    }
}

function declareLost(){
    isTargetInSight = false;
}

function knockOver(){
    isKnockedOver = true;
    clearTimeout(lostTimeout);

    $motionBox.hide();
}

DiffCamEngine.init({
    video: document.getElementById('video'),
    captureIntervalTime: 50,
    includeMotionBox: true,
    includeMotionPixels: true,
    initSuccessCallback: initSuccess,
    initErrorCallback: initError,
    startCompleteCallback: startComplete,
    captureCallback: capture
});