import "./style.css";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import Experience from "./Experience/Experience.js";

inject();
injectSpeedInsights();

// Browserele blochează autoplay-ul audio; pornim muzica la prima interacțiune
// a utilizatorului, astfel încât fișierul nici nu se descarcă până atunci (preload="none").
const bgMusic = document.getElementById("background-music");
if (bgMusic) {
  const startMusic = () => {
    bgMusic.play().catch(() => {});
    window.removeEventListener("pointerdown", startMusic);
    window.removeEventListener("keydown", startMusic);
  };
  window.addEventListener("pointerdown", startMusic);
  window.addEventListener("keydown", startMusic);
}

const experience = new Experience(document.querySelector(".experience-canvas"));
