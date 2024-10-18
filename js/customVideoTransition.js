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
                    vec4 tex1 = texture2D(uTexture1, vUv);
                    vec4 tex2 = texture2D(uTexture2, vUv);

                    // Simple RGB split effect
                    vec2 uvOffset = vec2(0.005 * sin(uProgress * 3.14159), 0.0);
                    vec4 color = mix(texture2D(uTexture1, vUv - uvOffset), texture2D(uTexture2, vUv + uvOffset), uProgress);
                    gl_FragColor = color;
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
            start: "top top", // Quando inizia lo scroll
            end: "top -500px", // Fino a 500px di scroll
            onEnter: () => this.startTransition(), // Avvia transizione
            onLeave: () => this.reverseTransition(), // In caso serva invertire la transizione
            scrub: false, // Cambiamento non sincronizzato con lo scroll
            markers: true // Per debug
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
