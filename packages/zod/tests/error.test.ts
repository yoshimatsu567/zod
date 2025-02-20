import { expect, test } from "vitest";
import * as z from "zod";

test("error creation", () => {
  const err1 = new z.ZodError([]);

  err1.issues.push({
    code: "invalid_type",
    expected: "object",
    path: [],
    message: "",
    input: "adf",
  });
  err1.isEmpty;

  const err2 = new z.ZodError(err1.issues);
  const err3 = new z.ZodError([]);
  err3.addIssues(err1.issues);
  err3.addIssue(err1.issues[0]);
  err1.message;
  err2.message;
  err3.message;
});

test("do not allow error and message together", () => {
  expect(() =>
    z.string().refine((val) => true, {
      message: "override",
      error: (iss) => (iss.input === undefined ? "asdf" : null),
    })
  ).toThrow();
});

const errorMap: z.ZodErrorMap = (issue) => {
  if (issue.code === "invalid_type") {
    if (issue.expected === "string") {
      return { message: "bad type!" };
    }
  }
  if (issue.code === "custom") {
    return { message: `less-than-${issue.params?.minimum}` };
  }
  return undefined;
};

test("type error with custom error map", () => {
  const result = z.string().safeParse(234, { error: errorMap });

  expect(result.error?.issues[0].code).toEqual("invalid_type");
  expect(result.error?.issues[0].message).toEqual(`bad type!`);
});

test("refinement fail with params", () => {
  const result = z
    .number()
    .refine((val) => val >= 3, {
      params: { minimum: 3 },
    })
    .safeParse(2, { error: errorMap });
  expect(result.success).toBe(false);
  expect(result.error!.issues[0].code).toEqual("custom");
  expect(result.error!.issues[0].message).toEqual(`less-than-3`);
});

test("hard coded error  with custom errormap", () => {
  const result = z
    .string()
    .refine((val) => val.length > 12, {
      params: { minimum: 13 },
      message: "override",
    })
    .safeParse("asdf", { error: () => "contextual" });

  expect(result.success).toBe(false);
  // expect(result.error!.issues[0].message).toEqual("override");
  expect(result.error!.issues[0].message).toEqual("override");
});

test("default error message", () => {
  const result = z
    .number()
    .refine((x) => x > 3)
    .safeParse(2);

  expect(result.success).toBe(false);
  expect(result.error!.issues[0].message).toEqual("Invalid input");
  expect(result.error!.issues.length).toEqual(1);
});

test("override error in refine", () => {
  const result = z
    .number()
    .refine((x) => x > 3, "override")
    .safeParse(2);
  expect(result.success).toBe(false);
  expect(result.error!.issues.length).toEqual(1);
  expect(result.error!.issues[0].message).toEqual("override");
});

test("override error in refinement", () => {
  const result = z
    .number()
    .refine((x) => x > 3, {
      message: "override",
    })
    .safeParse(2);
  expect(result.success).toBe(false);
  expect(result.error!.issues.length).toEqual(1);
  expect(result.error!.issues[0].message).toEqual("override");
});

test("array minimum", () => {
  let result = z.array(z.string()).min(3, "tooshort").safeParse(["asdf", "qwer"]);
  expect(result.success).toBe(false);
  expect(result.error!.issues[0].code).toEqual("too_small");
  expect(result.error!.issues[0].message).toEqual("tooshort");

  result = z.array(z.string()).min(3).safeParse(["asdf", "qwer"]);
  expect(result.success).toBe(false);
  expect(result.error!.issues[0].code).toEqual("too_small");
  expect(result.error!.issues[0].message).toEqual(`Too small: expected array length to be >3 items`);
});

// implement test for semi-smart union logic that checks for type error on either left or right
// test("union smart errors", () => {
//   // expect.assertions(2);

//   const p1 = z
//     .union([z.string(), z.number().refine((x) => x > 0)])
//     .safeParse(-3.2);

//   if (p1.success === true) throw new Error();
//   expect(p1.success).toBe(false);
//   expect(p1.error.issues[0].code).toEqual("custom");

//   const p2 = z.union([z.string(), z.number()]).safeParse(false);
//   // .catch(err => expect(err.issues[0].code).toEqual("invalid_union"));
//   if (p2.success === true) throw new Error();
//   expect(p2.success).toBe(false);
//   expect(p2.error.issues[0].code).toEqual("invalid_union");
// });

test("custom path in custom error map", () => {
  const schema = z.object({
    items: z.array(z.string()).refine((data) => data.length > 3, {
      path: ["items-too-few"],
    }),
  });

  const errorMap: z.ZodErrorMap = (issue) => {
    expect((issue.path ?? []).length).toBe(2);
    return { message: "doesnt matter" };
  };
  const result = schema.safeParse({ items: ["first"] }, { error: errorMap });
  expect(result.success).toBe(false);
  expect(result.error!.issues[0].path).toEqual(["items", "items-too-few"]);
});

