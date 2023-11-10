import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ParallaxComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, object;
    let scrollY = window.innerHeight;

    // Configuración de la escena
    const initScene = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      
      const alight = new THREE.AmbientLight( "#fff",2 ); // soft white light
      alight.position.set( 10, 10, 10 );
      scene.add( alight );

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Cargar el modelo GLTF
      const loader = new GLTFLoader();
      loader.load('./models/microplane.glb', (gltf) => {
        object = gltf.scene;
        object.position.z = -5; // Ajusta según sea necesario
        scene.add(object);
        console.log("loader.load")
      });

      // Evento de desplazamiento
      document.addEventListener('scroll', handleScroll);
    };

    // Manejar el evento de desplazamiento
    const handleScroll = () => {
      scrollY = window.scrollY == 0 ? window.innerHeight : 5 * window.scrollY;
    };

    // Animación
    const animate = () => {
      if (object) {
        object.rotation.y = scrollY * 0.0050; // Ajusta según sea necesario
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Cambios en el tamaño de la ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Inicializar la escena
    initScene();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Iniciar la animación
    animate();

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []); // Se ejecuta solo al montar el componente

  return <canvas ref={canvasRef} />;
};

export default ParallaxComponent;



