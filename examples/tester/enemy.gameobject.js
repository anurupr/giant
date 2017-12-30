class Enemy {
	onStart() {
		console.log("Enemy onStart", this.position);
	}

	onUpdate() {
		console.log("Enemy onUpdate");
	}

	onDraw() {
		console.log("Enemy onDraw");
	}
}