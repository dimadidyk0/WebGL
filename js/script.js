window.onload = function () {

	var height = window.innerHeight,
	width = window.innerWidth,
	canvas = document.querySelector("canvas");

	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);

	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(new THREE.Color(0x333333));
	renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
	camera.position.set(100, 100, 1000);

	var light = new THREE.SpotLight(0xffffff);
	light.castShadow = true;
	light.position.set(0, 400, -1000);
	scene.add(light); 
	// add spotlight for the shadows

	var axes = new THREE.AxisHelper( 10000 );
	scene.add(axes);

 	var change = {
 		positionX: 0,
 		positionY: 0,
 		positionZ: 0,
 		rotationX: 0,
 		rotationY: 0,
 		rotationZ: 0
 	};

	var gui = new dat.gui.GUI();
	gui.add(change, 'positionX').min(-5).max(5).step(0.1);
	gui.add(change, 'positionY').min(-5).max(5).step(0.1);
	gui.add(change, 'positionZ').min(-5).max(5).step(0.1);
	gui.add(change, 'rotationX').min(-0.2).max(0.2).step(0.001);
	gui.add(change, 'rotationY').min(-0.2).max(0.2).step(0.001);
	gui.add(change, 'rotationZ').min(-0.2).max(0.2).step(0.001);

	var planeGeometry = new THREE.PlaneGeometry(1000,500);
	var planeMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow  = true;
	plane.rotation.x = -0.5*Math.PI;//разворот плоскости по x
	plane.position.x = 500;// позиционирование х
	plane.position.y = 0;// позиционирование y
	plane.position.z = 250;// позиционирование z
	scene.add(plane);

	var geometry = new THREE.SphereGeometry(200, 12, 12);
	var material = new THREE.MeshLambertMaterial({color:0x00ff00, wireframe: true});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.y = 200;
	scene.add(mesh);

	// create a cube
    var cubeGeometry = new THREE.BoxGeometry(40,40,40);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
 
    // position the cube
    cube.position.x = 200;
    cube.position.y = 20;
    cube.position.z = 400;
 
    // add the cube to the scene
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(40,200,200);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
 
        // position the sphere
    sphere.position.x=200;
    sphere.position.y=40;
    sphere.position.z=20;
    sphere.castShadow=true;
 
        // add the sphere to the scene
    scene.add(sphere);

    var step = 0;

	function loop() {

		mesh.rotation.y += change.rotationY;
		mesh.rotation.x += change.rotationX;
		mesh.rotation.z += change.rotationZ;
		mesh.position.z += change.positionZ;
		mesh.position.x += change.positionX;
		mesh.position.y += change.positionY;

		cube.rotation.x += 0.0;
 		cube.rotation.y += 0.0;
 		cube.rotation.z += 0.0;
 		cube.position.x = 200+( 100*(Math.cos(step)));
 		cube.position.y = 25 +( 100*Math.abs(Math.sin(step)));
 		step+=0.02;

		renderer.render(scene, camera);
		requestAnimationFrame (function(){loop();});

	};

	loop();




}