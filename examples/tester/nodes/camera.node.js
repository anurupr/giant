class Camera extends g.Camera2D {
	onStart() {
		this.viewport.set(480, 480);
		this.anchor.set(0.5, 0.5);
		this.position.set(120, 240);
	}

	onUpdate() {
		this.angle += g.math.TAU / 180;
	}

	onDraw() {

	}

	onDestroy() {
	}
}