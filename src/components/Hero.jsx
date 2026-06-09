"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Hero = () => {
  const controls = useAnimation();
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Detect mobile device
  useEffect(() => {
    try {
      const checkMobile = () => {
        const mobile =
          window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          );
        setIsMobile(mobile);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    } catch (error) {
      console.error("Hero mobile detection error:", error);
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    try {
      const sequence = async () => {
        await controls.start("visible");
        await controls.start("float");
      };
      sequence();
    } catch (error) {
      console.error("Hero animation error:", error);
    }
  }, [controls]);

  // Three.js effect - only on desktop with error handling
  useEffect(() => {
    if (isMobile || hasError) return;

    let scene, camera, renderer, particles, clock;
    let animationId;
    let isMounted = true;
    const particleCount = 1000; // Further reduced for safety
    const particlesData = [];

    try {
      const vertexShader = `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;

        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const fragmentShader = `
        uniform sampler2D smokeTexture;
        varying float vAlpha;

        void main() {
          vec4 texColor = texture2D(smokeTexture, gl_PointCoord);
          gl_FragColor = vec4(vec3(0.8, 0.8, 0.8), texColor.a * vAlpha);
        }
      `;

      const init = () => {
        if (!isMounted) return;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0005);

        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
        );
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (mountRef.current && isMounted) {
          mountRef.current.appendChild(renderer.domElement);
        }

        clock = new THREE.Clock();

        const textureCanvas = document.createElement("canvas");
        textureCanvas.width = 32;
        textureCanvas.height = 32;
        const context = textureCanvas.getContext("2d");
        const gradient = context.createRadialGradient(
          textureCanvas.width / 2,
          textureCanvas.height / 2,
          0,
          textureCanvas.width / 2,
          textureCanvas.height / 2,
          textureCanvas.width / 2,
        );
        gradient.addColorStop(0, "rgba(200, 200, 200, 1)");
        gradient.addColorStop(0.5, "rgba(180, 180, 180, 0.5)");
        gradient.addColorStop(1, "rgba(150, 150, 150, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

        const smokeTexture = new THREE.CanvasTexture(textureCanvas);
        smokeTexture.minFilter = THREE.LinearFilter;
        smokeTexture.magFilter = THREE.LinearFilter;

        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            smokeTexture: { value: smokeTexture },
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          blending: THREE.NormalBlending,
          transparent: true,
          depthWrite: false,
        });

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const alphas = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

          sizes[i] = 0.2 + Math.random() * 1;
          alphas[i] = 0;

          particlesData.push({
            velocity: new THREE.Vector3(
              (Math.random() - 0.5) * 0.003,
              0.005 + Math.random() * 0.01,
              (Math.random() - 0.5) * 0.003,
            ),
            lifetime: 0,
            maxLifetime: 5 + Math.random() * 5,
          });
        }

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3),
        );
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

        particles = new THREE.Points(geometry, shaderMaterial);
        scene.add(particles);

        const onWindowResize = () => {
          if (!isMounted) return;
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onWindowResize);

        return () => {
          window.removeEventListener("resize", onWindowResize);
          if (mountRef.current && renderer?.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer?.dispose();
          geometry?.dispose();
          shaderMaterial?.dispose();
          smokeTexture?.dispose();
        };
      };

      const animate = () => {
        if (!isMounted || !particles) return;

        const delta = Math.min(clock.getDelta(), 0.033);

        const positions = particles.geometry.attributes.position.array;
        const sizes = particles.geometry.attributes.size.array;
        const alphas = particles.geometry.attributes.alpha.array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const particle = particlesData[i];

          particle.lifetime += delta;

          if (particle.lifetime > particle.maxLifetime) {
            particle.lifetime = 0;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = -5 - Math.random() * 5;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            particle.velocity.set(
              (Math.random() - 0.5) * 0.003,
              0.005 + Math.random() * 0.01,
              (Math.random() - 0.5) * 0.003,
            );
            particle.maxLifetime = 5 + Math.random() * 5;
            sizes[i] = 0.2 + Math.random() * 1;
          }

          positions[i3] += particle.velocity.x * delta * 10;
          positions[i3 + 1] += particle.velocity.y * delta * 10;
          positions[i3 + 2] += particle.velocity.z * delta * 10;

          const lifeRatio = particle.lifetime / particle.maxLifetime;
          if (lifeRatio < 0.2) {
            alphas[i] = lifeRatio / 0.2;
          } else if (lifeRatio > 0.7) {
            alphas[i] = 1 - (lifeRatio - 0.7) / 0.3;
          } else {
            alphas[i] = 1;
          }
          alphas[i] *= 0.2 + Math.random() * 0.8;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.size.needsUpdate = true;
        particles.geometry.attributes.alpha.needsUpdate = true;

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      const cleanup = init();
      animate();

      return () => {
        isMounted = false;
        if (cleanup) cleanup();
        if (animationId) cancelAnimationFrame(animationId);
      };
    } catch (error) {
      console.error("Three.js error:", error);
      setHasError(true);
      return () => {};
    }
  }, [isMobile, hasError]);

  // If error occurred, show simple version
  if (hasError) {
    return (
      <section className="relative isolate pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 -z-20">
          <img
            src="/images/13.jpg"
            alt="Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-primary/90 backdrop-brightness-75"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Building Digital Experiences{" "}
            <span className="block md:inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              That Drive Results
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            We create custom web solutions that help businesses grow in the
            digital world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-black font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 transition duration-300"
            >
              Get Started
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition duration-300"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center">
      {!isMobile && (
        <div ref={mountRef} className="absolute inset-0 -z-10"></div>
      )}

      <div className="absolute inset-0 -z-20">
        <img
          src="/images/13.jpg"
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-primary/90 backdrop-brightness-75"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 0.77, 0.47, 0.97],
          }}
        >
          Building Digital Experiences{" "}
          <motion.span
            className="block md:inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            That Drive Results
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          We create custom web solutions that help businesses grow in the
          digital world.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-black font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </a>
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition duration-300"
          >
            View Our Work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8] }}
          transition={{
            delay: 1.5,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <svg
              className="w-10 h-10 text-blue bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <div className="mt-2 text-sm font-medium text-blue/80">
              Scroll Down
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
