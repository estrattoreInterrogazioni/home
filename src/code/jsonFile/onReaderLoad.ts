import { jsonFileFormat } from "./jsonFileFormat.js"
import { error } from "../console.js"

//ritorna il parse del file json in input 
export function onReaderLoad(event : ProgressEvent<FileReader>) {
    if(event.target){
        if(event.target.result){
            return <jsonFileFormat>JSON.parse(<string>event.target.result)
        }
    } else {
        error("event.target not present", event)
    }
}