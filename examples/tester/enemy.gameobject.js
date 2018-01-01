class Enemy extends g.SceneNode {
	onStart() {
		console.log("Enemy onStart", this.position, this.ID);
	}

	onUpdate() {
		// ...
	}

	onDestroy() {
		console.log("Enemy onDestroy");
	}
}