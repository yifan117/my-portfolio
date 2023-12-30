var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function set_current_component(component18) {
  current_component = component18;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component18 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component18.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component18, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component18, name) {
  if (!component18 || !component18.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component18;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css21) => css21.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    Promise.resolve();
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index18 = 0;
      while (index18 < str.length) {
        var eqIdx = str.indexOf("=", index18);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index18);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index18 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index18, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index18 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie2 = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie2.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie2.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie2.secure = true;
        } else if (key2 === "httponly") {
          cookie2.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie2.sameSite = value2;
        } else {
          cookie2[key2] = value2;
        }
      });
      return cookie2;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers && input.headers["set-cookie"]) {
        input = input.headers["set-cookie"];
      } else if (input.headers) {
        var sch = input.headers[Object.keys(input.headers).find(function(key2) {
          return key2.toLowerCase() === "set-cookie";
        })];
        if (!sch && input.headers.cookie && !options.silent) {
          console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          );
        }
        input = sch;
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie2 = parseString2(str, options);
          cookies2[cookie2.name] = cookie2;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/chunks/hooks.js
var hooks_exports = {};
var init_hooks = __esm({
  ".svelte-kit/output/server/chunks/hooks.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_chunks();
    css = {
      code: "body{margin:0px}::-webkit-scrollbar{height:6px;width:8px}::-webkit-scrollbar-track{box-shadow:inset 0 0 0.5px #808080;border-radius:10px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:10px}::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.05)}",
      map: null
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  file: () => file,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component, file, imports, stylesheets;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    file = "_app/immutable/components/pages/_layout.svelte-b14a2312.js";
    imports = ["_app/immutable/components/pages/_layout.svelte-b14a2312.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets = ["_app/immutable/assets/_layout-021bac04.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
function removed_session() {
  throw new Error(
    "stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
  );
}
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_chunks();
    getStores = () => {
      const stores = getContext("__svelte__");
      const readonly_stores = {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        updated: stores.updated
      };
      Object.defineProperties(readonly_stores, {
        preloading: {
          get() {
            console.error("stores.preloading is deprecated; use stores.navigating instead");
            return {
              subscribe: stores.navigating.subscribe
            };
          },
          enumerable: false
        },
        session: {
          get() {
            removed_session();
            return {};
          },
          enumerable: false
        }
      });
      return readonly_stores;
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>

<pre>${escape($page.error.message)}</pre>



${$page.error.frame ? `<pre>${escape($page.error.frame)}</pre>` : ``}
${$page.error.stack ? `<pre>${escape($page.error.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  file: () => file2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, file2, imports2, stylesheets2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    file2 = "_app/immutable/components/error.svelte-7f546aa3.js";
    imports2 = ["_app/immutable/components/error.svelte-7f546aa3.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/singletons-174e08f2.js"];
    stylesheets2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/lib/projects/typing_game/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var css2, Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/lib/projects/typing_game/_layout.svelte.js"() {
    init_chunks();
    css2 = { code: "body{margin:0px}", map: null };
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  file: () => file3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component3, file3, imports3, stylesheets3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default;
    file3 = "_app/immutable/components/pages/lib/projects/typing_game/_layout.svelte-a2db4475.js";
    imports3 = ["_app/immutable/components/pages/lib/projects/typing_game/_layout.svelte-a2db4475.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets3 = ["_app/immutable/assets/_layout-6d606818.css"];
  }
});

// .svelte-kit/output/server/entries/pages/portfolio/_layout.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => Layout3
});
var css3, Layout3;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/portfolio/_layout.svelte.js"() {
    init_chunks();
    css3 = { code: "body{margin:0px}", map: null };
    Layout3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css3);
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  file: () => file4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component4, file4, imports4, stylesheets4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => (await Promise.resolve().then(() => (init_layout_svelte3(), layout_svelte_exports3))).default;
    file4 = "_app/immutable/components/pages/portfolio/_layout.svelte-d9233675.js";
    imports4 = ["_app/immutable/components/pages/portfolio/_layout.svelte-d9233675.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets4 = ["_app/immutable/assets/_layout-6d606818.css"];
  }
});

// .svelte-kit/output/server/chunks/BackToTop.js
var ChevronUp, css4, BackToTop;
var init_BackToTop = __esm({
  ".svelte-kit/output/server/chunks/BackToTop.js"() {
    init_chunks();
    ChevronUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = "1em" } = $$props;
      let { width = size } = $$props;
      let { height = size } = $$props;
      let { color = "currentColor" } = $$props;
      let { viewBox = "0 0 24 24" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
        $$bindings.viewBox(viewBox);
      return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("viewBox", viewBox, 0)}><path d="${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
    });
    css4 = {
      code: ".back-to-top.svelte-x4954r{opacity:1;transition:opacity 0.5s, visibility 0.5s;position:fixed;border-radius:1000px;display:flex;z-index:99;right:20px;font-size:2em;user-select:none;bottom:20px;color:#D8D8E7;background-color:#161616}.back-to-top.hidden.svelte-x4954r{opacity:0;visibility:hidden}",
      map: null
    };
    BackToTop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { showOnPx = 150 } = $$props;
      if ($$props.showOnPx === void 0 && $$bindings.showOnPx && showOnPx !== void 0)
        $$bindings.showOnPx(showOnPx);
      $$result.css.add(css4);
      return `
  
  <div class="${["back-to-top svelte-x4954r", "hidden"].join(" ").trim()}">${validate_component(ChevronUp, "ChevronUp").$$render($$result, { size: "50px" }, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/Footer.js
var css$1, Border, Linkedin, FileAccount, Github, css5, Footer;
var init_Footer = __esm({
  ".svelte-kit/output/server/chunks/Footer.js"() {
    init_chunks();
    css$1 = {
      code: ".shimmer_border.svelte-1gaw0u9{display:flex;align-items:center;justify-content:center;border-radius:100px;padding:1px;background:linear-gradient(-45deg, #181818, #777, #000, #777, #000, #181818);animation:svelte-1gaw0u9-gradient 10s ease infinite;background-size:400% 400%;width:100%}.selected.svelte-1gaw0u9{background:#fff;animation:none}@-moz-keyframes svelte-1gaw0u9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-webkit-keyframes svelte-1gaw0u9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-o-keyframes svelte-1gaw0u9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@keyframes svelte-1gaw0u9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}",
      map: null
    };
    Border = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { border_radius = "100px" } = $$props;
      let { padding = "4px" } = $$props;
      let { selected = false } = $$props;
      let { index: index18 = "1" } = $$props;
      if ($$props.border_radius === void 0 && $$bindings.border_radius && border_radius !== void 0)
        $$bindings.border_radius(border_radius);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.index === void 0 && $$bindings.index && index18 !== void 0)
        $$bindings.index(index18);
      $$result.css.add(css$1);
      return `<div class="${["shimmer_border svelte-1gaw0u9", selected ? "selected" : ""].join(" ").trim()}" style="${"border-radius: " + escape(border_radius, true) + "; padding: " + escape(padding, true) + "; z-index: " + escape(index18, true)}">${slots.default ? slots.default({}) : ``}
    </div>`;
    });
    Linkedin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = "1em" } = $$props;
      let { width = size } = $$props;
      let { height = size } = $$props;
      let { color = "currentColor" } = $$props;
      let { viewBox = "0 0 24 24" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
        $$bindings.viewBox(viewBox);
      return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("viewBox", viewBox, 0)}><path d="${"M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
    });
    FileAccount = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = "1em" } = $$props;
      let { width = size } = $$props;
      let { height = size } = $$props;
      let { color = "currentColor" } = $$props;
      let { viewBox = "0 0 24 24" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
        $$bindings.viewBox(viewBox);
      return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("viewBox", viewBox, 0)}><path d="${"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M14,20V19C14,17.67 11.33,17 10,17C8.67,17 6,17.67 6,19V20H14M10,12A2,2 0 0,0 8,14A2,2 0 0,0 10,16A2,2 0 0,0 12,14A2,2 0 0,0 10,12Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
    });
    Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = "1em" } = $$props;
      let { width = size } = $$props;
      let { height = size } = $$props;
      let { color = "currentColor" } = $$props;
      let { viewBox = "0 0 24 24" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
        $$bindings.viewBox(viewBox);
      return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("viewBox", viewBox, 0)}><path d="${"M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"}"${add_attribute("fill", color, 0)}></path></svg>`;
    });
    css5 = {
      code: ".container.svelte-stojww{z-index:2;background:#1a1a1a;width:100%;display:flex;align-items:center;justify-content:space-around;padding:8px}.text.svelte-stojww{text-align:center;font-weight:600;font-size:1rem;text-size-adjust:auto}.icon.svelte-stojww{display:flex;align-items:center;justify-content:center;padding:2px;font-size:2rem;text-size-adjust:auto}a.svelte-stojww{text-decoration:none;list-style:none;color:#d8d8e7}.icon_wrapper.svelte-stojww{display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;aspect-ratio:1;padding:4px;border-radius:4px}.icon_wrapper.svelte-stojww:hover{background:rgba(255,255,255,0.1)}",
      map: null
    };
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css5);
      return `${validate_component(Border, "Border").$$render(
        $$result,
        {
          padding: "2px 0px 0px 0px",
          border_radius: "0px"
        },
        {},
        {
          default: () => {
            return `<div class="${"container svelte-stojww"}"><a class="${"icon_wrapper svelte-stojww"}" href="${"https://www.github.com/yifan117"}" target="${"blank"}"><div class="${"text svelte-stojww"}">GitHub
            </div>

            <div class="${"icon svelte-stojww"}">${validate_component(Github, "Github").$$render($$result, { color: "#D8D8E7" }, {}, {})}</div></a>
        <a class="${"icon_wrapper svelte-stojww"}" href="${"https://www.linkedin.com/in/yifan117"}" target="${"blank"}"><div class="${"text svelte-stojww"}">LinkedIn
            </div>

            <div class="${"icon svelte-stojww"}">${validate_component(Linkedin, "Linkedin").$$render($$result, { color: "#D8D8E7" }, {}, {})}</div></a>
        <a class="${"icon_wrapper svelte-stojww"}" href="${"https://drive.google.com/file/d/1F7xsMwDZVOYG_cfbnD6d2nSSlaAw6j3z/view?usp=sharing"}" target="${"blank"}"><div class="${"text svelte-stojww"}">Resume
            </div>

            <div class="${"icon svelte-stojww"}">${validate_component(FileAccount, "Resume").$$render($$result, { color: "#D8D8E7" }, {}, {})}</div></a></div>`;
          }
        }
      )}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Saos.js
var css6, CubeAnimation, Saos;
var init_Saos = __esm({
  ".svelte-kit/output/server/chunks/Saos.js"() {
    init_chunks();
    css6 = {
      code: ".svelte-jh8v3p,.svelte-jh8v3p::before,.svelte-jh8v3p::after{box-sizing:border-box;margin:0;padding:0}.cube.svelte-jh8v3p{margin:200px auto 0;width:100px;height:100Px;position:relative;transform-style:preserve-3d;transform:rotateX(-36deg) rotateY(-45deg);animation:svelte-jh8v3p-spin 3s infinite cubic-bezier(0.16, 0.61, 0.49, 0.91)}@keyframes svelte-jh8v3p-spin{33%{transform:rotateX(-36deg) rotateY(-405deg)}100%{transform:rotateX(-36deg) rotateY(-405deg)}}.face.svelte-jh8v3p{position:absolute;width:100%;height:100%;background:#1a1a1a;border:2px solid #D8D8E7;border-radius:5px;box-shadow:0 0 15px #D8D8E7}.top.svelte-jh8v3p{transform:rotateX(90deg) translateZ(50px);animation:svelte-jh8v3p-shift-top 3s infinite ease-out}.bottom.svelte-jh8v3p{transform:rotateX(-90deg) translateZ(50px);animation:svelte-jh8v3p-shift-bottom 3s infinite ease-out}.right.svelte-jh8v3p{transform:rotateY(90deg) translateZ(50px);animation:svelte-jh8v3p-shift-right 3s infinite ease-out}.left.svelte-jh8v3p{transform:rotateY(-90deg) translateZ(50px);animation:svelte-jh8v3p-shift-left 3s infinite ease-out}.front.svelte-jh8v3p{transform:translateZ(50px);animation:svelte-jh8v3p-shift-front 3s infinite ease-out}.back.svelte-jh8v3p{transform:rotateY(-180deg) translateZ(50px);animation:svelte-jh8v3p-shift-back 3s infinite ease-out}@keyframes svelte-jh8v3p-shift-top{33%{transform:rotateX(90deg) translateZ(50px)}50%{transform:rotateX(90deg) translateZ(100px)}60%{transform:rotateX(90deg) translateZ(100px)}75%{transform:rotateX(90deg) translateZ(50px)}}@keyframes svelte-jh8v3p-shift-bottom{33%{transform:rotateX(-90deg) translateZ(50px)}50%{transform:rotateX(-90deg) translateZ(100px)}60%{transform:rotateX(-90deg) translateZ(100px)}75%{transform:rotateX(-90deg) translateZ(50px)}}@keyframes svelte-jh8v3p-shift-right{33%{transform:rotateY(90deg) translateZ(50px)}50%{transform:rotateY(90deg) translateZ(100px)}60%{transform:rotateY(90deg) translateZ(100px)}75%{transform:rotateY(90deg) translateZ(50px)}}@keyframes svelte-jh8v3p-shift-left{33%{transform:rotateY(-90deg) translateZ(50px)}50%{transform:rotateY(-90deg) translateZ(100px)}60%{transform:rotateY(-90deg) translateZ(100px)}75%{transform:rotateY(-90deg) translateZ(50px)}}@keyframes svelte-jh8v3p-shift-front{33%{transform:translateZ(50px)}50%{transform:translateZ(100px)}60%{transform:translateZ(100px)}75%{transform:translateZ(50px)}}@keyframes svelte-jh8v3p-shift-back{33%{transform:rotateY(-180deg) translateZ(50px)}50%{transform:rotateY(-180deg) translateZ(100px)}60%{transform:rotateY(-180deg) translateZ(100px)}75%{transform:rotateY(-180deg) translateZ(50px)}}",
      map: null
    };
    CubeAnimation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css6);
      return `<body class="${"svelte-jh8v3p"}"><div class="${"cube svelte-jh8v3p"}"><div class="${"face front svelte-jh8v3p"}"></div>
        <div class="${"face back svelte-jh8v3p"}"></div>
        <div class="${"face right svelte-jh8v3p"}"></div>
        <div class="${"face left svelte-jh8v3p"}"></div>
        <div class="${"face top svelte-jh8v3p"}"></div>
        <div class="${"face bottom svelte-jh8v3p"}"></div></div>
    </body>`;
    });
    Saos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { animation = "none" } = $$props;
      let { animation_out = "none; opacity: 0" } = $$props;
      let { once: once2 = false } = $$props;
      let { top = 0 } = $$props;
      let { bottom = 0 } = $$props;
      let { css_observer = "" } = $$props;
      let { css_animation = "" } = $$props;
      const dispatch = createEventDispatcher();
      let observing = true;
      const countainer = `__saos-${Math.random()}__`;
      if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
        $$bindings.animation(animation);
      if ($$props.animation_out === void 0 && $$bindings.animation_out && animation_out !== void 0)
        $$bindings.animation_out(animation_out);
      if ($$props.once === void 0 && $$bindings.once && once2 !== void 0)
        $$bindings.once(once2);
      if ($$props.top === void 0 && $$bindings.top && top !== void 0)
        $$bindings.top(top);
      if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
        $$bindings.bottom(bottom);
      if ($$props.css_observer === void 0 && $$bindings.css_observer && css_observer !== void 0)
        $$bindings.css_observer(css_observer);
      if ($$props.css_animation === void 0 && $$bindings.css_animation && css_animation !== void 0)
        $$bindings.css_animation(css_animation);
      {
        dispatch("update", { observing });
      }
      return `<div${add_attribute("id", countainer, 0)}${add_attribute("style", css_observer, 0)}>${`<div style="${"animation: " + escape(animation, true) + "; " + escape(css_animation, true)}">${slots.default ? slots.default({}) : ``}</div>`}</div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var css7, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_chunks();
    init_BackToTop();
    init_Footer();
    init_Saos();
    css7 = {
      code: ".svelte-1v8k5o9.svelte-1v8k5o9{color:#d8d8e7;font-family:'Prompt';box-sizing:border-box;text-size-adjust:auto}.container.svelte-1v8k5o9.svelte-1v8k5o9{gap:220px;display:flex;flex-direction:column;align-items:center;align-self:stretch;width:100%}.text.svelte-1v8k5o9.svelte-1v8k5o9{text-align:center;max-width:70%}.about-me.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;align-items:center;justify-content:center}section.svelte-1v8k5o9.svelte-1v8k5o9{display:grid;align-self:stretch;width:100%}a.svelte-1v8k5o9.svelte-1v8k5o9,li.svelte-1v8k5o9.svelte-1v8k5o9,ul.svelte-1v8k5o9.svelte-1v8k5o9{text-decoration:none;list-style:none;display:flex}li.svelte-1v8k5o9.svelte-1v8k5o9{cursor:pointer}body.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;flex-direction:column;align-items:center;background:#1d1d1d;gap:200px}.logo.svelte-1v8k5o9.svelte-1v8k5o9{order:0;display:flex;font-size:3em;font-weight:700;align-items:flex-start}.header.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;position:sticky;transition:all 0.3s;align-items:center;align-self:stretch;width:100%;gap:200px;z-index:999;transform:translate3d(0, 0, 1000px)}.header-contents.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;width:100%;align-items:center;justify-content:center}.header[data-position='top'].svelte-1v8k5o9 .header-contents.svelte-1v8k5o9{display:flex;width:100%;align-items:center;justify-content:center}.header[data-position='top'].svelte-1v8k5o9 ul.svelte-1v8k5o9{display:flex;align-items:center;width:100%;justify-content:space-around}.header.isStuck.svelte-1v8k5o9 ul.svelte-1v8k5o9{display:flex;align-items:center;width:100%;justify-content:flex-end;gap:100px}.header.isStuck.svelte-1v8k5o9 .header-contents.svelte-1v8k5o9{display:flex;justify-content:flex-end}.header[data-position='top'].svelte-1v8k5o9.svelte-1v8k5o9{top:0rem;display:flex;flex-direction:column;position:sticky;font-size:1.6em;transition:all 0.3s;align-items:center;width:100%;padding:100px;height:100vh;align-self:stretch;z-index:999}.header[data-position='bottom'].svelte-1v8k5o9.svelte-1v8k5o9{bottom:1rem}.header.isStuck.svelte-1v8k5o9.svelte-1v8k5o9{background:#373737;z-index:999;font-size:1em;flex-direction:row;height:40%;justify-content:space-between;padding:10px 30px 10px 30px}ul.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;order:1;gap:30px;font-size:1.8em;font-weight:600;align-items:flex-end;justify-content:flex-start}ul.svelte-1v8k5o9 li a.svelte-1v8k5o9{position:relative;text-decoration:none;line-height:1em;letter-spacing:2px;text-transform:uppercase;color:transparent;-webkit-text-stroke:1px rgba(216,216,231,0.8)}ul.svelte-1v8k5o9 li a.svelte-1v8k5o9::before{content:attr(data-text);position:absolute;color:#d8d8e7;line-height:1em;width:0;overflow:hidden;transition:0.5s;border-right:0px solid var(--clr);-webkit-text-stroke:1px var(--clr)}ul.svelte-1v8k5o9 li a.svelte-1v8k5o9:hover::before{width:100%;filter:drop-shadow(0 0 25px var(--clr))}.about-me.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;font-weight:600;font-size:1.5em;padding:20px;align-items:center;text-align:center}.occupation.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;align-self:stretch;align-items:center;justify-content:center}.hi.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;flex-direction:column;align-items:center;justify-content:center}.hi-container.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;align-items:center;justify-content:center;height:80%}.hi-text.svelte-1v8k5o9.svelte-1v8k5o9{font-size:6em;font-weight:600;text-align:center}p.svelte-1v8k5o9.svelte-1v8k5o9,h2.svelte-1v8k5o9.svelte-1v8k5o9,ul.svelte-1v8k5o9.svelte-1v8k5o9{margin-block-start:0;margin-block-end:0;margin-inline-start:0px;margin-inline-end:0px;padding-inline-start:0}.occupation.svelte-1v8k5o9.svelte-1v8k5o9{opacity:30%}.skills-container.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;flex-direction:column;padding:20px 30px 20px 30px;align-items:center;align-self:stretch;width:100%}.level-container.svelte-1v8k5o9.svelte-1v8k5o9{width:60%;display:flex}.skill.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;flex-direction:column;width:100%;gap:10px}.skill-bar.svelte-1v8k5o9.svelte-1v8k5o9,.skill-bar-filler.svelte-1v8k5o9.svelte-1v8k5o9{height:10px;border-radius:20px}h2.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;justify-content:center;font-size:2.5em;font-weight:600}.skill-bar-container.svelte-1v8k5o9.svelte-1v8k5o9{display:flex}.toggle-button.svelte-1v8k5o9.svelte-1v8k5o9{top:0.75rem;right:1rem;display:none;flex-direction:column;justify-content:space-between;width:30px;height:21px;padding:0px;background:none;border:none}.toggle-button.svelte-1v8k5o9 .bar.svelte-1v8k5o9{height:3px;width:100%;background-color:#d8d8e7;border-radius:10px}@media(max-width: 1000px){.header.svelte-1v8k5o9.svelte-1v8k5o9{flex-direction:column;align-items:flex-start}.header[data-position='top'].svelte-1v8k5o9 .header-contents.svelte-1v8k5o9{display:flex;align-items:center;justify-content:center}.toggle-button.svelte-1v8k5o9.svelte-1v8k5o9{cursor:pointer}.header[data-position='top'].svelte-1v8k5o9 .logo.svelte-1v8k5o9{font-size:1.4em}.header[data-position='top'].svelte-1v8k5o9 .toggle-button.svelte-1v8k5o9{display:none}.header[data-position='top'].svelte-1v8k5o9 .header-contents ul.svelte-1v8k5o9{width:100%;flex-direction:column;align-items:center;justify-content:center}.header[data-position='top'].svelte-1v8k5o9 .header-contents li.svelte-1v8k5o9{text-align:center;width:100%;font-size:0.6em;align-items:center;justify-content:center}.header.isStuck.svelte-1v8k5o9 .toggle-button.svelte-1v8k5o9{display:flex}.header.isStuck.svelte-1v8k5o9 .logo-wrapper.svelte-1v8k5o9{display:flex;width:100%;align-items:center;justify-content:space-between}.header.isStuck.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;flex-direction:column;gap:30px}.header.isStuck.svelte-1v8k5o9 .header-contents.svelte-1v8k5o9{display:none}.header-contents-active.svelte-1v8k5o9.svelte-1v8k5o9{display:flex;flex-direction:column;height:20%}.header-contents-active.svelte-1v8k5o9 ul.svelte-1v8k5o9{flex-direction:column}}.gradient-text.svelte-1v8k5o9.svelte-1v8k5o9{background:linear-gradient(92.62deg, #9c98e2, #5f5fcc, #98d1f4, #00d3ff);-webkit-background-clip:text;background-size:400% 400%;animation:svelte-1v8k5o9-gradient 5s ease infinite;-webkit-text-fill-color:transparent;background-clip:text;text-fill-color:transparent}@-moz-keyframes fade-in-left{0%{-webkit-transform:translateX(-50px);transform:translateX(-50px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes fade-in-left{0%{-webkit-transform:translateX(-50px);transform:translateX(-50px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-o-keyframes fade-in-left{0%{-webkit-transform:translateX(-50px);transform:translateX(-50px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes fade-in-left{0%{-webkit-transform:translateX(-50px);transform:translateX(-50px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-moz-keyframes scale-in-center{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:1}}@-webkit-keyframes scale-in-center{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:1}}@-o-keyframes scale-in-center{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:1}}@keyframes scale-in-center{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:1}}@-moz-keyframes focus-in-contract-bck{0%{letter-spacing:1em;-webkit-transform:translateZ(300px);transform:translateZ(300px);-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-transform:translateZ(12px);transform:translateZ(12px);-webkit-filter:blur(0);filter:blur(0);opacity:1}}@-webkit-keyframes focus-in-contract-bck{0%{letter-spacing:1em;-webkit-transform:translateZ(300px);transform:translateZ(300px);-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-transform:translateZ(12px);transform:translateZ(12px);-webkit-filter:blur(0);filter:blur(0);opacity:1}}@-o-keyframes focus-in-contract-bck{0%{letter-spacing:1em;-webkit-transform:translateZ(300px);transform:translateZ(300px);-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-transform:translateZ(12px);transform:translateZ(12px);-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes focus-in-contract-bck{0%{letter-spacing:1em;-webkit-transform:translateZ(300px);transform:translateZ(300px);-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-transform:translateZ(12px);transform:translateZ(12px);-webkit-filter:blur(0);filter:blur(0);opacity:1}}@-moz-keyframes swing-in-top-fwd{0%{-webkit-transform:rotateX(-100deg);transform:rotateX(-100deg);-webkit-transform-origin:top;transform-origin:top;opacity:0}100%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);-webkit-transform-origin:top;transform-origin:top;opacity:1}}@-webkit-keyframes swing-in-top-fwd{0%{-webkit-transform:rotateX(-100deg);transform:rotateX(-100deg);-webkit-transform-origin:top;transform-origin:top;opacity:0}100%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);-webkit-transform-origin:top;transform-origin:top;opacity:1}}@-o-keyframes swing-in-top-fwd{0%{-webkit-transform:rotateX(-100deg);transform:rotateX(-100deg);-webkit-transform-origin:top;transform-origin:top;opacity:0}100%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);-webkit-transform-origin:top;transform-origin:top;opacity:1}}@keyframes swing-in-top-fwd{0%{-webkit-transform:rotateX(-100deg);transform:rotateX(-100deg);-webkit-transform-origin:top;transform-origin:top;opacity:0}100%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);-webkit-transform-origin:top;transform-origin:top;opacity:1}}@-moz-keyframes vibrate-1{0%{-webkit-transform:translate(0);transform:translate(0)}20%{-webkit-transform:translate(-2px, 2px);transform:translate(-2px, 2px)}40%{-webkit-transform:translate(-2px, -2px);transform:translate(-2px, -2px)}60%{-webkit-transform:translate(2px, 2px);transform:translate(2px, 2px)}80%{-webkit-transform:translate(2px, -2px);transform:translate(2px, -2px)}100%{-webkit-transform:translate(0);transform:translate(0)}}@-webkit-keyframes vibrate-1{0%{-webkit-transform:translate(0);transform:translate(0)}20%{-webkit-transform:translate(-2px, 2px);transform:translate(-2px, 2px)}40%{-webkit-transform:translate(-2px, -2px);transform:translate(-2px, -2px)}60%{-webkit-transform:translate(2px, 2px);transform:translate(2px, 2px)}80%{-webkit-transform:translate(2px, -2px);transform:translate(2px, -2px)}100%{-webkit-transform:translate(0);transform:translate(0)}}@-o-keyframes vibrate-1{0%{-webkit-transform:translate(0);transform:translate(0)}20%{-webkit-transform:translate(-2px, 2px);transform:translate(-2px, 2px)}40%{-webkit-transform:translate(-2px, -2px);transform:translate(-2px, -2px)}60%{-webkit-transform:translate(2px, 2px);transform:translate(2px, 2px)}80%{-webkit-transform:translate(2px, -2px);transform:translate(2px, -2px)}100%{-webkit-transform:translate(0);transform:translate(0)}}@keyframes vibrate-1{0%{-webkit-transform:translate(0);transform:translate(0)}20%{-webkit-transform:translate(-2px, 2px);transform:translate(-2px, 2px)}40%{-webkit-transform:translate(-2px, -2px);transform:translate(-2px, -2px)}60%{-webkit-transform:translate(2px, 2px);transform:translate(2px, 2px)}80%{-webkit-transform:translate(2px, -2px);transform:translate(2px, -2px)}100%{-webkit-transform:translate(0);transform:translate(0)}}@-moz-keyframes svelte-1v8k5o9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-webkit-keyframes svelte-1v8k5o9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-o-keyframes svelte-1v8k5o9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@keyframes svelte-1v8k5o9-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}",
      map: null
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let toggleCountd;
      let headerContents = [
        { content: "Home" },
        {
          content: "Portfolio",
          link: "./portfolio_revised_as_marquee"
        },
        { content: "Hire", link: "./hire" },
        { content: "Contact", link: "./contact-me" }
      ];
      let skills = [
        {
          text: "Svelte | HTML + CSS",
          level: "90",
          color: "#FF5D5D"
        },
        {
          text: "JavaScript | TypeScript",
          level: "90",
          color: "#CC5CDE"
        },
        {
          text: "C++",
          level: "95",
          color: "#80C07A"
        },
        {
          text: "Rust",
          level: "70",
          color: "#D06E61"
        }
      ];
      let toggleCount = 0;
      $$result.css.add(css7);
      toggleCountd = toggleCount % 2;
      return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-1v8k5o9"}">
  
  <body class="${"svelte-1v8k5o9"}">${``}
  
        <div class="${["header svelte-1v8k5o9", ""].join(" ").trim()}"${add_attribute("data-position", "top", 0)}><div class="${"logo-wrapper svelte-1v8k5o9"}">${`${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "vibrate-1 0.3s linear infinite both"
        },
        {},
        {
          default: () => {
            return `<div class="${"logo svelte-1v8k5o9"}">[yifan]
            </div>`;
          }
        }
      )}`}

        <button class="${"toggle-button svelte-1v8k5o9"}"><span class="${"bar svelte-1v8k5o9"}"></span>
            <span class="${"bar svelte-1v8k5o9"}"></span>
            <span class="${"bar svelte-1v8k5o9"}"></span></button></div>

    ${toggleCountd === 0 ? `<div class="${"header-contents svelte-1v8k5o9"}"><ul class="${"svelte-1v8k5o9"}">${each(headerContents, (headerContent) => {
        return `<li style="${"--clr:#D8D8E7"}" class="${"svelte-1v8k5o9"}"><a${add_attribute("href", headerContent.link, 0)}${add_attribute("data-text", headerContent.content, 0)} class="${"svelte-1v8k5o9"}">${escape(headerContent.content)}</a></li>`;
      })}</ul></div>` : `<div class="${"header-contents-active svelte-1v8k5o9"}"><ul class="${"svelte-1v8k5o9"}">${each(headerContents, (headerContent) => {
        return `<li style="${"--clr:#D8D8E7"}" class="${"svelte-1v8k5o9"}"><a${add_attribute("href", headerContent.link, 0)}${add_attribute("data-text", headerContent.content, 0)} class="${"svelte-1v8k5o9"}">${escape(headerContent.content)}</a></li>`;
      })}</ul></div>`}</div>
        ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}
  
        <section class="${"svelte-1v8k5o9"}"></section>
  
        ${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        },
        {},
        {
          default: () => {
            return `<div class="${"hi-container svelte-1v8k5o9"}"><div class="${"hi svelte-1v8k5o9"}" style="${"align-self: flex-end;"}"><div class="${"hi-text svelte-1v8k5o9"}">Hi, I&#39;m <span class="${"gradient-text svelte-1v8k5o9"}">Yifan</span></div>
  
                        <div class="${"occupation svelte-1v8k5o9"}">Full-Stack Developer | Student
                        </div></div></div>
  
                ${validate_component(CubeAnimation, "CubeAnimation").$$render($$result, {}, {}, {})}`;
          }
        }
      )}
  
        ${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        },
        {},
        {
          default: () => {
            return `<section style="${"padding: 100px 0px 0px 0px"}" class="${"svelte-1v8k5o9"}"><div class="${"about-me svelte-1v8k5o9"}"><div class="${"text svelte-1v8k5o9"}">I\u2019m a second year student at the <span class="${"gradient-text svelte-1v8k5o9"}">University of Adelaide</span> studying a <span class="${"gradient-text svelte-1v8k5o9"}">Bachelor of Computer Science</span> and am interested in both <span class="${"gradient-text svelte-1v8k5o9"}">front-end and back-end</span> development opportunities to gain experience!
                        <br class="${"svelte-1v8k5o9"}"><br class="${"svelte-1v8k5o9"}">
                        I have experience in Svelte, Rust, Python, HTML, CSS, JavaScript, TypeScript and C++.
                    </div></div></section>`;
          }
        }
      )}
            
        <section class="${"svelte-1v8k5o9"}">${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "swing-in-top-fwd 2s cubic-bezier(0.175, 0.885, 0.320, 1.275) both"
        },
        {},
        {
          default: () => {
            return `<div class="${"container svelte-1v8k5o9"}" style="${"justify-content: center"}"><div class="${"skills-container svelte-1v8k5o9"}"><h2 class="${"svelte-1v8k5o9"}">Skills</h2>
                        <div class="${"level-container svelte-1v8k5o9"}"><div class="${"skill svelte-1v8k5o9"}">${each(skills, (skill) => {
              return `${validate_component(Saos, "Saos").$$render(
                $$result,
                {
                  animation: "fade-in-left 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.1s both"
                },
                {},
                {
                  default: () => {
                    return `<p class="${"skill-text svelte-1v8k5o9"}">${escape(skill.text)}</p>
                                        <div class="${"skill-bar-container svelte-1v8k5o9"}" style="${"width: 100%;"}"><div class="${"skill-bar svelte-1v8k5o9"}" style="${"width: " + escape(skill.level, true) + "%; background: " + escape(skill.color, true) + "; flex-grow: 0; order: 0; align-items: flex-start"}"></div>
                                            <div class="${"skill-bar-filler svelte-1v8k5o9"}" style="${"background: rgba(216, 216, 231, 0.1); flex-grow: 1; order: 1; align-items: flex-end"}"></div></div>
                                    `;
                  }
                }
              )}`;
            })}</div></div></div></div>`;
          }
        }
      )}</section>
  
        
  
    ${`${slots.default ? slots.default({}) : ``}`}

    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
  
  </body>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  file: () => file5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component5, file5, imports5, stylesheets5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    file5 = "_app/immutable/components/pages/_page.svelte-8267b66b.js";
    imports5 = ["_app/immutable/components/pages/_page.svelte-8267b66b.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/BackToTop-7992629c.js", "_app/immutable/chunks/Saos-e2121421.js", "_app/immutable/chunks/Footer-ec53c4ca.js"];
    stylesheets5 = ["_app/immutable/assets/_page-4ccac8af.css", "_app/immutable/assets/BackToTop-1d4f830c.css", "_app/immutable/assets/Saos-0c48ddf8.css", "_app/immutable/assets/Footer-13a1badc.css"];
  }
});

// .svelte-kit/output/server/chunks/nav-bar.js
var css8, Nav_bar;
var init_nav_bar = __esm({
  ".svelte-kit/output/server/chunks/nav-bar.js"() {
    init_chunks();
    css8 = {
      code: ".svelte-z62y7d.svelte-z62y7d{color:#D8D8E7;font-family:'Prompt';box-sizing:border-box;text-size-adjust:auto}.logo.svelte-z62y7d.svelte-z62y7d{order:0;display:flex;font-size:3em;font-weight:700;align-items:flex-start}a.svelte-z62y7d.svelte-z62y7d,li.svelte-z62y7d.svelte-z62y7d,ul.svelte-z62y7d.svelte-z62y7d{text-decoration:none;list-style:none;display:flex}li.svelte-z62y7d.svelte-z62y7d{cursor:pointer}.logo.svelte-z62y7d.svelte-z62y7d{order:0;display:flex;font-size:3em;font-weight:700;align-items:flex-start}.header-contents.svelte-z62y7d.svelte-z62y7d{display:flex;width:100%;align-items:center;justify-content:center}.header.svelte-z62y7d ul.svelte-z62y7d{display:flex;align-items:center;width:100%;justify-content:flex-end;gap:100px}.header.svelte-z62y7d .header-contents.svelte-z62y7d{display:flex;justify-content:flex-end}.header.svelte-z62y7d .header-contents-active.svelte-z62y7d{display:flex;justify-content:flex-end;background:#1d1d1d}ul.svelte-z62y7d.svelte-z62y7d{display:flex;order:1;gap:30px;font-size:1.8em;font-weight:600;align-items:flex-end;justify-content:flex-start}ul.svelte-z62y7d li a.svelte-z62y7d{position:relative;text-decoration:none;line-height:1em;letter-spacing:2px;text-transform:uppercase;color:transparent;-webkit-text-stroke:1px rgba(216, 216, 231, 0.8)}ul.svelte-z62y7d li a.svelte-z62y7d::before{content:attr(data-text);position:absolute;color:#D8D8E7;width:0;overflow:hidden;transition:0.5s;border-right:0px solid var(--clr);-webkit-text-stroke:1px var(--clr)}ul.svelte-z62y7d li a.svelte-z62y7d:hover::before{width:100%;filter:drop-shadow(0 0 25px var(--clr))}.header.svelte-z62y7d.svelte-z62y7d{top:0rem;display:flex;transition:all 0.3s;align-items:center;width:100%;padding:0px 30px;align-self:stretch;justify-content:space-between;z-index:999;transform:translate3d(0, 0, 1000px)}.toggle-button.svelte-z62y7d .bar.svelte-z62y7d{height:3px;width:100%;background-color:#D8D8E7;border-radius:10px}.toggle-button.svelte-z62y7d.svelte-z62y7d{top:.75rem;right:1rem;display:none;flex-direction:column;justify-content:space-between;width:30px;height:21px;padding:0px;background:none;border:none}@media(max-width: 1000px){.toggle-button.svelte-z62y7d.svelte-z62y7d{display:flex}.header-contents.svelte-z62y7d.svelte-z62y7d{width:100%;display:none}.header.svelte-z62y7d.svelte-z62y7d{align-items:flex-start;z-index:999}.header-contents.svelte-z62y7d ul.svelte-z62y7d{width:100%;flex-direction:column}.header-contents.svelte-z62y7d li.svelte-z62y7d{text-align:center}.header.svelte-z62y7d.svelte-z62y7d{display:flex;z-index:999}.header.svelte-z62y7d ul.svelte-z62y7d{flex-direction:column;align-items:center;flex-direction:center;display:flex;padding:0px}.header.svelte-z62y7d .header-contents.svelte-z62y7d{display:none;flex-direction:column;align-items:center;flex-direction:center}.header.svelte-z62y7d ul.svelte-z62y7d{flex-direction:column;align-items:center;flex-direction:center;display:flex;padding:0px}.header.svelte-z62y7d .logo-wrapper.svelte-z62y7d{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%}.header.svelte-z62y7d.svelte-z62y7d{flex-direction:column}.header.svelte-z62y7d .logo-wrapper.svelte-z62y7d{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%}.header.svelte-z62y7d.svelte-z62y7d{display:flex;flex-direction:column;z-index:999}.header-contents-active.svelte-z62y7d.svelte-z62y7d{display:flex;padding:none;width:100%}ul.svelte-z62y7d.svelte-z62y7d{align-items:center;justify-content:center;width:100%}.header.svelte-z62y7d.svelte-z62y7d{z-index:999}.toggle-button.svelte-z62y7d.svelte-z62y7d{cursor:pointer}.logo-wrapper.svelte-z62y7d.svelte-z62y7d{z-index:999}}",
      map: null
    };
    Nav_bar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let toggleCountd;
      let headerContents = [
        { content: "Home", link: "../" },
        {
          content: "Portfolio",
          link: "../portfolio_revised_as_marquee"
        },
        { content: "Hire", link: "../hire" },
        {
          content: "Contact",
          link: "../contact-me"
        }
      ];
      let toggleCount = 0;
      $$result.css.add(css8);
      toggleCountd = toggleCount % 2;
      return `<div class="${"header svelte-z62y7d"}"><div class="${"logo-wrapper svelte-z62y7d"}"><a class="${"logo svelte-z62y7d"}" href="${"../"}">[yifan]
        </a>

    <button class="${"toggle-button svelte-z62y7d"}"><span class="${"bar svelte-z62y7d"}"></span>
        <span class="${"bar svelte-z62y7d"}"></span>
        <span class="${"bar svelte-z62y7d"}"></span></button></div>

