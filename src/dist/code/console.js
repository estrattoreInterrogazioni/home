export function log() {
    var obj = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        obj[_i] = arguments[_i];
    }
    console.log.apply(console, JSON.parse(JSON.stringify(obj, null, 2)));
}
export function error() {
    var obj = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        obj[_i] = arguments[_i];
    }
    console.error.apply(console, JSON.parse(JSON.stringify(obj, null, 2)));
}
