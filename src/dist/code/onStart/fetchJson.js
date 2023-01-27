export function fetchJson() {
    var url = "src/test/test.json";
    return fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }
        return response.json();
    })
        .then(function (text) { return text; })["catch"](function (error) { return console.error("Could not fetch json: ", error); });
}
