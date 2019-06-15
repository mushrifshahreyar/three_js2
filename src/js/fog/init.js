const THREE = require('three');
const debounce = require('js-util/debounce');
const NodeText = require('./NodeText').default;
const BackgroundSphere = require('./BackgroundSphere').default;

const loadTexs = require('../loadTexs').default;
const Fog = require('./Fog').default;

  // ==========
  // Define common variables
  //
  const resolution = new THREE.Vector2();
  const canvas = document.getElementById('canvas-webgl');
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const clock = new THREE.Clock();
  const loader = new THREE.FontLoader();



  camera.far = 50000;
  camera.setFocalLength(24);

  // ==========
  // Define unique variables
  //
  const texsSrc = {
    fog: './img/fog/fog.png'
  };
  const fog = new Fog();

  const nodeText = new NodeText();
  const bg = new BackgroundSphere();
 

  // ==========
  // Define functions
  //
  const render = () => {
    const time = clock.getDelta();
    fog.render(time);
    nodeText.render(time);
    renderer.render(scene, camera);
  };
  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  };
  const resizeCamera = () => {
    camera.aspect = resolution.x / resolution.y;
    camera.updateProjectionMatrix();
  };
  const resizeWindow = () => {
    resolution.set(document.body.clientWidth, window.innerHeight);
    canvas.width = resolution.x;
    canvas.height = resolution.y;
    resizeCamera();
    renderer.setSize(resolution.x, resolution.y);
  };
  const on = () => {
    window.addEventListener('resize', debounce(resizeWindow, 1000));
    window.setInterval(() => {
      nodeText.transform();
    }, 2000);
    window.addEventListener('click', () => {
      nodeText.transform();
    });
  };

  // ==========
  // Initialize
  //
  const init = () => {
    loadTexs(texsSrc, (loadedTexs) => {
      fog.createObj(loadedTexs.fog);

      scene.add(fog.obj);

      renderer.setClearColor(0x111111, 1.0);
      camera.position.set(0, 0, 1000);
      camera.lookAt(new THREE.Vector3());
      clock.start();

      loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
        nodeText.createObj(font);
        bg.createObj();
  
        scene.add(nodeText.obj);
        scene.add(nodeText.objWire);
        scene.add(nodeText.objPoints);
  

        let elems = [nodeText.obj, nodeText.objWire, nodeText.objPoints];
        elems.map((e, i) => {
          e.position.set(0, -400, 0);
        });
        nodeText.obj.position.z -= 10;

      });


      on();
      resizeWindow();
      renderLoop();
    });
  }
  init();

