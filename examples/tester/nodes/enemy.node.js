class Enemy extends g.SceneNode {
	onStart() {
		this.sprite = game.assetManager.getImage('player.heart');
	}

	onUpdate() {
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