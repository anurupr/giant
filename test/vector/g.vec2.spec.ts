import 'mocha';
import { assert, expect } from 'chai';

import { Vec2 } from '../../src/lib/vector/g.vec2';

describe('Vec2 library', () => {
	describe('Vec2 constructor', () => {
		describe('Vec2 empty contructor', () => {
			it('Returns a default new Vec2 (0, 0)', () => {
				const vector = new Vec2();
	
				expect(vector.x).to.equal(0);
				expect(vector.y).to.equal(0);
			});
		});

		describe('Vec2 contructor with numeric parameters', () => {
			it('Returns a new Vec2 (1, 1)', () => {
				const vector = new Vec2(1, 1);
	
				expect(vector.x).to.equal(1);
				expect(vector.y).to.equal(1);
			});
		});
	
		describe('Vec2 contructor with interface object', () => {
			it('Returns a new Vec2 (1, 1), whose components equal an object {x: 1, y: 1}', () => {
				const obj = { x: 1, y: 1 };
				const vector = new Vec2(obj);
	
				expect(vector.x).to.equal(1).and.equal(obj.x);
				expect(vector.y).to.equal(1).and.equal(obj.y);
			});
		});
	
		describe('Vec2 contructor with another Vec2', () => {
			it('Returns a new Vec2 (1, 1), who is equal to an original but is not the original', () => {
				const original = new Vec2(1, 1);
				const vector = new Vec2(original);
	
				expect(vector.x).to.equal(1).and.equal(original.x);
				expect(vector.y).to.equal(1).and.equal(original.y);
				expect(vector).to.not.equal(original);
			});
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
			assert.deepEqual(vector.toArray(), [1, 1]);
		});
	});
});

