var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.round(parseFloat(Math.random().toFixed(70)) * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
export function sortPeople(json) {
    var arr = __spreadArray([], json.people);
    arr.sort(function (a, b) {
        return b.score - a.score;
    });
    var indexes = [0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].score != arr[Math.max(i - 1, 0)].score) {
            indexes.push(i);
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
