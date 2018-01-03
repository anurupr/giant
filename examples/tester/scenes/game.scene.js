const GameScene = new g.Scene().set({
	name: "GameScene",
	collection: [
		new Player().set({
			transform: new g.Transform2D({ x: 240, y: 240, width: 72, height: 64, anchorX: 0.5, anchorY: 0.5 })
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 50, y: 50, width: 72, height: 64 })
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 150, y: 50, width: 72, height: 64 })
		})
	]
});