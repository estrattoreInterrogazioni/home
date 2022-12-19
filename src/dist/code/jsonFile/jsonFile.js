import { compute } from "../compute/compute.js";
function onReaderLoad(event) {
    if (event.target) {
        if (event.target.result) {
            return JSON.parse(event.target.result);
        }
    }
    else {
        console.error(".target not present", event);
    }
}
export class jsonFile {
    constructor(el) {
        this.el = el;
        this.el.onchange = this.onChange;
    }
    onChange(event) {
        var reader = new FileReader();
        reader.onload = (event) => {
            compute(onReaderLoad(event));
        };
        if (event.target)
            reader.readAsText(event.target.files[0]);
    }
}
//# sourceMappingURL=jsonFile.js.map