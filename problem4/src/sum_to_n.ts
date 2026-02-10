import { validateInput } from "../utils/validateInput.ts";

/** Approach A: mathematical formula */
export function sum_to_n_a(n: number): number {
    validateInput(n);
    return (n * (n + 1)) / 2;
}

/** Approach B: recursion */
export function sum_to_n_b(n: number): number {
    validateInput(n);
    if (n === 0 || n === 1) {
        return n;
    }
    return n + sum_to_n_b(n - 1);
}

/** Approach C: iteration */
export function sum_to_n_c(n: number): number {
    validateInput(n);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}