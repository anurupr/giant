const game = new g.Game(
	new g.Renderer2D(480, 480), 
	new g.AssetManager([
		{ id: "player.heart", type: 'image', src: './assets/images/heart.png' },
	])
);

(() => {
	game.renderer.context.imageSmoothingEnabled = false;
	game.assetManager.onAssetsReady.subscribe(() => {
		game.start();
		game.pushScene(GameScene);
	});

})();