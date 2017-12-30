const GameScene = new g.Scene({
	name: "GameScene",
	collectionType: "SimpleCollection",
	collection: [
		{
			class: Player,
			settings: {
				position: { x: 0, y: 200 }
			}
		},
		{
			class: Enemy,
			settings: {
				position: { x: 100, y: 200 }
			}
		},
		{
			class: Enemy,
			settings: {
				position: { x: 150, y: 200 }
			}
		}
	]
});