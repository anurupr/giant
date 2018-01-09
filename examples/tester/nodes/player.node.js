class Player extends g.SceneNode {
	onStart() {
		this.sprite = game.assetManager.getImage('player.heart');
	}

	onUpdate(ms) {
		this.transform.angle += g.math.TAU / 360;
	}
	
	onDraw() {
		game.renderer.save();
		game.renderer.transform(this.transform.getMatrix());
		game.renderer.drawImage(this.sprite);
		game.renderer.restore();
	}

	onDestroy() {
	}
}