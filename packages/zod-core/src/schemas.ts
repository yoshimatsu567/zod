import * as checks from "./checks.js";
import * as core from "./core.js";
import { RESULT as tag } from "./core.js";
import type * as err from "./errors.js";
import * as regexes from "./regexes.js";

import type * as types from "./types.js";
import * as util from "./util.js";

////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      $ZodCore      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////

// export type $DiscriminatorMap = Array<
//   { key: PropertyKey; discs: $DiscriminatorMap } | Set<unknown>
// >;

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////      $ZodString      //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////
export interface $ZodStringDef extends core.$ZodTypeDef {
  type: "string";
  coerce?: boolean;
  checks: core.$ZodCheck<string>[];
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodString<Input = unknown>
  extends core.$ZodType<string, Input> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodStringDef;
}

export const $ZodString: core.$constructor<$ZodString> =
  /*@__PURE__*/ core.$constructor("$ZodString", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._pattern = regexes.stringRegex;

    inst._typecheck = (input, _ctx) => {
      if (typeof input === "string") return { tag, value: input };

      return {
        tag,
        value: input,
        issues: [
          {
            origin: "string",
            code: "invalid_type",
            input,
            def,
          },
        ],
        aborted: true,
      };
    };
  });

//////////////////////////////   ZodStringFormat   //////////////////////////////

export interface $ZodStringFormatDef
  extends $ZodStringDef,
    checks._$ZodCheckStringFormatDef {
  error?:
    | err.$ZodErrorMap<
        err.$ZodIssueInvalidType | err.$ZodIssueInvalidStringFormat
      >
    | undefined;
}

export interface $ZodStringFormat
  extends $ZodString<string>,
    checks._$ZodCheckStringFormat {
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodStringFormatDef;
}

export const $ZodStringFormat: core.$constructor<$ZodStringFormat> =
  /*@__PURE__*/ core.$constructor(
    "$ZodStringFormat",
    function (inst, def): void {
      def.checks = [inst, ...def.checks];
      $ZodString.init(inst, def);
      checks._$ZodCheckStringFormat.init(inst, def);
    }
  );

//////////////////////////////   ZodUUID   //////////////////////////////

export interface $ZodUUIDDef extends $ZodStringFormatDef {
  format: "uuid";
  version?: number;
}
export interface $ZodUUID extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodUUIDDef;
}

export const $ZodUUID: core.$constructor<$ZodUUID> =
  /*@__PURE__*/ core.$constructor("$ZodUUID", (inst, def): void => {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.uuidRegex(def.version);
  });

//////////////////////////////   ZodEmail   //////////////////////////////

export interface $ZodEmailDef extends $ZodStringFormatDef {
  format: "email";
}
export interface $ZodEmail extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodEmailDef;
}

export const $ZodEmail: core.$constructor<$ZodEmail> =
  /*@__PURE__*/ core.$constructor("$ZodEmail", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.emailRegex;
  });

//////////////////////////////   ZodURL   //////////////////////////////

export interface $ZodURLDef extends $ZodStringFormatDef {
  format: "url";
}

export interface $ZodURL extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodURLDef;
}

export const $ZodURL: core.$constructor<$ZodURL> =
  /*@__PURE__*/ core.$constructor("$ZodURL", function (inst, def) {
    $ZodStringFormat.init(inst, def);
    inst.run2 = (ctx) => {
      try {
        const url = new URL(ctx.value);
        if (regexes.hostnameRegex.test(url.hostname)) return;
      } catch {}
      ctx.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: ctx.value,
        def,
      });
    };
  });

//////////////////////////////   ZodEmoji   //////////////////////////////

export interface $ZodEmojiDef extends $ZodStringFormatDef {
  format: "emoji";
}
export interface $ZodEmoji extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodEmojiDef;
}

export const $ZodEmoji: core.$constructor<$ZodEmoji> =
  /*@__PURE__*/ core.$constructor("$ZodEmoji", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.emojiRegex();
  });

//////////////////////////////   ZodNanoID   //////////////////////////////

export interface $ZodNanoIDDef extends $ZodStringFormatDef {
  format: "nanoid";
}

export interface $ZodNanoID extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodNanoIDDef;
}

export const $ZodNanoID: core.$constructor<$ZodNanoID> =
  /*@__PURE__*/ core.$constructor("$ZodNanoID", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.nanoidRegex;
  });

//////////////////////////////   ZodCUID   //////////////////////////////

export interface $ZodCUIDDef extends $ZodStringFormatDef {
  format: "cuid";
}
export interface $ZodCUID extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodCUIDDef;
}

export const $ZodCUID: core.$constructor<$ZodCUID> =
  /*@__PURE__*/ core.$constructor("$ZodCUID", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.cuidRegex;
  });

//////////////////////////////   ZodCUID2   //////////////////////////////

export interface $ZodCUID2Def extends $ZodStringFormatDef {
  format: "cuid2";
}
export interface $ZodCUID2 extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodCUID2Def;
}

export const $ZodCUID2: core.$constructor<$ZodCUID2> =
  /*@__PURE__*/ core.$constructor("$ZodCUID2", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.cuid2Regex;
  });

//////////////////////////////   ZodULID   //////////////////////////////

export interface $ZodULIDDef extends $ZodStringFormatDef {
  format: "ulid";
}
export interface $ZodULID extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodULIDDef;
}

export const $ZodULID: core.$constructor<$ZodULID> =
  /*@__PURE__*/ core.$constructor("$ZodULID", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.ulidRegex;
  });

//////////////////////////////   ZodXID   //////////////////////////////

export interface $ZodXIDDef extends $ZodStringFormatDef {
  format: "xid";
}
export interface $ZodXID extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodXIDDef;
}

export const $ZodXID: core.$constructor<$ZodXID> =
  /*@__PURE__*/ core.$constructor("$ZodXID", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.xidRegex;
  });

//////////////////////////////   ZodKSUID   //////////////////////////////

export interface $ZodKSUIDDef extends $ZodStringFormatDef {
  format: "ksuid";
}
export interface $ZodKSUID extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodKSUIDDef;
}

export const $ZodKSUID: core.$constructor<$ZodKSUID> =
  /*@__PURE__*/ core.$constructor("$ZodKSUID", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.ksuidRegex;
  });

//////////////////////////////   ZodISODateTime   //////////////////////////////

export interface $ZodISODateTimeDef extends $ZodStringFormatDef {
  format: "iso_datetime";
  precision: number | null;
  offset: boolean;
  local: boolean;
}
export interface $ZodISODateTime extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodISODateTimeDef;
}

export const $ZodISODateTime: core.$constructor<$ZodISODateTime> =
  /*@__PURE__*/ core.$constructor(
    "$ZodISODateTime",
    function (inst, def): void {
      $ZodStringFormat.init(inst, def);
      def.pattern = regexes.datetimeRegex(inst._def);
    }
  );

//////////////////////////////   ZodISODate   //////////////////////////////

export interface $ZodISODateDef extends $ZodStringFormatDef {
  format: "iso_date";
}
export interface $ZodISODate extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodISODateDef;
}

export const $ZodISODate: core.$constructor<$ZodISODate> =
  /*@__PURE__*/ core.$constructor("$ZodISODate", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.dateRegex;
  });

//////////////////////////////   ZodISOTime   //////////////////////////////

export interface $ZodISOTimeDef extends $ZodStringFormatDef {
  format: "iso_time";
  offset?: boolean;
  local?: boolean;
  precision?: number | null;
}
export interface $ZodISOTime extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodISOTimeDef;
}

export const $ZodISOTime: core.$constructor<$ZodISOTime> =
  /*@__PURE__*/ core.$constructor("$ZodISOTime", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.timeRegex(inst._def);
  });

//////////////////////////////   ZodDuration   //////////////////////////////

export interface $ZodDurationDef extends $ZodStringFormatDef {
  format: "duration";
}
export interface $ZodDuration extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodDurationDef;
}

export const $ZodDuration: core.$constructor<$ZodDuration> =
  /*@__PURE__*/ core.$constructor("$ZodDuration", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.durationRegex;
  });

//////////////////////////////   ZodIP   //////////////////////////////

export interface $ZodIPDef extends $ZodStringFormatDef {
  format: "ip";
}
export interface $ZodIP extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodIPDef;
}

export const $ZodIP: core.$constructor<$ZodIP> =
  /*@__PURE__*/ core.$constructor("$ZodIP", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.ipRegex;
  });

//////////////////////////////   ZodIPv4   //////////////////////////////

export interface $ZodIPv4Def extends $ZodStringFormatDef {
  format: "ipv4";
}
export interface $ZodIPv4 extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodIPv4Def;
}

export const $ZodIPv4: core.$constructor<$ZodIPv4> =
  /*@__PURE__*/ core.$constructor("$ZodIPv4", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.ipv4Regex;
  });

//////////////////////////////   ZodIPv6   //////////////////////////////

export interface $ZodIPv6Def extends $ZodStringFormatDef {
  format: "ipv6";
}
export interface $ZodIPv6 extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodIPv6Def;
}

export const $ZodIPv6: core.$constructor<$ZodIPv6> =
  /*@__PURE__*/ core.$constructor("$ZodIPv6", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.ipv6Regex;
  });

