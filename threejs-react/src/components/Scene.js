import {useRef,useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default function Scene() {
    const mountRef = useRef(null);
    useEffect(()=>{
        const currentMount = mountRef.current;

        //Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;
        scene.add(camera);

        //renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera,renderer.domElement)
        /* controls.target = new THREE.Vector3(3,3,3); */
        controls.enableDamping = true; 
        //cube
        const cube1 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshBasicMaterial({
                color:"#a1d9ef",
                wireframe:true
            }) 
        ); 
        scene.add(cube1);

        const cube2 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshBasicMaterial({
                color:"#81d096", 
                transparent: true, 
                opacity: .3
            }) 
        ); 
        scene.add(cube2);
        cube2.position.x = 2;

        const cube3 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshNormalMaterial() 
        ); 
        scene.add(cube3);
        cube3.position.x = -2;

        const textureLoader = new THREE.TextureLoader();

        const matcap1 = textureLoader.load('./textures/matcap1.png')
        const cube4 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshMatcapMaterial({matcap: matcap1}) 
        ); 
        scene.add(cube4);
        cube4.position.x = -2;
        cube4.position.y = -2;
        cube4.position.z = -2;

        const matcap2 = textureLoader.load('./textures/matcap2.png')
        const cube5 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshMatcapMaterial({matcap: matcap2}) 
        ); 
        scene.add(cube5);
        cube5.position.y = -2;
        
        const matcap3 = textureLoader.load('./textures/matcap3.png')
        const cube6 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshMatcapMaterial({matcap: matcap3}) 
        ); 
        scene.add(cube6);
        cube6.position.x = 2;
        cube6.position.y = -2;
        cube6.position.z = 2;

        const matcap4 = textureLoader.load('./textures/matcap4.png')
        const cube7 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshMatcapMaterial({matcap: matcap4}) 
        ); 
        scene.add(cube7);
        cube7.position.x = 2;
        cube7.position.y = 2;
        cube7.position.z = -2;

        const matcap5 = textureLoader.load('./textures/matcap5.png')
        const cube8 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshMatcapMaterial({matcap: matcap5}) 
        ); 
        scene.add(cube8);
        cube8.position.x = -2;
        cube8.position.y = 2;
        cube8.position.z = 2;

        const matcap6 = textureLoader.load('./textures/matcap6.png')
        const cube9 = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1), 
            new THREE.MeshMatcapMaterial({matcap: matcap6}) 
        ); 
        scene.add(cube9);
        cube9.position.y = 2;

        /* //sphere 
        const sphere = new THREE.Mesh( 
            new THREE.SphereGeometry(0.8,8), 
            new THREE.MeshBasicMaterial( {color:"#ea8b24"} ) 
        ); 
        scene.add(sphere);
        sphere.position.x = 2; */

        renderer.render(scene,camera);
        /* const animateFuntion = () => {
            requestAnimationFrame(animateFuntion);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animateFuntion(); */
        const animateFuntion = () => {
            controls.update();
            renderer.render(scene, camera);
            cube1.rotation.x += 0.01;
            cube1.rotation.y += 0.01;
            cube2.rotation.x += 0.01;
            cube2.rotation.y += 0.01;
            cube3.rotation.x += 0.01;
            cube3.rotation.y += 0.01;
            cube4.rotation.x += 0.01;
            cube4.rotation.y += 0.01;
            cube5.rotation.x += 0.01;
            cube5.rotation.y += 0.01;
            cube6.rotation.x += 0.01;
            cube6.rotation.y += 0.01;
            cube7.rotation.x += 0.01;
            cube7.rotation.y += 0.01;
            cube8.rotation.x += 0.01;
            cube8.rotation.y += 0.01;
            cube9.rotation.x += 0.01;
            cube9.rotation.y += 0.01;
            requestAnimationFrame(animateFuntion);
        }

        animateFuntion(); 
        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    },[]);

    return (
        <div 
            className="Contenedor3D"
            ref={mountRef}
            style={{width:'100%',height:'100vh'}}
        >
        </div>
    )
}
