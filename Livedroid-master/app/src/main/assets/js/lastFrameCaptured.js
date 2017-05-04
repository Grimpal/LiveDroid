function lastFrame(){

	var canvas = $("#canvasDisplayer").get(0);
	var frame = $(this).parent(".buttonContainer").siblings().eq(0).get(0);

	var context = canvas.getContext('2d');
	context.drawImage(frame, 0, 0);

}

function returnPath(){

	//var canvas = document.getElementById("canvasDisplayer");
	var canvas = $("#canvasDisplayer");
	//var context = canvas.getContext('2d');
	//var dataURL = context.toDataURL("image/png");
}