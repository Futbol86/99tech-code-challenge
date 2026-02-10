/**
 * 
 * @param n - The input number to validate.
 * @throws {TypeError} Throws an error if n is not a non-negative integer.
 */

export function validateInput(n: number): asserts n is number {
    if(Number.isInteger(n) === false || n < 0) {
        throw new TypeError("Input n must be a non-negative integer.");
    }
}