(self.webpackChunk_roots_bud_sage_sage = self.webpackChunk_roots_bud_sage_sage || []).push([[143], {
    "./scripts/app.js": (e, t, s) => {
        "use strict";
        var i = s("../node_modules/@roots/sage/lib/client/dom-ready.js")
          , r = s("../node_modules/vanilla-lazyload/dist/lazyload.min.js")
          , o = s.n(r)
          , n = s("../node_modules/@unseenco/taxi/src/taxi.js")
          , a = s("../node_modules/@studio-freight/lenis/dist/lenis.modern.mjs")
          , l = s("../node_modules/throttle-debounce/esm/index.js");
        const h = {
            smoothScroll: null,
            router: null,
            navigating: !1,
            isFirstLoaded: !1,
            menuOpen: !1,
            pageScroll: [],
            previousWorksPage: null,
            detect: {
                uA: navigator.userAgent.toLowerCase(),
                get iPadIOS13() {
                    return "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1
                },
                get isMobile() {
                    return window.innerWidth < 1200
                },
                get isMobileAndroid() {
                    return /android.*mobile/.test(this.uA)
                },
                get isFirefox() {
                    return this.uA.indexOf("firefox") > -1
                },
                get isAndroid() {
                    return this.isMobileAndroid || !this.isMobileAndroid && /android/i.test(this.uA)
                },
                get safari() {
                    return this.uA.match(/version\/[\d.]+.*safari/)
                },
                get isSafari() {
                    return this.safari && !this.isAndroid
                }
            },
            lerp: (e, t, s) => e * (1 - s) + t * s,
            unequal: (e, t) => 0 !== h.round(Math.abs(t - e), 4),
            round: (e, t) => {
                const s = t ? Math.pow(10, t) : 100;
                return Math.round(e * s) / s
            }
            ,
            textures: [],
            prepareTextures: (e, t) => {
                h.textures[e] = {
                    toLoad: t,
                    loaded: 0
                }
            }
            ,
            cancelAnimation: e => {
                e && (e.pause(),
                e.invalidate(),
                e.kill())
            }
        };
        var d = h
          , c = s("../node_modules/gsap/index.js")
          , u = s("../node_modules/gsap/ScrollTrigger.js")
          , p = s("../node_modules/gsap/CustomEase.js")
          , m = s("../node_modules/tweakpane/dist/tweakpane.js")
          , g = s("../node_modules/@tweakpane/plugin-essentials/dist/tweakpane-plugin-essentials.js");
        c.ZP.registerEffect({
            name: "blink",
            effect: (e, t) => {
                const s = c.ZP.timeline({
                    defaults: {
                        duration: t.duration,
                        ease: t.ease,
                        stagger: t.stagger
                    }
                })
                  , i = t.opacity || 1;
                return s.set(e, {
                    opacity: 0
                }, 0).set(e, {
                    opacity: i
                }, .1).set(e, {
                    opacity: 0
                }, .2).set(e, {
                    opacity: i
                }, .27).set(e, {
                    opacity: 0
                }, .37).set(e, {
                    opacity: i
                }, .42).set(e, {
                    opacity: 0
                }, .46).set(e, {
                    opacity: i
                }, .5),
                s
            }
            ,
            defaults: {
                ease: "none",
                duration: 0
            },
            extendTimeline: !0
        });
        var v = s("../node_modules/tweakpane-image-plugin/dist/tweakpane-image-plugin.js")
          , y = s("../node_modules/tiny-emitter/index.js")
          , f = s.n(y)
          , $ = s("../node_modules/splitting/dist/splitting.js")
          , x = s.n($);
        class w {
            constructor() {
                this.getElems(),
                this.events(),
                this.onPageChange({
                    location: window.location
                }),
                this.isOpen = !1,
                this.isMobile = d.w.w < 768,
                this.setItems()
            }
            getElems() {
                this.$el = document.body.querySelector("header"),
                this.$mainOverlay = this.$el.querySelector(".header-mobile-overlay"),
                this.$overlay = this.$el.querySelector(".header-overlay"),
                this.$items = this.$el.querySelectorAll(".header-item"),
                this.$hLinks = this.$el.querySelectorAll(".h-link"),
                this.$toggler = this.$el.querySelector(".header-toggler"),
                this.$togglerOpen = this.$el.querySelector(".header-toggler-open"),
                this.$togglerClose = this.$el.querySelector(".header-toggler-close");
                for (let e = 0; e < this.$hLinks.length; e++)
                    new (x())({
                        target: this.$hLinks[e]
                    })
            }
            events() {
                this.$toggler && this.$toggler.addEventListener("click", this.onTogglerClick.bind(this)),
                this.$mainOverlay.addEventListener("click", this.close.bind(this))
            }
            onPageChange(e) {
                let {location: t} = e;
                this.activeIndex > -1 && this.$items[this.activeIndex].classList.remove("a"),
                this.activeIndex = -1;
                for (let e = 0; e < this.$items.length; e++)
                    this.$items[e].href === t.href && (this.activeIndex = e);
                this.isMobile && this.isOpen && this.close(),
                this.activeIndex > -1 && this.$items[this.activeIndex].classList.add("a")
            }
            setItems() {
                this.bounds = [],
                c.p8.set(this.$items, {
                    y: 0
                });
                for (let e = 0; e < this.$items.length; e++)
                    this.bounds.push({
                        y: d.w.h - this.$items[e].getBoundingClientRect().bottom + 1.5 * this.$items[e].offsetHeight
                    });
                !this.isOpen && this.isMobile && c.p8.set(this.$items, {
                    y: e => this.bounds[e].y
                })
            }
            onTogglerClick() {
                this.isOpen ? this.close() : this.open()
            }
            open() {
                d.menuOpen = !0,
                this.isOpen = !0,
                this.$el.style.zIndex = 19,
                this.animation && this.animation.isActive() && (this.animation.pause(),
                this.animation.invalidate(),
                this.animation.kill()),
                this.$mainOverlay.classList.add("opacity-75"),
                this.$mainOverlay.classList.remove("pointer-events-none"),
                this.animation = c.p8.timeline(),
                this.animation.to(this.$togglerOpen, {
                    opacity: 0,
                    duration: .3,
                    ease: "power2.out"
                }, 0).to(this.$togglerClose, {
                    opacity: 1,
                    duration: .3,
                    ease: "power2.out"
                }, .15).to(this.$overlay, {
                    opacity: 1,
                    duration: .2,
                    ease: "expo.out"
                }, 0).to(this.$items, {
                    y: 0,
                    stagger: 0,
                    duration: .8,
                    ease: "expo.out"
                }, 0).fromTo(this.$items, {
                    rotate: e => e % 2 == 0 ? -5 : 5
                }, {
                    rotate: 0,
                    duration: .8,
                    ease: "expo.out"
                }, 0)
            }
            close() {
                d.menuOpen = !1,
                this.isOpen = !1,
                this.animation && this.animation.isActive() && (this.animation.pause(),
                this.animation.invalidate(),
                this.animation.kill()),
                this.$mainOverlay.classList.remove("opacity-75"),
                this.$mainOverlay.classList.add("pointer-events-none"),
                this.animation = c.p8.timeline({
                    onComplete: () => {
                        this.$el.style.zIndex = 17
                    }
                }),
                this.animation.to(this.$togglerClose, {
                    opacity: 0,
                    duration: .3,
                    ease: "power2.out"
                }, 0).to(this.$togglerOpen, {
                    opacity: 1,
                    duration: .3,
                    ease: "power2.out"
                }, .15).to(this.$overlay, {
                    opacity: 0,
                    duration: .4,
                    ease: "expo.out"
                }, 0).to(this.$items, {
                    y: e => this.bounds[e].y,
                    duration: .8,
                    ease: "expo.out"
                }, 0).to(this.$items, {
                    rotate: e => e % 2 ? 5 : -5,
                    duration: .8,
                    ease: "expo.out"
                }, 0)
            }
            setHeaderElements() {
                c.p8.set(this.$overlay, {
                    opacity: 0
                }),
                this.isMobile ? (this.isOpen = !1,
                c.p8.set(this.$items, {
                    y: e => this.bounds[e].y
                }),
                c.p8.set(this.$togglerOpen, {
                    opacity: 1
                }),
                c.p8.set(this.$togglerClose, {
                    opacity: 0
                })) : (c.p8.set(this.$overlay, {
                    opacity: 0
                }),
                c.p8.set(this.$items, {
                    y: 0,
                    rotate: 0
                }))
            }
            resize() {
                this.setItems(),
                d.w.w < 768 && !this.isMobile ? (this.isMobile = !0,
                this.setHeaderElements()) : d.w.w >= 768 && this.isMobile && (this.isMobile = !1,
                this.setHeaderElements())
            }
        }
        var b = s("../node_modules/three/build/three.module.js")
          , S = s("../node_modules/three/examples/jsm/loaders/GLTFLoader.js")
          , L = s("../node_modules/three/examples/jsm/controls/OrbitControls.js");
        class T {
            constructor() {
                this.gl = new O,
                this.scene = this.gl.scene,
                this.canvas = this.gl.canvas,
                this.setInstance()
            }
            setInstance() {
                const {w: e, h: t} = d.w
                  , s = 2 * Math.atan(t / 2 / 500) * 180 / Math.PI;
                this.instance = new b.cPb(s,e / t,1,1e3),
                this.instance.position.set(0, 0, 500),
                this.scene.add(this.instance)
            }
            setOrbitControls() {
                this.controls = new L.z(this.instance,this.canvas),
                this.controls.enableDamping = !0,
                this.canvas.style.pointerEvents = "all"
            }
            resize() {
                const e = 2 * Math.atan(d.w.h / 2 / 500) * 180 / Math.PI;
                this.instance.fov = e,
                this.instance.aspect = d.w.w / d.w.h,
                this.instance.updateProjectionMatrix()
            }
            update() {
                this.controls && this.controls.update()
            }
        }
        class k {
            constructor() {
                this.gl = d.GL,
                this.canvas = this.gl.canvas,
                this.scene = this.gl.scene,
                this.camera = this.gl.camera,
                this.setInstance()
            }
            setInstance() {
                this.instance = new b.CP7({
                    canvas: this.canvas,
                    alpha: !0,
                    antialias: !0
                }),
                this.instance.setSize(d.w.w, d.w.h),
                this.instance.setPixelRatio(d.w.pR)
            }
            resize() {
                this.instance.setSize(d.w.w, d.w.h),
                this.instance.setPixelRatio(d.w.pR)
            }
            update() {
                d.renderToBuffer || this.instance.render(this.scene, this.camera.instance)
            }
        }
        class C {
            constructor() {
                document.body.classList.add("debug"),
                this.gl = d.GL,
                this.addDebugUI(),
                this.addDebugScene()
            }
            addDebugUI() {
                d.debug.addButton({
                    title: "Show debug UI 👀"
                }).on("click", ( () => document.body.classList.toggle("debug")))
            }
            addDebugScene() {
                const e = d.debug.addFolder({
                    title: "Scene 👀"
                });
                this.sceneChildrens = e.addBlade({
                    view: "text",
                    label: "Childrens",
                    parse: e => String(e),
                    value: "0",
                    disabled: !0
                })
            }
            setSceneChildrens(e) {
                this.sceneChildrens.controller_.valueController.value.rawValue = e
            }
            addDebugCamera() {
                const e = document.querySelector(".viewport-debug")
                  , t = d.debug.addFolder({
                    title: "Camera 📹"
                }).addButton({
                    title: "Toggle debug view"
                });
                let s = !1;
                t.on("click", ( () => {
                    s = !s,
                    e.classList.toggle("a", s),
                    this.gl.camera.instance.position.z = s ? 1e3 : 500
                }
                ))
            }
        }
        var P = s("../node_modules/three/examples/jsm/postprocessing/EffectComposer.js")
          , A = s("../node_modules/three/examples/jsm/postprocessing/RenderPass.js")
          , M = s("../node_modules/three/examples/jsm/postprocessing/Pass.js")
          , E = s("./scripts/GL/shaders/stretch/stretch.frag")
          , I = s.n(E)
          , F = s("./scripts/GL/shaders/stretch/stretch.vert")
          , z = s.n(F);
        class R extends b.jyz {
            constructor() {
                super({
                    uniforms: {
                        tDiffuse: {
                            value: null
                        },
                        uProgress: {
                            value: .9
                        },
                        uResolution: {
                            value: new b.FM8(1,1)
                        }
                    },
                    transparent: !0,
                    fragmentShader: I(),
                    vertexShader: z()
                })
            }
        }
        class q extends M.w {
            constructor() {
                super(),
                this.progressLerp = 0,
                this.material = new R,
                this.fsQuad = new M.T(this.material)
            }
            dispose() {
                this.material.dispose(),
                this.fsQuad.dispose()
            }
            render(e, t, s) {
                this.material.uniforms.tDiffuse.value = s.texture;
                const i = Math.abs(c.p8.utils.clamp(-1, 1, c.p8.utils.mapRange(-20, 20, -1, 1, d.smoothScroll.velocity)));
                this.progressLerp = d.lerp(this.progressLerp, i, .09),
                this.renderToScreen ? (e.setRenderTarget(null),
                this.fsQuad.render(e)) : (e.setRenderTarget(t),
                this.clear && e.clear(),
                this.fsQuad.render(e))
            }
        }
        class D {
            constructor() {
                this.gl = new O,
                this.scene = this.gl.scene,
                this.camera = this.gl.camera.instance,
                this.renderer = this.gl.renderer.instance,
                this.instance = new P.x(this.renderer),
                this.renderPass = new A.C(this.scene,this.camera),
                this.stretchPass = new q(this.scene,this.camera),
                this.instance.addPass(this.renderPass),
                this.instance.addPass(this.stretchPass)
            }
            update() {
                this.instance.render()
            }
        }
        let V = null;
        class O {
            constructor(e) {
                if (V)
                    return V;
                V = this,
                d.GL = this,
                window.GL = this,
                this.w = {
                    ww: window.innerWidth,
                    wh: window.innerHeight,
                    pR: Math.min(window.devicePixelRatio, 1.5)
                },
                this.canvas = e.canvas,
                this.useComposer = !0,
                this.cache = {},
                this.planes = [],
                this.createLoaders(),
                this.scene = new b.xsS,
                this.scene.name = "scene",
                this.camera = new T,
                this.renderer = new k,
                this.composer = new D,
                d.showDebug && (this.debug = new C)
            }
            createLoaders() {
                this.textureLoader = new b.dpR,
                this.gltfLoader = new S.E
            }
            resize() {
                this.camera.resize(),
                this.renderer.resize();
                for (let e = 0; e < this.planes.length; e++)
                    this.planes[e].resize()
            }
            update() {
                this.camera.update(),
                this.useComposer ? this.composer.update() : this.renderer.update()
            }
            destroy() {}
        }
        var U = s("./scripts/GL/shaders/plane/plane.vert")
          , W = s.n(U)
          , B = s("./scripts/GL/shaders/plane/plane.frag")
          , G = s.n(B)
          , _ = s("./scripts/GL/shaders/plane/planeContain.frag")
          , X = s.n(_)
          , j = s("./scripts/GL/shaders/plane/planeHome.frag")
          , N = s.n(j);
        class H {
            constructor(e) {
                let {dom: t, smallDom: s, videoUrl: i, domNext: r, index: o, image: n, format: a, detectInView: l=!0, onVideoLoaded: h, onViewportIntersect: c, isHome: u, lazy: p=!1, contain: m=!1} = e;
                this.dom = t,
                this.smallDom = s,
                this.videoUrl = i,
                this.index = o,
                this.format = a,
                this.detectInView = l,
                this.onVideoLoaded = h,
                this.onViewportIntersect = c,
                this.isHome = u,
                this.domNext = r,
                this.lazy = p,
                this.contain = m,
                this.image = {
                    url: n ? n.url : this.dom.dataset.url,
                    width: n ? n.width : this.dom.dataset.width,
                    height: n ? n.height : this.dom.dataset.height
                },
                this.dom.dataset.urlLarge && (this.image.large = {
                    url: this.dom.dataset.urlLarge
                }),
                this.disableScrollTrigger = !1,
                this.textureLoaded = !1,
                this.videoLoaded = !1,
                this.updated = !1,
                this.location = window.location.pathname,
                this.gl = d.GL,
                this.gl.cache[this.location] || (this.gl.cache[this.location] = []),
                void 0 !== this.index && (this.gl.cache[this.location][this.index] = this.gl.cache[this.location][this.index] || {},
                this.currentCache = this.gl.cache[this.location][this.index]),
                this.gl.planes.push(this),
                this.currentCache && this.currentCache.mesh ? (this.mesh = this.currentCache.mesh,
                this.material = this.currentCache.material,
                this.geometry = this.currentCache.geometry,
                this.texture = this.currentCache.texture,
                this.textureLoaded = this.currentCache.textureLoaded,
                this.videoLoaded = this.currentCache.videoLoaded,
                this.material.uniforms.uAlpha.value = 1,
                this.video = this.currentCache.video,
                this.video && (this.video.currentTime = 0),
                this.gl.scene.add(this.mesh)) : this.createMesh(),
                this.setData(),
                this.detectInView && this.checkInView()
            }
            createVideoTexture(e) {
                this.video = e,
                this.currentCache && (this.currentCache.video = e),
                this.isHome ? (this.videoTexture = new b.fO1(e),
                this.material.uniforms.uTexture.value = this.videoTexture,
                this.material.uniforms.uImageSize.value = new b.FM8(e.videoWidth,e.videoHeight)) : (this.videoTexture = d.videoTexture,
                this.material.uniforms.uVideoTexture.value = this.videoTexture,
                this.material.uniforms.uVideoSize.value = new b.FM8(e.videoWidth,e.videoHeight))
            }
            createUniforms() {
                return this.isHome ? this.uniforms = {
                    uTexture: {
                        value: ""
                    },
                    uVideoTexture: {
                        value: ""
                    },
                    uOpacity: {
                        value: 0
                    },
                    uAlpha: {
                        value: 1
                    },
                    uTime: {
                        value: 0
                    },
                    uPower: {
                        value: 0
                    },
                    uSide: {
                        value: 0
                    },
                    uSideReverse: {
                        value: -1
                    },
                    uDistProgress: {
                        value: 0
                    },
                    uMeshSize: {
                        value: new b.FM8(0,0)
                    },
                    uVideoSize: {
                        value: new b.FM8(1920,1080)
                    },
                    uImageSize: {
                        value: new b.FM8(this.image.width,this.image.height)
                    }
                } : this.uniforms = {
                    uActive: {
                        value: 1
                    },
                    uAlpha: {
                        value: 1
                    },
                    uProgress: {
                        value: 0
                    },
                    uMeshSize: {
                        value: new b.FM8(0,0)
                    },
                    uImageSize: {
                        value: new b.FM8(this.image.width,this.image.height)
                    },
                    uVideoSize: {
                        value: new b.FM8(1920,1080)
                    },
                    uVideoFormat: {
                        value: "contain" === this.format ? 0 : 1
                    },
                    uTexture: {
                        value: ""
                    },
                    uVideoTexture: {
                        value: ""
                    },
                    uFade: {
                        value: 0
                    },
                    uScale: {
                        value: 1
                    },
                    uParallaxX: {
                        value: 0
                    },
                    uParallaxY: {
                        value: 0
                    },
                    uParallaxAmount: {
                        value: 1
                    },
                    uTranslateY: {
                        value: 0
                    },
                    uPower: {
                        value: 0
                    },
                    uPowerVideo: {
                        value: 0
                    },
                    uSide: {
                        value: 0
                    },
                    uSideReverse: {
                        value: -1
                    },
                    uDistProgress: {
                        value: 0
                    },
                    uDistProgressVideo: {
                        value: 0
                    }
                },
                this.uniforms
            }
            createMesh() {
                this.createUniforms();
                const e = this.contain ? X() : G();
                this.material = new b.jyz({
                    vertexShader: W(),
                    fragmentShader: this.isHome ? N() : e,
                    transparent: !0,
                    uniforms: this.uniforms
                }),
                this.geometry = new b._12(1,1,1,1),
                this.mesh = new b.Kj0(this.geometry,this.material),
                this.currentCache && (this.currentCache.mesh = this.mesh,
                this.currentCache.material = this.material,
                this.currentCache.geometry = this.geometry),
                this.gl.scene.add(this.mesh)
            }
            toggleVideoTexture(e) {
                this.material.uniforms.uVideoTexture.value = e ? this.videoTexture : null,
                this.material.uniforms.uVideoTexture.value && (this.material.uniforms.uVideoTexture.value.needsUpdate = !0)
            }
            load() {
                return new Promise((e => {
                    if (this.lazy) {
                        this.mesh.material.uniforms.uAlpha.value = 0;
                        const t = c.ZP.to(this.mesh.material.uniforms.uAlpha, {
                            paused: !0,
                            value: 1,
                            ease: "power2.out",
                            duration: .6
                        });
                        d.scrollTrigger.create({
                            trigger: this.dom,
                            start: "top-=" + .5 * d.w.h + " bottom",
                            once: !0,
                            onEnter: () => {
                                this.loadTexture().then(( () => {
                                    this.isVisible && t.play(),
                                    e()
                                }
                                )),
                                d.scrollTrigger.create({
                                    trigger: this.dom,
                                    start: "top+=" + .1 * d.w.h + " bottom",
                                    once: !0,
                                    onEnter: () => {
                                        this.isVisible = !0,
                                        this.textureLoaded && t.play()
                                    }
                                })
                            }
                        })
                    } else
                        this.loadTexture().then(( () => e()))
                }
                ))
            }
            loadTexture() {
                return new Promise((e => {
                    if (this.textureLoaded)
                        this.setLoaded(),
                        e();
                    else {
                        const t = this.image.url && this.image.url.replace("http://firm.localhost", "");
                        t ? this.gl.textureLoader.load(t, (t => {
                            t.minFilter = b.wem,
                            t.magFilter = b.wem,
                            t.generateMipmaps = !1,
                            this.texture = t,
                            this.material.uniforms.uTexture.value = t,
                            this.textureLoaded = !0,
                            this.currentCache && (this.currentCache.texture = this.texture,
                            this.currentCache.textureLoaded = this.textureLoaded),
                            this.setLoaded(),
                            e()
                        }
                        ), ( () => {}
                        ), (e => {
                            console.log(e)
                        }
                        )) : (this.texture = null,
                        this.material.uniforms.uTexture.value = null,
                        this.textureLoaded = !0,
                        this.currentCache && (this.currentCache.texture = this.texture,
                        this.currentCache.textureLoaded = this.textureLoaded),
                        this.setLoaded(),
                        e())
                    }
                }
                ))
            }
            setLoaded() {
                d.textures[window.location.pathname] && d.textures[window.location.pathname].loaded++,
                d.textures[window.location.pathname] && d.textures[window.location.pathname].loaded === d.textures[window.location.pathname].toLoad && setTimeout(( () => {}
                ), 0)
            }
            getBounds(e) {
                const t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? d.smallScroll : window.scrollY
                  , s = e.getBoundingClientRect()
                  , i = s.top + window.scrollY - d.w.h;
                return {
                    dom: s,
                    gl: {
                        top: i,
                        bottom: Math.min(i, 0) + s.height + d.w.h + Math.max(i, 0),
                        x: s.left - d.w.w / 2 + s.width / 2,
                        y: -s.top + d.w.h / 2 - s.height / 2 - t,
                        w: s.width,
                        h: s.height
                    }
                }
            }
            setBounds() {
                const e = {
                    large: this.getBounds(this.dom),
                    small: this.smallDom && this.getBounds(this.smallDom, !0)
                };
                return this.bounds = e,
                e
            }
            setData() {
                const e = this.setBounds();
                return this.isHome && this.video ? this.mesh.material.uniforms.uImageSize.value = new b.FM8(this.video.videoWidth,this.video.videoHeight) : this.mesh.material.uniforms.uImageSize.value = new b.FM8(this.image.width,this.image.height),
                this.mesh.material.uniforms.uMeshSize.value = new b.FM8(e.large.dom.width,e.large.dom.height),
                this.mesh.position.set(e.large.gl.x, e.large.gl.y, 0),
                this.mesh.scale.set(e.large.dom.width, e.large.dom.height, 1),
                e
            }
            updateProps(e) {
                let {dom: t, smallDom: s, index: i, detectInView: r=!0} = e;
                this.updated = !0,
                t && (this.dom = t),
                s && (this.smallDom = s),
                this.index = i,
                this.dom.dataset.urlLarge && (this.image.large = {
                    url: this.dom.dataset.urlLarge
                }),
                this.setBounds(),
                r && this.checkInView()
            }
            checkInView() {
                if (this.sT && this.sT.kill(),
                "next" === this.index && this.domNext) {
                    const e = c.ZP.fromTo(this.mesh.material.uniforms.uTranslateY, {
                        value: .05
                    }, {
                        value: 0,
                        ease: "linear"
                    });
                    this.parallaxST = d.scrollTrigger.create({
                        trigger: this.domNext,
                        scrub: !0,
                        start: "top bottom",
                        end: "bottom bottom",
                        animation: e
                    })
                }
                this.sT = d.scrollTrigger.create({
                    trigger: this.dom,
                    onEnter: () => {
                        this.inView = !0,
                        this.disableScrollTrigger || (this.mesh.visible = !0,
                        this.addMesh()),
                        this.onViewportIntersect && this.onViewportIntersect(!0)
                    }
                    ,
                    onEnterBack: () => {
                        this.inView = !0,
                        this.disableScrollTrigger || this.addMesh(),
                        this.onViewportIntersect && this.onViewportIntersect(!0)
                    }
                    ,
                    onLeave: () => {
                        this.inView = !1,
                        this.disableScrollTrigger || this.removeMesh(),
                        this.onViewportIntersect && this.onViewportIntersect(!1)
                    }
                    ,
                    onLeaveBack: () => {
                        this.inView = !1,
                        this.disableScrollTrigger || this.removeMesh(),
                        this.onViewportIntersect && this.onViewportIntersect(!1)
                    }
                }),
                this.mesh.visible = this.sT.isActive || !1
            }
            removeMesh() {
                this.mesh.visible = !1,
                this.gl.scene.remove(this.mesh)
            }
            addMesh() {
                this.mesh.visible = !0,
                !this.mesh.parent && this.gl.scene.add(this.mesh)
            }
            remove() {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.mesh.visible && !e ? c.ZP.to(this.mesh.material.uniforms.uAlpha, {
                    value: 0,
                    ease: "power2.out",
                    duration: .4,
                    onComplete: () => {
                        this.dispose()
                    }
                }) : this.dispose()
            }
            dispose() {
                this.mesh.material.uniforms.uFade && c.ZP.set(this.mesh.material.uniforms.uFade, {
                    value: 0
                }),
                this.sT && this.sT.kill(),
                this.material.uniforms.uTexture.value && this.material.uniforms.uTexture.value.dispose(),
                this.material.dispose(),
                this.geometry.dispose(),
                this.gl.scene.remove(this.mesh)
            }
            resize() {
                this.setData()
            }
            update() {}
        }
        class Y {
            constructor(e, t) {
                this.$el = e,
                this.destroyLast = t,
                this.bindMethods(),
                this.getElems(),
                this.init(),
                this.events()
            }
            onEnterCompleted() {}
            bindMethods() {}
            appear() {}
            getElems() {}
            init() {}
            events() {}
            destroy() {}
            resize() {}
            resizeX() {}
            scroll() {}
            scrollEnd() {}
            update() {}
        }
        class K {
            constructor(e) {
                let {el: t, parent: s} = e;
                this.$el = t,
                this.$parent = s,
                this.bindMethods(),
                this.getElems(),
                this.events();
                const i = d.w.w / 2 - this.$el.offsetWidth / 2
                  , r = d.w.h / 2 - this.$el.offsetHeight / 2;
                this.mouse = {
                    x: i,
                    y: r,
                    rect: this.$el.getBoundingClientRect(),
                    moving: !1,
                    canMove: !!this.$parent && this.$parent.getBoundingClientRect().top < d.w.h,
                    lerp: {
                        x: i,
                        y: r
                    }
                },
                d.detect.isMobile || (this.$el.style.transform = `translate(${i}px, ${r + window.scrollY}px)`,
                this.$el.classList.remove("xl:opacity-0"))
            }
            bindMethods() {
                this.move = this.move.bind(this),
                this.onEnter = this.onEnter.bind(this),
                this.onLeave = this.onLeave.bind(this)
            }
            getElems() {
                this.$text = this.$el.querySelector(".cursor-text"),
                this.$loading = this.$el.querySelector(".cursor-loading")
            }
            events() {
                !d.detect.isMobile && window.addEventListener("mousemove", this.move),
                this.$parent && (this.$parent.addEventListener("mouseenter", this.onEnter),
                this.$parent.addEventListener("mouseleave", this.onLeave))
            }
            off() {
                !d.detect.isMobile && window.removeEventListener("mousemove", this.move)
            }
            setLoading() {
                let e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.isLoadingState !== e && (this.isLoadingState = e,
                d.cancelAnimation(this.setLoadingAnimation),
                this.setLoadingAnimation = c.p8.timeline({
                    defaults: {
                        ease: "power2.out",
                        duration: .3
                    }
                }),
                this.setLoadingAnimation.to(this.$text, {
                    opacity: e ? 0 : 1
                }, e ? 0 : .2).to(this.$loading, {
                    opacity: e ? 1 : 0
                }, e ? .2 : 0))
            }
            show() {
                this.$el.classList.remove("xl:opacity-0")
            }
            hide() {
                this.$el.classList.add("xl:opacity-0")
            }
            onEnter(e) {
                this.mouse.canMove = !0,
                this.show(),
                this.mouse.x = e.clientX + 10,
                this.mouse.y = e.clientY + 10
            }
            onLeave() {
                this.mouse.canMove = !1,
                this.hide()
            }
            move(e) {
                this.mouse.canMove && (this.mouse.x = e.clientX - this.mouse.rect.width / 2,
                this.mouse.y = e.clientY - this.mouse.rect.height / 2)
            }
            update() {
                const {lerp: e, x: t, y: s} = this.mouse;
                e.x = d.lerp(e.x, t, .2),
                e.y = d.lerp(e.y, s, .2),
                d.unequal(t, e.x) || d.unequal(s, e.y) ? (this.mouse.moving = !0,
                this.$el.style.transform = `translate3d(${e.x}px, ${e.y + window.scrollY}px, 0)`) : this.mouse.moving ? (this.mouse.moving = !1,
                this.$el.style.transform = `translate(${e.x}px, ${e.y + window.scrollY}px)`) : 0 !== d.smoothScroll.velocity && this.mouse.canMove && (this.$el.style.transform = `translate(${e.x}px, ${e.y + window.scrollY}px)`)
            }
        }
        class Z {
            constructor() {
                this.fetch = fetch;
                const e = new URLSearchParams(window.location.search)
                  , t = e.get("category")
                  , s = e.get("page");
                this.currentFilter = t,
                this.currentPage = s
            }
            updateHistoryState(e, t) {
                const s = new URL(`${window.location.origin}${window.location.pathname}`);
                e && s.searchParams.set("category", e),
                t && s.searchParams.set("page", t),
                t > -1 && (d.previousWorksPage = s.href,
                window.history.pushState({}, "", s))
            }
            fetchPosts(e, t) {
                let s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return new Promise((i => {
                    this.url = `${window.location.origin}/wp-json/beaucoup/v1/fetchworks`,
                    this.currentFilter = e,
                    this.results = fetch(this.url, {
                        method: "POST",
                        body: JSON.stringify({
                            category: e,
                            search: s,
                            page: t
                        })
                    }).then((e => e.json().then((e => {
                        this.updateHistoryState(this.currentFilter, t),
                        i(e)
                    }
                    ))))
                }
                ))
            }
        }
        class Q extends Y {
            init() {
                this.destroyLast = !0,
                this.currentSubterms = null,
                this.isFilterOpen = !1,
                this.canSearch = !0,
                this.isEmpty = !0,
                this.hasSearch = !1,
                this.oldSearch = "",
                this.isMobile = d.w.w < 768,
                this.filter = new Z,
                this.total = this.$el.dataset.totalPages,
                this.page = this.filter.currentPage || 1,
                this.currentFilterIndex = 0;
                const e = d.pageScroll[window.location.pathname + window.location.search];
                if (d.previousWorksPage = d.router ? d.router.targetLocation.href : window.location.href,
                this.isScrolled = void 0 !== e && 0 !== e && d.isWorkPrevious,
                d.isFirstLoaded && d.isWorkPrevious && this.manageScrollRestoration(),
                d.GL.composer.stretchPass.material.uniforms.uProgress.value = 0,
                this.setFilterElements(),
                this.$el.dataset.parent) {
                    const e = this.termsIds.indexOf(this.filter.currentFilter);
                    e > -1 && (this.currentFilterIndex = e)
                } else
                    for (let e = 0; e < this.subtermsIds.length; e++) {
                        const t = this.subtermsIds[e].indexOf(this.filter.currentFilter);
                        t > -1 && (this.currentParentIndex = e,
                        this.currentFilterIndex = t)
                    }
                if (this.$el.dataset.id && (this.filter.currentFilter = this.$el.dataset.id),
                this.loadST = d.scrollTrigger.create({
                    trigger: this.$loadMore,
                    start: "top bottom-=50px",
                    onEnter: () => {
                        this.page++,
                        this.fetch(this.filter.currentFilter, this.page)
                    }
                }),
                parseInt(this.page) === parseInt(this.total) && (this.loadST.disable(),
                this.$loadMore.classList.add("hidden")),
                !this.isScrolled)
                    for (let e = 0; e < this.newPlanes.length; e++) {
                        const t = this.newPlanes[e];
                        d.scrollTrigger.isInViewport(this.cards[e].dom) ? (c.p8.set(t.mesh.material.uniforms.uAlpha, {
                            value: 0
                        }),
                        c.p8.set(this.cards[e].dom, {
                            opacity: 0
                        })) : this.cards[e].dom.classList.add("opacity-0")
                    }
            }
            bindMethods() {
                this.onFetch = this.onFetch.bind(this),
                this.onKey = this.onKey.bind(this),
                this.onSearch = this.onSearch.bind(this),
                this.onSearchClick = this.onSearchClick.bind(this),
                this.onOverlayClick = this.onOverlayClick.bind(this),
                this.onKeySearch = this.onKeySearch.bind(this),
                this.onReset = this.onReset.bind(this)
            }
            getElems() {
                this.subCategories = [],
                this.cards = [],
                this.$lines = this.$el.querySelector(".lines-w"),
                this.$termsWrapper = this.$el.querySelector(".terms"),
                this.$terms = this.$el.querySelectorAll(".term"),
                this.$termsW = this.$el.querySelectorAll(".term-w"),
                this.$wrapper = this.$el.querySelector(".works-cards"),
                this.$parentTerms = this.$el.querySelectorAll(".parent-term"),
                this.$parentTermsIcons = this.$el.querySelectorAll(".parent-term-icon"),
                this.$subtermsWrapper = this.$el.querySelectorAll(".subterms"),
                this.$overlay = this.$el.querySelector(".overlay"),
                this.$loadMore = this.$el.querySelector(".works-load"),
                this.$toggler = this.$el.querySelector(".terms-button"),
                this.$filterOverlay = this.$el.querySelector(".filter-top-overlay"),
                this.$cards = this.$el.querySelectorAll(".card-work"),
                this.$planes = this.$el.querySelectorAll(".plane"),
                this.$cardsOverlay = this.$el.querySelector(".works-overlay"),
                this.$search = this.$el.querySelector("#search"),
                this.$searchWrapper = this.$el.querySelector(".search-wrapper"),
                this.$searchText = this.$el.querySelector(".search-text"),
                this.$searchMsg = this.$el.querySelector(".search-msg"),
                this.$searchReset = this.$el.querySelector(".search-reset"),
                this.$searchOverlay = this.$el.querySelector(".search-overlay"),
                this.$searchReset && this.$searchOverlay && c.p8.set([this.$searchReset, this.$searchOverlay], {
                    autoAlpha: 0
                }),
                this.termsIds = [],
                this.subtermsIds = [];
                for (let e = 0; e < this.$terms.length; e++)
                    this.termsIds.push(this.$terms[e].dataset.id);
                !d.detect.isMobile && this.setCardsEvent(this.$cards);
                for (let e = 0; e < this.$parentTerms.length; e++) {
                    const t = []
                      , s = []
                      , i = this.$subtermsWrapper[e].querySelectorAll(".subterm");
                    this.subtermsIds[e] = [],
                    c.p8.set(i, {
                        autoAlpha: 0
                    });
                    for (let r = 0; r < i.length; r++)
                        this.subtermsIds[e].push(i[r].dataset.id),
                        t.push(new (x())({
                            target: i[e].children[0]
                        })),
                        s.push(new (x())({
                            target: i[e].children[1]
                        }));
                    this.subCategories.push({
                        wrapper: this.$subtermsWrapper[e],
                        parent: this.$parentTerms[e],
                        icon: this.$parentTermsIcons[e],
                        termsDom: i,
                        terms: t,
                        numbers: s
                    })
                }
            }
            events() {
                document.body.addEventListener("keydown", this.onKey),
                this.$overlay.addEventListener("click", ( () => {
                    this.close(null, this.isMobile && null !== this.currentSubterms)
                }
                )),
                this.$toggler.addEventListener("click", this.onTogglerClick.bind(this, void 0, !0)),
                this.$search && this.$search.addEventListener("keyup", this.onKeySearch),
                this.$searchReset && this.$searchReset.addEventListener("click", this.onReset),
                this.$searchText && this.$searchText.addEventListener("click", this.onSearchClick),
                this.$searchOverlay && this.$searchOverlay.addEventListener("click", this.onOverlayClick);
                for (let e = 0; e < this.$terms.length; e++)
                    this.$terms[e].addEventListener("click", this.onTermClick.bind(this, e));
                for (let e = 0; e < this.subCategories.length; e++) {
                    const {termsDom: t, parent: s} = this.subCategories[e];
                    s.addEventListener("click", this.onParentClick.bind(this, e));
                    for (let s = 0; s < t.length; s++)
                        t[s].addEventListener("click", this.onSubtermClick.bind(this, e, s))
                }
            }
            destroy() {
                this.setScrollValue();
                for (let e = 0; e < this.cards.length; e++) {
                    const {plane: t} = this.cards[e];
                    t.remove(!0)
                }
            }
            appear() {
                if (!this.isScrolled) {
                    const e = c.p8.timeline({
                        onComplete: () => {
                            d.smoothScroll.resize()
                        }
                    });
                    for (let t = 0; t < this.newPlanes.length; t++) {
                        const s = this.newPlanes[t];
                        d.scrollTrigger.isInViewport(this.cards[t].dom) ? e.fromTo(s.bounds.large.gl, {
                            y: s.bounds.large.gl.y - 1.8 * s.bounds.large.gl.h
                        }, {
                            y: s.bounds.large.gl.y,
                            duration: 1.3,
                            ease: "beaucoup.out"
                        }, .06 * t).fromTo(this.cards[t].dom, {
                            yPercent: 180
                        }, {
                            yPercent: 0,
                            duration: 1.3,
                            ease: "beaucoup.out"
                        }, .06 * t).fromTo(s.mesh.material.uniforms.uAlpha, {
                            value: 0
                        }, {
                            value: 1,
                            duration: 1,
                            ease: "beaucoup.out"
                        }, .1 * t).fromTo(this.cards[t].dom, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            duration: 1,
                            ease: "beaucoup.out"
                        }, .1 * t) : this.cards[t].dom.classList.remove("opacity-0")
                    }
                }
            }
            onSearchClick() {
                d.cancelAnimation(this.hideSearch),
                this.resetSearch(),
                this.showSearch = c.p8.timeline(),
                this.showSearch.to(this.$searchOverlay, {
                    autoAlpha: .75,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchText, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchWrapper, {
                    autoAlpha: 1,
                    ease: "beaucoup.alpha",
                    duration: .3,
                    onStart: () => {
                        this.$searchWrapper.classList.remove("xl:pointer-events-none"),
                        setTimeout(( () => {
                            this.$search.focus()
                        }
                        ), 100)
                    }
                }, .2)
            }
            onOverlayClick() {
                d.cancelAnimation(this.showSearch),
                this.hideSearch = c.p8.timeline(),
                this.$searchWrapper.classList.add("xl:pointer-events-none"),
                this.hideSearch.to(this.$searchOverlay, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchWrapper, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchText, {
                    autoAlpha: 1,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, .2)
            }
            onReset() {
                this.currentParentIndex > -1 ? this.onSubtermClick(this.currentParentIndex, this.currentFilterIndex) : this.onTermClick(this.currentFilterIndex),
                this.resetSearch(),
                this.$search.focus()
            }
            onKeySearch(e) {
                "Enter" === e.key ? this.onSearch() : "Escape" === e.key ? this.onReset() : 0 === this.$search.value.length ? (this.isEmpty = !0,
                d.cancelAnimation(this.searchA),
                this.searchA = c.p8.to(this.$searchReset, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                })) : this.$search.value.length > 0 && this.isEmpty && (this.isEmpty = !1,
                d.cancelAnimation(this.searchA),
                this.searchA = c.p8.to(this.$searchReset, {
                    autoAlpha: 1,
                    ease: "beaucoup.alpha",
                    duration: .3
                }))
            }
            onSearch() {
                if (!this.canSearch || this.oldSearch === this.$search.value)
                    return;
                const e = this.$search.value;
                this.canSearch = !1,
                this.hasSearch = !0,
                this.onOverlayClick(),
                this.fetch(this.filter.currentFilter, -1, null, !1, e)
            }
            resetSearch() {
                this.$search && (this.$search.value = "",
                this.oldSearch = "",
                this.isEmpty = !0,
                d.cancelAnimation(this.searchA),
                this.searchA = c.p8.to(this.$searchReset, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }))
            }
            setScrollValue() {
                d.pageScroll[window.location.pathname + window.location.search] = this.hasSearch ? 0 : d.smoothScroll.animate.value
            }
            manageScrollRestoration() {
                const e = window.location.pathname + window.location.search;
                void 0 !== d.pageScroll[e] && window.scrollTo({
                    top: d.pageScroll[e]
                })
            }
            onTermClick(e) {
                const t = this.$terms[e].dataset.id;
                this.currentFilterIndex = e,
                this.currentParentIndex = -1,
                this.isMobile && null === this.currentSubterms && this.onTogglerClick(!1),
                null !== this.currentSubterms && this.close(this.currentSubterms),
                this.resetSearch(),
                (this.filter.currentFilter !== t || this.filter.currentFilter === t && this.hasSearch) && this.fetch(t, 1, e),
                this.hasSearch = !1
            }
            onSubtermClick(e, t) {
                const s = this.subCategories[e].termsDom[t].dataset.id;
                if (this.currentFilterIndex = t,
                this.currentParentIndex = e,
                this.close(this.currentSubterms),
                this.isMobile && this.onTogglerClick(!1),
                this.resetSearch(),
                this.filter.currentFilter !== s || this.filter.currentFilter === s && this.hasSearch) {
                    for (let s = 0; s < this.subCategories.length; s++)
                        if (s === e)
                            for (let e = 0; e < this.subCategories[s].termsDom.length; e++)
                                this.subCategories[s].termsDom[e].classList.toggle("a", e === t);
                        else
                            for (let e = 0; e < this.subCategories[s].termsDom.length; e++)
                                this.subCategories[s].termsDom[e].classList.remove("a");
                    this.fetch(s, 1, e, !0)
                }
                this.hasSearch = !1
            }
            onParentClick(e) {
                const {termsDom: t, wrapper: s, icon: i} = this.subCategories[e]
                  , r = this.currentSubterms;
                if (d.cancelAnimation(this.openSubterms),
                null !== this.currentSubterms) {
                    const t = this.isMobile || null !== e && e !== r;
                    this.close(this.currentSubterms, t)
                }
                r !== e && (i.classList.add("a"),
                s.classList.remove("pointer-events-none"),
                this.$overlay.classList.remove("pointer-events-none"),
                this.currentSubterms = e,
                this.openSubterms = c.p8.timeline(),
                this.openSubterms.to(this.$overlay, {
                    opacity: .75,
                    ease: "power2.out",
                    duration: .4
                }, 0).fromTo(t, {
                    y: 50
                }, {
                    autoAlpha: 1,
                    y: 0,
                    ease: "beaucoup.out",
                    stagger: .05,
                    duration: .8
                }, 0))
            }
            close(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const s = e || this.currentSubterms;
                if (d.cancelAnimation(this.closeSubterms),
                d.cancelAnimation(this.openSubterms),
                this.closeSubterms = c.p8.timeline(),
                this.currentSubterms = null,
                Number.isInteger(s)) {
                    const {termsDom: e, wrapper: t, icon: i} = this.subCategories[s];
                    i.classList.remove("a"),
                    t.classList.add("pointer-events-none"),
                    this.closeSubterms.to(e, {
                        autoAlpha: 0,
                        ease: "power2.out",
                        duration: .4
                    }, 0)
                }
                t || (this.isMobile && this.onTogglerClick(!1),
                this.$overlay.classList.add("pointer-events-none"),
                this.closeSubterms.to(this.$overlay, {
                    opacity: 0,
                    ease: "power2.out",
                    duration: .4
                }, .2))
            }
            onKey(e) {
                "Escape" === e.key && (null !== this.currentSubterms && this.close(this.currentSubterms),
                this.hasSearch && this.onReset())
            }
            fetch(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                  , s = arguments.length > 2 ? arguments[2] : void 0
                  , i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
                  , r = arguments.length > 4 ? arguments[4] : void 0;
                if (this.page = t,
                1 === t)
                    if (i) {
                        for (let e = 0; e < this.$terms.length; e++)
                            this.$terms[e].classList.remove("a");
                        for (let e = 0; e < this.$parentTerms.length; e++)
                            this.$parentTerms[e].classList.toggle("a", e === s)
                    } else {
                        for (let e = 0; e < this.subCategories.length; e++)
                            for (let t = 0; t < this.subCategories[e].termsDom.length; t++)
                                this.subCategories[e].termsDom[t].classList.remove("a");
                        for (let e = 0; e < this.$terms.length; e++)
                            this.$terms[e].classList.toggle("a", e === s);
                        for (let e = 0; e < this.$parentTerms.length; e++)
                            this.$parentTerms[e].classList.remove("a")
                    }
                1 === t || -1 === t ? (this.$cards = this.$el.querySelectorAll(".card-work"),
                this.$cards && (this.hideAnimation = c.p8.to(this.$cardsOverlay, {
                    opacity: 1,
                    ease: "power2.out",
                    duration: .4,
                    onComplete: () => {
                        for (let e = 0; e < this.cards.length; e++) {
                            const {plane: t} = this.cards[e];
                            t.remove(!0)
                        }
                        d.smoothScroll.scrollTo(0, {
                            immediate: !0
                        })
                    }
                }))) : this.hideAnimation = null,
                this.fetchPosts = this.filter.fetchPosts(e, t, r);
                const o = this.hideAnimation ? [this.fetchPosts, this.hideAnimation._prom] : [this.fetchPosts];
                Promise.all(o).then((e => {
                    e[0].html.length > 0 && this.$searchMsg && c.p8.to(this.$searchMsg, {
                        autoAlpha: 0,
                        ease: "beaucoup.alpha",
                        duration: .1
                    });
                    const t = c.p8.timeline();
                    t.to(this.$cardsOverlay, {
                        opacity: 0,
                        ease: "power2.out",
                        duration: .8
                    }, 0),
                    0 === e[0].html.length && this.$searchMsg && t.to(this.$searchMsg, {
                        autoAlpha: 1,
                        ease: "beaucoup.alpha",
                        duration: .3
                    }, .2),
                    this.onFetch(e[0])
                }
                ))
            }
            onFetch(e) {
                (1 === this.page || -1 === this.page) && (this.$wrapper.innerHTML = ""),
                this.els = this.addContent(e.html);
                const t = c.p8.timeline({
                    onComplete: () => {
                        d.smoothScroll.resize()
                    }
                });
                t.call(( () => {
                    -1 === this.page && (this.canSearch = !0)
                }
                ), [], .75);
                for (let e = 0; e < this.newPlanes.length; e++) {
                    const s = this.newPlanes[e];
                    d.scrollTrigger.isInViewport(this.els[e]) ? t.fromTo(s.bounds.large.gl, {
                        y: s.bounds.large.gl.y - 1.8 * s.bounds.large.gl.h
                    }, {
                        y: s.bounds.large.gl.y,
                        duration: 1.3,
                        ease: "beaucoup.out"
                    }, .06 * e).fromTo(this.els[e], {
                        yPercent: 180
                    }, {
                        yPercent: 0,
                        duration: 1.3,
                        ease: "beaucoup.out"
                    }, .06 * e).fromTo(s.mesh.material.uniforms.uAlpha, {
                        value: 0
                    }, {
                        value: 1,
                        duration: 1,
                        ease: "beaucoup.out"
                    }, .085 * e).fromTo(this.els[e], {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: 1.3,
                        ease: "beaucoup.out"
                    }, .085 * e) : this.els[e].classList.remove("opacity-0")
                }
                e.isLast ? (this.loadST.disable(),
                this.$loadMore.classList.add("hidden")) : (this.loadST.enabled || (this.$loadMore.classList.remove("hidden"),
                this.loadST.enable()),
                this.loadST.refresh())
            }
            addContent(e) {
                const t = [];
                for (let s = 0; s < e.length; s++) {
                    const i = document.createElement("div");
                    i.innerHTML = e[s];
                    const r = i.children[0];
                    this.$wrapper.appendChild(r),
                    t.push(r)
                }
                return !d.detect.isMobile && this.setCardsEvent(t),
                t
            }
            onTogglerClick(e, t) {
                this.isFilterOpen = void 0 === e ? !this.isFilterOpen : e,
                this.$termsWrapper.classList.toggle("pointer-events-none", !this.isFilterOpen),
                d.cancelAnimation(this.filterTl),
                t && null !== this.currentSubterms && this.close(this.currentSubterms),
                this.$overlay.classList.toggle("pointer-events-none", !this.isFilterOpen),
                this.filterTl = c.p8.timeline({
                    onStart: () => {
                        this.isFilterOpen && this.$filterOverlay.classList.remove("opacity-0")
                    }
                }),
                this.filterTl.to(this.$termsW, {
                    autoAlpha: this.isFilterOpen ? 1 : 0,
                    ease: "power2.out",
                    stagger: this.isFilterOpen ? .05 : -.05,
                    duration: .4
                }, 0).call(( () => {
                    !this.isFilterOpen && this.$filterOverlay.classList.add("opacity-0")
                }
                ), [], "<30%").to(this.$overlay, {
                    opacity: this.isFilterOpen ? .75 : 0,
                    ease: "power2.out",
                    duration: .4
                }, 0)
            }
            setCardsEvent(e) {
                1 === this.page && (this.cards = []),
                this.newPlanes = [];
                for (let t = 0; t < e.length; t++) {
                    const s = e[t].querySelector(".card-work-video")
                      , i = e[t].querySelector(".plane")
                      , r = new H({
                        dom: i,
                        lazy: !d.scrollTrigger.isInViewport(i)
                    });
                    r.load(),
                    this.newPlanes.push(r),
                    this.cards.push({
                        dom: e[t],
                        plane: r,
                        wrapper: s,
                        video: s,
                        loaded: !1,
                        animations: {
                            alpha: null
                        }
                    })
                }
                for (let e = 0; e < this.cards.length; e++) {
                    const {dom: t, video: s} = this.cards[e];
                    s && t.addEventListener("mouseenter", this.onCardEnter.bind(this, e)),
                    s && t.addEventListener("mouseleave", this.onCardLeave.bind(this, e))
                }
            }
            onCardEnter(e) {
                const {video: t, plane: s, animations: i} = this.cards[e];
                for (let t = 0; t < this.cards.length; t++)
                    t !== e && this.onCardLeave(t);
                this.loadTimeOut = setTimeout(( () => {
                    d.video.src = null,
                    d.video.src = t.dataset.url,
                    d.video.onloadeddata = () => {
                        this.cards[e].loaded = !0,
                        s.createVideoTexture(d.video),
                        d.video.currentTime = 0,
                        d.video.paused && d.video.play(),
                        d.cancelAnimation(i.alpha),
                        i.alpha = c.p8.timeline({
                            onStart: () => {
                                s.toggleVideoTexture(!0)
                            }
                        }),
                        i.alpha.to(s.mesh.material.uniforms.uFade, {
                            value: 1,
                            ease: "beaucoup.alpha",
                            delay: .1,
                            duration: .4
                        }, 0)
                    }
                }
                ), 200)
            }
            onCardLeave(e) {
                const {plane: t, animations: s} = this.cards[e];
                d.video && !d.video.paused && d.video.pause(),
                clearTimeout(this.loadTimeOut),
                d.cancelAnimation(s.alpha),
                s.alpha = c.p8.to(t.mesh.material.uniforms.uFade, {
                    value: 0,
                    ease: "beaucoup.alpha",
                    duration: .2,
                    onComplete: () => {
                        t.toggleVideoTexture(!1)
                    }
                })
            }
            setFilterElements() {
                c.p8.set(this.$overlay, {
                    opacity: 0
                }),
                this.isMobile ? c.p8.set(this.$termsW, {
                    autoAlpha: 0
                }) : c.p8.set(this.$termsW, {
                    autoAlpha: 1
                })
            }
            resize() {
                d.w.w < 768 && !this.isMobile ? (this.isMobile = !0,
                this.setFilterElements()) : d.w.w >= 768 && this.isMobile && (this.isMobile = !1,
                this.setFilterElements())
            }
            scroll() {
                d.GL.composer.stretchPass.material.uniforms.uProgress.value = c.p8.utils.clamp(0, .9, c.p8.utils.mapRange(0, 100, 0, .9, window.scrollY))
            }
            update() {
                for (let e = 0; e < this.cards.length; e++) {
                    const {plane: t} = this.cards[e];
                    t && (t.mesh.position.y = t.bounds.large.gl.y + window.scrollY)
                }
            }
        }
        var J = s("./scripts/GL/shaders/text/text.vert")
          , ee = s.n(J)
          , te = s("./scripts/GL/shaders/text/text.frag")
          , se = s.n(te);
        class ie {
            constructor(e) {
                let {el: t, cb: s, mobile: i=!1} = e;
                this.cb = s,
                this.mobile = i,
                this.mouse = {
                    x: 0,
                    y: 0
                },
                this.el = "string" == typeof t ? document.querySelector(t) : void 0 === t ? document : t,
                this.run = this.run.bind(this)
            }
            on() {
                this.listener("add")
            }
            off() {
                this.listener("remove")
            }
            listener(e) {
                this.mobile && d.detect.isMobile ? this.el[e + "EventListener"]("touchmove", this.run) : this.el[e + "EventListener"]("mousemove", this.run)
            }
            run(e) {
                const t = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
                  , s = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
                this.mouse.x = t,
                this.mouse.y = s,
                this.cb(t, s, e)
            }
        }
        class re {
            constructor(e) {
                let {image: t="logoTexture"} = e;
                this.image = t,
                this.mouse = {
                    x: 0,
                    y: 0,
                    lerp: {
                        x: 0,
                        y: 0
                    }
                },
                this.gl = new O,
                this.mm = new ie({
                    cb: this.move.bind(this)
                }),
                this.createRenderBuffers(),
                setTimeout(( () => {
                    d.renderToBuffer = !0
                }
                ), 100),
                this.createPostFX(),
                this.mm.on()
            }
            createRenderBuffers() {
                this.renderBufferA = new b.dd2(d.w.w * d.w.pR,d.w.h * d.w.pR),
                this.renderBufferB = new b.dd2(d.w.w * d.w.pR,d.w.h * d.w.pR)
            }
            move(e, t) {
                this.mouse.x = e / d.w.w * 2 - 1,
                this.mouse.y = -c.p8.utils.mapRange(-1, 1, 0, 1, 2 * (1 - t / d.w.h) - 1)
            }
            createMesh() {
                const {texture: e, width: t, height: s} = d.resources.sources[this.image]
                  , i = s / t;
                this.material = new b.vBJ({
                    map: e,
                    transparent: !0
                }),
                this.geometry = new b._12(1,1),
                this.mesh = new b.Kj0(this.geometry,this.material),
                this.mesh.position.y = .5 * -d.w.h + d.w.w * i * .5,
                this.mesh.scale.set(d.w.w, d.w.w * i, 1),
                this.gl.scene.add(this.mesh),
                d.showDebug && this.addDebug()
            }
            addDebug() {
                this.guiEvent = 0,
                this.debugFolder = d.debug.addFolder({
                    title: "Text 🖊"
                });
                const e = {
                    addSplitting: !1,
                    text: "image"
                };
                this.debugFolder.addInput(this.postFXMesh.material.uniforms.uNoiseFactor, "value", {
                    label: "uNoiseFactor",
                    min: 0,
                    max: 50
                }),
                this.debugFolder.addInput(this.postFXMesh.material.uniforms.uNoiseScale, "value", {
                    label: "uNoiseScale",
                    min: 0,
                    max: .01,
                    step: 1e-4
                }),
                this.debugFolder.addInput(this.postFXMesh.material.uniforms.uRgbPersistFactor, "value", {
                    label: "uRgbPersistFactor",
                    min: .01,
                    max: .99,
                    step: .01
                }),
                this.debugFolder.addInput(this.postFXMesh.material.uniforms.uAlphaPersistFactor, "value", {
                    label: "uAlphaPersistFactor",
                    min: .01,
                    max: .99,
                    step: .01
                }),
                this.debugFolder.addInput(this.postFXMesh.material.uniforms.uRepeatOffset, "value", {
                    label: "uRepeatOffset",
                    min: 1e-4,
                    max: .05,
                    step: 1e-4
                }),
                this.debugFolder.addInput(e, "addSplitting").on("change", (e => {
                    this.postFXMesh.material.uniforms.uSplit.value = e.value ? 1 : 0
                }
                )),
                this.debugFolder.addInput(e, "text", {
                    label: "Text",
                    view: "input-image"
                }).on("change", (e => {
                    this.guiEvent > 0 && this.gl.textureLoader.load(e.value.src, (e => {
                        this.mesh.material.map = e
                    }
                    )),
                    this.guiEvent++
                }
                ))
            }
            createPostFX() {
                this.postFXScene = new b.xsS,
                this.postFXGeometry = new b._12(1,1);
                const e = new b.jyz({
                    uniforms: {
                        uTexture: {
                            value: null
                        },
                        uTime: {
                            value: 0
                        },
                        uMouse: {
                            value: new b.FM8(0,0)
                        },
                        uNoiseFactor: {
                            value: 1
                        },
                        uNoiseScale: {
                            value: .0032
                        },
                        uRgbPersistFactor: {
                            value: .95
                        },
                        uAlphaPersistFactor: {
                            value: .95
                        },
                        uRepeatOffset: {
                            value: .007
                        },
                        uSplit: {
                            value: .007
                        }
                    },
                    vertexShader: ee(),
                    fragmentShader: se()
                });
                this.postFXMesh = new b.Kj0(this.postFXGeometry,e),
                this.postFXMesh.scale.set(d.w.w, d.w.h, 1),
                this.postFXScene.add(this.postFXMesh)
            }
            resize() {
                this.gl.renderer.instance.clear(),
                this.renderBufferA.setSize(d.w.w * d.w.pR, d.w.h * d.w.pR),
                this.renderBufferB.setSize(d.w.w * d.w.pR, d.w.h * d.w.pR),
                this.mesh.scale.set(d.w.w, .35 * d.w.w, 1),
                this.mesh.position.y = .15 * -d.w.h,
                this.postFXMesh.scale.set(d.w.w, d.w.h, 1)
            }
            destroy() {
                this.mm.off(),
                this.renderBufferA.dispose(),
                this.renderBufferB.dispose(),
                this.postFXMesh.material.uniforms.uTexture.value && this.postFXMesh.material.uniforms.uTexture.value.dispose(),
                this.postFXMesh.material.dispose(),
                this.postFXMesh.geometry.dispose(),
                this.postFXScene.remove(this.postFXMesh),
                this.mesh.material.dispose(),
                this.mesh.geometry.dispose(),
                this.gl.scene.remove(this.mesh),
                d.renderToBuffer = !1,
                this.gl.renderer.instance.autoClearColor = !0,
                this.gl.renderer.instance.setRenderTarget(null)
            }
            update(e) {
                if (!d.renderToBuffer)
                    return;
                const {lerp: t, x: s, y: i} = this.mouse;
                t.x = d.lerp(t.x, s, .09),
                t.y = d.lerp(t.y, i, .09),
                this.postFXMesh.material.uniforms.uMouse.value.set(t.x, t.y),
                this.postFXMesh.material.uniforms.uTime.value = e,
                this.gl.renderer.instance.autoClearColor = !1,
                this.gl.renderer.instance.setRenderTarget(this.renderBufferA),
                this.gl.renderer.instance.render(this.postFXScene, this.gl.camera.instance),
                this.gl.renderer.instance.render(this.gl.scene, this.gl.camera.instance),
                this.gl.renderer.instance.setRenderTarget(null),
                this.postFXMesh.material.uniforms.uTexture.value = this.renderBufferA.texture,
                this.gl.renderer.instance.render(this.postFXScene, this.gl.camera.instance);
                const r = this.renderBufferA;
                this.renderBufferA = this.renderBufferB,
                this.renderBufferB = r
            }
        }
        const oe = [{
            name: "home",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    this.index = 0,
                    this.currentIndex = 0,
                    this.oldIndex = 0,
                    this.slidesL = this.$slides.length,
                    this.canSlide = !0,
                    d.GL.composer.stretchPass.material.uniforms.uProgress.value = 0,
                    this.cursor = new K({
                        el: this.$cursor,
                        parent: this.$el
                    }),
                    d.showDebug && this.addDebug()
                }
                bindMethods() {
                    this.onWheel = this.onWheel.bind(this),
                    this.onClick = this.onClick.bind(this),
                    this.onCounterEnter = this.onCounterEnter.bind(this),
                    this.onCounterLeave = this.onCounterLeave.bind(this)
                }
                getElems() {
                    this.slides = [],
                    this.$counter = this.$el.querySelector(".counter"),
                    this.$counterAll = this.$el.querySelector(".counter-all"),
                    this.$counterNumbers = this.$el.querySelectorAll(".counter-no"),
                    this.$counterCurrent = this.$el.querySelector(".counter-current"),
                    this.$counterTotal = this.$el.querySelector(".counter-total"),
                    this.$cursor = this.$el.querySelector(".cursor"),
                    this.$titlesWrapper = this.$el.querySelectorAll(".slide-titles"),
                    this.$slidesWrapper = this.$el.querySelector(".slides"),
                    this.$slides = this.$el.querySelectorAll(".slide-d"),
                    this.$slidesM = this.$el.querySelectorAll(".slide-m"),
                    this.$slidesInner = this.$el.querySelectorAll(".slide-d .slide-inner"),
                    this.$titles = this.$el.querySelectorAll(".slide-title"),
                    this.$clients = this.$el.querySelectorAll(".slide-client");
                    for (let e = 0; e < this.$slidesM.length; e++)
                        this.$slidesM[e].classList.add("hidden");
                    c.p8.set(this.$counterNumbers, {
                        opacity: 0
                    });
                    for (let e = 0; e < this.$slides.length; e++) {
                        const t = this.$slides[e].querySelector(".slide-video-wrapper")
                          , s = this.$slides[e].querySelector("video")
                          , i = this.$slides[e].classList.contains("is-video")
                          , r = new H({
                            dom: this.$slides[e],
                            index: e,
                            isHome: !0,
                            detectInView: !1
                        });
                        this.slides.push({
                            plane: r,
                            isVideo: i,
                            video: s,
                            videoWrapper: t,
                            popup: {
                                url: this.$slides[e].dataset.popupVideo,
                                client: this.$clients[e].innerText,
                                title: this.$titles[e] && this.$titles[e].innerText,
                                link: this.$titlesWrapper[e].href
                            },
                            loaded: 0 === e,
                            titlesWrapper: this.$titlesWrapper[e],
                            client: new (x())({
                                target: this.$clients[e]
                            })[0],
                            title: this.$titles[e]
                        }),
                        0 === e && (i ? this.addVideoTexture(this.$slides[e].dataset.url, r, e).then(( () => {
                            d.isFirstLoaded && (r.video.play(),
                            r.video.onended = () => {
                                slide.plane.video.play(),
                                this.toggle(1)
                            }
                            )
                        }
                        )) : r.load()),
                        r.mesh.material.uniforms.uAlpha.value = 0 === e ? 1 : 0,
                        r.mesh.material.uniforms.uDistProgress.value = 0,
                        r.mesh.material.uniforms.uPower.value = 0,
                        r.mesh.visible = 0 === e,
                        e > 0 ? this.$titles[e] ? c.p8.set([this.$titles[e], this.$clients[e]], {
                            opacity: 0
                        }) : c.p8.set(this.$clients[e], {
                            opacity: 0
                        }) : this.$titlesWrapper[e].classList.add("pointer-events-auto")
                    }
                }
                events() {
                    document.body.addEventListener("wheel", this.onWheel),
                    this.$slidesWrapper.addEventListener("click", this.onClick),
                    d.popup.on("open", ( () => {
                        this.cursor.setLoading(!1)
                    }
                    )),
                    d.popup.on("close", this.onPopupClose.bind(this)),
                    this.$counter.addEventListener("mouseenter", this.onCounterEnter),
                    this.$counter.addEventListener("mouseleave", this.onCounterLeave),
                    this.$counterTotal.addEventListener("click", ( () => {
                        this.toggle(1, this.slidesL - 1)
                    }
                    ));
                    for (let e = 0; e < this.$counterNumbers.length; e++)
                        this.$counterNumbers[e].addEventListener("click", ( () => {
                            this.slides[e].loaded ? this.toggle(1, e) : this.slides[e].isVideo ? this.addVideoTexture(this.$slides[e].dataset.url, this.slides[e].plane, e).then(( () => {
                                this.slides[e].loaded = !0,
                                this.toggle(1, e)
                            }
                            )) : this.slides[e].plane.load().then(( () => {
                                this.slides[e].loaded = !0,
                                this.toggle(1, e)
                            }
                            ))
                        }
                        ));
                    for (let e = 0; e < this.$titlesWrapper.length; e++)
                        this.$titlesWrapper[e].addEventListener("mouseenter", ( () => {
                            this.cursor.hide()
                        }
                        )),
                        this.$titlesWrapper[e].addEventListener("mouseleave", ( () => {
                            this.cursor.show()
                        }
                        ))
                }
                appear() {
                    if (this.slides[1].isVideo ? this.addVideoTexture(this.$slides[1].dataset.url, this.slides[1].plane, 1).then(( () => {
                        this.slides[1].loaded = !0
                    }
                    )) : this.slides[1].plane.load().then(( () => {
                        this.slides[1].loaded = !0
                    }
                    )),
                    this.slides[this.slidesL - 1].isVideo ? this.addVideoTexture(this.$slides[this.slidesL - 1].dataset.url, this.slides[this.slidesL - 1].plane, this.slidesL - 1).then(( () => {
                        this.slides[this.slidesL - 1].loaded = !0
                    }
                    )) : this.slides[this.slidesL - 1].plane.load().then(( () => {
                        this.slides[this.slidesL - 1].loaded = !0
                    }
                    )),
                    !d.isFirstLoaded) {
                        this.isAnimating = !0;
                        const e = this.slides[0]
                          , t = c.p8.timeline({
                            delay: .2,
                            onComplete: () => {
                                d.detect.isSafari && e.videoWrapper.classList.remove("opacity-0"),
                                this.isAnimating = !1
                            }
                        });
                        e.plane.video.play(),
                        e.plane.video.onended = () => {
                            e.plane.video.play(),
                            this.toggle(1)
                        }
                        ,
                        t.set(e.plane.mesh.material.uniforms.uSideReverse, {
                            value: 1
                        }, 0).set(e.plane.mesh.material.uniforms.uDistProgress, {
                            value: 1
                        }, 0).set(e.plane.mesh.material.uniforms.uSide, {
                            value: 1
                        }, 0).fromTo(e.client.chars, {
                            x: -e.titlesWrapper.getBoundingClientRect().right,
                            opacity: 0
                        }, {
                            x: 0,
                            opacity: 1,
                            ease: "expo.out",
                            stagger: -.02,
                            duration: .8
                        }, 0).blink(e.title, {}, "<30%").fromTo(e.plane.mesh.material.uniforms.uAlpha, {
                            value: 0
                        }, {
                            value: 1,
                            ease: "power3.out",
                            duration: .2
                        }, 0).fromTo(e.plane.mesh.material.uniforms.uPower, {
                            value: 1
                        }, {
                            value: 0,
                            ease: "power3.out",
                            duration: 2.25
                        }, "<").fromTo(e.plane.mesh.material.uniforms.uDistProgress, {
                            value: 1
                        }, {
                            value: 0,
                            ease: "power3.out",
                            duration: 2.25
                        }, "<").call(( () => {
                            d.detect.isSafari && e.videoWrapper.classList.remove("opacity-0")
                        }
                        ), [], "<60%")
                    }
                }
                destroy() {
                    this.cursor.off(),
                    document.body.removeEventListener("wheel", this.onWheel),
                    d.GL.composer.stretchPass.material.uniforms.uProgress.value = .9;
                    for (let e = 0; e < this.slides.length; e++) {
                        const {plane: t, isVideo: s} = this.slides[e];
                        s && t.video && !t.video.paused && t.video.pause(),
                        t.remove(!0)
                    }
                }
                onCounterEnter() {
                    this.isCounterOpen = !0,
                    this.cursor.hide(),
                    this.$counterAll.classList.remove("pointer-events-none"),
                    this.currentIndex === this.slidesL - 1 && c.p8.set(this.$counterTotal, {
                        opacity: 1
                    }),
                    d.cancelAnimation(this.counterEnterAnimation),
                    d.cancelAnimation(this.counterLeaveAnimation),
                    this.counterEnterAnimation = c.p8.timeline(),
                    this.counterEnterAnimation.set(this.$counterCurrent, {
                        opacity: 0
                    }, 0);
                    for (let e = 0; e < this.$counterNumbers.length; e++)
                        this.counterEnterAnimation.blink(this.$counterNumbers[e], {
                            opacity: this.currentIndex === e ? 1 : .3
                        }, .1 + c.p8.utils.random(0, .05 * this.$counterNumbers.length, .05))
                }
                onCounterLeave() {
                    this.isCounterOpen = !1,
                    this.cursor.show(),
                    this.$counterAll.classList.add("pointer-events-none"),
                    c.p8.set(this.$counterTotal, {
                        opacity: .3
                    }),
                    d.cancelAnimation(this.counterEnterAnimation),
                    d.cancelAnimation(this.counterLeaveAnimation),
                    this.counterLeaveAnimation = c.p8.timeline(),
                    this.counterLeaveAnimation.set(this.$counterNumbers, {
                        opacity: 0
                    }, 0).blink(this.$counterCurrent, {}, .1)
                }
                onClick() {
                    const {url: e, client: t, title: s, link: i} = this.slides[this.currentIndex].popup;
                    this.canSlide = !1,
                    this.slides[this.currentIndex].plane.video.pause(),
                    this.cursor.setLoading(!0),
                    d.popup.open(e, i, t, s)
                }
                onPopupClose() {
                    this.cursor.setLoading(!1),
                    this.slides[this.currentIndex].plane.video.currentTime = 0,
                    this.slides[this.currentIndex].plane.video.play(),
                    this.canSlide = !0
                }
                addVideoTexture(e, t, s) {
                    return new Promise((i => {
                        const r = this.slides[s].video;
                        r.src = e,
                        r.setAttribute("crossorigin", "anonymous"),
                        r.setAttribute("playsinline", !0),
                        r.volume = 0,
                        r.muted = !0,
                        r.addEventListener("loadeddata", ( () => {
                            t.createVideoTexture(r),
                            i()
                        }
                        ))
                    }
                    ))
                }
                onWheel(e) {
                    if (this.isAnimating || !this.canSlide)
                        return;
                    let t = Object.is(e.deltaY, -0) ? e.deltaX : e.deltaY;
                    0 === t ? t = 1 : Object.is(t, -0) && (t = -1),
                    this.toggle(Math.sign(t))
                }
                addDebug() {
                    d.debug.addFolder({
                        title: "Shader ⭐️"
                    }).addInput(this.slides[0].plane.mesh.material.uniforms.uPower, "value", {
                        label: "uPower",
                        min: 0,
                        max: 1
                    })
                }
                loadNextSlide(e, t) {
                    const s = c.p8.utils.wrap(0, this.slidesL, e + t);
                    this.slides[s].loaded || (this.slides[s].isVideo ? this.addVideoTexture(this.$slides[s].dataset.url, this.slides[s].plane, s).then(( () => {
                        this.slides[s].loaded = !0
                    }
                    )) : this.slides[s].plane.load().then(( () => {
                        this.slides[s].loaded = !0
                    }
                    )))
                }
                toggle(e, t) {
                    if (this.isAnimating || t === this.currentIndex)
                        return;
                    this.oldIndex = this.currentIndex,
                    this.index = void 0 === t ? this.index + e : t,
                    this.currentIndex = void 0 === t ? c.p8.utils.wrap(0, this.slidesL, this.index) : t,
                    this.isAnimating = !0,
                    this.loadNextSlide(this.index, e);
                    const s = this.slides[this.oldIndex]
                      , i = this.slides[this.currentIndex];
                    this.$counterCurrent.innerHTML = this.$counterNumbers[this.currentIndex] ? this.$counterNumbers[this.currentIndex].innerHTML : this.$counterTotal.innerHTML,
                    this.isCounterOpen && (c.p8.set(this.$counterNumbers, {
                        opacity: e => e === this.currentIndex ? 1 : .3
                    }),
                    c.p8.set(this.$counterTotal, {
                        opacity: this.currentIndex === this.slidesL - 1 ? 1 : .3
                    })),
                    s.video.onended = null,
                    i.video.onended = () => {
                        i.video.play(),
                        this.toggle(1)
                    }
                    ,
                    this.animation = c.p8.timeline({
                        defaults: {
                            ease: "power2.out",
                            duration: 1
                        },
                        onStart: () => {
                            c.p8.set(i.client.el, {
                                opacity: 1
                            }),
                            i.plane.mesh.visible = !0,
                            d.detect.isSafari && s.videoWrapper.classList.add("opacity-0"),
                            i.isVideo && (i.plane.video.currentTime = 0,
                            i.plane.video.play())
                        }
                        ,
                        onComplete: () => {
                            s.plane.mesh.visible = !1,
                            this.isAnimating = !1,
                            s.isVideo && s.plane.video.pause()
                        }
                    }),
                    s.titlesWrapper.classList.remove("pointer-events-auto"),
                    i.titlesWrapper.classList.add("pointer-events-auto"),
                    this.animation.set(i.title, {
                        opacity: 0,
                        x: 0
                    }).set(s.plane.mesh.material.uniforms.uSideReverse, {
                        value: -1 * e
                    }, 0).set(i.plane.mesh.material.uniforms.uSideReverse, {
                        value: 1 * Number(e)
                    }, 0).set(i.plane.mesh.material.uniforms.uDistProgress, {
                        value: 1
                    }, 0).set(s.plane.mesh.material.uniforms.uSide, {
                        value: e > 0 ? 0 : 1
                    }, 0).set(i.plane.mesh.material.uniforms.uSide, {
                        value: e > 0 ? 1 : 0
                    }, 0).to(s.client.chars, {
                        x: e > 0 ? .35 * d.w.w - s.client.el.getBoundingClientRect().left : -s.client.el.getBoundingClientRect().right,
                        opacity: 0,
                        ease: "expo.inOut",
                        stagger: e > 0 ? -.007 : .01,
                        duration: .8
                    }, e > 0 ? .02 : 0).to(s.title, {
                        opacity: 0,
                        x: e > 0 ? .35 * d.w.w - s.client.el.getBoundingClientRect().left : -s.client.el.getBoundingClientRect().right,
                        ease: "expo.inOut",
                        duration: .8
                    }, e > 0 ? 0 : ">-=97.75%").fromTo(i.client.chars, {
                        x: e > 0 ? -i.titlesWrapper.getBoundingClientRect().right : .35 * d.w.w - i.client.el.getBoundingClientRect().left,
                        opacity: 0
                    }, {
                        x: 0,
                        opacity: 1,
                        ease: "expo.out",
                        stagger: .01 * -e,
                        duration: .8
                    }, .6).blink(i.title, {}, e > 0 ? "<30%" : "<50%").fromTo(s.plane.mesh.material.uniforms.uDistProgress, {
                        value: 0
                    }, {
                        value: 1,
                        duration: 1.5
                    }, 0).fromTo(s.plane.mesh.material.uniforms.uPower, {
                        value: 0
                    }, {
                        value: 1,
                        ease: "power2.out",
                        duration: 2
                    }, 0).fromTo(s.plane.mesh.material.uniforms.uAlpha, {
                        value: 1
                    }, {
                        value: 0,
                        duration: .4
                    }, "<20%").fromTo(i.plane.mesh.material.uniforms.uAlpha, {
                        value: 0
                    }, {
                        value: 1,
                        duration: .4
                    }, "<50%").fromTo(i.plane.mesh.material.uniforms.uPower, {
                        value: 1
                    }, {
                        value: 0,
                        ease: "power3.out",
                        duration: 1.5
                    }, "<").fromTo(i.plane.mesh.material.uniforms.uDistProgress, {
                        value: 1
                    }, {
                        value: 0,
                        ease: "power3.out",
                        duration: 1.2
                    }, "<").call(( () => {
                        d.detect.isSafari && i.videoWrapper.classList.remove("opacity-0")
                    }
                    ), [], "<65%")
                }
                update(e) {
                    this.cursor.update();
                    for (let t = 0; t < this.slides.length; t++) {
                        const {plane: s} = this.slides[t];
                        s.update(e)
                    }
                }
            }
        }, {
            name: "works",
            Class: Q
        }, {
            name: "reels",
            Class: Q
        }, {
            name: "cover",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    d.GL.composer.stretchPass.material.uniforms.uProgress.value = .09,
                    this.$cursor && (this.cursor = new K({
                        el: this.$cursor,
                        parent: this.$el
                    })),
                    d.isFirstLoaded && this.$header.classList.add("h"),
                    this.createAnimation(),
                    d.previousWorksPage && (this.$backButton.href = d.previousWorksPage,
                    this.$crossButton.href = d.previousWorksPage),
                    this.splittings = new (x())({
                        target: this.$links
                    }),
                    d.showDebug && this.addGUI()
                }
                bindMethods() {
                    this.onClick = this.onClick.bind(this)
                }
                getElems() {
                    this.$header = document.querySelector(".header"),
                    this.$links = document.querySelectorAll(".h-link"),
                    this.$backButton = document.querySelector(".back-button"),
                    this.$crossButton = document.querySelector(".cross-button"),
                    this.$cursor = this.$el.querySelector(".cursor"),
                    this.$image = this.$el.querySelector(".cover-image"),
                    this.plane = new H({
                        dom: this.$image,
                        contain: this.$el.classList.contains("is-fiction")
                    }),
                    this.popup = {
                        url: this.$el.dataset.popupUrl,
                        title: this.$el.dataset.popupTitle,
                        client: this.$el.dataset.popupClient
                    },
                    this.plane.load().then(( () => {
                        d.emitter.emit("work-ready")
                    }
                    ))
                }
                events() {
                    this.$el.dataset.popupUrl && this.$el.addEventListener("click", this.onClick),
                    d.popup.on("open", ( () => {
                        this.cursor && this.cursor.setLoading(!1)
                    }
                    )),
                    d.popup.on("close", ( () => {
                        this.cursor && this.cursor.setLoading(!1)
                    }
                    ))
                }
                appear() {
                    !d.isFirstLoaded && this.$header.classList.add("h-fast"),
                    this.tl.play()
                }
                destroy() {
                    this.$header.classList.remove("h", "h-fast"),
                    this.plane.remove(!0),
                    this.cursor && this.cursor.off()
                }
                createAnimation() {
                    this.tl = c.p8.timeline({
                        paused: !0,
                        defaults: {
                            ease: "power2.out",
                            duration: 2
                        }
                    }),
                    c.p8.set(this.plane.mesh.material.uniforms.uSide, {
                        value: 1
                    }),
                    c.p8.set(this.plane.mesh.material.uniforms.uSideReverse, {
                        value: 1
                    }),
                    c.p8.set(this.plane.mesh.material.uniforms.uPower, {
                        value: .65
                    }),
                    c.p8.set(this.plane.mesh.material.uniforms.uDistProgress, {
                        value: .65
                    }),
                    this.tl.fromTo(this.plane.mesh.material.uniforms.uPower, {
                        value: .65
                    }, {
                        value: 0
                    }, 0).fromTo(this.plane.mesh.material.uniforms.uDistProgress, {
                        value: .65
                    }, {
                        value: 0
                    }, 0)
                }
                addGUI() {
                    const e = d.debug.addFolder({
                        title: "Cover 💫"
                    });
                    e.addInput(this.plane.mesh.material.uniforms.uPower, "value", {
                        label: "uPower",
                        step: .001,
                        min: 0,
                        max: 1
                    }),
                    e.addInput(this.plane.mesh.material.uniforms.uCenter, "value", {
                        label: "uCenter",
                        step: .001,
                        min: -1,
                        max: 1
                    }),
                    e.addInput(this.plane.mesh.material.uniforms.uSide, "value", {
                        label: "uSide",
                        step: .001,
                        min: -1,
                        max: 1
                    }),
                    e.addInput(this.plane.mesh.material.uniforms.uSideReverse, "value", {
                        label: "uSideReverse",
                        step: .001,
                        min: -1,
                        max: 1
                    }),
                    e.addInput(this.plane.mesh.material.uniforms.uDistProgress, "value", {
                        label: "uDistProgress",
                        step: .001,
                        min: -1,
                        max: 1
                    })
                }
                onClick() {
                    const {url: e, title: t, client: s} = this.popup;
                    this.cursor && this.cursor.setLoading(),
                    d.popup.open(e, null, s, t)
                }
                scroll() {
                    d.GL.composer.stretchPass.material.uniforms.uProgress.value = c.p8.utils.clamp(0, .9, c.p8.utils.mapRange(0, 50, 0, .9, window.scrollY))
                }
                update() {
                    this.cursor && this.cursor.update(),
                    this.plane.mesh.position.y = this.plane.bounds.large.gl.y + window.scrollY
                }
            }
        }, {
            name: "work-image",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0
                }
                getElems() {
                    this.planes = [],
                    this.$planes = this.$el.querySelectorAll(".plane");
                    for (let e = 0; e < this.$planes.length; e++) {
                        const t = new H({
                            dom: this.$planes[e],
                            lazy: !0
                        });
                        t.load(),
                        this.planes.push(t)
                    }
                }
                destroy() {
                    for (let e = 0; e < this.planes.length; e++)
                        this.planes[e].remove(!0)
                }
                update() {
                    for (let e = 0; e < this.planes.length; e++)
                        this.planes[e].mesh.position.y = this.planes[e].bounds.large.gl.y + window.scrollY
                }
            }
        }, {
            name: "contact",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    d.GL.useComposer = !1,
                    this.text = new re({}),
                    d.isFirstLoaded && (this.loaded = !0,
                    this.text.createMesh())
                }
                getElems() {
                    this.$left = this.$el.querySelector(".contact-left"),
                    this.$middle = this.$el.querySelector(".contact-middle"),
                    this.$right = this.$el.querySelector(".contact-right"),
                    this.$overlay = this.$el.querySelector(".overlay"),
                    this.splitLeft = new (x())({
                        target: this.$left,
                        by: "lines"
                    })[0],
                    this.splitMiddle = new (x())({
                        target: this.$middle,
                        by: "lines"
                    })[0],
                    this.splitRight = new (x())({
                        target: this.$right,
                        by: "lines"
                    })[0],
                    c.p8.set([this.splitLeft.lines, this.splitMiddle.lines, this.splitRight.lines], {
                        opacity: 0
                    })
                }
                appear() {
                    !this.loaded && this.text.createMesh();
                    const e = c.p8.timeline();
                    e.to(this.$overlay, {
                        opacity: 0,
                        ease: "linear",
                        duration: .5
                    }, .5);
                    for (let t = 0; t < this.splitLeft.lines.length; t++)
                        e.blink(this.splitLeft.lines[t], .05 * t);
                    for (let t = 0; t < this.splitMiddle.lines.length; t++)
                        e.blink(this.splitMiddle.lines[t], .1 + .05 * t);
                    for (let t = 0; t < this.splitRight.lines.length; t++)
                        e.blink(this.splitRight.lines[t], .2 + .05 * t)
                }
                destroy() {
                    this.text && this.text.destroy(),
                    d.GL.useComposer = !0
                }
                resize() {
                    this.text && this.text.resize()
                }
                update(e) {
                    this.text && this.text.update(e)
                }
            }
        }, {
            name: "bande",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    this.mode = this.$el.classList.contains("light") ? "light" : "dark",
                    d.GL.composer.stretchPass.material.uniforms.uProgress.value = 0
                }
                getElems() {
                    this.cards = [],
                    this.$header = document.querySelector(".header"),
                    this.$headerGradient = this.$header.querySelector(".gradient-bottom"),
                    this.$cards = this.$el.querySelectorAll(".card-work"),
                    !d.detect.isMobile && this.setCardsEvent(this.$cards)
                }
                appear() {
                    this.$header.classList.add(this.mode),
                    this.$headerGradient.classList.add(this.mode)
                }
                destroy() {
                    this.$header.classList.remove(this.mode),
                    this.$headerGradient.classList.remove(this.mode);
                    for (let e = 0; e < this.cards.length; e++) {
                        const {plane: t} = this.cards[e];
                        t.remove(!0)
                    }
                }
                setCardsEvent(e) {
                    for (let t = 0; t < e.length; t++) {
                        const s = e[t].querySelector(".card-work-video")
                          , i = e[t].querySelector(".plane")
                          , r = new H({
                            dom: i
                        });
                        r.load(),
                        this.cards.push({
                            dom: e[t],
                            plane: r,
                            video: s,
                            loaded: !1,
                            popup: {
                                url: e[t].dataset.popupUrl,
                                link: e[t].dataset.popupLink,
                                client: e[t].dataset.popupClient,
                                title: e[t].dataset.popupTitle
                            },
                            animations: {
                                alpha: null
                            }
                        })
                    }
                    for (let e = 0; e < this.cards.length; e++) {
                        const {dom: t, video: s, popup: i} = this.cards[e];
                        i.url && t.addEventListener("click", this.onCardClick.bind(this, e)),
                        s && t.addEventListener("mouseenter", this.onCardEnter.bind(this, e)),
                        s && t.addEventListener("mouseleave", this.onCardLeave.bind(this, e))
                    }
                }
                onCardClick(e) {
                    const {popup: t} = this.cards[e];
                    d.popup.open(t.url, t.link, t.client, t.title)
                }
                onCardEnter(e) {
                    const {video: t, plane: s, animations: i} = this.cards[e];
                    for (let t = 0; t < this.cards.length; t++)
                        t !== e && this.onCardLeave(t);
                    this.loadTimeOut = setTimeout(( () => {
                        d.video.src = null,
                        d.video.src = t.dataset.url,
                        d.video.onloadeddata = () => {
                            this.cards[e].loaded = !0,
                            s.createVideoTexture(d.video),
                            d.video.currentTime = 0,
                            d.video.paused && d.video.play(),
                            d.cancelAnimation(i.alpha),
                            i.alpha = c.p8.timeline({
                                onStart: () => {
                                    s.toggleVideoTexture(!0)
                                }
                            }),
                            i.alpha.to(s.mesh.material.uniforms.uFade, {
                                value: 1,
                                ease: "beaucoup.alpha",
                                delay: .1,
                                duration: .4
                            }, 0)
                        }
                    }
                    ), 200)
                }
                onCardLeave(e) {
                    const {plane: t, animations: s} = this.cards[e];
                    d.video && !d.video.paused && d.video.pause(),
                    clearTimeout(this.loadTimeOut),
                    d.cancelAnimation(s.alpha),
                    s.alpha = c.p8.to(t.mesh.material.uniforms.uFade, {
                        value: 0,
                        ease: "beaucoup.alpha",
                        duration: .2,
                        onComplete: () => {
                            t.toggleVideoTexture(!1)
                        }
                    })
                }
                scroll() {
                    d.GL.composer.stretchPass.material.uniforms.uProgress.value = c.p8.utils.clamp(0, .9, c.p8.utils.mapRange(0, 100, 0, .9, window.scrollY))
                }
                update() {
                    for (let e = 0; e < this.cards.length; e++) {
                        const {plane: t} = this.cards[e];
                        t && (t.mesh.position.y = t.bounds.large.gl.y + window.scrollY)
                    }
                }
            }
        }, {
            name: "about",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    this.gl = new O,
                    this.size = 0,
                    this.mouse = {
                        x: 0,
                        y: 0,
                        lerp: {
                            y: 0
                        },
                        normalized: new b.FM8
                    }
                }
                bindMethods() {
                    this.showServices = this.showServices.bind(this),
                    this.showStudio = this.showStudio.bind(this)
                }
                getElems() {
                    this.$items = this.$el.querySelectorAll(".about-gallery-item"),
                    this.$overlay = this.$el.querySelector(".about-overlay"),
                    this.$imgs = this.$el.querySelectorAll("img"),
                    this.$image = this.$el.querySelector(".main-image"),
                    this.$buttons = this.$el.querySelectorAll(".about-switcher"),
                    this.$title = this.$el.querySelector(".about-title"),
                    this.$description = this.$el.querySelector(".about-description"),
                    this.$text = this.$el.querySelector(".about-text"),
                    this.$servicesDescription = this.$el.querySelector(".about-services-description"),
                    this.$wrappers = this.$el.querySelectorAll(".about-wrapper"),
                    this.plane = new H({
                        dom: this.$image
                    }),
                    this.plane.load(),
                    this.splitDescription = new (x())({
                        target: this.$description,
                        by: "lines"
                    })[0],
                    this.splitTitle = new (x())({
                        target: this.$title,
                        by: "lines"
                    })[0],
                    this.splitText = new (x())({
                        target: this.$text,
                        by: "lines"
                    })[0],
                    this.splitServicesDescription = new (x())({
                        target: this.$servicesDescription,
                        by: "lines"
                    })[0],
                    this.$wrappers[1].style.display = "none",
                    c.p8.set([this.splitTitle.lines, this.splitDescription.lines, this.splitText.lines, this.splitServicesDescription.lines], {
                        opacity: 0
                    })
                }
                events() {
                    this.$buttons[0].addEventListener("click", this.showStudio),
                    this.$buttons[1].addEventListener("click", this.showServices)
                }
                appear() {
                    const e = c.p8.timeline();
                    for (let t = 0; t < this.splitDescription.lines.length; t++)
                        e.blink(this.splitDescription.lines[t], .05 * t);
                    for (let t = 0; t < this.splitTitle.lines.length; t++)
                        e.blink(this.splitTitle.lines[t], .05 * t)
                }
                destroy() {
                    this.plane.remove(!0)
                }
                setup() {
                    this.images = [];
                    const e = this.$items[0].getBoundingClientRect()
                      , t = this.$items[this.$items.length - 1].getBoundingClientRect().bottom - e.height - e.top;
                    this.transform = 0;
                    for (let e = 0; e < this.$items.length; e++) {
                        const s = this.$items[e].getBoundingClientRect()
                          , i = new H({
                            dom: this.$items[e],
                            index: e,
                            detectInView: !1
                        });
                        i.mesh.material.uniforms.uAlpha.value = 0,
                        i.load(),
                        this.images.push({
                            plane: i,
                            basePosition: i.mesh.position.y,
                            dom: this.$items[e],
                            rect: s,
                            img: this.$imgs[e],
                            min: -s.bottom,
                            max: e === this.images.length - 1 ? t - s.top : t - s.top + d.w.w / 1440 * 20,
                            offsetSize: 0,
                            targ: {
                                x: i.mesh.position.x
                            },
                            curr: {
                                x: i.mesh.position.x
                            }
                        })
                    }
                }
                showServices() {
                    if (!this.isServices) {
                        d.cancelAnimation(this.showStudioTL),
                        this.isServices = !0,
                        this.$buttons[0].classList.remove("a"),
                        this.$buttons[1].classList.add("a"),
                        this.showServicesTL = c.p8.timeline({
                            onStart: () => {
                                this.$wrappers[1].style.display = "grid"
                            }
                        }),
                        d.smoothScroll.stop(),
                        this.showServicesTL.to(this.$overlay, {
                            opacity: 1,
                            ease: "beaucoup.alpha",
                            duration: .4
                        }, 0).to([this.splitTitle.lines, this.splitDescription.lines], {
                            opacity: 0,
                            ease: "beaucoup.out",
                            duration: .3
                        }, 0);
                        for (let e = 0; e < this.splitText.lines.length; e++)
                            this.showServicesTL.blink(this.splitText.lines[e], .3 + .05 * e);
                        for (let e = 0; e < this.splitServicesDescription.lines.length; e++)
                            this.showServicesTL.blink(this.splitServicesDescription.lines[e], .42 + .05 * e)
                    }
                }
                showStudio() {
                    if (this.isServices) {
                        d.cancelAnimation(this.showServicesTL),
                        d.smoothScroll.start(),
                        this.isServices = !1,
                        this.$buttons[0].classList.add("a"),
                        this.$buttons[1].classList.remove("a"),
                        this.showStudioTL = c.p8.timeline({
                            onStart: () => {
                                this.$wrappers[0].style.display = "block"
                            }
                            ,
                            onComplete: () => {
                                this.$wrappers[1].style.display = "none"
                            }
                        }),
                        this.showStudioTL.to(this.$overlay, {
                            opacity: .15,
                            ease: "beaucoup.alpha",
                            duration: .4
                        }, .3).to([this.splitText.lines, this.splitServicesDescription.lines], {
                            opacity: 0,
                            ease: "beaucoup.out",
                            duration: .3
                        }, 0);
                        for (let e = 0; e < this.splitDescription.lines.length; e++)
                            this.showStudioTL.blink(this.splitDescription.lines[e], .25 + .05 * e);
                        for (let e = 0; e < this.splitTitle.lines.length; e++)
                            this.showStudioTL.blink(this.splitTitle.lines[e], .25 + .05 * e)
                    }
                }
                scroll() {
                    d.GL.composer.stretchPass.material.uniforms.uProgress.value = c.p8.utils.clamp(0, .9, c.p8.utils.mapRange(0, 50, 0, .9, window.scrollY))
                }
                update() {
                    this.plane.mesh.position.y = this.plane.bounds.large.gl.y + window.scrollY
                }
            }
        }, {
            name: "p404",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    d.GL.useComposer = !1,
                    this.text = new re({
                        image: "404Texture"
                    }),
                    d.isFirstLoaded && (this.loaded = !0,
                    this.text.createMesh())
                }
                appear() {
                    !this.loaded && this.text.createMesh()
                }
                destroy() {
                    this.text && this.text.destroy(),
                    d.GL.useComposer = !0
                }
                resize() {
                    this.text && this.text.resize()
                }
                update(e) {
                    this.text && this.text.update(e)
                }
            }
        }];
        var ne = oe;
        class ae extends Y {
            init() {
                if (this.currentSubterms = null,
                this.isFilterOpen = !1,
                this.canSearch = !0,
                this.isEmpty = !0,
                this.hasSearch = !1,
                this.oldSearch = "",
                this.isMobile = d.w.w < 768,
                this.filter = new Z,
                this.total = this.$el.dataset.totalPages,
                this.page = this.filter.currentPage || 1,
                this.setItems(),
                this.setFilterElements(),
                this.currentFilterIndex = 0,
                d.isFirstLoaded && d.isWorkPrevious && this.manageScrollRestoration(),
                d.previousWorksPage = d.router ? d.router.targetLocation.href : window.location.href,
                this.$el.dataset.parent) {
                    const e = this.termsIds.indexOf(this.filter.currentFilter);
                    e > -1 && (this.currentFilterIndex = e)
                } else
                    for (let e = 0; e < this.subtermsIds.length; e++) {
                        const t = this.subtermsIds[e].indexOf(this.filter.currentFilter);
                        t > -1 && (this.currentParentIndex = e,
                        this.currentFilterIndex = t)
                    }
                this.$el.dataset.id && (this.filter.currentFilter = this.$el.dataset.id),
                this.loadST = d.scrollTrigger.create({
                    trigger: this.$loadMore,
                    start: "top bottom-=50px",
                    onEnter: () => {
                        this.page++,
                        this.fetch(this.filter.currentFilter, this.page)
                    }
                }),
                parseInt(this.page) === parseInt(this.total) && (this.loadST.disable(),
                this.$loadMore.classList.add("hidden")),
                c.p8.set(this.$cards, {
                    opacity: 0
                })
            }
            bindMethods() {
                this.onFetch = this.onFetch.bind(this),
                this.onSearch = this.onSearch.bind(this),
                this.onKeySearch = this.onKeySearch.bind(this),
                this.onReset = this.onReset.bind(this),
                this.onSearchClick = this.onSearchClick.bind(this),
                this.onOverlayClick = this.onOverlayClick.bind(this)
            }
            getElems() {
                this.subCategories = [],
                this.$lines = this.$el.querySelector(".lines-w"),
                this.$termsWrapper = this.$el.querySelector(".terms"),
                this.$terms = this.$el.querySelectorAll(".term"),
                this.$termsW = this.$el.querySelectorAll(".term-w"),
                this.$wrapper = this.$el.querySelector(".works-cards"),
                this.$parentTerms = this.$el.querySelectorAll(".parent-term"),
                this.$parentTermsIcons = this.$el.querySelectorAll(".parent-term-icon"),
                this.$subtermsWrapper = this.$el.querySelectorAll(".subterms"),
                this.$overlay = this.$el.querySelector(".overlay"),
                this.$loadMore = this.$el.querySelector(".works-load"),
                this.$toggler = this.$el.querySelector(".terms-button"),
                this.$filterOverlay = this.$el.querySelector(".filter-top-overlay"),
                this.$cards = this.$el.querySelectorAll(".card-work"),
                this.$search = this.$el.querySelector("#search"),
                this.$searchWrapper = this.$el.querySelector(".search-wrapper"),
                this.$searchText = this.$el.querySelector(".search-text"),
                this.$searchMsg = this.$el.querySelector(".search-msg"),
                this.$searchReset = this.$el.querySelector(".search-reset"),
                this.$searchOverlay = this.$el.querySelector(".search-overlay"),
                this.$searchReset && c.p8.set(this.$searchReset, {
                    autoAlpha: 0
                }),
                this.$searchOverlay && c.p8.set(this.$searchOverlay, {
                    autoAlpha: 0
                }),
                this.termsIds = [],
                this.subtermsIds = [];
                for (let e = 0; e < this.$terms.length; e++)
                    this.termsIds.push(this.$terms[e].dataset.id);
                for (let e = 0; e < this.$parentTerms.length; e++) {
                    const t = []
                      , s = []
                      , i = this.$subtermsWrapper[e].querySelectorAll(".subterm");
                    this.subtermsIds[e] = [],
                    c.p8.set(i, {
                        autoAlpha: 0
                    });
                    for (let r = 0; r < i.length; r++)
                        c.p8.set(i[r], {
                            zIndex: i.length - 1 - r
                        }),
                        this.subtermsIds[e].push(i[r].dataset.id),
                        t.push(new (x())({
                            target: i[e].children[0]
                        })),
                        s.push(new (x())({
                            target: i[e].children[1]
                        }));
                    this.subCategories.push({
                        wrapper: this.$subtermsWrapper[e],
                        parent: this.$parentTerms[e],
                        icon: this.$parentTermsIcons[e],
                        termsDom: i,
                        terms: t,
                        numbers: s
                    })
                }
            }
            events() {
                this.$overlay.addEventListener("click", ( () => {
                    this.close(null, this.isMobile && null !== this.currentSubterms)
                }
                )),
                this.$toggler.addEventListener("click", this.onTogglerClick.bind(this, void 0, !0)),
                this.$search && this.$search.addEventListener("keyup", this.onKeySearch),
                this.$searchReset && this.$searchReset.addEventListener("click", this.onReset),
                this.$searchWrapper && this.$searchWrapper.addEventListener("click", this.onSearchClick),
                this.$searchOverlay && this.$searchOverlay.addEventListener("click", this.onOverlayClick);
                for (let e = 0; e < this.$terms.length; e++)
                    this.$terms[e].addEventListener("click", this.onTermClick.bind(this, e, !1));
                for (let e = 0; e < this.subCategories.length; e++) {
                    const {termsDom: t, parent: s} = this.subCategories[e];
                    s.addEventListener("click", this.onParentClick.bind(this, e));
                    for (let s = 0; s < t.length; s++)
                        t[s].addEventListener("click", this.onSubtermClick.bind(this, e, s))
                }
            }
            appear() {
                c.p8.fromTo(this.$cards, {
                    opacity: 0,
                    yPercent: 100
                }, {
                    opacity: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: "expo.out",
                    stagger: .05
                })
            }
            onSearchClick() {
                d.cancelAnimation(this.hideSearch),
                this.showSearch = c.p8.timeline(),
                this.showSearch.to(this.$searchOverlay, {
                    autoAlpha: .75,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchText, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchWrapper, {
                    opacity: 1,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, .2)
            }
            onOverlayClick() {
                d.cancelAnimation(this.showSearch),
                this.hideSearch = c.p8.timeline(),
                this.hideSearch.to(this.$searchOverlay, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchWrapper, {
                    opacity: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, 0).to(this.$searchText, {
                    autoAlpha: 1,
                    ease: "beaucoup.alpha",
                    duration: .3
                }, .2)
            }
            onReset() {
                this.currentParentIndex > -1 ? this.onSubtermClick(this.currentParentIndex, this.currentFilterIndex) : this.onTermClick(this.currentFilterIndex, !0),
                this.resetSearch()
            }
            onKeySearch(e) {
                "Enter" === e.key ? this.onSearch() : "Escape" === e.key ? this.onReset() : 0 === this.$search.value.length ? (this.isEmpty = !0,
                d.cancelAnimation(this.searchA),
                this.searchA = c.p8.to(this.$searchReset, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                })) : this.$search.value.length > 0 && this.isEmpty && (this.isEmpty = !1,
                d.cancelAnimation(this.searchA),
                this.searchA = c.p8.to(this.$searchReset, {
                    autoAlpha: 1,
                    ease: "beaucoup.alpha",
                    duration: .3
                }))
            }
            onSearch() {
                if (!this.canSearch || this.oldSearch === this.$search.value)
                    return;
                const e = this.$search.value;
                this.canSearch = !1,
                this.hasSearch = !0,
                this.onOverlayClick(),
                this.$search.blur(),
                this.fetch(this.filter.currentFilter, -1, null, !1, e),
                this.oldSearch = e
            }
            resetSearch() {
                this.$search && (this.$search.value = "",
                this.oldSearch = "",
                this.isEmpty = !0,
                d.cancelAnimation(this.searchA),
                this.searchA = c.p8.to(this.$searchReset, {
                    autoAlpha: 0,
                    ease: "beaucoup.alpha",
                    duration: .3
                }))
            }
            setScrollValue() {
                0 !== window.scrollY && (d.pageScroll[window.location.pathname + window.location.search] = this.hasSearch ? 0 : window.scrollY)
            }
            manageScrollRestoration() {
                const e = window.location.pathname + window.location.search;
                void 0 !== d.pageScroll[e] && window.scrollTo({
                    top: d.pageScroll[e]
                })
            }
            onTermClick(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const s = this.$terms[e].dataset.id;
                this.currentFilterIndex = e,
                this.currentParentIndex = -1,
                this.isMobile && null === this.currentSubterms && !t && this.onTogglerClick(!1),
                null !== this.currentSubterms && this.close(this.currentSubterms),
                this.resetSearch(),
                (this.filter.currentFilter !== s || this.filter.currentFilter === s && this.hasSearch) && this.fetch(s, 1, e),
                this.hasSearch = !1
            }
            onSubtermClick(e, t) {
                const s = this.subCategories[e].termsDom[t].dataset.id;
                if (this.currentFilterIndex = t,
                this.currentParentIndex = e,
                null !== this.currentSubterms && this.close(this.currentSubterms),
                this.isMobile && this.onTogglerClick(!1),
                this.resetSearch(),
                this.filter.currentFilter !== s || this.filter.currentFilter === s && this.hasSearch) {
                    for (let s = 0; s < this.subCategories.length; s++)
                        if (s === e)
                            for (let e = 0; e < this.subCategories[s].termsDom.length; e++)
                                this.subCategories[s].termsDom[e].classList.toggle("a", e === t);
                        else
                            for (let e = 0; e < this.subCategories[s].termsDom.length; e++)
                                this.subCategories[s].termsDom[e].classList.remove("a");
                    this.fetch(s, 1, e, !0)
                }
                this.hasSearch = !1
            }
            onParentClick(e) {
                const {termsDom: t, wrapper: s, icon: i} = this.subCategories[e]
                  , r = this.currentSubterms;
                if (d.cancelAnimation(this.openSubterms),
                null !== this.currentSubterms) {
                    const t = this.isMobile || null !== e && e !== r;
                    this.close(this.currentSubterms, t)
                }
                r !== e && (i.classList.add("a"),
                s.classList.remove("pointer-events-none"),
                this.$overlay.classList.remove("pointer-events-none"),
                this.currentSubterms = e,
                this.openSubterms = c.p8.timeline(),
                this.openSubterms.to(this.$overlay, {
                    opacity: .75,
                    ease: "power2.out",
                    duration: .4
                }, 0).fromTo(t, {
                    autoAlpha: this.isMobile ? 1 : 0,
                    y: e => this.isMobile ? -t[e].offsetHeight * (e + 1) - 3 : 50
                }, {
                    y: 0,
                    autoAlpha: 1,
                    ease: "beaucoup.out",
                    stagger: .05,
                    duration: this.isMobile ? 1 : .8
                }, 0))
            }
            close(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const s = e || this.currentSubterms;
                if (d.cancelAnimation(this.closeSubterms),
                d.cancelAnimation(this.openSubterms),
                this.closeSubterms = c.p8.timeline(),
                this.currentSubterms = null,
                Number.isInteger(s)) {
                    const {termsDom: e, wrapper: t, icon: i} = this.subCategories[s];
                    i.classList.remove("a"),
                    t.classList.add("pointer-events-none"),
                    this.closeSubterms.fromTo(e, {
                        y: 0
                    }, {
                        y: t => this.isMobile ? -e[t].offsetHeight * (t + 1) - 3 : 0,
                        autoAlpha: this.isMobile ? 1 : 0,
                        ease: "power2.out",
                        duration: .4
                    }, 0)
                }
                t || (this.isMobile && this.onTogglerClick(!1),
                this.$overlay.classList.add("pointer-events-none"),
                this.closeSubterms.to(this.$overlay, {
                    opacity: 0,
                    ease: "power2.out",
                    duration: .4
                }, .2))
            }
            fetch(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                  , s = arguments.length > 2 ? arguments[2] : void 0
                  , i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
                  , r = arguments.length > 4 ? arguments[4] : void 0;
                if (this.page = t,
                1 === t)
                    if (i) {
                        for (let e = 0; e < this.$terms.length; e++)
                            this.$terms[e].classList.remove("a");
                        for (let e = 0; e < this.$parentTerms.length; e++)
                            this.$parentTerms[e].classList.toggle("a", e === s)
                    } else {
                        for (let e = 0; e < this.subCategories.length; e++)
                            for (let t = 0; t < this.subCategories[e].termsDom.length; t++)
                                this.subCategories[e].termsDom[t].classList.remove("a");
                        for (let e = 0; e < this.$terms.length; e++)
                            this.$terms[e].classList.toggle("a", e === s);
                        for (let e = 0; e < this.$parentTerms.length; e++)
                            this.$parentTerms[e].classList.remove("a")
                    }
                1 === t || -1 === t ? (this.$cards = this.$el.querySelectorAll(".card-work"),
                this.$cards && this.$cards.length > 0 && (this.hideAnimation = c.p8.to(this.$cards, {
                    opacity: 0,
                    ease: "power2.out",
                    duration: .4,
                    onComplete: () => {
                        d.smoothScroll.scrollTo(0, {
                            immediate: !0
                        })
                    }
                }))) : this.hideAnimation = null,
                this.fetchPosts = this.filter.fetchPosts(e, t, r);
                const o = this.hideAnimation ? [this.fetchPosts, this.hideAnimation._prom] : [this.fetchPosts];
                Promise.all(o).then((e => {
                    e[0].html.length > 0 && c.p8.to(this.$searchMsg, {
                        autoAlpha: 0,
                        ease: "beaucoup.alpha",
                        duration: .2
                    }),
                    0 === e[0].html.length && c.p8.to(this.$searchMsg, {
                        autoAlpha: 1,
                        ease: "beaucoup.alpha",
                        duration: .3
                    }),
                    this.onFetch(e[0])
                }
                ))
            }
            onFetch(e) {
                (1 === this.page || -1 === this.page) && (this.$wrapper.innerHTML = ""),
                this.els = this.addContent(e.html);
                const t = c.p8.timeline();
                this.els && this.els.length > 0 && t.fromTo(this.els, {
                    opacity: 0,
                    yPercent: 100
                }, {
                    opacity: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: "expo.out",
                    stagger: .05,
                    onComplete: () => {
                        d.smoothScroll.resize()
                    }
                }),
                t.call(( () => {
                    -1 === this.page && (this.canSearch = !0)
                }
                ), [], .75),
                e.isLast ? (this.loadST.disable(),
                this.$loadMore.classList.add("hidden")) : (this.loadST.enabled || (this.$loadMore.classList.remove("hidden"),
                this.loadST.enable()),
                this.loadST.refresh())
            }
            addContent(e) {
                const t = [];
                for (let s = 0; s < e.length; s++) {
                    const i = document.createElement("div");
                    i.classList.add("col-span-full", "md:col-span-6", "opacity-0"),
                    i.innerHTML = e[s],
                    this.$wrapper.appendChild(i),
                    t.push(i)
                }
                return t
            }
            onTogglerClick(e, t) {
                this.isFilterOpen = void 0 === e ? !this.isFilterOpen : e,
                this.$termsWrapper.classList.toggle("pointer-events-none", !this.isFilterOpen),
                d.cancelAnimation(this.filterTl),
                t && null !== this.currentSubterms && this.close(this.currentSubterms),
                this.$overlay.classList.toggle("pointer-events-none", !this.isFilterOpen),
                this.filterTl = c.p8.timeline({
                    onStart: () => {
                        this.isFilterOpen && this.$filterOverlay.classList.remove("opacity-0")
                    }
                }),
                this.filterTl.fromTo(this.$termsW, {
                    y: e => this.isFilterOpen ? this.bounds[e].y : 0
                }, {
                    y: e => this.isFilterOpen ? 0 : this.bounds[e].y,
                    ease: "beaucoup.out",
                    stagger: this.isFilterOpen ? .05 : 0,
                    duration: 1
                }, 0).call(( () => {
                    !this.isFilterOpen && this.$filterOverlay.classList.add("opacity-0")
                }
                ), [], "<18%").to(this.$overlay, {
                    opacity: this.isFilterOpen ? .75 : 0,
                    ease: "power2.out",
                    duration: .4
                }, 0)
            }
            setFilterElements() {
                c.p8.set(this.$overlay, {
                    opacity: 0
                }),
                this.isMobile ? c.p8.set(this.$termsW, {
                    y: e => this.bounds[e].y
                }) : c.p8.set(this.$termsW, {
                    y: 0,
                    autoAlpha: 1
                })
            }
            setItems() {
                this.bounds = [],
                c.p8.set(this.$termsW, {
                    y: 0
                });
                for (let e = 0; e < this.$termsW.length; e++)
                    this.bounds.push({
                        y: -this.$termsW[e].getBoundingClientRect().bottom - 5
                    });
                !this.isFilterOpen && this.isMobile && c.p8.set(this.$termsW, {
                    y: e => this.bounds[e].y
                })
            }
            resize() {
                this.setItems(),
                d.w.w < 768 && !this.isMobile ? (this.isMobile = !0,
                this.setFilterElements()) : d.w.w >= 768 && this.isMobile && (this.isMobile = !1,
                this.setFilterElements())
            }
            scroll() {
                this.setScrollValue()
            }
        }
        var le = [{
            name: "home",
            Class: class extends Y {
                init() {
                    this.index = 0,
                    this.currentIndex = 0,
                    this.oldIndex = 0,
                    this.slidesL = this.$slides.length,
                    this.isDragging = !1,
                    this.drag = {
                        start: {
                            x: 0
                        },
                        end: {
                            x: 0
                        },
                        x: 0,
                        speed: 2,
                        progress: 0,
                        dragging: !1,
                        canDrag: !0
                    },
                    this.cursor = new K({
                        el: this.$cursor
                    }),
                    this.mm = new ie({
                        cb: this.move,
                        mobile: !0
                    }),
                    this.slides[1].video && this.load(this.slides[1].video.dataset.src, this.slides[1].video).then(( () => {
                        this.slides[1].loaded = !0
                    }
                    )),
                    this.slides[this.slidesL - 1].video && this.load(this.slides[this.slidesL - 1].video.dataset.src, this.slides[this.slidesL - 1].video).then(( () => {
                        this.slides[this.slidesL - 1].loaded = !0
                    }
                    ))
                }
                bindMethods() {
                    this.prev = this.prev.bind(this),
                    this.next = this.next.bind(this),
                    this.down = this.down.bind(this),
                    this.up = this.up.bind(this),
                    this.move = this.move.bind(this),
                    this.openPopup = this.openPopup.bind(this)
                }
                getElems() {
                    this.slides = [],
                    this.$cursor = this.$el.querySelector(".cursor"),
                    this.$titlesWrapper = this.$el.querySelectorAll(".slide-titles"),
                    this.$slides = this.$el.querySelectorAll(".slide-m"),
                    this.$slidesD = this.$el.querySelectorAll(".slide-d"),
                    this.$slidesInner = this.$el.querySelectorAll(".slide-m .slide-inner"),
                    this.$titles = this.$el.querySelectorAll(".slide-title"),
                    this.$clients = this.$el.querySelectorAll(".slide-client"),
                    this.$pagerLeft = this.$el.querySelector(".pager-left"),
                    this.$pagerRight = this.$el.querySelector(".pager-right"),
                    this.$button = this.$el.querySelector(".play-button");
                    for (let e = 0; e < this.$slidesD.length; e++)
                        this.$slidesD[e].classList.add("hidden");
                    for (let e = 0; e < this.$slides.length; e++) {
                        const t = this.$slides[e].classList.contains("is-video") && this.$slides[e].querySelector("video")
                          , s = this.$slides[e].querySelector(".slide-image-placeholder");
                        t && t.addEventListener("play", ( () => {
                            s.classList.add("opacity-0")
                        }
                        )),
                        this.slides.push({
                            slide: this.$slides[e],
                            inner: this.$slidesInner[e],
                            client: this.$clients[e],
                            title: this.$titles[e],
                            video: t,
                            loaded: 0 === e,
                            titleWrapper: this.$titlesWrapper[e],
                            popup: {
                                url: this.$slides[e].dataset.popupVideo,
                                link: this.$titlesWrapper[e].href
                            },
                            xPercent: {
                                slide: {
                                    target: e > 0 ? 100 : 0,
                                    lerp: e > 0 ? 100 : 0
                                },
                                inner: {
                                    target: e > 0 ? -100 : 0,
                                    lerp: e > 0 ? -100 : 0
                                }
                            }
                        }),
                        e > 0 ? (c.p8.set(this.$slides[e], {
                            xPercent: 100
                        }),
                        c.p8.set(this.$slidesInner[e], {
                            xPercent: -100
                        }),
                        c.p8.set([this.$titles[e], this.$clients[e]], {
                            opacity: 0
                        })) : this.$titlesWrapper[e].classList.add("pointer-events-auto")
                    }
                }
                events() {
                    this.$pagerLeft.addEventListener("click", this.prev),
                    this.$pagerRight.addEventListener("click", this.next),
                    this.$button.addEventListener("click", this.openPopup),
                    document.body.addEventListener("touchstart", this.down),
                    document.body.addEventListener("touchend", this.up),
                    d.popup.on("open", ( () => {
                        this.cursor.setLoading(!1)
                    }
                    )),
                    d.popup.on("close", ( () => {
                        this.cursor.setLoading(!1)
                    }
                    ))
                }
                appear() {
                    document.documentElement.classList.add("overflow-hidden"),
                    this.slides[0].video && (this.slides[0].video.play(),
                    this.slides[0].video.onended = () => {
                        this.next()
                    }
                    ),
                    this.mm.on()
                }
                destroy() {
                    this.mm.off(),
                    document.documentElement.classList.remove("overflow-hidden"),
                    document.body.removeEventListener("touchstart", this.down),
                    document.body.removeEventListener("touchend", this.up)
                }
                openPopup() {
                    const {url: e, link: t} = this.slides[this.currentIndex].popup;
                    this.cursor.setLoading(!0),
                    d.popup.open(e, t)
                }
                _set(e, t, s) {
                    this.slides[e].xPercent.slide.target = t,
                    this.slides[e].xPercent.slide.lerp = t,
                    this.slides[e].xPercent.inner.target = s,
                    this.slides[e].xPercent.inner.lerp = s
                }
                down(e) {
                    this.drag.start.x = e.changedTouches ? e.changedTouches[0].clientX * this.drag.speed : e.clientX * this.drag.speed,
                    this.firstMove = !0
                }
                onDrag() {
                    c.p8.to([this.slides[this.currentIndex].title, this.slides[this.currentIndex].client], {
                        opacity: 0,
                        ease: "power2.out",
                        duration: .3
                    })
                }
                move(e) {
                    if (this.drag.canDrag && !d.menuOpen)
                        if (this.drag.dragging = Math.abs(e - this.drag.start.x) >= 4,
                        this.drag.x = this.drag.end.x + e * this.drag.speed - this.drag.start.x,
                        this.drag.progress = c.p8.utils.clamp(-1, 1, this.drag.x / d.w.w),
                        this.drag.dragging && !this.isDragging && (this.isDragging = !0,
                        this.onDrag()),
                        this.slides[this.currentIndex].xPercent.slide.target = 100 * this.drag.progress,
                        this.slides[this.currentIndex].xPercent.inner.target = -80 * this.drag.progress,
                        this.drag.progress > 0) {
                            const e = this.index - 1
                              , t = c.p8.utils.wrap(0, this.slidesL, e);
                            1 === this.drag.dragDirection && (this.slides[this.drag.dragIndex].xPercent.slide.target = 100,
                            this.slides[this.drag.dragIndex].xPercent.inner.target = -80,
                            this._set(t, -100, 80),
                            this.slides[t].video && this.slides[t].video.play()),
                            this.drag.dragDirection = -1,
                            this.drag.dragIndex = t,
                            this.oldIndex = t,
                            this.firstMove && (this._set(t, -100, 80),
                            this.firstMove = !1,
                            this.slides[t].video && this.slides[t].video.play()),
                            this.slides[t].xPercent.slide.target = 100 * this.drag.progress - 100,
                            this.slides[t].xPercent.inner.target = 80 - 80 * this.drag.progress
                        } else {
                            const e = this.index + 1
                              , t = c.p8.utils.wrap(0, this.slidesL, e);
                            -1 === this.drag.dragDirection && (this.slides[this.drag.dragIndex].xPercent.slide.target = -100,
                            this.slides[this.drag.dragIndex].xPercent.inner.target = 80,
                            this._set(t, 100, -80),
                            this.slides[t].video && this.slides[t].video.play()),
                            this.drag.dragDirection = 1,
                            this.drag.dragIndex = t,
                            this.oldIndex = t,
                            this.firstMove && (this._set(t, 100, -80),
                            this.firstMove = !1,
                            this.slides[t].video && this.slides[t].video.play()),
                            this.slides[t].xPercent.slide.target = 100 + 100 * this.drag.progress,
                            this.slides[t].xPercent.inner.target = -80 - 80 * this.drag.progress
                        }
                }
                up() {
                    this.drag.dragging && this.drag.canDrag && (this.drag.canDrag = !1,
                    this.drag.end.x = this.drag.x,
                    setTimeout(( () => {
                        this.drag.canDrag = !0
                    }
                    ), 600),
                    this.drag.progress < -.5 ? this.next(!1) : this.drag.progress > .5 ? this.prev(!1) : this.reset(this.drag.progress),
                    this.drag.start.x = 0,
                    this.drag.end.x = 0,
                    this.drag.progress = 0,
                    this.drag.dragging = !1,
                    this.drag.dragDirection = 0,
                    this.isDragging = !1)
                }
                reset(e) {
                    const t = this.slides[this.oldIndex]
                      , s = this.slides[this.currentIndex];
                    t.xPercent.slide.target = e > 0 ? -100 : 100,
                    t.xPercent.inner.target = e > 0 ? 80 : -80,
                    s.xPercent.slide.target = 0,
                    s.xPercent.inner.target = 0,
                    c.p8.to([this.slides[this.currentIndex].title, this.slides[this.currentIndex].client], {
                        opacity: 1,
                        ease: "power2.out",
                        duration: .4
                    })
                }
                prev() {
                    let e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    if (this.isAnimating)
                        return;
                    e && (this.isAnimating = !0,
                    setTimeout(( () => {
                        this.isAnimating = !1
                    }
                    ), 500)),
                    this.oldIndex = this.currentIndex,
                    this.index--,
                    this.currentIndex = c.p8.utils.wrap(0, this.slidesL, this.index);
                    const t = c.p8.utils.wrap(0, this.slidesL, this.index - 1);
                    this.slides[t].video && !this.slides[t].loaded && this.load(this.slides[t].video.dataset.src, this.slides[t].video).then(( () => {
                        this.slides[t].loaded = !0
                    }
                    )),
                    this.animation && this.animation.isActive() && (this.animation.pause(),
                    this.animation.invalidate(),
                    this.animation.kill());
                    const s = this.slides[this.oldIndex]
                      , i = this.slides[this.currentIndex];
                    s.video.onended = null,
                    s.video && s.video.pause(),
                    i.video && (e && (i.video.currentTime = 0),
                    i.video.play(),
                    i.video.onended = () => {
                        i.video.play(),
                        this.next()
                    }
                    ),
                    s.titleWrapper.classList.remove("pointer-events-auto"),
                    i.titleWrapper.classList.add("pointer-events-auto"),
                    this.animation = c.p8.timeline({
                        defaults: {
                            ease: "power2.out",
                            duration: .6
                        }
                    }),
                    this.animation.to([s.title, s.client], {
                        opacity: 0,
                        duration: .3
                    }, 0),
                    this.animation.to([i.title, i.client], {
                        opacity: 1
                    }, .2),
                    s.xPercent.slide.target = 100,
                    s.xPercent.inner.target = -80,
                    e && (i.xPercent.slide.target = -100,
                    i.xPercent.slide.lerp = -100,
                    i.xPercent.inner.target = 80,
                    i.xPercent.inner.lerp = 80),
                    i.xPercent.slide.target = 0,
                    i.xPercent.inner.target = 0
                }
                next() {
                    let e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    if (this.isAnimating)
                        return;
                    e && (this.isAnimating = !0,
                    setTimeout(( () => {
                        this.isAnimating = !1
                    }
                    ), 500)),
                    this.oldIndex = this.currentIndex,
                    this.index++,
                    this.currentIndex = c.p8.utils.wrap(0, this.slidesL, this.index);
                    const t = c.p8.utils.wrap(0, this.slidesL, this.index + 1);
                    this.slides[t].video && !this.slides[t].loaded && this.load(this.slides[t].video.dataset.src, this.slides[t].video).then(( () => {
                        this.slides[t].loaded = !0
                    }
                    )),
                    this.animation && this.animation.isActive() && (this.animation.pause(),
                    this.animation.invalidate(),
                    this.animation.kill());
                    const s = this.slides[this.oldIndex]
                      , i = this.slides[this.currentIndex];
                    s.video.onended = null,
                    s.video && s.video.pause(),
                    i.video && (e && (i.video.currentTime = 0),
                    i.video.play(),
                    i.video.onended = () => {
                        i.video.play(),
                        this.next()
                    }
                    ),
                    s.titleWrapper.classList.remove("pointer-events-auto"),
                    i.titleWrapper.classList.add("pointer-events-auto"),
                    this.animation = c.p8.timeline({
                        defaults: {
                            ease: "power2.out",
                            duration: .6
                        }
                    }),
                    this.animation.to([s.title, s.client], {
                        opacity: 0,
                        duration: .3
                    }, 0),
                    this.animation.to([i.title, i.client], {
                        opacity: 1
                    }, .2),
                    s.xPercent.slide.target = -100,
                    s.xPercent.inner.target = 80,
                    e && (i.xPercent.slide.target = 100,
                    i.xPercent.slide.lerp = 100,
                    i.xPercent.inner.target = -80,
                    i.xPercent.inner.lerp = -80),
                    i.xPercent.slide.target = 0,
                    i.xPercent.inner.target = 0
                }
                load(e, t) {
                    return new Promise((s => {
                        t.src = e,
                        t.load(),
                        t.addEventListener("loadeddata", ( () => {
                            s()
                        }
                        ))
                    }
                    ))
                }
                update() {
                    for (let e = 0; e < this.slides.length; e++) {
                        const {slide: t, inner: s, xPercent: i} = this.slides[e];
                        i.slide.lerp = d.lerp(i.slide.lerp, i.slide.target, .09),
                        i.inner.lerp = d.lerp(i.inner.lerp, i.inner.target, .09),
                        d.unequal(i.slide.target, i.slide.lerp) && (t.style.transform = `translate3d(${i.slide.lerp}%, 0, 0)`,
                        s.style.transform = `translate3d(${i.inner.lerp}%, 0, 0)`)
                    }
                }
            }
        }, {
            name: "cover",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    this.$cursor && (this.cursor = new K({
                        el: this.$cursor
                    })),
                    d.isFirstLoaded && this.$header.classList.add("h"),
                    d.previousWorksPage && (this.$backButton.href = d.previousWorksPage,
                    this.$crossButton.href = d.previousWorksPage)
                }
                bindMethods() {
                    this.onClick = this.onClick.bind(this)
                }
                getElems() {
                    this.$header = document.querySelector(".header"),
                    this.$cursor = this.$el.querySelector(".cursor"),
                    this.$backButton = document.querySelector(".back-button"),
                    this.$crossButton = document.querySelector(".cross-button"),
                    this.popup = {
                        url: this.$el.dataset.popupUrl
                    }
                }
                events() {
                    this.$el.dataset.popupUrl && this.$el.addEventListener("click", this.onClick),
                    d.popup.on("open", ( () => {
                        this.cursor && this.cursor.setLoading(!1)
                    }
                    )),
                    d.popup.on("close", ( () => {
                        this.cursor && this.cursor.setLoading(!1)
                    }
                    ))
                }
                destroy() {
                    this.$header.classList.remove("h", "h-fast")
                }
                appear() {
                    !d.isFirstLoaded && this.$header.classList.add("h-fast")
                }
                onClick() {
                    this.cursor && this.cursor.setLoading(!0),
                    d.popup.open(this.popup.url)
                }
            }
        }, {
            name: "works",
            Class: ae
        }, {
            name: "reels",
            Class: ae
        }, {
            name: "bande",
            Class: class extends Y {
                init() {
                    this.destroyLast = !0,
                    this.mode = this.$el.classList.contains("light") ? "light" : "dark"
                }
                getElems() {
                    this.cards = [],
                    this.$header = document.querySelector(".header"),
                    this.$headerGradient = this.$header.querySelector(".gradient-bottom"),
                    this.$cards = this.$el.querySelectorAll(".card-work"),
                    this.setCardsEvent(this.$cards)
                }
                appear() {
                    this.$header.classList.add(this.mode),
                    this.$headerGradient.classList.add(this.mode)
                }
                destroy() {
                    this.$header.classList.remove(this.mode),
                    this.$headerGradient.classList.remove(this.mode)
                }
                setCardsEvent(e) {
                    for (let t = 0; t < e.length; t++)
                        this.cards.push({
                            dom: e[t],
                            popup: {
                                url: e[t].dataset.popupUrl,
                                link: e[t].dataset.popupLink
                            }
                        });
                    for (let e = 0; e < this.cards.length; e++) {
                        const {dom: t, popup: s} = this.cards[e];
                        s.url && t.addEventListener("click", this.onCardClick.bind(this, e))
                    }
                }
                onCardClick(e) {
                    const {popup: t} = this.cards[e];
                    d.popup.open(t.url, t.link)
                }
            }
        }, {
            name: "about",
            Class: class extends Y {
                init() {}
                bindMethods() {
                    this.showServices = this.showServices.bind(this),
                    this.showStudio = this.showStudio.bind(this)
                }
                getElems() {
                    this.$items = this.$el.querySelectorAll(".about-gallery-item"),
                    this.$images = this.$el.querySelectorAll(".about-gallery-item .image"),
                    this.$buttons = this.$el.querySelectorAll(".about-switcher"),
                    this.$title = this.$el.querySelector(".about-title"),
                    this.$description = this.$el.querySelector(".about-description"),
                    this.$text = this.$el.querySelector(".about-text"),
                    this.$servicesDescription = this.$el.querySelector(".about-services-description"),
                    this.$wrappers = this.$el.querySelectorAll(".about-wrapper"),
                    this.$gallery = this.$el.querySelectorAll(".main-image, .image-item"),
                    this.$wrappers[1].style.display = "none",
                    c.p8.set([this.$text, this.$servicesDescription], {
                        opacity: 0
                    })
                }
                events() {
                    this.$buttons[0].addEventListener("click", this.showStudio),
                    this.$buttons[1].addEventListener("click", this.showServices)
                }
                showServices() {
                    this.isServices || (d.cancelAnimation(this.showStudioTL),
                    this.isServices = !0,
                    this.$buttons[0].classList.remove("a"),
                    this.$buttons[1].classList.add("a"),
                    this.showServicesTL = c.p8.timeline({
                        onStart: () => {
                            this.$wrappers[1].style.display = "grid",
                            this.$wrappers[1].classList.add("switching")
                        }
                        ,
                        onComplete: () => {
                            this.$wrappers[0].style.display = "none",
                            this.$wrappers[1].classList.remove("switching")
                        }
                    }),
                    this.showServicesTL.to([this.$title, this.$description, this.$gallery], {
                        opacity: 0,
                        ease: "beaucoup.out",
                        duration: .5
                    }, 0).to([this.$text, this.$servicesDescription], {
                        opacity: 1,
                        ease: "beaucoup.out",
                        duration: .5,
                        onStart: () => {
                            d.smoothScroll.scrollTo(0, {
                                immediate: !0
                            })
                        }
                    }, .3))
                }
                showStudio() {
                    this.isServices && (d.cancelAnimation(this.showServicesTL),
                    this.isServices = !1,
                    this.$buttons[0].classList.add("a"),
                    this.$buttons[1].classList.remove("a"),
                    this.showStudioTL = c.p8.timeline({
                        onStart: () => {
                            this.$wrappers[0].style.display = "grid",
                            this.$wrappers[1].classList.add("switching")
                        }
                        ,
                        onComplete: () => {
                            this.$wrappers[1].style.display = "none",
                            this.$wrappers[1].classList.remove("switching")
                        }
                    }),
                    this.showStudioTL.to([this.$text, this.$servicesDescription], {
                        opacity: 0,
                        ease: "beaucoup.out",
                        duration: .5
                    }, 0).to([this.$title, this.$description, this.$gallery], {
                        opacity: 1,
                        ease: "beaucoup.out",
                        duration: .5,
                        onStart: () => {
                            d.smoothScroll.scrollTo(0, {
                                immediate: !0
                            })
                        }
                    }, .3))
                }
            }
        }];
        class he extends n.Th {
            onEnter() {
                if (this.splittings = new (x())({
                    target: ".content [data-splitting]"
                }),
                !d.detect.isMobile) {
                    const e = this.content.querySelectorAll("p > a, .contact a, .p404 a");
                    for (let t = 0; t < e.length; t++)
                        e[t].addEventListener("mouseenter", ( () => {
                            c.ZP.effects.blink(e[t], {
                                opacity: e[t].dataset.opacity
                            })
                        }
                        ))
                }
                this.blockList = d.detect.isMobile ? le : ne,
                this.blocks = [],
                this.blockList && this.blockList.length && this.initBlocks()
            }
            initBlocks() {
                for (let e = 0; e < this.blockList.length; e++) {
                    const t = this.content.querySelectorAll("." + this.blockList[e].name)
                      , s = {
                        name: this.blockList[e].name,
                        instances: []
                    };
                    for (let i = 0; i < t.length; i++) {
                        const r = {
                            el: t[i],
                            class: new this.blockList[e].Class(t[i])
                        };
                        s.instances.push(r)
                    }
                    this.blocks.push(s)
                }
            }
            onEnterCompleted() {
                for (let e = 0; e < this.blocks.length; e++)
                    for (let t = 0; t < this.blocks[e].instances.length; t++)
                        this.blocks[e].instances[t].class.onEnterCompleted();
                d.isFirstLoaded ? this.appear() : window.addEventListener("loaderComplete", this.appear.bind(this), {
                    once: !0
                })
            }
            appear() {
                for (let e = 0; e < this.blocks.length; e++)
                    for (let t = 0; t < this.blocks[e].instances.length; t++)
                        this.blocks[e].instances[t].class.appear()
            }
            onLeave() {
                for (let e = 0; e < this.blocks.length; e++)
                    for (let t = 0; t < this.blocks[e].instances.length; t++)
                        this.blocks[e].instances[t].class.destroyLast || this.blocks[e].instances[t].class.destroy()
            }
            onLeaveCompleted() {
                for (let e = 0; e < this.blocks.length; e++)
                    for (let t = 0; t < this.blocks[e].instances.length; t++)
                        this.blocks[e].instances[t].class.destroyLast && this.blocks[e].instances[t].class.destroy()
            }
            resize() {
                for (let e = 0; e < this.blocks.length; e++)
                    for (let t = 0; t < this.blocks[e].instances.length; t++)
                        this.blocks[e].instances[t].class.resize()
            }
            resizeX() {
                for (let e = 0; e < this.blocks.length; e++)
                    for (let t = 0; t < this.blocks[e].instances.length; t++)
                        this.blocks[e].instances[t].class.resizeX()
            }
            scroll(e) {
                for (let t = 0; t < this.blocks.length; t++)
                    for (let s = 0; s < this.blocks[t].instances.length; s++)
                        this.blocks[t].instances[s].class.scroll(e)
            }
            loop(e) {
                for (let t = 0; t < this.blocks.length; t++)
                    for (let s = 0; s < this.blocks[t].instances.length; s++)
                        this.blocks[t].instances[s].class.update(e)
            }
        }
        class de extends n.uT {
            onLeave(e) {
                let {done: t} = e;
                d.smoothScroll && d.smoothScroll.stop(),
                d.navigating = !0,
                c.ZP.to(d.fade, {
                    autoAlpha: 1,
                    duration: .4,
                    ease: "power2.out",
                    onComplete: () => {
                        d.smoothScroll && d.smoothScroll.scrollTo(0, {
                            immediate: !0,
                            force: !0
                        }),
                        t()
                    }
                })
            }
            onEnter(e) {
                let {to: t, done: s} = e;
                const i = c.ZP.timeline({
                    paused: !0
                });
                i.to(d.fade, {
                    autoAlpha: 0,
                    duration: .4,
                    ease: "power2.out",
                    onComplete: () => {
                        d.smoothScroll.__isStopped && d.smoothScroll.start(),
                        d.isWorkPrevious = "single-work" === t.dataset.template,
                        d.isWorkPrevious || (d.pageScroll = [])
                    }
                }).call(( () => {
                    d.navigating = !1,
                    s(),
                    "works" !== t.dataset.template && (d.previousWorksPage = null)
                }
                ), [], 0),
                "single-work" !== t.dataset.template || d.detect.isMobile ? i.play() : d.emitter.on("work-ready", ( () => {
                    i.play()
                }
                ))
            }
        }
        class ce {
            constructor() {
                this.gl = d.GL,
                this.path = window.location.origin + "/wp-content/themes/beaucoup/resources/scripts/GL/sources/",
                this.loaded = 0,
                this.sources = {},
                this.toLoad = [{
                    name: "logoTexture",
                    file: "logo.png",
                    loader: "textureLoader"
                }, {
                    name: "404Texture",
                    file: "404.png",
                    loader: "textureLoader"
                }],
                this.gltfLoader = d.GL.gltfLoader,
                this.textureLoader = d.GL.textureLoader
            }
            load() {
                return new Promise((e => {
                    for (let t = 0; t < this.toLoad.length; t++) {
                        const {name: s, file: i, loader: r} = this.toLoad[t];
                        "gltfLoader" === r ? this.gltfLoader.load(this.path + i, (t => {
                            this.sources[s] = t,
                            this.loaded++,
                            this.loaded === this.toLoad.length && e()
                        }
                        )) : "textureLoader" === r && this.textureLoader.load(this.path + i, (t => {
                            this.sources[s] = {
                                texture: t,
                                width: t.source.data.naturalWidth,
                                height: t.source.data.naturalHeight
                            },
                            this.loaded++,
                            this.loaded === this.toLoad.length && e()
                        }
                        ))
                    }
                }
                ))
            }
        }
        class ue {
            constructor() {
                this.isHome = "/" === window.location.pathname,
                this.isMobile = d.w.w < 768,
                this.getElems(),
                d.resources = d.detect.isMobile ? null : new ce,
                d.smoothScroll && d.smoothScroll.scrollTo(0, {
                    immediate: !0,
                    force: !0
                }),
                d.resources ? d.resources && d.resources.load().then(( () => {
                    this.animate()
                }
                )) : this.animate()
            }
            getElems() {
                this.links = [];
                let e = 92;
                if (d.w.w < 768 ? e = 19 : d.w.w >= 768 && d.w.w < 1024 ? e = 20 : d.w.w >= 1024 && d.w.w < 1200 && (e = 42),
                this.$el = document.querySelector(".loader"),
                this.$header = document.querySelector(".header"),
                this.$headerLines = [...document.querySelectorAll(".header-lines .line")].slice(0, e),
                this.$links = document.querySelectorAll(".header .h-link"),
                this.$linksLines = document.querySelectorAll(".header-items .line"),
                this.$toggler = this.$header.querySelector(".header-toggler-open"),
                this.$togglerLines = this.$header.querySelectorAll(".header-toggler .line"),
                this.$percent = this.isMobile ? this.$header.querySelector(".header-percent-mobile") : this.$header.querySelector(".header-percent"),
                this.isMobile)
                    this.$headerLines.push(...this.$togglerLines);
                else {
                    for (let e = 0; e < this.$links.length; e++) {
                        const t = this.$links[e].querySelectorAll(".h-link-title .char");
                        c.p8.set(t, {
                            opacity: 0,
                            x: -7
                        }),
                        this.links.push({
                            link: t,
                            lines: []
                        })
                    }
                    c.p8.set([this.$linksLines], {
                        opacity: 0
                    }),
                    this.links[0].lines = [this.$linksLines[0], this.$linksLines[1], this.$linksLines[2]],
                    this.links[1].lines = [this.$linksLines[3], this.$linksLines[4], this.$linksLines[5]],
                    this.links[2].lines = [this.$linksLines[6], this.$linksLines[7], this.$linksLines[8]]
                }
            }
            animate() {
                this.loaderTL = c.p8.timeline({
                    onComplete: () => {
                        this.$header.classList.remove("is-animating"),
                        c.p8.set(this.$header, {
                            zIndex: 17
                        })
                    }
                });
                const e = this.$percent;
                if (this.loaderTL.set(this.$header, {
                    zIndex: 26
                }).to(this.$headerLines, {
                    opacity: 1,
                    stagger: {
                        amount: 1.5
                    },
                    ease: "linear",
                    duration: .2,
                    onUpdate() {
                        e.innerText = Math.round(100 * this.progress())
                    }
                }, 0),
                this.loaderTL.to(this.$percent, {
                    opacity: 0,
                    ease: "power2.out",
                    duration: .3
                }, ">+=0.1"),
                this.isMobile)
                    this.loaderTL.to(this.$toggler, {
                        opacity: 1,
                        ease: "power2.out",
                        duration: .3
                    }, "<+=0.22").to([this.$headerLines], {
                        opacity: 0,
                        ease: "power2.out",
                        duration: .3
                    }, ">").call(( () => {
                        this.hide()
                    }
                    ), [], "<-=0.1");
                else {
                    for (let e = 0; e < this.links.length; e++) {
                        const {link: t, lines: s} = this.links[e];
                        this.loaderTL.fromTo(t, {
                            opacity: 0,
                            x: -7
                        }, {
                            opacity: 1,
                            x: 0,
                            stagger: -.025,
                            ease: "beaucoup.out",
                            clearProps: "transform,opacity",
                            duration: .7
                        }, 0 === e ? ">-=0.25" : ">-=0.3"),
                        s.length > 0 && this.loaderTL.to(s, {
                            opacity: 1,
                            stagger: .05,
                            ease: "power2.out",
                            duration: .3
                        }, ">-=0.7")
                    }
                    this.loaderTL.to([this.$headerLines, this.links[0].lines, this.links[1].lines, this.links[2].lines], {
                        opacity: 0,
                        ease: "power2.out",
                        duration: .4
                    }, ">").call(( () => {
                        this.hide()
                    }
                    ), [], this.isHome ? "<-=1" : "<")
                }
            }
            hide() {
                c.p8.timeline().to(this.$el, {
                    autoAlpha: 0,
                    ease: "power2.out",
                    duration: .5
                }, 0).call(( () => {
                    window.dispatchEvent(new CustomEvent("loaderComplete")),
                    d.isFirstLoaded = !0
                }
                ), [], 0)
            }
        }
        class pe extends class {
            constructor(e) {
                this.$el = e,
                this.paused = !0,
                this.isFullscreen = !1,
                this.bindMethods(),
                this.getElems(),
                this.events(),
                this.createTimelineAnimation()
            }
            bindMethods() {
                this.onKey = this.onKey.bind(this),
                this.onTimelineClick = this.onTimelineClick.bind(this),
                this.onVideoClick = this.onVideoClick.bind(this),
                this.onSoundClick = this.onSoundClick.bind(this),
                this.onFullscreenClick = this.onFullscreenClick.bind(this),
                this.onVideoEnded = this.onVideoEnded.bind(this)
            }
            getElems() {
                this.$video = this.$el.querySelector(".video"),
                this.$player = this.$el.querySelector(".player"),
                this.$playButton = this.$el.querySelector(".player-button"),
                this.$play = this.$el.querySelector(".player-play"),
                this.$pause = this.$el.querySelector(".player-pause"),
                this.$timeline = this.$el.querySelector(".player-timeline"),
                this.$timelineCurrent = this.$el.querySelector(".player-timeline-current"),
                this.$soundButton = this.$el.querySelector(".player-sound"),
                this.$soundOn = this.$el.querySelector(".player-sound-on"),
                this.$soundOff = this.$el.querySelector(".player-sound-off"),
                this.$fullscreen = this.$el.querySelector(".player-fullscreen")
            }
            events() {
                document.body.addEventListener("keydown", this.onKey),
                this.$timeline && this.$timeline.addEventListener("click", this.onTimelineClick),
                this.$playButton && this.$playButton.addEventListener("click", this.onVideoClick),
                this.$soundButton && this.$soundButton.addEventListener("click", this.onSoundClick),
                this.$fullscreen && this.$fullscreen.addEventListener("click", this.onFullscreenClick),
                this.$video && (this.$video.addEventListener("click", this.onVideoClick),
                this.$video.addEventListener("ended", this.onVideoEnded),
                this.$video.addEventListener("fullscreenchange", ( () => {
                    document.fullscreenElement || (this.isFullscreen = !1)
                }
                )),
                this.$video.addEventListener("waiting", ( () => {
                    this.isWaiting = !0,
                    this.$loading.classList.remove("opacity-0")
                }
                )),
                this.$video.addEventListener("playing", ( () => {
                    this.isWaiting && (this.isWaiting = !1,
                    this.$loading.classList.add("opacity-0"))
                }
                )),
                this.$video.addEventListener("seeked", ( () => {
                    this.$loading.classList.add("opacity-0")
                }
                )),
                this.$video.addEventListener("seeking", ( () => {
                    this.$loading.classList.remove("opacity-0")
                }
                )))
            }
            load(e) {
                return new Promise((t => {
                    this.$video.src = e,
                    this.$video.load(),
                    this.$video.onloadeddata = () => {
                        this.play(),
                        t()
                    }
                }
                ))
            }
            play() {
                this.paused = !1,
                this.$video.play(),
                this.$playButton.classList.remove("a")
            }
            pause() {
                this.paused = !0,
                this.$video.pause(),
                this.$playButton.classList.add("a")
            }
            toggle() {
                this.paused ? this.play() : this.pause()
            }
            createTimelineAnimation() {
                this.timelineAnimation = c.p8.timeline({
                    paused: !0
                }),
                this.timelineAnimation.fromTo(this.$timelineCurrent, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: "linear"
                })
            }
            onTimelineClick(e) {
                const t = this.$timeline.getBoundingClientRect()
                  , s = d.round(c.p8.utils.clamp(0, 1, c.p8.utils.mapRange(t.left, t.right, 0, 1, e.clientX)));
                this.$video.currentTime = this.$video.duration * s,
                this.paused && c.p8.to(this.timelineAnimation, {
                    progress: s,
                    duration: .9,
                    ease: "expo.out"
                })
            }
            onVideoClick() {
                this.toggle()
            }
            onSoundClick() {
                this.$video.muted ? (this.$soundButton.classList.remove("a"),
                this.$video.muted = !1) : (this.$soundButton.classList.add("a"),
                this.$video.muted = !0)
            }
            onFullscreenClick() {
                this.isFullscreen = !0,
                this.$video.requestFullscreen()
            }
            onVideoEnded() {
                this.isFullscreen && document.exitFullscreen()
            }
            onKey(e) {
                "Space" === e.code && this.toggle()
            }
            showUI() {
                this.$player.classList.remove("opacity-0")
            }
            hideUI() {
                this.$player.classList.add("opacity-0")
            }
            update() {
                this.$video && !this.paused && this.timelineAnimation.progress(this.$video.currentTime / this.$video.duration)
            }
        }
        {
            constructor(e) {
                let {el: t} = e;
                super(t),
                this.isOpen = !1,
                this.hideUIDelay = 1e3,
                this.callbacks = [],
                this.splittings = new (x())({
                    target: this.$hLinks
                }),
                c.p8.set(this.$el, {
                    autoAlpha: 0
                })
            }
            bindMethods() {
                super.bindMethods(),
                this.onMove = this.onMove.bind(this),
                this.onDebouncedMove = (0,
                l.D)(100, this.onLastMove.bind(this))
            }
            getElems() {
                super.getElems(),
                this.$header = this.$el.querySelector(".popup-header"),
                this.$gradient = this.$el.querySelector(".gradient-bottom"),
                this.$title = this.$el.querySelector(".popup-title"),
                this.$client = this.$el.querySelector(".popup-client"),
                this.$link = this.$el.querySelector(".popup-link"),
                this.$close = this.$el.querySelector(".popup-close"),
                this.$loading = this.$el.querySelector(".popup-loading"),
                this.$hLinks = this.$el.querySelectorAll(".h-link")
            }
            events() {
                super.events(),
                this.$close && this.$close.addEventListener("click", ( () => this.close())),
                !d.detect.isMobile && this.$el.addEventListener("mousemove", this.onMove),
                !d.detect.isMobile && this.$el.addEventListener("mousemove", this.onDebouncedMove),
                window.matchMedia("(orientation: portrait)").addEventListener("change", (e => {
                    if (!this.isOpen)
                        return;
                    const t = this.$video.requestFullscreen || this.$video.msRequestFullscreen || this.$video.mozRequestFullScreen || this.$video.webkitRequestFullscreen
                      , s = e.matches;
                    this.pause(),
                    s ? (this.$video.setAttribute("playsinline", "playsinline"),
                    this.$video.webkitExitFullScreen()) : (this.$video.removeAttribute("playsinline"),
                    t && t.call(this.$video)),
                    this.play()
                }
                ))
            }
            onKey(e) {
                super.onKey(e),
                "Escape" === e.key && this.close()
            }
            open(e, t, s, i) {
                s && (this.$client.innerText = s),
                i && (this.$title.innerText = i),
                t && (this.$link.href = t),
                this.currentLink = t,
                t ? this.$link.classList.contains("opacity-0") && this.$link.classList.remove("opacity-0") : this.$link.classList.add("opacity-0"),
                this.load(e).then(( () => {
                    this.isOpen = !0,
                    this.triggerCallbacks("open"),
                    d.smoothScroll.stop(),
                    this.show()
                }
                ))
            }
            close(e) {
                this.isOpen = !1,
                this.pause(),
                this.hide(e),
                this.triggerCallbacks("close"),
                d.smoothScroll.start()
            }
            onVideoEnded() {
                super.onVideoEnded(),
                setTimeout(( () => {
                    this.isOpen && this.close()
                }
                ), 500)
            }
            show() {
                d.cancelAnimation(this.animation),
                this.$el.classList.remove("pointer-events-none"),
                this.animation = c.p8.to(this.$el, {
                    autoAlpha: 1,
                    ease: "power2.out",
                    duration: .4
                })
            }
            hide(e) {
                d.cancelAnimation(this.animation),
                this.$el.classList.add("pointer-events-none"),
                this.animation = c.p8.to(this.$el, {
                    autoAlpha: 0,
                    ease: "power2.out",
                    duration: e ? 0 : .25
                })
            }
            showUI() {
                super.showUI(),
                this.$link && this.currentLink && this.$link.classList.remove("opacity-0"),
                this.$gradient && this.$gradient.classList.remove("!opacity-0"),
                this.$header && this.$header.classList.remove("opacity-0")
            }
            hideUI(e) {
                e !== this.currentId || this.isMoving || this.$video.paused || (super.hideUI(),
                this.$link && this.currentLink && this.$link.classList.add("opacity-0"),
                this.$gradient && this.$gradient.classList.add("!opacity-0"),
                this.$header && this.$header.classList.add("opacity-0"))
            }
            onMove() {
                this.isMoving || (this.isMoving = !0,
                this.showUI())
            }
            onLastMove() {
                this.isMoving = !1,
                this.currentId = 10 * Math.random(),
                this.currentST = setTimeout(this.hideUI.bind(this, this.currentId), this.hideUIDelay)
            }
            onVideoClick() {
                super.onVideoClick(),
                this.$video.paused && this.showUI(),
                this.isMoving || d.detect.isMobile || (clearTimeout(this.currentST),
                this.onLastMove())
            }
            on(e, t) {
                this.callbacks[e] || (this.callbacks[e] = []),
                this.callbacks[e].push({
                    cb: t
                })
            }
            off() {
                this.callbacks = []
            }
            triggerCallbacks(e) {
                if (this.callbacks[e] && this.callbacks[e].length > 0)
                    for (let t = 0; t < this.callbacks[e].length; t++)
                        this.callbacks[e][t].cb()
            }
        }
        class me {
            constructor() {
                this.initSmoothScroll = this.initSmoothScroll.bind(this),
                this.resize = this.resize.bind(this),
                this.scroll = this.scroll.bind(this),
                this.update = this.update.bind(this),
                this.resizeDebounced = (0,
                l.D)(100, this.resize),
                this.scrollDebounced = (0,
                l.D)(100, this.scroll),
                this.scrollThrottled = (0,
                l.P)(30, this.scroll),
                d.w = {
                    w: window.innerWidth,
                    h: window.innerHeight,
                    pR: Math.min(1.5, window.devicePixelRatio)
                },
                c.p8.registerPlugin(p.t),
                p.t.create("beaucoup.out", "0.19, 1, 0.22, 1"),
                p.t.create("beaucoup.alpha", ".25, .46, .45, .9"),
                d.emitter = new (f()),
                c.p8.registerPlugin(u.i),
                d.scrollTrigger = u.i,
                d.detect.isMobile && document.documentElement.style.setProperty("--wh", d.w.h / 100 + "px"),
                this.oldWindowWidth = d.w.w,
                d.showDebug = "#debug" === window.location.hash && document.body.classList.contains("has-debug"),
                d.showDebug && (d.debug = new m.Pane({
                    title: "GUI"
                }),
                d.debug.registerPlugin(g),
                d.debug.registerPlugin(v),
                this.fpsGraph = d.debug.addBlade({
                    view: "fpsgraph",
                    label: "fpsgraph",
                    lineCount: 2
                })),
                this.start(),
                d.GL && d.GL.debug && d.GL.debug.setSceneChildrens(d.GL.scene.children.length)
            }
            start() {
                d.video = document.createElement("video"),
                d.video.setAttribute("crossorigin", "anonymous"),
                d.video.setAttribute("loop", !0),
                d.video.setAttribute("playsinline", !0),
                d.video.volume = 0,
                d.video.muted = !0,
                d.videoTexture = new b.fO1(d.video),
                history.scrollRestoration && (history.scrollRestoration = "manual"),
                d.fade = document.querySelector(".fade"),
                d.popup = new pe({
                    el: document.querySelector("#popup")
                }),
                this.initSmoothScroll(),
                d.detect.isMobile || (this.GL = new O({
                    canvas: document.querySelector("#gl")
                })),
                this.initTaxi(),
                this.lazyLoad = new (o()),
                this.header = new w,
                this.loader = new ue,
                this.events(),
                this.updateLinks(),
                this.addConsoleBrand(),
                c.p8.ticker.fps(60),
                c.p8.ticker.add(this.update)
            }
            initTaxi() {
                d.router = new n.QY({
                    links: "a:not([target]):not([href^=\\#]):not([data-taxi-ignore]):not(.ab-item)",
                    reloadJsFilter: e => void 0 !== e.dataset.taxiReload,
                    transitions: {
                        default: de
                    },
                    renderers: {
                        default: he
                    }
                }),
                this.currentRenderer = d.router.currentCacheEntry.renderer
            }
            initSmoothScroll() {
                d.smoothScroll && d.smoothScroll.destroy(),
                d.smoothScroll = new a.Z({
                    easing: e => 1 - Math.pow(1 - e, 5)
                }),
                window.lenis = d.smoothScroll,
                d.smoothScroll.on("scroll", (e => {
                    this.scroll(e)
                }
                ))
            }
            reloadTartaucitronServices() {
                if (!window.tarteaucitron)
                    return;
                const e = document.body.querySelectorAll(".tarteaucitronAllow");
                for (let t = 0; t < e.length; t++)
                    window.tarteaucitron.addClickEventToElement(e[t], (function() {
                        window.tarteaucitron.userInterface.respond(this, !0)
                    }
                    ))
            }
            resize() {
                d.w = {
                    w: window.innerWidth,
                    h: window.innerHeight,
                    pR: Math.min(1.5, window.devicePixelRatio)
                },
                d.w.w !== this.oldWindowWidth && (d.detect.isMobile && document.documentElement.style.setProperty("--wh", d.w.h / 100 + "px"),
                this.currentRenderer.resizeX()),
                this.header && this.header.resize(),
                this.GL && this.GL.resize(),
                this.currentRenderer.resize(),
                this.oldWindowWidth = d.w.w
            }
            scroll(e) {
                this.currentRenderer.scroll(e)
            }
            update(e) {
                const t = 1e3 * e;
                d.showDebug && this.fpsGraph.begin(),
                d.smoothScroll && d.smoothScroll.raf(t),
                this.currentRenderer.loop(t),
                this.GL && this.GL.update(),
                d.popup && d.popup.update(),
                d.showDebug && this.fpsGraph.end()
            }
            events() {
                window.addEventListener("resize", this.resizeDebounced),
                window.addEventListener("orientationchange", this.resize),
                window.addEventListener("wheel", this.scrollThrottled),
                window.addEventListener("wheel", this.scrollDebounced),
                d.router.on("NAVIGATE_IN", (e => {
                    let {to: t} = e;
                    this.currentRenderer = t.renderer,
                    d.popup.isOpen && d.popup.close(!0)
                }
                )),
                d.router.on("NAVIGATE_OUT", ( () => {
                    this.header.isMobile && this.header.isOpen && this.header.close()
                }
                )),
                d.router.on("NAVIGATE_END", (e => {
                    let {to: t} = e;
                    this.updateTracking(t),
                    this.header.onPageChange({
                        location
                    }),
                    this.reloadTartaucitronServices(),
                    this.updateLinks(),
                    this.lazyLoad.update(),
                    d.GL && d.GL.debug && d.GL.debug.setSceneChildrens(d.GL.scene.children.length)
                }
                ))
            }
            updateTracking(e) {
                void 0 !== window.gtag && window.gtag("event", "page_view", {
                    page_path: window.location.pathname,
                    page_title: e.page.title,
                    page_location: window.location.href
                })
            }
            updateLinks() {
                this.links = document.body.querySelectorAll("a"),
                this.siteUrl || (this.siteUrl = "http://site.localhost/");
                for (let e = 0; e < this.links.length; e++) {
                    const t = this.links[e];
                    t.href.indexOf(this.siteUrl) > -1 && (t.href = `${window.location.origin}/${t.href.split(this.siteUrl)[1]}`)
                }
            }
            addConsoleBrand() {
                console.log("\n %c ✦ Merci Beaucoup ✦ ", "background: #00F; color: #fffaf5; padding: 5px 0; margin-right: 5px;", "https://beaucoup.studio/ \n\n")
            }
        }
        class ge {
            constructor() {
                this.grid = document.querySelector(".debug-grid"),
                this.grid && this.addEvents()
            }
            addEvents() {
                document.addEventListener("keydown", (e => {
                    "g" !== e.key && "G" !== e.key || this.grid.classList.toggle("opacity-0")
                }
                ))
            }
        }
        const ve = async e => {
            e && console.error(e),
            new ge,
            setTimeout(( () => {
                new me
            }
            ), 500)
        }
        ;
        (0,
        i.Z)(ve)
    }
    ,
    "./scripts/GL/shaders/plane/plane.frag": e => {
        e.exports = "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uVideoTexture;\nuniform vec2 iResolution;\nuniform vec2 uMeshSize;\nuniform vec2 uImageSize;\nuniform vec2 uVideoSize;\nuniform float uVideoFormat;\nuniform float uAlpha;\nuniform float uFade;\nuniform float uProgress;\nuniform float uActive;\nuniform float uScale;\nuniform float uParallaxX;\nuniform float uParallaxY;\nuniform float uParallaxAmount;\nuniform float uPower;\nuniform float uPowerVideo;\nuniform float uSide;\nuniform float uSideReverse;\nuniform float uDistProgress;\nuniform float uDistProgressVideo;\nvarying vec2 vUv;\nvec2 aspect(in vec2 size, in float scale) {\n\treturn scale / size;\n}\nvec2 aspectCover(vec2 uv, vec2 imageSize, vec2 meshSize) {\n\tvec2 sizeRatio = imageSize / meshSize;\n\tvec2 newSize = aspect(sizeRatio, min(sizeRatio.x, sizeRatio.y));\n\tvec2 centeredSize = (uv * newSize) + ((1. - newSize) * 0.5);\n\treturn centeredSize;\n}\nvec2 aspectContain(vec2 uv, vec2 imageSize, vec2 meshSize) {\n\tvec2 sizeRatio = imageSize / meshSize;\n\tvec2 newSize = aspect(sizeRatio, max(sizeRatio.x, sizeRatio.y));\n\tvec2 centeredSize = (uv * newSize) + ((1. - newSize) * 0.5);\n\treturn centeredSize;\n}\nconst float radius = 1.;\nconst float strength = 1.;\nvec2 bulge(vec2 uv, vec2 center, float progress, float side, float sideReverse, float distProgress) {\n\tuv.y -= ((side - (center.x * progress)) * sideReverse);\n\tfloat dist = length(uv.y) / (radius * progress);\n\tfloat distPow = pow(dist, 1.8);\n\tfloat strengthAmount = strength / (1. + (distPow * distProgress));\n\tuv.y *= strengthAmount;\n\tuv.y += ((side - (center.x * progress)) * sideReverse);\n\treturn uv;\n}\nvec3 split(sampler2D tex, vec2 cUv, vec4 imgTex) {\n\tfloat r = texture2D(tex, cUv).r;\n\tfloat g = texture2D(tex, cUv).g;\n\tfloat b = texture2D(tex, cUv).b;\n\tvec3 splittedTexR = vec3(r, imgTex.g, imgTex.b);\n\tvec3 splittedTexG = vec3(imgTex.r, g, imgTex.b);\n\tvec3 splittedTexB = vec3(imgTex.r, imgTex.g, b);\n\tvec3 mixRG = mix(splittedTexG, splittedTexR, 1.);\n\tvec3 mixGB = mix(splittedTexG, splittedTexB, 1.);\n\tvec3 mixRB = mix(splittedTexR, splittedTexB, 1.);\n\treturn mix(mixRG, mixGB, b);\n}\nvoid main() {\n\tvec2 uv = vUv;\n\tvec2 bulgeUV = bulge(uv, vec2(0.5, 0.5), 1. - uPower, uSide, uSideReverse, uDistProgress);\n\tvec2 imageTexUv = aspectCover(bulgeUV, uImageSize, uMeshSize);\n\tvec4 imageTex = texture2D(uTexture, imageTexUv);\n\tvec2 bulgeUVR = bulge(imageTexUv, vec2(0.5, 0.5), 1. - (uPower * 0.6), uSide, uSideReverse, uDistProgress);\n\tvec3 finalImageTex = split(uTexture, bulgeUVR, imageTex);\n\tvec2 videoTexUv = aspectCover(uv, uVideoSize, uMeshSize);\n\tvec4 videoTex = texture2D(uVideoTexture, videoTexUv);\n\tvec3 finalTex = mix(finalImageTex, videoTex.rgb, uFade);\n\tgl_FragColor = vec4(finalTex.rgb, uAlpha);\n}\n"
    }
    ,
    "./scripts/GL/shaders/plane/plane.vert": e => {
        e.exports = "varying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vWorldNormal;\nvarying vec3 vNormal;\nvarying vec3 vEyeVector;\nuniform vec2 uMeshSize;\nuniform vec2 uImageSize;\nvec2 resizeUvCover(vec2 uv, vec2 size, vec2 resolution) {\n\tvec2 ratio = vec2(min((resolution.x / resolution.y) / (size.x / size.y), 1.0), min((resolution.y / resolution.x) / (size.y / size.x), 1.0));\n\treturn vec2((uv.x * ratio.x) + ((1.0 - ratio.x) * 0.5), (uv.y * ratio.y) + ((1.0 - ratio.y) * 0.5));\n}\nvoid main() {\n\tvUv = uv;\n\tvec4 worldPos = modelMatrix * vec4(position, 1.0);\n\tvec4 mvPosition = viewMatrix * worldPos;\n\tgl_Position = projectionMatrix * mvPosition;\n}\n"
    }
    ,
    "./scripts/GL/shaders/plane/planeContain.frag": e => {
        e.exports = "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uVideoTexture;\nuniform vec2 iResolution;\nuniform vec2 uMeshSize;\nuniform vec2 uImageSize;\nuniform vec2 uVideoSize;\nuniform float uVideoFormat;\nuniform float uAlpha;\nuniform float uFade;\nuniform float uProgress;\nuniform float uActive;\nuniform float uScale;\nuniform float uParallaxX;\nuniform float uParallaxY;\nuniform float uParallaxAmount;\nuniform float uPower;\nuniform float uPowerVideo;\nuniform float uSide;\nuniform float uSideReverse;\nuniform float uDistProgress;\nuniform float uDistProgressVideo;\nvarying vec2 vUv;\nvec2 aspect(in vec2 size, in float scale) {\n\treturn scale / size;\n}\nvec2 aspectContain(vec2 uv, vec2 imageSize, vec2 meshSize) {\n\tvec2 sizeRatio = imageSize / meshSize;\n\tvec2 newSize = aspect(sizeRatio, max(sizeRatio.x, sizeRatio.y));\n\tvec2 centeredSize = (uv * newSize) + ((1. - newSize) * 0.5);\n\treturn centeredSize;\n}\nvoid main() {\n\tvec2 uv = vUv;\n\tvec2 imageTexUv = aspectContain(uv, uImageSize, uMeshSize);\n\tvec4 imageTex = texture2D(uTexture, imageTexUv);\n\tvec2 imageLimit = abs(floor(imageTexUv));\n\tvec4 imageCropped = mix(vec4(0, 0, 0, 1), imageTex, step(max(imageLimit.x, imageLimit.y), 0.));\n\tgl_FragColor = vec4(imageCropped.rgb, uAlpha);\n}\n"
    }
    ,
    "./scripts/GL/shaders/plane/planeHome.frag": e => {
        e.exports = "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uVideoTexture;\nuniform vec2 uResolution;\nuniform vec2 uMeshSize;\nuniform vec2 uImageSize;\nuniform vec2 uVideoSize;\nuniform float uVideoFormat;\nuniform float uAlpha;\nuniform float uFade;\nuniform float uProgress;\nuniform float uActive;\nuniform float uScale;\nuniform float uParallaxX;\nuniform float uParallaxY;\nuniform float uParallaxAmount;\nuniform float uTranslateY;\nuniform float uPower;\nuniform float uTime;\nuniform float uSide;\nuniform float uSideReverse;\nuniform float uDistProgress;\nvarying vec2 vUv;\nvarying vec3 vWorldNormal;\nvarying vec3 vEyeVector;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvec2 aspect(in vec2 size, in float scale) {\n\treturn scale / size;\n}\nvec2 aspectCover(vec2 uv, vec2 imageSize, vec2 meshSize) {\n\tvec2 sizeRatio = imageSize / meshSize;\n\tvec2 newSize = aspect(sizeRatio, min(sizeRatio.x, sizeRatio.y));\n\tvec2 centeredSize = (uv * newSize) + ((1. - newSize) * 0.5);\n\treturn centeredSize;\n}\nvec2 aspectContain(vec2 uv, vec2 imageSize, vec2 meshSize) {\n\tvec2 sizeRatio = imageSize / meshSize;\n\tvec2 newSize = aspect(sizeRatio, max(sizeRatio.x, sizeRatio.y));\n\tvec2 centeredSize = (uv * newSize) + ((1. - newSize) * 0.5);\n\treturn centeredSize;\n}\nconst float radius = 1.;\nconst float strength = 1.;\nvec2 bulge(vec2 uv, vec2 center, float progress, float side, float sideReverse) {\n\tuv.x -= ((side - (center.x * progress)) * sideReverse);\n\tfloat dist = length(uv.x) / (radius * progress);\n\tfloat distPow = pow(dist, 1.8);\n\tfloat strengthAmount = strength / (1. + (distPow * uDistProgress));\n\tuv.x *= strengthAmount;\n\tuv.x += ((side - (center.x * progress)) * sideReverse);\n\treturn uv;\n}\nvoid main() {\n\tvec2 uv = vUv;\n\tvec2 bulgeUV = bulge(uv, vec2(0.5, 0.5), 1. - uPower, uSide, uSideReverse);\n\tvec2 imageTexUv = aspectCover(bulgeUV, uImageSize, uMeshSize);\n\tvec4 imageTex = texture2D(uTexture, imageTexUv);\n\tvec2 bulgeUVR = bulge(imageTexUv, vec2(0.5, 0.5), 1. - uPower, uSide, uSideReverse);\n\tfloat r = texture2D(uTexture, bulgeUVR).r;\n\tfloat g = texture2D(uTexture, bulgeUVR).g;\n\tfloat b = texture2D(uTexture, bulgeUVR).b;\n\tvec3 splittedTexR = vec3(r, imageTex.g, imageTex.b);\n\tvec3 splittedTexG = vec3(imageTex.r, g, imageTex.b);\n\tvec3 splittedTexB = vec3(imageTex.r, imageTex.g, b);\n\tvec3 mixRG = mix(splittedTexG, splittedTexR, 1.);\n\tvec3 mixGB = mix(splittedTexG, splittedTexB, 1.);\n\tvec3 mixRB = mix(splittedTexR, splittedTexB, 1.);\n\tvec3 finalMix = mix(mixRG, mixGB, b);\n\tvec3 finalTex = mix(imageTex.rgb, finalMix, 0.7);\n\tgl_FragColor = vec4(finalTex.rgb, uAlpha);\n}\n"
    }
    ,
    "./scripts/GL/shaders/stretch/stretch.frag": e => {
        e.exports = "precision highp float;\nuniform sampler2D tDiffuse;\nuniform float uProgress;\nvarying vec2 vUv;\nconst float radius = 1.;\nconst float strength = 1.;\nfloat map(float value, float min1, float max1, float min2, float max2) {\n\treturn min2 + (((value - min1) * (max2 - min2)) / (max1 - min1));\n}\nfloat distort(float baseUv, float pUv, float power, float force) {\n\tfloat distance = 0.05;\n\tfloat nUv = pow(pUv + distance, power) * force;\n\tfloat curve = max(0., nUv) + 1.0;\n\tcurve = map(curve, 1.0, 5.0, 1.0, 2.0);\n\tfloat p = ((curve - 1.0) / 2.0) / curve;\n\treturn (baseUv / curve) + p;\n}\nvoid main() {\n\tvec2 uv = vUv;\n\tfloat force = uProgress;\n\tforce = min(force, 5.);\n\tforce *= 0.08;\n\tvec2 texUv = uv;\n\ttexUv.y = distort(texUv.y, 1. - texUv.y, 18., force);\n\ttexUv.y = distort(texUv.y, texUv.y, 18., force);\n\tvec4 tex = texture2D(tDiffuse, texUv);\n\tvec2 rUV = uv;\n\tvec2 gUV = uv;\n\tvec2 bUV = uv;\n\trUV.y = distort(rUV.y, 1. - rUV.y, 15., force);\n\trUV.y = distort(rUV.y, 1. - rUV.y, 15., force);\n\trUV.y = distort(rUV.y, rUV.y, 15., force);\n\trUV.y = distort(rUV.y, rUV.y, 15., force);\n\tgUV.y = distort(gUV.y, 1. - gUV.y, 10., force);\n\tgUV.y = distort(gUV.y, gUV.y, 13., force);\n\tbUV.y = distort(bUV.y, 1. - bUV.y, 7., force);\n\tbUV.y = distort(bUV.y, bUV.y, 11., force);\n\tfloat r = texture2D(tDiffuse, rUV).r;\n\tfloat g = texture2D(tDiffuse, gUV).g;\n\tfloat b = texture2D(tDiffuse, bUV).b;\n\tfloat a = texture2D(tDiffuse, bUV).w;\n\tvec3 splittedTexR = vec3(r, tex.g, tex.b);\n\tvec3 splittedTexG = vec3(tex.r, g, tex.b);\n\tvec3 splittedTexB = vec3(tex.r, tex.g, b);\n\tvec3 mixRG = mix(splittedTexG, splittedTexR, 1.);\n\tvec3 mixGB = mix(splittedTexG, splittedTexB, 1.);\n\tvec3 mixRB = mix(splittedTexR, splittedTexB, 1.);\n\tvec3 finalTex = mix(mixRG, mixGB, b);\n\tgl_FragColor = vec4(finalTex, a);\n}\n"
    }
    ,
    "./scripts/GL/shaders/stretch/stretch.vert": e => {
        e.exports = "varying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = (projectionMatrix * modelViewMatrix) * vec4(position, 1.0);\n}\n"
    }
    ,
    "./scripts/GL/shaders/text/text.frag": e => {
        e.exports = "uniform sampler2D uTexture;\nuniform vec2 uMouse;\nuniform float uTime;\nuniform float uNoiseFactor;\nuniform float uNoiseScale;\nuniform float uRgbPersistFactor;\nuniform float uAlphaPersistFactor;\nuniform float uRepeatOffset;\nuniform float uSplit;\nvarying vec2 v_uv;\nvec4 permute(vec4 x) {\n\treturn mod(((x * 34.0) + 1.0) * x, 289.0);\n}\nvec4 taylorInvSqrt(vec4 r) {\n\treturn 1.79284291400159 - (0.85373472095314 * r);\n}\nfloat snoise(vec3 v) {\n\tconst vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);\n\tconst vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\n\tvec3 i = floor(v + dot(v, C.yyy));\n\tvec3 x0 = (v - i) + dot(i, C.xxx);\n\tvec3 g = step(x0.yzx, x0.xyz);\n\tvec3 l = 1.0 - g;\n\tvec3 i1 = min(g.xyz, l.zxy);\n\tvec3 i2 = max(g.xyz, l.zxy);\n\tvec3 x1 = (x0 - i1) + (1.0 * C.xxx);\n\tvec3 x2 = (x0 - i2) + (2.0 * C.xxx);\n\tvec3 x3 = (x0 - 1.) + (3.0 * C.xxx);\n\ti = mod(i, 289.0);\n\tvec4 p = permute((permute((permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y) + vec4(0.0, i1.y, i2.y, 1.0)) + i.x) + vec4(0.0, i1.x, i2.x, 1.0));\n\tfloat n_ = 1.0 / 7.0;\n\tvec3 ns = (n_ * D.wyz) - D.xzx;\n\tvec4 j = p - (49.0 * floor((p * ns.z) * ns.z));\n\tvec4 x_ = floor(j * ns.z);\n\tvec4 y_ = floor(j - (7.0 * x_));\n\tvec4 x = (x_ * ns.x) + ns.yyyy;\n\tvec4 y = (y_ * ns.x) + ns.yyyy;\n\tvec4 h = (1.0 - abs(x)) - abs(y);\n\tvec4 b0 = vec4(x.xy, y.xy);\n\tvec4 b1 = vec4(x.zw, y.zw);\n\tvec4 s0 = (floor(b0) * 2.0) + 1.0;\n\tvec4 s1 = (floor(b1) * 2.0) + 1.0;\n\tvec4 sh = -step(h, vec4(0.0));\n\tvec4 a0 = b0.xzyw + (s0.xzyw * sh.xxyy);\n\tvec4 a1 = b1.xzyw + (s1.xzyw * sh.zzww);\n\tvec3 p0 = vec3(a0.xy, h.x);\n\tvec3 p1 = vec3(a0.zw, h.y);\n\tvec3 p2 = vec3(a1.xy, h.z);\n\tvec3 p3 = vec3(a1.zw, h.w);\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\n\tp0 *= norm.x;\n\tp1 *= norm.y;\n\tp2 *= norm.z;\n\tp3 *= norm.w;\n\tvec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);\n\tm = m * m;\n\treturn 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));\n}\nvoid main() {\n\tfloat a = snoise(vec3(v_uv * uNoiseFactor, uTime * 0.0005)) * uNoiseScale;\n\tfloat b = snoise(vec3(v_uv * uNoiseFactor, (uTime * 0.0005) + 200.)) * uNoiseScale;\n\tvec4 inputColor = texture2D(uTexture, (v_uv + vec2(a, b)) + (uMouse * uRepeatOffset));\n\tvec4 inputColorRed = texture2D(uTexture, ((v_uv - (vec2(b) * uSplit)) + vec2(a, b)) + (uMouse * uRepeatOffset));\n\tvec4 inputColorGreen = texture2D(uTexture, ((v_uv + (vec2(a) * uSplit)) + vec2(a, b)) + (uMouse * uRepeatOffset));\n\tvec4 inputColorBlue = texture2D(uTexture, ((v_uv + (vec2(b, a) * uSplit)) + vec2(a, b)) + (uMouse * uRepeatOffset));\n\tgl_FragColor = vec4(inputColorRed.r * uRgbPersistFactor, inputColorGreen.g * uRgbPersistFactor, inputColorBlue.b * uRgbPersistFactor, uAlphaPersistFactor);\n}\n"
    }
    ,
    "./scripts/GL/shaders/text/text.vert": e => {
        e.exports = "varying vec2 v_uv;\nvoid main() {\n\tgl_Position = (projectionMatrix * modelViewMatrix) * vec4(position, 1.0);\n\tv_uv = uv;\n}\n"
    }
    ,
    "./styles/app.css": () => {}
}, e => {
    var t = t => e(e.s = t);
    e.O(0, [259, 353], ( () => (t("./scripts/app.js"),
    t("./styles/app.css")))),
    e.O()
}
]);
