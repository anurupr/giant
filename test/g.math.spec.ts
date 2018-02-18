import { expect } from 'chai';
import 'mocha';

import { math } from '../src/lib/g.math';

describe('Math library', () => {
	describe('Math clamp', () => {
		it('Clamps 8 to range [3, 6]', () => {
			const value = math.clamp(8, 3, 6);

			expect(value).to.equal(6);
		});

		it('Clamps 4 to range [3, 6]', () => {
			const value = math.clamp(4, 3, 6);

			expect(value).to.equal(4);
		});

		it('Clamps -1 to range [3, 6]', () => {
			const value = math.clamp(-1, 3, 6);

			expect(value).to.equal(3);
		});

		it('Clamps 4 to the inverted range [6, 3]', () => {
			const value = math.clamp(4, 6, 3);

			expect(value).to.equal(4);
		});
	});

	describe('Math clamp01', () => {
		it('Clamps 3 to range [0, 1]', () => {
			const value = math.clamp01(3);

			expect(value).to.equal(1);
		});

		it('Clamps 0.75 to range [0, 1]', () => {
			const value = math.clamp01(0.75);

			expect(value).to.equal(0.75);
		});

		it('Clamps -1 to range [0, 1]', () => {
			const value = math.clamp01(-1);

			expect(value).to.equal(0);
		});
	});

	describe('Math lerp', () => {
		it('Interpolates between 0 and 2 by 0.5 returning 1', () => {
			const value = math.lerp(0, 2, 0.5);

			expect(value).to.equal(1);
		});

		it('Interpolates between 10 and 0 by 0.75 returning 2.5', () => {
			const value = math.lerp(10, 0, 0.75);

			expect(value).to.equal(2.5);
		});
	});

	describe('Math inRange', () => {
		it('4 is in range [3, 6]', () => {
			const value = math.inRange(4, 3, 6);

			expect(value).to.equal(true);
		});

		it('10 is not in range [3, 6]', () => {
			const value = math.inRange(10, 3, 6);

			expect(value).to.equal(false);
		});

		it('5 is in inverted range [6, 3]', () => {
			const value = math.inRange(5, 6, 3);

			expect(value).to.equal(true);
		});
	});

	describe('Math average', () => {
		it('The average of [0 ... 10] is 5 with parameters', () => {
			const value = math.average(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

			expect(value).to.equal(5);
		});

		it('The average of [0 ... 10] is 5 with array', () => {
			const value = math.average([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

			expect(value).to.equal(5);
		});
	});

	describe('Math rangesIntersect', () => {
		it('The range [0, 3] and [2, 6] intersect', () => {
			const value = math.rangesIntersect(0, 3, 2, 6);

			expect(value).to.equal(true);
		});

		it('The range [0, 3] and [5, 6] do not intersect', () => {
			const value = math.rangesIntersect(0, 3, 5, 6);

			expect(value).to.equal(false);
		});

		it('The inverted range [3, 0] and [2, 6] intersect', () => {
			const value = math.rangesIntersect(3, 0, 2, 6);

			expect(value).to.equal(true);
		});
	});

	describe('Math wrap', () => {
		it('380deg wraps to 20deg', () => {
			const value = math.wrap(380, 0, 360);

			expect(value).to.equal(20);
		});

		it('-90deg wraps to 270deg', () => {
			const value = math.wrap(-90, 0, 360);

			expect(value).to.equal(270);
		});

		it('380deg wraps to 20deg inverted', () => {
			const value = math.wrap(380, 360, 0);

			expect(value).to.equal(20);
		});
	});

	describe('Math map', () => {
		it('2 in [1, 3] maps to 5 in [0, 10]', () => {
			const value = math.map(2, 1, 3, 0, 10);

			expect(value).to.equal(5);
		});

		it('1 in [1, 100] maps to 80 in [80, 90]', () => {
			const value = math.map(1, 1, 100, 80, 90);

			expect(value).to.equal(80);
		});

		it('2 in [3, 1] maps to 5 in [10, 0]', () => {
			const value = math.map(2, 3, 1, 10, 0);

			expect(value).to.equal(5);
		});
	});

	describe('Math randomRange', () => {
		it('Returns a random number between [0, 10]', () => {
			const value = math.randomRange(0, 10);

			expect(value).to.within(0, 10);
		});

		it('Returns a random number between [10, 0]', () => {
			const value = math.randomRange(10, 0);

			expect(value).to.within(0, 10);
		});
	});

	describe('Math choose', () => {
		it('Returns a random element of the parameters [0, 1, 2, 3]', () => {
			const value = math.choose(0, 1, 2, 3);

			expect(value).to.within(0, 3);
		});

		it('Returns a random element of the array [0, 1, 2, 3]', () => {
			const value = math.choose([0, 1, 2, 3]);

			expect(value).to.within(0, 3);
		});
	});

	describe('Math precision', () => {
		it('Clamps the precision of 1.123456 to 1.12', () => {
			const value = math.precision(1.123456, 2);

			expect(value).to.equal(1.12);
		});

		it('Expands the precision of 1.12 to 1.120000', () => {
			const value = math.precision(1.12, 6);

			expect(value).to.equal(1.120000);
		});
	});

	describe('Math digits', () => {
		it('The number 0 has 1 digit', () => {
			const value = math.digits(0);

			expect(value).to.equal(1);
		});

		it('The number 123 has 3 digits', () => {
			const value = math.digits(123);

			expect(value).to.equal(3);
		});

		it('The number -123 still has 3 digits', () => {
			const value = math.digits(-123);

			expect(value).to.equal(3);
		});

		it('The number 1.0092 has 5 digits', () => {
			const value = math.digits(1.0092);

			expect(value).to.equal(5);
		});

		it('The number 1.0090 still has 5 digits (dont count right zeroes)', () => {
			const value = math.digits(1.00920);

			expect(value).to.equal(5);
		});
	});

	describe('Math radians', () => {
		it('45deg are PI/4rads', () => {
			const value = math.radians(45);

			expect(value).to.approximately(Math.PI / 4, 0.0000001);
		});

		it('-45deg are 7/4PI rads', () => {
			const value = math.radians(-45);

			expect(value).to.approximately(Math.PI * (7 / 4), 0.0000001);
		});
	});

	describe('Math degrees', () => {
		it('PI/4rads are 45deg', () => {
			const value = math.degrees(Math.PI / 4);

			expect(value).to.approximately(45, 0.0000001);
		});

		it('7/4PIrads are -45deg (315deg)', () => {
			const value = math.degrees(Math.PI * (7 / 4));

			expect(value).to.approximately(315, 0.0000001);
		});
	});

	describe('Math approximately', () => {
		it('0.9900 aproximates 1 by 0.01', () => {
			const value = math.approximately(0.99000, 1, 0.01);

			expect(value).to.equal(true);
		});

		it('0.0099 does not aproximates 1 by 0.01', () => {
			const value = math.approximately(0.0099, 1, 0.01);

			expect(value).to.equal(false);
		});

		it('Math.PI aproximates math.TAU by 0.0000001', () => {
			const value = math.approximately(Math.PI, math.TAU / 2, 0.0000001);

			expect(value).to.equal(false);
		});
	});
});
