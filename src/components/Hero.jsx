"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Hero = () => {
  const controls = useAnimation();
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);

  // Detect mobile device
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      await controls.start("float");
    };
    sequence();
  }, [controls]);

  // Three.js effect - only on desktop
  useEffect(() => {
    if (isMobile) return; // Skip Three.js on mobile

    let scene, camera, renderer, particles, clock;
    let animationId;
    const particleCount = 2000; // Reduced from 5000 for better performance
    const particlesData = [];

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      clock = new THREE.Clock();

      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 64;
      textureCanvas.height = 64;
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

        sizes[i] = 0.3 + Math.random() * 1.2;
        alphas[i] = 0;

        particlesData.push({
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.005,
            0.01 + Math.random() * 0.02,
            (Math.random() - 0.5) * 0.005,
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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onWindowResize);

      setThreeLoaded(true);

      return () => {
        window.removeEventListener("resize", onWindowResize);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        if (animationId) cancelAnimationFrame(animationId);
        renderer?.dispose();
        geometry?.dispose();
        shaderMaterial?.dispose();
        smokeTexture?.dispose();
      };
    };

    const animate = () => {
      if (!particles) return;

      const delta = Math.min(clock.getDelta(), 0.033); // Cap delta for performance

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
            (Math.random() - 0.5) * 0.005,
            0.01 + Math.random() * 0.02,
            (Math.random() - 0.5) * 0.005,
          );
          particle.maxLifetime = 5 + Math.random() * 5;
          sizes[i] = 0.3 + Math.random() * 1.2;
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
      if (cleanup) cleanup();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <section className="relative isolate pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center">
      {/* Three.js container - only on desktop */}
      {!isMobile && (
        <div ref={mountRef} className="absolute inset-0 -z-10"></div>
      )}

      {/* Static background - works on all devices */}
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
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-black font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300 ease-in-out"
          >
            Get Started
          </a>
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300 ease-in-out"
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
