const GameScene = new g.Scene().set({
	name: "GameScene",
	camera: new Camera(),
	collection: [
		new Player().set({
			transform: new g.Transform2D({ x: 240, y: 240, scaleX: 72, scaleY: 64, anchorX: 0.5, anchorY: 0.5 })
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 50, y: 50, scaleX: 72, scaleY: 64 })
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 150, y: 50, scaleX: 72, scaleY: 64 })
		})
	]
});