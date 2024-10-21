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
                varying vec2 vUv;

                void main() {
                    // Distorsione attiva solo durante la transizione
                    float distortionAmount = smoothstep(0.1, 0.9, uProgress) * 0.3; // Maggiore controllo sulla deformazione
                    vec2 distortedUv = vUv + vec2(distortionAmount * (1.0 - vUv.x), 0.0); // Distorce verso il lato destro
                    
                    // Effetto RGB Split: solo quando c'è una distorsione
                    float rOffset = 0.01 * distortionAmount; // Offset rosso
                    float gOffset = 0.015 * distortionAmount; // Offset verde
                    float bOffset = 0.02 * distortionAmount; // Offset blu
                    
                    vec4 tex1 = texture2D(uTexture1, vUv);
                    vec4 tex2 = texture2D(uTexture2, distortedUv);
                    
                    vec4 color1 = texture2D(uTexture1, distortedUv - vec2(rOffset, 0.0));
                    vec4 color2 = texture2D(uTexture2, distortedUv + vec2(gOffset, 0.0));
                    vec4 color3 = texture2D(uTexture2, distortedUv - vec2(bOffset, 0.0));
                    
                    // Mixa i canali solo dove c'è distorsione
                    vec4 finalColor = mix(tex1, vec4(color1.r, color2.g, color3.b, 1.0), smoothstep(0.1, 0.9, uProgress));
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
            start: "top top", // Attiva lo scroll all'inizio della pagina
            onEnter: () => this.startTransition(), // Avvia la transizione una volta che lo scroll è attivato
            onLeaveBack: () => this.reverseTransition(), // Torna indietro se necessario
            markers: true // Usa i marcatori per il debug
        });
    }
    
    startTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 1, // Completa la transizione verso il secondo video
            duration: 1.5, // Durata dell'animazione
            ease: "power2.inOut"
        });
    }
    
    reverseTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 0, // Torna indietro al primo video
            duration: 1.5,
            ease: "power2.inOut"
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

// Inizializza la classe VideoTransition
new VideoTransition('slider');
