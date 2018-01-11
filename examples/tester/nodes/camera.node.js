class Camera extends g.Camera2D {
	onStart() {
		this.viewport.set(480, 480);
		this.transform.anchor.set(0.5, 0.5);
		this.transform.position.set(240, 240);
	}

	onUpdate() {
		this.transform.angle += g.math.TAU / 360;
	}

	onDraw() {

	}

	onDestroy() {
	}
}