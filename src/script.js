const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 8, 3, 3);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

torus.position.x = -1;
// torus.position.y = -2;
torus.position.z = -11;
scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xeeeee);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.OctahedronGeometry(0.25, 24, 24);
  const material = new THREE.MeshMatcapMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

// comet
function addComet() {
  const geometry = new THREE.ConeGeometry(0.21, Math.random() * 2.1 + 2, 10);
  const material = new THREE.MeshLambertMaterial({ color: 0x8ba0f4 });
  const comet = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  comet.rotation.x = Math.PI / 3;
  comet.position.set(x, y, z + 50);
  scene.add(comet);
}

Array(50).fill().forEach(addComet);

// Background

const spaceTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/krisna31/krisna-portfolio-with-threejs/main/src/assets/bgGalaxy.jpg");
scene.background = spaceTexture;

// Avatar

const krisnaTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/krisna31/krisna-portfolio-with-threejs/main/src/assets/krisna.jpg");

let krisna;

if (window.screen.width <= 768) {
  krisna = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ map: krisnaTexture }));
} else {
  krisna = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: krisnaTexture }));
}

scene.add(krisna);

if (window.screen.width < 391) {
  krisna.position.x = 0;
  krisna.position.y = 1.8;
} else if (window.screen.width < 1024) {
  krisna.position.x = 0;
  krisna.position.y = 1;
} else {
  krisna.position.x = -2.5;
}
krisna.position.z = -5;

// Moon

const moonTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/krisna31/krisna-portfolio-with-threejs/main/src/assets/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/krisna31/krisna-portfolio-with-threejs/main/src/assets/normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.x = 60;
moon.position.y = 0;
moon.position.z = 44;

// mars
const marsTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/krisna31/krisna-portfolio-with-threejs/main/src/assets/mars.jpg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);

scene.add(mars);

mars.position.x = 30;
mars.position.y = -2;
mars.position.z = -30;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  krisna.rotation.x -= 0.02;
  krisna.rotation.y -= 0.0002;
  krisna.rotation.z -= 0.01;

  camera.position.x = t * -0.0015;
  camera.rotation.y = t * 0.00015;
  camera.position.z = t * -0.01;

  mars.rotation.x += 0.003;
  mars.rotation.y += 0.005;
  mars.rotation.z += 0.05;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.0002;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  mars.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
