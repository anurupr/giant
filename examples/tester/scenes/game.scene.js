const GameScene = new g.Scene().set({
	name: "GameScene",
	children: [
		new Camera({ x: 0, y: 0 }),
		new Player().set({
			transform: new g.Transform2D({ x: 240, y: 480, scaleX: 72, scaleY: 64, anchorX: 0, anchorY: 1 }),
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 100, y: 100, scaleX: 72, scaleY: 64 })
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 150, y: 50, scaleX: 72, scaleY: 64 })
		})
	]
});