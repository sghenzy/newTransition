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
                uProgress: { value: 0.0 }, // Stato di interpolazione tra i video
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
                    // Interpolazione tra due video
                    vec4 tex1 = texture2D(uTexture1, vUv);
                    vec4 tex2 = texture2D(uTexture2, vUv);
                    vec4 finalColor = mix(tex1, tex2, smoothstep(0.0, 1.0, uProgress));
                    gl_FragColor = finalColor;
                }
            `
        });

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
            start: "top top", // Attiva lo scroll all'inizio della pagina
            onEnter: () => this.startTransition(), // Avvia la transizione una volta che lo scroll è attivato
            onLeaveBack: () => this.reverseTransition(), // Torna indietro se necessario
            markers: true // Usa i marcatori per il debug
        });
    }
    
    startTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 1, // Completa la transizione verso il secondo video
            duration: 0.8, // Durata ridotta per una transizione rapida
            ease: "power2.inOut",
            onComplete: () => {
                this.hidePreviousVideo(); // Nascondere completamente il primo video
            }
        });
    }

    reverseTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 0, // Torna indietro al primo video
            duration: 0.8, // Durata ridotta per una transizione rapida
            ease: "power2.inOut",
            onComplete: () => {
                this.showPreviousVideo(); // Ripristinare il primo video
            }
        });
    }

    hidePreviousVideo() {
        this.videoTextures[0].image.style.display = 'none';
    }

    showPreviousVideo() {
        this.videoTextures[0].image.style.display = 'block';
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

// Inizializza la classe VideoTransition
new VideoTransition('slider');
