import { jsonFileFormat, dayListWithDateString } from "../jsonFile/jsonFileFormat"

export async function getJson(url : string){
return fetch(url)
  .then(response => {

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    // Otherwise (if the response succeeded), our handler fetches the response
    // as text by calling response.json(), and immediately returns the promise
    // returned by `response.json()`.
    return response.json()
  })
  // When response.json() has succeeded, the `then()` handler is called with
  .then(text => <dayListWithDateString[] | jsonFileFormat>text)
  // Catch any errors that might happen, and display a message
  .catch(error => console.error(`Could not fetch json: `, error))
}