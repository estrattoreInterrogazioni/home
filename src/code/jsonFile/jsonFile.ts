import {compute, jsonFileFormat} from "../compute/compute.js"

function onReaderLoad(event : ProgressEvent<FileReader>){
    if(event.target){
        if(event.target.result){
            return JSON.parse(<string>event.target.result);
        }
    } else {
        console.error(".target not present", event);
    }
}

export class jsonFile {
    protected el;

    constructor(el : HTMLInputElement){
        this.el = el;

        this.el.onchange = this.onChange;
    }

    onChange(this: GlobalEventHandlers, event : Event) {
        var reader = new FileReader();
        reader.onload = (event : ProgressEvent<FileReader>) => {
            compute(<jsonFileFormat>onReaderLoad(event));
        };
        if(event.target)
        reader.readAsText((<FileList>(<HTMLInputElement>event.target).files)[0]);
    }
}