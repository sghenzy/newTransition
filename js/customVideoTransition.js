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

        // Configura EffectComposer per il post-processing
        this.composer = new THREE.EffectComposer(this.renderer);
        this.renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        // Caricamento dei video
        const videoPaths = JSON.parse(this.container.dataset.images);
        this.videoTextures = await Promise.all(videoPaths.map(this.loadVideoTexture));

        // Creazione del materiale shader per l'interpolazione
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture1: { value: this.videoTextures[0] },
                uTexture2: { value: this.videoTextures[1] },
                uProgress: { value: 0.0 }, // Valore di transizione
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uDistortion: { value: 0.1 } // Parametro di distorsione controllabile
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
                uniform float uDistortion;
                varying vec2 vUv;

                void main() {
                    vec2 uvDistort = vUv + sin(vUv.y * 10.0) * uDistortion * (1.0 - uProgress);
                    vec4 tex1 = texture2D(uTexture1, uvDistort);
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

        // Aggiungi ShaderPass alla composizione
        this.shaderPass = new THREE.ShaderPass(this.material);
        this.composer.addPass(this.shaderPass);

        this.animate();
        this.initScrollEffect();
        this.setupTweakpane();
    }

    loadVideoTexture(path) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = path;
            video.crossOrigin = "anonymous"; // Aggiungi questo attributo
            video.loop = true;
            video.muted = true;
            video.play();
            video.onloadeddata = () => {
                const texture = new THREE.VideoTexture(video);
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.format = THREE.RGBFormat;
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
            markers: true
        });
    }
    
    startTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 1,
            duration: 0.8,
            ease: "power2.inOut"
        });
    }
    
    reverseTransition() {
        gsap.to(this.material.uniforms.uProgress, {
            value: 0,
            duration: 0.8,
            ease: "power2.inOut"
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.composer.render();
    }

    setupTweakpane() {
        const pane = new Tweakpane();
        const folder = pane.addFolder({ title: "Video Transition Settings" });

        folder.addInput(this.material.uniforms.uDistortion, "value", {
            min: 0,
            max: 0.3,
            step: 0.01,
            label: "Distortion"
        });

        folder.addInput(this.material.uniforms.uProgress, "value", {
            min: 0,
            max: 1,
            step: 0.01,
            label: "Progress"
        });
    }
}

new VideoTransition('slider');
