let game;

(() => {
	const renderer = new g.Renderer2D(480, 480);
	const assetManager = new g.AssetManager([
		{ id: "player.heart", type: 'image', src: './assets/images/heart.png' },
	]);

	game = new g.Game(renderer, assetManager);

	game.assetManager.onAssetsReady.subscribe(() => {
		game.pushScene(GameScene);
		game.start();
	});
})();