${toggleCountd === 0 ? `<div class="${"header-contents svelte-z62y7d"}"><ul class="${"svelte-z62y7d"}">${each(headerContents, (headerContent) => {
        return `<li style="${"--clr:#D8D8E7"}" class="${"svelte-z62y7d"}"><a${add_attribute("href", headerContent.link, 0)}${add_attribute("data-text", headerContent.content, 0)} class="${"svelte-z62y7d"}">${escape(headerContent.content)}</a></li>`;
      })}</ul></div>` : `<div class="${"header-contents-active svelte-z62y7d"}"><ul class="${"svelte-z62y7d"}">${each(headerContents, (headerContent) => {
        return `<li style="${"--clr:#D8D8E7"}" class="${"svelte-z62y7d"}"><a${add_attribute("href", headerContent.link, 0)}${add_attribute("data-text", headerContent.content, 0)} class="${"svelte-z62y7d"}">${escape(headerContent.content)}</a></li>`;
      })}</ul></div>`}
</div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/contact-me/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var css9, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/contact-me/_page.svelte.js"() {
    init_chunks();
    init_nav_bar();
    init_Footer();
    css9 = {
      code: ".wrapper.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{display:flex;align-items:center;justify-content:center;flex-direction:column}body.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{display:flex;width:100vw;margin:0px;height:100vh;justify-content:space-between;flex-direction:column;align-items:center;background:#1d1d1d;overflow-x:hidden}.container.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{display:flex;align-items:center;justify-content:center;background:#1d1d1d;gap:50px}.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{color:#d8d8e7;font-family:'Prompt';box-sizing:border-box;text-size-adjust:auto}h3.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{text-transform:uppercase;letter-spacing:2px;-webkit-text-stroke:1px #d8d8e7;text-align:center}span.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{color:#d8d8e7}.card.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{display:flex;justify-content:center;align-items:center;padding:80px;flex-direction:column;width:100%;height:100%;max-width:80%;max-height:80%;background:rgba(255,255,255,0.15);border-radius:16px;gap:8px}.inputBox.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{position:relative;min-width:250px;margin-bottom:8px;color:#d8d8e7}.inputBox.svelte-1mdmh0z input.svelte-1mdmh0z.svelte-1mdmh0z,textarea.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{width:100%;padding:10px;outline:none;border:none;color:#d8d8e7;font-size:1em;background:transparent;border-left:2px solid #1d1d1d;border-bottom:2px solid #1d1d1d;transition:0.1s}.inputBox.svelte-1mdmh0z input.svelte-1mdmh0z.svelte-1mdmh0z:focus,textarea.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z:focus{border:2px solid #1d1d1d;transition:1s}.inputBox.svelte-1mdmh0z input.svelte-1mdmh0z:valid~span.svelte-1mdmh0z,.inputBox.svelte-1mdmh0z input.svelte-1mdmh0z:focus~span.svelte-1mdmh0z{transform:translateX(160px) translateY(-18px);font-size:0.8em;padding:5px 10px;background:#1d1d1d;letter-spacing:0.2em;color:#d8d8e7;border:2px}.inputBox.svelte-1mdmh0z input.svelte-1mdmh0z.svelte-1mdmh0z:valid,.inputBox.svelte-1mdmh0z input.svelte-1mdmh0z.svelte-1mdmh0z:focus{border:2px solid #1d1d1d}input[type=submit].svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{height:45px;width:100px;border-radius:5px;border:2px solid #000;cursor:pointer;background-color:transparent;transition:0.5s;text-transform:uppercase;font-size:10px;letter-spacing:2px;font-weight:700}input[type=submit].svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z:hover{background-color:#000;color:D8D8E7}.inputBox.svelte-1mdmh0z span.svelte-1mdmh0z.svelte-1mdmh0z{margin-top:5px;position:absolute;left:0;transform:translateY(-4px);margin-left:10px;padding:10px;pointer-events:none;font-size:12px;color:#d8d8e7;text-transform:uppercase;transition:0.5s;letter-spacing:3px}@media(max-width: 1000px){.container.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{flex-direction:column}.card.svelte-1mdmh0z.svelte-1mdmh0z.svelte-1mdmh0z{max-height:40%}}",
      map: null
    };
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css9);
      return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-1mdmh0z"}">
    
<body class="${"svelte-1mdmh0z"}">${validate_component(Nav_bar, "Nav").$$render($$result, {}, {}, {})}

    <div class="${"container svelte-1mdmh0z"}"><div class="${"card svelte-1mdmh0z"}"><h3 class="${"svelte-1mdmh0z"}">Sign Up To Hear About New Projects</h3>
            <form action="${"https://api.staticforms.xyz/submit"}" method="${"post"}" class="${"svelte-1mdmh0z"}"><input type="${"hidden"}" name="${"accessKey"}" value="${"1abfbd67-ce48-4632-9b7e-432d080c688a"}" class="${"svelte-1mdmh0z"}"> 
            <div class="${"wrapper svelte-1mdmh0z"}"><div class="${"inputBox svelte-1mdmh0z"}"><input type="${"text"}" name="${"email"}" required class="${"svelte-1mdmh0z"}">
                    <span class="${"svelte-1mdmh0z"}">Email</span></div>

                <input type="${"hidden"}" name="${"redirectTo"}" value="${"https://www.yifan-lu.com"}" class="${"svelte-1mdmh0z"}"> 
                <input type="${"submit"}" value="${"Submit"}" class="${"svelte-1mdmh0z"}"></div></form></div>

        <div class="${"card svelte-1mdmh0z"}"><h3 class="${"svelte-1mdmh0z"}">Message Me!</h3>
            <form action="${"https://api.staticforms.xyz/submit"}" method="${"post"}" class="${"svelte-1mdmh0z"}"><input type="${"hidden"}" name="${"accessKey"}" value="${"1abfbd67-ce48-4632-9b7e-432d080c688a"}" class="${"svelte-1mdmh0z"}"> 

                <div class="${"wrapper svelte-1mdmh0z"}"><div class="${"inputBox svelte-1mdmh0z"}"><input type="${"text"}" name="${"name"}" required class="${"svelte-1mdmh0z"}"> 
                        <span class="${"svelte-1mdmh0z"}">Name</span></div>
            <div class="${"inputBox svelte-1mdmh0z"}"><input type="${"text"}" name="${"email"}" required class="${"svelte-1mdmh0z"}">
                    <span class="${"svelte-1mdmh0z"}">Email</span></div>
                <div class="${"inputBox svelte-1mdmh0z"}"><textarea name="${"message"}" placeholder="${"Enter your message here..."}" class="${"svelte-1mdmh0z"}"></textarea> </div>


                <input type="${"hidden"}" name="${"redirectTo"}" value="${"https://www.yifan-lu.com"}" class="${"svelte-1mdmh0z"}"> 
                <input type="${"submit"}" value="${"Submit"}" class="${"svelte-1mdmh0z"}"></div></form></div></div>

    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</body>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  file: () => file6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component6, file6, imports6, stylesheets6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    file6 = "_app/immutable/components/pages/contact-me/_page.svelte-e5fbf656.js";
    imports6 = ["_app/immutable/components/pages/contact-me/_page.svelte-e5fbf656.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/nav-bar-839a06be.js", "_app/immutable/chunks/Footer-ec53c4ca.js"];
    stylesheets6 = ["_app/immutable/assets/_page-5d2ab645.css", "_app/immutable/assets/nav-bar-1fc869b5.css", "_app/immutable/assets/Footer-13a1badc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/hire/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var css10, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/hire/_page.svelte.js"() {
    init_chunks();
    init_nav_bar();
    init_Footer();
    css10 = {
      code: ".svelte-165uo94{color:#D8D8E7;font-family:'Prompt';box-sizing:border-box;text-size-adjust:auto}body.svelte-165uo94{background:#1D1D1D;min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}h1.svelte-165uo94{text-transform:uppercase}.text-container.svelte-165uo94{width:80%;text-align:center;font-weight:600;font-size:1.3em}.wrapper.svelte-165uo94{display:flex;align-self:stretch;align-items:center;justify-content:center;height:60%}a.svelte-165uo94{text-decoration:none;color:#2DA2E4}",
      map: null
    };
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css10);
      return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-165uo94"}">

<body class="${"svelte-165uo94"}">${validate_component(Nav_bar, "Nav").$$render($$result, {}, {}, {})}

    <div class="${"wrapper svelte-165uo94"}"><div class="${"text-container svelte-165uo94"}"><h1 class="${"svelte-165uo94"}">What Am I Looking For?</h1>
            <p class="${"svelte-165uo94"}">I&#39;m looking for opportunities as either a full-stack, front-end, or back-end software engineer. Since I am only in my first year of my Computer Science degree, I&#39;m primarily focusing on internships and part-time jobs, but would love the opportunity for permanent offers once I graduate!</p>
            <p class="${"svelte-165uo94"}">To contact me about offers or if you have any questions, please click <a href="${"../contact-me"}" class="${"svelte-165uo94"}">here</a></p></div></div>

    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
        
</body>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  file: () => file7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component7, file7, imports7, stylesheets7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index7 = 6;
    component7 = async () => (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    file7 = "_app/immutable/components/pages/hire/_page.svelte-32e74e58.js";
    imports7 = ["_app/immutable/components/pages/hire/_page.svelte-32e74e58.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/nav-bar-839a06be.js", "_app/immutable/chunks/Footer-ec53c4ca.js"];
    stylesheets7 = ["_app/immutable/assets/_page-1e5e7eb6.css", "_app/immutable/assets/nav-bar-1fc869b5.css", "_app/immutable/assets/Footer-13a1badc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/lib/projects/2048/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var css11, Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/lib/projects/2048/_page.svelte.js"() {
    init_chunks();
    css11 = {
      code: '.svelte-sp9io{font-family:"Open Sans", "Helvetica Neue", Arial, sans-serif;animation:appear 200ms ease 100ms;animation-fill-mode:backwards}:root{--empty-font:rgba(249, 246, 242, 0);--two-font:#776e65;--four-font:#776e65;--eight-font:#f9f6f2;--sixteen-font:#f9f6f2;--thirtytwo-font:#f9f6f2;--sixtyfour-font:#f9f6f2;--onehundredtwentyeight-font:#f9f6f2;--twohundredfiftysix-font:#f9f6f2;--fivehundredtwelve-font:#f9f6f2;--empty-bg:rgba(238, 228, 218, 0.35);--two-bg:#eee4da;--four-bg:#eee1c9;--eight-bg:#f3b27a;--sixteen-bg:#f69664;--thirtytwo-bg:#f77c5f;--sixtyfour-bg:#f75f3b;--onehundredtwentyeight-bg:#edcc62;--twohundredfiftysix-bg:#edcc62;--fivehundredtwelve-bg:#edcc62;--box-color:#bbada0;--text-white:#f9f6f2;--game-brown:#8f7a66}.page.svelte-sp9io{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;background:#faf8ef;align-items:center;justify-content:center}.arrayContainer.svelte-sp9io{display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:var(--box-color);min-width:min-content;max-width:470px;aspect-ratio:1;padding:15px;border-radius:5px}.array.svelte-sp9io{display:grid;height:470px;width:470px;grid-template-columns:repeat(4, 1fr);grid-template-rows:repeat(4, 1fr);column-gap:15px;row-gap:15px}.element.svelte-sp9io{display:flex;height:100%;width:100%;align-items:center;justify-content:center;background-color:var(--empty-space);font-size:3em;font-weight:800;transition:100ms ease-in-out;transition-property:transform;border-radius:5px}button.svelte-sp9io{margin:none;border:none;background:var(--game-brown);padding:8px 14px 8px 14px;color:var(--text-white);font-size:1em;border-radius:5px;font-weight:800;cursor:pointer}.gameName.svelte-sp9io{color:var(--game-brown);font-size:4em;font-weight:800}.subText.svelte-sp9io{color:var(--game-brown);font-size:1.2em}.headerContainer.svelte-sp9io{display:flex;align-items:center;justify-content:space-between;width:100%}.gameContainer.svelte-sp9io{display:flex;flex-direction:column;gap:30px}.functionsContainer.svelte-sp9io{display:flex;flex-direction:column;height:50%;width:50%;align-items:center;justify-content:center;gap:10px}.scoresContainer.svelte-sp9io{display:flex;align-items:center;justify-content:space-between;width:100%;gap:10px}.score.svelte-sp9io{display:flex;align-items:center;justify-content:center;width:80%;height:50%;color:var(--text-white);background:var(--box-color);flex-direction:column;border-radius:5px;padding:5px 0px 5px 0px}p.svelte-sp9io{padding:none;margin:0px;font-weight:800;font-size:1.5em}.word.svelte-sp9io{opacity:70%;font-size:0.8em}',
      map: null
    };
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let gameArr = [[0, 0, 0, 0], [0, 0, 2, 0], [2, 0, 0, 0], [0, 0, 0, 0]];
      let score = 0;
      $$result.css.add(css11);
      return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,800&display=swap"}" class="${"svelte-sp9io"}">


<div class="${"page svelte-sp9io"}"><div class="${"gameContainer svelte-sp9io"}"><div class="${"headerContainer svelte-sp9io"}"><div class="${"headerTextContainer svelte-sp9io"}"><div class="${"gameName svelte-sp9io"}">2048
                </div>

                <div class="${"subText svelte-sp9io"}">Join the tiles, get to <b class="${"svelte-sp9io"}">2048!</b></div></div>

            <div class="${"functionsContainer svelte-sp9io"}"><div class="${"scoresContainer svelte-sp9io"}"><div class="${"score svelte-sp9io"}"><p class="${"word svelte-sp9io"}">SCORE</p>
                        <p class="${"svelte-sp9io"}">${escape(score)}</p></div>

                    <div class="${"score svelte-sp9io"}"><p class="${"word svelte-sp9io"}">BEST</p>
                        <p class="${"svelte-sp9io"}">${escape(score)}</p></div></div>

                <div class="${"newGame svelte-sp9io"}"><button class="${"svelte-sp9io"}">New Game</button></div></div></div>

        <div class="${"arrayContainer svelte-sp9io"}"><div class="${"array svelte-sp9io"}">${each(Array(4), (ab, a) => {
        return `${each(Array(4), (_, i) => {
          return `${gameArr[a][i] == 2 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--two-bg); color: var(--two-font);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 4 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--four-bg); color: var(--four-font);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 8 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--eight-bg); color: var(--eight-font);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 16 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--sixteen-bg); color: var(--sixteen-font);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 32 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--thirtytwo-bg); color: var(--thirtytwo-font);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 64 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--sixtyfour-bg); color: var(--sixtyfour-font);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 128 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--onehundredtwentyeight-bg); color: var(--onehundredtwentyeight-font); box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.190476);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 256 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--twohundredfiftysix-bg); color: var(--twohundredfiftysix-font); box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.190476);"}">${escape(gameArr[a][i])}
                            </div>` : `${gameArr[a][i] == 512 ? `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--fivehundredtwelve-bg); color: var(--fivehundredtwelve-font); box-shadow: 0 0 30px 10px rgba(243, 220, 80, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.190476);"}">${escape(gameArr[a][i])}
                            </div>` : `<div class="${"element svelte-sp9io"}" style="${"background-color: var(--empty-bg); color: var(--empty-font);"}">${escape(gameArr[a][i])}
                            </div>`}`}`}`}`}`}`}`}`}`;
        })}`;
      })}</div></div></div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  file: () => file8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component8, file8, imports8, stylesheets8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    file8 = "_app/immutable/components/pages/lib/projects/2048/_page.svelte-f4381e9b.js";
    imports8 = ["_app/immutable/components/pages/lib/projects/2048/_page.svelte-f4381e9b.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets8 = ["_app/immutable/assets/_page-ed5b288d.css"];
  }
});

// .svelte-kit/output/server/entries/pages/lib/projects/calculator/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var css12, Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/lib/projects/calculator/_page.svelte.js"() {
    init_chunks();
    css12 = {
      code: ".page.svelte-f92m8n{height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column}.textfield.svelte-f92m8n{height:70px;width:228px;background-color:#000000;padding:10px;border-top-left-radius:10px;border-top-right-radius:10px}.runningcalc.svelte-f92m8n{color:#ffffff;align-items:flex-end;display:flex;justify-content:flex-end;opacity:30%;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;height:20px;animation-name:fadein;animation-duration:10s;animation-iteration-count:infinite;animation-direction:alternate}.total.svelte-f92m8n{padding:6px;color:#ffffff;display:flex;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-size:2.5em;justify-content:flex-end;align-items:center}.row.svelte-f92m8n{gap:8px;padding:3px;display:flex}.digits.svelte-f92m8n{width:45px;height:45px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;padding:3px;text-align:center;background-color:#555555;display:flex;justify-content:center;flex-direction:column;border-radius:40px;color:#ffffff}.digits.svelte-f92m8n:hover{background-color:#ffffff;opacity:55%;color:#000000;cursor:pointer}.zero.svelte-f92m8n{width:104px;height:45px;border-radius:40px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;background-color:#555555;text-align:center;display:flex;justify-content:center;flex-direction:column;padding:3px;color:#ffffff}.zero.svelte-f92m8n:hover{background-color:#ffffff;opacity:55%;color:#000000;cursor:pointer}.operationSign.svelte-f92m8n{width:45px;height:45px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;padding:3px;text-align:center;background-color:#ec9006;display:flex;justify-content:center;flex-direction:column;border-radius:40px;color:#ffffff}.operationSign.svelte-f92m8n:hover{background-color:#f5c77e;opacity:80%;color:#000000;cursor:pointer}.operationTop.svelte-f92m8n{width:45px;height:45px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;padding:3px;text-align:center;background-color:#A9A9A9;display:flex;justify-content:center;flex-direction:column;border-radius:40px}.operationTop.svelte-f92m8n:hover{background-color:#888888;opacity:80%;color:#ffffff;cursor:pointer}.calcbody.svelte-f92m8n{height:287px;width:228px;background-color:#000000;padding:10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px}",
      map: null
    };
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { console: console2 = "" } = $$props;
      let { operation = "" } = $$props;
      let runningCalc = "";
      if ($$props.console === void 0 && $$bindings.console && console2 !== void 0)
        $$bindings.console(console2);
      if ($$props.operation === void 0 && $$bindings.operation && operation !== void 0)
        $$bindings.operation(operation);
      $$result.css.add(css12);
      return `<div class="${"page svelte-f92m8n"}"><div class="${"textfield svelte-f92m8n"}"><div class="${"runningcalc svelte-f92m8n"}">${escape(runningCalc)}</div>
            <div class="${"total svelte-f92m8n"}">${escape(console2)}</div></div>
        
        <div class="${"calcbody svelte-f92m8n"}"><div class="${"row svelte-f92m8n"}"><div class="${"operationTop svelte-f92m8n"}">C</div>
                <div class="${"operationTop svelte-f92m8n"}">+/-</div> 
                <div class="${"operationTop svelte-f92m8n"}">%</div>
                <div class="${"operationSign svelte-f92m8n"}">\xF7</div></div>
        
            <div class="${"row svelte-f92m8n"}"><div class="${"digits svelte-f92m8n"}">7</div>
                <div class="${"digits svelte-f92m8n"}">8</div>
                <div class="${"digits svelte-f92m8n"}">9</div>
                <div class="${"operationSign svelte-f92m8n"}">\xD7</div></div>
        
            <div class="${"row svelte-f92m8n"}"><div class="${"digits svelte-f92m8n"}">4</div>
                <div class="${"digits svelte-f92m8n"}">5</div>
                <div class="${"digits svelte-f92m8n"}">6</div>
                <div class="${"operationSign svelte-f92m8n"}">-</div></div>
        
            <div class="${"row svelte-f92m8n"}"><div class="${"digits svelte-f92m8n"}">1</div>
                <div class="${"digits svelte-f92m8n"}">2</div>
                <div class="${"digits svelte-f92m8n"}">3</div>
                <div class="${"operationSign svelte-f92m8n"}">+</div></div>
        
            <div class="${"row svelte-f92m8n"}"><div class="${"zero svelte-f92m8n"}">0</div>
                <div class="${"digits svelte-f92m8n"}">.</div>
                <div class="${"operationSign svelte-f92m8n"}">=</div></div></div>    
    </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  file: () => file9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component9, file9, imports9, stylesheets9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    index9 = 8;
    component9 = async () => (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default;
    file9 = "_app/immutable/components/pages/lib/projects/calculator/_page.svelte-8b75bbc3.js";
    imports9 = ["_app/immutable/components/pages/lib/projects/calculator/_page.svelte-8b75bbc3.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets9 = ["_app/immutable/assets/_page-b5cced11.css"];
  }
});

