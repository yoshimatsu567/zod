import type * as errors from "../errors.js";
import * as util from "../util.js";

const HasSize: Record<string, string> = {
  string: "characters",
  file: "bytes",
  array: "items",
  set: "items",
};

const Nouns: {
  [k in
    | errors.$ZodStringFormats
    | errors.$ZodIssue["origin"]
    | (string & {})]?: string;
} = {
  regex: "string",
  email: "email",
  url: "URL",
  emoji: "emoji",
  uuid: "UUID",
  uuidv4: "UUIDv4",
  uuidv6: "UUIDv6",
  nanoid: "nanoid",
  guid: "GUID",
  cuid: "cuid",
  cuid2: "cuid2",
  ulid: "ULID",
  xid: "XID",
  ksuid: "KSUID",
  iso_datetime: "ISO datetime",
  iso_date: "ISO date",
  iso_time: "ISO time",
  duration: "duration",
  ip: "IP address",
  ipv4: "IPv4 address",
  ipv6: "IPv6 address",
  base64: "base64-encoded string",
  json_string: "JSON string",
  e164: "E.164 number",
  jwt: "JWT",
};

declare const x: errors.$ZodIssueData<errors.$ZodIssue>;

const errorMap: errors.$ZodErrorMap = (issue) => {
  switch (issue.code) {
    case "invalid_type":
      if (issue.origin === "enum") {
      }
      return `Invalid input: expected ${issue.origin}, received ${util.getParsedType(issue.input)}`;
    case "invalid_value":
      return `Invalid option: expected one of ${util.joinValues(issue.options, ", ")}`;
    case "too_big":
      if (issue.origin in HasSize)
        return `Too big: expected ${issue.origin} to have less than ${issue.maximum}${HasSize[issue.origin]}`;
      return `Too big: expected ${issue.origin} to be less than ${issue.maximum}`;
    case "too_small":
      if (issue.origin in HasSize)
        return `Too small: expected ${issue.origin} to have more than ${issue.minimum}${HasSize[issue.origin]}`;
      return `Too small: expected ${issue.origin} to be more than ${issue.minimum}`;
    case "not_multiple_of":
      return `Invalid number: must be a multiple of ${issue.divisor}`;
    case "invalid_format": {
      const _issue = issue as errors.$FirstPartyStringFormats;
      if (_issue.format === "starts_with")
        return `Invalid string: must start with "${issue}"`;
      if (_issue.format === "ends_with")
        return `Invalid string: must end with "${_issue.suffix}"`;
      if (_issue.format === "includes")
        return `Invalid string: must include "${_issue.includes}"`;
      if (_issue.format === "regex")
        return `Invalid string: must match pattern ${_issue.pattern}`;
      return `Invalid ${Nouns[_issue.format] ?? issue.format}`;
    }

    case "invalid_date":
      return "Invalid Date";
    case "unrecognized_keys":
      return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
    case "invalid_union":
      return "Invalid input";
    case "invalid_key":
      return `Invalid key in ${issue.origin}`;
    case "invalid_element":
      return `Invalid value in ${issue.origin}`;
  }

  return `Invalid input`;
};

export default errorMap;
