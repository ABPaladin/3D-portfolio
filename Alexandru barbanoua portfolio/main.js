import "./style.css";
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector(".experience-canvas"));

let btn = document.getElementById("stop-music")


function stopMusic() {
    var music = document.getElementById("background-music");
    music.pause();
}
btn.onclick = () => {
    stopMusic()
}