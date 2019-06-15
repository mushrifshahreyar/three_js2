const THREE = require('three');
const debounce = require('js-util/debounce');
const NodeText = require('./NodeText').default;
const BackgroundSphere = require('./BackgroundSphere').default;
const TathvaText = require('./TathvaText').default;
const DescText = require('./DescText').default;
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
  const tathvaText = new TathvaText();
  const descText = new DescText();
  const nodeText = new NodeText();
  const bg = new BackgroundSphere();
 
  //======Camera movement==========
  var scale = 5;
  var mouseX = 0;
  var mouseY = 0;

  camera.rotation.order = "YXZ";
  document.addEventListener("touchstart",mouseMove,false);
  document.addEventListener("touchmove",mouseMove,false);
  document.addEventListener('touchend',mouseMove,false);
  document.addEventListener( "mousemove", mouseMove, false );
  function mouseMove( event ) {
    // console.log('helapsdkasdas');
    mouseX = - ( event.clientX / renderer.domElement.clientWidth ) * 2 + 1;
    mouseY = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    // console.log(camera.rotation.x + " " + camera.rotation.y);
    // console.log(camera.rotation.x);
    event.preventDefault();
    camera.rotation.x = mouseY / scale;
    camera.rotation.y = mouseX / scale;
  }
  
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
    let light = new THREE.PointLight(0xffffff, 0.15);
    light.position.z = 100;
    light.rotateY(10.0);
    scene.add(light);

    loadTexs(texsSrc, (loadedTexs) => {
      fog.createObj(loadedTexs.fog);

      scene.add(fog.obj);

      renderer.setClearColor(0xffffff, 1.0);
      camera.position.set(0, 0, 1000);
      camera.lookAt(new THREE.Vector3());
      clock.start();

      loader.load('./font/Lato.json', (font) => {
        nodeText.createObj(font);
  
        let elems = [nodeText.obj];
        elems.map((e, i) => {
          e.position.set(-innerWidth/2.2, -100, -15);
          e.rotateY(0.1);
          scene.add(e)
        });

      });

      let loader1 = new THREE.FontLoader();
      loader1.load('./font/Lato.json',
          function(font) {
            let x_pos = innerWidth/1.2;
            let y_pos = innerHeight/20.0;
            tathvaText.create_text(font);
            tathvaText.obj.position.set(-x_pos,y_pos,20.0);
            tathvaText.obj.rotateY(0.1);
            scene.add(tathvaText.obj);

            descText.create_text(font);
            descText.obj.rotateY(-0.1);
            scene.add(descText.obj);
            descText.obj.position.x = innerWidth/3.5 - 150.0;
            descText.obj.position.y = innerHeight/3.5 - 10.0;
          }
          
      );
      


      on();
      resizeWindow();
      renderLoop();
    });
  }
  init();

