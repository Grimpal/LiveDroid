function logPrint(info){

	var date = new Date();

	$("#log").append("<p>" + info + "    |    " + date.getDate() + "/" + date.getMonth()+1 + " - " + date.getHours() + ":" + date.getMinutes() + "</p>");

}

function logClean(){


	$("#log").text("");

}