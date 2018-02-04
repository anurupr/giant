class Player extends g.SceneNode {
	onStart() {
		this.sprite = game.assetManager.getImage('player.heart');
	}

	onUpdate(ms) {
		this.transform.angle += g.math.TAU / 180;
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