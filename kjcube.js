var camera, scene, renderer;
var geometry, material, box;
var mouseX = 0, mouseY = 0;

init();
animate();

function init() {

	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0x0ff1f1 );

	const container = document.getElementById('cube');
    var fov = 30;
    var aspect = container.offsetWidth / container.offsetHeight;
    var near = 0.10;
    var far = 100;

	geometry = new THREE.BoxGeometry();

	const materialKristjan = createMaterial('Kristján');
	const materialJonsson = createMaterial('Jónsson');
	var k2 = new THREE.MeshBasicMaterial({ map: loadImageTexture("/img/wt.png"), transparent: true }); 
	var k1 = new THREE.MeshBasicMaterial({ map: loadImageTexture("/img/200px-Kyokushin.png"), transparent: true }); 
	var k3 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/img/kanku.png"), transparent: true }); 
	var k4 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/img/kankukalligrafi.png"), transparent: true });

	const cvMaterials = [ materialKristjan, materialJonsson, k1, k2, k3, k4 ]; 
	box = new THREE.Mesh( geometry, cvMaterials );
	box.rotation.x = -0.9;
	box.rotation.y = 0.3;
    scene.add( box );

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 4;

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setSize( container.offsetWidth, container.offsetHeight); //window.innerWidth , window.innerHeight

	container.appendChild( renderer.domElement );
	document.addEventListener("wheel", zoomBox);

	function loadImageTexture(filename) {
		var imgTxt = new THREE.TextureLoader().load(filename, (tx) => {
			tx.needsUpdate = true;
			var imageAspect = tx.image.width / tx.image.height;
			if (1 > imageAspect) {
				tx.matrix.setUvTransform(0, 0, 1 / imageAspect, 1, 0, 0.5, 0.5);
			} else {
				tx.matrix.setUvTransform(0, 0, 1, imageAspect, 0, 0.5, 0.5);
			}
		});
		imgTxt.matrixAutoUpdate = false;
		return imgTxt;
	}

	function createMaterial(txt) {
		const cv = document.createElement( 'canvas');
		cv.width = 256;
		cv.height = 128;
		setupContext(cv,  txt);
	
		const cvTexture = new THREE.Texture(cv);
		cvTexture.needsUpdate = true; // otherwise all black only
		const cvMaterial = new THREE.MeshBasicMaterial({ map: cvTexture, transparent: true  });
		return cvMaterial;
	}

	function setupContext(cv, text) {
		const ctx = cv.getContext('2d');
//		ctx.globalAlpha = 0.0;
//		ctx.fillRect(0, 0, cv.width, cv.height);
		ctx.fillStyle = 'black';
		ctx.globalAlpha = 0.9;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = 'bold 10vh Arial';
		ctx.fillText(text, 0.5 * cv.width, 0.5 * cv.height);
	}
}

function animate() {
	requestAnimationFrame( animate );
	autoRotate();
	renderer.render( scene, camera );
}

function autoRotate() {
	box.rotation.x += 0.01;
	box.rotation.y += 0.02;
}

function zoomCube(e) {
const ZOOM_SPEED = 0.1;
const zoomElement = document.getElementById('cube');
if(e.deltaY > 0){    
	zoomElement.style.transform = `scale(${zoomCube += ZOOM_SPEED})`;  
}else{    
	zoomElement.style.transform = `scale(${zoomCube -= ZOOM_SPEED})`;  }
}

function zoomBox(e) {
	if(e.deltaY > 0){    
		camera.position.z += 0.2;
	} else {
		camera.position.z -= 0.2;
	}
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new disposition:
    box.rotation.y += ( e.clientX - mouseX ) / 100;
    box.rotation.x += ( e.clientY - mouseY ) / 100;
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }