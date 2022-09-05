// ! this give the animation loaded logic
window.addEventListener("load", function () {
  document.querySelector("body").classList.add("loaded");
});

// ! THREE Start here
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

// ! Torus
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 8, 3, 3);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

torus.position.x = -1;
torus.position.z = -11;
scene.add(torus);

// ! Lights
const pointLight = new THREE.PointLight(0xeeeee);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

Array(100).fill().forEach(addStar);

// ! comet
Array(50).fill().forEach(addComet);

// ! Background
const spaceTexture = new THREE.TextureLoader().load("assets/bgGalaxy.jpg");
scene.background = spaceTexture;

// ! Avatar
const krisnaTexture = new THREE.TextureLoader().load("assets/krisna.jpg");

let krisna;
if (window.screen.width <= 1024) {
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

// ! Moon
const moonTexture = new THREE.TextureLoader().load("assets/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("assets/normal.jpg");

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

// ! mars
const marsTexture = new THREE.TextureLoader().load("assets/mars.jpg");

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

document.body.onscroll = moveCamera;
moveCamera();

window.addEventListener("resize", adjustCanvas);
isMobile() || window.addEventListener("resize", adjustBoxProfile);

// ! Animation Loop
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

// ! AREA for function
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

// ! Scroll Animation
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

function adjustCanvas() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function adjustBoxProfile() {
  krisnaTexture.dispose();
  scene.remove(krisna);
  if (window.screen.width <= 1024) {
    krisna = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ map: krisnaTexture }));
  } else {
    krisna = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: krisnaTexture }));
  }
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
  scene.add(krisna);
}

function isMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
