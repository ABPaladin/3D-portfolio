import "./style.css";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import Experience from "./Experience/Experience.js";

inject();
injectSpeedInsights();

// Browserele blochează autoplay-ul audio; pornim muzica la prima interacțiune
// a utilizatorului, astfel încât fișierul nici nu se descarcă până atunci (preload="none").
const bgMusic = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
if (bgMusic) {
  let started = false;
  const startMusic = () => {
    if (started) return;
    started = true;
    bgMusic.play().catch(() => {});
    window.removeEventListener("pointerdown", startMusic);
    window.removeEventListener("keydown", startMusic);
  };
  window.addEventListener("pointerdown", startMusic);
  window.addEventListener("keydown", startMusic);

  if (musicButton) {
    musicButton.addEventListener("click", () => {
      startMusic();
      bgMusic.muted = !bgMusic.muted;
      musicButton.classList.toggle("is-muted", bgMusic.muted);
    });
  }
}

const experience = new Experience(document.querySelector(".experience-canvas"));
