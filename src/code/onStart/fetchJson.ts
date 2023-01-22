import { jsonFileFormat } from "../jsonFile/jsonFileFormat.js"
import {error} from "../console.js"

export async function fetchJson(){
let url="src/test/test.json"
return fetch(url)
  .then((response) => {

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    // Otherwise (if the response succeeded), our handler fetches the response
    // as text by calling response.text(), and immediately returns the promise
    // returned by `response.text()`.
    return response.text()
  })
  // When response.text() has succeeded, the `then()` handler is called with
  .then(text => <jsonFileFormat>JSON.parse(text))
  // Catch any errors that might happen, and display a message
  // in the `poemDisplay` box.
  .catch(error => console.error(`Could not fetch json: `, error))
}