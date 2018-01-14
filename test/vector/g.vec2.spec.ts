import 'mocha';
import { expect } from 'chai';

import { Vec2 } from '../../src/lib/vector/g.vec2';
import { math } from '../../src/lib/g.math';

describe('Vec2 library', () => {
	describe('Vec2 constructor', () => {
		it('Returns a default new Vec2 (0, 0)', () => {
			const vector = new Vec2();

			expect(vector.x).to.equal(0);
			expect(vector.y).to.equal(0);
		});

		it('Returns a new Vec2 (1, 1) with numeric parameters', () => {
			const vector = new Vec2(1, 1);

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(1);
		});

		it('Returns a new Vec2 (1, 1), whose components equal an object {x: 1, y: 1} with object literal', () => {
			const obj = { x: 1, y: 1 };
			const vector = new Vec2(obj);

			expect(vector.x).to.equal(1).and.equal(obj.x);
			expect(vector.y).to.equal(1).and.equal(obj.y);
		});

		it('Returns a new Vec2 (1, 1), who is equal to an original but is not the original with another Vec2', () => {
			const original = new Vec2(1, 1);
			const vector = new Vec2(original);

			expect(vector.x).to.equal(1).and.equal(original.x);
			expect(vector.y).to.equal(1).and.equal(original.y);
			expect(vector).to.not.equal(original);
		});
	});
	
	describe('Vec2 squared magnitude', () => {
		it('A (2, 1) Vec2 returns a squared magnitude of 5', () => {
			const vector = new Vec2(2, 1);
			expect(vector.squaredMagnitude).to.equal(5);
		});
	});
	
	describe('Vec2 magnitude', () => {
		it('A (-10, 2) Vec2 returns a magnitude of 10.198', () => {
			const vector = new Vec2(-10, 2);
			expect(vector.magnitude).to.approximately(10.198, 0.001, 'with a ~0.001 delta');
		});
	});
	
	describe('Vec2 angle', () => {
		it('A (0, 2) Vec2 returns an angle of PI/2 rad or 90 deg', () => {
			const vector = new Vec2(0, 2);
			expect(vector.angle).to.approximately(Math.PI / 2, 0.00001, 'with a ~0.00001 delta');
		});
	
		it('A (-2, 2) Vec2 returns an angle of 3/4 PI rad or 135 deg', () => {
			const vector = new Vec2(-2, 2);
			expect(vector.angle).to.approximately(Math.PI * (3/4), 0.00001, 'with a ~0.00001 delta');
		});
	
		it('A (-2, -2) Vec2 returns an angle of 5/4 PI rad or 225 deg', () => {
			const vector = new Vec2(-2, -2);
			expect(vector.angle).to.approximately(Math.PI * (5/4), 0.00001, 'with a ~0.00001 delta');
		});
	
		it('A (2, -2) Vec2 returns an angle of 7/4 PI rad or 315 deg', () => {
			const vector = new Vec2(2, -2);
			expect(vector.angle).to.approximately(Math.PI * (7/4), 0.00001, 'with a ~0.00001 delta');
		});
	});
	
	describe('Vec2 normalized', () => {
		it('Both a (5, 5) and (2, 2) Vec2s normalize to (1/sqrt(2), 1/sqrt(2))', () => {
			const comp = 1 / Math.sqrt(2);
			const vec1 = new Vec2(5, 5);
			const vec2 = new Vec2(2, 2);
	
			const vec1Norm = vec1.normalized;
			const vec2Norm = vec2.normalized;
	
			expect(vec1Norm.x).to.equal(comp).and.equal(vec2Norm.x);
			expect(vec1Norm.y).to.equal(comp).and.equal(vec2Norm.y);
		});
	});
	
	describe('Vec2 toString', () => {
		it('A (1, 1) Vec2 returns a string equal to `(1, 1)`', () => {
			const vector = new Vec2(1, 1);
			expect(vector.toString()).to.equal('(1, 1)');
		});
	});
	
	describe('Vec2 clone', () => {
		it('Returns a new clone of a (1, 1) Vec2', () => {
			const original = new Vec2(1, 1);
			const clone = original.clone();
	
			expect(clone.x).to.equal(1).and.equal(original.x);
			expect(clone.y).to.equal(1).and.equal(original.y);
			expect(clone).to.not.equal(original);
		});
	});

	describe('Vec2 toArray', () => {
		it('A (1, 1) Vec2 returns an array `[1, 1]`', () => {
			const vector = new Vec2(1, 1);
			expect(vector.toArray()).to.deep.equal([1, 1]);
		});
	});

	describe('Vec2 set', () => {
		it('A (1, 1) Vec2 set to a (3, 7) Vec2 returns the new Vec2 with numeric parameters', () => {
			let vector = new Vec2(1, 1);
			vector.set(3, 7);

			expect(vector.x).to.equal(3);
			expect(vector.y).to.equal(7);
		});

		it('A (1, 1) Vec2 set to a (3, 7) Vec2 returns the new Vec2 with object literal', () => {
			let vector = new Vec2(1, 1);
			vector.set({ x: 3, y: 7 });

			expect(vector.x).to.equal(3);
			expect(vector.y).to.equal(7);
		});

		it('A (1, 1) Vec2 set to a (3, 7) Vec2 returns the new Vec2 with Vec2', () => {
			let vector = new Vec2(1, 1);
			vector.set(new Vec2(3, 7));

			expect(vector.x).to.equal(3);
			expect(vector.y).to.equal(7);
		});
	});

	describe('Vec2 normalize', () => {
		it('A (2, 2) Vec2 is altered to be unitary', () => {
			let vector = new Vec2(2, 2);
			vector.normalize();

			expect(vector.magnitude).to.approximately(1, 0.0000001);
		});
	});

	describe('Vec2 map', () => {
		it('Runs the function (prev, value) => prev % value in each of the (2, 3) Vec2 components resulting in (0, 1)', () => {
			let vector = new Vec2(2, 3);
			vector.map(2, 2, (prev, value) => prev % value);

			expect(vector.x).to.equal(0);
			expect(vector.y).to.equal(1);
		});
	});

	describe('Vec2 add', () => {
		it('Add (1, 1) to a (2, 3) Vec2 returning (3, 4) with numeric parameters', () => {
			let vector = new Vec2(2, 3);
			vector.add(1, 1);

			expect(vector.x).to.equal(3);
			expect(vector.y).to.equal(4);
		});

		it('Add (1, 1) to a (2, 3) Vec2 returning (3, 4) with object literal', () => {
			let vector = new Vec2(2, 3);
			vector.add({ x: 1, y: 1 });

			expect(vector.x).to.equal(3);
			expect(vector.y).to.equal(4);
		});

		it('Add (1, 1) to a (2, 3) Vec2 returning (3, 4) with Vec2', () => {
			let vector = new Vec2(2, 3);
			vector.add(new Vec2(1, 1));

			expect(vector.x).to.equal(3);
			expect(vector.y).to.equal(4);
		});
	});

	describe('Vec2 subtract', () => {
		it('Subtract (1, 1) to a (2, 3) Vec2 returning (1, 2)  with numeric parameters', () => {
			let vector = new Vec2(2, 3);
			vector.subtract(1, 1);

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(2);
		});

		it('Subtract (1, 1) to a (2, 3) Vec2 returning (1, 2) with object literal', () => {
			let vector = new Vec2(2, 3);
			vector.subtract({ x: 1, y: 1 });

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(2);
		});

		it('Subtract (1, 1) to a (2, 3) Vec2 returning (1, 2) with Vec2', () => {
			let vector = new Vec2(2, 3);
			vector.subtract(new Vec2(1, 1));

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(2);
		});
	});

	describe('Vec2 scale', () => {
		it('Scale (2, 3) Vec2 by (2, 4) returning (4, 12) with numeric parameters', () => {
			let vector = new Vec2(2, 3);
			vector.scale(2, 4);

			expect(vector.x).to.equal(4);
			expect(vector.y).to.equal(12);
		});

		it('Scale (2, 3) Vec2 by (2, 4) returning (4, 12) with object literal', () => {
			let vector = new Vec2(2, 3);
			vector.scale({ x: 2, y: 4 });

			expect(vector.x).to.equal(4);
			expect(vector.y).to.equal(12);
		});

		it('Scale (2, 3) Vec2 by (2, 4) returning (4, 12) with Vec2', () => {
			let vector = new Vec2(2, 3);
			vector.scale(new Vec2(2, 4));

			expect(vector.x).to.equal(4);
			expect(vector.y).to.equal(12);
		});
	});

	describe('Vec2 divide', () => {
		it('Divide (2, 3) Vec2 by (2, 2) returning (1, 1.5) with parameters', () => {
			let vector = new Vec2(2, 3);
			vector.divide(2, 2);

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(1.5);
		});

		it('Divide (2, 3) Vec2 by (2, 2) returning (1, 1.5) with object literal', () => {
			let vector = new Vec2(2, 3);
			vector.divide({ x: 2, y: 2 });

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(1.5);
		});

		it('Divide (2, 3) Vec2 by (2, 2) returning (1, 1.5) with Vec2', () => {
			let vector = new Vec2(2, 3);
			vector.divide(new Vec2(2, 2));

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(1.5);
		});
	});

	describe('Vec2 equals', () => {
		it('A (2, 3) Vec2 is equal to (2, 3) with parameters', () => {
			const vector = new Vec2(2, 3);

			expect(vector.equals(2, 3)).to.equal(true);
		});

		it('A (2, 3) Vec2 is not equal to (1, 1) with parameters', () => {
			const vector = new Vec2(2, 3);

			expect(vector.equals(1, 1)).to.equal(false);
		});

		it('A (2, 3) Vec2 is equal to (2, 3) with object literal', () => {
			const vector = new Vec2(2, 3);

			expect(vector.equals({ x: 2, y: 3 })).to.equal(true);
		});

		it('A (2, 3) Vec2 is not equal to (1, 1) with object literal', () => {
			const vector = new Vec2(2, 3);
			vector.divide({ x: 2, y: 2 });

			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(1.5);
		});

		it('A (2, 3) Vec2 is equal to (2, 3) with Vec2', () => {
			const vector = new Vec2(2, 3);

			expect(vector.equals(new Vec2(2, 3))).to.equal(true);
		});

		it('A (2, 3) Vec2 is not equal to (1, 1) with Vec2', () => {
			const vector = new Vec2(2, 3);

			expect(vector.equals(new Vec2(1, 1))).to.equal(false);
		});
	});

	describe('Vec2 setMagnitude', () => {
		it('Sets the magnitude of a (2, 2) Vec2 to 6', () => {
			let vector = new Vec2(2, 2);
			vector.setMagnitude(6);

			expect(vector.magnitude).to.approximately(6, 0.0000001);
		});
	});

	describe('Vec2 rotate', () => {
		it('Rotates a (2, 2) Vec2 (with angle 45deg) by 90deg resulting in an angle of 135deg', () => {
			let vector = new Vec2(2, 2);
			
			expect(vector.angle).to.approximately(Math.PI * 0.25, 0.0000001);
			
			vector.rotate(Math.PI * 0.5);

			expect(vector.angle).to.approximately(Math.PI * 0.75, 0.0000001);
		});
	});

	describe('Vec2 destructure', () => {
		it('Destructures the components of (2, 3) with parameters', () => {
			const { x, y } = Vec2.destructure(2, 3);

			expect(x).to.equal(2);
			expect(y).to.equal(3);
		});

		it('Destructures the components of (2, 3) with object literal', () => {
			const { x, y } = Vec2.destructure({ x: 2, y: 3 });

			expect(x).to.equal(2);
			expect(y).to.equal(3);
		});

		it('Destructures the components of (2, 3) with Vec2', () => {
			const { x, y } = Vec2.destructure(new Vec2(2, 3));

			expect(x).to.equal(2);
			expect(y).to.equal(3);
		});
	});

	describe('Vec2 static clone', () => {
		it('Clones a single Vec2 and returns an array', () => {
			const vector = new Vec2(1, 1);
			const clone = Vec2.clone(vector);

			expect(clone[0].x).to.equal(vector.x);
			expect(clone[0].x).to.equal(vector.x);
			expect(clone[0]).to.not.equal(vector);
		});

		it('Clones multiple Vec2 by parameters and returns an array', () => {
			const vectors = [new Vec2(1, 1), new Vec2(2, 2), new Vec2(3, 3), new Vec2(4, 4)];
			const clones = Vec2.clone(new Vec2(1, 1), new Vec2(2, 2), new Vec2(3, 3), new Vec2(4, 4));

			for (let i = 0; i < clones.length; i++) {
				expect(clones[i].x).to.equal(vectors[i].x);
				expect(clones[i].y).to.equal(vectors[i].y);
				expect(clones[i]).to.not.equal(vectors[i]);
			}
		});

		it('Clones multiple Vec2 by array and returns an array', () => {
			const vectors = [new Vec2(1, 1), new Vec2(2, 2), new Vec2(3, 3), new Vec2(4, 4)];
			const clones = Vec2.clone(vectors);

			for (let i = 0; i < clones.length; i++) {
				expect(clones[i].x).to.equal(vectors[i].x);
				expect(clones[i].y).to.equal(vectors[i].y);
				expect(clones[i]).to.not.equal(vectors[i]);
			}
		});
	});

	describe('Vec2 static map', () => {
		it('Runs the function (prev, value) => prev - value for each of the Vec2 in the array and returns the resulting Vec2', () => {
			const array = [new Vec2(1, 2), new Vec2(2, 3), new Vec2(3, 4)];
			const result = Vec2.map(array, (prev, value) => prev - value);

			expect(result.x).to.equal(-6);
			expect(result.y).to.equal(-9);
		});
	});

	describe('Vec2 static map', () => {
		it('Sums the Vec2 parameters and returns the resulting Vec2', () => {
			const result = Vec2.add(new Vec2(1, 2), new Vec2(2, 3), new Vec2(3, 4));

			expect(result.x).to.equal(6);
			expect(result.y).to.equal(9);
		});

		it('Sums the array of Vec2 and returns the resulting Vec2', () => {
			const result = Vec2.add([new Vec2(1, 2), new Vec2(2, 3), new Vec2(3, 4)]);

			expect(result.x).to.equal(6);
			expect(result.y).to.equal(9);
		});
	});

	describe('Vec2 distance', () => {
		it('The distance between (-2, -2) and (-2, 30) is 32', () => {
			const value = Vec2.distance(new Vec2(-2, -2), new Vec2(-2, 30));

			expect(value).to.equal(32);
		});

		it('The distance between (-2, -2) and (-3, -5) is 3.16228', () => {
			const value = Vec2.distance(new Vec2(-2, -2), new Vec2(-3, -5));

			expect(value).to.approximately(3.16228, 0.00001);
		});

		it('The distance between (0, 0) and (5, 0) is 5', () => {
			const value = Vec2.distance(new Vec2(0, 0), new Vec2(5, 0));

			expect(value).to.equal(5);
		});
	});

	describe('Vec2 dot', () => {
		it('The dot product of (2, 3) and (4, 5) is 23', () => {
			const value = Vec2.dot(new Vec2(2, 3), new Vec2(4, 5));

			expect(value).to.equal(23);
		});
	});

	describe('Vec2 angle', () => {
		it('The angle between (0, 1) and (1, 0) is 90deg', () => {
			const value = Vec2.angle(new Vec2(0, 1), new Vec2(1, 0));

			expect(value).to.equal(Math.PI / 2);
		});

		it('The angle between (0, -1) and (1, -1) is 45deg', () => {
			const value = Vec2.angle(new Vec2(0, -1), new Vec2(1, -1));

			expect(value).to.approximately(Math.PI / 4, 0.0000001);
		});

		it('The angle between (-1, 0) and (1, 0) is 180deg', () => {
			const value = Vec2.angle(new Vec2(-1, 0), new Vec2(1, 0));

			expect(value).to.equal(Math.PI);
		});
	});

	describe('Vec2 lerp', () => {
		it('The linear interpolation between (1, 0) and (-1, 2) at 0.5 is (0, 1)', () => {
			const result = Vec2.lerp(new Vec2(1, 0), new Vec2(-1, 2), 0.5);

			expect(result.x).to.equal(0);
			expect(result.y).to.equal(1);
		});
	});
});
