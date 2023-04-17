var camera, scene, renderer;
var rotate = true;
var geometry, material, box;
var image, left;
var mouseX = 0, mouseY = 0;

function initCube() {

	image = document.getElementById('logo');
	left = 0;

	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0x0ff1f1 );

	const container = document.getElementById('cube');
	container.onmousedown = function() {
		dragMouseDown();
	  };
    var fov = 30;
    var aspect = container.offsetWidth / container.offsetHeight;
    var near = 0.10;
    var far = 100;

	geometry = new THREE.BoxGeometry();

	var cvMaterials = [];
	if (container.hasAttribute('texts')) {
		container.getAttribute('texts').split(";").forEach(txt => cvMaterials.push(createMaterial(txt)));
	}
	if (container.hasAttribute('images')) {
		container.getAttribute('images').split(";").forEach(img => cvMaterials.push(new THREE.MeshBasicMaterial({ map: loadImageTexture(img), transparent: true })));
	}

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
		var imgTexture = new THREE.TextureLoader().load(filename, (tx) => {
			tx.needsUpdate = true;
			var imageAspect = tx.image.width / tx.image.height;
			if (1 > imageAspect) {
				tx.matrix.setUvTransform(0, 0, 1 / imageAspect, 1, 0, 0.5, 0.5);
			} else {
				tx.matrix.setUvTransform(0, 0, 1, imageAspect, 0, 0.5, 0.5);
			}
		});
		imgTexture.matrixAutoUpdate = false;
		imgTexture.minFilter = THREE.LinearFilter;
		return imgTexture;
	}

	function createMaterial(txt) {
		const cv = document.createElement( 'canvas');
		const cvMaterial = new THREE.MeshBasicMaterial({ map: createTextTexture(cv,  txt), transparent: true  });
		return cvMaterial;
	}

	function createTextTexture(cv, text) {
		const ctx = cv.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.globalAlpha = 1.0;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = 'bold 6vh Arial';
		ctx.fillText(text, 0.5 * cv.width, 0.5 * cv.height);
		const cvTexture = new THREE.Texture(cv);
		cvTexture.needsUpdate = true; // otherwise all black only
		cvTexture.minFilter = THREE.LinearFilter;
		return cvTexture;
	}
	animate();
}

function animate() {
	requestAnimationFrame( animate );
	if (rotate)	autoRotate();
	renderer.render( scene, camera );
}

function autoRotate() {
	box.rotation.x += 0.005;
	box.rotation.y += 0.003;
	if (image) {
		left = (left + 1) % (window.innerWidth - image.width) ;
	   image.style.left = "" + left + "px";
	}
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
	rotate = false;
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
	rotate = true;
  }