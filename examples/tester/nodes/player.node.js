class Player extends g.SceneNode {
	onStart() {
		this.sprite = new g.Sprite(game.assetManager.getImage('player.heart'), this.renderer, this.transform);
	}
	
	onDraw() {
		this.sprite.draw();
	}

	onDestroy() {
	}
}