// .svelte-kit/output/server/entries/pages/lib/projects/stopwatch/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var css$12, OtherStopwatchTANDB, css13, Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/lib/projects/stopwatch/_page.svelte.js"() {
    init_chunks();
    css$12 = {
      code: ".svelte-1odkty8{font-family:'Prompt'}.colon.svelte-1odkty8{font-weight:1000;font-size:10rem;min-width:50px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.contents.svelte-1odkty8{display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;height:100vh;width:100vw;border-radius:5px}.textfield.svelte-1odkty8{height:45vh;width:100vw;display:flex;justify-content:space-around}.counter.svelte-1odkty8{min-height:230px;display:flex;align-items:center;justify-content:center;font-size:20rem;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif}.timeUnit.svelte-1odkty8{min-height:380px;min-width:400px;display:flex;flex-direction:column;align-items:center;justify-content:space-around;font-weight:1000;font-size:15rem}small.svelte-1odkty8{display:flex;font-size:0.1em;min-height:40px;align-items:center}.buttons.svelte-1odkty8{display:flex;flex-direction:row;align-items:center;justify-content:space-evenly;min-width:100vw;min-height:auto;border-radius:5px}button.svelte-1odkty8{background-color:#A9A9A9;border-radius:50px;height:13vh;width:13vw;display:flex;align-items:center;align-content:center;justify-content:center;font-size:3rem;font-weight:900;border:10px}button.svelte-1odkty8:hover{opacity:50%;border-color:black;cursor:pointer}@media(max-width: 1500px){}",
      map: null
    };
    OtherStopwatchTANDB = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let state = "Start";
      let seconds = 0;
      let minutes = 0;
      let ms = 0;
      $$result.css.add(css$12);
      return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-1odkty8"}">
    
    <div class="${"contents svelte-1odkty8"}"><div class="${"textfield svelte-1odkty8"}"><div class="${"timeUnit svelte-1odkty8"}"><div class="${"counter svelte-1odkty8"}">${`0${escape(minutes)}`}</div>
    
                <small class="${"svelte-1odkty8"}">Minutes</small></div>
    
            <div class="${"colon svelte-1odkty8"}">:
            </div>
    
            <div class="${"timeUnit svelte-1odkty8"}"><div class="${"counter svelte-1odkty8"}">${`0${escape(seconds)}`}</div>
    
                <small class="${"svelte-1odkty8"}">Seconds</small></div>
    
            <div class="${"colon svelte-1odkty8"}">:
            </div>    
    
            <div class="${"timeUnit svelte-1odkty8"}"><div class="${"counter svelte-1odkty8"}">${`0${escape(ms)}`}</div>
    
                <small class="${"svelte-1odkty8"}">Centiseconds</small></div></div>
    
        <div class="${"buttons svelte-1odkty8"}"><button class="${"svelte-1odkty8"}">${escape(state)}</button>
    
            <button class="${"svelte-1odkty8"}">Reset
            </button></div>
    </div>`;
    });
    css13 = {
      code: ".svelte-qylfjt{font-family:'Prompt';color:#a9a9a9}.body.svelte-qylfjt{display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;height:100vh;width:100vw;background-color:#1D1D1D}",
      map: null
    };
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css13);
      return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-qylfjt"}">

    <title class="${"svelte-qylfjt"}">Yifan&#39;s Stopwatch</title>
    
    <div class="${"body svelte-qylfjt"}">
      ${validate_component(OtherStopwatchTANDB, "OtherStopwatchTandb").$$render($$result, {}, {}, {})}
    </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  file: () => file10,
  imports: () => imports10,
  index: () => index10,
  stylesheets: () => stylesheets10
});
var index10, component10, file10, imports10, stylesheets10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    index10 = 9;
    component10 = async () => (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default;
    file10 = "_app/immutable/components/pages/lib/projects/stopwatch/_page.svelte-f7946ed9.js";
    imports10 = ["_app/immutable/components/pages/lib/projects/stopwatch/_page.svelte-f7946ed9.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets10 = ["_app/immutable/assets/_page-56f616d7.css"];
  }
});

// .svelte-kit/output/server/entries/pages/lib/projects/svelte_materials/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page7
});
var css14, Page7;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/lib/projects/svelte_materials/_page.svelte.js"() {
    init_chunks();
    css14 = {
      code: "body.svelte-mjsf3h.svelte-mjsf3h{background-color:#131416;height:100vh;width:100vw;overflow-x:hidden}.cards-container.svelte-mjsf3h.svelte-mjsf3h{display:flex;flex-direction:column;max-width:1200px;gap:10px;margin:auto}.card.svelte-mjsf3h.svelte-mjsf3h{position:relative;padding:10%;background-size:contain}.card-background.svelte-mjsf3h.svelte-mjsf3h{background-size:contain;background-repeat:no-repeat;background-position:center;border-radius:24px;filter:brightness(0.75) saturate(1.2) contrast(0.85);position:absolute;left:0;right:0;bottom:0;top:0;transform-origin:center;transition:.2s}.card.svelte-mjsf3h:hover .card-background.svelte-mjsf3h{transform:scale(1.05) translateZ(0)}.cards-container.svelte-mjsf3h:hover>.card:not(:hover) .card-background.svelte-mjsf3h{filter:brightness(0.5) saturate(0) contrast(1.2) blur(20px)}.card-content.svelte-mjsf3h.svelte-mjsf3h{padding:24px;position:relative;display:flex;font-family:Arial, Helvetica, sans-serif;align-items:center;justify-content:center;text-align:center}p.svelte-mjsf3h.svelte-mjsf3h{color:#fff;font-size:2vw;display:flex;text-transform:uppercase;font-weight:700;letter-spacing:0.1em;text-shadow:0 0 10px rgba(3, 3, 3, 1);position:absolute;text-align:center;border:5px solid #fff}.cards-container.svelte-mjsf3h:hover>.card:not(:hover) p.svelte-mjsf3h{opacity:0}.card.svelte-mjsf3h:hover p.svelte-mjsf3h{opacity:100}@media(max-width: 1000px){.card.svelte-mjsf3h:hover .card-background.svelte-mjsf3h{transform:none}.cards-container.svelte-mjsf3h:hover>.card:not(:hover) .card-background.svelte-mjsf3h{filter:none}.cards-container.svelte-mjsf3h:hover>.card:not(:hover) p.svelte-mjsf3h{opacity:100}}",
      map: null
    };
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let resources = [
        {
          link: "https://kit.svelte.dev/",
          styling: "background-image: url(https://miro.medium.com/max/1000/1*joB4ddC9_-3okvy0r8_CPQ.png); background-color: #ff3c00",
          name: "Introduction to SvelteKit"
        },
        {
          link: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model",
          styling: "background-image: url(https://media.gcflearnfree.org/content/5ef2084faaf0ac46dc9c10be_06_23_2020/box_model.png); background-color: #314085",
          name: "The Box Model"
        },
        {
          link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
          styling: "background-image: url(https://i0.wp.com/www.silocreativo.com/en/wp-content/uploads/2017/04/flexbox-cssgrid-practical-example.png?fit=666%2C370&quality=100&strip=all&ssl=1); background-color: #7fd2c9",
          name: "CSS Flexbox Guide"
        },
        {
          link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
          styling: "background-image: url(https://miro.medium.com/max/1400/0*qe5keHwkCPQD8v2U.png); background-color: #282627",
          name: "CSS Grid Guide"
        },
        {
          link: "https://materialdesignicons.com/",
          styling: "background-image: url(https://lh3.googleusercontent.com/64GWPJbpSJKB2hejLK02GLHjflv2B8cCr7SJUQI7cHXO0Qakc28U-ZRw7IRL3WadD8Stugb1HB4GgpqEkRydsEaR9AC4SqrTeRlCDlo=w1064-v0); background-color: #2196f3; background-size: cover",
          name: "Svelte Material Icons"
        },
        {
          link: "https://webflow.com/blog/color-theory",
          styling: "background-image: url(https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/60108d33abf33c3e87e59141_6002086f72b72735a101d204_color-theory.jpeg); background-color: #ffffff; background-size: cover",
          name: "Colour Theory"
        },
        {
          link: "https://material.io/design",
          styling: "background-image: url(https://material.io/static/assets/result.png); background-color: #212121; background-size: contain",
          name: "Material Design"
        }
      ];
      $$result.css.add(css14);
      return `<title>Svelte Materials</title>

