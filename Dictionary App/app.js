//+++++++++++++++++++++++(prerequisites)+++++++++++++++++++++++++++++++
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const result_div = document.querySelector(".result");

//This will display in the beginning
result_div.innerHTML = `<h3>The result will be displayed here...</h3>`;

//it will prevent the form's default behaviour
form.addEventListener("submit", (event) => {
  event.preventDefault();
  wordInfo(input.value);
});

//++++++++++++++++++(The everything of our word)+++++++++++++++++++++++
async function wordInfo(word) {
  //try block
  try {
    result_div.innerHTML = `<h3>Fetching data...</h3>`;

    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let result = await response.json();

    //getting our values
    const word_info = result[0].meanings[0].definitions[0];

    //these will come directly
    const req_word = result[0].word;
    const meaning = word_info.definition;
    const example = word_info.example;
    const read_more_url = result[0].sourceUrls[0];

    //these will come in the form of an array
    const synonyms = word_info.synonyms;
    const antonyms = word_info.antonyms;

    //appending our values into our result div
    result_div.innerHTML = `<p><strong>Word : </strong>${req_word}</p>
   <p><strong>Meaning : </strong>${meaning}</p>
   <p><strong>Example : </strong>${
     example === undefined
       ? `<span style="opacity : 0.6;">no example available</span>`
       : example
   }</p>
   <p><strong>Synonyms :</strong></p>`;

    if (synonyms.length === 0) {
      result_div.innerHTML += `<span style="opacity : 0.6;">no synonyms available</span>`;
    }

    for (let i = 0; i < synonyms.length; i++) {
      result_div.innerHTML += `
        <li>${synonyms[i]}</li>
      `;
    }

    //antonyms appending procedure
    result_div.innerHTML += `<p><strong>Antonyms :<strong></p>`;

    if (antonyms.length === 0) {
      result_div.innerHTML += `<span style="opacity : 0.6;">no antonyms available</span>`;
    }

    for (let i = 0; i < antonyms.length; i++) {
      result_div.innerHTML += `
        <li>${antonyms[i]}</li>
     `;
    }

    //read more button
    result_div.innerHTML += `<div class="read_more_btn">
  <a href=${read_more_url} target="_blank" >Read More</a>
</div>`;

    //catch block
  } catch (error) {
    result_div.innerHTML = `<h3>Sorry, the word could not be found:(</h3>`;
  }
}
