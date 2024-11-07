let btn = document.querySelector('#btn');
let content = document.querySelector('#content');
let voice = document.querySelector('#voice');

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1.2; // Increase pitch slightly for a more feminine sound
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";

    // Get the available voices
    const voices = window.speechSynthesis.getVoices();
    // Find a female voice, if available
    const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes("female") || 
        voice.name.toLowerCase().includes("woman") || 
        voice.name.toLowerCase().includes("susan") || // popular female voice names
        voice.name.toLowerCase().includes("google हिन्दी") // Common female Hindi voices
    );
    
    // Set the selected voice if found, or fallback to default
    text_speak.voice = femaleVoice || voices[0];
    
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sir");
    } else if (hour >= 12 && hour < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

// Speech Recognition setup
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript; // Display recognized speech in content div
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message === "who is harshit" || message.includes("who is harshit")) {
        speak("Harshit is a Java developer and expert in Web3. He created me, your virtual assistant.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else {
        let finalText = `This is what I found on the internet regarding ${message.replace("Nova", "")}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("Nova", "")}`, "_blank");
    }
}
