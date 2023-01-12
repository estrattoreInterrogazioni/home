export function log(...obj : any[]){
    console.log(...JSON.parse(JSON.stringify(obj, null, 2)))
}