// test("error metadata from value", () => {
//   const dynamicRefine = z.string().refine(
//     (val) => val === val.toUpperCase(),
//     (val) => ({ params: { val } })
//   );

//   const result = dynamicRefine.safeParse("asdf");
//   expect(result.success).toEqual(false);
//   if (!result.success) {
//     const sub = result.error.issues[0];
//     expect(result.error.issues[0].code).toEqual("custom");
//     if (sub.code === "custom") {
//       expect(sub.params?.val).toEqual("asdf");
//     }
//   }
// });

// test("don't call refine after validation failed", () => {
//   const asdf = z
//     .union([
//       z.number(),
//       z.string().transform(z.number(), (val) => {
//         return parseFloat(val);
//       }),
//     ])
//     .refine((v) => v >= 1);

//   expect(() => asdf.safeParse("foo")).not.toThrow();
// });

test("root level formatting", () => {
  const schema = z.string().email();
  const result = schema.safeParse("asdfsdf");
  expect(result.success).toBe(false);
  expect(result.error!.format()._errors).toEqual(["Invalid email"]);
});

test("custom path", () => {
  const schema = z
    .object({
      password: z.string(),
      confirm: z.string(),
    })
    .refine((val) => val.confirm === val.password, { path: ["confirm"] });

  const result = schema.safeParse({
    password: "peanuts",
    confirm: "qeanuts",
  });

  expect(result.success).toBe(false);
  const error = result.error!.format();
  expect(error._errors).toEqual([]);
  expect(error.password?._errors).toEqual(undefined);
  expect(error.confirm?._errors).toEqual(["Invalid input"]);
});

test("custom path", () => {
  const schema = z
    .object({
      password: z.string().min(6),
      confirm: z.string().min(6),
    })
    .refine((val) => val.confirm === val.password);

  const result = schema.safeParse({
    password: "qwer",
    confirm: "asdf",
  });

  expect(result.success).toBe(false);
  expect(result.error!.issues.length).toEqual(3);
});

const schema = z.object({
  inner: z.object({
    name: z
      .string()
      .refine((val) => val.length > 5)
      .array()
      .refine((val) => val.length <= 1),
  }),
});

test("no abort early on refinements", () => {
  const invalidItem = {
    inner: { name: ["aasd", "asdfasdfasfd"] },
  };

  const result1 = schema.safeParse(invalidItem);
  expect(result1.success).toBe(false);
  expect(result1.error!.issues.length).toEqual(2);
});

test("detect issue with input fallback", () => {
  const schema = z
    .string()
    .transform((val) => val.length)
    .refine(() => false, { message: "always fails" })
    .refine(
      (val) => {
        if (typeof val !== "number") throw new Error();
        return (val ^ 2) > 10;
      } // should be number but it's a string
    );
  expect(() => schema.parse("hello")).toThrow(z.ZodError);
});

test("formatting", () => {
  const invalidItem = {
    inner: { name: ["aasd", "asdfasdfasfd"] },
  };
  const invalidArray = {
    inner: { name: ["asdfasdf", "asdfasdfasfd"] },
  };
  const result1 = schema.safeParse(invalidItem);
  const result2 = schema.safeParse(invalidArray);

  expect(result1.success).toBe(false);
  expect(result2.success).toBe(false);
  const error1 = result1.error!.format();
  expect(error1._errors).toEqual([]);
  expect(error1.inner?._errors).toEqual([]);
  expect(error1.inner?.name?.[1]).toEqual(undefined);

  type FormattedError = z.inferFormattedError<typeof schema>;
  const error2: FormattedError = result2.error!.format();
  expect(error2._errors).toEqual([]);
  expect(error2.inner?._errors).toEqual([]);
  expect(error2.inner?.name?._errors).toEqual(["Invalid input"]);
  expect(error2.inner?.name?.[0]).toEqual(undefined);
  expect(error2.inner?.name?.[1]).toEqual(undefined);
  expect(error2.inner?.name?.[2]).toEqual(undefined);

  // test custom mapper
  type FormattedErrorWithNumber = z.inferFormattedError<typeof schema, number>;
  const errorWithNumber: FormattedErrorWithNumber = result2.error!.format(() => 5);
  expect(errorWithNumber._errors).toEqual([]);
  expect(errorWithNumber.inner?._errors).toEqual([]);
  expect(errorWithNumber.inner?.name?._errors).toEqual([5]);
});

