function animate2() {

				requestAnimationFrame( animate2 );
//console.log('asfsdf');
				render2();
				// stats.update();

			}
var clock = new THREE.Clock();
function render2() {

				var timer = Date.now() * 0.0005;

				// camera.position.x = Math.cos( timer ) * 10;
				// camera.position.y = 2;
				// camera.position.z = Math.sin( timer ) * 10;

				camera.lookAt( scene.position );

				// particleLight.position.x = Math.sin( timer * 4 ) * 3009;
				// particleLight.position.y = Math.cos( timer * 5 ) * 4000;
				// particleLight.position.z = Math.cos( timer * 4 ) * 3009;

				THREE.AnimationHandler.update( clock.getDelta() );

				renderer.render( scene, camera );

			}

function initLoader() {
	var jsonLoader = new THREE.JSONLoader();

	loadLoadingScreen();
	loadMesh(jsonLoader, assetPath + "monster.js", loadLeft);
	// loadMesh(jsonLoader, assetPath + "LEGO_Man.js", loadRight);
	// loadMesh(jsonLoader, assetPath + "iPhone6.js", loadBackground);
	
	// loadMesh(jsonLoader, assetPath + "crate.js", loadKakaoBox);
	// loadMesh(jsonLoader, assetPath + "crate.js", loadFacebookBox);
	// loadMesh(jsonLoader, assetPath + "capsule.js", loadMapBox);

	jsonLoader.onLoadComplete = function () {
		loadCount++;
	};

	THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
	    if (loadCount == totalLoadCount) {
	    	window.setTimeout( loadMainScenes, 1000 );
	    }
	};
}

function createScene(geometry, x, y, z, rx, ry, rz, scale, touchable, tmap, turn) { 
	var material = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture(tmap)});
	// var material = new THREE.MeshFaceMaterial();
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.rotation.set(rx, ry, rz);
	mesh.scale.set(scale, scale, scale);
	mesh.playAnimation = false;

	// if (isPortrait == true) {
	if (turn == true) {
		// mesh.rotation.z = -Math.PI / 2;
	}

	if (touchable == true) {
		targetList.push(mesh);
	}

	meshes.push(mesh);

	return mesh;
}



var morphs = [];



function createScene2(geometry, materials) {
	var material = materials[0];
	material.morphTargets = true;
	// material.color.setHex( 0xffaaaa );

	var faceMaterial = new THREE.MeshFaceMaterial( materials );

	var morph = new THREE.MorphAnimMesh( geometry, faceMaterial );
	// one second duration

	morph.duration = 1000;

	// random animation offset

	morph.time = 1000 * Math.random();

	var s = THREE.Math.randFloat( 0.00075, 0.001 );
	morph.scale.set( s, s, s );

	morph.position.set( 0, 0, 0 );
	morph.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

	morph.matrixAutoUpdate = false;
	morph.updateMatrix();

	scene.add( morph );

	morphs.push( morph );
}

function loadLoadingScreen() {
	var loadingTexture = THREE.ImageUtils.loadTexture( assetPath + 'loading.jpg' );
	var material = new THREE.MeshBasicMaterial({map: loadingTexture});
	var geometry = new THREE.PlaneBufferGeometry(30, 30);
	loadingMesh = new THREE.Mesh(geometry, material);

	scene.add(loadingMesh);
}

function loadMesh(loader, path, callback) {
	loader.load( path, callback );

	totalLoadCount++;
}

//geometry, x, y, z, rx, ry, rz, scale, touchable, tmap
function loadLeft(geometry) {
	// left = createScene(geometry, -3, -5, 0, 0, 0, 0, 1, true, assetPath + "floor2.png", isPortrait);
	// left = createScene(geometry, -3, 0, 0, 0, 0, 0, 0.005, true, assetPath + "monster.jpg", isPortrait);
	left = createScene2(geometry, "monster.jpg");
	//left.objType = objType.left;
}

function loadRight(geometry) {
	right = createScene(geometry, 3, -7, 0, 0, 0, 0, 1, true, assetPath + "floor3.png", isPortrait);
	right.objType = objType.right;
}

function loadKakaoBox(geometry) {
	kakaoBox = createScene(geometry, -7, 5, 5, 0, 0, 0, 1.25, true, assetPath + "rock.jpg", isPortrait);
	kakaoBox.playAnimation = true;
	kakaoBox.objType = objType.kakaoBox;

	kakaoBox.userData = { URL: 'http://172.30.1.18:8000/kakao.html' };
}

function loadFacebookBox(geometry) {
	facebookBox = createScene(geometry, 0, 5, 5, 0, 0, 0, 1.25, true, assetPath + "rock.jpg", isPortrait);
	facebookBox.playAnimation = true;
	facebookBox.objType = objType.facebookBox;
}

function loadMapBox(geometry) {
	mapBox = createScene(geometry, 7, 5, 5, 0, 0, 0, 1.25, true, assetPath + "rock.jpg", isPortrait);
	mapBox.playAnimation = true;
	mapBox.objType = objType.mapBox;
}

function loadBackground(geometry) {
	bg = createScene(geometry, 0, 0, -10, Math.PI / 2, Math.PI / 2, Math.PI, 300, false, assetPath + "iPhone_Back_Gloss.jpg", false);
	bg.objType = objType.bg;
}

function loadMainScenes() {
	for (var i = 0; i < meshes.length; i++) {
		var mesh = meshes[i];
		scene.add(mesh);
	}

	scene.remove(loadingMesh);
}