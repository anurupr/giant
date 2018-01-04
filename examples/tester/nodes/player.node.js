class Player extends g.SceneNode {
	onStart() {
		this.sprite = game.assetManager.getImage('player.heart');
	}

	onUpdate(ms) {
		this.transform.angle += g.math.TAU / 360;
	}
	
	onDraw() {
		const context = game.renderer.getContext();

		context.save();
		context.transform(
			this.transform.a, this.transform.b, this.transform.c,
			this.transform.d, this.transform.e, this.transform.f,
		);

		context.drawImage(this.sprite, 0, 0, 1, 1);

		context.restore();
	}

	onDestroy() {
	}
}