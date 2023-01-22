import {person,jsonFileFormat} from "../jsonFile/jsonFileFormat.js"

//rimescola l'array in modo casuale
function shuffle(array : any[]) {
  let currentIndex = array.length,  randomIndex : number

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

export function sortPeople(json: jsonFileFormat) {
    let arr = [...<person[]>json.people]
  
    arr.sort((a, b) => { //ordine decrescente in base a "score"
      return b.score - a.score
    })


    let indexes = [0]
    /*segna gli indici dell'array in cui il valore delle score di due persone sono differenti
    es: array 1, 1, 1, 0.8, 0.8, 0.2 gli indici sono: 3, 5*/
    for(let i=0; i<arr.length; i++){
      if(arr[i].score != arr[Math.max(i-1,0)].score){
        indexes.push(i)
      }
    }

    let tempArr;
    for (let i = 0; i < indexes.length; i++) {
      //rimescola i sub-array con con la stessa score in base agli indici
      tempArr = shuffle(arr.slice(indexes[i], indexes[i + 1]));
      for (let j = 0; j < tempArr.length; j++) {
        arr[indexes[i] + j] = tempArr[j]; //assegna il valore rimescolato a arr
      }
    }

    return arr
}
  