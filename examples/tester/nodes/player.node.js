
class Player extends g.SceneNode {
	onStart() {
		this.normal = game.spritesheet.getFrames('sprFattie_');
		this.angry = game.spritesheet.getFrames('sprFattieAngry_');
		this.sprite = new g.Sprite(this.normal);

		this.sprite.renderer = this.renderer;
		this.sprite.transform = this.transform;
		this.sprite.fps = 8;
	}

	onUpdate(ms, dt) {
		if (ms > 5000 && ms < 10000 && this.sprite.getFrames() === this.normal) {
			this.sprite.setFrames(this.angry);
		}

		if (ms > 10000 && this.sprite.getFrames() === this.angry) {
			this.sprite.setFrames(this.normal);
		}

		if (this.sprite.getFrames() === this.angry) {
			this.transform.position.add(2, 0);
		}

		this.transform.position.add(4, 0);
		if (this.transform.position.x > game.renderer.canvas.width) {
			this.transform.position.x = -this.transform.scale.x;
		}

		this.sprite.onUpdate(ms, dt);
	}
	
	onDraw() {
		this.sprite.onDraw();
	}

	onDestroy() {
	}
}