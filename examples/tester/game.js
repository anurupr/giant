const game = new g.Game();
(function() {
	let scene = new g.Scene();
	let collection = new g.SimpleCollection();
	let gameobject = {
		onStart() {
			console.log("On Start");
		},
		onUpdate() {
			console.log("On Update");
		},
		onDestroy() {
			console.log("On Destroy");
		}
	};
	
	collection.add(gameobject);
	scene.collection = collection;
	game.pushScene(scene);
	
	game.start();
	
	setTimeout(() => {
		game.popScene();
	}, 1000);
})();