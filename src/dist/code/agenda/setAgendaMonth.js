import { isLesserDate, isSameDate } from "../compute/dateOp.js";
export function setAgendaMonth(num) {
    var _a;
    this.date.setMonth(this.date.getMonth() + num);
    var dayIter = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    {
        var str = dayIter.toLocaleDateString("default", {
            month: "long",
            year: "numeric"
        });
        this.monthEl.innerText = str.charAt(0).toUpperCase() + str.slice(1);
    }
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
        if (dayIter.getMonth() != this.date.getMonth()) {
            i_1.setAttribute("class", i_1.getAttribute("class") + " otherMonth");
        }
        else {
            var res = (_a = i_1.getAttribute("class")) === null || _a === void 0 ? void 0 : _a.replace(" otherMonth", "");
            if (res) {
                i_1.setAttribute("class", res);
            }
        }
        dayIter.setDate(dayIter.getDate() + 1);
        if (dayIter.getDay() == 0) {
            dayIter.setDate(dayIter.getDate() + 1);
        }
    }
    if (this.agendaData.length != 0) {
        var stri = void 0;
        var texts = document.getElementsByClassName("text");
        for (var _b = 0, texts_1 = texts; _b < texts_1.length; _b++) {
            var x = texts_1[_b];
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
                for (var _c = 0, _d = this.agendaData[i].tests; _c < _d.length; _c++) {
                    var sub = _d[_c];
                    stri = "\n            <div class=\"tag v\">\n              <div class=\"tagTitle\">\n                " + sub.subject + "\n              </div>";
                    for (var _e = 0, _f = sub.people; _e < _f.length; _e++) {
                        var person = _f[_e];
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
