import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // this.gui = new GUI({ container: document.querySelector(".hero-main") });
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };

        this.setSunlight();
        this.setRoomLights();
        // this.setGUI();
    }

    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.sunLight.ambientLight = this.obj.intensity;
        });
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.00085;
        this.sunLight.shadow.radius = 55.0;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);

        this.sunLight.position.set(-3, 5, 5);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 5);
        this.scene.add(this.ambientLight);
    }

    setRoomLights() {
        // Lumini interioare ale camerei: stinse ziua (intensity 0),
        // se aprind în regimul de noapte (vezi switchTheme).
        //
        // PointLight(culoare, intensitate, distanță, decay)
        // position.set(x, y, z):  x = stânga(-)/dreapta(+)
        //                         y = jos(-)/SUS(+)  <-- ridică aici
        //                         z = în spate(-)/în față spre cameră(+)
        // Intensitatea de noapte se setează în switchTheme() mai jos.

        // Lampă caldă, de tavan (ridicată sus).
        this.lampLight = new THREE.PointLight("#ffb15e", 0, 0, 1.5);
        this.lampLight.position.set(0, 2, 0);
        this.lampLight.castShadow = true;
        this.lampLight.shadow.mapSize.set(1024, 1024);
        this.lampLight.shadow.normalBias = 0.05;
        this.scene.add(this.lampLight);

        // Lumină rece dinspre ecran/monitor.
        this.screenLight = new THREE.PointLight("#7ea6ff", 0, 0, 1.5);
        this.screenLight.position.set(-1, 2.5, 1.5);
        this.scene.add(this.screenLight);

        // Poziții de bază (offset față de centrul camerei). Room.update() le
        // adună cu poziția camerei, ca luminile să se MIȘTE ODATĂ cu casa
        // când dai scroll. Pentru a muta luminile, schimbă position.set(...)
        // de mai sus — restul rămâne automat.
        this.lampLightBase = this.lampLight.position.clone();
        this.screenLightBase = this.screenLight.position.clone();
    }

    switchTheme(theme) {
        console.log("this.sunLight");
        console.log("this.ambientLight");
        if (theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 0.101960784313725493,
                g: 0.09019607843137255,
                b: 0.23137254901960785,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.10196078431372549,
                g: 0.09019607843137255,
                b: 0.23137254901960785,
            });
            GSAP.to(this.sunLight, {
                intensity: 2,
            });
            GSAP.to(this.ambientLight, {
                intensity: 2,
            });
            // Aprinde luminile camerei noaptea
            GSAP.to(this.lampLight, { intensity: 3 });
            GSAP.to(this.screenLight, { intensity: 2 });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 5,
            });
            GSAP.to(this.ambientLight, {
                intensity: 5,
            });
            // Stinge luminile camerei ziua
            GSAP.to(this.lampLight, { intensity: 0 });
            GSAP.to(this.screenLight, { intensity: 0 });
        }
    }

    resize() {}

    update() {}
}
