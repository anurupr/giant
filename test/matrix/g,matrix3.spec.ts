import 'mocha';
import { expect, assert } from 'chai';

import { Matrix3 } from '../../src/lib/matrix/g.matrix3';

describe("Matrix3 library", () => {
	describe("Matrix3 constructor", () => {
		it("Constructs new matrix defaulting to the identity matrix", () => {
			const matrix = new Matrix3();

			expect(matrix.a).to.equal(1);
			expect(matrix.b).to.equal(0);
			expect(matrix.c).to.equal(0);

			expect(matrix.d).to.equal(0);
			expect(matrix.e).to.equal(1);
			expect(matrix.f).to.equal(0);

			expect(matrix.g).to.equal(0);
			expect(matrix.h).to.equal(0);
			expect(matrix.i).to.equal(1);
		});

		it("Constructs new matrix given 9 arguments", () => {
			const args = {
				a: Math.random(),
				b: Math.random(),
				c: Math.random(),
				d: Math.random(),
				e: Math.random(),
				f: Math.random(),
				g: Math.random(),
				h: Math.random(),
				i: Math.random(),
			};

			const matrix = new Matrix3(args.a, args.b, args.c, args.d, args.e, args.f, args.g, args.h, args.i);
			expect(matrix.a).to.equal(args.a);
			expect(matrix.b).to.equal(args.b);
			expect(matrix.c).to.equal(args.c);

			expect(matrix.d).to.equal(args.d);
			expect(matrix.e).to.equal(args.e);
			expect(matrix.f).to.equal(args.f);

			expect(matrix.g).to.equal(args.g);
			expect(matrix.h).to.equal(args.h);
			expect(matrix.i).to.equal(args.i);
		});

		it("Constructs new matrix given 3 arguments, and falls back to identity matrix", () => {
			const args = {
				a: Math.random(),
				b: Math.random(),
				c: Math.random(),
			};

			const matrix = new Matrix3(args.a, args.b, args.c);
			expect(matrix.a).to.equal(args.a);
			expect(matrix.b).to.equal(args.b);
			expect(matrix.c).to.equal(args.c);

			expect(matrix.d).to.equal(0);
			expect(matrix.e).to.equal(1);
			expect(matrix.f).to.equal(0);

			expect(matrix.g).to.equal(0);
			expect(matrix.h).to.equal(0);
			expect(matrix.i).to.equal(1);
		});

		it("Constructs new matrix given a matrix", () => {
			const a = new Matrix3([
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
			]);

			const b = new Matrix3(a);
			expect(a.a).to.equal(b.a);
			expect(a.b).to.equal(b.b);
			expect(a.c).to.equal(b.c);
			expect(a.d).to.equal(b.d);
			expect(a.e).to.equal(b.e);
			expect(a.f).to.equal(b.f);
			expect(a.g).to.equal(b.g);
			expect(a.h).to.equal(b.h);
			expect(a.i).to.equal(b.i);
			expect(a).to.not.equal(b);
		});

		it("Constructs new matrix given an array", () => {
			const array = [
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
			];

			const matrix = new Matrix3(array);
			expect(matrix.a).to.equal(array[0]);
			expect(matrix.b).to.equal(array[1]);
			expect(matrix.c).to.equal(array[2]);
			expect(matrix.d).to.equal(array[3]);
			expect(matrix.e).to.equal(array[4]);
			expect(matrix.f).to.equal(array[5]);
			expect(matrix.g).to.equal(array[6]);
			expect(matrix.h).to.equal(array[7]);
			expect(matrix.i).to.equal(array[8]);
		});

		it("Constructs new matrix given an object", () => {
			const object = {
				a: Math.random(), b: Math.random(), c: Math.random(),
				d: Math.random(), e: Math.random(), f: Math.random(),
				g: Math.random(), h: Math.random(), i: Math.random(),
			};

			const matrix = new Matrix3(object);
			expect(matrix.a).to.equal(object.a);
			expect(matrix.b).to.equal(object.b);
			expect(matrix.c).to.equal(object.c);
			expect(matrix.d).to.equal(object.d);
			expect(matrix.e).to.equal(object.e);
			expect(matrix.f).to.equal(object.f);
			expect(matrix.g).to.equal(object.g);
			expect(matrix.h).to.equal(object.h);
			expect(matrix.i).to.equal(object.i);
			expect(matrix).to.not.equal(object);
		});

		it("Constructs new matrix given a Float32Array", () => {
			const array = new Float32Array([
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
			]);

			const matrix = new Matrix3(array);
			expect(matrix.a).to.equal(array[0]);
			expect(matrix.b).to.equal(array[1]);
			expect(matrix.c).to.equal(array[2]);
			expect(matrix.d).to.equal(array[3]);
			expect(matrix.e).to.equal(array[4]);
			expect(matrix.f).to.equal(array[5]);
			expect(matrix.g).to.equal(array[6]);
			expect(matrix.h).to.equal(array[7]);
			expect(matrix.i).to.equal(array[8]);
		});
	});

	describe("Matrix3 static members", () => {
		it("Identity is correct", () => {
			expect(Matrix3.identity.a).to.equal(1);
			expect(Matrix3.identity.b).to.equal(0);
			expect(Matrix3.identity.c).to.equal(0);

			expect(Matrix3.identity.d).to.equal(0);
			expect(Matrix3.identity.e).to.equal(1);
			expect(Matrix3.identity.f).to.equal(0);

			expect(Matrix3.identity.g).to.equal(0);
			expect(Matrix3.identity.h).to.equal(0);
			expect(Matrix3.identity.i).to.equal(1);
		});

		it("Zero is correct", () => {
			expect(Matrix3.zero.a).to.equal(0);
			expect(Matrix3.zero.b).to.equal(0);
			expect(Matrix3.zero.c).to.equal(0);

			expect(Matrix3.zero.d).to.equal(0);
			expect(Matrix3.zero.e).to.equal(0);
			expect(Matrix3.zero.f).to.equal(0);

			expect(Matrix3.zero.g).to.equal(0);
			expect(Matrix3.zero.h).to.equal(0);
			expect(Matrix3.zero.i).to.equal(0);
		});

		it("Modifying identity throws error", () => {
			expect(() => {
				Matrix3.identity.a = Math.random();
				Matrix3.identity.b = Math.random();
				Matrix3.identity.c = Math.random();
				Matrix3.identity.d = Math.random();
				Matrix3.identity.e = Math.random();
				Matrix3.identity.f = Math.random();
				Matrix3.identity.g = Math.random();
				Matrix3.identity.h = Math.random();
				Matrix3.identity.i = Math.random();
			}).to.throw(Error);
		});

		it("Modifying zero throws error", () => {
			expect(() => {
				Matrix3.zero.a = Math.random();
				Matrix3.zero.b = Math.random();
				Matrix3.zero.c = Math.random();
				Matrix3.zero.d = Math.random();
				Matrix3.zero.e = Math.random();
				Matrix3.zero.f = Math.random();
				Matrix3.zero.g = Math.random();
				Matrix3.zero.h = Math.random();
				Matrix3.zero.i = Math.random();
			}).to.throw(Error);
		});
	});

	describe("Matrix multiply", () => {
		it("Multiplying random matrix by identity returns the same matrix", () => {
			const original = new Matrix3([
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
				Math.random(), Math.random(), Math.random(),
			]);

			const matrix = original.clone();

			let result = Matrix3.multiply(original, Matrix3.identity);
			for (let i = 0; i < 2; i++) {
				if (i === 1) {
					result = matrix.multiply(Matrix3.identity);
				}

				expect(result.a).to.equal(original.a);
				expect(result.b).to.equal(original.b);
				expect(result.c).to.equal(original.c);
	
				expect(result.d).to.equal(original.d);
				expect(result.e).to.equal(original.e);
				expect(result.f).to.equal(original.f);
	
				expect(result.g).to.equal(original.g);
				expect(result.h).to.equal(original.h);
				expect(result.i).to.equal(original.i);
				expect(result).to.not.equal(original);
			}
		});

		it("Multiplying (1, 2, 3, 4, 5, 6, 7, 8, 9) by (9, 8, 7, 6, 5, 4, 3, 2, 1) gives (30, 24, 18, 84, 69, 54, 138, 114, 90)", () => {
			const a = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
			const b = new Matrix3(9, 8, 7, 6, 5, 4, 3, 2, 1);
			const result = Matrix3.multiply(a, b);
			expect(result.a).to.equal(30);
			expect(result.b).to.equal(24);
			expect(result.c).to.equal(18);

			expect(result.d).to.equal(84);
			expect(result.e).to.equal(69);
			expect(result.f).to.equal(54);

			expect(result.g).to.equal(138);
			expect(result.h).to.equal(114);
			expect(result.i).to.equal(90);
		});
	});

	describe("Matrix add", () => {
		it("Adding (1, 2, 3, 4, 5, 6, 7, 8, 9) and (1, 9, 2, 8, 3, 7, 4, 6, 5) gives (2, 11, 5, 12, 8, 13, 11, 14, 14)", () => {
			const a = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
			const b = new Matrix3(1, 9, 2, 8, 3, 7, 4, 6, 5);
			const result = Matrix3.add(a, b);
			expect(result.a).to.equal(2);
			expect(result.b).to.equal(11);
			expect(result.c).to.equal(5);
			expect(result.d).to.equal(12);
			expect(result.e).to.equal(8);
			expect(result.f).to.equal(13);
			expect(result.g).to.equal(11);
			expect(result.h).to.equal(14);
			expect(result.i).to.equal(14);
		});

		it("Adding (1, -2, 3, 4, -5, 6, 7, -8, 9) and (1, 9, 0, 8, 3, 7, 4, 6, 5) gives (2, 7, 3, 12, -2, 13, 11, -2, 14)", () => {
			const a = new Matrix3(1, -2, 3, 4, -5, 6, 7, -8, 9);
			const b = new Matrix3(1, 9, 0, 8, 3, 7, 4, 6, 5);
			const result = Matrix3.add(a, b);
			expect(result.a).to.equal(2);
			expect(result.b).to.equal(7);
			expect(result.c).to.equal(3);
			expect(result.d).to.equal(12);
			expect(result.e).to.equal(-2);
			expect(result.f).to.equal(13);
			expect(result.g).to.equal(11);
			expect(result.h).to.equal(-2);
			expect(result.i).to.equal(14);
		});
	});

	describe("Matrix multiplyScalar", () => {
		it("Multiplying identity times 5, yields (5,0,0,0,5,0,0,5)", () => {
			const matrix = new Matrix3();
			matrix.multiplyScalar(5);
			expect(matrix.a).to.equal(5);
			expect(matrix.b).to.equal(0);
			expect(matrix.c).to.equal(0);

			expect(matrix.d).to.equal(0);
			expect(matrix.e).to.equal(5);
			expect(matrix.f).to.equal(0);

			expect(matrix.g).to.equal(0);
			expect(matrix.h).to.equal(0);
			expect(matrix.i).to.equal(5);
		});
	});

});
