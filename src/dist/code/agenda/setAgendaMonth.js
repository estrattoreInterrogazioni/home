import { isLesserDate, isSameDate } from "../compute/dateOp.js";
export function setAgendaMonth(num) {
    this.day.setMonth(this.day.getMonth() + num);
    var dayIter = new Date(this.day.getFullYear(), this.day.getMonth(), 1);
    this.monthEl.innerText = dayIter.toLocaleDateString("default", {
        month: "long",
        year: "numeric"
    });
    dayIter.setDate(dayIter.getDate() - (dayIter.getDay() - 1));
    var tempDay = new Date(dayIter);
    var titles = document.getElementsByClassName("title");
    for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
        var i_1 = titles_1[_i];
        i_1.innerText =
            dayIter.getDate().toString() +
                "\n" +
                dayIter.toLocaleDateString("default", {
                    weekday: "long"
                });
        dayIter.setDate(dayIter.getDate() + 1);
        if (dayIter.getDay() == 0) {
            dayIter.setDate(dayIter.getDate() + 1);
        }
    }
    if (this.agendaData.length != 0) {
        var stri = void 0;
        var texts = document.getElementsByClassName("text");
        for (var _a = 0, texts_1 = texts; _a < texts_1.length; _a++) {
            var x = texts_1[_a];
            x.innerHTML = "";
        }
        dayIter = tempDay;
        for (var i = this.agendaData.length - 1; i >= 0; i--) {
            if (isLesserDate(this.agendaData[i].day, dayIter)) {
                break;
            }
        }
        i += 1;
        for (var j = 0; j < titles.length; j++) {
            if (i >= this.agendaData.length) {
                break;
            }
            if (isSameDate(dayIter, this.agendaData[i].day)) {
                for (var _b = 0, _c = this.agendaData[i].tests; _b < _c.length; _b++) {
                    var sub = _c[_b];
                    stri = "\n            <div class=\"tag v\">\n              <div class=\"tagTitle\">\n                " + sub.subject + "\n              </div>";
                    for (var _d = 0, _e = sub.people; _d < _e.length; _d++) {
                        var person = _e[_d];
                        stri += "<div>" + person + "</div>";
                    }
                    stri += "</div>";
                    texts[j].innerHTML += stri;
                }
                i += 1;
            }
            dayIter.setDate(dayIter.getDate() + 1);
            if (dayIter.getDay() == 0) {
                dayIter.setDate(dayIter.getDate() + 1);
            }
        }
    }
}
