class VideoTransitionApp {
    constructor() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupComposer();
        this.loadTextures();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        console.log("Scene initialized");
        // Add a temporary background color to confirm rendering
        this.scene.background = new THREE.Color(0x000000);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 1.5; // Adjusted position to ensure visibility
        console.log("Camera set at position: ", this.camera.position);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('slider').appendChild(this.renderer.domElement);
    }

    setupComposer() {
        this.composer = new THREE.EffectComposer(this.renderer);
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        console.log("Effect Composer initialized");

        // Verify the shader passes
        const copyShaderPass = new THREE.ShaderPass(THREE.CopyShader);
        this.composer.addPass(copyShaderPass);
    }

    loadTextures() {
        const videoPaths = ["video/reel1.webm", "video/reel2.webm"];
        videoPaths.forEach((path, index) => {
            const video = document.createElement('video');
            video.src = path;
            video.loop = true;
            video.muted = true;
            video.play();

            video.onloadeddata = () => {
                const texture = new THREE.VideoTexture(video);
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.format = THREE.RGBFormat;

                console.log(`Loaded video texture from ${path}`);
                
                if (index === 0) {
                    this.video1 = texture;
                } else {
                    this.video2 = texture;
                }
                
                // Manually add the textures to the scene or material
                if (this.video1 && this.video2) {
                    this.createShaderMaterial();
                }
            };
        });
    }

    createShaderMaterial() {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture1: { value: this.video1 },
                uTexture2: { value: this.video2 },
                uProgress: { value: 0.0 }
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
                    vec4 color = mix(tex1, tex2, uProgress);
                    gl_FragColor = color;
                }
            `
        });

        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.composer.render();
    }
}

// Initialize the app
new VideoTransitionApp();
