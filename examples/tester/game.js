let game;
(() => {
	const renderer = new g.Renderer2D(480, 480);
	const assetManager = new g.AssetManager([
		{ id: 'spritesheet', type: 'image', src: './assets/sprites/spritesheet.png' },
		{ id: 'spritesheet', type: 'json', src: './assets/sprites/spritesheet.json' },
	]);
	
	game = new g.Game(renderer, assetManager);
	
	game.assetManager.onAssetsReady.subscribe(() => {
		game.spritesheet = new g.Spritesheet(game.assetManager.getImage('spritesheet'), game.assetManager.getJSON('spritesheet'));
		game.pushScene(GameScene);
		game.start();
		// const spritesheet = new g.Spritesheet(assetManager.getImage('spritesheet.game'), assetManager.getJSON('spritesheet.game'));
		// console.log(game.assetManager, spritesheet);
	});
})();