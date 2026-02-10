import { expect } from "chai";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from '../src/sum_to_n.ts';
import { describe, it } from "node:test";

const testCases = [
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 4, expected: 10 },
    { input: 8, expected: 36 }
];

describe('sum_to_n_a', () => {
    it("sum_n_a should return correct sums", () => {
        for (const tc of testCases) {
            const result = sum_to_n_a(tc.input);
            expect(result).to.equal(tc.expected);
        }
    });

    it("sum_n_b should return correct sums", () => {
        for (const tc of testCases) {
            const result = sum_to_n_b(tc.input);
            expect(result).to.equal(tc.expected);
        }
    });

    it("sum_n_c should return correct sums", () => {
        for (const tc of testCases) {
            const result = sum_to_n_c(tc.input);
            expect(result).to.equal(tc.expected);
        }
    });
});
