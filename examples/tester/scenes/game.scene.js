const GameScene = new g.Scene().set({
	name: "GameScene",
	children: [
		new Camera({ x: 20, y: 20 }),
		new Player().set({
			transform: new g.Transform2D({ x: 240, y: 240, scaleX: 72, scaleY: 64, anchorX: 0.5, anchorY: 0.5 }),
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 100, y: 100, scaleX: 72, scaleY: 64 })
		}),
		new Enemy().set({
			transform: new g.Transform2D({ x: 150, y: 50, scaleX: 72, scaleY: 64 })
		})
	]
});