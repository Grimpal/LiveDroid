function camFieldGenerator(){
	

	var cont = parseInt($("#addCamera").data("camera"));
	cont++;
	$("#addCamera").data("camera",cont);
	$(".row").append("<div id=\"camContainer_" + cont + "\" class=\"draggable-element playerContainer\"><div class=\"buttonContainer\"><label class=\"renameLabel\"></label><button class=\"button captureFrameButton\">Capture</button><button class=\"button renameButton\">Rename</button><button class=\"button removeButton\">Remove</button><span class=\"drag-area orderSpan\"></span></div><div class=\"motion-box\"></div><canvas name=\"\" data-onFly=\"false\" id=\"cam_" + cont +"\" class=\"camStream\"></canvas><div class=\"inputsContainer\"><p>IP:</p><input id=\"input_cam_"+ cont +"\"type=\"text\" name=\"ipAddress\" class=\"addressLabel\"><p class=\"renameForm\">Name:</p><input class=\"renameForm\" type=\"text\"></div></div>");

	$("#camContainer_" + cont + " .renameLabel").text("cam_"+cont);

	$("#cam_"+cont).click(startStream);
	$("#camContainer_" + cont + " .removeButton").click(deleteCameraField);
	$("#camContainer_" + cont + " .renameButton").click(renameField);
	$("#camContainer_" + cont + " .captureFrameButton").click(lastFrame);

	logPrint("Camera cam_" + cont + " container created");

	 $(".draggable-element").arrangeable({dragSelector: '.drag-area'});
}

function deleteCameraField(){

	var removedCanvas = $(this).siblings().eq(0).text();

	self.stop();

	if($(this).parent(".buttonContainer").siblings().eq(0).data("onfly") == true )
   		 logPrint(removedCanvas + " streaming is stopping..");
   		
	$(this).parent(".buttonContainer").parent(".playerContainer").remove();

	logPrint("Camera " + removedCanvas + " container destroyed");

}

function renameField(){

	//console.log($(this).parent(".buttonContainer").siblings().eq(1).find(".renameForm").css("visibility")); ACCESS TO CSS PROPERTIES
	//console.log($(this).siblings().eq(0).text());  ACCESS TO LABEL VALUES
	//console.log($(this).parent(".buttonContainer").siblings().eq(1).find("input.renameForm").val()); ACCESS TO INPUT VALUE
	//console.log($(this).parent(".buttonContainer").siblings().eq(0).attr("id")); GET FIRST CANVAS ID (CameraID)

	$(this).parent(".buttonContainer").siblings().eq(1).find("input.renameForm").val("");
	$(this).parent(".buttonContainer").siblings().eq(1).find(".renameForm").css("visibility","visible");
	$(this).css("visibility","hidden");

	var oldName = $(this).siblings().eq(0).text();

	$(this).parent(".buttonContainer").siblings().eq(1).find("input.renameForm").keypress(function (e){

		var key = e.which;

		if(key == 13){

			var rename = $(this).parent(".inputsContainer").find("input.renameForm").val();
			$(this).parent(".inputsContainer").siblings().eq(1).attr("name",rename);

			$(this).parent(".inputsContainer").siblings().eq(0).find(".renameLabel").text(rename);
			$(this).parent(".inputsContainer").find(".renameForm").css("visibility","hidden");
			$(this).parent(".inputsContainer").siblings().eq(0).find(".renameButton").css("visibility","visible");
			logPrint(oldName + " was renamed as " + rename);
			$(this).unbind("keypress");
			
		}
	})
}

function canvasRefresh(id){

	var canvas = document.getElementById(id);
	var context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);

}