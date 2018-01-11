import 'mocha';
import { expect } from 'chai';

import { utils } from '../src/lib/g.utils';

describe('Utils library', () => {
	describe('Utils arrayMin', () => {
		it('Returns the minimum value from a number array', () => {
			const value = utils.arrayMin([10, 9, 8, 1, 7, 6, 5, 4, 3, 2]);

			expect(value).to.equal(1);
		});
	});

	describe('Utils arrayMax', () => {
		it('Returns the maximum value from a number array', () => {
			const value = utils.arrayMax([1, 9, 8, 4, 7, 6, 5, 10, 3, 2]);

			expect(value).to.equal(10);
		});
	});

	describe('Utils arrayFlatten', () => {
		it('Returns a one dimensional array', () => {
			const array = [1, 2, [3, 4, 5, [6], 7], 8, [9, [10]]];
			const flat = utils.arrayFlatten(array);

			expect(flat.length).to.equal(10).and.not.equal(array.length);
		});
	});

	describe('Utils arrayDifference', () => {
		it('Returns the different elements between two arrays', () => {
			const a = [1, 2, 3, 4];
			const b = [3, 4, 5, 6];
			const difference = utils.arrayDifference(a, b);

			expect(difference).to.deep.equal([1, 2]);
		});

		it('Returns the different elements between two string arrays', () => {
			const a = ['one', 'two', 'three', 'four'];
			const b = ['three', 'four', 'five', 'six'];
			const difference = utils.arrayDifference(a, b);

			expect(difference).to.deep.equal(['one', 'two']);
		});
	});

	describe('Utils arraySymetricDifference', () => {
		it('Returns the symetric different elements between two arrays', () => {
			const a = [1, 2, 3, 4];
			const b = [3, 4, 5, 6];
			const difference = utils.arraySymetricDifference(a, b);

			expect(difference).to.deep.equal([1, 2, 5, 6]);
		});

		it('Returns the symetric different elements between two arrays', () => {
			const a = ['one', 'two', 'three', 'four'];
			const b = ['three', 'four', 'five', 'six'];
			const difference = utils.arraySymetricDifference(a, b);

			expect(difference).to.deep.equal(['one', 'two', 'five', 'six']);
		});
	});

	describe('Utils arrayIntersection', () => {
		it('Returns the intersection between two arrays', () => {
			const a = [1, 2, 3, 4];
			const b = [3, 4, 5, 6];
			const intersection = utils.arrayIntersection(a, b);

			expect(intersection).to.deep.equal([3, 4]);
		});

		it('Returns the intersection between two arrays', () => {
			const a = ['one', 'two', 'three', 'four'];
			const b = ['three', 'four', 'five', 'six'];
			const intersection = utils.arrayIntersection(a, b);

			expect(intersection).to.deep.equal(['three', 'four']);
		});
	});

	describe('Utils arrayUnion', () => {
		it('Returns the union of two arrays', () => {
			const a = [1, 2, 3];
			const b = [4, 5, 6];
			const union = utils.arrayUnion(a, b);

			expect(union).to.deep.equal([1, 2, 3, 4, 5, 6]);
		});

		it('Returns the union of two string arrays', () => {
			const a = ['one', 'two', 'three'];
			const b = ['four', 'five', 'six'];
			const union = utils.arrayUnion(a, b);

			expect(union).to.deep.equal(['one', 'two', 'three', 'four', 'five', 'six']);
		});
	});

	describe('Utils arraySample', () => {
		it('Returns a random element of an array', () => {
			const array = [1, 2, 3, 4, 5, 6];
			const value = utils.arraySample(array);

			expect(array).to.include(value);
		});

		it('Returns a random element of a string array', () => {
			const array = ['one', 'two', 'three', 'four', 'five', 'six'];
			const value = utils.arraySample(array);

			expect(array).to.include(value);
		});
	});

	describe('Utils arrayTake', () => {
		it('Removes and returns an element from an array as another array', () => {
			let array = [1, 2, 3, 4, 5, 6];
			const value = utils.arrayTake(array);

			expect(value).to.deep.equal([1]);
			expect(array.length).to.equal(5);
		});

		it('Removes and returns an element from an array as another array', () => {
			let array = [1, 2, 3, 4, 5, 6];
			const value = utils.arrayTake(array, 3);

			expect(value).to.deep.equal([1, 2, 3]);
			expect(array.length).to.equal(3);
		});
	});

	describe('Utils arrayShuffle', () => {
		it('Shuffles the order of all elements in an array', () => {
			const original = [1, 2, 3, 4, 5, 6];
			let array = [1, 2, 3, 4, 5, 6];

			utils.arrayShuffle(array);

			expect(original).to.deep.members(array);
			expect(original).to.not.deep.equal(array);
		});
	});

	describe('Utils leftPad', () => {
		it('Concatenates spaces to the left of the string until length is 13', () => {
			const string = 'string';
			const pad = utils.leftPad(string, 13);

			expect(pad).to.equal('       string');
			expect(pad.length).to.equal(13);
		});

		it('Concatenates = characters to the left of the string until length is 13', () => {
			const string = 'string';
			const pad = utils.leftPad(string, 13, '=');

			expect(pad).to.equal('=======string');
			expect(pad.length).to.equal(13);
		});

		it('Concatenates the pattern +- to the left of the string until length is 13', () => {
			const string = 'string';
			const pad = utils.leftPad(string, 13, '+-');

			expect(pad).to.equal('+-+-+-+string');
			expect(pad.length).to.equal(13);
		});
	});

	describe('Utils ', () => {
		it('Concatenates spaces to the right of the string until length is 13', () => {
			const string = 'string';
			const pad = utils.rightPad(string, 13);

			expect(pad).to.equal('string       ');
			expect(pad.length).to.equal(13);
		});

		it('Concatenates = characters to the right of the string until length is 13', () => {
			const string = 'string';
			const pad = utils.rightPad(string, 13, '=');

			expect(pad).to.equal('string=======');
			expect(pad.length).to.equal(13);
		});

		it('Concatenates the pattern +- to the right of the string until length is 13', () => {
			const string = 'string';
			const pad = utils.rightPad(string, 13, '+-');

			expect(pad).to.equal('string+-+-+-+');
			expect(pad.length).to.equal(13);
		});
	});
});
