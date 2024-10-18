gsap.registerPlugin(ScrollTrigger);

class VideoTransition {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    async init() {
        // Configurazione Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // Caricamento dei video
        const videoPaths = JSON.parse(this.container.dataset.images);
        this.videoTextures = await Promise.all(videoPaths.map(this.loadVideoTexture));

        // Creazione del materiale shader per gli effetti
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture1: { value: this.videoTextures[0] },
                uTexture2: { value: this.videoTextures[1] },
                uProgress: { value: 0.0 },
                uDistortion: { value: 0.15 }, // Valore di default per la distorsione
                uRGBSplit: { value: 0.005 }, // Valore di default per RGB split
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture1;
                uniform sampler2D uTexture2;
                uniform float uProgress;
                uniform float uDistortion; // Nuovo uniform per controllare la distorsione
                uniform float uRGBSplit; // Nuovo uniform per l'intensità dell'RGB split
                varying vec2 vUv;

                void main() {
                    // Calcola la distorsione
                    float distortionAmount = smoothstep(0.3, 0.7, uProgress) * uDistortion;
                    vec2 distortedUv = vUv + vec2(distortionAmount * (1.0 - vUv.x), 0.0);

                    // Applica l'RGB split solo durante la distorsione
                    float rOffset = uRGBSplit * distortionAmount;
                    float gOffset = uRGBSplit * distortionAmount * 1.5;
                    float bOffset = uRGBSplit * distortionAmount * 2.0;

                    vec4 tex1 = texture2D(uTexture1, distortedUv);
                    vec4 tex2 = texture2D(uTexture2, distortedUv);

                    vec4 color1 = texture2D(uTexture1, distortedUv - vec2(rOffset, 0.0));
                    vec4 color2 = texture2D(uTexture2, distortedUv + vec2(gOffset, 0.0));
                    vec4 color3 = texture2D(uTexture2, distortedUv - vec2(bOffset, 0.0));

                    vec4 finalColor = mix(tex1, vec4(color1.r, color2.g, color3.b, 1.0), uProgress);
                    gl_FragColor = finalColor;
                }

            `
        });

        // Configura il piano su cui renderizzare i video
        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.camera.position.z = 1;
        this.animate();
        this.initScrollEffect();
        this.setupTweakpane(); // Aggiungi il setup per Tweakpane
    }

    loadVideoTexture(path) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = path;
            video.loop = true;
            video.muted = true;
            video.play();
            video.onloadeddata = () => {
                const texture = new THREE.VideoTexture(video);
                resolve(texture);
            };
        });
    }

    initScrollEffect() {
        ScrollTrigger.create({
            trigger: "#content",
            start: "top 50%", // Attiva lo scroll a metà della viewport
            onEnter: () => this.startTransition(), // Avvia la transizione una volta che lo scroll è attivato
            onLeaveBack: () => this.reverseTransition(), // Torna indietro se necessario
            markers: true // Usa i marcatori per il debug
        });
    }
    
    startTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 1, // Completa la transizione verso il secondo video
            duration: 0.8, // Durata più breve per una transizione rapida
            ease: "power2.inOut"
        });
    }
    
    reverseTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 0, // Torna indietro al primo video
            duration: 0.8, // Durata più breve
            ease: "power2.inOut"
        });
    }

    setupTweakpane() {
        const pane = new Tweakpane();
        const folder = pane.addFolder({ title: "Video Transition Settings" });

        // Slider per modificare i parametri di distorsione e RGB split
        folder.addInput(this.material.uniforms.uDistortion, "value", {
            min: 0,
            max: 0.3,
            step: 0.01,
            label: "Distortion"
        });

        folder.addInput(this.material.uniforms.uRGBSplit, "value", {
            min: 0,
            max: 0.05,
            step: 0.001,
            label: "RGB Split"
        });

        folder.addInput(this.material.uniforms.uProgress, "value", {
            min: 0,
            max: 1,
            step: 0.01,
            label: "Progress"
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

// Inizializza la classe VideoTransition
new VideoTransition('slider');