//////////////////////////////   ZodBase64   //////////////////////////////

export interface $ZodBase64Def extends $ZodStringFormatDef {
  format: "base64";
}
export interface $ZodBase64 extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodBase64Def;
}

export const $ZodBase64: core.$constructor<$ZodBase64> =
  /*@__PURE__*/ core.$constructor("$ZodBase64", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.base64Regex;
  });

//////////////////////////////   ZodJSONString   //////////////////////////////

export interface $ZodJSONStringDef extends $ZodStringFormatDef {
  format: "json_string";
}
export interface $ZodJSONString extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodJSONStringDef;
}

export const $ZodJSONString: core.$constructor<$ZodJSONString> =
  /*@__PURE__*/ core.$constructor("$ZodJSONString", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    inst.run2 = (ctx) => {
      try {
        JSON.parse(ctx.value);
        return;
      } catch {
        ctx.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "json_string",
          input: ctx.value,
          def,
        });
      }
    };
  });

//////////////////////////////   ZodE164   //////////////////////////////

export interface $ZodE164Def extends $ZodStringFormatDef {
  format: "e164";
}
export interface $ZodE164 extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodE164Def;
}

export const $ZodE164: core.$constructor<$ZodE164> =
  /*@__PURE__*/ core.$constructor("$ZodE164", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    def.pattern = regexes.e164Regex;
  });

//////////////////////////////   ZodJWT   //////////////////////////////

export function isValidJWT(
  token: string,
  algorithm: types.JWTAlgorithm | null = null
): boolean {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3) return false;
    const [header] = tokensParts;
    const parsedHeader = JSON.parse(atob(header));
    if (!("typ" in parsedHeader) || parsedHeader.typ !== "JWT") return false;
    if (
      algorithm &&
      (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)
    )
      return false;
    return true;
  } catch {
    return false;
  }
}

export interface $ZodJWTDef extends $ZodStringFormatDef {
  format: "jwt";
  algorithm?: types.JWTAlgorithm | undefined;
}
export interface $ZodJWT extends $ZodStringFormat {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodJWTDef;
}

export const $ZodJWT: core.$constructor<$ZodJWT> =
  /*@__PURE__*/ core.$constructor("$ZodJWT", function (inst, def): void {
    $ZodStringFormat.init(inst, def);
    inst.run2 = (ctx) => {
      if (isValidJWT(ctx.value, def.algorithm)) return;

      ctx.issues.push({
        origin: "string",
        code: "invalid_format",
        format: "jwt",
        input: ctx.value,
        def,
      });
    };
  });

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      ZodNumber      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////
export const NUMBER_FORMAT_RANGES: Record<
  $ZodNumberFormats,
  [number | bigint, number | bigint]
> = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
  uint64: [0, BigInt("18446744073709551615")],
  float32: [-3.4028234663852886e38, 3.4028234663852886e38],
  float64: [-1.7976931348623157e308, 1.7976931348623157e308],
};

