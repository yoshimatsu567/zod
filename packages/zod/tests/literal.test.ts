import { expect, test } from "vitest";

import * as z from "zod";

const literalTuna = z.literal("tuna");
const literalTunaCustomMessage = z.literal("tuna", {
  message: "That's not a tuna",
});
const literalFortyTwo = z.literal(42);
const literalTrue = z.literal(true);

const terrificSymbol = Symbol("terrific");
const literalTerrificSymbol = z.literal(terrificSymbol);

test("passing validations", () => {
  literalTuna.parse("tuna");
  literalFortyTwo.parse(42);
  literalTrue.parse(true);
  literalTerrificSymbol.parse(terrificSymbol);
});

test("failing validations", () => {
  expect(() => literalTuna.parse("shark")).toThrow();
  expect(() => literalFortyTwo.parse(43)).toThrow();
  expect(() => literalTrue.parse(false)).toThrow();
  expect(() => literalTerrificSymbol.parse(Symbol("terrific"))).toThrow();
});

test("invalid_literal should have `received` field with data", () => {
  const data = "shark";
  const result = literalTuna.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    if (issue.code === "invalid_literal") {
      expect(issue.received).toBe(data);
    }
  }
});

test("invalid_literal should return default message", () => {
  const data = "shark";
  const result = literalTuna.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    expect(issue.message).toEqual(`Invalid literal value, expected \"tuna\"`);
  }
});

test("invalid_literal should return custom message", () => {
  const data = "shark";
  const result = literalTunaCustomMessage.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    expect(issue.message).toEqual(`That's not a tuna`);
  }
});

test("literal default error message", () => {
  const result = z.literal("Tuna").safeParse("Trout");
  expect(result.success).toEqual(false);
  expect(result.error!.issues.length).toEqual(1);
  expect(result.error).toMatchInlineSnapshot(`
    ZodError {
      "issues": [
        {
          "code": "invalid_value",
          "message": "Invalid input: expected "Tuna"",
          "path": [],
          "values": [
            "Tuna",
          ],
        },
      ],
      "name": "$ZodError",
    }
  `);
  // expect(result.error!.issues[0].message).toEqual(`Invalid input: expected "Tuna"`);
});

test("literal bigint default error message", () => {
  const result = z.literal(BigInt(12)).safeParse(BigInt(13));
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error!.issues.length).toEqual(1);
    expect(result.error!.issues[0].message).toEqual(`Invalid input: expected 12n`);
  }
});
