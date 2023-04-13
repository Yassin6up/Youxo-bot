import sendToDb from "./db.js";
const speak = document.querySelector("#speak");
const me = document.querySelector("#me");
const result = document.querySelector("#resultsContainer");
const listen = new webkitSpeechRecognition();

listen.continues = false;
listen.lang = "en-US";
listen.interimResults = false;
let synth = window.speechSynthesis;
let isRecording = false;
speak.onclick = () => {
  listen.start();
  speak.classList.add("onRecording");
  speak.classList.remove("stopRecording");
};

let yoxo = new SpeechSynthesisUtterance("hey, how are you");
yoxo.onend = () => {
  listen.start();
};
listen.onresult = (e) => {
  let textContent = e.results[e.results.length - 1][0].transcript.trim();
  let response = textContent.split(" ");
  me.innerHTML = textContent;
  if (
    response.includes("what") ||
    response.includes("about") ||
    response.includes("who")
  ) {
    let wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${textContent}`;
    fetch(wikipediaUrl)
      .then((re) => {
        return re.json();
      })
      .then((data) => {
        let random = Math.random() * data.query.search.length;
        let index = Math.floor(random);
        console.log(data.query.search[index]);
        listen.stop();
        yoxo.text = data.query.search[0].snippet;
        result.innerHTML = data.query.search[0].snippet;
        synth.speak(yoxo);
      });
  } else if (response.includes("youxo")) {
    say("yes their , can i help you ?", textContent, "🤔");
  } else if (response.includes("hello")) {
    say("Hello their, can i help you ? ", textContent, "Hello mr yassin");
  } else if (response.includes("location")) {
    listen.stop();
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url =
        "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&zoom=18&addressdetails=1";
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          say("you'r location right now is, " + data.display_name, textContent);
          sendToDb( textContent ,data.display_name)
        })
        .catch((err) => {
          console.log(err);
        });
    });
    synth.speak(yoxo);
  } else if (response.includes("yes")) {
    say("what do you want?", textContent);
  } else if (response.includes("info")) {
    say(
      "Hello my name is youxo i developed by yassin elhrdouf, you can ask me about movie, or music, or if you need advice, im here for you ",
      textContent
    );
  } else if (response.includes("f***")) {
    say("fuck you to", textContent, "🤬");
  } else if (response.includes("thank")) {
    say("you welcome, can i help you more ?", textContent);
  } else if (response.includes("are") && response.includes("you")) {
    say("fine and you ?", textContent, "🥰");
  } else if (
    (response.includes("I") && response.includes("fine")) ||
    response.includes("good")
  ) {
    say("thats goode", textContent, "🤗");
  } else if (response.includes("okay")) {
    say("okay i'm withing for you'r questions", textContent, "😪");
  } else if (
    response.includes("what's") &&
    response.includes("your") &&
    response.includes("name")
  ) {
    say("My name is youxo and i developed by yassine", textContent);
  } else if (response.includes("tell") && response.includes("joke")) {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        say(
          "okay, this joke for you, " +
            data.setup +
            " Because " +
            data.punchline +
            " hahahahahahahahaha",
          textContent,
          "😂"
        );
      });
  } else if (
    response.includes("how") &&
    response.includes("old") &&
    response.includes("you")
  ) {
    say("you know that im robot 😑", textContent, "😑");
  } else if (response.includes("time")) {
    say(
      "its " + date.getHours() + " : " + date.getMinutes() + " pm",
      textContent,
      "🧭"
    );
  } else if (response.includes("advice")) {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        say(data.slip.advice, textContent);
      });
  } else if (response.includes("yassin")) {
    say("Yassin Elhrdouf is programmer with high experience in JavaScript");
  } else if (response.includes("start")) {
    say("Hello world,", textContent);
  } else if (response.includes("zakaria") || response.includes("solali")) {
    say(
      "Zakariya Solali is sportive man with high experience in street workout "
    );
  } else {
    say("Sorry i don't know what you need !", textContent);
  }
};

async function say(text, textContent, log) {
  listen.stop();
  let date = new Date();
  yoxo.text = text;
  synth.speak(yoxo);
  console.log(log);
  console.log(textContent);
  me.innerHTML = textContent;
  result.innerHTML = text;
  sendToDb(textContent , text )
}

listen.onspeechstart = (e) => {
  speak.classList.add("onRecording");
  speak.classList.remove("stopRecording");
};
listen.onspeechend = (e) => {
  speak.classList.add("stopRecording");
  speak.classList.remove("onRecording");
};