<body class="${"svelte-mjsf3h"}"><div class="${"cards-container svelte-mjsf3h"}">${each(resources, (resource) => {
        return `<a${add_attribute("href", resource.link, 0)} target="${"_blank"}" class="${"card svelte-mjsf3h"}"><div class="${"card-background svelte-mjsf3h"}"${add_attribute("style", resource.styling, 0)}></div>
            <div class="${"card-content svelte-mjsf3h"}"><p class="${"svelte-mjsf3h"}">${escape(resource.name)}</p></div>
        </a>`;
      })}</div>
</body>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  file: () => file11,
  imports: () => imports11,
  index: () => index11,
  stylesheets: () => stylesheets11
});
var index11, component11, file11, imports11, stylesheets11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    index11 = 10;
    component11 = async () => (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default;
    file11 = "_app/immutable/components/pages/lib/projects/svelte_materials/_page.svelte-8de26cf9.js";
    imports11 = ["_app/immutable/components/pages/lib/projects/svelte_materials/_page.svelte-8de26cf9.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets11 = ["_app/immutable/assets/_page-727653b2.css"];
  }
});

// .svelte-kit/output/server/entries/pages/lib/projects/typing_game/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => Page8
});
var css15, Page8;
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/lib/projects/typing_game/_page.svelte.js"() {
    init_chunks();
    css15 = {
      code: ".svelte-dteaz6.svelte-dteaz6{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;box-sizing:border-box;font-size:1.02em;font-weight:500;text-transform:uppercase}small.svelte-dteaz6.svelte-dteaz6{font-size:0.2em}.center.svelte-dteaz6.svelte-dteaz6{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px}.game.svelte-dteaz6.svelte-dteaz6{display:flex;align-items:center;gap:30px;justify-content:space-between;width:100%}.page.svelte-dteaz6.svelte-dteaz6{background-color:#878787;padding:40px;display:flex;flex-direction:column;align-items:center;gap:30px;min-height:100vh}.timer.svelte-dteaz6.svelte-dteaz6{border-radius:75px;background:linear-gradient(145deg, #7a7a7a, #909090);box-shadow:31px 31px 61px #656565,\n                -31px -31px 61px #a9a9a9;min-width:10vw;min-height:4vw;display:flex;align-items:center;justify-content:center;width:100%}.levelSelector.svelte-dteaz6.svelte-dteaz6{border-radius:75px;background:linear-gradient(145deg, #7a7a7a, #909090);box-shadow:31px 31px 61px #656565,\n                -31px -31px 61px #a9a9a9;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:13vw;transition:1s}.levels.svelte-dteaz6.svelte-dteaz6{display:none;position:relative;z-index:1;border-radius:none;box-shadow:none;transition:1s}.levelSelector.svelte-dteaz6:hover .levels.svelte-dteaz6{display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:none;box-shadow:none;transition:1s}.gameWindow.svelte-dteaz6.svelte-dteaz6{border-radius:75px;box-shadow:31px 31px 61px #656565,\n                -31px -31px 61px #a9a9a9;padding:30px;display:flex;align-items:center;justify-content:center;min-width:40vw;min-height:40vh;font-size:16em;font-weight:700;transition:3s}.letter.svelte-dteaz6.svelte-dteaz6{width:100%;height:100%;text-align:center;display:flex;flex-direction:column;font-size:.3em}.gameStats.svelte-dteaz6.svelte-dteaz6{border-radius:75px;background:linear-gradient(145deg, #7a7a7a, #909090);box-shadow:31px 31px 61px #656565,\n                -31px -31px 61px #a9a9a9;display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:100%}.gameWrapper.svelte-dteaz6.svelte-dteaz6{gap:40px;display:flex;flex-direction:column;justify-content:center;align-items:center}.gameStats.svelte-dteaz6.svelte-dteaz6,.difficulty.svelte-dteaz6.svelte-dteaz6{min-width:14vw;padding:30px}.type1.svelte-dteaz6.svelte-dteaz6,.difficulty.svelte-dteaz6.svelte-dteaz6{border-radius:75px;background:linear-gradient(145deg, #7a7a7a, #909090);box-shadow:31px 31px 61px #656565,\n                -31px -31px 61px #a9a9a9;border:0px;min-width:10vw;min-height:7vh;cursor:pointer;transition:1s}.type1.svelte-dteaz6.svelte-dteaz6{padding:20px}.type1.svelte-dteaz6.svelte-dteaz6:hover,.difficulty.svelte-dteaz6.svelte-dteaz6:hover{border-radius:75px;background:linear-gradient(145deg, #7a7a7a, #909090);box-shadow:5px 5px 10px #656565,\n                -5px -5px 10px #a9a9a9}.difficulty.svelte-dteaz6.svelte-dteaz6{min-width:16vw}input.svelte-dteaz6.svelte-dteaz6{border-radius:75px;background:linear-gradient(145deg, #7a7a7a, #909090);box-shadow:31px 31px 61px #656565,\n                -31px -31px 61px #a9a9a9;border:none;outline:none;min-height:7vh;display:flex;align-items:center;justify-content:center;text-align:center}input.svelte-dteaz6.svelte-dteaz6:active{border:none;outline:none}.diff.svelte-dteaz6.svelte-dteaz6{border-radius:none;box-shadow:none;width:100%;background:none;outline:none;border:none;padding:20px}.diff.svelte-dteaz6.svelte-dteaz6:hover{opacity:30%;cursor:pointer}",
      map: null
    };
    Page8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let score;
      let high_score;
      let accuracy;
      let letter_sequence = "";
      let letter_index = 0;
      let input = "";
      let difficulty = "easy";
      let time = 0;
      let color;
      $$result.css.add(css15);
      {
        input.length >= 2 ? input = input[1] : input = input;
      }
      score = 0;
      high_score = 0;
      {
        score > high_score ? high_score = score : high_score = high_score;
      }
      accuracy = "N/A";
      {
        {
          color = "linear-gradient(145deg, #7a7a7a, #909090)";
        }
      }
      return `

<div class="${"page svelte-dteaz6"}"><div class="${"game svelte-dteaz6"}"><div class="${"levelSelector svelte-dteaz6"}"><button class="${"difficulty svelte-dteaz6"}">Difficulty: ${escape(difficulty)}</button>

            <div class="${"levels svelte-dteaz6"}"><button class="${"diff svelte-dteaz6"}">Easy</button>
                <button class="${"diff svelte-dteaz6"}">Medium</button>
                <button class="${"diff svelte-dteaz6"}">Hard</button>
                <button class="${"diff svelte-dteaz6"}">Master</button></div></div>

        <div class="${"gameWrapper svelte-dteaz6"}"><div class="${"timer svelte-dteaz6"}">${`Time Lapsed (ms): ${escape(time)}`}</div>

            <div class="${"center svelte-dteaz6"}"><div class="${"gameWindow svelte-dteaz6"}" style="${"background: " + escape(color, true)}"><div class="${"letter svelte-dteaz6"}">${`${escape(letter_sequence[letter_index])}`}</div></div>

                <button class="${"type1 svelte-dteaz6"}">New Game</button>

                
                <input autofocus class="${"svelte-dteaz6"}"${add_attribute("value", input, 0)}></div></div>

        <div class="${"gameStats svelte-dteaz6"}"><div class="${"stat svelte-dteaz6"}">${high_score == 0 ? `High Score: 0` : `High Score: ${escape(high_score)}`}</div>

            <div class="${"stat svelte-dteaz6"}">Score: ${escape(score)}</div>

            <div class="${"stat svelte-dteaz6"}">Accuracy: ${escape(accuracy)}</div></div></div>

</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  component: () => component12,
  file: () => file12,
  imports: () => imports12,
  index: () => index12,
  stylesheets: () => stylesheets12
});
var index12, component12, file12, imports12, stylesheets12;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    index12 = 11;
    component12 = async () => (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default;
    file12 = "_app/immutable/components/pages/lib/projects/typing_game/_page.svelte-30879de4.js";
    imports12 = ["_app/immutable/components/pages/lib/projects/typing_game/_page.svelte-30879de4.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets12 = ["_app/immutable/assets/_page-6f9c6585.css"];
  }
});

// .svelte-kit/output/server/entries/pages/portfolio/_page.svelte.js
var page_svelte_exports9 = {};
__export(page_svelte_exports9, {
  default: () => Page9
});
var css16, Page9;
var init_page_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/portfolio/_page.svelte.js"() {
    init_chunks();
    init_BackToTop();
    init_nav_bar();
    init_Footer();
    css16 = {
      code: ".space.svelte-1l2i6tm.svelte-1l2i6tm{height:20px}.svelte-1l2i6tm.svelte-1l2i6tm{color:#D8D8E7;font-family:'Prompt';box-sizing:border-box;text-size-adjust:auto}body.svelte-1l2i6tm.svelte-1l2i6tm{display:flex;flex-direction:column;align-items:center;background:#1D1D1D;margin-bottom:0rem;position:absolute;left:0;min-height:100vh;right:0}.cards-container.svelte-1l2i6tm.svelte-1l2i6tm{display:flex;flex-direction:column;height:100%;gap:40px;align-items:center;width:90%}.card-wrapper.svelte-1l2i6tm.svelte-1l2i6tm{flex:1;display:flex;margin-top:auto;margin-bottom:auto;gap:30px;width:90%;max-height:256px;width:100%}.card.svelte-1l2i6tm.svelte-1l2i6tm{position:relative;padding:2%;background-size:contain;flex:1.5;text-decoration:none}.description-content.svelte-1l2i6tm.svelte-1l2i6tm{flex:1;background:rgba(255, 255, 255, 0.15);border-radius:16px;box-shadow:0 4px 30px rgba(0, 0, 0, 0.1);backdrop-filter:blur(5.6px);-webkit-backdrop-filter:blur(5.6px);padding:30px;display:flex;align-items:center;justify-content:center;max-width:674px}.description-content.svelte-1l2i6tm.svelte-1l2i6tm:hover{cursor:default}.card-background.svelte-1l2i6tm.svelte-1l2i6tm{background-size:contain;background-repeat:no-repeat;background-position:center;border-radius:24px;filter:brightness(0.75) saturate(1.2) contrast(0.85);position:absolute;left:0;right:0;bottom:0;top:0;transform-origin:center;transition:.2s}.card-wrapper.svelte-1l2i6tm:hover .card-background.svelte-1l2i6tm{transform:scale(1.05) translateZ(0)}.cards-container.svelte-1l2i6tm:has(.card-wrapper:hover) .card-wrapper:not(:hover) .card-background.svelte-1l2i6tm{filter:brightness(0.5) contrast(1.4) blur(30px)}.cards-container.svelte-1l2i6tm:has(.card-wrapper:hover) .card-wrapper:not(:hover) .description-content.svelte-1l2i6tm{filter:brightness(0.5) contrast(1.4) blur(30px)}.card-content.svelte-1l2i6tm.svelte-1l2i6tm{padding:24px;position:relative;display:flex;max-height:100%;max-width:100%;align-items:center;justify-content:center;text-align:center;flex:2}p.svelte-1l2i6tm.svelte-1l2i6tm{color:#fff;font-size:2vw;display:flex;text-transform:uppercase;font-weight:700;letter-spacing:0.1em;text-shadow:0 0 10px rgba(3, 3, 3, 1);text-align:center}.description-content.svelte-1l2i6tm p.svelte-1l2i6tm{font-size:1.2vw}.border.svelte-1l2i6tm.svelte-1l2i6tm{border:5px solid #fff;padding:10px}.cards-container.svelte-1l2i6tm:has(.card-wrapper:hover) .card-wrapper:not(:hover) p.svelte-1l2i6tm{opacity:0}a.svelte-1l2i6tm.svelte-1l2i6tm{text-decoration:none;list-style:none;display:flex}",
      map: null
    };
    Page9 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let resources = [
        {
          link: "../lib/stopwatch",
          styling: "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);",
          name: "Simple Stopwatch",
          description: "A simple stopwatch displaying minutes, seconds, and centiseconds."
        },
        {
          link: "https://kit.svelte.dev/",
          styling: "background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);",
          name: "Placeholder",
          description: "Lorem Ipsum"
        },
        {
          link: "https://kit.svelte.dev/",
          styling: "background-image: linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%);",
          name: "Placeholder",
          description: "Lorem Ipsum"
        },
        {
          link: "https://kit.svelte.dev/",
          styling: "background-image: linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%);",
          name: "Placeholder",
          description: "Lorem Ipsum"
        },
        {
          link: "https://kit.svelte.dev/",
          styling: "background-image: linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%);",
          name: "Placeholder",
          description: "Lorem Ipsum"
        }
      ];
      let cardNum = 2;
      function alternate_card() {
        if (cardNum == 1) {
          cardNum = 2;
        } else {
          cardNum = 1;
        }
        return cardNum;
      }
      let descNum = 1;
      function alternate_desc() {
        if (descNum == 1) {
          descNum = 2;
        } else {
          descNum = 1;
        }
        return descNum;
      }
      $$result.css.add(css16);
      return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-1l2i6tm"}">
    
    <title class="${"svelte-1l2i6tm"}">My Projects</title>
    
    <body class="${"svelte-1l2i6tm"}">${validate_component(Nav_bar, "Nav").$$render($$result, {}, {}, {})}

        <div class="${"cards-container svelte-1l2i6tm"}">${each(resources, (resource) => {
        return `<div class="${"card-wrapper svelte-1l2i6tm"}"><a${add_attribute("href", resource.link, 0)} target="${"_blank"}" class="${"card svelte-1l2i6tm"}" style="${"order: " + escape(alternate_card(), true)}"><div class="${"card-background svelte-1l2i6tm"}"${add_attribute("style", resource.styling, 0)}></div>
                    <div class="${"card-content svelte-1l2i6tm"}"><p class="${"border svelte-1l2i6tm"}">${escape(resource.name)}</p>
                    </div></a>
                
                <div class="${"description-content svelte-1l2i6tm"}" style="${"order: " + escape(alternate_desc(), true)}"><p class="${"svelte-1l2i6tm"}">${escape(resource.description)}</p></div>
            </div>`;
      })}</div>
        
        ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}
        <div class="${"space svelte-1l2i6tm"}"></div>
        ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
    </body>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  component: () => component13,
  file: () => file13,
  imports: () => imports13,
  index: () => index13,
  stylesheets: () => stylesheets13
});
var index13, component13, file13, imports13, stylesheets13;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    index13 = 12;
    component13 = async () => (await Promise.resolve().then(() => (init_page_svelte9(), page_svelte_exports9))).default;
    file13 = "_app/immutable/components/pages/portfolio/_page.svelte-fd5025af.js";
    imports13 = ["_app/immutable/components/pages/portfolio/_page.svelte-fd5025af.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/BackToTop-7992629c.js", "_app/immutable/chunks/nav-bar-839a06be.js", "_app/immutable/chunks/Footer-ec53c4ca.js"];
    stylesheets13 = ["_app/immutable/assets/_page-da59cf40.css", "_app/immutable/assets/BackToTop-1d4f830c.css", "_app/immutable/assets/nav-bar-1fc869b5.css", "_app/immutable/assets/Footer-13a1badc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/portfolio_revised/_page.svelte.js
var page_svelte_exports10 = {};
__export(page_svelte_exports10, {
  default: () => Page10
});
var css17, Page10;
var init_page_svelte10 = __esm({
  ".svelte-kit/output/server/entries/pages/portfolio_revised/_page.svelte.js"() {
    init_chunks();
    init_nav_bar();
    init_Footer();
    css17 = {
      code: ".svelte-1ykw7gf.svelte-1ykw7gf{user-select:none;font-family:'Prompt'}a.svelte-1ykw7gf.svelte-1ykw7gf{text-decoration:none}body.svelte-1ykw7gf.svelte-1ykw7gf{width:100vw;background-color:#000;margin:0rem;overflow-x:hidden}.page.svelte-1ykw7gf.svelte-1ykw7gf{display:flex;flex-direction:column;justify-content:space-between;height:100vh;margin:0rem;background:#1d1d1d;overflow-x:hidden}#image-track.svelte-1ykw7gf>.image_wrapper.svelte-1ykw7gf{width:40vmin;height:56vmin;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}.image_wrapper.svelte-1ykw7gf>.image.svelte-1ykw7gf{width:40vmin;height:56vmin;object-fit:none}#image-track.svelte-1ykw7gf.svelte-1ykw7gf{display:flex;gap:4vmin;position:absolute;left:50%;top:50%;transform:translate(-100%, -50%)}.info_wrapper.svelte-1ykw7gf.svelte-1ykw7gf{color:#fff;position:absolute;max-width:30vmin;padding:4px;display:none;opacity:0;transition:visibility 0s, opacity 0.2s linear;text-align:center;gap:20px;display:flex;align-items:center;justify-content:center;flex-direction:column}.image.svelte-1ykw7gf:hover~.info_wrapper.svelte-1ykw7gf,.info_wrapper.svelte-1ykw7gf.svelte-1ykw7gf:hover{opacity:100;display:flex}.redirect.svelte-1ykw7gf.svelte-1ykw7gf{background:#1a1a1a;color:#fff;padding:4px 12px;border-radius:16px;display:flex;align-items:center;justify-content:center;text-align:center}.redirect.svelte-1ykw7gf.svelte-1ykw7gf:hover{cursor:pointer;background:rgba(0,0,0,0.5)}.image_wrapper.svelte-1ykw7gf:hover>.image.svelte-1ykw7gf{filter:blur(10px) brightness(50%);transition:0.3s ease-in}.image_wrapper.svelte-1ykw7gf.svelte-1ykw7gf:hover{box-shadow:0 0 13px 0px rgba(255,255,255,0.1)}.title.svelte-1ykw7gf.svelte-1ykw7gf{font-weight:700;font-size:22px}@-moz-keyframes svelte-1ykw7gf-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-webkit-keyframes svelte-1ykw7gf-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-o-keyframes svelte-1ykw7gf-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@keyframes svelte-1ykw7gf-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}",
      map: null
    };
    Page10 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let nav_contents = [
        {
          image: "https://images.unsplash.com/photo-1609697299491-69d2d5ed2c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNhbGN1bGF0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
          alt: "Calculator Tile",
          title: "Calculator",
          description: "A simple calculator. My first project completed in Svelte!",
          to_do: "",
          href: "../lib/calculator"
        },
        {
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          alt: "2048 Tile",
          title: "2048 Game",
          description: "A 2048 game copy.",
          to_do: "To-Do: add end-game condition.",
          href: "../lib/2048"
        },
        {
          image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          alt: "Typing Trainer Tile",
          title: "Typing Trainer",
          description: "A game designed to help people learn to touch-type and improve typing speed.",
          to_do: "",
          href: "../lib/typing_game"
        },
        {
          image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
          alt: "Stopwatch tile",
          title: "Stopwatch",
          description: "A simple stopwatch displaying minutes, seconds, and centiseconds.",
          to_do: "",
          href: "../lib/stopwatch"
        },
        {
          image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
          alt: "Stopwatch tile",
          title: "Stopwatch",
          description: "A simple stopwatch displaying minutes, seconds, and centiseconds.",
          to_do: "",
          href: "../lib/stopwatch"
        },
        {
          image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
          alt: "Svelte Materials Tile",
          title: "Svelte Materials",
          description: "A collection of the materials I used to begin learning Svelte.",
          to_do: "",
          href: "../lib/stopwatch"
        }
      ];
      let x = 1500;
      let el;
      let window_width = 0;
      $$result.css.add(css17);
      {
        console.log((x + 1e3) / 30);
      }
      return `

