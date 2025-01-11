var currentMonthDisplayed;
var currentYearDisplayed;
var itemToBindTo;
var daysOfWeek;

function simpleCalendar(itemToBindTo2) {
    var today = new Date();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    daysOfWeek = getDaysOfWeek();

    itemToBindTo = itemToBindTo2;
    buildCalendar(mm, yyyy);
}

function nextMonth() {
    console.log("Trying to advance to next month");
    if (currentMonthDisplayed === 11) {
        buildCalendar(0, (currentYearDisplayed + 1));
    } else {
        buildCalendar((currentMonthDisplayed + 1), currentYearDisplayed);
    }
}

function lastMonth() {
    if (currentMonthDisplayed === 0) {
        buildCalendar(11, (currentYearDisplayed - 1));
    } else {
        buildCalendar((currentMonthDisplayed - 1), currentYearDisplayed);
    }
}

function currentMonth() {
    var today = new Date();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();

    buildCalendar(mm, yyyy);
}

// function getCallingInstance() {

// }

//Uses the JavaScript Date convention - Months 0-11, Days 1-31
function buildCalendar(month, year) {
    currentMonthDisplayed = month;
    currentYearDisplayed = year;

    var cssTagsForDaysOfWeek = ["", "", "", "", "", "", ""];
    var dataDatesForDaysOfWeek = ["", "", "", "", "", "", ""];
    var monthStartDayOfWeek = getStartOfMonth((month), year);
    var daysInMonth = getDaysInMonth(month, year);
    var dayOfMonthCounter = 1;
    var htmlToAdd = getHeaderPart(month, year);
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    
    htmlToAdd += "<tr class=\"calendar-day-of-week-header\">";
    for(i =0 ; i < 7; i++)
    {
        var cssClass = (i == 0 || i  == 6) ? "calendar-day-weekend" : "";
        htmlToAdd += "<td class=\"" + cssClass + "\">" + daysOfWeek[i] + "</td>";
    }

    for (var i = 0; daysInMonth >= dayOfMonthCounter && i < 6; i++) {
        htmlToAdd += "<tr class=\"calendar-day-header\">";
        for (var dayCounter = 0; dayCounter < 7; dayCounter++) {
            var dayAdding = new Date(year, month, (dayOfMonthCounter - 1));

            if ((dayOfMonthCounter > 1 && daysInMonth >= dayOfMonthCounter) ||
                (dayOfMonthCounter === 1 && monthStartDayOfWeek <= dayCounter)) {
                if (dayCounter === 0 || dayCounter === 6) {
                    cssTagsForDaysOfWeek[dayCounter] = "calendar-day-weekend";
                } else {
                    cssTagsForDaysOfWeek[dayCounter] = "";
                }

                if (today.getTime() === dayAdding.getTime()) {
                    cssTagsForDaysOfWeek[dayCounter] = cssTagsForDaysOfWeek[dayCounter] + " calendar-day-current-day";
                }

                htmlToAdd += "<td class=\"" + cssTagsForDaysOfWeek[dayCounter] + "\">" + dayOfMonthCounter + "</td>";

                cssTagsForDaysOfWeek[dayCounter] = cssTagsForDaysOfWeek[dayCounter] + " calendar-day-in-month";
                dataDatesForDaysOfWeek[dayCounter] = (month + 1) + "/" + dayOfMonthCounter + "/" + year;
                dayOfMonthCounter++;
            } else {
                htmlToAdd += "<td class=\"calendar-day-other-month\">&nbsp</td>";
                cssTagsForDaysOfWeek[dayCounter] = "calendar-day-other-month";
                dataDatesForDaysOfWeek[dayCounter] = "";
            }

        }
        htmlToAdd += "</tr><tr class=\"calendar-day-cell\">";
        for (var dayCounter2 = 0; dayCounter2 < 7; dayCounter2++) {
            htmlToAdd += "<td data-date=\"" + dataDatesForDaysOfWeek[dayCounter2] + "\" class=\"" + cssTagsForDaysOfWeek[dayCounter2] + "\"></td>";
        }
        htmlToAdd += "</tr>";
    }

    htmlToAdd = "<table class=\"calendar-table\">" + htmlToAdd + "</table>";

    //todo the ID should be passed in.
    document.getElementById(itemToBindTo).innerHTML = htmlToAdd;
    document.getElementById("calendar-lastMonthButton").addEventListener("click", function () { lastMonth(); });
    document.getElementById("calendar-nextMonthButton").addEventListener("click", function () { nextMonth() });
    document.getElementById("calendar-currnetMonthButton").addEventListener("click", function () { currentMonth() });
}

function getHeaderPart(month, year) {
    firstOfMonth = new Date(year,  month, 1)
    monthTitle = firstOfMonth.toLocaleString('default', { month: 'long'});

    var htmlToAdd = "<div><h3 class=\"calendar-header-title\">" + monthTitle + " " + year + "</h3>";
    htmlToAdd += "<div class=\"calendar-header-buttons\"><button id=\"calendar-lastMonthButton\" class=\"btn btn-primary\">&lt;</button>&nbsp;";
    htmlToAdd += "<button id=\"calendar-nextMonthButton\" class=\"btn btn-primary\">&gt;</button></div>";
    htmlToAdd += "<div class=\"calendar-header-buttons\"><button  id=\"calendar-currnetMonthButton\" class=\"btn btn-primary\">Today</buutton></div></div>";
    return htmlToAdd;
}

function getDaysOfWeek() {
    var daysOfWeek = [];
    for (i = 1; i <= 7; i++) {
        firstOfMonth = new Date(2024,  11, i)
        daysOfWeek[i-1] = firstOfMonth.toLocaleString('default', { weekday: 'long'});
    }
    return daysOfWeek;
}

function getStartOfMonth(month, year) {
    var d = new Date((month + 1) + "/1/" + year);
    var dayOfWeek = d.getDay();
    return dayOfWeek;
}

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}