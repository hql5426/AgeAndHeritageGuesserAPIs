console.log("Connected...")


function accessNationalizeData() { // predicts nationality of the text


   const request = new XMLHttpRequest();

   var name = document.querySelector("#nameBox").value;
   name = name.trim();

   var url = "https://api.nationalize.io/?name=" + name;

   console.log(url);

   request.open("GET", url, true);
   dataArray = [];

   request.onload = function () {

      //data = JSON.parse(this.response);
      console.log(request.status);

      if (request.status == 200) {
         console.log("Response OK.")
         const data = JSON.parse(this.response);
         console.log(data.country);
         let dataArray = data.country;

         console.log(dataArray[0].country_id);

         //let nationalityText = document.createTextNode(dataArray[0].country_id);
         document.querySelector("#imgSpace").innerHTML = "";

         getCountryName(dataArray[0].country_id);
         getAge(name, dataArray[0].country_id);
         getCountryFlag(dataArray[0].country_id);
         document.querySelector("#nameBox").innerHTML = "";
         document.querySelector("#Nationality").innerHTML = "";
         document.querySelector("#Age").innerHTML = "";
         //document.querySelector("#imgSpace").innerHTML = "";
         //document.querySelector("#Nationality").appendChild(nationalityText);
      }
      else {
         console.log('Error occurred: Status: ${request.status}');
      }

   };

   request.send();

}

function getCountryName(country_id) { // gets nationality from world bank after being given country_id
   let url = "http://api.worldbank.org/v2/country/" + country_id + "?format=json";
   console.log("World Bank URL: " + url);

   const request = new XMLHttpRequest();

   request.open("GET", url, true);
   dataArray = [];

   request.onload = function () {

      //data = JSON.parse(this.response);
      console.log(request.status);

      if (request.status == 200) {
         console.log("Response OK.");
         const response = JSON.parse(this.response);
         console.log(response[1]);
         let object = response[1];
         console.log(object[0].name);

         let country_name = object[0].name;

         //console.log(dataArray[0].country_id);

         let nameSentence = "I guess you are from " + country_name + "?";

         let nameText = document.createTextNode(nameSentence);
         document.querySelector("#Nationality").appendChild(nameText);
      }
      else {
         console.log('Error occurred: Status: ${request.status}');
      }

   };

   request.send();


}

function getAge(name, country_id) {

   let url = "https://api.agify.io?name=" + name + "&country_id=" + country_id;
   console.log("Ageify URL: " + url);

   const request = new XMLHttpRequest();

   request.open("GET", url, true);
   dataArray = [];

   request.onload = function () {


      console.log(request.status);


      if (request.status == 200) {
         console.log("Response OK.");
         data = JSON.parse(this.response);
         console.log(data.age);

         let age = data.age;

         let ageSentence = "And are you around " + age + "?";

         let ageText = document.createTextNode(ageSentence);
         document.querySelector("#Age").appendChild(ageText);
      }
      else {
         console.log('Error occurred: Status: ${request.status}');
      }

   };

   request.send();

}

function getCountryFlag(country_id) { // gets flag

   let url = "https://www.countryflags.io/" + country_id + "/flat/64.png"

   for (i = 0; i < 10; i++) {
      var img = document.createElement('img');
      img.src = url;
      document.querySelector("#imgSpace").appendChild(img);
   };


}



