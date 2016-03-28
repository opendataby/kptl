var today = new Date();
var todayString = today.toJSON().slice(0,10);
today = new Date(todayString);
var request;

var todayGallery = document.getElementById("gallery");
var nearestGallery = document.getElementById("nearest");

var mainHeader = document.getElementById("mainHeader");
var nearestHeader = document.getElementById("nearestHeader");

function showCards(arrayName, target) {

    for (var i = 0; i < arrayName.length; i++) {

        var card = document.createElement("div");

        var organHeader = document.createElement("h3");
        var organText = document.createTextNode(arrayName[i].organ);
        organHeader.appendChild(organText);

        var image = document.createElement("img");
        image.setAttribute("src", (arrayName[i].photo != null) ? "img/" + arrayName[i].photo : "img/noimage.png");
        image.setAttribute("title", arrayName[i].fio + " - " + arrayName[i].data);

        var positionPar = document.createElement("p");
        var positionText = document.createTextNode(arrayName[i].dolzhnost);
        positionPar.appendChild(positionText);

        var fioPar = document.createElement("p");
        var fioText = document.createTextNode(arrayName[i].fio);
        fioPar.appendChild(fioText);

        var timePar = document.createElement("p");
        var timeText = document.createTextNode(arrayName[i].vremia);
        timePar.appendChild(timeText);

        var telPar = document.createElement("p");
        var telText = document.createTextNode(arrayName[i].tel);
        telPar.appendChild(telText);

        card.appendChild(organHeader);              
        card.appendChild(image);
        card.appendChild(fioPar);
        card.appendChild(positionPar);
        card.appendChild(timePar);
        card.appendChild(telPar);

        target.appendChild(card);
    }
}

if (window.XMLHttpRequest) {
                request = new XMLHttpRequest();
            } else {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            };

request.onreadystatechange = function() {
    if (request.readyState === 4) {
        jsonData = JSON.parse(request.responseText);
        jsonData.sort(function(a, b) { 
            return new Date(a.data) - new Date(b.data);
          });
          var aktualno = jsonData.filter(function(b) { return new Date(b.data).getTime() >= today.getTime(); });

        var firstItem = aktualno[0];
          
          var plus = aktualno.filter(function(d) { return d.data == firstItem.data; });
             plus.push(firstItem);

        if (new Date(firstItem.data).getTime() == today.getTime()) {

            var todayHeading = document.createElement("h2");
            var todayText = "Сегодня, " + todayString + ", прямые линии проводят:"
            var todayHeadingText = document.createTextNode(todayText);
            todayHeading.appendChild(todayHeadingText);
            mainHeader.appendChild(todayHeading);
            
            var nearest = aktualno.filter(function(d) { return new Date(d.data).getTime() > today.getTime(); });
            var firstNearestItem = nearest.shift();
            var nearestArray = nearest.filter(function(d) { return d.data == firstNearestItem.data; });
            nearestArray.push(firstNearestItem);
            
            var firstNearestDateString = new Date(firstNearestItem.data).toJSON().slice(0,10);
            
            var nearestText = "Ближайшие прямые линии пройдут " + firstNearestDateString + ":";
            var nearestHeading = document.createElement("h2");
            var nearestHeadingText = document.createTextNode(nearestText);
            nearestHeading.appendChild(nearestHeadingText);
            nearestHeader.appendChild(nearestHeading);
            
            showCards(plus, todayGallery);
            showCards(nearestArray, nearestGallery);

        } else {

            var nearestArray = aktualno.filter(function(d) { return d.data === aktualno[0].data; });
			
            var firstNearestDateString = new Date(aktualno[0].data).toJSON().slice(0,10);

            var nearestText = "Ближайшие прямые линии пройдут " + firstNearestDateString + ":";
            var nearestHeading = document.createElement("h2");
            var nearestHeadingText = document.createTextNode(nearestText);
            nearestHeading.appendChild(nearestHeadingText);
            nearestHeader.appendChild(nearestHeading);
            
            showCards(nearestArray, nearestGallery);
        }
        };
      };
    request.open("GET", "data/data.json", true);
    request.send(null);
