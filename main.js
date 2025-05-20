const result = document.getElementById("definition_result");
const sound = document.getElementById("sound");
const button = document.getElementById("search_button");

button.addEventListener("click", () => {
    let input_word = document.getElementById("input-word").value.trim();
    if (!input_word) {
        result.innerHTML = `<h3 class="Error">Please enter a word.</h3>`;
        return;
    }

    console.log(input_word);
    fetch(`/api/dictionary/${input_word}`)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (!data[0] || data[0].meta === undefined) {
                result.innerHTML = `<h3 class="Error">Sorry pal, we couldn't find definitions for the word you were looking for.</h3>`;
                sound.removeAttribute("src");
                return;
            }

            let example_sentence = "";
            for (let sense of data[0].def?.[0]?.sseq?.[0] || []) {
                const vis = sense[1]?.dt?.find(item => item[0] === "vis")?.[1];
                if (vis && vis[0]?.t) {
                    example_sentence = vis[0].t.replace(/{it}/g, "").replace(/{\/it}/g, "");
                    break;
                }
            }

            const audioFile = data[0].hwi?.prs?.find(p => p.sound?.audio)?.sound?.audio;
            const audioUrl = audioFile ? `https://media.merriam-webster.com/audio/pr/na/${audioFile}.mp3` : "";
            console.log("Audio URL:", audioUrl);
            console.log("Pronunciations:", data[0].hwi?.prs);

            result.innerHTML = `
                <h3 class="heading">${input_word}</h3>
                ${audioUrl ? `<button class="audio-button" id="audio-button"><i class="fa-solid fa-headphones"></i></button>` : `<p>No pronunciation audio available, using text-to-speech.</p>`}
                <p class="partOfSpeech">${data[0].fl || "N/A"} ${data[0].hwi?.prs?.[0]?.mw || ""}</p>
                <p class="result">${data[0].shortdef?.[0] && data[0].shortdef?.[1] ? data[0].shortdef[0] + ", " + data[0].shortdef[1] : data[0].shortdef?.[0] || "No definition available"}</p>                <p class="example">${example_sentence}</p>
            `;

            if (audioUrl) {
                fetch(audioUrl, { method: "HEAD" })
                    .then(response => {
                        if (response.ok) {
                            sound.setAttribute("src", audioUrl);
                            sound.load();
                            document.getElementById("audio-button").addEventListener("click", () => {
                                sound.play().catch(error => {
                                    console.error("Audio playback error:", error);
                                    result.innerHTML += `<p class="Error">Failed to play audio: ${error.message}. Using text-to-speech.</p>`;
                                    // Fallback to Web Speech API
                                    const utterance = new SpeechSynthesisUtterance(input_word);
                                    utterance.lang = "en-US";
                                    window.speechSynthesis.speak(utterance);
                                });
                            });
                        } else {
                            throw new Error("Audio file not accessible");
                        }
                    })
                    .catch(error => {
                        console.error("Audio URL validation error:", error);
                        sound.removeAttribute("src");
                        document.getElementById("audio-button").addEventListener("click", () => {
                            const utterance = new SpeechSynthesisUtterance(input_word);
                            utterance.lang = "en-US";
                            window.speechSynthesis.speak(utterance);
                        });
                    });
            } else {
                sound.removeAttribute("src");
                document.getElementById("audio-button").addEventListener("click", () => {
                    const utterance = new SpeechSynthesisUtterance(input_word);
                    utterance.lang = "en-US";
                    window.speechSynthesis.speak(utterance);
                });
            }
            console.log(sound);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            result.innerHTML = `<h3 class="Error">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again later or head to the web instead.</h3>`;
            sound.removeAttribute("src");
        });
});