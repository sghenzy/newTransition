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
                    // Interpola tra due texture
                    vec4 tex1 = texture2D(uTexture1, vUv);
                    vec4 tex2 = texture2D(uTexture2, vUv);
                    
                    // Calcola la distorsione basata su uProgress
                    float distortionAmount = sin(uProgress * 3.14159) * 0.3; // Aumenta il valore per più distorsione
                    vec2 distortedUv = vec2(vUv.x + distortionAmount * (1.0 - vUv.x), vUv.y); // Distorce il lato destro
                    
                    // Effetto RGB split: separa i canali colore leggermente
                    float rOffset = 0.01 * uProgress; // Offset rosso
                    float gOffset = 0.02 * uProgress; // Offset verde
                    float bOffset = 0.03 * uProgress; // Offset blu
                    
                    vec4 color1 = texture2D(uTexture1, distortedUv - vec2(rOffset, 0.0));
                    vec4 color2 = texture2D(uTexture2, distortedUv + vec2(gOffset, 0.0));
                    vec4 color3 = texture2D(uTexture2, distortedUv - vec2(bOffset, 0.0));
                    
                    // Mixa i canali dei due video in base al progressivo cambiamento
                    vec4 finalColor = vec4(color1.r, color2.g, color3.b, 1.0);
                    gl_FragColor = mix(tex1, finalColor, uProgress);
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
            start: "top top", // Inizio della transizione
            end: "bottom top", // Fine della transizione
            scrub: true, // Sincronizza l'animazione con lo scroll
            markers: true, // Mostra i marcatori per il debug
            onUpdate: (self) => {
                this.material.uniforms.uProgress.value = self.progress;
            }
        });
    }       
    
    startTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 1, // Completa la transizione
            duration: 1.5, // Durata dell'animazione
            ease: "power2.inOut"
        });
    }
    
    reverseTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 0, // Torna al primo video
            duration: 1.5,
            ease: "power2.inOut"
        });
    }
        

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

new VideoTransition('slider');
