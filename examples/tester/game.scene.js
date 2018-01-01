const GameScene = new g.Scene().set({
	name: "GameScene",
	collection: [
		new Player().set({
			position: { x: 100, y: 200 },
			children: [
				new Player().set({
					position: { x: 0, y: 0 }
				})
			]
		}),
		new Enemy().set({
			position: { x: 100, y: 200 }
		}),
		new Enemy().set({
			position: { x: 150, y: 200 }
		})
	]
});