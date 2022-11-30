export function setAgendaMonth(num, monthEl, titles) {
    var day = new Date();
    day.setMonth(day.getMonth() + num);
    monthEl.innerText = day.toLocaleDateString("default", { month: "long", year: "numeric" });
    day = new Date(day.getFullYear(), day.getMonth(), 1);
    day.setDate(day.getDate() - (day.getDay() - 1));
    for (var i of titles) {
        i.innerText = i.innerText.replace(/^[0-9]+/gms, day.getDate().toString());
        day.setDate(day.getDate() + 1);
    }
}
//# sourceMappingURL=setAgendaMonth.js.map