<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-1ykw7gf"}">

<div class="${"page svelte-1ykw7gf"}">${validate_component(Nav_bar, "Nav").$$render($$result, {}, {}, {})}
    <body class="${"svelte-1ykw7gf"}"><div id="${"image-track"}" data-mouse-down-at="${"0"}" data-prev-percentage="${"0"}" style="${"left: " + escape(x + window_width, true) + "px;"}" class="${"svelte-1ykw7gf"}"${add_attribute("this", el, 0)}>${each(nav_contents, (nav) => {
        return `<div class="${"image_wrapper svelte-1ykw7gf"}"><img class="${"image svelte-1ykw7gf"}"${add_attribute("src", nav.image, 0)}${add_attribute("alt", nav.alt, 0)} draggable="${"false"}" style="${"object-position: " + escape((x + 1e3) / 30 + 10, true) + "% center;"}">
                    <div class="${"info_wrapper svelte-1ykw7gf"}"><div class="${"title svelte-1ykw7gf"}">${escape(nav.title)}</div>

                        <div class="${"description svelte-1ykw7gf"}">${escape(nav.description)} <br class="${"svelte-1ykw7gf"}"> ${escape(nav.to_do)}</div>

                        <a class="${"redirect svelte-1ykw7gf"}"${add_attribute("href", nav.href, 0)}>Visit
                        </a></div>
                </div>`;
      })}</div></body>

    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  component: () => component14,
  file: () => file14,
  imports: () => imports14,
  index: () => index14,
  stylesheets: () => stylesheets14
});
var index14, component14, file14, imports14, stylesheets14;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    index14 = 13;
    component14 = async () => (await Promise.resolve().then(() => (init_page_svelte10(), page_svelte_exports10))).default;
    file14 = "_app/immutable/components/pages/portfolio_revised/_page.svelte-718b4ce4.js";
    imports14 = ["_app/immutable/components/pages/portfolio_revised/_page.svelte-718b4ce4.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/nav-bar-839a06be.js", "_app/immutable/chunks/Footer-ec53c4ca.js"];
    stylesheets14 = ["_app/immutable/assets/_page-31b45b91.css", "_app/immutable/assets/nav-bar-1fc869b5.css", "_app/immutable/assets/Footer-13a1badc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/portfolio_revised_as_marquee/_page.svelte.js
var page_svelte_exports11 = {};
__export(page_svelte_exports11, {
  default: () => Page11
});
var css18, Page11;
var init_page_svelte11 = __esm({
  ".svelte-kit/output/server/entries/pages/portfolio_revised_as_marquee/_page.svelte.js"() {
    init_chunks();
    init_nav_bar();
    init_Footer();
    css18 = {
      code: ".svelte-1194au6.svelte-1194au6{user-select:none;font-family:'Prompt'}a.svelte-1194au6.svelte-1194au6{text-decoration:none}body.svelte-1194au6.svelte-1194au6{width:100vw;height:100%;margin:0rem;overflow-x:hidden;display:flex;align-items:center;justify-content:center}.page.svelte-1194au6.svelte-1194au6{display:flex;flex-direction:column;height:100vh;margin:0rem;background:#1d1d1d;overflow-x:hidden}#image-track.svelte-1194au6>.image_wrapper.svelte-1194au6{width:40vmin;height:56vmin;position:relative;display:flex;align-items:center;justify-content:center}.image_wrapper.svelte-1194au6>.image.svelte-1194au6{width:40vmin;height:56vmin;object-fit:none}#image-track.svelte-1194au6.svelte-1194au6{display:flex;gap:4vmin;height:70%;transform:translate(0%, -50%);overflow-x:scroll;position:absolute;top:50%;width:98%;scrollbar-width:auto;align-items:center}.info_wrapper.svelte-1194au6.svelte-1194au6{color:#fff;position:absolute;padding:8px;display:none;opacity:0;transition:visibility 0s, opacity 0.2s linear;text-align:center;gap:1rem;display:flex;align-items:center;justify-content:center;flex-direction:column}.image.svelte-1194au6:hover~.info_wrapper.svelte-1194au6,.info_wrapper.svelte-1194au6.svelte-1194au6:hover{opacity:100;display:flex}.redirect.svelte-1194au6.svelte-1194au6{background:#1a1a1a;color:#fff;padding:4px 12px;border-radius:16px;display:flex;align-items:center;justify-content:center;text-align:center}.redirect.svelte-1194au6.svelte-1194au6:hover{cursor:pointer;background:rgba(0,0,0,0.5)}.image_wrapper.svelte-1194au6:hover>.image.svelte-1194au6{filter:blur(10px) brightness(50%);transition:0.2s ease-in}.image_wrapper.svelte-1194au6.svelte-1194au6:hover{box-shadow:0 0 13px 0px rgba(255,255,255,0.1)}.title.svelte-1194au6.svelte-1194au6{font-weight:700;font-size:1.5rem}@media(max-width: 745px){#image-track.svelte-1194au6.svelte-1194au6{flex-direction:column;width:100%;max-width:100vw}#image-track.svelte-1194au6>.image_wrapper.svelte-1194au6{width:80vmin;height:44vmin}.image_wrapper.svelte-1194au6>.image.svelte-1194au6{height:44vmin;width:80vmin}}@-moz-keyframes svelte-1194au6-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-webkit-keyframes svelte-1194au6-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@-o-keyframes svelte-1194au6-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@keyframes svelte-1194au6-gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}",
      map: null
    };
    Page11 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let nav_contents = [
        {
          image: "https://images.unsplash.com/photo-1609697299491-69d2d5ed2c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNhbGN1bGF0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
          alt: "Calculator Tile",
          title: "Calculator",
          description: "A simple calculator. My first project completed in Svelte!",
          status: "Status: Completed 31/08/2022",
          to_do: "",
          href: "../lib/projects/calculator"
        },
        {
          image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
          alt: "Stopwatch Tile",
          title: "Stopwatch",
          description: "A simple stopwatch displaying minutes, seconds, and centiseconds.",
          status: "Status: Completed 12/09/2022",
          to_do: "",
          href: "../lib/projects/stopwatch"
        },
        {
          image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          alt: "Typing Trainer Tile",
          title: "Typing Trainer",
          description: "A game designed to help people learn to touch-type and improve typing speed.",
          status: "Status: Completed 17/09/2022",
          to_do: "",
          href: "../lib/projects/typing_game"
        },
        {
          image: "https://svelte.dev/images/twitter-thumbnail.jpg",
          alt: "Svelte Materials Tile",
          title: "Svelte Materials",
          description: "A collection of resources that I utilised to learn Svelte and frontend.",
          status: "Status: Completed 17/09/2022",
          to_do: "",
          href: "../lib/projects/svelte_materials"
        },
        {
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          alt: "2048 Tile",
          title: "2048 Game",
          description: "A 2048 game copy.",
          status: "Status: In Progress",
          to_do: "To-Do: add end-game condition.",
          href: "../lib/projects/2048"
        },
        {
          image: "https://images.unsplash.com/photo-1670786146738-c9d7acdd7226?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
          alt: "Portfolio Tile",
          title: "More Projects Coming Soon!",
          description: "Under construction, watch this space. \u{1F440}",
          to_do: "",
          href: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
        }
      ];
      let x = 1500;
      let el;
      let left;
      $$result.css.add(css18);
      {
        console.log((x + 1e3) / 30);
      }
      return `
    
    <link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-1194au6"}">
    
    <div class="${"page svelte-1194au6"}">${validate_component(Nav_bar, "Nav").$$render($$result, {}, {}, {})}
        
        <body class="${"svelte-1194au6"}"><div id="${"image-track"}" data-mouse-down-at="${"0"}" data-prev-percentage="${"0"}" class="${"svelte-1194au6"}"${add_attribute("this", el, 0)}>${each(nav_contents, (nav) => {
        return `<div class="${"image_wrapper svelte-1194au6"}"><img class="${"image svelte-1194au6"}"${add_attribute("src", nav.image, 0)}${add_attribute("alt", nav.alt, 0)} draggable="${"false"}" style="${"object-position: " + escape(left / 9, true) + "% center;"}">
                        <div class="${"info_wrapper svelte-1194au6"}"><div class="${"title svelte-1194au6"}">${escape(nav.title)}</div>
    
                            <div class="${"description svelte-1194au6"}">${escape(nav.description)} <br class="${"svelte-1194au6"}"> ${escape(nav.status)} <br class="${"svelte-1194au6"}"> ${escape(nav.to_do)}</div>
    
                            <a class="${"redirect svelte-1194au6"}"${add_attribute("href", nav.href, 0)} target="${"blank"}">Visit
                            </a></div>
                    </div>`;
      })}</div></body>
    
        ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
    </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  component: () => component15,
  file: () => file15,
  imports: () => imports15,
  index: () => index15,
  stylesheets: () => stylesheets15
});
var index15, component15, file15, imports15, stylesheets15;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    index15 = 14;
    component15 = async () => (await Promise.resolve().then(() => (init_page_svelte11(), page_svelte_exports11))).default;
    file15 = "_app/immutable/components/pages/portfolio_revised_as_marquee/_page.svelte-37782876.js";
    imports15 = ["_app/immutable/components/pages/portfolio_revised_as_marquee/_page.svelte-37782876.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/nav-bar-839a06be.js", "_app/immutable/chunks/Footer-ec53c4ca.js"];
    stylesheets15 = ["_app/immutable/assets/_page-0ee9d391.css", "_app/immutable/assets/nav-bar-1fc869b5.css", "_app/immutable/assets/Footer-13a1badc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/test/_page.svelte.js
var page_svelte_exports12 = {};
__export(page_svelte_exports12, {
  default: () => Page12
});
var css$13, CommunityEngagementSphere, css19, Page12;
var init_page_svelte12 = __esm({
  ".svelte-kit/output/server/entries/pages/test/_page.svelte.js"() {
    init_chunks();
    init_BackToTop();
    init_Saos();
    css$13 = {
      code: ".Sphere.svelte-i1141m{display:flex;align-items:center;justify-content:center}",
      map: null
    };
    CommunityEngagementSphere = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$13);
      return `<!DOCTYPE html>
<html lang="${"en"}"><span class="${"Sphere svelte-i1141m"}"></span>

    
    <script src="${"https://cdn.jsdelivr.net/npm/TagCloud@2.2.0/dist/TagCloud.min.js"}"><\/script>
    <script>const Texts = [\`\`
            'Computer Science Club', 
            'Competitive Programming Club', 
            'Fn Main() Tutoring'
        ];

        var tagCloud = TagCloud('.Sphere', Texts, {

            // Sphere radius in px
            radius: 230,

            // animation speed
            // slow, normal, fast
            maxSpeed: 'normal',
            initSpeed: 'fast',

            // Rolling direction [0 (top) , 90 (left), 135 (right-bottom)] 
            direction: 135,

            // interaction with mouse or not [Default true (decelerate to rolling init speed, and keep rolling with mouse).]
            keep: true

        });

        // Giving color to each text in sphere
        var color = '#FF5733 ';
        document.querySelector('.Sphere').style.color = color;
    <\/script>

</html>`;
    });
    css19 = {
      code: "@keyframes fade-in-left{0%{-webkit-transform:translateX(-50px);transform:translateX(-50px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes scale-in-center{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:1}}@keyframes focus-in-contract-bck{0%{letter-spacing:1em;-webkit-transform:translateZ(300px);transform:translateZ(300px);-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-transform:translateZ(12px);transform:translateZ(12px);-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes swing-in-top-fwd{0%{-webkit-transform:rotateX(-100deg);transform:rotateX(-100deg);-webkit-transform-origin:top;transform-origin:top;opacity:0}100%{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);-webkit-transform-origin:top;transform-origin:top;opacity:1}}@keyframes vibrate-1{0%{-webkit-transform:translate(0);transform:translate(0)}20%{-webkit-transform:translate(-2px, 2px);transform:translate(-2px, 2px)}40%{-webkit-transform:translate(-2px, -2px);transform:translate(-2px, -2px)}60%{-webkit-transform:translate(2px, 2px);transform:translate(2px, 2px)}80%{-webkit-transform:translate(2px, -2px);transform:translate(2px, -2px)}100%{-webkit-transform:translate(0);transform:translate(0)}}.svelte-mu4uyt.svelte-mu4uyt{color:#D8D8E7;font-family:'Prompt';box-sizing:border-box;text-size-adjust:auto}.container.svelte-mu4uyt.svelte-mu4uyt{gap:220px;display:flex;flex-direction:column;align-items:center;align-self:stretch;width:100%}section.svelte-mu4uyt.svelte-mu4uyt{display:grid;align-self:stretch;min-height:100vh;width:100%}a.svelte-mu4uyt.svelte-mu4uyt,li.svelte-mu4uyt.svelte-mu4uyt,ul.svelte-mu4uyt.svelte-mu4uyt{text-decoration:none;list-style:none;display:flex}li.svelte-mu4uyt.svelte-mu4uyt{cursor:pointer}body.svelte-mu4uyt.svelte-mu4uyt{display:flex;flex-direction:column;align-items:center;background:#1D1D1D;margin-bottom:1rem}.logo.svelte-mu4uyt.svelte-mu4uyt{order:0;display:flex;font-size:3em;font-weight:700;align-items:flex-start}.header.svelte-mu4uyt.svelte-mu4uyt{display:flex;position:sticky;transition:all 0.3s;align-items:center;align-self:stretch;width:100%;gap:200px;z-index:999;transform:translate3d(0, 0, 1000px)}.header-contents.svelte-mu4uyt.svelte-mu4uyt{display:flex;width:100%;align-items:center;justify-content:center}.header[data-position='top'].svelte-mu4uyt .header-contents.svelte-mu4uyt{display:flex;width:100%;align-items:center;justify-content:center}.header[data-position='top'].svelte-mu4uyt ul.svelte-mu4uyt{display:flex;align-items:center;width:100%;justify-content:space-around}.header.isStuck.svelte-mu4uyt ul.svelte-mu4uyt{display:flex;align-items:center;width:100%;justify-content:flex-end;gap:100px}.header.isStuck.svelte-mu4uyt .header-contents.svelte-mu4uyt{display:flex;justify-content:flex-end}.header[data-position='top'].svelte-mu4uyt.svelte-mu4uyt{top:0rem;display:flex;flex-direction:column;position:sticky;font-size:1.6em;transition:all 0.3s;align-items:center;width:100%;padding:100px;height:100vh;align-self:stretch;z-index:999}.header[data-position='bottom'].svelte-mu4uyt.svelte-mu4uyt{bottom:1rem}.header.isStuck.svelte-mu4uyt.svelte-mu4uyt{background:rgba(55, 55, 55, 1);z-index:999;font-size:1em;flex-direction:row;height:40%;justify-content:space-between;padding:10px 30px 10px 30px}ul.svelte-mu4uyt.svelte-mu4uyt{display:flex;order:1;gap:30px;font-size:1.8em;font-weight:600;align-items:flex-end;justify-content:flex-start}ul.svelte-mu4uyt li a.svelte-mu4uyt{position:relative;text-decoration:none;line-height:1em;letter-spacing:2px;text-transform:uppercase;color:transparent;-webkit-text-stroke:0.1px rgba(216, 216, 231, 0.8)}ul.svelte-mu4uyt li a.svelte-mu4uyt::before{content:attr(data-text);position:absolute;color:#D8D8E7;width:0;overflow:hidden;transition:0.5s;border-right:0px solid var(--clr);-webkit-text-stroke:0.1px var(--clr)}ul.svelte-mu4uyt li a.svelte-mu4uyt:hover::before{width:100%;filter:drop-shadow(0 0 25px var(--clr))}.about-me.svelte-mu4uyt.svelte-mu4uyt{display:flex;font-weight:600;font-size:1.5em;padding:20px;align-items:center;text-align:center}.occupation.svelte-mu4uyt.svelte-mu4uyt{display:flex;align-self:stretch;align-items:center;justify-content:center}.hi.svelte-mu4uyt.svelte-mu4uyt{display:flex;flex-direction:column;align-items:center;justify-content:center}.hi-container.svelte-mu4uyt.svelte-mu4uyt{display:flex;align-items:center;justify-content:center;height:80%}.hi-text.svelte-mu4uyt.svelte-mu4uyt{font-size:6em;font-weight:600;text-align:center}p.svelte-mu4uyt.svelte-mu4uyt,h2.svelte-mu4uyt.svelte-mu4uyt,ul.svelte-mu4uyt.svelte-mu4uyt{margin-block-start:0;margin-block-end:0;margin-inline-start:0px;margin-inline-end:0px;padding-inline-start:0}.occupation.svelte-mu4uyt.svelte-mu4uyt{opacity:30%}.skills-container.svelte-mu4uyt.svelte-mu4uyt{display:flex;flex-direction:column;padding:20px 30px 20px 30px;align-items:center;align-self:stretch;width:100%}.level-container.svelte-mu4uyt.svelte-mu4uyt{width:60%;display:flex}.skill.svelte-mu4uyt.svelte-mu4uyt{display:flex;flex-direction:column;width:100%;gap:10px}.skill-bar.svelte-mu4uyt.svelte-mu4uyt,.skill-bar-filler.svelte-mu4uyt.svelte-mu4uyt{height:10px;border-radius:20px}h2.svelte-mu4uyt.svelte-mu4uyt{display:flex;justify-content:center;font-size:2.5em;font-weight:600}.skill-bar-container.svelte-mu4uyt.svelte-mu4uyt{display:flex}.toggle-button.svelte-mu4uyt.svelte-mu4uyt{top:.75rem;right:1rem;display:none;flex-direction:column;justify-content:space-between;width:30px;height:21px;padding:0px;background:none;border:none}.toggle-button.svelte-mu4uyt .bar.svelte-mu4uyt{height:3px;width:100%;background-color:#D8D8E7;border-radius:10px}@media(max-width: 1000px){.header.svelte-mu4uyt.svelte-mu4uyt{flex-direction:column;align-items:flex-start}.header[data-position='top'].svelte-mu4uyt .header-contents.svelte-mu4uyt{display:flex;align-items:center;justify-content:center}.toggle-button.svelte-mu4uyt.svelte-mu4uyt{cursor:pointer}.header[data-position='top'].svelte-mu4uyt .logo.svelte-mu4uyt{font-size:1.4em}.header[data-position='top'].svelte-mu4uyt .toggle-button.svelte-mu4uyt{display:none}.header[data-position='top'].svelte-mu4uyt .header-contents ul.svelte-mu4uyt{width:100%;flex-direction:column;align-items:center;justify-content:center}.header[data-position='top'].svelte-mu4uyt .header-contents li.svelte-mu4uyt{text-align:center;width:100%;font-size:0.6em;align-items:center;justify-content:center}.header.isStuck.svelte-mu4uyt .toggle-button.svelte-mu4uyt{display:flex}.header.isStuck.svelte-mu4uyt .logo-wrapper.svelte-mu4uyt{display:flex;width:100%;align-items:center;justify-content:space-between}.header.isStuck.svelte-mu4uyt.svelte-mu4uyt{display:flex;flex-direction:column;gap:30px}.header.isStuck.svelte-mu4uyt .header-contents.svelte-mu4uyt{display:none}.header-contents-active.svelte-mu4uyt.svelte-mu4uyt{display:flex;flex-direction:column;height:20%}.header-contents-active.svelte-mu4uyt ul.svelte-mu4uyt{flex-direction:column}}",
      map: null
    };
    Page12 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let toggleCountd;
      let headerContents = [
        { content: "Home" },
        {
          content: "Portfolio",
          link: "./portfolio"
        },
        { content: "Hire", link: "./hire" },
        { content: "Contact", link: "./contact-me" }
      ];
      let skills = [
        {
          text: "Svelte | HTML + CSS",
          level: "80",
          color: "#FF5D5D"
        },
        {
          text: "JavaScript | TypeScript",
          level: "60",
          color: "#CC5CDE"
        },
        {
          text: "C++",
          level: "80",
          color: "#80C07A"
        },
        {
          text: "Rust",
          level: "20",
          color: "#D06E61"
        }
      ];
      let toggleCount = 0;
      $$result.css.add(css19);
      toggleCountd = toggleCount % 2;
      return `


  
  
  <link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Prompt"}" class="${"svelte-mu4uyt"}">
  
  <body class="${"svelte-mu4uyt"}">${``}
  
        <div class="${["header svelte-mu4uyt", ""].join(" ").trim()}"${add_attribute("data-position", "top", 0)}><div class="${"logo-wrapper svelte-mu4uyt"}">${`${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "vibrate-1 0.3s linear infinite both"
        },
        {},
        {
          default: () => {
            return `<div class="${"logo svelte-mu4uyt"}">[yifan]
            </div>`;
          }
        }
      )}`}

        <button class="${"toggle-button svelte-mu4uyt"}"><span class="${"bar svelte-mu4uyt"}"></span>
            <span class="${"bar svelte-mu4uyt"}"></span>
            <span class="${"bar svelte-mu4uyt"}"></span></button></div>

    ${toggleCountd === 0 ? `<div class="${"header-contents svelte-mu4uyt"}"><ul class="${"svelte-mu4uyt"}">${each(headerContents, (headerContent) => {
        return `<li style="${"--clr:#D8D8E7"}" class="${"svelte-mu4uyt"}"><a${add_attribute("href", headerContent.link, 0)}${add_attribute("data-text", headerContent.content, 0)} class="${"svelte-mu4uyt"}">${escape(headerContent.content)}</a></li>`;
      })}</ul></div>` : `<div class="${"header-contents-active svelte-mu4uyt"}"><ul class="${"svelte-mu4uyt"}">${each(headerContents, (headerContent) => {
        return `<li style="${"--clr:#D8D8E7"}" class="${"svelte-mu4uyt"}"><a${add_attribute("href", headerContent.link, 0)}${add_attribute("data-text", headerContent.content, 0)} class="${"svelte-mu4uyt"}">${escape(headerContent.content)}</a></li>`;
      })}</ul></div>`}</div>
        ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}
  
        <section class="${"svelte-mu4uyt"}"></section>
  
        ${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        },
        {},
        {
          default: () => {
            return `<div class="${"hi-container svelte-mu4uyt"}"><div class="${"hi svelte-mu4uyt"}" style="${"align-self: flex-end;"}"><div class="${"hi-text svelte-mu4uyt"}">Hi, I&#39;m <span style="${"color: #2DA2E4"}" class="${"svelte-mu4uyt"}">Yifan</span></div>
  
                        <div class="${"occupation svelte-mu4uyt"}">Full-Stack Developer | Student
                        </div></div></div>
  
                ${validate_component(CubeAnimation, "CubeAnimation").$$render($$result, {}, {}, {})}`;
          }
        }
      )}
  
        ${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        },
        {},
        {
          default: () => {
            return `<section style="${"padding: 100px 0px 0px 0px"}" class="${"svelte-mu4uyt"}"><div class="${"about-me svelte-mu4uyt"}"><div class="${"text svelte-mu4uyt"}">I\u2019m a first year student at the <span style="${"color: #2DA2E4"}" class="${"svelte-mu4uyt"}">University of Adelaide</span> studying a <span style="${"color: #2DA2E4"}" class="${"svelte-mu4uyt"}">Bachelor of Computer Science (Advanced)</span> and am interested in both <span style="${"color: #2DA2E4"}" class="${"svelte-mu4uyt"}">front-end and back-end</span> development opportunities to gain experience!
                        <br class="${"svelte-mu4uyt"}"><br class="${"svelte-mu4uyt"}">
                        I have experience in Svelte, Rust, HTML, CSS, JavaScript, TypeScript and C++.
                    </div></div></section>`;
          }
        }
      )}
            
        <section class="${"svelte-mu4uyt"}">${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "swing-in-top-fwd 2s cubic-bezier(0.175, 0.885, 0.320, 1.275) both"
        },
        {},
        {
          default: () => {
            return `<div class="${"container svelte-mu4uyt"}" style="${"justify-content: center"}"><div class="${"skills-container svelte-mu4uyt"}"><h2 class="${"svelte-mu4uyt"}">Skills</h2>
                        <div class="${"level-container svelte-mu4uyt"}"><div class="${"skill svelte-mu4uyt"}">${each(skills, (skill) => {
              return `${validate_component(Saos, "Saos").$$render(
                $$result,
                {
                  animation: "fade-in-left 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.1s both"
                },
                {},
                {
                  default: () => {
                    return `<p class="${"skill-text svelte-mu4uyt"}">${escape(skill.text)}</p>
                                        <div class="${"skill-bar-container svelte-mu4uyt"}" style="${"width: 100%;"}"><div class="${"skill-bar svelte-mu4uyt"}" style="${"width: " + escape(skill.level, true) + "%; background: " + escape(skill.color, true) + "; flex-grow: 0; order: 0; align-items: flex-start"}"></div>
                                            <div class="${"skill-bar-filler svelte-mu4uyt"}" style="${"background: rgba(216, 216, 231, 0.1); flex-grow: 1; order: 1; align-items: flex-end"}"></div></div>
                                    `;
                  }
                }
              )}`;
            })}</div></div></div></div>`;
          }
        }
      )}

			</section>
  
        <section class="${"svelte-mu4uyt"}">${validate_component(Saos, "Saos").$$render(
        $$result,
        {
          animation: "focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        },
        {},
        {
          default: () => {
            return `<h2 class="${"svelte-mu4uyt"}">Community Engagement</h2>`;
          }
        }
      )}
                ${validate_component(CommunityEngagementSphere, "Sphere").$$render($$result, {}, {}, {})}</section>
  
    ${`${slots.default ? slots.default({}) : ``}`}
  
  </body>`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  component: () => component16,
  file: () => file16,
  imports: () => imports16,
  index: () => index16,
  stylesheets: () => stylesheets16
});
var index16, component16, file16, imports16, stylesheets16;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    index16 = 15;
    component16 = async () => (await Promise.resolve().then(() => (init_page_svelte12(), page_svelte_exports12))).default;
    file16 = "_app/immutable/components/pages/test/_page.svelte-a1dda48e.js";
    imports16 = ["_app/immutable/components/pages/test/_page.svelte-a1dda48e.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/BackToTop-7992629c.js", "_app/immutable/chunks/Saos-e2121421.js"];
    stylesheets16 = ["_app/immutable/assets/_page-0758ec87.css", "_app/immutable/assets/BackToTop-1d4f830c.css", "_app/immutable/assets/Saos-0c48ddf8.css"];
  }
});

