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

        this.composer = new THREE.EffectComposer(this.renderer);
        this.renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        const videoPaths = JSON.parse(this.container.dataset.images);
        this.videoTextures = await Promise.all(videoPaths.map(this.loadVideoTexture));

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture1: { value: this.videoTextures[0] },
                uTexture2: { value: this.videoTextures[1] },
                uProgress: { value: 0.0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uDistortion: { value: 0.1 }
            },
            vertexShader: `/* Your Vertex Shader */`,
            fragmentShader: `/* Your Fragment Shader */`
        });

        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        this.camera.position.z = 1;

        this.shaderPass = new THREE.ShaderPass(this.material);
        this.composer.addPass(this.shaderPass);

        this.animate();
        this.initScrollEffect();
        this.setupDatGUI(); // Usa dat.GUI come sostituto
    }

    loadVideoTexture(path) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = path;
            video.crossOrigin = "anonymous";
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

    setupDatGUI() {
        const gui = new dat.GUI();
        gui.add(this.material.uniforms.uDistortion, "value", 0, 0.3).name("Distortion");
        gui.add(this.material.uniforms.uProgress, "value", 0, 1).name("Progress");
    }
}

new VideoTransition('slider');
