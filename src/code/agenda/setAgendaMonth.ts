import { agenda } from "./agenda";

export function setAgendaMonth(this: agenda, num: number) {
  this.day = new Date(this.day.getFullYear(), this.day.getMonth() + num, 1);

  this.monthEl.innerText = this.day.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  var dayIter = new Date();
  dayIter.setDate(this.day.getDate() - (this.day.getDay() - 1));

  for (var i of this.titles) {
    if (dayIter.getDay() == 0) {
      // == sunday
      dayIter.setDate(dayIter.getDate() + 1);
    }

    i.innerText =
      dayIter.getDate().toString() +
      "\n" +
      dayIter.toLocaleDateString("default", {
        weekday: "long",
      });

    dayIter.setDate(dayIter.getDate() + 1);
  }
}
