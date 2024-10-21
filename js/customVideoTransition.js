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

        // Creazione del materiale shader per l'interpolazione
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture1: { value: this.videoTextures[0] },
                uTexture2: { value: this.videoTextures[1] },
                uProgress: { value: 0.0 }, // Valore di transizione
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
                    // Interpolazione fluida tra le texture
                    vec4 tex1 = texture2D(uTexture1, vUv);
                    vec4 tex2 = texture2D(uTexture2, vUv);
                    vec4 finalColor = mix(tex1, tex2, smoothstep(0.0, 1.0, uProgress));
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
            start: "top top", 
            onEnter: () => this.startTransition(), 
            onLeaveBack: () => this.reverseTransition(), 
            markers: true // Usa marcatori per il debug
        });
    }
    
    startTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 1, // Completa la transizione verso il secondo video
            duration: 0.8, // Durata ridotta
            ease: "power2.inOut"
        });
    }
    
    reverseTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 0, // Torna indietro al primo video
            duration: 0.8,
            ease: "power2.inOut"
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

new VideoTransition('slider');
