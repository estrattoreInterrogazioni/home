import { error } from "../console.js";
export function onReaderLoad(event) {
    if (event.target) {
        if (event.target.result) {
            return JSON.parse(event.target.result);
        }
    }
    else {
        error("event.target not present", event);
    }
}
