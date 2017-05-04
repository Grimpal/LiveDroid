//event naviagor.onLine isn't fiable.
function reachable() {

  $.get("http://192.168.2.101:8081/dameIP/",function(data){

    console.log(data);
    alert(data);


  });
}