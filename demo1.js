var camera, scene, renderer;
var geometry, material, box;
var mouseX = 0, mouseY = 0;

init();
animate();

function init() {

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry();

	const materialKristjan = createMaterial('Kristján');
	const materialJonsson = createMaterial('Jónsson');

	const cvMaterials = [ materialKristjan, materialJonsson, materialKristjan, materialJonsson, materialKristjan, materialJonsson ]; 
	box = new THREE.Mesh( geometry, cvMaterials );
	box.rotation.x = 0.3;
	box.rotation.y = 0.3;
    scene.add( box );

    
    var fov = 30;
    var aspect = window.innerWidth / window.innerHeight;
    var near = 0.10;
    var far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 4;

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	const container = document.getElementById('cube');
	renderer.setSize( window.innerWidth , window.innerHeight); //container.offsetWidth, container.offsetHeight
	container.appendChild( renderer.domElement );
	document.addEventListener("wheel", zoomBox);

	function createMaterial(txt) {
		const cv = document.createElement( 'canvas');
		cv.width = 256;
		cv.height = 128;
		setupContext(cv,  txt);
	
		const cvTexture = new THREE.Texture(cv);
		cvTexture.needsUpdate = true; // otherwise all black only
		const cvMaterial = new THREE.MeshBasicMaterial({ map: cvTexture });
		return cvMaterial;
	}

	function setupContext(cv, text) { // "./sprite.png"
		const ctx = cv.getContext('2d');
		ctx.fillStyle = '#fefefe';
		ctx.globalAlpha = 0.00;
		ctx.fillRect(0, 0, cv.width, cv.height);
		ctx.fillStyle = 'white';
		ctx.globalAlpha = 0.5;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = 'bold 6vh Arial';
		ctx.fillText(text, 0.5 * cv.width, 0.5 * cv.height);
	}
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
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