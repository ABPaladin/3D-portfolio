import "./style.css";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import Experience from "./Experience/Experience.js";

inject();
injectSpeedInsights();

const experience = new Experience(document.querySelector(".experience-canvas"));
