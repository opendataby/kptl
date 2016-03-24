var today = new Date();
var request;

if (window.XMLHttpRequest) {
				request = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				request = new ActiveXObject("Microsoft XMLHTTP");
			};

var gallery = document.getElementById("gallery");

request.onreadystatechange = function() {
      if (request.readyState === 4) {
          jsonData = JSON.parse(request.responseText);
          jsonData.sort(function(a, b) { 
            return new Date(a.data) - new Date(b.data);
          });
console.log(today);
          var aktualno = jsonData.filter(function(b) { return new Date(b.data) >= today; });
			console.log(aktualno);
          var nearest = [];
          var firstItem = aktualno.shift();
          nearest.push(firstItem);
          


          var headerTime = document.getElementById("nearest");
          var nearestTimeText = document.createTextNode(firstItem.data);
          headerTime.appendChild(nearestTimeText);
          
          var plus = aktualno.filter(function(d) { return d.data == firstItem.data; });
          
          var final = nearest.concat(plus);          
          
          for (var i = 0; i < final.length; i++) {
              var face = document.createElement("div");
              var image = document.createElement("img");
              image.setAttribute("src", (final[i].photo != null) ? "img/" + final[i].photo : "img/noimage.png");
              image.setAttribute("title", final[i].fio + " - " + final[i].data);
              
              var organHeader = document.createElement("h3");
              var organText = document.createTextNode(final[i].organ);
              organHeader.appendChild(organText);
              
              var positionPar = document.createElement("p");
              var positionText = document.createTextNode(final[i].dolzhnost);
              positionPar.appendChild(positionText);
              
              var fioPar = document.createElement("p");
              var fioText = document.createTextNode(final[i].fio);
              fioPar.appendChild(fioText);
              
              var timePar = document.createElement("p");
              var timeText = document.createTextNode(final[i].vremia);
              timePar.appendChild(timeText);

              var telPar = document.createElement("p");
              var telText = document.createTextNode(final[i].tel);
              telPar.appendChild(telText);
              
              face.appendChild(organHeader);
              
              face.appendChild(image);
              face.appendChild(fioPar);

              face.appendChild(positionPar);
              face.appendChild(timePar);
              face.appendChild(telPar);
              gallery.appendChild(face);
          }
        };
      };
    request.open("GET", "data/data.json", true);
    request.send(null);