export interface $ZodNumberDef extends core.$ZodTypeDef {
  type: "number";
  format?: $ZodNumberFormats | undefined;
  coerce?: boolean;
  checks: core.$ZodCheck<number>[];
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export type $ZodIntegerFormats =
  | "int32"
  | "uint32"
  | "int64"
  | "uint64"
  | "safeint";
export type $ZodFloatFormats = "float32" | "float64";
export type $ZodNumberFormats = $ZodIntegerFormats | $ZodFloatFormats;

export interface $ZodNumber<T = unknown> extends core.$ZodType<number, T> {
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodNumberDef;
  computed?: {
    minimum?: number | bigint;
    maximum?: number | bigint;
    multiple_of?: number;
  };
}

// only use for z.numeber()

export const $ZodNumberFast: core.$constructor<$ZodNumber> =
  /*@__PURE__*/ core.$constructor("$ZodNumber", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._pattern = regexes.numberRegex;
    inst._typecheck = (input, _ctx) => {
      if (typeof input === "number" && !Number.isNaN(input))
        return core.$succeed(input);
      return core.$fail(
        [
          {
            origin: "number",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

export const $ZodNumber: core.$constructor<$ZodNumber> =
  /*@__PURE__*/ core.$constructor("$ZodNumber", (inst, def) => {
    $ZodNumberFast.init(inst, def); // no format checks
    def.format = def.format || "float64";
    // if format is integer:
    if (def.format.includes("int")) {
      inst._pattern = regexes.intRegex;
    }

    const fastcheck = inst._typecheck; // super._typecheck
    const isInt = def.format?.includes("int");
    const origin = isInt ? "int" : "number";
    const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format!];

    inst._typecheck = (input, _ctx) => {
      const result = fastcheck(input, _ctx) as core.$ZodResult<number>;

      if (core.$failed(result)) return result;

      if (isInt && !Number.isInteger(result.value)) {
        result.issues = result.issues || [];
        result.issues.push({
          origin,
          format: def.format,
          code: "invalid_type",
          input,
          def,
        });
        result.aborted = true;
        return result;
      }

      if (result.value! < minimum) {
        result.issues = result.issues || [];
        result.issues.push({
          origin: "number",
          input: input as number,
          code: "too_small",
          minimum: minimum as number,
          inclusive: true,
          def,
        });
      }

      if (result.value! > maximum) {
        result.issues = result.issues || [];
        result.issues.push({
          origin: "number",
          input: input as number,
          code: "too_big",
          maximum,
          def,
        } as any);
      }
      return result;
    };
  });

///////////////////////////////////////////
///////////////////////////////////////////
//////////                      ///////////
//////////      $ZodBoolean      //////////
//////////                      ///////////
///////////////////////////////////////////
///////////////////////////////////////////

export interface $ZodBooleanDef extends core.$ZodTypeDef {
  type: "boolean";
  coerce?: boolean;
  checks?: core.$ZodCheck<boolean>[];
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodBoolean<T = unknown> extends core.$ZodType<boolean, T> {
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodBooleanDef;
}

export const $ZodBoolean: core.$constructor<$ZodBoolean> =
  /*@__PURE__*/ core.$constructor("$ZodBoolean", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._pattern = regexes.booleanRegex;
    inst._typecheck = (input, _ctx) => {
      if (typeof input === "boolean") return core.$succeed(input);
      return core.$fail(
        [
          {
            origin: "boolean",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////      $ZodBigInt      //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////
export interface $ZodBigIntDef extends core.$ZodTypeDef {
  type: "bigint";
  coerce?: boolean;
  checks: core.$ZodCheck<bigint>[];
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType>;
}

export interface $ZodBigInt<T = unknown> extends core.$ZodType<bigint, T> {
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodBigIntDef;
}

export const $ZodBigInt: core.$constructor<$ZodBigInt> =
  /*@__PURE__*/ core.$constructor("$ZodBigInt", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._pattern = regexes.bigintRegex;
    inst._typecheck = (input, _ctx) => {
      if (typeof input === "bigint") return core.$succeed(input);
      return core.$fail(
        [
          {
            origin: "bigint",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

// ////////////////////////////////////////////
// ////////////////////////////////////////////
// //////////                        //////////
// //////////       $ZodSymbol       //////////
// //////////                        //////////
// ////////////////////////////////////////////
// ////////////////////////////////////////////
export interface $ZodSymbolDef extends core.$ZodTypeDef {
  type: "symbol";
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodSymbol<T = unknown> extends core.$ZodType<symbol, T> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodSymbolDef;
}

export const $ZodSymbol: core.$constructor<$ZodSymbol> =
  /*@__PURE__*/ core.$constructor("$ZodSymbol", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      if (typeof input === "symbol") return core.$succeed(input);
      return core.$fail(
        [
          {
            origin: "symbol",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////      $ZodUndefined     //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
export interface $ZodUndefinedDef extends core.$ZodTypeDef {
  type: "undefined";
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodUndefined extends core.$ZodType<undefined, undefined> {
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodUndefinedDef;
}

export const $ZodUndefined: core.$constructor<$ZodUndefined> =
  /*@__PURE__*/ core.$constructor("$ZodUndefined", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._pattern = regexes.undefinedRegex;
    inst._typecheck = (input, _ctx) => {
      if (typeof input === "undefined") return core.$succeed(undefined);
      return core.$fail(
        [
          {
            origin: "undefined",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

///////////////////////////////////////
///////////////////////////////////////
//////////                   //////////
//////////      $ZodNull      /////////
//////////                   //////////
///////////////////////////////////////
///////////////////////////////////////

export interface $ZodNullDef extends core.$ZodTypeDef {
  type: "null";
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodNull extends core.$ZodType<null, null> {
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodNullDef;
}

export const $ZodNull: core.$constructor<$ZodNull> =
  /*@__PURE__*/ core.$constructor("$ZodNull", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._pattern = regexes.nullRegex;
    inst._typecheck = (input, _ctx) => {
      if (input === null) return core.$succeed(null);
      return core.$fail(
        [
          {
            origin: "null",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

//////////////////////////////////////
//////////////////////////////////////
//////////                  //////////
//////////      $ZodAny     //////////
//////////                  //////////
//////////////////////////////////////
//////////////////////////////////////

export interface $ZodAnyDef extends core.$ZodTypeDef {
  type: "any";
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodAny extends core.$ZodType<any, any> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodAnyDef;
}

export const $ZodAny: core.$constructor<$ZodAny> =
  /*@__PURE__*/ core.$constructor("$ZodAny", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input) => core.$succeed(input);
  });

/////////////////////////////////////////

export interface $ZodUnknownDef extends core.$ZodTypeDef {
  type: "unknown";
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodUnknown extends core.$ZodType<unknown, unknown> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodUnknownDef;
}

export const $ZodUnknown: core.$constructor<$ZodUnknown> =
  /*@__PURE__*/ core.$constructor("$ZodUnknown", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input) => core.$succeed(input);
  });

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      $ZodNever      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////

export interface $ZodNeverDef extends core.$ZodTypeDef {
  type: "never";
  error?: err.$ZodErrorMap<err.$ZodIssue> | undefined;
}

export interface $ZodNever extends core.$ZodType<never, never> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodNeverDef;
}

export const $ZodNever: core.$constructor<$ZodNever> =
  /*@__PURE__*/ core.$constructor("$ZodNever", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      return core.$fail(
        [
          {
            origin: "never",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      $ZodVoid      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////

export interface $ZodVoidDef extends core.$ZodTypeDef {
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodVoid extends core.$ZodType<void, void> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodVoidDef;
}

export const $ZodVoid: core.$constructor<$ZodVoid> =
  /*@__PURE__*/ core.$constructor("$ZodVoid", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      if (typeof input === "undefined") return core.$succeed(undefined);
      return core.$fail(
        [
          {
            origin: "void",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

///////////////////////////////////////
///////////////////////////////////////
//////////                     ////////
//////////      $ZodDate        ////////
//////////                     ////////
///////////////////////////////////////
///////////////////////////////////////
export interface $ZodDateDef extends core.$ZodTypeDef {
  type: "date";
  coerce?: boolean;
  error?:
    | err.$ZodErrorMap<err.$ZodIssueInvalidType | err.$ZodIssueInvalidDate>
    | undefined;
}

export interface $ZodDate<T = unknown> extends core.$ZodType<Date, T> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodDateDef;
}

export const $ZodDate: core.$constructor<$ZodDate> =
  /*@__PURE__*/ core.$constructor("$ZodDate", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      if (input instanceof Date && !Number.isNaN(input.getTime()))
        return core.$succeed(input);
      if (def.coerce) {
        try {
          input = new Date(input as string | number | Date);
        } catch (_err: any) {}
      }

      if (!(input instanceof Date)) {
        return core.$fail(
          [
            {
              origin: "date",
              code: "invalid_type",
              input,
              def,
            },
          ],
          true
        );
      }

      if (Number.isNaN(input.getTime())) {
        return core.$fail([
          { origin: "date", code: "invalid_date", input, def },
        ]);
      }

      return core.$succeed(new Date(input.getTime()));
    };
  });

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      $ZodArray      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////

export interface $ZodArrayDef extends core.$ZodTypeDef {
  type: "array";
  element: core.$ZodType;
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodArray<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<T["_output"][], T["_input"][]> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodArrayDef;
}

function handleArrayResult(
  result: core.$ZodResult,
  final: core.$ZodResultFull<any[]>,
  index: number
) {
  if (core.$failed(result)) {
    final.issues.push(...core.$prefixIssues(index, result.issues));
  } else {
    final.value[index] = result.value;
  }
}

export const $ZodArray: core.$constructor<$ZodArray> =
  /*@__PURE__*/ core.$constructor("$ZodArray", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      if (!Array.isArray(input)) {
        return core.$fail(
          [
            {
              origin: "array",
              code: "invalid_type",

              input,
              def,
            },
          ],
          true
        );
      }

      // let async = false;
      const proms: Promise<any>[] = [];
      const final = core.$succeed(Array.from({ length: input.length }));

      for (const index in input) {
        const item = input[index];

        const result = def.element._parse(item, _ctx);
        if (result instanceof Promise) {
          proms.push(
            result.then((result) =>
              handleArrayResult(result, final, index as any)
            )
          );
        } else {
          handleArrayResult(result, final, index as any);
        }
      }

      // const parseResults = input.map((item, index) => {
      //   //  const item = input
      //   const result = def.element._parse(item, _ctx);
      //   // parseResults[i] = result;
      //   if (result instanceof Promise) {
      //     // async = true;
      //     proms.push(
      //       result.then((res) => handleArrayResult(res, final, index))
      //     );
      //     // break;
      //   } else {
      //   }
      //   return result;
      //   // if (core.$failed(result)) {
      //   //   issues.push(...core.$prefixIssues(i, result.issues!)); // = core.mergeIn(result);
      //   // fail = fail ? core.mergeFails(fail, result) : result;
      //   // }
      // });
      // for (const i of input) {
      //   const item = input
      //   const result = def.element._parse(item, _ctx);
      //   parseResults[i] = result;
      //   if (result instanceof Promise) {
      //     async = true;
      //     break;
      //   }
      //   if (core.$failed(result)) {
      //     issues.push(...core.$prefixIssues(i, result.issues!)); // = core.mergeIn(result);
      //     // fail = fail ? core.mergeFails(fail, result) : result;
      //   }
      // }

      if (proms.length) {
        return Promise.all(proms).then(() => final);
        // handleArrayResults(
        //   parseResults as core.$ZodResult<unknown>[],
        //   final
        // );
      }

      return final; //handleArrayResultsAsync(parseResults, final);
    };
  });

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////      $ZodObject      //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////
export type $ZodRawShape = {
  [k: PropertyKey]: core.$ZodType;
};
// type asdf = keyof $ZodRawShape;
// export type AddQuestionMarks<T extends $ZodRawShape> = {
//   [k in keyof T as T[k]["_qout"] extends true ? k : never]?: T[k]["_output"];
// } & {
//   [k in keyof T as boolean extends T[k]["_qout"] ? k : never]: T[k]["_output"];
// };

declare const $optional: unique symbol;
export type $optional = typeof $optional;

export type NonNeverKeys<T extends object> = T[keyof T];
// export type ObjectOutputOptionalKeys<T extends $ZodRawShape> = NonNeverKeys<{
//   [k in keyof T]: T[k]["_output"] extends $optional ? k : never;
// }>;
// export type ObjectOutputRequiredKeys<T extends $ZodRawShape> = NonNeverKeys<{
//   [k in keyof T]: T[k]["_output"] extends $optional ? never : k;
// }>;
// export type $InferObjectOutput<T extends $ZodRawShape> = {
//   [K in ObjectOutputRequiredKeys<T>]: T[K]["_output"];
// } & {
//   [K in ObjectOutputOptionalKeys<T>]?: T[K]["_output"];
// };

// export type ObjectInputOptionalKeys<T extends $ZodRawShape> = NonNeverKeys<{
//   [k in keyof T]: T[k]["_input"] extends $optional ? k : never;
// }>;
// export type ObjectInputRequiredKeys<T extends $ZodRawShape> = NonNeverKeys<{
//   [k in keyof T]: T[k]["_input"] extends $optional ? never : k;
// }>;
// export type $InferObjectInput<T extends $ZodRawShape> = {
//   [K in ObjectInputRequiredKeys<T>]: T[K]["_input"];
// } & {
//   [K in ObjectInputOptionalKeys<T>]?: T[K]["_input"];
// };

export type ObjectOutputOptionalKeys<T extends $ZodRawShape> = {
  [k in keyof T]: T[k]["_qout"] extends "true" ? k : never;
}[keyof T];
export type ObjectOutputRequiredKeys<T extends $ZodRawShape> = {
  [k in keyof T]: undefined extends T[k]["_qout"] ? k : never;
}[keyof T];
export type $InferObjectOutput<T extends $ZodRawShape> = {
  [K in ObjectOutputRequiredKeys<T>]: T[K]["_output"];
} & {
  [K in ObjectOutputOptionalKeys<T>]?: T[K]["_output"];
};

export type ObjectInputOptionalKeys<T extends $ZodRawShape> = {
  [k in keyof T]: T[k]["_qin"] extends "true" ? k : never;
}[keyof T];
export type ObjectInputRequiredKeys<T extends $ZodRawShape> = {
  [k in keyof T]: undefined extends T[k]["_qin"] ? k : never;
}[keyof T];
export type $InferObjectInput<T extends $ZodRawShape> = {
  [K in ObjectInputRequiredKeys<T>]: T[K]["_input"];
} & {
  [K in ObjectInputOptionalKeys<T>]?: T[K]["_input"];
};

export interface $ZodObjectDef extends core.$ZodTypeDef {
  type: "object";
  shape: $ZodRawShape;
  catchall?: core.$ZodType;
  error?:
    | err.$ZodErrorMap<err.$ZodIssueInvalidType | err.$ZodIssueUnrecognizedKeys>
    | undefined;
}

export interface $ZodObject<Shape extends $ZodRawShape = $ZodRawShape>
  extends core.$ZodType<$InferObjectOutput<Shape>, $InferObjectInput<Shape>> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _shape: Shape;
  _def: $ZodObjectDef;
  _disc: core.$DiscriminatorMap;
}

// function handleObjectResults(
//   results: Record<PropertyKey, core.$ZodResult>,
//   final: core.$ZodResultFull<Record<PropertyKey, unknown>>
// ): core.$ZodResult<Record<string, unknown>> {
//   for (const key in results) {
//     const val = results[key];
//     final.value[key] = val.value;
//     if (core.$failed(results[key])) {
//       final.issues.push(...core.$prefixIssues(key, results[key].issues));
//     }
//   }
//   return final;
// }

// async function handleObjectResultsAsync(
//   results: Record<PropertyKey, Promise<core.$ZodResult>>,
//   result: core.$ZodResult<Record<string, unknown>>
// ): Promise<core.$ZodResult<Record<string, unknown>>> {
//   const resolvedResults = await util.promiseAllObject(results);
//   return handleObjectResults(resolvedResults, result);
// }

function handleObjectResult(
  result: core.$ZodResult,
  final: core.$ZodResultFull,
  key: PropertyKey
) {
  if (core.$failed(result)) {
    final.issues.push(...core.$prefixIssues(key, result.issues));
  } else {
    (final.value as any)[key] = result.value;
  }
}

export const $ZodObject: core.$constructor<$ZodObject> =
  /*@__PURE__*/ core.$constructor("$ZodObject", (inst, def) => {
    core.$ZodType.init(inst, def);

    inst._shape = def.shape;

    const discMap: core.$DiscriminatorMap = new Map();
    for (const key in def.shape) {
      const field = def.shape[key];
      if (field._values || field._disc) {
        const o: core.$DiscriminatorMapElement = {
          values: new Set(field._values ?? []),
          maps: field._disc ? [field._disc] : [],
        };
        discMap.set(key, o)!;
      }
    }
    inst._disc = discMap;
    const _shapeKeys: Set<string | symbol> = new Set(
      Reflect.ownKeys(def.shape)
    );
    const _optionalKeys = new Set(
      Reflect.ownKeys(def.shape).filter((k) => {
        return def.shape[k]._qout === "true";
      })
    );
    // const _shapeEntries = Object.entries(def.shape);
    const _allKeys = Reflect.ownKeys(def.shape);

    inst._typecheck = (input: unknown, ctx) => {
      if (!util.isPlainObject(input)) {
        return core.$fail(
          [
            {
              origin: "object",
              code: "invalid_type",
              input,
              def,
            },
          ],
          true
        );
      }

      const final = core.$result<Record<PropertyKey, unknown>>({}, []);
      const proms: Promise<any>[] = [];
      let unrecognizedKeys!: Set<string>;

      // iterate over shape keys
      for (const key of _allKeys) {
        const value = def.shape[key];
        // do not add omitted optional keys
        if (_optionalKeys.has(key)) {
          if (!(key in input)) continue;
        }

        const result = value._parse((input as any)[key], ctx);

        if (result instanceof Promise) {
          proms.push(
            result.then((result) => handleObjectResult(result, final, key))
          );
        } else {
          handleObjectResult(result, final, key);
        }
      }

      // iterate over input keys
      for (const key of Reflect.ownKeys(input)) {
        if (_shapeKeys.has(key)) continue;
        if (def.catchall) {
          const result = def.catchall._parse((input as any)[key]);
          if (result instanceof Promise) {
            proms.push(
              result.then((result) => {
                handleObjectResult(result, final, key);
              })
            );
            //async = true;
          } else {
            handleObjectResult(result, final, key);
          }
          // objectResults[key] = def.catchall._parse((input as any)[key]);
          // if (objectResults[key] instanceof Promise) async = true;
        }
      }

      if (unrecognizedKeys) {
        final.issues = final.issues ?? [];
        final.issues.push({
          origin: "object",
          code: "unrecognized_keys",
          keys: [...unrecognizedKeys],
          input: input,
          def,
        });
      }
      if (!proms.length) return final; //handleObjectResults(objectResults, final) as object;
      return Promise.all(proms).then(() => final); //handleObjectResultsAsync(objectResults, final) as any;
    };
  });

/////////////////////////////////////////
/////////////////////////////////////////
//////////                    ///////////
//////////      $ZodUnion      //////////
//////////                    ///////////
/////////////////////////////////////////
/////////////////////////////////////////
export interface $ZodUnionDef extends core.$ZodTypeDef {
  options: core.$ZodType[];
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidUnion> | undefined;
}

export interface $ZodUnion<T extends core.$ZodType[] = core.$ZodType[]>
  extends core.$ZodType<T[number]["_output"], T[number]["_input"]> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodUnionDef;
}

function handleUnionResults(
  results: core.$ZodResult[],
  input: unknown,
  def: $ZodUnionDef,
  ctx?: core.$ParseContext
) {
  for (const result of results) {
    if (core.$succeeded(result)) return result;
  }

  return core.$fail([
    {
      origin: "union",
      code: "invalid_union",
      input,
      def,
      errors: results.map(
        (result) => core.$finalize(result.issues!, ctx).issues
      ),
    },
  ]);
}

export const $ZodUnion: core.$constructor<$ZodUnion> =
  /*@__PURE__*/ core.$constructor("$ZodUnion", (inst, def) => {
    core.$ZodType.init(inst, def);

    inst._typecheck = (input, ctx) => {
      let async = false;
      const results: core.$ZodResult[] = [];
      for (const option of def.options) {
        const result = option._parse(input, ctx);
        results.push(result as core.$ZodResult);
        if (result instanceof Promise) async = true;
      }

      if (!async) return handleUnionResults(results, input, def, ctx);
      return Promise.all(results).then((results) => {
        return handleUnionResults(results, input, def, ctx);
      });
    };
  });

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////                                  //////////
//////////      $ZodDiscriminatedUnion      //////////
//////////                                  //////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export interface $ZodDiscriminatedUnionDef extends $ZodUnionDef {
  // _disc: Map<core.$ZodType, $DiscriminatorMap>;
}

export interface $ZodDiscriminatedUnion<
  Options extends core.$ZodType[] = core.$ZodType[],
> extends $ZodUnion<Options> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodDiscriminatedUnionDef;
  _disc: core.$DiscriminatorMap;
}
// function get(input: any, path: PropertyKey[]): any {
//   return path.reduce((acc, key) => acc?.[key], input);
// }
function matchDiscriminators(
  input: any,
  discs: core.$DiscriminatorMap
): boolean {
  for (const [key, value] of discs) {
    const data = input?.[key];
    if (value.values.has(data)) return true;
    if (value.maps.length > 0) {
      for (const m of value.maps) {
        if (matchDiscriminators(data, m)) return true;
      }
    }
  }
  return false;
}

export const $ZodDiscriminatedUnion: core.$constructor<$ZodDiscriminatedUnion> =
  /*@__PURE__*/
  core.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
    $ZodUnion.init(inst, def);
    const _super = inst._typecheck;
    const _disc: core.$DiscriminatorMap = new Map();
    for (const el of def.options) {
      if (!el._disc)
        throw new Error(`Invalid discriminated union element: ${el._def.type}`);
      for (const [key, o] of el._disc) {
        if (!_disc.has(key))
          _disc.set(key, {
            values: new Set(),
            maps: [],
          });
        const _o = _disc.get(key)!;
        for (const v of o.values) _o.values.add(v);
        for (const m of o.maps) _o.maps.push(m);
      }
    }
    inst._disc = _disc;

    const discMap: Map<core.$ZodType, core.$DiscriminatorMap> = new Map();
    for (const option of def.options) {
      const disc = option._disc;
      if (!disc) {
        throw new Error(
          `Invalid disciminated union element: ${option._def.type}`
        );
      }
      discMap.set(option, disc);
    }

    inst._typecheck = (input, _ctx) => {
      const filteredOptions: core.$ZodType[] = [];
      for (const option of def.options) {
        if (discMap.has(option)) {
          if (matchDiscriminators(input, discMap.get(option)!)) {
            filteredOptions.push(option);
          }
        } else {
          filteredOptions.push(option);
        }
      }

      if (filteredOptions.length === 1)
        return filteredOptions[0]._parse(input, _ctx) as any;

      return _super(input, _ctx);
    };
  });

////////////////////////////////////////////////
////////////////////////////////////////////////
//////////                            //////////
//////////      $ZodIntersection      //////////
//////////                            //////////
////////////////////////////////////////////////
////////////////////////////////////////////////
function mergeValues(
  a: any,
  b: any
):
  | { valid: true; data: any }
  | { valid: false; mergeErrorPath: (string | number)[] } {
  // const aType = parse.t(a);
  // const bType = parse.t(b);

  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (util.isPlainObject(a) && util.isPlainObject(b)) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util
      .objectKeys(a)
      .filter((key) => bKeys.indexOf(key) !== -1);

    const newObj: any = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
        };
      }
      newObj[key] = sharedValue.data;
    }

    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }

    const newArray: unknown[] = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);

      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
        };
      }

      newArray.push(sharedValue.data);
    }

    return { valid: true, data: newArray };
  }

  return { valid: false, mergeErrorPath: [] };
}

export interface $ZodIntersectionDef extends core.$ZodTypeDef {
  type: "intersection";
  left: core.$ZodType;
  right: core.$ZodType;
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodIntersection<
  A extends core.$ZodType = core.$ZodType,
  B extends core.$ZodType = core.$ZodType,
> extends core.$ZodType<
    A["_output"] & B["_output"],
    A["_input"] & B["_input"]
  > {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodIntersectionDef;
}

function handleIntersectionResults(
  results: [core.$ZodResult, core.$ZodResult]
): core.$ZodResult {
  const [parsedLeft, parsedRight] = results;
  const result = core.$fail(
    [...(parsedLeft.issues ?? []), ...(parsedRight.issues ?? [])],
    true
  );

  if (core.$failed(result)) return result;
  const merged = mergeValues(parsedLeft, parsedRight);

  if (!merged.valid) {
    throw new Error(
      // biome-ignore lint:
      `Unmergable intersection types at ` +
        `${merged.mergeErrorPath.join(".")}: ${typeof parsedLeft} and ${typeof parsedRight}`
    );
  }

  result.value = merged.data;
  return merged.data;
}

export const $ZodIntersection: core.$constructor<$ZodIntersection> =
  /*@__PURE__*/ core.$constructor("$ZodIntersection", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      const resultLeft = def.left._parse(input, _ctx);
      const resultRight = def.right._parse(input, _ctx);
      const async =
        resultLeft instanceof Promise || resultRight instanceof Promise;
      return async
        ? Promise.all([resultLeft, resultRight]).then(handleIntersectionResults)
        : handleIntersectionResults([resultLeft, resultRight]);
    };
  });

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      $ZodTuple      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////

export interface $ZodTupleDef extends core.$ZodTypeDef {
  items: core.$ZodType[];
  rest: core.$ZodType | null;
  error?:
    | err.$ZodErrorMap<
        | err.$ZodIssueInvalidType
        | err.$ZodIssueTooBig<"array", Array<unknown>>
        | err.$ZodIssueTooSmall<"array", Array<unknown>>
      >
    | undefined;
}

type ZodTupleItems = core.$ZodType[];
export type $InferTupleInputType<
  T extends ZodTupleItems,
  Rest extends core.$ZodType | null,
> = [
  ...TupleInputTypeWithOptionals<T>,
  ...(Rest extends core.$ZodType ? Rest["_input"][] : []),
];
type TupleInputTypeNoOptionals<T extends ZodTupleItems> = {
  [k in keyof T]: T[k]["_input"];
};
type TupleInputTypeWithOptionals<T extends ZodTupleItems> = T extends [
  ...infer Prefix extends core.$ZodType[],
  infer Tail extends core.$ZodType,
]
  ? Tail["_qin"] extends "true"
    ? [...TupleInputTypeWithOptionals<Prefix>, Tail["_input"]?]
    : TupleInputTypeNoOptionals<T>
  : [];

export type $InferTupleOutputType<
  T extends ZodTupleItems,
  Rest extends core.$ZodType | null,
> = [
  ...TupleOutputTypeWithOptionals<T>,
  ...(Rest extends core.$ZodType ? Rest["_output"][] : []),
];
type TupleOutputTypeNoOptionals<T extends ZodTupleItems> = {
  [k in keyof T]: T[k]["_output"];
};
type TupleOutputTypeWithOptionals<T extends ZodTupleItems> = T extends [
  ...infer Prefix extends core.$ZodType[],
  infer Tail extends core.$ZodType,
]
  ? Tail["_qout"] extends "true"
    ? [...TupleOutputTypeWithOptionals<Prefix>, Tail["_output"]?]
    : TupleOutputTypeNoOptionals<T>
  : [];

// function handleTupleResults<T extends unknown[]>(
//   results: T,
//   ctx: core.$ParseContext | undefined
// ): core.$SyncParseResult<T> {
//   let fail!: core.$ZodFailure;
//   for (const i in results) {
//     const result = results[i];
//     if (core.failed(result)) {
//       if (!fail) fail = new core.$ZodFailure();
//       fail = core.mergeFails(fail, result, i);
//     }
//   }
//   return fail ?? results;
// }

// async function handleTupleResultsAsync<T extends Promise<unknown>[]>(
//   results: T,
//   ctx: core.$ParseContext | undefined
// ): core.$AsyncParseResult<T> {
//   const resolvedResults = await Promise.all(results);
//   return handleTupleResults(resolvedResults, ctx);
// }

function handleTupleResult(
  result: core.$ZodResult,
  final: core.$ZodResultFull<any[]>,
  index: number
) {
  if (core.$failed(result)) {
    final.issues.push(...core.$prefixIssues(index, result.issues));
    if (result.aborted) final.aborted = true;
  } else {
    final.value[index] = result.value;
  }
}

export interface $ZodTuple<
  T extends ZodTupleItems = ZodTupleItems,
  Rest extends core.$ZodType | null = core.$ZodType | null,
> extends core.$ZodType<
    $InferTupleOutputType<T, Rest>,
    $InferTupleInputType<T, Rest>
  > {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodTupleDef;
}

export const $ZodTuple: core.$constructor<$ZodTuple> =
  /*@__PURE__*/ core.$constructor("$ZodTuple", (inst, def) => {
    core.$ZodType.init(inst, def);
    const items = def.items;
    // const itemsLength = items.length;
    // const optIndex = itemsLength;
    const optStart =
      items.length -
      [...items].reverse().findIndex((item) => item._qout !== "true");

    // [string, number, string, boolean, string?, number?];
    // optStart = 3
    // first non-true index is 2
    // length is 5
    //

    inst._typecheck = (input, _ctx) => {
      if (!Array.isArray(input)) {
        return core.$fail(
          [
            {
              input,
              def,
              origin: "tuple",
              code: "invalid_type",
            },
          ],
          true
        );
      }

      // let async = false;
      const final = core.$result<any[]>(Array(input.length), []);
      const proms: Promise<any>[] = [];
      // const results: any[] = Array(input.length);

      if (!def.rest) {
        const tooBig = input.length > items.length;
        const tooSmall = input.length < optStart;
        if (tooBig || tooSmall)
          return core.$fail(
            [
              {
                input,
                def,
                origin: "array",
                ...(tooBig
                  ? { code: "too_big", maximum: items.length }
                  : { code: "too_small", minimum: items.length }),
              },
            ],
            true
          );
      }

      let i = -1;
      for (const item of items) {
        i++;
        if (i >= input.length) if (i >= optStart) continue;
        const result = item._parse(input[i], _ctx);

        if (result instanceof Promise) {
          proms.push(
            result.then((result) => handleTupleResult(result, final, i))
          );
        } else {
          handleTupleResult(result, final, i);
        }
      }

      if (def.rest) {
        const rest = input.slice(items.length);
        for (const el of rest) {
          i++;
          const result = def.rest._parse(el, _ctx);

          if (result instanceof Promise) {
            proms.push(
              result.then((result) => handleTupleResult(result, final, i))
            );
          } else {
            handleTupleResult(result, final, i);
          }
        }
      }

      if (proms.length) return Promise.all(proms).then(() => final);
      return final;
    };
  });

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////      $ZodRecord      //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

// interface $HasValues extends core.$ZodType<PropertyKey, PropertyKey> {
//   _values: core.$PrimitiveSet;
// }

// interface $HasPattern extends core.$ZodType<PropertyKey, PropertyKey> {
//   _pattern: RegExp;
// }

export interface $ZodPropertyKey
  extends core.$ZodType<PropertyKey, PropertyKey> {}

type $ZodRecordKey = core.$ZodType<
  string | number | symbol,
  string | number | symbol
>; // $HasValues | $HasPattern;
export interface $ZodRecordDef extends core.$ZodTypeDef {
  keySchema: $ZodRecordKey;
  valueSchema: core.$ZodType;
  error?:
    | err.$ZodErrorMap<
        | err.$ZodIssueInvalidType
        | err.$ZodIssueInvalidKey<"record", Record<PropertyKey, unknown>>
      >
    | undefined;
}
// export type KeySchema = $HasValues | $HasPattern;
// export type RecordType<K extends string | number | symbol, V> = [
//   string,
// ] extends [K]
//   ? Record<K, V>
//   : [number] extends [K]
//     ? Record<K, V>
//     : [symbol] extends [K]
//       ? Record<K, V>
//       : [core.BRAND<string | number | symbol>] extends [K]
//         ? Record<K, V>
//         : Partial<Record<K, V>>;

export interface $ZodRecord<
  Key extends $ZodRecordKey = $ZodRecordKey,
  Value extends core.$ZodType = core.$ZodType,
> extends core.$ZodType<
    Record<Key["_output"], Value["_output"]>,
    Record<Key["_input"], Value["_input"]>
  > {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodRecordDef;
}

// function handle

export const $ZodRecord: core.$constructor<$ZodRecord> =
  /*@__PURE__*/ core.$constructor("$ZodRecord", (inst, def) => {
    core.$ZodType.init(inst, def);

    inst._typecheck = (input: any, ctx) => {
      // const objectResults: any = {};
      // let fail!: core.$ZodFailure;
      // let async!: boolean;
      const final = core.$result<Record<PropertyKey, unknown>>({}, []);
      const proms: Promise<any>[] = [];

      if (!util.isPlainObject(input)) {
        return core.$fail(
          [
            {
              origin: "record",
              code: "invalid_type",
              input,
              def,
            },
          ],
          true
        );
      }

      if ("_values" in def.keySchema) {
        const values = def.keySchema._values;
        for (const key of values) {
          if (
            typeof key === "string" ||
            typeof key === "number" ||
            typeof key === "symbol"
          ) {
            const valueResult = def.valueSchema._parse(input[key], ctx);

            if (valueResult instanceof Promise) {
              proms.push(
                valueResult.then((val) => handleObjectResult(val, final, key))
              );
            } else handleObjectResult(valueResult, final, key);
            // objectResults[key] = valueResult;
          }
        }
        let unrecognized!: string[];
        for (const key in input) {
          if (!values.has(key)) {
            unrecognized = unrecognized ?? [];
            unrecognized.push(key);
          }
        }
        if (unrecognized && unrecognized.length > 0) {
          final.issues.push({
            origin: "record",
            code: "unrecognized_keys",
            input,
            def,
            keys: unrecognized,
          });
          final.aborted = true;
        }
      } else {
        for (const key of Reflect.ownKeys(input)) {
          const keyResult = def.keySchema._parse(key, ctx);
          if (keyResult instanceof Promise)
            throw new Error(
              "Async schemas not supported in object keys currently.\
Open an issue if you need this feature."
            );
          if (core.$failed(keyResult)) {
            // fail = fail ?? new core.$ZodFailure();
            // final.issues.push(...core.$prefixIssues(key, keyResult.issues));
            final.issues.push({
              origin: "record",
              code: "invalid_key",
              issues: core.$finalize(keyResult.issues).issues,
              input: key,
              path: [key],
              def,
            });
            // fail = core.mergeFails(fail, keyResult, key);
            continue;
          }
          const valueResult = def.valueSchema._parse(input[key], ctx);
          if (valueResult instanceof Promise) {
            proms.push(
              valueResult.then((val) => handleObjectResult(val, final, key))
            );
          } else handleObjectResult(valueResult, final, key);
          // objectResults[keyResult] = def.valueSchema._parse(input[key], ctx);
          // if (objectResults[key] instanceof Promise) async = true;
        }
      }

      if (proms.length) return Promise.all(proms).then(() => final); // handleObjectResults(objectResults, fail) as object;
      return final;
    };
  });

///////////////////////////////////////
///////////////////////////////////////
//////////                   //////////
//////////      $ZodMap      //////////
//////////                   //////////
///////////////////////////////////////
///////////////////////////////////////
export interface $ZodMapDef extends core.$ZodTypeDef {
  keyType: core.$ZodType;
  valueType: core.$ZodType;
  error?:
    | err.$ZodErrorMap<
        | err.$ZodIssueInvalidType
        | err.$ZodIssueInvalidKey<"map">
        | err.$ZodIssueInvalidElement<"map", unknown>
      >
    | undefined;
}

export interface $ZodMap<
  Key extends core.$ZodType = core.$ZodType,
  Value extends core.$ZodType = core.$ZodType,
> extends core.$ZodType<
    Map<Key["_output"], Value["_output"]>,
    Map<Key["_input"], Value["_input"]>
  > {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodMapDef;
}

export const $PropertyKeyTypes: Set<string> = new Set([
  "string",
  "number",
  "symbol",
]);

// async function handleMapResultsAsync(
//   _results: Promise<[core.$SyncParseResult, core.$SyncParseResult, unknown][]>,
//   input: Map<any, any>,
//   def: $ZodMapDef,
//   ctx?: core.$ParseContext
// ): core.$AsyncParseResult<Map<any, any>> {
//   const results = await _results;
//   return handleMapResults(results, input, def, ctx);
// }

// function handleMapResults(
//   results: [unknown, unknown, unknown][],
//   input: Map<any, any>,
//   def: $ZodMapDef,
//   ctx?: core.$ParseContext
// ): core.$SyncParseResult<Map<any, any>> {
//   let fail!: core.$ZodFailure;
//   const parsedMap = new Map();

//   for (const [keyResult, valueResult, originalKey] of results) {
//     if (core.failed(keyResult)) {
//       if (!fail) fail = new core.$ZodFailure();
//       if ($PropertyKeyTypes.has(typeof originalKey)) {

//         fail = core.mergeFails(fail, keyResult, originalKey as PropertyKey);
//       } else {

//         fail.push({
//           origin: "map",
//           code: "invalid_key",
//           input,
//           def,
//           issues: keyResult.finalize(ctx).issues,
//         });
//       }
//     }
//     if (core.failed(valueResult)) {
//       if (!fail) fail = new core.$ZodFailure();

//       if ($PropertyKeyTypes.has(typeof originalKey)) {

//         fail = core.mergeFails(fail, valueResult, originalKey as PropertyKey);
//       } else {
//         fail.push({
//           origin: "map",
//           code: "invalid_value",
//           input,
//           def,
//           key: originalKey,
//           issues: valueResult.finalize(ctx).issues,
//         });
//       }
//     } else {

//       parsedMap.set(keyResult, valueResult);
//     }
//   }
//   return fail ?? parsedMap;
// }

function handleMapResult(
  keyResult: core.$ZodResult,
  valueResult: core.$ZodResult,
  final: core.$ZodResultFull<Map<unknown, unknown>>,
  key: unknown,
  input: Map<any, any>,
  def: $ZodMapDef,
  ctx?: core.$ParseContext | undefined
): void {
  // if (core.$failed(result)) {
  //   final.issues.push(...core.$prefixIssues(key, result.issues));
  // } else {
  //   final.value.set(key, result.value);
  // }

  if (core.$failed(keyResult)) {
    // if (!fail) fail = new core.$ZodFailure();
    if ($PropertyKeyTypes.has(typeof key)) {
      final.issues.push(
        ...core.$prefixIssues(key as PropertyKey, keyResult.issues)
      );
      // fail = core.mergeFails(fail, keyResult, key as PropertyKey);
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_key",
        input,
        def,
        issues: core.$finalize(keyResult.issues, ctx).issues,
      });
    }
  }
  if (core.$failed(valueResult)) {
    // if (!fail) fail = new core.$ZodFailure();

    if ($PropertyKeyTypes.has(typeof key)) {
      final.issues.push(
        ...core.$prefixIssues(key as PropertyKey, valueResult.issues)
      );
      // fail = core.mergeFails(fail, valueResult, key as PropertyKey);
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        def,
        key: key,
        issues: core.$finalize(valueResult.issues, ctx).issues,
      });
    }
    // return final;
  } else {
    final.value.set(keyResult.value, valueResult.value);
  }
}

export const $ZodMap: core.$constructor<$ZodMap> =
  /*@__PURE__*/ core.$constructor("$ZodMap", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, ctx) => {
      if (!(input instanceof Map)) {
        return core.$fail([
          {
            origin: "map",
            code: "invalid_type",
            input,
            def,
          },
        ]);
      }

      // let async = false;
      // const mapResults: [unknown, unknown, unknown][] = [];
      const proms: Promise<any>[] = [];
      const final = core.$result<Map<any, any>>(new Map(), []);

      for (const [key, value] of input) {
        const keyResult = def.keyType._parse(key, ctx);
        const valueResult = def.valueType._parse(value, ctx);
        if (keyResult instanceof Promise || valueResult instanceof Promise) {
          proms.push(
            Promise.all([keyResult, valueResult]).then(
              ([keyResult, valueResult]) => {
                handleMapResult(
                  keyResult,
                  valueResult,
                  final,
                  key,
                  input,
                  def,
                  ctx
                );
              }
            )
          );
          // mapResults.push(Promise.all([keyResult, valueResult, key]) as any);
          // async = true;
        } else {
          //  mapResults.push([keyResult, valueResult, key]);
          handleMapResult(keyResult, valueResult, final, key, input, def, ctx);
        }
      }

      // if (async) return Promise.all(mapResults).then((mapResults) => handleMapResults(mapResults, input, _ctx));
      if (proms.length) return Promise.all(proms).then(() => final);
      return final;
    };
  });

///////////////////////////////////////
///////////////////////////////////////
//////////                   //////////
//////////      $ZodSet      //////////
//////////                   //////////
///////////////////////////////////////
///////////////////////////////////////
export interface $ZodSetDef extends core.$ZodTypeDef {
  type: "set";
  valueType: core.$ZodType;
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodSet<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<Set<T["_output"]>, Set<T["_input"]>> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodSetDef;
}

// function handleSetResults(
//   setResults: core.$SyncParseResult<any>[],
//   ctx: core.$ParseContext | undefined
// ) {
//   const parsedSet = new Set();
//   let fail!: core.$ZodFailure;
//   for (const result of setResults) {
//     if (core.failed(result)) {
//       if (!fail) fail = new core.$ZodFailure();
//       fail = core.mergeFails(fail, result);
//     } else {
//       parsedSet.add(result);
//     }
//   }
//   return fail ?? parsedSet;
// }

// async function handleSetResultsAsync(
//   _results: Promise<core.$SyncParseResult<any>[]>,
//   ctx: core.$ParseContext | undefined
// ): core.$AsyncParseResult<Set<any>> {
//   return handleSetResults(await _results, ctx);
// }

function handleSetResult(
  result: core.$ZodResult<any>,
  final: core.$ZodResultFull<Set<any>>
) {
  if (core.$failed(result)) {
    final.issues.push(...result.issues);
  } else {
    final.value.add(result.value);
  }
}

export const $ZodSet: core.$constructor<$ZodSet> =
  /*@__PURE__*/ core.$constructor("$ZodSet", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      if (!(input instanceof Set)) {
        return core.$fail(
          [
            {
              input,
              def,
              origin: "set",
              code: "invalid_type",
            },
          ],
          true
        );
      }

      // const setResults: any[] = Array(input.size);
      // let async!: boolean;
      const proms: Promise<any>[] = [];
      const final = core.$result<Set<any>>(new Set(), []);
      // let index = 0;
      for (const item of input) {
        const result = def.valueType._parse(item, _ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result) => handleSetResult(result, final)));
        } else handleSetResult(result, final);
        // setResults[index++] = result;
      }

      if (proms.length) return Promise.all(proms).then(() => final);
      return final;
    };
  });

////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      $ZodEnum      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////
export type $EnumValue = string | number; // | bigint | boolean | symbol;
export type $EnumLike = Record<$EnumValue, $EnumValue>;
export type $ToEnum<T extends $EnumValue> = { [k in T]: k };

// export type $PrimitiveArray = Array<$EnumValue>;
// export type $EnumValues = $EnumLike | $PrimitiveArray;
// type IsString<T> = T extends PropertyKey ? T : never;
// export type $ValuesToEnum<T extends $EnumLike> = T extends $EnumLike
//   ? T
//   : T extends Array<infer Els>
//     ? {
//         [k in IsString<Els>]: k;
//       }
//     : never;

// enum Color {
//   Red = "red",
//   Green = "green",
//   Blue = "blue",
// }
// type arg0 = $ValuesToEnum<typeof Color>;
// type arg1 = $ValuesToEnum<{ a: "a"; b: "b" }>;
// type arg2 = $ValuesToEnum<["a", "b"]>;
// type arg3 = $ValuesToEnum<["a", "b", true, 5, 10n]>;
// type arg4 = $ValuesToEnum<Array<"a" | "b" | 123 | false>>;
// type arg5 = $ValuesToEnum<{ a: "a"; b: "b"; c: 1234n; d: true }>;
// type arg6 = $ValuesToEnum<number[]>;
// type arg7 = $ValuesToEnum<string[]>;
// type arg8 = $ValuesToEnum<$PrimitiveArray>;

export type $InferEnumOutput<T extends $EnumLike> = T[keyof T];

export type $InferEnumInput<T extends $EnumLike> = $InferEnumOutput<T>;

// type inf0 = InferEnumOutput<typeof Color>;
// type inf1 = InferEnumOutput<{ a: "a"; b: "b" }>;
// type inf2 = InferEnumOutput<["a", "b"]>;
// type inf3 = InferEnumOutput<["a", "b", true, 5, 10n]>;
// type inf4 = InferEnumOutput<Array<"a" | "b" | 123 | false>>;
// type inf5 = InferEnumOutput<{ a: "a"; b: "b"; c: 1234n; d: true }>;
// type inf6 = InferEnumOutput<number[]>;

// type $EnumValues = Array<{ key?: string; value: types.Primitive }>;
type $EnumEntries = Array<{ key: string; value: $EnumValue }>;
export interface $ZodEnumDef extends core.$ZodTypeDef {
  type: "enum";
  entries: $EnumLike;
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidValue> | undefined;
}

export interface $ZodEnum<T extends $EnumLike = $EnumLike>
  extends core.$ZodType<$InferEnumOutput<T>, $InferEnumInput<T>> {
  enum: T;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodEnumDef;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _values: core.$PrimitiveSet;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _pattern: RegExp;
}

export function $toEnum(values: $EnumEntries): $EnumLike {
  const _enum = {} as any;
  for (const { key, value } of values) {
    _enum[key] = value;
  }
  return _enum;
}

export const $ZodEnum: core.$constructor<$ZodEnum> =
  /*@__PURE__*/ core.$constructor("$ZodEnum", (inst, def) => {
    core.$ZodType.init(inst, def);

    inst.enum = def.entries;
    const options = Object.values(def.entries);
    inst._values = new Set<types.Primitive>(options);
    inst._pattern = new RegExp(
      `^(${options
        .filter((k) => util.propertyKeyTypes.has(typeof k))
        .map((o) =>
          typeof o === "string" ? util.escapeRegex(o) : o.toString()
        )
        .join("|")})$`
    );
    inst._typecheck = (input, _ctx) => {
      if (inst._values.has(input as any)) {
        return core.$succeed(input) as any;
      }
      return core.$fail(
        [
          {
            origin: "enum",
            code: "invalid_value",
            options,
            input,
            def,
          },
        ],
        true
      );
    };
  });

////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      $ZodLiteral      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////

export type $Literal = string | number | bigint | boolean | symbol;
export type $LiteralArray = Array<$Literal>;
export interface $ZodLiteralDef extends core.$ZodTypeDef {
  type: "enum";
  literals: $LiteralArray;
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidValue> | undefined;
}

export interface $ZodLiteral<T extends $LiteralArray = $LiteralArray>
  extends core.$ZodType<T[number], T[number]> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodLiteralDef;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _values: core.$PrimitiveSet;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _pattern: RegExp;
}

export const $ZodLiteral: core.$constructor<$ZodLiteral> =
  /*@__PURE__*/ core.$constructor("$ZodLiteral", (inst, def) => {
    core.$ZodType.init(inst, def);

    // const options = def.literals.map((e) => e);
    inst._values = new Set<types.Primitive>(def.literals);
    inst._pattern = new RegExp(
      `^(${def.literals
        .filter((k) => util.propertyKeyTypes.has(typeof k))
        .map((o) =>
          typeof o === "string" ? util.escapeRegex(o) : o.toString()
        )
        .join("|")})$`
    );
    inst._typecheck = (input, _ctx) => {
      if (inst._values.has(input as any)) {
        return core.$succeed(input) as any;
      }
      return core.$fail(
        [
          {
            origin: "literal",
            code: "invalid_value",
            options: def.literals,
            input,
            def,
          },
        ],
        true
      );
    };
  });

/////////////////////////////////////   $ZodLiteral   /////////////////////////////////////
// export interface $ZodLiteral<T extends types.Primitive[] = types.Primitive[]>
//   extends $ZodEnum<T> {
/** @deprecated Internal API, use with caution (not deprecated) */
//   _def: $ZodEnumDef;
// }

// export const $ZodLiteral: core.$constructor<$ZodLiteral> =
//   /*@__PURE__*/ core.$constructor("$ZodLiteral", (inst, def) => {
//     $ZodEnum.init(inst, def);
//   });

// /////////////////////////////////////   $ZodNativeEnum   /////////////////////////////////////
// export interface $ZodNativeEnum<T extends $EnumLike = $EnumLike>
//   extends $ZodEnum<T> {
/** @deprecated Internal API, use with caution (not deprecated) */
//   _def: $ZodEnumDef;
// }

// export const $ZodNativeEnum: core.$constructor<$ZodNativeEnum> =
//   /*@__PURE__*/ core.$constructor("$ZodNativeEnum", (inst, def) => {
//     $ZodEnum.init(inst, def);
//   });

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////      $ZodFile        //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////

export interface $ZodFileDef extends core.$ZodTypeDef {
  type: "file";
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodFile extends core.$ZodType<File, File> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodFileDef;
}

export const $ZodFile: core.$constructor<$ZodFile> =
  /*@__PURE__*/ core.$constructor("$ZodFile", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      if (input instanceof File) return core.$succeed(input);
      return core.$fail(
        [
          {
            origin: "file",
            code: "invalid_type",
            input,
            def,
          },
        ],
        true
      );
    };
  });

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////                          //////////
//////////        $ZodEffect        //////////
//////////                          //////////
//////////////////////////////////////////////
//////////////////////////////////////////////
export interface $ZodEffectDef extends core.$ZodTypeDef {
  type: "effect";
  effect: (
    input: unknown,
    ctx?: core.$ParseContext | undefined
  ) => types.MaybeAsync<unknown>;
  error?: err.$ZodErrorMap<never> | undefined;
}
export interface $ZodEffect<O = unknown, I = unknown>
  extends core.$ZodType<O, I> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodEffectDef;
}

