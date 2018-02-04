class Background extends g.SceneNode {
	onStart() {
		this.angle = 0;
		this.transform.scale.set(480, 480);
	}

	onUpdate(ms) {
		this.angle += Math.PI / 360;
	}

	onDraw() {
		this.renderer.context.fillStyle = '#523';
		this.renderer.context.strokeStyle = 'transparent';
		this.renderer.drawRectangle(0, 0, 480, 480);
		
		this.renderer.context.fillStyle = "white";
		this.renderer.context.font = "bold 14px Arial";
		this.renderer.drawText("Giant v0.2.0", 480 - (this.renderer.context.measureText("Giant v0.2.0").width + 4), 480 - 4);
	}
	
	onPostDraw() {
	}

	onDestroy() {
	}
}