//stampa su console facendo una deep copy altrimenti se la variabile cambia
//la console aggiorna il valore e non mostra quello della variabile al momento della stampa
export function log(...obj : any[]){
    console.log(...JSON.parse(JSON.stringify(obj, null, 2)))
}

export function error(...obj : any[]){
    console.error(...JSON.parse(JSON.stringify(obj, null, 2)))
}