export const $ZodEffect: core.$constructor<$ZodEffect> =
  /*@__PURE__*/ core.$constructor("$ZodEffect", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, ctx) => {
      const result = def.effect(input, ctx);
      return core.$succeed(result);
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////      $ZodOptional      //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
export interface $ZodOptionalDef extends core.$ZodTypeDef {
  type: "optional";
  innerType: core.$ZodType;
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodOptional<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<T["_output"] | undefined, T["_input"] | undefined> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodOptionalDef;

  _qin: "true";
  _qout: "true";
}

export const $ZodOptional: core.$constructor<$ZodOptional> =
  /*@__PURE__*/ core.$constructor("$ZodOptional", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._qin = "true";
    inst._qout = "true";
    inst._typecheck = (input, _ctx) => {
      if (input === undefined) return core.$succeed(undefined);
      return def.innerType._parse(input, _ctx);
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////      $ZodNullable      //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
export interface $ZodNullableDef extends core.$ZodTypeDef {
  type: "nullable";
  innerType: core.$ZodType;
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodNullable<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<T["_output"] | null, T["_input"] | null> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodNullableDef;
  _qin: T["_qin"];
  _qout: T["_qout"];
}

export const $ZodNullable: core.$constructor<$ZodNullable> =
  /*@__PURE__*/ core.$constructor("$ZodNullable", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._qin = def.innerType._qin;
    inst._qout = def.innerType._qout;
    inst._typecheck = (input, _ctx) => {
      if (input === null) return core.$succeed(null);
      return def.innerType._parse(input, _ctx);
    };
  });

/////////////////////////////////////////////
/////////////////////////////////////////////
//////////                         //////////
//////////      $ZodSuccess        //////////
//////////                         //////////
/////////////////////////////////////////////
/////////////////////////////////////////////
export interface $ZodSuccessDef extends core.$ZodTypeDef {
  type: "success";
  innerType: core.$ZodType;
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodSuccess<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<boolean, T["_input"]> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodSuccessDef;
}

export const $ZodSuccess: core.$constructor<$ZodSuccess> =
  /*@__PURE__*/ core.$constructor("$ZodSuccess", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      const result = def.innerType._parse(input, _ctx);
      if (result instanceof Promise)
        return result.then((result) => core.$succeed(!core.$failed(result)));
      return core.$succeed(!core.$failed(result));
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////      $ZodDefault       //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
export interface $ZodDefaultDef extends core.$ZodTypeDef {
  type: "default";
  innerType: core.$ZodType;
  defaultValue: () => this["innerType"]["_input"];
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodDefault<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<
    types.NoUndefined<T["_output"]>,
    // T["_output"], // it can still return undefined
    T["_input"] | undefined
  > {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodDefaultDef;
  _qin: T["_qin"];
}

export const $ZodDefault: core.$constructor<$ZodDefault> =
  /*@__PURE__*/ core.$constructor("$ZodDefault", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._qin = def.innerType._qin;
    inst._typecheck = (input, _ctx) => {
      if (input === undefined) return core.$succeed(def.defaultValue());
      return def.innerType._parse(input, _ctx);
      // const result = def.innerType._parse(input, _ctx);
      // if (result instanceof Promise) {
      //   return result.then((result) =>
      //     handleDefaultResult(result, def.defaultValue)
      //   );
      // }
      // return handleDefaultResult(result, def.defaultValue);
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////       $ZodCatch        //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
export interface $ZodCatchDef extends core.$ZodTypeDef {
  type: "catch";
  innerType: core.$ZodType;
  catchValue: () => this["innerType"]["_output"];
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodCatch<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<T["_output"], unknown> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodCatchDef;
  _qin: T["_qin"];
  _qout: T["_qout"];
}

export const $ZodCatch: core.$constructor<$ZodCatch> =
  /*@__PURE__*/ core.$constructor("$ZodCatch", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._qin = def.innerType._qin;
    inst._qout = def.innerType._qout;
    inst._typecheck = (input, _ctx) => {
      const result = def.innerType._parse(input, _ctx);
      if (result instanceof Promise) {
        return result.then((result) => {
          if (core.$failed(result)) return core.$succeed(def.catchValue());
          return result;
        });
      }
      if (core.$failed(result)) return core.$succeed(def.catchValue());
      return result;
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////        $ZodNaN         //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
export interface $ZodNaNDef extends core.$ZodTypeDef {
  type: "nan";
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}

export interface $ZodNaN extends core.$ZodType<number, number> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodNaNDef;
}

export const $ZodNaN: core.$constructor<$ZodNaN> =
  /*@__PURE__*/ core.$constructor("$ZodNaN", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      if (typeof input !== "number" || !Number.isNaN(input)) {
        return core.$fail(
          [
            {
              input,
              def,
              origin: "nan",
              code: "invalid_type",
            },
          ],
          true
        );
      }
      return core.$succeed(input);
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////      $ZodPipeline      //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
export interface $ZodPipelineDef extends core.$ZodTypeDef {
  type: "pipeline";
  in: core.$ZodType;
  out: core.$ZodType;
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodPipeline<
  A extends core.$ZodType = core.$ZodType,
  B extends core.$ZodType = core.$ZodType,
> extends core.$ZodType<B["_output"], A["_input"]> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodPipelineDef;
}

export const $ZodPipeline: core.$constructor<$ZodPipeline> =
  /*@__PURE__*/ core.$constructor("$ZodPipeline", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._typecheck = (input, _ctx) => {
      const result = def.in._parse(input, _ctx);
      if (result instanceof Promise) {
        return result.then((result) => {
          if (core.$failed(result)) return result;
          return def.out._parse(result.value, _ctx);
        });
      }
      if (core.$failed(result)) return result;
      return def.out._parse(result.value, _ctx);
    };
  });

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////      $ZodReadonly      //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////
type BuiltIn =
  | (((...args: any[]) => any) | (new (...args: any[]) => any))
  | { readonly [Symbol.toStringTag]: string }
  | Date
  | Error
  | Generator
  | Promise<unknown>
  | RegExp;

export type MakeReadonly<T> = T extends Map<infer K, infer V>
  ? ReadonlyMap<K, V>
  : T extends Set<infer V>
    ? ReadonlySet<V>
    : T extends [infer Head, ...infer Tail]
      ? readonly [Head, ...Tail]
      : T extends Array<infer V>
        ? ReadonlyArray<V>
        : T extends BuiltIn
          ? T
          : Readonly<T>;

function handleReadonlyResult(
  result: core.$ZodResult
): Readonly<core.$ZodResult> {
  // if (core.$failed(result)) return result;
  result.value = Object.freeze(result.value);
  return result;
}
export interface $ZodReadonlyDef extends core.$ZodTypeDef {
  type: "readonly";
  innerType: core.$ZodType;
  error?: err.$ZodErrorMap<never> | undefined;
}

export interface $ZodReadonly<T extends core.$ZodType = core.$ZodType>
  extends core.$ZodType<MakeReadonly<T["_output"]>, MakeReadonly<T["_input"]>> {
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodReadonlyDef;
  _qin: T["_qin"];
  _qout: T["_qout"];
}

export const $ZodReadonly: core.$constructor<$ZodReadonly> =
  /*@__PURE__*/ core.$constructor("$ZodReadonly", (inst, def) => {
    core.$ZodType.init(inst, def);
    inst._qin = def.innerType._qin;
    inst._qout = def.innerType._qout;
    inst._typecheck = (input, _ctx) => {
      const result = def.innerType._parse(input, _ctx);
      if (result instanceof Promise) {
        return result.then(handleReadonlyResult);
      }
      return handleReadonlyResult(result);
    };
  });

/////////////////////////////////////////////
/////////////////////////////////////////////
//////////                         //////////
//////////   $ZodTemplateLiteral   //////////
//////////                         //////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export interface $ZodTemplateLiteralDef extends core.$ZodTypeDef {
  type: "template_literal";
  parts: $TemplateLiteralPart[];
  error?: err.$ZodErrorMap<err.$ZodIssueInvalidType> | undefined;
}
export interface $ZodTemplateLiteral<Template extends string = string>
  extends core.$ZodType<Template, Template> {
  _pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  _def: $ZodTemplateLiteralDef;
}

export type $LiteralPart = string | number | boolean | null | undefined;
export interface $SchemaPart extends core.$ZodType<$LiteralPart, $LiteralPart> {
  _pattern: RegExp;
}
export type $TemplateLiteralPart = $LiteralPart | $SchemaPart;

type AppendToTemplateLiteral<
  Template extends string,
  Suffix extends $LiteralPart | core.$ZodType,
> = Suffix extends $LiteralPart
  ? `${Template}${Suffix}`
  : Suffix extends core.$ZodType<infer Output extends $LiteralPart>
    ? `${Template}${Output}`
    : never;

export type $PartsToTemplateLiteral<Parts extends $TemplateLiteralPart[]> =
  [] extends Parts
    ? ``
    : Parts extends [
          ...infer Rest extends $TemplateLiteralPart[],
          infer Last extends $TemplateLiteralPart,
        ]
      ? AppendToTemplateLiteral<$PartsToTemplateLiteral<Rest>, Last>
      : never;

export const $ZodTemplateLiteral: core.$constructor<$ZodTemplateLiteral> =
  /*@__PURE__*/ core.$constructor("$ZodTemplateLiteral", (inst, def) => {
    core.$ZodType.init(inst, def);
    const regexParts: string[] = [];
    for (const part of def.parts) {
      if (part instanceof core.$ZodType) {
        const source =
          part._pattern instanceof RegExp
            ? part._pattern.source
            : part._pattern;
        if (!source)
          throw new Error(`Invalid template literal part: ${part._traits}`);

        const start = source.startsWith("^") ? 1 : 0;
        const end = source.endsWith("$") ? source.length - 1 : source.length;
        regexParts.push(source.slice(start, end));
      } else {
        regexParts.push(`${part}`);
      }
    }
    inst._pattern = new RegExp(`^${regexParts.join("")}$`);

    inst._typecheck = (input, _ctx) => {
      if (typeof input !== "string") {
        return core.$fail(
          [
            {
              input,
              def,
              origin: "template_literal",
              code: "invalid_type",
            },
          ],
          true
        );
      }

      if (!inst._pattern.test(input)) {
        return core.$fail(
          [
            {
              input,
              def,
              origin: "template_literal",
              code: "invalid_type",
            },
          ],
          true
        );
      }

      return core.$succeed(input);
    };
  });
