var jsonData;

function formatDate(number) {
  return (number < 10) ? "0" + number : number;
}

function addTolist(data, i, results) {
        var year = data.getFullYear();
        var month = i;
        var day = data.getDate();
        results.push(year + "-" + (formatDate(month + 1)) + "-" + formatDate(day));
        return results;
}

function pushDates(startMonth, step, year, weekday, everyWeekDay, results) {
  for (var i = startMonth; i < 12; i += step) {
   var data = new Date(year, i, 1);
   

    var firstWeekDayOfMonth = data.getDay();
       
    if (firstWeekDayOfMonth == weekday && everyWeekDay == 1) {
      addTolist(data, i, results);
    } else if (weekday < firstWeekDayOfMonth) {
      var range = firstWeekDayOfMonth - weekday;
      var firstDayFound = (data.getDate() + 7) - range;
      firstDayFound = (everyWeekDay != 1) ? firstDayFound + (7 * (everyWeekDay - 1)) : firstDayFound;
      data.setDate(firstDayFound);
      if (data.getMonth() > i) {
		continue;
	} else {
		addTolist(data, i, results);
}
    } else if (weekday > firstWeekDayOfMonth) {
      firstDayFound = data.getDate() + weekday - firstWeekDayOfMonth;
      firstDayFound = (everyWeekDay != 1) ? firstDayFound + (7 * (everyWeekDay - 1)) : firstDayFound;
      data.setDate(firstDayFound);
      if (data.getMonth() > i) {
		continue;
	} else {
		addTolist(data, i, results);
}
    } else if (firstWeekDayOfMonth == weekday && everyWeekDay > 1) {
      firstDayFound = data.getDate();
      firstDayFound = firstDayFound + (7 * (everyWeekDay - 1));
      data.setDate(firstDayFound)
      addTolist(data, i, results);
    }
    }
    return results;
}

function findDates(year, weekday, everyWeekDay, everyQuarterMonth) {
  var results = [];
  if (everyQuarterMonth == undefined) {
    var startMonth = 0;
    var step = 1;
    pushDates(startMonth, step, year, weekday, everyWeekDay, results)
  } else {
    startMonth = everyQuarterMonth - 1;
    step = 3;
    pushDates(startMonth, step, year, weekday, everyWeekDay, results)
  }
  return results;
}

var button = document.getElementById("calc");
button.onclick = function() {
  
  document.getElementById("output").innerHTML = "";
  var year = document.getElementById("year").value;
  var weekDay = document.getElementById("weekDay").value;
  var everyWeekDay = document.getElementById("everyWeekDay").value;
  var everyQuarterMonth = document.getElementById("everyQuarterMonth").value;  
  var quarter = (everyQuarterMonth == "") ? undefined : parseInt(everyQuarterMonth);
  var dates = findDates(parseInt(year), parseInt(weekDay), parseInt(everyWeekDay), quarter);
  var target = document.getElementById("output");
  var list = document.createElement("ul");
  target.appendChild(list);
  for (var i = 0; i < dates.length; i++) {
    var listItem = document.createElement("li");
    var itemText = document.createTextNode(dates[i]);
    listItem.appendChild(itemText);
    list.appendChild(listItem); 
  }
};
