var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
export function sortPeople(json) {
    var arr = __spreadArray([], json.people);
    arr.sort(function (a, b) {
        return b.score - a.score;
    });
    var indexes = [0];
    for (var i = 0; i < arr.length - 1; i++) {
        if ((arr[i].score) != (arr[i + 1].score)) {
            indexes.push(i + 1);
        }
    }
    var tempArr;
    for (var i = 0; i < indexes.length; i++) {
        tempArr = shuffle(arr.slice(indexes[i], indexes[i + 1]));
        for (var j = 0; j < tempArr.length; j++) {
            arr[indexes[i] + j] = tempArr[j];
        }
    }
    return arr;
}
