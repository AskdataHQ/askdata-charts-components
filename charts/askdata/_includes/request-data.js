// Retrieve auth token
if (getUrlParameter('token') != undefined){
  var token = getUrlParameter('token');
}else{
  var token = Cookies.get('access_token')
}

var theme = []

// Retrieve theme
if (getUrlParameter('theme')) {

    $.getJSON( environment + "/charts/"+getUrlParameter('theme')+"/catalog.json", function( data ) {
      
      console.log("retrieving theme")
      console.log(data)
      
      window.theme = data;

  })

} else {

      $.getJSON( environment + "/charts/askdata/catalog.json", function( data ) {
      
      console.log("retrieving theme")
      console.log(data)
      
      window.theme = data;

     })
}

// Request charting data
$.ajax({
         url: environment + "/charts/" + getUrlParameter('chartId'),
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + token 
          ).setRequestHeader('Content-Type','application/json')},
         success: function(data) { 

         displayChart(data);

}
});  

// Redirect to login if not authenticated 
$( document ).ajaxError(function( event, jqxhr, settings, exception ) {
    if ( jqxhr.status== 401 ) {
      location.replace("https://app-dev.askdata.com/login");

    }
});