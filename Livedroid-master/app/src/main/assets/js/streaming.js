function startStream(){
	
	
	var playerID = $(this).attr('id');
	var isStreaming = $("#"+playerID).data("onfly");
	var playerURL = $("#input_"+playerID).val();
	var URLsplit = playerURL.split(":");

	if($(this).attr('name')) var playerName = $(this).attr('name');
	else var playerName = playerID;

	if(verifyIP(URLsplit[0])){

		var player = new MJPEG.Player(playerID, "http://"+playerURL);

		if(!isStreaming) {

			$("#"+playerID).data("onfly",true);
			player.start();
			logPrint( playerName + " streaming is starting..");
		}

		else {

			$("#"+playerID).data("onfly",false);
			player.stop();
			logPrint(playerName + " streaming is stopping..");
			canvasRefresh(playerID);
			
		}
	}

}

function verifyIP(IPvalue) {

	errorMessage = "";
	theName = "Introduced IP ";

	var IPSample = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var ipArray = IPvalue.match(IPSample);

	if (IPvalue == "0.0.0.0")
		errorMessage = errorMessage + theName + ': '+IPvalue+' is a special IP address and cannot be used here.';

	else if (IPvalue == "255.255.255.255")
		errorMessage = errorMessage + theName + ': '+IPvalue+' is a special IP address and cannot be used here.';

	if (ipArray == null)
		errorMessage = errorMessage + theName + ': '+IPvalue+' is not a valid IP address.';

	else {

		for (i = 0; i < 4; i++) {

			thisSegment = ipArray[i];

			if (thisSegment > 255) {

				errorMessage = errorMessage + theName + ': '+IPvalue+' is not a valid IP address.';
				i = 4;
			}

			if ((i == 0) && (thisSegment > 255)) {

				errorMessage = errorMessage + theName + ': '+IPvalue+' is a special IP address and cannot be used here.';
				i = 4;
			}
		}
	}

	extensionLength = 3;

	if (errorMessage == ""){

		return true;
	}
	else{

		alert (errorMessage);
		return false;
	}
}