test("formatting with nullable and optional fields", () => {
  const nameSchema = z.string().refine((val) => val.length > 5);
  const schema = z.object({
    nullableObject: z.object({ name: nameSchema }).nullable(),
    nullableArray: z.array(nameSchema).nullable(),
    nullableTuple: z.tuple([nameSchema, nameSchema, z.number()]).nullable(),
    optionalObject: z.object({ name: nameSchema }).optional(),
    optionalArray: z.array(nameSchema).optional(),
    optionalTuple: z.tuple([nameSchema, nameSchema, z.number()]).optional(),
  });
  const invalidItem = {
    nullableObject: { name: "abcd" },
    nullableArray: ["abcd"],
    nullableTuple: ["abcd", "abcd", 1],
    optionalObject: { name: "abcd" },
    optionalArray: ["abcd"],
    optionalTuple: ["abcd", "abcd", 1],
  };
  const result = schema.safeParse(invalidItem);
  expect(result.success).toBe(false);
  const error: z.inferFormattedError<typeof schema> = result.error!.format();
  expect(error._errors).toEqual([]);
  expect(error.nullableObject?._errors).toEqual([]);
  expect(error.nullableObject?.name?._errors).toEqual(["Invalid input"]);
  expect(error.nullableArray?._errors).toEqual([]);
  expect(error.nullableArray?.[0]?._errors).toEqual(["Invalid input"]);
  expect(error.nullableTuple?._errors).toEqual([]);
  expect(error.nullableTuple?.[0]?._errors).toEqual(["Invalid input"]);
  expect(error.nullableTuple?.[1]?._errors).toEqual(["Invalid input"]);
  expect(error.optionalObject?._errors).toEqual([]);
  expect(error.optionalObject?.name?._errors).toEqual(["Invalid input"]);
  expect(error.optionalArray?._errors).toEqual([]);
  expect(error.optionalArray?.[0]?._errors).toEqual(["Invalid input"]);
  expect(error.optionalTuple?._errors).toEqual([]);
  expect(error.optionalTuple?.[0]?._errors).toEqual(["Invalid input"]);
  expect(error.optionalTuple?.[1]?._errors).toEqual(["Invalid input"]);
});

test("inferFlattenedErrors", () => {
  const schemaWithTransform = z.object({ foo: z.string() }).transform((o) => ({ bar: o.foo }));

  const result = schemaWithTransform.safeParse({});

  expect(result.success).toBe(false);
  const error: z.inferFlattenedErrors<typeof schemaWithTransform> = result.error!.flatten();
  expect(error.formErrors).toEqual([]);
  expect(error.fieldErrors).toEqual({ foo: ["Invalid input: expected string"] });
});

const stringWithCustomError = z.string({
  error: () => "bound",
});

test("schema-bound error map", () => {
  const result = stringWithCustomError.safeParse(1234);
  expect(result.success).toBe(false);
  expect(result.error!.issues[0].message).toEqual("bound");
});

test("bound error map overrides contextual", () => {
  // support contextual override
  const result3 = stringWithCustomError.safeParse(undefined, {
    error: () => ({ message: "override" }),
  });
  expect(result3.success).toBe(false);
  expect(result3.error!.issues[0].message).toEqual("bound");
});

test("z.config customError ", () => {
  // support overrideErrorMap
  z.config({ customError: () => ({ message: "override" }) });
  const result4 = stringWithCustomError.min(10).safeParse("tooshort");
  expect(result4.success).toBe(false);
  expect(result4.error!.issues[0].message).toEqual("override");
  z.config({ customError: undefined });
});

// test("invalid and required", () => {
//   const str = z.string({
//     invalid_type_error: "Invalid name",
//     required_error: "Name is required",
//   });
//   const result1 = str.safeParse(1234);
//   expect(result1.success).toBe(false);
//   if (!result1.success) {
//     expect(result1.error.issues[0].message).toEqual("Invalid name");
//   }
//   const result2 = str.safeParse(undefined);
//   expect(result2.success).toBe(false);
//   if (!result2.success) {
//     expect(result2.error.issues[0].message).toEqual("Name is required");
//   }
// });

// test("Fallback to default required error", () => {
//   const str = z.string({
//     invalid_type_error: "Invalid name",
//     // required_error: "Name is required",
//   });

//   const result2 = str.safeParse(undefined);
//   expect(result2.success).toBe(false);
//   if (!result2.success) {
//     expect(result2.error.issues[0].message).toEqual("Required");
//   }
// });

// test("invalid and required and errorMap", () => {
//   expect(() => {
//     return z.string({
//       invalid_type_error: "Invalid name",
//       required_error: "Name is required",
//       errorMap: () => ({ message: "override" }),
//     });
//   }).toThrow();
// });

// test("strict error message", () => {
//   const errorMsg = "Invalid object";
//   const obj = z.object({ x: z.string() }).strict(errorMsg);
//   const result = obj.safeParse({ x: "a", y: "b" });
//   expect(result.success).toBe(false);
//   if (!result.success) {
//     expect(result.error.issues[0].message).toEqual(errorMsg);
//   }
// });

test("empty string error message", () => {
  const schema = z.string().max(1, { message: "" });
  const result = schema.safeParse("asdf");
  expect(result.success).toBe(false);
  expect(result.error!.issues[0].message).toEqual("");
});

test("dont short circuit on continuable errors", () => {
  const user = z
    .object({
      password: z.string().min(6),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    });
  const result = user.safeParse({ password: "asdf", confirm: "qwer" });
  expect(result.success).toBe(false);
  expect(result.error!.issues.length).toEqual(2);
});
