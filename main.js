const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("definition_result");
const sound = document.getElementById("sound");


const button = document.getElementById("search_button");


button.addEventListener("click", () => {
    let input_word = document.getElementById("input-word").value;
    console.log(input_word)
    fetch(`${url}${input_word}`).then((response) => response.json()).then((data) => {
        console.log(data);
        result.innerHTML = `
        <h3 class="heading">${input_word}</h3>
            <button class="audio-button" onclick="playSound()"><i class="fa-solid fa-headphones"></i></button>
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}  ${data[0].phonetics[1]?.text || ""}  ${data[0].phonetics[2]?.text || ""}</p>
            <p class="result"> ${data[0].meanings[0]?.definitions[0].definition || ""}</p>
            <p class="example">${data[0].meanings[0]?.definitions[0].example || ""}</p>

        `;

        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        console.log(sound);
    })
        .catch(() => {
            result.innerHTML = `<h3 class="Error"> "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."</h3>`
        })
        ;
}
);

function playSound() {
    sound.play().catch(error => {
        console.error("Audio playback error:", error);
        document.getElementById("definition_result").innerHTML += `<p class="Error">Failed to play audio.</p>`;
    });
}