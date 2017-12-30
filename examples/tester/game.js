const game = new g.Game();
(() => {
	game.start();

	setTimeout(() => {
		game.pushScene(GameScene);		
	}, 1500);

	setTimeout(() => {
		game.popScene();
	}, 1750)
})();