export function onReaderLoad(event : ProgressEvent<FileReader>){
    if(event.target){
        if(event.target.result){
            return JSON.parse(<string>event.target.result)
        }
    } else {
        console.error("event.target not present", event)
    }
}