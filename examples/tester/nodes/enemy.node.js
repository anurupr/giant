class Enemy extends g.SceneNode {
	onStart() {
	}

	onUpdate() {
		// ...
	}

	onDraw() {
		const context = game.renderer.getContext();
		const sprite = game.assetManager.getImage('player.heart');

		context.save();
		context.transform(
			this.transform.a, this.transform.b, this.transform.c,
			this.transform.d, this.transform.e, this.transform.f,
		);

		context.drawImage(sprite, 0, 0, 1, 1);

		context.restore();
	}

	onDestroy() {
	}
}