// .svelte-kit/output/server/entries/pages/wordSphereTest/_page.svelte.js
var page_svelte_exports13 = {};
__export(page_svelte_exports13, {
  default: () => Page13
});
var css20, Page13;
var init_page_svelte13 = __esm({
  ".svelte-kit/output/server/entries/pages/wordSphereTest/_page.svelte.js"() {
    init_chunks();
    css20 = {
      code: ".svelte-17y60mm{background:#1d1d1d}",
      map: null
    };
    Page13 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css20);
      return `<!DOCTYPE html class="${"svelte-17y60mm"}">
<html lang="${"en"}" class="${"svelte-17y60mm"}"><span class="${"Sphere svelte-17y60mm"}"></span>

    
    <script src="${"https://cdn.jsdelivr.net/npm/TagCloud@2.2.0/dist/TagCloud.min.js"}" class="${"svelte-17y60mm"}"><\/script>
    <script class="${"svelte-17y60mm"}">const Texts = [
            'Computer Science Club', 
            'Competitive Programming Club', 
            'Fn Main() Tutoring'
        ];

        var tagCloud = TagCloud('.Sphere', Texts, {

            // Sphere radius in px
            radius: 230,

            // animation speed
            // slow, normal, fast
            maxSpeed: 'normal',
            initSpeed: 'fast',

            // Rolling direction [0 (top) , 90 (left), 135 (right-bottom)] 
            direction: 135,

            // interaction with mouse or not [Default true (decelerate to rolling init speed, and keep rolling with mouse).]
            keep: true

        });

        // Giving color to each text in sphere
        var color = '#FF5733 ';
        document.querySelector('.Sphere').style.color = color;
    <\/script>

</html>`;
    });
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports17 = {};
__export(__exports17, {
  component: () => component17,
  file: () => file17,
  imports: () => imports17,
  index: () => index17,
  stylesheets: () => stylesheets17
});
var index17, component17, file17, imports17, stylesheets17;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    index17 = 16;
    component17 = async () => (await Promise.resolve().then(() => (init_page_svelte13(), page_svelte_exports13))).default;
    file17 = "_app/immutable/components/pages/wordSphereTest/_page.svelte-525068c2.js";
    imports17 = ["_app/immutable/components/pages/wordSphereTest/_page.svelte-525068c2.js", "_app/immutable/chunks/index-739fea4f.js"];
    stylesheets17 = ["_app/immutable/assets/_page-7445a113.css"];
  }
});

