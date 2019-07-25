
"use strict";
window.fetch = fetch;
function Response(response) {
  this.response = response.response;
  this.ok = response.status >= 200 && response.status < 300;
  this.statusText = response.statusText;
}
Response.prototype.json = function() {
  return JSON.parse(this.response);
};
function fetch(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
      // Before:
      // var response = new Response(this.response);
      // After: pass the entire response
      var response = new Response(this);
      resolve(response);
    };
    request.onerror = function() {
      reject("Network error!");
    };
    request.send();
  });
}
fetch("https://restcountries.eu/rest/v2/name/india?fullText=true")
  .then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(function(json) {
	  var myJSON = JSON.stringify(json);
      document.getElementById("para").innerHTML = myJSON;
  })
  .catch(function(error) {
	  var myJSON = JSON.stringify(error);
      document.getElementById("para").innerHTML = myJSON;
  });