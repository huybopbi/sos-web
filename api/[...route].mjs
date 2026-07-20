import { createRequire } from "node:module"; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/pathMatch.js
var require_pathMatch = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/pathMatch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pathMatch = pathMatch;
    function pathMatch(reqPath, cookiePath) {
      if (cookiePath === reqPath) {
        return true;
      }
      const idx = reqPath.indexOf(cookiePath);
      if (idx === 0) {
        if (cookiePath[cookiePath.length - 1] === "/") {
          return true;
        }
        if (reqPath.startsWith(cookiePath) && reqPath[cookiePath.length] === "/") {
          return true;
        }
      }
      return false;
    }
  }
});

// ../../node_modules/.pnpm/tldts@6.1.86/node_modules/tldts/dist/cjs/index.js
var require_cjs = __commonJS({
  "../../node_modules/.pnpm/tldts@6.1.86/node_modules/tldts/dist/cjs/index.js"(exports) {
    "use strict";
    function shareSameDomainSuffix(hostname, vhost) {
      if (hostname.endsWith(vhost)) {
        return hostname.length === vhost.length || hostname[hostname.length - vhost.length - 1] === ".";
      }
      return false;
    }
    function extractDomainWithSuffix(hostname, publicSuffix) {
      const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
      const lastDotBeforeSuffixIndex = hostname.lastIndexOf(".", publicSuffixIndex);
      if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
      }
      return hostname.slice(lastDotBeforeSuffixIndex + 1);
    }
    function getDomain$1(suffix, hostname, options) {
      if (options.validHosts !== null) {
        const validHosts = options.validHosts;
        for (const vhost of validHosts) {
          if (
            /*@__INLINE__*/
            shareSameDomainSuffix(hostname, vhost)
          ) {
            return vhost;
          }
        }
      }
      let numberOfLeadingDots = 0;
      if (hostname.startsWith(".")) {
        while (numberOfLeadingDots < hostname.length && hostname[numberOfLeadingDots] === ".") {
          numberOfLeadingDots += 1;
        }
      }
      if (suffix.length === hostname.length - numberOfLeadingDots) {
        return null;
      }
      return (
        /*@__INLINE__*/
        extractDomainWithSuffix(hostname, suffix)
      );
    }
    function getDomainWithoutSuffix$1(domain, suffix) {
      return domain.slice(0, -suffix.length - 1);
    }
    function extractHostname(url, urlIsValidHostname) {
      let start = 0;
      let end = url.length;
      let hasUpper = false;
      if (!urlIsValidHostname) {
        if (url.startsWith("data:")) {
          return null;
        }
        while (start < url.length && url.charCodeAt(start) <= 32) {
          start += 1;
        }
        while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
          end -= 1;
        }
        if (url.charCodeAt(start) === 47 && url.charCodeAt(start + 1) === 47) {
          start += 2;
        } else {
          const indexOfProtocol = url.indexOf(":/", start);
          if (indexOfProtocol !== -1) {
            const protocolSize = indexOfProtocol - start;
            const c0 = url.charCodeAt(start);
            const c1 = url.charCodeAt(start + 1);
            const c2 = url.charCodeAt(start + 2);
            const c3 = url.charCodeAt(start + 3);
            const c4 = url.charCodeAt(start + 4);
            if (protocolSize === 5 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112 && c4 === 115) ;
            else if (protocolSize === 4 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112) ;
            else if (protocolSize === 3 && c0 === 119 && c1 === 115 && c2 === 115) ;
            else if (protocolSize === 2 && c0 === 119 && c1 === 115) ;
            else {
              for (let i = start; i < indexOfProtocol; i += 1) {
                const lowerCaseCode = url.charCodeAt(i) | 32;
                if (!(lowerCaseCode >= 97 && lowerCaseCode <= 122 || // [a, z]
                lowerCaseCode >= 48 && lowerCaseCode <= 57 || // [0, 9]
                lowerCaseCode === 46 || // '.'
                lowerCaseCode === 45 || // '-'
                lowerCaseCode === 43)) {
                  return null;
                }
              }
            }
            start = indexOfProtocol + 2;
            while (url.charCodeAt(start) === 47) {
              start += 1;
            }
          }
        }
        let indexOfIdentifier = -1;
        let indexOfClosingBracket = -1;
        let indexOfPort = -1;
        for (let i = start; i < end; i += 1) {
          const code = url.charCodeAt(i);
          if (code === 35 || // '#'
          code === 47 || // '/'
          code === 63) {
            end = i;
            break;
          } else if (code === 64) {
            indexOfIdentifier = i;
          } else if (code === 93) {
            indexOfClosingBracket = i;
          } else if (code === 58) {
            indexOfPort = i;
          } else if (code >= 65 && code <= 90) {
            hasUpper = true;
          }
        }
        if (indexOfIdentifier !== -1 && indexOfIdentifier > start && indexOfIdentifier < end) {
          start = indexOfIdentifier + 1;
        }
        if (url.charCodeAt(start) === 91) {
          if (indexOfClosingBracket !== -1) {
            return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
          }
          return null;
        } else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
          end = indexOfPort;
        }
      }
      while (end > start + 1 && url.charCodeAt(end - 1) === 46) {
        end -= 1;
      }
      const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
      if (hasUpper) {
        return hostname.toLowerCase();
      }
      return hostname;
    }
    function isProbablyIpv4(hostname) {
      if (hostname.length < 7) {
        return false;
      }
      if (hostname.length > 15) {
        return false;
      }
      let numberOfDots = 0;
      for (let i = 0; i < hostname.length; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          numberOfDots += 1;
        } else if (code < 48 || code > 57) {
          return false;
        }
      }
      return numberOfDots === 3 && hostname.charCodeAt(0) !== 46 && hostname.charCodeAt(hostname.length - 1) !== 46;
    }
    function isProbablyIpv6(hostname) {
      if (hostname.length < 3) {
        return false;
      }
      let start = hostname.startsWith("[") ? 1 : 0;
      let end = hostname.length;
      if (hostname[end - 1] === "]") {
        end -= 1;
      }
      if (end - start > 39) {
        return false;
      }
      let hasColon = false;
      for (; start < end; start += 1) {
        const code = hostname.charCodeAt(start);
        if (code === 58) {
          hasColon = true;
        } else if (!(code >= 48 && code <= 57 || // 0-9
        code >= 97 && code <= 102 || // a-f
        code >= 65 && code <= 90)) {
          return false;
        }
      }
      return hasColon;
    }
    function isIp(hostname) {
      return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
    }
    function isValidAscii(code) {
      return code >= 97 && code <= 122 || code >= 48 && code <= 57 || code > 127;
    }
    function isValidHostname(hostname) {
      if (hostname.length > 255) {
        return false;
      }
      if (hostname.length === 0) {
        return false;
      }
      if (
        /*@__INLINE__*/
        !isValidAscii(hostname.charCodeAt(0)) && hostname.charCodeAt(0) !== 46 && // '.' (dot)
        hostname.charCodeAt(0) !== 95
      ) {
        return false;
      }
      let lastDotIndex = -1;
      let lastCharCode = -1;
      const len = hostname.length;
      for (let i = 0; i < len; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          if (
            // Check that previous label is < 63 bytes long (64 = 63 + '.')
            i - lastDotIndex > 64 || // Check that previous character was not already a '.'
            lastCharCode === 46 || // Check that the previous label does not end with a '-' (dash)
            lastCharCode === 45 || // Check that the previous label does not end with a '_' (underscore)
            lastCharCode === 95
          ) {
            return false;
          }
          lastDotIndex = i;
        } else if (!/*@__INLINE__*/
        (isValidAscii(code) || code === 45 || code === 95)) {
          return false;
        }
        lastCharCode = code;
      }
      return (
        // Check that last label is shorter than 63 chars
        len - lastDotIndex - 1 <= 63 && // Check that the last character is an allowed trailing label character.
        // Since we already checked that the char is a valid hostname character,
        // we only need to check that it's different from '-'.
        lastCharCode !== 45
      );
    }
    function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname: extractHostname2 = true, mixedInputs = true, validHosts = null, validateHostname = true }) {
      return {
        allowIcannDomains,
        allowPrivateDomains,
        detectIp,
        extractHostname: extractHostname2,
        mixedInputs,
        validHosts,
        validateHostname
      };
    }
    var DEFAULT_OPTIONS = (
      /*@__INLINE__*/
      setDefaultsImpl({})
    );
    function setDefaults(options) {
      if (options === void 0) {
        return DEFAULT_OPTIONS;
      }
      return (
        /*@__INLINE__*/
        setDefaultsImpl(options)
      );
    }
    function getSubdomain$1(hostname, domain) {
      if (domain.length === hostname.length) {
        return "";
      }
      return hostname.slice(0, -domain.length - 1);
    }
    function getEmptyResult() {
      return {
        domain: null,
        domainWithoutSuffix: null,
        hostname: null,
        isIcann: null,
        isIp: null,
        isPrivate: null,
        publicSuffix: null,
        subdomain: null
      };
    }
    function resetResult(result) {
      result.domain = null;
      result.domainWithoutSuffix = null;
      result.hostname = null;
      result.isIcann = null;
      result.isIp = null;
      result.isPrivate = null;
      result.publicSuffix = null;
      result.subdomain = null;
    }
    function parseImpl(url, step, suffixLookup2, partialOptions, result) {
      const options = (
        /*@__INLINE__*/
        setDefaults(partialOptions)
      );
      if (typeof url !== "string") {
        return result;
      }
      if (!options.extractHostname) {
        result.hostname = url;
      } else if (options.mixedInputs) {
        result.hostname = extractHostname(url, isValidHostname(url));
      } else {
        result.hostname = extractHostname(url, false);
      }
      if (step === 0 || result.hostname === null) {
        return result;
      }
      if (options.detectIp) {
        result.isIp = isIp(result.hostname);
        if (result.isIp) {
          return result;
        }
      }
      if (options.validateHostname && options.extractHostname && !isValidHostname(result.hostname)) {
        result.hostname = null;
        return result;
      }
      suffixLookup2(result.hostname, options, result);
      if (step === 2 || result.publicSuffix === null) {
        return result;
      }
      result.domain = getDomain$1(result.publicSuffix, result.hostname, options);
      if (step === 3 || result.domain === null) {
        return result;
      }
      result.subdomain = getSubdomain$1(result.hostname, result.domain);
      if (step === 4) {
        return result;
      }
      result.domainWithoutSuffix = getDomainWithoutSuffix$1(result.domain, result.publicSuffix);
      return result;
    }
    function fastPathLookup(hostname, options, out) {
      if (!options.allowPrivateDomains && hostname.length > 3) {
        const last = hostname.length - 1;
        const c3 = hostname.charCodeAt(last);
        const c2 = hostname.charCodeAt(last - 1);
        const c1 = hostname.charCodeAt(last - 2);
        const c0 = hostname.charCodeAt(last - 3);
        if (c3 === 109 && c2 === 111 && c1 === 99 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "com";
          return true;
        } else if (c3 === 103 && c2 === 114 && c1 === 111 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "org";
          return true;
        } else if (c3 === 117 && c2 === 100 && c1 === 101 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "edu";
          return true;
        } else if (c3 === 118 && c2 === 111 && c1 === 103 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "gov";
          return true;
        } else if (c3 === 116 && c2 === 101 && c1 === 110 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "net";
          return true;
        } else if (c3 === 101 && c2 === 100 && c1 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "de";
          return true;
        }
      }
      return false;
    }
    var exceptions = /* @__PURE__ */ (function() {
      const _0 = [1, {}], _1 = [2, {}], _2 = [0, { "city": _0 }];
      const exceptions2 = [0, { "ck": [0, { "www": _0 }], "jp": [0, { "kawasaki": _2, "kitakyushu": _2, "kobe": _2, "nagoya": _2, "sapporo": _2, "sendai": _2, "yokohama": _2 }], "dev": [0, { "hrsn": [0, { "psl": [0, { "wc": [0, { "ignored": _1, "sub": [0, { "ignored": _1 }] }] }] }] }] }];
      return exceptions2;
    })();
    var rules = /* @__PURE__ */ (function() {
      const _3 = [1, {}], _4 = [2, {}], _5 = [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], _6 = [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], _7 = [0, { "*": _4 }], _8 = [2, { "s": _7 }], _9 = [0, { "relay": _4 }], _10 = [2, { "id": _4 }], _11 = [1, { "gov": _3 }], _12 = [0, { "transfer-webapp": _4 }], _13 = [0, { "notebook": _4, "studio": _4 }], _14 = [0, { "labeling": _4, "notebook": _4, "studio": _4 }], _15 = [0, { "notebook": _4 }], _16 = [0, { "labeling": _4, "notebook": _4, "notebook-fips": _4, "studio": _4 }], _17 = [0, { "notebook": _4, "notebook-fips": _4, "studio": _4, "studio-fips": _4 }], _18 = [0, { "*": _3 }], _19 = [1, { "co": _4 }], _20 = [0, { "objects": _4 }], _21 = [2, { "nodes": _4 }], _22 = [0, { "my": _7 }], _23 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-website": _4 }], _24 = [0, { "s3": _4, "s3-accesspoint": _4 }], _25 = [0, { "direct": _4 }], _26 = [0, { "webview-assets": _4 }], _27 = [0, { "vfs": _4, "webview-assets": _4 }], _28 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _29 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _24, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _30 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], _31 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4 }], _32 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-website": _4 }], _33 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _34 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-deprecated": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], _35 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4 }], _36 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _35, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4 }], _37 = [0, { "auth": _4 }], _38 = [0, { "auth": _4, "auth-fips": _4 }], _39 = [0, { "auth-fips": _4 }], _40 = [0, { "apps": _4 }], _41 = [0, { "paas": _4 }], _42 = [2, { "eu": _4 }], _43 = [0, { "app": _4 }], _44 = [0, { "site": _4 }], _45 = [1, { "com": _3, "edu": _3, "net": _3, "org": _3 }], _46 = [0, { "j": _4 }], _47 = [0, { "dyn": _4 }], _48 = [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], _49 = [0, { "p": _4 }], _50 = [0, { "user": _4 }], _51 = [0, { "shop": _4 }], _52 = [0, { "cdn": _4 }], _53 = [0, { "cust": _4, "reservd": _4 }], _54 = [0, { "cust": _4 }], _55 = [0, { "s3": _4 }], _56 = [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3 }], _57 = [0, { "ipfs": _4 }], _58 = [1, { "framer": _4 }], _59 = [0, { "forgot": _4 }], _60 = [1, { "gs": _3 }], _61 = [0, { "nes": _3 }], _62 = [1, { "k12": _3, "cc": _3, "lib": _3 }], _63 = [1, { "cc": _3, "lib": _3 }];
      const rules2 = [0, { "ac": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "drr": _4, "feedback": _4, "forms": _4 }], "ad": _3, "ae": [1, { "ac": _3, "co": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "sch": _3 }], "aero": [1, { "airline": _3, "airport": _3, "accident-investigation": _3, "accident-prevention": _3, "aerobatic": _3, "aeroclub": _3, "aerodrome": _3, "agents": _3, "air-surveillance": _3, "air-traffic-control": _3, "aircraft": _3, "airtraffic": _3, "ambulance": _3, "association": _3, "author": _3, "ballooning": _3, "broker": _3, "caa": _3, "cargo": _3, "catering": _3, "certification": _3, "championship": _3, "charter": _3, "civilaviation": _3, "club": _3, "conference": _3, "consultant": _3, "consulting": _3, "control": _3, "council": _3, "crew": _3, "design": _3, "dgca": _3, "educator": _3, "emergency": _3, "engine": _3, "engineer": _3, "entertainment": _3, "equipment": _3, "exchange": _3, "express": _3, "federation": _3, "flight": _3, "freight": _3, "fuel": _3, "gliding": _3, "government": _3, "groundhandling": _3, "group": _3, "hanggliding": _3, "homebuilt": _3, "insurance": _3, "journal": _3, "journalist": _3, "leasing": _3, "logistics": _3, "magazine": _3, "maintenance": _3, "marketplace": _3, "media": _3, "microlight": _3, "modelling": _3, "navigation": _3, "parachuting": _3, "paragliding": _3, "passenger-association": _3, "pilot": _3, "press": _3, "production": _3, "recreation": _3, "repbody": _3, "res": _3, "research": _3, "rotorcraft": _3, "safety": _3, "scientist": _3, "services": _3, "show": _3, "skydiving": _3, "software": _3, "student": _3, "taxi": _3, "trader": _3, "trading": _3, "trainer": _3, "union": _3, "workinggroup": _3, "works": _3 }], "af": _5, "ag": [1, { "co": _3, "com": _3, "net": _3, "nom": _3, "org": _3, "obj": _4 }], "ai": [1, { "com": _3, "net": _3, "off": _3, "org": _3, "uwu": _4, "framer": _4 }], "al": _6, "am": [1, { "co": _3, "com": _3, "commune": _3, "net": _3, "org": _3, "radio": _4 }], "ao": [1, { "co": _3, "ed": _3, "edu": _3, "gov": _3, "gv": _3, "it": _3, "og": _3, "org": _3, "pb": _3 }], "aq": _3, "ar": [1, { "bet": _3, "com": _3, "coop": _3, "edu": _3, "gob": _3, "gov": _3, "int": _3, "mil": _3, "musica": _3, "mutual": _3, "net": _3, "org": _3, "seg": _3, "senasa": _3, "tur": _3 }], "arpa": [1, { "e164": _3, "home": _3, "in-addr": _3, "ip6": _3, "iris": _3, "uri": _3, "urn": _3 }], "as": _11, "asia": [1, { "cloudns": _4, "daemon": _4, "dix": _4 }], "at": [1, { "ac": [1, { "sth": _3 }], "co": _3, "gv": _3, "or": _3, "funkfeuer": [0, { "wien": _4 }], "futurecms": [0, { "*": _4, "ex": _7, "in": _7 }], "futurehosting": _4, "futuremailing": _4, "ortsinfo": [0, { "ex": _7, "kunden": _7 }], "biz": _4, "info": _4, "123webseite": _4, "priv": _4, "myspreadshop": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 }], "au": [1, { "asn": _3, "com": [1, { "cloudlets": [0, { "mel": _4 }], "myspreadshop": _4 }], "edu": [1, { "act": _3, "catholic": _3, "nsw": [1, { "schools": _3 }], "nt": _3, "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "gov": [1, { "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "id": _3, "net": _3, "org": _3, "conf": _3, "oz": _3, "act": _3, "nsw": _3, "nt": _3, "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "aw": [1, { "com": _3 }], "ax": _3, "az": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pp": _3, "pro": _3 }], "ba": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "rs": _4 }], "bb": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3, "store": _3, "tv": _3 }], "bd": _18, "be": [1, { "ac": _3, "cloudns": _4, "webhosting": _4, "interhostsolutions": [0, { "cloud": _4 }], "kuleuven": [0, { "ezproxy": _4 }], "123website": _4, "myspreadshop": _4, "transurl": _7 }], "bf": _11, "bg": [1, { "0": _3, "1": _3, "2": _3, "3": _3, "4": _3, "5": _3, "6": _3, "7": _3, "8": _3, "9": _3, "a": _3, "b": _3, "c": _3, "d": _3, "e": _3, "f": _3, "g": _3, "h": _3, "i": _3, "j": _3, "k": _3, "l": _3, "m": _3, "n": _3, "o": _3, "p": _3, "q": _3, "r": _3, "s": _3, "t": _3, "u": _3, "v": _3, "w": _3, "x": _3, "y": _3, "z": _3, "barsy": _4 }], "bh": _5, "bi": [1, { "co": _3, "com": _3, "edu": _3, "or": _3, "org": _3 }], "biz": [1, { "activetrail": _4, "cloud-ip": _4, "cloudns": _4, "jozi": _4, "dyndns": _4, "for-better": _4, "for-more": _4, "for-some": _4, "for-the": _4, "selfip": _4, "webhop": _4, "orx": _4, "mmafan": _4, "myftp": _4, "no-ip": _4, "dscloud": _4 }], "bj": [1, { "africa": _3, "agro": _3, "architectes": _3, "assur": _3, "avocats": _3, "co": _3, "com": _3, "eco": _3, "econo": _3, "edu": _3, "info": _3, "loisirs": _3, "money": _3, "net": _3, "org": _3, "ote": _3, "restaurant": _3, "resto": _3, "tourism": _3, "univ": _3 }], "bm": _5, "bn": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "co": _4 }], "bo": [1, { "com": _3, "edu": _3, "gob": _3, "int": _3, "mil": _3, "net": _3, "org": _3, "tv": _3, "web": _3, "academia": _3, "agro": _3, "arte": _3, "blog": _3, "bolivia": _3, "ciencia": _3, "cooperativa": _3, "democracia": _3, "deporte": _3, "ecologia": _3, "economia": _3, "empresa": _3, "indigena": _3, "industria": _3, "info": _3, "medicina": _3, "movimiento": _3, "musica": _3, "natural": _3, "nombre": _3, "noticias": _3, "patria": _3, "plurinacional": _3, "politica": _3, "profesional": _3, "pueblo": _3, "revista": _3, "salud": _3, "tecnologia": _3, "tksat": _3, "transporte": _3, "wiki": _3 }], "br": [1, { "9guacu": _3, "abc": _3, "adm": _3, "adv": _3, "agr": _3, "aju": _3, "am": _3, "anani": _3, "aparecida": _3, "app": _3, "arq": _3, "art": _3, "ato": _3, "b": _3, "barueri": _3, "belem": _3, "bet": _3, "bhz": _3, "bib": _3, "bio": _3, "blog": _3, "bmd": _3, "boavista": _3, "bsb": _3, "campinagrande": _3, "campinas": _3, "caxias": _3, "cim": _3, "cng": _3, "cnt": _3, "com": [1, { "simplesite": _4 }], "contagem": _3, "coop": _3, "coz": _3, "cri": _3, "cuiaba": _3, "curitiba": _3, "def": _3, "des": _3, "det": _3, "dev": _3, "ecn": _3, "eco": _3, "edu": _3, "emp": _3, "enf": _3, "eng": _3, "esp": _3, "etc": _3, "eti": _3, "far": _3, "feira": _3, "flog": _3, "floripa": _3, "fm": _3, "fnd": _3, "fortal": _3, "fot": _3, "foz": _3, "fst": _3, "g12": _3, "geo": _3, "ggf": _3, "goiania": _3, "gov": [1, { "ac": _3, "al": _3, "am": _3, "ap": _3, "ba": _3, "ce": _3, "df": _3, "es": _3, "go": _3, "ma": _3, "mg": _3, "ms": _3, "mt": _3, "pa": _3, "pb": _3, "pe": _3, "pi": _3, "pr": _3, "rj": _3, "rn": _3, "ro": _3, "rr": _3, "rs": _3, "sc": _3, "se": _3, "sp": _3, "to": _3 }], "gru": _3, "imb": _3, "ind": _3, "inf": _3, "jab": _3, "jampa": _3, "jdf": _3, "joinville": _3, "jor": _3, "jus": _3, "leg": [1, { "ac": _4, "al": _4, "am": _4, "ap": _4, "ba": _4, "ce": _4, "df": _4, "es": _4, "go": _4, "ma": _4, "mg": _4, "ms": _4, "mt": _4, "pa": _4, "pb": _4, "pe": _4, "pi": _4, "pr": _4, "rj": _4, "rn": _4, "ro": _4, "rr": _4, "rs": _4, "sc": _4, "se": _4, "sp": _4, "to": _4 }], "leilao": _3, "lel": _3, "log": _3, "londrina": _3, "macapa": _3, "maceio": _3, "manaus": _3, "maringa": _3, "mat": _3, "med": _3, "mil": _3, "morena": _3, "mp": _3, "mus": _3, "natal": _3, "net": _3, "niteroi": _3, "nom": _18, "not": _3, "ntr": _3, "odo": _3, "ong": _3, "org": _3, "osasco": _3, "palmas": _3, "poa": _3, "ppg": _3, "pro": _3, "psc": _3, "psi": _3, "pvh": _3, "qsl": _3, "radio": _3, "rec": _3, "recife": _3, "rep": _3, "ribeirao": _3, "rio": _3, "riobranco": _3, "riopreto": _3, "salvador": _3, "sampa": _3, "santamaria": _3, "santoandre": _3, "saobernardo": _3, "saogonca": _3, "seg": _3, "sjc": _3, "slg": _3, "slz": _3, "sorocaba": _3, "srv": _3, "taxi": _3, "tc": _3, "tec": _3, "teo": _3, "the": _3, "tmp": _3, "trd": _3, "tur": _3, "tv": _3, "udi": _3, "vet": _3, "vix": _3, "vlog": _3, "wiki": _3, "zlg": _3 }], "bs": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "we": _4 }], "bt": _5, "bv": _3, "bw": [1, { "ac": _3, "co": _3, "gov": _3, "net": _3, "org": _3 }], "by": [1, { "gov": _3, "mil": _3, "com": _3, "of": _3, "mediatech": _4 }], "bz": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "za": _4, "mydns": _4, "gsj": _4 }], "ca": [1, { "ab": _3, "bc": _3, "mb": _3, "nb": _3, "nf": _3, "nl": _3, "ns": _3, "nt": _3, "nu": _3, "on": _3, "pe": _3, "qc": _3, "sk": _3, "yk": _3, "gc": _3, "barsy": _4, "awdev": _7, "co": _4, "no-ip": _4, "myspreadshop": _4, "box": _4 }], "cat": _3, "cc": [1, { "cleverapps": _4, "cloudns": _4, "ftpaccess": _4, "game-server": _4, "myphotos": _4, "scrapping": _4, "twmail": _4, "csx": _4, "fantasyleague": _4, "spawn": [0, { "instances": _4 }] }], "cd": _11, "cf": _3, "cg": _3, "ch": [1, { "square7": _4, "cloudns": _4, "cloudscale": [0, { "cust": _4, "lpg": _20, "rma": _20 }], "flow": [0, { "ae": [0, { "alp1": _4 }], "appengine": _4 }], "linkyard-cloud": _4, "gotdns": _4, "dnsking": _4, "123website": _4, "myspreadshop": _4, "firenet": [0, { "*": _4, "svc": _7 }], "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 }], "ci": [1, { "ac": _3, "xn--aroport-bya": _3, "a\xE9roport": _3, "asso": _3, "co": _3, "com": _3, "ed": _3, "edu": _3, "go": _3, "gouv": _3, "int": _3, "net": _3, "or": _3, "org": _3 }], "ck": _18, "cl": [1, { "co": _3, "gob": _3, "gov": _3, "mil": _3, "cloudns": _4 }], "cm": [1, { "co": _3, "com": _3, "gov": _3, "net": _3 }], "cn": [1, { "ac": _3, "com": [1, { "amazonaws": [0, { "cn-north-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4 }], "cn-northwest-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _24, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4 }], "compute": _7, "airflow": [0, { "cn-north-1": _7, "cn-northwest-1": _7 }], "eb": [0, { "cn-north-1": _4, "cn-northwest-1": _4 }], "elb": _7 }], "sagemaker": [0, { "cn-north-1": _13, "cn-northwest-1": _13 }] }], "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--od0alg": _3, "\u7DB2\u7D61": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "ah": _3, "bj": _3, "cq": _3, "fj": _3, "gd": _3, "gs": _3, "gx": _3, "gz": _3, "ha": _3, "hb": _3, "he": _3, "hi": _3, "hk": _3, "hl": _3, "hn": _3, "jl": _3, "js": _3, "jx": _3, "ln": _3, "mo": _3, "nm": _3, "nx": _3, "qh": _3, "sc": _3, "sd": _3, "sh": [1, { "as": _4 }], "sn": _3, "sx": _3, "tj": _3, "tw": _3, "xj": _3, "xz": _3, "yn": _3, "zj": _3, "canva-apps": _4, "canvasite": _22, "myqnapcloud": _4, "quickconnect": _25 }], "co": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "carrd": _4, "crd": _4, "otap": _7, "leadpages": _4, "lpages": _4, "mypi": _4, "xmit": _7, "firewalledreplit": _10, "repl": _10, "supabase": _4 }], "com": [1, { "a2hosted": _4, "cpserver": _4, "adobeaemcloud": [2, { "dev": _7 }], "africa": _4, "airkitapps": _4, "airkitapps-au": _4, "aivencloud": _4, "alibabacloudcs": _4, "kasserver": _4, "amazonaws": [0, { "af-south-1": _28, "ap-east-1": _29, "ap-northeast-1": _30, "ap-northeast-2": _30, "ap-northeast-3": _28, "ap-south-1": _30, "ap-south-2": _31, "ap-southeast-1": _30, "ap-southeast-2": _30, "ap-southeast-3": _31, "ap-southeast-4": _31, "ap-southeast-5": [0, { "execute-api": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4 }], "ca-central-1": _33, "ca-west-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4 }], "eu-central-1": _30, "eu-central-2": _31, "eu-north-1": _29, "eu-south-1": _28, "eu-south-2": _31, "eu-west-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], "eu-west-2": _29, "eu-west-3": _28, "il-central-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": [0, { "vfs": _4 }] }], "me-central-1": _31, "me-south-1": _29, "sa-east-1": _28, "us-east-1": [2, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-deprecated": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], "us-east-2": _34, "us-gov-east-1": _36, "us-gov-west-1": _36, "us-west-1": _33, "us-west-2": _34, "compute": _7, "compute-1": _7, "airflow": [0, { "af-south-1": _7, "ap-east-1": _7, "ap-northeast-1": _7, "ap-northeast-2": _7, "ap-northeast-3": _7, "ap-south-1": _7, "ap-south-2": _7, "ap-southeast-1": _7, "ap-southeast-2": _7, "ap-southeast-3": _7, "ap-southeast-4": _7, "ca-central-1": _7, "ca-west-1": _7, "eu-central-1": _7, "eu-central-2": _7, "eu-north-1": _7, "eu-south-1": _7, "eu-south-2": _7, "eu-west-1": _7, "eu-west-2": _7, "eu-west-3": _7, "il-central-1": _7, "me-central-1": _7, "me-south-1": _7, "sa-east-1": _7, "us-east-1": _7, "us-east-2": _7, "us-west-1": _7, "us-west-2": _7 }], "s3": _4, "s3-1": _4, "s3-ap-east-1": _4, "s3-ap-northeast-1": _4, "s3-ap-northeast-2": _4, "s3-ap-northeast-3": _4, "s3-ap-south-1": _4, "s3-ap-southeast-1": _4, "s3-ap-southeast-2": _4, "s3-ca-central-1": _4, "s3-eu-central-1": _4, "s3-eu-north-1": _4, "s3-eu-west-1": _4, "s3-eu-west-2": _4, "s3-eu-west-3": _4, "s3-external-1": _4, "s3-fips-us-gov-east-1": _4, "s3-fips-us-gov-west-1": _4, "s3-global": [0, { "accesspoint": [0, { "mrap": _4 }] }], "s3-me-south-1": _4, "s3-sa-east-1": _4, "s3-us-east-2": _4, "s3-us-gov-east-1": _4, "s3-us-gov-west-1": _4, "s3-us-west-1": _4, "s3-us-west-2": _4, "s3-website-ap-northeast-1": _4, "s3-website-ap-southeast-1": _4, "s3-website-ap-southeast-2": _4, "s3-website-eu-west-1": _4, "s3-website-sa-east-1": _4, "s3-website-us-east-1": _4, "s3-website-us-gov-west-1": _4, "s3-website-us-west-1": _4, "s3-website-us-west-2": _4, "elb": _7 }], "amazoncognito": [0, { "af-south-1": _37, "ap-east-1": _37, "ap-northeast-1": _37, "ap-northeast-2": _37, "ap-northeast-3": _37, "ap-south-1": _37, "ap-south-2": _37, "ap-southeast-1": _37, "ap-southeast-2": _37, "ap-southeast-3": _37, "ap-southeast-4": _37, "ap-southeast-5": _37, "ca-central-1": _37, "ca-west-1": _37, "eu-central-1": _37, "eu-central-2": _37, "eu-north-1": _37, "eu-south-1": _37, "eu-south-2": _37, "eu-west-1": _37, "eu-west-2": _37, "eu-west-3": _37, "il-central-1": _37, "me-central-1": _37, "me-south-1": _37, "sa-east-1": _37, "us-east-1": _38, "us-east-2": _38, "us-gov-east-1": _39, "us-gov-west-1": _39, "us-west-1": _38, "us-west-2": _38 }], "amplifyapp": _4, "awsapprunner": _7, "awsapps": _4, "elasticbeanstalk": [2, { "af-south-1": _4, "ap-east-1": _4, "ap-northeast-1": _4, "ap-northeast-2": _4, "ap-northeast-3": _4, "ap-south-1": _4, "ap-southeast-1": _4, "ap-southeast-2": _4, "ap-southeast-3": _4, "ca-central-1": _4, "eu-central-1": _4, "eu-north-1": _4, "eu-south-1": _4, "eu-west-1": _4, "eu-west-2": _4, "eu-west-3": _4, "il-central-1": _4, "me-south-1": _4, "sa-east-1": _4, "us-east-1": _4, "us-east-2": _4, "us-gov-east-1": _4, "us-gov-west-1": _4, "us-west-1": _4, "us-west-2": _4 }], "awsglobalaccelerator": _4, "siiites": _4, "appspacehosted": _4, "appspaceusercontent": _4, "on-aptible": _4, "myasustor": _4, "balena-devices": _4, "boutir": _4, "bplaced": _4, "cafjs": _4, "canva-apps": _4, "cdn77-storage": _4, "br": _4, "cn": _4, "de": _4, "eu": _4, "jpn": _4, "mex": _4, "ru": _4, "sa": _4, "uk": _4, "us": _4, "za": _4, "clever-cloud": [0, { "services": _7 }], "dnsabr": _4, "ip-ddns": _4, "jdevcloud": _4, "wpdevcloud": _4, "cf-ipfs": _4, "cloudflare-ipfs": _4, "trycloudflare": _4, "co": _4, "devinapps": _7, "builtwithdark": _4, "datadetect": [0, { "demo": _4, "instance": _4 }], "dattolocal": _4, "dattorelay": _4, "dattoweb": _4, "mydatto": _4, "digitaloceanspaces": _7, "discordsays": _4, "discordsez": _4, "drayddns": _4, "dreamhosters": _4, "durumis": _4, "mydrobo": _4, "blogdns": _4, "cechire": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dyn-o-saur": _4, "dynalias": _4, "dyndns-at-home": _4, "dyndns-at-work": _4, "dyndns-blog": _4, "dyndns-free": _4, "dyndns-home": _4, "dyndns-ip": _4, "dyndns-mail": _4, "dyndns-office": _4, "dyndns-pics": _4, "dyndns-remote": _4, "dyndns-server": _4, "dyndns-web": _4, "dyndns-wiki": _4, "dyndns-work": _4, "est-a-la-maison": _4, "est-a-la-masion": _4, "est-le-patron": _4, "est-mon-blogueur": _4, "from-ak": _4, "from-al": _4, "from-ar": _4, "from-ca": _4, "from-ct": _4, "from-dc": _4, "from-de": _4, "from-fl": _4, "from-ga": _4, "from-hi": _4, "from-ia": _4, "from-id": _4, "from-il": _4, "from-in": _4, "from-ks": _4, "from-ky": _4, "from-ma": _4, "from-md": _4, "from-mi": _4, "from-mn": _4, "from-mo": _4, "from-ms": _4, "from-mt": _4, "from-nc": _4, "from-nd": _4, "from-ne": _4, "from-nh": _4, "from-nj": _4, "from-nm": _4, "from-nv": _4, "from-oh": _4, "from-ok": _4, "from-or": _4, "from-pa": _4, "from-pr": _4, "from-ri": _4, "from-sc": _4, "from-sd": _4, "from-tn": _4, "from-tx": _4, "from-ut": _4, "from-va": _4, "from-vt": _4, "from-wa": _4, "from-wi": _4, "from-wv": _4, "from-wy": _4, "getmyip": _4, "gotdns": _4, "hobby-site": _4, "homelinux": _4, "homeunix": _4, "iamallama": _4, "is-a-anarchist": _4, "is-a-blogger": _4, "is-a-bookkeeper": _4, "is-a-bulls-fan": _4, "is-a-caterer": _4, "is-a-chef": _4, "is-a-conservative": _4, "is-a-cpa": _4, "is-a-cubicle-slave": _4, "is-a-democrat": _4, "is-a-designer": _4, "is-a-doctor": _4, "is-a-financialadvisor": _4, "is-a-geek": _4, "is-a-green": _4, "is-a-guru": _4, "is-a-hard-worker": _4, "is-a-hunter": _4, "is-a-landscaper": _4, "is-a-lawyer": _4, "is-a-liberal": _4, "is-a-libertarian": _4, "is-a-llama": _4, "is-a-musician": _4, "is-a-nascarfan": _4, "is-a-nurse": _4, "is-a-painter": _4, "is-a-personaltrainer": _4, "is-a-photographer": _4, "is-a-player": _4, "is-a-republican": _4, "is-a-rockstar": _4, "is-a-socialist": _4, "is-a-student": _4, "is-a-teacher": _4, "is-a-techie": _4, "is-a-therapist": _4, "is-an-accountant": _4, "is-an-actor": _4, "is-an-actress": _4, "is-an-anarchist": _4, "is-an-artist": _4, "is-an-engineer": _4, "is-an-entertainer": _4, "is-certified": _4, "is-gone": _4, "is-into-anime": _4, "is-into-cars": _4, "is-into-cartoons": _4, "is-into-games": _4, "is-leet": _4, "is-not-certified": _4, "is-slick": _4, "is-uberleet": _4, "is-with-theband": _4, "isa-geek": _4, "isa-hockeynut": _4, "issmarterthanyou": _4, "likes-pie": _4, "likescandy": _4, "neat-url": _4, "saves-the-whales": _4, "selfip": _4, "sells-for-less": _4, "sells-for-u": _4, "servebbs": _4, "simple-url": _4, "space-to-rent": _4, "teaches-yoga": _4, "writesthisblog": _4, "ddnsfree": _4, "ddnsgeek": _4, "giize": _4, "gleeze": _4, "kozow": _4, "loseyourip": _4, "ooguy": _4, "theworkpc": _4, "mytuleap": _4, "tuleap-partners": _4, "encoreapi": _4, "evennode": [0, { "eu-1": _4, "eu-2": _4, "eu-3": _4, "eu-4": _4, "us-1": _4, "us-2": _4, "us-3": _4, "us-4": _4 }], "onfabrica": _4, "fastly-edge": _4, "fastly-terrarium": _4, "fastvps-server": _4, "mydobiss": _4, "firebaseapp": _4, "fldrv": _4, "forgeblocks": _4, "framercanvas": _4, "freebox-os": _4, "freeboxos": _4, "freemyip": _4, "aliases121": _4, "gentapps": _4, "gentlentapis": _4, "githubusercontent": _4, "0emm": _7, "appspot": [2, { "r": _7 }], "blogspot": _4, "codespot": _4, "googleapis": _4, "googlecode": _4, "pagespeedmobilizer": _4, "withgoogle": _4, "withyoutube": _4, "grayjayleagues": _4, "hatenablog": _4, "hatenadiary": _4, "herokuapp": _4, "gr": _4, "smushcdn": _4, "wphostedmail": _4, "wpmucdn": _4, "pixolino": _4, "apps-1and1": _4, "live-website": _4, "dopaas": _4, "hosted-by-previder": _41, "hosteur": [0, { "rag-cloud": _4, "rag-cloud-ch": _4 }], "ik-server": [0, { "jcloud": _4, "jcloud-ver-jpc": _4 }], "jelastic": [0, { "demo": _4 }], "massivegrid": _41, "wafaicloud": [0, { "jed": _4, "ryd": _4 }], "webadorsite": _4, "joyent": [0, { "cns": _7 }], "lpusercontent": _4, "linode": [0, { "members": _4, "nodebalancer": _7 }], "linodeobjects": _7, "linodeusercontent": [0, { "ip": _4 }], "localtonet": _4, "lovableproject": _4, "barsycenter": _4, "barsyonline": _4, "modelscape": _4, "mwcloudnonprod": _4, "polyspace": _4, "mazeplay": _4, "miniserver": _4, "atmeta": _4, "fbsbx": _40, "meteorapp": _42, "routingthecloud": _4, "mydbserver": _4, "hostedpi": _4, "mythic-beasts": [0, { "caracal": _4, "customer": _4, "fentiger": _4, "lynx": _4, "ocelot": _4, "oncilla": _4, "onza": _4, "sphinx": _4, "vs": _4, "x": _4, "yali": _4 }], "nospamproxy": [0, { "cloud": [2, { "o365": _4 }] }], "4u": _4, "nfshost": _4, "3utilities": _4, "blogsyte": _4, "ciscofreak": _4, "damnserver": _4, "ddnsking": _4, "ditchyourip": _4, "dnsiskinky": _4, "dynns": _4, "geekgalaxy": _4, "health-carereform": _4, "homesecuritymac": _4, "homesecuritypc": _4, "myactivedirectory": _4, "mysecuritycamera": _4, "myvnc": _4, "net-freaks": _4, "onthewifi": _4, "point2this": _4, "quicksytes": _4, "securitytactics": _4, "servebeer": _4, "servecounterstrike": _4, "serveexchange": _4, "serveftp": _4, "servegame": _4, "servehalflife": _4, "servehttp": _4, "servehumour": _4, "serveirc": _4, "servemp3": _4, "servep2p": _4, "servepics": _4, "servequake": _4, "servesarcasm": _4, "stufftoread": _4, "unusualperson": _4, "workisboring": _4, "myiphost": _4, "observableusercontent": [0, { "static": _4 }], "simplesite": _4, "orsites": _4, "operaunite": _4, "customer-oci": [0, { "*": _4, "oci": _7, "ocp": _7, "ocs": _7 }], "oraclecloudapps": _7, "oraclegovcloudapps": _7, "authgear-staging": _4, "authgearapps": _4, "skygearapp": _4, "outsystemscloud": _4, "ownprovider": _4, "pgfog": _4, "pagexl": _4, "gotpantheon": _4, "paywhirl": _7, "upsunapp": _4, "postman-echo": _4, "prgmr": [0, { "xen": _4 }], "pythonanywhere": _42, "qa2": _4, "alpha-myqnapcloud": _4, "dev-myqnapcloud": _4, "mycloudnas": _4, "mynascloud": _4, "myqnapcloud": _4, "qualifioapp": _4, "ladesk": _4, "qbuser": _4, "quipelements": _7, "rackmaze": _4, "readthedocs-hosted": _4, "rhcloud": _4, "onrender": _4, "render": _43, "subsc-pay": _4, "180r": _4, "dojin": _4, "sakuratan": _4, "sakuraweb": _4, "x0": _4, "code": [0, { "builder": _7, "dev-builder": _7, "stg-builder": _7 }], "salesforce": [0, { "platform": [0, { "code-builder-stg": [0, { "test": [0, { "001": _7 }] }] }] }], "logoip": _4, "scrysec": _4, "firewall-gateway": _4, "myshopblocks": _4, "myshopify": _4, "shopitsite": _4, "1kapp": _4, "appchizi": _4, "applinzi": _4, "sinaapp": _4, "vipsinaapp": _4, "streamlitapp": _4, "try-snowplow": _4, "playstation-cloud": _4, "myspreadshop": _4, "w-corp-staticblitz": _4, "w-credentialless-staticblitz": _4, "w-staticblitz": _4, "stackhero-network": _4, "stdlib": [0, { "api": _4 }], "strapiapp": [2, { "media": _4 }], "streak-link": _4, "streaklinks": _4, "streakusercontent": _4, "temp-dns": _4, "dsmynas": _4, "familyds": _4, "mytabit": _4, "taveusercontent": _4, "tb-hosting": _44, "reservd": _4, "thingdustdata": _4, "townnews-staging": _4, "typeform": [0, { "pro": _4 }], "hk": _4, "it": _4, "deus-canvas": _4, "vultrobjects": _7, "wafflecell": _4, "hotelwithflight": _4, "reserve-online": _4, "cprapid": _4, "pleskns": _4, "remotewd": _4, "wiardweb": [0, { "pages": _4 }], "wixsite": _4, "wixstudio": _4, "messwithdns": _4, "woltlab-demo": _4, "wpenginepowered": [2, { "js": _4 }], "xnbay": [2, { "u2": _4, "u2-local": _4 }], "yolasite": _4 }], "coop": _3, "cr": [1, { "ac": _3, "co": _3, "ed": _3, "fi": _3, "go": _3, "or": _3, "sa": _3 }], "cu": [1, { "com": _3, "edu": _3, "gob": _3, "inf": _3, "nat": _3, "net": _3, "org": _3 }], "cv": [1, { "com": _3, "edu": _3, "id": _3, "int": _3, "net": _3, "nome": _3, "org": _3, "publ": _3 }], "cw": _45, "cx": [1, { "gov": _3, "cloudns": _4, "ath": _4, "info": _4, "assessments": _4, "calculators": _4, "funnels": _4, "paynow": _4, "quizzes": _4, "researched": _4, "tests": _4 }], "cy": [1, { "ac": _3, "biz": _3, "com": [1, { "scaleforce": _46 }], "ekloges": _3, "gov": _3, "ltd": _3, "mil": _3, "net": _3, "org": _3, "press": _3, "pro": _3, "tm": _3 }], "cz": [1, { "contentproxy9": [0, { "rsc": _4 }], "realm": _4, "e4": _4, "co": _4, "metacentrum": [0, { "cloud": _7, "custom": _4 }], "muni": [0, { "cloud": [0, { "flt": _4, "usr": _4 }] }] }], "de": [1, { "bplaced": _4, "square7": _4, "com": _4, "cosidns": _47, "dnsupdater": _4, "dynamisches-dns": _4, "internet-dns": _4, "l-o-g-i-n": _4, "ddnss": [2, { "dyn": _4, "dyndns": _4 }], "dyn-ip24": _4, "dyndns1": _4, "home-webserver": [2, { "dyn": _4 }], "myhome-server": _4, "dnshome": _4, "fuettertdasnetz": _4, "isteingeek": _4, "istmein": _4, "lebtimnetz": _4, "leitungsen": _4, "traeumtgerade": _4, "frusky": _7, "goip": _4, "xn--gnstigbestellen-zvb": _4, "g\xFCnstigbestellen": _4, "xn--gnstigliefern-wob": _4, "g\xFCnstigliefern": _4, "hs-heilbronn": [0, { "it": [0, { "pages": _4, "pages-research": _4 }] }], "dyn-berlin": _4, "in-berlin": _4, "in-brb": _4, "in-butter": _4, "in-dsl": _4, "in-vpn": _4, "iservschule": _4, "mein-iserv": _4, "schulplattform": _4, "schulserver": _4, "test-iserv": _4, "keymachine": _4, "git-repos": _4, "lcube-server": _4, "svn-repos": _4, "barsy": _4, "webspaceconfig": _4, "123webseite": _4, "rub": _4, "ruhr-uni-bochum": [2, { "noc": [0, { "io": _4 }] }], "logoip": _4, "firewall-gateway": _4, "my-gateway": _4, "my-router": _4, "spdns": _4, "speedpartner": [0, { "customer": _4 }], "myspreadshop": _4, "taifun-dns": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4, "dd-dns": _4, "dray-dns": _4, "draydns": _4, "dyn-vpn": _4, "dynvpn": _4, "mein-vigor": _4, "my-vigor": _4, "my-wan": _4, "syno-ds": _4, "synology-diskstation": _4, "synology-ds": _4, "uberspace": _7, "virtual-user": _4, "virtualuser": _4, "community-pro": _4, "diskussionsbereich": _4 }], "dj": _3, "dk": [1, { "biz": _4, "co": _4, "firm": _4, "reg": _4, "store": _4, "123hjemmeside": _4, "myspreadshop": _4 }], "dm": _48, "do": [1, { "art": _3, "com": _3, "edu": _3, "gob": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "sld": _3, "web": _3 }], "dz": [1, { "art": _3, "asso": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "pol": _3, "soc": _3, "tm": _3 }], "ec": [1, { "com": _3, "edu": _3, "fin": _3, "gob": _3, "gov": _3, "info": _3, "k12": _3, "med": _3, "mil": _3, "net": _3, "org": _3, "pro": _3, "base": _4, "official": _4 }], "edu": [1, { "rit": [0, { "git-pages": _4 }] }], "ee": [1, { "aip": _3, "com": _3, "edu": _3, "fie": _3, "gov": _3, "lib": _3, "med": _3, "org": _3, "pri": _3, "riik": _3 }], "eg": [1, { "ac": _3, "com": _3, "edu": _3, "eun": _3, "gov": _3, "info": _3, "me": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "sci": _3, "sport": _3, "tv": _3 }], "er": _18, "es": [1, { "com": _3, "edu": _3, "gob": _3, "nom": _3, "org": _3, "123miweb": _4, "myspreadshop": _4 }], "et": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "name": _3, "net": _3, "org": _3 }], "eu": [1, { "airkitapps": _4, "cloudns": _4, "dogado": [0, { "jelastic": _4 }], "barsy": _4, "spdns": _4, "transurl": _7, "diskstation": _4 }], "fi": [1, { "aland": _3, "dy": _4, "xn--hkkinen-5wa": _4, "h\xE4kkinen": _4, "iki": _4, "cloudplatform": [0, { "fi": _4 }], "datacenter": [0, { "demo": _4, "paas": _4 }], "kapsi": _4, "123kotisivu": _4, "myspreadshop": _4 }], "fj": [1, { "ac": _3, "biz": _3, "com": _3, "gov": _3, "info": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "fk": _18, "fm": [1, { "com": _3, "edu": _3, "net": _3, "org": _3, "radio": _4, "user": _7 }], "fo": _3, "fr": [1, { "asso": _3, "com": _3, "gouv": _3, "nom": _3, "prd": _3, "tm": _3, "avoues": _3, "cci": _3, "greta": _3, "huissier-justice": _3, "en-root": _4, "fbx-os": _4, "fbxos": _4, "freebox-os": _4, "freeboxos": _4, "goupile": _4, "123siteweb": _4, "on-web": _4, "chirurgiens-dentistes-en-france": _4, "dedibox": _4, "aeroport": _4, "avocat": _4, "chambagri": _4, "chirurgiens-dentistes": _4, "experts-comptables": _4, "medecin": _4, "notaires": _4, "pharmacien": _4, "port": _4, "veterinaire": _4, "myspreadshop": _4, "ynh": _4 }], "ga": _3, "gb": _3, "gd": [1, { "edu": _3, "gov": _3 }], "ge": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "pvt": _3, "school": _3 }], "gf": _3, "gg": [1, { "co": _3, "net": _3, "org": _3, "botdash": _4, "kaas": _4, "stackit": _4, "panel": [2, { "daemon": _4 }] }], "gh": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "org": _3 }], "gi": [1, { "com": _3, "edu": _3, "gov": _3, "ltd": _3, "mod": _3, "org": _3 }], "gl": [1, { "co": _3, "com": _3, "edu": _3, "net": _3, "org": _3, "biz": _4 }], "gm": _3, "gn": [1, { "ac": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], "gov": _3, "gp": [1, { "asso": _3, "com": _3, "edu": _3, "mobi": _3, "net": _3, "org": _3 }], "gq": _3, "gr": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "barsy": _4, "simplesite": _4 }], "gs": _3, "gt": [1, { "com": _3, "edu": _3, "gob": _3, "ind": _3, "mil": _3, "net": _3, "org": _3 }], "gu": [1, { "com": _3, "edu": _3, "gov": _3, "guam": _3, "info": _3, "net": _3, "org": _3, "web": _3 }], "gw": _3, "gy": _48, "hk": [1, { "com": _3, "edu": _3, "gov": _3, "idv": _3, "net": _3, "org": _3, "xn--ciqpn": _3, "\u4E2A\u4EBA": _3, "xn--gmqw5a": _3, "\u500B\u4EBA": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--mxtq1m": _3, "\u653F\u5E9C": _3, "xn--lcvr32d": _3, "\u654E\u80B2": _3, "xn--wcvs22d": _3, "\u6559\u80B2": _3, "xn--gmq050i": _3, "\u7B87\u4EBA": _3, "xn--uc0atv": _3, "\u7D44\u7E54": _3, "xn--uc0ay4a": _3, "\u7D44\u7EC7": _3, "xn--od0alg": _3, "\u7DB2\u7D61": _3, "xn--zf0avx": _3, "\u7DB2\u7EDC": _3, "xn--mk0axi": _3, "\u7EC4\u7E54": _3, "xn--tn0ag": _3, "\u7EC4\u7EC7": _3, "xn--od0aq3b": _3, "\u7F51\u7D61": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "inc": _4, "ltd": _4 }], "hm": _3, "hn": [1, { "com": _3, "edu": _3, "gob": _3, "mil": _3, "net": _3, "org": _3 }], "hr": [1, { "com": _3, "from": _3, "iz": _3, "name": _3, "brendly": _51 }], "ht": [1, { "adult": _3, "art": _3, "asso": _3, "com": _3, "coop": _3, "edu": _3, "firm": _3, "gouv": _3, "info": _3, "med": _3, "net": _3, "org": _3, "perso": _3, "pol": _3, "pro": _3, "rel": _3, "shop": _3, "rt": _4 }], "hu": [1, { "2000": _3, "agrar": _3, "bolt": _3, "casino": _3, "city": _3, "co": _3, "erotica": _3, "erotika": _3, "film": _3, "forum": _3, "games": _3, "hotel": _3, "info": _3, "ingatlan": _3, "jogasz": _3, "konyvelo": _3, "lakas": _3, "media": _3, "news": _3, "org": _3, "priv": _3, "reklam": _3, "sex": _3, "shop": _3, "sport": _3, "suli": _3, "szex": _3, "tm": _3, "tozsde": _3, "utazas": _3, "video": _3 }], "id": [1, { "ac": _3, "biz": _3, "co": _3, "desa": _3, "go": _3, "mil": _3, "my": _3, "net": _3, "or": _3, "ponpes": _3, "sch": _3, "web": _3, "zone": _4 }], "ie": [1, { "gov": _3, "myspreadshop": _4 }], "il": [1, { "ac": _3, "co": [1, { "ravpage": _4, "mytabit": _4, "tabitorder": _4 }], "gov": _3, "idf": _3, "k12": _3, "muni": _3, "net": _3, "org": _3 }], "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": _3, "xn--5dbhl8d": _3, "xn--8dbq2a": _3, "xn--hebda8b": _3 }], "\u05D9\u05E9\u05E8\u05D0\u05DC": [1, { "\u05D0\u05E7\u05D3\u05DE\u05D9\u05D4": _3, "\u05D9\u05E9\u05D5\u05D1": _3, "\u05E6\u05D4\u05DC": _3, "\u05DE\u05DE\u05E9\u05DC": _3 }], "im": [1, { "ac": _3, "co": [1, { "ltd": _3, "plc": _3 }], "com": _3, "net": _3, "org": _3, "tt": _3, "tv": _3 }], "in": [1, { "5g": _3, "6g": _3, "ac": _3, "ai": _3, "am": _3, "bihar": _3, "biz": _3, "business": _3, "ca": _3, "cn": _3, "co": _3, "com": _3, "coop": _3, "cs": _3, "delhi": _3, "dr": _3, "edu": _3, "er": _3, "firm": _3, "gen": _3, "gov": _3, "gujarat": _3, "ind": _3, "info": _3, "int": _3, "internet": _3, "io": _3, "me": _3, "mil": _3, "net": _3, "nic": _3, "org": _3, "pg": _3, "post": _3, "pro": _3, "res": _3, "travel": _3, "tv": _3, "uk": _3, "up": _3, "us": _3, "cloudns": _4, "barsy": _4, "web": _4, "supabase": _4 }], "info": [1, { "cloudns": _4, "dynamic-dns": _4, "barrel-of-knowledge": _4, "barrell-of-knowledge": _4, "dyndns": _4, "for-our": _4, "groks-the": _4, "groks-this": _4, "here-for-more": _4, "knowsitall": _4, "selfip": _4, "webhop": _4, "barsy": _4, "mayfirst": _4, "mittwald": _4, "mittwaldserver": _4, "typo3server": _4, "dvrcam": _4, "ilovecollege": _4, "no-ip": _4, "forumz": _4, "nsupdate": _4, "dnsupdate": _4, "v-info": _4 }], "int": [1, { "eu": _3 }], "io": [1, { "2038": _4, "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "on-acorn": _7, "myaddr": _4, "apigee": _4, "b-data": _4, "beagleboard": _4, "bitbucket": _4, "bluebite": _4, "boxfuse": _4, "brave": _8, "browsersafetymark": _4, "bubble": _52, "bubbleapps": _4, "bigv": [0, { "uk0": _4 }], "cleverapps": _4, "cloudbeesusercontent": _4, "dappnode": [0, { "dyndns": _4 }], "darklang": _4, "definima": _4, "dedyn": _4, "fh-muenster": _4, "shw": _4, "forgerock": [0, { "id": _4 }], "github": _4, "gitlab": _4, "lolipop": _4, "hasura-app": _4, "hostyhosting": _4, "hypernode": _4, "moonscale": _7, "beebyte": _41, "beebyteapp": [0, { "sekd1": _4 }], "jele": _4, "webthings": _4, "loginline": _4, "barsy": _4, "azurecontainer": _7, "ngrok": [2, { "ap": _4, "au": _4, "eu": _4, "in": _4, "jp": _4, "sa": _4, "us": _4 }], "nodeart": [0, { "stage": _4 }], "pantheonsite": _4, "pstmn": [2, { "mock": _4 }], "protonet": _4, "qcx": [2, { "sys": _7 }], "qoto": _4, "vaporcloud": _4, "myrdbx": _4, "rb-hosting": _44, "on-k3s": _7, "on-rio": _7, "readthedocs": _4, "resindevice": _4, "resinstaging": [0, { "devices": _4 }], "hzc": _4, "sandcats": _4, "scrypted": [0, { "client": _4 }], "mo-siemens": _4, "lair": _40, "stolos": _7, "musician": _4, "utwente": _4, "edugit": _4, "telebit": _4, "thingdust": [0, { "dev": _53, "disrec": _53, "prod": _54, "testing": _53 }], "tickets": _4, "webflow": _4, "webflowtest": _4, "editorx": _4, "wixstudio": _4, "basicserver": _4, "virtualserver": _4 }], "iq": _6, "ir": [1, { "ac": _3, "co": _3, "gov": _3, "id": _3, "net": _3, "org": _3, "sch": _3, "xn--mgba3a4f16a": _3, "\u0627\u06CC\u0631\u0627\u0646": _3, "xn--mgba3a4fra": _3, "\u0627\u064A\u0631\u0627\u0646": _3, "arvanedge": _4 }], "is": _3, "it": [1, { "edu": _3, "gov": _3, "abr": _3, "abruzzo": _3, "aosta-valley": _3, "aostavalley": _3, "bas": _3, "basilicata": _3, "cal": _3, "calabria": _3, "cam": _3, "campania": _3, "emilia-romagna": _3, "emiliaromagna": _3, "emr": _3, "friuli-v-giulia": _3, "friuli-ve-giulia": _3, "friuli-vegiulia": _3, "friuli-venezia-giulia": _3, "friuli-veneziagiulia": _3, "friuli-vgiulia": _3, "friuliv-giulia": _3, "friulive-giulia": _3, "friulivegiulia": _3, "friulivenezia-giulia": _3, "friuliveneziagiulia": _3, "friulivgiulia": _3, "fvg": _3, "laz": _3, "lazio": _3, "lig": _3, "liguria": _3, "lom": _3, "lombardia": _3, "lombardy": _3, "lucania": _3, "mar": _3, "marche": _3, "mol": _3, "molise": _3, "piedmont": _3, "piemonte": _3, "pmn": _3, "pug": _3, "puglia": _3, "sar": _3, "sardegna": _3, "sardinia": _3, "sic": _3, "sicilia": _3, "sicily": _3, "taa": _3, "tos": _3, "toscana": _3, "trentin-sud-tirol": _3, "xn--trentin-sd-tirol-rzb": _3, "trentin-s\xFCd-tirol": _3, "trentin-sudtirol": _3, "xn--trentin-sdtirol-7vb": _3, "trentin-s\xFCdtirol": _3, "trentin-sued-tirol": _3, "trentin-suedtirol": _3, "trentino": _3, "trentino-a-adige": _3, "trentino-aadige": _3, "trentino-alto-adige": _3, "trentino-altoadige": _3, "trentino-s-tirol": _3, "trentino-stirol": _3, "trentino-sud-tirol": _3, "xn--trentino-sd-tirol-c3b": _3, "trentino-s\xFCd-tirol": _3, "trentino-sudtirol": _3, "xn--trentino-sdtirol-szb": _3, "trentino-s\xFCdtirol": _3, "trentino-sued-tirol": _3, "trentino-suedtirol": _3, "trentinoa-adige": _3, "trentinoaadige": _3, "trentinoalto-adige": _3, "trentinoaltoadige": _3, "trentinos-tirol": _3, "trentinostirol": _3, "trentinosud-tirol": _3, "xn--trentinosd-tirol-rzb": _3, "trentinos\xFCd-tirol": _3, "trentinosudtirol": _3, "xn--trentinosdtirol-7vb": _3, "trentinos\xFCdtirol": _3, "trentinosued-tirol": _3, "trentinosuedtirol": _3, "trentinsud-tirol": _3, "xn--trentinsd-tirol-6vb": _3, "trentins\xFCd-tirol": _3, "trentinsudtirol": _3, "xn--trentinsdtirol-nsb": _3, "trentins\xFCdtirol": _3, "trentinsued-tirol": _3, "trentinsuedtirol": _3, "tuscany": _3, "umb": _3, "umbria": _3, "val-d-aosta": _3, "val-daosta": _3, "vald-aosta": _3, "valdaosta": _3, "valle-aosta": _3, "valle-d-aosta": _3, "valle-daosta": _3, "valleaosta": _3, "valled-aosta": _3, "valledaosta": _3, "vallee-aoste": _3, "xn--valle-aoste-ebb": _3, "vall\xE9e-aoste": _3, "vallee-d-aoste": _3, "xn--valle-d-aoste-ehb": _3, "vall\xE9e-d-aoste": _3, "valleeaoste": _3, "xn--valleaoste-e7a": _3, "vall\xE9eaoste": _3, "valleedaoste": _3, "xn--valledaoste-ebb": _3, "vall\xE9edaoste": _3, "vao": _3, "vda": _3, "ven": _3, "veneto": _3, "ag": _3, "agrigento": _3, "al": _3, "alessandria": _3, "alto-adige": _3, "altoadige": _3, "an": _3, "ancona": _3, "andria-barletta-trani": _3, "andria-trani-barletta": _3, "andriabarlettatrani": _3, "andriatranibarletta": _3, "ao": _3, "aosta": _3, "aoste": _3, "ap": _3, "aq": _3, "aquila": _3, "ar": _3, "arezzo": _3, "ascoli-piceno": _3, "ascolipiceno": _3, "asti": _3, "at": _3, "av": _3, "avellino": _3, "ba": _3, "balsan": _3, "balsan-sudtirol": _3, "xn--balsan-sdtirol-nsb": _3, "balsan-s\xFCdtirol": _3, "balsan-suedtirol": _3, "bari": _3, "barletta-trani-andria": _3, "barlettatraniandria": _3, "belluno": _3, "benevento": _3, "bergamo": _3, "bg": _3, "bi": _3, "biella": _3, "bl": _3, "bn": _3, "bo": _3, "bologna": _3, "bolzano": _3, "bolzano-altoadige": _3, "bozen": _3, "bozen-sudtirol": _3, "xn--bozen-sdtirol-2ob": _3, "bozen-s\xFCdtirol": _3, "bozen-suedtirol": _3, "br": _3, "brescia": _3, "brindisi": _3, "bs": _3, "bt": _3, "bulsan": _3, "bulsan-sudtirol": _3, "xn--bulsan-sdtirol-nsb": _3, "bulsan-s\xFCdtirol": _3, "bulsan-suedtirol": _3, "bz": _3, "ca": _3, "cagliari": _3, "caltanissetta": _3, "campidano-medio": _3, "campidanomedio": _3, "campobasso": _3, "carbonia-iglesias": _3, "carboniaiglesias": _3, "carrara-massa": _3, "carraramassa": _3, "caserta": _3, "catania": _3, "catanzaro": _3, "cb": _3, "ce": _3, "cesena-forli": _3, "xn--cesena-forl-mcb": _3, "cesena-forl\xEC": _3, "cesenaforli": _3, "xn--cesenaforl-i8a": _3, "cesenaforl\xEC": _3, "ch": _3, "chieti": _3, "ci": _3, "cl": _3, "cn": _3, "co": _3, "como": _3, "cosenza": _3, "cr": _3, "cremona": _3, "crotone": _3, "cs": _3, "ct": _3, "cuneo": _3, "cz": _3, "dell-ogliastra": _3, "dellogliastra": _3, "en": _3, "enna": _3, "fc": _3, "fe": _3, "fermo": _3, "ferrara": _3, "fg": _3, "fi": _3, "firenze": _3, "florence": _3, "fm": _3, "foggia": _3, "forli-cesena": _3, "xn--forl-cesena-fcb": _3, "forl\xEC-cesena": _3, "forlicesena": _3, "xn--forlcesena-c8a": _3, "forl\xECcesena": _3, "fr": _3, "frosinone": _3, "ge": _3, "genoa": _3, "genova": _3, "go": _3, "gorizia": _3, "gr": _3, "grosseto": _3, "iglesias-carbonia": _3, "iglesiascarbonia": _3, "im": _3, "imperia": _3, "is": _3, "isernia": _3, "kr": _3, "la-spezia": _3, "laquila": _3, "laspezia": _3, "latina": _3, "lc": _3, "le": _3, "lecce": _3, "lecco": _3, "li": _3, "livorno": _3, "lo": _3, "lodi": _3, "lt": _3, "lu": _3, "lucca": _3, "macerata": _3, "mantova": _3, "massa-carrara": _3, "massacarrara": _3, "matera": _3, "mb": _3, "mc": _3, "me": _3, "medio-campidano": _3, "mediocampidano": _3, "messina": _3, "mi": _3, "milan": _3, "milano": _3, "mn": _3, "mo": _3, "modena": _3, "monza": _3, "monza-brianza": _3, "monza-e-della-brianza": _3, "monzabrianza": _3, "monzaebrianza": _3, "monzaedellabrianza": _3, "ms": _3, "mt": _3, "na": _3, "naples": _3, "napoli": _3, "no": _3, "novara": _3, "nu": _3, "nuoro": _3, "og": _3, "ogliastra": _3, "olbia-tempio": _3, "olbiatempio": _3, "or": _3, "oristano": _3, "ot": _3, "pa": _3, "padova": _3, "padua": _3, "palermo": _3, "parma": _3, "pavia": _3, "pc": _3, "pd": _3, "pe": _3, "perugia": _3, "pesaro-urbino": _3, "pesarourbino": _3, "pescara": _3, "pg": _3, "pi": _3, "piacenza": _3, "pisa": _3, "pistoia": _3, "pn": _3, "po": _3, "pordenone": _3, "potenza": _3, "pr": _3, "prato": _3, "pt": _3, "pu": _3, "pv": _3, "pz": _3, "ra": _3, "ragusa": _3, "ravenna": _3, "rc": _3, "re": _3, "reggio-calabria": _3, "reggio-emilia": _3, "reggiocalabria": _3, "reggioemilia": _3, "rg": _3, "ri": _3, "rieti": _3, "rimini": _3, "rm": _3, "rn": _3, "ro": _3, "roma": _3, "rome": _3, "rovigo": _3, "sa": _3, "salerno": _3, "sassari": _3, "savona": _3, "si": _3, "siena": _3, "siracusa": _3, "so": _3, "sondrio": _3, "sp": _3, "sr": _3, "ss": _3, "xn--sdtirol-n2a": _3, "s\xFCdtirol": _3, "suedtirol": _3, "sv": _3, "ta": _3, "taranto": _3, "te": _3, "tempio-olbia": _3, "tempioolbia": _3, "teramo": _3, "terni": _3, "tn": _3, "to": _3, "torino": _3, "tp": _3, "tr": _3, "trani-andria-barletta": _3, "trani-barletta-andria": _3, "traniandriabarletta": _3, "tranibarlettaandria": _3, "trapani": _3, "trento": _3, "treviso": _3, "trieste": _3, "ts": _3, "turin": _3, "tv": _3, "ud": _3, "udine": _3, "urbino-pesaro": _3, "urbinopesaro": _3, "va": _3, "varese": _3, "vb": _3, "vc": _3, "ve": _3, "venezia": _3, "venice": _3, "verbania": _3, "vercelli": _3, "verona": _3, "vi": _3, "vibo-valentia": _3, "vibovalentia": _3, "vicenza": _3, "viterbo": _3, "vr": _3, "vs": _3, "vt": _3, "vv": _3, "12chars": _4, "ibxos": _4, "iliadboxos": _4, "neen": [0, { "jc": _4 }], "123homepage": _4, "16-b": _4, "32-b": _4, "64-b": _4, "myspreadshop": _4, "syncloud": _4 }], "je": [1, { "co": _3, "net": _3, "org": _3, "of": _4 }], "jm": _18, "jo": [1, { "agri": _3, "ai": _3, "com": _3, "edu": _3, "eng": _3, "fm": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "per": _3, "phd": _3, "sch": _3, "tv": _3 }], "jobs": _3, "jp": [1, { "ac": _3, "ad": _3, "co": _3, "ed": _3, "go": _3, "gr": _3, "lg": _3, "ne": [1, { "aseinet": _50, "gehirn": _4, "ivory": _4, "mail-box": _4, "mints": _4, "mokuren": _4, "opal": _4, "sakura": _4, "sumomo": _4, "topaz": _4 }], "or": _3, "aichi": [1, { "aisai": _3, "ama": _3, "anjo": _3, "asuke": _3, "chiryu": _3, "chita": _3, "fuso": _3, "gamagori": _3, "handa": _3, "hazu": _3, "hekinan": _3, "higashiura": _3, "ichinomiya": _3, "inazawa": _3, "inuyama": _3, "isshiki": _3, "iwakura": _3, "kanie": _3, "kariya": _3, "kasugai": _3, "kira": _3, "kiyosu": _3, "komaki": _3, "konan": _3, "kota": _3, "mihama": _3, "miyoshi": _3, "nishio": _3, "nisshin": _3, "obu": _3, "oguchi": _3, "oharu": _3, "okazaki": _3, "owariasahi": _3, "seto": _3, "shikatsu": _3, "shinshiro": _3, "shitara": _3, "tahara": _3, "takahama": _3, "tobishima": _3, "toei": _3, "togo": _3, "tokai": _3, "tokoname": _3, "toyoake": _3, "toyohashi": _3, "toyokawa": _3, "toyone": _3, "toyota": _3, "tsushima": _3, "yatomi": _3 }], "akita": [1, { "akita": _3, "daisen": _3, "fujisato": _3, "gojome": _3, "hachirogata": _3, "happou": _3, "higashinaruse": _3, "honjo": _3, "honjyo": _3, "ikawa": _3, "kamikoani": _3, "kamioka": _3, "katagami": _3, "kazuno": _3, "kitaakita": _3, "kosaka": _3, "kyowa": _3, "misato": _3, "mitane": _3, "moriyoshi": _3, "nikaho": _3, "noshiro": _3, "odate": _3, "oga": _3, "ogata": _3, "semboku": _3, "yokote": _3, "yurihonjo": _3 }], "aomori": [1, { "aomori": _3, "gonohe": _3, "hachinohe": _3, "hashikami": _3, "hiranai": _3, "hirosaki": _3, "itayanagi": _3, "kuroishi": _3, "misawa": _3, "mutsu": _3, "nakadomari": _3, "noheji": _3, "oirase": _3, "owani": _3, "rokunohe": _3, "sannohe": _3, "shichinohe": _3, "shingo": _3, "takko": _3, "towada": _3, "tsugaru": _3, "tsuruta": _3 }], "chiba": [1, { "abiko": _3, "asahi": _3, "chonan": _3, "chosei": _3, "choshi": _3, "chuo": _3, "funabashi": _3, "futtsu": _3, "hanamigawa": _3, "ichihara": _3, "ichikawa": _3, "ichinomiya": _3, "inzai": _3, "isumi": _3, "kamagaya": _3, "kamogawa": _3, "kashiwa": _3, "katori": _3, "katsuura": _3, "kimitsu": _3, "kisarazu": _3, "kozaki": _3, "kujukuri": _3, "kyonan": _3, "matsudo": _3, "midori": _3, "mihama": _3, "minamiboso": _3, "mobara": _3, "mutsuzawa": _3, "nagara": _3, "nagareyama": _3, "narashino": _3, "narita": _3, "noda": _3, "oamishirasato": _3, "omigawa": _3, "onjuku": _3, "otaki": _3, "sakae": _3, "sakura": _3, "shimofusa": _3, "shirako": _3, "shiroi": _3, "shisui": _3, "sodegaura": _3, "sosa": _3, "tako": _3, "tateyama": _3, "togane": _3, "tohnosho": _3, "tomisato": _3, "urayasu": _3, "yachimata": _3, "yachiyo": _3, "yokaichiba": _3, "yokoshibahikari": _3, "yotsukaido": _3 }], "ehime": [1, { "ainan": _3, "honai": _3, "ikata": _3, "imabari": _3, "iyo": _3, "kamijima": _3, "kihoku": _3, "kumakogen": _3, "masaki": _3, "matsuno": _3, "matsuyama": _3, "namikata": _3, "niihama": _3, "ozu": _3, "saijo": _3, "seiyo": _3, "shikokuchuo": _3, "tobe": _3, "toon": _3, "uchiko": _3, "uwajima": _3, "yawatahama": _3 }], "fukui": [1, { "echizen": _3, "eiheiji": _3, "fukui": _3, "ikeda": _3, "katsuyama": _3, "mihama": _3, "minamiechizen": _3, "obama": _3, "ohi": _3, "ono": _3, "sabae": _3, "sakai": _3, "takahama": _3, "tsuruga": _3, "wakasa": _3 }], "fukuoka": [1, { "ashiya": _3, "buzen": _3, "chikugo": _3, "chikuho": _3, "chikujo": _3, "chikushino": _3, "chikuzen": _3, "chuo": _3, "dazaifu": _3, "fukuchi": _3, "hakata": _3, "higashi": _3, "hirokawa": _3, "hisayama": _3, "iizuka": _3, "inatsuki": _3, "kaho": _3, "kasuga": _3, "kasuya": _3, "kawara": _3, "keisen": _3, "koga": _3, "kurate": _3, "kurogi": _3, "kurume": _3, "minami": _3, "miyako": _3, "miyama": _3, "miyawaka": _3, "mizumaki": _3, "munakata": _3, "nakagawa": _3, "nakama": _3, "nishi": _3, "nogata": _3, "ogori": _3, "okagaki": _3, "okawa": _3, "oki": _3, "omuta": _3, "onga": _3, "onojo": _3, "oto": _3, "saigawa": _3, "sasaguri": _3, "shingu": _3, "shinyoshitomi": _3, "shonai": _3, "soeda": _3, "sue": _3, "tachiarai": _3, "tagawa": _3, "takata": _3, "toho": _3, "toyotsu": _3, "tsuiki": _3, "ukiha": _3, "umi": _3, "usui": _3, "yamada": _3, "yame": _3, "yanagawa": _3, "yukuhashi": _3 }], "fukushima": [1, { "aizubange": _3, "aizumisato": _3, "aizuwakamatsu": _3, "asakawa": _3, "bandai": _3, "date": _3, "fukushima": _3, "furudono": _3, "futaba": _3, "hanawa": _3, "higashi": _3, "hirata": _3, "hirono": _3, "iitate": _3, "inawashiro": _3, "ishikawa": _3, "iwaki": _3, "izumizaki": _3, "kagamiishi": _3, "kaneyama": _3, "kawamata": _3, "kitakata": _3, "kitashiobara": _3, "koori": _3, "koriyama": _3, "kunimi": _3, "miharu": _3, "mishima": _3, "namie": _3, "nango": _3, "nishiaizu": _3, "nishigo": _3, "okuma": _3, "omotego": _3, "ono": _3, "otama": _3, "samegawa": _3, "shimogo": _3, "shirakawa": _3, "showa": _3, "soma": _3, "sukagawa": _3, "taishin": _3, "tamakawa": _3, "tanagura": _3, "tenei": _3, "yabuki": _3, "yamato": _3, "yamatsuri": _3, "yanaizu": _3, "yugawa": _3 }], "gifu": [1, { "anpachi": _3, "ena": _3, "gifu": _3, "ginan": _3, "godo": _3, "gujo": _3, "hashima": _3, "hichiso": _3, "hida": _3, "higashishirakawa": _3, "ibigawa": _3, "ikeda": _3, "kakamigahara": _3, "kani": _3, "kasahara": _3, "kasamatsu": _3, "kawaue": _3, "kitagata": _3, "mino": _3, "minokamo": _3, "mitake": _3, "mizunami": _3, "motosu": _3, "nakatsugawa": _3, "ogaki": _3, "sakahogi": _3, "seki": _3, "sekigahara": _3, "shirakawa": _3, "tajimi": _3, "takayama": _3, "tarui": _3, "toki": _3, "tomika": _3, "wanouchi": _3, "yamagata": _3, "yaotsu": _3, "yoro": _3 }], "gunma": [1, { "annaka": _3, "chiyoda": _3, "fujioka": _3, "higashiagatsuma": _3, "isesaki": _3, "itakura": _3, "kanna": _3, "kanra": _3, "katashina": _3, "kawaba": _3, "kiryu": _3, "kusatsu": _3, "maebashi": _3, "meiwa": _3, "midori": _3, "minakami": _3, "naganohara": _3, "nakanojo": _3, "nanmoku": _3, "numata": _3, "oizumi": _3, "ora": _3, "ota": _3, "shibukawa": _3, "shimonita": _3, "shinto": _3, "showa": _3, "takasaki": _3, "takayama": _3, "tamamura": _3, "tatebayashi": _3, "tomioka": _3, "tsukiyono": _3, "tsumagoi": _3, "ueno": _3, "yoshioka": _3 }], "hiroshima": [1, { "asaminami": _3, "daiwa": _3, "etajima": _3, "fuchu": _3, "fukuyama": _3, "hatsukaichi": _3, "higashihiroshima": _3, "hongo": _3, "jinsekikogen": _3, "kaita": _3, "kui": _3, "kumano": _3, "kure": _3, "mihara": _3, "miyoshi": _3, "naka": _3, "onomichi": _3, "osakikamijima": _3, "otake": _3, "saka": _3, "sera": _3, "seranishi": _3, "shinichi": _3, "shobara": _3, "takehara": _3 }], "hokkaido": [1, { "abashiri": _3, "abira": _3, "aibetsu": _3, "akabira": _3, "akkeshi": _3, "asahikawa": _3, "ashibetsu": _3, "ashoro": _3, "assabu": _3, "atsuma": _3, "bibai": _3, "biei": _3, "bifuka": _3, "bihoro": _3, "biratori": _3, "chippubetsu": _3, "chitose": _3, "date": _3, "ebetsu": _3, "embetsu": _3, "eniwa": _3, "erimo": _3, "esan": _3, "esashi": _3, "fukagawa": _3, "fukushima": _3, "furano": _3, "furubira": _3, "haboro": _3, "hakodate": _3, "hamatonbetsu": _3, "hidaka": _3, "higashikagura": _3, "higashikawa": _3, "hiroo": _3, "hokuryu": _3, "hokuto": _3, "honbetsu": _3, "horokanai": _3, "horonobe": _3, "ikeda": _3, "imakane": _3, "ishikari": _3, "iwamizawa": _3, "iwanai": _3, "kamifurano": _3, "kamikawa": _3, "kamishihoro": _3, "kamisunagawa": _3, "kamoenai": _3, "kayabe": _3, "kembuchi": _3, "kikonai": _3, "kimobetsu": _3, "kitahiroshima": _3, "kitami": _3, "kiyosato": _3, "koshimizu": _3, "kunneppu": _3, "kuriyama": _3, "kuromatsunai": _3, "kushiro": _3, "kutchan": _3, "kyowa": _3, "mashike": _3, "matsumae": _3, "mikasa": _3, "minamifurano": _3, "mombetsu": _3, "moseushi": _3, "mukawa": _3, "muroran": _3, "naie": _3, "nakagawa": _3, "nakasatsunai": _3, "nakatombetsu": _3, "nanae": _3, "nanporo": _3, "nayoro": _3, "nemuro": _3, "niikappu": _3, "niki": _3, "nishiokoppe": _3, "noboribetsu": _3, "numata": _3, "obihiro": _3, "obira": _3, "oketo": _3, "okoppe": _3, "otaru": _3, "otobe": _3, "otofuke": _3, "otoineppu": _3, "oumu": _3, "ozora": _3, "pippu": _3, "rankoshi": _3, "rebun": _3, "rikubetsu": _3, "rishiri": _3, "rishirifuji": _3, "saroma": _3, "sarufutsu": _3, "shakotan": _3, "shari": _3, "shibecha": _3, "shibetsu": _3, "shikabe": _3, "shikaoi": _3, "shimamaki": _3, "shimizu": _3, "shimokawa": _3, "shinshinotsu": _3, "shintoku": _3, "shiranuka": _3, "shiraoi": _3, "shiriuchi": _3, "sobetsu": _3, "sunagawa": _3, "taiki": _3, "takasu": _3, "takikawa": _3, "takinoue": _3, "teshikaga": _3, "tobetsu": _3, "tohma": _3, "tomakomai": _3, "tomari": _3, "toya": _3, "toyako": _3, "toyotomi": _3, "toyoura": _3, "tsubetsu": _3, "tsukigata": _3, "urakawa": _3, "urausu": _3, "uryu": _3, "utashinai": _3, "wakkanai": _3, "wassamu": _3, "yakumo": _3, "yoichi": _3 }], "hyogo": [1, { "aioi": _3, "akashi": _3, "ako": _3, "amagasaki": _3, "aogaki": _3, "asago": _3, "ashiya": _3, "awaji": _3, "fukusaki": _3, "goshiki": _3, "harima": _3, "himeji": _3, "ichikawa": _3, "inagawa": _3, "itami": _3, "kakogawa": _3, "kamigori": _3, "kamikawa": _3, "kasai": _3, "kasuga": _3, "kawanishi": _3, "miki": _3, "minamiawaji": _3, "nishinomiya": _3, "nishiwaki": _3, "ono": _3, "sanda": _3, "sannan": _3, "sasayama": _3, "sayo": _3, "shingu": _3, "shinonsen": _3, "shiso": _3, "sumoto": _3, "taishi": _3, "taka": _3, "takarazuka": _3, "takasago": _3, "takino": _3, "tamba": _3, "tatsuno": _3, "toyooka": _3, "yabu": _3, "yashiro": _3, "yoka": _3, "yokawa": _3 }], "ibaraki": [1, { "ami": _3, "asahi": _3, "bando": _3, "chikusei": _3, "daigo": _3, "fujishiro": _3, "hitachi": _3, "hitachinaka": _3, "hitachiomiya": _3, "hitachiota": _3, "ibaraki": _3, "ina": _3, "inashiki": _3, "itako": _3, "iwama": _3, "joso": _3, "kamisu": _3, "kasama": _3, "kashima": _3, "kasumigaura": _3, "koga": _3, "miho": _3, "mito": _3, "moriya": _3, "naka": _3, "namegata": _3, "oarai": _3, "ogawa": _3, "omitama": _3, "ryugasaki": _3, "sakai": _3, "sakuragawa": _3, "shimodate": _3, "shimotsuma": _3, "shirosato": _3, "sowa": _3, "suifu": _3, "takahagi": _3, "tamatsukuri": _3, "tokai": _3, "tomobe": _3, "tone": _3, "toride": _3, "tsuchiura": _3, "tsukuba": _3, "uchihara": _3, "ushiku": _3, "yachiyo": _3, "yamagata": _3, "yawara": _3, "yuki": _3 }], "ishikawa": [1, { "anamizu": _3, "hakui": _3, "hakusan": _3, "kaga": _3, "kahoku": _3, "kanazawa": _3, "kawakita": _3, "komatsu": _3, "nakanoto": _3, "nanao": _3, "nomi": _3, "nonoichi": _3, "noto": _3, "shika": _3, "suzu": _3, "tsubata": _3, "tsurugi": _3, "uchinada": _3, "wajima": _3 }], "iwate": [1, { "fudai": _3, "fujisawa": _3, "hanamaki": _3, "hiraizumi": _3, "hirono": _3, "ichinohe": _3, "ichinoseki": _3, "iwaizumi": _3, "iwate": _3, "joboji": _3, "kamaishi": _3, "kanegasaki": _3, "karumai": _3, "kawai": _3, "kitakami": _3, "kuji": _3, "kunohe": _3, "kuzumaki": _3, "miyako": _3, "mizusawa": _3, "morioka": _3, "ninohe": _3, "noda": _3, "ofunato": _3, "oshu": _3, "otsuchi": _3, "rikuzentakata": _3, "shiwa": _3, "shizukuishi": _3, "sumita": _3, "tanohata": _3, "tono": _3, "yahaba": _3, "yamada": _3 }], "kagawa": [1, { "ayagawa": _3, "higashikagawa": _3, "kanonji": _3, "kotohira": _3, "manno": _3, "marugame": _3, "mitoyo": _3, "naoshima": _3, "sanuki": _3, "tadotsu": _3, "takamatsu": _3, "tonosho": _3, "uchinomi": _3, "utazu": _3, "zentsuji": _3 }], "kagoshima": [1, { "akune": _3, "amami": _3, "hioki": _3, "isa": _3, "isen": _3, "izumi": _3, "kagoshima": _3, "kanoya": _3, "kawanabe": _3, "kinko": _3, "kouyama": _3, "makurazaki": _3, "matsumoto": _3, "minamitane": _3, "nakatane": _3, "nishinoomote": _3, "satsumasendai": _3, "soo": _3, "tarumizu": _3, "yusui": _3 }], "kanagawa": [1, { "aikawa": _3, "atsugi": _3, "ayase": _3, "chigasaki": _3, "ebina": _3, "fujisawa": _3, "hadano": _3, "hakone": _3, "hiratsuka": _3, "isehara": _3, "kaisei": _3, "kamakura": _3, "kiyokawa": _3, "matsuda": _3, "minamiashigara": _3, "miura": _3, "nakai": _3, "ninomiya": _3, "odawara": _3, "oi": _3, "oiso": _3, "sagamihara": _3, "samukawa": _3, "tsukui": _3, "yamakita": _3, "yamato": _3, "yokosuka": _3, "yugawara": _3, "zama": _3, "zushi": _3 }], "kochi": [1, { "aki": _3, "geisei": _3, "hidaka": _3, "higashitsuno": _3, "ino": _3, "kagami": _3, "kami": _3, "kitagawa": _3, "kochi": _3, "mihara": _3, "motoyama": _3, "muroto": _3, "nahari": _3, "nakamura": _3, "nankoku": _3, "nishitosa": _3, "niyodogawa": _3, "ochi": _3, "okawa": _3, "otoyo": _3, "otsuki": _3, "sakawa": _3, "sukumo": _3, "susaki": _3, "tosa": _3, "tosashimizu": _3, "toyo": _3, "tsuno": _3, "umaji": _3, "yasuda": _3, "yusuhara": _3 }], "kumamoto": [1, { "amakusa": _3, "arao": _3, "aso": _3, "choyo": _3, "gyokuto": _3, "kamiamakusa": _3, "kikuchi": _3, "kumamoto": _3, "mashiki": _3, "mifune": _3, "minamata": _3, "minamioguni": _3, "nagasu": _3, "nishihara": _3, "oguni": _3, "ozu": _3, "sumoto": _3, "takamori": _3, "uki": _3, "uto": _3, "yamaga": _3, "yamato": _3, "yatsushiro": _3 }], "kyoto": [1, { "ayabe": _3, "fukuchiyama": _3, "higashiyama": _3, "ide": _3, "ine": _3, "joyo": _3, "kameoka": _3, "kamo": _3, "kita": _3, "kizu": _3, "kumiyama": _3, "kyotamba": _3, "kyotanabe": _3, "kyotango": _3, "maizuru": _3, "minami": _3, "minamiyamashiro": _3, "miyazu": _3, "muko": _3, "nagaokakyo": _3, "nakagyo": _3, "nantan": _3, "oyamazaki": _3, "sakyo": _3, "seika": _3, "tanabe": _3, "uji": _3, "ujitawara": _3, "wazuka": _3, "yamashina": _3, "yawata": _3 }], "mie": [1, { "asahi": _3, "inabe": _3, "ise": _3, "kameyama": _3, "kawagoe": _3, "kiho": _3, "kisosaki": _3, "kiwa": _3, "komono": _3, "kumano": _3, "kuwana": _3, "matsusaka": _3, "meiwa": _3, "mihama": _3, "minamiise": _3, "misugi": _3, "miyama": _3, "nabari": _3, "shima": _3, "suzuka": _3, "tado": _3, "taiki": _3, "taki": _3, "tamaki": _3, "toba": _3, "tsu": _3, "udono": _3, "ureshino": _3, "watarai": _3, "yokkaichi": _3 }], "miyagi": [1, { "furukawa": _3, "higashimatsushima": _3, "ishinomaki": _3, "iwanuma": _3, "kakuda": _3, "kami": _3, "kawasaki": _3, "marumori": _3, "matsushima": _3, "minamisanriku": _3, "misato": _3, "murata": _3, "natori": _3, "ogawara": _3, "ohira": _3, "onagawa": _3, "osaki": _3, "rifu": _3, "semine": _3, "shibata": _3, "shichikashuku": _3, "shikama": _3, "shiogama": _3, "shiroishi": _3, "tagajo": _3, "taiwa": _3, "tome": _3, "tomiya": _3, "wakuya": _3, "watari": _3, "yamamoto": _3, "zao": _3 }], "miyazaki": [1, { "aya": _3, "ebino": _3, "gokase": _3, "hyuga": _3, "kadogawa": _3, "kawaminami": _3, "kijo": _3, "kitagawa": _3, "kitakata": _3, "kitaura": _3, "kobayashi": _3, "kunitomi": _3, "kushima": _3, "mimata": _3, "miyakonojo": _3, "miyazaki": _3, "morotsuka": _3, "nichinan": _3, "nishimera": _3, "nobeoka": _3, "saito": _3, "shiiba": _3, "shintomi": _3, "takaharu": _3, "takanabe": _3, "takazaki": _3, "tsuno": _3 }], "nagano": [1, { "achi": _3, "agematsu": _3, "anan": _3, "aoki": _3, "asahi": _3, "azumino": _3, "chikuhoku": _3, "chikuma": _3, "chino": _3, "fujimi": _3, "hakuba": _3, "hara": _3, "hiraya": _3, "iida": _3, "iijima": _3, "iiyama": _3, "iizuna": _3, "ikeda": _3, "ikusaka": _3, "ina": _3, "karuizawa": _3, "kawakami": _3, "kiso": _3, "kisofukushima": _3, "kitaaiki": _3, "komagane": _3, "komoro": _3, "matsukawa": _3, "matsumoto": _3, "miasa": _3, "minamiaiki": _3, "minamimaki": _3, "minamiminowa": _3, "minowa": _3, "miyada": _3, "miyota": _3, "mochizuki": _3, "nagano": _3, "nagawa": _3, "nagiso": _3, "nakagawa": _3, "nakano": _3, "nozawaonsen": _3, "obuse": _3, "ogawa": _3, "okaya": _3, "omachi": _3, "omi": _3, "ookuwa": _3, "ooshika": _3, "otaki": _3, "otari": _3, "sakae": _3, "sakaki": _3, "saku": _3, "sakuho": _3, "shimosuwa": _3, "shinanomachi": _3, "shiojiri": _3, "suwa": _3, "suzaka": _3, "takagi": _3, "takamori": _3, "takayama": _3, "tateshina": _3, "tatsuno": _3, "togakushi": _3, "togura": _3, "tomi": _3, "ueda": _3, "wada": _3, "yamagata": _3, "yamanouchi": _3, "yasaka": _3, "yasuoka": _3 }], "nagasaki": [1, { "chijiwa": _3, "futsu": _3, "goto": _3, "hasami": _3, "hirado": _3, "iki": _3, "isahaya": _3, "kawatana": _3, "kuchinotsu": _3, "matsuura": _3, "nagasaki": _3, "obama": _3, "omura": _3, "oseto": _3, "saikai": _3, "sasebo": _3, "seihi": _3, "shimabara": _3, "shinkamigoto": _3, "togitsu": _3, "tsushima": _3, "unzen": _3 }], "nara": [1, { "ando": _3, "gose": _3, "heguri": _3, "higashiyoshino": _3, "ikaruga": _3, "ikoma": _3, "kamikitayama": _3, "kanmaki": _3, "kashiba": _3, "kashihara": _3, "katsuragi": _3, "kawai": _3, "kawakami": _3, "kawanishi": _3, "koryo": _3, "kurotaki": _3, "mitsue": _3, "miyake": _3, "nara": _3, "nosegawa": _3, "oji": _3, "ouda": _3, "oyodo": _3, "sakurai": _3, "sango": _3, "shimoichi": _3, "shimokitayama": _3, "shinjo": _3, "soni": _3, "takatori": _3, "tawaramoto": _3, "tenkawa": _3, "tenri": _3, "uda": _3, "yamatokoriyama": _3, "yamatotakada": _3, "yamazoe": _3, "yoshino": _3 }], "niigata": [1, { "aga": _3, "agano": _3, "gosen": _3, "itoigawa": _3, "izumozaki": _3, "joetsu": _3, "kamo": _3, "kariwa": _3, "kashiwazaki": _3, "minamiuonuma": _3, "mitsuke": _3, "muika": _3, "murakami": _3, "myoko": _3, "nagaoka": _3, "niigata": _3, "ojiya": _3, "omi": _3, "sado": _3, "sanjo": _3, "seiro": _3, "seirou": _3, "sekikawa": _3, "shibata": _3, "tagami": _3, "tainai": _3, "tochio": _3, "tokamachi": _3, "tsubame": _3, "tsunan": _3, "uonuma": _3, "yahiko": _3, "yoita": _3, "yuzawa": _3 }], "oita": [1, { "beppu": _3, "bungoono": _3, "bungotakada": _3, "hasama": _3, "hiji": _3, "himeshima": _3, "hita": _3, "kamitsue": _3, "kokonoe": _3, "kuju": _3, "kunisaki": _3, "kusu": _3, "oita": _3, "saiki": _3, "taketa": _3, "tsukumi": _3, "usa": _3, "usuki": _3, "yufu": _3 }], "okayama": [1, { "akaiwa": _3, "asakuchi": _3, "bizen": _3, "hayashima": _3, "ibara": _3, "kagamino": _3, "kasaoka": _3, "kibichuo": _3, "kumenan": _3, "kurashiki": _3, "maniwa": _3, "misaki": _3, "nagi": _3, "niimi": _3, "nishiawakura": _3, "okayama": _3, "satosho": _3, "setouchi": _3, "shinjo": _3, "shoo": _3, "soja": _3, "takahashi": _3, "tamano": _3, "tsuyama": _3, "wake": _3, "yakage": _3 }], "okinawa": [1, { "aguni": _3, "ginowan": _3, "ginoza": _3, "gushikami": _3, "haebaru": _3, "higashi": _3, "hirara": _3, "iheya": _3, "ishigaki": _3, "ishikawa": _3, "itoman": _3, "izena": _3, "kadena": _3, "kin": _3, "kitadaito": _3, "kitanakagusuku": _3, "kumejima": _3, "kunigami": _3, "minamidaito": _3, "motobu": _3, "nago": _3, "naha": _3, "nakagusuku": _3, "nakijin": _3, "nanjo": _3, "nishihara": _3, "ogimi": _3, "okinawa": _3, "onna": _3, "shimoji": _3, "taketomi": _3, "tarama": _3, "tokashiki": _3, "tomigusuku": _3, "tonaki": _3, "urasoe": _3, "uruma": _3, "yaese": _3, "yomitan": _3, "yonabaru": _3, "yonaguni": _3, "zamami": _3 }], "osaka": [1, { "abeno": _3, "chihayaakasaka": _3, "chuo": _3, "daito": _3, "fujiidera": _3, "habikino": _3, "hannan": _3, "higashiosaka": _3, "higashisumiyoshi": _3, "higashiyodogawa": _3, "hirakata": _3, "ibaraki": _3, "ikeda": _3, "izumi": _3, "izumiotsu": _3, "izumisano": _3, "kadoma": _3, "kaizuka": _3, "kanan": _3, "kashiwara": _3, "katano": _3, "kawachinagano": _3, "kishiwada": _3, "kita": _3, "kumatori": _3, "matsubara": _3, "minato": _3, "minoh": _3, "misaki": _3, "moriguchi": _3, "neyagawa": _3, "nishi": _3, "nose": _3, "osakasayama": _3, "sakai": _3, "sayama": _3, "sennan": _3, "settsu": _3, "shijonawate": _3, "shimamoto": _3, "suita": _3, "tadaoka": _3, "taishi": _3, "tajiri": _3, "takaishi": _3, "takatsuki": _3, "tondabayashi": _3, "toyonaka": _3, "toyono": _3, "yao": _3 }], "saga": [1, { "ariake": _3, "arita": _3, "fukudomi": _3, "genkai": _3, "hamatama": _3, "hizen": _3, "imari": _3, "kamimine": _3, "kanzaki": _3, "karatsu": _3, "kashima": _3, "kitagata": _3, "kitahata": _3, "kiyama": _3, "kouhoku": _3, "kyuragi": _3, "nishiarita": _3, "ogi": _3, "omachi": _3, "ouchi": _3, "saga": _3, "shiroishi": _3, "taku": _3, "tara": _3, "tosu": _3, "yoshinogari": _3 }], "saitama": [1, { "arakawa": _3, "asaka": _3, "chichibu": _3, "fujimi": _3, "fujimino": _3, "fukaya": _3, "hanno": _3, "hanyu": _3, "hasuda": _3, "hatogaya": _3, "hatoyama": _3, "hidaka": _3, "higashichichibu": _3, "higashimatsuyama": _3, "honjo": _3, "ina": _3, "iruma": _3, "iwatsuki": _3, "kamiizumi": _3, "kamikawa": _3, "kamisato": _3, "kasukabe": _3, "kawagoe": _3, "kawaguchi": _3, "kawajima": _3, "kazo": _3, "kitamoto": _3, "koshigaya": _3, "kounosu": _3, "kuki": _3, "kumagaya": _3, "matsubushi": _3, "minano": _3, "misato": _3, "miyashiro": _3, "miyoshi": _3, "moroyama": _3, "nagatoro": _3, "namegawa": _3, "niiza": _3, "ogano": _3, "ogawa": _3, "ogose": _3, "okegawa": _3, "omiya": _3, "otaki": _3, "ranzan": _3, "ryokami": _3, "saitama": _3, "sakado": _3, "satte": _3, "sayama": _3, "shiki": _3, "shiraoka": _3, "soka": _3, "sugito": _3, "toda": _3, "tokigawa": _3, "tokorozawa": _3, "tsurugashima": _3, "urawa": _3, "warabi": _3, "yashio": _3, "yokoze": _3, "yono": _3, "yorii": _3, "yoshida": _3, "yoshikawa": _3, "yoshimi": _3 }], "shiga": [1, { "aisho": _3, "gamo": _3, "higashiomi": _3, "hikone": _3, "koka": _3, "konan": _3, "kosei": _3, "koto": _3, "kusatsu": _3, "maibara": _3, "moriyama": _3, "nagahama": _3, "nishiazai": _3, "notogawa": _3, "omihachiman": _3, "otsu": _3, "ritto": _3, "ryuoh": _3, "takashima": _3, "takatsuki": _3, "torahime": _3, "toyosato": _3, "yasu": _3 }], "shimane": [1, { "akagi": _3, "ama": _3, "gotsu": _3, "hamada": _3, "higashiizumo": _3, "hikawa": _3, "hikimi": _3, "izumo": _3, "kakinoki": _3, "masuda": _3, "matsue": _3, "misato": _3, "nishinoshima": _3, "ohda": _3, "okinoshima": _3, "okuizumo": _3, "shimane": _3, "tamayu": _3, "tsuwano": _3, "unnan": _3, "yakumo": _3, "yasugi": _3, "yatsuka": _3 }], "shizuoka": [1, { "arai": _3, "atami": _3, "fuji": _3, "fujieda": _3, "fujikawa": _3, "fujinomiya": _3, "fukuroi": _3, "gotemba": _3, "haibara": _3, "hamamatsu": _3, "higashiizu": _3, "ito": _3, "iwata": _3, "izu": _3, "izunokuni": _3, "kakegawa": _3, "kannami": _3, "kawanehon": _3, "kawazu": _3, "kikugawa": _3, "kosai": _3, "makinohara": _3, "matsuzaki": _3, "minamiizu": _3, "mishima": _3, "morimachi": _3, "nishiizu": _3, "numazu": _3, "omaezaki": _3, "shimada": _3, "shimizu": _3, "shimoda": _3, "shizuoka": _3, "susono": _3, "yaizu": _3, "yoshida": _3 }], "tochigi": [1, { "ashikaga": _3, "bato": _3, "haga": _3, "ichikai": _3, "iwafune": _3, "kaminokawa": _3, "kanuma": _3, "karasuyama": _3, "kuroiso": _3, "mashiko": _3, "mibu": _3, "moka": _3, "motegi": _3, "nasu": _3, "nasushiobara": _3, "nikko": _3, "nishikata": _3, "nogi": _3, "ohira": _3, "ohtawara": _3, "oyama": _3, "sakura": _3, "sano": _3, "shimotsuke": _3, "shioya": _3, "takanezawa": _3, "tochigi": _3, "tsuga": _3, "ujiie": _3, "utsunomiya": _3, "yaita": _3 }], "tokushima": [1, { "aizumi": _3, "anan": _3, "ichiba": _3, "itano": _3, "kainan": _3, "komatsushima": _3, "matsushige": _3, "mima": _3, "minami": _3, "miyoshi": _3, "mugi": _3, "nakagawa": _3, "naruto": _3, "sanagochi": _3, "shishikui": _3, "tokushima": _3, "wajiki": _3 }], "tokyo": [1, { "adachi": _3, "akiruno": _3, "akishima": _3, "aogashima": _3, "arakawa": _3, "bunkyo": _3, "chiyoda": _3, "chofu": _3, "chuo": _3, "edogawa": _3, "fuchu": _3, "fussa": _3, "hachijo": _3, "hachioji": _3, "hamura": _3, "higashikurume": _3, "higashimurayama": _3, "higashiyamato": _3, "hino": _3, "hinode": _3, "hinohara": _3, "inagi": _3, "itabashi": _3, "katsushika": _3, "kita": _3, "kiyose": _3, "kodaira": _3, "koganei": _3, "kokubunji": _3, "komae": _3, "koto": _3, "kouzushima": _3, "kunitachi": _3, "machida": _3, "meguro": _3, "minato": _3, "mitaka": _3, "mizuho": _3, "musashimurayama": _3, "musashino": _3, "nakano": _3, "nerima": _3, "ogasawara": _3, "okutama": _3, "ome": _3, "oshima": _3, "ota": _3, "setagaya": _3, "shibuya": _3, "shinagawa": _3, "shinjuku": _3, "suginami": _3, "sumida": _3, "tachikawa": _3, "taito": _3, "tama": _3, "toshima": _3 }], "tottori": [1, { "chizu": _3, "hino": _3, "kawahara": _3, "koge": _3, "kotoura": _3, "misasa": _3, "nanbu": _3, "nichinan": _3, "sakaiminato": _3, "tottori": _3, "wakasa": _3, "yazu": _3, "yonago": _3 }], "toyama": [1, { "asahi": _3, "fuchu": _3, "fukumitsu": _3, "funahashi": _3, "himi": _3, "imizu": _3, "inami": _3, "johana": _3, "kamiichi": _3, "kurobe": _3, "nakaniikawa": _3, "namerikawa": _3, "nanto": _3, "nyuzen": _3, "oyabe": _3, "taira": _3, "takaoka": _3, "tateyama": _3, "toga": _3, "tonami": _3, "toyama": _3, "unazuki": _3, "uozu": _3, "yamada": _3 }], "wakayama": [1, { "arida": _3, "aridagawa": _3, "gobo": _3, "hashimoto": _3, "hidaka": _3, "hirogawa": _3, "inami": _3, "iwade": _3, "kainan": _3, "kamitonda": _3, "katsuragi": _3, "kimino": _3, "kinokawa": _3, "kitayama": _3, "koya": _3, "koza": _3, "kozagawa": _3, "kudoyama": _3, "kushimoto": _3, "mihama": _3, "misato": _3, "nachikatsuura": _3, "shingu": _3, "shirahama": _3, "taiji": _3, "tanabe": _3, "wakayama": _3, "yuasa": _3, "yura": _3 }], "yamagata": [1, { "asahi": _3, "funagata": _3, "higashine": _3, "iide": _3, "kahoku": _3, "kaminoyama": _3, "kaneyama": _3, "kawanishi": _3, "mamurogawa": _3, "mikawa": _3, "murayama": _3, "nagai": _3, "nakayama": _3, "nanyo": _3, "nishikawa": _3, "obanazawa": _3, "oe": _3, "oguni": _3, "ohkura": _3, "oishida": _3, "sagae": _3, "sakata": _3, "sakegawa": _3, "shinjo": _3, "shirataka": _3, "shonai": _3, "takahata": _3, "tendo": _3, "tozawa": _3, "tsuruoka": _3, "yamagata": _3, "yamanobe": _3, "yonezawa": _3, "yuza": _3 }], "yamaguchi": [1, { "abu": _3, "hagi": _3, "hikari": _3, "hofu": _3, "iwakuni": _3, "kudamatsu": _3, "mitou": _3, "nagato": _3, "oshima": _3, "shimonoseki": _3, "shunan": _3, "tabuse": _3, "tokuyama": _3, "toyota": _3, "ube": _3, "yuu": _3 }], "yamanashi": [1, { "chuo": _3, "doshi": _3, "fuefuki": _3, "fujikawa": _3, "fujikawaguchiko": _3, "fujiyoshida": _3, "hayakawa": _3, "hokuto": _3, "ichikawamisato": _3, "kai": _3, "kofu": _3, "koshu": _3, "kosuge": _3, "minami-alps": _3, "minobu": _3, "nakamichi": _3, "nanbu": _3, "narusawa": _3, "nirasaki": _3, "nishikatsura": _3, "oshino": _3, "otsuki": _3, "showa": _3, "tabayama": _3, "tsuru": _3, "uenohara": _3, "yamanakako": _3, "yamanashi": _3 }], "xn--ehqz56n": _3, "\u4E09\u91CD": _3, "xn--1lqs03n": _3, "\u4EAC\u90FD": _3, "xn--qqqt11m": _3, "\u4F50\u8CC0": _3, "xn--f6qx53a": _3, "\u5175\u5EAB": _3, "xn--djrs72d6uy": _3, "\u5317\u6D77\u9053": _3, "xn--mkru45i": _3, "\u5343\u8449": _3, "xn--0trq7p7nn": _3, "\u548C\u6B4C\u5C71": _3, "xn--5js045d": _3, "\u57FC\u7389": _3, "xn--kbrq7o": _3, "\u5927\u5206": _3, "xn--pssu33l": _3, "\u5927\u962A": _3, "xn--ntsq17g": _3, "\u5948\u826F": _3, "xn--uisz3g": _3, "\u5BAE\u57CE": _3, "xn--6btw5a": _3, "\u5BAE\u5D0E": _3, "xn--1ctwo": _3, "\u5BCC\u5C71": _3, "xn--6orx2r": _3, "\u5C71\u53E3": _3, "xn--rht61e": _3, "\u5C71\u5F62": _3, "xn--rht27z": _3, "\u5C71\u68A8": _3, "xn--nit225k": _3, "\u5C90\u961C": _3, "xn--rht3d": _3, "\u5CA1\u5C71": _3, "xn--djty4k": _3, "\u5CA9\u624B": _3, "xn--klty5x": _3, "\u5CF6\u6839": _3, "xn--kltx9a": _3, "\u5E83\u5CF6": _3, "xn--kltp7d": _3, "\u5FB3\u5CF6": _3, "xn--c3s14m": _3, "\u611B\u5A9B": _3, "xn--vgu402c": _3, "\u611B\u77E5": _3, "xn--efvn9s": _3, "\u65B0\u6F5F": _3, "xn--1lqs71d": _3, "\u6771\u4EAC": _3, "xn--4pvxs": _3, "\u6803\u6728": _3, "xn--uuwu58a": _3, "\u6C96\u7E04": _3, "xn--zbx025d": _3, "\u6ECB\u8CC0": _3, "xn--8pvr4u": _3, "\u718A\u672C": _3, "xn--5rtp49c": _3, "\u77F3\u5DDD": _3, "xn--ntso0iqx3a": _3, "\u795E\u5948\u5DDD": _3, "xn--elqq16h": _3, "\u798F\u4E95": _3, "xn--4it168d": _3, "\u798F\u5CA1": _3, "xn--klt787d": _3, "\u798F\u5CF6": _3, "xn--rny31h": _3, "\u79CB\u7530": _3, "xn--7t0a264c": _3, "\u7FA4\u99AC": _3, "xn--uist22h": _3, "\u8328\u57CE": _3, "xn--8ltr62k": _3, "\u9577\u5D0E": _3, "xn--2m4a15e": _3, "\u9577\u91CE": _3, "xn--32vp30h": _3, "\u9752\u68EE": _3, "xn--4it797k": _3, "\u9759\u5CA1": _3, "xn--5rtq34k": _3, "\u9999\u5DDD": _3, "xn--k7yn95e": _3, "\u9AD8\u77E5": _3, "xn--tor131o": _3, "\u9CE5\u53D6": _3, "xn--d5qv7z876c": _3, "\u9E7F\u5150\u5CF6": _3, "kawasaki": _18, "kitakyushu": _18, "kobe": _18, "nagoya": _18, "sapporo": _18, "sendai": _18, "yokohama": _18, "buyshop": _4, "fashionstore": _4, "handcrafted": _4, "kawaiishop": _4, "supersale": _4, "theshop": _4, "0am": _4, "0g0": _4, "0j0": _4, "0t0": _4, "mydns": _4, "pgw": _4, "wjg": _4, "usercontent": _4, "angry": _4, "babyblue": _4, "babymilk": _4, "backdrop": _4, "bambina": _4, "bitter": _4, "blush": _4, "boo": _4, "boy": _4, "boyfriend": _4, "but": _4, "candypop": _4, "capoo": _4, "catfood": _4, "cheap": _4, "chicappa": _4, "chillout": _4, "chips": _4, "chowder": _4, "chu": _4, "ciao": _4, "cocotte": _4, "coolblog": _4, "cranky": _4, "cutegirl": _4, "daa": _4, "deca": _4, "deci": _4, "digick": _4, "egoism": _4, "fakefur": _4, "fem": _4, "flier": _4, "floppy": _4, "fool": _4, "frenchkiss": _4, "girlfriend": _4, "girly": _4, "gloomy": _4, "gonna": _4, "greater": _4, "hacca": _4, "heavy": _4, "her": _4, "hiho": _4, "hippy": _4, "holy": _4, "hungry": _4, "icurus": _4, "itigo": _4, "jellybean": _4, "kikirara": _4, "kill": _4, "kilo": _4, "kuron": _4, "littlestar": _4, "lolipopmc": _4, "lolitapunk": _4, "lomo": _4, "lovepop": _4, "lovesick": _4, "main": _4, "mods": _4, "mond": _4, "mongolian": _4, "moo": _4, "namaste": _4, "nikita": _4, "nobushi": _4, "noor": _4, "oops": _4, "parallel": _4, "parasite": _4, "pecori": _4, "peewee": _4, "penne": _4, "pepper": _4, "perma": _4, "pigboat": _4, "pinoko": _4, "punyu": _4, "pupu": _4, "pussycat": _4, "pya": _4, "raindrop": _4, "readymade": _4, "sadist": _4, "schoolbus": _4, "secret": _4, "staba": _4, "stripper": _4, "sub": _4, "sunnyday": _4, "thick": _4, "tonkotsu": _4, "under": _4, "upper": _4, "velvet": _4, "verse": _4, "versus": _4, "vivian": _4, "watson": _4, "weblike": _4, "whitesnow": _4, "zombie": _4, "hateblo": _4, "hatenablog": _4, "hatenadiary": _4, "2-d": _4, "bona": _4, "crap": _4, "daynight": _4, "eek": _4, "flop": _4, "halfmoon": _4, "jeez": _4, "matrix": _4, "mimoza": _4, "netgamers": _4, "nyanta": _4, "o0o0": _4, "rdy": _4, "rgr": _4, "rulez": _4, "sakurastorage": [0, { "isk01": _55, "isk02": _55 }], "saloon": _4, "sblo": _4, "skr": _4, "tank": _4, "uh-oh": _4, "undo": _4, "webaccel": [0, { "rs": _4, "user": _4 }], "websozai": _4, "xii": _4 }], "ke": [1, { "ac": _3, "co": _3, "go": _3, "info": _3, "me": _3, "mobi": _3, "ne": _3, "or": _3, "sc": _3 }], "kg": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "us": _4 }], "kh": _18, "ki": _56, "km": [1, { "ass": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "nom": _3, "org": _3, "prd": _3, "tm": _3, "asso": _3, "coop": _3, "gouv": _3, "medecin": _3, "notaires": _3, "pharmaciens": _3, "presse": _3, "veterinaire": _3 }], "kn": [1, { "edu": _3, "gov": _3, "net": _3, "org": _3 }], "kp": [1, { "com": _3, "edu": _3, "gov": _3, "org": _3, "rep": _3, "tra": _3 }], "kr": [1, { "ac": _3, "ai": _3, "co": _3, "es": _3, "go": _3, "hs": _3, "io": _3, "it": _3, "kg": _3, "me": _3, "mil": _3, "ms": _3, "ne": _3, "or": _3, "pe": _3, "re": _3, "sc": _3, "busan": _3, "chungbuk": _3, "chungnam": _3, "daegu": _3, "daejeon": _3, "gangwon": _3, "gwangju": _3, "gyeongbuk": _3, "gyeonggi": _3, "gyeongnam": _3, "incheon": _3, "jeju": _3, "jeonbuk": _3, "jeonnam": _3, "seoul": _3, "ulsan": _3, "c01": _4, "eliv-dns": _4 }], "kw": [1, { "com": _3, "edu": _3, "emb": _3, "gov": _3, "ind": _3, "net": _3, "org": _3 }], "ky": _45, "kz": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "jcloud": _4 }], "la": [1, { "com": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "net": _3, "org": _3, "per": _3, "bnr": _4 }], "lb": _5, "lc": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "oy": _4 }], "li": _3, "lk": [1, { "ac": _3, "assn": _3, "com": _3, "edu": _3, "gov": _3, "grp": _3, "hotel": _3, "int": _3, "ltd": _3, "net": _3, "ngo": _3, "org": _3, "sch": _3, "soc": _3, "web": _3 }], "lr": _5, "ls": [1, { "ac": _3, "biz": _3, "co": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3, "sc": _3 }], "lt": _11, "lu": [1, { "123website": _4 }], "lv": [1, { "asn": _3, "com": _3, "conf": _3, "edu": _3, "gov": _3, "id": _3, "mil": _3, "net": _3, "org": _3 }], "ly": [1, { "com": _3, "edu": _3, "gov": _3, "id": _3, "med": _3, "net": _3, "org": _3, "plc": _3, "sch": _3 }], "ma": [1, { "ac": _3, "co": _3, "gov": _3, "net": _3, "org": _3, "press": _3 }], "mc": [1, { "asso": _3, "tm": _3 }], "md": [1, { "ir": _4 }], "me": [1, { "ac": _3, "co": _3, "edu": _3, "gov": _3, "its": _3, "net": _3, "org": _3, "priv": _3, "c66": _4, "craft": _4, "edgestack": _4, "filegear": _4, "glitch": _4, "filegear-sg": _4, "lohmus": _4, "barsy": _4, "mcdir": _4, "brasilia": _4, "ddns": _4, "dnsfor": _4, "hopto": _4, "loginto": _4, "noip": _4, "webhop": _4, "soundcast": _4, "tcp4": _4, "vp4": _4, "diskstation": _4, "dscloud": _4, "i234": _4, "myds": _4, "synology": _4, "transip": _44, "nohost": _4 }], "mg": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "nom": _3, "org": _3, "prd": _3 }], "mh": _3, "mil": _3, "mk": [1, { "com": _3, "edu": _3, "gov": _3, "inf": _3, "name": _3, "net": _3, "org": _3 }], "ml": [1, { "ac": _3, "art": _3, "asso": _3, "com": _3, "edu": _3, "gouv": _3, "gov": _3, "info": _3, "inst": _3, "net": _3, "org": _3, "pr": _3, "presse": _3 }], "mm": _18, "mn": [1, { "edu": _3, "gov": _3, "org": _3, "nyc": _4 }], "mo": _5, "mobi": [1, { "barsy": _4, "dscloud": _4 }], "mp": [1, { "ju": _4 }], "mq": _3, "mr": _11, "ms": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "minisite": _4 }], "mt": _45, "mu": [1, { "ac": _3, "co": _3, "com": _3, "gov": _3, "net": _3, "or": _3, "org": _3 }], "museum": _3, "mv": [1, { "aero": _3, "biz": _3, "com": _3, "coop": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "museum": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "mw": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "coop": _3, "edu": _3, "gov": _3, "int": _3, "net": _3, "org": _3 }], "mx": [1, { "com": _3, "edu": _3, "gob": _3, "net": _3, "org": _3 }], "my": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "name": _3, "net": _3, "org": _3 }], "mz": [1, { "ac": _3, "adv": _3, "co": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "na": [1, { "alt": _3, "co": _3, "com": _3, "gov": _3, "net": _3, "org": _3 }], "name": [1, { "her": _59, "his": _59 }], "nc": [1, { "asso": _3, "nom": _3 }], "ne": _3, "net": [1, { "adobeaemcloud": _4, "adobeio-static": _4, "adobeioruntime": _4, "akadns": _4, "akamai": _4, "akamai-staging": _4, "akamaiedge": _4, "akamaiedge-staging": _4, "akamaihd": _4, "akamaihd-staging": _4, "akamaiorigin": _4, "akamaiorigin-staging": _4, "akamaized": _4, "akamaized-staging": _4, "edgekey": _4, "edgekey-staging": _4, "edgesuite": _4, "edgesuite-staging": _4, "alwaysdata": _4, "myamaze": _4, "cloudfront": _4, "appudo": _4, "atlassian-dev": [0, { "prod": _52 }], "myfritz": _4, "onavstack": _4, "shopselect": _4, "blackbaudcdn": _4, "boomla": _4, "bplaced": _4, "square7": _4, "cdn77": [0, { "r": _4 }], "cdn77-ssl": _4, "gb": _4, "hu": _4, "jp": _4, "se": _4, "uk": _4, "clickrising": _4, "ddns-ip": _4, "dns-cloud": _4, "dns-dynamic": _4, "cloudaccess": _4, "cloudflare": [2, { "cdn": _4 }], "cloudflareanycast": _52, "cloudflarecn": _52, "cloudflareglobal": _52, "ctfcloud": _4, "feste-ip": _4, "knx-server": _4, "static-access": _4, "cryptonomic": _7, "dattolocal": _4, "mydatto": _4, "debian": _4, "definima": _4, "deno": _4, "at-band-camp": _4, "blogdns": _4, "broke-it": _4, "buyshouses": _4, "dnsalias": _4, "dnsdojo": _4, "does-it": _4, "dontexist": _4, "dynalias": _4, "dynathome": _4, "endofinternet": _4, "from-az": _4, "from-co": _4, "from-la": _4, "from-ny": _4, "gets-it": _4, "ham-radio-op": _4, "homeftp": _4, "homeip": _4, "homelinux": _4, "homeunix": _4, "in-the-band": _4, "is-a-chef": _4, "is-a-geek": _4, "isa-geek": _4, "kicks-ass": _4, "office-on-the": _4, "podzone": _4, "scrapper-site": _4, "selfip": _4, "sells-it": _4, "servebbs": _4, "serveftp": _4, "thruhere": _4, "webhop": _4, "casacam": _4, "dynu": _4, "dynv6": _4, "twmail": _4, "ru": _4, "channelsdvr": [2, { "u": _4 }], "fastly": [0, { "freetls": _4, "map": _4, "prod": [0, { "a": _4, "global": _4 }], "ssl": [0, { "a": _4, "b": _4, "global": _4 }] }], "fastlylb": [2, { "map": _4 }], "edgeapp": _4, "keyword-on": _4, "live-on": _4, "server-on": _4, "cdn-edges": _4, "heteml": _4, "cloudfunctions": _4, "grafana-dev": _4, "iobb": _4, "moonscale": _4, "in-dsl": _4, "in-vpn": _4, "oninferno": _4, "botdash": _4, "apps-1and1": _4, "ipifony": _4, "cloudjiffy": [2, { "fra1-de": _4, "west1-us": _4 }], "elastx": [0, { "jls-sto1": _4, "jls-sto2": _4, "jls-sto3": _4 }], "massivegrid": [0, { "paas": [0, { "fr-1": _4, "lon-1": _4, "lon-2": _4, "ny-1": _4, "ny-2": _4, "sg-1": _4 }] }], "saveincloud": [0, { "jelastic": _4, "nordeste-idc": _4 }], "scaleforce": _46, "kinghost": _4, "uni5": _4, "krellian": _4, "ggff": _4, "localcert": _4, "localhostcert": _4, "localto": _7, "barsy": _4, "memset": _4, "azure-api": _4, "azure-mobile": _4, "azureedge": _4, "azurefd": _4, "azurestaticapps": [2, { "1": _4, "2": _4, "3": _4, "4": _4, "5": _4, "6": _4, "7": _4, "centralus": _4, "eastasia": _4, "eastus2": _4, "westeurope": _4, "westus2": _4 }], "azurewebsites": _4, "cloudapp": _4, "trafficmanager": _4, "windows": [0, { "core": [0, { "blob": _4 }], "servicebus": _4 }], "mynetname": [0, { "sn": _4 }], "routingthecloud": _4, "bounceme": _4, "ddns": _4, "eating-organic": _4, "mydissent": _4, "myeffect": _4, "mymediapc": _4, "mypsx": _4, "mysecuritycamera": _4, "nhlfan": _4, "no-ip": _4, "pgafan": _4, "privatizehealthinsurance": _4, "redirectme": _4, "serveblog": _4, "serveminecraft": _4, "sytes": _4, "dnsup": _4, "hicam": _4, "now-dns": _4, "ownip": _4, "vpndns": _4, "cloudycluster": _4, "ovh": [0, { "hosting": _7, "webpaas": _7 }], "rackmaze": _4, "myradweb": _4, "in": _4, "subsc-pay": _4, "squares": _4, "schokokeks": _4, "firewall-gateway": _4, "seidat": _4, "senseering": _4, "siteleaf": _4, "mafelo": _4, "myspreadshop": _4, "vps-host": [2, { "jelastic": [0, { "atl": _4, "njs": _4, "ric": _4 }] }], "srcf": [0, { "soc": _4, "user": _4 }], "supabase": _4, "dsmynas": _4, "familyds": _4, "ts": [2, { "c": _7 }], "torproject": [2, { "pages": _4 }], "vusercontent": _4, "reserve-online": _4, "community-pro": _4, "meinforum": _4, "yandexcloud": [2, { "storage": _4, "website": _4 }], "za": _4 }], "nf": [1, { "arts": _3, "com": _3, "firm": _3, "info": _3, "net": _3, "other": _3, "per": _3, "rec": _3, "store": _3, "web": _3 }], "ng": [1, { "com": _3, "edu": _3, "gov": _3, "i": _3, "mil": _3, "mobi": _3, "name": _3, "net": _3, "org": _3, "sch": _3, "biz": [2, { "co": _4, "dl": _4, "go": _4, "lg": _4, "on": _4 }], "col": _4, "firm": _4, "gen": _4, "ltd": _4, "ngo": _4, "plc": _4 }], "ni": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "gob": _3, "in": _3, "info": _3, "int": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "web": _3 }], "nl": [1, { "co": _4, "hosting-cluster": _4, "gov": _4, "khplay": _4, "123website": _4, "myspreadshop": _4, "transurl": _7, "cistron": _4, "demon": _4 }], "no": [1, { "fhs": _3, "folkebibl": _3, "fylkesbibl": _3, "idrett": _3, "museum": _3, "priv": _3, "vgs": _3, "dep": _3, "herad": _3, "kommune": _3, "mil": _3, "stat": _3, "aa": _60, "ah": _60, "bu": _60, "fm": _60, "hl": _60, "hm": _60, "jan-mayen": _60, "mr": _60, "nl": _60, "nt": _60, "of": _60, "ol": _60, "oslo": _60, "rl": _60, "sf": _60, "st": _60, "svalbard": _60, "tm": _60, "tr": _60, "va": _60, "vf": _60, "akrehamn": _3, "xn--krehamn-dxa": _3, "\xE5krehamn": _3, "algard": _3, "xn--lgrd-poac": _3, "\xE5lg\xE5rd": _3, "arna": _3, "bronnoysund": _3, "xn--brnnysund-m8ac": _3, "br\xF8nn\xF8ysund": _3, "brumunddal": _3, "bryne": _3, "drobak": _3, "xn--drbak-wua": _3, "dr\xF8bak": _3, "egersund": _3, "fetsund": _3, "floro": _3, "xn--flor-jra": _3, "flor\xF8": _3, "fredrikstad": _3, "hokksund": _3, "honefoss": _3, "xn--hnefoss-q1a": _3, "h\xF8nefoss": _3, "jessheim": _3, "jorpeland": _3, "xn--jrpeland-54a": _3, "j\xF8rpeland": _3, "kirkenes": _3, "kopervik": _3, "krokstadelva": _3, "langevag": _3, "xn--langevg-jxa": _3, "langev\xE5g": _3, "leirvik": _3, "mjondalen": _3, "xn--mjndalen-64a": _3, "mj\xF8ndalen": _3, "mo-i-rana": _3, "mosjoen": _3, "xn--mosjen-eya": _3, "mosj\xF8en": _3, "nesoddtangen": _3, "orkanger": _3, "osoyro": _3, "xn--osyro-wua": _3, "os\xF8yro": _3, "raholt": _3, "xn--rholt-mra": _3, "r\xE5holt": _3, "sandnessjoen": _3, "xn--sandnessjen-ogb": _3, "sandnessj\xF8en": _3, "skedsmokorset": _3, "slattum": _3, "spjelkavik": _3, "stathelle": _3, "stavern": _3, "stjordalshalsen": _3, "xn--stjrdalshalsen-sqb": _3, "stj\xF8rdalshalsen": _3, "tananger": _3, "tranby": _3, "vossevangen": _3, "aarborte": _3, "aejrie": _3, "afjord": _3, "xn--fjord-lra": _3, "\xE5fjord": _3, "agdenes": _3, "akershus": _61, "aknoluokta": _3, "xn--koluokta-7ya57h": _3, "\xE1k\u014Boluokta": _3, "al": _3, "xn--l-1fa": _3, "\xE5l": _3, "alaheadju": _3, "xn--laheadju-7ya": _3, "\xE1laheadju": _3, "alesund": _3, "xn--lesund-hua": _3, "\xE5lesund": _3, "alstahaug": _3, "alta": _3, "xn--lt-liac": _3, "\xE1lt\xE1": _3, "alvdal": _3, "amli": _3, "xn--mli-tla": _3, "\xE5mli": _3, "amot": _3, "xn--mot-tla": _3, "\xE5mot": _3, "andasuolo": _3, "andebu": _3, "andoy": _3, "xn--andy-ira": _3, "and\xF8y": _3, "ardal": _3, "xn--rdal-poa": _3, "\xE5rdal": _3, "aremark": _3, "arendal": _3, "xn--s-1fa": _3, "\xE5s": _3, "aseral": _3, "xn--seral-lra": _3, "\xE5seral": _3, "asker": _3, "askim": _3, "askoy": _3, "xn--asky-ira": _3, "ask\xF8y": _3, "askvoll": _3, "asnes": _3, "xn--snes-poa": _3, "\xE5snes": _3, "audnedaln": _3, "aukra": _3, "aure": _3, "aurland": _3, "aurskog-holand": _3, "xn--aurskog-hland-jnb": _3, "aurskog-h\xF8land": _3, "austevoll": _3, "austrheim": _3, "averoy": _3, "xn--avery-yua": _3, "aver\xF8y": _3, "badaddja": _3, "xn--bdddj-mrabd": _3, "b\xE5d\xE5ddj\xE5": _3, "xn--brum-voa": _3, "b\xE6rum": _3, "bahcavuotna": _3, "xn--bhcavuotna-s4a": _3, "b\xE1hcavuotna": _3, "bahccavuotna": _3, "xn--bhccavuotna-k7a": _3, "b\xE1hccavuotna": _3, "baidar": _3, "xn--bidr-5nac": _3, "b\xE1id\xE1r": _3, "bajddar": _3, "xn--bjddar-pta": _3, "b\xE1jddar": _3, "balat": _3, "xn--blt-elab": _3, "b\xE1l\xE1t": _3, "balestrand": _3, "ballangen": _3, "balsfjord": _3, "bamble": _3, "bardu": _3, "barum": _3, "batsfjord": _3, "xn--btsfjord-9za": _3, "b\xE5tsfjord": _3, "bearalvahki": _3, "xn--bearalvhki-y4a": _3, "bearalv\xE1hki": _3, "beardu": _3, "beiarn": _3, "berg": _3, "bergen": _3, "berlevag": _3, "xn--berlevg-jxa": _3, "berlev\xE5g": _3, "bievat": _3, "xn--bievt-0qa": _3, "biev\xE1t": _3, "bindal": _3, "birkenes": _3, "bjarkoy": _3, "xn--bjarky-fya": _3, "bjark\xF8y": _3, "bjerkreim": _3, "bjugn": _3, "bodo": _3, "xn--bod-2na": _3, "bod\xF8": _3, "bokn": _3, "bomlo": _3, "xn--bmlo-gra": _3, "b\xF8mlo": _3, "bremanger": _3, "bronnoy": _3, "xn--brnny-wuac": _3, "br\xF8nn\xF8y": _3, "budejju": _3, "buskerud": _61, "bygland": _3, "bykle": _3, "cahcesuolo": _3, "xn--hcesuolo-7ya35b": _3, "\u010D\xE1hcesuolo": _3, "davvenjarga": _3, "xn--davvenjrga-y4a": _3, "davvenj\xE1rga": _3, "davvesiida": _3, "deatnu": _3, "dielddanuorri": _3, "divtasvuodna": _3, "divttasvuotna": _3, "donna": _3, "xn--dnna-gra": _3, "d\xF8nna": _3, "dovre": _3, "drammen": _3, "drangedal": _3, "dyroy": _3, "xn--dyry-ira": _3, "dyr\xF8y": _3, "eid": _3, "eidfjord": _3, "eidsberg": _3, "eidskog": _3, "eidsvoll": _3, "eigersund": _3, "elverum": _3, "enebakk": _3, "engerdal": _3, "etne": _3, "etnedal": _3, "evenassi": _3, "xn--eveni-0qa01ga": _3, "even\xE1\u0161\u0161i": _3, "evenes": _3, "evje-og-hornnes": _3, "farsund": _3, "fauske": _3, "fedje": _3, "fet": _3, "finnoy": _3, "xn--finny-yua": _3, "finn\xF8y": _3, "fitjar": _3, "fjaler": _3, "fjell": _3, "fla": _3, "xn--fl-zia": _3, "fl\xE5": _3, "flakstad": _3, "flatanger": _3, "flekkefjord": _3, "flesberg": _3, "flora": _3, "folldal": _3, "forde": _3, "xn--frde-gra": _3, "f\xF8rde": _3, "forsand": _3, "fosnes": _3, "xn--frna-woa": _3, "fr\xE6na": _3, "frana": _3, "frei": _3, "frogn": _3, "froland": _3, "frosta": _3, "froya": _3, "xn--frya-hra": _3, "fr\xF8ya": _3, "fuoisku": _3, "fuossko": _3, "fusa": _3, "fyresdal": _3, "gaivuotna": _3, "xn--givuotna-8ya": _3, "g\xE1ivuotna": _3, "galsa": _3, "xn--gls-elac": _3, "g\xE1ls\xE1": _3, "gamvik": _3, "gangaviika": _3, "xn--ggaviika-8ya47h": _3, "g\xE1\u014Bgaviika": _3, "gaular": _3, "gausdal": _3, "giehtavuoatna": _3, "gildeskal": _3, "xn--gildeskl-g0a": _3, "gildesk\xE5l": _3, "giske": _3, "gjemnes": _3, "gjerdrum": _3, "gjerstad": _3, "gjesdal": _3, "gjovik": _3, "xn--gjvik-wua": _3, "gj\xF8vik": _3, "gloppen": _3, "gol": _3, "gran": _3, "grane": _3, "granvin": _3, "gratangen": _3, "grimstad": _3, "grong": _3, "grue": _3, "gulen": _3, "guovdageaidnu": _3, "ha": _3, "xn--h-2fa": _3, "h\xE5": _3, "habmer": _3, "xn--hbmer-xqa": _3, "h\xE1bmer": _3, "hadsel": _3, "xn--hgebostad-g3a": _3, "h\xE6gebostad": _3, "hagebostad": _3, "halden": _3, "halsa": _3, "hamar": _3, "hamaroy": _3, "hammarfeasta": _3, "xn--hmmrfeasta-s4ac": _3, "h\xE1mm\xE1rfeasta": _3, "hammerfest": _3, "hapmir": _3, "xn--hpmir-xqa": _3, "h\xE1pmir": _3, "haram": _3, "hareid": _3, "harstad": _3, "hasvik": _3, "hattfjelldal": _3, "haugesund": _3, "hedmark": [0, { "os": _3, "valer": _3, "xn--vler-qoa": _3, "v\xE5ler": _3 }], "hemne": _3, "hemnes": _3, "hemsedal": _3, "hitra": _3, "hjartdal": _3, "hjelmeland": _3, "hobol": _3, "xn--hobl-ira": _3, "hob\xF8l": _3, "hof": _3, "hol": _3, "hole": _3, "holmestrand": _3, "holtalen": _3, "xn--holtlen-hxa": _3, "holt\xE5len": _3, "hordaland": [0, { "os": _3 }], "hornindal": _3, "horten": _3, "hoyanger": _3, "xn--hyanger-q1a": _3, "h\xF8yanger": _3, "hoylandet": _3, "xn--hylandet-54a": _3, "h\xF8ylandet": _3, "hurdal": _3, "hurum": _3, "hvaler": _3, "hyllestad": _3, "ibestad": _3, "inderoy": _3, "xn--indery-fya": _3, "inder\xF8y": _3, "iveland": _3, "ivgu": _3, "jevnaker": _3, "jolster": _3, "xn--jlster-bya": _3, "j\xF8lster": _3, "jondal": _3, "kafjord": _3, "xn--kfjord-iua": _3, "k\xE5fjord": _3, "karasjohka": _3, "xn--krjohka-hwab49j": _3, "k\xE1r\xE1\u0161johka": _3, "karasjok": _3, "karlsoy": _3, "karmoy": _3, "xn--karmy-yua": _3, "karm\xF8y": _3, "kautokeino": _3, "klabu": _3, "xn--klbu-woa": _3, "kl\xE6bu": _3, "klepp": _3, "kongsberg": _3, "kongsvinger": _3, "kraanghke": _3, "xn--kranghke-b0a": _3, "kr\xE5anghke": _3, "kragero": _3, "xn--krager-gya": _3, "krager\xF8": _3, "kristiansand": _3, "kristiansund": _3, "krodsherad": _3, "xn--krdsherad-m8a": _3, "kr\xF8dsherad": _3, "xn--kvfjord-nxa": _3, "kv\xE6fjord": _3, "xn--kvnangen-k0a": _3, "kv\xE6nangen": _3, "kvafjord": _3, "kvalsund": _3, "kvam": _3, "kvanangen": _3, "kvinesdal": _3, "kvinnherad": _3, "kviteseid": _3, "kvitsoy": _3, "xn--kvitsy-fya": _3, "kvits\xF8y": _3, "laakesvuemie": _3, "xn--lrdal-sra": _3, "l\xE6rdal": _3, "lahppi": _3, "xn--lhppi-xqa": _3, "l\xE1hppi": _3, "lardal": _3, "larvik": _3, "lavagis": _3, "lavangen": _3, "leangaviika": _3, "xn--leagaviika-52b": _3, "lea\u014Bgaviika": _3, "lebesby": _3, "leikanger": _3, "leirfjord": _3, "leka": _3, "leksvik": _3, "lenvik": _3, "lerdal": _3, "lesja": _3, "levanger": _3, "lier": _3, "lierne": _3, "lillehammer": _3, "lillesand": _3, "lindas": _3, "xn--linds-pra": _3, "lind\xE5s": _3, "lindesnes": _3, "loabat": _3, "xn--loabt-0qa": _3, "loab\xE1t": _3, "lodingen": _3, "xn--ldingen-q1a": _3, "l\xF8dingen": _3, "lom": _3, "loppa": _3, "lorenskog": _3, "xn--lrenskog-54a": _3, "l\xF8renskog": _3, "loten": _3, "xn--lten-gra": _3, "l\xF8ten": _3, "lund": _3, "lunner": _3, "luroy": _3, "xn--lury-ira": _3, "lur\xF8y": _3, "luster": _3, "lyngdal": _3, "lyngen": _3, "malatvuopmi": _3, "xn--mlatvuopmi-s4a": _3, "m\xE1latvuopmi": _3, "malselv": _3, "xn--mlselv-iua": _3, "m\xE5lselv": _3, "malvik": _3, "mandal": _3, "marker": _3, "marnardal": _3, "masfjorden": _3, "masoy": _3, "xn--msy-ula0h": _3, "m\xE5s\xF8y": _3, "matta-varjjat": _3, "xn--mtta-vrjjat-k7af": _3, "m\xE1tta-v\xE1rjjat": _3, "meland": _3, "meldal": _3, "melhus": _3, "meloy": _3, "xn--mely-ira": _3, "mel\xF8y": _3, "meraker": _3, "xn--merker-kua": _3, "mer\xE5ker": _3, "midsund": _3, "midtre-gauldal": _3, "moareke": _3, "xn--moreke-jua": _3, "mo\xE5reke": _3, "modalen": _3, "modum": _3, "molde": _3, "more-og-romsdal": [0, { "heroy": _3, "sande": _3 }], "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": _3, "sande": _3 }], "m\xF8re-og-romsdal": [0, { "her\xF8y": _3, "sande": _3 }], "moskenes": _3, "moss": _3, "mosvik": _3, "muosat": _3, "xn--muost-0qa": _3, "muos\xE1t": _3, "naamesjevuemie": _3, "xn--nmesjevuemie-tcba": _3, "n\xE5\xE5mesjevuemie": _3, "xn--nry-yla5g": _3, "n\xE6r\xF8y": _3, "namdalseid": _3, "namsos": _3, "namsskogan": _3, "nannestad": _3, "naroy": _3, "narviika": _3, "narvik": _3, "naustdal": _3, "navuotna": _3, "xn--nvuotna-hwa": _3, "n\xE1vuotna": _3, "nedre-eiker": _3, "nesna": _3, "nesodden": _3, "nesseby": _3, "nesset": _3, "nissedal": _3, "nittedal": _3, "nord-aurdal": _3, "nord-fron": _3, "nord-odal": _3, "norddal": _3, "nordkapp": _3, "nordland": [0, { "bo": _3, "xn--b-5ga": _3, "b\xF8": _3, "heroy": _3, "xn--hery-ira": _3, "her\xF8y": _3 }], "nordre-land": _3, "nordreisa": _3, "nore-og-uvdal": _3, "notodden": _3, "notteroy": _3, "xn--nttery-byae": _3, "n\xF8tter\xF8y": _3, "odda": _3, "oksnes": _3, "xn--ksnes-uua": _3, "\xF8ksnes": _3, "omasvuotna": _3, "oppdal": _3, "oppegard": _3, "xn--oppegrd-ixa": _3, "oppeg\xE5rd": _3, "orkdal": _3, "orland": _3, "xn--rland-uua": _3, "\xF8rland": _3, "orskog": _3, "xn--rskog-uua": _3, "\xF8rskog": _3, "orsta": _3, "xn--rsta-fra": _3, "\xF8rsta": _3, "osen": _3, "osteroy": _3, "xn--ostery-fya": _3, "oster\xF8y": _3, "ostfold": [0, { "valer": _3 }], "xn--stfold-9xa": [0, { "xn--vler-qoa": _3 }], "\xF8stfold": [0, { "v\xE5ler": _3 }], "ostre-toten": _3, "xn--stre-toten-zcb": _3, "\xF8stre-toten": _3, "overhalla": _3, "ovre-eiker": _3, "xn--vre-eiker-k8a": _3, "\xF8vre-eiker": _3, "oyer": _3, "xn--yer-zna": _3, "\xF8yer": _3, "oygarden": _3, "xn--ygarden-p1a": _3, "\xF8ygarden": _3, "oystre-slidre": _3, "xn--ystre-slidre-ujb": _3, "\xF8ystre-slidre": _3, "porsanger": _3, "porsangu": _3, "xn--porsgu-sta26f": _3, "pors\xE1\u014Bgu": _3, "porsgrunn": _3, "rade": _3, "xn--rde-ula": _3, "r\xE5de": _3, "radoy": _3, "xn--rady-ira": _3, "rad\xF8y": _3, "xn--rlingen-mxa": _3, "r\xE6lingen": _3, "rahkkeravju": _3, "xn--rhkkervju-01af": _3, "r\xE1hkker\xE1vju": _3, "raisa": _3, "xn--risa-5na": _3, "r\xE1isa": _3, "rakkestad": _3, "ralingen": _3, "rana": _3, "randaberg": _3, "rauma": _3, "rendalen": _3, "rennebu": _3, "rennesoy": _3, "xn--rennesy-v1a": _3, "rennes\xF8y": _3, "rindal": _3, "ringebu": _3, "ringerike": _3, "ringsaker": _3, "risor": _3, "xn--risr-ira": _3, "ris\xF8r": _3, "rissa": _3, "roan": _3, "rodoy": _3, "xn--rdy-0nab": _3, "r\xF8d\xF8y": _3, "rollag": _3, "romsa": _3, "romskog": _3, "xn--rmskog-bya": _3, "r\xF8mskog": _3, "roros": _3, "xn--rros-gra": _3, "r\xF8ros": _3, "rost": _3, "xn--rst-0na": _3, "r\xF8st": _3, "royken": _3, "xn--ryken-vua": _3, "r\xF8yken": _3, "royrvik": _3, "xn--ryrvik-bya": _3, "r\xF8yrvik": _3, "ruovat": _3, "rygge": _3, "salangen": _3, "salat": _3, "xn--slat-5na": _3, "s\xE1lat": _3, "xn--slt-elab": _3, "s\xE1l\xE1t": _3, "saltdal": _3, "samnanger": _3, "sandefjord": _3, "sandnes": _3, "sandoy": _3, "xn--sandy-yua": _3, "sand\xF8y": _3, "sarpsborg": _3, "sauda": _3, "sauherad": _3, "sel": _3, "selbu": _3, "selje": _3, "seljord": _3, "siellak": _3, "sigdal": _3, "siljan": _3, "sirdal": _3, "skanit": _3, "xn--sknit-yqa": _3, "sk\xE1nit": _3, "skanland": _3, "xn--sknland-fxa": _3, "sk\xE5nland": _3, "skaun": _3, "skedsmo": _3, "ski": _3, "skien": _3, "skierva": _3, "xn--skierv-uta": _3, "skierv\xE1": _3, "skiptvet": _3, "skjak": _3, "xn--skjk-soa": _3, "skj\xE5k": _3, "skjervoy": _3, "xn--skjervy-v1a": _3, "skjerv\xF8y": _3, "skodje": _3, "smola": _3, "xn--smla-hra": _3, "sm\xF8la": _3, "snaase": _3, "xn--snase-nra": _3, "sn\xE5ase": _3, "snasa": _3, "xn--snsa-roa": _3, "sn\xE5sa": _3, "snillfjord": _3, "snoasa": _3, "sogndal": _3, "sogne": _3, "xn--sgne-gra": _3, "s\xF8gne": _3, "sokndal": _3, "sola": _3, "solund": _3, "somna": _3, "xn--smna-gra": _3, "s\xF8mna": _3, "sondre-land": _3, "xn--sndre-land-0cb": _3, "s\xF8ndre-land": _3, "songdalen": _3, "sor-aurdal": _3, "xn--sr-aurdal-l8a": _3, "s\xF8r-aurdal": _3, "sor-fron": _3, "xn--sr-fron-q1a": _3, "s\xF8r-fron": _3, "sor-odal": _3, "xn--sr-odal-q1a": _3, "s\xF8r-odal": _3, "sor-varanger": _3, "xn--sr-varanger-ggb": _3, "s\xF8r-varanger": _3, "sorfold": _3, "xn--srfold-bya": _3, "s\xF8rfold": _3, "sorreisa": _3, "xn--srreisa-q1a": _3, "s\xF8rreisa": _3, "sortland": _3, "sorum": _3, "xn--srum-gra": _3, "s\xF8rum": _3, "spydeberg": _3, "stange": _3, "stavanger": _3, "steigen": _3, "steinkjer": _3, "stjordal": _3, "xn--stjrdal-s1a": _3, "stj\xF8rdal": _3, "stokke": _3, "stor-elvdal": _3, "stord": _3, "stordal": _3, "storfjord": _3, "strand": _3, "stranda": _3, "stryn": _3, "sula": _3, "suldal": _3, "sund": _3, "sunndal": _3, "surnadal": _3, "sveio": _3, "svelvik": _3, "sykkylven": _3, "tana": _3, "telemark": [0, { "bo": _3, "xn--b-5ga": _3, "b\xF8": _3 }], "time": _3, "tingvoll": _3, "tinn": _3, "tjeldsund": _3, "tjome": _3, "xn--tjme-hra": _3, "tj\xF8me": _3, "tokke": _3, "tolga": _3, "tonsberg": _3, "xn--tnsberg-q1a": _3, "t\xF8nsberg": _3, "torsken": _3, "xn--trna-woa": _3, "tr\xE6na": _3, "trana": _3, "tranoy": _3, "xn--trany-yua": _3, "tran\xF8y": _3, "troandin": _3, "trogstad": _3, "xn--trgstad-r1a": _3, "tr\xF8gstad": _3, "tromsa": _3, "tromso": _3, "xn--troms-zua": _3, "troms\xF8": _3, "trondheim": _3, "trysil": _3, "tvedestrand": _3, "tydal": _3, "tynset": _3, "tysfjord": _3, "tysnes": _3, "xn--tysvr-vra": _3, "tysv\xE6r": _3, "tysvar": _3, "ullensaker": _3, "ullensvang": _3, "ulvik": _3, "unjarga": _3, "xn--unjrga-rta": _3, "unj\xE1rga": _3, "utsira": _3, "vaapste": _3, "vadso": _3, "xn--vads-jra": _3, "vads\xF8": _3, "xn--vry-yla5g": _3, "v\xE6r\xF8y": _3, "vaga": _3, "xn--vg-yiab": _3, "v\xE5g\xE5": _3, "vagan": _3, "xn--vgan-qoa": _3, "v\xE5gan": _3, "vagsoy": _3, "xn--vgsy-qoa0j": _3, "v\xE5gs\xF8y": _3, "vaksdal": _3, "valle": _3, "vang": _3, "vanylven": _3, "vardo": _3, "xn--vard-jra": _3, "vard\xF8": _3, "varggat": _3, "xn--vrggt-xqad": _3, "v\xE1rgg\xE1t": _3, "varoy": _3, "vefsn": _3, "vega": _3, "vegarshei": _3, "xn--vegrshei-c0a": _3, "veg\xE5rshei": _3, "vennesla": _3, "verdal": _3, "verran": _3, "vestby": _3, "vestfold": [0, { "sande": _3 }], "vestnes": _3, "vestre-slidre": _3, "vestre-toten": _3, "vestvagoy": _3, "xn--vestvgy-ixa6o": _3, "vestv\xE5g\xF8y": _3, "vevelstad": _3, "vik": _3, "vikna": _3, "vindafjord": _3, "voagat": _3, "volda": _3, "voss": _3, "co": _4, "123hjemmeside": _4, "myspreadshop": _4 }], "np": _18, "nr": _56, "nu": [1, { "merseine": _4, "mine": _4, "shacknet": _4, "enterprisecloud": _4 }], "nz": [1, { "ac": _3, "co": _3, "cri": _3, "geek": _3, "gen": _3, "govt": _3, "health": _3, "iwi": _3, "kiwi": _3, "maori": _3, "xn--mori-qsa": _3, "m\u0101ori": _3, "mil": _3, "net": _3, "org": _3, "parliament": _3, "school": _3, "cloudns": _4 }], "om": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "med": _3, "museum": _3, "net": _3, "org": _3, "pro": _3 }], "onion": _3, "org": [1, { "altervista": _4, "pimienta": _4, "poivron": _4, "potager": _4, "sweetpepper": _4, "cdn77": [0, { "c": _4, "rsc": _4 }], "cdn77-secure": [0, { "origin": [0, { "ssl": _4 }] }], "ae": _4, "cloudns": _4, "ip-dynamic": _4, "ddnss": _4, "dpdns": _4, "duckdns": _4, "tunk": _4, "blogdns": _4, "blogsite": _4, "boldlygoingnowhere": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dvrdns": _4, "dynalias": _4, "dyndns": [2, { "go": _4, "home": _4 }], "endofinternet": _4, "endoftheinternet": _4, "from-me": _4, "game-host": _4, "gotdns": _4, "hobby-site": _4, "homedns": _4, "homeftp": _4, "homelinux": _4, "homeunix": _4, "is-a-bruinsfan": _4, "is-a-candidate": _4, "is-a-celticsfan": _4, "is-a-chef": _4, "is-a-geek": _4, "is-a-knight": _4, "is-a-linux-user": _4, "is-a-patsfan": _4, "is-a-soxfan": _4, "is-found": _4, "is-lost": _4, "is-saved": _4, "is-very-bad": _4, "is-very-evil": _4, "is-very-good": _4, "is-very-nice": _4, "is-very-sweet": _4, "isa-geek": _4, "kicks-ass": _4, "misconfused": _4, "podzone": _4, "readmyblog": _4, "selfip": _4, "sellsyourhome": _4, "servebbs": _4, "serveftp": _4, "servegame": _4, "stuff-4-sale": _4, "webhop": _4, "accesscam": _4, "camdvr": _4, "freeddns": _4, "mywire": _4, "webredirect": _4, "twmail": _4, "eu": [2, { "al": _4, "asso": _4, "at": _4, "au": _4, "be": _4, "bg": _4, "ca": _4, "cd": _4, "ch": _4, "cn": _4, "cy": _4, "cz": _4, "de": _4, "dk": _4, "edu": _4, "ee": _4, "es": _4, "fi": _4, "fr": _4, "gr": _4, "hr": _4, "hu": _4, "ie": _4, "il": _4, "in": _4, "int": _4, "is": _4, "it": _4, "jp": _4, "kr": _4, "lt": _4, "lu": _4, "lv": _4, "me": _4, "mk": _4, "mt": _4, "my": _4, "net": _4, "ng": _4, "nl": _4, "no": _4, "nz": _4, "pl": _4, "pt": _4, "ro": _4, "ru": _4, "se": _4, "si": _4, "sk": _4, "tr": _4, "uk": _4, "us": _4 }], "fedorainfracloud": _4, "fedorapeople": _4, "fedoraproject": [0, { "cloud": _4, "os": _43, "stg": [0, { "os": _43 }] }], "freedesktop": _4, "hatenadiary": _4, "hepforge": _4, "in-dsl": _4, "in-vpn": _4, "js": _4, "barsy": _4, "mayfirst": _4, "routingthecloud": _4, "bmoattachments": _4, "cable-modem": _4, "collegefan": _4, "couchpotatofries": _4, "hopto": _4, "mlbfan": _4, "myftp": _4, "mysecuritycamera": _4, "nflfan": _4, "no-ip": _4, "read-books": _4, "ufcfan": _4, "zapto": _4, "dynserv": _4, "now-dns": _4, "is-local": _4, "httpbin": _4, "pubtls": _4, "jpn": _4, "my-firewall": _4, "myfirewall": _4, "spdns": _4, "small-web": _4, "dsmynas": _4, "familyds": _4, "teckids": _55, "tuxfamily": _4, "diskstation": _4, "hk": _4, "us": _4, "toolforge": _4, "wmcloud": _4, "wmflabs": _4, "za": _4 }], "pa": [1, { "abo": _3, "ac": _3, "com": _3, "edu": _3, "gob": _3, "ing": _3, "med": _3, "net": _3, "nom": _3, "org": _3, "sld": _3 }], "pe": [1, { "com": _3, "edu": _3, "gob": _3, "mil": _3, "net": _3, "nom": _3, "org": _3 }], "pf": [1, { "com": _3, "edu": _3, "org": _3 }], "pg": _18, "ph": [1, { "com": _3, "edu": _3, "gov": _3, "i": _3, "mil": _3, "net": _3, "ngo": _3, "org": _3, "cloudns": _4 }], "pk": [1, { "ac": _3, "biz": _3, "com": _3, "edu": _3, "fam": _3, "gkp": _3, "gob": _3, "gog": _3, "gok": _3, "gop": _3, "gos": _3, "gov": _3, "net": _3, "org": _3, "web": _3 }], "pl": [1, { "com": _3, "net": _3, "org": _3, "agro": _3, "aid": _3, "atm": _3, "auto": _3, "biz": _3, "edu": _3, "gmina": _3, "gsm": _3, "info": _3, "mail": _3, "media": _3, "miasta": _3, "mil": _3, "nieruchomosci": _3, "nom": _3, "pc": _3, "powiat": _3, "priv": _3, "realestate": _3, "rel": _3, "sex": _3, "shop": _3, "sklep": _3, "sos": _3, "szkola": _3, "targi": _3, "tm": _3, "tourism": _3, "travel": _3, "turystyka": _3, "gov": [1, { "ap": _3, "griw": _3, "ic": _3, "is": _3, "kmpsp": _3, "konsulat": _3, "kppsp": _3, "kwp": _3, "kwpsp": _3, "mup": _3, "mw": _3, "oia": _3, "oirm": _3, "oke": _3, "oow": _3, "oschr": _3, "oum": _3, "pa": _3, "pinb": _3, "piw": _3, "po": _3, "pr": _3, "psp": _3, "psse": _3, "pup": _3, "rzgw": _3, "sa": _3, "sdn": _3, "sko": _3, "so": _3, "sr": _3, "starostwo": _3, "ug": _3, "ugim": _3, "um": _3, "umig": _3, "upow": _3, "uppo": _3, "us": _3, "uw": _3, "uzs": _3, "wif": _3, "wiih": _3, "winb": _3, "wios": _3, "witd": _3, "wiw": _3, "wkz": _3, "wsa": _3, "wskr": _3, "wsse": _3, "wuoz": _3, "wzmiuw": _3, "zp": _3, "zpisdn": _3 }], "augustow": _3, "babia-gora": _3, "bedzin": _3, "beskidy": _3, "bialowieza": _3, "bialystok": _3, "bielawa": _3, "bieszczady": _3, "boleslawiec": _3, "bydgoszcz": _3, "bytom": _3, "cieszyn": _3, "czeladz": _3, "czest": _3, "dlugoleka": _3, "elblag": _3, "elk": _3, "glogow": _3, "gniezno": _3, "gorlice": _3, "grajewo": _3, "ilawa": _3, "jaworzno": _3, "jelenia-gora": _3, "jgora": _3, "kalisz": _3, "karpacz": _3, "kartuzy": _3, "kaszuby": _3, "katowice": _3, "kazimierz-dolny": _3, "kepno": _3, "ketrzyn": _3, "klodzko": _3, "kobierzyce": _3, "kolobrzeg": _3, "konin": _3, "konskowola": _3, "kutno": _3, "lapy": _3, "lebork": _3, "legnica": _3, "lezajsk": _3, "limanowa": _3, "lomza": _3, "lowicz": _3, "lubin": _3, "lukow": _3, "malbork": _3, "malopolska": _3, "mazowsze": _3, "mazury": _3, "mielec": _3, "mielno": _3, "mragowo": _3, "naklo": _3, "nowaruda": _3, "nysa": _3, "olawa": _3, "olecko": _3, "olkusz": _3, "olsztyn": _3, "opoczno": _3, "opole": _3, "ostroda": _3, "ostroleka": _3, "ostrowiec": _3, "ostrowwlkp": _3, "pila": _3, "pisz": _3, "podhale": _3, "podlasie": _3, "polkowice": _3, "pomorskie": _3, "pomorze": _3, "prochowice": _3, "pruszkow": _3, "przeworsk": _3, "pulawy": _3, "radom": _3, "rawa-maz": _3, "rybnik": _3, "rzeszow": _3, "sanok": _3, "sejny": _3, "skoczow": _3, "slask": _3, "slupsk": _3, "sosnowiec": _3, "stalowa-wola": _3, "starachowice": _3, "stargard": _3, "suwalki": _3, "swidnica": _3, "swiebodzin": _3, "swinoujscie": _3, "szczecin": _3, "szczytno": _3, "tarnobrzeg": _3, "tgory": _3, "turek": _3, "tychy": _3, "ustka": _3, "walbrzych": _3, "warmia": _3, "warszawa": _3, "waw": _3, "wegrow": _3, "wielun": _3, "wlocl": _3, "wloclawek": _3, "wodzislaw": _3, "wolomin": _3, "wroclaw": _3, "zachpomor": _3, "zagan": _3, "zarow": _3, "zgora": _3, "zgorzelec": _3, "art": _4, "gliwice": _4, "krakow": _4, "poznan": _4, "wroc": _4, "zakopane": _4, "beep": _4, "ecommerce-shop": _4, "cfolks": _4, "dfirma": _4, "dkonto": _4, "you2": _4, "shoparena": _4, "homesklep": _4, "sdscloud": _4, "unicloud": _4, "lodz": _4, "pabianice": _4, "plock": _4, "sieradz": _4, "skierniewice": _4, "zgierz": _4, "krasnik": _4, "leczna": _4, "lubartow": _4, "lublin": _4, "poniatowa": _4, "swidnik": _4, "co": _4, "torun": _4, "simplesite": _4, "myspreadshop": _4, "gda": _4, "gdansk": _4, "gdynia": _4, "med": _4, "sopot": _4, "bielsko": _4 }], "pm": [1, { "own": _4, "name": _4 }], "pn": [1, { "co": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], "post": _3, "pr": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "isla": _3, "name": _3, "net": _3, "org": _3, "pro": _3, "ac": _3, "est": _3, "prof": _3 }], "pro": [1, { "aaa": _3, "aca": _3, "acct": _3, "avocat": _3, "bar": _3, "cpa": _3, "eng": _3, "jur": _3, "law": _3, "med": _3, "recht": _3, "12chars": _4, "cloudns": _4, "barsy": _4, "ngrok": _4 }], "ps": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "plo": _3, "sec": _3 }], "pt": [1, { "com": _3, "edu": _3, "gov": _3, "int": _3, "net": _3, "nome": _3, "org": _3, "publ": _3, "123paginaweb": _4 }], "pw": [1, { "gov": _3, "cloudns": _4, "x443": _4 }], "py": [1, { "com": _3, "coop": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "qa": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "sch": _3 }], "re": [1, { "asso": _3, "com": _3, "netlib": _4, "can": _4 }], "ro": [1, { "arts": _3, "com": _3, "firm": _3, "info": _3, "nom": _3, "nt": _3, "org": _3, "rec": _3, "store": _3, "tm": _3, "www": _3, "co": _4, "shop": _4, "barsy": _4 }], "rs": [1, { "ac": _3, "co": _3, "edu": _3, "gov": _3, "in": _3, "org": _3, "brendly": _51, "barsy": _4, "ox": _4 }], "ru": [1, { "ac": _4, "edu": _4, "gov": _4, "int": _4, "mil": _4, "eurodir": _4, "adygeya": _4, "bashkiria": _4, "bir": _4, "cbg": _4, "com": _4, "dagestan": _4, "grozny": _4, "kalmykia": _4, "kustanai": _4, "marine": _4, "mordovia": _4, "msk": _4, "mytis": _4, "nalchik": _4, "nov": _4, "pyatigorsk": _4, "spb": _4, "vladikavkaz": _4, "vladimir": _4, "na4u": _4, "mircloud": _4, "myjino": [2, { "hosting": _7, "landing": _7, "spectrum": _7, "vps": _7 }], "cldmail": [0, { "hb": _4 }], "mcdir": [2, { "vps": _4 }], "mcpre": _4, "net": _4, "org": _4, "pp": _4, "lk3": _4, "ras": _4 }], "rw": [1, { "ac": _3, "co": _3, "coop": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "sa": [1, { "com": _3, "edu": _3, "gov": _3, "med": _3, "net": _3, "org": _3, "pub": _3, "sch": _3 }], "sb": _5, "sc": _5, "sd": [1, { "com": _3, "edu": _3, "gov": _3, "info": _3, "med": _3, "net": _3, "org": _3, "tv": _3 }], "se": [1, { "a": _3, "ac": _3, "b": _3, "bd": _3, "brand": _3, "c": _3, "d": _3, "e": _3, "f": _3, "fh": _3, "fhsk": _3, "fhv": _3, "g": _3, "h": _3, "i": _3, "k": _3, "komforb": _3, "kommunalforbund": _3, "komvux": _3, "l": _3, "lanbib": _3, "m": _3, "n": _3, "naturbruksgymn": _3, "o": _3, "org": _3, "p": _3, "parti": _3, "pp": _3, "press": _3, "r": _3, "s": _3, "t": _3, "tm": _3, "u": _3, "w": _3, "x": _3, "y": _3, "z": _3, "com": _4, "iopsys": _4, "123minsida": _4, "itcouldbewor": _4, "myspreadshop": _4 }], "sg": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "enscaled": _4 }], "sh": [1, { "com": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "hashbang": _4, "botda": _4, "platform": [0, { "ent": _4, "eu": _4, "us": _4 }], "now": _4 }], "si": [1, { "f5": _4, "gitapp": _4, "gitpage": _4 }], "sj": _3, "sk": _3, "sl": _5, "sm": _3, "sn": [1, { "art": _3, "com": _3, "edu": _3, "gouv": _3, "org": _3, "perso": _3, "univ": _3 }], "so": [1, { "com": _3, "edu": _3, "gov": _3, "me": _3, "net": _3, "org": _3, "surveys": _4 }], "sr": _3, "ss": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "me": _3, "net": _3, "org": _3, "sch": _3 }], "st": [1, { "co": _3, "com": _3, "consulado": _3, "edu": _3, "embaixada": _3, "mil": _3, "net": _3, "org": _3, "principe": _3, "saotome": _3, "store": _3, "helioho": _4, "kirara": _4, "noho": _4 }], "su": [1, { "abkhazia": _4, "adygeya": _4, "aktyubinsk": _4, "arkhangelsk": _4, "armenia": _4, "ashgabad": _4, "azerbaijan": _4, "balashov": _4, "bashkiria": _4, "bryansk": _4, "bukhara": _4, "chimkent": _4, "dagestan": _4, "east-kazakhstan": _4, "exnet": _4, "georgia": _4, "grozny": _4, "ivanovo": _4, "jambyl": _4, "kalmykia": _4, "kaluga": _4, "karacol": _4, "karaganda": _4, "karelia": _4, "khakassia": _4, "krasnodar": _4, "kurgan": _4, "kustanai": _4, "lenug": _4, "mangyshlak": _4, "mordovia": _4, "msk": _4, "murmansk": _4, "nalchik": _4, "navoi": _4, "north-kazakhstan": _4, "nov": _4, "obninsk": _4, "penza": _4, "pokrovsk": _4, "sochi": _4, "spb": _4, "tashkent": _4, "termez": _4, "togliatti": _4, "troitsk": _4, "tselinograd": _4, "tula": _4, "tuva": _4, "vladikavkaz": _4, "vladimir": _4, "vologda": _4 }], "sv": [1, { "com": _3, "edu": _3, "gob": _3, "org": _3, "red": _3 }], "sx": _11, "sy": _6, "sz": [1, { "ac": _3, "co": _3, "org": _3 }], "tc": _3, "td": _3, "tel": _3, "tf": [1, { "sch": _4 }], "tg": _3, "th": [1, { "ac": _3, "co": _3, "go": _3, "in": _3, "mi": _3, "net": _3, "or": _3, "online": _4, "shop": _4 }], "tj": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "go": _3, "gov": _3, "int": _3, "mil": _3, "name": _3, "net": _3, "nic": _3, "org": _3, "test": _3, "web": _3 }], "tk": _3, "tl": _11, "tm": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3 }], "tn": [1, { "com": _3, "ens": _3, "fin": _3, "gov": _3, "ind": _3, "info": _3, "intl": _3, "mincom": _3, "nat": _3, "net": _3, "org": _3, "perso": _3, "tourism": _3, "orangecloud": _4 }], "to": [1, { "611": _4, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "oya": _4, "x0": _4, "quickconnect": _25, "vpnplus": _4 }], "tr": [1, { "av": _3, "bbs": _3, "bel": _3, "biz": _3, "com": _3, "dr": _3, "edu": _3, "gen": _3, "gov": _3, "info": _3, "k12": _3, "kep": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pol": _3, "tel": _3, "tsk": _3, "tv": _3, "web": _3, "nc": _11 }], "tt": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "tv": [1, { "better-than": _4, "dyndns": _4, "on-the-web": _4, "worse-than": _4, "from": _4, "sakura": _4 }], "tw": [1, { "club": _3, "com": [1, { "mymailer": _4 }], "ebiz": _3, "edu": _3, "game": _3, "gov": _3, "idv": _3, "mil": _3, "net": _3, "org": _3, "url": _4, "mydns": _4 }], "tz": [1, { "ac": _3, "co": _3, "go": _3, "hotel": _3, "info": _3, "me": _3, "mil": _3, "mobi": _3, "ne": _3, "or": _3, "sc": _3, "tv": _3 }], "ua": [1, { "com": _3, "edu": _3, "gov": _3, "in": _3, "net": _3, "org": _3, "cherkassy": _3, "cherkasy": _3, "chernigov": _3, "chernihiv": _3, "chernivtsi": _3, "chernovtsy": _3, "ck": _3, "cn": _3, "cr": _3, "crimea": _3, "cv": _3, "dn": _3, "dnepropetrovsk": _3, "dnipropetrovsk": _3, "donetsk": _3, "dp": _3, "if": _3, "ivano-frankivsk": _3, "kh": _3, "kharkiv": _3, "kharkov": _3, "kherson": _3, "khmelnitskiy": _3, "khmelnytskyi": _3, "kiev": _3, "kirovograd": _3, "km": _3, "kr": _3, "kropyvnytskyi": _3, "krym": _3, "ks": _3, "kv": _3, "kyiv": _3, "lg": _3, "lt": _3, "lugansk": _3, "luhansk": _3, "lutsk": _3, "lv": _3, "lviv": _3, "mk": _3, "mykolaiv": _3, "nikolaev": _3, "od": _3, "odesa": _3, "odessa": _3, "pl": _3, "poltava": _3, "rivne": _3, "rovno": _3, "rv": _3, "sb": _3, "sebastopol": _3, "sevastopol": _3, "sm": _3, "sumy": _3, "te": _3, "ternopil": _3, "uz": _3, "uzhgorod": _3, "uzhhorod": _3, "vinnica": _3, "vinnytsia": _3, "vn": _3, "volyn": _3, "yalta": _3, "zakarpattia": _3, "zaporizhzhe": _3, "zaporizhzhia": _3, "zhitomir": _3, "zhytomyr": _3, "zp": _3, "zt": _3, "cc": _4, "inf": _4, "ltd": _4, "cx": _4, "ie": _4, "biz": _4, "co": _4, "pp": _4, "v": _4 }], "ug": [1, { "ac": _3, "co": _3, "com": _3, "edu": _3, "go": _3, "gov": _3, "mil": _3, "ne": _3, "or": _3, "org": _3, "sc": _3, "us": _3 }], "uk": [1, { "ac": _3, "co": [1, { "bytemark": [0, { "dh": _4, "vm": _4 }], "layershift": _46, "barsy": _4, "barsyonline": _4, "retrosnub": _54, "nh-serv": _4, "no-ip": _4, "adimo": _4, "myspreadshop": _4 }], "gov": [1, { "api": _4, "campaign": _4, "service": _4 }], "ltd": _3, "me": _3, "net": _3, "nhs": _3, "org": [1, { "glug": _4, "lug": _4, "lugs": _4, "affinitylottery": _4, "raffleentry": _4, "weeklylottery": _4 }], "plc": _3, "police": _3, "sch": _18, "conn": _4, "copro": _4, "hosp": _4, "independent-commission": _4, "independent-inquest": _4, "independent-inquiry": _4, "independent-panel": _4, "independent-review": _4, "public-inquiry": _4, "royal-commission": _4, "pymnt": _4, "barsy": _4, "nimsite": _4, "oraclegovcloudapps": _7 }], "us": [1, { "dni": _3, "isa": _3, "nsn": _3, "ak": _62, "al": _62, "ar": _62, "as": _62, "az": _62, "ca": _62, "co": _62, "ct": _62, "dc": _62, "de": [1, { "cc": _3, "lib": _4 }], "fl": _62, "ga": _62, "gu": _62, "hi": _63, "ia": _62, "id": _62, "il": _62, "in": _62, "ks": _62, "ky": _62, "la": _62, "ma": [1, { "k12": [1, { "chtr": _3, "paroch": _3, "pvt": _3 }], "cc": _3, "lib": _3 }], "md": _62, "me": _62, "mi": [1, { "k12": _3, "cc": _3, "lib": _3, "ann-arbor": _3, "cog": _3, "dst": _3, "eaton": _3, "gen": _3, "mus": _3, "tec": _3, "washtenaw": _3 }], "mn": _62, "mo": _62, "ms": _62, "mt": _62, "nc": _62, "nd": _63, "ne": _62, "nh": _62, "nj": _62, "nm": _62, "nv": _62, "ny": _62, "oh": _62, "ok": _62, "or": _62, "pa": _62, "pr": _62, "ri": _63, "sc": _62, "sd": _63, "tn": _62, "tx": _62, "ut": _62, "va": _62, "vi": _62, "vt": _62, "wa": _62, "wi": _62, "wv": [1, { "cc": _3 }], "wy": _62, "cloudns": _4, "is-by": _4, "land-4-sale": _4, "stuff-4-sale": _4, "heliohost": _4, "enscaled": [0, { "phx": _4 }], "mircloud": _4, "ngo": _4, "golffan": _4, "noip": _4, "pointto": _4, "freeddns": _4, "srv": [2, { "gh": _4, "gl": _4 }], "platterp": _4, "servername": _4 }], "uy": [1, { "com": _3, "edu": _3, "gub": _3, "mil": _3, "net": _3, "org": _3 }], "uz": [1, { "co": _3, "com": _3, "net": _3, "org": _3 }], "va": _3, "vc": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "gv": [2, { "d": _4 }], "0e": _7, "mydns": _4 }], "ve": [1, { "arts": _3, "bib": _3, "co": _3, "com": _3, "e12": _3, "edu": _3, "emprende": _3, "firm": _3, "gob": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "rar": _3, "rec": _3, "store": _3, "tec": _3, "web": _3 }], "vg": [1, { "edu": _3 }], "vi": [1, { "co": _3, "com": _3, "k12": _3, "net": _3, "org": _3 }], "vn": [1, { "ac": _3, "ai": _3, "biz": _3, "com": _3, "edu": _3, "gov": _3, "health": _3, "id": _3, "info": _3, "int": _3, "io": _3, "name": _3, "net": _3, "org": _3, "pro": _3, "angiang": _3, "bacgiang": _3, "backan": _3, "baclieu": _3, "bacninh": _3, "baria-vungtau": _3, "bentre": _3, "binhdinh": _3, "binhduong": _3, "binhphuoc": _3, "binhthuan": _3, "camau": _3, "cantho": _3, "caobang": _3, "daklak": _3, "daknong": _3, "danang": _3, "dienbien": _3, "dongnai": _3, "dongthap": _3, "gialai": _3, "hagiang": _3, "haiduong": _3, "haiphong": _3, "hanam": _3, "hanoi": _3, "hatinh": _3, "haugiang": _3, "hoabinh": _3, "hungyen": _3, "khanhhoa": _3, "kiengiang": _3, "kontum": _3, "laichau": _3, "lamdong": _3, "langson": _3, "laocai": _3, "longan": _3, "namdinh": _3, "nghean": _3, "ninhbinh": _3, "ninhthuan": _3, "phutho": _3, "phuyen": _3, "quangbinh": _3, "quangnam": _3, "quangngai": _3, "quangninh": _3, "quangtri": _3, "soctrang": _3, "sonla": _3, "tayninh": _3, "thaibinh": _3, "thainguyen": _3, "thanhhoa": _3, "thanhphohochiminh": _3, "thuathienhue": _3, "tiengiang": _3, "travinh": _3, "tuyenquang": _3, "vinhlong": _3, "vinhphuc": _3, "yenbai": _3 }], "vu": _45, "wf": [1, { "biz": _4, "sch": _4 }], "ws": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "advisor": _7, "cloud66": _4, "dyndns": _4, "mypets": _4 }], "yt": [1, { "org": _4 }], "xn--mgbaam7a8h": _3, "\u0627\u0645\u0627\u0631\u0627\u062A": _3, "xn--y9a3aq": _3, "\u0570\u0561\u0575": _3, "xn--54b7fta0cc": _3, "\u09AC\u09BE\u0982\u09B2\u09BE": _3, "xn--90ae": _3, "\u0431\u0433": _3, "xn--mgbcpq6gpa1a": _3, "\u0627\u0644\u0628\u062D\u0631\u064A\u0646": _3, "xn--90ais": _3, "\u0431\u0435\u043B": _3, "xn--fiqs8s": _3, "\u4E2D\u56FD": _3, "xn--fiqz9s": _3, "\u4E2D\u570B": _3, "xn--lgbbat1ad8j": _3, "\u0627\u0644\u062C\u0632\u0627\u0626\u0631": _3, "xn--wgbh1c": _3, "\u0645\u0635\u0631": _3, "xn--e1a4c": _3, "\u0435\u044E": _3, "xn--qxa6a": _3, "\u03B5\u03C5": _3, "xn--mgbah1a3hjkrd": _3, "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627": _3, "xn--node": _3, "\u10D2\u10D4": _3, "xn--qxam": _3, "\u03B5\u03BB": _3, "xn--j6w193g": [1, { "xn--gmqw5a": _3, "xn--55qx5d": _3, "xn--mxtq1m": _3, "xn--wcvs22d": _3, "xn--uc0atv": _3, "xn--od0alg": _3 }], "\u9999\u6E2F": [1, { "\u500B\u4EBA": _3, "\u516C\u53F8": _3, "\u653F\u5E9C": _3, "\u6559\u80B2": _3, "\u7D44\u7E54": _3, "\u7DB2\u7D61": _3 }], "xn--2scrj9c": _3, "\u0CAD\u0CBE\u0CB0\u0CA4": _3, "xn--3hcrj9c": _3, "\u0B2D\u0B3E\u0B30\u0B24": _3, "xn--45br5cyl": _3, "\u09AD\u09BE\u09F0\u09A4": _3, "xn--h2breg3eve": _3, "\u092D\u093E\u0930\u0924\u092E\u094D": _3, "xn--h2brj9c8c": _3, "\u092D\u093E\u0930\u094B\u0924": _3, "xn--mgbgu82a": _3, "\u0680\u0627\u0631\u062A": _3, "xn--rvc1e0am3e": _3, "\u0D2D\u0D3E\u0D30\u0D24\u0D02": _3, "xn--h2brj9c": _3, "\u092D\u093E\u0930\u0924": _3, "xn--mgbbh1a": _3, "\u0628\u0627\u0631\u062A": _3, "xn--mgbbh1a71e": _3, "\u0628\u06BE\u0627\u0631\u062A": _3, "xn--fpcrj9c3d": _3, "\u0C2D\u0C3E\u0C30\u0C24\u0C4D": _3, "xn--gecrj9c": _3, "\u0AAD\u0ABE\u0AB0\u0AA4": _3, "xn--s9brj9c": _3, "\u0A2D\u0A3E\u0A30\u0A24": _3, "xn--45brj9c": _3, "\u09AD\u09BE\u09B0\u09A4": _3, "xn--xkc2dl3a5ee0h": _3, "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE": _3, "xn--mgba3a4f16a": _3, "\u0627\u06CC\u0631\u0627\u0646": _3, "xn--mgba3a4fra": _3, "\u0627\u064A\u0631\u0627\u0646": _3, "xn--mgbtx2b": _3, "\u0639\u0631\u0627\u0642": _3, "xn--mgbayh7gpa": _3, "\u0627\u0644\u0627\u0631\u062F\u0646": _3, "xn--3e0b707e": _3, "\uD55C\uAD6D": _3, "xn--80ao21a": _3, "\u049B\u0430\u0437": _3, "xn--q7ce6a": _3, "\u0EA5\u0EB2\u0EA7": _3, "xn--fzc2c9e2c": _3, "\u0DBD\u0D82\u0D9A\u0DCF": _3, "xn--xkc2al3hye2a": _3, "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8": _3, "xn--mgbc0a9azcg": _3, "\u0627\u0644\u0645\u063A\u0631\u0628": _3, "xn--d1alf": _3, "\u043C\u043A\u0434": _3, "xn--l1acc": _3, "\u043C\u043E\u043D": _3, "xn--mix891f": _3, "\u6FB3\u9580": _3, "xn--mix082f": _3, "\u6FB3\u95E8": _3, "xn--mgbx4cd0ab": _3, "\u0645\u0644\u064A\u0633\u064A\u0627": _3, "xn--mgb9awbf": _3, "\u0639\u0645\u0627\u0646": _3, "xn--mgbai9azgqp6j": _3, "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646": _3, "xn--mgbai9a5eva00b": _3, "\u067E\u0627\u0643\u0633\u062A\u0627\u0646": _3, "xn--ygbi2ammx": _3, "\u0641\u0644\u0633\u0637\u064A\u0646": _3, "xn--90a3ac": [1, { "xn--80au": _3, "xn--90azh": _3, "xn--d1at": _3, "xn--c1avg": _3, "xn--o1ac": _3, "xn--o1ach": _3 }], "\u0441\u0440\u0431": [1, { "\u0430\u043A": _3, "\u043E\u0431\u0440": _3, "\u043E\u0434": _3, "\u043E\u0440\u0433": _3, "\u043F\u0440": _3, "\u0443\u043F\u0440": _3 }], "xn--p1ai": _3, "\u0440\u0444": _3, "xn--wgbl6a": _3, "\u0642\u0637\u0631": _3, "xn--mgberp4a5d4ar": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629": _3, "xn--mgberp4a5d4a87g": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u0629": _3, "xn--mgbqly7c0a67fbc": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u06C3": _3, "xn--mgbqly7cvafr": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0647": _3, "xn--mgbpl2fh": _3, "\u0633\u0648\u062F\u0627\u0646": _3, "xn--yfro4i67o": _3, "\u65B0\u52A0\u5761": _3, "xn--clchc0ea0b2g2a9gcd": _3, "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD": _3, "xn--ogbpf8fl": _3, "\u0633\u0648\u0631\u064A\u0629": _3, "xn--mgbtf8fl": _3, "\u0633\u0648\u0631\u064A\u0627": _3, "xn--o3cw4h": [1, { "xn--o3cyx2a": _3, "xn--12co0c3b4eva": _3, "xn--m3ch0j3a": _3, "xn--h3cuzk1di": _3, "xn--12c1fe0br": _3, "xn--12cfi8ixb8l": _3 }], "\u0E44\u0E17\u0E22": [1, { "\u0E17\u0E2B\u0E32\u0E23": _3, "\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08": _3, "\u0E40\u0E19\u0E47\u0E15": _3, "\u0E23\u0E31\u0E10\u0E1A\u0E32\u0E25": _3, "\u0E28\u0E36\u0E01\u0E29\u0E32": _3, "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E23": _3 }], "xn--pgbs0dh": _3, "\u062A\u0648\u0646\u0633": _3, "xn--kpry57d": _3, "\u53F0\u7063": _3, "xn--kprw13d": _3, "\u53F0\u6E7E": _3, "xn--nnx388a": _3, "\u81FA\u7063": _3, "xn--j1amh": _3, "\u0443\u043A\u0440": _3, "xn--mgb2ddes": _3, "\u0627\u0644\u064A\u0645\u0646": _3, "xxx": _3, "ye": _6, "za": [0, { "ac": _3, "agric": _3, "alt": _3, "co": _3, "edu": _3, "gov": _3, "grondar": _3, "law": _3, "mil": _3, "net": _3, "ngo": _3, "nic": _3, "nis": _3, "nom": _3, "org": _3, "school": _3, "tm": _3, "web": _3 }], "zm": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "mil": _3, "net": _3, "org": _3, "sch": _3 }], "zw": [1, { "ac": _3, "co": _3, "gov": _3, "mil": _3, "org": _3 }], "aaa": _3, "aarp": _3, "abb": _3, "abbott": _3, "abbvie": _3, "abc": _3, "able": _3, "abogado": _3, "abudhabi": _3, "academy": [1, { "official": _4 }], "accenture": _3, "accountant": _3, "accountants": _3, "aco": _3, "actor": _3, "ads": _3, "adult": _3, "aeg": _3, "aetna": _3, "afl": _3, "africa": _3, "agakhan": _3, "agency": _3, "aig": _3, "airbus": _3, "airforce": _3, "airtel": _3, "akdn": _3, "alibaba": _3, "alipay": _3, "allfinanz": _3, "allstate": _3, "ally": _3, "alsace": _3, "alstom": _3, "amazon": _3, "americanexpress": _3, "americanfamily": _3, "amex": _3, "amfam": _3, "amica": _3, "amsterdam": _3, "analytics": _3, "android": _3, "anquan": _3, "anz": _3, "aol": _3, "apartments": _3, "app": [1, { "adaptable": _4, "aiven": _4, "beget": _7, "brave": _8, "clerk": _4, "clerkstage": _4, "wnext": _4, "csb": [2, { "preview": _4 }], "convex": _4, "deta": _4, "ondigitalocean": _4, "easypanel": _4, "encr": _4, "evervault": _9, "expo": [2, { "staging": _4 }], "edgecompute": _4, "on-fleek": _4, "flutterflow": _4, "e2b": _4, "framer": _4, "hosted": _7, "run": _7, "web": _4, "hasura": _4, "botdash": _4, "loginline": _4, "lovable": _4, "medusajs": _4, "messerli": _4, "netfy": _4, "netlify": _4, "ngrok": _4, "ngrok-free": _4, "developer": _7, "noop": _4, "northflank": _7, "upsun": _7, "replit": _10, "nyat": _4, "snowflake": [0, { "*": _4, "privatelink": _7 }], "streamlit": _4, "storipress": _4, "telebit": _4, "typedream": _4, "vercel": _4, "bookonline": _4, "wdh": _4, "windsurf": _4, "zeabur": _4, "zerops": _7 }], "apple": _3, "aquarelle": _3, "arab": _3, "aramco": _3, "archi": _3, "army": _3, "art": _3, "arte": _3, "asda": _3, "associates": _3, "athleta": _3, "attorney": _3, "auction": _3, "audi": _3, "audible": _3, "audio": _3, "auspost": _3, "author": _3, "auto": _3, "autos": _3, "aws": [1, { "sagemaker": [0, { "ap-northeast-1": _14, "ap-northeast-2": _14, "ap-south-1": _14, "ap-southeast-1": _14, "ap-southeast-2": _14, "ca-central-1": _16, "eu-central-1": _14, "eu-west-1": _14, "eu-west-2": _14, "us-east-1": _16, "us-east-2": _16, "us-west-2": _16, "af-south-1": _13, "ap-east-1": _13, "ap-northeast-3": _13, "ap-south-2": _15, "ap-southeast-3": _13, "ap-southeast-4": _15, "ca-west-1": [0, { "notebook": _4, "notebook-fips": _4 }], "eu-central-2": _13, "eu-north-1": _13, "eu-south-1": _13, "eu-south-2": _13, "eu-west-3": _13, "il-central-1": _13, "me-central-1": _13, "me-south-1": _13, "sa-east-1": _13, "us-gov-east-1": _17, "us-gov-west-1": _17, "us-west-1": [0, { "notebook": _4, "notebook-fips": _4, "studio": _4 }], "experiments": _7 }], "repost": [0, { "private": _7 }], "on": [0, { "ap-northeast-1": _12, "ap-southeast-1": _12, "ap-southeast-2": _12, "eu-central-1": _12, "eu-north-1": _12, "eu-west-1": _12, "us-east-1": _12, "us-east-2": _12, "us-west-2": _12 }] }], "axa": _3, "azure": _3, "baby": _3, "baidu": _3, "banamex": _3, "band": _3, "bank": _3, "bar": _3, "barcelona": _3, "barclaycard": _3, "barclays": _3, "barefoot": _3, "bargains": _3, "baseball": _3, "basketball": [1, { "aus": _4, "nz": _4 }], "bauhaus": _3, "bayern": _3, "bbc": _3, "bbt": _3, "bbva": _3, "bcg": _3, "bcn": _3, "beats": _3, "beauty": _3, "beer": _3, "bentley": _3, "berlin": _3, "best": _3, "bestbuy": _3, "bet": _3, "bharti": _3, "bible": _3, "bid": _3, "bike": _3, "bing": _3, "bingo": _3, "bio": _3, "black": _3, "blackfriday": _3, "blockbuster": _3, "blog": _3, "bloomberg": _3, "blue": _3, "bms": _3, "bmw": _3, "bnpparibas": _3, "boats": _3, "boehringer": _3, "bofa": _3, "bom": _3, "bond": _3, "boo": _3, "book": _3, "booking": _3, "bosch": _3, "bostik": _3, "boston": _3, "bot": _3, "boutique": _3, "box": _3, "bradesco": _3, "bridgestone": _3, "broadway": _3, "broker": _3, "brother": _3, "brussels": _3, "build": [1, { "v0": _4, "windsurf": _4 }], "builders": [1, { "cloudsite": _4 }], "business": _19, "buy": _3, "buzz": _3, "bzh": _3, "cab": _3, "cafe": _3, "cal": _3, "call": _3, "calvinklein": _3, "cam": _3, "camera": _3, "camp": [1, { "emf": [0, { "at": _4 }] }], "canon": _3, "capetown": _3, "capital": _3, "capitalone": _3, "car": _3, "caravan": _3, "cards": _3, "care": _3, "career": _3, "careers": _3, "cars": _3, "casa": [1, { "nabu": [0, { "ui": _4 }] }], "case": _3, "cash": _3, "casino": _3, "catering": _3, "catholic": _3, "cba": _3, "cbn": _3, "cbre": _3, "center": _3, "ceo": _3, "cern": _3, "cfa": _3, "cfd": _3, "chanel": _3, "channel": _3, "charity": _3, "chase": _3, "chat": _3, "cheap": _3, "chintai": _3, "christmas": _3, "chrome": _3, "church": _3, "cipriani": _3, "circle": _3, "cisco": _3, "citadel": _3, "citi": _3, "citic": _3, "city": _3, "claims": _3, "cleaning": _3, "click": _3, "clinic": _3, "clinique": _3, "clothing": _3, "cloud": [1, { "convex": _4, "elementor": _4, "encoway": [0, { "eu": _4 }], "statics": _7, "ravendb": _4, "axarnet": [0, { "es-1": _4 }], "diadem": _4, "jelastic": [0, { "vip": _4 }], "jele": _4, "jenv-aruba": [0, { "aruba": [0, { "eur": [0, { "it1": _4 }] }], "it1": _4 }], "keliweb": [2, { "cs": _4 }], "oxa": [2, { "tn": _4, "uk": _4 }], "primetel": [2, { "uk": _4 }], "reclaim": [0, { "ca": _4, "uk": _4, "us": _4 }], "trendhosting": [0, { "ch": _4, "de": _4 }], "jotelulu": _4, "kuleuven": _4, "laravel": _4, "linkyard": _4, "magentosite": _7, "matlab": _4, "observablehq": _4, "perspecta": _4, "vapor": _4, "on-rancher": _7, "scw": [0, { "baremetal": [0, { "fr-par-1": _4, "fr-par-2": _4, "nl-ams-1": _4 }], "fr-par": [0, { "cockpit": _4, "fnc": [2, { "functions": _4 }], "k8s": _21, "s3": _4, "s3-website": _4, "whm": _4 }], "instances": [0, { "priv": _4, "pub": _4 }], "k8s": _4, "nl-ams": [0, { "cockpit": _4, "k8s": _21, "s3": _4, "s3-website": _4, "whm": _4 }], "pl-waw": [0, { "cockpit": _4, "k8s": _21, "s3": _4, "s3-website": _4 }], "scalebook": _4, "smartlabeling": _4 }], "servebolt": _4, "onstackit": [0, { "runs": _4 }], "trafficplex": _4, "unison-services": _4, "urown": _4, "voorloper": _4, "zap": _4 }], "club": [1, { "cloudns": _4, "jele": _4, "barsy": _4 }], "clubmed": _3, "coach": _3, "codes": [1, { "owo": _7 }], "coffee": _3, "college": _3, "cologne": _3, "commbank": _3, "community": [1, { "nog": _4, "ravendb": _4, "myforum": _4 }], "company": _3, "compare": _3, "computer": _3, "comsec": _3, "condos": _3, "construction": _3, "consulting": _3, "contact": _3, "contractors": _3, "cooking": _3, "cool": [1, { "elementor": _4, "de": _4 }], "corsica": _3, "country": _3, "coupon": _3, "coupons": _3, "courses": _3, "cpa": _3, "credit": _3, "creditcard": _3, "creditunion": _3, "cricket": _3, "crown": _3, "crs": _3, "cruise": _3, "cruises": _3, "cuisinella": _3, "cymru": _3, "cyou": _3, "dad": _3, "dance": _3, "data": _3, "date": _3, "dating": _3, "datsun": _3, "day": _3, "dclk": _3, "dds": _3, "deal": _3, "dealer": _3, "deals": _3, "degree": _3, "delivery": _3, "dell": _3, "deloitte": _3, "delta": _3, "democrat": _3, "dental": _3, "dentist": _3, "desi": _3, "design": [1, { "graphic": _4, "bss": _4 }], "dev": [1, { "12chars": _4, "myaddr": _4, "panel": _4, "lcl": _7, "lclstage": _7, "stg": _7, "stgstage": _7, "pages": _4, "r2": _4, "workers": _4, "deno": _4, "deno-staging": _4, "deta": _4, "evervault": _9, "fly": _4, "githubpreview": _4, "gateway": _7, "hrsn": [2, { "psl": [0, { "sub": _4, "wc": [0, { "*": _4, "sub": _7 }] }] }], "botdash": _4, "inbrowser": _7, "is-a-good": _4, "is-a": _4, "iserv": _4, "runcontainers": _4, "localcert": [0, { "user": _7 }], "loginline": _4, "barsy": _4, "mediatech": _4, "modx": _4, "ngrok": _4, "ngrok-free": _4, "is-a-fullstack": _4, "is-cool": _4, "is-not-a": _4, "localplayer": _4, "xmit": _4, "platter-app": _4, "replit": [2, { "archer": _4, "bones": _4, "canary": _4, "global": _4, "hacker": _4, "id": _4, "janeway": _4, "kim": _4, "kira": _4, "kirk": _4, "odo": _4, "paris": _4, "picard": _4, "pike": _4, "prerelease": _4, "reed": _4, "riker": _4, "sisko": _4, "spock": _4, "staging": _4, "sulu": _4, "tarpit": _4, "teams": _4, "tucker": _4, "wesley": _4, "worf": _4 }], "crm": [0, { "d": _7, "w": _7, "wa": _7, "wb": _7, "wc": _7, "wd": _7, "we": _7, "wf": _7 }], "vercel": _4, "webhare": _7 }], "dhl": _3, "diamonds": _3, "diet": _3, "digital": [1, { "cloudapps": [2, { "london": _4 }] }], "direct": [1, { "libp2p": _4 }], "directory": _3, "discount": _3, "discover": _3, "dish": _3, "diy": _3, "dnp": _3, "docs": _3, "doctor": _3, "dog": _3, "domains": _3, "dot": _3, "download": _3, "drive": _3, "dtv": _3, "dubai": _3, "dunlop": _3, "dupont": _3, "durban": _3, "dvag": _3, "dvr": _3, "earth": _3, "eat": _3, "eco": _3, "edeka": _3, "education": _19, "email": [1, { "crisp": [0, { "on": _4 }], "tawk": _49, "tawkto": _49 }], "emerck": _3, "energy": _3, "engineer": _3, "engineering": _3, "enterprises": _3, "epson": _3, "equipment": _3, "ericsson": _3, "erni": _3, "esq": _3, "estate": [1, { "compute": _7 }], "eurovision": _3, "eus": [1, { "party": _50 }], "events": [1, { "koobin": _4, "co": _4 }], "exchange": _3, "expert": _3, "exposed": _3, "express": _3, "extraspace": _3, "fage": _3, "fail": _3, "fairwinds": _3, "faith": _3, "family": _3, "fan": _3, "fans": _3, "farm": [1, { "storj": _4 }], "farmers": _3, "fashion": _3, "fast": _3, "fedex": _3, "feedback": _3, "ferrari": _3, "ferrero": _3, "fidelity": _3, "fido": _3, "film": _3, "final": _3, "finance": _3, "financial": _19, "fire": _3, "firestone": _3, "firmdale": _3, "fish": _3, "fishing": _3, "fit": _3, "fitness": _3, "flickr": _3, "flights": _3, "flir": _3, "florist": _3, "flowers": _3, "fly": _3, "foo": _3, "food": _3, "football": _3, "ford": _3, "forex": _3, "forsale": _3, "forum": _3, "foundation": _3, "fox": _3, "free": _3, "fresenius": _3, "frl": _3, "frogans": _3, "frontier": _3, "ftr": _3, "fujitsu": _3, "fun": _3, "fund": _3, "furniture": _3, "futbol": _3, "fyi": _3, "gal": _3, "gallery": _3, "gallo": _3, "gallup": _3, "game": _3, "games": [1, { "pley": _4, "sheezy": _4 }], "gap": _3, "garden": _3, "gay": [1, { "pages": _4 }], "gbiz": _3, "gdn": [1, { "cnpy": _4 }], "gea": _3, "gent": _3, "genting": _3, "george": _3, "ggee": _3, "gift": _3, "gifts": _3, "gives": _3, "giving": _3, "glass": _3, "gle": _3, "global": [1, { "appwrite": _4 }], "globo": _3, "gmail": _3, "gmbh": _3, "gmo": _3, "gmx": _3, "godaddy": _3, "gold": _3, "goldpoint": _3, "golf": _3, "goo": _3, "goodyear": _3, "goog": [1, { "cloud": _4, "translate": _4, "usercontent": _7 }], "google": _3, "gop": _3, "got": _3, "grainger": _3, "graphics": _3, "gratis": _3, "green": _3, "gripe": _3, "grocery": _3, "group": [1, { "discourse": _4 }], "gucci": _3, "guge": _3, "guide": _3, "guitars": _3, "guru": _3, "hair": _3, "hamburg": _3, "hangout": _3, "haus": _3, "hbo": _3, "hdfc": _3, "hdfcbank": _3, "health": [1, { "hra": _4 }], "healthcare": _3, "help": _3, "helsinki": _3, "here": _3, "hermes": _3, "hiphop": _3, "hisamitsu": _3, "hitachi": _3, "hiv": _3, "hkt": _3, "hockey": _3, "holdings": _3, "holiday": _3, "homedepot": _3, "homegoods": _3, "homes": _3, "homesense": _3, "honda": _3, "horse": _3, "hospital": _3, "host": [1, { "cloudaccess": _4, "freesite": _4, "easypanel": _4, "fastvps": _4, "myfast": _4, "tempurl": _4, "wpmudev": _4, "jele": _4, "mircloud": _4, "wp2": _4, "half": _4 }], "hosting": [1, { "opencraft": _4 }], "hot": _3, "hotels": _3, "hotmail": _3, "house": _3, "how": _3, "hsbc": _3, "hughes": _3, "hyatt": _3, "hyundai": _3, "ibm": _3, "icbc": _3, "ice": _3, "icu": _3, "ieee": _3, "ifm": _3, "ikano": _3, "imamat": _3, "imdb": _3, "immo": _3, "immobilien": _3, "inc": _3, "industries": _3, "infiniti": _3, "ing": _3, "ink": _3, "institute": _3, "insurance": _3, "insure": _3, "international": _3, "intuit": _3, "investments": _3, "ipiranga": _3, "irish": _3, "ismaili": _3, "ist": _3, "istanbul": _3, "itau": _3, "itv": _3, "jaguar": _3, "java": _3, "jcb": _3, "jeep": _3, "jetzt": _3, "jewelry": _3, "jio": _3, "jll": _3, "jmp": _3, "jnj": _3, "joburg": _3, "jot": _3, "joy": _3, "jpmorgan": _3, "jprs": _3, "juegos": _3, "juniper": _3, "kaufen": _3, "kddi": _3, "kerryhotels": _3, "kerryproperties": _3, "kfh": _3, "kia": _3, "kids": _3, "kim": _3, "kindle": _3, "kitchen": _3, "kiwi": _3, "koeln": _3, "komatsu": _3, "kosher": _3, "kpmg": _3, "kpn": _3, "krd": [1, { "co": _4, "edu": _4 }], "kred": _3, "kuokgroup": _3, "kyoto": _3, "lacaixa": _3, "lamborghini": _3, "lamer": _3, "lancaster": _3, "land": _3, "landrover": _3, "lanxess": _3, "lasalle": _3, "lat": _3, "latino": _3, "latrobe": _3, "law": _3, "lawyer": _3, "lds": _3, "lease": _3, "leclerc": _3, "lefrak": _3, "legal": _3, "lego": _3, "lexus": _3, "lgbt": _3, "lidl": _3, "life": _3, "lifeinsurance": _3, "lifestyle": _3, "lighting": _3, "like": _3, "lilly": _3, "limited": _3, "limo": _3, "lincoln": _3, "link": [1, { "myfritz": _4, "cyon": _4, "dweb": _7, "inbrowser": _7, "nftstorage": _57, "mypep": _4, "storacha": _57, "w3s": _57 }], "live": [1, { "aem": _4, "hlx": _4, "ewp": _7 }], "living": _3, "llc": _3, "llp": _3, "loan": _3, "loans": _3, "locker": _3, "locus": _3, "lol": [1, { "omg": _4 }], "london": _3, "lotte": _3, "lotto": _3, "love": _3, "lpl": _3, "lplfinancial": _3, "ltd": _3, "ltda": _3, "lundbeck": _3, "luxe": _3, "luxury": _3, "madrid": _3, "maif": _3, "maison": _3, "makeup": _3, "man": _3, "management": _3, "mango": _3, "map": _3, "market": _3, "marketing": _3, "markets": _3, "marriott": _3, "marshalls": _3, "mattel": _3, "mba": _3, "mckinsey": _3, "med": _3, "media": _58, "meet": _3, "melbourne": _3, "meme": _3, "memorial": _3, "men": _3, "menu": [1, { "barsy": _4, "barsyonline": _4 }], "merck": _3, "merckmsd": _3, "miami": _3, "microsoft": _3, "mini": _3, "mint": _3, "mit": _3, "mitsubishi": _3, "mlb": _3, "mls": _3, "mma": _3, "mobile": _3, "moda": _3, "moe": _3, "moi": _3, "mom": [1, { "ind": _4 }], "monash": _3, "money": _3, "monster": _3, "mormon": _3, "mortgage": _3, "moscow": _3, "moto": _3, "motorcycles": _3, "mov": _3, "movie": _3, "msd": _3, "mtn": _3, "mtr": _3, "music": _3, "nab": _3, "nagoya": _3, "navy": _3, "nba": _3, "nec": _3, "netbank": _3, "netflix": _3, "network": [1, { "alces": _7, "co": _4, "arvo": _4, "azimuth": _4, "tlon": _4 }], "neustar": _3, "new": _3, "news": [1, { "noticeable": _4 }], "next": _3, "nextdirect": _3, "nexus": _3, "nfl": _3, "ngo": _3, "nhk": _3, "nico": _3, "nike": _3, "nikon": _3, "ninja": _3, "nissan": _3, "nissay": _3, "nokia": _3, "norton": _3, "now": _3, "nowruz": _3, "nowtv": _3, "nra": _3, "nrw": _3, "ntt": _3, "nyc": _3, "obi": _3, "observer": _3, "office": _3, "okinawa": _3, "olayan": _3, "olayangroup": _3, "ollo": _3, "omega": _3, "one": [1, { "kin": _7, "service": _4 }], "ong": [1, { "obl": _4 }], "onl": _3, "online": [1, { "eero": _4, "eero-stage": _4, "websitebuilder": _4, "barsy": _4 }], "ooo": _3, "open": _3, "oracle": _3, "orange": [1, { "tech": _4 }], "organic": _3, "origins": _3, "osaka": _3, "otsuka": _3, "ott": _3, "ovh": [1, { "nerdpol": _4 }], "page": [1, { "aem": _4, "hlx": _4, "hlx3": _4, "translated": _4, "codeberg": _4, "heyflow": _4, "prvcy": _4, "rocky": _4, "pdns": _4, "plesk": _4 }], "panasonic": _3, "paris": _3, "pars": _3, "partners": _3, "parts": _3, "party": _3, "pay": _3, "pccw": _3, "pet": _3, "pfizer": _3, "pharmacy": _3, "phd": _3, "philips": _3, "phone": _3, "photo": _3, "photography": _3, "photos": _58, "physio": _3, "pics": _3, "pictet": _3, "pictures": [1, { "1337": _4 }], "pid": _3, "pin": _3, "ping": _3, "pink": _3, "pioneer": _3, "pizza": [1, { "ngrok": _4 }], "place": _19, "play": _3, "playstation": _3, "plumbing": _3, "plus": _3, "pnc": _3, "pohl": _3, "poker": _3, "politie": _3, "porn": _3, "pramerica": _3, "praxi": _3, "press": _3, "prime": _3, "prod": _3, "productions": _3, "prof": _3, "progressive": _3, "promo": _3, "properties": _3, "property": _3, "protection": _3, "pru": _3, "prudential": _3, "pub": [1, { "id": _7, "kin": _7, "barsy": _4 }], "pwc": _3, "qpon": _3, "quebec": _3, "quest": _3, "racing": _3, "radio": _3, "read": _3, "realestate": _3, "realtor": _3, "realty": _3, "recipes": _3, "red": _3, "redstone": _3, "redumbrella": _3, "rehab": _3, "reise": _3, "reisen": _3, "reit": _3, "reliance": _3, "ren": _3, "rent": _3, "rentals": _3, "repair": _3, "report": _3, "republican": _3, "rest": _3, "restaurant": _3, "review": _3, "reviews": _3, "rexroth": _3, "rich": _3, "richardli": _3, "ricoh": _3, "ril": _3, "rio": _3, "rip": [1, { "clan": _4 }], "rocks": [1, { "myddns": _4, "stackit": _4, "lima-city": _4, "webspace": _4 }], "rodeo": _3, "rogers": _3, "room": _3, "rsvp": _3, "rugby": _3, "ruhr": _3, "run": [1, { "appwrite": _7, "development": _4, "ravendb": _4, "liara": [2, { "iran": _4 }], "servers": _4, "build": _7, "code": _7, "database": _7, "migration": _7, "onporter": _4, "repl": _4, "stackit": _4, "val": [0, { "express": _4, "web": _4 }], "wix": _4 }], "rwe": _3, "ryukyu": _3, "saarland": _3, "safe": _3, "safety": _3, "sakura": _3, "sale": _3, "salon": _3, "samsclub": _3, "samsung": _3, "sandvik": _3, "sandvikcoromant": _3, "sanofi": _3, "sap": _3, "sarl": _3, "sas": _3, "save": _3, "saxo": _3, "sbi": _3, "sbs": _3, "scb": _3, "schaeffler": _3, "schmidt": _3, "scholarships": _3, "school": _3, "schule": _3, "schwarz": _3, "science": _3, "scot": [1, { "gov": [2, { "service": _4 }] }], "search": _3, "seat": _3, "secure": _3, "security": _3, "seek": _3, "select": _3, "sener": _3, "services": [1, { "loginline": _4 }], "seven": _3, "sew": _3, "sex": _3, "sexy": _3, "sfr": _3, "shangrila": _3, "sharp": _3, "shell": _3, "shia": _3, "shiksha": _3, "shoes": _3, "shop": [1, { "base": _4, "hoplix": _4, "barsy": _4, "barsyonline": _4, "shopware": _4 }], "shopping": _3, "shouji": _3, "show": _3, "silk": _3, "sina": _3, "singles": _3, "site": [1, { "square": _4, "canva": _22, "cloudera": _7, "convex": _4, "cyon": _4, "fastvps": _4, "figma": _4, "heyflow": _4, "jele": _4, "jouwweb": _4, "loginline": _4, "barsy": _4, "notion": _4, "omniwe": _4, "opensocial": _4, "madethis": _4, "platformsh": _7, "tst": _7, "byen": _4, "srht": _4, "novecore": _4, "cpanel": _4, "wpsquared": _4 }], "ski": _3, "skin": _3, "sky": _3, "skype": _3, "sling": _3, "smart": _3, "smile": _3, "sncf": _3, "soccer": _3, "social": _3, "softbank": _3, "software": _3, "sohu": _3, "solar": _3, "solutions": _3, "song": _3, "sony": _3, "soy": _3, "spa": _3, "space": [1, { "myfast": _4, "heiyu": _4, "hf": [2, { "static": _4 }], "app-ionos": _4, "project": _4, "uber": _4, "xs4all": _4 }], "sport": _3, "spot": _3, "srl": _3, "stada": _3, "staples": _3, "star": _3, "statebank": _3, "statefarm": _3, "stc": _3, "stcgroup": _3, "stockholm": _3, "storage": _3, "store": [1, { "barsy": _4, "sellfy": _4, "shopware": _4, "storebase": _4 }], "stream": _3, "studio": _3, "study": _3, "style": _3, "sucks": _3, "supplies": _3, "supply": _3, "support": [1, { "barsy": _4 }], "surf": _3, "surgery": _3, "suzuki": _3, "swatch": _3, "swiss": _3, "sydney": _3, "systems": [1, { "knightpoint": _4 }], "tab": _3, "taipei": _3, "talk": _3, "taobao": _3, "target": _3, "tatamotors": _3, "tatar": _3, "tattoo": _3, "tax": _3, "taxi": _3, "tci": _3, "tdk": _3, "team": [1, { "discourse": _4, "jelastic": _4 }], "tech": [1, { "cleverapps": _4 }], "technology": _19, "temasek": _3, "tennis": _3, "teva": _3, "thd": _3, "theater": _3, "theatre": _3, "tiaa": _3, "tickets": _3, "tienda": _3, "tips": _3, "tires": _3, "tirol": _3, "tjmaxx": _3, "tjx": _3, "tkmaxx": _3, "tmall": _3, "today": [1, { "prequalifyme": _4 }], "tokyo": _3, "tools": [1, { "addr": _47, "myaddr": _4 }], "top": [1, { "ntdll": _4, "wadl": _7 }], "toray": _3, "toshiba": _3, "total": _3, "tours": _3, "town": _3, "toyota": _3, "toys": _3, "trade": _3, "trading": _3, "training": _3, "travel": _3, "travelers": _3, "travelersinsurance": _3, "trust": _3, "trv": _3, "tube": _3, "tui": _3, "tunes": _3, "tushu": _3, "tvs": _3, "ubank": _3, "ubs": _3, "unicom": _3, "university": _3, "uno": _3, "uol": _3, "ups": _3, "vacations": _3, "vana": _3, "vanguard": _3, "vegas": _3, "ventures": _3, "verisign": _3, "versicherung": _3, "vet": _3, "viajes": _3, "video": _3, "vig": _3, "viking": _3, "villas": _3, "vin": _3, "vip": _3, "virgin": _3, "visa": _3, "vision": _3, "viva": _3, "vivo": _3, "vlaanderen": _3, "vodka": _3, "volvo": _3, "vote": _3, "voting": _3, "voto": _3, "voyage": _3, "wales": _3, "walmart": _3, "walter": _3, "wang": _3, "wanggou": _3, "watch": _3, "watches": _3, "weather": _3, "weatherchannel": _3, "webcam": _3, "weber": _3, "website": _58, "wed": _3, "wedding": _3, "weibo": _3, "weir": _3, "whoswho": _3, "wien": _3, "wiki": _58, "williamhill": _3, "win": _3, "windows": _3, "wine": _3, "winners": _3, "wme": _3, "wolterskluwer": _3, "woodside": _3, "work": _3, "works": _3, "world": _3, "wow": _3, "wtc": _3, "wtf": _3, "xbox": _3, "xerox": _3, "xihuan": _3, "xin": _3, "xn--11b4c3d": _3, "\u0915\u0949\u092E": _3, "xn--1ck2e1b": _3, "\u30BB\u30FC\u30EB": _3, "xn--1qqw23a": _3, "\u4F5B\u5C71": _3, "xn--30rr7y": _3, "\u6148\u5584": _3, "xn--3bst00m": _3, "\u96C6\u56E2": _3, "xn--3ds443g": _3, "\u5728\u7EBF": _3, "xn--3pxu8k": _3, "\u70B9\u770B": _3, "xn--42c2d9a": _3, "\u0E04\u0E2D\u0E21": _3, "xn--45q11c": _3, "\u516B\u5366": _3, "xn--4gbrim": _3, "\u0645\u0648\u0642\u0639": _3, "xn--55qw42g": _3, "\u516C\u76CA": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--5su34j936bgsg": _3, "\u9999\u683C\u91CC\u62C9": _3, "xn--5tzm5g": _3, "\u7F51\u7AD9": _3, "xn--6frz82g": _3, "\u79FB\u52A8": _3, "xn--6qq986b3xl": _3, "\u6211\u7231\u4F60": _3, "xn--80adxhks": _3, "\u043C\u043E\u0441\u043A\u0432\u0430": _3, "xn--80aqecdr1a": _3, "\u043A\u0430\u0442\u043E\u043B\u0438\u043A": _3, "xn--80asehdb": _3, "\u043E\u043D\u043B\u0430\u0439\u043D": _3, "xn--80aswg": _3, "\u0441\u0430\u0439\u0442": _3, "xn--8y0a063a": _3, "\u8054\u901A": _3, "xn--9dbq2a": _3, "\u05E7\u05D5\u05DD": _3, "xn--9et52u": _3, "\u65F6\u5C1A": _3, "xn--9krt00a": _3, "\u5FAE\u535A": _3, "xn--b4w605ferd": _3, "\u6DE1\u9A6C\u9521": _3, "xn--bck1b9a5dre4c": _3, "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3": _3, "xn--c1avg": _3, "\u043E\u0440\u0433": _3, "xn--c2br7g": _3, "\u0928\u0947\u091F": _3, "xn--cck2b3b": _3, "\u30B9\u30C8\u30A2": _3, "xn--cckwcxetd": _3, "\u30A2\u30DE\u30BE\u30F3": _3, "xn--cg4bki": _3, "\uC0BC\uC131": _3, "xn--czr694b": _3, "\u5546\u6807": _3, "xn--czrs0t": _3, "\u5546\u5E97": _3, "xn--czru2d": _3, "\u5546\u57CE": _3, "xn--d1acj3b": _3, "\u0434\u0435\u0442\u0438": _3, "xn--eckvdtc9d": _3, "\u30DD\u30A4\u30F3\u30C8": _3, "xn--efvy88h": _3, "\u65B0\u95FB": _3, "xn--fct429k": _3, "\u5BB6\u96FB": _3, "xn--fhbei": _3, "\u0643\u0648\u0645": _3, "xn--fiq228c5hs": _3, "\u4E2D\u6587\u7F51": _3, "xn--fiq64b": _3, "\u4E2D\u4FE1": _3, "xn--fjq720a": _3, "\u5A31\u4E50": _3, "xn--flw351e": _3, "\u8C37\u6B4C": _3, "xn--fzys8d69uvgm": _3, "\u96FB\u8A0A\u76C8\u79D1": _3, "xn--g2xx48c": _3, "\u8D2D\u7269": _3, "xn--gckr3f0f": _3, "\u30AF\u30E9\u30A6\u30C9": _3, "xn--gk3at1e": _3, "\u901A\u8CA9": _3, "xn--hxt814e": _3, "\u7F51\u5E97": _3, "xn--i1b6b1a6a2e": _3, "\u0938\u0902\u0917\u0920\u0928": _3, "xn--imr513n": _3, "\u9910\u5385": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "xn--j1aef": _3, "\u043A\u043E\u043C": _3, "xn--jlq480n2rg": _3, "\u4E9A\u9A6C\u900A": _3, "xn--jvr189m": _3, "\u98DF\u54C1": _3, "xn--kcrx77d1x4a": _3, "\u98DE\u5229\u6D66": _3, "xn--kput3i": _3, "\u624B\u673A": _3, "xn--mgba3a3ejt": _3, "\u0627\u0631\u0627\u0645\u0643\u0648": _3, "xn--mgba7c0bbn0a": _3, "\u0627\u0644\u0639\u0644\u064A\u0627\u0646": _3, "xn--mgbab2bd": _3, "\u0628\u0627\u0632\u0627\u0631": _3, "xn--mgbca7dzdo": _3, "\u0627\u0628\u0648\u0638\u0628\u064A": _3, "xn--mgbi4ecexp": _3, "\u0643\u0627\u062B\u0648\u0644\u064A\u0643": _3, "xn--mgbt3dhd": _3, "\u0647\u0645\u0631\u0627\u0647": _3, "xn--mk1bu44c": _3, "\uB2F7\uCEF4": _3, "xn--mxtq1m": _3, "\u653F\u5E9C": _3, "xn--ngbc5azd": _3, "\u0634\u0628\u0643\u0629": _3, "xn--ngbe9e0a": _3, "\u0628\u064A\u062A\u0643": _3, "xn--ngbrx": _3, "\u0639\u0631\u0628": _3, "xn--nqv7f": _3, "\u673A\u6784": _3, "xn--nqv7fs00ema": _3, "\u7EC4\u7EC7\u673A\u6784": _3, "xn--nyqy26a": _3, "\u5065\u5EB7": _3, "xn--otu796d": _3, "\u62DB\u8058": _3, "xn--p1acf": [1, { "xn--90amc": _4, "xn--j1aef": _4, "xn--j1ael8b": _4, "xn--h1ahn": _4, "xn--j1adp": _4, "xn--c1avg": _4, "xn--80aaa0cvac": _4, "xn--h1aliz": _4, "xn--90a1af": _4, "xn--41a": _4 }], "\u0440\u0443\u0441": [1, { "\u0431\u0438\u0437": _4, "\u043A\u043E\u043C": _4, "\u043A\u0440\u044B\u043C": _4, "\u043C\u0438\u0440": _4, "\u043C\u0441\u043A": _4, "\u043E\u0440\u0433": _4, "\u0441\u0430\u043C\u0430\u0440\u0430": _4, "\u0441\u043E\u0447\u0438": _4, "\u0441\u043F\u0431": _4, "\u044F": _4 }], "xn--pssy2u": _3, "\u5927\u62FF": _3, "xn--q9jyb4c": _3, "\u307F\u3093\u306A": _3, "xn--qcka1pmc": _3, "\u30B0\u30FC\u30B0\u30EB": _3, "xn--rhqv96g": _3, "\u4E16\u754C": _3, "xn--rovu88b": _3, "\u66F8\u7C4D": _3, "xn--ses554g": _3, "\u7F51\u5740": _3, "xn--t60b56a": _3, "\uB2F7\uB137": _3, "xn--tckwe": _3, "\u30B3\u30E0": _3, "xn--tiq49xqyj": _3, "\u5929\u4E3B\u6559": _3, "xn--unup4y": _3, "\u6E38\u620F": _3, "xn--vermgensberater-ctb": _3, "verm\xF6gensberater": _3, "xn--vermgensberatung-pwb": _3, "verm\xF6gensberatung": _3, "xn--vhquv": _3, "\u4F01\u4E1A": _3, "xn--vuq861b": _3, "\u4FE1\u606F": _3, "xn--w4r85el8fhu5dnra": _3, "\u5609\u91CC\u5927\u9152\u5E97": _3, "xn--w4rs40l": _3, "\u5609\u91CC": _3, "xn--xhq521b": _3, "\u5E7F\u4E1C": _3, "xn--zfr164b": _3, "\u653F\u52A1": _3, "xyz": [1, { "botdash": _4, "telebit": _7 }], "yachts": _3, "yahoo": _3, "yamaxun": _3, "yandex": _3, "yodobashi": _3, "yoga": _3, "yokohama": _3, "you": _3, "youtube": _3, "yun": _3, "zappos": _3, "zara": _3, "zero": _3, "zip": _3, "zone": [1, { "cloud66": _4, "triton": _7, "stackit": _4, "lima": _4 }], "zuerich": _3 }];
      return rules2;
    })();
    function lookupInTrie(parts, trie, index, allowedMask) {
      let result = null;
      let node = trie;
      while (node !== void 0) {
        if ((node[0] & allowedMask) !== 0) {
          result = {
            index: index + 1,
            isIcann: node[0] === 1,
            isPrivate: node[0] === 2
          };
        }
        if (index === -1) {
          break;
        }
        const succ = node[1];
        node = Object.prototype.hasOwnProperty.call(succ, parts[index]) ? succ[parts[index]] : succ["*"];
        index -= 1;
      }
      return result;
    }
    function suffixLookup(hostname, options, out) {
      var _a;
      if (fastPathLookup(hostname, options, out)) {
        return;
      }
      const hostnameParts = hostname.split(".");
      const allowedMask = (options.allowPrivateDomains ? 2 : 0) | (options.allowIcannDomains ? 1 : 0);
      const exceptionMatch = lookupInTrie(hostnameParts, exceptions, hostnameParts.length - 1, allowedMask);
      if (exceptionMatch !== null) {
        out.isIcann = exceptionMatch.isIcann;
        out.isPrivate = exceptionMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(exceptionMatch.index + 1).join(".");
        return;
      }
      const rulesMatch = lookupInTrie(hostnameParts, rules, hostnameParts.length - 1, allowedMask);
      if (rulesMatch !== null) {
        out.isIcann = rulesMatch.isIcann;
        out.isPrivate = rulesMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(rulesMatch.index).join(".");
        return;
      }
      out.isIcann = false;
      out.isPrivate = false;
      out.publicSuffix = (_a = hostnameParts[hostnameParts.length - 1]) !== null && _a !== void 0 ? _a : null;
    }
    var RESULT = getEmptyResult();
    function parse(url, options = {}) {
      return parseImpl(url, 5, suffixLookup, options, getEmptyResult());
    }
    function getHostname(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 0, suffixLookup, options, RESULT).hostname;
    }
    function getPublicSuffix(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 2, suffixLookup, options, RESULT).publicSuffix;
    }
    function getDomain(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 3, suffixLookup, options, RESULT).domain;
    }
    function getSubdomain(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 4, suffixLookup, options, RESULT).subdomain;
    }
    function getDomainWithoutSuffix(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 5, suffixLookup, options, RESULT).domainWithoutSuffix;
    }
    exports.getDomain = getDomain;
    exports.getDomainWithoutSuffix = getDomainWithoutSuffix;
    exports.getHostname = getHostname;
    exports.getPublicSuffix = getPublicSuffix;
    exports.getSubdomain = getSubdomain;
    exports.parse = parse;
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/getPublicSuffix.js
var require_getPublicSuffix = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/getPublicSuffix.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPublicSuffix = getPublicSuffix;
    var tldts_1 = require_cjs();
    var SPECIAL_USE_DOMAINS = ["local", "example", "invalid", "localhost", "test"];
    var SPECIAL_TREATMENT_DOMAINS = ["localhost", "invalid"];
    var defaultGetPublicSuffixOptions = {
      allowSpecialUseDomain: false,
      ignoreError: false
    };
    function getPublicSuffix(domain, options = {}) {
      options = { ...defaultGetPublicSuffixOptions, ...options };
      const domainParts = domain.split(".");
      const topLevelDomain = domainParts[domainParts.length - 1];
      const allowSpecialUseDomain = !!options.allowSpecialUseDomain;
      const ignoreError = !!options.ignoreError;
      if (allowSpecialUseDomain && topLevelDomain !== void 0 && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
        if (domainParts.length > 1) {
          const secondLevelDomain = domainParts[domainParts.length - 2];
          return `${secondLevelDomain}.${topLevelDomain}`;
        } else if (SPECIAL_TREATMENT_DOMAINS.includes(topLevelDomain)) {
          return topLevelDomain;
        }
      }
      if (!ignoreError && topLevelDomain !== void 0 && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
        throw new Error(`Cookie has domain set to the public suffix "${topLevelDomain}" which is a special use domain. To allow this, configure your CookieJar with {allowSpecialUseDomain: true, rejectPublicSuffixes: false}.`);
      }
      const publicSuffix = (0, tldts_1.getDomain)(domain, {
        allowIcannDomains: true,
        allowPrivateDomains: true
      });
      if (publicSuffix)
        return publicSuffix;
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/permuteDomain.js
var require_permuteDomain = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/permuteDomain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.permuteDomain = permuteDomain;
    var getPublicSuffix_1 = require_getPublicSuffix();
    function permuteDomain(domain, allowSpecialUseDomain) {
      const pubSuf = (0, getPublicSuffix_1.getPublicSuffix)(domain, {
        allowSpecialUseDomain
      });
      if (!pubSuf) {
        return void 0;
      }
      if (pubSuf == domain) {
        return [domain];
      }
      if (domain.slice(-1) == ".") {
        domain = domain.slice(0, -1);
      }
      const prefix = domain.slice(0, -(pubSuf.length + 1));
      const parts = prefix.split(".").reverse();
      let cur = pubSuf;
      const permutations = [cur];
      while (parts.length) {
        const part = parts.shift();
        cur = `${part}.${cur}`;
        permutations.push(cur);
      }
      return permutations;
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/store.js
var require_store = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/store.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Store = void 0;
    var Store = class {
      constructor() {
        this.synchronous = false;
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookie(_domain, _path, _key, _callback) {
        throw new Error("findCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookies(_domain, _path, _allowSpecialUseDomain = false, _callback) {
        throw new Error("findCookies is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      putCookie(_cookie, _callback) {
        throw new Error("putCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      updateCookie(_oldCookie, _newCookie, _callback) {
        throw new Error("updateCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookie(_domain, _path, _key, _callback) {
        throw new Error("removeCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookies(_domain, _path, _callback) {
        throw new Error("removeCookies is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeAllCookies(_callback) {
        throw new Error("removeAllCookies is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      getAllCookies(_callback) {
        throw new Error("getAllCookies is not implemented (therefore jar cannot be serialized)");
      }
    };
    exports.Store = Store;
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.safeToString = exports.objectToString = void 0;
    exports.createPromiseCallback = createPromiseCallback;
    exports.inOperator = inOperator;
    var objectToString = (obj) => Object.prototype.toString.call(obj);
    exports.objectToString = objectToString;
    var safeArrayToString = (arr, seenArrays) => {
      if (typeof arr.join !== "function")
        return (0, exports.objectToString)(arr);
      seenArrays.add(arr);
      const mapped = arr.map((val) => val === null || val === void 0 || seenArrays.has(val) ? "" : safeToStringImpl(val, seenArrays));
      return mapped.join();
    };
    var safeToStringImpl = (val, seenArrays = /* @__PURE__ */ new WeakSet()) => {
      if (typeof val !== "object" || val === null) {
        return String(val);
      } else if (typeof val.toString === "function") {
        return Array.isArray(val) ? (
          // Arrays have a weird custom toString that we need to replicate
          safeArrayToString(val, seenArrays)
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          String(val)
        );
      } else {
        return (0, exports.objectToString)(val);
      }
    };
    var safeToString = (val) => safeToStringImpl(val);
    exports.safeToString = safeToString;
    function createPromiseCallback(cb) {
      let callback;
      let resolve;
      let reject;
      const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      if (typeof cb === "function") {
        callback = (err, result) => {
          try {
            if (err)
              cb(err);
            else
              cb(null, result);
          } catch (e) {
            reject(e instanceof Error ? e : new Error());
          }
        };
      } else {
        callback = (err, result) => {
          try {
            if (err)
              reject(err);
            else
              resolve(result);
          } catch (e) {
            reject(e instanceof Error ? e : new Error());
          }
        };
      }
      return {
        promise,
        callback,
        resolve: (value) => {
          callback(null, value);
          return promise;
        },
        reject: (error) => {
          callback(error);
          return promise;
        }
      };
    }
    function inOperator(k, o) {
      return k in o;
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/memstore.js
var require_memstore = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/memstore.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MemoryCookieStore = void 0;
    var pathMatch_1 = require_pathMatch();
    var permuteDomain_1 = require_permuteDomain();
    var store_1 = require_store();
    var utils_1 = require_utils();
    var MemoryCookieStore = class extends store_1.Store {
      /**
       * Create a new {@link MemoryCookieStore}.
       */
      constructor() {
        super();
        this.synchronous = true;
        this.idx = /* @__PURE__ */ Object.create(null);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookie(domain, path, key, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        if (domain == null || path == null || key == null) {
          return promiseCallback.resolve(void 0);
        }
        const result = this.idx[domain]?.[path]?.[key];
        return promiseCallback.resolve(result);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookies(domain, path, allowSpecialUseDomain = false, callback) {
        if (typeof allowSpecialUseDomain === "function") {
          callback = allowSpecialUseDomain;
          allowSpecialUseDomain = true;
        }
        const results = [];
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        if (!domain) {
          return promiseCallback.resolve([]);
        }
        let pathMatcher;
        if (!path) {
          pathMatcher = function matchAll(domainIndex) {
            for (const curPath in domainIndex) {
              const pathIndex = domainIndex[curPath];
              for (const key in pathIndex) {
                const value = pathIndex[key];
                if (value) {
                  results.push(value);
                }
              }
            }
          };
        } else {
          pathMatcher = function matchRFC(domainIndex) {
            for (const cookiePath in domainIndex) {
              if ((0, pathMatch_1.pathMatch)(path, cookiePath)) {
                const pathIndex = domainIndex[cookiePath];
                for (const key in pathIndex) {
                  const value = pathIndex[key];
                  if (value) {
                    results.push(value);
                  }
                }
              }
            }
          };
        }
        const domains = (0, permuteDomain_1.permuteDomain)(domain, allowSpecialUseDomain) || [domain];
        const idx = this.idx;
        domains.forEach((curDomain) => {
          const domainIndex = idx[curDomain];
          if (!domainIndex) {
            return;
          }
          pathMatcher(domainIndex);
        });
        return promiseCallback.resolve(results);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      putCookie(cookie, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const { domain, path, key } = cookie;
        if (domain == null || path == null || key == null) {
          return promiseCallback.resolve(void 0);
        }
        const domainEntry = this.idx[domain] ?? /* @__PURE__ */ Object.create(null);
        this.idx[domain] = domainEntry;
        const pathEntry = domainEntry[path] ?? /* @__PURE__ */ Object.create(null);
        domainEntry[path] = pathEntry;
        pathEntry[key] = cookie;
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      updateCookie(_oldCookie, newCookie, callback) {
        if (callback)
          this.putCookie(newCookie, callback);
        else
          return this.putCookie(newCookie);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookie(domain, path, key, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        delete this.idx[domain]?.[path]?.[key];
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookies(domain, path, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const domainEntry = this.idx[domain];
        if (domainEntry) {
          if (path) {
            delete domainEntry[path];
          } else {
            delete this.idx[domain];
          }
        }
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        this.idx = /* @__PURE__ */ Object.create(null);
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      getAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cookies = [];
        const idx = this.idx;
        const domains = Object.keys(idx);
        domains.forEach((domain) => {
          const domainEntry = idx[domain] ?? {};
          const paths = Object.keys(domainEntry);
          paths.forEach((path) => {
            const pathEntry = domainEntry[path] ?? {};
            const keys = Object.keys(pathEntry);
            keys.forEach((key) => {
              const keyEntry = pathEntry[key];
              if (keyEntry != null) {
                cookies.push(keyEntry);
              }
            });
          });
        });
        cookies.sort((a, b) => {
          return (a.creationIndex || 0) - (b.creationIndex || 0);
        });
        return promiseCallback.resolve(cookies);
      }
    };
    exports.MemoryCookieStore = MemoryCookieStore;
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/validators.js
var require_validators = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/validators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParameterError = void 0;
    exports.isNonEmptyString = isNonEmptyString;
    exports.isDate = isDate;
    exports.isEmptyString = isEmptyString;
    exports.isString = isString;
    exports.isObject = isObject;
    exports.isInteger = isInteger;
    exports.validate = validate;
    var utils_1 = require_utils();
    function isNonEmptyString(data) {
      return isString(data) && data !== "";
    }
    function isDate(data) {
      return data instanceof Date && isInteger(data.getTime());
    }
    function isEmptyString(data) {
      return data === "" || data instanceof String && data.toString() === "";
    }
    function isString(data) {
      return typeof data === "string" || data instanceof String;
    }
    function isObject(data) {
      return (0, utils_1.objectToString)(data) === "[object Object]";
    }
    function isInteger(data) {
      return typeof data === "number" && data % 1 === 0;
    }
    function validate(bool, cbOrMessage, message) {
      if (bool)
        return;
      const cb = typeof cbOrMessage === "function" ? cbOrMessage : void 0;
      let options = typeof cbOrMessage === "function" ? message : cbOrMessage;
      if (!isObject(options))
        options = "[object Object]";
      const err = new ParameterError((0, utils_1.safeToString)(options));
      if (cb)
        cb(err);
      else
        throw err;
    }
    var ParameterError = class extends Error {
    };
    exports.ParameterError = ParameterError;
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/version.js
var require_version = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.version = void 0;
    exports.version = "5.1.2";
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IP_V6_REGEX_OBJECT = exports.PrefixSecurityEnum = void 0;
    exports.PrefixSecurityEnum = {
      SILENT: "silent",
      STRICT: "strict",
      DISABLED: "unsafe-disabled"
    };
    Object.freeze(exports.PrefixSecurityEnum);
    var IP_V6_REGEX = `
\\[?(?:
(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|
(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|
(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|
(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|
(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:))
)(?:%[0-9a-zA-Z]{1,})?\\]?
`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
    exports.IP_V6_REGEX_OBJECT = new RegExp(`^${IP_V6_REGEX}$`);
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/canonicalDomain.js
var require_canonicalDomain = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/canonicalDomain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.canonicalDomain = canonicalDomain;
    var constants_1 = require_constants();
    function domainToASCII(domain) {
      return new URL(`http://${domain}`).hostname;
    }
    function canonicalDomain(domainName) {
      if (domainName == null) {
        return void 0;
      }
      let str = domainName.trim().replace(/^\./, "");
      if (constants_1.IP_V6_REGEX_OBJECT.test(str)) {
        if (!str.startsWith("[")) {
          str = "[" + str;
        }
        if (!str.endsWith("]")) {
          str = str + "]";
        }
        return domainToASCII(str).slice(1, -1);
      }
      if (/[^\u0001-\u007f]/.test(str)) {
        return domainToASCII(str);
      }
      return str.toLowerCase();
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/formatDate.js
var require_formatDate = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/formatDate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatDate = formatDate;
    function formatDate(date) {
      return date.toUTCString();
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/parseDate.js
var require_parseDate = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/parseDate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseDate = parseDate;
    var DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;
    var MONTH_TO_NUM = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11
    };
    function parseDigits(token, minDigits, maxDigits, trailingOK) {
      let count = 0;
      while (count < token.length) {
        const c = token.charCodeAt(count);
        if (c <= 47 || c >= 58) {
          break;
        }
        count++;
      }
      if (count < minDigits || count > maxDigits) {
        return;
      }
      if (!trailingOK && count != token.length) {
        return;
      }
      return parseInt(token.slice(0, count), 10);
    }
    function parseTime(token) {
      const parts = token.split(":");
      const result = [0, 0, 0];
      if (parts.length !== 3) {
        return;
      }
      for (let i = 0; i < 3; i++) {
        const trailingOK = i == 2;
        const numPart = parts[i];
        if (numPart === void 0) {
          return;
        }
        const num = parseDigits(numPart, 1, 2, trailingOK);
        if (num === void 0) {
          return;
        }
        result[i] = num;
      }
      return result;
    }
    function parseMonth(token) {
      token = String(token).slice(0, 3).toLowerCase();
      switch (token) {
        case "jan":
          return MONTH_TO_NUM.jan;
        case "feb":
          return MONTH_TO_NUM.feb;
        case "mar":
          return MONTH_TO_NUM.mar;
        case "apr":
          return MONTH_TO_NUM.apr;
        case "may":
          return MONTH_TO_NUM.may;
        case "jun":
          return MONTH_TO_NUM.jun;
        case "jul":
          return MONTH_TO_NUM.jul;
        case "aug":
          return MONTH_TO_NUM.aug;
        case "sep":
          return MONTH_TO_NUM.sep;
        case "oct":
          return MONTH_TO_NUM.oct;
        case "nov":
          return MONTH_TO_NUM.nov;
        case "dec":
          return MONTH_TO_NUM.dec;
        default:
          return;
      }
    }
    function parseDate(cookieDate) {
      if (!cookieDate) {
        return;
      }
      const tokens = cookieDate.split(DATE_DELIM);
      let hour;
      let minute;
      let second;
      let dayOfMonth;
      let month;
      let year;
      for (let i = 0; i < tokens.length; i++) {
        const token = (tokens[i] ?? "").trim();
        if (!token.length) {
          continue;
        }
        if (second === void 0) {
          const result = parseTime(token);
          if (result) {
            hour = result[0];
            minute = result[1];
            second = result[2];
            continue;
          }
        }
        if (dayOfMonth === void 0) {
          const result = parseDigits(token, 1, 2, true);
          if (result !== void 0) {
            dayOfMonth = result;
            continue;
          }
        }
        if (month === void 0) {
          const result = parseMonth(token);
          if (result !== void 0) {
            month = result;
            continue;
          }
        }
        if (year === void 0) {
          const result = parseDigits(token, 2, 4, true);
          if (result !== void 0) {
            year = result;
            if (year >= 70 && year <= 99) {
              year += 1900;
            } else if (year >= 0 && year <= 69) {
              year += 2e3;
            }
          }
        }
      }
      if (dayOfMonth === void 0 || month === void 0 || year === void 0 || hour === void 0 || minute === void 0 || second === void 0 || dayOfMonth < 1 || dayOfMonth > 31 || year < 1601 || hour > 23 || minute > 59 || second > 59) {
        return;
      }
      return new Date(Date.UTC(year, month, dayOfMonth, hour, minute, second));
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookie.js
var require_cookie = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookie.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cookie = void 0;
    var getPublicSuffix_1 = require_getPublicSuffix();
    var validators = __importStar(require_validators());
    var utils_1 = require_utils();
    var formatDate_1 = require_formatDate();
    var parseDate_1 = require_parseDate();
    var canonicalDomain_1 = require_canonicalDomain();
    var COOKIE_OCTETS = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/;
    var PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/;
    var CONTROL_CHARS = /[\x00-\x1F]/;
    var TERMINATORS = ["\n", "\r", "\0"];
    function trimTerminator(str) {
      if (validators.isEmptyString(str))
        return str;
      for (let t = 0; t < TERMINATORS.length; t++) {
        const terminator = TERMINATORS[t];
        const terminatorIdx = terminator ? str.indexOf(terminator) : -1;
        if (terminatorIdx !== -1) {
          str = str.slice(0, terminatorIdx);
        }
      }
      return str;
    }
    function parseCookiePair(cookiePair, looseMode) {
      cookiePair = trimTerminator(cookiePair);
      let firstEq = cookiePair.indexOf("=");
      if (looseMode) {
        if (firstEq === 0) {
          cookiePair = cookiePair.substring(1);
          firstEq = cookiePair.indexOf("=");
        }
      } else {
        if (firstEq <= 0) {
          return void 0;
        }
      }
      let cookieName, cookieValue;
      if (firstEq <= 0) {
        cookieName = "";
        cookieValue = cookiePair.trim();
      } else {
        cookieName = cookiePair.slice(0, firstEq).trim();
        cookieValue = cookiePair.slice(firstEq + 1).trim();
      }
      if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
        return void 0;
      }
      const c = new Cookie();
      c.key = cookieName;
      c.value = cookieValue;
      return c;
    }
    function parse(str, options) {
      if (validators.isEmptyString(str) || !validators.isString(str)) {
        return void 0;
      }
      str = str.trim();
      const firstSemi = str.indexOf(";");
      const cookiePair = firstSemi === -1 ? str : str.slice(0, firstSemi);
      const c = parseCookiePair(cookiePair, options?.loose ?? false);
      if (!c) {
        return void 0;
      }
      if (firstSemi === -1) {
        return c;
      }
      const unparsed = str.slice(firstSemi + 1).trim();
      if (unparsed.length === 0) {
        return c;
      }
      const cookie_avs = unparsed.split(";");
      while (cookie_avs.length) {
        const av = (cookie_avs.shift() ?? "").trim();
        if (av.length === 0) {
          continue;
        }
        const av_sep = av.indexOf("=");
        let av_key, av_value;
        if (av_sep === -1) {
          av_key = av;
          av_value = null;
        } else {
          av_key = av.slice(0, av_sep);
          av_value = av.slice(av_sep + 1);
        }
        av_key = av_key.trim().toLowerCase();
        if (av_value) {
          av_value = av_value.trim();
        }
        switch (av_key) {
          case "expires":
            if (av_value) {
              const exp = (0, parseDate_1.parseDate)(av_value);
              if (exp) {
                c.expires = exp;
              }
            }
            break;
          case "max-age":
            if (av_value) {
              if (/^-?[0-9]+$/.test(av_value)) {
                const delta = parseInt(av_value, 10);
                c.setMaxAge(delta);
              }
            }
            break;
          case "domain":
            if (av_value) {
              const domain = av_value.trim().replace(/^\./, "");
              if (domain) {
                c.domain = domain.toLowerCase();
              }
            }
            break;
          case "path":
            c.path = av_value && av_value[0] === "/" ? av_value : null;
            break;
          case "secure":
            c.secure = true;
            break;
          case "httponly":
            c.httpOnly = true;
            break;
          case "samesite":
            switch (av_value ? av_value.toLowerCase() : "") {
              case "strict":
                c.sameSite = "strict";
                break;
              case "lax":
                c.sameSite = "lax";
                break;
              case "none":
                c.sameSite = "none";
                break;
              default:
                c.sameSite = void 0;
                break;
            }
            break;
          default:
            c.extensions = c.extensions || [];
            c.extensions.push(av);
            break;
        }
      }
      return c;
    }
    function fromJSON(str) {
      if (!str || validators.isEmptyString(str)) {
        return void 0;
      }
      let obj;
      if (typeof str === "string") {
        try {
          obj = JSON.parse(str);
        } catch {
          return void 0;
        }
      } else {
        obj = str;
      }
      const c = new Cookie();
      Cookie.serializableProperties.forEach((prop) => {
        if (obj && typeof obj === "object" && (0, utils_1.inOperator)(prop, obj)) {
          const val = obj[prop];
          if (val === void 0) {
            return;
          }
          if ((0, utils_1.inOperator)(prop, cookieDefaults) && val === cookieDefaults[prop]) {
            return;
          }
          switch (prop) {
            case "key":
            case "value":
            case "sameSite":
              if (typeof val === "string") {
                c[prop] = val;
              }
              break;
            case "expires":
            case "creation":
            case "lastAccessed":
              if (typeof val === "number" || typeof val === "string" || val instanceof Date) {
                c[prop] = obj[prop] == "Infinity" ? "Infinity" : new Date(val);
              } else if (val === null) {
                c[prop] = null;
              }
              break;
            case "maxAge":
              if (typeof val === "number" || val === "Infinity" || val === "-Infinity") {
                c[prop] = val;
              }
              break;
            case "domain":
            case "path":
              if (typeof val === "string" || val === null) {
                c[prop] = val;
              }
              break;
            case "secure":
            case "httpOnly":
              if (typeof val === "boolean") {
                c[prop] = val;
              }
              break;
            case "extensions":
              if (Array.isArray(val) && val.every((item) => typeof item === "string")) {
                c[prop] = val;
              }
              break;
            case "hostOnly":
            case "pathIsDefault":
              if (typeof val === "boolean" || val === null) {
                c[prop] = val;
              }
              break;
          }
        }
      });
      return c;
    }
    var cookieDefaults = {
      // the order in which the RFC has them:
      key: "",
      value: "",
      expires: "Infinity",
      maxAge: null,
      domain: null,
      path: null,
      secure: false,
      httpOnly: false,
      extensions: null,
      // set by the CookieJar:
      hostOnly: null,
      pathIsDefault: null,
      creation: null,
      lastAccessed: null,
      sameSite: void 0
    };
    var Cookie = class _Cookie {
      /**
       * Create a new Cookie instance.
       * @public
       * @param options - The attributes to set on the cookie
       */
      constructor(options = {}) {
        this.key = options.key ?? cookieDefaults.key;
        this.value = options.value ?? cookieDefaults.value;
        this.expires = options.expires ?? cookieDefaults.expires;
        this.maxAge = options.maxAge ?? cookieDefaults.maxAge;
        this.domain = options.domain ?? cookieDefaults.domain;
        this.path = options.path ?? cookieDefaults.path;
        this.secure = options.secure ?? cookieDefaults.secure;
        this.httpOnly = options.httpOnly ?? cookieDefaults.httpOnly;
        this.extensions = options.extensions ?? cookieDefaults.extensions;
        this.creation = options.creation ?? cookieDefaults.creation;
        this.hostOnly = options.hostOnly ?? cookieDefaults.hostOnly;
        this.pathIsDefault = options.pathIsDefault ?? cookieDefaults.pathIsDefault;
        this.lastAccessed = options.lastAccessed ?? cookieDefaults.lastAccessed;
        this.sameSite = options.sameSite ?? cookieDefaults.sameSite;
        this.creation = options.creation ?? /* @__PURE__ */ new Date();
        Object.defineProperty(this, "creationIndex", {
          configurable: false,
          enumerable: false,
          // important for assert.deepEqual checks
          writable: true,
          value: ++_Cookie.cookiesCreated
        });
        this.creationIndex = _Cookie.cookiesCreated;
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        const now = Date.now();
        const hostOnly = this.hostOnly != null ? this.hostOnly.toString() : "?";
        const createAge = this.creation && this.creation !== "Infinity" ? `${String(now - this.creation.getTime())}ms` : "?";
        const accessAge = this.lastAccessed && this.lastAccessed !== "Infinity" ? `${String(now - this.lastAccessed.getTime())}ms` : "?";
        return `Cookie="${this.toString()}; hostOnly=${hostOnly}; aAge=${accessAge}; cAge=${createAge}"`;
      }
      /**
       * For convenience in using `JSON.stringify(cookie)`. Returns a plain-old Object that can be JSON-serialized.
       *
       * @remarks
       * - Any `Date` properties (such as {@link Cookie.expires}, {@link Cookie.creation}, and {@link Cookie.lastAccessed}) are exported in ISO format (`Date.toISOString()`).
       *
       *  - Custom Cookie properties are discarded. In tough-cookie 1.x, since there was no {@link Cookie.toJSON} method explicitly defined, all enumerable properties were captured.
       *      If you want a property to be serialized, add the property name to {@link Cookie.serializableProperties}.
       */
      toJSON() {
        const obj = {};
        for (const prop of _Cookie.serializableProperties) {
          const val = this[prop];
          if (val === cookieDefaults[prop]) {
            continue;
          }
          switch (prop) {
            case "key":
            case "value":
            case "sameSite":
              if (typeof val === "string") {
                obj[prop] = val;
              }
              break;
            case "expires":
            case "creation":
            case "lastAccessed":
              if (typeof val === "number" || typeof val === "string" || val instanceof Date) {
                obj[prop] = val == "Infinity" ? "Infinity" : new Date(val).toISOString();
              } else if (val === null) {
                obj[prop] = null;
              }
              break;
            case "maxAge":
              if (typeof val === "number" || val === "Infinity" || val === "-Infinity") {
                obj[prop] = val;
              }
              break;
            case "domain":
            case "path":
              if (typeof val === "string" || val === null) {
                obj[prop] = val;
              }
              break;
            case "secure":
            case "httpOnly":
              if (typeof val === "boolean") {
                obj[prop] = val;
              }
              break;
            case "extensions":
              if (Array.isArray(val)) {
                obj[prop] = val;
              }
              break;
            case "hostOnly":
            case "pathIsDefault":
              if (typeof val === "boolean" || val === null) {
                obj[prop] = val;
              }
              break;
          }
        }
        return obj;
      }
      /**
       * Does a deep clone of this cookie, implemented exactly as `Cookie.fromJSON(cookie.toJSON())`.
       * @public
       */
      clone() {
        return fromJSON(this.toJSON());
      }
      /**
       * Validates cookie attributes for semantic correctness. Useful for "lint" checking any `Set-Cookie` headers you generate.
       * For now, it returns a boolean, but eventually could return a reason string.
       *
       * @remarks
       * Works for a few things, but is by no means comprehensive.
       *
       * @beta
       */
      validate() {
        if (!this.value || !COOKIE_OCTETS.test(this.value)) {
          return false;
        }
        if (this.expires != "Infinity" && !(this.expires instanceof Date) && !(0, parseDate_1.parseDate)(this.expires)) {
          return false;
        }
        if (this.maxAge != null && this.maxAge !== "Infinity" && (this.maxAge === "-Infinity" || this.maxAge <= 0)) {
          return false;
        }
        if (this.path != null && !PATH_VALUE.test(this.path)) {
          return false;
        }
        const cdomain = this.cdomain();
        if (cdomain) {
          if (cdomain.match(/\.$/)) {
            return false;
          }
          const suffix = (0, getPublicSuffix_1.getPublicSuffix)(cdomain);
          if (suffix == null) {
            return false;
          }
        }
        return true;
      }
      /**
       * Sets the 'Expires' attribute on a cookie.
       *
       * @remarks
       * When given a `string` value it will be parsed with {@link parseDate}. If the value can't be parsed as a cookie date
       * then the 'Expires' attribute will be set to `"Infinity"`.
       *
       * @param exp - the new value for the 'Expires' attribute of the cookie.
       */
      setExpires(exp) {
        if (exp instanceof Date) {
          this.expires = exp;
        } else {
          this.expires = (0, parseDate_1.parseDate)(exp) || "Infinity";
        }
      }
      /**
       * Sets the 'Max-Age' attribute (in seconds) on a cookie.
       *
       * @remarks
       * Coerces `-Infinity` to `"-Infinity"` and `Infinity` to `"Infinity"` so it can be serialized to JSON.
       *
       * @param age - the new value for the 'Max-Age' attribute (in seconds).
       */
      setMaxAge(age) {
        if (age === Infinity) {
          this.maxAge = "Infinity";
        } else if (age === -Infinity) {
          this.maxAge = "-Infinity";
        } else {
          this.maxAge = age;
        }
      }
      /**
       * Encodes to a `Cookie` header value (specifically, the {@link Cookie.key} and {@link Cookie.value} properties joined with "=").
       * @public
       */
      cookieString() {
        const val = this.value || "";
        if (this.key) {
          return `${this.key}=${val}`;
        }
        return val;
      }
      /**
       * Encodes to a `Set-Cookie header` value.
       * @public
       */
      toString() {
        let str = this.cookieString();
        if (this.expires != "Infinity") {
          if (this.expires instanceof Date) {
            str += `; Expires=${(0, formatDate_1.formatDate)(this.expires)}`;
          }
        }
        if (this.maxAge != null && this.maxAge != Infinity) {
          str += `; Max-Age=${String(this.maxAge)}`;
        }
        if (this.domain && !this.hostOnly) {
          str += `; Domain=${this.domain}`;
        }
        if (this.path) {
          str += `; Path=${this.path}`;
        }
        if (this.secure) {
          str += "; Secure";
        }
        if (this.httpOnly) {
          str += "; HttpOnly";
        }
        if (this.sameSite && this.sameSite !== "none") {
          if (this.sameSite.toLowerCase() === _Cookie.sameSiteCanonical.lax.toLowerCase()) {
            str += `; SameSite=${_Cookie.sameSiteCanonical.lax}`;
          } else if (this.sameSite.toLowerCase() === _Cookie.sameSiteCanonical.strict.toLowerCase()) {
            str += `; SameSite=${_Cookie.sameSiteCanonical.strict}`;
          } else {
            str += `; SameSite=${this.sameSite}`;
          }
        }
        if (this.extensions) {
          this.extensions.forEach((ext) => {
            str += `; ${ext}`;
          });
        }
        return str;
      }
      /**
       * Computes the TTL relative to now (milliseconds).
       *
       * @remarks
       * - `Infinity` is returned for cookies without an explicit expiry
       *
       * - `0` is returned if the cookie is expired.
       *
       * - Otherwise a time-to-live in milliseconds is returned.
       *
       * @param now - passing an explicit value is mostly used for testing purposes since this defaults to the `Date.now()`
       * @public
       */
      TTL(now = Date.now()) {
        if (this.maxAge != null && typeof this.maxAge === "number") {
          return this.maxAge <= 0 ? 0 : this.maxAge * 1e3;
        }
        const expires = this.expires;
        if (expires === "Infinity") {
          return Infinity;
        }
        return (expires?.getTime() ?? now) - (now || Date.now());
      }
      /**
       * Computes the absolute unix-epoch milliseconds that this cookie expires.
       *
       * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
       * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
       *
       * If Expires ({@link Cookie.expires}) is set, that's returned.
       *
       * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
       */
      expiryTime(now) {
        if (this.maxAge != null) {
          const relativeTo = now || this.lastAccessed || /* @__PURE__ */ new Date();
          const maxAge = typeof this.maxAge === "number" ? this.maxAge : -Infinity;
          const age = maxAge <= 0 ? -Infinity : maxAge * 1e3;
          if (relativeTo === "Infinity") {
            return Infinity;
          }
          return relativeTo.getTime() + age;
        }
        if (this.expires == "Infinity") {
          return Infinity;
        }
        return this.expires ? this.expires.getTime() : void 0;
      }
      /**
       * Similar to {@link Cookie.expiryTime}, computes the absolute unix-epoch milliseconds that this cookie expires and returns it as a Date.
       *
       * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
       * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
       *
       * If Expires ({@link Cookie.expires}) is set, that's returned.
       *
       * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
       */
      expiryDate(now) {
        const millisec = this.expiryTime(now);
        if (millisec == Infinity) {
          return /* @__PURE__ */ new Date(2147483647e3);
        } else if (millisec == -Infinity) {
          return /* @__PURE__ */ new Date(0);
        } else {
          return millisec == void 0 ? void 0 : new Date(millisec);
        }
      }
      /**
       * Indicates if the cookie has been persisted to a store or not.
       * @public
       */
      isPersistent() {
        return this.maxAge != null || this.expires != "Infinity";
      }
      /**
       * Calls {@link canonicalDomain} with the {@link Cookie.domain} property.
       * @public
       */
      canonicalizedDomain() {
        return (0, canonicalDomain_1.canonicalDomain)(this.domain);
      }
      /**
       * Alias for {@link Cookie.canonicalizedDomain}
       * @public
       */
      cdomain() {
        return (0, canonicalDomain_1.canonicalDomain)(this.domain);
      }
      /**
       * Parses a string into a Cookie object.
       *
       * @remarks
       * Note: when parsing a `Cookie` header it must be split by ';' before each Cookie string can be parsed.
       *
       * @example
       * ```
       * // parse a `Set-Cookie` header
       * const setCookieHeader = 'a=bcd; Expires=Tue, 18 Oct 2011 07:05:03 GMT'
       * const cookie = Cookie.parse(setCookieHeader)
       * cookie.key === 'a'
       * cookie.value === 'bcd'
       * cookie.expires === new Date(Date.parse('Tue, 18 Oct 2011 07:05:03 GMT'))
       * ```
       *
       * @example
       * ```
       * // parse a `Cookie` header
       * const cookieHeader = 'name=value; name2=value2; name3=value3'
       * const cookies = cookieHeader.split(';').map(Cookie.parse)
       * cookies[0].name === 'name'
       * cookies[0].value === 'value'
       * cookies[1].name === 'name2'
       * cookies[1].value === 'value2'
       * cookies[2].name === 'name3'
       * cookies[2].value === 'value3'
       * ```
       *
       * @param str - The `Set-Cookie` header or a Cookie string to parse.
       * @param options - Configures `strict` or `loose` mode for cookie parsing
       */
      static parse(str, options) {
        return parse(str, options);
      }
      /**
       * Does the reverse of {@link Cookie.toJSON}.
       *
       * @remarks
       * Any Date properties (such as .expires, .creation, and .lastAccessed) are parsed via Date.parse, not tough-cookie's parseDate, since ISO timestamps are being handled at this layer.
       *
       * @example
       * ```
       * const json = JSON.stringify({
       *   key: 'alpha',
       *   value: 'beta',
       *   domain: 'example.com',
       *   path: '/foo',
       *   expires: '2038-01-19T03:14:07.000Z',
       * })
       * const cookie = Cookie.fromJSON(json)
       * cookie.key === 'alpha'
       * cookie.value === 'beta'
       * cookie.domain === 'example.com'
       * cookie.path === '/foo'
       * cookie.expires === new Date(Date.parse('2038-01-19T03:14:07.000Z'))
       * ```
       *
       * @param str - An unparsed JSON string or a value that has already been parsed as JSON
       */
      static fromJSON(str) {
        return fromJSON(str);
      }
    };
    exports.Cookie = Cookie;
    Cookie.cookiesCreated = 0;
    Cookie.sameSiteLevel = {
      strict: 3,
      lax: 2,
      none: 1
    };
    Cookie.sameSiteCanonical = {
      strict: "Strict",
      lax: "Lax"
    };
    Cookie.serializableProperties = [
      "key",
      "value",
      "expires",
      "maxAge",
      "domain",
      "path",
      "secure",
      "httpOnly",
      "extensions",
      "hostOnly",
      "pathIsDefault",
      "creation",
      "lastAccessed",
      "sameSite"
    ];
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieCompare.js
var require_cookieCompare = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieCompare.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cookieCompare = cookieCompare;
    var MAX_TIME = 2147483647e3;
    function cookieCompare(a, b) {
      let cmp;
      const aPathLen = a.path ? a.path.length : 0;
      const bPathLen = b.path ? b.path.length : 0;
      cmp = bPathLen - aPathLen;
      if (cmp !== 0) {
        return cmp;
      }
      const aTime = a.creation && a.creation instanceof Date ? a.creation.getTime() : MAX_TIME;
      const bTime = b.creation && b.creation instanceof Date ? b.creation.getTime() : MAX_TIME;
      cmp = aTime - bTime;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = (a.creationIndex || 0) - (b.creationIndex || 0);
      return cmp;
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/defaultPath.js
var require_defaultPath = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/defaultPath.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultPath = defaultPath;
    function defaultPath(path) {
      if (!path || path.slice(0, 1) !== "/") {
        return "/";
      }
      if (path === "/") {
        return path;
      }
      const rightSlash = path.lastIndexOf("/");
      if (rightSlash === 0) {
        return "/";
      }
      return path.slice(0, rightSlash);
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/domainMatch.js
var require_domainMatch = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/domainMatch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.domainMatch = domainMatch;
    var canonicalDomain_1 = require_canonicalDomain();
    var IP_REGEX_LOWERCASE = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-f\d]{1,4}:){7}(?:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,2}|:)|(?:[a-f\d]{1,4}:){4}(?:(?::[a-f\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,3}|:)|(?:[a-f\d]{1,4}:){3}(?:(?::[a-f\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,4}|:)|(?:[a-f\d]{1,4}:){2}(?:(?::[a-f\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,5}|:)|(?:[a-f\d]{1,4}:){1}(?:(?::[a-f\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,6}|:)|(?::(?:(?::[a-f\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,7}|:)))$)/;
    function domainMatch(domain, cookieDomain, canonicalize) {
      if (domain == null || cookieDomain == null) {
        return void 0;
      }
      let _str;
      let _domStr;
      if (canonicalize !== false) {
        _str = (0, canonicalDomain_1.canonicalDomain)(domain);
        _domStr = (0, canonicalDomain_1.canonicalDomain)(cookieDomain);
      } else {
        _str = domain;
        _domStr = cookieDomain;
      }
      if (_str == null || _domStr == null) {
        return void 0;
      }
      if (_str == _domStr) {
        return true;
      }
      const idx = _str.lastIndexOf(_domStr);
      if (idx <= 0) {
        return false;
      }
      if (_str.length !== _domStr.length + idx) {
        return false;
      }
      if (_str.substring(idx - 1, idx) !== ".") {
        return false;
      }
      return !IP_REGEX_LOWERCASE.test(_str);
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieJar.js
var require_cookieJar = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieJar.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CookieJar = void 0;
    var getPublicSuffix_1 = require_getPublicSuffix();
    var validators = __importStar(require_validators());
    var validators_1 = require_validators();
    var store_1 = require_store();
    var memstore_1 = require_memstore();
    var pathMatch_1 = require_pathMatch();
    var cookie_1 = require_cookie();
    var utils_1 = require_utils();
    var canonicalDomain_1 = require_canonicalDomain();
    var constants_1 = require_constants();
    var defaultPath_1 = require_defaultPath();
    var domainMatch_1 = require_domainMatch();
    var cookieCompare_1 = require_cookieCompare();
    var version_1 = require_version();
    var defaultSetCookieOptions = {
      loose: false,
      sameSiteContext: void 0,
      ignoreError: false,
      http: true
    };
    var defaultGetCookieOptions = {
      http: true,
      expire: true,
      allPaths: false,
      sameSiteContext: void 0,
      sort: void 0
    };
    var SAME_SITE_CONTEXT_VAL_ERR = 'Invalid sameSiteContext option for getCookies(); expected one of "strict", "lax", or "none"';
    function getCookieContext(url) {
      if (url && typeof url === "object" && "hostname" in url && typeof url.hostname === "string" && "pathname" in url && typeof url.pathname === "string" && "protocol" in url && typeof url.protocol === "string") {
        return {
          hostname: url.hostname,
          pathname: url.pathname,
          protocol: url.protocol
        };
      } else if (typeof url === "string") {
        try {
          return new URL(decodeURI(url));
        } catch {
          return new URL(url);
        }
      } else {
        throw new validators_1.ParameterError("`url` argument is not a string or URL.");
      }
    }
    function checkSameSiteContext(value) {
      const context = String(value).toLowerCase();
      if (context === "none" || context === "lax" || context === "strict") {
        return context;
      } else {
        return void 0;
      }
    }
    function isSecurePrefixConditionMet(cookie) {
      const startsWithSecurePrefix = typeof cookie.key === "string" && cookie.key.startsWith("__Secure-");
      return !startsWithSecurePrefix || cookie.secure;
    }
    function isHostPrefixConditionMet(cookie) {
      const startsWithHostPrefix = typeof cookie.key === "string" && cookie.key.startsWith("__Host-");
      return !startsWithHostPrefix || Boolean(cookie.secure && cookie.hostOnly && cookie.path != null && cookie.path === "/");
    }
    function getNormalizedPrefixSecurity(prefixSecurity) {
      const normalizedPrefixSecurity = prefixSecurity.toLowerCase();
      switch (normalizedPrefixSecurity) {
        case constants_1.PrefixSecurityEnum.STRICT:
        case constants_1.PrefixSecurityEnum.SILENT:
        case constants_1.PrefixSecurityEnum.DISABLED:
          return normalizedPrefixSecurity;
        default:
          return constants_1.PrefixSecurityEnum.SILENT;
      }
    }
    var CookieJar2 = class _CookieJar {
      /**
       * Creates a new `CookieJar` instance.
       *
       * @remarks
       * - If a custom store is not passed to the constructor, an in-memory store ({@link MemoryCookieStore} will be created and used.
       * - If a boolean value is passed as the `options` parameter, this is equivalent to passing `{ rejectPublicSuffixes: <value> }`
       *
       * @param store - a custom {@link Store} implementation (defaults to {@link MemoryCookieStore})
       * @param options - configures how cookies are processed by the cookie jar
       */
      constructor(store, options) {
        if (typeof options === "boolean") {
          options = { rejectPublicSuffixes: options };
        }
        this.rejectPublicSuffixes = options?.rejectPublicSuffixes ?? true;
        this.enableLooseMode = options?.looseMode ?? false;
        this.allowSpecialUseDomain = options?.allowSpecialUseDomain ?? true;
        this.prefixSecurity = getNormalizedPrefixSecurity(options?.prefixSecurity ?? "silent");
        this.store = store ?? new memstore_1.MemoryCookieStore();
      }
      callSync(fn) {
        if (!this.store.synchronous) {
          throw new Error("CookieJar store is not synchronous; use async API instead.");
        }
        let syncErr = null;
        let syncResult = void 0;
        try {
          fn.call(this, (error, result) => {
            syncErr = error;
            syncResult = result;
          });
        } catch (err) {
          syncErr = err;
        }
        if (syncErr)
          throw syncErr;
        return syncResult;
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      setCookie(cookie, url, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        let context;
        try {
          if (typeof url === "string") {
            validators.validate(validators.isNonEmptyString(url), callback, (0, utils_1.safeToString)(options));
          }
          context = getCookieContext(url);
          if (typeof url === "function") {
            return promiseCallback.reject(new Error("No URL was specified"));
          }
          if (typeof options === "function") {
            options = defaultSetCookieOptions;
          }
          validators.validate(typeof cb === "function", cb);
          if (!validators.isNonEmptyString(cookie) && !validators.isObject(cookie) && cookie instanceof String && cookie.length == 0) {
            return promiseCallback.resolve(void 0);
          }
        } catch (err) {
          return promiseCallback.reject(err);
        }
        const host = (0, canonicalDomain_1.canonicalDomain)(context.hostname) ?? null;
        const loose = options?.loose || this.enableLooseMode;
        let sameSiteContext = null;
        if (options?.sameSiteContext) {
          sameSiteContext = checkSameSiteContext(options.sameSiteContext);
          if (!sameSiteContext) {
            return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
          }
        }
        if (typeof cookie === "string" || cookie instanceof String) {
          const parsedCookie = cookie_1.Cookie.parse(cookie.toString(), { loose });
          if (!parsedCookie) {
            const err = new Error("Cookie failed to parse");
            return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
          }
          cookie = parsedCookie;
        } else if (!(cookie instanceof cookie_1.Cookie)) {
          const err = new Error("First argument to setCookie must be a Cookie object or string");
          return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
        }
        const now = options?.now || /* @__PURE__ */ new Date();
        if (this.rejectPublicSuffixes && cookie.domain) {
          try {
            const cdomain = cookie.cdomain();
            const suffix = typeof cdomain === "string" ? (0, getPublicSuffix_1.getPublicSuffix)(cdomain, {
              allowSpecialUseDomain: this.allowSpecialUseDomain,
              ignoreError: options?.ignoreError
            }) : null;
            if (suffix == null && !constants_1.IP_V6_REGEX_OBJECT.test(cookie.domain)) {
              const err = new Error("Cookie has domain set to a public suffix");
              return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
            }
          } catch (err) {
            return options?.ignoreError ? promiseCallback.resolve(void 0) : (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              promiseCallback.reject(err)
            );
          }
        }
        if (cookie.domain) {
          if (!(0, domainMatch_1.domainMatch)(host ?? void 0, cookie.cdomain() ?? void 0, false)) {
            const err = new Error(`Cookie not in this host's domain. Cookie:${cookie.cdomain() ?? "null"} Request:${host ?? "null"}`);
            return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
          }
          if (cookie.hostOnly == null) {
            cookie.hostOnly = false;
          }
        } else {
          cookie.hostOnly = true;
          cookie.domain = host;
        }
        if (!cookie.path || cookie.path[0] !== "/") {
          cookie.path = (0, defaultPath_1.defaultPath)(context.pathname);
          cookie.pathIsDefault = true;
        }
        if (options?.http === false && cookie.httpOnly) {
          const err = new Error("Cookie is HttpOnly and this isn't an HTTP API");
          return options.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
        }
        if (cookie.sameSite !== "none" && cookie.sameSite !== void 0 && sameSiteContext) {
          if (sameSiteContext === "none") {
            const err = new Error("Cookie is SameSite but this is a cross-origin request");
            return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
          }
        }
        const ignoreErrorForPrefixSecurity = this.prefixSecurity === constants_1.PrefixSecurityEnum.SILENT;
        const prefixSecurityDisabled = this.prefixSecurity === constants_1.PrefixSecurityEnum.DISABLED;
        if (!prefixSecurityDisabled) {
          let errorFound = false;
          let errorMsg;
          if (!isSecurePrefixConditionMet(cookie)) {
            errorFound = true;
            errorMsg = "Cookie has __Secure prefix but Secure attribute is not set";
          } else if (!isHostPrefixConditionMet(cookie)) {
            errorFound = true;
            errorMsg = "Cookie has __Host prefix but either Secure or HostOnly attribute is not set or Path is not '/'";
          }
          if (errorFound) {
            return options?.ignoreError || ignoreErrorForPrefixSecurity ? promiseCallback.resolve(void 0) : promiseCallback.reject(new Error(errorMsg));
          }
        }
        const store = this.store;
        if (!store.updateCookie) {
          store.updateCookie = async function(_oldCookie, newCookie, cb2) {
            return this.putCookie(newCookie).then(() => cb2?.(null), (error) => cb2?.(error));
          };
        }
        const withCookie = function withCookie2(err, oldCookie) {
          if (err) {
            cb(err);
            return;
          }
          const next = function(err2) {
            if (err2) {
              cb(err2);
            } else if (typeof cookie === "string") {
              cb(null, void 0);
            } else {
              cb(null, cookie);
            }
          };
          if (oldCookie) {
            if (options && "http" in options && options.http === false && oldCookie.httpOnly) {
              err = new Error("old Cookie is HttpOnly and this isn't an HTTP API");
              if (options.ignoreError)
                cb(null, void 0);
              else
                cb(err);
              return;
            }
            if (cookie instanceof cookie_1.Cookie) {
              cookie.creation = oldCookie.creation;
              cookie.creationIndex = oldCookie.creationIndex;
              cookie.lastAccessed = now;
              store.updateCookie(oldCookie, cookie, next);
            }
          } else {
            if (cookie instanceof cookie_1.Cookie) {
              cookie.creation = cookie.lastAccessed = now;
              store.putCookie(cookie, next);
            }
          }
        };
        store.findCookie(cookie.domain, cookie.path, cookie.key, withCookie);
        return promiseCallback.promise;
      }
      /**
       * Synchronously attempt to set the {@link Cookie} in the {@link CookieJar}.
       *
       * <strong>Note:</strong> Only works if the configured {@link Store} is also synchronous.
       *
       * @remarks
       * - If successfully persisted, the {@link Cookie} will have updated
       *     {@link Cookie.creation}, {@link Cookie.lastAccessed} and {@link Cookie.hostOnly}
       *     properties.
       *
       * - As per the RFC, the {@link Cookie.hostOnly} flag is set if there was no `Domain={value}`
       *     atttribute on the cookie string. The {@link Cookie.domain} property is set to the
       *     fully-qualified hostname of `currentUrl` in this case. Matching this cookie requires an
       *     exact hostname match (not a {@link domainMatch} as per usual)
       *
       * @param cookie - The cookie object or cookie string to store. A string value will be parsed into a cookie using {@link Cookie.parse}.
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when storing the cookie.
       * @public
       */
      setCookieSync(cookie, url, options) {
        const setCookieFn = options ? this.setCookie.bind(this, cookie, url, options) : this.setCookie.bind(this, cookie, url);
        return this.callSync(setCookieFn);
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      getCookies(url, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = defaultGetCookieOptions;
        } else if (options === void 0) {
          options = defaultGetCookieOptions;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        let context;
        try {
          if (typeof url === "string") {
            validators.validate(validators.isNonEmptyString(url), cb, url);
          }
          context = getCookieContext(url);
          validators.validate(validators.isObject(options), cb, (0, utils_1.safeToString)(options));
          validators.validate(typeof cb === "function", cb);
        } catch (parameterError) {
          return promiseCallback.reject(parameterError);
        }
        const host = (0, canonicalDomain_1.canonicalDomain)(context.hostname);
        const path = context.pathname || "/";
        const secure = context.protocol && (context.protocol == "https:" || context.protocol == "wss:");
        let sameSiteLevel = 0;
        if (options.sameSiteContext) {
          const sameSiteContext = checkSameSiteContext(options.sameSiteContext);
          if (sameSiteContext == null) {
            return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
          }
          sameSiteLevel = cookie_1.Cookie.sameSiteLevel[sameSiteContext];
          if (!sameSiteLevel) {
            return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
          }
        }
        const http = options.http ?? true;
        const now = Date.now();
        const expireCheck = options.expire ?? true;
        const allPaths = options.allPaths ?? false;
        const store = this.store;
        function matchingCookie(c) {
          if (c.hostOnly) {
            if (c.domain != host) {
              return false;
            }
          } else {
            if (!(0, domainMatch_1.domainMatch)(host ?? void 0, c.domain ?? void 0, false)) {
              return false;
            }
          }
          if (!allPaths && typeof c.path === "string" && !(0, pathMatch_1.pathMatch)(path, c.path)) {
            return false;
          }
          if (c.secure && !secure) {
            return false;
          }
          if (c.httpOnly && !http) {
            return false;
          }
          if (sameSiteLevel) {
            let cookieLevel;
            if (c.sameSite === "lax") {
              cookieLevel = cookie_1.Cookie.sameSiteLevel.lax;
            } else if (c.sameSite === "strict") {
              cookieLevel = cookie_1.Cookie.sameSiteLevel.strict;
            } else {
              cookieLevel = cookie_1.Cookie.sameSiteLevel.none;
            }
            if (cookieLevel > sameSiteLevel) {
              return false;
            }
          }
          const expiryTime = c.expiryTime();
          if (expireCheck && expiryTime != void 0 && expiryTime <= now) {
            store.removeCookie(c.domain, c.path, c.key, () => {
            });
            return false;
          }
          return true;
        }
        store.findCookies(host, allPaths ? null : path, this.allowSpecialUseDomain, (err, cookies) => {
          if (err) {
            cb(err);
            return;
          }
          if (cookies == null) {
            cb(null, []);
            return;
          }
          cookies = cookies.filter(matchingCookie);
          if ("sort" in options && options.sort !== false) {
            cookies = cookies.sort(cookieCompare_1.cookieCompare);
          }
          const now2 = /* @__PURE__ */ new Date();
          for (const cookie of cookies) {
            cookie.lastAccessed = now2;
          }
          cb(null, cookies);
        });
        return promiseCallback.promise;
      }
      /**
       * Synchronously retrieve the list of cookies that can be sent in a Cookie header for the
       * current URL.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @remarks
       * - The array of cookies returned will be sorted according to {@link cookieCompare}.
       *
       * - The {@link Cookie.lastAccessed} property will be updated on all returned cookies.
       *
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when retrieving the cookies.
       */
      getCookiesSync(url, options) {
        return this.callSync(this.getCookies.bind(this, url, options)) ?? [];
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      getCookieString(url, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const next = function(err, cookies) {
          if (err) {
            promiseCallback.callback(err);
          } else {
            promiseCallback.callback(null, cookies?.sort(cookieCompare_1.cookieCompare).map((c) => c.cookieString()).join("; "));
          }
        };
        this.getCookies(url, options, next);
        return promiseCallback.promise;
      }
      /**
       * Synchronous version of `.getCookieString()`. Accepts the same options as `.getCookies()` but returns a string suitable for a
       * `Cookie` header rather than an Array.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when retrieving the cookies.
       */
      getCookieStringSync(url, options) {
        return this.callSync(options ? this.getCookieString.bind(this, url, options) : this.getCookieString.bind(this, url)) ?? "";
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      getSetCookieStrings(url, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const next = function(err, cookies) {
          if (err) {
            promiseCallback.callback(err);
          } else {
            promiseCallback.callback(null, cookies?.map((c) => {
              return c.toString();
            }));
          }
        };
        this.getCookies(url, options, next);
        return promiseCallback.promise;
      }
      /**
       * Synchronous version of `.getSetCookieStrings()`. Returns an array of strings suitable for `Set-Cookie` headers.
       * Accepts the same options as `.getCookies()`.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when retrieving the cookies.
       */
      getSetCookieStringsSync(url, options = {}) {
        return this.callSync(this.getSetCookieStrings.bind(this, url, options)) ?? [];
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      serialize(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        let type = this.store.constructor.name;
        if (validators.isObject(type)) {
          type = null;
        }
        const serialized = {
          // The version of tough-cookie that serialized this jar. Generally a good
          // practice since future versions can make data import decisions based on
          // known past behavior. When/if this matters, use `semver`.
          version: `tough-cookie@${version_1.version}`,
          // add the store type, to make humans happy:
          storeType: type,
          // CookieJar configuration:
          rejectPublicSuffixes: this.rejectPublicSuffixes,
          enableLooseMode: this.enableLooseMode,
          allowSpecialUseDomain: this.allowSpecialUseDomain,
          prefixSecurity: getNormalizedPrefixSecurity(this.prefixSecurity),
          // this gets filled from getAllCookies:
          cookies: []
        };
        if (typeof this.store.getAllCookies !== "function") {
          return promiseCallback.reject(new Error("store does not support getAllCookies and cannot be serialized"));
        }
        this.store.getAllCookies((err, cookies) => {
          if (err) {
            promiseCallback.callback(err);
            return;
          }
          if (cookies == null) {
            promiseCallback.callback(null, serialized);
            return;
          }
          serialized.cookies = cookies.map((cookie) => {
            const serializedCookie = cookie.toJSON();
            delete serializedCookie.creationIndex;
            return serializedCookie;
          });
          promiseCallback.callback(null, serialized);
        });
        return promiseCallback.promise;
      }
      /**
       * Serialize the CookieJar if the underlying store supports `.getAllCookies`.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       */
      serializeSync() {
        return this.callSync((callback) => {
          this.serialize(callback);
        });
      }
      /**
       * Alias of {@link CookieJar.serializeSync}. Allows the cookie to be serialized
       * with `JSON.stringify(cookieJar)`.
       */
      toJSON() {
        return this.serializeSync();
      }
      /**
       * Use the class method CookieJar.deserialize instead of calling this directly
       * @internal
       */
      _importCookies(serialized, callback) {
        let cookies = void 0;
        if (serialized && typeof serialized === "object" && (0, utils_1.inOperator)("cookies", serialized) && Array.isArray(serialized.cookies)) {
          cookies = serialized.cookies;
        }
        if (!cookies) {
          callback(new Error("serialized jar has no cookies array"), void 0);
          return;
        }
        cookies = cookies.slice();
        const putNext = (err) => {
          if (err) {
            callback(err, void 0);
            return;
          }
          if (Array.isArray(cookies)) {
            if (!cookies.length) {
              callback(err, this);
              return;
            }
            let cookie;
            try {
              cookie = cookie_1.Cookie.fromJSON(cookies.shift());
            } catch (e) {
              callback(e instanceof Error ? e : new Error(), void 0);
              return;
            }
            if (cookie === void 0) {
              putNext(null);
              return;
            }
            this.store.putCookie(cookie, putNext);
          }
        };
        putNext(null);
      }
      /**
       * @internal
       */
      _importCookiesSync(serialized) {
        this.callSync(this._importCookies.bind(this, serialized));
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      clone(newStore, callback) {
        if (typeof newStore === "function") {
          callback = newStore;
          newStore = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        this.serialize((err, serialized) => {
          if (err) {
            return promiseCallback.reject(err);
          }
          return _CookieJar.deserialize(serialized ?? "", newStore, cb);
        });
        return promiseCallback.promise;
      }
      /**
       * @internal
       */
      _cloneSync(newStore) {
        const cloneFn = newStore && typeof newStore !== "function" ? this.clone.bind(this, newStore) : this.clone.bind(this);
        return this.callSync((callback) => {
          cloneFn(callback);
        });
      }
      /**
       * Produces a deep clone of this CookieJar. Modifications to the original do
       * not affect the clone, and vice versa.
       *
       * <strong>Note</strong>: Only works if both the configured Store and destination
       * Store are synchronous.
       *
       * @remarks
       * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
       *
       * - Transferring between store types is supported so long as the source
       *     implements `.getAllCookies()` and the destination implements `.putCookie()`.
       *
       * @param newStore - The target {@link Store} to clone cookies into.
       */
      cloneSync(newStore) {
        if (!newStore) {
          return this._cloneSync();
        }
        if (!newStore.synchronous) {
          throw new Error("CookieJar clone destination store is not synchronous; use async API instead.");
        }
        return this._cloneSync(newStore);
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      removeAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        const store = this.store;
        if (typeof store.removeAllCookies === "function" && store.removeAllCookies !== store_1.Store.prototype.removeAllCookies) {
          store.removeAllCookies(cb);
          return promiseCallback.promise;
        }
        store.getAllCookies((err, cookies) => {
          if (err) {
            cb(err);
            return;
          }
          if (!cookies) {
            cookies = [];
          }
          if (cookies.length === 0) {
            cb(null, void 0);
            return;
          }
          let completedCount = 0;
          const removeErrors = [];
          const removeCookieCb = function removeCookieCb2(removeErr) {
            if (removeErr) {
              removeErrors.push(removeErr);
            }
            completedCount++;
            if (completedCount === cookies.length) {
              if (removeErrors[0])
                cb(removeErrors[0]);
              else
                cb(null, void 0);
              return;
            }
          };
          cookies.forEach((cookie) => {
            store.removeCookie(cookie.domain, cookie.path, cookie.key, removeCookieCb);
          });
        });
        return promiseCallback.promise;
      }
      /**
       * Removes all cookies from the CookieJar.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @remarks
       * - This is a new backwards-compatible feature of tough-cookie version 2.5,
       *     so not all Stores will implement it efficiently. For Stores that do not
       *     implement `removeAllCookies`, the fallback is to call `removeCookie` after
       *     `getAllCookies`.
       *
       * - If `getAllCookies` fails or isn't implemented in the Store, an error is returned.
       *
       * - If one or more of the `removeCookie` calls fail, only the first error is returned.
       */
      removeAllCookiesSync() {
        this.callSync((callback) => {
          this.removeAllCookies(callback);
        });
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      static deserialize(strOrObj, store, callback) {
        if (typeof store === "function") {
          callback = store;
          store = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        let serialized;
        if (typeof strOrObj === "string") {
          try {
            serialized = JSON.parse(strOrObj);
          } catch (e) {
            return promiseCallback.reject(e instanceof Error ? e : new Error());
          }
        } else {
          serialized = strOrObj;
        }
        const readSerializedProperty = (property) => {
          return serialized && typeof serialized === "object" && (0, utils_1.inOperator)(property, serialized) ? serialized[property] : void 0;
        };
        const readSerializedBoolean = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "boolean" ? value : void 0;
        };
        const readSerializedString = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "string" ? value : void 0;
        };
        const jar = new _CookieJar(store, {
          rejectPublicSuffixes: readSerializedBoolean("rejectPublicSuffixes"),
          looseMode: readSerializedBoolean("enableLooseMode"),
          allowSpecialUseDomain: readSerializedBoolean("allowSpecialUseDomain"),
          prefixSecurity: getNormalizedPrefixSecurity(readSerializedString("prefixSecurity") ?? "silent")
        });
        jar._importCookies(serialized, (err) => {
          if (err) {
            promiseCallback.callback(err);
            return;
          }
          promiseCallback.callback(null, jar);
        });
        return promiseCallback.promise;
      }
      /**
       * A new CookieJar is created and the serialized {@link Cookie} values are added to
       * the underlying store. Each {@link Cookie} is added via `store.putCookie(...)` in
       * the order in which they appear in the serialization.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @remarks
       * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
       *
       * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
       *
       * @param strOrObj - A JSON string or object representing the deserialized cookies.
       * @param store - The underlying store to persist the deserialized cookies into.
       */
      static deserializeSync(strOrObj, store) {
        const serialized = typeof strOrObj === "string" ? JSON.parse(strOrObj) : strOrObj;
        const readSerializedProperty = (property) => {
          return serialized && typeof serialized === "object" && (0, utils_1.inOperator)(property, serialized) ? serialized[property] : void 0;
        };
        const readSerializedBoolean = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "boolean" ? value : void 0;
        };
        const readSerializedString = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "string" ? value : void 0;
        };
        const jar = new _CookieJar(store, {
          rejectPublicSuffixes: readSerializedBoolean("rejectPublicSuffixes"),
          looseMode: readSerializedBoolean("enableLooseMode"),
          allowSpecialUseDomain: readSerializedBoolean("allowSpecialUseDomain"),
          prefixSecurity: getNormalizedPrefixSecurity(readSerializedString("prefixSecurity") ?? "silent")
        });
        if (!jar.store.synchronous) {
          throw new Error("CookieJar store is not synchronous; use async API instead.");
        }
        jar._importCookiesSync(serialized);
        return jar;
      }
      /**
       * Alias of {@link CookieJar.deserializeSync}.
       *
       * @remarks
       * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
       *
       * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
       *
       * @param jsonString - A JSON string or object representing the deserialized cookies.
       * @param store - The underlying store to persist the deserialized cookies into.
       */
      static fromJSON(jsonString, store) {
        return _CookieJar.deserializeSync(jsonString, store);
      }
    };
    exports.CookieJar = CookieJar2;
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/permutePath.js
var require_permutePath = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/permutePath.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.permutePath = permutePath;
    function permutePath(path) {
      if (path === "/") {
        return ["/"];
      }
      const permutations = [path];
      while (path.length > 1) {
        const lindex = path.lastIndexOf("/");
        if (lindex === 0) {
          break;
        }
        path = path.slice(0, lindex);
        permutations.push(path);
      }
      permutations.push("/");
      return permutations;
    }
  }
});

// ../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/index.js
var require_cookie2 = __commonJS({
  "../../node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.permutePath = exports.parseDate = exports.formatDate = exports.domainMatch = exports.defaultPath = exports.CookieJar = exports.cookieCompare = exports.Cookie = exports.PrefixSecurityEnum = exports.canonicalDomain = exports.version = exports.ParameterError = exports.Store = exports.getPublicSuffix = exports.permuteDomain = exports.pathMatch = exports.MemoryCookieStore = void 0;
    exports.parse = parse;
    exports.fromJSON = fromJSON;
    var memstore_1 = require_memstore();
    Object.defineProperty(exports, "MemoryCookieStore", { enumerable: true, get: function() {
      return memstore_1.MemoryCookieStore;
    } });
    var pathMatch_1 = require_pathMatch();
    Object.defineProperty(exports, "pathMatch", { enumerable: true, get: function() {
      return pathMatch_1.pathMatch;
    } });
    var permuteDomain_1 = require_permuteDomain();
    Object.defineProperty(exports, "permuteDomain", { enumerable: true, get: function() {
      return permuteDomain_1.permuteDomain;
    } });
    var getPublicSuffix_1 = require_getPublicSuffix();
    Object.defineProperty(exports, "getPublicSuffix", { enumerable: true, get: function() {
      return getPublicSuffix_1.getPublicSuffix;
    } });
    var store_1 = require_store();
    Object.defineProperty(exports, "Store", { enumerable: true, get: function() {
      return store_1.Store;
    } });
    var validators_1 = require_validators();
    Object.defineProperty(exports, "ParameterError", { enumerable: true, get: function() {
      return validators_1.ParameterError;
    } });
    var version_1 = require_version();
    Object.defineProperty(exports, "version", { enumerable: true, get: function() {
      return version_1.version;
    } });
    var canonicalDomain_1 = require_canonicalDomain();
    Object.defineProperty(exports, "canonicalDomain", { enumerable: true, get: function() {
      return canonicalDomain_1.canonicalDomain;
    } });
    var constants_1 = require_constants();
    Object.defineProperty(exports, "PrefixSecurityEnum", { enumerable: true, get: function() {
      return constants_1.PrefixSecurityEnum;
    } });
    var cookie_1 = require_cookie();
    Object.defineProperty(exports, "Cookie", { enumerable: true, get: function() {
      return cookie_1.Cookie;
    } });
    var cookieCompare_1 = require_cookieCompare();
    Object.defineProperty(exports, "cookieCompare", { enumerable: true, get: function() {
      return cookieCompare_1.cookieCompare;
    } });
    var cookieJar_1 = require_cookieJar();
    Object.defineProperty(exports, "CookieJar", { enumerable: true, get: function() {
      return cookieJar_1.CookieJar;
    } });
    var defaultPath_1 = require_defaultPath();
    Object.defineProperty(exports, "defaultPath", { enumerable: true, get: function() {
      return defaultPath_1.defaultPath;
    } });
    var domainMatch_1 = require_domainMatch();
    Object.defineProperty(exports, "domainMatch", { enumerable: true, get: function() {
      return domainMatch_1.domainMatch;
    } });
    var formatDate_1 = require_formatDate();
    Object.defineProperty(exports, "formatDate", { enumerable: true, get: function() {
      return formatDate_1.formatDate;
    } });
    var parseDate_1 = require_parseDate();
    Object.defineProperty(exports, "parseDate", { enumerable: true, get: function() {
      return parseDate_1.parseDate;
    } });
    var permutePath_1 = require_permutePath();
    Object.defineProperty(exports, "permutePath", { enumerable: true, get: function() {
      return permutePath_1.permutePath;
    } });
    var cookie_2 = require_cookie();
    function parse(str, options) {
      return cookie_2.Cookie.parse(str, options);
    }
    function fromJSON(str) {
      return cookie_2.Cookie.fromJSON(str);
    }
  }
});

// ../../node_modules/.pnpm/@hono+node-server@1.19.14_hono@4.12.30/node_modules/@hono/node-server/dist/vercel.mjs
import { Http2ServerRequest as Http2ServerRequest2, constants as h2constants } from "http2";
import { Http2ServerRequest } from "http2";
import { Readable } from "stream";
import crypto2 from "crypto";
var RequestError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "RequestError";
  }
};
var toRequestError = (e) => {
  if (e instanceof RequestError) {
    return e;
  }
  return new RequestError(e.message, { cause: e });
};
var GlobalRequest = global.Request;
var Request2 = class extends GlobalRequest {
  constructor(input, options) {
    if (typeof input === "object" && getRequestCache in input) {
      input = input[getRequestCache]();
    }
    if (typeof options?.body?.getReader !== "undefined") {
      ;
      options.duplex ??= "half";
    }
    super(input, options);
  }
};
var newHeadersFromIncoming = (incoming) => {
  const headerRecord = [];
  const rawHeaders = incoming.rawHeaders;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const { [i]: key, [i + 1]: value } = rawHeaders;
    if (key.charCodeAt(0) !== /*:*/
    58) {
      headerRecord.push([key, value]);
    }
  }
  return new Headers(headerRecord);
};
var wrapBodyStream = /* @__PURE__ */ Symbol("wrapBodyStream");
var newRequestFromIncoming = (method, url, headers, incoming, abortController) => {
  const init = {
    method,
    headers,
    signal: abortController.signal
  };
  if (method === "TRACE") {
    init.method = "GET";
    const req = new Request2(url, init);
    Object.defineProperty(req, "method", {
      get() {
        return "TRACE";
      }
    });
    return req;
  }
  if (!(method === "GET" || method === "HEAD")) {
    if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) {
      init.body = new ReadableStream({
        start(controller) {
          controller.enqueue(incoming.rawBody);
          controller.close();
        }
      });
    } else if (incoming[wrapBodyStream]) {
      let reader;
      init.body = new ReadableStream({
        async pull(controller) {
          try {
            reader ||= Readable.toWeb(incoming).getReader();
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        }
      });
    } else {
      init.body = Readable.toWeb(incoming);
    }
  }
  return new Request2(url, init);
};
var getRequestCache = /* @__PURE__ */ Symbol("getRequestCache");
var requestCache = /* @__PURE__ */ Symbol("requestCache");
var incomingKey = /* @__PURE__ */ Symbol("incomingKey");
var urlKey = /* @__PURE__ */ Symbol("urlKey");
var headersKey = /* @__PURE__ */ Symbol("headersKey");
var abortControllerKey = /* @__PURE__ */ Symbol("abortControllerKey");
var getAbortController = /* @__PURE__ */ Symbol("getAbortController");
var requestPrototype = {
  get method() {
    return this[incomingKey].method || "GET";
  },
  get url() {
    return this[urlKey];
  },
  get headers() {
    return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
  },
  [getAbortController]() {
    this[getRequestCache]();
    return this[abortControllerKey];
  },
  [getRequestCache]() {
    this[abortControllerKey] ||= new AbortController();
    return this[requestCache] ||= newRequestFromIncoming(
      this.method,
      this[urlKey],
      this.headers,
      this[incomingKey],
      this[abortControllerKey]
    );
  }
};
[
  "body",
  "bodyUsed",
  "cache",
  "credentials",
  "destination",
  "integrity",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "keepalive"
].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    get() {
      return this[getRequestCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    value: function() {
      return this[getRequestCache]()[k]();
    }
  });
});
Object.defineProperty(requestPrototype, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), {
  value: function(depth, options, inspectFn) {
    const props = {
      method: this.method,
      url: this.url,
      headers: this.headers,
      nativeRequest: this[requestCache]
    };
    return `Request (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }
});
Object.setPrototypeOf(requestPrototype, Request2.prototype);
var newRequest = (incoming, defaultHostname) => {
  const req = Object.create(requestPrototype);
  req[incomingKey] = incoming;
  const incomingUrl = incoming.url || "";
  if (incomingUrl[0] !== "/" && // short-circuit for performance. most requests are relative URL.
  (incomingUrl.startsWith("http://") || incomingUrl.startsWith("https://"))) {
    if (incoming instanceof Http2ServerRequest) {
      throw new RequestError("Absolute URL for :path is not allowed in HTTP/2");
    }
    try {
      const url2 = new URL(incomingUrl);
      req[urlKey] = url2.href;
    } catch (e) {
      throw new RequestError("Invalid absolute URL", { cause: e });
    }
    return req;
  }
  const host = (incoming instanceof Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
  if (!host) {
    throw new RequestError("Missing host header");
  }
  let scheme;
  if (incoming instanceof Http2ServerRequest) {
    scheme = incoming.scheme;
    if (!(scheme === "http" || scheme === "https")) {
      throw new RequestError("Unsupported scheme");
    }
  } else {
    scheme = incoming.socket && incoming.socket.encrypted ? "https" : "http";
  }
  const url = new URL(`${scheme}://${host}${incomingUrl}`);
  if (url.hostname.length !== host.length && url.hostname !== host.replace(/:\d+$/, "")) {
    throw new RequestError("Invalid host header");
  }
  req[urlKey] = url.href;
  return req;
};
var responseCache = /* @__PURE__ */ Symbol("responseCache");
var getResponseCache = /* @__PURE__ */ Symbol("getResponseCache");
var cacheKey = /* @__PURE__ */ Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
  #body;
  #init;
  [getResponseCache]() {
    delete this[cacheKey];
    return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
  }
  constructor(body, init) {
    let headers;
    this.#body = body;
    if (init instanceof _Response) {
      const cachedGlobalResponse = init[responseCache];
      if (cachedGlobalResponse) {
        this.#init = cachedGlobalResponse;
        this[getResponseCache]();
        return;
      } else {
        this.#init = init.#init;
        headers = new Headers(init.#init.headers);
      }
    } else {
      this.#init = init;
    }
    if (typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) {
      ;
      this[cacheKey] = [init?.status || 200, body, headers || init?.headers];
    }
  }
  get headers() {
    const cache = this[cacheKey];
    if (cache) {
      if (!(cache[2] instanceof Headers)) {
        cache[2] = new Headers(
          cache[2] || { "content-type": "text/plain; charset=UTF-8" }
        );
      }
      return cache[2];
    }
    return this[getResponseCache]().headers;
  }
  get status() {
    return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
  }
  get ok() {
    const status = this.status;
    return status >= 200 && status < 300;
  }
};
["body", "bodyUsed", "redirected", "statusText", "trailers", "type", "url"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    get() {
      return this[getResponseCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    value: function() {
      return this[getResponseCache]()[k]();
    }
  });
});
Object.defineProperty(Response2.prototype, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), {
  value: function(depth, options, inspectFn) {
    const props = {
      status: this.status,
      headers: this.headers,
      ok: this.ok,
      nativeResponse: this[responseCache]
    };
    return `Response (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
async function readWithoutBlocking(readPromise) {
  return Promise.race([readPromise, Promise.resolve().then(() => Promise.resolve(void 0))]);
}
function writeFromReadableStreamDefaultReader(reader, writable, currentReadPromise) {
  const cancel = (error) => {
    reader.cancel(error).catch(() => {
    });
  };
  writable.on("close", cancel);
  writable.on("error", cancel);
  (currentReadPromise ?? reader.read()).then(flow, handleStreamError);
  return reader.closed.finally(() => {
    writable.off("close", cancel);
    writable.off("error", cancel);
  });
  function handleStreamError(error) {
    if (error) {
      writable.destroy(error);
    }
  }
  function onDrain() {
    reader.read().then(flow, handleStreamError);
  }
  function flow({ done, value }) {
    try {
      if (done) {
        writable.end();
      } else if (!writable.write(value)) {
        writable.once("drain", onDrain);
      } else {
        return reader.read().then(flow, handleStreamError);
      }
    } catch (e) {
      handleStreamError(e);
    }
  }
}
function writeFromReadableStream(stream, writable) {
  if (stream.locked) {
    throw new TypeError("ReadableStream is locked.");
  } else if (writable.destroyed) {
    return;
  }
  return writeFromReadableStreamDefaultReader(stream.getReader(), writable);
}
var buildOutgoingHttpHeaders = (headers) => {
  const res = {};
  if (!(headers instanceof Headers)) {
    headers = new Headers(headers ?? void 0);
  }
  const cookies = [];
  for (const [k, v] of headers) {
    if (k === "set-cookie") {
      cookies.push(v);
    } else {
      res[k] = v;
    }
  }
  if (cookies.length > 0) {
    res["set-cookie"] = cookies;
  }
  res["content-type"] ??= "text/plain; charset=UTF-8";
  return res;
};
var X_ALREADY_SENT = "x-hono-already-sent";
if (typeof global.crypto === "undefined") {
  global.crypto = crypto2;
}
var outgoingEnded = /* @__PURE__ */ Symbol("outgoingEnded");
var incomingDraining = /* @__PURE__ */ Symbol("incomingDraining");
var DRAIN_TIMEOUT_MS = 500;
var MAX_DRAIN_BYTES = 64 * 1024 * 1024;
var drainIncoming = (incoming) => {
  const incomingWithDrainState = incoming;
  if (incoming.destroyed || incomingWithDrainState[incomingDraining]) {
    return;
  }
  incomingWithDrainState[incomingDraining] = true;
  if (incoming instanceof Http2ServerRequest2) {
    try {
      ;
      incoming.stream?.close?.(h2constants.NGHTTP2_NO_ERROR);
    } catch {
    }
    return;
  }
  let bytesRead = 0;
  const cleanup = () => {
    clearTimeout(timer);
    incoming.off("data", onData);
    incoming.off("end", cleanup);
    incoming.off("error", cleanup);
  };
  const forceClose = () => {
    cleanup();
    const socket = incoming.socket;
    if (socket && !socket.destroyed) {
      socket.destroySoon();
    }
  };
  const timer = setTimeout(forceClose, DRAIN_TIMEOUT_MS);
  timer.unref?.();
  const onData = (chunk) => {
    bytesRead += chunk.length;
    if (bytesRead > MAX_DRAIN_BYTES) {
      forceClose();
    }
  };
  incoming.on("data", onData);
  incoming.on("end", cleanup);
  incoming.on("error", cleanup);
  incoming.resume();
};
var handleRequestError = () => new Response(null, {
  status: 400
});
var handleFetchError = (e) => new Response(null, {
  status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500
});
var handleResponseError = (e, outgoing) => {
  const err = e instanceof Error ? e : new Error("unknown error", { cause: e });
  if (err.code === "ERR_STREAM_PREMATURE_CLOSE") {
    console.info("The user aborted a request.");
  } else {
    console.error(e);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "Content-Type": "text/plain" });
    }
    outgoing.end(`Error: ${err.message}`);
    outgoing.destroy(err);
  }
};
var flushHeaders = (outgoing) => {
  if ("flushHeaders" in outgoing && outgoing.writable) {
    outgoing.flushHeaders();
  }
};
var responseViaCache = async (res, outgoing) => {
  let [status, body, header] = res[cacheKey];
  let hasContentLength = false;
  if (!header) {
    header = { "content-type": "text/plain; charset=UTF-8" };
  } else if (header instanceof Headers) {
    hasContentLength = header.has("content-length");
    header = buildOutgoingHttpHeaders(header);
  } else if (Array.isArray(header)) {
    const headerObj = new Headers(header);
    hasContentLength = headerObj.has("content-length");
    header = buildOutgoingHttpHeaders(headerObj);
  } else {
    for (const key in header) {
      if (key.length === 14 && key.toLowerCase() === "content-length") {
        hasContentLength = true;
        break;
      }
    }
  }
  if (!hasContentLength) {
    if (typeof body === "string") {
      header["Content-Length"] = Buffer.byteLength(body);
    } else if (body instanceof Uint8Array) {
      header["Content-Length"] = body.byteLength;
    } else if (body instanceof Blob) {
      header["Content-Length"] = body.size;
    }
  }
  outgoing.writeHead(status, header);
  if (typeof body === "string" || body instanceof Uint8Array) {
    outgoing.end(body);
  } else if (body instanceof Blob) {
    outgoing.end(new Uint8Array(await body.arrayBuffer()));
  } else {
    flushHeaders(outgoing);
    await writeFromReadableStream(body, outgoing)?.catch(
      (e) => handleResponseError(e, outgoing)
    );
  }
  ;
  outgoing[outgoingEnded]?.();
};
var isPromise = (res) => typeof res.then === "function";
var responseViaResponseObject = async (res, outgoing, options = {}) => {
  if (isPromise(res)) {
    if (options.errorHandler) {
      try {
        res = await res;
      } catch (err) {
        const errRes = await options.errorHandler(err);
        if (!errRes) {
          return;
        }
        res = errRes;
      }
    } else {
      res = await res.catch(handleFetchError);
    }
  }
  if (cacheKey in res) {
    return responseViaCache(res, outgoing);
  }
  const resHeaderRecord = buildOutgoingHttpHeaders(res.headers);
  if (res.body) {
    const reader = res.body.getReader();
    const values = [];
    let done = false;
    let currentReadPromise = void 0;
    if (resHeaderRecord["transfer-encoding"] !== "chunked") {
      let maxReadCount = 2;
      for (let i = 0; i < maxReadCount; i++) {
        currentReadPromise ||= reader.read();
        const chunk = await readWithoutBlocking(currentReadPromise).catch((e) => {
          console.error(e);
          done = true;
        });
        if (!chunk) {
          if (i === 1) {
            await new Promise((resolve) => setTimeout(resolve));
            maxReadCount = 3;
            continue;
          }
          break;
        }
        currentReadPromise = void 0;
        if (chunk.value) {
          values.push(chunk.value);
        }
        if (chunk.done) {
          done = true;
          break;
        }
      }
      if (done && !("content-length" in resHeaderRecord)) {
        resHeaderRecord["content-length"] = values.reduce((acc, value) => acc + value.length, 0);
      }
    }
    outgoing.writeHead(res.status, resHeaderRecord);
    values.forEach((value) => {
      ;
      outgoing.write(value);
    });
    if (done) {
      outgoing.end();
    } else {
      if (values.length === 0) {
        flushHeaders(outgoing);
      }
      await writeFromReadableStreamDefaultReader(reader, outgoing, currentReadPromise);
    }
  } else if (resHeaderRecord[X_ALREADY_SENT]) {
  } else {
    outgoing.writeHead(res.status, resHeaderRecord);
    outgoing.end();
  }
  ;
  outgoing[outgoingEnded]?.();
};
var getRequestListener = (fetchCallback, options = {}) => {
  const autoCleanupIncoming = options.autoCleanupIncoming ?? true;
  if (options.overrideGlobalObjects !== false && global.Request !== Request2) {
    Object.defineProperty(global, "Request", {
      value: Request2
    });
    Object.defineProperty(global, "Response", {
      value: Response2
    });
  }
  return async (incoming, outgoing) => {
    let res, req;
    try {
      req = newRequest(incoming, options.hostname);
      let incomingEnded = !autoCleanupIncoming || incoming.method === "GET" || incoming.method === "HEAD";
      if (!incomingEnded) {
        ;
        incoming[wrapBodyStream] = true;
        incoming.on("end", () => {
          incomingEnded = true;
        });
        if (incoming instanceof Http2ServerRequest2) {
          ;
          outgoing[outgoingEnded] = () => {
            if (!incomingEnded) {
              setTimeout(() => {
                if (!incomingEnded) {
                  setTimeout(() => {
                    drainIncoming(incoming);
                  });
                }
              });
            }
          };
        }
        outgoing.on("finish", () => {
          if (!incomingEnded) {
            drainIncoming(incoming);
          }
        });
      }
      outgoing.on("close", () => {
        const abortController = req[abortControllerKey];
        if (abortController) {
          if (incoming.errored) {
            req[abortControllerKey].abort(incoming.errored.toString());
          } else if (!outgoing.writableFinished) {
            req[abortControllerKey].abort("Client connection prematurely closed.");
          }
        }
        if (!incomingEnded) {
          setTimeout(() => {
            if (!incomingEnded) {
              setTimeout(() => {
                drainIncoming(incoming);
              });
            }
          });
        }
      });
      res = fetchCallback(req, { incoming, outgoing });
      if (cacheKey in res) {
        return responseViaCache(res, outgoing);
      }
    } catch (e) {
      if (!res) {
        if (options.errorHandler) {
          res = await options.errorHandler(req ? e : toRequestError(e));
          if (!res) {
            return;
          }
        } else if (!req) {
          res = handleRequestError();
        } else {
          res = handleFetchError(e);
        }
      } else {
        return handleResponseError(e, outgoing);
      }
    }
    try {
      return await responseViaResponseObject(res, outgoing, options);
    } catch (e) {
      return handleResponseError(e, outgoing);
    }
  };
};
var handle = (app) => {
  return getRequestListener(app.fetch);
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/utils/buffer.js
var bufferToFormData = (arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/utils/body.js
var isRawRequest = (request) => "headers" in request;
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey2 = `${label}#${next}`;
    if (!patternCache[cacheKey2]) {
      if (match2[2]) {
        patternCache[cacheKey2] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey2, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey2] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey2];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app) {
    const subApp = this.basePath(path);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = ((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  });
  this.match = match2;
  return match2(method, path);
}

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node2 = class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// ../../node_modules/.pnpm/hono@4.12.30/node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  };
};

// ../../packages/shared/src/colors.ts
var GROUP_HEX = {
  out_pending: "#5c3317",
  out: "#ef4444",
  out_clean: "#3b82f6",
  out_inspected: "#22c55e",
  stay: "#1e3a8a",
  stay_clean: "#06b6d4",
  touchup: "#a855f7",
  none: "#9ca3af"
};
var OUT_DONE_STATES = /* @__PURE__ */ new Set([
  "out_done_dirty",
  "out_done_clean",
  "out_in_dirty",
  "out_in_clean"
]);
function tileColorGroup(state, cleanStatus) {
  if (state === "no_task") return "none";
  if (state === "touch_up") return "touchup";
  if (state === "out_pending") return "out_pending";
  const s = (cleanStatus ?? "").trim().toLowerCase();
  if (OUT_DONE_STATES.has(state)) {
    if (s === "clean") return "out_clean";
    if (s === "inspected") return "out_inspected";
    return "out";
  }
  if (s === "clean") return "stay_clean";
  return "stay";
}
var TILE_HEX = {
  out_pending: GROUP_HEX.out_pending,
  out_done_dirty: GROUP_HEX.out,
  out_done_clean: GROUP_HEX.out_clean,
  out_in_dirty: GROUP_HEX.out,
  out_in_clean: GROUP_HEX.out_clean,
  stay: GROUP_HEX.stay,
  stay_dirty: GROUP_HEX.stay,
  stay_clean: GROUP_HEX.stay,
  linen: GROUP_HEX.stay,
  linen_clean: GROUP_HEX.stay,
  touch_up: GROUP_HEX.touchup,
  no_task: GROUP_HEX.none,
  other: GROUP_HEX.stay
};

// ../../packages/shared/src/classify.ts
var TILE_LABELS = {
  out_pending: "Out \xB7 ch\u1EDD kh\xE1ch r\u1EDDi",
  out_done_dirty: "Out \xB7 ch\u01B0a d\u1ECDn",
  out_done_clean: "Out \xB7 \u0111\xE3 d\u1ECDn xong",
  out_in_dirty: "Out/In \xB7 ch\u01B0a d\u1ECDn",
  out_in_clean: "Out/In \xB7 s\u1EB5n s\xE0ng",
  stay: "Stay",
  stay_dirty: "Stay \xB7 ch\u01B0a d\u1ECDn",
  stay_clean: "Stay \xB7 \u0111\xE3 d\u1ECDn",
  linen: "Thay gi\u01B0\u1EDDng \xB7 ch\u01B0a d\u1ECDn",
  linen_clean: "Thay gi\u01B0\u1EDDng \xB7 xong",
  touch_up: "Touch Up \u624B\u76F4\u3057",
  no_task: "Ph\xF2ng s\u1EA1ch",
  other: "Kh\xE1c"
};
function tileLabel(state) {
  return TILE_LABELS[state];
}
function stripNonDigits(value) {
  return value.replace(/\D/g, "");
}
function roomFloor(roomNumber) {
  const digits = stripNonDigits(roomNumber);
  if (!digits) return null;
  return Math.floor(parseInt(digits, 10) / 100);
}
function lower(value) {
  return (value ?? "").trim().toLowerCase();
}
function isCleaned(room) {
  const status = lower(room.cleanStatus);
  return status === "clean" || status === "inspected";
}
function isDirty(room) {
  return lower(room.cleanStatus) === "dirty";
}
function isOutCleanTask(room) {
  if (room.cleanTaskId === 1) return true;
  const name = room.cleanTaskName ?? "";
  return name === "Out Clean \u30A2\u30A6\u30C8\u30E1\u30A4\u30AF" || name.includes("Out Clean");
}
function isTouchUp(room) {
  return room.cleanTaskId === 2 || (room.cleanTaskName ?? "").includes("Touch Up");
}
function isNoTask(room) {
  return room.cleanTaskId === -1 || (room.cleanTaskName ?? "").trim() === "\u30BF\u30B9\u30AF\u306A\u3057";
}
function isLinen(room) {
  return room.cleanTaskId === 5 || room.cleanTaskName === "Stay Make Linen \u30EA\u30CD\u30F3\u4EA4\u63DB";
}
function classifyOutDone(room) {
  if (room.reservationStatus === "Checked Out") return "out";
  if (room.reservationStatus === "Due In\\Checked Out") return "out_in";
  return null;
}
function classifyRoomTile(room) {
  if (isNoTask(room)) return "no_task";
  if (isTouchUp(room)) return "touch_up";
  const status = (room.reservationStatus ?? "").trim();
  const outCat = classifyOutDone(room);
  if (status === "Due Out" || status === "Due In\\Out") return "out_pending";
  if (outCat === "out") return isCleaned(room) ? "out_done_clean" : "out_done_dirty";
  if (outCat === "out_in") return isCleaned(room) ? "out_in_clean" : "out_in_dirty";
  if (status === "Stay Over") {
    if (isLinen(room)) return isCleaned(room) ? "linen_clean" : "linen";
    if (isCleaned(room)) return "stay_clean";
    if (isDirty(room)) return "stay_dirty";
    return "stay";
  }
  if (isOutCleanTask(room)) {
    return isCleaned(room) ? "out_done_clean" : "out_pending";
  }
  return "other";
}
function isCheckedIn(room) {
  return (room.reservationStatus ?? "").split("\\").some((part) => part.trim() === "Checked In");
}
function parseHotSosDate(value) {
  if (value == null) return null;
  const raw2 = typeof value === "object" ? String(value._i ?? "").trim() : String(value).trim();
  if (!raw2) return null;
  const normalized = raw2.replace(/\//g, "-").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null;
}
function toRoomTile(room) {
  const roomNumber = String(room.displayRoomNumber ?? "").trim() || "?";
  const tileState = classifyRoomTile(room);
  const cleanStatus = room.cleanStatus ?? "";
  return {
    roomNumber,
    floor: roomFloor(roomNumber),
    assignmentId: room.assignmentId ?? null,
    tileState,
    colorGroup: tileColorGroup(tileState, cleanStatus),
    label: tileLabel(tileState),
    reservationStatus: room.reservationStatus ?? "",
    checkedIn: isCheckedIn(room),
    departureDate: parseHotSosDate(room.departureDate),
    assignStatus: room.assignStatus ?? "",
    cleanStatus,
    cleanTaskName: room.cleanTaskName ?? "",
    cleanTaskId: room.cleanTaskId ?? null,
    customerName: room.customerName ?? "",
    credits: room.credits ?? null
  };
}
function computeRoomStats(rooms) {
  const stats = {
    out_pending: 0,
    out: 0,
    out_clean: 0,
    out_inspected: 0,
    stay: 0,
    stay_clean: 0,
    touchup: 0,
    none: 0,
    total: rooms.length
  };
  for (const room of rooms) {
    stats[room.colorGroup] += 1;
  }
  return stats;
}

// ../../packages/shared/src/pax.ts
function paxPairFromRecords(records) {
  if (records.length === 0) return { adults: 0, children: 0 };
  const counts = records.map((guest) => ({
    adults: Math.max(0, guest.adultsCount ?? 0),
    children: Math.max(0, guest.childrenCount ?? 0)
  }));
  if (counts.length === 1) return counts[0];
  const first = counts[0];
  const allSame = counts.every(
    (c) => c.adults === first.adults && c.children === first.children
  );
  if (allSame && (first.adults > 1 || first.children > 0)) return first;
  if (counts.every((c) => c.adults === 1 && c.children === 0)) {
    return { adults: counts.length, children: 0 };
  }
  return {
    adults: counts.reduce((sum, c) => sum + c.adults, 0),
    children: counts.reduce((sum, c) => sum + c.children, 0)
  };
}
function activeGuestRecords(guests, roomReservationStatus) {
  const status = roomReservationStatus.trim();
  if (status === "Due In\\Checked Out") {
    return guests.filter((g) => (g.reservationStatus ?? "").trim() === "Due In");
  }
  if (status === "Checked Out") {
    return guests.filter(
      (g) => (g.reservationStatus ?? "").trim() === "Checked Out"
    );
  }
  if (status === "Due Out") {
    return guests.filter((g) => {
      const s = (g.reservationStatus ?? "").trim();
      return s === "Due Out" || s === "Checked Out";
    });
  }
  return guests.filter(
    (g) => (g.reservationStatus ?? "").trim() !== "Checked Out"
  );
}
function assignmentGuestCounts(guests, roomReservationStatus) {
  return paxPairFromRecords(activeGuestRecords(guests, roomReservationStatus));
}
function formatPax(pax) {
  const parts = [];
  if (pax.adults > 0) parts.push(`${pax.adults}\u{1F464}`);
  if (pax.children > 0) parts.push(`${pax.children}\u{1F476}`);
  return parts.join(" ");
}

// src/hotsos/constants.ts
var HOTSOS = {
  BASE_URL: "https://hk.m-tech.com",
  APP_BASE: "https://hk.m-tech.com/hotsosmobile_3.0",
  HOUSEKEEPING_BASE: "https://hk.m-tech.com/hotsosmobile_3.0/housekeeping",
  CLIENT_ID: "F72E6639-CE48-4052-ADF3-D781DC369BF6",
  REDIRECT_URI: "https%3A%2F%2Fhk.m-tech.com%2Fhotsosmobile_3.0%2Fapp%2FIndex%23%2FexternalLogin%3F",
  USER_AGENT: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
};

// src/hotsos/http.ts
var import_tough_cookie = __toESM(require_cookie2(), 1);
var CookieSession = class {
  jar = new import_tough_cookie.CookieJar();
  async cookieHeader(url) {
    return await this.jar.getCookieString(url) || "";
  }
  async storeFromResponse(url, response) {
    const headers = response.headers;
    const setCookies = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [];
    if (setCookies.length === 0) {
      const single = response.headers.get("set-cookie");
      if (single) setCookies.push(single);
    }
    for (const cookie of setCookies) {
      await this.jar.setCookie(cookie, url);
    }
  }
  async fetch(url, init = {}) {
    const headers = new Headers(init.headers);
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", HOTSOS.USER_AGENT);
    }
    const cookie = await this.cookieHeader(url);
    if (cookie) headers.set("Cookie", cookie);
    const response = await fetch(url, {
      ...init,
      headers,
      redirect: init.redirect ?? "manual"
    });
    await this.storeFromResponse(url, response);
    return response;
  }
};
function extractIdToken(url) {
  const hashIdx = url.indexOf("#");
  const queryIdx = url.indexOf("?");
  let fragment = "";
  let query = "";
  if (hashIdx >= 0) fragment = url.slice(hashIdx + 1);
  if (queryIdx >= 0) {
    const end = hashIdx >= 0 && hashIdx > queryIdx ? hashIdx : url.length;
    query = url.slice(queryIdx + 1, end);
  }
  for (const part of [fragment, query]) {
    if (!part) continue;
    const params = new URLSearchParams(part);
    const token = params.get("id_token");
    if (token) return token;
  }
  const match2 = url.match(/id_token=([^&]+)/);
  return match2 ? decodeURIComponent(match2[1]) : null;
}
function decodeHtmlEntities(value) {
  return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(
    /&#x([0-9a-fA-F]+);/g,
    (_, hex) => String.fromCodePoint(parseInt(hex, 16))
  ).replace(
    /&#(\d+);/g,
    (_, dec) => String.fromCodePoint(parseInt(dec, 10))
  );
}
function parseHiddenInputs(html) {
  const fields = {};
  const inputRe = /<input\b[^>]*>/gi;
  const nameRe = /\bname=["']([^"']+)["']/i;
  const valueRe = /\bvalue=["']([^"']*)["']/i;
  for (const match2 of html.matchAll(inputRe)) {
    const tag = match2[0];
    const nameMatch = tag.match(nameRe);
    if (!nameMatch) continue;
    const valueMatch = tag.match(valueRe);
    fields[nameMatch[1]] = valueMatch ? decodeHtmlEntities(valueMatch[1]) : "";
  }
  return fields;
}
function getLocation(response, currentUrl) {
  const location = response.headers.get("location");
  if (!location) return null;
  try {
    return new URL(location, currentUrl).toString();
  } catch {
    return location;
  }
}

// src/hotsos/auth.ts
var HotSosAuthError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "HotSosAuthError";
  }
};
async function login(username, password) {
  const session = new CookieSession();
  const authorizeUrl = `${HOTSOS.BASE_URL}/v2/authservice/connect/authorize?response_type=id_token&client_id=${HOTSOS.CLIENT_ID}&redirect_uri=${HOTSOS.REDIRECT_URI}&scope=openid%20permissions&nonce=hotsospy&state=hotsospy`;
  const authorizeRes = await session.fetch(authorizeUrl, { method: "GET" });
  const loginUrl = getLocation(authorizeRes, authorizeUrl);
  if (!loginUrl) {
    throw new HotSosAuthError(
      `Authorize missing Location (HTTP ${authorizeRes.status})`
    );
  }
  const loginPageRes = await session.fetch(loginUrl, {
    method: "GET",
    headers: {
      Referer: authorizeUrl,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }
  });
  if (loginPageRes.status >= 300 && loginPageRes.status < 400) {
    throw new HotSosAuthError(
      `Login page redirected unexpectedly (HTTP ${loginPageRes.status}) \u2192 ${getLocation(loginPageRes, loginUrl)}`
    );
  }
  const loginHtml = await loginPageRes.text();
  if (!loginHtml) {
    throw new HotSosAuthError("Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c trang login HotSOS");
  }
  const fields = parseHiddenInputs(loginHtml);
  const body = {
    ...fields,
    Username: username,
    Password: password
  };
  const postRes = await session.fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: loginUrl
    },
    body: JSON.stringify(body)
  });
  let currentUrl = getLocation(postRes, loginUrl);
  if (!currentUrl) {
    const text = await postRes.text().catch(() => "");
    throw new HotSosAuthError(
      `Login POST missing Location (HTTP ${postRes.status}): ${text.slice(0, 200)}`
    );
  }
  let idToken = extractIdToken(currentUrl);
  for (let i = 0; i < 8 && !idToken; i++) {
    if (currentUrl.includes("ChangePassword")) {
      throw new HotSosAuthError(
        "HotSOS y\xEAu c\u1EA7u \u0111\u1ED5i m\u1EADt kh\u1EA9u tr\u01B0\u1EDBc khi ti\u1EBFp t\u1EE5c"
      );
    }
    idToken = extractIdToken(currentUrl);
    if (idToken) break;
    const stepRes = await session.fetch(currentUrl, { method: "GET" });
    const next = getLocation(stepRes, currentUrl);
    if (next?.includes("ChangePassword") || currentUrl.includes("ChangePassword")) {
      throw new HotSosAuthError(
        "HotSOS y\xEAu c\u1EA7u \u0111\u1ED5i m\u1EADt kh\u1EA9u tr\u01B0\u1EDBc khi ti\u1EBFp t\u1EE5c"
      );
    }
    if (!next) {
      const finalUrl = stepRes.url || currentUrl;
      idToken = extractIdToken(finalUrl);
      if (idToken) break;
      throw new HotSosAuthError(
        `Redirect chain ended without id_token (HTTP ${stepRes.status})`
      );
    }
    idToken = extractIdToken(next);
    if (idToken) break;
    currentUrl = next;
  }
  if (!idToken) {
    throw new HotSosAuthError("Kh\xF4ng l\u1EA5y \u0111\u01B0\u1EE3c id_token sau login");
  }
  const externalRes = await session.fetch(
    `${HOTSOS.APP_BASE}/rpc/Auth/ExternalLogin`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        Accept: "application/json"
      }
    }
  );
  if (!externalRes.ok) {
    throw new HotSosAuthError(
      `ExternalLogin failed (HTTP ${externalRes.status})`
    );
  }
  const externalJson = await externalRes.json();
  const user = externalJson.user ?? externalJson;
  const csrf = await fetchCsrf(session);
  return {
    cookies: session,
    csrf,
    user,
    loggedInAt: Date.now()
  };
}
async function fetchCsrf(session) {
  const res = await session.fetch(
    `${HOTSOS.APP_BASE}/rpc/Auth/GetVerificationToken`,
    {
      method: "GET",
      headers: { Accept: "application/json" }
    }
  );
  if (!res.ok) {
    throw new HotSosAuthError(
      `GetVerificationToken failed (HTTP ${res.status})`
    );
  }
  const json = await res.json();
  if (!json.tokenHeaderName || !json.token) {
    throw new HotSosAuthError("CSRF token response incomplete");
  }
  return {
    tokenHeaderName: json.tokenHeaderName,
    token: json.token
  };
}

// src/hotsos/client.ts
var HotSosClient = class {
  constructor(config) {
    this.config = config;
  }
  config;
  session = null;
  loginPromise = null;
  get hasSession() {
    return this.session !== null;
  }
  get loggedInAt() {
    return this.session?.loggedInAt ?? null;
  }
  get shift() {
    return this.config.shift;
  }
  async forceRelogin() {
    if (!this.config.username || !this.config.password) {
      throw new Error(
        "Thi\u1EBFu HOTSOS_USERNAME / HOTSOS_PASSWORD \u2014 copy .env.example th\xE0nh .env v\xE0 \u0111i\u1EC1n credential"
      );
    }
    this.session = null;
    this.session = await this.ensureSession(true);
  }
  async ensureSession(force = false) {
    if (!force && this.session) return this.session;
    if (!this.loginPromise) {
      this.loginPromise = login(this.config.username, this.config.password).then((s) => {
        this.session = s;
        return s;
      }).finally(() => {
        this.loginPromise = null;
      });
    }
    return this.loginPromise;
  }
  async withAuth(fn) {
    let session = await this.ensureSession();
    try {
      return await fn(session);
    } catch (err) {
      try {
        session.csrf = await fetchCsrf(session.cookies);
        return await fn(session);
      } catch {
        await this.forceRelogin();
        session = await this.ensureSession();
        return await fn(session);
      }
    }
  }
  async putJson(session, path, body) {
    const url = `${HOTSOS.HOUSEKEEPING_BASE}/${path}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: `${HOTSOS.APP_BASE}/app/Index`,
      [session.csrf.tokenHeaderName]: session.csrf.token
    };
    return session.cookies.fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body)
    });
  }
  async getJson(session, path, query) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      params.set(key, String(value));
    }
    const url = `${HOTSOS.HOUSEKEEPING_BASE}/${path}?${params.toString()}`;
    const headers = {
      Accept: "application/json",
      Referer: `${HOTSOS.APP_BASE}/app/Index`,
      [session.csrf.tokenHeaderName]: session.csrf.token
    };
    return session.cookies.fetch(url, {
      method: "GET",
      headers
    });
  }
  async getTotals() {
    return this.withAuth(async (session) => {
      const res = await this.putJson(
        session,
        "HousekeepingSupervisor/GetTotals",
        {
          myRoomsFilter: { shift: this.config.shift },
          shift: this.config.shift
        }
      );
      if (!res.ok) {
        throw new Error(`GetTotals failed (HTTP ${res.status})`);
      }
      return res.json();
    });
  }
  async listRooms() {
    if (!this.config.username || !this.config.password) {
      throw new Error(
        "Thi\u1EBFu HOTSOS_USERNAME / HOTSOS_PASSWORD \u2014 copy .env.example th\xE0nh .env v\xE0 \u0111i\u1EC1n credential"
      );
    }
    return this.withAuth(async (session) => {
      const totalsRes = await this.putJson(
        session,
        "HousekeepingSupervisor/GetTotals",
        {
          myRoomsFilter: { shift: this.config.shift },
          shift: this.config.shift
        }
      );
      if (!totalsRes.ok) {
        throw new Error(`GetTotals failed (HTTP ${totalsRes.status})`);
      }
      const listRes = await this.putJson(
        session,
        "HousekeepingSupervisor/List",
        {
          myRoomsFilter: null,
          listFilter: {
            shift: this.config.shift,
            orderByRoomNumber: 1
          },
          search: null
        }
      );
      if (!listRes.ok) {
        const text = await listRes.text().catch(() => "");
        throw new Error(
          `List failed (HTTP ${listRes.status}): ${text.slice(0, 200)}`
        );
      }
      const data = await listRes.json();
      if (!Array.isArray(data)) {
        throw new Error("List response is not an array");
      }
      return data;
    });
  }
  async getGuests(assignmentId) {
    if (!this.config.username || !this.config.password) {
      throw new Error(
        "Thi\u1EBFu HOTSOS_USERNAME / HOTSOS_PASSWORD \u2014 copy .env.example th\xE0nh .env v\xE0 \u0111i\u1EC1n credential"
      );
    }
    return this.withAuth(async (session) => {
      const totalsRes = await this.putJson(
        session,
        "HousekeepingSupervisor/GetTotals",
        {
          myRoomsFilter: { shift: this.config.shift },
          shift: this.config.shift
        }
      );
      if (!totalsRes.ok) {
        throw new Error(`GetTotals failed (HTTP ${totalsRes.status})`);
      }
      const res = await this.getJson(
        session,
        "RoomAssignments/GetGuestsWithPreferences",
        {
          assignmentId,
          shift: this.config.shift
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `GetGuestsWithPreferences failed (HTTP ${res.status}): ${text.slice(0, 200)}`
        );
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("GetGuestsWithPreferences response is not an array");
      }
      return data;
    });
  }
};

// src/routes/rooms.ts
function createRoomsRouter(client) {
  const app = new Hono2();
  app.get("/", async (c) => {
    const rooms = await client.listRooms();
    const tiles = rooms.map(toRoomTile);
    tiles.sort((a, b) => {
      const fa = a.floor ?? 9999;
      const fb = b.floor ?? 9999;
      if (fa !== fb) return fa - fb;
      return a.roomNumber.localeCompare(b.roomNumber, void 0, {
        numeric: true
      });
    });
    const floors = [
      ...new Set(
        tiles.map((t) => t.floor).filter((f) => f !== null)
      )
    ].sort((a, b) => a - b);
    return c.json({
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      sessionActive: client.hasSession,
      loggedInAt: client.loggedInAt ? new Date(client.loggedInAt).toISOString() : null,
      floors,
      stats: computeRoomStats(tiles),
      rooms: tiles
    });
  });
  return app;
}

// src/app.ts
function createApp() {
  const username = process.env.HOTSOS_USERNAME ?? "";
  const password = process.env.HOTSOS_PASSWORD ?? "";
  const shift = Number(process.env.HOTSOS_SHIFT ?? "1");
  if (!username || !password) {
    console.warn(
      "[hotsos-api] HOTSOS_USERNAME / HOTSOS_PASSWORD ch\u01B0a set \u2014 /api/rooms s\u1EBD l\u1ED7i cho \u0111\u1EBFn khi c\u1EA5u h\xECnh env"
    );
  }
  const client = new HotSosClient({ username, password, shift });
  const app = new Hono2();
  app.use(
    "*",
    cors({
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      allowMethods: ["GET", "POST", "OPTIONS"]
    })
  );
  app.get(
    "/api/health",
    (c) => c.json({
      ok: true,
      hasCredentials: Boolean(username && password),
      sessionActive: client.hasSession,
      shift
    })
  );
  app.route("/api/rooms", createRoomsRouter(client));
  app.get("/api/pax", async (c) => {
    const assignmentId = Number(c.req.query("assignmentId"));
    if (!Number.isFinite(assignmentId) || assignmentId <= 0) {
      return c.json({ error: "assignmentId kh\xF4ng h\u1EE3p l\u1EC7" }, 400);
    }
    const reservationStatus = c.req.query("reservationStatus") ?? "";
    const guests = await client.getGuests(assignmentId);
    const pax = assignmentGuestCounts(guests, reservationStatus);
    return c.json({
      assignmentId,
      adults: pax.adults,
      children: pax.children,
      label: formatPax(pax)
    });
  });
  app.post("/api/refresh", async (c) => {
    try {
      if (!username || !password) {
        return c.json({ error: "Missing HOTSOS credentials" }, 500);
      }
      await client.forceRelogin();
      return c.json({
        ok: true,
        loggedInAt: client.loggedInAt ? new Date(client.loggedInAt).toISOString() : null
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const status = err instanceof HotSosAuthError ? 401 : 500;
      return c.json({ error: message }, status);
    }
  });
  app.post("/api/session/refresh", async (c) => {
    try {
      if (!username || !password) {
        return c.json({ error: "Missing HOTSOS credentials" }, 500);
      }
      await client.forceRelogin();
      return c.json({
        ok: true,
        loggedInAt: client.loggedInAt ? new Date(client.loggedInAt).toISOString() : null
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const status = err instanceof HotSosAuthError ? 401 : 500;
      return c.json({ error: message }, status);
    }
  });
  app.onError((err, c) => {
    console.error("[hotsos-api]", err);
    const message = err instanceof Error ? err.message : String(err);
    const status = err instanceof HotSosAuthError ? 401 : 500;
    return c.json({ error: message }, status);
  });
  return app;
}

// src/vercel.ts
var vercel_default = handle(createApp());
export {
  vercel_default as default
};
/*! Bundled license information:

tough-cookie/dist/cookie/cookie.js:
  (*!
   * Copyright (c) 2015-2020, Salesforce.com, Inc.
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   * this list of conditions and the following disclaimer.
   *
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   * this list of conditions and the following disclaimer in the documentation
   * and/or other materials provided with the distribution.
   *
   * 3. Neither the name of Salesforce.com nor the names of its contributors may
   * be used to endorse or promote products derived from this software without
   * specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   *)
*/