// .svelte-kit/output/server/index.js
init_chunks();

// node_modules/devalue/devalue.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var object_proto_names = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var DevalueError = class extends Error {
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!is_primitive(thing)) {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== object_proto_names) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map(
          (v, i) => i in thing ? stringify(v) : ""
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_string(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

// .svelte-kit/output/server/index.js
var cookie = __toESM(require_cookie(), 1);
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0)
    $$bindings.data_2(data_2);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0 }, {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1 }, {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, { data: data_2, form }, {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1, form }, {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0, form }, {}, {})}`}

${``}`;
});
var HttpError = class {
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var ValidationError = class {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function error(status, message) {
  return new HttpError(status, message);
}
function json(data, init2) {
  const headers = new Headers(init2 == null ? void 0 : init2.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(JSON.stringify(data), {
    ...init2,
    headers
  });
}
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
var DATA_SUFFIX = "/__data.js";
var DEFAULT_SERIALIZE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax"
};
function get_cookies(request, url) {
  const new_cookies = /* @__PURE__ */ new Map();
  const cookies = {
    get(name, opts) {
      const c = new_cookies.get(name);
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decode = (opts == null ? void 0 : opts.decode) || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(request.headers.get("cookie") ?? "", { decode });
      return req_cookies[name];
    },
    set(name, value, opts = {}) {
      new_cookies.set(name, {
        name,
        value,
        options: {
          ...DEFAULT_SERIALIZE_OPTIONS,
          ...opts
        }
      });
    },
    delete(name, opts = {}) {
      new_cookies.set(name, {
        name,
        value: "",
        options: {
          ...DEFAULT_SERIALIZE_OPTIONS,
          ...opts,
          maxAge: 0
        }
      });
    },
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...DEFAULT_SERIALIZE_OPTIONS,
        ...opts
      });
    }
  };
  return { cookies, new_cookies };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options));
  }
}
function check_method_names(mod) {
  ["get", "post", "put", "patch", "del"].forEach((m) => {
    if (m in mod) {
      const replacement = m === "del" ? "DELETE" : m.toUpperCase();
      throw Error(
        `Endpoint method "${m}" has changed to "${replacement}". See https://github.com/sveltejs/kit/discussions/5359 for more information.`
      );
    }
  });
}
var GENERIC_ERROR = {
  id: "__error"
};
function method_not_allowed(mod, method) {
  return new Response(`${method} method not allowed`, {
    status: 405,
    headers: {
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = [];
  for (const method in ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
    if (method in mod)
      allowed.push(method);
  }
  if (mod.GET || mod.HEAD)
    allowed.push("HEAD");
  return allowed;
}
function data_response(data) {
  const headers = {
    "content-type": "application/javascript",
    "cache-control": "private, no-store"
  };
  try {
    return new Response(`window.__sveltekit_data = ${devalue(data)}`, { headers });
  } catch (e) {
    const error2 = e;
    const match = /\[(\d+)\]\.data\.(.+)/.exec(error2.path);
    const message = match ? `${error2.message} (data.${match[2]})` : error2.message;
    return new Response(`throw new Error(${JSON.stringify(message)})`, { headers });
  }
}
function get_option(nodes, option) {
  return nodes.reduce((value, node) => {
    var _a, _b;
    for (const thing of [node == null ? void 0 : node.server, node == null ? void 0 : node.shared]) {
      if (thing && ("router" in thing || "hydrate" in thing)) {
        throw new Error(
          "`export const hydrate` and `export const router` have been replaced with `export const csr`. See https://github.com/sveltejs/kit/pull/6446"
        );
      }
    }
    return ((_a = node == null ? void 0 : node.shared) == null ? void 0 : _a[option]) ?? ((_b = node == null ? void 0 : node.server) == null ? void 0 : _b[option]) ?? value;
  }, void 0);
}
function static_error_page(options, status, message) {
  return new Response(options.error_template({ status, message }), {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
function handle_fatal_error(event, options, error2) {
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = handle_error_and_jsonify(event, options, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.url.pathname.endsWith(DATA_SUFFIX) || type === "application/json") {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }
  return static_error_page(options, status, body.message);
}
function handle_error_and_jsonify(event, options, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return options.handle_error(error2, event);
  }
}
function redirect_response(status, location, cookies = []) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  add_cookies_to_headers(response.headers, cookies);
  return response;
}
async function render_endpoint(event, mod, state) {
  const method = event.request.method;
  check_method_names(mod);
  let handler2 = mod[method];
  if (!handler2 && method === "HEAD") {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.initiator) {
      throw new Error(`${event.routeId} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await handler2(
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (error2) {
    if (error2 instanceof Redirect) {
      return new Response(void 0, {
        status: error2.status,
        headers: { location: error2.location }
      });
    } else if (error2 instanceof ValidationError) {
      return json(error2.data, { status: error2.status });
    }
    throw error2;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter((val) => val != null);
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return error2;
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options, server2) {
  const actions = server2.actions;
  if (!actions) {
    maybe_throw_migration_error(server2);
    return new Response("POST method not allowed. No actions exist for this page", {
      status: 405,
      headers: {
        allow: "GET"
      }
    });
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (data instanceof ValidationError) {
      check_serializability(data.data, event.routeId, "data");
      return action_json({ type: "invalid", status: data.status, data: data.data });
    } else {
      check_serializability(data, event.routeId, "data");
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        data
      });
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return action_json({
        type: "redirect",
        status: error2.status,
        location: error2.location
      });
    }
    if (!(error2 instanceof HttpError)) {
      options.handle_error(error2, event);
    }
    return action_json(
      {
        type: "error",
        error: handle_error_and_jsonify(event, options, error2)
      },
      {
        status: error2 instanceof HttpError ? error2.status : 500
      }
    );
  }
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event, leaf_node) {
  return leaf_node.server && event.request.method !== "GET" && event.request.method !== "HEAD";
}
async function handle_action_request(event, server2) {
  const actions = server2.actions;
  if (!actions) {
    maybe_throw_migration_error(server2);
    event.setHeaders({
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (data instanceof ValidationError) {
      return { type: "invalid", status: data.status, data: data.data };
    } else {
      return {
        type: "success",
        status: 200,
        data
      };
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return {
        type: "redirect",
        status: error2.status,
        location: error2.location
      };
    }
    return { type: "error", error: error2 };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      `When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
    );
  }
}
async function call_action(event, actions) {
  var _a;
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  const type = (_a = event.request.headers.get("content-type")) == null ? void 0 : _a.split("; ")[0];
  if (type !== "application/x-www-form-urlencoded" && type !== "multipart/form-data") {
    throw new Error(`Actions expect form-encoded data (received ${type})`);
  }
  return action(event);
}
function maybe_throw_migration_error(server2) {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    if (server2[method]) {
      throw new Error(
        `${method} method no longer allowed in +page.server, use actions instead. See the PR for more info: https://github.com/sveltejs/kit/pull/6469`
      );
    }
  }
}
function check_serializability(value, id, path) {
  const type = typeof value;
  if (type === "string" || type === "boolean" || type === "number" || type === "undefined") {
    return;
  }
  if (type === "object") {
    if (!value)
      return;
    if (Array.isArray(value)) {
      value.forEach((child, i) => {
        check_serializability(child, id, `${path}[${i}]`);
      });
      return;
    }
    if (Object.getPrototypeOf(value) === Object.prototype) {
      for (const key2 in value) {
        check_serializability(value[key2], id, `${path}.${key2}`);
      }
      return;
    }
  }
  throw new Error(`${path} returned from action in ${id} cannot be serialized as JSON`);
}
function create_fetch({ event, options, state, route, prerender_default, resolve_opts }) {
  const fetched = [];
  const initial_cookies = cookie.parse(event.request.headers.get("cookie") || "");
  const set_cookies = [];
  function get_cookie_header(url, header) {
    const new_cookies = {};
    for (const cookie2 of set_cookies) {
      if (!domain_matches(url.hostname, cookie2.options.domain))
        continue;
      if (!path_matches(url.pathname, cookie2.options.path))
        continue;
      new_cookies[cookie2.name] = cookie2.value;
    }
    const combined_cookies = {
      ...initial_cookies,
      ...new_cookies,
      ...cookie.parse(header ?? "")
    };
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  const fetcher = async (info, init2) => {
    const request = normalize_fetch_input(info, init2, event.url);
    const request_body = init2 == null ? void 0 : init2.body;
    let dependency;
    const response = await options.hooks.handleFetch({
      event,
      request,
      fetch: async (info2, init3) => {
        const request2 = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request2.url);
        if (!request2.headers.has("origin")) {
          request2.headers.set("origin", event.url.origin);
        }
        if ((request2.method === "GET" || request2.method === "HEAD") && (request2.mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request2.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && request2.credentials !== "omit") {
            const cookie2 = get_cookie_header(url, request2.headers.get("cookie"));
            if (cookie2)
              request2.headers.set("cookie", cookie2);
          }
          let response3 = await fetch(request2);
          if (request2.mode === "no-cors") {
            response3 = new Response("", {
              status: response3.status,
              statusText: response3.statusText,
              headers: response3.headers
            });
          } else {
            if (url.origin !== event.url.origin) {
              const acao = response3.headers.get("access-control-allow-origin");
              if (!acao || acao !== event.url.origin && acao !== "*") {
                throw new Error(
                  `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
                );
              }
            }
          }
          return response3;
        }
        let response2;
        const prefix2 = options.paths.assets || options.paths.base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file18 = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(options.read(file18), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request2);
        }
        if (request2.credentials !== "omit") {
          const cookie2 = get_cookie_header(url, request2.headers.get("cookie"));
          if (cookie2) {
            request2.headers.set("cookie", cookie2);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request2.headers.has("authorization")) {
            request2.headers.set("authorization", authorization);
          }
        }
        if (request_body && typeof request_body !== "string") {
          throw new Error("Request body must be a string");
        }
        response2 = await respond(request2, options, {
          prerender_default,
          ...state,
          initiator: route
        });
        if (state.prerendering) {
          dependency = { response: response2, body: null };
          state.prerendering.dependencies.set(url.pathname, dependency);
        }
        const set_cookie = response2.headers.get("set-cookie");
        if (set_cookie) {
          set_cookies.push(
            ...set_cookie_parser.splitCookiesString(set_cookie).map((str) => {
              const { name, value, ...options2 } = set_cookie_parser.parseString(str);
              return { name, value, options: options2 };
            })
          );
        }
        return response2;
      }
    });
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: request.url.startsWith(event.url.origin) ? request.url.slice(event.url.origin.length) : request.url,
              method: request.method,
              request_body,
              response_body: body,
              response: response2
            });
            const get = response2.headers.get;
            response2.headers.get = (key3) => {
              const lower = key3.toLowerCase();
              const value = get.call(response2.headers, lower);
              if (value && !lower.startsWith("x-sveltekit-")) {
                const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
                if (!included) {
                  throw new Error(
                    `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#handle`
                  );
                }
              }
              return value;
            };
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    return proxy;
  };
  return { fetcher, fetched, cookies: set_cookies };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
var tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
    return inspect(url, opts);
  };
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
async function unwrap_promises(object) {
  var _a;
  for (const key2 in object) {
    if (typeof ((_a = object[key2]) == null ? void 0 : _a.then) === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
async function load_server_data({ event, state, node, parent }) {
  var _a;
  if (!(node == null ? void 0 : node.server))
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await ((_a = node.server.load) == null ? void 0 : _a.call(null, {
    ...event,
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[key2];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    url
  }));
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses: {
      dependencies: uses.dependencies.size > 0 ? Array.from(uses.dependencies) : void 0,
      params: uses.params.size > 0 ? Array.from(uses.params) : void 0,
      parent: uses.parent ? 1 : void 0,
      url: uses.url ? 1 : void 0
    }
  };
}
async function load_data({ event, fetcher, node, parent, server_data_promise }) {
  var _a;
  const server_data_node = await server_data_promise;
  if (!((_a = node == null ? void 0 : node.shared) == null ? void 0 : _a.load)) {
    return (server_data_node == null ? void 0 : server_data_node.data) ?? null;
  }
  const load_event = {
    url: event.url,
    params: event.params,
    data: (server_data_node == null ? void 0 : server_data_node.data) ?? null,
    routeId: event.routeId,
    fetch: fetcher,
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  };
  Object.defineProperties(load_event, {
    session: {
      get() {
        throw new Error(
          "session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
        );
      },
      enumerable: false
    }
  });
  const data = await node.shared.load.call(null, load_event);
  return data ? unwrap_promises(data) : null;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    if (key2 === "age")
      age = value;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_body) {
    attrs.push(`data-hash=${escape_html_attr(hash(fetched.request_body))}`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  constructor(use_hashes, directives, nonce, dev) {
    __privateAdd(this, _use_hashes, void 0);
    __privateAdd(this, _script_needs_csp, void 0);
    __privateAdd(this, _style_needs_csp, void 0);
    __privateAdd(this, _directives, void 0);
    __privateAdd(this, _script_src, void 0);
    __privateAdd(this, _style_src, void 0);
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, dev ? { ...directives } : directives);
    const d = __privateGet(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  constructor(use_hashes, directives, nonce, dev) {
    var _a, _b;
    super(use_hashes, directives, nonce, dev);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = ((_a = directives["report-to"]) == null ? void 0 : _a.length) ?? 0 > 0;
      const has_report_uri = ((_b = directives["report-uri"]) == null ? void 0 : _b.length) ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  constructor({ mode, directives, reportOnly }, { prerender, dev }) {
    __publicField(this, "nonce", generate_nonce());
    __publicField(this, "csp_provider");
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce, dev);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce, dev);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  fetched,
  cookies,
  options,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  var _a;
  if (state.prerendering) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { entry } = options.manifest._;
  const stylesheets18 = new Set(entry.stylesheets);
  const modulepreloads = new Set(entry.imports);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = (action_result == null ? void 0 : action_result.type) === "success" || (action_result == null ? void 0 : action_result.type) === "invalid" ? action_result.data ?? null : null;
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      components: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data = {};
    for (let i = 0; i < branch.length; i += 1) {
      data = { ...data, ...branch[i].data };
      props[`data_${i}`] = data;
    }
    props.page = {
      error: error2,
      params: event.params,
      routeId: event.routeId,
      status,
      url: event.url,
      data,
      form: form_value
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    rendered = options.root.render(props);
    for (const { node } of branch) {
      if (node.imports) {
        node.imports.forEach((url) => modulepreloads.add(url));
      }
      if (node.stylesheets) {
        node.stylesheets.forEach((url) => stylesheets18.add(url));
      }
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerendering
  });
  const target = hash(body);
  let assets2;
  if (options.paths.assets) {
    assets2 = options.paths.assets;
  } else if ((_a = state.prerendering) == null ? void 0 : _a.fallback) {
    assets2 = options.paths.base;
  } else {
    const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
    assets2 = segments.length > 0 ? segments.map(() => "..").join("/") : ".";
  }
  const prefixed = (path) => path.startsWith("/") ? path : `${assets2}/${path}`;
  const serialized = { data: "", form: "null" };
  try {
    serialized.data = devalue(branch.map(({ server_data }) => server_data));
  } catch (e) {
    const error3 = e;
    const match = /\[(\d+)\]\.data\.(.+)/.exec(error3.path);
    if (match)
      throw new Error(`${error3.message} (data.${match[2]})`);
    throw error3;
  }
  if (form_value) {
    serialized.form = devalue(form_value);
  }
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets18) {
    const path = prefixed(dep);
    const attributes = [];
    if (csp.style_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      const preload_atts = ['rel="preload"', 'as="style"'].concat(attributes);
      link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
    }
    attributes.unshift('rel="stylesheet"');
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  if (page_config.csr) {
    const init_app = `
			import { start } from ${s(prefixed(entry.file))};

			start({
				env: ${s(options.public_env)},
				hydrate: ${page_config.ssr ? `{
					status: ${status},
					error: ${s(error2)},
					node_ids: [${branch.map(({ node }) => node.index).join(", ")}],
					params: ${devalue(event.params)},
					routeId: ${s(event.routeId)},
					data: ${serialized.data},
					form: ${serialized.form}
				}` : "null"},
				paths: ${s(options.paths)},
				target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
				trailing_slash: ${s(options.trailing_slash)}
			});
		`;
    for (const dep of modulepreloads) {
      const path = prefixed(dep);
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
  }
  if (page_config.ssr && page_config.csr) {
    body += `
	${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n	")}`;
  }
  if (options.service_worker) {
    const init_service_worker = `
			if ('serviceWorker' in navigator) {
				addEventListener('load', function () {
					navigator.serviceWorker.register('${prefixed("service-worker.js")}');
				});
			}
		`;
    csp.add_script(init_service_worker);
    head += `
		<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const html = await resolve_opts.transformPageChunk({
    html: options.app_template({ head, body, assets: assets2, nonce: csp.nonce }),
    done: true
  }) || "";
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (!state.prerendering) {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    add_cookies_to_headers(headers, cookies);
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
async function respond_with_error({ event, options, state, status, error: error2, resolve_opts }) {
  const { fetcher, fetched, cookies } = create_fetch({
    event,
    options,
    state,
    route: GENERIC_ERROR,
    resolve_opts
  });
  try {
    const branch = [];
    const default_layout = await options.manifest._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    if (ssr) {
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetcher,
        node: default_layout,
        parent: async () => ({}),
        server_data_promise,
        state
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await options.manifest._.nodes[1](),
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: handle_error_and_jsonify(event, options, error2),
      branch,
      fetched,
      cookies,
      event,
      resolve_opts
    });
  } catch (error3) {
    if (error3 instanceof Redirect) {
      return redirect_response(error3.status, error3.location, cookies);
    }
    return static_error_page(
      options,
      error3 instanceof HttpError ? error3.status : 500,
      handle_error_and_jsonify(event, options, error3).message
    );
  }
}
async function render_page(event, route, page2, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (is_action_json_request(event)) {
    const node = await options.manifest._.nodes[page2.leaf]();
    if (node.server) {
      return handle_action_json_request(event, options, node.server);
    }
  }
  try {
    const nodes = await Promise.all([
      ...page2.layouts.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()),
      options.manifest._.nodes[page2.leaf]()
    ]);
    const leaf_node = nodes.at(-1);
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event, leaf_node)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if ((action_result == null ? void 0 : action_result.type) === "redirect") {
        return redirect_response(303, action_result.location);
      }
      if ((action_result == null ? void 0 : action_result.type) === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if ((action_result == null ? void 0 : action_result.type) === "invalid") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node == null ? void 0 : node.server);
    const data_pathname = event.url.pathname.replace(/\/$/, "") + DATA_SUFFIX;
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod && mod.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    const { fetcher, fetched, cookies } = create_fetch({
      event,
      options,
      state,
      route,
      prerender_default: should_prerender,
      resolve_opts
    });
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        cookies,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && (action_result == null ? void 0 : action_result.type) === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetcher,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            server_data_promise: server_promises[i],
            state
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = `window.__sveltekit_data = ${JSON.stringify({
                type: "redirect",
                location: err.location
              })}`;
              state.prerendering.dependencies.set(data_pathname, {
                response: new Response(body),
                body
              });
            }
            return redirect_response(err.status, err.location, cookies);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = handle_error_and_jsonify(event, options, err);
          while (i--) {
            if (page2.errors[i]) {
              const index18 = page2.errors[i];
              const node2 = await options.manifest._.nodes[index18]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched,
                cookies
              });
            }
          }
          return static_error_page(options, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      const body = `window.__sveltekit_data = ${devalue({
        type: "data",
        nodes: branch.map((branch_node) => branch_node == null ? void 0 : branch_node.server_data)
      })}`;
      state.prerendering.dependencies.set(data_pathname, {
        response: new Response(body),
        body
      });
    }
    return await render_response({
      event,
      options,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched,
      cookies
    });
  } catch (error2) {
    return await respond_with_error({
      event,
      options,
      state,
      status: 500,
      error: error2,
      resolve_opts
    });
  }
}
function exec(match, names, types, matchers) {
  const params = {};
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const type = types[i];
    const value = match[i + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
async function render_data(event, route, options, state) {
  var _a;
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = ((_a = event.url.searchParams.get("__invalid")) == null ? void 0 : _a.split("").map((x) => x === "y")) ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(
      url.pathname.slice(0, -DATA_SUFFIX.length),
      options.trailing_slash
    );
    url.searchParams.delete("__invalid");
    url.searchParams.delete("__id");
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return {
              type: "skip"
            };
          }
          const node = n == void 0 ? n : await options.manifest._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await functions[j]();
                if (parent) {
                  Object.assign(data, parent.data);
                }
              }
              return data;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return {
          type: "skip"
        };
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch((error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return {
            type: "error",
            error: handle_error_and_jsonify(event, options, error2),
            status: error2 instanceof HttpError ? error2.status : void 0
          };
        })
      )
    );
    const server_data = {
      type: "data",
      nodes: nodes.slice(0, length)
    };
    return data_response(server_data);
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      const server_data = {
        type: "redirect",
        location: error2.location
      };
      return data_response(server_data);
    } else {
      return data_response(handle_error_and_jsonify(event, options, error2));
    }
  }
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
async function respond(request, options, state) {
  var _a, _b, _c, _d;
  let url = new URL(request.url);
  if (options.csrf.check_origin) {
    const type = (_a = request.headers.get("content-type")) == null ? void 0 : _a.split(";")[0];
    const forbidden = request.method === "POST" && request.headers.get("origin") !== url.origin && (type === "application/x-www-form-urlencoded" || type === "multipart/form-data");
    if (forbidden) {
      return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
        status: 403
      });
    }
  }
  let decoded;
  try {
    decoded = decodeURI(url.pathname);
  } catch {
    return new Response("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerendering) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response("Not found", { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request)
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
  if (!((_c = state.prerendering) == null ? void 0 : _c.fallback)) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if ((route == null ? void 0 : route.page) && !is_data_request) {
    const normalized = normalize_path(url.pathname, options.trailing_slash);
    if (normalized !== url.pathname && !((_d = state.prerendering) == null ? void 0 : _d.fallback)) {
      return new Response(void 0, {
        status: 301,
        headers: {
          "x-sveltekit-normalize": "1",
          location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
        }
      });
    }
  }
  const headers = {};
  const { cookies, new_cookies } = get_cookies(request, url);
  if (state.prerendering)
    disable_search(url);
  const event = {
    cookies,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = value;
          }
        }
      }
    },
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error(
        "To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details
      );
    }
  };
  Object.defineProperties(event, {
    clientAddress: removed("clientAddress", "getClientAddress"),
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter
  };
  async function resolve(event2, opts) {
    var _a2;
    try {
      if (opts) {
        if ("transformPage" in opts) {
          throw new Error(
            "transformPage has been replaced by transformPageChunk \u2014 see https://github.com/sveltejs/kit/pull/5657 for more information"
          );
        }
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter
        };
      }
      if ((_a2 = state.prerendering) == null ? void 0 : _a2.fallback) {
        return await render_response({
          event: event2,
          options,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          cookies: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(event2, route, options, state);
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(event2, route, route.page, options, state, resolve_opts);
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.initiator === GENERIC_ERROR) {
        return new Response("Internal Server Error", {
          status: 500
        });
      }
      if (!state.initiator) {
        return await respond_with_error({
          event: event2,
          options,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return new Response("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      const error2 = e instanceof HttpError ? e : coalesce_to_error(e);
      return handle_fatal_error(event2, options, error2);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
  try {
    const response = await options.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        if (!is_data_request) {
          for (const key2 in headers) {
            const value = headers[key2];
            response2.headers.set(key2, value);
          }
        }
        add_cookies_to_headers(response2.headers, Array.from(new_cookies.values()));
        if (state.prerendering && event2.routeId !== null) {
          response2.headers.set("x-sveltekit-routeid", event2.routeId);
        }
        return response2;
      }),
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = response.headers.get("etag");
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of ["cache-control", "content-location", "date", "expires", "vary"]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    return response;
  } catch (e) {
    const error2 = coalesce_to_error(e);
    return handle_fatal_error(event, options, error2);
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var app_template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/icon.png" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + "\n	</head>\n\n	<title>\n		Yifan Lu\n	</title>\n	\n	<body>\n		<div>" + body + "</div>\n	</body>\n</html>\n";
var error_template = ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid #ccc;
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      csrf: {
        check_origin: true
      },
      dev: false,
      handle_error: (error2, event) => {
        return this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        }) ?? { message: event.routeId != null ? "Internal Error" : "Not Found" };
      },
      hooks: null,
      manifest: manifest2,
      paths: { base, assets },
      public_env: {},
      read,
      root: Root,
      service_worker: false,
      app_template,
      app_template_contains_nonce: false,
      error_template,
      trailing_slash: "never"
    };
  }
  async init({ env }) {
    const entries = Object.entries(env);
    Object.fromEntries(entries.filter(([k]) => !k.startsWith("PUBLIC_")));
    const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith("PUBLIC_")));
    this.options.public_env = pub;
    if (!this.options.hooks) {
      const module = await Promise.resolve().then(() => (init_hooks(), hooks_exports));
      if (module.externalFetch) {
        throw new Error("externalFetch has been removed \u2014 use handleFetch instead. See https://github.com/sveltejs/kit/pull/6565 for details");
      }
      this.options.hooks = {
        handle: module.handle || (({ event, resolve }) => resolve(event)),
        handleError: module.handleError || (({ error: error2 }) => console.error(error2.stack)),
        handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
      };
    }
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/netlify-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "icon.png"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    entry: { "file": "_app/immutable/start-d83b02d9.js", "imports": ["_app/immutable/start-d83b02d9.js", "_app/immutable/chunks/index-739fea4f.js", "_app/immutable/chunks/singletons-174e08f2.js"], "stylesheets": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8)),
      () => Promise.resolve().then(() => (init__9(), __exports9)),
      () => Promise.resolve().then(() => (init__10(), __exports10)),
      () => Promise.resolve().then(() => (init__11(), __exports11)),
      () => Promise.resolve().then(() => (init__12(), __exports12)),
      () => Promise.resolve().then(() => (init__13(), __exports13)),
      () => Promise.resolve().then(() => (init__14(), __exports14)),
      () => Promise.resolve().then(() => (init__15(), __exports15)),
      () => Promise.resolve().then(() => (init__16(), __exports16)),
      () => Promise.resolve().then(() => (init__17(), __exports17))
    ],
    routes: [
      {
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 4 },
        endpoint: null
      },
      {
        id: "contact-me",
        pattern: /^\/contact-me\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 5 },
        endpoint: null
      },
      {
        id: "hire",
        pattern: /^\/hire\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 6 },
        endpoint: null
      },
      {
        id: "portfolio",
        pattern: /^\/portfolio\/?$/,
        names: [],
        types: [],
        page: { layouts: [0, 3], errors: [1, ,], leaf: 12 },
        endpoint: null
      },
      {
        id: "portfolio_revised",
        pattern: /^\/portfolio_revised\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 13 },
        endpoint: null
      },
      {
        id: "portfolio_revised_as_marquee",
        pattern: /^\/portfolio_revised_as_marquee\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 14 },
        endpoint: null
      },
      {
        id: "test",
        pattern: /^\/test\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 15 },
        endpoint: null
      },
      {
        id: "wordSphereTest",
        pattern: /^\/wordSphereTest\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 16 },
        endpoint: null
      },
      {
        id: "lib/projects/2048",
        pattern: /^\/lib\/projects\/2048\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 7 },
        endpoint: null
      },
      {
        id: "lib/projects/calculator",
        pattern: /^\/lib\/projects\/calculator\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 8 },
        endpoint: null
      },
      {
        id: "lib/projects/stopwatch",
        pattern: /^\/lib\/projects\/stopwatch\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 9 },
        endpoint: null
      },
      {
        id: "lib/projects/svelte_materials",
        pattern: /^\/lib\/projects\/svelte_materials\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 10 },
        endpoint: null
      },
      {
        id: "lib/projects/typing_game",
        pattern: /^\/lib\/projects\/typing_game\/?$/,
        names: [],
        types: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 11 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
var prerendered = /* @__PURE__ */ new Set([]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appDir}/`;
var initialized = server.init({
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file18 = pathname.substring(1);
  try {
    file18 = decodeURIComponent(file18);
  } catch (err) {
  }
  return manifest.assets.has(file18) || manifest.assets.has(file18 + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=render.js.map
