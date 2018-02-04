class Camera extends g.Camera2D {
	onStart() {
		console.log(this.position)
		this.viewport.set(480, 480);
		this.anchor.set(0.5, 0.5);
		this.position.add(240, 240);
	}

	onUpdate() {
		this.angle += g.math.TAU / 180;
	}
}