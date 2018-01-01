class Player extends g.SceneNode {
	onStart() {
		console.log("Player onStart", this.position, this.ID);
	}

	onUpdate() {
		// ...
	}

	onDestroy() {
		console.log("Player onDestroy");
	}
}