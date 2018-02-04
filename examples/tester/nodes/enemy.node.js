class Enemy extends g.SceneNode {
	onStart() {
		this.sprite = game.assetManager.getImage('player.heart');
	}

	onUpdate() {
	}

	onDraw() {
		this.renderer.save();
		this.renderer.transform(this.transform.getMatrix());
		this.renderer.drawImage(this.sprite);
		this.renderer.restore();
	}

	onDestroy() {
	}
}