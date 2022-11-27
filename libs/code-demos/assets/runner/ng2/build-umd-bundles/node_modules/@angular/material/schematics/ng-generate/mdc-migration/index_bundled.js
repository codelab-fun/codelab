var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
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
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/picocolors/picocolors.js"(exports, module2) {
    var tty = require("tty");
    var isColorSupported = !("NO_COLOR" in process.env || process.argv.includes("--no-color")) && ("FORCE_COLOR" in process.env || process.argv.includes("--color") || process.platform === "win32" || tty.isatty(1) && process.env.TERM !== "dumb" || "CI" in process.env);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index2 = string.indexOf(close, open.length);
      return ~index2 ? open + replaceClose(string, close, replace, index2) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index2) => {
      let start = string.substring(0, index2) + replace;
      let end = string.substring(index2 + close.length);
      let nextIndex = end.indexOf(close);
      return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
    };
    var createColors = (enabled = isColorSupported) => ({
      isColorSupported: enabled,
      reset: enabled ? (s) => `\x1B[0m${s}\x1B[0m` : String,
      bold: enabled ? formatter("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m") : String,
      dim: enabled ? formatter("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m") : String,
      italic: enabled ? formatter("\x1B[3m", "\x1B[23m") : String,
      underline: enabled ? formatter("\x1B[4m", "\x1B[24m") : String,
      inverse: enabled ? formatter("\x1B[7m", "\x1B[27m") : String,
      hidden: enabled ? formatter("\x1B[8m", "\x1B[28m") : String,
      strikethrough: enabled ? formatter("\x1B[9m", "\x1B[29m") : String,
      black: enabled ? formatter("\x1B[30m", "\x1B[39m") : String,
      red: enabled ? formatter("\x1B[31m", "\x1B[39m") : String,
      green: enabled ? formatter("\x1B[32m", "\x1B[39m") : String,
      yellow: enabled ? formatter("\x1B[33m", "\x1B[39m") : String,
      blue: enabled ? formatter("\x1B[34m", "\x1B[39m") : String,
      magenta: enabled ? formatter("\x1B[35m", "\x1B[39m") : String,
      cyan: enabled ? formatter("\x1B[36m", "\x1B[39m") : String,
      white: enabled ? formatter("\x1B[37m", "\x1B[39m") : String,
      gray: enabled ? formatter("\x1B[90m", "\x1B[39m") : String,
      bgBlack: enabled ? formatter("\x1B[40m", "\x1B[49m") : String,
      bgRed: enabled ? formatter("\x1B[41m", "\x1B[49m") : String,
      bgGreen: enabled ? formatter("\x1B[42m", "\x1B[49m") : String,
      bgYellow: enabled ? formatter("\x1B[43m", "\x1B[49m") : String,
      bgBlue: enabled ? formatter("\x1B[44m", "\x1B[49m") : String,
      bgMagenta: enabled ? formatter("\x1B[45m", "\x1B[49m") : String,
      bgCyan: enabled ? formatter("\x1B[46m", "\x1B[49m") : String,
      bgWhite: enabled ? formatter("\x1B[47m", "\x1B[49m") : String
    });
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// node_modules/postcss/lib/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/postcss/lib/tokenize.js"(exports, module2) {
    "use strict";
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
    var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\n"'(/\\]/;
    var RE_HEX_ESCAPE = /[\da-f]/i;
    module2.exports = function tokenizer(input, options = {}) {
      let css = input.css.valueOf();
      let ignore = options.ignoreErrors;
      let code, next, quote, content, escape;
      let escaped, escapePos, prev, n, currentToken;
      let length = css.length;
      let pos = 0;
      let buffer = [];
      let returned = [];
      function position() {
        return pos;
      }
      function unclosed(what) {
        throw input.error("Unclosed " + what, pos);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length;
      }
      function nextToken(opts) {
        if (returned.length)
          return returned.pop();
        if (pos >= length)
          return;
        let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
        code = css.charCodeAt(pos);
        switch (code) {
          case NEWLINE:
          case SPACE:
          case TAB:
          case CR:
          case FEED: {
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          }
          case OPEN_SQUARE:
          case CLOSE_SQUARE:
          case OPEN_CURLY:
          case CLOSE_CURLY:
          case COLON:
          case SEMICOLON:
          case CLOSE_PARENTHESES: {
            let controlChar = String.fromCharCode(code);
            currentToken = [controlChar, controlChar, pos];
            break;
          }
          case OPEN_PARENTHESES: {
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
              next = pos;
              do {
                escaped = false;
                next = css.indexOf(")", next + 1);
                if (next === -1) {
                  if (ignore || ignoreUnclosed) {
                    next = pos;
                    break;
                  } else {
                    unclosed("bracket");
                  }
                }
                escapePos = next;
                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                  escapePos -= 1;
                  escaped = !escaped;
                }
              } while (escaped);
              currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", pos];
              } else {
                currentToken = ["brackets", content, pos, next];
                pos = next;
              }
            }
            break;
          }
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE: {
            quote = code === SINGLE_QUOTE ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos + 1;
                  break;
                } else {
                  unclosed("string");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["string", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case AT: {
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case BACKSLASH: {
            next = pos;
            escape = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          default: {
            if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore || ignoreUnclosed) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              currentToken = ["comment", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), pos, next];
              buffer.push(currentToken);
              pos = next;
            }
            break;
          }
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        nextToken,
        endOfFile,
        position
      };
    };
  }
});

// node_modules/postcss/lib/terminal-highlight.js
var require_terminal_highlight = __commonJS({
  "node_modules/postcss/lib/terminal-highlight.js"(exports, module2) {
    "use strict";
    var pico = require_picocolors();
    var tokenizer = require_tokenize();
    var Input2;
    function registerInput(dependant) {
      Input2 = dependant;
    }
    var HIGHLIGHT_THEME = {
      "brackets": pico.cyan,
      "at-word": pico.cyan,
      "comment": pico.gray,
      "string": pico.green,
      "class": pico.yellow,
      "hash": pico.magenta,
      "call": pico.cyan,
      "(": pico.cyan,
      ")": pico.cyan,
      "{": pico.yellow,
      "}": pico.yellow,
      "[": pico.yellow,
      "]": pico.yellow,
      ":": pico.yellow,
      ";": pico.yellow
    };
    function getTokenType([type, value], processor) {
      if (type === "word") {
        if (value[0] === ".") {
          return "class";
        }
        if (value[0] === "#") {
          return "hash";
        }
      }
      if (!processor.endOfFile()) {
        let next = processor.nextToken();
        processor.back(next);
        if (next[0] === "brackets" || next[0] === "(")
          return "call";
      }
      return type;
    }
    function terminalHighlight(css) {
      let processor = tokenizer(new Input2(css), { ignoreErrors: true });
      let result = "";
      while (!processor.endOfFile()) {
        let token = processor.nextToken();
        let color = HIGHLIGHT_THEME[getTokenType(token, processor)];
        if (color) {
          result += token[1].split(/\r?\n/).map((i) => color(i)).join("\n");
        } else {
          result += token[1];
        }
      }
      return result;
    }
    terminalHighlight.registerInput = registerInput;
    module2.exports = terminalHighlight;
  }
});

// node_modules/postcss/lib/css-syntax-error.js
var require_css_syntax_error = __commonJS({
  "node_modules/postcss/lib/css-syntax-error.js"(exports, module2) {
    "use strict";
    var pico = require_picocolors();
    var terminalHighlight = require_terminal_highlight();
    var CssSyntaxError2 = class extends Error {
      constructor(message, line, column, source, file, plugin2) {
        super(message);
        this.name = "CssSyntaxError";
        this.reason = message;
        if (file) {
          this.file = file;
        }
        if (source) {
          this.source = source;
        }
        if (plugin2) {
          this.plugin = plugin2;
        }
        if (typeof line !== "undefined" && typeof column !== "undefined") {
          if (typeof line === "number") {
            this.line = line;
            this.column = column;
          } else {
            this.line = line.line;
            this.column = line.column;
            this.endLine = column.line;
            this.endColumn = column.column;
          }
        }
        this.setMessage();
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CssSyntaxError2);
        }
      }
      setMessage() {
        this.message = this.plugin ? this.plugin + ": " : "";
        this.message += this.file ? this.file : "<css input>";
        if (typeof this.line !== "undefined") {
          this.message += ":" + this.line + ":" + this.column;
        }
        this.message += ": " + this.reason;
      }
      showSourceCode(color) {
        if (!this.source)
          return "";
        let css = this.source;
        if (color == null)
          color = pico.isColorSupported;
        if (terminalHighlight) {
          if (color)
            css = terminalHighlight(css);
        }
        let lines = css.split(/\r?\n/);
        let start = Math.max(this.line - 3, 0);
        let end = Math.min(this.line + 2, lines.length);
        let maxWidth = String(end).length;
        let mark, aside;
        if (color) {
          let { bold, red, gray } = pico.createColors(true);
          mark = (text) => bold(red(text));
          aside = (text) => gray(text);
        } else {
          mark = aside = (str) => str;
        }
        return lines.slice(start, end).map((line, index2) => {
          let number = start + 1 + index2;
          let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
          if (number === this.line) {
            let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
          }
          return " " + aside(gutter) + line;
        }).join("\n");
      }
      toString() {
        let code = this.showSourceCode();
        if (code) {
          code = "\n\n" + code + "\n";
        }
        return this.name + ": " + this.message + code;
      }
    };
    module2.exports = CssSyntaxError2;
    CssSyntaxError2.default = CssSyntaxError2;
  }
});

// node_modules/postcss/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/postcss/lib/symbols.js"(exports, module2) {
    "use strict";
    module2.exports.isClean = Symbol("isClean");
    module2.exports.my = Symbol("my");
  }
});

// node_modules/postcss/lib/stringifier.js
var require_stringifier = __commonJS({
  "node_modules/postcss/lib/stringifier.js"(exports, module2) {
    "use strict";
    var DEFAULT_RAW = {
      colon: ": ",
      indent: "    ",
      beforeDecl: "\n",
      beforeRule: "\n",
      beforeOpen: " ",
      beforeClose: "\n",
      beforeComment: "\n",
      after: "\n",
      emptyBody: "",
      commentLeft: " ",
      commentRight: " ",
      semicolon: false
    };
    function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
    var Stringifier = class {
      constructor(builder) {
        this.builder = builder;
      }
      stringify(node, semicolon) {
        if (!this[node.type]) {
          throw new Error("Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier.");
        }
        this[node.type](node, semicolon);
      }
      document(node) {
        this.body(node);
      }
      root(node) {
        this.body(node);
        if (node.raws.after)
          this.builder(node.raws.after);
      }
      comment(node) {
        let left = this.raw(node, "left", "commentLeft");
        let right = this.raw(node, "right", "commentRight");
        this.builder("/*" + left + node.text + right + "*/", node);
      }
      decl(node, semicolon) {
        let between = this.raw(node, "between", "colon");
        let string = node.prop + between + this.rawValue(node, "value");
        if (node.important) {
          string += node.raws.important || " !important";
        }
        if (semicolon)
          string += ";";
        this.builder(string, node);
      }
      rule(node) {
        this.block(node, this.rawValue(node, "selector"));
        if (node.raws.ownSemicolon) {
          this.builder(node.raws.ownSemicolon, node, "end");
        }
      }
      atrule(node, semicolon) {
        let name = "@" + node.name;
        let params = node.params ? this.rawValue(node, "params") : "";
        if (typeof node.raws.afterName !== "undefined") {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        if (node.nodes) {
          this.block(node, name + params);
        } else {
          let end = (node.raws.between || "") + (semicolon ? ";" : "");
          this.builder(name + params + end, node);
        }
      }
      body(node) {
        let last = node.nodes.length - 1;
        while (last > 0) {
          if (node.nodes[last].type !== "comment")
            break;
          last -= 1;
        }
        let semicolon = this.raw(node, "semicolon");
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          let before = this.raw(child, "before");
          if (before)
            this.builder(before);
          this.stringify(child, last !== i || semicolon);
        }
      }
      block(node, start) {
        let between = this.raw(node, "between", "beforeOpen");
        this.builder(start + between + "{", node, "start");
        let after;
        if (node.nodes && node.nodes.length) {
          this.body(node);
          after = this.raw(node, "after");
        } else {
          after = this.raw(node, "after", "emptyBody");
        }
        if (after)
          this.builder(after);
        this.builder("}", node, "end");
      }
      raw(node, own, detect) {
        let value;
        if (!detect)
          detect = own;
        if (own) {
          value = node.raws[own];
          if (typeof value !== "undefined")
            return value;
        }
        let parent = node.parent;
        if (detect === "before") {
          if (!parent || parent.type === "root" && parent.first === node) {
            return "";
          }
          if (parent && parent.type === "document") {
            return "";
          }
        }
        if (!parent)
          return DEFAULT_RAW[detect];
        let root2 = node.root();
        if (!root2.rawCache)
          root2.rawCache = {};
        if (typeof root2.rawCache[detect] !== "undefined") {
          return root2.rawCache[detect];
        }
        if (detect === "before" || detect === "after") {
          return this.beforeAfter(node, detect);
        } else {
          let method = "raw" + capitalize(detect);
          if (this[method]) {
            value = this[method](root2, node);
          } else {
            root2.walk((i) => {
              value = i.raws[own];
              if (typeof value !== "undefined")
                return false;
            });
          }
        }
        if (typeof value === "undefined")
          value = DEFAULT_RAW[detect];
        root2.rawCache[detect] = value;
        return value;
      }
      rawSemicolon(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && i.nodes.length && i.last.type === "decl") {
            value = i.raws.semicolon;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      }
      rawEmptyBody(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && i.nodes.length === 0) {
            value = i.raws.after;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      }
      rawIndent(root2) {
        if (root2.raws.indent)
          return root2.raws.indent;
        let value;
        root2.walk((i) => {
          let p = i.parent;
          if (p && p !== root2 && p.parent && p.parent === root2) {
            if (typeof i.raws.before !== "undefined") {
              let parts = i.raws.before.split("\n");
              value = parts[parts.length - 1];
              value = value.replace(/\S/g, "");
              return false;
            }
          }
        });
        return value;
      }
      rawBeforeComment(root2, node) {
        let value;
        root2.walkComments((i) => {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeDecl");
        } else if (value) {
          value = value.replace(/\S/g, "");
        }
        return value;
      }
      rawBeforeDecl(root2, node) {
        let value;
        root2.walkDecls((i) => {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeRule");
        } else if (value) {
          value = value.replace(/\S/g, "");
        }
        return value;
      }
      rawBeforeRule(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && (i.parent !== root2 || root2.first !== i)) {
            if (typeof i.raws.before !== "undefined") {
              value = i.raws.before;
              if (value.includes("\n")) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value)
          value = value.replace(/\S/g, "");
        return value;
      }
      rawBeforeClose(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && i.nodes.length > 0) {
            if (typeof i.raws.after !== "undefined") {
              value = i.raws.after;
              if (value.includes("\n")) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value)
          value = value.replace(/\S/g, "");
        return value;
      }
      rawBeforeOpen(root2) {
        let value;
        root2.walk((i) => {
          if (i.type !== "decl") {
            value = i.raws.between;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      }
      rawColon(root2) {
        let value;
        root2.walkDecls((i) => {
          if (typeof i.raws.between !== "undefined") {
            value = i.raws.between.replace(/[^\s:]/g, "");
            return false;
          }
        });
        return value;
      }
      beforeAfter(node, detect) {
        let value;
        if (node.type === "decl") {
          value = this.raw(node, null, "beforeDecl");
        } else if (node.type === "comment") {
          value = this.raw(node, null, "beforeComment");
        } else if (detect === "before") {
          value = this.raw(node, null, "beforeRule");
        } else {
          value = this.raw(node, null, "beforeClose");
        }
        let buf = node.parent;
        let depth = 0;
        while (buf && buf.type !== "root") {
          depth += 1;
          buf = buf.parent;
        }
        if (value.includes("\n")) {
          let indent = this.raw(node, null, "indent");
          if (indent.length) {
            for (let step = 0; step < depth; step++)
              value += indent;
          }
        }
        return value;
      }
      rawValue(node, prop) {
        let value = node[prop];
        let raw = node.raws[prop];
        if (raw && raw.value === value) {
          return raw.raw;
        }
        return value;
      }
    };
    module2.exports = Stringifier;
    Stringifier.default = Stringifier;
  }
});

// node_modules/postcss/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/postcss/lib/stringify.js"(exports, module2) {
    "use strict";
    var Stringifier = require_stringifier();
    function stringify4(node, builder) {
      let str = new Stringifier(builder);
      str.stringify(node);
    }
    module2.exports = stringify4;
    stringify4.default = stringify4;
  }
});

// node_modules/postcss/lib/node.js
var require_node = __commonJS({
  "node_modules/postcss/lib/node.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var CssSyntaxError2 = require_css_syntax_error();
    var Stringifier = require_stringifier();
    var stringify4 = require_stringify();
    function cloneNode(obj, parent) {
      let cloned = new obj.constructor();
      for (let i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)) {
          continue;
        }
        if (i === "proxyCache")
          continue;
        let value = obj[i];
        let type = typeof value;
        if (i === "parent" && type === "object") {
          if (parent)
            cloned[i] = parent;
        } else if (i === "source") {
          cloned[i] = value;
        } else if (Array.isArray(value)) {
          cloned[i] = value.map((j) => cloneNode(j, cloned));
        } else {
          if (type === "object" && value !== null)
            value = cloneNode(value);
          cloned[i] = value;
        }
      }
      return cloned;
    }
    var Node2 = class {
      constructor(defaults = {}) {
        this.raws = {};
        this[isClean] = false;
        this[my] = true;
        for (let name in defaults) {
          if (name === "nodes") {
            this.nodes = [];
            for (let node of defaults[name]) {
              if (typeof node.clone === "function") {
                this.append(node.clone());
              } else {
                this.append(node);
              }
            }
          } else {
            this[name] = defaults[name];
          }
        }
      }
      error(message, opts = {}) {
        if (this.source) {
          let { start, end } = this.rangeBy(opts);
          return this.source.input.error(message, { line: start.line, column: start.column }, { line: end.line, column: end.column }, opts);
        }
        return new CssSyntaxError2(message);
      }
      warn(result, text, opts) {
        let data = { node: this };
        for (let i in opts)
          data[i] = opts[i];
        return result.warn(text, data);
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      }
      toString(stringifier = stringify4) {
        if (stringifier.stringify)
          stringifier = stringifier.stringify;
        let result = "";
        stringifier(this, (i) => {
          result += i;
        });
        return result;
      }
      assign(overrides = {}) {
        for (let name in overrides) {
          this[name] = overrides[name];
        }
        return this;
      }
      clone(overrides = {}) {
        let cloned = cloneNode(this);
        for (let name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      }
      cloneBefore(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
      }
      cloneAfter(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
      }
      replaceWith(...nodes) {
        if (this.parent) {
          let bookmark = this;
          let foundSelf = false;
          for (let node of nodes) {
            if (node === this) {
              foundSelf = true;
            } else if (foundSelf) {
              this.parent.insertAfter(bookmark, node);
              bookmark = node;
            } else {
              this.parent.insertBefore(bookmark, node);
            }
          }
          if (!foundSelf) {
            this.remove();
          }
        }
        return this;
      }
      next() {
        if (!this.parent)
          return void 0;
        let index2 = this.parent.index(this);
        return this.parent.nodes[index2 + 1];
      }
      prev() {
        if (!this.parent)
          return void 0;
        let index2 = this.parent.index(this);
        return this.parent.nodes[index2 - 1];
      }
      before(add) {
        this.parent.insertBefore(this, add);
        return this;
      }
      after(add) {
        this.parent.insertAfter(this, add);
        return this;
      }
      root() {
        let result = this;
        while (result.parent && result.parent.type !== "document") {
          result = result.parent;
        }
        return result;
      }
      raw(prop, defaultType) {
        let str = new Stringifier();
        return str.raw(this, prop, defaultType);
      }
      cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween)
          delete this.raws.between;
      }
      toJSON(_, inputs) {
        let fixed = {};
        let emitInputs = inputs == null;
        inputs = inputs || /* @__PURE__ */ new Map();
        let inputsNextIndex = 0;
        for (let name in this) {
          if (!Object.prototype.hasOwnProperty.call(this, name)) {
            continue;
          }
          if (name === "parent" || name === "proxyCache")
            continue;
          let value = this[name];
          if (Array.isArray(value)) {
            fixed[name] = value.map((i) => {
              if (typeof i === "object" && i.toJSON) {
                return i.toJSON(null, inputs);
              } else {
                return i;
              }
            });
          } else if (typeof value === "object" && value.toJSON) {
            fixed[name] = value.toJSON(null, inputs);
          } else if (name === "source") {
            let inputId = inputs.get(value.input);
            if (inputId == null) {
              inputId = inputsNextIndex;
              inputs.set(value.input, inputsNextIndex);
              inputsNextIndex++;
            }
            fixed[name] = {
              inputId,
              start: value.start,
              end: value.end
            };
          } else {
            fixed[name] = value;
          }
        }
        if (emitInputs) {
          fixed.inputs = [...inputs.keys()].map((input) => input.toJSON());
        }
        return fixed;
      }
      positionInside(index2) {
        let string = this.toString();
        let column = this.source.start.column;
        let line = this.source.start.line;
        for (let i = 0; i < index2; i++) {
          if (string[i] === "\n") {
            column = 1;
            line += 1;
          } else {
            column += 1;
          }
        }
        return { line, column };
      }
      positionBy(opts) {
        let pos = this.source.start;
        if (opts.index) {
          pos = this.positionInside(opts.index);
        } else if (opts.word) {
          let index2 = this.toString().indexOf(opts.word);
          if (index2 !== -1)
            pos = this.positionInside(index2);
        }
        return pos;
      }
      rangeBy(opts) {
        let start = {
          line: this.source.start.line,
          column: this.source.start.column
        };
        let end = this.source.end ? {
          line: this.source.end.line,
          column: this.source.end.column + 1
        } : {
          line: start.line,
          column: start.column + 1
        };
        if (opts.word) {
          let index2 = this.toString().indexOf(opts.word);
          if (index2 !== -1) {
            start = this.positionInside(index2);
            end = this.positionInside(index2 + opts.word.length);
          }
        } else {
          if (opts.start) {
            start = {
              line: opts.start.line,
              column: opts.start.column
            };
          } else if (opts.index) {
            start = this.positionInside(opts.index);
          }
          if (opts.end) {
            end = {
              line: opts.end.line,
              column: opts.end.column
            };
          } else if (opts.endIndex) {
            end = this.positionInside(opts.endIndex);
          } else if (opts.index) {
            end = this.positionInside(opts.index + 1);
          }
        }
        if (end.line < start.line || end.line === start.line && end.column <= start.column) {
          end = { line: start.line, column: start.column + 1 };
        }
        return { start, end };
      }
      getProxyProcessor() {
        return {
          set(node, prop, value) {
            if (node[prop] === value)
              return true;
            node[prop] = value;
            if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || prop === "text") {
              node.markDirty();
            }
            return true;
          },
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else {
              return node[prop];
            }
          }
        };
      }
      toProxy() {
        if (!this.proxyCache) {
          this.proxyCache = new Proxy(this, this.getProxyProcessor());
        }
        return this.proxyCache;
      }
      addToError(error2) {
        error2.postcssNode = this;
        if (error2.stack && this.source && /\n\s{4}at /.test(error2.stack)) {
          let s = this.source;
          error2.stack = error2.stack.replace(/\n\s{4}at /, `$&${s.input.from}:${s.start.line}:${s.start.column}$&`);
        }
        return error2;
      }
      markDirty() {
        if (this[isClean]) {
          this[isClean] = false;
          let next = this;
          while (next = next.parent) {
            next[isClean] = false;
          }
        }
      }
      get proxyOf() {
        return this;
      }
    };
    module2.exports = Node2;
    Node2.default = Node2;
  }
});

// node_modules/postcss/lib/declaration.js
var require_declaration = __commonJS({
  "node_modules/postcss/lib/declaration.js"(exports, module2) {
    "use strict";
    var Node2 = require_node();
    var Declaration2 = class extends Node2 {
      constructor(defaults) {
        if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
          defaults = __spreadProps(__spreadValues({}, defaults), { value: String(defaults.value) });
        }
        super(defaults);
        this.type = "decl";
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
    module2.exports = Declaration2;
    Declaration2.default = Declaration2;
  }
});

// node_modules/source-map-js/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/source-map-js/lib/base64.js"(exports) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "node_modules/source-map-js/lib/base64-vlq.js"(exports) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// node_modules/source-map-js/lib/util.js
var require_util = __commonJS({
  "node_modules/source-map-js/lib/util.js"(exports) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;
    var MAX_CACHED_INPUTS = 32;
    function lruMemoize(f) {
      var cache = [];
      return function(input) {
        for (var i = 0; i < cache.length; i++) {
          if (cache[i].input === input) {
            var temp = cache[0];
            cache[0] = cache[i];
            cache[i] = temp;
            return cache[0].result;
          }
        }
        var result = f(input);
        cache.unshift({
          input,
          result
        });
        if (cache.length > MAX_CACHED_INPUTS) {
          cache.pop();
        }
        return result;
      };
    }
    var normalize = lruMemoize(function normalize2(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path = url.path;
      }
      var isAbsolute = exports.isAbsolute(path);
      var parts = [];
      var start = 0;
      var i = 0;
      while (true) {
        start = i;
        i = path.indexOf("/", start);
        if (i === -1) {
          parts.push(path.slice(start));
          break;
        } else {
          parts.push(path.slice(start, i));
          while (i < path.length && path[i] === "/") {
            i++;
          }
        }
      }
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path = parts.join("/");
      if (path === "") {
        path = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path;
        return urlGenerate(url);
      }
      return path;
    });
    exports.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index2 = aRoot.lastIndexOf("/");
        if (index2 < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index2);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
      var cmp;
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index2 = parsed.path.lastIndexOf("/");
          if (index2 >= 0) {
            parsed.path = parsed.path.substring(0, index2 + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
  }
});

// node_modules/source-map-js/lib/array-set.js
var require_array_set = __commonJS({
  "node_modules/source-map-js/lib/array-set.js"(exports) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports.ArraySet = ArraySet;
  }
});

// node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "node_modules/source-map-js/lib/mapping-list.js"(exports) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports.MappingList = MappingList;
  }
});

// node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "node_modules/source-map-js/lib/source-map-generator.js"(exports) {
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator2(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator2.prototype._version = 3;
    SourceMapGenerator2.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator2({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator2.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator2.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator2.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator2.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };
    SourceMapGenerator2.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings2 = this._mappings.toArray();
      for (var i = 0, len = mappings2.length; i < len; i++) {
        mapping = mappings2[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings2[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator2.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator2.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator2.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports.SourceMapGenerator = SourceMapGenerator2;
  }
});

// node_modules/source-map-js/lib/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/source-map-js/lib/binary-search.js"(exports) {
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index2 = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
      if (index2 < 0) {
        return -1;
      }
      while (index2 - 1 >= 0) {
        if (aCompare(aHaystack[index2], aHaystack[index2 - 1], true) !== 0) {
          break;
        }
        --index2;
      }
      return index2;
    };
  }
});

// node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "node_modules/source-map-js/lib/quick-sort.js"(exports) {
    function SortTemplate(comparator) {
      function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
      }
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      function doQuickSort(ary, comparator2, p, r) {
        if (p < r) {
          var pivotIndex = randomIntInRange(p, r);
          var i = p - 1;
          swap(ary, pivotIndex, r);
          var pivot = ary[r];
          for (var j = p; j < r; j++) {
            if (comparator2(ary[j], pivot, false) <= 0) {
              i += 1;
              swap(ary, i, j);
            }
          }
          swap(ary, i + 1, j);
          var q = i + 1;
          doQuickSort(ary, comparator2, p, q - 1);
          doQuickSort(ary, comparator2, q + 1, r);
        }
      }
      return doQuickSort;
    }
    function cloneSort(comparator) {
      let template = SortTemplate.toString();
      let templateFn = new Function(`return ${template}`)();
      return templateFn(comparator);
    }
    var sortCache = /* @__PURE__ */ new WeakMap();
    exports.quickSort = function(ary, comparator, start = 0) {
      let doQuickSort = sortCache.get(comparator);
      if (doQuickSort === void 0) {
        doQuickSort = cloneSort(comparator);
        sortCache.set(comparator, doQuickSort);
      }
      doQuickSort(ary, comparator, start, ary.length - 1);
    };
  }
});

// node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "node_modules/source-map-js/lib/source-map-consumer.js"(exports) {
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index2) {
      var c = aStr.charAt(index2);
      return c === ";" || c === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings2;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings2 = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings2 = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      var boundCallback = aCallback.bind(context);
      var names = this._names;
      var sources = this._sources;
      var sourceMapURL = this._sourceMapURL;
      for (var i = 0, n = mappings2.length; i < n; i++) {
        var mapping = mappings2[i];
        var source = mapping.source === null ? null : sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
        boundCallback({
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : names.at(mapping.name)
        });
      }
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings2 = [];
      var index2 = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
      if (index2 >= 0) {
        var mapping = this._originalMappings[index2];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings2.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index2];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings2.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index2];
          }
        }
      }
      return mappings2;
    };
    exports.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings2 = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings2;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    var compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
    function sortGenerated(array, start) {
      let l = array.length;
      let n = array.length - start;
      if (n <= 1) {
        return;
      } else if (n == 2) {
        let a = array[start];
        let b = array[start + 1];
        if (compareGenerated(a, b) > 0) {
          array[start] = b;
          array[start + 1] = a;
        }
      } else if (n < 20) {
        for (let i = start; i < l; i++) {
          for (let j = i; j > start; j--) {
            let a = array[j - 1];
            let b = array[j];
            if (compareGenerated(a, b) <= 0) {
              break;
            }
            array[j - 1] = b;
            array[j] = a;
          }
        }
      } else {
        quickSort(array, compareGenerated, start);
      }
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index2 = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      let subarrayStart = 0;
      while (index2 < length) {
        if (aStr.charAt(index2) === ";") {
          generatedLine++;
          index2++;
          previousGeneratedColumn = 0;
          sortGenerated(generatedMappings, subarrayStart);
          subarrayStart = generatedMappings.length;
        } else if (aStr.charAt(index2) === ",") {
          index2++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index2; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index2, end);
          segment = [];
          while (index2 < end) {
            base64VLQ.decode(aStr, index2, temp);
            value = temp.value;
            index2 = temp.rest;
            segment.push(value);
          }
          if (segment.length === 2) {
            throw new Error("Found a source, but no line and column");
          }
          if (segment.length === 3) {
            throw new Error("Found a source and line, but no column");
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            let currentSource = mapping.source;
            while (originalMappings.length <= currentSource) {
              originalMappings.push(null);
            }
            if (originalMappings[currentSource] === null) {
              originalMappings[currentSource] = [];
            }
            originalMappings[currentSource].push(mapping);
          }
        }
      }
      sortGenerated(generatedMappings, subarrayStart);
      this.__generatedMappings = generatedMappings;
      for (var i = 0; i < originalMappings.length; i++) {
        if (originalMappings[i] != null) {
          quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
        }
      }
      this.__originalMappings = [].concat(...originalMappings);
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index2 = 0; index2 < this._generatedMappings.length; ++index2) {
        var mapping = this._generatedMappings[index2];
        if (index2 + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index2 + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index2 = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
      if (index2 >= 0) {
        var mapping = this._generatedMappings[index2];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index2 = this._findSourceIndex(aSource);
      if (index2 >= 0) {
        return this.sourcesContent[index2];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index2 = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
      if (index2 >= 0) {
        var mapping = this._originalMappings[index2];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(needle, this._sections, function(needle2, section2) {
        var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }
        return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
      });
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// node_modules/source-map-js/lib/source-node.js
var require_source_node = __commonJS({
  "node_modules/source-map-js/lib/source-node.js"(exports) {
    var SourceMapGenerator2 = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null)
        this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator2(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports.SourceNode = SourceNode;
  }
});

// node_modules/source-map-js/source-map.js
var require_source_map = __commonJS({
  "node_modules/source-map-js/source-map.js"(exports) {
    exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports.SourceNode = require_source_node().SourceNode;
  }
});

// node_modules/nanoid/non-secure/index.cjs
var require_non_secure = __commonJS({
  "node_modules/nanoid/non-secure/index.cjs"(exports, module2) {
    var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    var customAlphabet = (alphabet, defaultSize = 21) => {
      return (size = defaultSize) => {
        let id = "";
        let i = size;
        while (i--) {
          id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
      };
    };
    var nanoid = (size = 21) => {
      let id = "";
      let i = size;
      while (i--) {
        id += urlAlphabet[Math.random() * 64 | 0];
      }
      return id;
    };
    module2.exports = { nanoid, customAlphabet };
  }
});

// node_modules/postcss/lib/previous-map.js
var require_previous_map = __commonJS({
  "node_modules/postcss/lib/previous-map.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator: SourceMapGenerator2 } = require_source_map();
    var { existsSync, readFileSync } = require("fs");
    var { dirname, join } = require("path");
    function fromBase64(str) {
      if (Buffer) {
        return Buffer.from(str, "base64").toString();
      } else {
        return window.atob(str);
      }
    }
    var PreviousMap = class {
      constructor(css, opts) {
        if (opts.map === false)
          return;
        this.loadAnnotation(css);
        this.inline = this.startWith(this.annotation, "data:");
        let prev = opts.map ? opts.map.prev : void 0;
        let text = this.loadMap(opts.from, prev);
        if (!this.mapFile && opts.from) {
          this.mapFile = opts.from;
        }
        if (this.mapFile)
          this.root = dirname(this.mapFile);
        if (text)
          this.text = text;
      }
      consumer() {
        if (!this.consumerCache) {
          this.consumerCache = new SourceMapConsumer(this.text);
        }
        return this.consumerCache;
      }
      withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
      }
      startWith(string, start) {
        if (!string)
          return false;
        return string.substr(0, start.length) === start;
      }
      getAnnotationURL(sourceMapString) {
        return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
      }
      loadAnnotation(css) {
        let comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
        if (!comments)
          return;
        let start = css.lastIndexOf(comments.pop());
        let end = css.indexOf("*/", start);
        if (start > -1 && end > -1) {
          this.annotation = this.getAnnotationURL(css.substring(start, end));
        }
      }
      decodeInline(text) {
        let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
        let baseUri = /^data:application\/json;base64,/;
        let charsetUri = /^data:application\/json;charset=utf-?8,/;
        let uri = /^data:application\/json,/;
        if (charsetUri.test(text) || uri.test(text)) {
          return decodeURIComponent(text.substr(RegExp.lastMatch.length));
        }
        if (baseCharsetUri.test(text) || baseUri.test(text)) {
          return fromBase64(text.substr(RegExp.lastMatch.length));
        }
        let encoding = text.match(/data:application\/json;([^,]+),/)[1];
        throw new Error("Unsupported source map encoding " + encoding);
      }
      loadFile(path) {
        this.root = dirname(path);
        if (existsSync(path)) {
          this.mapFile = path;
          return readFileSync(path, "utf-8").toString().trim();
        }
      }
      loadMap(file, prev) {
        if (prev === false)
          return false;
        if (prev) {
          if (typeof prev === "string") {
            return prev;
          } else if (typeof prev === "function") {
            let prevPath = prev(file);
            if (prevPath) {
              let map = this.loadFile(prevPath);
              if (!map) {
                throw new Error("Unable to load previous source map: " + prevPath.toString());
              }
              return map;
            }
          } else if (prev instanceof SourceMapConsumer) {
            return SourceMapGenerator2.fromSourceMap(prev).toString();
          } else if (prev instanceof SourceMapGenerator2) {
            return prev.toString();
          } else if (this.isMap(prev)) {
            return JSON.stringify(prev);
          } else {
            throw new Error("Unsupported previous source map format: " + prev.toString());
          }
        } else if (this.inline) {
          return this.decodeInline(this.annotation);
        } else if (this.annotation) {
          let map = this.annotation;
          if (file)
            map = join(dirname(file), map);
          return this.loadFile(map);
        }
      }
      isMap(map) {
        if (typeof map !== "object")
          return false;
        return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
      }
    };
    module2.exports = PreviousMap;
    PreviousMap.default = PreviousMap;
  }
});

// node_modules/postcss/lib/input.js
var require_input = __commonJS({
  "node_modules/postcss/lib/input.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator: SourceMapGenerator2 } = require_source_map();
    var { fileURLToPath, pathToFileURL } = require("url");
    var { resolve, isAbsolute } = require("path");
    var { nanoid } = require_non_secure();
    var terminalHighlight = require_terminal_highlight();
    var CssSyntaxError2 = require_css_syntax_error();
    var PreviousMap = require_previous_map();
    var fromOffsetCache = Symbol("fromOffsetCache");
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator2);
    var pathAvailable = Boolean(resolve && isAbsolute);
    var Input2 = class {
      constructor(css, opts = {}) {
        if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
          throw new Error(`PostCSS received ${css} instead of CSS string`);
        }
        this.css = css.toString();
        if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
          this.hasBOM = true;
          this.css = this.css.slice(1);
        } else {
          this.hasBOM = false;
        }
        if (opts.from) {
          if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
            this.file = opts.from;
          } else {
            this.file = resolve(opts.from);
          }
        }
        if (pathAvailable && sourceMapAvailable) {
          let map = new PreviousMap(this.css, opts);
          if (map.text) {
            this.map = map;
            let file = map.consumer().file;
            if (!this.file && file)
              this.file = this.mapResolve(file);
          }
        }
        if (!this.file) {
          this.id = "<input css " + nanoid(6) + ">";
        }
        if (this.map)
          this.map.file = this.from;
      }
      fromOffset(offset) {
        let lastLine, lineToIndex;
        if (!this[fromOffsetCache]) {
          let lines = this.css.split("\n");
          lineToIndex = new Array(lines.length);
          let prevIndex = 0;
          for (let i = 0, l = lines.length; i < l; i++) {
            lineToIndex[i] = prevIndex;
            prevIndex += lines[i].length + 1;
          }
          this[fromOffsetCache] = lineToIndex;
        } else {
          lineToIndex = this[fromOffsetCache];
        }
        lastLine = lineToIndex[lineToIndex.length - 1];
        let min = 0;
        if (offset >= lastLine) {
          min = lineToIndex.length - 1;
        } else {
          let max = lineToIndex.length - 2;
          let mid;
          while (min < max) {
            mid = min + (max - min >> 1);
            if (offset < lineToIndex[mid]) {
              max = mid - 1;
            } else if (offset >= lineToIndex[mid + 1]) {
              min = mid + 1;
            } else {
              min = mid;
              break;
            }
          }
        }
        return {
          line: min + 1,
          col: offset - lineToIndex[min] + 1
        };
      }
      error(message, line, column, opts = {}) {
        let result, endLine, endColumn;
        if (line && typeof line === "object") {
          let start = line;
          let end = column;
          if (typeof line.offset === "number") {
            let pos = this.fromOffset(start.offset);
            line = pos.line;
            column = pos.col;
          } else {
            line = start.line;
            column = start.column;
          }
          if (typeof end.offset === "number") {
            let pos = this.fromOffset(end.offset);
            endLine = pos.line;
            endColumn = pos.col;
          } else {
            endLine = end.line;
            endColumn = end.column;
          }
        } else if (!column) {
          let pos = this.fromOffset(line);
          line = pos.line;
          column = pos.col;
        }
        let origin = this.origin(line, column, endLine, endColumn);
        if (origin) {
          result = new CssSyntaxError2(message, origin.endLine === void 0 ? origin.line : { line: origin.line, column: origin.column }, origin.endLine === void 0 ? origin.column : { line: origin.endLine, column: origin.endColumn }, origin.source, origin.file, opts.plugin);
        } else {
          result = new CssSyntaxError2(message, endLine === void 0 ? line : { line, column }, endLine === void 0 ? column : { line: endLine, column: endColumn }, this.css, this.file, opts.plugin);
        }
        result.input = { line, column, endLine, endColumn, source: this.css };
        if (this.file) {
          if (pathToFileURL) {
            result.input.url = pathToFileURL(this.file).toString();
          }
          result.input.file = this.file;
        }
        return result;
      }
      origin(line, column, endLine, endColumn) {
        if (!this.map)
          return false;
        let consumer = this.map.consumer();
        let from = consumer.originalPositionFor({ line, column });
        if (!from.source)
          return false;
        let to;
        if (typeof endLine === "number") {
          to = consumer.originalPositionFor({ line: endLine, column: endColumn });
        }
        let fromUrl;
        if (isAbsolute(from.source)) {
          fromUrl = pathToFileURL(from.source);
        } else {
          fromUrl = new URL(from.source, this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile));
        }
        let result = {
          url: fromUrl.toString(),
          line: from.line,
          column: from.column,
          endLine: to && to.line,
          endColumn: to && to.column
        };
        if (fromUrl.protocol === "file:") {
          if (fileURLToPath) {
            result.file = fileURLToPath(fromUrl);
          } else {
            throw new Error(`file: protocol is not available in this PostCSS build`);
          }
        }
        let source = consumer.sourceContentFor(from.source);
        if (source)
          result.source = source;
        return result;
      }
      mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
          return file;
        }
        return resolve(this.map.consumer().sourceRoot || this.map.root || ".", file);
      }
      get from() {
        return this.file || this.id;
      }
      toJSON() {
        let json = {};
        for (let name of ["hasBOM", "css", "file", "id"]) {
          if (this[name] != null) {
            json[name] = this[name];
          }
        }
        if (this.map) {
          json.map = __spreadValues({}, this.map);
          if (json.map.consumerCache) {
            json.map.consumerCache = void 0;
          }
        }
        return json;
      }
    };
    module2.exports = Input2;
    Input2.default = Input2;
    if (terminalHighlight && terminalHighlight.registerInput) {
      terminalHighlight.registerInput(Input2);
    }
  }
});

// node_modules/postcss/lib/map-generator.js
var require_map_generator = __commonJS({
  "node_modules/postcss/lib/map-generator.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator: SourceMapGenerator2 } = require_source_map();
    var { dirname, resolve, relative, sep } = require("path");
    var { pathToFileURL } = require("url");
    var Input2 = require_input();
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator2);
    var pathAvailable = Boolean(dirname && resolve && relative && sep);
    var MapGenerator = class {
      constructor(stringify4, root2, opts, cssString) {
        this.stringify = stringify4;
        this.mapOpts = opts.map || {};
        this.root = root2;
        this.opts = opts;
        this.css = cssString;
        this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
      }
      isMap() {
        if (typeof this.opts.map !== "undefined") {
          return !!this.opts.map;
        }
        return this.previous().length > 0;
      }
      previous() {
        if (!this.previousMaps) {
          this.previousMaps = [];
          if (this.root) {
            this.root.walk((node) => {
              if (node.source && node.source.input.map) {
                let map = node.source.input.map;
                if (!this.previousMaps.includes(map)) {
                  this.previousMaps.push(map);
                }
              }
            });
          } else {
            let input = new Input2(this.css, this.opts);
            if (input.map)
              this.previousMaps.push(input.map);
          }
        }
        return this.previousMaps;
      }
      isInline() {
        if (typeof this.mapOpts.inline !== "undefined") {
          return this.mapOpts.inline;
        }
        let annotation = this.mapOpts.annotation;
        if (typeof annotation !== "undefined" && annotation !== true) {
          return false;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.inline);
        }
        return true;
      }
      isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent !== "undefined") {
          return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.withContent());
        }
        return true;
      }
      clearAnnotation() {
        if (this.mapOpts.annotation === false)
          return;
        if (this.root) {
          let node;
          for (let i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type !== "comment")
              continue;
            if (node.text.indexOf("# sourceMappingURL=") === 0) {
              this.root.removeChild(i);
            }
          }
        } else if (this.css) {
          this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, "");
        }
      }
      setSourcesContent() {
        let already = {};
        if (this.root) {
          this.root.walk((node) => {
            if (node.source) {
              let from = node.source.input.from;
              if (from && !already[from]) {
                already[from] = true;
                let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
                this.map.setSourceContent(fromUrl, node.source.input.css);
              }
            }
          });
        } else if (this.css) {
          let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
          this.map.setSourceContent(from, this.css);
        }
      }
      applyPrevMaps() {
        for (let prev of this.previous()) {
          let from = this.toUrl(this.path(prev.file));
          let root2 = prev.root || dirname(prev.file);
          let map;
          if (this.mapOpts.sourcesContent === false) {
            map = new SourceMapConsumer(prev.text);
            if (map.sourcesContent) {
              map.sourcesContent = map.sourcesContent.map(() => null);
            }
          } else {
            map = prev.consumer();
          }
          this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
        }
      }
      isAnnotation() {
        if (this.isInline()) {
          return true;
        }
        if (typeof this.mapOpts.annotation !== "undefined") {
          return this.mapOpts.annotation;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.annotation);
        }
        return true;
      }
      toBase64(str) {
        if (Buffer) {
          return Buffer.from(str).toString("base64");
        } else {
          return window.btoa(unescape(encodeURIComponent(str)));
        }
      }
      addAnnotation() {
        let content;
        if (this.isInline()) {
          content = "data:application/json;base64," + this.toBase64(this.map.toString());
        } else if (typeof this.mapOpts.annotation === "string") {
          content = this.mapOpts.annotation;
        } else if (typeof this.mapOpts.annotation === "function") {
          content = this.mapOpts.annotation(this.opts.to, this.root);
        } else {
          content = this.outputFile() + ".map";
        }
        let eol = "\n";
        if (this.css.includes("\r\n"))
          eol = "\r\n";
        this.css += eol + "/*# sourceMappingURL=" + content + " */";
      }
      outputFile() {
        if (this.opts.to) {
          return this.path(this.opts.to);
        } else if (this.opts.from) {
          return this.path(this.opts.from);
        } else {
          return "to.css";
        }
      }
      generateMap() {
        if (this.root) {
          this.generateString();
        } else if (this.previous().length === 1) {
          let prev = this.previous()[0].consumer();
          prev.file = this.outputFile();
          this.map = SourceMapGenerator2.fromSourceMap(prev);
        } else {
          this.map = new SourceMapGenerator2({ file: this.outputFile() });
          this.map.addMapping({
            source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>",
            generated: { line: 1, column: 0 },
            original: { line: 1, column: 0 }
          });
        }
        if (this.isSourcesContent())
          this.setSourcesContent();
        if (this.root && this.previous().length > 0)
          this.applyPrevMaps();
        if (this.isAnnotation())
          this.addAnnotation();
        if (this.isInline()) {
          return [this.css];
        } else {
          return [this.css, this.map];
        }
      }
      path(file) {
        if (file.indexOf("<") === 0)
          return file;
        if (/^\w+:\/\//.test(file))
          return file;
        if (this.mapOpts.absolute)
          return file;
        let from = this.opts.to ? dirname(this.opts.to) : ".";
        if (typeof this.mapOpts.annotation === "string") {
          from = dirname(resolve(from, this.mapOpts.annotation));
        }
        file = relative(from, file);
        return file;
      }
      toUrl(path) {
        if (sep === "\\") {
          path = path.replace(/\\/g, "/");
        }
        return encodeURI(path).replace(/[#?]/g, encodeURIComponent);
      }
      toFileUrl(path) {
        if (pathToFileURL) {
          return pathToFileURL(path).toString();
        } else {
          throw new Error("`map.absolute` option is not available in this PostCSS build");
        }
      }
      sourcePath(node) {
        if (this.mapOpts.from) {
          return this.toUrl(this.mapOpts.from);
        } else if (this.usesFileUrls) {
          return this.toFileUrl(node.source.input.from);
        } else {
          return this.toUrl(this.path(node.source.input.from));
        }
      }
      generateString() {
        this.css = "";
        this.map = new SourceMapGenerator2({ file: this.outputFile() });
        let line = 1;
        let column = 1;
        let noSource = "<no source>";
        let mapping = {
          source: "",
          generated: { line: 0, column: 0 },
          original: { line: 0, column: 0 }
        };
        let lines, last;
        this.stringify(this.root, (str, node, type) => {
          this.css += str;
          if (node && type !== "end") {
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            if (node.source && node.source.start) {
              mapping.source = this.sourcePath(node);
              mapping.original.line = node.source.start.line;
              mapping.original.column = node.source.start.column - 1;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              this.map.addMapping(mapping);
            }
          }
          lines = str.match(/\n/g);
          if (lines) {
            line += lines.length;
            last = str.lastIndexOf("\n");
            column = str.length - last;
          } else {
            column += str.length;
          }
          if (node && type !== "start") {
            let p = node.parent || { raws: {} };
            if (node.type !== "decl" || node !== p.last || p.raws.semicolon) {
              if (node.source && node.source.end) {
                mapping.source = this.sourcePath(node);
                mapping.original.line = node.source.end.line;
                mapping.original.column = node.source.end.column - 1;
                mapping.generated.line = line;
                mapping.generated.column = column - 2;
                this.map.addMapping(mapping);
              } else {
                mapping.source = noSource;
                mapping.original.line = 1;
                mapping.original.column = 0;
                mapping.generated.line = line;
                mapping.generated.column = column - 1;
                this.map.addMapping(mapping);
              }
            }
          }
        });
      }
      generate() {
        this.clearAnnotation();
        if (pathAvailable && sourceMapAvailable && this.isMap()) {
          return this.generateMap();
        } else {
          let result = "";
          this.stringify(this.root, (i) => {
            result += i;
          });
          return [result];
        }
      }
    };
    module2.exports = MapGenerator;
  }
});

// node_modules/postcss/lib/comment.js
var require_comment = __commonJS({
  "node_modules/postcss/lib/comment.js"(exports, module2) {
    "use strict";
    var Node2 = require_node();
    var Comment3 = class extends Node2 {
      constructor(defaults) {
        super(defaults);
        this.type = "comment";
      }
    };
    module2.exports = Comment3;
    Comment3.default = Comment3;
  }
});

// node_modules/postcss/lib/container.js
var require_container = __commonJS({
  "node_modules/postcss/lib/container.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var Declaration2 = require_declaration();
    var Comment3 = require_comment();
    var Node2 = require_node();
    var parse4;
    var Rule2;
    var AtRule2;
    var Root2;
    function cleanSource(nodes) {
      return nodes.map((i) => {
        if (i.nodes)
          i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
      });
    }
    function markDirtyUp(node) {
      node[isClean] = false;
      if (node.proxyOf.nodes) {
        for (let i of node.proxyOf.nodes) {
          markDirtyUp(i);
        }
      }
    }
    var Container3 = class extends Node2 {
      push(child) {
        child.parent = this;
        this.proxyOf.nodes.push(child);
        return this;
      }
      each(callback) {
        if (!this.proxyOf.nodes)
          return void 0;
        let iterator = this.getIterator();
        let index2, result;
        while (this.indexes[iterator] < this.proxyOf.nodes.length) {
          index2 = this.indexes[iterator];
          result = callback(this.proxyOf.nodes[index2], index2);
          if (result === false)
            break;
          this.indexes[iterator] += 1;
        }
        delete this.indexes[iterator];
        return result;
      }
      walk(callback) {
        return this.each((child, i) => {
          let result;
          try {
            result = callback(child, i);
          } catch (e) {
            throw child.addToError(e);
          }
          if (result !== false && child.walk) {
            result = child.walk(callback);
          }
          return result;
        });
      }
      walkDecls(prop, callback) {
        if (!callback) {
          callback = prop;
          return this.walk((child, i) => {
            if (child.type === "decl") {
              return callback(child, i);
            }
          });
        }
        if (prop instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "decl" && prop.test(child.prop)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "decl" && child.prop === prop) {
            return callback(child, i);
          }
        });
      }
      walkRules(selector, callback) {
        if (!callback) {
          callback = selector;
          return this.walk((child, i) => {
            if (child.type === "rule") {
              return callback(child, i);
            }
          });
        }
        if (selector instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "rule" && selector.test(child.selector)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "rule" && child.selector === selector) {
            return callback(child, i);
          }
        });
      }
      walkAtRules(name, callback) {
        if (!callback) {
          callback = name;
          return this.walk((child, i) => {
            if (child.type === "atrule") {
              return callback(child, i);
            }
          });
        }
        if (name instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "atrule" && name.test(child.name)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "atrule" && child.name === name) {
            return callback(child, i);
          }
        });
      }
      walkComments(callback) {
        return this.walk((child, i) => {
          if (child.type === "comment") {
            return callback(child, i);
          }
        });
      }
      append(...children) {
        for (let child of children) {
          let nodes = this.normalize(child, this.last);
          for (let node of nodes)
            this.proxyOf.nodes.push(node);
        }
        this.markDirty();
        return this;
      }
      prepend(...children) {
        children = children.reverse();
        for (let child of children) {
          let nodes = this.normalize(child, this.first, "prepend").reverse();
          for (let node of nodes)
            this.proxyOf.nodes.unshift(node);
          for (let id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      cleanRaws(keepBetween) {
        super.cleanRaws(keepBetween);
        if (this.nodes) {
          for (let node of this.nodes)
            node.cleanRaws(keepBetween);
        }
      }
      insertBefore(exist, add) {
        let existIndex = this.index(exist);
        let type = exist === 0 ? "prepend" : false;
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex, 0, node);
        let index2;
        for (let id in this.indexes) {
          index2 = this.indexes[id];
          if (existIndex <= index2) {
            this.indexes[id] = index2 + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      insertAfter(exist, add) {
        let existIndex = this.index(exist);
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex + 1, 0, node);
        let index2;
        for (let id in this.indexes) {
          index2 = this.indexes[id];
          if (existIndex < index2) {
            this.indexes[id] = index2 + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      removeChild(child) {
        child = this.index(child);
        this.proxyOf.nodes[child].parent = void 0;
        this.proxyOf.nodes.splice(child, 1);
        let index2;
        for (let id in this.indexes) {
          index2 = this.indexes[id];
          if (index2 >= child) {
            this.indexes[id] = index2 - 1;
          }
        }
        this.markDirty();
        return this;
      }
      removeAll() {
        for (let node of this.proxyOf.nodes)
          node.parent = void 0;
        this.proxyOf.nodes = [];
        this.markDirty();
        return this;
      }
      replaceValues(pattern, opts, callback) {
        if (!callback) {
          callback = opts;
          opts = {};
        }
        this.walkDecls((decl2) => {
          if (opts.props && !opts.props.includes(decl2.prop))
            return;
          if (opts.fast && !decl2.value.includes(opts.fast))
            return;
          decl2.value = decl2.value.replace(pattern, callback);
        });
        this.markDirty();
        return this;
      }
      every(condition) {
        return this.nodes.every(condition);
      }
      some(condition) {
        return this.nodes.some(condition);
      }
      index(child) {
        if (typeof child === "number")
          return child;
        if (child.proxyOf)
          child = child.proxyOf;
        return this.proxyOf.nodes.indexOf(child);
      }
      get first() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[0];
      }
      get last() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
      normalize(nodes, sample) {
        if (typeof nodes === "string") {
          nodes = cleanSource(parse4(nodes).nodes);
        } else if (Array.isArray(nodes)) {
          nodes = nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type === "root" && this.type !== "document") {
          nodes = nodes.nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type) {
          nodes = [nodes];
        } else if (nodes.prop) {
          if (typeof nodes.value === "undefined") {
            throw new Error("Value field is missed in node creation");
          } else if (typeof nodes.value !== "string") {
            nodes.value = String(nodes.value);
          }
          nodes = [new Declaration2(nodes)];
        } else if (nodes.selector) {
          nodes = [new Rule2(nodes)];
        } else if (nodes.name) {
          nodes = [new AtRule2(nodes)];
        } else if (nodes.text) {
          nodes = [new Comment3(nodes)];
        } else {
          throw new Error("Unknown node type in node creation");
        }
        let processed = nodes.map((i) => {
          if (!i[my])
            Container3.rebuild(i);
          i = i.proxyOf;
          if (i.parent)
            i.parent.removeChild(i);
          if (i[isClean])
            markDirtyUp(i);
          if (typeof i.raws.before === "undefined") {
            if (sample && typeof sample.raws.before !== "undefined") {
              i.raws.before = sample.raws.before.replace(/\S/g, "");
            }
          }
          i.parent = this.proxyOf;
          return i;
        });
        return processed;
      }
      getProxyProcessor() {
        return {
          set(node, prop, value) {
            if (node[prop] === value)
              return true;
            node[prop] = value;
            if (prop === "name" || prop === "params" || prop === "selector") {
              node.markDirty();
            }
            return true;
          },
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (!node[prop]) {
              return node[prop];
            } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
              return (...args) => {
                return node[prop](...args.map((i) => {
                  if (typeof i === "function") {
                    return (child, index2) => i(child.toProxy(), index2);
                  } else {
                    return i;
                  }
                }));
              };
            } else if (prop === "every" || prop === "some") {
              return (cb) => {
                return node[prop]((child, ...other) => cb(child.toProxy(), ...other));
              };
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else if (prop === "nodes") {
              return node.nodes.map((i) => i.toProxy());
            } else if (prop === "first" || prop === "last") {
              return node[prop].toProxy();
            } else {
              return node[prop];
            }
          }
        };
      }
      getIterator() {
        if (!this.lastEach)
          this.lastEach = 0;
        if (!this.indexes)
          this.indexes = {};
        this.lastEach += 1;
        let iterator = this.lastEach;
        this.indexes[iterator] = 0;
        return iterator;
      }
    };
    Container3.registerParse = (dependant) => {
      parse4 = dependant;
    };
    Container3.registerRule = (dependant) => {
      Rule2 = dependant;
    };
    Container3.registerAtRule = (dependant) => {
      AtRule2 = dependant;
    };
    Container3.registerRoot = (dependant) => {
      Root2 = dependant;
    };
    module2.exports = Container3;
    Container3.default = Container3;
    Container3.rebuild = (node) => {
      if (node.type === "atrule") {
        Object.setPrototypeOf(node, AtRule2.prototype);
      } else if (node.type === "rule") {
        Object.setPrototypeOf(node, Rule2.prototype);
      } else if (node.type === "decl") {
        Object.setPrototypeOf(node, Declaration2.prototype);
      } else if (node.type === "comment") {
        Object.setPrototypeOf(node, Comment3.prototype);
      } else if (node.type === "root") {
        Object.setPrototypeOf(node, Root2.prototype);
      }
      node[my] = true;
      if (node.nodes) {
        node.nodes.forEach((child) => {
          Container3.rebuild(child);
        });
      }
    };
  }
});

// node_modules/postcss/lib/document.js
var require_document = __commonJS({
  "node_modules/postcss/lib/document.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var LazyResult;
    var Processor2;
    var Document2 = class extends Container3 {
      constructor(defaults) {
        super(__spreadValues({ type: "document" }, defaults));
        if (!this.nodes) {
          this.nodes = [];
        }
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor2(), this, opts);
        return lazy.stringify();
      }
    };
    Document2.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Document2.registerProcessor = (dependant) => {
      Processor2 = dependant;
    };
    module2.exports = Document2;
    Document2.default = Document2;
  }
});

// node_modules/postcss/lib/warn-once.js
var require_warn_once = __commonJS({
  "node_modules/postcss/lib/warn-once.js"(exports, module2) {
    "use strict";
    var printed = {};
    module2.exports = function warnOnce(message) {
      if (printed[message])
        return;
      printed[message] = true;
      if (typeof console !== "undefined" && console.warn) {
        console.warn(message);
      }
    };
  }
});

// node_modules/postcss/lib/warning.js
var require_warning = __commonJS({
  "node_modules/postcss/lib/warning.js"(exports, module2) {
    "use strict";
    var Warning2 = class {
      constructor(text, opts = {}) {
        this.type = "warning";
        this.text = text;
        if (opts.node && opts.node.source) {
          let range = opts.node.rangeBy(opts);
          this.line = range.start.line;
          this.column = range.start.column;
          this.endLine = range.end.line;
          this.endColumn = range.end.column;
        }
        for (let opt in opts)
          this[opt] = opts[opt];
      }
      toString() {
        if (this.node) {
          return this.node.error(this.text, {
            plugin: this.plugin,
            index: this.index,
            word: this.word
          }).message;
        }
        if (this.plugin) {
          return this.plugin + ": " + this.text;
        }
        return this.text;
      }
    };
    module2.exports = Warning2;
    Warning2.default = Warning2;
  }
});

// node_modules/postcss/lib/result.js
var require_result = __commonJS({
  "node_modules/postcss/lib/result.js"(exports, module2) {
    "use strict";
    var Warning2 = require_warning();
    var Result2 = class {
      constructor(processor, root2, opts) {
        this.processor = processor;
        this.messages = [];
        this.root = root2;
        this.opts = opts;
        this.css = void 0;
        this.map = void 0;
      }
      toString() {
        return this.css;
      }
      warn(text, opts = {}) {
        if (!opts.plugin) {
          if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
            opts.plugin = this.lastPlugin.postcssPlugin;
          }
        }
        let warning = new Warning2(text, opts);
        this.messages.push(warning);
        return warning;
      }
      warnings() {
        return this.messages.filter((i) => i.type === "warning");
      }
      get content() {
        return this.css;
      }
    };
    module2.exports = Result2;
    Result2.default = Result2;
  }
});

// node_modules/postcss/lib/at-rule.js
var require_at_rule = __commonJS({
  "node_modules/postcss/lib/at-rule.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var AtRule2 = class extends Container3 {
      constructor(defaults) {
        super(defaults);
        this.type = "atrule";
      }
      append(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.append(...children);
      }
      prepend(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.prepend(...children);
      }
    };
    module2.exports = AtRule2;
    AtRule2.default = AtRule2;
    Container3.registerAtRule(AtRule2);
  }
});

// node_modules/postcss/lib/root.js
var require_root = __commonJS({
  "node_modules/postcss/lib/root.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var LazyResult;
    var Processor2;
    var Root2 = class extends Container3 {
      constructor(defaults) {
        super(defaults);
        this.type = "root";
        if (!this.nodes)
          this.nodes = [];
      }
      removeChild(child, ignore) {
        let index2 = this.index(child);
        if (!ignore && index2 === 0 && this.nodes.length > 1) {
          this.nodes[1].raws.before = this.nodes[index2].raws.before;
        }
        return super.removeChild(child);
      }
      normalize(child, sample, type) {
        let nodes = super.normalize(child);
        if (sample) {
          if (type === "prepend") {
            if (this.nodes.length > 1) {
              sample.raws.before = this.nodes[1].raws.before;
            } else {
              delete sample.raws.before;
            }
          } else if (this.first !== sample) {
            for (let node of nodes) {
              node.raws.before = sample.raws.before;
            }
          }
        }
        return nodes;
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor2(), this, opts);
        return lazy.stringify();
      }
    };
    Root2.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Root2.registerProcessor = (dependant) => {
      Processor2 = dependant;
    };
    module2.exports = Root2;
    Root2.default = Root2;
    Container3.registerRoot(Root2);
  }
});

// node_modules/postcss/lib/list.js
var require_list = __commonJS({
  "node_modules/postcss/lib/list.js"(exports, module2) {
    "use strict";
    var list2 = {
      split(string, separators, last) {
        let array = [];
        let current = "";
        let split = false;
        let func = 0;
        let inQuote = false;
        let prevQuote = "";
        let escape = false;
        for (let letter of string) {
          if (escape) {
            escape = false;
          } else if (letter === "\\") {
            escape = true;
          } else if (inQuote) {
            if (letter === prevQuote) {
              inQuote = false;
            }
          } else if (letter === '"' || letter === "'") {
            inQuote = true;
            prevQuote = letter;
          } else if (letter === "(") {
            func += 1;
          } else if (letter === ")") {
            if (func > 0)
              func -= 1;
          } else if (func === 0) {
            if (separators.includes(letter))
              split = true;
          }
          if (split) {
            if (current !== "")
              array.push(current.trim());
            current = "";
            split = false;
          } else {
            current += letter;
          }
        }
        if (last || current !== "")
          array.push(current.trim());
        return array;
      },
      space(string) {
        let spaces = [" ", "\n", "	"];
        return list2.split(string, spaces);
      },
      comma(string) {
        return list2.split(string, [","], true);
      }
    };
    module2.exports = list2;
    list2.default = list2;
  }
});

// node_modules/postcss/lib/rule.js
var require_rule = __commonJS({
  "node_modules/postcss/lib/rule.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var list2 = require_list();
    var Rule2 = class extends Container3 {
      constructor(defaults) {
        super(defaults);
        this.type = "rule";
        if (!this.nodes)
          this.nodes = [];
      }
      get selectors() {
        return list2.comma(this.selector);
      }
      set selectors(values) {
        let match = this.selector ? this.selector.match(/,\s*/) : null;
        let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
        this.selector = values.join(sep);
      }
    };
    module2.exports = Rule2;
    Rule2.default = Rule2;
    Container3.registerRule(Rule2);
  }
});

// node_modules/postcss/lib/parser.js
var require_parser = __commonJS({
  "node_modules/postcss/lib/parser.js"(exports, module2) {
    "use strict";
    var Declaration2 = require_declaration();
    var tokenizer = require_tokenize();
    var Comment3 = require_comment();
    var AtRule2 = require_at_rule();
    var Root2 = require_root();
    var Rule2 = require_rule();
    var SAFE_COMMENT_NEIGHBOR = {
      empty: true,
      space: true
    };
    function findLastWithPosition(tokens) {
      for (let i = tokens.length - 1; i >= 0; i--) {
        let token = tokens[i];
        let pos = token[3] || token[2];
        if (pos)
          return pos;
      }
    }
    var Parser2 = class {
      constructor(input) {
        this.input = input;
        this.root = new Root2();
        this.current = this.root;
        this.spaces = "";
        this.semicolon = false;
        this.customProperty = false;
        this.createTokenizer();
        this.root.source = { input, start: { offset: 0, line: 1, column: 1 } };
      }
      createTokenizer() {
        this.tokenizer = tokenizer(this.input);
      }
      parse() {
        let token;
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          switch (token[0]) {
            case "space":
              this.spaces += token[1];
              break;
            case ";":
              this.freeSemicolon(token);
              break;
            case "}":
              this.end(token);
              break;
            case "comment":
              this.comment(token);
              break;
            case "at-word":
              this.atrule(token);
              break;
            case "{":
              this.emptyRule(token);
              break;
            default:
              this.other(token);
              break;
          }
        }
        this.endFile();
      }
      comment(token) {
        let node = new Comment3();
        this.init(node, token[2]);
        node.source.end = this.getPosition(token[3] || token[2]);
        let text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.right = match[3];
        }
      }
      emptyRule(token) {
        let node = new Rule2();
        this.init(node, token[2]);
        node.selector = "";
        node.raws.between = "";
        this.current = node;
      }
      other(start) {
        let end = false;
        let type = null;
        let colon = false;
        let bracket = null;
        let brackets = [];
        let customProperty = start[1].startsWith("--");
        let tokens = [];
        let token = start;
        while (token) {
          type = token[0];
          tokens.push(token);
          if (type === "(" || type === "[") {
            if (!bracket)
              bracket = token;
            brackets.push(type === "(" ? ")" : "]");
          } else if (customProperty && colon && type === "{") {
            if (!bracket)
              bracket = token;
            brackets.push("}");
          } else if (brackets.length === 0) {
            if (type === ";") {
              if (colon) {
                this.decl(tokens, customProperty);
                return;
              } else {
                break;
              }
            } else if (type === "{") {
              this.rule(tokens);
              return;
            } else if (type === "}") {
              this.tokenizer.back(tokens.pop());
              end = true;
              break;
            } else if (type === ":") {
              colon = true;
            }
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
            if (brackets.length === 0)
              bracket = null;
          }
          token = this.tokenizer.nextToken();
        }
        if (this.tokenizer.endOfFile())
          end = true;
        if (brackets.length > 0)
          this.unclosedBracket(bracket);
        if (end && colon) {
          if (!customProperty) {
            while (tokens.length) {
              token = tokens[tokens.length - 1][0];
              if (token !== "space" && token !== "comment")
                break;
              this.tokenizer.back(tokens.pop());
            }
          }
          this.decl(tokens, customProperty);
        } else {
          this.unknownWord(tokens);
        }
      }
      rule(tokens) {
        tokens.pop();
        let node = new Rule2();
        this.init(node, tokens[0][2]);
        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, "selector", tokens);
        this.current = node;
      }
      decl(tokens, customProperty) {
        let node = new Declaration2();
        this.init(node, tokens[0][2]);
        let last = tokens[tokens.length - 1];
        if (last[0] === ";") {
          this.semicolon = true;
          tokens.pop();
        }
        node.source.end = this.getPosition(last[3] || last[2] || findLastWithPosition(tokens));
        while (tokens[0][0] !== "word") {
          if (tokens.length === 1)
            this.unknownWord(tokens);
          node.raws.before += tokens.shift()[1];
        }
        node.source.start = this.getPosition(tokens[0][2]);
        node.prop = "";
        while (tokens.length) {
          let type = tokens[0][0];
          if (type === ":" || type === "space" || type === "comment") {
            break;
          }
          node.prop += tokens.shift()[1];
        }
        node.raws.between = "";
        let token;
        while (tokens.length) {
          token = tokens.shift();
          if (token[0] === ":") {
            node.raws.between += token[1];
            break;
          } else {
            if (token[0] === "word" && /\w/.test(token[1])) {
              this.unknownWord([token]);
            }
            node.raws.between += token[1];
          }
        }
        if (node.prop[0] === "_" || node.prop[0] === "*") {
          node.raws.before += node.prop[0];
          node.prop = node.prop.slice(1);
        }
        let firstSpaces = [];
        let next;
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          firstSpaces.push(tokens.shift());
        }
        this.precheckMissedSemicolon(tokens);
        for (let i = tokens.length - 1; i >= 0; i--) {
          token = tokens[i];
          if (token[1].toLowerCase() === "!important") {
            node.important = true;
            let string = this.stringFrom(tokens, i);
            string = this.spacesFromEnd(tokens) + string;
            if (string !== " !important")
              node.raws.important = string;
            break;
          } else if (token[1].toLowerCase() === "important") {
            let cache = tokens.slice(0);
            let str = "";
            for (let j = i; j > 0; j--) {
              let type = cache[j][0];
              if (str.trim().indexOf("!") === 0 && type !== "space") {
                break;
              }
              str = cache.pop()[1] + str;
            }
            if (str.trim().indexOf("!") === 0) {
              node.important = true;
              node.raws.important = str;
              tokens = cache;
            }
          }
          if (token[0] !== "space" && token[0] !== "comment") {
            break;
          }
        }
        let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
        if (hasWord) {
          node.raws.between += firstSpaces.map((i) => i[1]).join("");
          firstSpaces = [];
        }
        this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
        if (node.value.includes(":") && !customProperty) {
          this.checkMissedSemicolon(tokens);
        }
      }
      atrule(token) {
        let node = new AtRule2();
        node.name = token[1].slice(1);
        if (node.name === "") {
          this.unnamedAtrule(node, token);
        }
        this.init(node, token[2]);
        let type;
        let prev;
        let shift;
        let last = false;
        let open = false;
        let params = [];
        let brackets = [];
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          type = token[0];
          if (type === "(" || type === "[") {
            brackets.push(type === "(" ? ")" : "]");
          } else if (type === "{" && brackets.length > 0) {
            brackets.push("}");
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
          }
          if (brackets.length === 0) {
            if (type === ";") {
              node.source.end = this.getPosition(token[2]);
              this.semicolon = true;
              break;
            } else if (type === "{") {
              open = true;
              break;
            } else if (type === "}") {
              if (params.length > 0) {
                shift = params.length - 1;
                prev = params[shift];
                while (prev && prev[0] === "space") {
                  prev = params[--shift];
                }
                if (prev) {
                  node.source.end = this.getPosition(prev[3] || prev[2]);
                }
              }
              this.end(token);
              break;
            } else {
              params.push(token);
            }
          } else {
            params.push(token);
          }
          if (this.tokenizer.endOfFile()) {
            last = true;
            break;
          }
        }
        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
          node.raws.afterName = this.spacesAndCommentsFromStart(params);
          this.raw(node, "params", params);
          if (last) {
            token = params[params.length - 1];
            node.source.end = this.getPosition(token[3] || token[2]);
            this.spaces = node.raws.between;
            node.raws.between = "";
          }
        } else {
          node.raws.afterName = "";
          node.params = "";
        }
        if (open) {
          node.nodes = [];
          this.current = node;
        }
      }
      end(token) {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.spaces = "";
        if (this.current.parent) {
          this.current.source.end = this.getPosition(token[2]);
          this.current = this.current.parent;
        } else {
          this.unexpectedClose(token);
        }
      }
      endFile() {
        if (this.current.parent)
          this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      }
      freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
          let prev = this.current.nodes[this.current.nodes.length - 1];
          if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
            prev.raws.ownSemicolon = this.spaces;
            this.spaces = "";
          }
        }
      }
      getPosition(offset) {
        let pos = this.input.fromOffset(offset);
        return {
          offset,
          line: pos.line,
          column: pos.col
        };
      }
      init(node, offset) {
        this.current.push(node);
        node.source = {
          start: this.getPosition(offset),
          input: this.input
        };
        node.raws.before = this.spaces;
        this.spaces = "";
        if (node.type !== "comment")
          this.semicolon = false;
      }
      raw(node, prop, tokens, customProperty) {
        let token, type;
        let length = tokens.length;
        let value = "";
        let clean = true;
        let next, prev;
        for (let i = 0; i < length; i += 1) {
          token = tokens[i];
          type = token[0];
          if (type === "space" && i === length - 1 && !customProperty) {
            clean = false;
          } else if (type === "comment") {
            prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
            next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
            if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
              if (value.slice(-1) === ",") {
                clean = false;
              } else {
                value += token[1];
              }
            } else {
              clean = false;
            }
          } else {
            value += token[1];
          }
        }
        if (!clean) {
          let raw = tokens.reduce((all, i) => all + i[1], "");
          node.raws[prop] = { value, raw };
        }
        node[prop] = value;
      }
      spacesAndCommentsFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space" && lastTokenType !== "comment")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      spacesAndCommentsFromStart(tokens) {
        let next;
        let spaces = "";
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          spaces += tokens.shift()[1];
        }
        return spaces;
      }
      spacesFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      stringFrom(tokens, from) {
        let result = "";
        for (let i = from; i < tokens.length; i++) {
          result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
      }
      colon(tokens) {
        let brackets = 0;
        let token, type, prev;
        for (let [i, element] of tokens.entries()) {
          token = element;
          type = token[0];
          if (type === "(") {
            brackets += 1;
          }
          if (type === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i;
            }
          }
          prev = token;
        }
        return false;
      }
      unclosedBracket(bracket) {
        throw this.input.error("Unclosed bracket", { offset: bracket[2] }, { offset: bracket[2] + 1 });
      }
      unknownWord(tokens) {
        throw this.input.error("Unknown word", { offset: tokens[0][2] }, { offset: tokens[0][2] + tokens[0][1].length });
      }
      unexpectedClose(token) {
        throw this.input.error("Unexpected }", { offset: token[2] }, { offset: token[2] + 1 });
      }
      unclosedBlock() {
        let pos = this.current.source.start;
        throw this.input.error("Unclosed block", pos.line, pos.column);
      }
      doubleColon(token) {
        throw this.input.error("Double colon", { offset: token[2] }, { offset: token[2] + token[1].length });
      }
      unnamedAtrule(node, token) {
        throw this.input.error("At-rule without name", { offset: token[2] }, { offset: token[2] + token[1].length });
      }
      precheckMissedSemicolon() {
      }
      checkMissedSemicolon(tokens) {
        let colon = this.colon(tokens);
        if (colon === false)
          return;
        let founded = 0;
        let token;
        for (let j = colon - 1; j >= 0; j--) {
          token = tokens[j];
          if (token[0] !== "space") {
            founded += 1;
            if (founded === 2)
              break;
          }
        }
        throw this.input.error("Missed semicolon", token[0] === "word" ? token[3] + 1 : token[2]);
      }
    };
    module2.exports = Parser2;
  }
});

// node_modules/postcss/lib/parse.js
var require_parse = __commonJS({
  "node_modules/postcss/lib/parse.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var Parser2 = require_parser();
    var Input2 = require_input();
    function parse4(css, opts) {
      let input = new Input2(css, opts);
      let parser = new Parser2(input);
      try {
        parser.parse();
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          if (e.name === "CssSyntaxError" && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
              e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
            } else if (/\.sass/i.test(opts.from)) {
              e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
            } else if (/\.less$/i.test(opts.from)) {
              e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
            }
          }
        }
        throw e;
      }
      return parser.root;
    }
    module2.exports = parse4;
    parse4.default = parse4;
    Container3.registerParse(parse4);
  }
});

// node_modules/postcss/lib/lazy-result.js
var require_lazy_result = __commonJS({
  "node_modules/postcss/lib/lazy-result.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var MapGenerator = require_map_generator();
    var stringify4 = require_stringify();
    var Container3 = require_container();
    var Document2 = require_document();
    var warnOnce = require_warn_once();
    var Result2 = require_result();
    var parse4 = require_parse();
    var Root2 = require_root();
    var TYPE_TO_CLASS_NAME = {
      document: "Document",
      root: "Root",
      atrule: "AtRule",
      rule: "Rule",
      decl: "Declaration",
      comment: "Comment"
    };
    var PLUGIN_PROPS = {
      postcssPlugin: true,
      prepare: true,
      Once: true,
      Document: true,
      Root: true,
      Declaration: true,
      Rule: true,
      AtRule: true,
      Comment: true,
      DeclarationExit: true,
      RuleExit: true,
      AtRuleExit: true,
      CommentExit: true,
      RootExit: true,
      DocumentExit: true,
      OnceExit: true
    };
    var NOT_VISITORS = {
      postcssPlugin: true,
      prepare: true,
      Once: true
    };
    var CHILDREN = 0;
    function isPromise(obj) {
      return typeof obj === "object" && typeof obj.then === "function";
    }
    function getEvents(node) {
      let key = false;
      let type = TYPE_TO_CLASS_NAME[node.type];
      if (node.type === "decl") {
        key = node.prop.toLowerCase();
      } else if (node.type === "atrule") {
        key = node.name.toLowerCase();
      }
      if (key && node.append) {
        return [
          type,
          type + "-" + key,
          CHILDREN,
          type + "Exit",
          type + "Exit-" + key
        ];
      } else if (key) {
        return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
      } else if (node.append) {
        return [type, CHILDREN, type + "Exit"];
      } else {
        return [type, type + "Exit"];
      }
    }
    function toStack(node) {
      let events;
      if (node.type === "document") {
        events = ["Document", CHILDREN, "DocumentExit"];
      } else if (node.type === "root") {
        events = ["Root", CHILDREN, "RootExit"];
      } else {
        events = getEvents(node);
      }
      return {
        node,
        events,
        eventIndex: 0,
        visitors: [],
        visitorIndex: 0,
        iterator: 0
      };
    }
    function cleanMarks(node) {
      node[isClean] = false;
      if (node.nodes)
        node.nodes.forEach((i) => cleanMarks(i));
      return node;
    }
    var postcss2 = {};
    var LazyResult = class {
      constructor(processor, css, opts) {
        this.stringified = false;
        this.processed = false;
        let root2;
        if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
          root2 = cleanMarks(css);
        } else if (css instanceof LazyResult || css instanceof Result2) {
          root2 = cleanMarks(css.root);
          if (css.map) {
            if (typeof opts.map === "undefined")
              opts.map = {};
            if (!opts.map.inline)
              opts.map.inline = false;
            opts.map.prev = css.map;
          }
        } else {
          let parser = parse4;
          if (opts.syntax)
            parser = opts.syntax.parse;
          if (opts.parser)
            parser = opts.parser;
          if (parser.parse)
            parser = parser.parse;
          try {
            root2 = parser(css, opts);
          } catch (error2) {
            this.processed = true;
            this.error = error2;
          }
          if (root2 && !root2[my]) {
            Container3.rebuild(root2);
          }
        }
        this.result = new Result2(processor, root2, opts);
        this.helpers = __spreadProps(__spreadValues({}, postcss2), { result: this.result, postcss: postcss2 });
        this.plugins = this.processor.plugins.map((plugin2) => {
          if (typeof plugin2 === "object" && plugin2.prepare) {
            return __spreadValues(__spreadValues({}, plugin2), plugin2.prepare(this.result));
          } else {
            return plugin2;
          }
        });
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
      get processor() {
        return this.result.processor;
      }
      get opts() {
        return this.result.opts;
      }
      get css() {
        return this.stringify().css;
      }
      get content() {
        return this.stringify().content;
      }
      get map() {
        return this.stringify().map;
      }
      get root() {
        return this.sync().root;
      }
      get messages() {
        return this.sync().messages;
      }
      warnings() {
        return this.sync().warnings();
      }
      toString() {
        return this.css;
      }
      then(onFulfilled, onRejected) {
        if (process.env.NODE_ENV !== "production") {
          if (!("from" in this.opts)) {
            warnOnce("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        if (this.processed)
          return Promise.resolve(this.result);
        if (!this.processing) {
          this.processing = this.runAsync();
        }
        return this.processing;
      }
      sync() {
        if (this.error)
          throw this.error;
        if (this.processed)
          return this.result;
        this.processed = true;
        if (this.processing) {
          throw this.getAsyncError();
        }
        for (let plugin2 of this.plugins) {
          let promise = this.runOnRoot(plugin2);
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root2 = this.result.root;
          while (!root2[isClean]) {
            root2[isClean] = true;
            this.walkSync(root2);
          }
          if (this.listeners.OnceExit) {
            if (root2.type === "document") {
              for (let subRoot of root2.nodes) {
                this.visitSync(this.listeners.OnceExit, subRoot);
              }
            } else {
              this.visitSync(this.listeners.OnceExit, root2);
            }
          }
        }
        return this.result;
      }
      stringify() {
        if (this.error)
          throw this.error;
        if (this.stringified)
          return this.result;
        this.stringified = true;
        this.sync();
        let opts = this.result.opts;
        let str = stringify4;
        if (opts.syntax)
          str = opts.syntax.stringify;
        if (opts.stringifier)
          str = opts.stringifier;
        if (str.stringify)
          str = str.stringify;
        let map = new MapGenerator(str, this.result.root, this.result.opts);
        let data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];
        return this.result;
      }
      walkSync(node) {
        node[isClean] = true;
        let events = getEvents(node);
        for (let event of events) {
          if (event === CHILDREN) {
            if (node.nodes) {
              node.each((child) => {
                if (!child[isClean])
                  this.walkSync(child);
              });
            }
          } else {
            let visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, node.toProxy()))
                return;
            }
          }
        }
      }
      visitSync(visitors, node) {
        for (let [plugin2, visitor] of visitors) {
          this.result.lastPlugin = plugin2;
          let promise;
          try {
            promise = visitor(node, this.helpers);
          } catch (e) {
            throw this.handleError(e, node.proxyOf);
          }
          if (node.type !== "root" && node.type !== "document" && !node.parent) {
            return true;
          }
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
      }
      runOnRoot(plugin2) {
        this.result.lastPlugin = plugin2;
        try {
          if (typeof plugin2 === "object" && plugin2.Once) {
            if (this.result.root.type === "document") {
              let roots = this.result.root.nodes.map((root2) => plugin2.Once(root2, this.helpers));
              if (isPromise(roots[0])) {
                return Promise.all(roots);
              }
              return roots;
            }
            return plugin2.Once(this.result.root, this.helpers);
          } else if (typeof plugin2 === "function") {
            return plugin2(this.result.root, this.result);
          }
        } catch (error2) {
          throw this.handleError(error2);
        }
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(error2, node) {
        let plugin2 = this.result.lastPlugin;
        try {
          if (node)
            node.addToError(error2);
          this.error = error2;
          if (error2.name === "CssSyntaxError" && !error2.plugin) {
            error2.plugin = plugin2.postcssPlugin;
            error2.setMessage();
          } else if (plugin2.postcssVersion) {
            if (process.env.NODE_ENV !== "production") {
              let pluginName = plugin2.postcssPlugin;
              let pluginVer = plugin2.postcssVersion;
              let runtimeVer = this.result.processor.version;
              let a = pluginVer.split(".");
              let b = runtimeVer.split(".");
              if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below.");
              }
            }
          }
        } catch (err) {
          if (console && console.error)
            console.error(err);
        }
        return error2;
      }
      runAsync() {
        return __async(this, null, function* () {
          this.plugin = 0;
          for (let i = 0; i < this.plugins.length; i++) {
            let plugin2 = this.plugins[i];
            let promise = this.runOnRoot(plugin2);
            if (isPromise(promise)) {
              try {
                yield promise;
              } catch (error2) {
                throw this.handleError(error2);
              }
            }
          }
          this.prepareVisitors();
          if (this.hasListener) {
            let root2 = this.result.root;
            while (!root2[isClean]) {
              root2[isClean] = true;
              let stack = [toStack(root2)];
              while (stack.length > 0) {
                let promise = this.visitTick(stack);
                if (isPromise(promise)) {
                  try {
                    yield promise;
                  } catch (e) {
                    let node = stack[stack.length - 1].node;
                    throw this.handleError(e, node);
                  }
                }
              }
            }
            if (this.listeners.OnceExit) {
              for (let [plugin2, visitor] of this.listeners.OnceExit) {
                this.result.lastPlugin = plugin2;
                try {
                  if (root2.type === "document") {
                    let roots = root2.nodes.map((subRoot) => visitor(subRoot, this.helpers));
                    yield Promise.all(roots);
                  } else {
                    yield visitor(root2, this.helpers);
                  }
                } catch (e) {
                  throw this.handleError(e);
                }
              }
            }
          }
          this.processed = true;
          return this.stringify();
        });
      }
      prepareVisitors() {
        this.listeners = {};
        let add = (plugin2, type, cb) => {
          if (!this.listeners[type])
            this.listeners[type] = [];
          this.listeners[type].push([plugin2, cb]);
        };
        for (let plugin2 of this.plugins) {
          if (typeof plugin2 === "object") {
            for (let event in plugin2) {
              if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
                throw new Error(`Unknown event ${event} in ${plugin2.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
              }
              if (!NOT_VISITORS[event]) {
                if (typeof plugin2[event] === "object") {
                  for (let filter in plugin2[event]) {
                    if (filter === "*") {
                      add(plugin2, event, plugin2[event][filter]);
                    } else {
                      add(plugin2, event + "-" + filter.toLowerCase(), plugin2[event][filter]);
                    }
                  }
                } else if (typeof plugin2[event] === "function") {
                  add(plugin2, event, plugin2[event]);
                }
              }
            }
          }
        }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      visitTick(stack) {
        let visit = stack[stack.length - 1];
        let { node, visitors } = visit;
        if (node.type !== "root" && node.type !== "document" && !node.parent) {
          stack.pop();
          return;
        }
        if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
          let [plugin2, visitor] = visitors[visit.visitorIndex];
          visit.visitorIndex += 1;
          if (visit.visitorIndex === visitors.length) {
            visit.visitors = [];
            visit.visitorIndex = 0;
          }
          this.result.lastPlugin = plugin2;
          try {
            return visitor(node.toProxy(), this.helpers);
          } catch (e) {
            throw this.handleError(e, node);
          }
        }
        if (visit.iterator !== 0) {
          let iterator = visit.iterator;
          let child;
          while (child = node.nodes[node.indexes[iterator]]) {
            node.indexes[iterator] += 1;
            if (!child[isClean]) {
              child[isClean] = true;
              stack.push(toStack(child));
              return;
            }
          }
          visit.iterator = 0;
          delete node.indexes[iterator];
        }
        let events = visit.events;
        while (visit.eventIndex < events.length) {
          let event = events[visit.eventIndex];
          visit.eventIndex += 1;
          if (event === CHILDREN) {
            if (node.nodes && node.nodes.length) {
              node[isClean] = true;
              visit.iterator = node.getIterator();
            }
            return;
          } else if (this.listeners[event]) {
            visit.visitors = this.listeners[event];
            return;
          }
        }
        stack.pop();
      }
    };
    LazyResult.registerPostcss = (dependant) => {
      postcss2 = dependant;
    };
    module2.exports = LazyResult;
    LazyResult.default = LazyResult;
    Root2.registerLazyResult(LazyResult);
    Document2.registerLazyResult(LazyResult);
  }
});

// node_modules/postcss/lib/no-work-result.js
var require_no_work_result = __commonJS({
  "node_modules/postcss/lib/no-work-result.js"(exports, module2) {
    "use strict";
    var MapGenerator = require_map_generator();
    var stringify4 = require_stringify();
    var warnOnce = require_warn_once();
    var parse4 = require_parse();
    var Result2 = require_result();
    var NoWorkResult = class {
      constructor(processor, css, opts) {
        css = css.toString();
        this.stringified = false;
        this._processor = processor;
        this._css = css;
        this._opts = opts;
        this._map = void 0;
        let root2;
        let str = stringify4;
        this.result = new Result2(this._processor, root2, this._opts);
        this.result.css = css;
        let self2 = this;
        Object.defineProperty(this.result, "root", {
          get() {
            return self2.root;
          }
        });
        let map = new MapGenerator(str, root2, this._opts, css);
        if (map.isMap()) {
          let [generatedCSS, generatedMap] = map.generate();
          if (generatedCSS) {
            this.result.css = generatedCSS;
          }
          if (generatedMap) {
            this.result.map = generatedMap;
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "NoWorkResult";
      }
      get processor() {
        return this.result.processor;
      }
      get opts() {
        return this.result.opts;
      }
      get css() {
        return this.result.css;
      }
      get content() {
        return this.result.css;
      }
      get map() {
        return this.result.map;
      }
      get root() {
        if (this._root) {
          return this._root;
        }
        let root2;
        let parser = parse4;
        try {
          root2 = parser(this._css, this._opts);
        } catch (error2) {
          this.error = error2;
        }
        if (this.error) {
          throw this.error;
        } else {
          this._root = root2;
          return root2;
        }
      }
      get messages() {
        return [];
      }
      warnings() {
        return [];
      }
      toString() {
        return this._css;
      }
      then(onFulfilled, onRejected) {
        if (process.env.NODE_ENV !== "production") {
          if (!("from" in this._opts)) {
            warnOnce("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        return Promise.resolve(this.result);
      }
      sync() {
        if (this.error)
          throw this.error;
        return this.result;
      }
    };
    module2.exports = NoWorkResult;
    NoWorkResult.default = NoWorkResult;
  }
});

// node_modules/postcss/lib/processor.js
var require_processor = __commonJS({
  "node_modules/postcss/lib/processor.js"(exports, module2) {
    "use strict";
    var NoWorkResult = require_no_work_result();
    var LazyResult = require_lazy_result();
    var Document2 = require_document();
    var Root2 = require_root();
    var Processor2 = class {
      constructor(plugins = []) {
        this.version = "8.4.18";
        this.plugins = this.normalize(plugins);
      }
      use(plugin2) {
        this.plugins = this.plugins.concat(this.normalize([plugin2]));
        return this;
      }
      process(css, opts = {}) {
        if (this.plugins.length === 0 && typeof opts.parser === "undefined" && typeof opts.stringifier === "undefined" && typeof opts.syntax === "undefined") {
          return new NoWorkResult(this, css, opts);
        } else {
          return new LazyResult(this, css, opts);
        }
      }
      normalize(plugins) {
        let normalized = [];
        for (let i of plugins) {
          if (i.postcss === true) {
            i = i();
          } else if (i.postcss) {
            i = i.postcss;
          }
          if (typeof i === "object" && Array.isArray(i.plugins)) {
            normalized = normalized.concat(i.plugins);
          } else if (typeof i === "object" && i.postcssPlugin) {
            normalized.push(i);
          } else if (typeof i === "function") {
            normalized.push(i);
          } else if (typeof i === "object" && (i.parse || i.stringify)) {
            if (process.env.NODE_ENV !== "production") {
              throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
            }
          } else {
            throw new Error(i + " is not a PostCSS plugin");
          }
        }
        return normalized;
      }
    };
    module2.exports = Processor2;
    Processor2.default = Processor2;
    Root2.registerProcessor(Processor2);
    Document2.registerProcessor(Processor2);
  }
});

// node_modules/postcss/lib/fromJSON.js
var require_fromJSON = __commonJS({
  "node_modules/postcss/lib/fromJSON.js"(exports, module2) {
    "use strict";
    var Declaration2 = require_declaration();
    var PreviousMap = require_previous_map();
    var Comment3 = require_comment();
    var AtRule2 = require_at_rule();
    var Input2 = require_input();
    var Root2 = require_root();
    var Rule2 = require_rule();
    function fromJSON2(json, inputs) {
      if (Array.isArray(json))
        return json.map((n) => fromJSON2(n));
      let _a = json, { inputs: ownInputs } = _a, defaults = __objRest(_a, ["inputs"]);
      if (ownInputs) {
        inputs = [];
        for (let input of ownInputs) {
          let inputHydrated = __spreadProps(__spreadValues({}, input), { __proto__: Input2.prototype });
          if (inputHydrated.map) {
            inputHydrated.map = __spreadProps(__spreadValues({}, inputHydrated.map), {
              __proto__: PreviousMap.prototype
            });
          }
          inputs.push(inputHydrated);
        }
      }
      if (defaults.nodes) {
        defaults.nodes = json.nodes.map((n) => fromJSON2(n, inputs));
      }
      if (defaults.source) {
        let _b = defaults.source, { inputId } = _b, source = __objRest(_b, ["inputId"]);
        defaults.source = source;
        if (inputId != null) {
          defaults.source.input = inputs[inputId];
        }
      }
      if (defaults.type === "root") {
        return new Root2(defaults);
      } else if (defaults.type === "decl") {
        return new Declaration2(defaults);
      } else if (defaults.type === "rule") {
        return new Rule2(defaults);
      } else if (defaults.type === "comment") {
        return new Comment3(defaults);
      } else if (defaults.type === "atrule") {
        return new AtRule2(defaults);
      } else {
        throw new Error("Unknown node type: " + json.type);
      }
    }
    module2.exports = fromJSON2;
    fromJSON2.default = fromJSON2;
  }
});

// node_modules/postcss/lib/postcss.js
var require_postcss = __commonJS({
  "node_modules/postcss/lib/postcss.js"(exports, module2) {
    "use strict";
    var CssSyntaxError2 = require_css_syntax_error();
    var Declaration2 = require_declaration();
    var LazyResult = require_lazy_result();
    var Container3 = require_container();
    var Processor2 = require_processor();
    var stringify4 = require_stringify();
    var fromJSON2 = require_fromJSON();
    var Document2 = require_document();
    var Warning2 = require_warning();
    var Comment3 = require_comment();
    var AtRule2 = require_at_rule();
    var Result2 = require_result();
    var Input2 = require_input();
    var parse4 = require_parse();
    var list2 = require_list();
    var Rule2 = require_rule();
    var Root2 = require_root();
    var Node2 = require_node();
    function postcss2(...plugins) {
      if (plugins.length === 1 && Array.isArray(plugins[0])) {
        plugins = plugins[0];
      }
      return new Processor2(plugins);
    }
    postcss2.plugin = function plugin2(name, initializer) {
      let warningPrinted = false;
      function creator(...args) {
        if (console && console.warn && !warningPrinted) {
          warningPrinted = true;
          console.warn(name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration");
          if (process.env.LANG && process.env.LANG.startsWith("cn")) {
            console.warn(name + ": \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:\nhttps://www.w3ctech.com/topic/2226");
          }
        }
        let transformer = initializer(...args);
        transformer.postcssPlugin = name;
        transformer.postcssVersion = new Processor2().version;
        return transformer;
      }
      let cache;
      Object.defineProperty(creator, "postcss", {
        get() {
          if (!cache)
            cache = creator();
          return cache;
        }
      });
      creator.process = function(css, processOpts, pluginOpts) {
        return postcss2([creator(pluginOpts)]).process(css, processOpts);
      };
      return creator;
    };
    postcss2.stringify = stringify4;
    postcss2.parse = parse4;
    postcss2.fromJSON = fromJSON2;
    postcss2.list = list2;
    postcss2.comment = (defaults) => new Comment3(defaults);
    postcss2.atRule = (defaults) => new AtRule2(defaults);
    postcss2.decl = (defaults) => new Declaration2(defaults);
    postcss2.rule = (defaults) => new Rule2(defaults);
    postcss2.root = (defaults) => new Root2(defaults);
    postcss2.document = (defaults) => new Document2(defaults);
    postcss2.CssSyntaxError = CssSyntaxError2;
    postcss2.Declaration = Declaration2;
    postcss2.Container = Container3;
    postcss2.Processor = Processor2;
    postcss2.Document = Document2;
    postcss2.Comment = Comment3;
    postcss2.Warning = Warning2;
    postcss2.AtRule = AtRule2;
    postcss2.Result = Result2;
    postcss2.Input = Input2;
    postcss2.Rule = Rule2;
    postcss2.Root = Root2;
    postcss2.Node = Node2;
    LazyResult.registerPostcss(postcss2);
    module2.exports = postcss2;
    postcss2.default = postcss2;
  }
});

// node_modules/postcss-scss/lib/scss-stringifier.js
var require_scss_stringifier = __commonJS({
  "node_modules/postcss-scss/lib/scss-stringifier.js"(exports, module2) {
    var Stringifier = require_stringifier();
    var ScssStringifier = class extends Stringifier {
      comment(node) {
        let left = this.raw(node, "left", "commentLeft");
        let right = this.raw(node, "right", "commentRight");
        if (node.raws.inline) {
          let text = node.raws.text || node.text;
          this.builder("//" + left + text + right, node);
        } else {
          this.builder("/*" + left + node.text + right + "*/", node);
        }
      }
      decl(node, semicolon) {
        if (!node.isNested) {
          super.decl(node, semicolon);
        } else {
          let between = this.raw(node, "between", "colon");
          let string = node.prop + between + this.rawValue(node, "value");
          if (node.important) {
            string += node.raws.important || " !important";
          }
          this.builder(string + "{", node, "start");
          let after;
          if (node.nodes && node.nodes.length) {
            this.body(node);
            after = this.raw(node, "after");
          } else {
            after = this.raw(node, "after", "emptyBody");
          }
          if (after)
            this.builder(after);
          this.builder("}", node, "end");
        }
      }
      rawValue(node, prop) {
        let value = node[prop];
        let raw = node.raws[prop];
        if (raw && raw.value === value) {
          return raw.scss ? raw.scss : raw.raw;
        } else {
          return value;
        }
      }
    };
    module2.exports = ScssStringifier;
  }
});

// node_modules/postcss-scss/lib/scss-stringify.js
var require_scss_stringify = __commonJS({
  "node_modules/postcss-scss/lib/scss-stringify.js"(exports, module2) {
    var ScssStringifier = require_scss_stringifier();
    module2.exports = function scssStringify(node, builder) {
      let str = new ScssStringifier(builder);
      str.stringify(node);
    };
  }
});

// node_modules/postcss-scss/lib/nested-declaration.js
var require_nested_declaration = __commonJS({
  "node_modules/postcss-scss/lib/nested-declaration.js"(exports, module2) {
    var { Container: Container3 } = require_postcss();
    var NestedDeclaration = class extends Container3 {
      constructor(defaults) {
        super(defaults);
        this.type = "decl";
        this.isNested = true;
        if (!this.nodes)
          this.nodes = [];
      }
    };
    module2.exports = NestedDeclaration;
  }
});

// node_modules/postcss-scss/lib/scss-tokenize.js
var require_scss_tokenize = __commonJS({
  "node_modules/postcss-scss/lib/scss-tokenize.js"(exports, module2) {
    "use strict";
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var COMMA = ",".charCodeAt(0);
    var HASH = "#".charCodeAt(0);
    var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
    var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\n"'(/\\]/;
    var RE_HEX_ESCAPE = /[\da-f]/i;
    var RE_NEW_LINE = /[\n\f\r]/g;
    module2.exports = function scssTokenize(input, options = {}) {
      let css = input.css.valueOf();
      let ignore = options.ignoreErrors;
      let code, next, quote, content, escape;
      let escaped, prev, n, currentToken;
      let length = css.length;
      let pos = 0;
      let buffer = [];
      let returned = [];
      let brackets;
      function position() {
        return pos;
      }
      function unclosed(what) {
        throw input.error("Unclosed " + what, pos);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length;
      }
      function interpolation() {
        let deep = 1;
        let stringQuote = false;
        let stringEscaped = false;
        while (deep > 0) {
          next += 1;
          if (css.length <= next)
            unclosed("interpolation");
          code = css.charCodeAt(next);
          n = css.charCodeAt(next + 1);
          if (stringQuote) {
            if (!stringEscaped && code === stringQuote) {
              stringQuote = false;
              stringEscaped = false;
            } else if (code === BACKSLASH) {
              stringEscaped = !stringEscaped;
            } else if (stringEscaped) {
              stringEscaped = false;
            }
          } else if (code === SINGLE_QUOTE || code === DOUBLE_QUOTE) {
            stringQuote = code;
          } else if (code === CLOSE_CURLY) {
            deep -= 1;
          } else if (code === HASH && n === OPEN_CURLY) {
            deep += 1;
          }
        }
      }
      function nextToken(opts) {
        if (returned.length)
          return returned.pop();
        if (pos >= length)
          return;
        let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
        code = css.charCodeAt(pos);
        switch (code) {
          case NEWLINE:
          case SPACE:
          case TAB:
          case CR:
          case FEED: {
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          }
          case OPEN_SQUARE:
          case CLOSE_SQUARE:
          case OPEN_CURLY:
          case CLOSE_CURLY:
          case COLON:
          case SEMICOLON:
          case CLOSE_PARENTHESES: {
            let controlChar = String.fromCharCode(code);
            currentToken = [controlChar, controlChar, pos];
            break;
          }
          case COMMA: {
            currentToken = ["word", ",", pos, pos + 1];
            break;
          }
          case OPEN_PARENTHESES: {
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE) {
              brackets = 1;
              escaped = false;
              next = pos + 1;
              while (next <= css.length - 1) {
                n = css.charCodeAt(next);
                if (n === BACKSLASH) {
                  escaped = !escaped;
                } else if (n === OPEN_PARENTHESES) {
                  brackets += 1;
                } else if (n === CLOSE_PARENTHESES) {
                  brackets -= 1;
                  if (brackets === 0)
                    break;
                }
                next += 1;
              }
              content = css.slice(pos, next + 1);
              currentToken = ["brackets", content, pos, next];
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", pos];
              } else {
                currentToken = ["brackets", content, pos, next];
                pos = next;
              }
            }
            break;
          }
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE: {
            quote = code;
            next = pos;
            escaped = false;
            while (next < length) {
              next++;
              if (next === length)
                unclosed("string");
              code = css.charCodeAt(next);
              n = css.charCodeAt(next + 1);
              if (!escaped && code === quote) {
                break;
              } else if (code === BACKSLASH) {
                escaped = !escaped;
              } else if (escaped) {
                escaped = false;
              } else if (code === HASH && n === OPEN_CURLY) {
                interpolation();
              }
            }
            currentToken = ["string", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case AT: {
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case BACKSLASH: {
            next = pos;
            escape = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          default:
            n = css.charCodeAt(pos + 1);
            if (code === HASH && n === OPEN_CURLY) {
              next = pos;
              interpolation();
              content = css.slice(pos, next + 1);
              currentToken = ["word", content, pos, next];
              pos = next;
            } else if (code === SLASH && n === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore || ignoreUnclosed) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              currentToken = ["comment", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else if (code === SLASH && n === SLASH) {
              RE_NEW_LINE.lastIndex = pos + 1;
              RE_NEW_LINE.test(css);
              if (RE_NEW_LINE.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_NEW_LINE.lastIndex - 2;
              }
              content = css.slice(pos, next + 1);
              currentToken = ["comment", content, pos, next, "inline"];
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), pos, next];
              buffer.push(currentToken);
              pos = next;
            }
            break;
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        nextToken,
        endOfFile,
        position
      };
    };
  }
});

// node_modules/postcss-scss/lib/scss-parser.js
var require_scss_parser = __commonJS({
  "node_modules/postcss-scss/lib/scss-parser.js"(exports, module2) {
    var { Comment: Comment3 } = require_postcss();
    var Parser2 = require_parser();
    var NestedDeclaration = require_nested_declaration();
    var scssTokenizer = require_scss_tokenize();
    var ScssParser = class extends Parser2 {
      createTokenizer() {
        this.tokenizer = scssTokenizer(this.input);
      }
      rule(tokens) {
        let withColon = false;
        let brackets = 0;
        let value = "";
        for (let i of tokens) {
          if (withColon) {
            if (i[0] !== "comment" && i[0] !== "{") {
              value += i[1];
            }
          } else if (i[0] === "space" && i[1].includes("\n")) {
            break;
          } else if (i[0] === "(") {
            brackets += 1;
          } else if (i[0] === ")") {
            brackets -= 1;
          } else if (brackets === 0 && i[0] === ":") {
            withColon = true;
          }
        }
        if (!withColon || value.trim() === "" || /^[#:A-Za-z-]/.test(value)) {
          super.rule(tokens);
        } else {
          tokens.pop();
          let node = new NestedDeclaration();
          this.init(node, tokens[0][2]);
          let last;
          for (let i = tokens.length - 1; i >= 0; i--) {
            if (tokens[i][0] !== "space") {
              last = tokens[i];
              break;
            }
          }
          if (last[3]) {
            let pos = this.input.fromOffset(last[3]);
            node.source.end = { offset: last[3], line: pos.line, column: pos.col };
          } else {
            let pos = this.input.fromOffset(last[2]);
            node.source.end = { offset: last[2], line: pos.line, column: pos.col };
          }
          while (tokens[0][0] !== "word") {
            node.raws.before += tokens.shift()[1];
          }
          if (tokens[0][2]) {
            let pos = this.input.fromOffset(tokens[0][2]);
            node.source.start = {
              offset: tokens[0][2],
              line: pos.line,
              column: pos.col
            };
          }
          node.prop = "";
          while (tokens.length) {
            let type = tokens[0][0];
            if (type === ":" || type === "space" || type === "comment") {
              break;
            }
            node.prop += tokens.shift()[1];
          }
          node.raws.between = "";
          let token;
          while (tokens.length) {
            token = tokens.shift();
            if (token[0] === ":") {
              node.raws.between += token[1];
              break;
            } else {
              node.raws.between += token[1];
            }
          }
          if (node.prop[0] === "_" || node.prop[0] === "*") {
            node.raws.before += node.prop[0];
            node.prop = node.prop.slice(1);
          }
          node.raws.between += this.spacesAndCommentsFromStart(tokens);
          this.precheckMissedSemicolon(tokens);
          for (let i = tokens.length - 1; i > 0; i--) {
            token = tokens[i];
            if (token[1] === "!important") {
              node.important = true;
              let string = this.stringFrom(tokens, i);
              string = this.spacesFromEnd(tokens) + string;
              if (string !== " !important") {
                node.raws.important = string;
              }
              break;
            } else if (token[1] === "important") {
              let cache = tokens.slice(0);
              let str = "";
              for (let j = i; j > 0; j--) {
                let type = cache[j][0];
                if (str.trim().indexOf("!") === 0 && type !== "space") {
                  break;
                }
                str = cache.pop()[1] + str;
              }
              if (str.trim().indexOf("!") === 0) {
                node.important = true;
                node.raws.important = str;
                tokens = cache;
              }
            }
            if (token[0] !== "space" && token[0] !== "comment") {
              break;
            }
          }
          this.raw(node, "value", tokens);
          if (node.value.includes(":")) {
            this.checkMissedSemicolon(tokens);
          }
          this.current = node;
        }
      }
      comment(token) {
        if (token[4] === "inline") {
          let node = new Comment3();
          this.init(node, token[2]);
          node.raws.inline = true;
          let pos = this.input.fromOffset(token[3]);
          node.source.end = { offset: token[3], line: pos.line, column: pos.col };
          let text = token[1].slice(2);
          if (/^\s*$/.test(text)) {
            node.text = "";
            node.raws.left = text;
            node.raws.right = "";
          } else {
            let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
            let fixed = match[2].replace(/(\*\/|\/\*)/g, "*//*");
            node.text = fixed;
            node.raws.left = match[1];
            node.raws.right = match[3];
            node.raws.text = match[2];
          }
        } else {
          super.comment(token);
        }
      }
      atrule(token) {
        let name = token[1];
        let prev = token;
        while (!this.tokenizer.endOfFile()) {
          let next = this.tokenizer.nextToken();
          if (next[0] === "word" && next[2] === prev[3] + 1) {
            name += next[1];
            prev = next;
          } else {
            this.tokenizer.back(next);
            break;
          }
        }
        super.atrule(["at-word", name, token[2], prev[3]]);
      }
      raw(node, prop, tokens, customProperty) {
        super.raw(node, prop, tokens, customProperty);
        if (node.raws[prop]) {
          let scss = node.raws[prop].raw;
          node.raws[prop].raw = tokens.reduce((all, i) => {
            if (i[0] === "comment" && i[4] === "inline") {
              let text = i[1].slice(2).replace(/(\*\/|\/\*)/g, "*//*");
              return all + "/*" + text + "*/";
            } else {
              return all + i[1];
            }
          }, "");
          if (scss !== node.raws[prop].raw) {
            node.raws[prop].scss = scss;
          }
        }
      }
    };
    module2.exports = ScssParser;
  }
});

// node_modules/postcss-scss/lib/scss-parse.js
var require_scss_parse = __commonJS({
  "node_modules/postcss-scss/lib/scss-parse.js"(exports, module2) {
    var { Input: Input2 } = require_postcss();
    var ScssParser = require_scss_parser();
    module2.exports = function scssParse(scss, opts) {
      let input = new Input2(scss, opts);
      let parser = new ScssParser(input);
      parser.parse();
      return parser.root;
    };
  }
});

// node_modules/postcss-scss/lib/scss-syntax.js
var require_scss_syntax = __commonJS({
  "node_modules/postcss-scss/lib/scss-syntax.js"(exports, module2) {
    var stringify4 = require_scss_stringify();
    var parse4 = require_scss_parse();
    module2.exports = { parse: parse4, stringify: stringify4 };
  }
});

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/index.mjs
var mdc_migration_exports = {};
__export(mdc_migration_exports, {
  default: () => mdc_migration_default
});
module.exports = __toCommonJS(mdc_migration_exports);

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/style-migrator.js
var END_OF_SELECTOR_REGEX = "(?!-)";
var MIXIN_ARGUMENTS_REGEX = "\\(((\\s|.)*)\\)";
var StyleMigrator = class {
  constructor() {
    this._processedNodes = /* @__PURE__ */ new WeakMap();
  }
  static wrapValue(value) {
    const escapeString = "__NG_MDC_MIGRATION_PLACEHOLDER__";
    return `${escapeString}${value}${escapeString}`;
  }
  static unwrapAllValues(content) {
    return content.replace(/__NG_MDC_MIGRATION_PLACEHOLDER__/g, "");
  }
  isLegacyMixin(namespace, atRule2) {
    return this.mixinChanges.some((change) => atRule2.params.includes(`${namespace}.${change.old}`));
  }
  getMixinChange(namespace, atRule2) {
    var _a, _b;
    const processedKey = `mixinChange-${namespace}`;
    if (this._nodeIsProcessed(atRule2, processedKey)) {
      return null;
    }
    const change = this.mixinChanges.find((c) => {
      return atRule2.params.includes(`${namespace}.${c.old}`);
    });
    if (!change) {
      return null;
    }
    const replacements = [...(_a = change.new) != null ? _a : []];
    if (change.checkForDuplicates) {
      const mixinArgumentMatches = (_b = atRule2.params) == null ? void 0 : _b.match(MIXIN_ARGUMENTS_REGEX);
      atRule2.root().walkAtRules((rule2) => {
        for (const index2 in replacements) {
          const mixinName = replacements[index2] + (mixinArgumentMatches ? mixinArgumentMatches[0] : "");
          if (rule2.params.includes("." + mixinName)) {
            replacements.splice(Number(index2), 1);
          }
        }
      });
    }
    this._trackProcessedNode(atRule2, processedKey);
    return { old: change.old, new: replacements.length ? replacements : null };
  }
  isLegacySelector(rule2) {
    return this.classChanges.some((change) => {
      var _a;
      return ((_a = rule2.selector) == null ? void 0 : _a.match(change.old + END_OF_SELECTOR_REGEX)) !== null;
    });
  }
  replaceLegacySelector(rule2) {
    var _a;
    if (!this._nodeIsProcessed(rule2, "replaceLegacySelector")) {
      for (let i = 0; i < this.classChanges.length; i++) {
        const change = this.classChanges[i];
        if ((_a = rule2.selector) == null ? void 0 : _a.match(change.old + END_OF_SELECTOR_REGEX)) {
          rule2.selector = rule2.selector.replace(change.old, change.new);
        }
      }
      this._trackProcessedNode(rule2, "replaceLegacySelector");
    }
  }
  isDeprecatedSelector(rule2) {
    return this.deprecatedPrefixes.some((deprecatedPrefix) => rule2.selector.includes(deprecatedPrefix));
  }
  _trackProcessedNode(node, action) {
    const appliedActions = this._processedNodes.get(node) || /* @__PURE__ */ new Set();
    appliedActions.add(action);
    this._processedNodes.set(node, appliedActions);
  }
  _nodeIsProcessed(node, action) {
    var _a;
    return !!((_a = this._processedNodes.get(node)) == null ? void 0 : _a.has(action));
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/autocomplete/autocomplete-styles.js
var AutocompleteStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "autocomplete";
    this.deprecatedPrefixes = ["mat-autocomplete"];
    this.mixinChanges = [
      {
        old: "legacy-autocomplete-theme",
        new: ["autocomplete-theme"]
      },
      {
        old: "legacy-autocomplete-color",
        new: ["autocomplete-color"]
      },
      {
        old: "legacy-autocomplete-typography",
        new: ["autocomplete-typography"]
      }
    ];
    this.classChanges = [{ old: ".mat-autocomplete", new: ".mat-mdc-autocomplete" }];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/button/button-styles.js
var ButtonStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "button";
    this.deprecatedPrefixes = ["mat-button"];
    this.mixinChanges = [
      {
        old: "legacy-button-theme",
        new: ["button-theme", "fab-theme", "icon-button-theme"],
        checkForDuplicates: true
      },
      {
        old: "legacy-button-color",
        new: ["button-color", "fab-color", "icon-button-color"],
        checkForDuplicates: true
      },
      {
        old: "legacy-button-typography",
        new: ["button-typography", "fab-typography", "icon-button-typography"],
        checkForDuplicates: true
      }
    ];
    this.classChanges = [
      { old: ".mat-button-base", new: ".mat-mdc-button-base" },
      { old: ".mat-button", new: ".mat-mdc-button" },
      { old: ".mat-raised-button", new: ".mat-mdc-raised-button" },
      { old: ".mat-icon-button", new: ".mat-mdc-icon-button" },
      { old: ".mat-fab", new: ".mat-mdc-fab" },
      { old: ".mat-mini-fab", new: ".mat-mdc-mini-fab" },
      { old: ".mat-stroked-button", new: ".mat-mdc-outlined-button" },
      { old: ".mat-flat-button", new: ".mat-mdc-flat-button" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/card/card-styles.js
var CardStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "card";
    this.deprecatedPrefixes = ["mat-card"];
    this.mixinChanges = [
      {
        old: "legacy-card-theme",
        new: ["card-theme"]
      },
      {
        old: "legacy-card-color",
        new: ["card-color"]
      },
      {
        old: "legacy-card-typography",
        new: ["card-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-card", new: ".mat-mdc-card" },
      { old: `.mat-card-title`, new: `.mat-mdc-card-title` },
      { old: `.mat-card-title-group`, new: `.mat-mdc-card-title-group` },
      { old: `.mat-card-content`, new: `.mat-mdc-card-content` },
      { old: `.mat-card-subtitle`, new: `.mat-mdc-card-subtitle` },
      { old: `.mat-card-actions`, new: `.mat-mdc-card-actions` },
      { old: `.mat-card-header`, new: `.mat-mdc-card-header` },
      { old: `.mat-card-footer`, new: `.mat-mdc-card-footer` },
      { old: `.mat-card-image`, new: `.mat-mdc-card-image` },
      { old: `.mat-card-avatar`, new: `.mat-mdc-card-avatar` },
      { old: `.mat-card-sm-image`, new: `.mat-mdc-card-sm-image` },
      { old: `.mat-card-md-image`, new: `.mat-mdc-card-md-image` },
      { old: `.mat-card-lg-image`, new: `.mat-mdc-card-lg-image` },
      { old: `.mat-card-xl-image`, new: `.mat-mdc-card-xl-image` }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/template-migrator.js
var TemplateMigrator = class {
};

// node_modules/@angular/compiler/fesm2015/compiler.mjs
var TagContentType;
(function(TagContentType2) {
  TagContentType2[TagContentType2["RAW_TEXT"] = 0] = "RAW_TEXT";
  TagContentType2[TagContentType2["ESCAPABLE_RAW_TEXT"] = 1] = "ESCAPABLE_RAW_TEXT";
  TagContentType2[TagContentType2["PARSABLE_DATA"] = 2] = "PARSABLE_DATA";
})(TagContentType || (TagContentType = {}));
function splitNsName(elementName) {
  if (elementName[0] != ":") {
    return [null, elementName];
  }
  const colonIndex = elementName.indexOf(":", 1);
  if (colonIndex === -1) {
    throw new Error(`Unsupported format "${elementName}" expecting ":namespace:name"`);
  }
  return [elementName.slice(1, colonIndex), elementName.slice(colonIndex + 1)];
}
function isNgContainer(tagName) {
  return splitNsName(tagName)[1] === "ng-container";
}
function isNgContent(tagName) {
  return splitNsName(tagName)[1] === "ng-content";
}
function isNgTemplate(tagName) {
  return splitNsName(tagName)[1] === "ng-template";
}
function getNsPrefix(fullName) {
  return fullName === null ? null : splitNsName(fullName)[0];
}
function mergeNsAndName(prefix, localName) {
  return prefix ? `:${prefix}:${localName}` : localName;
}
var HtmlTagDefinition = class {
  constructor({ closedByChildren, implicitNamespacePrefix, contentType = TagContentType.PARSABLE_DATA, closedByParent = false, isVoid = false, ignoreFirstLf = false, preventNamespaceInheritance = false } = {}) {
    this.closedByChildren = {};
    this.closedByParent = false;
    this.canSelfClose = false;
    if (closedByChildren && closedByChildren.length > 0) {
      closedByChildren.forEach((tagName) => this.closedByChildren[tagName] = true);
    }
    this.isVoid = isVoid;
    this.closedByParent = closedByParent || isVoid;
    this.implicitNamespacePrefix = implicitNamespacePrefix || null;
    this.contentType = contentType;
    this.ignoreFirstLf = ignoreFirstLf;
    this.preventNamespaceInheritance = preventNamespaceInheritance;
  }
  isClosedByChild(name) {
    return this.isVoid || name.toLowerCase() in this.closedByChildren;
  }
  getContentType(prefix) {
    if (typeof this.contentType === "object") {
      const overrideType = prefix === void 0 ? void 0 : this.contentType[prefix];
      return overrideType !== null && overrideType !== void 0 ? overrideType : this.contentType.default;
    }
    return this.contentType;
  }
};
var _DEFAULT_TAG_DEFINITION;
var TAG_DEFINITIONS;
function getHtmlTagDefinition(tagName) {
  var _a, _b;
  if (!TAG_DEFINITIONS) {
    _DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
    TAG_DEFINITIONS = {
      "base": new HtmlTagDefinition({ isVoid: true }),
      "meta": new HtmlTagDefinition({ isVoid: true }),
      "area": new HtmlTagDefinition({ isVoid: true }),
      "embed": new HtmlTagDefinition({ isVoid: true }),
      "link": new HtmlTagDefinition({ isVoid: true }),
      "img": new HtmlTagDefinition({ isVoid: true }),
      "input": new HtmlTagDefinition({ isVoid: true }),
      "param": new HtmlTagDefinition({ isVoid: true }),
      "hr": new HtmlTagDefinition({ isVoid: true }),
      "br": new HtmlTagDefinition({ isVoid: true }),
      "source": new HtmlTagDefinition({ isVoid: true }),
      "track": new HtmlTagDefinition({ isVoid: true }),
      "wbr": new HtmlTagDefinition({ isVoid: true }),
      "p": new HtmlTagDefinition({
        closedByChildren: [
          "address",
          "article",
          "aside",
          "blockquote",
          "div",
          "dl",
          "fieldset",
          "footer",
          "form",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "header",
          "hgroup",
          "hr",
          "main",
          "nav",
          "ol",
          "p",
          "pre",
          "section",
          "table",
          "ul"
        ],
        closedByParent: true
      }),
      "thead": new HtmlTagDefinition({ closedByChildren: ["tbody", "tfoot"] }),
      "tbody": new HtmlTagDefinition({ closedByChildren: ["tbody", "tfoot"], closedByParent: true }),
      "tfoot": new HtmlTagDefinition({ closedByChildren: ["tbody"], closedByParent: true }),
      "tr": new HtmlTagDefinition({ closedByChildren: ["tr"], closedByParent: true }),
      "td": new HtmlTagDefinition({ closedByChildren: ["td", "th"], closedByParent: true }),
      "th": new HtmlTagDefinition({ closedByChildren: ["td", "th"], closedByParent: true }),
      "col": new HtmlTagDefinition({ isVoid: true }),
      "svg": new HtmlTagDefinition({ implicitNamespacePrefix: "svg" }),
      "foreignObject": new HtmlTagDefinition({
        implicitNamespacePrefix: "svg",
        preventNamespaceInheritance: true
      }),
      "math": new HtmlTagDefinition({ implicitNamespacePrefix: "math" }),
      "li": new HtmlTagDefinition({ closedByChildren: ["li"], closedByParent: true }),
      "dt": new HtmlTagDefinition({ closedByChildren: ["dt", "dd"] }),
      "dd": new HtmlTagDefinition({ closedByChildren: ["dt", "dd"], closedByParent: true }),
      "rb": new HtmlTagDefinition({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }),
      "rt": new HtmlTagDefinition({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }),
      "rtc": new HtmlTagDefinition({ closedByChildren: ["rb", "rtc", "rp"], closedByParent: true }),
      "rp": new HtmlTagDefinition({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }),
      "optgroup": new HtmlTagDefinition({ closedByChildren: ["optgroup"], closedByParent: true }),
      "option": new HtmlTagDefinition({ closedByChildren: ["option", "optgroup"], closedByParent: true }),
      "pre": new HtmlTagDefinition({ ignoreFirstLf: true }),
      "listing": new HtmlTagDefinition({ ignoreFirstLf: true }),
      "style": new HtmlTagDefinition({ contentType: TagContentType.RAW_TEXT }),
      "script": new HtmlTagDefinition({ contentType: TagContentType.RAW_TEXT }),
      "title": new HtmlTagDefinition({
        contentType: { default: TagContentType.ESCAPABLE_RAW_TEXT, svg: TagContentType.PARSABLE_DATA }
      }),
      "textarea": new HtmlTagDefinition({ contentType: TagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true })
    };
  }
  return (_b = (_a = TAG_DEFINITIONS[tagName]) !== null && _a !== void 0 ? _a : TAG_DEFINITIONS[tagName.toLowerCase()]) !== null && _b !== void 0 ? _b : _DEFAULT_TAG_DEFINITION;
}
var _SELECTOR_REGEXP = new RegExp(`(\\:not\\()|(([\\.\\#]?)[-\\w]+)|(?:\\[([-.\\w*\\\\$]+)(?:=(["']?)([^\\]"']*)\\5)?\\])|(\\))|(\\s*,\\s*)`, "g");
var CssSelector = class {
  constructor() {
    this.element = null;
    this.classNames = [];
    this.attrs = [];
    this.notSelectors = [];
  }
  static parse(selector) {
    const results = [];
    const _addResult = (res, cssSel) => {
      if (cssSel.notSelectors.length > 0 && !cssSel.element && cssSel.classNames.length == 0 && cssSel.attrs.length == 0) {
        cssSel.element = "*";
      }
      res.push(cssSel);
    };
    let cssSelector = new CssSelector();
    let match;
    let current = cssSelector;
    let inNot = false;
    _SELECTOR_REGEXP.lastIndex = 0;
    while (match = _SELECTOR_REGEXP.exec(selector)) {
      if (match[1]) {
        if (inNot) {
          throw new Error("Nesting :not in a selector is not allowed");
        }
        inNot = true;
        current = new CssSelector();
        cssSelector.notSelectors.push(current);
      }
      const tag = match[2];
      if (tag) {
        const prefix = match[3];
        if (prefix === "#") {
          current.addAttribute("id", tag.slice(1));
        } else if (prefix === ".") {
          current.addClassName(tag.slice(1));
        } else {
          current.setElement(tag);
        }
      }
      const attribute = match[4];
      if (attribute) {
        current.addAttribute(current.unescapeAttribute(attribute), match[6]);
      }
      if (match[7]) {
        inNot = false;
        current = cssSelector;
      }
      if (match[8]) {
        if (inNot) {
          throw new Error("Multiple selectors in :not are not supported");
        }
        _addResult(results, cssSelector);
        cssSelector = current = new CssSelector();
      }
    }
    _addResult(results, cssSelector);
    return results;
  }
  unescapeAttribute(attr) {
    let result = "";
    let escaping = false;
    for (let i = 0; i < attr.length; i++) {
      const char = attr.charAt(i);
      if (char === "\\") {
        escaping = true;
        continue;
      }
      if (char === "$" && !escaping) {
        throw new Error(`Error in attribute selector "${attr}". Unescaped "$" is not supported. Please escape with "\\$".`);
      }
      escaping = false;
      result += char;
    }
    return result;
  }
  escapeAttribute(attr) {
    return attr.replace(/\\/g, "\\\\").replace(/\$/g, "\\$");
  }
  isElementSelector() {
    return this.hasElementSelector() && this.classNames.length == 0 && this.attrs.length == 0 && this.notSelectors.length === 0;
  }
  hasElementSelector() {
    return !!this.element;
  }
  setElement(element = null) {
    this.element = element;
  }
  getMatchingElementTemplate() {
    const tagName = this.element || "div";
    const classAttr = this.classNames.length > 0 ? ` class="${this.classNames.join(" ")}"` : "";
    let attrs = "";
    for (let i = 0; i < this.attrs.length; i += 2) {
      const attrName = this.attrs[i];
      const attrValue = this.attrs[i + 1] !== "" ? `="${this.attrs[i + 1]}"` : "";
      attrs += ` ${attrName}${attrValue}`;
    }
    return getHtmlTagDefinition(tagName).isVoid ? `<${tagName}${classAttr}${attrs}/>` : `<${tagName}${classAttr}${attrs}></${tagName}>`;
  }
  getAttrs() {
    const result = [];
    if (this.classNames.length > 0) {
      result.push("class", this.classNames.join(" "));
    }
    return result.concat(this.attrs);
  }
  addAttribute(name, value = "") {
    this.attrs.push(name, value && value.toLowerCase() || "");
  }
  addClassName(name) {
    this.classNames.push(name.toLowerCase());
  }
  toString() {
    let res = this.element || "";
    if (this.classNames) {
      this.classNames.forEach((klass) => res += `.${klass}`);
    }
    if (this.attrs) {
      for (let i = 0; i < this.attrs.length; i += 2) {
        const name = this.escapeAttribute(this.attrs[i]);
        const value = this.attrs[i + 1];
        res += `[${name}${value ? "=" + value : ""}]`;
      }
    }
    this.notSelectors.forEach((notSelector) => res += `:not(${notSelector})`);
    return res;
  }
};
var ViewEncapsulation;
(function(ViewEncapsulation2) {
  ViewEncapsulation2[ViewEncapsulation2["Emulated"] = 0] = "Emulated";
  ViewEncapsulation2[ViewEncapsulation2["None"] = 2] = "None";
  ViewEncapsulation2[ViewEncapsulation2["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));
var ChangeDetectionStrategy;
(function(ChangeDetectionStrategy2) {
  ChangeDetectionStrategy2[ChangeDetectionStrategy2["OnPush"] = 0] = "OnPush";
  ChangeDetectionStrategy2[ChangeDetectionStrategy2["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
var CUSTOM_ELEMENTS_SCHEMA = {
  name: "custom-elements"
};
var NO_ERRORS_SCHEMA = {
  name: "no-errors-schema"
};
var SecurityContext;
(function(SecurityContext2) {
  SecurityContext2[SecurityContext2["NONE"] = 0] = "NONE";
  SecurityContext2[SecurityContext2["HTML"] = 1] = "HTML";
  SecurityContext2[SecurityContext2["STYLE"] = 2] = "STYLE";
  SecurityContext2[SecurityContext2["SCRIPT"] = 3] = "SCRIPT";
  SecurityContext2[SecurityContext2["URL"] = 4] = "URL";
  SecurityContext2[SecurityContext2["RESOURCE_URL"] = 5] = "RESOURCE_URL";
})(SecurityContext || (SecurityContext = {}));
var MissingTranslationStrategy;
(function(MissingTranslationStrategy2) {
  MissingTranslationStrategy2[MissingTranslationStrategy2["Error"] = 0] = "Error";
  MissingTranslationStrategy2[MissingTranslationStrategy2["Warning"] = 1] = "Warning";
  MissingTranslationStrategy2[MissingTranslationStrategy2["Ignore"] = 2] = "Ignore";
})(MissingTranslationStrategy || (MissingTranslationStrategy = {}));
function parserSelectorToSimpleSelector(selector) {
  const classes = selector.classNames && selector.classNames.length ? [8, ...selector.classNames] : [];
  const elementName = selector.element && selector.element !== "*" ? selector.element : "";
  return [elementName, ...selector.attrs, ...classes];
}
function parserSelectorToNegativeSelector(selector) {
  const classes = selector.classNames && selector.classNames.length ? [8, ...selector.classNames] : [];
  if (selector.element) {
    return [
      1 | 4,
      selector.element,
      ...selector.attrs,
      ...classes
    ];
  } else if (selector.attrs.length) {
    return [1 | 2, ...selector.attrs, ...classes];
  } else {
    return selector.classNames && selector.classNames.length ? [1 | 8, ...selector.classNames] : [];
  }
}
function parserSelectorToR3Selector(selector) {
  const positive = parserSelectorToSimpleSelector(selector);
  const negative = selector.notSelectors && selector.notSelectors.length ? selector.notSelectors.map((notSelector) => parserSelectorToNegativeSelector(notSelector)) : [];
  return positive.concat(...negative);
}
function parseSelectorToR3Selector(selector) {
  return selector ? CssSelector.parse(selector).map(parserSelectorToR3Selector) : [];
}
var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
function splitAtColon(input, defaultValues) {
  return _splitAt(input, ":", defaultValues);
}
function splitAtPeriod(input, defaultValues) {
  return _splitAt(input, ".", defaultValues);
}
function _splitAt(input, character, defaultValues) {
  const characterIndex = input.indexOf(character);
  if (characterIndex == -1)
    return defaultValues;
  return [input.slice(0, characterIndex).trim(), input.slice(characterIndex + 1).trim()];
}
function error(msg) {
  throw new Error(`Internal Error: ${msg}`);
}
function utf8Encode(str) {
  let encoded = [];
  for (let index2 = 0; index2 < str.length; index2++) {
    let codePoint = str.charCodeAt(index2);
    if (codePoint >= 55296 && codePoint <= 56319 && str.length > index2 + 1) {
      const low = str.charCodeAt(index2 + 1);
      if (low >= 56320 && low <= 57343) {
        index2++;
        codePoint = (codePoint - 55296 << 10) + low - 56320 + 65536;
      }
    }
    if (codePoint <= 127) {
      encoded.push(codePoint);
    } else if (codePoint <= 2047) {
      encoded.push(codePoint >> 6 & 31 | 192, codePoint & 63 | 128);
    } else if (codePoint <= 65535) {
      encoded.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else if (codePoint <= 2097151) {
      encoded.push(codePoint >> 18 & 7 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    }
  }
  return encoded;
}
function stringify(token) {
  if (typeof token === "string") {
    return token;
  }
  if (Array.isArray(token)) {
    return "[" + token.map(stringify).join(", ") + "]";
  }
  if (token == null) {
    return "" + token;
  }
  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }
  if (token.name) {
    return `${token.name}`;
  }
  if (!token.toString) {
    return "object";
  }
  const res = token.toString();
  if (res == null) {
    return "" + res;
  }
  const newLineIndex = res.indexOf("\n");
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
var Version = class {
  constructor(full) {
    this.full = full;
    const splits = full.split(".");
    this.major = splits[0];
    this.minor = splits[1];
    this.patch = splits.slice(2).join(".");
  }
};
var _global = /* @__PURE__ */ (() => typeof global !== "undefined" && global || typeof window !== "undefined" && window || typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self)();
function newArray(size, value) {
  const list2 = [];
  for (let i = 0; i < size; i++) {
    list2.push(value);
  }
  return list2;
}
function partitionArray(arr, conditionFn) {
  const truthy = [];
  const falsy = [];
  for (const item of arr) {
    (conditionFn(item) ? truthy : falsy).push(item);
  }
  return [truthy, falsy];
}
var BigInteger = class {
  constructor(digits) {
    this.digits = digits;
  }
  static zero() {
    return new BigInteger([0]);
  }
  static one() {
    return new BigInteger([1]);
  }
  clone() {
    return new BigInteger(this.digits.slice());
  }
  add(other) {
    const result = this.clone();
    result.addToSelf(other);
    return result;
  }
  addToSelf(other) {
    const maxNrOfDigits = Math.max(this.digits.length, other.digits.length);
    let carry = 0;
    for (let i = 0; i < maxNrOfDigits; i++) {
      let digitSum = carry;
      if (i < this.digits.length) {
        digitSum += this.digits[i];
      }
      if (i < other.digits.length) {
        digitSum += other.digits[i];
      }
      if (digitSum >= 10) {
        this.digits[i] = digitSum - 10;
        carry = 1;
      } else {
        this.digits[i] = digitSum;
        carry = 0;
      }
    }
    if (carry > 0) {
      this.digits[maxNrOfDigits] = 1;
    }
  }
  toString() {
    let res = "";
    for (let i = this.digits.length - 1; i >= 0; i--) {
      res += this.digits[i];
    }
    return res;
  }
};
var BigIntForMultiplication = class {
  constructor(value) {
    this.powerOfTwos = [value];
  }
  getValue() {
    return this.powerOfTwos[0];
  }
  multiplyBy(num) {
    const product = BigInteger.zero();
    this.multiplyByAndAddTo(num, product);
    return product;
  }
  multiplyByAndAddTo(num, result) {
    for (let exponent = 0; num !== 0; num = num >>> 1, exponent++) {
      if (num & 1) {
        const value = this.getMultipliedByPowerOfTwo(exponent);
        result.addToSelf(value);
      }
    }
  }
  getMultipliedByPowerOfTwo(exponent) {
    for (let i = this.powerOfTwos.length; i <= exponent; i++) {
      const previousPower = this.powerOfTwos[i - 1];
      this.powerOfTwos[i] = previousPower.add(previousPower);
    }
    return this.powerOfTwos[exponent];
  }
};
var BigIntExponentiation = class {
  constructor(base) {
    this.base = base;
    this.exponents = [new BigIntForMultiplication(BigInteger.one())];
  }
  toThePowerOf(exponent) {
    for (let i = this.exponents.length; i <= exponent; i++) {
      const value = this.exponents[i - 1].multiplyBy(this.base);
      this.exponents[i] = new BigIntForMultiplication(value);
    }
    return this.exponents[exponent];
  }
};
function computeDigest(message) {
  return sha1(serializeNodes(message.nodes).join("") + `[${message.meaning}]`);
}
function decimalDigest(message) {
  return message.id || computeDecimalDigest(message);
}
function computeDecimalDigest(message) {
  const visitor = new _SerializerIgnoreIcuExpVisitor();
  const parts = message.nodes.map((a) => a.visit(visitor, null));
  return computeMsgId(parts.join(""), message.meaning);
}
var _SerializerVisitor = class {
  visitText(text, context) {
    return text.value;
  }
  visitContainer(container, context) {
    return `[${container.children.map((child) => child.visit(this)).join(", ")}]`;
  }
  visitIcu(icu, context) {
    const strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    return `{${icu.expression}, ${icu.type}, ${strCases.join(", ")}}`;
  }
  visitTagPlaceholder(ph, context) {
    return ph.isVoid ? `<ph tag name="${ph.startName}"/>` : `<ph tag name="${ph.startName}">${ph.children.map((child) => child.visit(this)).join(", ")}</ph name="${ph.closeName}">`;
  }
  visitPlaceholder(ph, context) {
    return ph.value ? `<ph name="${ph.name}">${ph.value}</ph>` : `<ph name="${ph.name}"/>`;
  }
  visitIcuPlaceholder(ph, context) {
    return `<ph icu name="${ph.name}">${ph.value.visit(this)}</ph>`;
  }
};
var serializerVisitor$1 = new _SerializerVisitor();
function serializeNodes(nodes) {
  return nodes.map((a) => a.visit(serializerVisitor$1, null));
}
var _SerializerIgnoreIcuExpVisitor = class extends _SerializerVisitor {
  visitIcu(icu, context) {
    let strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    return `{${icu.type}, ${strCases.join(", ")}}`;
  }
};
function sha1(str) {
  const utf8 = utf8Encode(str);
  const words32 = bytesToWords32(utf8, Endian.Big);
  const len = utf8.length * 8;
  const w = newArray(80);
  let a = 1732584193, b = 4023233417, c = 2562383102, d = 271733878, e = 3285377520;
  words32[len >> 5] |= 128 << 24 - len % 32;
  words32[(len + 64 >> 9 << 4) + 15] = len;
  for (let i = 0; i < words32.length; i += 16) {
    const h0 = a, h1 = b, h2 = c, h3 = d, h4 = e;
    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        w[j] = words32[i + j];
      } else {
        w[j] = rol32(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      const fkVal = fk(j, b, c, d);
      const f = fkVal[0];
      const k = fkVal[1];
      const temp = [rol32(a, 5), f, e, k, w[j]].reduce(add32);
      e = d;
      d = c;
      c = rol32(b, 30);
      b = a;
      a = temp;
    }
    a = add32(a, h0);
    b = add32(b, h1);
    c = add32(c, h2);
    d = add32(d, h3);
    e = add32(e, h4);
  }
  return bytesToHexString(words32ToByteString([a, b, c, d, e]));
}
function fk(index2, b, c, d) {
  if (index2 < 20) {
    return [b & c | ~b & d, 1518500249];
  }
  if (index2 < 40) {
    return [b ^ c ^ d, 1859775393];
  }
  if (index2 < 60) {
    return [b & c | b & d | c & d, 2400959708];
  }
  return [b ^ c ^ d, 3395469782];
}
function fingerprint(str) {
  const utf8 = utf8Encode(str);
  let hi = hash32(utf8, 0);
  let lo = hash32(utf8, 102072);
  if (hi == 0 && (lo == 0 || lo == 1)) {
    hi = hi ^ 319790063;
    lo = lo ^ -1801410264;
  }
  return [hi, lo];
}
function computeMsgId(msg, meaning = "") {
  let msgFingerprint = fingerprint(msg);
  if (meaning) {
    const meaningFingerprint = fingerprint(meaning);
    msgFingerprint = add64(rol64(msgFingerprint, 1), meaningFingerprint);
  }
  const hi = msgFingerprint[0];
  const lo = msgFingerprint[1];
  return wordsToDecimalString(hi & 2147483647, lo);
}
function hash32(bytes, c) {
  let a = 2654435769, b = 2654435769;
  let i;
  const len = bytes.length;
  for (i = 0; i + 12 <= len; i += 12) {
    a = add32(a, wordAt(bytes, i, Endian.Little));
    b = add32(b, wordAt(bytes, i + 4, Endian.Little));
    c = add32(c, wordAt(bytes, i + 8, Endian.Little));
    const res = mix(a, b, c);
    a = res[0], b = res[1], c = res[2];
  }
  a = add32(a, wordAt(bytes, i, Endian.Little));
  b = add32(b, wordAt(bytes, i + 4, Endian.Little));
  c = add32(c, len);
  c = add32(c, wordAt(bytes, i + 8, Endian.Little) << 8);
  return mix(a, b, c)[2];
}
function mix(a, b, c) {
  a = sub32(a, b);
  a = sub32(a, c);
  a ^= c >>> 13;
  b = sub32(b, c);
  b = sub32(b, a);
  b ^= a << 8;
  c = sub32(c, a);
  c = sub32(c, b);
  c ^= b >>> 13;
  a = sub32(a, b);
  a = sub32(a, c);
  a ^= c >>> 12;
  b = sub32(b, c);
  b = sub32(b, a);
  b ^= a << 16;
  c = sub32(c, a);
  c = sub32(c, b);
  c ^= b >>> 5;
  a = sub32(a, b);
  a = sub32(a, c);
  a ^= c >>> 3;
  b = sub32(b, c);
  b = sub32(b, a);
  b ^= a << 10;
  c = sub32(c, a);
  c = sub32(c, b);
  c ^= b >>> 15;
  return [a, b, c];
}
var Endian;
(function(Endian2) {
  Endian2[Endian2["Little"] = 0] = "Little";
  Endian2[Endian2["Big"] = 1] = "Big";
})(Endian || (Endian = {}));
function add32(a, b) {
  return add32to64(a, b)[1];
}
function add32to64(a, b) {
  const low = (a & 65535) + (b & 65535);
  const high = (a >>> 16) + (b >>> 16) + (low >>> 16);
  return [high >>> 16, high << 16 | low & 65535];
}
function add64(a, b) {
  const ah = a[0], al = a[1];
  const bh = b[0], bl = b[1];
  const result = add32to64(al, bl);
  const carry = result[0];
  const l = result[1];
  const h = add32(add32(ah, bh), carry);
  return [h, l];
}
function sub32(a, b) {
  const low = (a & 65535) - (b & 65535);
  const high = (a >> 16) - (b >> 16) + (low >> 16);
  return high << 16 | low & 65535;
}
function rol32(a, count) {
  return a << count | a >>> 32 - count;
}
function rol64(num, count) {
  const hi = num[0], lo = num[1];
  const h = hi << count | lo >>> 32 - count;
  const l = lo << count | hi >>> 32 - count;
  return [h, l];
}
function bytesToWords32(bytes, endian) {
  const size = bytes.length + 3 >>> 2;
  const words32 = [];
  for (let i = 0; i < size; i++) {
    words32[i] = wordAt(bytes, i * 4, endian);
  }
  return words32;
}
function byteAt(bytes, index2) {
  return index2 >= bytes.length ? 0 : bytes[index2];
}
function wordAt(bytes, index2, endian) {
  let word = 0;
  if (endian === Endian.Big) {
    for (let i = 0; i < 4; i++) {
      word += byteAt(bytes, index2 + i) << 24 - 8 * i;
    }
  } else {
    for (let i = 0; i < 4; i++) {
      word += byteAt(bytes, index2 + i) << 8 * i;
    }
  }
  return word;
}
function words32ToByteString(words32) {
  return words32.reduce((bytes, word) => bytes.concat(word32ToByteString(word)), []);
}
function word32ToByteString(word) {
  let bytes = [];
  for (let i = 0; i < 4; i++) {
    bytes.push(word >>> 8 * (3 - i) & 255);
  }
  return bytes;
}
function bytesToHexString(bytes) {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    const b = byteAt(bytes, i);
    hex += (b >>> 4).toString(16) + (b & 15).toString(16);
  }
  return hex.toLowerCase();
}
var base256 = new BigIntExponentiation(256);
function wordsToDecimalString(hi, lo) {
  const decimal = base256.toThePowerOf(0).multiplyBy(lo);
  base256.toThePowerOf(4).multiplyByAndAddTo(hi, decimal);
  return decimal.toString();
}
var TypeModifier;
(function(TypeModifier2) {
  TypeModifier2[TypeModifier2["None"] = 0] = "None";
  TypeModifier2[TypeModifier2["Const"] = 1] = "Const";
})(TypeModifier || (TypeModifier = {}));
var Type = class {
  constructor(modifiers = TypeModifier.None) {
    this.modifiers = modifiers;
  }
  hasModifier(modifier) {
    return (this.modifiers & modifier) !== 0;
  }
};
var BuiltinTypeName;
(function(BuiltinTypeName2) {
  BuiltinTypeName2[BuiltinTypeName2["Dynamic"] = 0] = "Dynamic";
  BuiltinTypeName2[BuiltinTypeName2["Bool"] = 1] = "Bool";
  BuiltinTypeName2[BuiltinTypeName2["String"] = 2] = "String";
  BuiltinTypeName2[BuiltinTypeName2["Int"] = 3] = "Int";
  BuiltinTypeName2[BuiltinTypeName2["Number"] = 4] = "Number";
  BuiltinTypeName2[BuiltinTypeName2["Function"] = 5] = "Function";
  BuiltinTypeName2[BuiltinTypeName2["Inferred"] = 6] = "Inferred";
  BuiltinTypeName2[BuiltinTypeName2["None"] = 7] = "None";
})(BuiltinTypeName || (BuiltinTypeName = {}));
var BuiltinType = class extends Type {
  constructor(name, modifiers) {
    super(modifiers);
    this.name = name;
  }
  visitType(visitor, context) {
    return visitor.visitBuiltinType(this, context);
  }
};
var ExpressionType = class extends Type {
  constructor(value, modifiers, typeParams = null) {
    super(modifiers);
    this.value = value;
    this.typeParams = typeParams;
  }
  visitType(visitor, context) {
    return visitor.visitExpressionType(this, context);
  }
};
var DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic);
var INFERRED_TYPE = new BuiltinType(BuiltinTypeName.Inferred);
var BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool);
var INT_TYPE = new BuiltinType(BuiltinTypeName.Int);
var NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number);
var STRING_TYPE = new BuiltinType(BuiltinTypeName.String);
var FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);
var NONE_TYPE = new BuiltinType(BuiltinTypeName.None);
var UnaryOperator;
(function(UnaryOperator2) {
  UnaryOperator2[UnaryOperator2["Minus"] = 0] = "Minus";
  UnaryOperator2[UnaryOperator2["Plus"] = 1] = "Plus";
})(UnaryOperator || (UnaryOperator = {}));
var BinaryOperator;
(function(BinaryOperator2) {
  BinaryOperator2[BinaryOperator2["Equals"] = 0] = "Equals";
  BinaryOperator2[BinaryOperator2["NotEquals"] = 1] = "NotEquals";
  BinaryOperator2[BinaryOperator2["Identical"] = 2] = "Identical";
  BinaryOperator2[BinaryOperator2["NotIdentical"] = 3] = "NotIdentical";
  BinaryOperator2[BinaryOperator2["Minus"] = 4] = "Minus";
  BinaryOperator2[BinaryOperator2["Plus"] = 5] = "Plus";
  BinaryOperator2[BinaryOperator2["Divide"] = 6] = "Divide";
  BinaryOperator2[BinaryOperator2["Multiply"] = 7] = "Multiply";
  BinaryOperator2[BinaryOperator2["Modulo"] = 8] = "Modulo";
  BinaryOperator2[BinaryOperator2["And"] = 9] = "And";
  BinaryOperator2[BinaryOperator2["Or"] = 10] = "Or";
  BinaryOperator2[BinaryOperator2["BitwiseAnd"] = 11] = "BitwiseAnd";
  BinaryOperator2[BinaryOperator2["Lower"] = 12] = "Lower";
  BinaryOperator2[BinaryOperator2["LowerEquals"] = 13] = "LowerEquals";
  BinaryOperator2[BinaryOperator2["Bigger"] = 14] = "Bigger";
  BinaryOperator2[BinaryOperator2["BiggerEquals"] = 15] = "BiggerEquals";
  BinaryOperator2[BinaryOperator2["NullishCoalesce"] = 16] = "NullishCoalesce";
})(BinaryOperator || (BinaryOperator = {}));
function nullSafeIsEquivalent(base, other) {
  if (base == null || other == null) {
    return base == other;
  }
  return base.isEquivalent(other);
}
function areAllEquivalentPredicate(base, other, equivalentPredicate) {
  const len = base.length;
  if (len !== other.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (!equivalentPredicate(base[i], other[i])) {
      return false;
    }
  }
  return true;
}
function areAllEquivalent(base, other) {
  return areAllEquivalentPredicate(base, other, (baseElement, otherElement) => baseElement.isEquivalent(otherElement));
}
var Expression = class {
  constructor(type, sourceSpan) {
    this.type = type || null;
    this.sourceSpan = sourceSpan || null;
  }
  prop(name, sourceSpan) {
    return new ReadPropExpr(this, name, null, sourceSpan);
  }
  key(index2, type, sourceSpan) {
    return new ReadKeyExpr(this, index2, type, sourceSpan);
  }
  callFn(params, sourceSpan, pure) {
    return new InvokeFunctionExpr(this, params, null, sourceSpan, pure);
  }
  instantiate(params, type, sourceSpan) {
    return new InstantiateExpr(this, params, type, sourceSpan);
  }
  conditional(trueCase, falseCase = null, sourceSpan) {
    return new ConditionalExpr(this, trueCase, falseCase, null, sourceSpan);
  }
  equals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs, null, sourceSpan);
  }
  notEquals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs, null, sourceSpan);
  }
  identical(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs, null, sourceSpan);
  }
  notIdentical(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs, null, sourceSpan);
  }
  minus(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs, null, sourceSpan);
  }
  plus(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs, null, sourceSpan);
  }
  divide(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs, null, sourceSpan);
  }
  multiply(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs, null, sourceSpan);
  }
  modulo(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs, null, sourceSpan);
  }
  and(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.And, this, rhs, null, sourceSpan);
  }
  bitwiseAnd(rhs, sourceSpan, parens = true) {
    return new BinaryOperatorExpr(BinaryOperator.BitwiseAnd, this, rhs, null, sourceSpan, parens);
  }
  or(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs, null, sourceSpan);
  }
  lower(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs, null, sourceSpan);
  }
  lowerEquals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs, null, sourceSpan);
  }
  bigger(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs, null, sourceSpan);
  }
  biggerEquals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs, null, sourceSpan);
  }
  isBlank(sourceSpan) {
    return this.equals(TYPED_NULL_EXPR, sourceSpan);
  }
  nullishCoalesce(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.NullishCoalesce, this, rhs, null, sourceSpan);
  }
  toStmt() {
    return new ExpressionStatement(this, null);
  }
};
var ReadVarExpr = class extends Expression {
  constructor(name, type, sourceSpan) {
    super(type, sourceSpan);
    this.name = name;
  }
  isEquivalent(e) {
    return e instanceof ReadVarExpr && this.name === e.name;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitReadVarExpr(this, context);
  }
  set(value) {
    return new WriteVarExpr(this.name, value, null, this.sourceSpan);
  }
};
var TypeofExpr = class extends Expression {
  constructor(expr, type, sourceSpan) {
    super(type, sourceSpan);
    this.expr = expr;
  }
  visitExpression(visitor, context) {
    return visitor.visitTypeofExpr(this, context);
  }
  isEquivalent(e) {
    return e instanceof TypeofExpr && e.expr.isEquivalent(this.expr);
  }
  isConstant() {
    return this.expr.isConstant();
  }
};
var WrappedNodeExpr = class extends Expression {
  constructor(node, type, sourceSpan) {
    super(type, sourceSpan);
    this.node = node;
  }
  isEquivalent(e) {
    return e instanceof WrappedNodeExpr && this.node === e.node;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWrappedNodeExpr(this, context);
  }
};
var WriteVarExpr = class extends Expression {
  constructor(name, value, type, sourceSpan) {
    super(type || value.type, sourceSpan);
    this.name = name;
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof WriteVarExpr && this.name === e.name && this.value.isEquivalent(e.value);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWriteVarExpr(this, context);
  }
  toDeclStmt(type, modifiers) {
    return new DeclareVarStmt(this.name, this.value, type, modifiers, this.sourceSpan);
  }
  toConstDecl() {
    return this.toDeclStmt(INFERRED_TYPE, StmtModifier.Final);
  }
};
var WriteKeyExpr = class extends Expression {
  constructor(receiver, index2, value, type, sourceSpan) {
    super(type || value.type, sourceSpan);
    this.receiver = receiver;
    this.index = index2;
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof WriteKeyExpr && this.receiver.isEquivalent(e.receiver) && this.index.isEquivalent(e.index) && this.value.isEquivalent(e.value);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWriteKeyExpr(this, context);
  }
};
var WritePropExpr = class extends Expression {
  constructor(receiver, name, value, type, sourceSpan) {
    super(type || value.type, sourceSpan);
    this.receiver = receiver;
    this.name = name;
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof WritePropExpr && this.receiver.isEquivalent(e.receiver) && this.name === e.name && this.value.isEquivalent(e.value);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWritePropExpr(this, context);
  }
};
var InvokeFunctionExpr = class extends Expression {
  constructor(fn2, args, type, sourceSpan, pure = false) {
    super(type, sourceSpan);
    this.fn = fn2;
    this.args = args;
    this.pure = pure;
  }
  isEquivalent(e) {
    return e instanceof InvokeFunctionExpr && this.fn.isEquivalent(e.fn) && areAllEquivalent(this.args, e.args) && this.pure === e.pure;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitInvokeFunctionExpr(this, context);
  }
};
var TaggedTemplateExpr = class extends Expression {
  constructor(tag, template, type, sourceSpan) {
    super(type, sourceSpan);
    this.tag = tag;
    this.template = template;
  }
  isEquivalent(e) {
    return e instanceof TaggedTemplateExpr && this.tag.isEquivalent(e.tag) && areAllEquivalentPredicate(this.template.elements, e.template.elements, (a, b) => a.text === b.text) && areAllEquivalent(this.template.expressions, e.template.expressions);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitTaggedTemplateExpr(this, context);
  }
};
var InstantiateExpr = class extends Expression {
  constructor(classExpr, args, type, sourceSpan) {
    super(type, sourceSpan);
    this.classExpr = classExpr;
    this.args = args;
  }
  isEquivalent(e) {
    return e instanceof InstantiateExpr && this.classExpr.isEquivalent(e.classExpr) && areAllEquivalent(this.args, e.args);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitInstantiateExpr(this, context);
  }
};
var LiteralExpr = class extends Expression {
  constructor(value, type, sourceSpan) {
    super(type, sourceSpan);
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof LiteralExpr && this.value === e.value;
  }
  isConstant() {
    return true;
  }
  visitExpression(visitor, context) {
    return visitor.visitLiteralExpr(this, context);
  }
};
var TemplateLiteral = class {
  constructor(elements, expressions) {
    this.elements = elements;
    this.expressions = expressions;
  }
};
var TemplateLiteralElement = class {
  constructor(text, sourceSpan, rawText) {
    var _a;
    this.text = text;
    this.sourceSpan = sourceSpan;
    this.rawText = (_a = rawText !== null && rawText !== void 0 ? rawText : sourceSpan === null || sourceSpan === void 0 ? void 0 : sourceSpan.toString()) !== null && _a !== void 0 ? _a : escapeForTemplateLiteral(escapeSlashes(text));
  }
};
var LiteralPiece = class {
  constructor(text, sourceSpan) {
    this.text = text;
    this.sourceSpan = sourceSpan;
  }
};
var PlaceholderPiece = class {
  constructor(text, sourceSpan, associatedMessage) {
    this.text = text;
    this.sourceSpan = sourceSpan;
    this.associatedMessage = associatedMessage;
  }
};
var MEANING_SEPARATOR$1 = "|";
var ID_SEPARATOR$1 = "@@";
var LEGACY_ID_INDICATOR = "\u241F";
var LocalizedString = class extends Expression {
  constructor(metaBlock, messageParts, placeHolderNames, expressions, sourceSpan) {
    super(STRING_TYPE, sourceSpan);
    this.metaBlock = metaBlock;
    this.messageParts = messageParts;
    this.placeHolderNames = placeHolderNames;
    this.expressions = expressions;
  }
  isEquivalent(e) {
    return false;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitLocalizedString(this, context);
  }
  serializeI18nHead() {
    let metaBlock = this.metaBlock.description || "";
    if (this.metaBlock.meaning) {
      metaBlock = `${this.metaBlock.meaning}${MEANING_SEPARATOR$1}${metaBlock}`;
    }
    if (this.metaBlock.customId) {
      metaBlock = `${metaBlock}${ID_SEPARATOR$1}${this.metaBlock.customId}`;
    }
    if (this.metaBlock.legacyIds) {
      this.metaBlock.legacyIds.forEach((legacyId) => {
        metaBlock = `${metaBlock}${LEGACY_ID_INDICATOR}${legacyId}`;
      });
    }
    return createCookedRawString(metaBlock, this.messageParts[0].text, this.getMessagePartSourceSpan(0));
  }
  getMessagePartSourceSpan(i) {
    var _a, _b;
    return (_b = (_a = this.messageParts[i]) === null || _a === void 0 ? void 0 : _a.sourceSpan) !== null && _b !== void 0 ? _b : this.sourceSpan;
  }
  getPlaceholderSourceSpan(i) {
    var _a, _b, _c, _d;
    return (_d = (_b = (_a = this.placeHolderNames[i]) === null || _a === void 0 ? void 0 : _a.sourceSpan) !== null && _b !== void 0 ? _b : (_c = this.expressions[i]) === null || _c === void 0 ? void 0 : _c.sourceSpan) !== null && _d !== void 0 ? _d : this.sourceSpan;
  }
  serializeI18nTemplatePart(partIndex) {
    var _a;
    const placeholder = this.placeHolderNames[partIndex - 1];
    const messagePart = this.messageParts[partIndex];
    let metaBlock = placeholder.text;
    if (((_a = placeholder.associatedMessage) === null || _a === void 0 ? void 0 : _a.legacyIds.length) === 0) {
      metaBlock += `${ID_SEPARATOR$1}${computeMsgId(placeholder.associatedMessage.messageString, placeholder.associatedMessage.meaning)}`;
    }
    return createCookedRawString(metaBlock, messagePart.text, this.getMessagePartSourceSpan(partIndex));
  }
};
var escapeSlashes = (str) => str.replace(/\\/g, "\\\\");
var escapeStartingColon = (str) => str.replace(/^:/, "\\:");
var escapeColons = (str) => str.replace(/:/g, "\\:");
var escapeForTemplateLiteral = (str) => str.replace(/`/g, "\\`").replace(/\${/g, "$\\{");
function createCookedRawString(metaBlock, messagePart, range) {
  if (metaBlock === "") {
    return {
      cooked: messagePart,
      raw: escapeForTemplateLiteral(escapeStartingColon(escapeSlashes(messagePart))),
      range
    };
  } else {
    return {
      cooked: `:${metaBlock}:${messagePart}`,
      raw: escapeForTemplateLiteral(`:${escapeColons(escapeSlashes(metaBlock))}:${escapeSlashes(messagePart)}`),
      range
    };
  }
}
var ExternalExpr = class extends Expression {
  constructor(value, type, typeParams = null, sourceSpan) {
    super(type, sourceSpan);
    this.value = value;
    this.typeParams = typeParams;
  }
  isEquivalent(e) {
    return e instanceof ExternalExpr && this.value.name === e.value.name && this.value.moduleName === e.value.moduleName && this.value.runtime === e.value.runtime;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitExternalExpr(this, context);
  }
};
var ConditionalExpr = class extends Expression {
  constructor(condition, trueCase, falseCase = null, type, sourceSpan) {
    super(type || trueCase.type, sourceSpan);
    this.condition = condition;
    this.falseCase = falseCase;
    this.trueCase = trueCase;
  }
  isEquivalent(e) {
    return e instanceof ConditionalExpr && this.condition.isEquivalent(e.condition) && this.trueCase.isEquivalent(e.trueCase) && nullSafeIsEquivalent(this.falseCase, e.falseCase);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitConditionalExpr(this, context);
  }
};
var NotExpr = class extends Expression {
  constructor(condition, sourceSpan) {
    super(BOOL_TYPE, sourceSpan);
    this.condition = condition;
  }
  isEquivalent(e) {
    return e instanceof NotExpr && this.condition.isEquivalent(e.condition);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitNotExpr(this, context);
  }
};
var FnParam = class {
  constructor(name, type = null) {
    this.name = name;
    this.type = type;
  }
  isEquivalent(param) {
    return this.name === param.name;
  }
};
var FunctionExpr = class extends Expression {
  constructor(params, statements, type, sourceSpan, name) {
    super(type, sourceSpan);
    this.params = params;
    this.statements = statements;
    this.name = name;
  }
  isEquivalent(e) {
    return e instanceof FunctionExpr && areAllEquivalent(this.params, e.params) && areAllEquivalent(this.statements, e.statements);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitFunctionExpr(this, context);
  }
  toDeclStmt(name, modifiers) {
    return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers, this.sourceSpan);
  }
};
var UnaryOperatorExpr = class extends Expression {
  constructor(operator, expr, type, sourceSpan, parens = true) {
    super(type || NUMBER_TYPE, sourceSpan);
    this.operator = operator;
    this.expr = expr;
    this.parens = parens;
  }
  isEquivalent(e) {
    return e instanceof UnaryOperatorExpr && this.operator === e.operator && this.expr.isEquivalent(e.expr);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitUnaryOperatorExpr(this, context);
  }
};
var BinaryOperatorExpr = class extends Expression {
  constructor(operator, lhs, rhs, type, sourceSpan, parens = true) {
    super(type || lhs.type, sourceSpan);
    this.operator = operator;
    this.rhs = rhs;
    this.parens = parens;
    this.lhs = lhs;
  }
  isEquivalent(e) {
    return e instanceof BinaryOperatorExpr && this.operator === e.operator && this.lhs.isEquivalent(e.lhs) && this.rhs.isEquivalent(e.rhs);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitBinaryOperatorExpr(this, context);
  }
};
var ReadPropExpr = class extends Expression {
  constructor(receiver, name, type, sourceSpan) {
    super(type, sourceSpan);
    this.receiver = receiver;
    this.name = name;
  }
  isEquivalent(e) {
    return e instanceof ReadPropExpr && this.receiver.isEquivalent(e.receiver) && this.name === e.name;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitReadPropExpr(this, context);
  }
  set(value) {
    return new WritePropExpr(this.receiver, this.name, value, null, this.sourceSpan);
  }
};
var ReadKeyExpr = class extends Expression {
  constructor(receiver, index2, type, sourceSpan) {
    super(type, sourceSpan);
    this.receiver = receiver;
    this.index = index2;
  }
  isEquivalent(e) {
    return e instanceof ReadKeyExpr && this.receiver.isEquivalent(e.receiver) && this.index.isEquivalent(e.index);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitReadKeyExpr(this, context);
  }
  set(value) {
    return new WriteKeyExpr(this.receiver, this.index, value, null, this.sourceSpan);
  }
};
var LiteralArrayExpr = class extends Expression {
  constructor(entries, type, sourceSpan) {
    super(type, sourceSpan);
    this.entries = entries;
  }
  isConstant() {
    return this.entries.every((e) => e.isConstant());
  }
  isEquivalent(e) {
    return e instanceof LiteralArrayExpr && areAllEquivalent(this.entries, e.entries);
  }
  visitExpression(visitor, context) {
    return visitor.visitLiteralArrayExpr(this, context);
  }
};
var LiteralMapEntry = class {
  constructor(key, value, quoted) {
    this.key = key;
    this.value = value;
    this.quoted = quoted;
  }
  isEquivalent(e) {
    return this.key === e.key && this.value.isEquivalent(e.value);
  }
};
var LiteralMapExpr = class extends Expression {
  constructor(entries, type, sourceSpan) {
    super(type, sourceSpan);
    this.entries = entries;
    this.valueType = null;
    if (type) {
      this.valueType = type.valueType;
    }
  }
  isEquivalent(e) {
    return e instanceof LiteralMapExpr && areAllEquivalent(this.entries, e.entries);
  }
  isConstant() {
    return this.entries.every((e) => e.value.isConstant());
  }
  visitExpression(visitor, context) {
    return visitor.visitLiteralMapExpr(this, context);
  }
};
var NULL_EXPR = new LiteralExpr(null, null, null);
var TYPED_NULL_EXPR = new LiteralExpr(null, INFERRED_TYPE, null);
var StmtModifier;
(function(StmtModifier2) {
  StmtModifier2[StmtModifier2["None"] = 0] = "None";
  StmtModifier2[StmtModifier2["Final"] = 1] = "Final";
  StmtModifier2[StmtModifier2["Private"] = 2] = "Private";
  StmtModifier2[StmtModifier2["Exported"] = 4] = "Exported";
  StmtModifier2[StmtModifier2["Static"] = 8] = "Static";
})(StmtModifier || (StmtModifier = {}));
var LeadingComment = class {
  constructor(text, multiline, trailingNewline) {
    this.text = text;
    this.multiline = multiline;
    this.trailingNewline = trailingNewline;
  }
  toString() {
    return this.multiline ? ` ${this.text} ` : this.text;
  }
};
var JSDocComment = class extends LeadingComment {
  constructor(tags) {
    super("", true, true);
    this.tags = tags;
  }
  toString() {
    return serializeTags(this.tags);
  }
};
var Statement = class {
  constructor(modifiers = StmtModifier.None, sourceSpan = null, leadingComments) {
    this.modifiers = modifiers;
    this.sourceSpan = sourceSpan;
    this.leadingComments = leadingComments;
  }
  hasModifier(modifier) {
    return (this.modifiers & modifier) !== 0;
  }
  addLeadingComment(leadingComment) {
    var _a;
    this.leadingComments = (_a = this.leadingComments) !== null && _a !== void 0 ? _a : [];
    this.leadingComments.push(leadingComment);
  }
};
var DeclareVarStmt = class extends Statement {
  constructor(name, value, type, modifiers, sourceSpan, leadingComments) {
    super(modifiers, sourceSpan, leadingComments);
    this.name = name;
    this.value = value;
    this.type = type || value && value.type || null;
  }
  isEquivalent(stmt) {
    return stmt instanceof DeclareVarStmt && this.name === stmt.name && (this.value ? !!stmt.value && this.value.isEquivalent(stmt.value) : !stmt.value);
  }
  visitStatement(visitor, context) {
    return visitor.visitDeclareVarStmt(this, context);
  }
};
var DeclareFunctionStmt = class extends Statement {
  constructor(name, params, statements, type, modifiers, sourceSpan, leadingComments) {
    super(modifiers, sourceSpan, leadingComments);
    this.name = name;
    this.params = params;
    this.statements = statements;
    this.type = type || null;
  }
  isEquivalent(stmt) {
    return stmt instanceof DeclareFunctionStmt && areAllEquivalent(this.params, stmt.params) && areAllEquivalent(this.statements, stmt.statements);
  }
  visitStatement(visitor, context) {
    return visitor.visitDeclareFunctionStmt(this, context);
  }
};
var ExpressionStatement = class extends Statement {
  constructor(expr, sourceSpan, leadingComments) {
    super(StmtModifier.None, sourceSpan, leadingComments);
    this.expr = expr;
  }
  isEquivalent(stmt) {
    return stmt instanceof ExpressionStatement && this.expr.isEquivalent(stmt.expr);
  }
  visitStatement(visitor, context) {
    return visitor.visitExpressionStmt(this, context);
  }
};
var ReturnStatement = class extends Statement {
  constructor(value, sourceSpan = null, leadingComments) {
    super(StmtModifier.None, sourceSpan, leadingComments);
    this.value = value;
  }
  isEquivalent(stmt) {
    return stmt instanceof ReturnStatement && this.value.isEquivalent(stmt.value);
  }
  visitStatement(visitor, context) {
    return visitor.visitReturnStmt(this, context);
  }
};
var IfStmt = class extends Statement {
  constructor(condition, trueCase, falseCase = [], sourceSpan, leadingComments) {
    super(StmtModifier.None, sourceSpan, leadingComments);
    this.condition = condition;
    this.trueCase = trueCase;
    this.falseCase = falseCase;
  }
  isEquivalent(stmt) {
    return stmt instanceof IfStmt && this.condition.isEquivalent(stmt.condition) && areAllEquivalent(this.trueCase, stmt.trueCase) && areAllEquivalent(this.falseCase, stmt.falseCase);
  }
  visitStatement(visitor, context) {
    return visitor.visitIfStmt(this, context);
  }
};
function jsDocComment(tags = []) {
  return new JSDocComment(tags);
}
function variable(name, type, sourceSpan) {
  return new ReadVarExpr(name, type, sourceSpan);
}
function importExpr(id, typeParams = null, sourceSpan) {
  return new ExternalExpr(id, null, typeParams, sourceSpan);
}
function expressionType(expr, typeModifiers, typeParams) {
  return new ExpressionType(expr, typeModifiers, typeParams);
}
function typeofExpr(expr) {
  return new TypeofExpr(expr);
}
function literalArr(values, type, sourceSpan) {
  return new LiteralArrayExpr(values, type, sourceSpan);
}
function literalMap(values, type = null) {
  return new LiteralMapExpr(values.map((e) => new LiteralMapEntry(e.key, e.value, e.quoted)), type, null);
}
function not(expr, sourceSpan) {
  return new NotExpr(expr, sourceSpan);
}
function fn(params, body, type, sourceSpan, name) {
  return new FunctionExpr(params, body, type, sourceSpan, name);
}
function ifStmt(condition, thenClause, elseClause, sourceSpan, leadingComments) {
  return new IfStmt(condition, thenClause, elseClause, sourceSpan, leadingComments);
}
function taggedTemplate(tag, template, type, sourceSpan) {
  return new TaggedTemplateExpr(tag, template, type, sourceSpan);
}
function literal(value, type, sourceSpan) {
  return new LiteralExpr(value, type, sourceSpan);
}
function localizedString(metaBlock, messageParts, placeholderNames, expressions, sourceSpan) {
  return new LocalizedString(metaBlock, messageParts, placeholderNames, expressions, sourceSpan);
}
function isNull(exp) {
  return exp instanceof LiteralExpr && exp.value === null;
}
function tagToString(tag) {
  let out = "";
  if (tag.tagName) {
    out += ` @${tag.tagName}`;
  }
  if (tag.text) {
    if (tag.text.match(/\/\*|\*\//)) {
      throw new Error('JSDoc text cannot contain "/*" and "*/"');
    }
    out += " " + tag.text.replace(/@/g, "\\@");
  }
  return out;
}
function serializeTags(tags) {
  if (tags.length === 0)
    return "";
  if (tags.length === 1 && tags[0].tagName && !tags[0].text) {
    return `*${tagToString(tags[0])} `;
  }
  let out = "*\n";
  for (const tag of tags) {
    out += " *";
    out += tagToString(tag).replace(/\n/g, "\n * ");
    out += "\n";
  }
  out += " ";
  return out;
}
var CONSTANT_PREFIX = "_c";
var UNKNOWN_VALUE_KEY = variable("<unknown>");
var KEY_CONTEXT = {};
var POOL_INCLUSION_LENGTH_THRESHOLD_FOR_STRINGS = 50;
var FixupExpression = class extends Expression {
  constructor(resolved) {
    super(resolved.type);
    this.resolved = resolved;
    this.original = resolved;
  }
  visitExpression(visitor, context) {
    if (context === KEY_CONTEXT) {
      return this.original.visitExpression(visitor, context);
    } else {
      return this.resolved.visitExpression(visitor, context);
    }
  }
  isEquivalent(e) {
    return e instanceof FixupExpression && this.resolved.isEquivalent(e.resolved);
  }
  isConstant() {
    return true;
  }
  fixup(expression) {
    this.resolved = expression;
    this.shared = true;
  }
};
var ConstantPool = class {
  constructor(isClosureCompilerEnabled = false) {
    this.isClosureCompilerEnabled = isClosureCompilerEnabled;
    this.statements = [];
    this.literals = /* @__PURE__ */ new Map();
    this.literalFactories = /* @__PURE__ */ new Map();
    this.nextNameIndex = 0;
  }
  getConstLiteral(literal2, forceShared) {
    if (literal2 instanceof LiteralExpr && !isLongStringLiteral(literal2) || literal2 instanceof FixupExpression) {
      return literal2;
    }
    const key = this.keyOf(literal2);
    let fixup = this.literals.get(key);
    let newValue = false;
    if (!fixup) {
      fixup = new FixupExpression(literal2);
      this.literals.set(key, fixup);
      newValue = true;
    }
    if (!newValue && !fixup.shared || newValue && forceShared) {
      const name = this.freshName();
      let definition;
      let usage;
      if (this.isClosureCompilerEnabled && isLongStringLiteral(literal2)) {
        definition = variable(name).set(new FunctionExpr([], [
          new ReturnStatement(literal2)
        ]));
        usage = variable(name).callFn([]);
      } else {
        definition = variable(name).set(literal2);
        usage = variable(name);
      }
      this.statements.push(definition.toDeclStmt(INFERRED_TYPE, StmtModifier.Final));
      fixup.fixup(usage);
    }
    return fixup;
  }
  getLiteralFactory(literal2) {
    if (literal2 instanceof LiteralArrayExpr) {
      const argumentsForKey = literal2.entries.map((e) => e.isConstant() ? e : UNKNOWN_VALUE_KEY);
      const key = this.keyOf(literalArr(argumentsForKey));
      return this._getLiteralFactory(key, literal2.entries, (entries) => literalArr(entries));
    } else {
      const expressionForKey = literalMap(literal2.entries.map((e) => ({
        key: e.key,
        value: e.value.isConstant() ? e.value : UNKNOWN_VALUE_KEY,
        quoted: e.quoted
      })));
      const key = this.keyOf(expressionForKey);
      return this._getLiteralFactory(key, literal2.entries.map((e) => e.value), (entries) => literalMap(entries.map((value, index2) => ({
        key: literal2.entries[index2].key,
        value,
        quoted: literal2.entries[index2].quoted
      }))));
    }
  }
  _getLiteralFactory(key, values, resultMap) {
    let literalFactory = this.literalFactories.get(key);
    const literalFactoryArguments = values.filter((e) => !e.isConstant());
    if (!literalFactory) {
      const resultExpressions = values.map((e, index2) => e.isConstant() ? this.getConstLiteral(e, true) : variable(`a${index2}`));
      const parameters = resultExpressions.filter(isVariable).map((e) => new FnParam(e.name, DYNAMIC_TYPE));
      const pureFunctionDeclaration = fn(parameters, [new ReturnStatement(resultMap(resultExpressions))], INFERRED_TYPE);
      const name = this.freshName();
      this.statements.push(variable(name).set(pureFunctionDeclaration).toDeclStmt(INFERRED_TYPE, StmtModifier.Final));
      literalFactory = variable(name);
      this.literalFactories.set(key, literalFactory);
    }
    return { literalFactory, literalFactoryArguments };
  }
  uniqueName(prefix) {
    return `${prefix}${this.nextNameIndex++}`;
  }
  freshName() {
    return this.uniqueName(CONSTANT_PREFIX);
  }
  keyOf(expression) {
    return expression.visitExpression(new KeyVisitor(), KEY_CONTEXT);
  }
};
var KeyVisitor = class {
  constructor() {
    this.visitWrappedNodeExpr = invalid$1;
    this.visitWriteVarExpr = invalid$1;
    this.visitWriteKeyExpr = invalid$1;
    this.visitWritePropExpr = invalid$1;
    this.visitInvokeFunctionExpr = invalid$1;
    this.visitTaggedTemplateExpr = invalid$1;
    this.visitInstantiateExpr = invalid$1;
    this.visitConditionalExpr = invalid$1;
    this.visitNotExpr = invalid$1;
    this.visitAssertNotNullExpr = invalid$1;
    this.visitCastExpr = invalid$1;
    this.visitFunctionExpr = invalid$1;
    this.visitUnaryOperatorExpr = invalid$1;
    this.visitBinaryOperatorExpr = invalid$1;
    this.visitReadPropExpr = invalid$1;
    this.visitReadKeyExpr = invalid$1;
    this.visitCommaExpr = invalid$1;
    this.visitLocalizedString = invalid$1;
  }
  visitLiteralExpr(ast) {
    return `${typeof ast.value === "string" ? '"' + ast.value + '"' : ast.value}`;
  }
  visitLiteralArrayExpr(ast, context) {
    return `[${ast.entries.map((entry) => entry.visitExpression(this, context)).join(",")}]`;
  }
  visitLiteralMapExpr(ast, context) {
    const mapKey = (entry) => {
      const quote = entry.quoted ? '"' : "";
      return `${quote}${entry.key}${quote}`;
    };
    const mapEntry = (entry) => `${mapKey(entry)}:${entry.value.visitExpression(this, context)}`;
    return `{${ast.entries.map(mapEntry).join(",")}`;
  }
  visitExternalExpr(ast) {
    return ast.value.moduleName ? `EX:${ast.value.moduleName}:${ast.value.name}` : `EX:${ast.value.runtime.name}`;
  }
  visitReadVarExpr(node) {
    return `VAR:${node.name}`;
  }
  visitTypeofExpr(node, context) {
    return `TYPEOF:${node.expr.visitExpression(this, context)}`;
  }
};
function invalid$1(arg) {
  throw new Error(`Invalid state: Visitor ${this.constructor.name} doesn't handle ${arg.constructor.name}`);
}
function isVariable(e) {
  return e instanceof ReadVarExpr;
}
function isLongStringLiteral(expr) {
  return expr instanceof LiteralExpr && typeof expr.value === "string" && expr.value.length >= POOL_INCLUSION_LENGTH_THRESHOLD_FOR_STRINGS;
}
var CORE = "@angular/core";
var Identifiers = class {
};
Identifiers.NEW_METHOD = "factory";
Identifiers.TRANSFORM_METHOD = "transform";
Identifiers.PATCH_DEPS = "patchedDeps";
Identifiers.core = { name: null, moduleName: CORE };
Identifiers.namespaceHTML = { name: "\u0275\u0275namespaceHTML", moduleName: CORE };
Identifiers.namespaceMathML = { name: "\u0275\u0275namespaceMathML", moduleName: CORE };
Identifiers.namespaceSVG = { name: "\u0275\u0275namespaceSVG", moduleName: CORE };
Identifiers.element = { name: "\u0275\u0275element", moduleName: CORE };
Identifiers.elementStart = { name: "\u0275\u0275elementStart", moduleName: CORE };
Identifiers.elementEnd = { name: "\u0275\u0275elementEnd", moduleName: CORE };
Identifiers.advance = { name: "\u0275\u0275advance", moduleName: CORE };
Identifiers.syntheticHostProperty = { name: "\u0275\u0275syntheticHostProperty", moduleName: CORE };
Identifiers.syntheticHostListener = { name: "\u0275\u0275syntheticHostListener", moduleName: CORE };
Identifiers.attribute = { name: "\u0275\u0275attribute", moduleName: CORE };
Identifiers.attributeInterpolate1 = { name: "\u0275\u0275attributeInterpolate1", moduleName: CORE };
Identifiers.attributeInterpolate2 = { name: "\u0275\u0275attributeInterpolate2", moduleName: CORE };
Identifiers.attributeInterpolate3 = { name: "\u0275\u0275attributeInterpolate3", moduleName: CORE };
Identifiers.attributeInterpolate4 = { name: "\u0275\u0275attributeInterpolate4", moduleName: CORE };
Identifiers.attributeInterpolate5 = { name: "\u0275\u0275attributeInterpolate5", moduleName: CORE };
Identifiers.attributeInterpolate6 = { name: "\u0275\u0275attributeInterpolate6", moduleName: CORE };
Identifiers.attributeInterpolate7 = { name: "\u0275\u0275attributeInterpolate7", moduleName: CORE };
Identifiers.attributeInterpolate8 = { name: "\u0275\u0275attributeInterpolate8", moduleName: CORE };
Identifiers.attributeInterpolateV = { name: "\u0275\u0275attributeInterpolateV", moduleName: CORE };
Identifiers.classProp = { name: "\u0275\u0275classProp", moduleName: CORE };
Identifiers.elementContainerStart = { name: "\u0275\u0275elementContainerStart", moduleName: CORE };
Identifiers.elementContainerEnd = { name: "\u0275\u0275elementContainerEnd", moduleName: CORE };
Identifiers.elementContainer = { name: "\u0275\u0275elementContainer", moduleName: CORE };
Identifiers.styleMap = { name: "\u0275\u0275styleMap", moduleName: CORE };
Identifiers.styleMapInterpolate1 = { name: "\u0275\u0275styleMapInterpolate1", moduleName: CORE };
Identifiers.styleMapInterpolate2 = { name: "\u0275\u0275styleMapInterpolate2", moduleName: CORE };
Identifiers.styleMapInterpolate3 = { name: "\u0275\u0275styleMapInterpolate3", moduleName: CORE };
Identifiers.styleMapInterpolate4 = { name: "\u0275\u0275styleMapInterpolate4", moduleName: CORE };
Identifiers.styleMapInterpolate5 = { name: "\u0275\u0275styleMapInterpolate5", moduleName: CORE };
Identifiers.styleMapInterpolate6 = { name: "\u0275\u0275styleMapInterpolate6", moduleName: CORE };
Identifiers.styleMapInterpolate7 = { name: "\u0275\u0275styleMapInterpolate7", moduleName: CORE };
Identifiers.styleMapInterpolate8 = { name: "\u0275\u0275styleMapInterpolate8", moduleName: CORE };
Identifiers.styleMapInterpolateV = { name: "\u0275\u0275styleMapInterpolateV", moduleName: CORE };
Identifiers.classMap = { name: "\u0275\u0275classMap", moduleName: CORE };
Identifiers.classMapInterpolate1 = { name: "\u0275\u0275classMapInterpolate1", moduleName: CORE };
Identifiers.classMapInterpolate2 = { name: "\u0275\u0275classMapInterpolate2", moduleName: CORE };
Identifiers.classMapInterpolate3 = { name: "\u0275\u0275classMapInterpolate3", moduleName: CORE };
Identifiers.classMapInterpolate4 = { name: "\u0275\u0275classMapInterpolate4", moduleName: CORE };
Identifiers.classMapInterpolate5 = { name: "\u0275\u0275classMapInterpolate5", moduleName: CORE };
Identifiers.classMapInterpolate6 = { name: "\u0275\u0275classMapInterpolate6", moduleName: CORE };
Identifiers.classMapInterpolate7 = { name: "\u0275\u0275classMapInterpolate7", moduleName: CORE };
Identifiers.classMapInterpolate8 = { name: "\u0275\u0275classMapInterpolate8", moduleName: CORE };
Identifiers.classMapInterpolateV = { name: "\u0275\u0275classMapInterpolateV", moduleName: CORE };
Identifiers.styleProp = { name: "\u0275\u0275styleProp", moduleName: CORE };
Identifiers.stylePropInterpolate1 = { name: "\u0275\u0275stylePropInterpolate1", moduleName: CORE };
Identifiers.stylePropInterpolate2 = { name: "\u0275\u0275stylePropInterpolate2", moduleName: CORE };
Identifiers.stylePropInterpolate3 = { name: "\u0275\u0275stylePropInterpolate3", moduleName: CORE };
Identifiers.stylePropInterpolate4 = { name: "\u0275\u0275stylePropInterpolate4", moduleName: CORE };
Identifiers.stylePropInterpolate5 = { name: "\u0275\u0275stylePropInterpolate5", moduleName: CORE };
Identifiers.stylePropInterpolate6 = { name: "\u0275\u0275stylePropInterpolate6", moduleName: CORE };
Identifiers.stylePropInterpolate7 = { name: "\u0275\u0275stylePropInterpolate7", moduleName: CORE };
Identifiers.stylePropInterpolate8 = { name: "\u0275\u0275stylePropInterpolate8", moduleName: CORE };
Identifiers.stylePropInterpolateV = { name: "\u0275\u0275stylePropInterpolateV", moduleName: CORE };
Identifiers.nextContext = { name: "\u0275\u0275nextContext", moduleName: CORE };
Identifiers.resetView = { name: "\u0275\u0275resetView", moduleName: CORE };
Identifiers.templateCreate = { name: "\u0275\u0275template", moduleName: CORE };
Identifiers.text = { name: "\u0275\u0275text", moduleName: CORE };
Identifiers.enableBindings = { name: "\u0275\u0275enableBindings", moduleName: CORE };
Identifiers.disableBindings = { name: "\u0275\u0275disableBindings", moduleName: CORE };
Identifiers.getCurrentView = { name: "\u0275\u0275getCurrentView", moduleName: CORE };
Identifiers.textInterpolate = { name: "\u0275\u0275textInterpolate", moduleName: CORE };
Identifiers.textInterpolate1 = { name: "\u0275\u0275textInterpolate1", moduleName: CORE };
Identifiers.textInterpolate2 = { name: "\u0275\u0275textInterpolate2", moduleName: CORE };
Identifiers.textInterpolate3 = { name: "\u0275\u0275textInterpolate3", moduleName: CORE };
Identifiers.textInterpolate4 = { name: "\u0275\u0275textInterpolate4", moduleName: CORE };
Identifiers.textInterpolate5 = { name: "\u0275\u0275textInterpolate5", moduleName: CORE };
Identifiers.textInterpolate6 = { name: "\u0275\u0275textInterpolate6", moduleName: CORE };
Identifiers.textInterpolate7 = { name: "\u0275\u0275textInterpolate7", moduleName: CORE };
Identifiers.textInterpolate8 = { name: "\u0275\u0275textInterpolate8", moduleName: CORE };
Identifiers.textInterpolateV = { name: "\u0275\u0275textInterpolateV", moduleName: CORE };
Identifiers.restoreView = { name: "\u0275\u0275restoreView", moduleName: CORE };
Identifiers.pureFunction0 = { name: "\u0275\u0275pureFunction0", moduleName: CORE };
Identifiers.pureFunction1 = { name: "\u0275\u0275pureFunction1", moduleName: CORE };
Identifiers.pureFunction2 = { name: "\u0275\u0275pureFunction2", moduleName: CORE };
Identifiers.pureFunction3 = { name: "\u0275\u0275pureFunction3", moduleName: CORE };
Identifiers.pureFunction4 = { name: "\u0275\u0275pureFunction4", moduleName: CORE };
Identifiers.pureFunction5 = { name: "\u0275\u0275pureFunction5", moduleName: CORE };
Identifiers.pureFunction6 = { name: "\u0275\u0275pureFunction6", moduleName: CORE };
Identifiers.pureFunction7 = { name: "\u0275\u0275pureFunction7", moduleName: CORE };
Identifiers.pureFunction8 = { name: "\u0275\u0275pureFunction8", moduleName: CORE };
Identifiers.pureFunctionV = { name: "\u0275\u0275pureFunctionV", moduleName: CORE };
Identifiers.pipeBind1 = { name: "\u0275\u0275pipeBind1", moduleName: CORE };
Identifiers.pipeBind2 = { name: "\u0275\u0275pipeBind2", moduleName: CORE };
Identifiers.pipeBind3 = { name: "\u0275\u0275pipeBind3", moduleName: CORE };
Identifiers.pipeBind4 = { name: "\u0275\u0275pipeBind4", moduleName: CORE };
Identifiers.pipeBindV = { name: "\u0275\u0275pipeBindV", moduleName: CORE };
Identifiers.hostProperty = { name: "\u0275\u0275hostProperty", moduleName: CORE };
Identifiers.property = { name: "\u0275\u0275property", moduleName: CORE };
Identifiers.propertyInterpolate = { name: "\u0275\u0275propertyInterpolate", moduleName: CORE };
Identifiers.propertyInterpolate1 = { name: "\u0275\u0275propertyInterpolate1", moduleName: CORE };
Identifiers.propertyInterpolate2 = { name: "\u0275\u0275propertyInterpolate2", moduleName: CORE };
Identifiers.propertyInterpolate3 = { name: "\u0275\u0275propertyInterpolate3", moduleName: CORE };
Identifiers.propertyInterpolate4 = { name: "\u0275\u0275propertyInterpolate4", moduleName: CORE };
Identifiers.propertyInterpolate5 = { name: "\u0275\u0275propertyInterpolate5", moduleName: CORE };
Identifiers.propertyInterpolate6 = { name: "\u0275\u0275propertyInterpolate6", moduleName: CORE };
Identifiers.propertyInterpolate7 = { name: "\u0275\u0275propertyInterpolate7", moduleName: CORE };
Identifiers.propertyInterpolate8 = { name: "\u0275\u0275propertyInterpolate8", moduleName: CORE };
Identifiers.propertyInterpolateV = { name: "\u0275\u0275propertyInterpolateV", moduleName: CORE };
Identifiers.i18n = { name: "\u0275\u0275i18n", moduleName: CORE };
Identifiers.i18nAttributes = { name: "\u0275\u0275i18nAttributes", moduleName: CORE };
Identifiers.i18nExp = { name: "\u0275\u0275i18nExp", moduleName: CORE };
Identifiers.i18nStart = { name: "\u0275\u0275i18nStart", moduleName: CORE };
Identifiers.i18nEnd = { name: "\u0275\u0275i18nEnd", moduleName: CORE };
Identifiers.i18nApply = { name: "\u0275\u0275i18nApply", moduleName: CORE };
Identifiers.i18nPostprocess = { name: "\u0275\u0275i18nPostprocess", moduleName: CORE };
Identifiers.pipe = { name: "\u0275\u0275pipe", moduleName: CORE };
Identifiers.projection = { name: "\u0275\u0275projection", moduleName: CORE };
Identifiers.projectionDef = { name: "\u0275\u0275projectionDef", moduleName: CORE };
Identifiers.reference = { name: "\u0275\u0275reference", moduleName: CORE };
Identifiers.inject = { name: "\u0275\u0275inject", moduleName: CORE };
Identifiers.injectAttribute = { name: "\u0275\u0275injectAttribute", moduleName: CORE };
Identifiers.directiveInject = { name: "\u0275\u0275directiveInject", moduleName: CORE };
Identifiers.invalidFactory = { name: "\u0275\u0275invalidFactory", moduleName: CORE };
Identifiers.invalidFactoryDep = { name: "\u0275\u0275invalidFactoryDep", moduleName: CORE };
Identifiers.templateRefExtractor = { name: "\u0275\u0275templateRefExtractor", moduleName: CORE };
Identifiers.forwardRef = { name: "forwardRef", moduleName: CORE };
Identifiers.resolveForwardRef = { name: "resolveForwardRef", moduleName: CORE };
Identifiers.\u0275\u0275defineInjectable = { name: "\u0275\u0275defineInjectable", moduleName: CORE };
Identifiers.declareInjectable = { name: "\u0275\u0275ngDeclareInjectable", moduleName: CORE };
Identifiers.InjectableDeclaration = { name: "\u0275\u0275InjectableDeclaration", moduleName: CORE };
Identifiers.resolveWindow = { name: "\u0275\u0275resolveWindow", moduleName: CORE };
Identifiers.resolveDocument = { name: "\u0275\u0275resolveDocument", moduleName: CORE };
Identifiers.resolveBody = { name: "\u0275\u0275resolveBody", moduleName: CORE };
Identifiers.defineComponent = { name: "\u0275\u0275defineComponent", moduleName: CORE };
Identifiers.declareComponent = { name: "\u0275\u0275ngDeclareComponent", moduleName: CORE };
Identifiers.setComponentScope = { name: "\u0275\u0275setComponentScope", moduleName: CORE };
Identifiers.ChangeDetectionStrategy = {
  name: "ChangeDetectionStrategy",
  moduleName: CORE
};
Identifiers.ViewEncapsulation = {
  name: "ViewEncapsulation",
  moduleName: CORE
};
Identifiers.ComponentDeclaration = {
  name: "\u0275\u0275ComponentDeclaration",
  moduleName: CORE
};
Identifiers.FactoryDeclaration = {
  name: "\u0275\u0275FactoryDeclaration",
  moduleName: CORE
};
Identifiers.declareFactory = { name: "\u0275\u0275ngDeclareFactory", moduleName: CORE };
Identifiers.FactoryTarget = { name: "\u0275\u0275FactoryTarget", moduleName: CORE };
Identifiers.defineDirective = { name: "\u0275\u0275defineDirective", moduleName: CORE };
Identifiers.declareDirective = { name: "\u0275\u0275ngDeclareDirective", moduleName: CORE };
Identifiers.DirectiveDeclaration = {
  name: "\u0275\u0275DirectiveDeclaration",
  moduleName: CORE
};
Identifiers.InjectorDef = { name: "\u0275\u0275InjectorDef", moduleName: CORE };
Identifiers.InjectorDeclaration = { name: "\u0275\u0275InjectorDeclaration", moduleName: CORE };
Identifiers.defineInjector = { name: "\u0275\u0275defineInjector", moduleName: CORE };
Identifiers.declareInjector = { name: "\u0275\u0275ngDeclareInjector", moduleName: CORE };
Identifiers.NgModuleDeclaration = {
  name: "\u0275\u0275NgModuleDeclaration",
  moduleName: CORE
};
Identifiers.ModuleWithProviders = {
  name: "ModuleWithProviders",
  moduleName: CORE
};
Identifiers.defineNgModule = { name: "\u0275\u0275defineNgModule", moduleName: CORE };
Identifiers.declareNgModule = { name: "\u0275\u0275ngDeclareNgModule", moduleName: CORE };
Identifiers.setNgModuleScope = { name: "\u0275\u0275setNgModuleScope", moduleName: CORE };
Identifiers.registerNgModuleType = { name: "\u0275\u0275registerNgModuleType", moduleName: CORE };
Identifiers.PipeDeclaration = { name: "\u0275\u0275PipeDeclaration", moduleName: CORE };
Identifiers.definePipe = { name: "\u0275\u0275definePipe", moduleName: CORE };
Identifiers.declarePipe = { name: "\u0275\u0275ngDeclarePipe", moduleName: CORE };
Identifiers.declareClassMetadata = { name: "\u0275\u0275ngDeclareClassMetadata", moduleName: CORE };
Identifiers.setClassMetadata = { name: "\u0275setClassMetadata", moduleName: CORE };
Identifiers.queryRefresh = { name: "\u0275\u0275queryRefresh", moduleName: CORE };
Identifiers.viewQuery = { name: "\u0275\u0275viewQuery", moduleName: CORE };
Identifiers.loadQuery = { name: "\u0275\u0275loadQuery", moduleName: CORE };
Identifiers.contentQuery = { name: "\u0275\u0275contentQuery", moduleName: CORE };
Identifiers.NgOnChangesFeature = { name: "\u0275\u0275NgOnChangesFeature", moduleName: CORE };
Identifiers.InheritDefinitionFeature = { name: "\u0275\u0275InheritDefinitionFeature", moduleName: CORE };
Identifiers.CopyDefinitionFeature = { name: "\u0275\u0275CopyDefinitionFeature", moduleName: CORE };
Identifiers.StandaloneFeature = { name: "\u0275\u0275StandaloneFeature", moduleName: CORE };
Identifiers.ProvidersFeature = { name: "\u0275\u0275ProvidersFeature", moduleName: CORE };
Identifiers.HostDirectivesFeature = { name: "\u0275\u0275HostDirectivesFeature", moduleName: CORE };
Identifiers.listener = { name: "\u0275\u0275listener", moduleName: CORE };
Identifiers.getInheritedFactory = {
  name: "\u0275\u0275getInheritedFactory",
  moduleName: CORE
};
Identifiers.sanitizeHtml = { name: "\u0275\u0275sanitizeHtml", moduleName: CORE };
Identifiers.sanitizeStyle = { name: "\u0275\u0275sanitizeStyle", moduleName: CORE };
Identifiers.sanitizeResourceUrl = { name: "\u0275\u0275sanitizeResourceUrl", moduleName: CORE };
Identifiers.sanitizeScript = { name: "\u0275\u0275sanitizeScript", moduleName: CORE };
Identifiers.sanitizeUrl = { name: "\u0275\u0275sanitizeUrl", moduleName: CORE };
Identifiers.sanitizeUrlOrResourceUrl = { name: "\u0275\u0275sanitizeUrlOrResourceUrl", moduleName: CORE };
Identifiers.trustConstantHtml = { name: "\u0275\u0275trustConstantHtml", moduleName: CORE };
Identifiers.trustConstantResourceUrl = { name: "\u0275\u0275trustConstantResourceUrl", moduleName: CORE };
var VERSION$1 = 3;
var JS_B64_PREFIX = "# sourceMappingURL=data:application/json;base64,";
var SourceMapGenerator = class {
  constructor(file = null) {
    this.file = file;
    this.sourcesContent = /* @__PURE__ */ new Map();
    this.lines = [];
    this.lastCol0 = 0;
    this.hasMappings = false;
  }
  addSource(url, content = null) {
    if (!this.sourcesContent.has(url)) {
      this.sourcesContent.set(url, content);
    }
    return this;
  }
  addLine() {
    this.lines.push([]);
    this.lastCol0 = 0;
    return this;
  }
  addMapping(col0, sourceUrl, sourceLine0, sourceCol0) {
    if (!this.currentLine) {
      throw new Error(`A line must be added before mappings can be added`);
    }
    if (sourceUrl != null && !this.sourcesContent.has(sourceUrl)) {
      throw new Error(`Unknown source file "${sourceUrl}"`);
    }
    if (col0 == null) {
      throw new Error(`The column in the generated code must be provided`);
    }
    if (col0 < this.lastCol0) {
      throw new Error(`Mapping should be added in output order`);
    }
    if (sourceUrl && (sourceLine0 == null || sourceCol0 == null)) {
      throw new Error(`The source location must be provided when a source url is provided`);
    }
    this.hasMappings = true;
    this.lastCol0 = col0;
    this.currentLine.push({ col0, sourceUrl, sourceLine0, sourceCol0 });
    return this;
  }
  get currentLine() {
    return this.lines.slice(-1)[0];
  }
  toJSON() {
    if (!this.hasMappings) {
      return null;
    }
    const sourcesIndex = /* @__PURE__ */ new Map();
    const sources = [];
    const sourcesContent = [];
    Array.from(this.sourcesContent.keys()).forEach((url, i) => {
      sourcesIndex.set(url, i);
      sources.push(url);
      sourcesContent.push(this.sourcesContent.get(url) || null);
    });
    let mappings2 = "";
    let lastCol0 = 0;
    let lastSourceIndex = 0;
    let lastSourceLine0 = 0;
    let lastSourceCol0 = 0;
    this.lines.forEach((segments) => {
      lastCol0 = 0;
      mappings2 += segments.map((segment) => {
        let segAsStr = toBase64VLQ(segment.col0 - lastCol0);
        lastCol0 = segment.col0;
        if (segment.sourceUrl != null) {
          segAsStr += toBase64VLQ(sourcesIndex.get(segment.sourceUrl) - lastSourceIndex);
          lastSourceIndex = sourcesIndex.get(segment.sourceUrl);
          segAsStr += toBase64VLQ(segment.sourceLine0 - lastSourceLine0);
          lastSourceLine0 = segment.sourceLine0;
          segAsStr += toBase64VLQ(segment.sourceCol0 - lastSourceCol0);
          lastSourceCol0 = segment.sourceCol0;
        }
        return segAsStr;
      }).join(",");
      mappings2 += ";";
    });
    mappings2 = mappings2.slice(0, -1);
    return {
      "file": this.file || "",
      "version": VERSION$1,
      "sourceRoot": "",
      "sources": sources,
      "sourcesContent": sourcesContent,
      "mappings": mappings2
    };
  }
  toJsComment() {
    return this.hasMappings ? "//" + JS_B64_PREFIX + toBase64String(JSON.stringify(this, null, 0)) : "";
  }
};
function toBase64String(value) {
  let b64 = "";
  const encoded = utf8Encode(value);
  for (let i = 0; i < encoded.length; ) {
    const i1 = encoded[i++];
    const i2 = i < encoded.length ? encoded[i++] : null;
    const i3 = i < encoded.length ? encoded[i++] : null;
    b64 += toBase64Digit(i1 >> 2);
    b64 += toBase64Digit((i1 & 3) << 4 | (i2 === null ? 0 : i2 >> 4));
    b64 += i2 === null ? "=" : toBase64Digit((i2 & 15) << 2 | (i3 === null ? 0 : i3 >> 6));
    b64 += i2 === null || i3 === null ? "=" : toBase64Digit(i3 & 63);
  }
  return b64;
}
function toBase64VLQ(value) {
  value = value < 0 ? (-value << 1) + 1 : value << 1;
  let out = "";
  do {
    let digit = value & 31;
    value = value >> 5;
    if (value > 0) {
      digit = digit | 32;
    }
    out += toBase64Digit(digit);
  } while (value > 0);
  return out;
}
var B64_DIGITS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function toBase64Digit(value) {
  if (value < 0 || value >= 64) {
    throw new Error(`Can only encode value in the range [0, 63]`);
  }
  return B64_DIGITS[value];
}
var _SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
var _LEGAL_IDENTIFIER_RE = /^[$A-Z_][0-9A-Z_$]*$/i;
var _INDENT_WITH = "  ";
var _EmittedLine = class {
  constructor(indent) {
    this.indent = indent;
    this.partsLength = 0;
    this.parts = [];
    this.srcSpans = [];
  }
};
var EmitterVisitorContext = class {
  constructor(_indent) {
    this._indent = _indent;
    this._lines = [new _EmittedLine(_indent)];
  }
  static createRoot() {
    return new EmitterVisitorContext(0);
  }
  get _currentLine() {
    return this._lines[this._lines.length - 1];
  }
  println(from, lastPart = "") {
    this.print(from || null, lastPart, true);
  }
  lineIsEmpty() {
    return this._currentLine.parts.length === 0;
  }
  lineLength() {
    return this._currentLine.indent * _INDENT_WITH.length + this._currentLine.partsLength;
  }
  print(from, part, newLine = false) {
    if (part.length > 0) {
      this._currentLine.parts.push(part);
      this._currentLine.partsLength += part.length;
      this._currentLine.srcSpans.push(from && from.sourceSpan || null);
    }
    if (newLine) {
      this._lines.push(new _EmittedLine(this._indent));
    }
  }
  removeEmptyLastLine() {
    if (this.lineIsEmpty()) {
      this._lines.pop();
    }
  }
  incIndent() {
    this._indent++;
    if (this.lineIsEmpty()) {
      this._currentLine.indent = this._indent;
    }
  }
  decIndent() {
    this._indent--;
    if (this.lineIsEmpty()) {
      this._currentLine.indent = this._indent;
    }
  }
  toSource() {
    return this.sourceLines.map((l) => l.parts.length > 0 ? _createIndent(l.indent) + l.parts.join("") : "").join("\n");
  }
  toSourceMapGenerator(genFilePath, startsAtLine = 0) {
    const map = new SourceMapGenerator(genFilePath);
    let firstOffsetMapped = false;
    const mapFirstOffsetIfNeeded = () => {
      if (!firstOffsetMapped) {
        map.addSource(genFilePath, " ").addMapping(0, genFilePath, 0, 0);
        firstOffsetMapped = true;
      }
    };
    for (let i = 0; i < startsAtLine; i++) {
      map.addLine();
      mapFirstOffsetIfNeeded();
    }
    this.sourceLines.forEach((line, lineIdx) => {
      map.addLine();
      const spans = line.srcSpans;
      const parts = line.parts;
      let col0 = line.indent * _INDENT_WITH.length;
      let spanIdx = 0;
      while (spanIdx < spans.length && !spans[spanIdx]) {
        col0 += parts[spanIdx].length;
        spanIdx++;
      }
      if (spanIdx < spans.length && lineIdx === 0 && col0 === 0) {
        firstOffsetMapped = true;
      } else {
        mapFirstOffsetIfNeeded();
      }
      while (spanIdx < spans.length) {
        const span = spans[spanIdx];
        const source = span.start.file;
        const sourceLine = span.start.line;
        const sourceCol = span.start.col;
        map.addSource(source.url, source.content).addMapping(col0, source.url, sourceLine, sourceCol);
        col0 += parts[spanIdx].length;
        spanIdx++;
        while (spanIdx < spans.length && (span === spans[spanIdx] || !spans[spanIdx])) {
          col0 += parts[spanIdx].length;
          spanIdx++;
        }
      }
    });
    return map;
  }
  spanOf(line, column) {
    const emittedLine = this._lines[line];
    if (emittedLine) {
      let columnsLeft = column - _createIndent(emittedLine.indent).length;
      for (let partIndex = 0; partIndex < emittedLine.parts.length; partIndex++) {
        const part = emittedLine.parts[partIndex];
        if (part.length > columnsLeft) {
          return emittedLine.srcSpans[partIndex];
        }
        columnsLeft -= part.length;
      }
    }
    return null;
  }
  get sourceLines() {
    if (this._lines.length && this._lines[this._lines.length - 1].parts.length === 0) {
      return this._lines.slice(0, -1);
    }
    return this._lines;
  }
};
var AbstractEmitterVisitor = class {
  constructor(_escapeDollarInStrings) {
    this._escapeDollarInStrings = _escapeDollarInStrings;
  }
  printLeadingComments(stmt, ctx) {
    if (stmt.leadingComments === void 0) {
      return;
    }
    for (const comment2 of stmt.leadingComments) {
      if (comment2 instanceof JSDocComment) {
        ctx.print(stmt, `/*${comment2.toString()}*/`, comment2.trailingNewline);
      } else {
        if (comment2.multiline) {
          ctx.print(stmt, `/* ${comment2.text} */`, comment2.trailingNewline);
        } else {
          comment2.text.split("\n").forEach((line) => {
            ctx.println(stmt, `// ${line}`);
          });
        }
      }
    }
  }
  visitExpressionStmt(stmt, ctx) {
    this.printLeadingComments(stmt, ctx);
    stmt.expr.visitExpression(this, ctx);
    ctx.println(stmt, ";");
    return null;
  }
  visitReturnStmt(stmt, ctx) {
    this.printLeadingComments(stmt, ctx);
    ctx.print(stmt, `return `);
    stmt.value.visitExpression(this, ctx);
    ctx.println(stmt, ";");
    return null;
  }
  visitIfStmt(stmt, ctx) {
    this.printLeadingComments(stmt, ctx);
    ctx.print(stmt, `if (`);
    stmt.condition.visitExpression(this, ctx);
    ctx.print(stmt, `) {`);
    const hasElseCase = stmt.falseCase != null && stmt.falseCase.length > 0;
    if (stmt.trueCase.length <= 1 && !hasElseCase) {
      ctx.print(stmt, ` `);
      this.visitAllStatements(stmt.trueCase, ctx);
      ctx.removeEmptyLastLine();
      ctx.print(stmt, ` `);
    } else {
      ctx.println();
      ctx.incIndent();
      this.visitAllStatements(stmt.trueCase, ctx);
      ctx.decIndent();
      if (hasElseCase) {
        ctx.println(stmt, `} else {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.falseCase, ctx);
        ctx.decIndent();
      }
    }
    ctx.println(stmt, `}`);
    return null;
  }
  visitWriteVarExpr(expr, ctx) {
    const lineWasEmpty = ctx.lineIsEmpty();
    if (!lineWasEmpty) {
      ctx.print(expr, "(");
    }
    ctx.print(expr, `${expr.name} = `);
    expr.value.visitExpression(this, ctx);
    if (!lineWasEmpty) {
      ctx.print(expr, ")");
    }
    return null;
  }
  visitWriteKeyExpr(expr, ctx) {
    const lineWasEmpty = ctx.lineIsEmpty();
    if (!lineWasEmpty) {
      ctx.print(expr, "(");
    }
    expr.receiver.visitExpression(this, ctx);
    ctx.print(expr, `[`);
    expr.index.visitExpression(this, ctx);
    ctx.print(expr, `] = `);
    expr.value.visitExpression(this, ctx);
    if (!lineWasEmpty) {
      ctx.print(expr, ")");
    }
    return null;
  }
  visitWritePropExpr(expr, ctx) {
    const lineWasEmpty = ctx.lineIsEmpty();
    if (!lineWasEmpty) {
      ctx.print(expr, "(");
    }
    expr.receiver.visitExpression(this, ctx);
    ctx.print(expr, `.${expr.name} = `);
    expr.value.visitExpression(this, ctx);
    if (!lineWasEmpty) {
      ctx.print(expr, ")");
    }
    return null;
  }
  visitInvokeFunctionExpr(expr, ctx) {
    expr.fn.visitExpression(this, ctx);
    ctx.print(expr, `(`);
    this.visitAllExpressions(expr.args, ctx, ",");
    ctx.print(expr, `)`);
    return null;
  }
  visitTaggedTemplateExpr(expr, ctx) {
    expr.tag.visitExpression(this, ctx);
    ctx.print(expr, "`" + expr.template.elements[0].rawText);
    for (let i = 1; i < expr.template.elements.length; i++) {
      ctx.print(expr, "${");
      expr.template.expressions[i - 1].visitExpression(this, ctx);
      ctx.print(expr, `}${expr.template.elements[i].rawText}`);
    }
    ctx.print(expr, "`");
    return null;
  }
  visitWrappedNodeExpr(ast, ctx) {
    throw new Error("Abstract emitter cannot visit WrappedNodeExpr.");
  }
  visitTypeofExpr(expr, ctx) {
    ctx.print(expr, "typeof ");
    expr.expr.visitExpression(this, ctx);
  }
  visitReadVarExpr(ast, ctx) {
    ctx.print(ast, ast.name);
    return null;
  }
  visitInstantiateExpr(ast, ctx) {
    ctx.print(ast, `new `);
    ast.classExpr.visitExpression(this, ctx);
    ctx.print(ast, `(`);
    this.visitAllExpressions(ast.args, ctx, ",");
    ctx.print(ast, `)`);
    return null;
  }
  visitLiteralExpr(ast, ctx) {
    const value = ast.value;
    if (typeof value === "string") {
      ctx.print(ast, escapeIdentifier(value, this._escapeDollarInStrings));
    } else {
      ctx.print(ast, `${value}`);
    }
    return null;
  }
  visitLocalizedString(ast, ctx) {
    const head = ast.serializeI18nHead();
    ctx.print(ast, "$localize `" + head.raw);
    for (let i = 1; i < ast.messageParts.length; i++) {
      ctx.print(ast, "${");
      ast.expressions[i - 1].visitExpression(this, ctx);
      ctx.print(ast, `}${ast.serializeI18nTemplatePart(i).raw}`);
    }
    ctx.print(ast, "`");
    return null;
  }
  visitConditionalExpr(ast, ctx) {
    ctx.print(ast, `(`);
    ast.condition.visitExpression(this, ctx);
    ctx.print(ast, "? ");
    ast.trueCase.visitExpression(this, ctx);
    ctx.print(ast, ": ");
    ast.falseCase.visitExpression(this, ctx);
    ctx.print(ast, `)`);
    return null;
  }
  visitNotExpr(ast, ctx) {
    ctx.print(ast, "!");
    ast.condition.visitExpression(this, ctx);
    return null;
  }
  visitUnaryOperatorExpr(ast, ctx) {
    let opStr;
    switch (ast.operator) {
      case UnaryOperator.Plus:
        opStr = "+";
        break;
      case UnaryOperator.Minus:
        opStr = "-";
        break;
      default:
        throw new Error(`Unknown operator ${ast.operator}`);
    }
    if (ast.parens)
      ctx.print(ast, `(`);
    ctx.print(ast, opStr);
    ast.expr.visitExpression(this, ctx);
    if (ast.parens)
      ctx.print(ast, `)`);
    return null;
  }
  visitBinaryOperatorExpr(ast, ctx) {
    let opStr;
    switch (ast.operator) {
      case BinaryOperator.Equals:
        opStr = "==";
        break;
      case BinaryOperator.Identical:
        opStr = "===";
        break;
      case BinaryOperator.NotEquals:
        opStr = "!=";
        break;
      case BinaryOperator.NotIdentical:
        opStr = "!==";
        break;
      case BinaryOperator.And:
        opStr = "&&";
        break;
      case BinaryOperator.BitwiseAnd:
        opStr = "&";
        break;
      case BinaryOperator.Or:
        opStr = "||";
        break;
      case BinaryOperator.Plus:
        opStr = "+";
        break;
      case BinaryOperator.Minus:
        opStr = "-";
        break;
      case BinaryOperator.Divide:
        opStr = "/";
        break;
      case BinaryOperator.Multiply:
        opStr = "*";
        break;
      case BinaryOperator.Modulo:
        opStr = "%";
        break;
      case BinaryOperator.Lower:
        opStr = "<";
        break;
      case BinaryOperator.LowerEquals:
        opStr = "<=";
        break;
      case BinaryOperator.Bigger:
        opStr = ">";
        break;
      case BinaryOperator.BiggerEquals:
        opStr = ">=";
        break;
      case BinaryOperator.NullishCoalesce:
        opStr = "??";
        break;
      default:
        throw new Error(`Unknown operator ${ast.operator}`);
    }
    if (ast.parens)
      ctx.print(ast, `(`);
    ast.lhs.visitExpression(this, ctx);
    ctx.print(ast, ` ${opStr} `);
    ast.rhs.visitExpression(this, ctx);
    if (ast.parens)
      ctx.print(ast, `)`);
    return null;
  }
  visitReadPropExpr(ast, ctx) {
    ast.receiver.visitExpression(this, ctx);
    ctx.print(ast, `.`);
    ctx.print(ast, ast.name);
    return null;
  }
  visitReadKeyExpr(ast, ctx) {
    ast.receiver.visitExpression(this, ctx);
    ctx.print(ast, `[`);
    ast.index.visitExpression(this, ctx);
    ctx.print(ast, `]`);
    return null;
  }
  visitLiteralArrayExpr(ast, ctx) {
    ctx.print(ast, `[`);
    this.visitAllExpressions(ast.entries, ctx, ",");
    ctx.print(ast, `]`);
    return null;
  }
  visitLiteralMapExpr(ast, ctx) {
    ctx.print(ast, `{`);
    this.visitAllObjects((entry) => {
      ctx.print(ast, `${escapeIdentifier(entry.key, this._escapeDollarInStrings, entry.quoted)}:`);
      entry.value.visitExpression(this, ctx);
    }, ast.entries, ctx, ",");
    ctx.print(ast, `}`);
    return null;
  }
  visitCommaExpr(ast, ctx) {
    ctx.print(ast, "(");
    this.visitAllExpressions(ast.parts, ctx, ",");
    ctx.print(ast, ")");
    return null;
  }
  visitAllExpressions(expressions, ctx, separator) {
    this.visitAllObjects((expr) => expr.visitExpression(this, ctx), expressions, ctx, separator);
  }
  visitAllObjects(handler, expressions, ctx, separator) {
    let incrementedIndent = false;
    for (let i = 0; i < expressions.length; i++) {
      if (i > 0) {
        if (ctx.lineLength() > 80) {
          ctx.print(null, separator, true);
          if (!incrementedIndent) {
            ctx.incIndent();
            ctx.incIndent();
            incrementedIndent = true;
          }
        } else {
          ctx.print(null, separator, false);
        }
      }
      handler(expressions[i]);
    }
    if (incrementedIndent) {
      ctx.decIndent();
      ctx.decIndent();
    }
  }
  visitAllStatements(statements, ctx) {
    statements.forEach((stmt) => stmt.visitStatement(this, ctx));
  }
};
function escapeIdentifier(input, escapeDollar, alwaysQuote = true) {
  if (input == null) {
    return null;
  }
  const body = input.replace(_SINGLE_QUOTE_ESCAPE_STRING_RE, (...match) => {
    if (match[0] == "$") {
      return escapeDollar ? "\\$" : "$";
    } else if (match[0] == "\n") {
      return "\\n";
    } else if (match[0] == "\r") {
      return "\\r";
    } else {
      return `\\${match[0]}`;
    }
  });
  const requiresQuotes = alwaysQuote || !_LEGAL_IDENTIFIER_RE.test(body);
  return requiresQuotes ? `'${body}'` : body;
}
function _createIndent(count) {
  let res = "";
  for (let i = 0; i < count; i++) {
    res += _INDENT_WITH;
  }
  return res;
}
function typeWithParameters(type, numParams) {
  if (numParams === 0) {
    return expressionType(type);
  }
  const params = [];
  for (let i = 0; i < numParams; i++) {
    params.push(DYNAMIC_TYPE);
  }
  return expressionType(type, void 0, params);
}
var ANIMATE_SYMBOL_PREFIX = "@";
function prepareSyntheticPropertyName(name) {
  return `${ANIMATE_SYMBOL_PREFIX}${name}`;
}
function prepareSyntheticListenerName(name, phase) {
  return `${ANIMATE_SYMBOL_PREFIX}${name}.${phase}`;
}
function getSafePropertyAccessString(accessor, name) {
  const escapedName = escapeIdentifier(name, false, false);
  return escapedName !== name ? `${accessor}[${escapedName}]` : `${accessor}.${name}`;
}
function prepareSyntheticListenerFunctionName(name, phase) {
  return `animation_${name}_${phase}`;
}
function jitOnlyGuardedExpression(expr) {
  return guardedExpression("ngJitMode", expr);
}
function guardedExpression(guard, expr) {
  const guardExpr = new ExternalExpr({ name: guard, moduleName: null });
  const guardNotDefined = new BinaryOperatorExpr(BinaryOperator.Identical, new TypeofExpr(guardExpr), literal("undefined"));
  const guardUndefinedOrTrue = new BinaryOperatorExpr(BinaryOperator.Or, guardNotDefined, guardExpr, void 0, void 0, true);
  return new BinaryOperatorExpr(BinaryOperator.And, guardUndefinedOrTrue, expr);
}
function wrapReference(value) {
  const wrapped = new WrappedNodeExpr(value);
  return { value: wrapped, type: wrapped };
}
function refsToArray(refs, shouldForwardDeclare) {
  const values = literalArr(refs.map((ref) => ref.value));
  return shouldForwardDeclare ? fn([], [new ReturnStatement(values)]) : values;
}
function createMayBeForwardRefExpression(expression, forwardRef) {
  return { expression, forwardRef };
}
function convertFromMaybeForwardRefExpression({ expression, forwardRef }) {
  switch (forwardRef) {
    case 0:
    case 1:
      return expression;
    case 2:
      return generateForwardRef(expression);
  }
}
function generateForwardRef(expr) {
  return importExpr(Identifiers.forwardRef).callFn([fn([], [new ReturnStatement(expr)])]);
}
var R3FactoryDelegateType;
(function(R3FactoryDelegateType2) {
  R3FactoryDelegateType2[R3FactoryDelegateType2["Class"] = 0] = "Class";
  R3FactoryDelegateType2[R3FactoryDelegateType2["Function"] = 1] = "Function";
})(R3FactoryDelegateType || (R3FactoryDelegateType = {}));
var FactoryTarget$1;
(function(FactoryTarget2) {
  FactoryTarget2[FactoryTarget2["Directive"] = 0] = "Directive";
  FactoryTarget2[FactoryTarget2["Component"] = 1] = "Component";
  FactoryTarget2[FactoryTarget2["Injectable"] = 2] = "Injectable";
  FactoryTarget2[FactoryTarget2["Pipe"] = 3] = "Pipe";
  FactoryTarget2[FactoryTarget2["NgModule"] = 4] = "NgModule";
})(FactoryTarget$1 || (FactoryTarget$1 = {}));
function compileFactoryFunction(meta) {
  const t = variable("t");
  let baseFactoryVar = null;
  const typeForCtor = !isDelegatedFactoryMetadata(meta) ? new BinaryOperatorExpr(BinaryOperator.Or, t, meta.internalType) : t;
  let ctorExpr = null;
  if (meta.deps !== null) {
    if (meta.deps !== "invalid") {
      ctorExpr = new InstantiateExpr(typeForCtor, injectDependencies(meta.deps, meta.target));
    }
  } else {
    baseFactoryVar = variable(`\u0275${meta.name}_BaseFactory`);
    ctorExpr = baseFactoryVar.callFn([typeForCtor]);
  }
  const body = [];
  let retExpr = null;
  function makeConditionalFactory(nonCtorExpr) {
    const r = variable("r");
    body.push(r.set(NULL_EXPR).toDeclStmt());
    const ctorStmt = ctorExpr !== null ? r.set(ctorExpr).toStmt() : importExpr(Identifiers.invalidFactory).callFn([]).toStmt();
    body.push(ifStmt(t, [ctorStmt], [r.set(nonCtorExpr).toStmt()]));
    return r;
  }
  if (isDelegatedFactoryMetadata(meta)) {
    const delegateArgs = injectDependencies(meta.delegateDeps, meta.target);
    const factoryExpr = new (meta.delegateType === R3FactoryDelegateType.Class ? InstantiateExpr : InvokeFunctionExpr)(meta.delegate, delegateArgs);
    retExpr = makeConditionalFactory(factoryExpr);
  } else if (isExpressionFactoryMetadata(meta)) {
    retExpr = makeConditionalFactory(meta.expression);
  } else {
    retExpr = ctorExpr;
  }
  if (retExpr === null) {
    body.push(importExpr(Identifiers.invalidFactory).callFn([]).toStmt());
  } else if (baseFactoryVar !== null) {
    const getInheritedFactoryCall = importExpr(Identifiers.getInheritedFactory).callFn([meta.internalType]);
    const baseFactory = new BinaryOperatorExpr(BinaryOperator.Or, baseFactoryVar, baseFactoryVar.set(getInheritedFactoryCall));
    body.push(new ReturnStatement(baseFactory.callFn([typeForCtor])));
  } else {
    body.push(new ReturnStatement(retExpr));
  }
  let factoryFn = fn([new FnParam("t", DYNAMIC_TYPE)], body, INFERRED_TYPE, void 0, `${meta.name}_Factory`);
  if (baseFactoryVar !== null) {
    factoryFn = fn([], [
      new DeclareVarStmt(baseFactoryVar.name),
      new ReturnStatement(factoryFn)
    ]).callFn([], void 0, true);
  }
  return {
    expression: factoryFn,
    statements: [],
    type: createFactoryType(meta)
  };
}
function createFactoryType(meta) {
  const ctorDepsType = meta.deps !== null && meta.deps !== "invalid" ? createCtorDepsType(meta.deps) : NONE_TYPE;
  return expressionType(importExpr(Identifiers.FactoryDeclaration, [typeWithParameters(meta.type.type, meta.typeArgumentCount), ctorDepsType]));
}
function injectDependencies(deps, target) {
  return deps.map((dep, index2) => compileInjectDependency(dep, target, index2));
}
function compileInjectDependency(dep, target, index2) {
  if (dep.token === null) {
    return importExpr(Identifiers.invalidFactoryDep).callFn([literal(index2)]);
  } else if (dep.attributeNameType === null) {
    const flags = 0 | (dep.self ? 2 : 0) | (dep.skipSelf ? 4 : 0) | (dep.host ? 1 : 0) | (dep.optional ? 8 : 0) | (target === FactoryTarget$1.Pipe ? 16 : 0);
    let flagsParam = flags !== 0 || dep.optional ? literal(flags) : null;
    const injectArgs = [dep.token];
    if (flagsParam) {
      injectArgs.push(flagsParam);
    }
    const injectFn = getInjectFn(target);
    return importExpr(injectFn).callFn(injectArgs);
  } else {
    return importExpr(Identifiers.injectAttribute).callFn([dep.token]);
  }
}
function createCtorDepsType(deps) {
  let hasTypes = false;
  const attributeTypes = deps.map((dep) => {
    const type = createCtorDepType(dep);
    if (type !== null) {
      hasTypes = true;
      return type;
    } else {
      return literal(null);
    }
  });
  if (hasTypes) {
    return expressionType(literalArr(attributeTypes));
  } else {
    return NONE_TYPE;
  }
}
function createCtorDepType(dep) {
  const entries = [];
  if (dep.attributeNameType !== null) {
    entries.push({ key: "attribute", value: dep.attributeNameType, quoted: false });
  }
  if (dep.optional) {
    entries.push({ key: "optional", value: literal(true), quoted: false });
  }
  if (dep.host) {
    entries.push({ key: "host", value: literal(true), quoted: false });
  }
  if (dep.self) {
    entries.push({ key: "self", value: literal(true), quoted: false });
  }
  if (dep.skipSelf) {
    entries.push({ key: "skipSelf", value: literal(true), quoted: false });
  }
  return entries.length > 0 ? literalMap(entries) : null;
}
function isDelegatedFactoryMetadata(meta) {
  return meta.delegateType !== void 0;
}
function isExpressionFactoryMetadata(meta) {
  return meta.expression !== void 0;
}
function getInjectFn(target) {
  switch (target) {
    case FactoryTarget$1.Component:
    case FactoryTarget$1.Directive:
    case FactoryTarget$1.Pipe:
      return Identifiers.directiveInject;
    case FactoryTarget$1.NgModule:
    case FactoryTarget$1.Injectable:
    default:
      return Identifiers.inject;
  }
}
var Comment$1 = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(_visitor2) {
    throw new Error("visit() not implemented for Comment");
  }
};
var Text$3 = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor) {
    return visitor.visitText(this);
  }
};
var BoundText = class {
  constructor(value, sourceSpan, i18n) {
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.i18n = i18n;
  }
  visit(visitor) {
    return visitor.visitBoundText(this);
  }
};
var TextAttribute = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan, i18n) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.i18n = i18n;
  }
  visit(visitor) {
    return visitor.visitTextAttribute(this);
  }
};
var BoundAttribute = class {
  constructor(name, type, securityContext, value, unit, sourceSpan, keySpan, valueSpan, i18n) {
    this.name = name;
    this.type = type;
    this.securityContext = securityContext;
    this.value = value;
    this.unit = unit;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.i18n = i18n;
  }
  static fromBoundElementProperty(prop, i18n) {
    if (prop.keySpan === void 0) {
      throw new Error(`Unexpected state: keySpan must be defined for bound attributes but was not for ${prop.name}: ${prop.sourceSpan}`);
    }
    return new BoundAttribute(prop.name, prop.type, prop.securityContext, prop.value, prop.unit, prop.sourceSpan, prop.keySpan, prop.valueSpan, i18n);
  }
  visit(visitor) {
    return visitor.visitBoundAttribute(this);
  }
};
var BoundEvent = class {
  constructor(name, type, handler, target, phase, sourceSpan, handlerSpan, keySpan) {
    this.name = name;
    this.type = type;
    this.handler = handler;
    this.target = target;
    this.phase = phase;
    this.sourceSpan = sourceSpan;
    this.handlerSpan = handlerSpan;
    this.keySpan = keySpan;
  }
  static fromParsedEvent(event) {
    const target = event.type === 0 ? event.targetOrPhase : null;
    const phase = event.type === 1 ? event.targetOrPhase : null;
    if (event.keySpan === void 0) {
      throw new Error(`Unexpected state: keySpan must be defined for bound event but was not for ${event.name}: ${event.sourceSpan}`);
    }
    return new BoundEvent(event.name, event.type, event.handler, target, phase, event.sourceSpan, event.handlerSpan, event.keySpan);
  }
  visit(visitor) {
    return visitor.visitBoundEvent(this);
  }
};
var Element$1 = class {
  constructor(name, attributes, inputs, outputs, children, references, sourceSpan, startSourceSpan, endSourceSpan, i18n) {
    this.name = name;
    this.attributes = attributes;
    this.inputs = inputs;
    this.outputs = outputs;
    this.children = children;
    this.references = references;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
    this.i18n = i18n;
  }
  visit(visitor) {
    return visitor.visitElement(this);
  }
};
var Template = class {
  constructor(tagName, attributes, inputs, outputs, templateAttrs, children, references, variables, sourceSpan, startSourceSpan, endSourceSpan, i18n) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.inputs = inputs;
    this.outputs = outputs;
    this.templateAttrs = templateAttrs;
    this.children = children;
    this.references = references;
    this.variables = variables;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
    this.i18n = i18n;
  }
  visit(visitor) {
    return visitor.visitTemplate(this);
  }
};
var Content = class {
  constructor(selector, attributes, sourceSpan, i18n) {
    this.selector = selector;
    this.attributes = attributes;
    this.sourceSpan = sourceSpan;
    this.i18n = i18n;
    this.name = "ng-content";
  }
  visit(visitor) {
    return visitor.visitContent(this);
  }
};
var Variable = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
  visit(visitor) {
    return visitor.visitVariable(this);
  }
};
var Reference = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
  visit(visitor) {
    return visitor.visitReference(this);
  }
};
var Icu$1 = class {
  constructor(vars, placeholders, sourceSpan, i18n) {
    this.vars = vars;
    this.placeholders = placeholders;
    this.sourceSpan = sourceSpan;
    this.i18n = i18n;
  }
  visit(visitor) {
    return visitor.visitIcu(this);
  }
};
function visitAll$1(visitor, nodes) {
  const result = [];
  if (visitor.visit) {
    for (const node of nodes) {
      const newNode = visitor.visit(node) || node.visit(visitor);
    }
  } else {
    for (const node of nodes) {
      const newNode = node.visit(visitor);
      if (newNode) {
        result.push(newNode);
      }
    }
  }
  return result;
}
var Message = class {
  constructor(nodes, placeholders, placeholderToMessage, meaning, description, customId) {
    this.nodes = nodes;
    this.placeholders = placeholders;
    this.placeholderToMessage = placeholderToMessage;
    this.meaning = meaning;
    this.description = description;
    this.customId = customId;
    this.id = this.customId;
    this.legacyIds = [];
    this.messageString = serializeMessage(this.nodes);
    if (nodes.length) {
      this.sources = [{
        filePath: nodes[0].sourceSpan.start.file.url,
        startLine: nodes[0].sourceSpan.start.line + 1,
        startCol: nodes[0].sourceSpan.start.col + 1,
        endLine: nodes[nodes.length - 1].sourceSpan.end.line + 1,
        endCol: nodes[0].sourceSpan.start.col + 1
      }];
    } else {
      this.sources = [];
    }
  }
};
var Text$2 = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitText(this, context);
  }
};
var Container = class {
  constructor(children, sourceSpan) {
    this.children = children;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitContainer(this, context);
  }
};
var Icu = class {
  constructor(expression, type, cases, sourceSpan) {
    this.expression = expression;
    this.type = type;
    this.cases = cases;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitIcu(this, context);
  }
};
var TagPlaceholder = class {
  constructor(tag, attrs, startName, closeName, children, isVoid, sourceSpan, startSourceSpan, endSourceSpan) {
    this.tag = tag;
    this.attrs = attrs;
    this.startName = startName;
    this.closeName = closeName;
    this.children = children;
    this.isVoid = isVoid;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitTagPlaceholder(this, context);
  }
};
var Placeholder = class {
  constructor(value, name, sourceSpan) {
    this.value = value;
    this.name = name;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitPlaceholder(this, context);
  }
};
var IcuPlaceholder = class {
  constructor(value, name, sourceSpan) {
    this.value = value;
    this.name = name;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitIcuPlaceholder(this, context);
  }
};
function serializeMessage(messageNodes) {
  const visitor = new LocalizeMessageStringVisitor();
  const str = messageNodes.map((n) => n.visit(visitor)).join("");
  return str;
}
var LocalizeMessageStringVisitor = class {
  visitText(text) {
    return text.value;
  }
  visitContainer(container) {
    return container.children.map((child) => child.visit(this)).join("");
  }
  visitIcu(icu) {
    const strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    return `{${icu.expressionPlaceholder}, ${icu.type}, ${strCases.join(" ")}}`;
  }
  visitTagPlaceholder(ph) {
    const children = ph.children.map((child) => child.visit(this)).join("");
    return `{$${ph.startName}}${children}{$${ph.closeName}}`;
  }
  visitPlaceholder(ph) {
    return `{$${ph.name}}`;
  }
  visitIcuPlaceholder(ph) {
    return `{$${ph.name}}`;
  }
};
var _Visitor$2 = class {
  visitTag(tag) {
    const strAttrs = this._serializeAttributes(tag.attrs);
    if (tag.children.length == 0) {
      return `<${tag.name}${strAttrs}/>`;
    }
    const strChildren = tag.children.map((node) => node.visit(this));
    return `<${tag.name}${strAttrs}>${strChildren.join("")}</${tag.name}>`;
  }
  visitText(text) {
    return text.value;
  }
  visitDeclaration(decl2) {
    return `<?xml${this._serializeAttributes(decl2.attrs)} ?>`;
  }
  _serializeAttributes(attrs) {
    const strAttrs = Object.keys(attrs).map((name) => `${name}="${attrs[name]}"`).join(" ");
    return strAttrs.length > 0 ? " " + strAttrs : "";
  }
  visitDoctype(doctype) {
    return `<!DOCTYPE ${doctype.rootTag} [
${doctype.dtd}
]>`;
  }
};
var _visitor = new _Visitor$2();
function toPublicName(internalName) {
  return internalName.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
}
var CLOSURE_TRANSLATION_VAR_PREFIX = "MSG_";
var TRANSLATION_VAR_PREFIX = "i18n_";
var I18N_ATTR = "i18n";
var I18N_ATTR_PREFIX = "i18n-";
var I18N_ICU_VAR_PREFIX = "VAR_";
var I18N_ICU_MAPPING_PREFIX = "I18N_EXP_";
var I18N_PLACEHOLDER_SYMBOL = "\uFFFD";
function isI18nAttribute(name) {
  return name === I18N_ATTR || name.startsWith(I18N_ATTR_PREFIX);
}
function isI18nRootNode(meta) {
  return meta instanceof Message;
}
function isSingleI18nIcu(meta) {
  return isI18nRootNode(meta) && meta.nodes.length === 1 && meta.nodes[0] instanceof Icu;
}
function hasI18nMeta(node) {
  return !!node.i18n;
}
function hasI18nAttrs(element) {
  return element.attrs.some((attr) => isI18nAttribute(attr.name));
}
function icuFromI18nMessage(message) {
  return message.nodes[0];
}
function wrapI18nPlaceholder(content, contextId = 0) {
  const blockId = contextId > 0 ? `:${contextId}` : "";
  return `${I18N_PLACEHOLDER_SYMBOL}${content}${blockId}${I18N_PLACEHOLDER_SYMBOL}`;
}
function assembleI18nBoundString(strings, bindingStartIndex = 0, contextId = 0) {
  if (!strings.length)
    return "";
  let acc = "";
  const lastIdx = strings.length - 1;
  for (let i = 0; i < lastIdx; i++) {
    acc += `${strings[i]}${wrapI18nPlaceholder(bindingStartIndex + i, contextId)}`;
  }
  acc += strings[lastIdx];
  return acc;
}
function getSeqNumberGenerator(startsAt = 0) {
  let current = startsAt;
  return () => current++;
}
function placeholdersToParams(placeholders) {
  const params = {};
  placeholders.forEach((values, key) => {
    params[key] = literal(values.length > 1 ? `[${values.join("|")}]` : values[0]);
  });
  return params;
}
function updatePlaceholderMap(map, name, ...values) {
  const current = map.get(name) || [];
  current.push(...values);
  map.set(name, current);
}
function assembleBoundTextPlaceholders(meta, bindingStartIndex = 0, contextId = 0) {
  const startIdx = bindingStartIndex;
  const placeholders = /* @__PURE__ */ new Map();
  const node = meta instanceof Message ? meta.nodes.find((node2) => node2 instanceof Container) : meta;
  if (node) {
    node.children.filter((child) => child instanceof Placeholder).forEach((child, idx) => {
      const content = wrapI18nPlaceholder(startIdx + idx, contextId);
      updatePlaceholderMap(placeholders, child.name, content);
    });
  }
  return placeholders;
}
function formatI18nPlaceholderNamesInMap(params = {}, useCamelCase) {
  const _params = {};
  if (params && Object.keys(params).length) {
    Object.keys(params).forEach((key) => _params[formatI18nPlaceholderName(key, useCamelCase)] = params[key]);
  }
  return _params;
}
function formatI18nPlaceholderName(name, useCamelCase = true) {
  const publicName = toPublicName(name);
  if (!useCamelCase) {
    return publicName;
  }
  const chunks = publicName.split("_");
  if (chunks.length === 1) {
    return name.toLowerCase();
  }
  let postfix;
  if (/^\d+$/.test(chunks[chunks.length - 1])) {
    postfix = chunks.pop();
  }
  let raw = chunks.shift().toLowerCase();
  if (chunks.length) {
    raw += chunks.map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()).join("");
  }
  return postfix ? `${raw}_${postfix}` : raw;
}
function getTranslationConstPrefix(extra) {
  return `${CLOSURE_TRANSLATION_VAR_PREFIX}${extra}`.toUpperCase();
}
function declareI18nVariable(variable2) {
  return new DeclareVarStmt(variable2.name, void 0, INFERRED_TYPE, void 0, variable2.sourceSpan);
}
var UNSAFE_OBJECT_KEY_NAME_REGEXP = /[-.]/;
var TEMPORARY_NAME = "_t";
var CONTEXT_NAME = "ctx";
var RENDER_FLAGS = "rf";
var REFERENCE_PREFIX = "_r";
var IMPLICIT_REFERENCE = "$implicit";
var NON_BINDABLE_ATTR = "ngNonBindable";
var RESTORED_VIEW_CONTEXT_NAME = "restoredCtx";
var MAX_CHAIN_LENGTH = 500;
var CHAINABLE_INSTRUCTIONS = /* @__PURE__ */ new Set([
  Identifiers.element,
  Identifiers.elementStart,
  Identifiers.elementEnd,
  Identifiers.elementContainer,
  Identifiers.elementContainerStart,
  Identifiers.elementContainerEnd,
  Identifiers.i18nExp,
  Identifiers.listener,
  Identifiers.classProp,
  Identifiers.syntheticHostListener,
  Identifiers.hostProperty,
  Identifiers.syntheticHostProperty,
  Identifiers.property,
  Identifiers.propertyInterpolate1,
  Identifiers.propertyInterpolate2,
  Identifiers.propertyInterpolate3,
  Identifiers.propertyInterpolate4,
  Identifiers.propertyInterpolate5,
  Identifiers.propertyInterpolate6,
  Identifiers.propertyInterpolate7,
  Identifiers.propertyInterpolate8,
  Identifiers.propertyInterpolateV,
  Identifiers.attribute,
  Identifiers.attributeInterpolate1,
  Identifiers.attributeInterpolate2,
  Identifiers.attributeInterpolate3,
  Identifiers.attributeInterpolate4,
  Identifiers.attributeInterpolate5,
  Identifiers.attributeInterpolate6,
  Identifiers.attributeInterpolate7,
  Identifiers.attributeInterpolate8,
  Identifiers.attributeInterpolateV,
  Identifiers.styleProp,
  Identifiers.stylePropInterpolate1,
  Identifiers.stylePropInterpolate2,
  Identifiers.stylePropInterpolate3,
  Identifiers.stylePropInterpolate4,
  Identifiers.stylePropInterpolate5,
  Identifiers.stylePropInterpolate6,
  Identifiers.stylePropInterpolate7,
  Identifiers.stylePropInterpolate8,
  Identifiers.stylePropInterpolateV,
  Identifiers.textInterpolate,
  Identifiers.textInterpolate1,
  Identifiers.textInterpolate2,
  Identifiers.textInterpolate3,
  Identifiers.textInterpolate4,
  Identifiers.textInterpolate5,
  Identifiers.textInterpolate6,
  Identifiers.textInterpolate7,
  Identifiers.textInterpolate8,
  Identifiers.textInterpolateV
]);
function invokeInstruction(span, reference, params) {
  return importExpr(reference, null, span).callFn(params, span);
}
function temporaryAllocator(statements, name) {
  let temp = null;
  return () => {
    if (!temp) {
      statements.push(new DeclareVarStmt(TEMPORARY_NAME, void 0, DYNAMIC_TYPE));
      temp = variable(name);
    }
    return temp;
  };
}
function invalid(arg) {
  throw new Error(`Invalid state: Visitor ${this.constructor.name} doesn't handle ${arg.constructor.name}`);
}
function asLiteral(value) {
  if (Array.isArray(value)) {
    return literalArr(value.map(asLiteral));
  }
  return literal(value, INFERRED_TYPE);
}
function conditionallyCreateMapObjectLiteral(keys, keepDeclared) {
  if (Object.getOwnPropertyNames(keys).length > 0) {
    return mapToExpression(keys, keepDeclared);
  }
  return null;
}
function mapToExpression(map, keepDeclared) {
  return literalMap(Object.getOwnPropertyNames(map).map((key) => {
    const value = map[key];
    let declaredName;
    let publicName;
    let minifiedName;
    let needsDeclaredName;
    if (Array.isArray(value)) {
      [publicName, declaredName] = value;
      minifiedName = key;
      needsDeclaredName = publicName !== declaredName;
    } else {
      minifiedName = declaredName = key;
      publicName = value;
      needsDeclaredName = false;
    }
    return {
      key: minifiedName,
      quoted: UNSAFE_OBJECT_KEY_NAME_REGEXP.test(minifiedName),
      value: keepDeclared && needsDeclaredName ? literalArr([asLiteral(publicName), asLiteral(declaredName)]) : asLiteral(publicName)
    };
  }));
}
function trimTrailingNulls(parameters) {
  while (isNull(parameters[parameters.length - 1])) {
    parameters.pop();
  }
  return parameters;
}
function getQueryPredicate(query, constantPool) {
  if (Array.isArray(query.predicate)) {
    let predicate = [];
    query.predicate.forEach((selector) => {
      const selectors = selector.split(",").map((token) => literal(token.trim()));
      predicate.push(...selectors);
    });
    return constantPool.getConstLiteral(literalArr(predicate), true);
  } else {
    switch (query.predicate.forwardRef) {
      case 0:
      case 2:
        return query.predicate.expression;
      case 1:
        return importExpr(Identifiers.resolveForwardRef).callFn([query.predicate.expression]);
    }
  }
}
var DefinitionMap = class {
  constructor() {
    this.values = [];
  }
  set(key, value) {
    if (value) {
      this.values.push({ key, value, quoted: false });
    }
  }
  toLiteralMap() {
    return literalMap(this.values);
  }
};
function getInterpolationArgsLength(interpolation) {
  const { expressions, strings } = interpolation;
  if (expressions.length === 1 && strings.length === 2 && strings[0] === "" && strings[1] === "") {
    return 1;
  } else {
    return expressions.length + strings.length;
  }
}
function getInstructionStatements(instructions) {
  var _a;
  const statements = [];
  let pendingExpression = null;
  let pendingExpressionType = null;
  let chainLength = 0;
  for (const current of instructions) {
    const resolvedParams = (_a = typeof current.paramsOrFn === "function" ? current.paramsOrFn() : current.paramsOrFn) !== null && _a !== void 0 ? _a : [];
    const params = Array.isArray(resolvedParams) ? resolvedParams : [resolvedParams];
    if (chainLength < MAX_CHAIN_LENGTH && pendingExpressionType === current.reference && CHAINABLE_INSTRUCTIONS.has(pendingExpressionType)) {
      pendingExpression = pendingExpression.callFn(params, pendingExpression.sourceSpan);
      chainLength++;
    } else {
      if (pendingExpression !== null) {
        statements.push(pendingExpression.toStmt());
      }
      pendingExpression = invokeInstruction(current.span, current.reference, params);
      pendingExpressionType = current.reference;
      chainLength = 0;
    }
  }
  if (pendingExpression !== null) {
    statements.push(pendingExpression.toStmt());
  }
  return statements;
}
function compileInjectable(meta, resolveForwardRefs) {
  let result = null;
  const factoryMeta = {
    name: meta.name,
    type: meta.type,
    internalType: meta.internalType,
    typeArgumentCount: meta.typeArgumentCount,
    deps: [],
    target: FactoryTarget$1.Injectable
  };
  if (meta.useClass !== void 0) {
    const useClassOnSelf = meta.useClass.expression.isEquivalent(meta.internalType);
    let deps = void 0;
    if (meta.deps !== void 0) {
      deps = meta.deps;
    }
    if (deps !== void 0) {
      result = compileFactoryFunction(Object.assign(Object.assign({}, factoryMeta), { delegate: meta.useClass.expression, delegateDeps: deps, delegateType: R3FactoryDelegateType.Class }));
    } else if (useClassOnSelf) {
      result = compileFactoryFunction(factoryMeta);
    } else {
      result = {
        statements: [],
        expression: delegateToFactory(meta.type.value, meta.useClass.expression, resolveForwardRefs)
      };
    }
  } else if (meta.useFactory !== void 0) {
    if (meta.deps !== void 0) {
      result = compileFactoryFunction(Object.assign(Object.assign({}, factoryMeta), { delegate: meta.useFactory, delegateDeps: meta.deps || [], delegateType: R3FactoryDelegateType.Function }));
    } else {
      result = {
        statements: [],
        expression: fn([], [new ReturnStatement(meta.useFactory.callFn([]))])
      };
    }
  } else if (meta.useValue !== void 0) {
    result = compileFactoryFunction(Object.assign(Object.assign({}, factoryMeta), { expression: meta.useValue.expression }));
  } else if (meta.useExisting !== void 0) {
    result = compileFactoryFunction(Object.assign(Object.assign({}, factoryMeta), { expression: importExpr(Identifiers.inject).callFn([meta.useExisting.expression]) }));
  } else {
    result = {
      statements: [],
      expression: delegateToFactory(meta.type.value, meta.internalType, resolveForwardRefs)
    };
  }
  const token = meta.internalType;
  const injectableProps = new DefinitionMap();
  injectableProps.set("token", token);
  injectableProps.set("factory", result.expression);
  if (meta.providedIn.expression.value !== null) {
    injectableProps.set("providedIn", convertFromMaybeForwardRefExpression(meta.providedIn));
  }
  const expression = importExpr(Identifiers.\u0275\u0275defineInjectable).callFn([injectableProps.toLiteralMap()], void 0, true);
  return {
    expression,
    type: createInjectableType(meta),
    statements: result.statements
  };
}
function createInjectableType(meta) {
  return new ExpressionType(importExpr(Identifiers.InjectableDeclaration, [typeWithParameters(meta.type.type, meta.typeArgumentCount)]));
}
function delegateToFactory(type, internalType, unwrapForwardRefs) {
  if (type.node === internalType.node) {
    return internalType.prop("\u0275fac");
  }
  if (!unwrapForwardRefs) {
    return createFactoryFunction(internalType);
  }
  const unwrappedType = importExpr(Identifiers.resolveForwardRef).callFn([internalType]);
  return createFactoryFunction(unwrappedType);
}
function createFactoryFunction(type) {
  return fn([new FnParam("t", DYNAMIC_TYPE)], [new ReturnStatement(type.prop("\u0275fac").callFn([variable("t")]))]);
}
var UNUSABLE_INTERPOLATION_REGEXPS = [
  /^\s*$/,
  /[<>]/,
  /^[{}]$/,
  /&(#|[a-z])/i,
  /^\/\//
];
function assertInterpolationSymbols(identifier, value) {
  if (value != null && !(Array.isArray(value) && value.length == 2)) {
    throw new Error(`Expected '${identifier}' to be an array, [start, end].`);
  } else if (value != null) {
    const start = value[0];
    const end = value[1];
    UNUSABLE_INTERPOLATION_REGEXPS.forEach((regexp) => {
      if (regexp.test(start) || regexp.test(end)) {
        throw new Error(`['${start}', '${end}'] contains unusable interpolation symbol.`);
      }
    });
  }
}
var InterpolationConfig = class {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  static fromArray(markers) {
    if (!markers) {
      return DEFAULT_INTERPOLATION_CONFIG;
    }
    assertInterpolationSymbols("interpolation", markers);
    return new InterpolationConfig(markers[0], markers[1]);
  }
};
var DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig("{{", "}}");
var $EOF = 0;
var $BSPACE = 8;
var $TAB = 9;
var $LF = 10;
var $VTAB = 11;
var $FF = 12;
var $CR = 13;
var $SPACE = 32;
var $BANG = 33;
var $DQ = 34;
var $HASH = 35;
var $$ = 36;
var $PERCENT = 37;
var $AMPERSAND = 38;
var $SQ = 39;
var $LPAREN = 40;
var $RPAREN = 41;
var $STAR = 42;
var $PLUS = 43;
var $COMMA = 44;
var $MINUS = 45;
var $PERIOD = 46;
var $SLASH = 47;
var $COLON = 58;
var $SEMICOLON = 59;
var $LT = 60;
var $EQ = 61;
var $GT = 62;
var $QUESTION = 63;
var $0 = 48;
var $7 = 55;
var $9 = 57;
var $A = 65;
var $E = 69;
var $F = 70;
var $X = 88;
var $Z = 90;
var $LBRACKET = 91;
var $BACKSLASH = 92;
var $RBRACKET = 93;
var $CARET = 94;
var $_ = 95;
var $a = 97;
var $b = 98;
var $e = 101;
var $f = 102;
var $n = 110;
var $r = 114;
var $t = 116;
var $u = 117;
var $v = 118;
var $x = 120;
var $z = 122;
var $LBRACE = 123;
var $BAR = 124;
var $RBRACE = 125;
var $NBSP = 160;
var $BT = 96;
function isWhitespace(code) {
  return code >= $TAB && code <= $SPACE || code == $NBSP;
}
function isDigit(code) {
  return $0 <= code && code <= $9;
}
function isAsciiLetter(code) {
  return code >= $a && code <= $z || code >= $A && code <= $Z;
}
function isAsciiHexDigit(code) {
  return code >= $a && code <= $f || code >= $A && code <= $F || isDigit(code);
}
function isNewLine(code) {
  return code === $LF || code === $CR;
}
function isOctalDigit(code) {
  return $0 <= code && code <= $7;
}
function isQuote(code) {
  return code === $SQ || code === $DQ || code === $BT;
}
var ParseLocation = class {
  constructor(file, offset, line, col) {
    this.file = file;
    this.offset = offset;
    this.line = line;
    this.col = col;
  }
  toString() {
    return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
  }
  moveBy(delta) {
    const source = this.file.content;
    const len = source.length;
    let offset = this.offset;
    let line = this.line;
    let col = this.col;
    while (offset > 0 && delta < 0) {
      offset--;
      delta++;
      const ch = source.charCodeAt(offset);
      if (ch == $LF) {
        line--;
        const priorLine = source.substring(0, offset - 1).lastIndexOf(String.fromCharCode($LF));
        col = priorLine > 0 ? offset - priorLine : offset;
      } else {
        col--;
      }
    }
    while (offset < len && delta > 0) {
      const ch = source.charCodeAt(offset);
      offset++;
      delta--;
      if (ch == $LF) {
        line++;
        col = 0;
      } else {
        col++;
      }
    }
    return new ParseLocation(this.file, offset, line, col);
  }
  getContext(maxChars, maxLines) {
    const content = this.file.content;
    let startOffset = this.offset;
    if (startOffset != null) {
      if (startOffset > content.length - 1) {
        startOffset = content.length - 1;
      }
      let endOffset = startOffset;
      let ctxChars = 0;
      let ctxLines = 0;
      while (ctxChars < maxChars && startOffset > 0) {
        startOffset--;
        ctxChars++;
        if (content[startOffset] == "\n") {
          if (++ctxLines == maxLines) {
            break;
          }
        }
      }
      ctxChars = 0;
      ctxLines = 0;
      while (ctxChars < maxChars && endOffset < content.length - 1) {
        endOffset++;
        ctxChars++;
        if (content[endOffset] == "\n") {
          if (++ctxLines == maxLines) {
            break;
          }
        }
      }
      return {
        before: content.substring(startOffset, this.offset),
        after: content.substring(this.offset, endOffset + 1)
      };
    }
    return null;
  }
};
var ParseSourceFile = class {
  constructor(content, url) {
    this.content = content;
    this.url = url;
  }
};
var ParseSourceSpan = class {
  constructor(start, end, fullStart = start, details = null) {
    this.start = start;
    this.end = end;
    this.fullStart = fullStart;
    this.details = details;
  }
  toString() {
    return this.start.file.content.substring(this.start.offset, this.end.offset);
  }
};
var ParseErrorLevel;
(function(ParseErrorLevel2) {
  ParseErrorLevel2[ParseErrorLevel2["WARNING"] = 0] = "WARNING";
  ParseErrorLevel2[ParseErrorLevel2["ERROR"] = 1] = "ERROR";
})(ParseErrorLevel || (ParseErrorLevel = {}));
var ParseError = class {
  constructor(span, msg, level = ParseErrorLevel.ERROR) {
    this.span = span;
    this.msg = msg;
    this.level = level;
  }
  contextualMessage() {
    const ctx = this.span.start.getContext(100, 3);
    return ctx ? `${this.msg} ("${ctx.before}[${ParseErrorLevel[this.level]} ->]${ctx.after}")` : this.msg;
  }
  toString() {
    const details = this.span.details ? `, ${this.span.details}` : "";
    return `${this.contextualMessage()}: ${this.span.start}${details}`;
  }
};
function r3JitTypeSourceSpan(kind, typeName, sourceUrl) {
  const sourceFileName = `in ${kind} ${typeName} in ${sourceUrl}`;
  const sourceFile = new ParseSourceFile("", sourceFileName);
  return new ParseSourceSpan(new ParseLocation(sourceFile, -1, -1, -1), new ParseLocation(sourceFile, -1, -1, -1));
}
var _anonymousTypeIndex = 0;
function identifierName(compileIdentifier) {
  if (!compileIdentifier || !compileIdentifier.reference) {
    return null;
  }
  const ref = compileIdentifier.reference;
  if (ref["__anonymousType"]) {
    return ref["__anonymousType"];
  }
  if (ref["__forward_ref__"]) {
    return "__forward_ref__";
  }
  let identifier = stringify(ref);
  if (identifier.indexOf("(") >= 0) {
    identifier = `anonymous_${_anonymousTypeIndex++}`;
    ref["__anonymousType"] = identifier;
  } else {
    identifier = sanitizeIdentifier(identifier);
  }
  return identifier;
}
function sanitizeIdentifier(name) {
  return name.replace(/\W/g, "_");
}
var makeTemplateObjectPolyfill = '(this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e})';
var AbstractJsEmitterVisitor = class extends AbstractEmitterVisitor {
  constructor() {
    super(false);
  }
  visitWrappedNodeExpr(ast, ctx) {
    throw new Error("Cannot emit a WrappedNodeExpr in Javascript.");
  }
  visitDeclareVarStmt(stmt, ctx) {
    ctx.print(stmt, `var ${stmt.name}`);
    if (stmt.value) {
      ctx.print(stmt, " = ");
      stmt.value.visitExpression(this, ctx);
    }
    ctx.println(stmt, `;`);
    return null;
  }
  visitTaggedTemplateExpr(ast, ctx) {
    const elements = ast.template.elements;
    ast.tag.visitExpression(this, ctx);
    ctx.print(ast, `(${makeTemplateObjectPolyfill}(`);
    ctx.print(ast, `[${elements.map((part) => escapeIdentifier(part.text, false)).join(", ")}], `);
    ctx.print(ast, `[${elements.map((part) => escapeIdentifier(part.rawText, false)).join(", ")}])`);
    ast.template.expressions.forEach((expression) => {
      ctx.print(ast, ", ");
      expression.visitExpression(this, ctx);
    });
    ctx.print(ast, ")");
    return null;
  }
  visitFunctionExpr(ast, ctx) {
    ctx.print(ast, `function${ast.name ? " " + ast.name : ""}(`);
    this._visitParams(ast.params, ctx);
    ctx.println(ast, `) {`);
    ctx.incIndent();
    this.visitAllStatements(ast.statements, ctx);
    ctx.decIndent();
    ctx.print(ast, `}`);
    return null;
  }
  visitDeclareFunctionStmt(stmt, ctx) {
    ctx.print(stmt, `function ${stmt.name}(`);
    this._visitParams(stmt.params, ctx);
    ctx.println(stmt, `) {`);
    ctx.incIndent();
    this.visitAllStatements(stmt.statements, ctx);
    ctx.decIndent();
    ctx.println(stmt, `}`);
    return null;
  }
  visitLocalizedString(ast, ctx) {
    ctx.print(ast, `$localize(${makeTemplateObjectPolyfill}(`);
    const parts = [ast.serializeI18nHead()];
    for (let i = 1; i < ast.messageParts.length; i++) {
      parts.push(ast.serializeI18nTemplatePart(i));
    }
    ctx.print(ast, `[${parts.map((part) => escapeIdentifier(part.cooked, false)).join(", ")}], `);
    ctx.print(ast, `[${parts.map((part) => escapeIdentifier(part.raw, false)).join(", ")}])`);
    ast.expressions.forEach((expression) => {
      ctx.print(ast, ", ");
      expression.visitExpression(this, ctx);
    });
    ctx.print(ast, ")");
    return null;
  }
  _visitParams(params, ctx) {
    this.visitAllObjects((param) => ctx.print(null, param.name), params, ctx, ",");
  }
};
var policy;
function getPolicy() {
  if (policy === void 0) {
    policy = null;
    if (_global.trustedTypes) {
      try {
        policy = _global.trustedTypes.createPolicy("angular#unsafe-jit", {
          createScript: (s) => s
        });
      } catch (_a) {
      }
    }
  }
  return policy;
}
function trustedScriptFromString(script) {
  var _a;
  return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createScript(script)) || script;
}
function newTrustedFunctionForJIT(...args) {
  if (!_global.trustedTypes) {
    return new Function(...args);
  }
  const fnArgs = args.slice(0, -1).join(",");
  const fnBody = args[args.length - 1];
  const body = `(function anonymous(${fnArgs}
) { ${fnBody}
})`;
  const fn2 = _global["eval"](trustedScriptFromString(body));
  if (fn2.bind === void 0) {
    return new Function(...args);
  }
  fn2.toString = () => body;
  return fn2.bind(_global);
}
var JitEvaluator = class {
  evaluateStatements(sourceUrl, statements, refResolver, createSourceMaps) {
    const converter = new JitEmitterVisitor(refResolver);
    const ctx = EmitterVisitorContext.createRoot();
    if (statements.length > 0 && !isUseStrictStatement(statements[0])) {
      statements = [
        literal("use strict").toStmt(),
        ...statements
      ];
    }
    converter.visitAllStatements(statements, ctx);
    converter.createReturnStmt(ctx);
    return this.evaluateCode(sourceUrl, ctx, converter.getArgs(), createSourceMaps);
  }
  evaluateCode(sourceUrl, ctx, vars, createSourceMap) {
    let fnBody = `"use strict";${ctx.toSource()}
//# sourceURL=${sourceUrl}`;
    const fnArgNames = [];
    const fnArgValues = [];
    for (const argName in vars) {
      fnArgValues.push(vars[argName]);
      fnArgNames.push(argName);
    }
    if (createSourceMap) {
      const emptyFn = newTrustedFunctionForJIT(...fnArgNames.concat("return null;")).toString();
      const headerLines = emptyFn.slice(0, emptyFn.indexOf("return null;")).split("\n").length - 1;
      fnBody += `
${ctx.toSourceMapGenerator(sourceUrl, headerLines).toJsComment()}`;
    }
    const fn2 = newTrustedFunctionForJIT(...fnArgNames.concat(fnBody));
    return this.executeFunction(fn2, fnArgValues);
  }
  executeFunction(fn2, args) {
    return fn2(...args);
  }
};
var JitEmitterVisitor = class extends AbstractJsEmitterVisitor {
  constructor(refResolver) {
    super();
    this.refResolver = refResolver;
    this._evalArgNames = [];
    this._evalArgValues = [];
    this._evalExportedVars = [];
  }
  createReturnStmt(ctx) {
    const stmt = new ReturnStatement(new LiteralMapExpr(this._evalExportedVars.map((resultVar) => new LiteralMapEntry(resultVar, variable(resultVar), false))));
    stmt.visitStatement(this, ctx);
  }
  getArgs() {
    const result = {};
    for (let i = 0; i < this._evalArgNames.length; i++) {
      result[this._evalArgNames[i]] = this._evalArgValues[i];
    }
    return result;
  }
  visitExternalExpr(ast, ctx) {
    this._emitReferenceToExternal(ast, this.refResolver.resolveExternalReference(ast.value), ctx);
    return null;
  }
  visitWrappedNodeExpr(ast, ctx) {
    this._emitReferenceToExternal(ast, ast.node, ctx);
    return null;
  }
  visitDeclareVarStmt(stmt, ctx) {
    if (stmt.hasModifier(StmtModifier.Exported)) {
      this._evalExportedVars.push(stmt.name);
    }
    return super.visitDeclareVarStmt(stmt, ctx);
  }
  visitDeclareFunctionStmt(stmt, ctx) {
    if (stmt.hasModifier(StmtModifier.Exported)) {
      this._evalExportedVars.push(stmt.name);
    }
    return super.visitDeclareFunctionStmt(stmt, ctx);
  }
  _emitReferenceToExternal(ast, value, ctx) {
    let id = this._evalArgValues.indexOf(value);
    if (id === -1) {
      id = this._evalArgValues.length;
      this._evalArgValues.push(value);
      const name = identifierName({ reference: value }) || "val";
      this._evalArgNames.push(`jit_${name}_${id}`);
    }
    ctx.print(ast, this._evalArgNames[id]);
  }
};
function isUseStrictStatement(statement) {
  return statement.isEquivalent(literal("use strict").toStmt());
}
function compileInjector(meta) {
  const definitionMap = new DefinitionMap();
  if (meta.providers !== null) {
    definitionMap.set("providers", meta.providers);
  }
  if (meta.imports.length > 0) {
    definitionMap.set("imports", literalArr(meta.imports));
  }
  const expression = importExpr(Identifiers.defineInjector).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createInjectorType(meta);
  return { expression, type, statements: [] };
}
function createInjectorType(meta) {
  return new ExpressionType(importExpr(Identifiers.InjectorDeclaration, [new ExpressionType(meta.type.type)]));
}
var R3JitReflector = class {
  constructor(context) {
    this.context = context;
  }
  resolveExternalReference(ref) {
    if (ref.moduleName !== "@angular/core") {
      throw new Error(`Cannot resolve external reference to ${ref.moduleName}, only references to @angular/core are supported.`);
    }
    if (!this.context.hasOwnProperty(ref.name)) {
      throw new Error(`No value provided for @angular/core symbol '${ref.name}'.`);
    }
    return this.context[ref.name];
  }
};
var R3SelectorScopeMode;
(function(R3SelectorScopeMode2) {
  R3SelectorScopeMode2[R3SelectorScopeMode2["Inline"] = 0] = "Inline";
  R3SelectorScopeMode2[R3SelectorScopeMode2["SideEffect"] = 1] = "SideEffect";
  R3SelectorScopeMode2[R3SelectorScopeMode2["Omit"] = 2] = "Omit";
})(R3SelectorScopeMode || (R3SelectorScopeMode = {}));
function compileNgModule(meta) {
  const { adjacentType, internalType, bootstrap, declarations, imports, exports, schemas, containsForwardDecls, selectorScopeMode, id } = meta;
  const statements = [];
  const definitionMap = new DefinitionMap();
  definitionMap.set("type", internalType);
  if (bootstrap.length > 0) {
    definitionMap.set("bootstrap", refsToArray(bootstrap, containsForwardDecls));
  }
  if (selectorScopeMode === R3SelectorScopeMode.Inline) {
    if (declarations.length > 0) {
      definitionMap.set("declarations", refsToArray(declarations, containsForwardDecls));
    }
    if (imports.length > 0) {
      definitionMap.set("imports", refsToArray(imports, containsForwardDecls));
    }
    if (exports.length > 0) {
      definitionMap.set("exports", refsToArray(exports, containsForwardDecls));
    }
  } else if (selectorScopeMode === R3SelectorScopeMode.SideEffect) {
    const setNgModuleScopeCall = generateSetNgModuleScopeCall(meta);
    if (setNgModuleScopeCall !== null) {
      statements.push(setNgModuleScopeCall);
    }
  } else {
  }
  if (schemas !== null && schemas.length > 0) {
    definitionMap.set("schemas", literalArr(schemas.map((ref) => ref.value)));
  }
  if (id !== null) {
    definitionMap.set("id", id);
    statements.push(importExpr(Identifiers.registerNgModuleType).callFn([adjacentType, id]).toStmt());
  }
  const expression = importExpr(Identifiers.defineNgModule).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createNgModuleType(meta);
  return { expression, type, statements };
}
function compileNgModuleDeclarationExpression(meta) {
  const definitionMap = new DefinitionMap();
  definitionMap.set("type", new WrappedNodeExpr(meta.type));
  if (meta.bootstrap !== void 0) {
    definitionMap.set("bootstrap", new WrappedNodeExpr(meta.bootstrap));
  }
  if (meta.declarations !== void 0) {
    definitionMap.set("declarations", new WrappedNodeExpr(meta.declarations));
  }
  if (meta.imports !== void 0) {
    definitionMap.set("imports", new WrappedNodeExpr(meta.imports));
  }
  if (meta.exports !== void 0) {
    definitionMap.set("exports", new WrappedNodeExpr(meta.exports));
  }
  if (meta.schemas !== void 0) {
    definitionMap.set("schemas", new WrappedNodeExpr(meta.schemas));
  }
  if (meta.id !== void 0) {
    definitionMap.set("id", new WrappedNodeExpr(meta.id));
  }
  return importExpr(Identifiers.defineNgModule).callFn([definitionMap.toLiteralMap()]);
}
function createNgModuleType({ type: moduleType, declarations, exports, imports, includeImportTypes, publicDeclarationTypes }) {
  return new ExpressionType(importExpr(Identifiers.NgModuleDeclaration, [
    new ExpressionType(moduleType.type),
    publicDeclarationTypes === null ? tupleTypeOf(declarations) : tupleOfTypes(publicDeclarationTypes),
    includeImportTypes ? tupleTypeOf(imports) : NONE_TYPE,
    tupleTypeOf(exports)
  ]));
}
function generateSetNgModuleScopeCall(meta) {
  const { adjacentType: moduleType, declarations, imports, exports, containsForwardDecls } = meta;
  const scopeMap = new DefinitionMap();
  if (declarations.length > 0) {
    scopeMap.set("declarations", refsToArray(declarations, containsForwardDecls));
  }
  if (imports.length > 0) {
    scopeMap.set("imports", refsToArray(imports, containsForwardDecls));
  }
  if (exports.length > 0) {
    scopeMap.set("exports", refsToArray(exports, containsForwardDecls));
  }
  if (Object.keys(scopeMap.values).length === 0) {
    return null;
  }
  const fnCall = new InvokeFunctionExpr(importExpr(Identifiers.setNgModuleScope), [moduleType, scopeMap.toLiteralMap()]);
  const guardedCall = jitOnlyGuardedExpression(fnCall);
  const iife = new FunctionExpr([], [guardedCall.toStmt()]);
  const iifeCall = new InvokeFunctionExpr(iife, []);
  return iifeCall.toStmt();
}
function tupleTypeOf(exp) {
  const types = exp.map((ref) => typeofExpr(ref.type));
  return exp.length > 0 ? expressionType(literalArr(types)) : NONE_TYPE;
}
function tupleOfTypes(types) {
  const typeofTypes = types.map((type) => typeofExpr(type));
  return types.length > 0 ? expressionType(literalArr(typeofTypes)) : NONE_TYPE;
}
function compilePipeFromMetadata(metadata) {
  const definitionMapValues = [];
  definitionMapValues.push({ key: "name", value: literal(metadata.pipeName), quoted: false });
  definitionMapValues.push({ key: "type", value: metadata.type.value, quoted: false });
  definitionMapValues.push({ key: "pure", value: literal(metadata.pure), quoted: false });
  if (metadata.isStandalone) {
    definitionMapValues.push({ key: "standalone", value: literal(true), quoted: false });
  }
  const expression = importExpr(Identifiers.definePipe).callFn([literalMap(definitionMapValues)], void 0, true);
  const type = createPipeType(metadata);
  return { expression, type, statements: [] };
}
function createPipeType(metadata) {
  return new ExpressionType(importExpr(Identifiers.PipeDeclaration, [
    typeWithParameters(metadata.type.type, metadata.typeArgumentCount),
    new ExpressionType(new LiteralExpr(metadata.pipeName)),
    new ExpressionType(new LiteralExpr(metadata.isStandalone))
  ]));
}
var R3TemplateDependencyKind;
(function(R3TemplateDependencyKind2) {
  R3TemplateDependencyKind2[R3TemplateDependencyKind2["Directive"] = 0] = "Directive";
  R3TemplateDependencyKind2[R3TemplateDependencyKind2["Pipe"] = 1] = "Pipe";
  R3TemplateDependencyKind2[R3TemplateDependencyKind2["NgModule"] = 2] = "NgModule";
})(R3TemplateDependencyKind || (R3TemplateDependencyKind = {}));
var ParserError = class {
  constructor(message, input, errLocation, ctxLocation) {
    this.input = input;
    this.errLocation = errLocation;
    this.ctxLocation = ctxLocation;
    this.message = `Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`;
  }
};
var ParseSpan = class {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  toAbsolute(absoluteOffset) {
    return new AbsoluteSourceSpan(absoluteOffset + this.start, absoluteOffset + this.end);
  }
};
var AST = class {
  constructor(span, sourceSpan) {
    this.span = span;
    this.sourceSpan = sourceSpan;
  }
  toString() {
    return "AST";
  }
};
var ASTWithName = class extends AST {
  constructor(span, sourceSpan, nameSpan) {
    super(span, sourceSpan);
    this.nameSpan = nameSpan;
  }
};
var EmptyExpr = class extends AST {
  visit(visitor, context = null) {
  }
};
var ImplicitReceiver = class extends AST {
  visit(visitor, context = null) {
    return visitor.visitImplicitReceiver(this, context);
  }
};
var ThisReceiver = class extends ImplicitReceiver {
  visit(visitor, context = null) {
    var _a;
    return (_a = visitor.visitThisReceiver) === null || _a === void 0 ? void 0 : _a.call(visitor, this, context);
  }
};
var Chain = class extends AST {
  constructor(span, sourceSpan, expressions) {
    super(span, sourceSpan);
    this.expressions = expressions;
  }
  visit(visitor, context = null) {
    return visitor.visitChain(this, context);
  }
};
var Conditional = class extends AST {
  constructor(span, sourceSpan, condition, trueExp, falseExp) {
    super(span, sourceSpan);
    this.condition = condition;
    this.trueExp = trueExp;
    this.falseExp = falseExp;
  }
  visit(visitor, context = null) {
    return visitor.visitConditional(this, context);
  }
};
var PropertyRead = class extends ASTWithName {
  constructor(span, sourceSpan, nameSpan, receiver, name) {
    super(span, sourceSpan, nameSpan);
    this.receiver = receiver;
    this.name = name;
  }
  visit(visitor, context = null) {
    return visitor.visitPropertyRead(this, context);
  }
};
var PropertyWrite = class extends ASTWithName {
  constructor(span, sourceSpan, nameSpan, receiver, name, value) {
    super(span, sourceSpan, nameSpan);
    this.receiver = receiver;
    this.name = name;
    this.value = value;
  }
  visit(visitor, context = null) {
    return visitor.visitPropertyWrite(this, context);
  }
};
var SafePropertyRead = class extends ASTWithName {
  constructor(span, sourceSpan, nameSpan, receiver, name) {
    super(span, sourceSpan, nameSpan);
    this.receiver = receiver;
    this.name = name;
  }
  visit(visitor, context = null) {
    return visitor.visitSafePropertyRead(this, context);
  }
};
var KeyedRead = class extends AST {
  constructor(span, sourceSpan, receiver, key) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.key = key;
  }
  visit(visitor, context = null) {
    return visitor.visitKeyedRead(this, context);
  }
};
var SafeKeyedRead = class extends AST {
  constructor(span, sourceSpan, receiver, key) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.key = key;
  }
  visit(visitor, context = null) {
    return visitor.visitSafeKeyedRead(this, context);
  }
};
var KeyedWrite = class extends AST {
  constructor(span, sourceSpan, receiver, key, value) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.key = key;
    this.value = value;
  }
  visit(visitor, context = null) {
    return visitor.visitKeyedWrite(this, context);
  }
};
var BindingPipe = class extends ASTWithName {
  constructor(span, sourceSpan, exp, name, args, nameSpan) {
    super(span, sourceSpan, nameSpan);
    this.exp = exp;
    this.name = name;
    this.args = args;
  }
  visit(visitor, context = null) {
    return visitor.visitPipe(this, context);
  }
};
var LiteralPrimitive = class extends AST {
  constructor(span, sourceSpan, value) {
    super(span, sourceSpan);
    this.value = value;
  }
  visit(visitor, context = null) {
    return visitor.visitLiteralPrimitive(this, context);
  }
};
var LiteralArray = class extends AST {
  constructor(span, sourceSpan, expressions) {
    super(span, sourceSpan);
    this.expressions = expressions;
  }
  visit(visitor, context = null) {
    return visitor.visitLiteralArray(this, context);
  }
};
var LiteralMap = class extends AST {
  constructor(span, sourceSpan, keys, values) {
    super(span, sourceSpan);
    this.keys = keys;
    this.values = values;
  }
  visit(visitor, context = null) {
    return visitor.visitLiteralMap(this, context);
  }
};
var Interpolation = class extends AST {
  constructor(span, sourceSpan, strings, expressions) {
    super(span, sourceSpan);
    this.strings = strings;
    this.expressions = expressions;
  }
  visit(visitor, context = null) {
    return visitor.visitInterpolation(this, context);
  }
};
var Binary = class extends AST {
  constructor(span, sourceSpan, operation, left, right) {
    super(span, sourceSpan);
    this.operation = operation;
    this.left = left;
    this.right = right;
  }
  visit(visitor, context = null) {
    return visitor.visitBinary(this, context);
  }
};
var Unary = class extends Binary {
  constructor(span, sourceSpan, operator, expr, binaryOp, binaryLeft, binaryRight) {
    super(span, sourceSpan, binaryOp, binaryLeft, binaryRight);
    this.operator = operator;
    this.expr = expr;
    this.left = null;
    this.right = null;
    this.operation = null;
  }
  static createMinus(span, sourceSpan, expr) {
    return new Unary(span, sourceSpan, "-", expr, "-", new LiteralPrimitive(span, sourceSpan, 0), expr);
  }
  static createPlus(span, sourceSpan, expr) {
    return new Unary(span, sourceSpan, "+", expr, "-", expr, new LiteralPrimitive(span, sourceSpan, 0));
  }
  visit(visitor, context = null) {
    if (visitor.visitUnary !== void 0) {
      return visitor.visitUnary(this, context);
    }
    return visitor.visitBinary(this, context);
  }
};
var PrefixNot = class extends AST {
  constructor(span, sourceSpan, expression) {
    super(span, sourceSpan);
    this.expression = expression;
  }
  visit(visitor, context = null) {
    return visitor.visitPrefixNot(this, context);
  }
};
var NonNullAssert = class extends AST {
  constructor(span, sourceSpan, expression) {
    super(span, sourceSpan);
    this.expression = expression;
  }
  visit(visitor, context = null) {
    return visitor.visitNonNullAssert(this, context);
  }
};
var Call = class extends AST {
  constructor(span, sourceSpan, receiver, args, argumentSpan) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.args = args;
    this.argumentSpan = argumentSpan;
  }
  visit(visitor, context = null) {
    return visitor.visitCall(this, context);
  }
};
var SafeCall = class extends AST {
  constructor(span, sourceSpan, receiver, args, argumentSpan) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.args = args;
    this.argumentSpan = argumentSpan;
  }
  visit(visitor, context = null) {
    return visitor.visitSafeCall(this, context);
  }
};
var AbsoluteSourceSpan = class {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
};
var ASTWithSource = class extends AST {
  constructor(ast, source, location, absoluteOffset, errors) {
    super(new ParseSpan(0, source === null ? 0 : source.length), new AbsoluteSourceSpan(absoluteOffset, source === null ? absoluteOffset : absoluteOffset + source.length));
    this.ast = ast;
    this.source = source;
    this.location = location;
    this.errors = errors;
  }
  visit(visitor, context = null) {
    if (visitor.visitASTWithSource) {
      return visitor.visitASTWithSource(this, context);
    }
    return this.ast.visit(visitor, context);
  }
  toString() {
    return `${this.source} in ${this.location}`;
  }
};
var VariableBinding = class {
  constructor(sourceSpan, key, value) {
    this.sourceSpan = sourceSpan;
    this.key = key;
    this.value = value;
  }
};
var ExpressionBinding = class {
  constructor(sourceSpan, key, value) {
    this.sourceSpan = sourceSpan;
    this.key = key;
    this.value = value;
  }
};
var RecursiveAstVisitor = class {
  visit(ast, context) {
    ast.visit(this, context);
  }
  visitUnary(ast, context) {
    this.visit(ast.expr, context);
  }
  visitBinary(ast, context) {
    this.visit(ast.left, context);
    this.visit(ast.right, context);
  }
  visitChain(ast, context) {
    this.visitAll(ast.expressions, context);
  }
  visitConditional(ast, context) {
    this.visit(ast.condition, context);
    this.visit(ast.trueExp, context);
    this.visit(ast.falseExp, context);
  }
  visitPipe(ast, context) {
    this.visit(ast.exp, context);
    this.visitAll(ast.args, context);
  }
  visitImplicitReceiver(ast, context) {
  }
  visitThisReceiver(ast, context) {
  }
  visitInterpolation(ast, context) {
    this.visitAll(ast.expressions, context);
  }
  visitKeyedRead(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.key, context);
  }
  visitKeyedWrite(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.key, context);
    this.visit(ast.value, context);
  }
  visitLiteralArray(ast, context) {
    this.visitAll(ast.expressions, context);
  }
  visitLiteralMap(ast, context) {
    this.visitAll(ast.values, context);
  }
  visitLiteralPrimitive(ast, context) {
  }
  visitPrefixNot(ast, context) {
    this.visit(ast.expression, context);
  }
  visitNonNullAssert(ast, context) {
    this.visit(ast.expression, context);
  }
  visitPropertyRead(ast, context) {
    this.visit(ast.receiver, context);
  }
  visitPropertyWrite(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.value, context);
  }
  visitSafePropertyRead(ast, context) {
    this.visit(ast.receiver, context);
  }
  visitSafeKeyedRead(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.key, context);
  }
  visitCall(ast, context) {
    this.visit(ast.receiver, context);
    this.visitAll(ast.args, context);
  }
  visitSafeCall(ast, context) {
    this.visit(ast.receiver, context);
    this.visitAll(ast.args, context);
  }
  visitAll(asts, context) {
    for (const ast of asts) {
      this.visit(ast, context);
    }
  }
};
var AstTransformer = class {
  visitImplicitReceiver(ast, context) {
    return ast;
  }
  visitThisReceiver(ast, context) {
    return ast;
  }
  visitInterpolation(ast, context) {
    return new Interpolation(ast.span, ast.sourceSpan, ast.strings, this.visitAll(ast.expressions));
  }
  visitLiteralPrimitive(ast, context) {
    return new LiteralPrimitive(ast.span, ast.sourceSpan, ast.value);
  }
  visitPropertyRead(ast, context) {
    return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
  }
  visitPropertyWrite(ast, context) {
    return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, ast.value.visit(this));
  }
  visitSafePropertyRead(ast, context) {
    return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
  }
  visitLiteralArray(ast, context) {
    return new LiteralArray(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
  }
  visitLiteralMap(ast, context) {
    return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, this.visitAll(ast.values));
  }
  visitUnary(ast, context) {
    switch (ast.operator) {
      case "+":
        return Unary.createPlus(ast.span, ast.sourceSpan, ast.expr.visit(this));
      case "-":
        return Unary.createMinus(ast.span, ast.sourceSpan, ast.expr.visit(this));
      default:
        throw new Error(`Unknown unary operator ${ast.operator}`);
    }
  }
  visitBinary(ast, context) {
    return new Binary(ast.span, ast.sourceSpan, ast.operation, ast.left.visit(this), ast.right.visit(this));
  }
  visitPrefixNot(ast, context) {
    return new PrefixNot(ast.span, ast.sourceSpan, ast.expression.visit(this));
  }
  visitNonNullAssert(ast, context) {
    return new NonNullAssert(ast.span, ast.sourceSpan, ast.expression.visit(this));
  }
  visitConditional(ast, context) {
    return new Conditional(ast.span, ast.sourceSpan, ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
  }
  visitPipe(ast, context) {
    return new BindingPipe(ast.span, ast.sourceSpan, ast.exp.visit(this), ast.name, this.visitAll(ast.args), ast.nameSpan);
  }
  visitKeyedRead(ast, context) {
    return new KeyedRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this));
  }
  visitKeyedWrite(ast, context) {
    return new KeyedWrite(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this), ast.value.visit(this));
  }
  visitCall(ast, context) {
    return new Call(ast.span, ast.sourceSpan, ast.receiver.visit(this), this.visitAll(ast.args), ast.argumentSpan);
  }
  visitSafeCall(ast, context) {
    return new SafeCall(ast.span, ast.sourceSpan, ast.receiver.visit(this), this.visitAll(ast.args), ast.argumentSpan);
  }
  visitAll(asts) {
    const res = [];
    for (let i = 0; i < asts.length; ++i) {
      res[i] = asts[i].visit(this);
    }
    return res;
  }
  visitChain(ast, context) {
    return new Chain(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
  }
  visitSafeKeyedRead(ast, context) {
    return new SafeKeyedRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this));
  }
};
var AstMemoryEfficientTransformer = class {
  visitImplicitReceiver(ast, context) {
    return ast;
  }
  visitThisReceiver(ast, context) {
    return ast;
  }
  visitInterpolation(ast, context) {
    const expressions = this.visitAll(ast.expressions);
    if (expressions !== ast.expressions)
      return new Interpolation(ast.span, ast.sourceSpan, ast.strings, expressions);
    return ast;
  }
  visitLiteralPrimitive(ast, context) {
    return ast;
  }
  visitPropertyRead(ast, context) {
    const receiver = ast.receiver.visit(this);
    if (receiver !== ast.receiver) {
      return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
    }
    return ast;
  }
  visitPropertyWrite(ast, context) {
    const receiver = ast.receiver.visit(this);
    const value = ast.value.visit(this);
    if (receiver !== ast.receiver || value !== ast.value) {
      return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, value);
    }
    return ast;
  }
  visitSafePropertyRead(ast, context) {
    const receiver = ast.receiver.visit(this);
    if (receiver !== ast.receiver) {
      return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
    }
    return ast;
  }
  visitLiteralArray(ast, context) {
    const expressions = this.visitAll(ast.expressions);
    if (expressions !== ast.expressions) {
      return new LiteralArray(ast.span, ast.sourceSpan, expressions);
    }
    return ast;
  }
  visitLiteralMap(ast, context) {
    const values = this.visitAll(ast.values);
    if (values !== ast.values) {
      return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, values);
    }
    return ast;
  }
  visitUnary(ast, context) {
    const expr = ast.expr.visit(this);
    if (expr !== ast.expr) {
      switch (ast.operator) {
        case "+":
          return Unary.createPlus(ast.span, ast.sourceSpan, expr);
        case "-":
          return Unary.createMinus(ast.span, ast.sourceSpan, expr);
        default:
          throw new Error(`Unknown unary operator ${ast.operator}`);
      }
    }
    return ast;
  }
  visitBinary(ast, context) {
    const left = ast.left.visit(this);
    const right = ast.right.visit(this);
    if (left !== ast.left || right !== ast.right) {
      return new Binary(ast.span, ast.sourceSpan, ast.operation, left, right);
    }
    return ast;
  }
  visitPrefixNot(ast, context) {
    const expression = ast.expression.visit(this);
    if (expression !== ast.expression) {
      return new PrefixNot(ast.span, ast.sourceSpan, expression);
    }
    return ast;
  }
  visitNonNullAssert(ast, context) {
    const expression = ast.expression.visit(this);
    if (expression !== ast.expression) {
      return new NonNullAssert(ast.span, ast.sourceSpan, expression);
    }
    return ast;
  }
  visitConditional(ast, context) {
    const condition = ast.condition.visit(this);
    const trueExp = ast.trueExp.visit(this);
    const falseExp = ast.falseExp.visit(this);
    if (condition !== ast.condition || trueExp !== ast.trueExp || falseExp !== ast.falseExp) {
      return new Conditional(ast.span, ast.sourceSpan, condition, trueExp, falseExp);
    }
    return ast;
  }
  visitPipe(ast, context) {
    const exp = ast.exp.visit(this);
    const args = this.visitAll(ast.args);
    if (exp !== ast.exp || args !== ast.args) {
      return new BindingPipe(ast.span, ast.sourceSpan, exp, ast.name, args, ast.nameSpan);
    }
    return ast;
  }
  visitKeyedRead(ast, context) {
    const obj = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    if (obj !== ast.receiver || key !== ast.key) {
      return new KeyedRead(ast.span, ast.sourceSpan, obj, key);
    }
    return ast;
  }
  visitKeyedWrite(ast, context) {
    const obj = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    const value = ast.value.visit(this);
    if (obj !== ast.receiver || key !== ast.key || value !== ast.value) {
      return new KeyedWrite(ast.span, ast.sourceSpan, obj, key, value);
    }
    return ast;
  }
  visitAll(asts) {
    const res = [];
    let modified = false;
    for (let i = 0; i < asts.length; ++i) {
      const original = asts[i];
      const value = original.visit(this);
      res[i] = value;
      modified = modified || value !== original;
    }
    return modified ? res : asts;
  }
  visitChain(ast, context) {
    const expressions = this.visitAll(ast.expressions);
    if (expressions !== ast.expressions) {
      return new Chain(ast.span, ast.sourceSpan, expressions);
    }
    return ast;
  }
  visitCall(ast, context) {
    const receiver = ast.receiver.visit(this);
    const args = this.visitAll(ast.args);
    if (receiver !== ast.receiver || args !== ast.args) {
      return new Call(ast.span, ast.sourceSpan, receiver, args, ast.argumentSpan);
    }
    return ast;
  }
  visitSafeCall(ast, context) {
    const receiver = ast.receiver.visit(this);
    const args = this.visitAll(ast.args);
    if (receiver !== ast.receiver || args !== ast.args) {
      return new SafeCall(ast.span, ast.sourceSpan, receiver, args, ast.argumentSpan);
    }
    return ast;
  }
  visitSafeKeyedRead(ast, context) {
    const obj = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    if (obj !== ast.receiver || key !== ast.key) {
      return new SafeKeyedRead(ast.span, ast.sourceSpan, obj, key);
    }
    return ast;
  }
};
var ParsedProperty = class {
  constructor(name, expression, type, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.expression = expression;
    this.type = type;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.isLiteral = this.type === ParsedPropertyType.LITERAL_ATTR;
    this.isAnimation = this.type === ParsedPropertyType.ANIMATION;
  }
};
var ParsedPropertyType;
(function(ParsedPropertyType2) {
  ParsedPropertyType2[ParsedPropertyType2["DEFAULT"] = 0] = "DEFAULT";
  ParsedPropertyType2[ParsedPropertyType2["LITERAL_ATTR"] = 1] = "LITERAL_ATTR";
  ParsedPropertyType2[ParsedPropertyType2["ANIMATION"] = 2] = "ANIMATION";
})(ParsedPropertyType || (ParsedPropertyType = {}));
var ParsedEvent = class {
  constructor(name, targetOrPhase, type, handler, sourceSpan, handlerSpan, keySpan) {
    this.name = name;
    this.targetOrPhase = targetOrPhase;
    this.type = type;
    this.handler = handler;
    this.sourceSpan = sourceSpan;
    this.handlerSpan = handlerSpan;
    this.keySpan = keySpan;
  }
};
var ParsedVariable = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
};
var BoundElementProperty = class {
  constructor(name, type, securityContext, value, unit, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.type = type;
    this.securityContext = securityContext;
    this.value = value;
    this.unit = unit;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
};
var EventHandlerVars = class {
};
EventHandlerVars.event = variable("$event");
function convertActionBinding(localResolver, implicitReceiver, action, bindingId, baseSourceSpan, implicitReceiverAccesses, globals) {
  if (!localResolver) {
    localResolver = new DefaultLocalResolver(globals);
  }
  const actionWithoutBuiltins = convertPropertyBindingBuiltins({
    createLiteralArrayConverter: (argCount) => {
      return (args) => literalArr(args);
    },
    createLiteralMapConverter: (keys) => {
      return (values) => {
        const entries = keys.map((k, i) => ({
          key: k.key,
          value: values[i],
          quoted: k.quoted
        }));
        return literalMap(entries);
      };
    },
    createPipeConverter: (name) => {
      throw new Error(`Illegal State: Actions are not allowed to contain pipes. Pipe: ${name}`);
    }
  }, action);
  const visitor = new _AstToIrVisitor(localResolver, implicitReceiver, bindingId, false, baseSourceSpan, implicitReceiverAccesses);
  const actionStmts = [];
  flattenStatements(actionWithoutBuiltins.visit(visitor, _Mode.Statement), actionStmts);
  prependTemporaryDecls(visitor.temporaryCount, bindingId, actionStmts);
  if (visitor.usesImplicitReceiver) {
    localResolver.notifyImplicitReceiverUse();
  }
  const lastIndex = actionStmts.length - 1;
  if (lastIndex >= 0) {
    const lastStatement = actionStmts[lastIndex];
    if (lastStatement instanceof ExpressionStatement) {
      actionStmts[lastIndex] = new ReturnStatement(lastStatement.expr);
    }
  }
  return actionStmts;
}
function convertPropertyBindingBuiltins(converterFactory, ast) {
  return convertBuiltins(converterFactory, ast);
}
var ConvertPropertyBindingResult = class {
  constructor(stmts, currValExpr) {
    this.stmts = stmts;
    this.currValExpr = currValExpr;
  }
};
function convertPropertyBinding(localResolver, implicitReceiver, expressionWithoutBuiltins, bindingId) {
  if (!localResolver) {
    localResolver = new DefaultLocalResolver();
  }
  const visitor = new _AstToIrVisitor(localResolver, implicitReceiver, bindingId, false);
  const outputExpr = expressionWithoutBuiltins.visit(visitor, _Mode.Expression);
  const stmts = getStatementsFromVisitor(visitor, bindingId);
  if (visitor.usesImplicitReceiver) {
    localResolver.notifyImplicitReceiverUse();
  }
  return new ConvertPropertyBindingResult(stmts, outputExpr);
}
function convertUpdateArguments(localResolver, contextVariableExpression, expressionWithArgumentsToExtract, bindingId) {
  const visitor = new _AstToIrVisitor(localResolver, contextVariableExpression, bindingId, true);
  const outputExpr = visitor.visitInterpolation(expressionWithArgumentsToExtract, _Mode.Expression);
  if (visitor.usesImplicitReceiver) {
    localResolver.notifyImplicitReceiverUse();
  }
  const stmts = getStatementsFromVisitor(visitor, bindingId);
  const args = outputExpr.args;
  return { stmts, args };
}
function getStatementsFromVisitor(visitor, bindingId) {
  const stmts = [];
  for (let i = 0; i < visitor.temporaryCount; i++) {
    stmts.push(temporaryDeclaration(bindingId, i));
  }
  return stmts;
}
function convertBuiltins(converterFactory, ast) {
  const visitor = new _BuiltinAstConverter(converterFactory);
  return ast.visit(visitor);
}
function temporaryName(bindingId, temporaryNumber) {
  return `tmp_${bindingId}_${temporaryNumber}`;
}
function temporaryDeclaration(bindingId, temporaryNumber) {
  return new DeclareVarStmt(temporaryName(bindingId, temporaryNumber));
}
function prependTemporaryDecls(temporaryCount, bindingId, statements) {
  for (let i = temporaryCount - 1; i >= 0; i--) {
    statements.unshift(temporaryDeclaration(bindingId, i));
  }
}
var _Mode;
(function(_Mode2) {
  _Mode2[_Mode2["Statement"] = 0] = "Statement";
  _Mode2[_Mode2["Expression"] = 1] = "Expression";
})(_Mode || (_Mode = {}));
function ensureStatementMode(mode, ast) {
  if (mode !== _Mode.Statement) {
    throw new Error(`Expected a statement, but saw ${ast}`);
  }
}
function ensureExpressionMode(mode, ast) {
  if (mode !== _Mode.Expression) {
    throw new Error(`Expected an expression, but saw ${ast}`);
  }
}
function convertToStatementIfNeeded(mode, expr) {
  if (mode === _Mode.Statement) {
    return expr.toStmt();
  } else {
    return expr;
  }
}
var _BuiltinAstConverter = class extends AstTransformer {
  constructor(_converterFactory) {
    super();
    this._converterFactory = _converterFactory;
  }
  visitPipe(ast, context) {
    const args = [ast.exp, ...ast.args].map((ast2) => ast2.visit(this, context));
    return new BuiltinFunctionCall(ast.span, ast.sourceSpan, args, this._converterFactory.createPipeConverter(ast.name, args.length));
  }
  visitLiteralArray(ast, context) {
    const args = ast.expressions.map((ast2) => ast2.visit(this, context));
    return new BuiltinFunctionCall(ast.span, ast.sourceSpan, args, this._converterFactory.createLiteralArrayConverter(ast.expressions.length));
  }
  visitLiteralMap(ast, context) {
    const args = ast.values.map((ast2) => ast2.visit(this, context));
    return new BuiltinFunctionCall(ast.span, ast.sourceSpan, args, this._converterFactory.createLiteralMapConverter(ast.keys));
  }
};
var _AstToIrVisitor = class {
  constructor(_localResolver, _implicitReceiver, bindingId, supportsInterpolation, baseSourceSpan, implicitReceiverAccesses) {
    this._localResolver = _localResolver;
    this._implicitReceiver = _implicitReceiver;
    this.bindingId = bindingId;
    this.supportsInterpolation = supportsInterpolation;
    this.baseSourceSpan = baseSourceSpan;
    this.implicitReceiverAccesses = implicitReceiverAccesses;
    this._nodeMap = /* @__PURE__ */ new Map();
    this._resultMap = /* @__PURE__ */ new Map();
    this._currentTemporary = 0;
    this.temporaryCount = 0;
    this.usesImplicitReceiver = false;
  }
  visitUnary(ast, mode) {
    let op;
    switch (ast.operator) {
      case "+":
        op = UnaryOperator.Plus;
        break;
      case "-":
        op = UnaryOperator.Minus;
        break;
      default:
        throw new Error(`Unsupported operator ${ast.operator}`);
    }
    return convertToStatementIfNeeded(mode, new UnaryOperatorExpr(op, this._visit(ast.expr, _Mode.Expression), void 0, this.convertSourceSpan(ast.span)));
  }
  visitBinary(ast, mode) {
    let op;
    switch (ast.operation) {
      case "+":
        op = BinaryOperator.Plus;
        break;
      case "-":
        op = BinaryOperator.Minus;
        break;
      case "*":
        op = BinaryOperator.Multiply;
        break;
      case "/":
        op = BinaryOperator.Divide;
        break;
      case "%":
        op = BinaryOperator.Modulo;
        break;
      case "&&":
        op = BinaryOperator.And;
        break;
      case "||":
        op = BinaryOperator.Or;
        break;
      case "==":
        op = BinaryOperator.Equals;
        break;
      case "!=":
        op = BinaryOperator.NotEquals;
        break;
      case "===":
        op = BinaryOperator.Identical;
        break;
      case "!==":
        op = BinaryOperator.NotIdentical;
        break;
      case "<":
        op = BinaryOperator.Lower;
        break;
      case ">":
        op = BinaryOperator.Bigger;
        break;
      case "<=":
        op = BinaryOperator.LowerEquals;
        break;
      case ">=":
        op = BinaryOperator.BiggerEquals;
        break;
      case "??":
        return this.convertNullishCoalesce(ast, mode);
      default:
        throw new Error(`Unsupported operation ${ast.operation}`);
    }
    return convertToStatementIfNeeded(mode, new BinaryOperatorExpr(op, this._visit(ast.left, _Mode.Expression), this._visit(ast.right, _Mode.Expression), void 0, this.convertSourceSpan(ast.span)));
  }
  visitChain(ast, mode) {
    ensureStatementMode(mode, ast);
    return this.visitAll(ast.expressions, mode);
  }
  visitConditional(ast, mode) {
    const value = this._visit(ast.condition, _Mode.Expression);
    return convertToStatementIfNeeded(mode, value.conditional(this._visit(ast.trueExp, _Mode.Expression), this._visit(ast.falseExp, _Mode.Expression), this.convertSourceSpan(ast.span)));
  }
  visitPipe(ast, mode) {
    throw new Error(`Illegal state: Pipes should have been converted into functions. Pipe: ${ast.name}`);
  }
  visitImplicitReceiver(ast, mode) {
    ensureExpressionMode(mode, ast);
    this.usesImplicitReceiver = true;
    return this._implicitReceiver;
  }
  visitThisReceiver(ast, mode) {
    return this.visitImplicitReceiver(ast, mode);
  }
  visitInterpolation(ast, mode) {
    if (!this.supportsInterpolation) {
      throw new Error("Unexpected interpolation");
    }
    ensureExpressionMode(mode, ast);
    let args = [];
    for (let i = 0; i < ast.strings.length - 1; i++) {
      args.push(literal(ast.strings[i]));
      args.push(this._visit(ast.expressions[i], _Mode.Expression));
    }
    args.push(literal(ast.strings[ast.strings.length - 1]));
    const strings = ast.strings;
    if (strings.length === 2 && strings[0] === "" && strings[1] === "") {
      args = [args[1]];
    } else if (ast.expressions.length >= 9) {
      args = [literalArr(args)];
    }
    return new InterpolationExpression(args);
  }
  visitKeyedRead(ast, mode) {
    const leftMostSafe = this.leftMostSafeNode(ast);
    if (leftMostSafe) {
      return this.convertSafeAccess(ast, leftMostSafe, mode);
    } else {
      return convertToStatementIfNeeded(mode, this._visit(ast.receiver, _Mode.Expression).key(this._visit(ast.key, _Mode.Expression)));
    }
  }
  visitKeyedWrite(ast, mode) {
    const obj = this._visit(ast.receiver, _Mode.Expression);
    const key = this._visit(ast.key, _Mode.Expression);
    const value = this._visit(ast.value, _Mode.Expression);
    if (obj === this._implicitReceiver) {
      this._localResolver.maybeRestoreView();
    }
    return convertToStatementIfNeeded(mode, obj.key(key).set(value));
  }
  visitLiteralArray(ast, mode) {
    throw new Error(`Illegal State: literal arrays should have been converted into functions`);
  }
  visitLiteralMap(ast, mode) {
    throw new Error(`Illegal State: literal maps should have been converted into functions`);
  }
  visitLiteralPrimitive(ast, mode) {
    const type = ast.value === null || ast.value === void 0 || ast.value === true || ast.value === true ? INFERRED_TYPE : void 0;
    return convertToStatementIfNeeded(mode, literal(ast.value, type, this.convertSourceSpan(ast.span)));
  }
  _getLocal(name, receiver) {
    var _a;
    if (((_a = this._localResolver.globals) === null || _a === void 0 ? void 0 : _a.has(name)) && receiver instanceof ThisReceiver) {
      return null;
    }
    return this._localResolver.getLocal(name);
  }
  visitPrefixNot(ast, mode) {
    return convertToStatementIfNeeded(mode, not(this._visit(ast.expression, _Mode.Expression)));
  }
  visitNonNullAssert(ast, mode) {
    return convertToStatementIfNeeded(mode, this._visit(ast.expression, _Mode.Expression));
  }
  visitPropertyRead(ast, mode) {
    const leftMostSafe = this.leftMostSafeNode(ast);
    if (leftMostSafe) {
      return this.convertSafeAccess(ast, leftMostSafe, mode);
    } else {
      let result = null;
      const prevUsesImplicitReceiver = this.usesImplicitReceiver;
      const receiver = this._visit(ast.receiver, _Mode.Expression);
      if (receiver === this._implicitReceiver) {
        result = this._getLocal(ast.name, ast.receiver);
        if (result) {
          this.usesImplicitReceiver = prevUsesImplicitReceiver;
          this.addImplicitReceiverAccess(ast.name);
        }
      }
      if (result == null) {
        result = receiver.prop(ast.name, this.convertSourceSpan(ast.span));
      }
      return convertToStatementIfNeeded(mode, result);
    }
  }
  visitPropertyWrite(ast, mode) {
    const receiver = this._visit(ast.receiver, _Mode.Expression);
    const prevUsesImplicitReceiver = this.usesImplicitReceiver;
    let varExpr = null;
    if (receiver === this._implicitReceiver) {
      const localExpr = this._getLocal(ast.name, ast.receiver);
      if (localExpr) {
        if (localExpr instanceof ReadPropExpr) {
          varExpr = localExpr;
          this.usesImplicitReceiver = prevUsesImplicitReceiver;
          this.addImplicitReceiverAccess(ast.name);
        } else {
          const receiver2 = ast.name;
          const value = ast.value instanceof PropertyRead ? ast.value.name : void 0;
          throw new Error(`Cannot assign value "${value}" to template variable "${receiver2}". Template variables are read-only.`);
        }
      }
    }
    if (varExpr === null) {
      varExpr = receiver.prop(ast.name, this.convertSourceSpan(ast.span));
    }
    return convertToStatementIfNeeded(mode, varExpr.set(this._visit(ast.value, _Mode.Expression)));
  }
  visitSafePropertyRead(ast, mode) {
    return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
  }
  visitSafeKeyedRead(ast, mode) {
    return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
  }
  visitAll(asts, mode) {
    return asts.map((ast) => this._visit(ast, mode));
  }
  visitCall(ast, mode) {
    const leftMostSafe = this.leftMostSafeNode(ast);
    if (leftMostSafe) {
      return this.convertSafeAccess(ast, leftMostSafe, mode);
    }
    const convertedArgs = this.visitAll(ast.args, _Mode.Expression);
    if (ast instanceof BuiltinFunctionCall) {
      return convertToStatementIfNeeded(mode, ast.converter(convertedArgs));
    }
    const receiver = ast.receiver;
    if (receiver instanceof PropertyRead && receiver.receiver instanceof ImplicitReceiver && !(receiver.receiver instanceof ThisReceiver) && receiver.name === "$any") {
      if (convertedArgs.length !== 1) {
        throw new Error(`Invalid call to $any, expected 1 argument but received ${convertedArgs.length || "none"}`);
      }
      return convertToStatementIfNeeded(mode, convertedArgs[0]);
    }
    const call = this._visit(receiver, _Mode.Expression).callFn(convertedArgs, this.convertSourceSpan(ast.span));
    return convertToStatementIfNeeded(mode, call);
  }
  visitSafeCall(ast, mode) {
    return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
  }
  _visit(ast, mode) {
    const result = this._resultMap.get(ast);
    if (result)
      return result;
    return (this._nodeMap.get(ast) || ast).visit(this, mode);
  }
  convertSafeAccess(ast, leftMostSafe, mode) {
    let guardedExpression2 = this._visit(leftMostSafe.receiver, _Mode.Expression);
    let temporary = void 0;
    if (this.needsTemporaryInSafeAccess(leftMostSafe.receiver)) {
      temporary = this.allocateTemporary();
      guardedExpression2 = temporary.set(guardedExpression2);
      this._resultMap.set(leftMostSafe.receiver, temporary);
    }
    const condition = guardedExpression2.isBlank();
    if (leftMostSafe instanceof SafeCall) {
      this._nodeMap.set(leftMostSafe, new Call(leftMostSafe.span, leftMostSafe.sourceSpan, leftMostSafe.receiver, leftMostSafe.args, leftMostSafe.argumentSpan));
    } else if (leftMostSafe instanceof SafeKeyedRead) {
      this._nodeMap.set(leftMostSafe, new KeyedRead(leftMostSafe.span, leftMostSafe.sourceSpan, leftMostSafe.receiver, leftMostSafe.key));
    } else {
      this._nodeMap.set(leftMostSafe, new PropertyRead(leftMostSafe.span, leftMostSafe.sourceSpan, leftMostSafe.nameSpan, leftMostSafe.receiver, leftMostSafe.name));
    }
    const access = this._visit(ast, _Mode.Expression);
    this._nodeMap.delete(leftMostSafe);
    if (temporary) {
      this.releaseTemporary(temporary);
    }
    return convertToStatementIfNeeded(mode, condition.conditional(NULL_EXPR, access));
  }
  convertNullishCoalesce(ast, mode) {
    const left = this._visit(ast.left, _Mode.Expression);
    const right = this._visit(ast.right, _Mode.Expression);
    const temporary = this.allocateTemporary();
    this.releaseTemporary(temporary);
    return convertToStatementIfNeeded(mode, temporary.set(left).notIdentical(NULL_EXPR).and(temporary.notIdentical(literal(void 0))).conditional(temporary, right));
  }
  leftMostSafeNode(ast) {
    const visit = (visitor, ast2) => {
      return (this._nodeMap.get(ast2) || ast2).visit(visitor);
    };
    return ast.visit({
      visitUnary(ast2) {
        return null;
      },
      visitBinary(ast2) {
        return null;
      },
      visitChain(ast2) {
        return null;
      },
      visitConditional(ast2) {
        return null;
      },
      visitCall(ast2) {
        return visit(this, ast2.receiver);
      },
      visitSafeCall(ast2) {
        return visit(this, ast2.receiver) || ast2;
      },
      visitImplicitReceiver(ast2) {
        return null;
      },
      visitThisReceiver(ast2) {
        return null;
      },
      visitInterpolation(ast2) {
        return null;
      },
      visitKeyedRead(ast2) {
        return visit(this, ast2.receiver);
      },
      visitKeyedWrite(ast2) {
        return null;
      },
      visitLiteralArray(ast2) {
        return null;
      },
      visitLiteralMap(ast2) {
        return null;
      },
      visitLiteralPrimitive(ast2) {
        return null;
      },
      visitPipe(ast2) {
        return null;
      },
      visitPrefixNot(ast2) {
        return null;
      },
      visitNonNullAssert(ast2) {
        return null;
      },
      visitPropertyRead(ast2) {
        return visit(this, ast2.receiver);
      },
      visitPropertyWrite(ast2) {
        return null;
      },
      visitSafePropertyRead(ast2) {
        return visit(this, ast2.receiver) || ast2;
      },
      visitSafeKeyedRead(ast2) {
        return visit(this, ast2.receiver) || ast2;
      }
    });
  }
  needsTemporaryInSafeAccess(ast) {
    const visit = (visitor, ast2) => {
      return ast2 && (this._nodeMap.get(ast2) || ast2).visit(visitor);
    };
    const visitSome = (visitor, ast2) => {
      return ast2.some((ast3) => visit(visitor, ast3));
    };
    return ast.visit({
      visitUnary(ast2) {
        return visit(this, ast2.expr);
      },
      visitBinary(ast2) {
        return visit(this, ast2.left) || visit(this, ast2.right);
      },
      visitChain(ast2) {
        return false;
      },
      visitConditional(ast2) {
        return visit(this, ast2.condition) || visit(this, ast2.trueExp) || visit(this, ast2.falseExp);
      },
      visitCall(ast2) {
        return true;
      },
      visitSafeCall(ast2) {
        return true;
      },
      visitImplicitReceiver(ast2) {
        return false;
      },
      visitThisReceiver(ast2) {
        return false;
      },
      visitInterpolation(ast2) {
        return visitSome(this, ast2.expressions);
      },
      visitKeyedRead(ast2) {
        return false;
      },
      visitKeyedWrite(ast2) {
        return false;
      },
      visitLiteralArray(ast2) {
        return true;
      },
      visitLiteralMap(ast2) {
        return true;
      },
      visitLiteralPrimitive(ast2) {
        return false;
      },
      visitPipe(ast2) {
        return true;
      },
      visitPrefixNot(ast2) {
        return visit(this, ast2.expression);
      },
      visitNonNullAssert(ast2) {
        return visit(this, ast2.expression);
      },
      visitPropertyRead(ast2) {
        return false;
      },
      visitPropertyWrite(ast2) {
        return false;
      },
      visitSafePropertyRead(ast2) {
        return false;
      },
      visitSafeKeyedRead(ast2) {
        return false;
      }
    });
  }
  allocateTemporary() {
    const tempNumber = this._currentTemporary++;
    this.temporaryCount = Math.max(this._currentTemporary, this.temporaryCount);
    return new ReadVarExpr(temporaryName(this.bindingId, tempNumber));
  }
  releaseTemporary(temporary) {
    this._currentTemporary--;
    if (temporary.name != temporaryName(this.bindingId, this._currentTemporary)) {
      throw new Error(`Temporary ${temporary.name} released out of order`);
    }
  }
  convertSourceSpan(span) {
    if (this.baseSourceSpan) {
      const start = this.baseSourceSpan.start.moveBy(span.start);
      const end = this.baseSourceSpan.start.moveBy(span.end);
      const fullStart = this.baseSourceSpan.fullStart.moveBy(span.start);
      return new ParseSourceSpan(start, end, fullStart);
    } else {
      return null;
    }
  }
  addImplicitReceiverAccess(name) {
    if (this.implicitReceiverAccesses) {
      this.implicitReceiverAccesses.add(name);
    }
  }
};
function flattenStatements(arg, output) {
  if (Array.isArray(arg)) {
    arg.forEach((entry) => flattenStatements(entry, output));
  } else {
    output.push(arg);
  }
}
function unsupported() {
  throw new Error("Unsupported operation");
}
var InterpolationExpression = class extends Expression {
  constructor(args) {
    super(null, null);
    this.args = args;
    this.isConstant = unsupported;
    this.isEquivalent = unsupported;
    this.visitExpression = unsupported;
  }
};
var DefaultLocalResolver = class {
  constructor(globals) {
    this.globals = globals;
  }
  notifyImplicitReceiverUse() {
  }
  maybeRestoreView() {
  }
  getLocal(name) {
    if (name === EventHandlerVars.event.name) {
      return EventHandlerVars.event;
    }
    return null;
  }
};
var BuiltinFunctionCall = class extends Call {
  constructor(span, sourceSpan, args, converter) {
    super(span, sourceSpan, new EmptyExpr(span, sourceSpan), args, null);
    this.converter = converter;
  }
};
var animationKeywords = /* @__PURE__ */ new Set([
  "inherit",
  "initial",
  "revert",
  "unset",
  "alternate",
  "alternate-reverse",
  "normal",
  "reverse",
  "backwards",
  "both",
  "forwards",
  "none",
  "paused",
  "running",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "linear",
  "step-start",
  "step-end",
  "end",
  "jump-both",
  "jump-end",
  "jump-none",
  "jump-start",
  "start"
]);
var ShadowCss = class {
  constructor() {
    this.strictStyling = true;
    this._animationDeclarationKeyframesRe = /(^|\s+)(?:(?:(['"])((?:\\\\|\\\2|(?!\2).)+)\2)|(-?[A-Za-z][\w\-]*))(?=[,\s]|$)/g;
  }
  shimCssText(cssText, selector, hostSelector = "") {
    const commentsWithHash = extractCommentsWithHash(cssText);
    cssText = stripComments(cssText);
    cssText = this._insertDirectives(cssText);
    const scopedCssText = this._scopeCssText(cssText, selector, hostSelector);
    return [scopedCssText, ...commentsWithHash].join("\n");
  }
  _insertDirectives(cssText) {
    cssText = this._insertPolyfillDirectivesInCssText(cssText);
    return this._insertPolyfillRulesInCssText(cssText);
  }
  _scopeKeyframesRelatedCss(cssText, scopeSelector) {
    const unscopedKeyframesSet = /* @__PURE__ */ new Set();
    const scopedKeyframesCssText = processRules(cssText, (rule2) => this._scopeLocalKeyframeDeclarations(rule2, scopeSelector, unscopedKeyframesSet));
    return processRules(scopedKeyframesCssText, (rule2) => this._scopeAnimationRule(rule2, scopeSelector, unscopedKeyframesSet));
  }
  _scopeLocalKeyframeDeclarations(rule2, scopeSelector, unscopedKeyframesSet) {
    return Object.assign(Object.assign({}, rule2), { selector: rule2.selector.replace(/(^@(?:-webkit-)?keyframes(?:\s+))(['"]?)(.+)\2(\s*)$/, (_, start, quote, keyframeName, endSpaces) => {
      unscopedKeyframesSet.add(unescapeQuotes(keyframeName, quote));
      return `${start}${quote}${scopeSelector}_${keyframeName}${quote}${endSpaces}`;
    }) });
  }
  _scopeAnimationKeyframe(keyframe, scopeSelector, unscopedKeyframesSet) {
    return keyframe.replace(/^(\s*)(['"]?)(.+?)\2(\s*)$/, (_, spaces1, quote, name, spaces2) => {
      name = `${unscopedKeyframesSet.has(unescapeQuotes(name, quote)) ? scopeSelector + "_" : ""}${name}`;
      return `${spaces1}${quote}${name}${quote}${spaces2}`;
    });
  }
  _scopeAnimationRule(rule2, scopeSelector, unscopedKeyframesSet) {
    let content = rule2.content.replace(/((?:^|\s+|;)(?:-webkit-)?animation(?:\s*):(?:\s*))([^;]+)/g, (_, start, animationDeclarations) => start + animationDeclarations.replace(this._animationDeclarationKeyframesRe, (original, leadingSpaces, quote = "", quotedName, nonQuotedName) => {
      if (quotedName) {
        return `${leadingSpaces}${this._scopeAnimationKeyframe(`${quote}${quotedName}${quote}`, scopeSelector, unscopedKeyframesSet)}`;
      } else {
        return animationKeywords.has(nonQuotedName) ? original : `${leadingSpaces}${this._scopeAnimationKeyframe(nonQuotedName, scopeSelector, unscopedKeyframesSet)}`;
      }
    }));
    content = content.replace(/((?:^|\s+|;)(?:-webkit-)?animation-name(?:\s*):(?:\s*))([^;]+)/g, (_match, start, commaSeparatedKeyframes) => `${start}${commaSeparatedKeyframes.split(",").map((keyframe) => this._scopeAnimationKeyframe(keyframe, scopeSelector, unscopedKeyframesSet)).join(",")}`);
    return Object.assign(Object.assign({}, rule2), { content });
  }
  _insertPolyfillDirectivesInCssText(cssText) {
    return cssText.replace(_cssContentNextSelectorRe, function(...m) {
      return m[2] + "{";
    });
  }
  _insertPolyfillRulesInCssText(cssText) {
    return cssText.replace(_cssContentRuleRe, (...m) => {
      const rule2 = m[0].replace(m[1], "").replace(m[2], "");
      return m[4] + rule2;
    });
  }
  _scopeCssText(cssText, scopeSelector, hostSelector) {
    const unscopedRules = this._extractUnscopedRulesFromCssText(cssText);
    cssText = this._insertPolyfillHostInCssText(cssText);
    cssText = this._convertColonHost(cssText);
    cssText = this._convertColonHostContext(cssText);
    cssText = this._convertShadowDOMSelectors(cssText);
    if (scopeSelector) {
      cssText = this._scopeKeyframesRelatedCss(cssText, scopeSelector);
      cssText = this._scopeSelectors(cssText, scopeSelector, hostSelector);
    }
    cssText = cssText + "\n" + unscopedRules;
    return cssText.trim();
  }
  _extractUnscopedRulesFromCssText(cssText) {
    let r = "";
    let m;
    _cssContentUnscopedRuleRe.lastIndex = 0;
    while ((m = _cssContentUnscopedRuleRe.exec(cssText)) !== null) {
      const rule2 = m[0].replace(m[2], "").replace(m[1], m[4]);
      r += rule2 + "\n\n";
    }
    return r;
  }
  _convertColonHost(cssText) {
    return cssText.replace(_cssColonHostRe, (_, hostSelectors, otherSelectors) => {
      if (hostSelectors) {
        const convertedSelectors = [];
        const hostSelectorArray = hostSelectors.split(",").map((p) => p.trim());
        for (const hostSelector of hostSelectorArray) {
          if (!hostSelector)
            break;
          const convertedSelector = _polyfillHostNoCombinator + hostSelector.replace(_polyfillHost, "") + otherSelectors;
          convertedSelectors.push(convertedSelector);
        }
        return convertedSelectors.join(",");
      } else {
        return _polyfillHostNoCombinator + otherSelectors;
      }
    });
  }
  _convertColonHostContext(cssText) {
    return cssText.replace(_cssColonHostContextReGlobal, (selectorText) => {
      var _a;
      const contextSelectorGroups = [[]];
      let match;
      while (match = _cssColonHostContextRe.exec(selectorText)) {
        const newContextSelectors = ((_a = match[1]) !== null && _a !== void 0 ? _a : "").trim().split(",").map((m) => m.trim()).filter((m) => m !== "");
        const contextSelectorGroupsLength = contextSelectorGroups.length;
        repeatGroups(contextSelectorGroups, newContextSelectors.length);
        for (let i = 0; i < newContextSelectors.length; i++) {
          for (let j = 0; j < contextSelectorGroupsLength; j++) {
            contextSelectorGroups[j + i * contextSelectorGroupsLength].push(newContextSelectors[i]);
          }
        }
        selectorText = match[2];
      }
      return contextSelectorGroups.map((contextSelectors) => combineHostContextSelectors(contextSelectors, selectorText)).join(", ");
    });
  }
  _convertShadowDOMSelectors(cssText) {
    return _shadowDOMSelectorsRe.reduce((result, pattern) => result.replace(pattern, " "), cssText);
  }
  _scopeSelectors(cssText, scopeSelector, hostSelector) {
    return processRules(cssText, (rule2) => {
      let selector = rule2.selector;
      let content = rule2.content;
      if (rule2.selector[0] !== "@") {
        selector = this._scopeSelector(rule2.selector, scopeSelector, hostSelector, this.strictStyling);
      } else if (rule2.selector.startsWith("@media") || rule2.selector.startsWith("@supports") || rule2.selector.startsWith("@document") || rule2.selector.startsWith("@layer")) {
        content = this._scopeSelectors(rule2.content, scopeSelector, hostSelector);
      } else if (rule2.selector.startsWith("@font-face") || rule2.selector.startsWith("@page")) {
        content = this._stripScopingSelectors(rule2.content);
      }
      return new CssRule(selector, content);
    });
  }
  _stripScopingSelectors(cssText) {
    return processRules(cssText, (rule2) => {
      const selector = rule2.selector.replace(_shadowDeepSelectors, " ").replace(_polyfillHostNoCombinatorRe, " ");
      return new CssRule(selector, rule2.content);
    });
  }
  _scopeSelector(selector, scopeSelector, hostSelector, strict) {
    return selector.split(",").map((part) => part.trim().split(_shadowDeepSelectors)).map((deepParts) => {
      const [shallowPart, ...otherParts] = deepParts;
      const applyScope = (shallowPart2) => {
        if (this._selectorNeedsScoping(shallowPart2, scopeSelector)) {
          return strict ? this._applyStrictSelectorScope(shallowPart2, scopeSelector, hostSelector) : this._applySelectorScope(shallowPart2, scopeSelector, hostSelector);
        } else {
          return shallowPart2;
        }
      };
      return [applyScope(shallowPart), ...otherParts].join(" ");
    }).join(", ");
  }
  _selectorNeedsScoping(selector, scopeSelector) {
    const re = this._makeScopeMatcher(scopeSelector);
    return !re.test(selector);
  }
  _makeScopeMatcher(scopeSelector) {
    const lre = /\[/g;
    const rre = /\]/g;
    scopeSelector = scopeSelector.replace(lre, "\\[").replace(rre, "\\]");
    return new RegExp("^(" + scopeSelector + ")" + _selectorReSuffix, "m");
  }
  _applySelectorScope(selector, scopeSelector, hostSelector) {
    return this._applySimpleSelectorScope(selector, scopeSelector, hostSelector);
  }
  _applySimpleSelectorScope(selector, scopeSelector, hostSelector) {
    _polyfillHostRe.lastIndex = 0;
    if (_polyfillHostRe.test(selector)) {
      const replaceBy = this.strictStyling ? `[${hostSelector}]` : scopeSelector;
      return selector.replace(_polyfillHostNoCombinatorRe, (hnc, selector2) => {
        return selector2.replace(/([^:]*)(:*)(.*)/, (_, before, colon, after) => {
          return before + replaceBy + colon + after;
        });
      }).replace(_polyfillHostRe, replaceBy + " ");
    }
    return scopeSelector + " " + selector;
  }
  _applyStrictSelectorScope(selector, scopeSelector, hostSelector) {
    const isRe = /\[is=([^\]]*)\]/g;
    scopeSelector = scopeSelector.replace(isRe, (_, ...parts) => parts[0]);
    const attrName = "[" + scopeSelector + "]";
    const _scopeSelectorPart = (p) => {
      let scopedP = p.trim();
      if (!scopedP) {
        return "";
      }
      if (p.indexOf(_polyfillHostNoCombinator) > -1) {
        scopedP = this._applySimpleSelectorScope(p, scopeSelector, hostSelector);
      } else {
        const t = p.replace(_polyfillHostRe, "");
        if (t.length > 0) {
          const matches = t.match(/([^:]*)(:*)(.*)/);
          if (matches) {
            scopedP = matches[1] + attrName + matches[2] + matches[3];
          }
        }
      }
      return scopedP;
    };
    const safeContent = new SafeSelector(selector);
    selector = safeContent.content();
    let scopedSelector = "";
    let startIndex = 0;
    let res;
    const sep = /( |>|\+|~(?!=))\s*/g;
    const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
    let shouldScope = !hasHost;
    while ((res = sep.exec(selector)) !== null) {
      const separator = res[1];
      const part2 = selector.slice(startIndex, res.index).trim();
      shouldScope = shouldScope || part2.indexOf(_polyfillHostNoCombinator) > -1;
      const scopedPart = shouldScope ? _scopeSelectorPart(part2) : part2;
      scopedSelector += `${scopedPart} ${separator} `;
      startIndex = sep.lastIndex;
    }
    const part = selector.substring(startIndex);
    shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
    scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
    return safeContent.restore(scopedSelector);
  }
  _insertPolyfillHostInCssText(selector) {
    return selector.replace(_colonHostContextRe, _polyfillHostContext).replace(_colonHostRe, _polyfillHost);
  }
};
var SafeSelector = class {
  constructor(selector) {
    this.placeholders = [];
    this.index = 0;
    selector = this._escapeRegexMatches(selector, /(\[[^\]]*\])/g);
    selector = this._escapeRegexMatches(selector, /(\\.)/g);
    this._content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
      const replaceBy = `__ph-${this.index}__`;
      this.placeholders.push(exp);
      this.index++;
      return pseudo + replaceBy;
    });
  }
  restore(content) {
    return content.replace(/__ph-(\d+)__/g, (_ph, index2) => this.placeholders[+index2]);
  }
  content() {
    return this._content;
  }
  _escapeRegexMatches(content, pattern) {
    return content.replace(pattern, (_, keep) => {
      const replaceBy = `__ph-${this.index}__`;
      this.placeholders.push(keep);
      this.index++;
      return replaceBy;
    });
  }
};
var _cssContentNextSelectorRe = /polyfill-next-selector[^}]*content:[\s]*?(['"])(.*?)\1[;\s]*}([^{]*?){/gim;
var _cssContentRuleRe = /(polyfill-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
var _cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
var _polyfillHost = "-shadowcsshost";
var _polyfillHostContext = "-shadowcsscontext";
var _parenSuffix = "(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
var _cssColonHostRe = new RegExp(_polyfillHost + _parenSuffix, "gim");
var _cssColonHostContextReGlobal = new RegExp(_polyfillHostContext + _parenSuffix, "gim");
var _cssColonHostContextRe = new RegExp(_polyfillHostContext + _parenSuffix, "im");
var _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
var _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
var _shadowDOMSelectorsRe = [
  /::shadow/g,
  /::content/g,
  /\/shadow-deep\//g,
  /\/shadow\//g
];
var _shadowDeepSelectors = /(?:>>>)|(?:\/deep\/)|(?:::ng-deep)/g;
var _selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$";
var _polyfillHostRe = /-shadowcsshost/gim;
var _colonHostRe = /:host/gim;
var _colonHostContextRe = /:host-context/gim;
var _commentRe = /\/\*[\s\S]*?\*\//g;
function stripComments(input) {
  return input.replace(_commentRe, "");
}
var _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
function extractCommentsWithHash(input) {
  return input.match(_commentWithHashRe) || [];
}
var BLOCK_PLACEHOLDER = "%BLOCK%";
var _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
var CONTENT_PAIRS = /* @__PURE__ */ new Map([["{", "}"]]);
var COMMA_IN_PLACEHOLDER = "%COMMA_IN_PLACEHOLDER%";
var SEMI_IN_PLACEHOLDER = "%SEMI_IN_PLACEHOLDER%";
var COLON_IN_PLACEHOLDER = "%COLON_IN_PLACEHOLDER%";
var _cssCommaInPlaceholderReGlobal = new RegExp(COMMA_IN_PLACEHOLDER, "g");
var _cssSemiInPlaceholderReGlobal = new RegExp(SEMI_IN_PLACEHOLDER, "g");
var _cssColonInPlaceholderReGlobal = new RegExp(COLON_IN_PLACEHOLDER, "g");
var CssRule = class {
  constructor(selector, content) {
    this.selector = selector;
    this.content = content;
  }
};
function processRules(input, ruleCallback) {
  const escaped = escapeInStrings(input);
  const inputWithEscapedBlocks = escapeBlocks(escaped, CONTENT_PAIRS, BLOCK_PLACEHOLDER);
  let nextBlockIndex = 0;
  const escapedResult = inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
    const selector = m[2];
    let content = "";
    let suffix = m[4];
    let contentPrefix = "";
    if (suffix && suffix.startsWith("{" + BLOCK_PLACEHOLDER)) {
      content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
      suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
      contentPrefix = "{";
    }
    const rule2 = ruleCallback(new CssRule(selector, content));
    return `${m[1]}${rule2.selector}${m[3]}${contentPrefix}${rule2.content}${suffix}`;
  });
  return unescapeInStrings(escapedResult);
}
var StringWithEscapedBlocks = class {
  constructor(escapedString, blocks) {
    this.escapedString = escapedString;
    this.blocks = blocks;
  }
};
function escapeBlocks(input, charPairs, placeholder) {
  const resultParts = [];
  const escapedBlocks = [];
  let openCharCount = 0;
  let nonBlockStartIndex = 0;
  let blockStartIndex = -1;
  let openChar;
  let closeChar;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "\\") {
      i++;
    } else if (char === closeChar) {
      openCharCount--;
      if (openCharCount === 0) {
        escapedBlocks.push(input.substring(blockStartIndex, i));
        resultParts.push(placeholder);
        nonBlockStartIndex = i;
        blockStartIndex = -1;
        openChar = closeChar = void 0;
      }
    } else if (char === openChar) {
      openCharCount++;
    } else if (openCharCount === 0 && charPairs.has(char)) {
      openChar = char;
      closeChar = charPairs.get(char);
      openCharCount = 1;
      blockStartIndex = i + 1;
      resultParts.push(input.substring(nonBlockStartIndex, blockStartIndex));
    }
  }
  if (blockStartIndex !== -1) {
    escapedBlocks.push(input.substring(blockStartIndex));
    resultParts.push(placeholder);
  } else {
    resultParts.push(input.substring(nonBlockStartIndex));
  }
  return new StringWithEscapedBlocks(resultParts.join(""), escapedBlocks);
}
var ESCAPE_IN_STRING_MAP = {
  ";": SEMI_IN_PLACEHOLDER,
  ",": COMMA_IN_PLACEHOLDER,
  ":": COLON_IN_PLACEHOLDER
};
function escapeInStrings(input) {
  let result = input;
  let currentQuoteChar = null;
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (char === "\\") {
      i++;
    } else {
      if (currentQuoteChar !== null) {
        if (char === currentQuoteChar) {
          currentQuoteChar = null;
        } else {
          const placeholder = ESCAPE_IN_STRING_MAP[char];
          if (placeholder) {
            result = `${result.substr(0, i)}${placeholder}${result.substr(i + 1)}`;
            i += placeholder.length - 1;
          }
        }
      } else if (char === "'" || char === '"') {
        currentQuoteChar = char;
      }
    }
  }
  return result;
}
function unescapeInStrings(input) {
  let result = input.replace(_cssCommaInPlaceholderReGlobal, ",");
  result = result.replace(_cssSemiInPlaceholderReGlobal, ";");
  result = result.replace(_cssColonInPlaceholderReGlobal, ":");
  return result;
}
function unescapeQuotes(str, isQuoted) {
  return !isQuoted ? str : str.replace(/((?:^|[^\\])(?:\\\\)*)\\(?=['"])/g, "$1");
}
function combineHostContextSelectors(contextSelectors, otherSelectors) {
  const hostMarker = _polyfillHostNoCombinator;
  _polyfillHostRe.lastIndex = 0;
  const otherSelectorsHasHost = _polyfillHostRe.test(otherSelectors);
  if (contextSelectors.length === 0) {
    return hostMarker + otherSelectors;
  }
  const combined = [contextSelectors.pop() || ""];
  while (contextSelectors.length > 0) {
    const length = combined.length;
    const contextSelector = contextSelectors.pop();
    for (let i = 0; i < length; i++) {
      const previousSelectors = combined[i];
      combined[length * 2 + i] = previousSelectors + " " + contextSelector;
      combined[length + i] = contextSelector + " " + previousSelectors;
      combined[i] = contextSelector + previousSelectors;
    }
  }
  return combined.map((s) => otherSelectorsHasHost ? `${s}${otherSelectors}` : `${s}${hostMarker}${otherSelectors}, ${s} ${hostMarker}${otherSelectors}`).join(",");
}
function repeatGroups(groups, multiples) {
  const length = groups.length;
  for (let i = 1; i < multiples; i++) {
    for (let j = 0; j < length; j++) {
      groups[j + i * length] = groups[j].slice(0);
    }
  }
}
function parse(value) {
  const styles = [];
  let i = 0;
  let parenDepth = 0;
  let quote = 0;
  let valueStart = 0;
  let propStart = 0;
  let currentProp = null;
  let valueHasQuotes = false;
  while (i < value.length) {
    const token = value.charCodeAt(i++);
    switch (token) {
      case 40:
        parenDepth++;
        break;
      case 41:
        parenDepth--;
        break;
      case 39:
        valueHasQuotes = valueHasQuotes || valueStart > 0;
        if (quote === 0) {
          quote = 39;
        } else if (quote === 39 && value.charCodeAt(i - 1) !== 92) {
          quote = 0;
        }
        break;
      case 34:
        valueHasQuotes = valueHasQuotes || valueStart > 0;
        if (quote === 0) {
          quote = 34;
        } else if (quote === 34 && value.charCodeAt(i - 1) !== 92) {
          quote = 0;
        }
        break;
      case 58:
        if (!currentProp && parenDepth === 0 && quote === 0) {
          currentProp = hyphenate(value.substring(propStart, i - 1).trim());
          valueStart = i;
        }
        break;
      case 59:
        if (currentProp && valueStart > 0 && parenDepth === 0 && quote === 0) {
          const styleVal = value.substring(valueStart, i - 1).trim();
          styles.push(currentProp, valueHasQuotes ? stripUnnecessaryQuotes(styleVal) : styleVal);
          propStart = i;
          valueStart = 0;
          currentProp = null;
          valueHasQuotes = false;
        }
        break;
    }
  }
  if (currentProp && valueStart) {
    const styleVal = value.slice(valueStart).trim();
    styles.push(currentProp, valueHasQuotes ? stripUnnecessaryQuotes(styleVal) : styleVal);
  }
  return styles;
}
function stripUnnecessaryQuotes(value) {
  const qS = value.charCodeAt(0);
  const qE = value.charCodeAt(value.length - 1);
  if (qS == qE && (qS == 39 || qS == 34)) {
    const tempValue = value.substring(1, value.length - 1);
    if (tempValue.indexOf("'") == -1 && tempValue.indexOf('"') == -1) {
      value = tempValue;
    }
  }
  return value;
}
function hyphenate(value) {
  return value.replace(/[a-z][A-Z]/g, (v) => {
    return v.charAt(0) + "-" + v.charAt(1);
  }).toLowerCase();
}
var IMPORTANT_FLAG = "!important";
var MIN_STYLING_BINDING_SLOTS_REQUIRED = 2;
var StylingBuilder = class {
  constructor(_directiveExpr) {
    this._directiveExpr = _directiveExpr;
    this._hasInitialValues = false;
    this.hasBindings = false;
    this.hasBindingsWithPipes = false;
    this._classMapInput = null;
    this._styleMapInput = null;
    this._singleStyleInputs = null;
    this._singleClassInputs = null;
    this._lastStylingInput = null;
    this._firstStylingInput = null;
    this._stylesIndex = /* @__PURE__ */ new Map();
    this._classesIndex = /* @__PURE__ */ new Map();
    this._initialStyleValues = [];
    this._initialClassValues = [];
  }
  registerBoundInput(input) {
    let binding = null;
    let name = input.name;
    switch (input.type) {
      case 0:
        binding = this.registerInputBasedOnName(name, input.value, input.sourceSpan);
        break;
      case 3:
        binding = this.registerStyleInput(name, false, input.value, input.sourceSpan, input.unit);
        break;
      case 2:
        binding = this.registerClassInput(name, false, input.value, input.sourceSpan);
        break;
    }
    return binding ? true : false;
  }
  registerInputBasedOnName(name, expression, sourceSpan) {
    let binding = null;
    const prefix = name.substring(0, 6);
    const isStyle = name === "style" || prefix === "style." || prefix === "style!";
    const isClass = !isStyle && (name === "class" || prefix === "class." || prefix === "class!");
    if (isStyle || isClass) {
      const isMapBased = name.charAt(5) !== ".";
      const property = name.slice(isMapBased ? 5 : 6);
      if (isStyle) {
        binding = this.registerStyleInput(property, isMapBased, expression, sourceSpan);
      } else {
        binding = this.registerClassInput(property, isMapBased, expression, sourceSpan);
      }
    }
    return binding;
  }
  registerStyleInput(name, isMapBased, value, sourceSpan, suffix) {
    if (isEmptyExpression(value)) {
      return null;
    }
    if (!isCssCustomProperty(name)) {
      name = hyphenate(name);
    }
    const { property, hasOverrideFlag, suffix: bindingSuffix } = parseProperty(name);
    suffix = typeof suffix === "string" && suffix.length !== 0 ? suffix : bindingSuffix;
    const entry = { name: property, suffix, value, sourceSpan, hasOverrideFlag };
    if (isMapBased) {
      this._styleMapInput = entry;
    } else {
      (this._singleStyleInputs = this._singleStyleInputs || []).push(entry);
      registerIntoMap(this._stylesIndex, property);
    }
    this._lastStylingInput = entry;
    this._firstStylingInput = this._firstStylingInput || entry;
    this._checkForPipes(value);
    this.hasBindings = true;
    return entry;
  }
  registerClassInput(name, isMapBased, value, sourceSpan) {
    if (isEmptyExpression(value)) {
      return null;
    }
    const { property, hasOverrideFlag } = parseProperty(name);
    const entry = { name: property, value, sourceSpan, hasOverrideFlag, suffix: null };
    if (isMapBased) {
      this._classMapInput = entry;
    } else {
      (this._singleClassInputs = this._singleClassInputs || []).push(entry);
      registerIntoMap(this._classesIndex, property);
    }
    this._lastStylingInput = entry;
    this._firstStylingInput = this._firstStylingInput || entry;
    this._checkForPipes(value);
    this.hasBindings = true;
    return entry;
  }
  _checkForPipes(value) {
    if (value instanceof ASTWithSource && value.ast instanceof BindingPipe) {
      this.hasBindingsWithPipes = true;
    }
  }
  registerStyleAttr(value) {
    this._initialStyleValues = parse(value);
    this._hasInitialValues = true;
  }
  registerClassAttr(value) {
    this._initialClassValues = value.trim().split(/\s+/g);
    this._hasInitialValues = true;
  }
  populateInitialStylingAttrs(attrs) {
    if (this._initialClassValues.length) {
      attrs.push(literal(1));
      for (let i = 0; i < this._initialClassValues.length; i++) {
        attrs.push(literal(this._initialClassValues[i]));
      }
    }
    if (this._initialStyleValues.length) {
      attrs.push(literal(2));
      for (let i = 0; i < this._initialStyleValues.length; i += 2) {
        attrs.push(literal(this._initialStyleValues[i]), literal(this._initialStyleValues[i + 1]));
      }
    }
  }
  assignHostAttrs(attrs, definitionMap) {
    if (this._directiveExpr && (attrs.length || this._hasInitialValues)) {
      this.populateInitialStylingAttrs(attrs);
      definitionMap.set("hostAttrs", literalArr(attrs));
    }
  }
  buildClassMapInstruction(valueConverter) {
    if (this._classMapInput) {
      return this._buildMapBasedInstruction(valueConverter, true, this._classMapInput);
    }
    return null;
  }
  buildStyleMapInstruction(valueConverter) {
    if (this._styleMapInput) {
      return this._buildMapBasedInstruction(valueConverter, false, this._styleMapInput);
    }
    return null;
  }
  _buildMapBasedInstruction(valueConverter, isClassBased, stylingInput) {
    let totalBindingSlotsRequired = MIN_STYLING_BINDING_SLOTS_REQUIRED;
    const mapValue = stylingInput.value.visit(valueConverter);
    let reference;
    if (mapValue instanceof Interpolation) {
      totalBindingSlotsRequired += mapValue.expressions.length;
      reference = isClassBased ? getClassMapInterpolationExpression(mapValue) : getStyleMapInterpolationExpression(mapValue);
    } else {
      reference = isClassBased ? Identifiers.classMap : Identifiers.styleMap;
    }
    return {
      reference,
      calls: [{
        supportsInterpolation: true,
        sourceSpan: stylingInput.sourceSpan,
        allocateBindingSlots: totalBindingSlotsRequired,
        params: (convertFn) => {
          const convertResult = convertFn(mapValue);
          const params = Array.isArray(convertResult) ? convertResult : [convertResult];
          return params;
        }
      }]
    };
  }
  _buildSingleInputs(reference, inputs, valueConverter, getInterpolationExpressionFn, isClassBased) {
    const instructions = [];
    inputs.forEach((input) => {
      const previousInstruction = instructions[instructions.length - 1];
      const value = input.value.visit(valueConverter);
      let referenceForCall = reference;
      let totalBindingSlotsRequired = MIN_STYLING_BINDING_SLOTS_REQUIRED;
      if (value instanceof Interpolation) {
        totalBindingSlotsRequired += value.expressions.length;
        if (getInterpolationExpressionFn) {
          referenceForCall = getInterpolationExpressionFn(value);
        }
      }
      const call = {
        sourceSpan: input.sourceSpan,
        allocateBindingSlots: totalBindingSlotsRequired,
        supportsInterpolation: !!getInterpolationExpressionFn,
        params: (convertFn) => {
          const params = [];
          params.push(literal(input.name));
          const convertResult = convertFn(value);
          if (Array.isArray(convertResult)) {
            params.push(...convertResult);
          } else {
            params.push(convertResult);
          }
          if (!isClassBased && input.suffix !== null) {
            params.push(literal(input.suffix));
          }
          return params;
        }
      };
      if (previousInstruction && previousInstruction.reference === referenceForCall) {
        previousInstruction.calls.push(call);
      } else {
        instructions.push({ reference: referenceForCall, calls: [call] });
      }
    });
    return instructions;
  }
  _buildClassInputs(valueConverter) {
    if (this._singleClassInputs) {
      return this._buildSingleInputs(Identifiers.classProp, this._singleClassInputs, valueConverter, null, true);
    }
    return [];
  }
  _buildStyleInputs(valueConverter) {
    if (this._singleStyleInputs) {
      return this._buildSingleInputs(Identifiers.styleProp, this._singleStyleInputs, valueConverter, getStylePropInterpolationExpression, false);
    }
    return [];
  }
  buildUpdateLevelInstructions(valueConverter) {
    const instructions = [];
    if (this.hasBindings) {
      const styleMapInstruction = this.buildStyleMapInstruction(valueConverter);
      if (styleMapInstruction) {
        instructions.push(styleMapInstruction);
      }
      const classMapInstruction = this.buildClassMapInstruction(valueConverter);
      if (classMapInstruction) {
        instructions.push(classMapInstruction);
      }
      instructions.push(...this._buildStyleInputs(valueConverter));
      instructions.push(...this._buildClassInputs(valueConverter));
    }
    return instructions;
  }
};
function registerIntoMap(map, key) {
  if (!map.has(key)) {
    map.set(key, map.size);
  }
}
function parseProperty(name) {
  let hasOverrideFlag = false;
  const overrideIndex = name.indexOf(IMPORTANT_FLAG);
  if (overrideIndex !== -1) {
    name = overrideIndex > 0 ? name.substring(0, overrideIndex) : "";
    hasOverrideFlag = true;
  }
  let suffix = null;
  let property = name;
  const unitIndex = name.lastIndexOf(".");
  if (unitIndex > 0) {
    suffix = name.slice(unitIndex + 1);
    property = name.substring(0, unitIndex);
  }
  return { property, suffix, hasOverrideFlag };
}
function getClassMapInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.classMap;
    case 3:
      return Identifiers.classMapInterpolate1;
    case 5:
      return Identifiers.classMapInterpolate2;
    case 7:
      return Identifiers.classMapInterpolate3;
    case 9:
      return Identifiers.classMapInterpolate4;
    case 11:
      return Identifiers.classMapInterpolate5;
    case 13:
      return Identifiers.classMapInterpolate6;
    case 15:
      return Identifiers.classMapInterpolate7;
    case 17:
      return Identifiers.classMapInterpolate8;
    default:
      return Identifiers.classMapInterpolateV;
  }
}
function getStyleMapInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.styleMap;
    case 3:
      return Identifiers.styleMapInterpolate1;
    case 5:
      return Identifiers.styleMapInterpolate2;
    case 7:
      return Identifiers.styleMapInterpolate3;
    case 9:
      return Identifiers.styleMapInterpolate4;
    case 11:
      return Identifiers.styleMapInterpolate5;
    case 13:
      return Identifiers.styleMapInterpolate6;
    case 15:
      return Identifiers.styleMapInterpolate7;
    case 17:
      return Identifiers.styleMapInterpolate8;
    default:
      return Identifiers.styleMapInterpolateV;
  }
}
function getStylePropInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.styleProp;
    case 3:
      return Identifiers.stylePropInterpolate1;
    case 5:
      return Identifiers.stylePropInterpolate2;
    case 7:
      return Identifiers.stylePropInterpolate3;
    case 9:
      return Identifiers.stylePropInterpolate4;
    case 11:
      return Identifiers.stylePropInterpolate5;
    case 13:
      return Identifiers.stylePropInterpolate6;
    case 15:
      return Identifiers.stylePropInterpolate7;
    case 17:
      return Identifiers.stylePropInterpolate8;
    default:
      return Identifiers.stylePropInterpolateV;
  }
}
function isCssCustomProperty(name) {
  return name.startsWith("--");
}
function isEmptyExpression(ast) {
  if (ast instanceof ASTWithSource) {
    ast = ast.ast;
  }
  return ast instanceof EmptyExpr;
}
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2["Character"] = 0] = "Character";
  TokenType2[TokenType2["Identifier"] = 1] = "Identifier";
  TokenType2[TokenType2["PrivateIdentifier"] = 2] = "PrivateIdentifier";
  TokenType2[TokenType2["Keyword"] = 3] = "Keyword";
  TokenType2[TokenType2["String"] = 4] = "String";
  TokenType2[TokenType2["Operator"] = 5] = "Operator";
  TokenType2[TokenType2["Number"] = 6] = "Number";
  TokenType2[TokenType2["Error"] = 7] = "Error";
})(TokenType || (TokenType = {}));
var KEYWORDS = ["var", "let", "as", "null", "undefined", "true", "false", "if", "else", "this"];
var Lexer = class {
  tokenize(text) {
    const scanner = new _Scanner(text);
    const tokens = [];
    let token = scanner.scanToken();
    while (token != null) {
      tokens.push(token);
      token = scanner.scanToken();
    }
    return tokens;
  }
};
var Token = class {
  constructor(index2, end, type, numValue, strValue) {
    this.index = index2;
    this.end = end;
    this.type = type;
    this.numValue = numValue;
    this.strValue = strValue;
  }
  isCharacter(code) {
    return this.type == TokenType.Character && this.numValue == code;
  }
  isNumber() {
    return this.type == TokenType.Number;
  }
  isString() {
    return this.type == TokenType.String;
  }
  isOperator(operator) {
    return this.type == TokenType.Operator && this.strValue == operator;
  }
  isIdentifier() {
    return this.type == TokenType.Identifier;
  }
  isPrivateIdentifier() {
    return this.type == TokenType.PrivateIdentifier;
  }
  isKeyword() {
    return this.type == TokenType.Keyword;
  }
  isKeywordLet() {
    return this.type == TokenType.Keyword && this.strValue == "let";
  }
  isKeywordAs() {
    return this.type == TokenType.Keyword && this.strValue == "as";
  }
  isKeywordNull() {
    return this.type == TokenType.Keyword && this.strValue == "null";
  }
  isKeywordUndefined() {
    return this.type == TokenType.Keyword && this.strValue == "undefined";
  }
  isKeywordTrue() {
    return this.type == TokenType.Keyword && this.strValue == "true";
  }
  isKeywordFalse() {
    return this.type == TokenType.Keyword && this.strValue == "false";
  }
  isKeywordThis() {
    return this.type == TokenType.Keyword && this.strValue == "this";
  }
  isError() {
    return this.type == TokenType.Error;
  }
  toNumber() {
    return this.type == TokenType.Number ? this.numValue : -1;
  }
  toString() {
    switch (this.type) {
      case TokenType.Character:
      case TokenType.Identifier:
      case TokenType.Keyword:
      case TokenType.Operator:
      case TokenType.PrivateIdentifier:
      case TokenType.String:
      case TokenType.Error:
        return this.strValue;
      case TokenType.Number:
        return this.numValue.toString();
      default:
        return null;
    }
  }
};
function newCharacterToken(index2, end, code) {
  return new Token(index2, end, TokenType.Character, code, String.fromCharCode(code));
}
function newIdentifierToken(index2, end, text) {
  return new Token(index2, end, TokenType.Identifier, 0, text);
}
function newPrivateIdentifierToken(index2, end, text) {
  return new Token(index2, end, TokenType.PrivateIdentifier, 0, text);
}
function newKeywordToken(index2, end, text) {
  return new Token(index2, end, TokenType.Keyword, 0, text);
}
function newOperatorToken(index2, end, text) {
  return new Token(index2, end, TokenType.Operator, 0, text);
}
function newStringToken(index2, end, text) {
  return new Token(index2, end, TokenType.String, 0, text);
}
function newNumberToken(index2, end, n) {
  return new Token(index2, end, TokenType.Number, n, "");
}
function newErrorToken(index2, end, message) {
  return new Token(index2, end, TokenType.Error, 0, message);
}
var EOF = new Token(-1, -1, TokenType.Character, 0, "");
var _Scanner = class {
  constructor(input) {
    this.input = input;
    this.peek = 0;
    this.index = -1;
    this.length = input.length;
    this.advance();
  }
  advance() {
    this.peek = ++this.index >= this.length ? $EOF : this.input.charCodeAt(this.index);
  }
  scanToken() {
    const input = this.input, length = this.length;
    let peek = this.peek, index2 = this.index;
    while (peek <= $SPACE) {
      if (++index2 >= length) {
        peek = $EOF;
        break;
      } else {
        peek = input.charCodeAt(index2);
      }
    }
    this.peek = peek;
    this.index = index2;
    if (index2 >= length) {
      return null;
    }
    if (isIdentifierStart(peek))
      return this.scanIdentifier();
    if (isDigit(peek))
      return this.scanNumber(index2);
    const start = index2;
    switch (peek) {
      case $PERIOD:
        this.advance();
        return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, this.index, $PERIOD);
      case $LPAREN:
      case $RPAREN:
      case $LBRACE:
      case $RBRACE:
      case $LBRACKET:
      case $RBRACKET:
      case $COMMA:
      case $COLON:
      case $SEMICOLON:
        return this.scanCharacter(start, peek);
      case $SQ:
      case $DQ:
        return this.scanString();
      case $HASH:
        return this.scanPrivateIdentifier();
      case $PLUS:
      case $MINUS:
      case $STAR:
      case $SLASH:
      case $PERCENT:
      case $CARET:
        return this.scanOperator(start, String.fromCharCode(peek));
      case $QUESTION:
        return this.scanQuestion(start);
      case $LT:
      case $GT:
        return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, "=");
      case $BANG:
      case $EQ:
        return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, "=", $EQ, "=");
      case $AMPERSAND:
        return this.scanComplexOperator(start, "&", $AMPERSAND, "&");
      case $BAR:
        return this.scanComplexOperator(start, "|", $BAR, "|");
      case $NBSP:
        while (isWhitespace(this.peek))
          this.advance();
        return this.scanToken();
    }
    this.advance();
    return this.error(`Unexpected character [${String.fromCharCode(peek)}]`, 0);
  }
  scanCharacter(start, code) {
    this.advance();
    return newCharacterToken(start, this.index, code);
  }
  scanOperator(start, str) {
    this.advance();
    return newOperatorToken(start, this.index, str);
  }
  scanComplexOperator(start, one, twoCode, two, threeCode, three) {
    this.advance();
    let str = one;
    if (this.peek == twoCode) {
      this.advance();
      str += two;
    }
    if (threeCode != null && this.peek == threeCode) {
      this.advance();
      str += three;
    }
    return newOperatorToken(start, this.index, str);
  }
  scanIdentifier() {
    const start = this.index;
    this.advance();
    while (isIdentifierPart(this.peek))
      this.advance();
    const str = this.input.substring(start, this.index);
    return KEYWORDS.indexOf(str) > -1 ? newKeywordToken(start, this.index, str) : newIdentifierToken(start, this.index, str);
  }
  scanPrivateIdentifier() {
    const start = this.index;
    this.advance();
    if (!isIdentifierStart(this.peek)) {
      return this.error("Invalid character [#]", -1);
    }
    while (isIdentifierPart(this.peek))
      this.advance();
    const identifierName2 = this.input.substring(start, this.index);
    return newPrivateIdentifierToken(start, this.index, identifierName2);
  }
  scanNumber(start) {
    let simple = this.index === start;
    let hasSeparators = false;
    this.advance();
    while (true) {
      if (isDigit(this.peek)) {
      } else if (this.peek === $_) {
        if (!isDigit(this.input.charCodeAt(this.index - 1)) || !isDigit(this.input.charCodeAt(this.index + 1))) {
          return this.error("Invalid numeric separator", 0);
        }
        hasSeparators = true;
      } else if (this.peek === $PERIOD) {
        simple = false;
      } else if (isExponentStart(this.peek)) {
        this.advance();
        if (isExponentSign(this.peek))
          this.advance();
        if (!isDigit(this.peek))
          return this.error("Invalid exponent", -1);
        simple = false;
      } else {
        break;
      }
      this.advance();
    }
    let str = this.input.substring(start, this.index);
    if (hasSeparators) {
      str = str.replace(/_/g, "");
    }
    const value = simple ? parseIntAutoRadix(str) : parseFloat(str);
    return newNumberToken(start, this.index, value);
  }
  scanString() {
    const start = this.index;
    const quote = this.peek;
    this.advance();
    let buffer = "";
    let marker = this.index;
    const input = this.input;
    while (this.peek != quote) {
      if (this.peek == $BACKSLASH) {
        buffer += input.substring(marker, this.index);
        this.advance();
        let unescapedCode;
        this.peek = this.peek;
        if (this.peek == $u) {
          const hex = input.substring(this.index + 1, this.index + 5);
          if (/^[0-9a-f]+$/i.test(hex)) {
            unescapedCode = parseInt(hex, 16);
          } else {
            return this.error(`Invalid unicode escape [\\u${hex}]`, 0);
          }
          for (let i = 0; i < 5; i++) {
            this.advance();
          }
        } else {
          unescapedCode = unescape2(this.peek);
          this.advance();
        }
        buffer += String.fromCharCode(unescapedCode);
        marker = this.index;
      } else if (this.peek == $EOF) {
        return this.error("Unterminated quote", 0);
      } else {
        this.advance();
      }
    }
    const last = input.substring(marker, this.index);
    this.advance();
    return newStringToken(start, this.index, buffer + last);
  }
  scanQuestion(start) {
    this.advance();
    let str = "?";
    if (this.peek === $QUESTION || this.peek === $PERIOD) {
      str += this.peek === $PERIOD ? "." : "?";
      this.advance();
    }
    return newOperatorToken(start, this.index, str);
  }
  error(message, offset) {
    const position = this.index + offset;
    return newErrorToken(position, this.index, `Lexer Error: ${message} at column ${position} in expression [${this.input}]`);
  }
};
function isIdentifierStart(code) {
  return $a <= code && code <= $z || $A <= code && code <= $Z || code == $_ || code == $$;
}
function isIdentifierPart(code) {
  return isAsciiLetter(code) || isDigit(code) || code == $_ || code == $$;
}
function isExponentStart(code) {
  return code == $e || code == $E;
}
function isExponentSign(code) {
  return code == $MINUS || code == $PLUS;
}
function unescape2(code) {
  switch (code) {
    case $n:
      return $LF;
    case $f:
      return $FF;
    case $r:
      return $CR;
    case $t:
      return $TAB;
    case $v:
      return $VTAB;
    default:
      return code;
  }
}
function parseIntAutoRadix(text) {
  const result = parseInt(text);
  if (isNaN(result)) {
    throw new Error("Invalid integer literal when parsing " + text);
  }
  return result;
}
var SplitInterpolation = class {
  constructor(strings, expressions, offsets) {
    this.strings = strings;
    this.expressions = expressions;
    this.offsets = offsets;
  }
};
var TemplateBindingParseResult = class {
  constructor(templateBindings, warnings, errors) {
    this.templateBindings = templateBindings;
    this.warnings = warnings;
    this.errors = errors;
  }
};
var Parser$1 = class {
  constructor(_lexer) {
    this._lexer = _lexer;
    this.errors = [];
  }
  parseAction(input, isAssignmentEvent, location, absoluteOffset, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    this._checkNoInterpolation(input, location, interpolationConfig);
    const sourceToLex = this._stripComments(input);
    const tokens = this._lexer.tokenize(sourceToLex);
    let flags = 1;
    if (isAssignmentEvent) {
      flags |= 2;
    }
    const ast = new _ParseAST(input, location, absoluteOffset, tokens, flags, this.errors, 0).parseChain();
    return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
  }
  parseBinding(input, location, absoluteOffset, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    const ast = this._parseBindingAst(input, location, absoluteOffset, interpolationConfig);
    return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
  }
  checkSimpleExpression(ast) {
    const checker = new SimpleExpressionChecker();
    ast.visit(checker);
    return checker.errors;
  }
  parseSimpleBinding(input, location, absoluteOffset, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    const ast = this._parseBindingAst(input, location, absoluteOffset, interpolationConfig);
    const errors = this.checkSimpleExpression(ast);
    if (errors.length > 0) {
      this._reportError(`Host binding expression cannot contain ${errors.join(" ")}`, input, location);
    }
    return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
  }
  _reportError(message, input, errLocation, ctxLocation) {
    this.errors.push(new ParserError(message, input, errLocation, ctxLocation));
  }
  _parseBindingAst(input, location, absoluteOffset, interpolationConfig) {
    this._checkNoInterpolation(input, location, interpolationConfig);
    const sourceToLex = this._stripComments(input);
    const tokens = this._lexer.tokenize(sourceToLex);
    return new _ParseAST(input, location, absoluteOffset, tokens, 0, this.errors, 0).parseChain();
  }
  parseTemplateBindings(templateKey, templateValue, templateUrl, absoluteKeyOffset, absoluteValueOffset) {
    const tokens = this._lexer.tokenize(templateValue);
    const parser = new _ParseAST(templateValue, templateUrl, absoluteValueOffset, tokens, 0, this.errors, 0);
    return parser.parseTemplateBindings({
      source: templateKey,
      span: new AbsoluteSourceSpan(absoluteKeyOffset, absoluteKeyOffset + templateKey.length)
    });
  }
  parseInterpolation(input, location, absoluteOffset, interpolatedTokens, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    const { strings, expressions, offsets } = this.splitInterpolation(input, location, interpolatedTokens, interpolationConfig);
    if (expressions.length === 0)
      return null;
    const expressionNodes = [];
    for (let i = 0; i < expressions.length; ++i) {
      const expressionText = expressions[i].text;
      const sourceToLex = this._stripComments(expressionText);
      const tokens = this._lexer.tokenize(sourceToLex);
      const ast = new _ParseAST(input, location, absoluteOffset, tokens, 0, this.errors, offsets[i]).parseChain();
      expressionNodes.push(ast);
    }
    return this.createInterpolationAst(strings.map((s) => s.text), expressionNodes, input, location, absoluteOffset);
  }
  parseInterpolationExpression(expression, location, absoluteOffset) {
    const sourceToLex = this._stripComments(expression);
    const tokens = this._lexer.tokenize(sourceToLex);
    const ast = new _ParseAST(expression, location, absoluteOffset, tokens, 0, this.errors, 0).parseChain();
    const strings = ["", ""];
    return this.createInterpolationAst(strings, [ast], expression, location, absoluteOffset);
  }
  createInterpolationAst(strings, expressions, input, location, absoluteOffset) {
    const span = new ParseSpan(0, input.length);
    const interpolation = new Interpolation(span, span.toAbsolute(absoluteOffset), strings, expressions);
    return new ASTWithSource(interpolation, input, location, absoluteOffset, this.errors);
  }
  splitInterpolation(input, location, interpolatedTokens, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    var _a;
    const strings = [];
    const expressions = [];
    const offsets = [];
    const inputToTemplateIndexMap = interpolatedTokens ? getIndexMapForOriginalTemplate(interpolatedTokens) : null;
    let i = 0;
    let atInterpolation = false;
    let extendLastString = false;
    let { start: interpStart, end: interpEnd } = interpolationConfig;
    while (i < input.length) {
      if (!atInterpolation) {
        const start = i;
        i = input.indexOf(interpStart, i);
        if (i === -1) {
          i = input.length;
        }
        const text = input.substring(start, i);
        strings.push({ text, start, end: i });
        atInterpolation = true;
      } else {
        const fullStart = i;
        const exprStart = fullStart + interpStart.length;
        const exprEnd = this._getInterpolationEndIndex(input, interpEnd, exprStart);
        if (exprEnd === -1) {
          atInterpolation = false;
          extendLastString = true;
          break;
        }
        const fullEnd = exprEnd + interpEnd.length;
        const text = input.substring(exprStart, exprEnd);
        if (text.trim().length === 0) {
          this._reportError("Blank expressions are not allowed in interpolated strings", input, `at column ${i} in`, location);
        }
        expressions.push({ text, start: fullStart, end: fullEnd });
        const startInOriginalTemplate = (_a = inputToTemplateIndexMap === null || inputToTemplateIndexMap === void 0 ? void 0 : inputToTemplateIndexMap.get(fullStart)) !== null && _a !== void 0 ? _a : fullStart;
        const offset = startInOriginalTemplate + interpStart.length;
        offsets.push(offset);
        i = fullEnd;
        atInterpolation = false;
      }
    }
    if (!atInterpolation) {
      if (extendLastString) {
        const piece = strings[strings.length - 1];
        piece.text += input.substring(i);
        piece.end = input.length;
      } else {
        strings.push({ text: input.substring(i), start: i, end: input.length });
      }
    }
    return new SplitInterpolation(strings, expressions, offsets);
  }
  wrapLiteralPrimitive(input, location, absoluteOffset) {
    const span = new ParseSpan(0, input == null ? 0 : input.length);
    return new ASTWithSource(new LiteralPrimitive(span, span.toAbsolute(absoluteOffset), input), input, location, absoluteOffset, this.errors);
  }
  _stripComments(input) {
    const i = this._commentStart(input);
    return i != null ? input.substring(0, i) : input;
  }
  _commentStart(input) {
    let outerQuote = null;
    for (let i = 0; i < input.length - 1; i++) {
      const char = input.charCodeAt(i);
      const nextChar = input.charCodeAt(i + 1);
      if (char === $SLASH && nextChar == $SLASH && outerQuote == null)
        return i;
      if (outerQuote === char) {
        outerQuote = null;
      } else if (outerQuote == null && isQuote(char)) {
        outerQuote = char;
      }
    }
    return null;
  }
  _checkNoInterpolation(input, location, { start, end }) {
    let startIndex = -1;
    let endIndex = -1;
    for (const charIndex of this._forEachUnquotedChar(input, 0)) {
      if (startIndex === -1) {
        if (input.startsWith(start)) {
          startIndex = charIndex;
        }
      } else {
        endIndex = this._getInterpolationEndIndex(input, end, charIndex);
        if (endIndex > -1) {
          break;
        }
      }
    }
    if (startIndex > -1 && endIndex > -1) {
      this._reportError(`Got interpolation (${start}${end}) where expression was expected`, input, `at column ${startIndex} in`, location);
    }
  }
  _getInterpolationEndIndex(input, expressionEnd, start) {
    for (const charIndex of this._forEachUnquotedChar(input, start)) {
      if (input.startsWith(expressionEnd, charIndex)) {
        return charIndex;
      }
      if (input.startsWith("//", charIndex)) {
        return input.indexOf(expressionEnd, charIndex);
      }
    }
    return -1;
  }
  *_forEachUnquotedChar(input, start) {
    let currentQuote = null;
    let escapeCount = 0;
    for (let i = start; i < input.length; i++) {
      const char = input[i];
      if (isQuote(input.charCodeAt(i)) && (currentQuote === null || currentQuote === char) && escapeCount % 2 === 0) {
        currentQuote = currentQuote === null ? char : null;
      } else if (currentQuote === null) {
        yield i;
      }
      escapeCount = char === "\\" ? escapeCount + 1 : 0;
    }
  }
};
var ParseContextFlags;
(function(ParseContextFlags2) {
  ParseContextFlags2[ParseContextFlags2["None"] = 0] = "None";
  ParseContextFlags2[ParseContextFlags2["Writable"] = 1] = "Writable";
})(ParseContextFlags || (ParseContextFlags = {}));
var _ParseAST = class {
  constructor(input, location, absoluteOffset, tokens, parseFlags, errors, offset) {
    this.input = input;
    this.location = location;
    this.absoluteOffset = absoluteOffset;
    this.tokens = tokens;
    this.parseFlags = parseFlags;
    this.errors = errors;
    this.offset = offset;
    this.rparensExpected = 0;
    this.rbracketsExpected = 0;
    this.rbracesExpected = 0;
    this.context = ParseContextFlags.None;
    this.sourceSpanCache = /* @__PURE__ */ new Map();
    this.index = 0;
  }
  peek(offset) {
    const i = this.index + offset;
    return i < this.tokens.length ? this.tokens[i] : EOF;
  }
  get next() {
    return this.peek(0);
  }
  get atEOF() {
    return this.index >= this.tokens.length;
  }
  get inputIndex() {
    return this.atEOF ? this.currentEndIndex : this.next.index + this.offset;
  }
  get currentEndIndex() {
    if (this.index > 0) {
      const curToken = this.peek(-1);
      return curToken.end + this.offset;
    }
    if (this.tokens.length === 0) {
      return this.input.length + this.offset;
    }
    return this.next.index + this.offset;
  }
  get currentAbsoluteOffset() {
    return this.absoluteOffset + this.inputIndex;
  }
  span(start, artificialEndIndex) {
    let endIndex = this.currentEndIndex;
    if (artificialEndIndex !== void 0 && artificialEndIndex > this.currentEndIndex) {
      endIndex = artificialEndIndex;
    }
    if (start > endIndex) {
      const tmp = endIndex;
      endIndex = start;
      start = tmp;
    }
    return new ParseSpan(start, endIndex);
  }
  sourceSpan(start, artificialEndIndex) {
    const serial = `${start}@${this.inputIndex}:${artificialEndIndex}`;
    if (!this.sourceSpanCache.has(serial)) {
      this.sourceSpanCache.set(serial, this.span(start, artificialEndIndex).toAbsolute(this.absoluteOffset));
    }
    return this.sourceSpanCache.get(serial);
  }
  advance() {
    this.index++;
  }
  withContext(context, cb) {
    this.context |= context;
    const ret = cb();
    this.context ^= context;
    return ret;
  }
  consumeOptionalCharacter(code) {
    if (this.next.isCharacter(code)) {
      this.advance();
      return true;
    } else {
      return false;
    }
  }
  peekKeywordLet() {
    return this.next.isKeywordLet();
  }
  peekKeywordAs() {
    return this.next.isKeywordAs();
  }
  expectCharacter(code) {
    if (this.consumeOptionalCharacter(code))
      return;
    this.error(`Missing expected ${String.fromCharCode(code)}`);
  }
  consumeOptionalOperator(op) {
    if (this.next.isOperator(op)) {
      this.advance();
      return true;
    } else {
      return false;
    }
  }
  expectOperator(operator) {
    if (this.consumeOptionalOperator(operator))
      return;
    this.error(`Missing expected operator ${operator}`);
  }
  prettyPrintToken(tok) {
    return tok === EOF ? "end of input" : `token ${tok}`;
  }
  expectIdentifierOrKeyword() {
    const n = this.next;
    if (!n.isIdentifier() && !n.isKeyword()) {
      if (n.isPrivateIdentifier()) {
        this._reportErrorForPrivateIdentifier(n, "expected identifier or keyword");
      } else {
        this.error(`Unexpected ${this.prettyPrintToken(n)}, expected identifier or keyword`);
      }
      return null;
    }
    this.advance();
    return n.toString();
  }
  expectIdentifierOrKeywordOrString() {
    const n = this.next;
    if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
      if (n.isPrivateIdentifier()) {
        this._reportErrorForPrivateIdentifier(n, "expected identifier, keyword or string");
      } else {
        this.error(`Unexpected ${this.prettyPrintToken(n)}, expected identifier, keyword, or string`);
      }
      return "";
    }
    this.advance();
    return n.toString();
  }
  parseChain() {
    const exprs = [];
    const start = this.inputIndex;
    while (this.index < this.tokens.length) {
      const expr = this.parsePipe();
      exprs.push(expr);
      if (this.consumeOptionalCharacter($SEMICOLON)) {
        if (!(this.parseFlags & 1)) {
          this.error("Binding expression cannot contain chained expression");
        }
        while (this.consumeOptionalCharacter($SEMICOLON)) {
        }
      } else if (this.index < this.tokens.length) {
        const errorIndex = this.index;
        this.error(`Unexpected token '${this.next}'`);
        if (this.index === errorIndex) {
          break;
        }
      }
    }
    if (exprs.length === 0) {
      const artificialStart = this.offset;
      const artificialEnd = this.offset + this.input.length;
      return new EmptyExpr(this.span(artificialStart, artificialEnd), this.sourceSpan(artificialStart, artificialEnd));
    }
    if (exprs.length == 1)
      return exprs[0];
    return new Chain(this.span(start), this.sourceSpan(start), exprs);
  }
  parsePipe() {
    const start = this.inputIndex;
    let result = this.parseExpression();
    if (this.consumeOptionalOperator("|")) {
      if (this.parseFlags & 1) {
        this.error("Cannot have a pipe in an action expression");
      }
      do {
        const nameStart = this.inputIndex;
        let nameId = this.expectIdentifierOrKeyword();
        let nameSpan;
        let fullSpanEnd = void 0;
        if (nameId !== null) {
          nameSpan = this.sourceSpan(nameStart);
        } else {
          nameId = "";
          fullSpanEnd = this.next.index !== -1 ? this.next.index : this.input.length + this.offset;
          nameSpan = new ParseSpan(fullSpanEnd, fullSpanEnd).toAbsolute(this.absoluteOffset);
        }
        const args = [];
        while (this.consumeOptionalCharacter($COLON)) {
          args.push(this.parseExpression());
        }
        result = new BindingPipe(this.span(start), this.sourceSpan(start, fullSpanEnd), result, nameId, args, nameSpan);
      } while (this.consumeOptionalOperator("|"));
    }
    return result;
  }
  parseExpression() {
    return this.parseConditional();
  }
  parseConditional() {
    const start = this.inputIndex;
    const result = this.parseLogicalOr();
    if (this.consumeOptionalOperator("?")) {
      const yes = this.parsePipe();
      let no;
      if (!this.consumeOptionalCharacter($COLON)) {
        const end = this.inputIndex;
        const expression = this.input.substring(start, end);
        this.error(`Conditional expression ${expression} requires all 3 expressions`);
        no = new EmptyExpr(this.span(start), this.sourceSpan(start));
      } else {
        no = this.parsePipe();
      }
      return new Conditional(this.span(start), this.sourceSpan(start), result, yes, no);
    } else {
      return result;
    }
  }
  parseLogicalOr() {
    const start = this.inputIndex;
    let result = this.parseLogicalAnd();
    while (this.consumeOptionalOperator("||")) {
      const right = this.parseLogicalAnd();
      result = new Binary(this.span(start), this.sourceSpan(start), "||", result, right);
    }
    return result;
  }
  parseLogicalAnd() {
    const start = this.inputIndex;
    let result = this.parseNullishCoalescing();
    while (this.consumeOptionalOperator("&&")) {
      const right = this.parseNullishCoalescing();
      result = new Binary(this.span(start), this.sourceSpan(start), "&&", result, right);
    }
    return result;
  }
  parseNullishCoalescing() {
    const start = this.inputIndex;
    let result = this.parseEquality();
    while (this.consumeOptionalOperator("??")) {
      const right = this.parseEquality();
      result = new Binary(this.span(start), this.sourceSpan(start), "??", result, right);
    }
    return result;
  }
  parseEquality() {
    const start = this.inputIndex;
    let result = this.parseRelational();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "==":
        case "===":
        case "!=":
        case "!==":
          this.advance();
          const right = this.parseRelational();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parseRelational() {
    const start = this.inputIndex;
    let result = this.parseAdditive();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "<":
        case ">":
        case "<=":
        case ">=":
          this.advance();
          const right = this.parseAdditive();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parseAdditive() {
    const start = this.inputIndex;
    let result = this.parseMultiplicative();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "+":
        case "-":
          this.advance();
          let right = this.parseMultiplicative();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parseMultiplicative() {
    const start = this.inputIndex;
    let result = this.parsePrefix();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "*":
        case "%":
        case "/":
          this.advance();
          let right = this.parsePrefix();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parsePrefix() {
    if (this.next.type == TokenType.Operator) {
      const start = this.inputIndex;
      const operator = this.next.strValue;
      let result;
      switch (operator) {
        case "+":
          this.advance();
          result = this.parsePrefix();
          return Unary.createPlus(this.span(start), this.sourceSpan(start), result);
        case "-":
          this.advance();
          result = this.parsePrefix();
          return Unary.createMinus(this.span(start), this.sourceSpan(start), result);
        case "!":
          this.advance();
          result = this.parsePrefix();
          return new PrefixNot(this.span(start), this.sourceSpan(start), result);
      }
    }
    return this.parseCallChain();
  }
  parseCallChain() {
    const start = this.inputIndex;
    let result = this.parsePrimary();
    while (true) {
      if (this.consumeOptionalCharacter($PERIOD)) {
        result = this.parseAccessMember(result, start, false);
      } else if (this.consumeOptionalOperator("?.")) {
        if (this.consumeOptionalCharacter($LPAREN)) {
          result = this.parseCall(result, start, true);
        } else {
          result = this.consumeOptionalCharacter($LBRACKET) ? this.parseKeyedReadOrWrite(result, start, true) : this.parseAccessMember(result, start, true);
        }
      } else if (this.consumeOptionalCharacter($LBRACKET)) {
        result = this.parseKeyedReadOrWrite(result, start, false);
      } else if (this.consumeOptionalCharacter($LPAREN)) {
        result = this.parseCall(result, start, false);
      } else if (this.consumeOptionalOperator("!")) {
        result = new NonNullAssert(this.span(start), this.sourceSpan(start), result);
      } else {
        return result;
      }
    }
  }
  parsePrimary() {
    const start = this.inputIndex;
    if (this.consumeOptionalCharacter($LPAREN)) {
      this.rparensExpected++;
      const result = this.parsePipe();
      this.rparensExpected--;
      this.expectCharacter($RPAREN);
      return result;
    } else if (this.next.isKeywordNull()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), null);
    } else if (this.next.isKeywordUndefined()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), void 0);
    } else if (this.next.isKeywordTrue()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), true);
    } else if (this.next.isKeywordFalse()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), false);
    } else if (this.next.isKeywordThis()) {
      this.advance();
      return new ThisReceiver(this.span(start), this.sourceSpan(start));
    } else if (this.consumeOptionalCharacter($LBRACKET)) {
      this.rbracketsExpected++;
      const elements = this.parseExpressionList($RBRACKET);
      this.rbracketsExpected--;
      this.expectCharacter($RBRACKET);
      return new LiteralArray(this.span(start), this.sourceSpan(start), elements);
    } else if (this.next.isCharacter($LBRACE)) {
      return this.parseLiteralMap();
    } else if (this.next.isIdentifier()) {
      return this.parseAccessMember(new ImplicitReceiver(this.span(start), this.sourceSpan(start)), start, false);
    } else if (this.next.isNumber()) {
      const value = this.next.toNumber();
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), value);
    } else if (this.next.isString()) {
      const literalValue = this.next.toString();
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), literalValue);
    } else if (this.next.isPrivateIdentifier()) {
      this._reportErrorForPrivateIdentifier(this.next, null);
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    } else if (this.index >= this.tokens.length) {
      this.error(`Unexpected end of expression: ${this.input}`);
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    } else {
      this.error(`Unexpected token ${this.next}`);
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    }
  }
  parseExpressionList(terminator) {
    const result = [];
    do {
      if (!this.next.isCharacter(terminator)) {
        result.push(this.parsePipe());
      } else {
        break;
      }
    } while (this.consumeOptionalCharacter($COMMA));
    return result;
  }
  parseLiteralMap() {
    const keys = [];
    const values = [];
    const start = this.inputIndex;
    this.expectCharacter($LBRACE);
    if (!this.consumeOptionalCharacter($RBRACE)) {
      this.rbracesExpected++;
      do {
        const keyStart = this.inputIndex;
        const quoted = this.next.isString();
        const key = this.expectIdentifierOrKeywordOrString();
        keys.push({ key, quoted });
        if (quoted) {
          this.expectCharacter($COLON);
          values.push(this.parsePipe());
        } else if (this.consumeOptionalCharacter($COLON)) {
          values.push(this.parsePipe());
        } else {
          const span = this.span(keyStart);
          const sourceSpan = this.sourceSpan(keyStart);
          values.push(new PropertyRead(span, sourceSpan, sourceSpan, new ImplicitReceiver(span, sourceSpan), key));
        }
      } while (this.consumeOptionalCharacter($COMMA));
      this.rbracesExpected--;
      this.expectCharacter($RBRACE);
    }
    return new LiteralMap(this.span(start), this.sourceSpan(start), keys, values);
  }
  parseAccessMember(readReceiver, start, isSafe) {
    const nameStart = this.inputIndex;
    const id = this.withContext(ParseContextFlags.Writable, () => {
      var _a;
      const id2 = (_a = this.expectIdentifierOrKeyword()) !== null && _a !== void 0 ? _a : "";
      if (id2.length === 0) {
        this.error(`Expected identifier for property access`, readReceiver.span.end);
      }
      return id2;
    });
    const nameSpan = this.sourceSpan(nameStart);
    let receiver;
    if (isSafe) {
      if (this.consumeOptionalAssignment()) {
        this.error("The '?.' operator cannot be used in the assignment");
        receiver = new EmptyExpr(this.span(start), this.sourceSpan(start));
      } else {
        receiver = new SafePropertyRead(this.span(start), this.sourceSpan(start), nameSpan, readReceiver, id);
      }
    } else {
      if (this.consumeOptionalAssignment()) {
        if (!(this.parseFlags & 1)) {
          this.error("Bindings cannot contain assignments");
          return new EmptyExpr(this.span(start), this.sourceSpan(start));
        }
        const value = this.parseConditional();
        receiver = new PropertyWrite(this.span(start), this.sourceSpan(start), nameSpan, readReceiver, id, value);
      } else {
        receiver = new PropertyRead(this.span(start), this.sourceSpan(start), nameSpan, readReceiver, id);
      }
    }
    return receiver;
  }
  parseCall(receiver, start, isSafe) {
    const argumentStart = this.inputIndex;
    this.rparensExpected++;
    const args = this.parseCallArguments();
    const argumentSpan = this.span(argumentStart, this.inputIndex).toAbsolute(this.absoluteOffset);
    this.expectCharacter($RPAREN);
    this.rparensExpected--;
    const span = this.span(start);
    const sourceSpan = this.sourceSpan(start);
    return isSafe ? new SafeCall(span, sourceSpan, receiver, args, argumentSpan) : new Call(span, sourceSpan, receiver, args, argumentSpan);
  }
  consumeOptionalAssignment() {
    if (this.parseFlags & 2 && this.next.isOperator("!") && this.peek(1).isOperator("=")) {
      this.advance();
      this.advance();
      return true;
    }
    return this.consumeOptionalOperator("=");
  }
  parseCallArguments() {
    if (this.next.isCharacter($RPAREN))
      return [];
    const positionals = [];
    do {
      positionals.push(this.parsePipe());
    } while (this.consumeOptionalCharacter($COMMA));
    return positionals;
  }
  expectTemplateBindingKey() {
    let result = "";
    let operatorFound = false;
    const start = this.currentAbsoluteOffset;
    do {
      result += this.expectIdentifierOrKeywordOrString();
      operatorFound = this.consumeOptionalOperator("-");
      if (operatorFound) {
        result += "-";
      }
    } while (operatorFound);
    return {
      source: result,
      span: new AbsoluteSourceSpan(start, start + result.length)
    };
  }
  parseTemplateBindings(templateKey) {
    const bindings = [];
    bindings.push(...this.parseDirectiveKeywordBindings(templateKey));
    while (this.index < this.tokens.length) {
      const letBinding = this.parseLetBinding();
      if (letBinding) {
        bindings.push(letBinding);
      } else {
        const key = this.expectTemplateBindingKey();
        const binding = this.parseAsBinding(key);
        if (binding) {
          bindings.push(binding);
        } else {
          key.source = templateKey.source + key.source.charAt(0).toUpperCase() + key.source.substring(1);
          bindings.push(...this.parseDirectiveKeywordBindings(key));
        }
      }
      this.consumeStatementTerminator();
    }
    return new TemplateBindingParseResult(bindings, [], this.errors);
  }
  parseKeyedReadOrWrite(receiver, start, isSafe) {
    return this.withContext(ParseContextFlags.Writable, () => {
      this.rbracketsExpected++;
      const key = this.parsePipe();
      if (key instanceof EmptyExpr) {
        this.error(`Key access cannot be empty`);
      }
      this.rbracketsExpected--;
      this.expectCharacter($RBRACKET);
      if (this.consumeOptionalOperator("=")) {
        if (isSafe) {
          this.error("The '?.' operator cannot be used in the assignment");
        } else {
          const value = this.parseConditional();
          return new KeyedWrite(this.span(start), this.sourceSpan(start), receiver, key, value);
        }
      } else {
        return isSafe ? new SafeKeyedRead(this.span(start), this.sourceSpan(start), receiver, key) : new KeyedRead(this.span(start), this.sourceSpan(start), receiver, key);
      }
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    });
  }
  parseDirectiveKeywordBindings(key) {
    const bindings = [];
    this.consumeOptionalCharacter($COLON);
    const value = this.getDirectiveBoundTarget();
    let spanEnd = this.currentAbsoluteOffset;
    const asBinding = this.parseAsBinding(key);
    if (!asBinding) {
      this.consumeStatementTerminator();
      spanEnd = this.currentAbsoluteOffset;
    }
    const sourceSpan = new AbsoluteSourceSpan(key.span.start, spanEnd);
    bindings.push(new ExpressionBinding(sourceSpan, key, value));
    if (asBinding) {
      bindings.push(asBinding);
    }
    return bindings;
  }
  getDirectiveBoundTarget() {
    if (this.next === EOF || this.peekKeywordAs() || this.peekKeywordLet()) {
      return null;
    }
    const ast = this.parsePipe();
    const { start, end } = ast.span;
    const value = this.input.substring(start, end);
    return new ASTWithSource(ast, value, this.location, this.absoluteOffset + start, this.errors);
  }
  parseAsBinding(value) {
    if (!this.peekKeywordAs()) {
      return null;
    }
    this.advance();
    const key = this.expectTemplateBindingKey();
    this.consumeStatementTerminator();
    const sourceSpan = new AbsoluteSourceSpan(value.span.start, this.currentAbsoluteOffset);
    return new VariableBinding(sourceSpan, key, value);
  }
  parseLetBinding() {
    if (!this.peekKeywordLet()) {
      return null;
    }
    const spanStart = this.currentAbsoluteOffset;
    this.advance();
    const key = this.expectTemplateBindingKey();
    let value = null;
    if (this.consumeOptionalOperator("=")) {
      value = this.expectTemplateBindingKey();
    }
    this.consumeStatementTerminator();
    const sourceSpan = new AbsoluteSourceSpan(spanStart, this.currentAbsoluteOffset);
    return new VariableBinding(sourceSpan, key, value);
  }
  consumeStatementTerminator() {
    this.consumeOptionalCharacter($SEMICOLON) || this.consumeOptionalCharacter($COMMA);
  }
  error(message, index2 = null) {
    this.errors.push(new ParserError(message, this.input, this.locationText(index2), this.location));
    this.skip();
  }
  locationText(index2 = null) {
    if (index2 == null)
      index2 = this.index;
    return index2 < this.tokens.length ? `at column ${this.tokens[index2].index + 1} in` : `at the end of the expression`;
  }
  _reportErrorForPrivateIdentifier(token, extraMessage) {
    let errorMessage = `Private identifiers are not supported. Unexpected private identifier: ${token}`;
    if (extraMessage !== null) {
      errorMessage += `, ${extraMessage}`;
    }
    this.error(errorMessage);
  }
  skip() {
    let n = this.next;
    while (this.index < this.tokens.length && !n.isCharacter($SEMICOLON) && !n.isOperator("|") && (this.rparensExpected <= 0 || !n.isCharacter($RPAREN)) && (this.rbracesExpected <= 0 || !n.isCharacter($RBRACE)) && (this.rbracketsExpected <= 0 || !n.isCharacter($RBRACKET)) && (!(this.context & ParseContextFlags.Writable) || !n.isOperator("="))) {
      if (this.next.isError()) {
        this.errors.push(new ParserError(this.next.toString(), this.input, this.locationText(), this.location));
      }
      this.advance();
      n = this.next;
    }
  }
};
var SimpleExpressionChecker = class extends RecursiveAstVisitor {
  constructor() {
    super(...arguments);
    this.errors = [];
  }
  visitPipe() {
    this.errors.push("pipes");
  }
};
function getIndexMapForOriginalTemplate(interpolatedTokens) {
  let offsetMap = /* @__PURE__ */ new Map();
  let consumedInOriginalTemplate = 0;
  let consumedInInput = 0;
  let tokenIndex = 0;
  while (tokenIndex < interpolatedTokens.length) {
    const currentToken = interpolatedTokens[tokenIndex];
    if (currentToken.type === 9) {
      const [decoded, encoded] = currentToken.parts;
      consumedInOriginalTemplate += encoded.length;
      consumedInInput += decoded.length;
    } else {
      const lengthOfParts = currentToken.parts.reduce((sum, current) => sum + current.length, 0);
      consumedInInput += lengthOfParts;
      consumedInOriginalTemplate += lengthOfParts;
    }
    offsetMap.set(consumedInInput, consumedInOriginalTemplate);
    tokenIndex++;
  }
  return offsetMap;
}
var NodeWithI18n = class {
  constructor(sourceSpan, i18n) {
    this.sourceSpan = sourceSpan;
    this.i18n = i18n;
  }
};
var Text = class extends NodeWithI18n {
  constructor(value, sourceSpan, tokens, i18n) {
    super(sourceSpan, i18n);
    this.value = value;
    this.tokens = tokens;
  }
  visit(visitor, context) {
    return visitor.visitText(this, context);
  }
};
var Expansion = class extends NodeWithI18n {
  constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan, i18n) {
    super(sourceSpan, i18n);
    this.switchValue = switchValue;
    this.type = type;
    this.cases = cases;
    this.switchValueSourceSpan = switchValueSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitExpansion(this, context);
  }
};
var ExpansionCase = class {
  constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
    this.value = value;
    this.expression = expression;
    this.sourceSpan = sourceSpan;
    this.valueSourceSpan = valueSourceSpan;
    this.expSourceSpan = expSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitExpansionCase(this, context);
  }
};
var Attribute = class extends NodeWithI18n {
  constructor(name, value, sourceSpan, keySpan, valueSpan, valueTokens, i18n) {
    super(sourceSpan, i18n);
    this.name = name;
    this.value = value;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.valueTokens = valueTokens;
  }
  visit(visitor, context) {
    return visitor.visitAttribute(this, context);
  }
};
var Element = class extends NodeWithI18n {
  constructor(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan = null, i18n) {
    super(sourceSpan, i18n);
    this.name = name;
    this.attrs = attrs;
    this.children = children;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitElement(this, context);
  }
};
var Comment = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitComment(this, context);
  }
};
function visitAll(visitor, nodes, context = null) {
  const result = [];
  const visit = visitor.visit ? (ast) => visitor.visit(ast, context) || ast.visit(visitor, context) : (ast) => ast.visit(visitor, context);
  nodes.forEach((ast) => {
    const astResult = visit(ast);
    if (astResult) {
      result.push(astResult);
    }
  });
  return result;
}
var NAMED_ENTITIES = {
  "AElig": "\xC6",
  "AMP": "&",
  "amp": "&",
  "Aacute": "\xC1",
  "Abreve": "\u0102",
  "Acirc": "\xC2",
  "Acy": "\u0410",
  "Afr": "\u{1D504}",
  "Agrave": "\xC0",
  "Alpha": "\u0391",
  "Amacr": "\u0100",
  "And": "\u2A53",
  "Aogon": "\u0104",
  "Aopf": "\u{1D538}",
  "ApplyFunction": "\u2061",
  "af": "\u2061",
  "Aring": "\xC5",
  "angst": "\xC5",
  "Ascr": "\u{1D49C}",
  "Assign": "\u2254",
  "colone": "\u2254",
  "coloneq": "\u2254",
  "Atilde": "\xC3",
  "Auml": "\xC4",
  "Backslash": "\u2216",
  "setminus": "\u2216",
  "setmn": "\u2216",
  "smallsetminus": "\u2216",
  "ssetmn": "\u2216",
  "Barv": "\u2AE7",
  "Barwed": "\u2306",
  "doublebarwedge": "\u2306",
  "Bcy": "\u0411",
  "Because": "\u2235",
  "becaus": "\u2235",
  "because": "\u2235",
  "Bernoullis": "\u212C",
  "Bscr": "\u212C",
  "bernou": "\u212C",
  "Beta": "\u0392",
  "Bfr": "\u{1D505}",
  "Bopf": "\u{1D539}",
  "Breve": "\u02D8",
  "breve": "\u02D8",
  "Bumpeq": "\u224E",
  "HumpDownHump": "\u224E",
  "bump": "\u224E",
  "CHcy": "\u0427",
  "COPY": "\xA9",
  "copy": "\xA9",
  "Cacute": "\u0106",
  "Cap": "\u22D2",
  "CapitalDifferentialD": "\u2145",
  "DD": "\u2145",
  "Cayleys": "\u212D",
  "Cfr": "\u212D",
  "Ccaron": "\u010C",
  "Ccedil": "\xC7",
  "Ccirc": "\u0108",
  "Cconint": "\u2230",
  "Cdot": "\u010A",
  "Cedilla": "\xB8",
  "cedil": "\xB8",
  "CenterDot": "\xB7",
  "centerdot": "\xB7",
  "middot": "\xB7",
  "Chi": "\u03A7",
  "CircleDot": "\u2299",
  "odot": "\u2299",
  "CircleMinus": "\u2296",
  "ominus": "\u2296",
  "CirclePlus": "\u2295",
  "oplus": "\u2295",
  "CircleTimes": "\u2297",
  "otimes": "\u2297",
  "ClockwiseContourIntegral": "\u2232",
  "cwconint": "\u2232",
  "CloseCurlyDoubleQuote": "\u201D",
  "rdquo": "\u201D",
  "rdquor": "\u201D",
  "CloseCurlyQuote": "\u2019",
  "rsquo": "\u2019",
  "rsquor": "\u2019",
  "Colon": "\u2237",
  "Proportion": "\u2237",
  "Colone": "\u2A74",
  "Congruent": "\u2261",
  "equiv": "\u2261",
  "Conint": "\u222F",
  "DoubleContourIntegral": "\u222F",
  "ContourIntegral": "\u222E",
  "conint": "\u222E",
  "oint": "\u222E",
  "Copf": "\u2102",
  "complexes": "\u2102",
  "Coproduct": "\u2210",
  "coprod": "\u2210",
  "CounterClockwiseContourIntegral": "\u2233",
  "awconint": "\u2233",
  "Cross": "\u2A2F",
  "Cscr": "\u{1D49E}",
  "Cup": "\u22D3",
  "CupCap": "\u224D",
  "asympeq": "\u224D",
  "DDotrahd": "\u2911",
  "DJcy": "\u0402",
  "DScy": "\u0405",
  "DZcy": "\u040F",
  "Dagger": "\u2021",
  "ddagger": "\u2021",
  "Darr": "\u21A1",
  "Dashv": "\u2AE4",
  "DoubleLeftTee": "\u2AE4",
  "Dcaron": "\u010E",
  "Dcy": "\u0414",
  "Del": "\u2207",
  "nabla": "\u2207",
  "Delta": "\u0394",
  "Dfr": "\u{1D507}",
  "DiacriticalAcute": "\xB4",
  "acute": "\xB4",
  "DiacriticalDot": "\u02D9",
  "dot": "\u02D9",
  "DiacriticalDoubleAcute": "\u02DD",
  "dblac": "\u02DD",
  "DiacriticalGrave": "`",
  "grave": "`",
  "DiacriticalTilde": "\u02DC",
  "tilde": "\u02DC",
  "Diamond": "\u22C4",
  "diam": "\u22C4",
  "diamond": "\u22C4",
  "DifferentialD": "\u2146",
  "dd": "\u2146",
  "Dopf": "\u{1D53B}",
  "Dot": "\xA8",
  "DoubleDot": "\xA8",
  "die": "\xA8",
  "uml": "\xA8",
  "DotDot": "\u20DC",
  "DotEqual": "\u2250",
  "doteq": "\u2250",
  "esdot": "\u2250",
  "DoubleDownArrow": "\u21D3",
  "Downarrow": "\u21D3",
  "dArr": "\u21D3",
  "DoubleLeftArrow": "\u21D0",
  "Leftarrow": "\u21D0",
  "lArr": "\u21D0",
  "DoubleLeftRightArrow": "\u21D4",
  "Leftrightarrow": "\u21D4",
  "hArr": "\u21D4",
  "iff": "\u21D4",
  "DoubleLongLeftArrow": "\u27F8",
  "Longleftarrow": "\u27F8",
  "xlArr": "\u27F8",
  "DoubleLongLeftRightArrow": "\u27FA",
  "Longleftrightarrow": "\u27FA",
  "xhArr": "\u27FA",
  "DoubleLongRightArrow": "\u27F9",
  "Longrightarrow": "\u27F9",
  "xrArr": "\u27F9",
  "DoubleRightArrow": "\u21D2",
  "Implies": "\u21D2",
  "Rightarrow": "\u21D2",
  "rArr": "\u21D2",
  "DoubleRightTee": "\u22A8",
  "vDash": "\u22A8",
  "DoubleUpArrow": "\u21D1",
  "Uparrow": "\u21D1",
  "uArr": "\u21D1",
  "DoubleUpDownArrow": "\u21D5",
  "Updownarrow": "\u21D5",
  "vArr": "\u21D5",
  "DoubleVerticalBar": "\u2225",
  "par": "\u2225",
  "parallel": "\u2225",
  "shortparallel": "\u2225",
  "spar": "\u2225",
  "DownArrow": "\u2193",
  "ShortDownArrow": "\u2193",
  "darr": "\u2193",
  "downarrow": "\u2193",
  "DownArrowBar": "\u2913",
  "DownArrowUpArrow": "\u21F5",
  "duarr": "\u21F5",
  "DownBreve": "\u0311",
  "DownLeftRightVector": "\u2950",
  "DownLeftTeeVector": "\u295E",
  "DownLeftVector": "\u21BD",
  "leftharpoondown": "\u21BD",
  "lhard": "\u21BD",
  "DownLeftVectorBar": "\u2956",
  "DownRightTeeVector": "\u295F",
  "DownRightVector": "\u21C1",
  "rhard": "\u21C1",
  "rightharpoondown": "\u21C1",
  "DownRightVectorBar": "\u2957",
  "DownTee": "\u22A4",
  "top": "\u22A4",
  "DownTeeArrow": "\u21A7",
  "mapstodown": "\u21A7",
  "Dscr": "\u{1D49F}",
  "Dstrok": "\u0110",
  "ENG": "\u014A",
  "ETH": "\xD0",
  "Eacute": "\xC9",
  "Ecaron": "\u011A",
  "Ecirc": "\xCA",
  "Ecy": "\u042D",
  "Edot": "\u0116",
  "Efr": "\u{1D508}",
  "Egrave": "\xC8",
  "Element": "\u2208",
  "in": "\u2208",
  "isin": "\u2208",
  "isinv": "\u2208",
  "Emacr": "\u0112",
  "EmptySmallSquare": "\u25FB",
  "EmptyVerySmallSquare": "\u25AB",
  "Eogon": "\u0118",
  "Eopf": "\u{1D53C}",
  "Epsilon": "\u0395",
  "Equal": "\u2A75",
  "EqualTilde": "\u2242",
  "eqsim": "\u2242",
  "esim": "\u2242",
  "Equilibrium": "\u21CC",
  "rightleftharpoons": "\u21CC",
  "rlhar": "\u21CC",
  "Escr": "\u2130",
  "expectation": "\u2130",
  "Esim": "\u2A73",
  "Eta": "\u0397",
  "Euml": "\xCB",
  "Exists": "\u2203",
  "exist": "\u2203",
  "ExponentialE": "\u2147",
  "ee": "\u2147",
  "exponentiale": "\u2147",
  "Fcy": "\u0424",
  "Ffr": "\u{1D509}",
  "FilledSmallSquare": "\u25FC",
  "FilledVerySmallSquare": "\u25AA",
  "blacksquare": "\u25AA",
  "squarf": "\u25AA",
  "squf": "\u25AA",
  "Fopf": "\u{1D53D}",
  "ForAll": "\u2200",
  "forall": "\u2200",
  "Fouriertrf": "\u2131",
  "Fscr": "\u2131",
  "GJcy": "\u0403",
  "GT": ">",
  "gt": ">",
  "Gamma": "\u0393",
  "Gammad": "\u03DC",
  "Gbreve": "\u011E",
  "Gcedil": "\u0122",
  "Gcirc": "\u011C",
  "Gcy": "\u0413",
  "Gdot": "\u0120",
  "Gfr": "\u{1D50A}",
  "Gg": "\u22D9",
  "ggg": "\u22D9",
  "Gopf": "\u{1D53E}",
  "GreaterEqual": "\u2265",
  "ge": "\u2265",
  "geq": "\u2265",
  "GreaterEqualLess": "\u22DB",
  "gel": "\u22DB",
  "gtreqless": "\u22DB",
  "GreaterFullEqual": "\u2267",
  "gE": "\u2267",
  "geqq": "\u2267",
  "GreaterGreater": "\u2AA2",
  "GreaterLess": "\u2277",
  "gl": "\u2277",
  "gtrless": "\u2277",
  "GreaterSlantEqual": "\u2A7E",
  "geqslant": "\u2A7E",
  "ges": "\u2A7E",
  "GreaterTilde": "\u2273",
  "gsim": "\u2273",
  "gtrsim": "\u2273",
  "Gscr": "\u{1D4A2}",
  "Gt": "\u226B",
  "NestedGreaterGreater": "\u226B",
  "gg": "\u226B",
  "HARDcy": "\u042A",
  "Hacek": "\u02C7",
  "caron": "\u02C7",
  "Hat": "^",
  "Hcirc": "\u0124",
  "Hfr": "\u210C",
  "Poincareplane": "\u210C",
  "HilbertSpace": "\u210B",
  "Hscr": "\u210B",
  "hamilt": "\u210B",
  "Hopf": "\u210D",
  "quaternions": "\u210D",
  "HorizontalLine": "\u2500",
  "boxh": "\u2500",
  "Hstrok": "\u0126",
  "HumpEqual": "\u224F",
  "bumpe": "\u224F",
  "bumpeq": "\u224F",
  "IEcy": "\u0415",
  "IJlig": "\u0132",
  "IOcy": "\u0401",
  "Iacute": "\xCD",
  "Icirc": "\xCE",
  "Icy": "\u0418",
  "Idot": "\u0130",
  "Ifr": "\u2111",
  "Im": "\u2111",
  "image": "\u2111",
  "imagpart": "\u2111",
  "Igrave": "\xCC",
  "Imacr": "\u012A",
  "ImaginaryI": "\u2148",
  "ii": "\u2148",
  "Int": "\u222C",
  "Integral": "\u222B",
  "int": "\u222B",
  "Intersection": "\u22C2",
  "bigcap": "\u22C2",
  "xcap": "\u22C2",
  "InvisibleComma": "\u2063",
  "ic": "\u2063",
  "InvisibleTimes": "\u2062",
  "it": "\u2062",
  "Iogon": "\u012E",
  "Iopf": "\u{1D540}",
  "Iota": "\u0399",
  "Iscr": "\u2110",
  "imagline": "\u2110",
  "Itilde": "\u0128",
  "Iukcy": "\u0406",
  "Iuml": "\xCF",
  "Jcirc": "\u0134",
  "Jcy": "\u0419",
  "Jfr": "\u{1D50D}",
  "Jopf": "\u{1D541}",
  "Jscr": "\u{1D4A5}",
  "Jsercy": "\u0408",
  "Jukcy": "\u0404",
  "KHcy": "\u0425",
  "KJcy": "\u040C",
  "Kappa": "\u039A",
  "Kcedil": "\u0136",
  "Kcy": "\u041A",
  "Kfr": "\u{1D50E}",
  "Kopf": "\u{1D542}",
  "Kscr": "\u{1D4A6}",
  "LJcy": "\u0409",
  "LT": "<",
  "lt": "<",
  "Lacute": "\u0139",
  "Lambda": "\u039B",
  "Lang": "\u27EA",
  "Laplacetrf": "\u2112",
  "Lscr": "\u2112",
  "lagran": "\u2112",
  "Larr": "\u219E",
  "twoheadleftarrow": "\u219E",
  "Lcaron": "\u013D",
  "Lcedil": "\u013B",
  "Lcy": "\u041B",
  "LeftAngleBracket": "\u27E8",
  "lang": "\u27E8",
  "langle": "\u27E8",
  "LeftArrow": "\u2190",
  "ShortLeftArrow": "\u2190",
  "larr": "\u2190",
  "leftarrow": "\u2190",
  "slarr": "\u2190",
  "LeftArrowBar": "\u21E4",
  "larrb": "\u21E4",
  "LeftArrowRightArrow": "\u21C6",
  "leftrightarrows": "\u21C6",
  "lrarr": "\u21C6",
  "LeftCeiling": "\u2308",
  "lceil": "\u2308",
  "LeftDoubleBracket": "\u27E6",
  "lobrk": "\u27E6",
  "LeftDownTeeVector": "\u2961",
  "LeftDownVector": "\u21C3",
  "dharl": "\u21C3",
  "downharpoonleft": "\u21C3",
  "LeftDownVectorBar": "\u2959",
  "LeftFloor": "\u230A",
  "lfloor": "\u230A",
  "LeftRightArrow": "\u2194",
  "harr": "\u2194",
  "leftrightarrow": "\u2194",
  "LeftRightVector": "\u294E",
  "LeftTee": "\u22A3",
  "dashv": "\u22A3",
  "LeftTeeArrow": "\u21A4",
  "mapstoleft": "\u21A4",
  "LeftTeeVector": "\u295A",
  "LeftTriangle": "\u22B2",
  "vartriangleleft": "\u22B2",
  "vltri": "\u22B2",
  "LeftTriangleBar": "\u29CF",
  "LeftTriangleEqual": "\u22B4",
  "ltrie": "\u22B4",
  "trianglelefteq": "\u22B4",
  "LeftUpDownVector": "\u2951",
  "LeftUpTeeVector": "\u2960",
  "LeftUpVector": "\u21BF",
  "uharl": "\u21BF",
  "upharpoonleft": "\u21BF",
  "LeftUpVectorBar": "\u2958",
  "LeftVector": "\u21BC",
  "leftharpoonup": "\u21BC",
  "lharu": "\u21BC",
  "LeftVectorBar": "\u2952",
  "LessEqualGreater": "\u22DA",
  "leg": "\u22DA",
  "lesseqgtr": "\u22DA",
  "LessFullEqual": "\u2266",
  "lE": "\u2266",
  "leqq": "\u2266",
  "LessGreater": "\u2276",
  "lessgtr": "\u2276",
  "lg": "\u2276",
  "LessLess": "\u2AA1",
  "LessSlantEqual": "\u2A7D",
  "leqslant": "\u2A7D",
  "les": "\u2A7D",
  "LessTilde": "\u2272",
  "lesssim": "\u2272",
  "lsim": "\u2272",
  "Lfr": "\u{1D50F}",
  "Ll": "\u22D8",
  "Lleftarrow": "\u21DA",
  "lAarr": "\u21DA",
  "Lmidot": "\u013F",
  "LongLeftArrow": "\u27F5",
  "longleftarrow": "\u27F5",
  "xlarr": "\u27F5",
  "LongLeftRightArrow": "\u27F7",
  "longleftrightarrow": "\u27F7",
  "xharr": "\u27F7",
  "LongRightArrow": "\u27F6",
  "longrightarrow": "\u27F6",
  "xrarr": "\u27F6",
  "Lopf": "\u{1D543}",
  "LowerLeftArrow": "\u2199",
  "swarr": "\u2199",
  "swarrow": "\u2199",
  "LowerRightArrow": "\u2198",
  "searr": "\u2198",
  "searrow": "\u2198",
  "Lsh": "\u21B0",
  "lsh": "\u21B0",
  "Lstrok": "\u0141",
  "Lt": "\u226A",
  "NestedLessLess": "\u226A",
  "ll": "\u226A",
  "Map": "\u2905",
  "Mcy": "\u041C",
  "MediumSpace": "\u205F",
  "Mellintrf": "\u2133",
  "Mscr": "\u2133",
  "phmmat": "\u2133",
  "Mfr": "\u{1D510}",
  "MinusPlus": "\u2213",
  "mnplus": "\u2213",
  "mp": "\u2213",
  "Mopf": "\u{1D544}",
  "Mu": "\u039C",
  "NJcy": "\u040A",
  "Nacute": "\u0143",
  "Ncaron": "\u0147",
  "Ncedil": "\u0145",
  "Ncy": "\u041D",
  "NegativeMediumSpace": "\u200B",
  "NegativeThickSpace": "\u200B",
  "NegativeThinSpace": "\u200B",
  "NegativeVeryThinSpace": "\u200B",
  "ZeroWidthSpace": "\u200B",
  "NewLine": "\n",
  "Nfr": "\u{1D511}",
  "NoBreak": "\u2060",
  "NonBreakingSpace": "\xA0",
  "nbsp": "\xA0",
  "Nopf": "\u2115",
  "naturals": "\u2115",
  "Not": "\u2AEC",
  "NotCongruent": "\u2262",
  "nequiv": "\u2262",
  "NotCupCap": "\u226D",
  "NotDoubleVerticalBar": "\u2226",
  "npar": "\u2226",
  "nparallel": "\u2226",
  "nshortparallel": "\u2226",
  "nspar": "\u2226",
  "NotElement": "\u2209",
  "notin": "\u2209",
  "notinva": "\u2209",
  "NotEqual": "\u2260",
  "ne": "\u2260",
  "NotEqualTilde": "\u2242\u0338",
  "nesim": "\u2242\u0338",
  "NotExists": "\u2204",
  "nexist": "\u2204",
  "nexists": "\u2204",
  "NotGreater": "\u226F",
  "ngt": "\u226F",
  "ngtr": "\u226F",
  "NotGreaterEqual": "\u2271",
  "nge": "\u2271",
  "ngeq": "\u2271",
  "NotGreaterFullEqual": "\u2267\u0338",
  "ngE": "\u2267\u0338",
  "ngeqq": "\u2267\u0338",
  "NotGreaterGreater": "\u226B\u0338",
  "nGtv": "\u226B\u0338",
  "NotGreaterLess": "\u2279",
  "ntgl": "\u2279",
  "NotGreaterSlantEqual": "\u2A7E\u0338",
  "ngeqslant": "\u2A7E\u0338",
  "nges": "\u2A7E\u0338",
  "NotGreaterTilde": "\u2275",
  "ngsim": "\u2275",
  "NotHumpDownHump": "\u224E\u0338",
  "nbump": "\u224E\u0338",
  "NotHumpEqual": "\u224F\u0338",
  "nbumpe": "\u224F\u0338",
  "NotLeftTriangle": "\u22EA",
  "nltri": "\u22EA",
  "ntriangleleft": "\u22EA",
  "NotLeftTriangleBar": "\u29CF\u0338",
  "NotLeftTriangleEqual": "\u22EC",
  "nltrie": "\u22EC",
  "ntrianglelefteq": "\u22EC",
  "NotLess": "\u226E",
  "nless": "\u226E",
  "nlt": "\u226E",
  "NotLessEqual": "\u2270",
  "nle": "\u2270",
  "nleq": "\u2270",
  "NotLessGreater": "\u2278",
  "ntlg": "\u2278",
  "NotLessLess": "\u226A\u0338",
  "nLtv": "\u226A\u0338",
  "NotLessSlantEqual": "\u2A7D\u0338",
  "nleqslant": "\u2A7D\u0338",
  "nles": "\u2A7D\u0338",
  "NotLessTilde": "\u2274",
  "nlsim": "\u2274",
  "NotNestedGreaterGreater": "\u2AA2\u0338",
  "NotNestedLessLess": "\u2AA1\u0338",
  "NotPrecedes": "\u2280",
  "npr": "\u2280",
  "nprec": "\u2280",
  "NotPrecedesEqual": "\u2AAF\u0338",
  "npre": "\u2AAF\u0338",
  "npreceq": "\u2AAF\u0338",
  "NotPrecedesSlantEqual": "\u22E0",
  "nprcue": "\u22E0",
  "NotReverseElement": "\u220C",
  "notni": "\u220C",
  "notniva": "\u220C",
  "NotRightTriangle": "\u22EB",
  "nrtri": "\u22EB",
  "ntriangleright": "\u22EB",
  "NotRightTriangleBar": "\u29D0\u0338",
  "NotRightTriangleEqual": "\u22ED",
  "nrtrie": "\u22ED",
  "ntrianglerighteq": "\u22ED",
  "NotSquareSubset": "\u228F\u0338",
  "NotSquareSubsetEqual": "\u22E2",
  "nsqsube": "\u22E2",
  "NotSquareSuperset": "\u2290\u0338",
  "NotSquareSupersetEqual": "\u22E3",
  "nsqsupe": "\u22E3",
  "NotSubset": "\u2282\u20D2",
  "nsubset": "\u2282\u20D2",
  "vnsub": "\u2282\u20D2",
  "NotSubsetEqual": "\u2288",
  "nsube": "\u2288",
  "nsubseteq": "\u2288",
  "NotSucceeds": "\u2281",
  "nsc": "\u2281",
  "nsucc": "\u2281",
  "NotSucceedsEqual": "\u2AB0\u0338",
  "nsce": "\u2AB0\u0338",
  "nsucceq": "\u2AB0\u0338",
  "NotSucceedsSlantEqual": "\u22E1",
  "nsccue": "\u22E1",
  "NotSucceedsTilde": "\u227F\u0338",
  "NotSuperset": "\u2283\u20D2",
  "nsupset": "\u2283\u20D2",
  "vnsup": "\u2283\u20D2",
  "NotSupersetEqual": "\u2289",
  "nsupe": "\u2289",
  "nsupseteq": "\u2289",
  "NotTilde": "\u2241",
  "nsim": "\u2241",
  "NotTildeEqual": "\u2244",
  "nsime": "\u2244",
  "nsimeq": "\u2244",
  "NotTildeFullEqual": "\u2247",
  "ncong": "\u2247",
  "NotTildeTilde": "\u2249",
  "nap": "\u2249",
  "napprox": "\u2249",
  "NotVerticalBar": "\u2224",
  "nmid": "\u2224",
  "nshortmid": "\u2224",
  "nsmid": "\u2224",
  "Nscr": "\u{1D4A9}",
  "Ntilde": "\xD1",
  "Nu": "\u039D",
  "OElig": "\u0152",
  "Oacute": "\xD3",
  "Ocirc": "\xD4",
  "Ocy": "\u041E",
  "Odblac": "\u0150",
  "Ofr": "\u{1D512}",
  "Ograve": "\xD2",
  "Omacr": "\u014C",
  "Omega": "\u03A9",
  "ohm": "\u03A9",
  "Omicron": "\u039F",
  "Oopf": "\u{1D546}",
  "OpenCurlyDoubleQuote": "\u201C",
  "ldquo": "\u201C",
  "OpenCurlyQuote": "\u2018",
  "lsquo": "\u2018",
  "Or": "\u2A54",
  "Oscr": "\u{1D4AA}",
  "Oslash": "\xD8",
  "Otilde": "\xD5",
  "Otimes": "\u2A37",
  "Ouml": "\xD6",
  "OverBar": "\u203E",
  "oline": "\u203E",
  "OverBrace": "\u23DE",
  "OverBracket": "\u23B4",
  "tbrk": "\u23B4",
  "OverParenthesis": "\u23DC",
  "PartialD": "\u2202",
  "part": "\u2202",
  "Pcy": "\u041F",
  "Pfr": "\u{1D513}",
  "Phi": "\u03A6",
  "Pi": "\u03A0",
  "PlusMinus": "\xB1",
  "plusmn": "\xB1",
  "pm": "\xB1",
  "Popf": "\u2119",
  "primes": "\u2119",
  "Pr": "\u2ABB",
  "Precedes": "\u227A",
  "pr": "\u227A",
  "prec": "\u227A",
  "PrecedesEqual": "\u2AAF",
  "pre": "\u2AAF",
  "preceq": "\u2AAF",
  "PrecedesSlantEqual": "\u227C",
  "prcue": "\u227C",
  "preccurlyeq": "\u227C",
  "PrecedesTilde": "\u227E",
  "precsim": "\u227E",
  "prsim": "\u227E",
  "Prime": "\u2033",
  "Product": "\u220F",
  "prod": "\u220F",
  "Proportional": "\u221D",
  "prop": "\u221D",
  "propto": "\u221D",
  "varpropto": "\u221D",
  "vprop": "\u221D",
  "Pscr": "\u{1D4AB}",
  "Psi": "\u03A8",
  "QUOT": '"',
  "quot": '"',
  "Qfr": "\u{1D514}",
  "Qopf": "\u211A",
  "rationals": "\u211A",
  "Qscr": "\u{1D4AC}",
  "RBarr": "\u2910",
  "drbkarow": "\u2910",
  "REG": "\xAE",
  "circledR": "\xAE",
  "reg": "\xAE",
  "Racute": "\u0154",
  "Rang": "\u27EB",
  "Rarr": "\u21A0",
  "twoheadrightarrow": "\u21A0",
  "Rarrtl": "\u2916",
  "Rcaron": "\u0158",
  "Rcedil": "\u0156",
  "Rcy": "\u0420",
  "Re": "\u211C",
  "Rfr": "\u211C",
  "real": "\u211C",
  "realpart": "\u211C",
  "ReverseElement": "\u220B",
  "SuchThat": "\u220B",
  "ni": "\u220B",
  "niv": "\u220B",
  "ReverseEquilibrium": "\u21CB",
  "leftrightharpoons": "\u21CB",
  "lrhar": "\u21CB",
  "ReverseUpEquilibrium": "\u296F",
  "duhar": "\u296F",
  "Rho": "\u03A1",
  "RightAngleBracket": "\u27E9",
  "rang": "\u27E9",
  "rangle": "\u27E9",
  "RightArrow": "\u2192",
  "ShortRightArrow": "\u2192",
  "rarr": "\u2192",
  "rightarrow": "\u2192",
  "srarr": "\u2192",
  "RightArrowBar": "\u21E5",
  "rarrb": "\u21E5",
  "RightArrowLeftArrow": "\u21C4",
  "rightleftarrows": "\u21C4",
  "rlarr": "\u21C4",
  "RightCeiling": "\u2309",
  "rceil": "\u2309",
  "RightDoubleBracket": "\u27E7",
  "robrk": "\u27E7",
  "RightDownTeeVector": "\u295D",
  "RightDownVector": "\u21C2",
  "dharr": "\u21C2",
  "downharpoonright": "\u21C2",
  "RightDownVectorBar": "\u2955",
  "RightFloor": "\u230B",
  "rfloor": "\u230B",
  "RightTee": "\u22A2",
  "vdash": "\u22A2",
  "RightTeeArrow": "\u21A6",
  "map": "\u21A6",
  "mapsto": "\u21A6",
  "RightTeeVector": "\u295B",
  "RightTriangle": "\u22B3",
  "vartriangleright": "\u22B3",
  "vrtri": "\u22B3",
  "RightTriangleBar": "\u29D0",
  "RightTriangleEqual": "\u22B5",
  "rtrie": "\u22B5",
  "trianglerighteq": "\u22B5",
  "RightUpDownVector": "\u294F",
  "RightUpTeeVector": "\u295C",
  "RightUpVector": "\u21BE",
  "uharr": "\u21BE",
  "upharpoonright": "\u21BE",
  "RightUpVectorBar": "\u2954",
  "RightVector": "\u21C0",
  "rharu": "\u21C0",
  "rightharpoonup": "\u21C0",
  "RightVectorBar": "\u2953",
  "Ropf": "\u211D",
  "reals": "\u211D",
  "RoundImplies": "\u2970",
  "Rrightarrow": "\u21DB",
  "rAarr": "\u21DB",
  "Rscr": "\u211B",
  "realine": "\u211B",
  "Rsh": "\u21B1",
  "rsh": "\u21B1",
  "RuleDelayed": "\u29F4",
  "SHCHcy": "\u0429",
  "SHcy": "\u0428",
  "SOFTcy": "\u042C",
  "Sacute": "\u015A",
  "Sc": "\u2ABC",
  "Scaron": "\u0160",
  "Scedil": "\u015E",
  "Scirc": "\u015C",
  "Scy": "\u0421",
  "Sfr": "\u{1D516}",
  "ShortUpArrow": "\u2191",
  "UpArrow": "\u2191",
  "uarr": "\u2191",
  "uparrow": "\u2191",
  "Sigma": "\u03A3",
  "SmallCircle": "\u2218",
  "compfn": "\u2218",
  "Sopf": "\u{1D54A}",
  "Sqrt": "\u221A",
  "radic": "\u221A",
  "Square": "\u25A1",
  "squ": "\u25A1",
  "square": "\u25A1",
  "SquareIntersection": "\u2293",
  "sqcap": "\u2293",
  "SquareSubset": "\u228F",
  "sqsub": "\u228F",
  "sqsubset": "\u228F",
  "SquareSubsetEqual": "\u2291",
  "sqsube": "\u2291",
  "sqsubseteq": "\u2291",
  "SquareSuperset": "\u2290",
  "sqsup": "\u2290",
  "sqsupset": "\u2290",
  "SquareSupersetEqual": "\u2292",
  "sqsupe": "\u2292",
  "sqsupseteq": "\u2292",
  "SquareUnion": "\u2294",
  "sqcup": "\u2294",
  "Sscr": "\u{1D4AE}",
  "Star": "\u22C6",
  "sstarf": "\u22C6",
  "Sub": "\u22D0",
  "Subset": "\u22D0",
  "SubsetEqual": "\u2286",
  "sube": "\u2286",
  "subseteq": "\u2286",
  "Succeeds": "\u227B",
  "sc": "\u227B",
  "succ": "\u227B",
  "SucceedsEqual": "\u2AB0",
  "sce": "\u2AB0",
  "succeq": "\u2AB0",
  "SucceedsSlantEqual": "\u227D",
  "sccue": "\u227D",
  "succcurlyeq": "\u227D",
  "SucceedsTilde": "\u227F",
  "scsim": "\u227F",
  "succsim": "\u227F",
  "Sum": "\u2211",
  "sum": "\u2211",
  "Sup": "\u22D1",
  "Supset": "\u22D1",
  "Superset": "\u2283",
  "sup": "\u2283",
  "supset": "\u2283",
  "SupersetEqual": "\u2287",
  "supe": "\u2287",
  "supseteq": "\u2287",
  "THORN": "\xDE",
  "TRADE": "\u2122",
  "trade": "\u2122",
  "TSHcy": "\u040B",
  "TScy": "\u0426",
  "Tab": "	",
  "Tau": "\u03A4",
  "Tcaron": "\u0164",
  "Tcedil": "\u0162",
  "Tcy": "\u0422",
  "Tfr": "\u{1D517}",
  "Therefore": "\u2234",
  "there4": "\u2234",
  "therefore": "\u2234",
  "Theta": "\u0398",
  "ThickSpace": "\u205F\u200A",
  "ThinSpace": "\u2009",
  "thinsp": "\u2009",
  "Tilde": "\u223C",
  "sim": "\u223C",
  "thicksim": "\u223C",
  "thksim": "\u223C",
  "TildeEqual": "\u2243",
  "sime": "\u2243",
  "simeq": "\u2243",
  "TildeFullEqual": "\u2245",
  "cong": "\u2245",
  "TildeTilde": "\u2248",
  "ap": "\u2248",
  "approx": "\u2248",
  "asymp": "\u2248",
  "thickapprox": "\u2248",
  "thkap": "\u2248",
  "Topf": "\u{1D54B}",
  "TripleDot": "\u20DB",
  "tdot": "\u20DB",
  "Tscr": "\u{1D4AF}",
  "Tstrok": "\u0166",
  "Uacute": "\xDA",
  "Uarr": "\u219F",
  "Uarrocir": "\u2949",
  "Ubrcy": "\u040E",
  "Ubreve": "\u016C",
  "Ucirc": "\xDB",
  "Ucy": "\u0423",
  "Udblac": "\u0170",
  "Ufr": "\u{1D518}",
  "Ugrave": "\xD9",
  "Umacr": "\u016A",
  "UnderBar": "_",
  "lowbar": "_",
  "UnderBrace": "\u23DF",
  "UnderBracket": "\u23B5",
  "bbrk": "\u23B5",
  "UnderParenthesis": "\u23DD",
  "Union": "\u22C3",
  "bigcup": "\u22C3",
  "xcup": "\u22C3",
  "UnionPlus": "\u228E",
  "uplus": "\u228E",
  "Uogon": "\u0172",
  "Uopf": "\u{1D54C}",
  "UpArrowBar": "\u2912",
  "UpArrowDownArrow": "\u21C5",
  "udarr": "\u21C5",
  "UpDownArrow": "\u2195",
  "updownarrow": "\u2195",
  "varr": "\u2195",
  "UpEquilibrium": "\u296E",
  "udhar": "\u296E",
  "UpTee": "\u22A5",
  "bot": "\u22A5",
  "bottom": "\u22A5",
  "perp": "\u22A5",
  "UpTeeArrow": "\u21A5",
  "mapstoup": "\u21A5",
  "UpperLeftArrow": "\u2196",
  "nwarr": "\u2196",
  "nwarrow": "\u2196",
  "UpperRightArrow": "\u2197",
  "nearr": "\u2197",
  "nearrow": "\u2197",
  "Upsi": "\u03D2",
  "upsih": "\u03D2",
  "Upsilon": "\u03A5",
  "Uring": "\u016E",
  "Uscr": "\u{1D4B0}",
  "Utilde": "\u0168",
  "Uuml": "\xDC",
  "VDash": "\u22AB",
  "Vbar": "\u2AEB",
  "Vcy": "\u0412",
  "Vdash": "\u22A9",
  "Vdashl": "\u2AE6",
  "Vee": "\u22C1",
  "bigvee": "\u22C1",
  "xvee": "\u22C1",
  "Verbar": "\u2016",
  "Vert": "\u2016",
  "VerticalBar": "\u2223",
  "mid": "\u2223",
  "shortmid": "\u2223",
  "smid": "\u2223",
  "VerticalLine": "|",
  "verbar": "|",
  "vert": "|",
  "VerticalSeparator": "\u2758",
  "VerticalTilde": "\u2240",
  "wr": "\u2240",
  "wreath": "\u2240",
  "VeryThinSpace": "\u200A",
  "hairsp": "\u200A",
  "Vfr": "\u{1D519}",
  "Vopf": "\u{1D54D}",
  "Vscr": "\u{1D4B1}",
  "Vvdash": "\u22AA",
  "Wcirc": "\u0174",
  "Wedge": "\u22C0",
  "bigwedge": "\u22C0",
  "xwedge": "\u22C0",
  "Wfr": "\u{1D51A}",
  "Wopf": "\u{1D54E}",
  "Wscr": "\u{1D4B2}",
  "Xfr": "\u{1D51B}",
  "Xi": "\u039E",
  "Xopf": "\u{1D54F}",
  "Xscr": "\u{1D4B3}",
  "YAcy": "\u042F",
  "YIcy": "\u0407",
  "YUcy": "\u042E",
  "Yacute": "\xDD",
  "Ycirc": "\u0176",
  "Ycy": "\u042B",
  "Yfr": "\u{1D51C}",
  "Yopf": "\u{1D550}",
  "Yscr": "\u{1D4B4}",
  "Yuml": "\u0178",
  "ZHcy": "\u0416",
  "Zacute": "\u0179",
  "Zcaron": "\u017D",
  "Zcy": "\u0417",
  "Zdot": "\u017B",
  "Zeta": "\u0396",
  "Zfr": "\u2128",
  "zeetrf": "\u2128",
  "Zopf": "\u2124",
  "integers": "\u2124",
  "Zscr": "\u{1D4B5}",
  "aacute": "\xE1",
  "abreve": "\u0103",
  "ac": "\u223E",
  "mstpos": "\u223E",
  "acE": "\u223E\u0333",
  "acd": "\u223F",
  "acirc": "\xE2",
  "acy": "\u0430",
  "aelig": "\xE6",
  "afr": "\u{1D51E}",
  "agrave": "\xE0",
  "alefsym": "\u2135",
  "aleph": "\u2135",
  "alpha": "\u03B1",
  "amacr": "\u0101",
  "amalg": "\u2A3F",
  "and": "\u2227",
  "wedge": "\u2227",
  "andand": "\u2A55",
  "andd": "\u2A5C",
  "andslope": "\u2A58",
  "andv": "\u2A5A",
  "ang": "\u2220",
  "angle": "\u2220",
  "ange": "\u29A4",
  "angmsd": "\u2221",
  "measuredangle": "\u2221",
  "angmsdaa": "\u29A8",
  "angmsdab": "\u29A9",
  "angmsdac": "\u29AA",
  "angmsdad": "\u29AB",
  "angmsdae": "\u29AC",
  "angmsdaf": "\u29AD",
  "angmsdag": "\u29AE",
  "angmsdah": "\u29AF",
  "angrt": "\u221F",
  "angrtvb": "\u22BE",
  "angrtvbd": "\u299D",
  "angsph": "\u2222",
  "angzarr": "\u237C",
  "aogon": "\u0105",
  "aopf": "\u{1D552}",
  "apE": "\u2A70",
  "apacir": "\u2A6F",
  "ape": "\u224A",
  "approxeq": "\u224A",
  "apid": "\u224B",
  "apos": "'",
  "aring": "\xE5",
  "ascr": "\u{1D4B6}",
  "ast": "*",
  "midast": "*",
  "atilde": "\xE3",
  "auml": "\xE4",
  "awint": "\u2A11",
  "bNot": "\u2AED",
  "backcong": "\u224C",
  "bcong": "\u224C",
  "backepsilon": "\u03F6",
  "bepsi": "\u03F6",
  "backprime": "\u2035",
  "bprime": "\u2035",
  "backsim": "\u223D",
  "bsim": "\u223D",
  "backsimeq": "\u22CD",
  "bsime": "\u22CD",
  "barvee": "\u22BD",
  "barwed": "\u2305",
  "barwedge": "\u2305",
  "bbrktbrk": "\u23B6",
  "bcy": "\u0431",
  "bdquo": "\u201E",
  "ldquor": "\u201E",
  "bemptyv": "\u29B0",
  "beta": "\u03B2",
  "beth": "\u2136",
  "between": "\u226C",
  "twixt": "\u226C",
  "bfr": "\u{1D51F}",
  "bigcirc": "\u25EF",
  "xcirc": "\u25EF",
  "bigodot": "\u2A00",
  "xodot": "\u2A00",
  "bigoplus": "\u2A01",
  "xoplus": "\u2A01",
  "bigotimes": "\u2A02",
  "xotime": "\u2A02",
  "bigsqcup": "\u2A06",
  "xsqcup": "\u2A06",
  "bigstar": "\u2605",
  "starf": "\u2605",
  "bigtriangledown": "\u25BD",
  "xdtri": "\u25BD",
  "bigtriangleup": "\u25B3",
  "xutri": "\u25B3",
  "biguplus": "\u2A04",
  "xuplus": "\u2A04",
  "bkarow": "\u290D",
  "rbarr": "\u290D",
  "blacklozenge": "\u29EB",
  "lozf": "\u29EB",
  "blacktriangle": "\u25B4",
  "utrif": "\u25B4",
  "blacktriangledown": "\u25BE",
  "dtrif": "\u25BE",
  "blacktriangleleft": "\u25C2",
  "ltrif": "\u25C2",
  "blacktriangleright": "\u25B8",
  "rtrif": "\u25B8",
  "blank": "\u2423",
  "blk12": "\u2592",
  "blk14": "\u2591",
  "blk34": "\u2593",
  "block": "\u2588",
  "bne": "=\u20E5",
  "bnequiv": "\u2261\u20E5",
  "bnot": "\u2310",
  "bopf": "\u{1D553}",
  "bowtie": "\u22C8",
  "boxDL": "\u2557",
  "boxDR": "\u2554",
  "boxDl": "\u2556",
  "boxDr": "\u2553",
  "boxH": "\u2550",
  "boxHD": "\u2566",
  "boxHU": "\u2569",
  "boxHd": "\u2564",
  "boxHu": "\u2567",
  "boxUL": "\u255D",
  "boxUR": "\u255A",
  "boxUl": "\u255C",
  "boxUr": "\u2559",
  "boxV": "\u2551",
  "boxVH": "\u256C",
  "boxVL": "\u2563",
  "boxVR": "\u2560",
  "boxVh": "\u256B",
  "boxVl": "\u2562",
  "boxVr": "\u255F",
  "boxbox": "\u29C9",
  "boxdL": "\u2555",
  "boxdR": "\u2552",
  "boxdl": "\u2510",
  "boxdr": "\u250C",
  "boxhD": "\u2565",
  "boxhU": "\u2568",
  "boxhd": "\u252C",
  "boxhu": "\u2534",
  "boxminus": "\u229F",
  "minusb": "\u229F",
  "boxplus": "\u229E",
  "plusb": "\u229E",
  "boxtimes": "\u22A0",
  "timesb": "\u22A0",
  "boxuL": "\u255B",
  "boxuR": "\u2558",
  "boxul": "\u2518",
  "boxur": "\u2514",
  "boxv": "\u2502",
  "boxvH": "\u256A",
  "boxvL": "\u2561",
  "boxvR": "\u255E",
  "boxvh": "\u253C",
  "boxvl": "\u2524",
  "boxvr": "\u251C",
  "brvbar": "\xA6",
  "bscr": "\u{1D4B7}",
  "bsemi": "\u204F",
  "bsol": "\\",
  "bsolb": "\u29C5",
  "bsolhsub": "\u27C8",
  "bull": "\u2022",
  "bullet": "\u2022",
  "bumpE": "\u2AAE",
  "cacute": "\u0107",
  "cap": "\u2229",
  "capand": "\u2A44",
  "capbrcup": "\u2A49",
  "capcap": "\u2A4B",
  "capcup": "\u2A47",
  "capdot": "\u2A40",
  "caps": "\u2229\uFE00",
  "caret": "\u2041",
  "ccaps": "\u2A4D",
  "ccaron": "\u010D",
  "ccedil": "\xE7",
  "ccirc": "\u0109",
  "ccups": "\u2A4C",
  "ccupssm": "\u2A50",
  "cdot": "\u010B",
  "cemptyv": "\u29B2",
  "cent": "\xA2",
  "cfr": "\u{1D520}",
  "chcy": "\u0447",
  "check": "\u2713",
  "checkmark": "\u2713",
  "chi": "\u03C7",
  "cir": "\u25CB",
  "cirE": "\u29C3",
  "circ": "\u02C6",
  "circeq": "\u2257",
  "cire": "\u2257",
  "circlearrowleft": "\u21BA",
  "olarr": "\u21BA",
  "circlearrowright": "\u21BB",
  "orarr": "\u21BB",
  "circledS": "\u24C8",
  "oS": "\u24C8",
  "circledast": "\u229B",
  "oast": "\u229B",
  "circledcirc": "\u229A",
  "ocir": "\u229A",
  "circleddash": "\u229D",
  "odash": "\u229D",
  "cirfnint": "\u2A10",
  "cirmid": "\u2AEF",
  "cirscir": "\u29C2",
  "clubs": "\u2663",
  "clubsuit": "\u2663",
  "colon": ":",
  "comma": ",",
  "commat": "@",
  "comp": "\u2201",
  "complement": "\u2201",
  "congdot": "\u2A6D",
  "copf": "\u{1D554}",
  "copysr": "\u2117",
  "crarr": "\u21B5",
  "cross": "\u2717",
  "cscr": "\u{1D4B8}",
  "csub": "\u2ACF",
  "csube": "\u2AD1",
  "csup": "\u2AD0",
  "csupe": "\u2AD2",
  "ctdot": "\u22EF",
  "cudarrl": "\u2938",
  "cudarrr": "\u2935",
  "cuepr": "\u22DE",
  "curlyeqprec": "\u22DE",
  "cuesc": "\u22DF",
  "curlyeqsucc": "\u22DF",
  "cularr": "\u21B6",
  "curvearrowleft": "\u21B6",
  "cularrp": "\u293D",
  "cup": "\u222A",
  "cupbrcap": "\u2A48",
  "cupcap": "\u2A46",
  "cupcup": "\u2A4A",
  "cupdot": "\u228D",
  "cupor": "\u2A45",
  "cups": "\u222A\uFE00",
  "curarr": "\u21B7",
  "curvearrowright": "\u21B7",
  "curarrm": "\u293C",
  "curlyvee": "\u22CE",
  "cuvee": "\u22CE",
  "curlywedge": "\u22CF",
  "cuwed": "\u22CF",
  "curren": "\xA4",
  "cwint": "\u2231",
  "cylcty": "\u232D",
  "dHar": "\u2965",
  "dagger": "\u2020",
  "daleth": "\u2138",
  "dash": "\u2010",
  "hyphen": "\u2010",
  "dbkarow": "\u290F",
  "rBarr": "\u290F",
  "dcaron": "\u010F",
  "dcy": "\u0434",
  "ddarr": "\u21CA",
  "downdownarrows": "\u21CA",
  "ddotseq": "\u2A77",
  "eDDot": "\u2A77",
  "deg": "\xB0",
  "delta": "\u03B4",
  "demptyv": "\u29B1",
  "dfisht": "\u297F",
  "dfr": "\u{1D521}",
  "diamondsuit": "\u2666",
  "diams": "\u2666",
  "digamma": "\u03DD",
  "gammad": "\u03DD",
  "disin": "\u22F2",
  "div": "\xF7",
  "divide": "\xF7",
  "divideontimes": "\u22C7",
  "divonx": "\u22C7",
  "djcy": "\u0452",
  "dlcorn": "\u231E",
  "llcorner": "\u231E",
  "dlcrop": "\u230D",
  "dollar": "$",
  "dopf": "\u{1D555}",
  "doteqdot": "\u2251",
  "eDot": "\u2251",
  "dotminus": "\u2238",
  "minusd": "\u2238",
  "dotplus": "\u2214",
  "plusdo": "\u2214",
  "dotsquare": "\u22A1",
  "sdotb": "\u22A1",
  "drcorn": "\u231F",
  "lrcorner": "\u231F",
  "drcrop": "\u230C",
  "dscr": "\u{1D4B9}",
  "dscy": "\u0455",
  "dsol": "\u29F6",
  "dstrok": "\u0111",
  "dtdot": "\u22F1",
  "dtri": "\u25BF",
  "triangledown": "\u25BF",
  "dwangle": "\u29A6",
  "dzcy": "\u045F",
  "dzigrarr": "\u27FF",
  "eacute": "\xE9",
  "easter": "\u2A6E",
  "ecaron": "\u011B",
  "ecir": "\u2256",
  "eqcirc": "\u2256",
  "ecirc": "\xEA",
  "ecolon": "\u2255",
  "eqcolon": "\u2255",
  "ecy": "\u044D",
  "edot": "\u0117",
  "efDot": "\u2252",
  "fallingdotseq": "\u2252",
  "efr": "\u{1D522}",
  "eg": "\u2A9A",
  "egrave": "\xE8",
  "egs": "\u2A96",
  "eqslantgtr": "\u2A96",
  "egsdot": "\u2A98",
  "el": "\u2A99",
  "elinters": "\u23E7",
  "ell": "\u2113",
  "els": "\u2A95",
  "eqslantless": "\u2A95",
  "elsdot": "\u2A97",
  "emacr": "\u0113",
  "empty": "\u2205",
  "emptyset": "\u2205",
  "emptyv": "\u2205",
  "varnothing": "\u2205",
  "emsp13": "\u2004",
  "emsp14": "\u2005",
  "emsp": "\u2003",
  "eng": "\u014B",
  "ensp": "\u2002",
  "eogon": "\u0119",
  "eopf": "\u{1D556}",
  "epar": "\u22D5",
  "eparsl": "\u29E3",
  "eplus": "\u2A71",
  "epsi": "\u03B5",
  "epsilon": "\u03B5",
  "epsiv": "\u03F5",
  "straightepsilon": "\u03F5",
  "varepsilon": "\u03F5",
  "equals": "=",
  "equest": "\u225F",
  "questeq": "\u225F",
  "equivDD": "\u2A78",
  "eqvparsl": "\u29E5",
  "erDot": "\u2253",
  "risingdotseq": "\u2253",
  "erarr": "\u2971",
  "escr": "\u212F",
  "eta": "\u03B7",
  "eth": "\xF0",
  "euml": "\xEB",
  "euro": "\u20AC",
  "excl": "!",
  "fcy": "\u0444",
  "female": "\u2640",
  "ffilig": "\uFB03",
  "fflig": "\uFB00",
  "ffllig": "\uFB04",
  "ffr": "\u{1D523}",
  "filig": "\uFB01",
  "fjlig": "fj",
  "flat": "\u266D",
  "fllig": "\uFB02",
  "fltns": "\u25B1",
  "fnof": "\u0192",
  "fopf": "\u{1D557}",
  "fork": "\u22D4",
  "pitchfork": "\u22D4",
  "forkv": "\u2AD9",
  "fpartint": "\u2A0D",
  "frac12": "\xBD",
  "half": "\xBD",
  "frac13": "\u2153",
  "frac14": "\xBC",
  "frac15": "\u2155",
  "frac16": "\u2159",
  "frac18": "\u215B",
  "frac23": "\u2154",
  "frac25": "\u2156",
  "frac34": "\xBE",
  "frac35": "\u2157",
  "frac38": "\u215C",
  "frac45": "\u2158",
  "frac56": "\u215A",
  "frac58": "\u215D",
  "frac78": "\u215E",
  "frasl": "\u2044",
  "frown": "\u2322",
  "sfrown": "\u2322",
  "fscr": "\u{1D4BB}",
  "gEl": "\u2A8C",
  "gtreqqless": "\u2A8C",
  "gacute": "\u01F5",
  "gamma": "\u03B3",
  "gap": "\u2A86",
  "gtrapprox": "\u2A86",
  "gbreve": "\u011F",
  "gcirc": "\u011D",
  "gcy": "\u0433",
  "gdot": "\u0121",
  "gescc": "\u2AA9",
  "gesdot": "\u2A80",
  "gesdoto": "\u2A82",
  "gesdotol": "\u2A84",
  "gesl": "\u22DB\uFE00",
  "gesles": "\u2A94",
  "gfr": "\u{1D524}",
  "gimel": "\u2137",
  "gjcy": "\u0453",
  "glE": "\u2A92",
  "gla": "\u2AA5",
  "glj": "\u2AA4",
  "gnE": "\u2269",
  "gneqq": "\u2269",
  "gnap": "\u2A8A",
  "gnapprox": "\u2A8A",
  "gne": "\u2A88",
  "gneq": "\u2A88",
  "gnsim": "\u22E7",
  "gopf": "\u{1D558}",
  "gscr": "\u210A",
  "gsime": "\u2A8E",
  "gsiml": "\u2A90",
  "gtcc": "\u2AA7",
  "gtcir": "\u2A7A",
  "gtdot": "\u22D7",
  "gtrdot": "\u22D7",
  "gtlPar": "\u2995",
  "gtquest": "\u2A7C",
  "gtrarr": "\u2978",
  "gvertneqq": "\u2269\uFE00",
  "gvnE": "\u2269\uFE00",
  "hardcy": "\u044A",
  "harrcir": "\u2948",
  "harrw": "\u21AD",
  "leftrightsquigarrow": "\u21AD",
  "hbar": "\u210F",
  "hslash": "\u210F",
  "planck": "\u210F",
  "plankv": "\u210F",
  "hcirc": "\u0125",
  "hearts": "\u2665",
  "heartsuit": "\u2665",
  "hellip": "\u2026",
  "mldr": "\u2026",
  "hercon": "\u22B9",
  "hfr": "\u{1D525}",
  "hksearow": "\u2925",
  "searhk": "\u2925",
  "hkswarow": "\u2926",
  "swarhk": "\u2926",
  "hoarr": "\u21FF",
  "homtht": "\u223B",
  "hookleftarrow": "\u21A9",
  "larrhk": "\u21A9",
  "hookrightarrow": "\u21AA",
  "rarrhk": "\u21AA",
  "hopf": "\u{1D559}",
  "horbar": "\u2015",
  "hscr": "\u{1D4BD}",
  "hstrok": "\u0127",
  "hybull": "\u2043",
  "iacute": "\xED",
  "icirc": "\xEE",
  "icy": "\u0438",
  "iecy": "\u0435",
  "iexcl": "\xA1",
  "ifr": "\u{1D526}",
  "igrave": "\xEC",
  "iiiint": "\u2A0C",
  "qint": "\u2A0C",
  "iiint": "\u222D",
  "tint": "\u222D",
  "iinfin": "\u29DC",
  "iiota": "\u2129",
  "ijlig": "\u0133",
  "imacr": "\u012B",
  "imath": "\u0131",
  "inodot": "\u0131",
  "imof": "\u22B7",
  "imped": "\u01B5",
  "incare": "\u2105",
  "infin": "\u221E",
  "infintie": "\u29DD",
  "intcal": "\u22BA",
  "intercal": "\u22BA",
  "intlarhk": "\u2A17",
  "intprod": "\u2A3C",
  "iprod": "\u2A3C",
  "iocy": "\u0451",
  "iogon": "\u012F",
  "iopf": "\u{1D55A}",
  "iota": "\u03B9",
  "iquest": "\xBF",
  "iscr": "\u{1D4BE}",
  "isinE": "\u22F9",
  "isindot": "\u22F5",
  "isins": "\u22F4",
  "isinsv": "\u22F3",
  "itilde": "\u0129",
  "iukcy": "\u0456",
  "iuml": "\xEF",
  "jcirc": "\u0135",
  "jcy": "\u0439",
  "jfr": "\u{1D527}",
  "jmath": "\u0237",
  "jopf": "\u{1D55B}",
  "jscr": "\u{1D4BF}",
  "jsercy": "\u0458",
  "jukcy": "\u0454",
  "kappa": "\u03BA",
  "kappav": "\u03F0",
  "varkappa": "\u03F0",
  "kcedil": "\u0137",
  "kcy": "\u043A",
  "kfr": "\u{1D528}",
  "kgreen": "\u0138",
  "khcy": "\u0445",
  "kjcy": "\u045C",
  "kopf": "\u{1D55C}",
  "kscr": "\u{1D4C0}",
  "lAtail": "\u291B",
  "lBarr": "\u290E",
  "lEg": "\u2A8B",
  "lesseqqgtr": "\u2A8B",
  "lHar": "\u2962",
  "lacute": "\u013A",
  "laemptyv": "\u29B4",
  "lambda": "\u03BB",
  "langd": "\u2991",
  "lap": "\u2A85",
  "lessapprox": "\u2A85",
  "laquo": "\xAB",
  "larrbfs": "\u291F",
  "larrfs": "\u291D",
  "larrlp": "\u21AB",
  "looparrowleft": "\u21AB",
  "larrpl": "\u2939",
  "larrsim": "\u2973",
  "larrtl": "\u21A2",
  "leftarrowtail": "\u21A2",
  "lat": "\u2AAB",
  "latail": "\u2919",
  "late": "\u2AAD",
  "lates": "\u2AAD\uFE00",
  "lbarr": "\u290C",
  "lbbrk": "\u2772",
  "lbrace": "{",
  "lcub": "{",
  "lbrack": "[",
  "lsqb": "[",
  "lbrke": "\u298B",
  "lbrksld": "\u298F",
  "lbrkslu": "\u298D",
  "lcaron": "\u013E",
  "lcedil": "\u013C",
  "lcy": "\u043B",
  "ldca": "\u2936",
  "ldrdhar": "\u2967",
  "ldrushar": "\u294B",
  "ldsh": "\u21B2",
  "le": "\u2264",
  "leq": "\u2264",
  "leftleftarrows": "\u21C7",
  "llarr": "\u21C7",
  "leftthreetimes": "\u22CB",
  "lthree": "\u22CB",
  "lescc": "\u2AA8",
  "lesdot": "\u2A7F",
  "lesdoto": "\u2A81",
  "lesdotor": "\u2A83",
  "lesg": "\u22DA\uFE00",
  "lesges": "\u2A93",
  "lessdot": "\u22D6",
  "ltdot": "\u22D6",
  "lfisht": "\u297C",
  "lfr": "\u{1D529}",
  "lgE": "\u2A91",
  "lharul": "\u296A",
  "lhblk": "\u2584",
  "ljcy": "\u0459",
  "llhard": "\u296B",
  "lltri": "\u25FA",
  "lmidot": "\u0140",
  "lmoust": "\u23B0",
  "lmoustache": "\u23B0",
  "lnE": "\u2268",
  "lneqq": "\u2268",
  "lnap": "\u2A89",
  "lnapprox": "\u2A89",
  "lne": "\u2A87",
  "lneq": "\u2A87",
  "lnsim": "\u22E6",
  "loang": "\u27EC",
  "loarr": "\u21FD",
  "longmapsto": "\u27FC",
  "xmap": "\u27FC",
  "looparrowright": "\u21AC",
  "rarrlp": "\u21AC",
  "lopar": "\u2985",
  "lopf": "\u{1D55D}",
  "loplus": "\u2A2D",
  "lotimes": "\u2A34",
  "lowast": "\u2217",
  "loz": "\u25CA",
  "lozenge": "\u25CA",
  "lpar": "(",
  "lparlt": "\u2993",
  "lrhard": "\u296D",
  "lrm": "\u200E",
  "lrtri": "\u22BF",
  "lsaquo": "\u2039",
  "lscr": "\u{1D4C1}",
  "lsime": "\u2A8D",
  "lsimg": "\u2A8F",
  "lsquor": "\u201A",
  "sbquo": "\u201A",
  "lstrok": "\u0142",
  "ltcc": "\u2AA6",
  "ltcir": "\u2A79",
  "ltimes": "\u22C9",
  "ltlarr": "\u2976",
  "ltquest": "\u2A7B",
  "ltrPar": "\u2996",
  "ltri": "\u25C3",
  "triangleleft": "\u25C3",
  "lurdshar": "\u294A",
  "luruhar": "\u2966",
  "lvertneqq": "\u2268\uFE00",
  "lvnE": "\u2268\uFE00",
  "mDDot": "\u223A",
  "macr": "\xAF",
  "strns": "\xAF",
  "male": "\u2642",
  "malt": "\u2720",
  "maltese": "\u2720",
  "marker": "\u25AE",
  "mcomma": "\u2A29",
  "mcy": "\u043C",
  "mdash": "\u2014",
  "mfr": "\u{1D52A}",
  "mho": "\u2127",
  "micro": "\xB5",
  "midcir": "\u2AF0",
  "minus": "\u2212",
  "minusdu": "\u2A2A",
  "mlcp": "\u2ADB",
  "models": "\u22A7",
  "mopf": "\u{1D55E}",
  "mscr": "\u{1D4C2}",
  "mu": "\u03BC",
  "multimap": "\u22B8",
  "mumap": "\u22B8",
  "nGg": "\u22D9\u0338",
  "nGt": "\u226B\u20D2",
  "nLeftarrow": "\u21CD",
  "nlArr": "\u21CD",
  "nLeftrightarrow": "\u21CE",
  "nhArr": "\u21CE",
  "nLl": "\u22D8\u0338",
  "nLt": "\u226A\u20D2",
  "nRightarrow": "\u21CF",
  "nrArr": "\u21CF",
  "nVDash": "\u22AF",
  "nVdash": "\u22AE",
  "nacute": "\u0144",
  "nang": "\u2220\u20D2",
  "napE": "\u2A70\u0338",
  "napid": "\u224B\u0338",
  "napos": "\u0149",
  "natur": "\u266E",
  "natural": "\u266E",
  "ncap": "\u2A43",
  "ncaron": "\u0148",
  "ncedil": "\u0146",
  "ncongdot": "\u2A6D\u0338",
  "ncup": "\u2A42",
  "ncy": "\u043D",
  "ndash": "\u2013",
  "neArr": "\u21D7",
  "nearhk": "\u2924",
  "nedot": "\u2250\u0338",
  "nesear": "\u2928",
  "toea": "\u2928",
  "nfr": "\u{1D52B}",
  "nharr": "\u21AE",
  "nleftrightarrow": "\u21AE",
  "nhpar": "\u2AF2",
  "nis": "\u22FC",
  "nisd": "\u22FA",
  "njcy": "\u045A",
  "nlE": "\u2266\u0338",
  "nleqq": "\u2266\u0338",
  "nlarr": "\u219A",
  "nleftarrow": "\u219A",
  "nldr": "\u2025",
  "nopf": "\u{1D55F}",
  "not": "\xAC",
  "notinE": "\u22F9\u0338",
  "notindot": "\u22F5\u0338",
  "notinvb": "\u22F7",
  "notinvc": "\u22F6",
  "notnivb": "\u22FE",
  "notnivc": "\u22FD",
  "nparsl": "\u2AFD\u20E5",
  "npart": "\u2202\u0338",
  "npolint": "\u2A14",
  "nrarr": "\u219B",
  "nrightarrow": "\u219B",
  "nrarrc": "\u2933\u0338",
  "nrarrw": "\u219D\u0338",
  "nscr": "\u{1D4C3}",
  "nsub": "\u2284",
  "nsubE": "\u2AC5\u0338",
  "nsubseteqq": "\u2AC5\u0338",
  "nsup": "\u2285",
  "nsupE": "\u2AC6\u0338",
  "nsupseteqq": "\u2AC6\u0338",
  "ntilde": "\xF1",
  "nu": "\u03BD",
  "num": "#",
  "numero": "\u2116",
  "numsp": "\u2007",
  "nvDash": "\u22AD",
  "nvHarr": "\u2904",
  "nvap": "\u224D\u20D2",
  "nvdash": "\u22AC",
  "nvge": "\u2265\u20D2",
  "nvgt": ">\u20D2",
  "nvinfin": "\u29DE",
  "nvlArr": "\u2902",
  "nvle": "\u2264\u20D2",
  "nvlt": "<\u20D2",
  "nvltrie": "\u22B4\u20D2",
  "nvrArr": "\u2903",
  "nvrtrie": "\u22B5\u20D2",
  "nvsim": "\u223C\u20D2",
  "nwArr": "\u21D6",
  "nwarhk": "\u2923",
  "nwnear": "\u2927",
  "oacute": "\xF3",
  "ocirc": "\xF4",
  "ocy": "\u043E",
  "odblac": "\u0151",
  "odiv": "\u2A38",
  "odsold": "\u29BC",
  "oelig": "\u0153",
  "ofcir": "\u29BF",
  "ofr": "\u{1D52C}",
  "ogon": "\u02DB",
  "ograve": "\xF2",
  "ogt": "\u29C1",
  "ohbar": "\u29B5",
  "olcir": "\u29BE",
  "olcross": "\u29BB",
  "olt": "\u29C0",
  "omacr": "\u014D",
  "omega": "\u03C9",
  "omicron": "\u03BF",
  "omid": "\u29B6",
  "oopf": "\u{1D560}",
  "opar": "\u29B7",
  "operp": "\u29B9",
  "or": "\u2228",
  "vee": "\u2228",
  "ord": "\u2A5D",
  "order": "\u2134",
  "orderof": "\u2134",
  "oscr": "\u2134",
  "ordf": "\xAA",
  "ordm": "\xBA",
  "origof": "\u22B6",
  "oror": "\u2A56",
  "orslope": "\u2A57",
  "orv": "\u2A5B",
  "oslash": "\xF8",
  "osol": "\u2298",
  "otilde": "\xF5",
  "otimesas": "\u2A36",
  "ouml": "\xF6",
  "ovbar": "\u233D",
  "para": "\xB6",
  "parsim": "\u2AF3",
  "parsl": "\u2AFD",
  "pcy": "\u043F",
  "percnt": "%",
  "period": ".",
  "permil": "\u2030",
  "pertenk": "\u2031",
  "pfr": "\u{1D52D}",
  "phi": "\u03C6",
  "phiv": "\u03D5",
  "straightphi": "\u03D5",
  "varphi": "\u03D5",
  "phone": "\u260E",
  "pi": "\u03C0",
  "piv": "\u03D6",
  "varpi": "\u03D6",
  "planckh": "\u210E",
  "plus": "+",
  "plusacir": "\u2A23",
  "pluscir": "\u2A22",
  "plusdu": "\u2A25",
  "pluse": "\u2A72",
  "plussim": "\u2A26",
  "plustwo": "\u2A27",
  "pointint": "\u2A15",
  "popf": "\u{1D561}",
  "pound": "\xA3",
  "prE": "\u2AB3",
  "prap": "\u2AB7",
  "precapprox": "\u2AB7",
  "precnapprox": "\u2AB9",
  "prnap": "\u2AB9",
  "precneqq": "\u2AB5",
  "prnE": "\u2AB5",
  "precnsim": "\u22E8",
  "prnsim": "\u22E8",
  "prime": "\u2032",
  "profalar": "\u232E",
  "profline": "\u2312",
  "profsurf": "\u2313",
  "prurel": "\u22B0",
  "pscr": "\u{1D4C5}",
  "psi": "\u03C8",
  "puncsp": "\u2008",
  "qfr": "\u{1D52E}",
  "qopf": "\u{1D562}",
  "qprime": "\u2057",
  "qscr": "\u{1D4C6}",
  "quatint": "\u2A16",
  "quest": "?",
  "rAtail": "\u291C",
  "rHar": "\u2964",
  "race": "\u223D\u0331",
  "racute": "\u0155",
  "raemptyv": "\u29B3",
  "rangd": "\u2992",
  "range": "\u29A5",
  "raquo": "\xBB",
  "rarrap": "\u2975",
  "rarrbfs": "\u2920",
  "rarrc": "\u2933",
  "rarrfs": "\u291E",
  "rarrpl": "\u2945",
  "rarrsim": "\u2974",
  "rarrtl": "\u21A3",
  "rightarrowtail": "\u21A3",
  "rarrw": "\u219D",
  "rightsquigarrow": "\u219D",
  "ratail": "\u291A",
  "ratio": "\u2236",
  "rbbrk": "\u2773",
  "rbrace": "}",
  "rcub": "}",
  "rbrack": "]",
  "rsqb": "]",
  "rbrke": "\u298C",
  "rbrksld": "\u298E",
  "rbrkslu": "\u2990",
  "rcaron": "\u0159",
  "rcedil": "\u0157",
  "rcy": "\u0440",
  "rdca": "\u2937",
  "rdldhar": "\u2969",
  "rdsh": "\u21B3",
  "rect": "\u25AD",
  "rfisht": "\u297D",
  "rfr": "\u{1D52F}",
  "rharul": "\u296C",
  "rho": "\u03C1",
  "rhov": "\u03F1",
  "varrho": "\u03F1",
  "rightrightarrows": "\u21C9",
  "rrarr": "\u21C9",
  "rightthreetimes": "\u22CC",
  "rthree": "\u22CC",
  "ring": "\u02DA",
  "rlm": "\u200F",
  "rmoust": "\u23B1",
  "rmoustache": "\u23B1",
  "rnmid": "\u2AEE",
  "roang": "\u27ED",
  "roarr": "\u21FE",
  "ropar": "\u2986",
  "ropf": "\u{1D563}",
  "roplus": "\u2A2E",
  "rotimes": "\u2A35",
  "rpar": ")",
  "rpargt": "\u2994",
  "rppolint": "\u2A12",
  "rsaquo": "\u203A",
  "rscr": "\u{1D4C7}",
  "rtimes": "\u22CA",
  "rtri": "\u25B9",
  "triangleright": "\u25B9",
  "rtriltri": "\u29CE",
  "ruluhar": "\u2968",
  "rx": "\u211E",
  "sacute": "\u015B",
  "scE": "\u2AB4",
  "scap": "\u2AB8",
  "succapprox": "\u2AB8",
  "scaron": "\u0161",
  "scedil": "\u015F",
  "scirc": "\u015D",
  "scnE": "\u2AB6",
  "succneqq": "\u2AB6",
  "scnap": "\u2ABA",
  "succnapprox": "\u2ABA",
  "scnsim": "\u22E9",
  "succnsim": "\u22E9",
  "scpolint": "\u2A13",
  "scy": "\u0441",
  "sdot": "\u22C5",
  "sdote": "\u2A66",
  "seArr": "\u21D8",
  "sect": "\xA7",
  "semi": ";",
  "seswar": "\u2929",
  "tosa": "\u2929",
  "sext": "\u2736",
  "sfr": "\u{1D530}",
  "sharp": "\u266F",
  "shchcy": "\u0449",
  "shcy": "\u0448",
  "shy": "\xAD",
  "sigma": "\u03C3",
  "sigmaf": "\u03C2",
  "sigmav": "\u03C2",
  "varsigma": "\u03C2",
  "simdot": "\u2A6A",
  "simg": "\u2A9E",
  "simgE": "\u2AA0",
  "siml": "\u2A9D",
  "simlE": "\u2A9F",
  "simne": "\u2246",
  "simplus": "\u2A24",
  "simrarr": "\u2972",
  "smashp": "\u2A33",
  "smeparsl": "\u29E4",
  "smile": "\u2323",
  "ssmile": "\u2323",
  "smt": "\u2AAA",
  "smte": "\u2AAC",
  "smtes": "\u2AAC\uFE00",
  "softcy": "\u044C",
  "sol": "/",
  "solb": "\u29C4",
  "solbar": "\u233F",
  "sopf": "\u{1D564}",
  "spades": "\u2660",
  "spadesuit": "\u2660",
  "sqcaps": "\u2293\uFE00",
  "sqcups": "\u2294\uFE00",
  "sscr": "\u{1D4C8}",
  "star": "\u2606",
  "sub": "\u2282",
  "subset": "\u2282",
  "subE": "\u2AC5",
  "subseteqq": "\u2AC5",
  "subdot": "\u2ABD",
  "subedot": "\u2AC3",
  "submult": "\u2AC1",
  "subnE": "\u2ACB",
  "subsetneqq": "\u2ACB",
  "subne": "\u228A",
  "subsetneq": "\u228A",
  "subplus": "\u2ABF",
  "subrarr": "\u2979",
  "subsim": "\u2AC7",
  "subsub": "\u2AD5",
  "subsup": "\u2AD3",
  "sung": "\u266A",
  "sup1": "\xB9",
  "sup2": "\xB2",
  "sup3": "\xB3",
  "supE": "\u2AC6",
  "supseteqq": "\u2AC6",
  "supdot": "\u2ABE",
  "supdsub": "\u2AD8",
  "supedot": "\u2AC4",
  "suphsol": "\u27C9",
  "suphsub": "\u2AD7",
  "suplarr": "\u297B",
  "supmult": "\u2AC2",
  "supnE": "\u2ACC",
  "supsetneqq": "\u2ACC",
  "supne": "\u228B",
  "supsetneq": "\u228B",
  "supplus": "\u2AC0",
  "supsim": "\u2AC8",
  "supsub": "\u2AD4",
  "supsup": "\u2AD6",
  "swArr": "\u21D9",
  "swnwar": "\u292A",
  "szlig": "\xDF",
  "target": "\u2316",
  "tau": "\u03C4",
  "tcaron": "\u0165",
  "tcedil": "\u0163",
  "tcy": "\u0442",
  "telrec": "\u2315",
  "tfr": "\u{1D531}",
  "theta": "\u03B8",
  "thetasym": "\u03D1",
  "thetav": "\u03D1",
  "vartheta": "\u03D1",
  "thorn": "\xFE",
  "times": "\xD7",
  "timesbar": "\u2A31",
  "timesd": "\u2A30",
  "topbot": "\u2336",
  "topcir": "\u2AF1",
  "topf": "\u{1D565}",
  "topfork": "\u2ADA",
  "tprime": "\u2034",
  "triangle": "\u25B5",
  "utri": "\u25B5",
  "triangleq": "\u225C",
  "trie": "\u225C",
  "tridot": "\u25EC",
  "triminus": "\u2A3A",
  "triplus": "\u2A39",
  "trisb": "\u29CD",
  "tritime": "\u2A3B",
  "trpezium": "\u23E2",
  "tscr": "\u{1D4C9}",
  "tscy": "\u0446",
  "tshcy": "\u045B",
  "tstrok": "\u0167",
  "uHar": "\u2963",
  "uacute": "\xFA",
  "ubrcy": "\u045E",
  "ubreve": "\u016D",
  "ucirc": "\xFB",
  "ucy": "\u0443",
  "udblac": "\u0171",
  "ufisht": "\u297E",
  "ufr": "\u{1D532}",
  "ugrave": "\xF9",
  "uhblk": "\u2580",
  "ulcorn": "\u231C",
  "ulcorner": "\u231C",
  "ulcrop": "\u230F",
  "ultri": "\u25F8",
  "umacr": "\u016B",
  "uogon": "\u0173",
  "uopf": "\u{1D566}",
  "upsi": "\u03C5",
  "upsilon": "\u03C5",
  "upuparrows": "\u21C8",
  "uuarr": "\u21C8",
  "urcorn": "\u231D",
  "urcorner": "\u231D",
  "urcrop": "\u230E",
  "uring": "\u016F",
  "urtri": "\u25F9",
  "uscr": "\u{1D4CA}",
  "utdot": "\u22F0",
  "utilde": "\u0169",
  "uuml": "\xFC",
  "uwangle": "\u29A7",
  "vBar": "\u2AE8",
  "vBarv": "\u2AE9",
  "vangrt": "\u299C",
  "varsubsetneq": "\u228A\uFE00",
  "vsubne": "\u228A\uFE00",
  "varsubsetneqq": "\u2ACB\uFE00",
  "vsubnE": "\u2ACB\uFE00",
  "varsupsetneq": "\u228B\uFE00",
  "vsupne": "\u228B\uFE00",
  "varsupsetneqq": "\u2ACC\uFE00",
  "vsupnE": "\u2ACC\uFE00",
  "vcy": "\u0432",
  "veebar": "\u22BB",
  "veeeq": "\u225A",
  "vellip": "\u22EE",
  "vfr": "\u{1D533}",
  "vopf": "\u{1D567}",
  "vscr": "\u{1D4CB}",
  "vzigzag": "\u299A",
  "wcirc": "\u0175",
  "wedbar": "\u2A5F",
  "wedgeq": "\u2259",
  "weierp": "\u2118",
  "wp": "\u2118",
  "wfr": "\u{1D534}",
  "wopf": "\u{1D568}",
  "wscr": "\u{1D4CC}",
  "xfr": "\u{1D535}",
  "xi": "\u03BE",
  "xnis": "\u22FB",
  "xopf": "\u{1D569}",
  "xscr": "\u{1D4CD}",
  "yacute": "\xFD",
  "yacy": "\u044F",
  "ycirc": "\u0177",
  "ycy": "\u044B",
  "yen": "\xA5",
  "yfr": "\u{1D536}",
  "yicy": "\u0457",
  "yopf": "\u{1D56A}",
  "yscr": "\u{1D4CE}",
  "yucy": "\u044E",
  "yuml": "\xFF",
  "zacute": "\u017A",
  "zcaron": "\u017E",
  "zcy": "\u0437",
  "zdot": "\u017C",
  "zeta": "\u03B6",
  "zfr": "\u{1D537}",
  "zhcy": "\u0436",
  "zigrarr": "\u21DD",
  "zopf": "\u{1D56B}",
  "zscr": "\u{1D4CF}",
  "zwj": "\u200D",
  "zwnj": "\u200C"
};
var NGSP_UNICODE = "\uE500";
NAMED_ENTITIES["ngsp"] = NGSP_UNICODE;
var TokenError = class extends ParseError {
  constructor(errorMsg, tokenType, span) {
    super(span, errorMsg);
    this.tokenType = tokenType;
  }
};
var TokenizeResult = class {
  constructor(tokens, errors, nonNormalizedIcuExpressions) {
    this.tokens = tokens;
    this.errors = errors;
    this.nonNormalizedIcuExpressions = nonNormalizedIcuExpressions;
  }
};
function tokenize(source, url, getTagDefinition, options = {}) {
  const tokenizer = new _Tokenizer(new ParseSourceFile(source, url), getTagDefinition, options);
  tokenizer.tokenize();
  return new TokenizeResult(mergeTextTokens(tokenizer.tokens), tokenizer.errors, tokenizer.nonNormalizedIcuExpressions);
}
var _CR_OR_CRLF_REGEXP = /\r\n?/g;
function _unexpectedCharacterErrorMsg(charCode) {
  const char = charCode === $EOF ? "EOF" : String.fromCharCode(charCode);
  return `Unexpected character "${char}"`;
}
function _unknownEntityErrorMsg(entitySrc) {
  return `Unknown entity "${entitySrc}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
function _unparsableEntityErrorMsg(type, entityStr) {
  return `Unable to parse entity "${entityStr}" - ${type} character reference entities must end with ";"`;
}
var CharacterReferenceType;
(function(CharacterReferenceType2) {
  CharacterReferenceType2["HEX"] = "hexadecimal";
  CharacterReferenceType2["DEC"] = "decimal";
})(CharacterReferenceType || (CharacterReferenceType = {}));
var _ControlFlowError = class {
  constructor(error2) {
    this.error = error2;
  }
};
var _Tokenizer = class {
  constructor(_file, _getTagDefinition, options) {
    this._getTagDefinition = _getTagDefinition;
    this._currentTokenStart = null;
    this._currentTokenType = null;
    this._expansionCaseStack = [];
    this._inInterpolation = false;
    this.tokens = [];
    this.errors = [];
    this.nonNormalizedIcuExpressions = [];
    this._tokenizeIcu = options.tokenizeExpansionForms || false;
    this._interpolationConfig = options.interpolationConfig || DEFAULT_INTERPOLATION_CONFIG;
    this._leadingTriviaCodePoints = options.leadingTriviaChars && options.leadingTriviaChars.map((c) => c.codePointAt(0) || 0);
    const range = options.range || { endPos: _file.content.length, startPos: 0, startLine: 0, startCol: 0 };
    this._cursor = options.escapedString ? new EscapedCharacterCursor(_file, range) : new PlainCharacterCursor(_file, range);
    this._preserveLineEndings = options.preserveLineEndings || false;
    this._escapedString = options.escapedString || false;
    this._i18nNormalizeLineEndingsInICUs = options.i18nNormalizeLineEndingsInICUs || false;
    try {
      this._cursor.init();
    } catch (e) {
      this.handleError(e);
    }
  }
  _processCarriageReturns(content) {
    if (this._preserveLineEndings) {
      return content;
    }
    return content.replace(_CR_OR_CRLF_REGEXP, "\n");
  }
  tokenize() {
    while (this._cursor.peek() !== $EOF) {
      const start = this._cursor.clone();
      try {
        if (this._attemptCharCode($LT)) {
          if (this._attemptCharCode($BANG)) {
            if (this._attemptCharCode($LBRACKET)) {
              this._consumeCdata(start);
            } else if (this._attemptCharCode($MINUS)) {
              this._consumeComment(start);
            } else {
              this._consumeDocType(start);
            }
          } else if (this._attemptCharCode($SLASH)) {
            this._consumeTagClose(start);
          } else {
            this._consumeTagOpen(start);
          }
        } else if (!(this._tokenizeIcu && this._tokenizeExpansionForm())) {
          this._consumeWithInterpolation(5, 8, () => this._isTextEnd(), () => this._isTagStart());
        }
      } catch (e) {
        this.handleError(e);
      }
    }
    this._beginToken(24);
    this._endToken([]);
  }
  _tokenizeExpansionForm() {
    if (this.isExpansionFormStart()) {
      this._consumeExpansionFormStart();
      return true;
    }
    if (isExpansionCaseStart(this._cursor.peek()) && this._isInExpansionForm()) {
      this._consumeExpansionCaseStart();
      return true;
    }
    if (this._cursor.peek() === $RBRACE) {
      if (this._isInExpansionCase()) {
        this._consumeExpansionCaseEnd();
        return true;
      }
      if (this._isInExpansionForm()) {
        this._consumeExpansionFormEnd();
        return true;
      }
    }
    return false;
  }
  _beginToken(type, start = this._cursor.clone()) {
    this._currentTokenStart = start;
    this._currentTokenType = type;
  }
  _endToken(parts, end) {
    if (this._currentTokenStart === null) {
      throw new TokenError("Programming error - attempted to end a token when there was no start to the token", this._currentTokenType, this._cursor.getSpan(end));
    }
    if (this._currentTokenType === null) {
      throw new TokenError("Programming error - attempted to end a token which has no token type", null, this._cursor.getSpan(this._currentTokenStart));
    }
    const token = {
      type: this._currentTokenType,
      parts,
      sourceSpan: (end !== null && end !== void 0 ? end : this._cursor).getSpan(this._currentTokenStart, this._leadingTriviaCodePoints)
    };
    this.tokens.push(token);
    this._currentTokenStart = null;
    this._currentTokenType = null;
    return token;
  }
  _createError(msg, span) {
    if (this._isInExpansionForm()) {
      msg += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`;
    }
    const error2 = new TokenError(msg, this._currentTokenType, span);
    this._currentTokenStart = null;
    this._currentTokenType = null;
    return new _ControlFlowError(error2);
  }
  handleError(e) {
    if (e instanceof CursorError) {
      e = this._createError(e.msg, this._cursor.getSpan(e.cursor));
    }
    if (e instanceof _ControlFlowError) {
      this.errors.push(e.error);
    } else {
      throw e;
    }
  }
  _attemptCharCode(charCode) {
    if (this._cursor.peek() === charCode) {
      this._cursor.advance();
      return true;
    }
    return false;
  }
  _attemptCharCodeCaseInsensitive(charCode) {
    if (compareCharCodeCaseInsensitive(this._cursor.peek(), charCode)) {
      this._cursor.advance();
      return true;
    }
    return false;
  }
  _requireCharCode(charCode) {
    const location = this._cursor.clone();
    if (!this._attemptCharCode(charCode)) {
      throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(location));
    }
  }
  _attemptStr(chars) {
    const len = chars.length;
    if (this._cursor.charsLeft() < len) {
      return false;
    }
    const initialPosition = this._cursor.clone();
    for (let i = 0; i < len; i++) {
      if (!this._attemptCharCode(chars.charCodeAt(i))) {
        this._cursor = initialPosition;
        return false;
      }
    }
    return true;
  }
  _attemptStrCaseInsensitive(chars) {
    for (let i = 0; i < chars.length; i++) {
      if (!this._attemptCharCodeCaseInsensitive(chars.charCodeAt(i))) {
        return false;
      }
    }
    return true;
  }
  _requireStr(chars) {
    const location = this._cursor.clone();
    if (!this._attemptStr(chars)) {
      throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(location));
    }
  }
  _attemptCharCodeUntilFn(predicate) {
    while (!predicate(this._cursor.peek())) {
      this._cursor.advance();
    }
  }
  _requireCharCodeUntilFn(predicate, len) {
    const start = this._cursor.clone();
    this._attemptCharCodeUntilFn(predicate);
    if (this._cursor.diff(start) < len) {
      throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(start));
    }
  }
  _attemptUntilChar(char) {
    while (this._cursor.peek() !== char) {
      this._cursor.advance();
    }
  }
  _readChar() {
    const char = String.fromCodePoint(this._cursor.peek());
    this._cursor.advance();
    return char;
  }
  _consumeEntity(textTokenType) {
    this._beginToken(9);
    const start = this._cursor.clone();
    this._cursor.advance();
    if (this._attemptCharCode($HASH)) {
      const isHex = this._attemptCharCode($x) || this._attemptCharCode($X);
      const codeStart = this._cursor.clone();
      this._attemptCharCodeUntilFn(isDigitEntityEnd);
      if (this._cursor.peek() != $SEMICOLON) {
        this._cursor.advance();
        const entityType = isHex ? CharacterReferenceType.HEX : CharacterReferenceType.DEC;
        throw this._createError(_unparsableEntityErrorMsg(entityType, this._cursor.getChars(start)), this._cursor.getSpan());
      }
      const strNum = this._cursor.getChars(codeStart);
      this._cursor.advance();
      try {
        const charCode = parseInt(strNum, isHex ? 16 : 10);
        this._endToken([String.fromCharCode(charCode), this._cursor.getChars(start)]);
      } catch (_a) {
        throw this._createError(_unknownEntityErrorMsg(this._cursor.getChars(start)), this._cursor.getSpan());
      }
    } else {
      const nameStart = this._cursor.clone();
      this._attemptCharCodeUntilFn(isNamedEntityEnd);
      if (this._cursor.peek() != $SEMICOLON) {
        this._beginToken(textTokenType, start);
        this._cursor = nameStart;
        this._endToken(["&"]);
      } else {
        const name = this._cursor.getChars(nameStart);
        this._cursor.advance();
        const char = NAMED_ENTITIES[name];
        if (!char) {
          throw this._createError(_unknownEntityErrorMsg(name), this._cursor.getSpan(start));
        }
        this._endToken([char, `&${name};`]);
      }
    }
  }
  _consumeRawText(consumeEntities, endMarkerPredicate) {
    this._beginToken(consumeEntities ? 6 : 7);
    const parts = [];
    while (true) {
      const tagCloseStart = this._cursor.clone();
      const foundEndMarker = endMarkerPredicate();
      this._cursor = tagCloseStart;
      if (foundEndMarker) {
        break;
      }
      if (consumeEntities && this._cursor.peek() === $AMPERSAND) {
        this._endToken([this._processCarriageReturns(parts.join(""))]);
        parts.length = 0;
        this._consumeEntity(6);
        this._beginToken(6);
      } else {
        parts.push(this._readChar());
      }
    }
    this._endToken([this._processCarriageReturns(parts.join(""))]);
  }
  _consumeComment(start) {
    this._beginToken(10, start);
    this._requireCharCode($MINUS);
    this._endToken([]);
    this._consumeRawText(false, () => this._attemptStr("-->"));
    this._beginToken(11);
    this._requireStr("-->");
    this._endToken([]);
  }
  _consumeCdata(start) {
    this._beginToken(12, start);
    this._requireStr("CDATA[");
    this._endToken([]);
    this._consumeRawText(false, () => this._attemptStr("]]>"));
    this._beginToken(13);
    this._requireStr("]]>");
    this._endToken([]);
  }
  _consumeDocType(start) {
    this._beginToken(18, start);
    const contentStart = this._cursor.clone();
    this._attemptUntilChar($GT);
    const content = this._cursor.getChars(contentStart);
    this._cursor.advance();
    this._endToken([content]);
  }
  _consumePrefixAndName() {
    const nameOrPrefixStart = this._cursor.clone();
    let prefix = "";
    while (this._cursor.peek() !== $COLON && !isPrefixEnd(this._cursor.peek())) {
      this._cursor.advance();
    }
    let nameStart;
    if (this._cursor.peek() === $COLON) {
      prefix = this._cursor.getChars(nameOrPrefixStart);
      this._cursor.advance();
      nameStart = this._cursor.clone();
    } else {
      nameStart = nameOrPrefixStart;
    }
    this._requireCharCodeUntilFn(isNameEnd, prefix === "" ? 0 : 1);
    const name = this._cursor.getChars(nameStart);
    return [prefix, name];
  }
  _consumeTagOpen(start) {
    let tagName;
    let prefix;
    let openTagToken;
    try {
      if (!isAsciiLetter(this._cursor.peek())) {
        throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(start));
      }
      openTagToken = this._consumeTagOpenStart(start);
      prefix = openTagToken.parts[0];
      tagName = openTagToken.parts[1];
      this._attemptCharCodeUntilFn(isNotWhitespace);
      while (this._cursor.peek() !== $SLASH && this._cursor.peek() !== $GT && this._cursor.peek() !== $LT && this._cursor.peek() !== $EOF) {
        this._consumeAttributeName();
        this._attemptCharCodeUntilFn(isNotWhitespace);
        if (this._attemptCharCode($EQ)) {
          this._attemptCharCodeUntilFn(isNotWhitespace);
          this._consumeAttributeValue();
        }
        this._attemptCharCodeUntilFn(isNotWhitespace);
      }
      this._consumeTagOpenEnd();
    } catch (e) {
      if (e instanceof _ControlFlowError) {
        if (openTagToken) {
          openTagToken.type = 4;
        } else {
          this._beginToken(5, start);
          this._endToken(["<"]);
        }
        return;
      }
      throw e;
    }
    const contentTokenType = this._getTagDefinition(tagName).getContentType(prefix);
    if (contentTokenType === TagContentType.RAW_TEXT) {
      this._consumeRawTextWithTagClose(prefix, tagName, false);
    } else if (contentTokenType === TagContentType.ESCAPABLE_RAW_TEXT) {
      this._consumeRawTextWithTagClose(prefix, tagName, true);
    }
  }
  _consumeRawTextWithTagClose(prefix, tagName, consumeEntities) {
    this._consumeRawText(consumeEntities, () => {
      if (!this._attemptCharCode($LT))
        return false;
      if (!this._attemptCharCode($SLASH))
        return false;
      this._attemptCharCodeUntilFn(isNotWhitespace);
      if (!this._attemptStrCaseInsensitive(tagName))
        return false;
      this._attemptCharCodeUntilFn(isNotWhitespace);
      return this._attemptCharCode($GT);
    });
    this._beginToken(3);
    this._requireCharCodeUntilFn((code) => code === $GT, 3);
    this._cursor.advance();
    this._endToken([prefix, tagName]);
  }
  _consumeTagOpenStart(start) {
    this._beginToken(0, start);
    const parts = this._consumePrefixAndName();
    return this._endToken(parts);
  }
  _consumeAttributeName() {
    const attrNameStart = this._cursor.peek();
    if (attrNameStart === $SQ || attrNameStart === $DQ) {
      throw this._createError(_unexpectedCharacterErrorMsg(attrNameStart), this._cursor.getSpan());
    }
    this._beginToken(14);
    const prefixAndName = this._consumePrefixAndName();
    this._endToken(prefixAndName);
  }
  _consumeAttributeValue() {
    let value;
    if (this._cursor.peek() === $SQ || this._cursor.peek() === $DQ) {
      const quoteChar = this._cursor.peek();
      this._consumeQuote(quoteChar);
      const endPredicate = () => this._cursor.peek() === quoteChar;
      this._consumeWithInterpolation(16, 17, endPredicate, endPredicate);
      this._consumeQuote(quoteChar);
    } else {
      const endPredicate = () => isNameEnd(this._cursor.peek());
      this._consumeWithInterpolation(16, 17, endPredicate, endPredicate);
    }
  }
  _consumeQuote(quoteChar) {
    this._beginToken(15);
    this._requireCharCode(quoteChar);
    this._endToken([String.fromCodePoint(quoteChar)]);
  }
  _consumeTagOpenEnd() {
    const tokenType = this._attemptCharCode($SLASH) ? 2 : 1;
    this._beginToken(tokenType);
    this._requireCharCode($GT);
    this._endToken([]);
  }
  _consumeTagClose(start) {
    this._beginToken(3, start);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    const prefixAndName = this._consumePrefixAndName();
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._requireCharCode($GT);
    this._endToken(prefixAndName);
  }
  _consumeExpansionFormStart() {
    this._beginToken(19);
    this._requireCharCode($LBRACE);
    this._endToken([]);
    this._expansionCaseStack.push(19);
    this._beginToken(7);
    const condition = this._readUntil($COMMA);
    const normalizedCondition = this._processCarriageReturns(condition);
    if (this._i18nNormalizeLineEndingsInICUs) {
      this._endToken([normalizedCondition]);
    } else {
      const conditionToken = this._endToken([condition]);
      if (normalizedCondition !== condition) {
        this.nonNormalizedIcuExpressions.push(conditionToken);
      }
    }
    this._requireCharCode($COMMA);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._beginToken(7);
    const type = this._readUntil($COMMA);
    this._endToken([type]);
    this._requireCharCode($COMMA);
    this._attemptCharCodeUntilFn(isNotWhitespace);
  }
  _consumeExpansionCaseStart() {
    this._beginToken(20);
    const value = this._readUntil($LBRACE).trim();
    this._endToken([value]);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._beginToken(21);
    this._requireCharCode($LBRACE);
    this._endToken([]);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._expansionCaseStack.push(21);
  }
  _consumeExpansionCaseEnd() {
    this._beginToken(22);
    this._requireCharCode($RBRACE);
    this._endToken([]);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._expansionCaseStack.pop();
  }
  _consumeExpansionFormEnd() {
    this._beginToken(23);
    this._requireCharCode($RBRACE);
    this._endToken([]);
    this._expansionCaseStack.pop();
  }
  _consumeWithInterpolation(textTokenType, interpolationTokenType, endPredicate, endInterpolation) {
    this._beginToken(textTokenType);
    const parts = [];
    while (!endPredicate()) {
      const current = this._cursor.clone();
      if (this._interpolationConfig && this._attemptStr(this._interpolationConfig.start)) {
        this._endToken([this._processCarriageReturns(parts.join(""))], current);
        parts.length = 0;
        this._consumeInterpolation(interpolationTokenType, current, endInterpolation);
        this._beginToken(textTokenType);
      } else if (this._cursor.peek() === $AMPERSAND) {
        this._endToken([this._processCarriageReturns(parts.join(""))]);
        parts.length = 0;
        this._consumeEntity(textTokenType);
        this._beginToken(textTokenType);
      } else {
        parts.push(this._readChar());
      }
    }
    this._inInterpolation = false;
    this._endToken([this._processCarriageReturns(parts.join(""))]);
  }
  _consumeInterpolation(interpolationTokenType, interpolationStart, prematureEndPredicate) {
    const parts = [];
    this._beginToken(interpolationTokenType, interpolationStart);
    parts.push(this._interpolationConfig.start);
    const expressionStart = this._cursor.clone();
    let inQuote = null;
    let inComment = false;
    while (this._cursor.peek() !== $EOF && (prematureEndPredicate === null || !prematureEndPredicate())) {
      const current = this._cursor.clone();
      if (this._isTagStart()) {
        this._cursor = current;
        parts.push(this._getProcessedChars(expressionStart, current));
        this._endToken(parts);
        return;
      }
      if (inQuote === null) {
        if (this._attemptStr(this._interpolationConfig.end)) {
          parts.push(this._getProcessedChars(expressionStart, current));
          parts.push(this._interpolationConfig.end);
          this._endToken(parts);
          return;
        } else if (this._attemptStr("//")) {
          inComment = true;
        }
      }
      const char = this._cursor.peek();
      this._cursor.advance();
      if (char === $BACKSLASH) {
        this._cursor.advance();
      } else if (char === inQuote) {
        inQuote = null;
      } else if (!inComment && inQuote === null && isQuote(char)) {
        inQuote = char;
      }
    }
    parts.push(this._getProcessedChars(expressionStart, this._cursor));
    this._endToken(parts);
  }
  _getProcessedChars(start, end) {
    return this._processCarriageReturns(end.getChars(start));
  }
  _isTextEnd() {
    if (this._isTagStart() || this._cursor.peek() === $EOF) {
      return true;
    }
    if (this._tokenizeIcu && !this._inInterpolation) {
      if (this.isExpansionFormStart()) {
        return true;
      }
      if (this._cursor.peek() === $RBRACE && this._isInExpansionCase()) {
        return true;
      }
    }
    return false;
  }
  _isTagStart() {
    if (this._cursor.peek() === $LT) {
      const tmp = this._cursor.clone();
      tmp.advance();
      const code = tmp.peek();
      if ($a <= code && code <= $z || $A <= code && code <= $Z || code === $SLASH || code === $BANG) {
        return true;
      }
    }
    return false;
  }
  _readUntil(char) {
    const start = this._cursor.clone();
    this._attemptUntilChar(char);
    return this._cursor.getChars(start);
  }
  _isInExpansionCase() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 21;
  }
  _isInExpansionForm() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 19;
  }
  isExpansionFormStart() {
    if (this._cursor.peek() !== $LBRACE) {
      return false;
    }
    if (this._interpolationConfig) {
      const start = this._cursor.clone();
      const isInterpolation = this._attemptStr(this._interpolationConfig.start);
      this._cursor = start;
      return !isInterpolation;
    }
    return true;
  }
};
function isNotWhitespace(code) {
  return !isWhitespace(code) || code === $EOF;
}
function isNameEnd(code) {
  return isWhitespace(code) || code === $GT || code === $LT || code === $SLASH || code === $SQ || code === $DQ || code === $EQ || code === $EOF;
}
function isPrefixEnd(code) {
  return (code < $a || $z < code) && (code < $A || $Z < code) && (code < $0 || code > $9);
}
function isDigitEntityEnd(code) {
  return code === $SEMICOLON || code === $EOF || !isAsciiHexDigit(code);
}
function isNamedEntityEnd(code) {
  return code === $SEMICOLON || code === $EOF || !isAsciiLetter(code);
}
function isExpansionCaseStart(peek) {
  return peek !== $RBRACE;
}
function compareCharCodeCaseInsensitive(code1, code2) {
  return toUpperCaseCharCode(code1) === toUpperCaseCharCode(code2);
}
function toUpperCaseCharCode(code) {
  return code >= $a && code <= $z ? code - $a + $A : code;
}
function mergeTextTokens(srcTokens) {
  const dstTokens = [];
  let lastDstToken = void 0;
  for (let i = 0; i < srcTokens.length; i++) {
    const token = srcTokens[i];
    if (lastDstToken && lastDstToken.type === 5 && token.type === 5 || lastDstToken && lastDstToken.type === 16 && token.type === 16) {
      lastDstToken.parts[0] += token.parts[0];
      lastDstToken.sourceSpan.end = token.sourceSpan.end;
    } else {
      lastDstToken = token;
      dstTokens.push(lastDstToken);
    }
  }
  return dstTokens;
}
var PlainCharacterCursor = class {
  constructor(fileOrCursor, range) {
    if (fileOrCursor instanceof PlainCharacterCursor) {
      this.file = fileOrCursor.file;
      this.input = fileOrCursor.input;
      this.end = fileOrCursor.end;
      const state = fileOrCursor.state;
      this.state = {
        peek: state.peek,
        offset: state.offset,
        line: state.line,
        column: state.column
      };
    } else {
      if (!range) {
        throw new Error("Programming error: the range argument must be provided with a file argument.");
      }
      this.file = fileOrCursor;
      this.input = fileOrCursor.content;
      this.end = range.endPos;
      this.state = {
        peek: -1,
        offset: range.startPos,
        line: range.startLine,
        column: range.startCol
      };
    }
  }
  clone() {
    return new PlainCharacterCursor(this);
  }
  peek() {
    return this.state.peek;
  }
  charsLeft() {
    return this.end - this.state.offset;
  }
  diff(other) {
    return this.state.offset - other.state.offset;
  }
  advance() {
    this.advanceState(this.state);
  }
  init() {
    this.updatePeek(this.state);
  }
  getSpan(start, leadingTriviaCodePoints) {
    start = start || this;
    let fullStart = start;
    if (leadingTriviaCodePoints) {
      while (this.diff(start) > 0 && leadingTriviaCodePoints.indexOf(start.peek()) !== -1) {
        if (fullStart === start) {
          start = start.clone();
        }
        start.advance();
      }
    }
    const startLocation = this.locationFromCursor(start);
    const endLocation = this.locationFromCursor(this);
    const fullStartLocation = fullStart !== start ? this.locationFromCursor(fullStart) : startLocation;
    return new ParseSourceSpan(startLocation, endLocation, fullStartLocation);
  }
  getChars(start) {
    return this.input.substring(start.state.offset, this.state.offset);
  }
  charAt(pos) {
    return this.input.charCodeAt(pos);
  }
  advanceState(state) {
    if (state.offset >= this.end) {
      this.state = state;
      throw new CursorError('Unexpected character "EOF"', this);
    }
    const currentChar = this.charAt(state.offset);
    if (currentChar === $LF) {
      state.line++;
      state.column = 0;
    } else if (!isNewLine(currentChar)) {
      state.column++;
    }
    state.offset++;
    this.updatePeek(state);
  }
  updatePeek(state) {
    state.peek = state.offset >= this.end ? $EOF : this.charAt(state.offset);
  }
  locationFromCursor(cursor) {
    return new ParseLocation(cursor.file, cursor.state.offset, cursor.state.line, cursor.state.column);
  }
};
var EscapedCharacterCursor = class extends PlainCharacterCursor {
  constructor(fileOrCursor, range) {
    if (fileOrCursor instanceof EscapedCharacterCursor) {
      super(fileOrCursor);
      this.internalState = Object.assign({}, fileOrCursor.internalState);
    } else {
      super(fileOrCursor, range);
      this.internalState = this.state;
    }
  }
  advance() {
    this.state = this.internalState;
    super.advance();
    this.processEscapeSequence();
  }
  init() {
    super.init();
    this.processEscapeSequence();
  }
  clone() {
    return new EscapedCharacterCursor(this);
  }
  getChars(start) {
    const cursor = start.clone();
    let chars = "";
    while (cursor.internalState.offset < this.internalState.offset) {
      chars += String.fromCodePoint(cursor.peek());
      cursor.advance();
    }
    return chars;
  }
  processEscapeSequence() {
    const peek = () => this.internalState.peek;
    if (peek() === $BACKSLASH) {
      this.internalState = Object.assign({}, this.state);
      this.advanceState(this.internalState);
      if (peek() === $n) {
        this.state.peek = $LF;
      } else if (peek() === $r) {
        this.state.peek = $CR;
      } else if (peek() === $v) {
        this.state.peek = $VTAB;
      } else if (peek() === $t) {
        this.state.peek = $TAB;
      } else if (peek() === $b) {
        this.state.peek = $BSPACE;
      } else if (peek() === $f) {
        this.state.peek = $FF;
      } else if (peek() === $u) {
        this.advanceState(this.internalState);
        if (peek() === $LBRACE) {
          this.advanceState(this.internalState);
          const digitStart = this.clone();
          let length = 0;
          while (peek() !== $RBRACE) {
            this.advanceState(this.internalState);
            length++;
          }
          this.state.peek = this.decodeHexDigits(digitStart, length);
        } else {
          const digitStart = this.clone();
          this.advanceState(this.internalState);
          this.advanceState(this.internalState);
          this.advanceState(this.internalState);
          this.state.peek = this.decodeHexDigits(digitStart, 4);
        }
      } else if (peek() === $x) {
        this.advanceState(this.internalState);
        const digitStart = this.clone();
        this.advanceState(this.internalState);
        this.state.peek = this.decodeHexDigits(digitStart, 2);
      } else if (isOctalDigit(peek())) {
        let octal = "";
        let length = 0;
        let previous = this.clone();
        while (isOctalDigit(peek()) && length < 3) {
          previous = this.clone();
          octal += String.fromCodePoint(peek());
          this.advanceState(this.internalState);
          length++;
        }
        this.state.peek = parseInt(octal, 8);
        this.internalState = previous.internalState;
      } else if (isNewLine(this.internalState.peek)) {
        this.advanceState(this.internalState);
        this.state = this.internalState;
      } else {
        this.state.peek = this.internalState.peek;
      }
    }
  }
  decodeHexDigits(start, length) {
    const hex = this.input.slice(start.internalState.offset, start.internalState.offset + length);
    const charCode = parseInt(hex, 16);
    if (!isNaN(charCode)) {
      return charCode;
    } else {
      start.state = start.internalState;
      throw new CursorError("Invalid hexadecimal escape sequence", start);
    }
  }
};
var CursorError = class {
  constructor(msg, cursor) {
    this.msg = msg;
    this.cursor = cursor;
  }
};
var TreeError = class extends ParseError {
  constructor(elementName, span, msg) {
    super(span, msg);
    this.elementName = elementName;
  }
  static create(elementName, span, msg) {
    return new TreeError(elementName, span, msg);
  }
};
var ParseTreeResult = class {
  constructor(rootNodes, errors) {
    this.rootNodes = rootNodes;
    this.errors = errors;
  }
};
var Parser = class {
  constructor(getTagDefinition) {
    this.getTagDefinition = getTagDefinition;
  }
  parse(source, url, options) {
    const tokenizeResult = tokenize(source, url, this.getTagDefinition, options);
    const parser = new _TreeBuilder(tokenizeResult.tokens, this.getTagDefinition);
    parser.build();
    return new ParseTreeResult(parser.rootNodes, tokenizeResult.errors.concat(parser.errors));
  }
};
var _TreeBuilder = class {
  constructor(tokens, getTagDefinition) {
    this.tokens = tokens;
    this.getTagDefinition = getTagDefinition;
    this._index = -1;
    this._elementStack = [];
    this.rootNodes = [];
    this.errors = [];
    this._advance();
  }
  build() {
    while (this._peek.type !== 24) {
      if (this._peek.type === 0 || this._peek.type === 4) {
        this._consumeStartTag(this._advance());
      } else if (this._peek.type === 3) {
        this._consumeEndTag(this._advance());
      } else if (this._peek.type === 12) {
        this._closeVoidElement();
        this._consumeCdata(this._advance());
      } else if (this._peek.type === 10) {
        this._closeVoidElement();
        this._consumeComment(this._advance());
      } else if (this._peek.type === 5 || this._peek.type === 7 || this._peek.type === 6) {
        this._closeVoidElement();
        this._consumeText(this._advance());
      } else if (this._peek.type === 19) {
        this._consumeExpansion(this._advance());
      } else {
        this._advance();
      }
    }
  }
  _advance() {
    const prev = this._peek;
    if (this._index < this.tokens.length - 1) {
      this._index++;
    }
    this._peek = this.tokens[this._index];
    return prev;
  }
  _advanceIf(type) {
    if (this._peek.type === type) {
      return this._advance();
    }
    return null;
  }
  _consumeCdata(_startToken) {
    this._consumeText(this._advance());
    this._advanceIf(13);
  }
  _consumeComment(token) {
    const text = this._advanceIf(7);
    this._advanceIf(11);
    const value = text != null ? text.parts[0].trim() : null;
    this._addToParent(new Comment(value, token.sourceSpan));
  }
  _consumeExpansion(token) {
    const switchValue = this._advance();
    const type = this._advance();
    const cases = [];
    while (this._peek.type === 20) {
      const expCase = this._parseExpansionCase();
      if (!expCase)
        return;
      cases.push(expCase);
    }
    if (this._peek.type !== 23) {
      this.errors.push(TreeError.create(null, this._peek.sourceSpan, `Invalid ICU message. Missing '}'.`));
      return;
    }
    const sourceSpan = new ParseSourceSpan(token.sourceSpan.start, this._peek.sourceSpan.end, token.sourceSpan.fullStart);
    this._addToParent(new Expansion(switchValue.parts[0], type.parts[0], cases, sourceSpan, switchValue.sourceSpan));
    this._advance();
  }
  _parseExpansionCase() {
    const value = this._advance();
    if (this._peek.type !== 21) {
      this.errors.push(TreeError.create(null, this._peek.sourceSpan, `Invalid ICU message. Missing '{'.`));
      return null;
    }
    const start = this._advance();
    const exp = this._collectExpansionExpTokens(start);
    if (!exp)
      return null;
    const end = this._advance();
    exp.push({ type: 24, parts: [], sourceSpan: end.sourceSpan });
    const expansionCaseParser = new _TreeBuilder(exp, this.getTagDefinition);
    expansionCaseParser.build();
    if (expansionCaseParser.errors.length > 0) {
      this.errors = this.errors.concat(expansionCaseParser.errors);
      return null;
    }
    const sourceSpan = new ParseSourceSpan(value.sourceSpan.start, end.sourceSpan.end, value.sourceSpan.fullStart);
    const expSourceSpan = new ParseSourceSpan(start.sourceSpan.start, end.sourceSpan.end, start.sourceSpan.fullStart);
    return new ExpansionCase(value.parts[0], expansionCaseParser.rootNodes, sourceSpan, value.sourceSpan, expSourceSpan);
  }
  _collectExpansionExpTokens(start) {
    const exp = [];
    const expansionFormStack = [21];
    while (true) {
      if (this._peek.type === 19 || this._peek.type === 21) {
        expansionFormStack.push(this._peek.type);
      }
      if (this._peek.type === 22) {
        if (lastOnStack(expansionFormStack, 21)) {
          expansionFormStack.pop();
          if (expansionFormStack.length === 0)
            return exp;
        } else {
          this.errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
          return null;
        }
      }
      if (this._peek.type === 23) {
        if (lastOnStack(expansionFormStack, 19)) {
          expansionFormStack.pop();
        } else {
          this.errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
          return null;
        }
      }
      if (this._peek.type === 24) {
        this.errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
        return null;
      }
      exp.push(this._advance());
    }
  }
  _consumeText(token) {
    const tokens = [token];
    const startSpan = token.sourceSpan;
    let text = token.parts[0];
    if (text.length > 0 && text[0] === "\n") {
      const parent = this._getParentElement();
      if (parent != null && parent.children.length === 0 && this.getTagDefinition(parent.name).ignoreFirstLf) {
        text = text.substring(1);
        tokens[0] = { type: token.type, sourceSpan: token.sourceSpan, parts: [text] };
      }
    }
    while (this._peek.type === 8 || this._peek.type === 5 || this._peek.type === 9) {
      token = this._advance();
      tokens.push(token);
      if (token.type === 8) {
        text += token.parts.join("").replace(/&([^;]+);/g, decodeEntity);
      } else if (token.type === 9) {
        text += token.parts[0];
      } else {
        text += token.parts.join("");
      }
    }
    if (text.length > 0) {
      const endSpan = token.sourceSpan;
      this._addToParent(new Text(text, new ParseSourceSpan(startSpan.start, endSpan.end, startSpan.fullStart, startSpan.details), tokens));
    }
  }
  _closeVoidElement() {
    const el = this._getParentElement();
    if (el && this.getTagDefinition(el.name).isVoid) {
      this._elementStack.pop();
    }
  }
  _consumeStartTag(startTagToken) {
    const [prefix, name] = startTagToken.parts;
    const attrs = [];
    while (this._peek.type === 14) {
      attrs.push(this._consumeAttr(this._advance()));
    }
    const fullName = this._getElementFullName(prefix, name, this._getParentElement());
    let selfClosing = false;
    if (this._peek.type === 2) {
      this._advance();
      selfClosing = true;
      const tagDef = this.getTagDefinition(fullName);
      if (!(tagDef.canSelfClose || getNsPrefix(fullName) !== null || tagDef.isVoid)) {
        this.errors.push(TreeError.create(fullName, startTagToken.sourceSpan, `Only void and foreign elements can be self closed "${startTagToken.parts[1]}"`));
      }
    } else if (this._peek.type === 1) {
      this._advance();
      selfClosing = false;
    }
    const end = this._peek.sourceSpan.fullStart;
    const span = new ParseSourceSpan(startTagToken.sourceSpan.start, end, startTagToken.sourceSpan.fullStart);
    const startSpan = new ParseSourceSpan(startTagToken.sourceSpan.start, end, startTagToken.sourceSpan.fullStart);
    const el = new Element(fullName, attrs, [], span, startSpan, void 0);
    this._pushElement(el);
    if (selfClosing) {
      this._popElement(fullName, span);
    } else if (startTagToken.type === 4) {
      this._popElement(fullName, null);
      this.errors.push(TreeError.create(fullName, span, `Opening tag "${fullName}" not terminated.`));
    }
  }
  _pushElement(el) {
    const parentEl = this._getParentElement();
    if (parentEl && this.getTagDefinition(parentEl.name).isClosedByChild(el.name)) {
      this._elementStack.pop();
    }
    this._addToParent(el);
    this._elementStack.push(el);
  }
  _consumeEndTag(endTagToken) {
    const fullName = this._getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getParentElement());
    if (this.getTagDefinition(fullName).isVoid) {
      this.errors.push(TreeError.create(fullName, endTagToken.sourceSpan, `Void elements do not have end tags "${endTagToken.parts[1]}"`));
    } else if (!this._popElement(fullName, endTagToken.sourceSpan)) {
      const errMsg = `Unexpected closing tag "${fullName}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
      this.errors.push(TreeError.create(fullName, endTagToken.sourceSpan, errMsg));
    }
  }
  _popElement(fullName, endSourceSpan) {
    let unexpectedCloseTagDetected = false;
    for (let stackIndex = this._elementStack.length - 1; stackIndex >= 0; stackIndex--) {
      const el = this._elementStack[stackIndex];
      if (el.name === fullName) {
        el.endSourceSpan = endSourceSpan;
        el.sourceSpan.end = endSourceSpan !== null ? endSourceSpan.end : el.sourceSpan.end;
        this._elementStack.splice(stackIndex, this._elementStack.length - stackIndex);
        return !unexpectedCloseTagDetected;
      }
      if (!this.getTagDefinition(el.name).closedByParent) {
        unexpectedCloseTagDetected = true;
      }
    }
    return false;
  }
  _consumeAttr(attrName) {
    const fullName = mergeNsAndName(attrName.parts[0], attrName.parts[1]);
    let attrEnd = attrName.sourceSpan.end;
    if (this._peek.type === 15) {
      this._advance();
    }
    let value = "";
    const valueTokens = [];
    let valueStartSpan = void 0;
    let valueEnd = void 0;
    const nextTokenType = this._peek.type;
    if (nextTokenType === 16) {
      valueStartSpan = this._peek.sourceSpan;
      valueEnd = this._peek.sourceSpan.end;
      while (this._peek.type === 16 || this._peek.type === 17 || this._peek.type === 9) {
        const valueToken = this._advance();
        valueTokens.push(valueToken);
        if (valueToken.type === 17) {
          value += valueToken.parts.join("").replace(/&([^;]+);/g, decodeEntity);
        } else if (valueToken.type === 9) {
          value += valueToken.parts[0];
        } else {
          value += valueToken.parts.join("");
        }
        valueEnd = attrEnd = valueToken.sourceSpan.end;
      }
    }
    if (this._peek.type === 15) {
      const quoteToken = this._advance();
      attrEnd = quoteToken.sourceSpan.end;
    }
    const valueSpan = valueStartSpan && valueEnd && new ParseSourceSpan(valueStartSpan.start, valueEnd, valueStartSpan.fullStart);
    return new Attribute(fullName, value, new ParseSourceSpan(attrName.sourceSpan.start, attrEnd, attrName.sourceSpan.fullStart), attrName.sourceSpan, valueSpan, valueTokens.length > 0 ? valueTokens : void 0, void 0);
  }
  _getParentElement() {
    return this._elementStack.length > 0 ? this._elementStack[this._elementStack.length - 1] : null;
  }
  _addToParent(node) {
    const parent = this._getParentElement();
    if (parent != null) {
      parent.children.push(node);
    } else {
      this.rootNodes.push(node);
    }
  }
  _getElementFullName(prefix, localName, parentElement) {
    if (prefix === "") {
      prefix = this.getTagDefinition(localName).implicitNamespacePrefix || "";
      if (prefix === "" && parentElement != null) {
        const parentTagName = splitNsName(parentElement.name)[1];
        const parentTagDefinition = this.getTagDefinition(parentTagName);
        if (!parentTagDefinition.preventNamespaceInheritance) {
          prefix = getNsPrefix(parentElement.name);
        }
      }
    }
    return mergeNsAndName(prefix, localName);
  }
};
function lastOnStack(stack, element) {
  return stack.length > 0 && stack[stack.length - 1] === element;
}
function decodeEntity(match, entity) {
  if (NAMED_ENTITIES[entity] !== void 0) {
    return NAMED_ENTITIES[entity] || match;
  }
  if (/^#x[a-f0-9]+$/i.test(entity)) {
    return String.fromCodePoint(parseInt(entity.slice(2), 16));
  }
  if (/^#\d+$/.test(entity)) {
    return String.fromCodePoint(parseInt(entity.slice(1), 10));
  }
  return match;
}
var HtmlParser = class extends Parser {
  constructor() {
    super(getHtmlTagDefinition);
  }
  parse(source, url, options) {
    return super.parse(source, url, options);
  }
};
var PRESERVE_WS_ATTR_NAME = "ngPreserveWhitespaces";
var SKIP_WS_TRIM_TAGS = /* @__PURE__ */ new Set(["pre", "template", "textarea", "script", "style"]);
var WS_CHARS = " \f\n\r	\v\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF";
var NO_WS_REGEXP = new RegExp(`[^${WS_CHARS}]`);
var WS_REPLACE_REGEXP = new RegExp(`[${WS_CHARS}]{2,}`, "g");
function hasPreserveWhitespacesAttr(attrs) {
  return attrs.some((attr) => attr.name === PRESERVE_WS_ATTR_NAME);
}
function replaceNgsp(value) {
  return value.replace(new RegExp(NGSP_UNICODE, "g"), " ");
}
var WhitespaceVisitor = class {
  visitElement(element, context) {
    if (SKIP_WS_TRIM_TAGS.has(element.name) || hasPreserveWhitespacesAttr(element.attrs)) {
      return new Element(element.name, visitAll(this, element.attrs), element.children, element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
    }
    return new Element(element.name, element.attrs, visitAllWithSiblings(this, element.children), element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
  }
  visitAttribute(attribute, context) {
    return attribute.name !== PRESERVE_WS_ATTR_NAME ? attribute : null;
  }
  visitText(text, context) {
    const isNotBlank = text.value.match(NO_WS_REGEXP);
    const hasExpansionSibling = context && (context.prev instanceof Expansion || context.next instanceof Expansion);
    if (isNotBlank || hasExpansionSibling) {
      const tokens = text.tokens.map((token) => token.type === 5 ? createWhitespaceProcessedTextToken(token) : token);
      const value = processWhitespace(text.value);
      return new Text(value, text.sourceSpan, tokens, text.i18n);
    }
    return null;
  }
  visitComment(comment2, context) {
    return comment2;
  }
  visitExpansion(expansion, context) {
    return expansion;
  }
  visitExpansionCase(expansionCase, context) {
    return expansionCase;
  }
};
function createWhitespaceProcessedTextToken({ type, parts, sourceSpan }) {
  return { type, parts: [processWhitespace(parts[0])], sourceSpan };
}
function processWhitespace(text) {
  return replaceNgsp(text).replace(WS_REPLACE_REGEXP, " ");
}
function visitAllWithSiblings(visitor, nodes) {
  const result = [];
  nodes.forEach((ast, i) => {
    const context = { prev: nodes[i - 1], next: nodes[i + 1] };
    const astResult = ast.visit(visitor, context);
    if (astResult) {
      result.push(astResult);
    }
  });
  return result;
}
function mapLiteral(obj, quoted = false) {
  return literalMap(Object.keys(obj).map((key) => ({
    key,
    quoted,
    value: obj[key]
  })));
}
var _SECURITY_SCHEMA;
function SECURITY_SCHEMA() {
  if (!_SECURITY_SCHEMA) {
    _SECURITY_SCHEMA = {};
    registerContext(SecurityContext.HTML, [
      "iframe|srcdoc",
      "*|innerHTML",
      "*|outerHTML"
    ]);
    registerContext(SecurityContext.STYLE, ["*|style"]);
    registerContext(SecurityContext.URL, [
      "*|formAction",
      "area|href",
      "area|ping",
      "audio|src",
      "a|href",
      "a|ping",
      "blockquote|cite",
      "body|background",
      "del|cite",
      "form|action",
      "img|src",
      "input|src",
      "ins|cite",
      "q|cite",
      "source|src",
      "track|src",
      "video|poster",
      "video|src"
    ]);
    registerContext(SecurityContext.RESOURCE_URL, [
      "applet|code",
      "applet|codebase",
      "base|href",
      "embed|src",
      "frame|src",
      "head|profile",
      "html|manifest",
      "iframe|src",
      "link|href",
      "media|src",
      "object|codebase",
      "object|data",
      "script|src"
    ]);
  }
  return _SECURITY_SCHEMA;
}
function registerContext(ctx, specs) {
  for (const spec of specs)
    _SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
}
var ElementSchemaRegistry = class {
};
var BOOLEAN = "boolean";
var NUMBER = "number";
var STRING = "string";
var OBJECT = "object";
var SCHEMA = [
  "[Element]|textContent,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColSpan,%ariaCurrent,%ariaDescription,%ariaDisabled,%ariaExpanded,%ariaHasPopup,%ariaHidden,%ariaKeyShortcuts,%ariaLabel,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored",
  "[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
  "abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
  "media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume",
  ":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex",
  ":svg:graphics^:svg:|",
  ":svg:animation^:svg:|*begin,*end,*repeat",
  ":svg:geometry^:svg:|",
  ":svg:componentTransferFunction^:svg:|",
  ":svg:gradient^:svg:|",
  ":svg:textContent^:svg:graphics|",
  ":svg:textPositioning^:svg:textContent|",
  "a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username",
  "area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username",
  "audio^media|",
  "br^[HTMLElement]|clear",
  "base^[HTMLElement]|href,target",
  "body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink",
  "button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value",
  "canvas^[HTMLElement]|#height,#width",
  "content^[HTMLElement]|select",
  "dl^[HTMLElement]|!compact",
  "data^[HTMLElement]|value",
  "datalist^[HTMLElement]|",
  "details^[HTMLElement]|!open",
  "dialog^[HTMLElement]|!open,returnValue",
  "dir^[HTMLElement]|!compact",
  "div^[HTMLElement]|align",
  "embed^[HTMLElement]|align,height,name,src,type,width",
  "fieldset^[HTMLElement]|!disabled,name",
  "font^[HTMLElement]|color,face,size",
  "form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target",
  "frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src",
  "frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows",
  "hr^[HTMLElement]|align,color,!noShade,size,width",
  "head^[HTMLElement]|",
  "h1,h2,h3,h4,h5,h6^[HTMLElement]|align",
  "html^[HTMLElement]|version",
  "iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width",
  "img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width",
  "input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width",
  "li^[HTMLElement]|type,#value",
  "label^[HTMLElement]|htmlFor",
  "legend^[HTMLElement]|align",
  "link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type",
  "map^[HTMLElement]|name",
  "marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width",
  "menu^[HTMLElement]|!compact",
  "meta^[HTMLElement]|content,httpEquiv,media,name,scheme",
  "meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value",
  "ins,del^[HTMLElement]|cite,dateTime",
  "ol^[HTMLElement]|!compact,!reversed,#start,type",
  "object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width",
  "optgroup^[HTMLElement]|!disabled,label",
  "option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value",
  "output^[HTMLElement]|defaultValue,%htmlFor,name,value",
  "p^[HTMLElement]|align",
  "param^[HTMLElement]|name,type,value,valueType",
  "picture^[HTMLElement]|",
  "pre^[HTMLElement]|#width",
  "progress^[HTMLElement]|#max,#value",
  "q,blockquote,cite^[HTMLElement]|",
  "script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type",
  "select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value",
  "slot^[HTMLElement]|name",
  "source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width",
  "span^[HTMLElement]|",
  "style^[HTMLElement]|!disabled,media,type",
  "caption^[HTMLElement]|align",
  "th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width",
  "col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width",
  "table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width",
  "tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign",
  "tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign",
  "template^[HTMLElement]|",
  "textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap",
  "time^[HTMLElement]|dateTime",
  "title^[HTMLElement]|text",
  "track^[HTMLElement]|!default,kind,label,src,srclang",
  "ul^[HTMLElement]|!compact,type",
  "unknown^[HTMLElement]|",
  "video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width",
  ":svg:a^:svg:graphics|",
  ":svg:animate^:svg:animation|",
  ":svg:animateMotion^:svg:animation|",
  ":svg:animateTransform^:svg:animation|",
  ":svg:circle^:svg:geometry|",
  ":svg:clipPath^:svg:graphics|",
  ":svg:defs^:svg:graphics|",
  ":svg:desc^:svg:|",
  ":svg:discard^:svg:|",
  ":svg:ellipse^:svg:geometry|",
  ":svg:feBlend^:svg:|",
  ":svg:feColorMatrix^:svg:|",
  ":svg:feComponentTransfer^:svg:|",
  ":svg:feComposite^:svg:|",
  ":svg:feConvolveMatrix^:svg:|",
  ":svg:feDiffuseLighting^:svg:|",
  ":svg:feDisplacementMap^:svg:|",
  ":svg:feDistantLight^:svg:|",
  ":svg:feDropShadow^:svg:|",
  ":svg:feFlood^:svg:|",
  ":svg:feFuncA^:svg:componentTransferFunction|",
  ":svg:feFuncB^:svg:componentTransferFunction|",
  ":svg:feFuncG^:svg:componentTransferFunction|",
  ":svg:feFuncR^:svg:componentTransferFunction|",
  ":svg:feGaussianBlur^:svg:|",
  ":svg:feImage^:svg:|",
  ":svg:feMerge^:svg:|",
  ":svg:feMergeNode^:svg:|",
  ":svg:feMorphology^:svg:|",
  ":svg:feOffset^:svg:|",
  ":svg:fePointLight^:svg:|",
  ":svg:feSpecularLighting^:svg:|",
  ":svg:feSpotLight^:svg:|",
  ":svg:feTile^:svg:|",
  ":svg:feTurbulence^:svg:|",
  ":svg:filter^:svg:|",
  ":svg:foreignObject^:svg:graphics|",
  ":svg:g^:svg:graphics|",
  ":svg:image^:svg:graphics|decoding",
  ":svg:line^:svg:geometry|",
  ":svg:linearGradient^:svg:gradient|",
  ":svg:mpath^:svg:|",
  ":svg:marker^:svg:|",
  ":svg:mask^:svg:|",
  ":svg:metadata^:svg:|",
  ":svg:path^:svg:geometry|",
  ":svg:pattern^:svg:|",
  ":svg:polygon^:svg:geometry|",
  ":svg:polyline^:svg:geometry|",
  ":svg:radialGradient^:svg:gradient|",
  ":svg:rect^:svg:geometry|",
  ":svg:svg^:svg:graphics|#currentScale,#zoomAndPan",
  ":svg:script^:svg:|type",
  ":svg:set^:svg:animation|",
  ":svg:stop^:svg:|",
  ":svg:style^:svg:|!disabled,media,title,type",
  ":svg:switch^:svg:graphics|",
  ":svg:symbol^:svg:|",
  ":svg:tspan^:svg:textPositioning|",
  ":svg:text^:svg:textPositioning|",
  ":svg:textPath^:svg:textContent|",
  ":svg:title^:svg:|",
  ":svg:use^:svg:graphics|",
  ":svg:view^:svg:|#zoomAndPan",
  "data^[HTMLElement]|value",
  "keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name",
  "menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default",
  "summary^[HTMLElement]|",
  "time^[HTMLElement]|dateTime",
  ":svg:cursor^:svg:|"
];
var _ATTR_TO_PROP = new Map(Object.entries({
  "class": "className",
  "for": "htmlFor",
  "formaction": "formAction",
  "innerHtml": "innerHTML",
  "readonly": "readOnly",
  "tabindex": "tabIndex"
}));
var _PROP_TO_ATTR = Array.from(_ATTR_TO_PROP).reduce((inverted, [propertyName, attributeName]) => {
  inverted.set(propertyName, attributeName);
  return inverted;
}, /* @__PURE__ */ new Map());
var DomElementSchemaRegistry = class extends ElementSchemaRegistry {
  constructor() {
    super();
    this._schema = /* @__PURE__ */ new Map();
    this._eventSchema = /* @__PURE__ */ new Map();
    SCHEMA.forEach((encodedType) => {
      const type = /* @__PURE__ */ new Map();
      const events = /* @__PURE__ */ new Set();
      const [strType, strProperties] = encodedType.split("|");
      const properties = strProperties.split(",");
      const [typeNames, superName] = strType.split("^");
      typeNames.split(",").forEach((tag) => {
        this._schema.set(tag.toLowerCase(), type);
        this._eventSchema.set(tag.toLowerCase(), events);
      });
      const superType = superName && this._schema.get(superName.toLowerCase());
      if (superType) {
        for (const [prop, value] of superType) {
          type.set(prop, value);
        }
        for (const superEvent of this._eventSchema.get(superName.toLowerCase())) {
          events.add(superEvent);
        }
      }
      properties.forEach((property) => {
        if (property.length > 0) {
          switch (property[0]) {
            case "*":
              events.add(property.substring(1));
              break;
            case "!":
              type.set(property.substring(1), BOOLEAN);
              break;
            case "#":
              type.set(property.substring(1), NUMBER);
              break;
            case "%":
              type.set(property.substring(1), OBJECT);
              break;
            default:
              type.set(property, STRING);
          }
        }
      });
    });
  }
  hasProperty(tagName, propName, schemaMetas) {
    if (schemaMetas.some((schema) => schema.name === NO_ERRORS_SCHEMA.name)) {
      return true;
    }
    if (tagName.indexOf("-") > -1) {
      if (isNgContainer(tagName) || isNgContent(tagName)) {
        return false;
      }
      if (schemaMetas.some((schema) => schema.name === CUSTOM_ELEMENTS_SCHEMA.name)) {
        return true;
      }
    }
    const elementProperties = this._schema.get(tagName.toLowerCase()) || this._schema.get("unknown");
    return elementProperties.has(propName);
  }
  hasElement(tagName, schemaMetas) {
    if (schemaMetas.some((schema) => schema.name === NO_ERRORS_SCHEMA.name)) {
      return true;
    }
    if (tagName.indexOf("-") > -1) {
      if (isNgContainer(tagName) || isNgContent(tagName)) {
        return true;
      }
      if (schemaMetas.some((schema) => schema.name === CUSTOM_ELEMENTS_SCHEMA.name)) {
        return true;
      }
    }
    return this._schema.has(tagName.toLowerCase());
  }
  securityContext(tagName, propName, isAttribute) {
    if (isAttribute) {
      propName = this.getMappedPropName(propName);
    }
    tagName = tagName.toLowerCase();
    propName = propName.toLowerCase();
    let ctx = SECURITY_SCHEMA()[tagName + "|" + propName];
    if (ctx) {
      return ctx;
    }
    ctx = SECURITY_SCHEMA()["*|" + propName];
    return ctx ? ctx : SecurityContext.NONE;
  }
  getMappedPropName(propName) {
    var _a;
    return (_a = _ATTR_TO_PROP.get(propName)) !== null && _a !== void 0 ? _a : propName;
  }
  getDefaultComponentElementName() {
    return "ng-component";
  }
  validateProperty(name) {
    if (name.toLowerCase().startsWith("on")) {
      const msg = `Binding to event property '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...
If '${name}' is a directive input, make sure the directive is imported by the current module.`;
      return { error: true, msg };
    } else {
      return { error: false };
    }
  }
  validateAttribute(name) {
    if (name.toLowerCase().startsWith("on")) {
      const msg = `Binding to event attribute '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...`;
      return { error: true, msg };
    } else {
      return { error: false };
    }
  }
  allKnownElementNames() {
    return Array.from(this._schema.keys());
  }
  allKnownAttributesOfElement(tagName) {
    const elementProperties = this._schema.get(tagName.toLowerCase()) || this._schema.get("unknown");
    return Array.from(elementProperties.keys()).map((prop) => {
      var _a;
      return (_a = _PROP_TO_ATTR.get(prop)) !== null && _a !== void 0 ? _a : prop;
    });
  }
  allKnownEventsOfElement(tagName) {
    var _a;
    return Array.from((_a = this._eventSchema.get(tagName.toLowerCase())) !== null && _a !== void 0 ? _a : []);
  }
  normalizeAnimationStyleProperty(propName) {
    return dashCaseToCamelCase(propName);
  }
  normalizeAnimationStyleValue(camelCaseProp, userProvidedProp, val) {
    let unit = "";
    const strVal = val.toString().trim();
    let errorMsg = null;
    if (_isPixelDimensionStyle(camelCaseProp) && val !== 0 && val !== "0") {
      if (typeof val === "number") {
        unit = "px";
      } else {
        const valAndSuffixMatch = val.match(/^[+-]?[\d\.]+([a-z]*)$/);
        if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
          errorMsg = `Please provide a CSS unit value for ${userProvidedProp}:${val}`;
        }
      }
    }
    return { error: errorMsg, value: strVal + unit };
  }
};
function _isPixelDimensionStyle(prop) {
  switch (prop) {
    case "width":
    case "height":
    case "minWidth":
    case "minHeight":
    case "maxWidth":
    case "maxHeight":
    case "left":
    case "top":
    case "bottom":
    case "right":
    case "fontSize":
    case "outlineWidth":
    case "outlineOffset":
    case "paddingTop":
    case "paddingLeft":
    case "paddingBottom":
    case "paddingRight":
    case "marginTop":
    case "marginLeft":
    case "marginBottom":
    case "marginRight":
    case "borderRadius":
    case "borderWidth":
    case "borderTopWidth":
    case "borderLeftWidth":
    case "borderRightWidth":
    case "borderBottomWidth":
    case "textIndent":
      return true;
    default:
      return false;
  }
}
var TRUSTED_TYPES_SINKS = /* @__PURE__ */ new Set([
  "iframe|srcdoc",
  "*|innerhtml",
  "*|outerhtml",
  "embed|src",
  "object|codebase",
  "object|data"
]);
function isTrustedTypesSink(tagName, propName) {
  tagName = tagName.toLowerCase();
  propName = propName.toLowerCase();
  return TRUSTED_TYPES_SINKS.has(tagName + "|" + propName) || TRUSTED_TYPES_SINKS.has("*|" + propName);
}
var PROPERTY_PARTS_SEPARATOR = ".";
var ATTRIBUTE_PREFIX = "attr";
var CLASS_PREFIX = "class";
var STYLE_PREFIX = "style";
var TEMPLATE_ATTR_PREFIX$1 = "*";
var ANIMATE_PROP_PREFIX = "animate-";
var BindingParser = class {
  constructor(_exprParser, _interpolationConfig, _schemaRegistry, errors) {
    this._exprParser = _exprParser;
    this._interpolationConfig = _interpolationConfig;
    this._schemaRegistry = _schemaRegistry;
    this.errors = errors;
  }
  get interpolationConfig() {
    return this._interpolationConfig;
  }
  createBoundHostProperties(properties, sourceSpan) {
    const boundProps = [];
    for (const propName of Object.keys(properties)) {
      const expression = properties[propName];
      if (typeof expression === "string") {
        this.parsePropertyBinding(propName, expression, true, sourceSpan, sourceSpan.start.offset, void 0, [], boundProps, sourceSpan);
      } else {
        this._reportError(`Value of the host property binding "${propName}" needs to be a string representing an expression but got "${expression}" (${typeof expression})`, sourceSpan);
      }
    }
    return boundProps;
  }
  createDirectiveHostEventAsts(hostListeners, sourceSpan) {
    const targetEvents = [];
    for (const propName of Object.keys(hostListeners)) {
      const expression = hostListeners[propName];
      if (typeof expression === "string") {
        this.parseEvent(propName, expression, false, sourceSpan, sourceSpan, [], targetEvents, sourceSpan);
      } else {
        this._reportError(`Value of the host listener "${propName}" needs to be a string representing an expression but got "${expression}" (${typeof expression})`, sourceSpan);
      }
    }
    return targetEvents;
  }
  parseInterpolation(value, sourceSpan, interpolatedTokens) {
    const sourceInfo = sourceSpan.start.toString();
    const absoluteOffset = sourceSpan.fullStart.offset;
    try {
      const ast = this._exprParser.parseInterpolation(value, sourceInfo, absoluteOffset, interpolatedTokens, this._interpolationConfig);
      if (ast)
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  parseInterpolationExpression(expression, sourceSpan) {
    const sourceInfo = sourceSpan.start.toString();
    const absoluteOffset = sourceSpan.start.offset;
    try {
      const ast = this._exprParser.parseInterpolationExpression(expression, sourceInfo, absoluteOffset);
      if (ast)
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  parseInlineTemplateBinding(tplKey, tplValue, sourceSpan, absoluteValueOffset, targetMatchableAttrs, targetProps, targetVars, isIvyAst) {
    const absoluteKeyOffset = sourceSpan.start.offset + TEMPLATE_ATTR_PREFIX$1.length;
    const bindings = this._parseTemplateBindings(tplKey, tplValue, sourceSpan, absoluteKeyOffset, absoluteValueOffset);
    for (const binding of bindings) {
      const bindingSpan = moveParseSourceSpan(sourceSpan, binding.sourceSpan);
      const key = binding.key.source;
      const keySpan = moveParseSourceSpan(sourceSpan, binding.key.span);
      if (binding instanceof VariableBinding) {
        const value = binding.value ? binding.value.source : "$implicit";
        const valueSpan = binding.value ? moveParseSourceSpan(sourceSpan, binding.value.span) : void 0;
        targetVars.push(new ParsedVariable(key, value, bindingSpan, keySpan, valueSpan));
      } else if (binding.value) {
        const srcSpan = isIvyAst ? bindingSpan : sourceSpan;
        const valueSpan = moveParseSourceSpan(sourceSpan, binding.value.ast.sourceSpan);
        this._parsePropertyAst(key, binding.value, srcSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
      } else {
        targetMatchableAttrs.push([key, ""]);
        this.parseLiteralAttr(key, null, keySpan, absoluteValueOffset, void 0, targetMatchableAttrs, targetProps, keySpan);
      }
    }
  }
  _parseTemplateBindings(tplKey, tplValue, sourceSpan, absoluteKeyOffset, absoluteValueOffset) {
    const sourceInfo = sourceSpan.start.toString();
    try {
      const bindingsResult = this._exprParser.parseTemplateBindings(tplKey, tplValue, sourceInfo, absoluteKeyOffset, absoluteValueOffset);
      this._reportExpressionParserErrors(bindingsResult.errors, sourceSpan);
      bindingsResult.warnings.forEach((warning) => {
        this._reportError(warning, sourceSpan, ParseErrorLevel.WARNING);
      });
      return bindingsResult.templateBindings;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return [];
    }
  }
  parseLiteralAttr(name, value, sourceSpan, absoluteOffset, valueSpan, targetMatchableAttrs, targetProps, keySpan) {
    if (isAnimationLabel(name)) {
      name = name.substring(1);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
      }
      if (value) {
        this._reportError(`Assigning animation triggers via @prop="exp" attributes with an expression is invalid. Use property bindings (e.g. [@prop]="exp") or use an attribute without a value (e.g. @prop) instead.`, sourceSpan, ParseErrorLevel.ERROR);
      }
      this._parseAnimation(name, value, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps);
    } else {
      targetProps.push(new ParsedProperty(name, this._exprParser.wrapLiteralPrimitive(value, "", absoluteOffset), ParsedPropertyType.LITERAL_ATTR, sourceSpan, keySpan, valueSpan));
    }
  }
  parsePropertyBinding(name, expression, isHost, sourceSpan, absoluteOffset, valueSpan, targetMatchableAttrs, targetProps, keySpan) {
    if (name.length === 0) {
      this._reportError(`Property name is missing in binding`, sourceSpan);
    }
    let isAnimationProp = false;
    if (name.startsWith(ANIMATE_PROP_PREFIX)) {
      isAnimationProp = true;
      name = name.substring(ANIMATE_PROP_PREFIX.length);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + ANIMATE_PROP_PREFIX.length, keySpan.end.offset));
      }
    } else if (isAnimationLabel(name)) {
      isAnimationProp = true;
      name = name.substring(1);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
      }
    }
    if (isAnimationProp) {
      this._parseAnimation(name, expression, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps);
    } else {
      this._parsePropertyAst(name, this._parseBinding(expression, isHost, valueSpan || sourceSpan, absoluteOffset), sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
    }
  }
  parsePropertyInterpolation(name, value, sourceSpan, valueSpan, targetMatchableAttrs, targetProps, keySpan, interpolatedTokens) {
    const expr = this.parseInterpolation(value, valueSpan || sourceSpan, interpolatedTokens);
    if (expr) {
      this._parsePropertyAst(name, expr, sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
      return true;
    }
    return false;
  }
  _parsePropertyAst(name, ast, sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps) {
    targetMatchableAttrs.push([name, ast.source]);
    targetProps.push(new ParsedProperty(name, ast, ParsedPropertyType.DEFAULT, sourceSpan, keySpan, valueSpan));
  }
  _parseAnimation(name, expression, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps) {
    if (name.length === 0) {
      this._reportError("Animation trigger is missing", sourceSpan);
    }
    const ast = this._parseBinding(expression || "undefined", false, valueSpan || sourceSpan, absoluteOffset);
    targetMatchableAttrs.push([name, ast.source]);
    targetProps.push(new ParsedProperty(name, ast, ParsedPropertyType.ANIMATION, sourceSpan, keySpan, valueSpan));
  }
  _parseBinding(value, isHostBinding2, sourceSpan, absoluteOffset) {
    const sourceInfo = (sourceSpan && sourceSpan.start || "(unknown)").toString();
    try {
      const ast = isHostBinding2 ? this._exprParser.parseSimpleBinding(value, sourceInfo, absoluteOffset, this._interpolationConfig) : this._exprParser.parseBinding(value, sourceInfo, absoluteOffset, this._interpolationConfig);
      if (ast)
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  createBoundElementProperty(elementSelector, boundProp, skipValidation = false, mapPropertyName = true) {
    if (boundProp.isAnimation) {
      return new BoundElementProperty(boundProp.name, 4, SecurityContext.NONE, boundProp.expression, null, boundProp.sourceSpan, boundProp.keySpan, boundProp.valueSpan);
    }
    let unit = null;
    let bindingType = void 0;
    let boundPropertyName = null;
    const parts = boundProp.name.split(PROPERTY_PARTS_SEPARATOR);
    let securityContexts = void 0;
    if (parts.length > 1) {
      if (parts[0] == ATTRIBUTE_PREFIX) {
        boundPropertyName = parts.slice(1).join(PROPERTY_PARTS_SEPARATOR);
        if (!skipValidation) {
          this._validatePropertyOrAttributeName(boundPropertyName, boundProp.sourceSpan, true);
        }
        securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, boundPropertyName, true);
        const nsSeparatorIdx = boundPropertyName.indexOf(":");
        if (nsSeparatorIdx > -1) {
          const ns = boundPropertyName.substring(0, nsSeparatorIdx);
          const name = boundPropertyName.substring(nsSeparatorIdx + 1);
          boundPropertyName = mergeNsAndName(ns, name);
        }
        bindingType = 1;
      } else if (parts[0] == CLASS_PREFIX) {
        boundPropertyName = parts[1];
        bindingType = 2;
        securityContexts = [SecurityContext.NONE];
      } else if (parts[0] == STYLE_PREFIX) {
        unit = parts.length > 2 ? parts[2] : null;
        boundPropertyName = parts[1];
        bindingType = 3;
        securityContexts = [SecurityContext.STYLE];
      }
    }
    if (boundPropertyName === null) {
      const mappedPropName = this._schemaRegistry.getMappedPropName(boundProp.name);
      boundPropertyName = mapPropertyName ? mappedPropName : boundProp.name;
      securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, mappedPropName, false);
      bindingType = 0;
      if (!skipValidation) {
        this._validatePropertyOrAttributeName(mappedPropName, boundProp.sourceSpan, false);
      }
    }
    return new BoundElementProperty(boundPropertyName, bindingType, securityContexts[0], boundProp.expression, unit, boundProp.sourceSpan, boundProp.keySpan, boundProp.valueSpan);
  }
  parseEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan) {
    if (name.length === 0) {
      this._reportError(`Event name is missing in binding`, sourceSpan);
    }
    if (isAnimationLabel(name)) {
      name = name.slice(1);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
      }
      this._parseAnimationEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetEvents, keySpan);
    } else {
      this._parseRegularEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan);
    }
  }
  calcPossibleSecurityContexts(selector, propName, isAttribute) {
    const prop = this._schemaRegistry.getMappedPropName(propName);
    return calcPossibleSecurityContexts(this._schemaRegistry, selector, prop, isAttribute);
  }
  _parseAnimationEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetEvents, keySpan) {
    const matches = splitAtPeriod(name, [name, ""]);
    const eventName = matches[0];
    const phase = matches[1].toLowerCase();
    const ast = this._parseAction(expression, isAssignmentEvent, handlerSpan);
    targetEvents.push(new ParsedEvent(eventName, phase, 1, ast, sourceSpan, handlerSpan, keySpan));
    if (eventName.length === 0) {
      this._reportError(`Animation event name is missing in binding`, sourceSpan);
    }
    if (phase) {
      if (phase !== "start" && phase !== "done") {
        this._reportError(`The provided animation output phase value "${phase}" for "@${eventName}" is not supported (use start or done)`, sourceSpan);
      }
    } else {
      this._reportError(`The animation trigger output event (@${eventName}) is missing its phase value name (start or done are currently supported)`, sourceSpan);
    }
  }
  _parseRegularEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan) {
    const [target, eventName] = splitAtColon(name, [null, name]);
    const ast = this._parseAction(expression, isAssignmentEvent, handlerSpan);
    targetMatchableAttrs.push([name, ast.source]);
    targetEvents.push(new ParsedEvent(eventName, target, 0, ast, sourceSpan, handlerSpan, keySpan));
  }
  _parseAction(value, isAssignmentEvent, sourceSpan) {
    const sourceInfo = (sourceSpan && sourceSpan.start || "(unknown").toString();
    const absoluteOffset = sourceSpan && sourceSpan.start ? sourceSpan.start.offset : 0;
    try {
      const ast = this._exprParser.parseAction(value, isAssignmentEvent, sourceInfo, absoluteOffset, this._interpolationConfig);
      if (ast) {
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      }
      if (!ast || ast.ast instanceof EmptyExpr) {
        this._reportError(`Empty expressions are not allowed`, sourceSpan);
        return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
      }
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  _reportError(message, sourceSpan, level = ParseErrorLevel.ERROR) {
    this.errors.push(new ParseError(sourceSpan, message, level));
  }
  _reportExpressionParserErrors(errors, sourceSpan) {
    for (const error2 of errors) {
      this._reportError(error2.message, sourceSpan);
    }
  }
  _validatePropertyOrAttributeName(propName, sourceSpan, isAttr) {
    const report = isAttr ? this._schemaRegistry.validateAttribute(propName) : this._schemaRegistry.validateProperty(propName);
    if (report.error) {
      this._reportError(report.msg, sourceSpan, ParseErrorLevel.ERROR);
    }
  }
};
function isAnimationLabel(name) {
  return name[0] == "@";
}
function calcPossibleSecurityContexts(registry, selector, propName, isAttribute) {
  const ctxs = [];
  CssSelector.parse(selector).forEach((selector2) => {
    const elementNames = selector2.element ? [selector2.element] : registry.allKnownElementNames();
    const notElementNames = new Set(selector2.notSelectors.filter((selector3) => selector3.isElementSelector()).map((selector3) => selector3.element));
    const possibleElementNames = elementNames.filter((elementName) => !notElementNames.has(elementName));
    ctxs.push(...possibleElementNames.map((elementName) => registry.securityContext(elementName, propName, isAttribute)));
  });
  return ctxs.length === 0 ? [SecurityContext.NONE] : Array.from(new Set(ctxs)).sort();
}
function moveParseSourceSpan(sourceSpan, absoluteSpan) {
  const startDiff = absoluteSpan.start - sourceSpan.start.offset;
  const endDiff = absoluteSpan.end - sourceSpan.end.offset;
  return new ParseSourceSpan(sourceSpan.start.moveBy(startDiff), sourceSpan.end.moveBy(endDiff), sourceSpan.fullStart.moveBy(startDiff), sourceSpan.details);
}
function isStyleUrlResolvable(url) {
  if (url == null || url.length === 0 || url[0] == "/")
    return false;
  const schemeMatch = url.match(URL_WITH_SCHEMA_REGEXP);
  return schemeMatch === null || schemeMatch[1] == "package" || schemeMatch[1] == "asset";
}
var URL_WITH_SCHEMA_REGEXP = /^([^:/?#]+):/;
var NG_CONTENT_SELECT_ATTR$1 = "select";
var LINK_ELEMENT = "link";
var LINK_STYLE_REL_ATTR = "rel";
var LINK_STYLE_HREF_ATTR = "href";
var LINK_STYLE_REL_VALUE = "stylesheet";
var STYLE_ELEMENT = "style";
var SCRIPT_ELEMENT = "script";
var NG_NON_BINDABLE_ATTR = "ngNonBindable";
var NG_PROJECT_AS = "ngProjectAs";
function preparseElement(ast) {
  let selectAttr = null;
  let hrefAttr = null;
  let relAttr = null;
  let nonBindable = false;
  let projectAs = "";
  ast.attrs.forEach((attr) => {
    const lcAttrName = attr.name.toLowerCase();
    if (lcAttrName == NG_CONTENT_SELECT_ATTR$1) {
      selectAttr = attr.value;
    } else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
      hrefAttr = attr.value;
    } else if (lcAttrName == LINK_STYLE_REL_ATTR) {
      relAttr = attr.value;
    } else if (attr.name == NG_NON_BINDABLE_ATTR) {
      nonBindable = true;
    } else if (attr.name == NG_PROJECT_AS) {
      if (attr.value.length > 0) {
        projectAs = attr.value;
      }
    }
  });
  selectAttr = normalizeNgContentSelect(selectAttr);
  const nodeName = ast.name.toLowerCase();
  let type = PreparsedElementType.OTHER;
  if (isNgContent(nodeName)) {
    type = PreparsedElementType.NG_CONTENT;
  } else if (nodeName == STYLE_ELEMENT) {
    type = PreparsedElementType.STYLE;
  } else if (nodeName == SCRIPT_ELEMENT) {
    type = PreparsedElementType.SCRIPT;
  } else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
    type = PreparsedElementType.STYLESHEET;
  }
  return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
}
var PreparsedElementType;
(function(PreparsedElementType2) {
  PreparsedElementType2[PreparsedElementType2["NG_CONTENT"] = 0] = "NG_CONTENT";
  PreparsedElementType2[PreparsedElementType2["STYLE"] = 1] = "STYLE";
  PreparsedElementType2[PreparsedElementType2["STYLESHEET"] = 2] = "STYLESHEET";
  PreparsedElementType2[PreparsedElementType2["SCRIPT"] = 3] = "SCRIPT";
  PreparsedElementType2[PreparsedElementType2["OTHER"] = 4] = "OTHER";
})(PreparsedElementType || (PreparsedElementType = {}));
var PreparsedElement = class {
  constructor(type, selectAttr, hrefAttr, nonBindable, projectAs) {
    this.type = type;
    this.selectAttr = selectAttr;
    this.hrefAttr = hrefAttr;
    this.nonBindable = nonBindable;
    this.projectAs = projectAs;
  }
};
function normalizeNgContentSelect(selectAttr) {
  if (selectAttr === null || selectAttr.length === 0) {
    return "*";
  }
  return selectAttr;
}
var BIND_NAME_REGEXP = /^(?:(bind-)|(let-)|(ref-|#)|(on-)|(bindon-)|(@))(.*)$/;
var KW_BIND_IDX = 1;
var KW_LET_IDX = 2;
var KW_REF_IDX = 3;
var KW_ON_IDX = 4;
var KW_BINDON_IDX = 5;
var KW_AT_IDX = 6;
var IDENT_KW_IDX = 7;
var BINDING_DELIMS = {
  BANANA_BOX: { start: "[(", end: ")]" },
  PROPERTY: { start: "[", end: "]" },
  EVENT: { start: "(", end: ")" }
};
var TEMPLATE_ATTR_PREFIX = "*";
function htmlAstToRender3Ast(htmlNodes, bindingParser, options) {
  const transformer = new HtmlAstToIvyAst(bindingParser, options);
  const ivyNodes = visitAll(transformer, htmlNodes);
  const allErrors = bindingParser.errors.concat(transformer.errors);
  const result = {
    nodes: ivyNodes,
    errors: allErrors,
    styleUrls: transformer.styleUrls,
    styles: transformer.styles,
    ngContentSelectors: transformer.ngContentSelectors
  };
  if (options.collectCommentNodes) {
    result.commentNodes = transformer.commentNodes;
  }
  return result;
}
var HtmlAstToIvyAst = class {
  constructor(bindingParser, options) {
    this.bindingParser = bindingParser;
    this.options = options;
    this.errors = [];
    this.styles = [];
    this.styleUrls = [];
    this.ngContentSelectors = [];
    this.commentNodes = [];
    this.inI18nBlock = false;
  }
  visitElement(element) {
    const isI18nRootElement = isI18nRootNode(element.i18n);
    if (isI18nRootElement) {
      if (this.inI18nBlock) {
        this.reportError("Cannot mark an element as translatable inside of a translatable section. Please remove the nested i18n marker.", element.sourceSpan);
      }
      this.inI18nBlock = true;
    }
    const preparsedElement = preparseElement(element);
    if (preparsedElement.type === PreparsedElementType.SCRIPT) {
      return null;
    } else if (preparsedElement.type === PreparsedElementType.STYLE) {
      const contents = textContents(element);
      if (contents !== null) {
        this.styles.push(contents);
      }
      return null;
    } else if (preparsedElement.type === PreparsedElementType.STYLESHEET && isStyleUrlResolvable(preparsedElement.hrefAttr)) {
      this.styleUrls.push(preparsedElement.hrefAttr);
      return null;
    }
    const isTemplateElement = isNgTemplate(element.name);
    const parsedProperties = [];
    const boundEvents = [];
    const variables = [];
    const references = [];
    const attributes = [];
    const i18nAttrsMeta = {};
    const templateParsedProperties = [];
    const templateVariables = [];
    let elementHasInlineTemplate = false;
    for (const attribute of element.attrs) {
      let hasBinding = false;
      const normalizedName = normalizeAttributeName(attribute.name);
      let isTemplateBinding = false;
      if (attribute.i18n) {
        i18nAttrsMeta[attribute.name] = attribute.i18n;
      }
      if (normalizedName.startsWith(TEMPLATE_ATTR_PREFIX)) {
        if (elementHasInlineTemplate) {
          this.reportError(`Can't have multiple template bindings on one element. Use only one attribute prefixed with *`, attribute.sourceSpan);
        }
        isTemplateBinding = true;
        elementHasInlineTemplate = true;
        const templateValue = attribute.value;
        const templateKey = normalizedName.substring(TEMPLATE_ATTR_PREFIX.length);
        const parsedVariables = [];
        const absoluteValueOffset = attribute.valueSpan ? attribute.valueSpan.start.offset : attribute.sourceSpan.start.offset + attribute.name.length;
        this.bindingParser.parseInlineTemplateBinding(templateKey, templateValue, attribute.sourceSpan, absoluteValueOffset, [], templateParsedProperties, parsedVariables, true);
        templateVariables.push(...parsedVariables.map((v) => new Variable(v.name, v.value, v.sourceSpan, v.keySpan, v.valueSpan)));
      } else {
        hasBinding = this.parseAttribute(isTemplateElement, attribute, [], parsedProperties, boundEvents, variables, references);
      }
      if (!hasBinding && !isTemplateBinding) {
        attributes.push(this.visitAttribute(attribute));
      }
    }
    const children = visitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children);
    let parsedElement;
    if (preparsedElement.type === PreparsedElementType.NG_CONTENT) {
      if (element.children && !element.children.every((node) => isEmptyTextNode(node) || isCommentNode(node))) {
        this.reportError(`<ng-content> element cannot have content.`, element.sourceSpan);
      }
      const selector = preparsedElement.selectAttr;
      const attrs = element.attrs.map((attr) => this.visitAttribute(attr));
      parsedElement = new Content(selector, attrs, element.sourceSpan, element.i18n);
      this.ngContentSelectors.push(selector);
    } else if (isTemplateElement) {
      const attrs = this.extractAttributes(element.name, parsedProperties, i18nAttrsMeta);
      parsedElement = new Template(element.name, attributes, attrs.bound, boundEvents, [], children, references, variables, element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
    } else {
      const attrs = this.extractAttributes(element.name, parsedProperties, i18nAttrsMeta);
      parsedElement = new Element$1(element.name, attributes, attrs.bound, boundEvents, children, references, element.sourceSpan, element.startSourceSpan, element.endSourceSpan, element.i18n);
    }
    if (elementHasInlineTemplate) {
      const attrs = this.extractAttributes("ng-template", templateParsedProperties, i18nAttrsMeta);
      const templateAttrs = [];
      attrs.literal.forEach((attr) => templateAttrs.push(attr));
      attrs.bound.forEach((attr) => templateAttrs.push(attr));
      const hoistedAttrs = parsedElement instanceof Element$1 ? {
        attributes: parsedElement.attributes,
        inputs: parsedElement.inputs,
        outputs: parsedElement.outputs
      } : { attributes: [], inputs: [], outputs: [] };
      const i18n = isTemplateElement && isI18nRootElement ? void 0 : element.i18n;
      const name = parsedElement instanceof Template ? null : parsedElement.name;
      parsedElement = new Template(name, hoistedAttrs.attributes, hoistedAttrs.inputs, hoistedAttrs.outputs, templateAttrs, [parsedElement], [], templateVariables, element.sourceSpan, element.startSourceSpan, element.endSourceSpan, i18n);
    }
    if (isI18nRootElement) {
      this.inI18nBlock = false;
    }
    return parsedElement;
  }
  visitAttribute(attribute) {
    return new TextAttribute(attribute.name, attribute.value, attribute.sourceSpan, attribute.keySpan, attribute.valueSpan, attribute.i18n);
  }
  visitText(text) {
    return this._visitTextWithInterpolation(text.value, text.sourceSpan, text.tokens, text.i18n);
  }
  visitExpansion(expansion) {
    if (!expansion.i18n) {
      return null;
    }
    if (!isI18nRootNode(expansion.i18n)) {
      throw new Error(`Invalid type "${expansion.i18n.constructor}" for "i18n" property of ${expansion.sourceSpan.toString()}. Expected a "Message"`);
    }
    const message = expansion.i18n;
    const vars = {};
    const placeholders = {};
    Object.keys(message.placeholders).forEach((key) => {
      const value = message.placeholders[key];
      if (key.startsWith(I18N_ICU_VAR_PREFIX)) {
        const formattedKey = key.trim();
        const ast = this.bindingParser.parseInterpolationExpression(value.text, value.sourceSpan);
        vars[formattedKey] = new BoundText(ast, value.sourceSpan);
      } else {
        placeholders[key] = this._visitTextWithInterpolation(value.text, value.sourceSpan, null);
      }
    });
    return new Icu$1(vars, placeholders, expansion.sourceSpan, message);
  }
  visitExpansionCase(expansionCase) {
    return null;
  }
  visitComment(comment2) {
    if (this.options.collectCommentNodes) {
      this.commentNodes.push(new Comment$1(comment2.value || "", comment2.sourceSpan));
    }
    return null;
  }
  extractAttributes(elementName, properties, i18nPropsMeta) {
    const bound = [];
    const literal2 = [];
    properties.forEach((prop) => {
      const i18n = i18nPropsMeta[prop.name];
      if (prop.isLiteral) {
        literal2.push(new TextAttribute(prop.name, prop.expression.source || "", prop.sourceSpan, prop.keySpan, prop.valueSpan, i18n));
      } else {
        const bep = this.bindingParser.createBoundElementProperty(elementName, prop, true, false);
        bound.push(BoundAttribute.fromBoundElementProperty(bep, i18n));
      }
    });
    return { bound, literal: literal2 };
  }
  parseAttribute(isTemplateElement, attribute, matchableAttributes, parsedProperties, boundEvents, variables, references) {
    var _a;
    const name = normalizeAttributeName(attribute.name);
    const value = attribute.value;
    const srcSpan = attribute.sourceSpan;
    const absoluteOffset = attribute.valueSpan ? attribute.valueSpan.start.offset : srcSpan.start.offset;
    function createKeySpan(srcSpan2, prefix, identifier) {
      const normalizationAdjustment = attribute.name.length - name.length;
      const keySpanStart = srcSpan2.start.moveBy(prefix.length + normalizationAdjustment);
      const keySpanEnd = keySpanStart.moveBy(identifier.length);
      return new ParseSourceSpan(keySpanStart, keySpanEnd, keySpanStart, identifier);
    }
    const bindParts = name.match(BIND_NAME_REGEXP);
    if (bindParts) {
      if (bindParts[KW_BIND_IDX] != null) {
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_BIND_IDX], identifier);
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute.valueSpan, matchableAttributes, parsedProperties, keySpan2);
      } else if (bindParts[KW_LET_IDX]) {
        if (isTemplateElement) {
          const identifier = bindParts[IDENT_KW_IDX];
          const keySpan2 = createKeySpan(srcSpan, bindParts[KW_LET_IDX], identifier);
          this.parseVariable(identifier, value, srcSpan, keySpan2, attribute.valueSpan, variables);
        } else {
          this.reportError(`"let-" is only supported on ng-template elements.`, srcSpan);
        }
      } else if (bindParts[KW_REF_IDX]) {
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_REF_IDX], identifier);
        this.parseReference(identifier, value, srcSpan, keySpan2, attribute.valueSpan, references);
      } else if (bindParts[KW_ON_IDX]) {
        const events = [];
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_ON_IDX], identifier);
        this.bindingParser.parseEvent(identifier, value, false, srcSpan, attribute.valueSpan || srcSpan, matchableAttributes, events, keySpan2);
        addEvents(events, boundEvents);
      } else if (bindParts[KW_BINDON_IDX]) {
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_BINDON_IDX], identifier);
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute.valueSpan, matchableAttributes, parsedProperties, keySpan2);
        this.parseAssignmentEvent(identifier, value, srcSpan, attribute.valueSpan, matchableAttributes, boundEvents, keySpan2);
      } else if (bindParts[KW_AT_IDX]) {
        const keySpan2 = createKeySpan(srcSpan, "", name);
        this.bindingParser.parseLiteralAttr(name, value, srcSpan, absoluteOffset, attribute.valueSpan, matchableAttributes, parsedProperties, keySpan2);
      }
      return true;
    }
    let delims = null;
    if (name.startsWith(BINDING_DELIMS.BANANA_BOX.start)) {
      delims = BINDING_DELIMS.BANANA_BOX;
    } else if (name.startsWith(BINDING_DELIMS.PROPERTY.start)) {
      delims = BINDING_DELIMS.PROPERTY;
    } else if (name.startsWith(BINDING_DELIMS.EVENT.start)) {
      delims = BINDING_DELIMS.EVENT;
    }
    if (delims !== null && name.endsWith(delims.end) && name.length > delims.start.length + delims.end.length) {
      const identifier = name.substring(delims.start.length, name.length - delims.end.length);
      const keySpan2 = createKeySpan(srcSpan, delims.start, identifier);
      if (delims.start === BINDING_DELIMS.BANANA_BOX.start) {
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute.valueSpan, matchableAttributes, parsedProperties, keySpan2);
        this.parseAssignmentEvent(identifier, value, srcSpan, attribute.valueSpan, matchableAttributes, boundEvents, keySpan2);
      } else if (delims.start === BINDING_DELIMS.PROPERTY.start) {
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute.valueSpan, matchableAttributes, parsedProperties, keySpan2);
      } else {
        const events = [];
        this.bindingParser.parseEvent(identifier, value, false, srcSpan, attribute.valueSpan || srcSpan, matchableAttributes, events, keySpan2);
        addEvents(events, boundEvents);
      }
      return true;
    }
    const keySpan = createKeySpan(srcSpan, "", name);
    const hasBinding = this.bindingParser.parsePropertyInterpolation(name, value, srcSpan, attribute.valueSpan, matchableAttributes, parsedProperties, keySpan, (_a = attribute.valueTokens) !== null && _a !== void 0 ? _a : null);
    return hasBinding;
  }
  _visitTextWithInterpolation(value, sourceSpan, interpolatedTokens, i18n) {
    const valueNoNgsp = replaceNgsp(value);
    const expr = this.bindingParser.parseInterpolation(valueNoNgsp, sourceSpan, interpolatedTokens);
    return expr ? new BoundText(expr, sourceSpan, i18n) : new Text$3(valueNoNgsp, sourceSpan);
  }
  parseVariable(identifier, value, sourceSpan, keySpan, valueSpan, variables) {
    if (identifier.indexOf("-") > -1) {
      this.reportError(`"-" is not allowed in variable names`, sourceSpan);
    } else if (identifier.length === 0) {
      this.reportError(`Variable does not have a name`, sourceSpan);
    }
    variables.push(new Variable(identifier, value, sourceSpan, keySpan, valueSpan));
  }
  parseReference(identifier, value, sourceSpan, keySpan, valueSpan, references) {
    if (identifier.indexOf("-") > -1) {
      this.reportError(`"-" is not allowed in reference names`, sourceSpan);
    } else if (identifier.length === 0) {
      this.reportError(`Reference does not have a name`, sourceSpan);
    } else if (references.some((reference) => reference.name === identifier)) {
      this.reportError(`Reference "#${identifier}" is defined more than once`, sourceSpan);
    }
    references.push(new Reference(identifier, value, sourceSpan, keySpan, valueSpan));
  }
  parseAssignmentEvent(name, expression, sourceSpan, valueSpan, targetMatchableAttrs, boundEvents, keySpan) {
    const events = [];
    this.bindingParser.parseEvent(`${name}Change`, `${expression} =$event`, true, sourceSpan, valueSpan || sourceSpan, targetMatchableAttrs, events, keySpan);
    addEvents(events, boundEvents);
  }
  reportError(message, sourceSpan, level = ParseErrorLevel.ERROR) {
    this.errors.push(new ParseError(sourceSpan, message, level));
  }
};
var NonBindableVisitor = class {
  visitElement(ast) {
    const preparsedElement = preparseElement(ast);
    if (preparsedElement.type === PreparsedElementType.SCRIPT || preparsedElement.type === PreparsedElementType.STYLE || preparsedElement.type === PreparsedElementType.STYLESHEET) {
      return null;
    }
    const children = visitAll(this, ast.children, null);
    return new Element$1(ast.name, visitAll(this, ast.attrs), [], [], children, [], ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
  }
  visitComment(comment2) {
    return null;
  }
  visitAttribute(attribute) {
    return new TextAttribute(attribute.name, attribute.value, attribute.sourceSpan, attribute.keySpan, attribute.valueSpan, attribute.i18n);
  }
  visitText(text) {
    return new Text$3(text.value, text.sourceSpan);
  }
  visitExpansion(expansion) {
    return null;
  }
  visitExpansionCase(expansionCase) {
    return null;
  }
};
var NON_BINDABLE_VISITOR = new NonBindableVisitor();
function normalizeAttributeName(attrName) {
  return /^data-/i.test(attrName) ? attrName.substring(5) : attrName;
}
function addEvents(events, boundEvents) {
  boundEvents.push(...events.map((e) => BoundEvent.fromParsedEvent(e)));
}
function isEmptyTextNode(node) {
  return node instanceof Text && node.value.trim().length == 0;
}
function isCommentNode(node) {
  return node instanceof Comment;
}
function textContents(node) {
  if (node.children.length !== 1 || !(node.children[0] instanceof Text)) {
    return null;
  } else {
    return node.children[0].value;
  }
}
var TagType;
(function(TagType2) {
  TagType2[TagType2["ELEMENT"] = 0] = "ELEMENT";
  TagType2[TagType2["TEMPLATE"] = 1] = "TEMPLATE";
})(TagType || (TagType = {}));
function setupRegistry() {
  return { getUniqueId: getSeqNumberGenerator(), icus: /* @__PURE__ */ new Map() };
}
var I18nContext = class {
  constructor(index2, ref, level = 0, templateIndex = null, meta, registry) {
    this.index = index2;
    this.ref = ref;
    this.level = level;
    this.templateIndex = templateIndex;
    this.meta = meta;
    this.registry = registry;
    this.bindings = /* @__PURE__ */ new Set();
    this.placeholders = /* @__PURE__ */ new Map();
    this.isEmitted = false;
    this._unresolvedCtxCount = 0;
    this._registry = registry || setupRegistry();
    this.id = this._registry.getUniqueId();
  }
  appendTag(type, node, index2, closed) {
    if (node.isVoid && closed) {
      return;
    }
    const ph = node.isVoid || !closed ? node.startName : node.closeName;
    const content = { type, index: index2, ctx: this.id, isVoid: node.isVoid, closed };
    updatePlaceholderMap(this.placeholders, ph, content);
  }
  get icus() {
    return this._registry.icus;
  }
  get isRoot() {
    return this.level === 0;
  }
  get isResolved() {
    return this._unresolvedCtxCount === 0;
  }
  getSerializedPlaceholders() {
    const result = /* @__PURE__ */ new Map();
    this.placeholders.forEach((values, key) => result.set(key, values.map(serializePlaceholderValue)));
    return result;
  }
  appendBinding(binding) {
    this.bindings.add(binding);
  }
  appendIcu(name, ref) {
    updatePlaceholderMap(this._registry.icus, name, ref);
  }
  appendBoundText(node) {
    const phs = assembleBoundTextPlaceholders(node, this.bindings.size, this.id);
    phs.forEach((values, key) => updatePlaceholderMap(this.placeholders, key, ...values));
  }
  appendTemplate(node, index2) {
    this.appendTag(TagType.TEMPLATE, node, index2, false);
    this.appendTag(TagType.TEMPLATE, node, index2, true);
    this._unresolvedCtxCount++;
  }
  appendElement(node, index2, closed) {
    this.appendTag(TagType.ELEMENT, node, index2, closed);
  }
  appendProjection(node, index2) {
    this.appendTag(TagType.ELEMENT, node, index2, false);
    this.appendTag(TagType.ELEMENT, node, index2, true);
  }
  forkChildContext(index2, templateIndex, meta) {
    return new I18nContext(index2, this.ref, this.level + 1, templateIndex, meta, this._registry);
  }
  reconcileChildContext(context) {
    ["start", "close"].forEach((op) => {
      const key = context.meta[`${op}Name`];
      const phs = this.placeholders.get(key) || [];
      const tag = phs.find(findTemplateFn(this.id, context.templateIndex));
      if (tag) {
        tag.ctx = context.id;
      }
    });
    const childPhs = context.placeholders;
    childPhs.forEach((values, key) => {
      const phs = this.placeholders.get(key);
      if (!phs) {
        this.placeholders.set(key, values);
        return;
      }
      const tmplIdx = phs.findIndex(findTemplateFn(context.id, context.templateIndex));
      if (tmplIdx >= 0) {
        const isCloseTag = key.startsWith("CLOSE");
        const isTemplateTag = key.endsWith("NG-TEMPLATE");
        if (isTemplateTag) {
          phs.splice(tmplIdx + (isCloseTag ? 0 : 1), 0, ...values);
        } else {
          const idx = isCloseTag ? values.length - 1 : 0;
          values[idx].tmpl = phs[tmplIdx];
          phs.splice(tmplIdx, 1, ...values);
        }
      } else {
        phs.push(...values);
      }
      this.placeholders.set(key, phs);
    });
    this._unresolvedCtxCount--;
  }
};
function wrap(symbol, index2, contextId, closed) {
  const state = closed ? "/" : "";
  return wrapI18nPlaceholder(`${state}${symbol}${index2}`, contextId);
}
function wrapTag(symbol, { index: index2, ctx, isVoid }, closed) {
  return isVoid ? wrap(symbol, index2, ctx) + wrap(symbol, index2, ctx, true) : wrap(symbol, index2, ctx, closed);
}
function findTemplateFn(ctx, templateIndex) {
  return (token) => typeof token === "object" && token.type === TagType.TEMPLATE && token.index === templateIndex && token.ctx === ctx;
}
function serializePlaceholderValue(value) {
  const element = (data, closed) => wrapTag("#", data, closed);
  const template = (data, closed) => wrapTag("*", data, closed);
  const projection = (data, closed) => wrapTag("!", data, closed);
  switch (value.type) {
    case TagType.ELEMENT:
      if (value.closed) {
        return element(value, true) + (value.tmpl ? template(value.tmpl, true) : "");
      }
      if (value.tmpl) {
        return template(value.tmpl) + element(value) + (value.isVoid ? template(value.tmpl, true) : "");
      }
      return element(value);
    case TagType.TEMPLATE:
      return template(value, value.closed);
    default:
      return value;
  }
}
var IcuSerializerVisitor = class {
  visitText(text) {
    return text.value;
  }
  visitContainer(container) {
    return container.children.map((child) => child.visit(this)).join("");
  }
  visitIcu(icu) {
    const strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    const result = `{${icu.expressionPlaceholder}, ${icu.type}, ${strCases.join(" ")}}`;
    return result;
  }
  visitTagPlaceholder(ph) {
    return ph.isVoid ? this.formatPh(ph.startName) : `${this.formatPh(ph.startName)}${ph.children.map((child) => child.visit(this)).join("")}${this.formatPh(ph.closeName)}`;
  }
  visitPlaceholder(ph) {
    return this.formatPh(ph.name);
  }
  visitIcuPlaceholder(ph, context) {
    return this.formatPh(ph.name);
  }
  formatPh(value) {
    return `{${formatI18nPlaceholderName(value, false)}}`;
  }
};
var serializer = new IcuSerializerVisitor();
function serializeIcuNode(icu) {
  return icu.visit(serializer);
}
var TAG_TO_PLACEHOLDER_NAMES = {
  "A": "LINK",
  "B": "BOLD_TEXT",
  "BR": "LINE_BREAK",
  "EM": "EMPHASISED_TEXT",
  "H1": "HEADING_LEVEL1",
  "H2": "HEADING_LEVEL2",
  "H3": "HEADING_LEVEL3",
  "H4": "HEADING_LEVEL4",
  "H5": "HEADING_LEVEL5",
  "H6": "HEADING_LEVEL6",
  "HR": "HORIZONTAL_RULE",
  "I": "ITALIC_TEXT",
  "LI": "LIST_ITEM",
  "LINK": "MEDIA_LINK",
  "OL": "ORDERED_LIST",
  "P": "PARAGRAPH",
  "Q": "QUOTATION",
  "S": "STRIKETHROUGH_TEXT",
  "SMALL": "SMALL_TEXT",
  "SUB": "SUBSTRIPT",
  "SUP": "SUPERSCRIPT",
  "TBODY": "TABLE_BODY",
  "TD": "TABLE_CELL",
  "TFOOT": "TABLE_FOOTER",
  "TH": "TABLE_HEADER_CELL",
  "THEAD": "TABLE_HEADER",
  "TR": "TABLE_ROW",
  "TT": "MONOSPACED_TEXT",
  "U": "UNDERLINED_TEXT",
  "UL": "UNORDERED_LIST"
};
var PlaceholderRegistry = class {
  constructor() {
    this._placeHolderNameCounts = {};
    this._signatureToName = {};
  }
  getStartTagPlaceholderName(tag, attrs, isVoid) {
    const signature = this._hashTag(tag, attrs, isVoid);
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const upperTag = tag.toUpperCase();
    const baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || `TAG_${upperTag}`;
    const name = this._generateUniqueName(isVoid ? baseName : `START_${baseName}`);
    this._signatureToName[signature] = name;
    return name;
  }
  getCloseTagPlaceholderName(tag) {
    const signature = this._hashClosingTag(tag);
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const upperTag = tag.toUpperCase();
    const baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || `TAG_${upperTag}`;
    const name = this._generateUniqueName(`CLOSE_${baseName}`);
    this._signatureToName[signature] = name;
    return name;
  }
  getPlaceholderName(name, content) {
    const upperName = name.toUpperCase();
    const signature = `PH: ${upperName}=${content}`;
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const uniqueName = this._generateUniqueName(upperName);
    this._signatureToName[signature] = uniqueName;
    return uniqueName;
  }
  getUniquePlaceholder(name) {
    return this._generateUniqueName(name.toUpperCase());
  }
  _hashTag(tag, attrs, isVoid) {
    const start = `<${tag}`;
    const strAttrs = Object.keys(attrs).sort().map((name) => ` ${name}=${attrs[name]}`).join("");
    const end = isVoid ? "/>" : `></${tag}>`;
    return start + strAttrs + end;
  }
  _hashClosingTag(tag) {
    return this._hashTag(`/${tag}`, {}, false);
  }
  _generateUniqueName(base) {
    const seen = this._placeHolderNameCounts.hasOwnProperty(base);
    if (!seen) {
      this._placeHolderNameCounts[base] = 1;
      return base;
    }
    const id = this._placeHolderNameCounts[base];
    this._placeHolderNameCounts[base] = id + 1;
    return `${base}_${id}`;
  }
};
var _expParser = new Parser$1(new Lexer());
function createI18nMessageFactory(interpolationConfig) {
  const visitor = new _I18nVisitor(_expParser, interpolationConfig);
  return (nodes, meaning, description, customId, visitNodeFn) => visitor.toI18nMessage(nodes, meaning, description, customId, visitNodeFn);
}
function noopVisitNodeFn(_html, i18n) {
  return i18n;
}
var _I18nVisitor = class {
  constructor(_expressionParser, _interpolationConfig) {
    this._expressionParser = _expressionParser;
    this._interpolationConfig = _interpolationConfig;
  }
  toI18nMessage(nodes, meaning = "", description = "", customId = "", visitNodeFn) {
    const context = {
      isIcu: nodes.length == 1 && nodes[0] instanceof Expansion,
      icuDepth: 0,
      placeholderRegistry: new PlaceholderRegistry(),
      placeholderToContent: {},
      placeholderToMessage: {},
      visitNodeFn: visitNodeFn || noopVisitNodeFn
    };
    const i18nodes = visitAll(this, nodes, context);
    return new Message(i18nodes, context.placeholderToContent, context.placeholderToMessage, meaning, description, customId);
  }
  visitElement(el, context) {
    var _a;
    const children = visitAll(this, el.children, context);
    const attrs = {};
    el.attrs.forEach((attr) => {
      attrs[attr.name] = attr.value;
    });
    const isVoid = getHtmlTagDefinition(el.name).isVoid;
    const startPhName = context.placeholderRegistry.getStartTagPlaceholderName(el.name, attrs, isVoid);
    context.placeholderToContent[startPhName] = {
      text: el.startSourceSpan.toString(),
      sourceSpan: el.startSourceSpan
    };
    let closePhName = "";
    if (!isVoid) {
      closePhName = context.placeholderRegistry.getCloseTagPlaceholderName(el.name);
      context.placeholderToContent[closePhName] = {
        text: `</${el.name}>`,
        sourceSpan: (_a = el.endSourceSpan) !== null && _a !== void 0 ? _a : el.sourceSpan
      };
    }
    const node = new TagPlaceholder(el.name, attrs, startPhName, closePhName, children, isVoid, el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
    return context.visitNodeFn(el, node);
  }
  visitAttribute(attribute, context) {
    const node = attribute.valueTokens === void 0 || attribute.valueTokens.length === 1 ? new Text$2(attribute.value, attribute.valueSpan || attribute.sourceSpan) : this._visitTextWithInterpolation(attribute.valueTokens, attribute.valueSpan || attribute.sourceSpan, context, attribute.i18n);
    return context.visitNodeFn(attribute, node);
  }
  visitText(text, context) {
    const node = text.tokens.length === 1 ? new Text$2(text.value, text.sourceSpan) : this._visitTextWithInterpolation(text.tokens, text.sourceSpan, context, text.i18n);
    return context.visitNodeFn(text, node);
  }
  visitComment(comment2, context) {
    return null;
  }
  visitExpansion(icu, context) {
    context.icuDepth++;
    const i18nIcuCases = {};
    const i18nIcu = new Icu(icu.switchValue, icu.type, i18nIcuCases, icu.sourceSpan);
    icu.cases.forEach((caze) => {
      i18nIcuCases[caze.value] = new Container(caze.expression.map((node2) => node2.visit(this, context)), caze.expSourceSpan);
    });
    context.icuDepth--;
    if (context.isIcu || context.icuDepth > 0) {
      const expPh = context.placeholderRegistry.getUniquePlaceholder(`VAR_${icu.type}`);
      i18nIcu.expressionPlaceholder = expPh;
      context.placeholderToContent[expPh] = {
        text: icu.switchValue,
        sourceSpan: icu.switchValueSourceSpan
      };
      return context.visitNodeFn(icu, i18nIcu);
    }
    const phName = context.placeholderRegistry.getPlaceholderName("ICU", icu.sourceSpan.toString());
    context.placeholderToMessage[phName] = this.toI18nMessage([icu], "", "", "", void 0);
    const node = new IcuPlaceholder(i18nIcu, phName, icu.sourceSpan);
    return context.visitNodeFn(icu, node);
  }
  visitExpansionCase(_icuCase, _context) {
    throw new Error("Unreachable code");
  }
  _visitTextWithInterpolation(tokens, sourceSpan, context, previousI18n) {
    const nodes = [];
    let hasInterpolation = false;
    for (const token of tokens) {
      switch (token.type) {
        case 8:
        case 17:
          hasInterpolation = true;
          const expression = token.parts[1];
          const baseName = extractPlaceholderName(expression) || "INTERPOLATION";
          const phName = context.placeholderRegistry.getPlaceholderName(baseName, expression);
          context.placeholderToContent[phName] = {
            text: token.parts.join(""),
            sourceSpan: token.sourceSpan
          };
          nodes.push(new Placeholder(expression, phName, token.sourceSpan));
          break;
        default:
          if (token.parts[0].length > 0) {
            const previous = nodes[nodes.length - 1];
            if (previous instanceof Text$2) {
              previous.value += token.parts[0];
              previous.sourceSpan = new ParseSourceSpan(previous.sourceSpan.start, token.sourceSpan.end, previous.sourceSpan.fullStart, previous.sourceSpan.details);
            } else {
              nodes.push(new Text$2(token.parts[0], token.sourceSpan));
            }
          }
          break;
      }
    }
    if (hasInterpolation) {
      reusePreviousSourceSpans(nodes, previousI18n);
      return new Container(nodes, sourceSpan);
    } else {
      return nodes[0];
    }
  }
};
function reusePreviousSourceSpans(nodes, previousI18n) {
  if (previousI18n instanceof Message) {
    assertSingleContainerMessage(previousI18n);
    previousI18n = previousI18n.nodes[0];
  }
  if (previousI18n instanceof Container) {
    assertEquivalentNodes(previousI18n.children, nodes);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].sourceSpan = previousI18n.children[i].sourceSpan;
    }
  }
}
function assertSingleContainerMessage(message) {
  const nodes = message.nodes;
  if (nodes.length !== 1 || !(nodes[0] instanceof Container)) {
    throw new Error("Unexpected previous i18n message - expected it to consist of only a single `Container` node.");
  }
}
function assertEquivalentNodes(previousNodes, nodes) {
  if (previousNodes.length !== nodes.length) {
    throw new Error("The number of i18n message children changed between first and second pass.");
  }
  if (previousNodes.some((node, i) => nodes[i].constructor !== node.constructor)) {
    throw new Error("The types of the i18n message children changed between first and second pass.");
  }
}
var _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*("|')([\s\S]*?)\1[\s\S]*\)/g;
function extractPlaceholderName(input) {
  return input.split(_CUSTOM_PH_EXP)[2];
}
var I18nError = class extends ParseError {
  constructor(span, msg) {
    super(span, msg);
  }
};
var setI18nRefs = (htmlNode, i18nNode) => {
  if (htmlNode instanceof NodeWithI18n) {
    if (i18nNode instanceof IcuPlaceholder && htmlNode.i18n instanceof Message) {
      i18nNode.previousMessage = htmlNode.i18n;
    }
    htmlNode.i18n = i18nNode;
  }
  return i18nNode;
};
var I18nMetaVisitor = class {
  constructor(interpolationConfig = DEFAULT_INTERPOLATION_CONFIG, keepI18nAttrs = false, enableI18nLegacyMessageIdFormat = false) {
    this.interpolationConfig = interpolationConfig;
    this.keepI18nAttrs = keepI18nAttrs;
    this.enableI18nLegacyMessageIdFormat = enableI18nLegacyMessageIdFormat;
    this.hasI18nMeta = false;
    this._errors = [];
    this._createI18nMessage = createI18nMessageFactory(this.interpolationConfig);
  }
  _generateI18nMessage(nodes, meta = "", visitNodeFn) {
    const { meaning, description, customId } = this._parseMetadata(meta);
    const message = this._createI18nMessage(nodes, meaning, description, customId, visitNodeFn);
    this._setMessageId(message, meta);
    this._setLegacyIds(message, meta);
    return message;
  }
  visitAllWithErrors(nodes) {
    const result = nodes.map((node) => node.visit(this, null));
    return new ParseTreeResult(result, this._errors);
  }
  visitElement(element) {
    let message = void 0;
    if (hasI18nAttrs(element)) {
      this.hasI18nMeta = true;
      const attrs = [];
      const attrsMeta = {};
      for (const attr of element.attrs) {
        if (attr.name === I18N_ATTR) {
          const i18n = element.i18n || attr.value;
          message = this._generateI18nMessage(element.children, i18n, setI18nRefs);
          if (message.nodes.length === 0) {
            message = void 0;
          }
          element.i18n = message;
        } else if (attr.name.startsWith(I18N_ATTR_PREFIX)) {
          const name = attr.name.slice(I18N_ATTR_PREFIX.length);
          if (isTrustedTypesSink(element.name, name)) {
            this._reportError(attr, `Translating attribute '${name}' is disallowed for security reasons.`);
          } else {
            attrsMeta[name] = attr.value;
          }
        } else {
          attrs.push(attr);
        }
      }
      if (Object.keys(attrsMeta).length) {
        for (const attr of attrs) {
          const meta = attrsMeta[attr.name];
          if (meta !== void 0 && attr.value) {
            attr.i18n = this._generateI18nMessage([attr], attr.i18n || meta);
          }
        }
      }
      if (!this.keepI18nAttrs) {
        element.attrs = attrs;
      }
    }
    visitAll(this, element.children, message);
    return element;
  }
  visitExpansion(expansion, currentMessage) {
    let message;
    const meta = expansion.i18n;
    this.hasI18nMeta = true;
    if (meta instanceof IcuPlaceholder) {
      const name = meta.name;
      message = this._generateI18nMessage([expansion], meta);
      const icu = icuFromI18nMessage(message);
      icu.name = name;
      if (currentMessage !== null) {
        currentMessage.placeholderToMessage[name] = message;
      }
    } else {
      message = this._generateI18nMessage([expansion], currentMessage || meta);
    }
    expansion.i18n = message;
    return expansion;
  }
  visitText(text) {
    return text;
  }
  visitAttribute(attribute) {
    return attribute;
  }
  visitComment(comment2) {
    return comment2;
  }
  visitExpansionCase(expansionCase) {
    return expansionCase;
  }
  _parseMetadata(meta) {
    return typeof meta === "string" ? parseI18nMeta(meta) : meta instanceof Message ? meta : {};
  }
  _setMessageId(message, meta) {
    if (!message.id) {
      message.id = meta instanceof Message && meta.id || decimalDigest(message);
    }
  }
  _setLegacyIds(message, meta) {
    if (this.enableI18nLegacyMessageIdFormat) {
      message.legacyIds = [computeDigest(message), computeDecimalDigest(message)];
    } else if (typeof meta !== "string") {
      const previousMessage = meta instanceof Message ? meta : meta instanceof IcuPlaceholder ? meta.previousMessage : void 0;
      message.legacyIds = previousMessage ? previousMessage.legacyIds : [];
    }
  }
  _reportError(node, msg) {
    this._errors.push(new I18nError(node.sourceSpan, msg));
  }
};
var I18N_MEANING_SEPARATOR = "|";
var I18N_ID_SEPARATOR = "@@";
function parseI18nMeta(meta = "") {
  let customId;
  let meaning;
  let description;
  meta = meta.trim();
  if (meta) {
    const idIndex = meta.indexOf(I18N_ID_SEPARATOR);
    const descIndex = meta.indexOf(I18N_MEANING_SEPARATOR);
    let meaningAndDesc;
    [meaningAndDesc, customId] = idIndex > -1 ? [meta.slice(0, idIndex), meta.slice(idIndex + 2)] : [meta, ""];
    [meaning, description] = descIndex > -1 ? [meaningAndDesc.slice(0, descIndex), meaningAndDesc.slice(descIndex + 1)] : ["", meaningAndDesc];
  }
  return { customId, meaning, description };
}
function i18nMetaToJSDoc(meta) {
  const tags = [];
  if (meta.description) {
    tags.push({ tagName: "desc", text: meta.description });
  } else {
    tags.push({ tagName: "suppress", text: "{msgDescriptions}" });
  }
  if (meta.meaning) {
    tags.push({ tagName: "meaning", text: meta.meaning });
  }
  return jsDocComment(tags);
}
var GOOG_GET_MSG = "goog.getMsg";
function createGoogleGetMsgStatements(variable$1, message, closureVar, placeholderValues) {
  const messageString = serializeI18nMessageForGetMsg(message);
  const args = [literal(messageString)];
  if (Object.keys(placeholderValues).length) {
    args.push(mapLiteral(formatI18nPlaceholderNamesInMap(placeholderValues, true), true));
    args.push(mapLiteral({
      original_code: literalMap(Object.keys(placeholderValues).map((param) => ({
        key: formatI18nPlaceholderName(param),
        quoted: true,
        value: message.placeholders[param] ? literal(message.placeholders[param].sourceSpan.toString()) : literal(message.placeholderToMessage[param].nodes.map((node) => node.sourceSpan.toString()).join(""))
      })))
    }));
  }
  const googGetMsgStmt = closureVar.set(variable(GOOG_GET_MSG).callFn(args)).toConstDecl();
  googGetMsgStmt.addLeadingComment(i18nMetaToJSDoc(message));
  const i18nAssignmentStmt = new ExpressionStatement(variable$1.set(closureVar));
  return [googGetMsgStmt, i18nAssignmentStmt];
}
var GetMsgSerializerVisitor = class {
  formatPh(value) {
    return `{$${formatI18nPlaceholderName(value)}}`;
  }
  visitText(text) {
    return text.value;
  }
  visitContainer(container) {
    return container.children.map((child) => child.visit(this)).join("");
  }
  visitIcu(icu) {
    return serializeIcuNode(icu);
  }
  visitTagPlaceholder(ph) {
    return ph.isVoid ? this.formatPh(ph.startName) : `${this.formatPh(ph.startName)}${ph.children.map((child) => child.visit(this)).join("")}${this.formatPh(ph.closeName)}`;
  }
  visitPlaceholder(ph) {
    return this.formatPh(ph.name);
  }
  visitIcuPlaceholder(ph, context) {
    return this.formatPh(ph.name);
  }
};
var serializerVisitor = new GetMsgSerializerVisitor();
function serializeI18nMessageForGetMsg(message) {
  return message.nodes.map((node) => node.visit(serializerVisitor, null)).join("");
}
function createLocalizeStatements(variable2, message, params) {
  const { messageParts, placeHolders } = serializeI18nMessageForLocalize(message);
  const sourceSpan = getSourceSpan(message);
  const expressions = placeHolders.map((ph) => params[ph.text]);
  const localizedString$1 = localizedString(message, messageParts, placeHolders, expressions, sourceSpan);
  const variableInitialization = variable2.set(localizedString$1);
  return [new ExpressionStatement(variableInitialization)];
}
var LocalizeSerializerVisitor = class {
  constructor(placeholderToMessage, pieces) {
    this.placeholderToMessage = placeholderToMessage;
    this.pieces = pieces;
  }
  visitText(text) {
    if (this.pieces[this.pieces.length - 1] instanceof LiteralPiece) {
      this.pieces[this.pieces.length - 1].text += text.value;
    } else {
      const sourceSpan = new ParseSourceSpan(text.sourceSpan.fullStart, text.sourceSpan.end, text.sourceSpan.fullStart, text.sourceSpan.details);
      this.pieces.push(new LiteralPiece(text.value, sourceSpan));
    }
  }
  visitContainer(container) {
    container.children.forEach((child) => child.visit(this));
  }
  visitIcu(icu) {
    this.pieces.push(new LiteralPiece(serializeIcuNode(icu), icu.sourceSpan));
  }
  visitTagPlaceholder(ph) {
    var _a, _b;
    this.pieces.push(this.createPlaceholderPiece(ph.startName, (_a = ph.startSourceSpan) !== null && _a !== void 0 ? _a : ph.sourceSpan));
    if (!ph.isVoid) {
      ph.children.forEach((child) => child.visit(this));
      this.pieces.push(this.createPlaceholderPiece(ph.closeName, (_b = ph.endSourceSpan) !== null && _b !== void 0 ? _b : ph.sourceSpan));
    }
  }
  visitPlaceholder(ph) {
    this.pieces.push(this.createPlaceholderPiece(ph.name, ph.sourceSpan));
  }
  visitIcuPlaceholder(ph) {
    this.pieces.push(this.createPlaceholderPiece(ph.name, ph.sourceSpan, this.placeholderToMessage[ph.name]));
  }
  createPlaceholderPiece(name, sourceSpan, associatedMessage) {
    return new PlaceholderPiece(formatI18nPlaceholderName(name, false), sourceSpan, associatedMessage);
  }
};
function serializeI18nMessageForLocalize(message) {
  const pieces = [];
  const serializerVisitor2 = new LocalizeSerializerVisitor(message.placeholderToMessage, pieces);
  message.nodes.forEach((node) => node.visit(serializerVisitor2));
  return processMessagePieces(pieces);
}
function getSourceSpan(message) {
  const startNode = message.nodes[0];
  const endNode = message.nodes[message.nodes.length - 1];
  return new ParseSourceSpan(startNode.sourceSpan.fullStart, endNode.sourceSpan.end, startNode.sourceSpan.fullStart, startNode.sourceSpan.details);
}
function processMessagePieces(pieces) {
  const messageParts = [];
  const placeHolders = [];
  if (pieces[0] instanceof PlaceholderPiece) {
    messageParts.push(createEmptyMessagePart(pieces[0].sourceSpan.start));
  }
  for (let i = 0; i < pieces.length; i++) {
    const part = pieces[i];
    if (part instanceof LiteralPiece) {
      messageParts.push(part);
    } else {
      placeHolders.push(part);
      if (pieces[i - 1] instanceof PlaceholderPiece) {
        messageParts.push(createEmptyMessagePart(pieces[i - 1].sourceSpan.end));
      }
    }
  }
  if (pieces[pieces.length - 1] instanceof PlaceholderPiece) {
    messageParts.push(createEmptyMessagePart(pieces[pieces.length - 1].sourceSpan.end));
  }
  return { messageParts, placeHolders };
}
function createEmptyMessagePart(location) {
  return new LiteralPiece("", new ParseSourceSpan(location, location));
}
var NG_CONTENT_SELECT_ATTR = "select";
var NG_PROJECT_AS_ATTR_NAME = "ngProjectAs";
var EVENT_BINDING_SCOPE_GLOBALS = /* @__PURE__ */ new Set(["$event"]);
var GLOBAL_TARGET_RESOLVERS = /* @__PURE__ */ new Map([["window", Identifiers.resolveWindow], ["document", Identifiers.resolveDocument], ["body", Identifiers.resolveBody]]);
var LEADING_TRIVIA_CHARS = [" ", "\n", "\r", "	"];
function renderFlagCheckIfStmt(flags, statements) {
  return ifStmt(variable(RENDER_FLAGS).bitwiseAnd(literal(flags), null, false), statements);
}
function prepareEventListenerParameters(eventAst, handlerName = null, scope = null) {
  const { type, name, target, phase, handler } = eventAst;
  if (target && !GLOBAL_TARGET_RESOLVERS.has(target)) {
    throw new Error(`Unexpected global target '${target}' defined for '${name}' event.
        Supported list of global targets: ${Array.from(GLOBAL_TARGET_RESOLVERS.keys())}.`);
  }
  const eventArgumentName = "$event";
  const implicitReceiverAccesses = /* @__PURE__ */ new Set();
  const implicitReceiverExpr = scope === null || scope.bindingLevel === 0 ? variable(CONTEXT_NAME) : scope.getOrCreateSharedContextVar(0);
  const bindingStatements = convertActionBinding(scope, implicitReceiverExpr, handler, "b", eventAst.handlerSpan, implicitReceiverAccesses, EVENT_BINDING_SCOPE_GLOBALS);
  const statements = [];
  const variableDeclarations = scope === null || scope === void 0 ? void 0 : scope.variableDeclarations();
  const restoreViewStatement = scope === null || scope === void 0 ? void 0 : scope.restoreViewStatement();
  if (variableDeclarations) {
    statements.push(...variableDeclarations);
  }
  statements.push(...bindingStatements);
  if (restoreViewStatement) {
    statements.unshift(restoreViewStatement);
    const lastStatement = statements[statements.length - 1];
    if (lastStatement instanceof ReturnStatement) {
      statements[statements.length - 1] = new ReturnStatement(invokeInstruction(lastStatement.value.sourceSpan, Identifiers.resetView, [lastStatement.value]));
    } else {
      statements.push(new ExpressionStatement(invokeInstruction(null, Identifiers.resetView, [])));
    }
  }
  const eventName = type === 1 ? prepareSyntheticListenerName(name, phase) : name;
  const fnName = handlerName && sanitizeIdentifier(handlerName);
  const fnArgs = [];
  if (implicitReceiverAccesses.has(eventArgumentName)) {
    fnArgs.push(new FnParam(eventArgumentName, DYNAMIC_TYPE));
  }
  const handlerFn = fn(fnArgs, statements, INFERRED_TYPE, null, fnName);
  const params = [literal(eventName), handlerFn];
  if (target) {
    params.push(literal(false), importExpr(GLOBAL_TARGET_RESOLVERS.get(target)));
  }
  return params;
}
function createComponentDefConsts() {
  return {
    prepareStatements: [],
    constExpressions: [],
    i18nVarRefsCache: /* @__PURE__ */ new Map()
  };
}
var TemplateDefinitionBuilder = class {
  constructor(constantPool, parentBindingScope, level = 0, contextName, i18nContext, templateIndex, templateName, _namespace, relativeContextFilePath, i18nUseExternalIds, _constants = createComponentDefConsts()) {
    this.constantPool = constantPool;
    this.level = level;
    this.contextName = contextName;
    this.i18nContext = i18nContext;
    this.templateIndex = templateIndex;
    this.templateName = templateName;
    this._namespace = _namespace;
    this.i18nUseExternalIds = i18nUseExternalIds;
    this._constants = _constants;
    this._dataIndex = 0;
    this._bindingContext = 0;
    this._prefixCode = [];
    this._creationCodeFns = [];
    this._updateCodeFns = [];
    this._currentIndex = 0;
    this._tempVariables = [];
    this._nestedTemplateFns = [];
    this.i18n = null;
    this._pureFunctionSlots = 0;
    this._bindingSlots = 0;
    this._ngContentReservedSlots = [];
    this._ngContentSelectorsOffset = 0;
    this._implicitReceiverExpr = null;
    this.visitReference = invalid;
    this.visitVariable = invalid;
    this.visitTextAttribute = invalid;
    this.visitBoundAttribute = invalid;
    this.visitBoundEvent = invalid;
    this._bindingScope = parentBindingScope.nestedScope(level);
    this.fileBasedI18nSuffix = relativeContextFilePath.replace(/[^A-Za-z0-9]/g, "_") + "_";
    this._valueConverter = new ValueConverter(constantPool, () => this.allocateDataSlot(), (numSlots) => this.allocatePureFunctionSlots(numSlots), (name, localName, slot, value) => {
      this._bindingScope.set(this.level, localName, value);
      this.creationInstruction(null, Identifiers.pipe, [literal(slot), literal(name)]);
    });
  }
  buildTemplateFunction(nodes, variables, ngContentSelectorsOffset = 0, i18n) {
    this._ngContentSelectorsOffset = ngContentSelectorsOffset;
    if (this._namespace !== Identifiers.namespaceHTML) {
      this.creationInstruction(null, this._namespace);
    }
    variables.forEach((v) => this.registerContextVariables(v));
    const initI18nContext = this.i18nContext || isI18nRootNode(i18n) && !isSingleI18nIcu(i18n) && !(isSingleElementTemplate(nodes) && nodes[0].i18n === i18n);
    const selfClosingI18nInstruction = hasTextChildrenOnly(nodes);
    if (initI18nContext) {
      this.i18nStart(null, i18n, selfClosingI18nInstruction);
    }
    visitAll$1(this, nodes);
    this._pureFunctionSlots += this._bindingSlots;
    this._valueConverter.updatePipeSlotOffsets(this._bindingSlots);
    this._nestedTemplateFns.forEach((buildTemplateFn) => buildTemplateFn());
    if (this.level === 0 && this._ngContentReservedSlots.length) {
      const parameters = [];
      if (this._ngContentReservedSlots.length > 1 || this._ngContentReservedSlots[0] !== "*") {
        const r3ReservedSlots = this._ngContentReservedSlots.map((s) => s !== "*" ? parseSelectorToR3Selector(s) : s);
        parameters.push(this.constantPool.getConstLiteral(asLiteral(r3ReservedSlots), true));
      }
      this.creationInstruction(null, Identifiers.projectionDef, parameters, true);
    }
    if (initI18nContext) {
      this.i18nEnd(null, selfClosingI18nInstruction);
    }
    const creationStatements = getInstructionStatements(this._creationCodeFns);
    const updateStatements = getInstructionStatements(this._updateCodeFns);
    const creationVariables = this._bindingScope.viewSnapshotStatements();
    const updateVariables = this._bindingScope.variableDeclarations().concat(this._tempVariables);
    const creationBlock = creationStatements.length > 0 ? [renderFlagCheckIfStmt(1, creationVariables.concat(creationStatements))] : [];
    const updateBlock = updateStatements.length > 0 ? [renderFlagCheckIfStmt(2, updateVariables.concat(updateStatements))] : [];
    return fn([new FnParam(RENDER_FLAGS, NUMBER_TYPE), new FnParam(CONTEXT_NAME, null)], [
      ...this._prefixCode,
      ...creationBlock,
      ...updateBlock
    ], INFERRED_TYPE, null, this.templateName);
  }
  getLocal(name) {
    return this._bindingScope.get(name);
  }
  notifyImplicitReceiverUse() {
    this._bindingScope.notifyImplicitReceiverUse();
  }
  maybeRestoreView() {
    this._bindingScope.maybeRestoreView();
  }
  i18nTranslate(message, params = {}, ref, transformFn) {
    const _ref = ref || this.i18nGenerateMainBlockVar();
    const closureVar = this.i18nGenerateClosureVar(message.id);
    const statements = getTranslationDeclStmts(message, _ref, closureVar, params, transformFn);
    this._constants.prepareStatements.push(...statements);
    return _ref;
  }
  registerContextVariables(variable$1) {
    const scopedName = this._bindingScope.freshReferenceName();
    const retrievalLevel = this.level;
    const lhs = variable(variable$1.name + scopedName);
    this._bindingScope.set(retrievalLevel, variable$1.name, lhs, 1, (scope, relativeLevel) => {
      let rhs;
      if (scope.bindingLevel === retrievalLevel) {
        if (scope.isListenerScope() && scope.hasRestoreViewVariable()) {
          rhs = variable(RESTORED_VIEW_CONTEXT_NAME);
          scope.notifyRestoredViewContextUse();
        } else {
          rhs = variable(CONTEXT_NAME);
        }
      } else {
        const sharedCtxVar = scope.getSharedContextName(retrievalLevel);
        rhs = sharedCtxVar ? sharedCtxVar : generateNextContextExpr(relativeLevel);
      }
      return [lhs.set(rhs.prop(variable$1.value || IMPLICIT_REFERENCE)).toConstDecl()];
    });
  }
  i18nAppendBindings(expressions) {
    if (expressions.length > 0) {
      expressions.forEach((expression) => this.i18n.appendBinding(expression));
    }
  }
  i18nBindProps(props) {
    const bound = {};
    Object.keys(props).forEach((key) => {
      const prop = props[key];
      if (prop instanceof Text$3) {
        bound[key] = literal(prop.value);
      } else {
        const value = prop.value.visit(this._valueConverter);
        this.allocateBindingSlots(value);
        if (value instanceof Interpolation) {
          const { strings, expressions } = value;
          const { id, bindings } = this.i18n;
          const label = assembleI18nBoundString(strings, bindings.size, id);
          this.i18nAppendBindings(expressions);
          bound[key] = literal(label);
        }
      }
    });
    return bound;
  }
  i18nGenerateMainBlockVar() {
    return variable(this.constantPool.uniqueName(TRANSLATION_VAR_PREFIX));
  }
  i18nGenerateClosureVar(messageId) {
    let name;
    const suffix = this.fileBasedI18nSuffix.toUpperCase();
    if (this.i18nUseExternalIds) {
      const prefix = getTranslationConstPrefix(`EXTERNAL_`);
      const uniqueSuffix = this.constantPool.uniqueName(suffix);
      name = `${prefix}${sanitizeIdentifier(messageId)}$$${uniqueSuffix}`;
    } else {
      const prefix = getTranslationConstPrefix(suffix);
      name = this.constantPool.uniqueName(prefix);
    }
    return variable(name);
  }
  i18nUpdateRef(context) {
    const { icus, meta, isRoot, isResolved, isEmitted } = context;
    if (isRoot && isResolved && !isEmitted && !isSingleI18nIcu(meta)) {
      context.isEmitted = true;
      const placeholders = context.getSerializedPlaceholders();
      let icuMapping = {};
      let params = placeholders.size ? placeholdersToParams(placeholders) : {};
      if (icus.size) {
        icus.forEach((refs, key) => {
          if (refs.length === 1) {
            params[key] = refs[0];
          } else {
            const placeholder = wrapI18nPlaceholder(`${I18N_ICU_MAPPING_PREFIX}${key}`);
            params[key] = literal(placeholder);
            icuMapping[key] = literalArr(refs);
          }
        });
      }
      const needsPostprocessing = Array.from(placeholders.values()).some((value) => value.length > 1) || Object.keys(icuMapping).length;
      let transformFn;
      if (needsPostprocessing) {
        transformFn = (raw) => {
          const args = [raw];
          if (Object.keys(icuMapping).length) {
            args.push(mapLiteral(icuMapping, true));
          }
          return invokeInstruction(null, Identifiers.i18nPostprocess, args);
        };
      }
      this.i18nTranslate(meta, params, context.ref, transformFn);
    }
  }
  i18nStart(span = null, meta, selfClosing) {
    const index2 = this.allocateDataSlot();
    this.i18n = this.i18nContext ? this.i18nContext.forkChildContext(index2, this.templateIndex, meta) : new I18nContext(index2, this.i18nGenerateMainBlockVar(), 0, this.templateIndex, meta);
    const { id, ref } = this.i18n;
    const params = [literal(index2), this.addToConsts(ref)];
    if (id > 0) {
      params.push(literal(id));
    }
    this.creationInstruction(span, selfClosing ? Identifiers.i18n : Identifiers.i18nStart, params);
  }
  i18nEnd(span = null, selfClosing) {
    if (!this.i18n) {
      throw new Error("i18nEnd is executed with no i18n context present");
    }
    if (this.i18nContext) {
      this.i18nContext.reconcileChildContext(this.i18n);
      this.i18nUpdateRef(this.i18nContext);
    } else {
      this.i18nUpdateRef(this.i18n);
    }
    const { index: index2, bindings } = this.i18n;
    if (bindings.size) {
      for (const binding of bindings) {
        this.updateInstructionWithAdvance(this.getConstCount() - 1, span, Identifiers.i18nExp, () => this.convertPropertyBinding(binding));
      }
      this.updateInstruction(span, Identifiers.i18nApply, [literal(index2)]);
    }
    if (!selfClosing) {
      this.creationInstruction(span, Identifiers.i18nEnd);
    }
    this.i18n = null;
  }
  i18nAttributesInstruction(nodeIndex, attrs, sourceSpan) {
    let hasBindings = false;
    const i18nAttrArgs = [];
    attrs.forEach((attr) => {
      const message = attr.i18n;
      const converted = attr.value.visit(this._valueConverter);
      this.allocateBindingSlots(converted);
      if (converted instanceof Interpolation) {
        const placeholders = assembleBoundTextPlaceholders(message);
        const params = placeholdersToParams(placeholders);
        i18nAttrArgs.push(literal(attr.name), this.i18nTranslate(message, params));
        converted.expressions.forEach((expression) => {
          hasBindings = true;
          this.updateInstructionWithAdvance(nodeIndex, sourceSpan, Identifiers.i18nExp, () => this.convertPropertyBinding(expression));
        });
      }
    });
    if (i18nAttrArgs.length > 0) {
      const index2 = literal(this.allocateDataSlot());
      const constIndex = this.addToConsts(literalArr(i18nAttrArgs));
      this.creationInstruction(sourceSpan, Identifiers.i18nAttributes, [index2, constIndex]);
      if (hasBindings) {
        this.updateInstruction(sourceSpan, Identifiers.i18nApply, [index2]);
      }
    }
  }
  getNamespaceInstruction(namespaceKey) {
    switch (namespaceKey) {
      case "math":
        return Identifiers.namespaceMathML;
      case "svg":
        return Identifiers.namespaceSVG;
      default:
        return Identifiers.namespaceHTML;
    }
  }
  addNamespaceInstruction(nsInstruction, element) {
    this._namespace = nsInstruction;
    this.creationInstruction(element.startSourceSpan, nsInstruction);
  }
  interpolatedUpdateInstruction(instruction, elementIndex, attrName, input, value, params) {
    this.updateInstructionWithAdvance(elementIndex, input.sourceSpan, instruction, () => [literal(attrName), ...this.getUpdateInstructionArguments(value), ...params]);
  }
  visitContent(ngContent) {
    const slot = this.allocateDataSlot();
    const projectionSlotIdx = this._ngContentSelectorsOffset + this._ngContentReservedSlots.length;
    const parameters = [literal(slot)];
    this._ngContentReservedSlots.push(ngContent.selector);
    const nonContentSelectAttributes = ngContent.attributes.filter((attr) => attr.name.toLowerCase() !== NG_CONTENT_SELECT_ATTR);
    const attributes = this.getAttributeExpressions(ngContent.name, nonContentSelectAttributes, [], []);
    if (attributes.length > 0) {
      parameters.push(literal(projectionSlotIdx), literalArr(attributes));
    } else if (projectionSlotIdx !== 0) {
      parameters.push(literal(projectionSlotIdx));
    }
    this.creationInstruction(ngContent.sourceSpan, Identifiers.projection, parameters);
    if (this.i18n) {
      this.i18n.appendProjection(ngContent.i18n, slot);
    }
  }
  visitElement(element) {
    var _a, _b;
    const elementIndex = this.allocateDataSlot();
    const stylingBuilder = new StylingBuilder(null);
    let isNonBindableMode = false;
    const isI18nRootElement = isI18nRootNode(element.i18n) && !isSingleI18nIcu(element.i18n);
    const outputAttrs = [];
    const [namespaceKey, elementName] = splitNsName(element.name);
    const isNgContainer$1 = isNgContainer(element.name);
    for (const attr of element.attributes) {
      const { name, value } = attr;
      if (name === NON_BINDABLE_ATTR) {
        isNonBindableMode = true;
      } else if (name === "style") {
        stylingBuilder.registerStyleAttr(value);
      } else if (name === "class") {
        stylingBuilder.registerClassAttr(value);
      } else {
        outputAttrs.push(attr);
      }
    }
    const parameters = [literal(elementIndex)];
    if (!isNgContainer$1) {
      parameters.push(literal(elementName));
    }
    const allOtherInputs = [];
    const boundI18nAttrs = [];
    element.inputs.forEach((input) => {
      const stylingInputWasSet = stylingBuilder.registerBoundInput(input);
      if (!stylingInputWasSet) {
        if (input.type === 0 && input.i18n) {
          boundI18nAttrs.push(input);
        } else {
          allOtherInputs.push(input);
        }
      }
    });
    const attributes = this.getAttributeExpressions(element.name, outputAttrs, allOtherInputs, element.outputs, stylingBuilder, [], boundI18nAttrs);
    parameters.push(this.addAttrsToConsts(attributes));
    const refs = this.prepareRefsArray(element.references);
    parameters.push(this.addToConsts(refs));
    const wasInNamespace = this._namespace;
    const currentNamespace = this.getNamespaceInstruction(namespaceKey);
    if (currentNamespace !== wasInNamespace) {
      this.addNamespaceInstruction(currentNamespace, element);
    }
    if (this.i18n) {
      this.i18n.appendElement(element.i18n, elementIndex);
    }
    const hasChildren = !isI18nRootElement && this.i18n ? !hasTextChildrenOnly(element.children) : element.children.length > 0;
    const createSelfClosingInstruction = !stylingBuilder.hasBindingsWithPipes && element.outputs.length === 0 && boundI18nAttrs.length === 0 && !hasChildren;
    const createSelfClosingI18nInstruction = !createSelfClosingInstruction && hasTextChildrenOnly(element.children);
    if (createSelfClosingInstruction) {
      this.creationInstruction(element.sourceSpan, isNgContainer$1 ? Identifiers.elementContainer : Identifiers.element, trimTrailingNulls(parameters));
    } else {
      this.creationInstruction(element.startSourceSpan, isNgContainer$1 ? Identifiers.elementContainerStart : Identifiers.elementStart, trimTrailingNulls(parameters));
      if (isNonBindableMode) {
        this.creationInstruction(element.startSourceSpan, Identifiers.disableBindings);
      }
      if (boundI18nAttrs.length > 0) {
        this.i18nAttributesInstruction(elementIndex, boundI18nAttrs, (_a = element.startSourceSpan) !== null && _a !== void 0 ? _a : element.sourceSpan);
      }
      if (element.outputs.length > 0) {
        for (const outputAst of element.outputs) {
          this.creationInstruction(outputAst.sourceSpan, Identifiers.listener, this.prepareListenerParameter(element.name, outputAst, elementIndex));
        }
      }
      if (isI18nRootElement) {
        this.i18nStart(element.startSourceSpan, element.i18n, createSelfClosingI18nInstruction);
      }
    }
    const stylingInstructions = stylingBuilder.buildUpdateLevelInstructions(this._valueConverter);
    const limit = stylingInstructions.length - 1;
    for (let i = 0; i <= limit; i++) {
      const instruction = stylingInstructions[i];
      this._bindingSlots += this.processStylingUpdateInstruction(elementIndex, instruction);
    }
    const emptyValueBindInstruction = literal(void 0);
    const propertyBindings = [];
    const attributeBindings = [];
    allOtherInputs.forEach((input) => {
      const inputType = input.type;
      if (inputType === 4) {
        const value = input.value.visit(this._valueConverter);
        const hasValue = value instanceof LiteralPrimitive ? !!value.value : true;
        this.allocateBindingSlots(value);
        propertyBindings.push({
          span: input.sourceSpan,
          paramsOrFn: getBindingFunctionParams(() => hasValue ? this.convertPropertyBinding(value) : emptyValueBindInstruction, prepareSyntheticPropertyName(input.name))
        });
      } else {
        if (input.i18n)
          return;
        const value = input.value.visit(this._valueConverter);
        if (value !== void 0) {
          const params = [];
          const [attrNamespace, attrName] = splitNsName(input.name);
          const isAttributeBinding = inputType === 1;
          const sanitizationRef = resolveSanitizationFn(input.securityContext, isAttributeBinding);
          if (sanitizationRef)
            params.push(sanitizationRef);
          if (attrNamespace) {
            const namespaceLiteral = literal(attrNamespace);
            if (sanitizationRef) {
              params.push(namespaceLiteral);
            } else {
              params.push(literal(null), namespaceLiteral);
            }
          }
          this.allocateBindingSlots(value);
          if (inputType === 0) {
            if (value instanceof Interpolation) {
              this.interpolatedUpdateInstruction(getPropertyInterpolationExpression(value), elementIndex, attrName, input, value, params);
            } else {
              propertyBindings.push({
                span: input.sourceSpan,
                paramsOrFn: getBindingFunctionParams(() => this.convertPropertyBinding(value), attrName, params)
              });
            }
          } else if (inputType === 1) {
            if (value instanceof Interpolation && getInterpolationArgsLength(value) > 1) {
              this.interpolatedUpdateInstruction(getAttributeInterpolationExpression(value), elementIndex, attrName, input, value, params);
            } else {
              const boundValue = value instanceof Interpolation ? value.expressions[0] : value;
              attributeBindings.push({
                span: input.sourceSpan,
                paramsOrFn: getBindingFunctionParams(() => this.convertPropertyBinding(boundValue), attrName, params)
              });
            }
          } else {
            this.updateInstructionWithAdvance(elementIndex, input.sourceSpan, Identifiers.classProp, () => {
              return [
                literal(elementIndex),
                literal(attrName),
                this.convertPropertyBinding(value),
                ...params
              ];
            });
          }
        }
      }
    });
    for (const propertyBinding of propertyBindings) {
      this.updateInstructionWithAdvance(elementIndex, propertyBinding.span, Identifiers.property, propertyBinding.paramsOrFn);
    }
    for (const attributeBinding of attributeBindings) {
      this.updateInstructionWithAdvance(elementIndex, attributeBinding.span, Identifiers.attribute, attributeBinding.paramsOrFn);
    }
    visitAll$1(this, element.children);
    if (!isI18nRootElement && this.i18n) {
      this.i18n.appendElement(element.i18n, elementIndex, true);
    }
    if (!createSelfClosingInstruction) {
      const span = (_b = element.endSourceSpan) !== null && _b !== void 0 ? _b : element.sourceSpan;
      if (isI18nRootElement) {
        this.i18nEnd(span, createSelfClosingI18nInstruction);
      }
      if (isNonBindableMode) {
        this.creationInstruction(span, Identifiers.enableBindings);
      }
      this.creationInstruction(span, isNgContainer$1 ? Identifiers.elementContainerEnd : Identifiers.elementEnd);
    }
  }
  visitTemplate(template) {
    var _a;
    const NG_TEMPLATE_TAG_NAME = "ng-template";
    const templateIndex = this.allocateDataSlot();
    if (this.i18n) {
      this.i18n.appendTemplate(template.i18n, templateIndex);
    }
    const tagNameWithoutNamespace = template.tagName ? splitNsName(template.tagName)[1] : template.tagName;
    const contextName = `${this.contextName}${template.tagName ? "_" + sanitizeIdentifier(template.tagName) : ""}_${templateIndex}`;
    const templateName = `${contextName}_Template`;
    const parameters = [
      literal(templateIndex),
      variable(templateName),
      literal(tagNameWithoutNamespace)
    ];
    const attrsExprs = this.getAttributeExpressions(NG_TEMPLATE_TAG_NAME, template.attributes, template.inputs, template.outputs, void 0, template.templateAttrs);
    parameters.push(this.addAttrsToConsts(attrsExprs));
    if (template.references && template.references.length) {
      const refs = this.prepareRefsArray(template.references);
      parameters.push(this.addToConsts(refs));
      parameters.push(importExpr(Identifiers.templateRefExtractor));
    }
    const templateVisitor = new TemplateDefinitionBuilder(this.constantPool, this._bindingScope, this.level + 1, contextName, this.i18n, templateIndex, templateName, this._namespace, this.fileBasedI18nSuffix, this.i18nUseExternalIds, this._constants);
    this._nestedTemplateFns.push(() => {
      const templateFunctionExpr = templateVisitor.buildTemplateFunction(template.children, template.variables, this._ngContentReservedSlots.length + this._ngContentSelectorsOffset, template.i18n);
      this.constantPool.statements.push(templateFunctionExpr.toDeclStmt(templateName));
      if (templateVisitor._ngContentReservedSlots.length) {
        this._ngContentReservedSlots.push(...templateVisitor._ngContentReservedSlots);
      }
    });
    this.creationInstruction(template.sourceSpan, Identifiers.templateCreate, () => {
      parameters.splice(2, 0, literal(templateVisitor.getConstCount()), literal(templateVisitor.getVarCount()));
      return trimTrailingNulls(parameters);
    });
    this.templatePropertyBindings(templateIndex, template.templateAttrs);
    if (tagNameWithoutNamespace === NG_TEMPLATE_TAG_NAME) {
      const [i18nInputs, inputs] = partitionArray(template.inputs, hasI18nMeta);
      if (i18nInputs.length > 0) {
        this.i18nAttributesInstruction(templateIndex, i18nInputs, (_a = template.startSourceSpan) !== null && _a !== void 0 ? _a : template.sourceSpan);
      }
      if (inputs.length > 0) {
        this.templatePropertyBindings(templateIndex, inputs);
      }
      for (const outputAst of template.outputs) {
        this.creationInstruction(outputAst.sourceSpan, Identifiers.listener, this.prepareListenerParameter("ng_template", outputAst, templateIndex));
      }
    }
  }
  visitBoundText(text) {
    if (this.i18n) {
      const value2 = text.value.visit(this._valueConverter);
      this.allocateBindingSlots(value2);
      if (value2 instanceof Interpolation) {
        this.i18n.appendBoundText(text.i18n);
        this.i18nAppendBindings(value2.expressions);
      }
      return;
    }
    const nodeIndex = this.allocateDataSlot();
    this.creationInstruction(text.sourceSpan, Identifiers.text, [literal(nodeIndex)]);
    const value = text.value.visit(this._valueConverter);
    this.allocateBindingSlots(value);
    if (value instanceof Interpolation) {
      this.updateInstructionWithAdvance(nodeIndex, text.sourceSpan, getTextInterpolationExpression(value), () => this.getUpdateInstructionArguments(value));
    } else {
      error("Text nodes should be interpolated and never bound directly.");
    }
  }
  visitText(text) {
    if (!this.i18n) {
      this.creationInstruction(text.sourceSpan, Identifiers.text, [literal(this.allocateDataSlot()), literal(text.value)]);
    }
  }
  visitIcu(icu) {
    let initWasInvoked = false;
    if (!this.i18n) {
      initWasInvoked = true;
      this.i18nStart(null, icu.i18n, true);
    }
    const i18n = this.i18n;
    const vars = this.i18nBindProps(icu.vars);
    const placeholders = this.i18nBindProps(icu.placeholders);
    const message = icu.i18n;
    const transformFn = (raw) => {
      const params = Object.assign(Object.assign({}, vars), placeholders);
      const formatted = formatI18nPlaceholderNamesInMap(params, false);
      return invokeInstruction(null, Identifiers.i18nPostprocess, [raw, mapLiteral(formatted, true)]);
    };
    if (isSingleI18nIcu(i18n.meta)) {
      this.i18nTranslate(message, {}, i18n.ref, transformFn);
    } else {
      const ref = this.i18nTranslate(message, {}, void 0, transformFn);
      i18n.appendIcu(icuFromI18nMessage(message).name, ref);
    }
    if (initWasInvoked) {
      this.i18nEnd(null, true);
    }
    return null;
  }
  allocateDataSlot() {
    return this._dataIndex++;
  }
  getConstCount() {
    return this._dataIndex;
  }
  getVarCount() {
    return this._pureFunctionSlots;
  }
  getConsts() {
    return this._constants;
  }
  getNgContentSelectors() {
    return this._ngContentReservedSlots.length ? this.constantPool.getConstLiteral(asLiteral(this._ngContentReservedSlots), true) : null;
  }
  bindingContext() {
    return `${this._bindingContext++}`;
  }
  templatePropertyBindings(templateIndex, attrs) {
    const propertyBindings = [];
    for (const input of attrs) {
      if (!(input instanceof BoundAttribute)) {
        continue;
      }
      const value = input.value.visit(this._valueConverter);
      if (value === void 0) {
        continue;
      }
      this.allocateBindingSlots(value);
      if (value instanceof Interpolation) {
        const params = [];
        this.interpolatedUpdateInstruction(getPropertyInterpolationExpression(value), templateIndex, input.name, input, value, params);
      } else {
        propertyBindings.push({
          span: input.sourceSpan,
          paramsOrFn: getBindingFunctionParams(() => this.convertPropertyBinding(value), input.name)
        });
      }
    }
    for (const propertyBinding of propertyBindings) {
      this.updateInstructionWithAdvance(templateIndex, propertyBinding.span, Identifiers.property, propertyBinding.paramsOrFn);
    }
  }
  instructionFn(fns, span, reference, paramsOrFn, prepend = false) {
    fns[prepend ? "unshift" : "push"]({ span, reference, paramsOrFn });
  }
  processStylingUpdateInstruction(elementIndex, instruction) {
    let allocateBindingSlots = 0;
    if (instruction) {
      for (const call of instruction.calls) {
        allocateBindingSlots += call.allocateBindingSlots;
        this.updateInstructionWithAdvance(elementIndex, call.sourceSpan, instruction.reference, () => call.params((value) => call.supportsInterpolation && value instanceof Interpolation ? this.getUpdateInstructionArguments(value) : this.convertPropertyBinding(value)));
      }
    }
    return allocateBindingSlots;
  }
  creationInstruction(span, reference, paramsOrFn, prepend) {
    this.instructionFn(this._creationCodeFns, span, reference, paramsOrFn || [], prepend);
  }
  updateInstructionWithAdvance(nodeIndex, span, reference, paramsOrFn) {
    this.addAdvanceInstructionIfNecessary(nodeIndex, span);
    this.updateInstruction(span, reference, paramsOrFn);
  }
  updateInstruction(span, reference, paramsOrFn) {
    this.instructionFn(this._updateCodeFns, span, reference, paramsOrFn || []);
  }
  addAdvanceInstructionIfNecessary(nodeIndex, span) {
    if (nodeIndex !== this._currentIndex) {
      const delta = nodeIndex - this._currentIndex;
      if (delta < 1) {
        throw new Error("advance instruction can only go forwards");
      }
      this.instructionFn(this._updateCodeFns, span, Identifiers.advance, [literal(delta)]);
      this._currentIndex = nodeIndex;
    }
  }
  allocatePureFunctionSlots(numSlots) {
    const originalSlots = this._pureFunctionSlots;
    this._pureFunctionSlots += numSlots;
    return originalSlots;
  }
  allocateBindingSlots(value) {
    this._bindingSlots += value instanceof Interpolation ? value.expressions.length : 1;
  }
  getImplicitReceiverExpr() {
    if (this._implicitReceiverExpr) {
      return this._implicitReceiverExpr;
    }
    return this._implicitReceiverExpr = this.level === 0 ? variable(CONTEXT_NAME) : this._bindingScope.getOrCreateSharedContextVar(0);
  }
  convertPropertyBinding(value) {
    const convertedPropertyBinding = convertPropertyBinding(this, this.getImplicitReceiverExpr(), value, this.bindingContext());
    const valExpr = convertedPropertyBinding.currValExpr;
    this._tempVariables.push(...convertedPropertyBinding.stmts);
    return valExpr;
  }
  getUpdateInstructionArguments(value) {
    const { args, stmts } = convertUpdateArguments(this, this.getImplicitReceiverExpr(), value, this.bindingContext());
    this._tempVariables.push(...stmts);
    return args;
  }
  getAttributeExpressions(elementName, renderAttributes, inputs, outputs, styles, templateAttrs = [], boundI18nAttrs = []) {
    const alreadySeen = /* @__PURE__ */ new Set();
    const attrExprs = [];
    let ngProjectAsAttr;
    for (const attr of renderAttributes) {
      if (attr.name === NG_PROJECT_AS_ATTR_NAME) {
        ngProjectAsAttr = attr;
      }
      if (attr.i18n) {
        const { i18nVarRefsCache } = this._constants;
        let i18nVarRef;
        if (i18nVarRefsCache.has(attr.i18n)) {
          i18nVarRef = i18nVarRefsCache.get(attr.i18n);
        } else {
          i18nVarRef = this.i18nTranslate(attr.i18n);
          i18nVarRefsCache.set(attr.i18n, i18nVarRef);
        }
        attrExprs.push(literal(attr.name), i18nVarRef);
      } else {
        attrExprs.push(...getAttributeNameLiterals(attr.name), trustedConstAttribute(elementName, attr));
      }
    }
    if (ngProjectAsAttr) {
      attrExprs.push(...getNgProjectAsLiteral(ngProjectAsAttr));
    }
    function addAttrExpr(key, value) {
      if (typeof key === "string") {
        if (!alreadySeen.has(key)) {
          attrExprs.push(...getAttributeNameLiterals(key));
          value !== void 0 && attrExprs.push(value);
          alreadySeen.add(key);
        }
      } else {
        attrExprs.push(literal(key));
      }
    }
    if (styles) {
      styles.populateInitialStylingAttrs(attrExprs);
    }
    if (inputs.length || outputs.length) {
      const attrsLengthBeforeInputs = attrExprs.length;
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.type !== 4 && input.type !== 1) {
          addAttrExpr(input.name);
        }
      }
      for (let i = 0; i < outputs.length; i++) {
        const output = outputs[i];
        if (output.type !== 1) {
          addAttrExpr(output.name);
        }
      }
      if (attrExprs.length !== attrsLengthBeforeInputs) {
        attrExprs.splice(attrsLengthBeforeInputs, 0, literal(3));
      }
    }
    if (templateAttrs.length) {
      attrExprs.push(literal(4));
      templateAttrs.forEach((attr) => addAttrExpr(attr.name));
    }
    if (boundI18nAttrs.length) {
      attrExprs.push(literal(6));
      boundI18nAttrs.forEach((attr) => addAttrExpr(attr.name));
    }
    return attrExprs;
  }
  addToConsts(expression) {
    if (isNull(expression)) {
      return TYPED_NULL_EXPR;
    }
    const consts = this._constants.constExpressions;
    for (let i = 0; i < consts.length; i++) {
      if (consts[i].isEquivalent(expression)) {
        return literal(i);
      }
    }
    return literal(consts.push(expression) - 1);
  }
  addAttrsToConsts(attrs) {
    return attrs.length > 0 ? this.addToConsts(literalArr(attrs)) : TYPED_NULL_EXPR;
  }
  prepareRefsArray(references) {
    if (!references || references.length === 0) {
      return TYPED_NULL_EXPR;
    }
    const refsParam = flatten(references.map((reference) => {
      const slot = this.allocateDataSlot();
      const variableName = this._bindingScope.freshReferenceName();
      const retrievalLevel = this.level;
      const lhs = variable(variableName);
      this._bindingScope.set(retrievalLevel, reference.name, lhs, 0, (scope, relativeLevel) => {
        const nextContextStmt = relativeLevel > 0 ? [generateNextContextExpr(relativeLevel).toStmt()] : [];
        const refExpr = lhs.set(importExpr(Identifiers.reference).callFn([literal(slot)]));
        return nextContextStmt.concat(refExpr.toConstDecl());
      }, true);
      return [reference.name, reference.value];
    }));
    return asLiteral(refsParam);
  }
  prepareListenerParameter(tagName, outputAst, index2) {
    return () => {
      const eventName = outputAst.name;
      const bindingFnName = outputAst.type === 1 ? prepareSyntheticListenerFunctionName(eventName, outputAst.phase) : sanitizeIdentifier(eventName);
      const handlerName = `${this.templateName}_${tagName}_${bindingFnName}_${index2}_listener`;
      const scope = this._bindingScope.nestedScope(this._bindingScope.bindingLevel, EVENT_BINDING_SCOPE_GLOBALS);
      return prepareEventListenerParameters(outputAst, handlerName, scope);
    };
  }
};
var ValueConverter = class extends AstMemoryEfficientTransformer {
  constructor(constantPool, allocateSlot, allocatePureFunctionSlots, definePipe) {
    super();
    this.constantPool = constantPool;
    this.allocateSlot = allocateSlot;
    this.allocatePureFunctionSlots = allocatePureFunctionSlots;
    this.definePipe = definePipe;
    this._pipeBindExprs = [];
  }
  visitPipe(pipe, context) {
    const slot = this.allocateSlot();
    const slotPseudoLocal = `PIPE:${slot}`;
    const pureFunctionSlot = this.allocatePureFunctionSlots(2 + pipe.args.length);
    const target = new PropertyRead(pipe.span, pipe.sourceSpan, pipe.nameSpan, new ImplicitReceiver(pipe.span, pipe.sourceSpan), slotPseudoLocal);
    const { identifier, isVarLength } = pipeBindingCallInfo(pipe.args);
    this.definePipe(pipe.name, slotPseudoLocal, slot, importExpr(identifier));
    const args = [pipe.exp, ...pipe.args];
    const convertedArgs = isVarLength ? this.visitAll([new LiteralArray(pipe.span, pipe.sourceSpan, args)]) : this.visitAll(args);
    const pipeBindExpr = new Call(pipe.span, pipe.sourceSpan, target, [
      new LiteralPrimitive(pipe.span, pipe.sourceSpan, slot),
      new LiteralPrimitive(pipe.span, pipe.sourceSpan, pureFunctionSlot),
      ...convertedArgs
    ], null);
    this._pipeBindExprs.push(pipeBindExpr);
    return pipeBindExpr;
  }
  updatePipeSlotOffsets(bindingSlots) {
    this._pipeBindExprs.forEach((pipe) => {
      const slotOffset = pipe.args[1];
      slotOffset.value += bindingSlots;
    });
  }
  visitLiteralArray(array, context) {
    return new BuiltinFunctionCall(array.span, array.sourceSpan, this.visitAll(array.expressions), (values) => {
      const literal2 = literalArr(values);
      return getLiteralFactory(this.constantPool, literal2, this.allocatePureFunctionSlots);
    });
  }
  visitLiteralMap(map, context) {
    return new BuiltinFunctionCall(map.span, map.sourceSpan, this.visitAll(map.values), (values) => {
      const literal2 = literalMap(values.map((value, index2) => ({ key: map.keys[index2].key, value, quoted: map.keys[index2].quoted })));
      return getLiteralFactory(this.constantPool, literal2, this.allocatePureFunctionSlots);
    });
  }
};
var pipeBindingIdentifiers = [Identifiers.pipeBind1, Identifiers.pipeBind2, Identifiers.pipeBind3, Identifiers.pipeBind4];
function pipeBindingCallInfo(args) {
  const identifier = pipeBindingIdentifiers[args.length];
  return {
    identifier: identifier || Identifiers.pipeBindV,
    isVarLength: !identifier
  };
}
var pureFunctionIdentifiers = [
  Identifiers.pureFunction0,
  Identifiers.pureFunction1,
  Identifiers.pureFunction2,
  Identifiers.pureFunction3,
  Identifiers.pureFunction4,
  Identifiers.pureFunction5,
  Identifiers.pureFunction6,
  Identifiers.pureFunction7,
  Identifiers.pureFunction8
];
function pureFunctionCallInfo(args) {
  const identifier = pureFunctionIdentifiers[args.length];
  return {
    identifier: identifier || Identifiers.pureFunctionV,
    isVarLength: !identifier
  };
}
function generateNextContextExpr(relativeLevelDiff) {
  return importExpr(Identifiers.nextContext).callFn(relativeLevelDiff > 1 ? [literal(relativeLevelDiff)] : []);
}
function getLiteralFactory(constantPool, literal$1, allocateSlots) {
  const { literalFactory, literalFactoryArguments } = constantPool.getLiteralFactory(literal$1);
  const startSlot = allocateSlots(1 + literalFactoryArguments.length);
  const { identifier, isVarLength } = pureFunctionCallInfo(literalFactoryArguments);
  const args = [literal(startSlot), literalFactory];
  if (isVarLength) {
    args.push(literalArr(literalFactoryArguments));
  } else {
    args.push(...literalFactoryArguments);
  }
  return importExpr(identifier).callFn(args);
}
function getAttributeNameLiterals(name) {
  const [attributeNamespace, attributeName] = splitNsName(name);
  const nameLiteral = literal(attributeName);
  if (attributeNamespace) {
    return [
      literal(0),
      literal(attributeNamespace),
      nameLiteral
    ];
  }
  return [nameLiteral];
}
var SHARED_CONTEXT_KEY = "$$shared_ctx$$";
var BindingScope = class {
  constructor(bindingLevel = 0, parent = null, globals) {
    this.bindingLevel = bindingLevel;
    this.parent = parent;
    this.globals = globals;
    this.map = /* @__PURE__ */ new Map();
    this.referenceNameIndex = 0;
    this.restoreViewVariable = null;
    this.usesRestoredViewContext = false;
    if (globals !== void 0) {
      for (const name of globals) {
        this.set(0, name, variable(name));
      }
    }
  }
  static createRootScope() {
    return new BindingScope();
  }
  get(name) {
    let current = this;
    while (current) {
      let value = current.map.get(name);
      if (value != null) {
        if (current !== this) {
          value = {
            retrievalLevel: value.retrievalLevel,
            lhs: value.lhs,
            declareLocalCallback: value.declareLocalCallback,
            declare: false,
            priority: value.priority
          };
          this.map.set(name, value);
          this.maybeGenerateSharedContextVar(value);
          this.maybeRestoreView();
        }
        if (value.declareLocalCallback && !value.declare) {
          value.declare = true;
        }
        return value.lhs;
      }
      current = current.parent;
    }
    return this.bindingLevel === 0 ? null : this.getComponentProperty(name);
  }
  set(retrievalLevel, name, lhs, priority = 0, declareLocalCallback, localRef) {
    if (this.map.has(name)) {
      if (localRef) {
        return this;
      }
      error(`The name ${name} is already defined in scope to be ${this.map.get(name)}`);
    }
    this.map.set(name, {
      retrievalLevel,
      lhs,
      declare: false,
      declareLocalCallback,
      priority
    });
    return this;
  }
  getLocal(name) {
    return this.get(name);
  }
  notifyImplicitReceiverUse() {
    if (this.bindingLevel !== 0) {
      this.map.get(SHARED_CONTEXT_KEY + 0).declare = true;
    }
  }
  nestedScope(level, globals) {
    const newScope = new BindingScope(level, this, globals);
    if (level > 0)
      newScope.generateSharedContextVar(0);
    return newScope;
  }
  getOrCreateSharedContextVar(retrievalLevel) {
    const bindingKey = SHARED_CONTEXT_KEY + retrievalLevel;
    if (!this.map.has(bindingKey)) {
      this.generateSharedContextVar(retrievalLevel);
    }
    return this.map.get(bindingKey).lhs;
  }
  getSharedContextName(retrievalLevel) {
    const sharedCtxObj = this.map.get(SHARED_CONTEXT_KEY + retrievalLevel);
    return sharedCtxObj && sharedCtxObj.declare ? sharedCtxObj.lhs : null;
  }
  maybeGenerateSharedContextVar(value) {
    if (value.priority === 1 && value.retrievalLevel < this.bindingLevel) {
      const sharedCtxObj = this.map.get(SHARED_CONTEXT_KEY + value.retrievalLevel);
      if (sharedCtxObj) {
        sharedCtxObj.declare = true;
      } else {
        this.generateSharedContextVar(value.retrievalLevel);
      }
    }
  }
  generateSharedContextVar(retrievalLevel) {
    const lhs = variable(CONTEXT_NAME + this.freshReferenceName());
    this.map.set(SHARED_CONTEXT_KEY + retrievalLevel, {
      retrievalLevel,
      lhs,
      declareLocalCallback: (scope, relativeLevel) => {
        return [lhs.set(generateNextContextExpr(relativeLevel)).toConstDecl()];
      },
      declare: false,
      priority: 2
    });
  }
  getComponentProperty(name) {
    const componentValue = this.map.get(SHARED_CONTEXT_KEY + 0);
    componentValue.declare = true;
    this.maybeRestoreView();
    return componentValue.lhs.prop(name);
  }
  maybeRestoreView() {
    if (this.isListenerScope()) {
      if (!this.parent.restoreViewVariable) {
        this.parent.restoreViewVariable = variable(this.parent.freshReferenceName());
      }
      this.restoreViewVariable = this.parent.restoreViewVariable;
    }
  }
  restoreViewStatement() {
    if (this.restoreViewVariable) {
      const restoreCall = invokeInstruction(null, Identifiers.restoreView, [this.restoreViewVariable]);
      return this.usesRestoredViewContext ? variable(RESTORED_VIEW_CONTEXT_NAME).set(restoreCall).toConstDecl() : restoreCall.toStmt();
    }
    return null;
  }
  viewSnapshotStatements() {
    return this.restoreViewVariable ? [
      this.restoreViewVariable.set(invokeInstruction(null, Identifiers.getCurrentView, [])).toConstDecl()
    ] : [];
  }
  isListenerScope() {
    return this.parent && this.parent.bindingLevel === this.bindingLevel;
  }
  variableDeclarations() {
    let currentContextLevel = 0;
    return Array.from(this.map.values()).filter((value) => value.declare).sort((a, b) => b.retrievalLevel - a.retrievalLevel || b.priority - a.priority).reduce((stmts, value) => {
      const levelDiff = this.bindingLevel - value.retrievalLevel;
      const currStmts = value.declareLocalCallback(this, levelDiff - currentContextLevel);
      currentContextLevel = levelDiff;
      return stmts.concat(currStmts);
    }, []);
  }
  freshReferenceName() {
    let current = this;
    while (current.parent)
      current = current.parent;
    const ref = `${REFERENCE_PREFIX}${current.referenceNameIndex++}`;
    return ref;
  }
  hasRestoreViewVariable() {
    return !!this.restoreViewVariable;
  }
  notifyRestoredViewContextUse() {
    this.usesRestoredViewContext = true;
  }
};
function getNgProjectAsLiteral(attribute) {
  const parsedR3Selector = parseSelectorToR3Selector(attribute.value)[0];
  return [literal(5), asLiteral(parsedR3Selector)];
}
function getPropertyInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.propertyInterpolate;
    case 3:
      return Identifiers.propertyInterpolate1;
    case 5:
      return Identifiers.propertyInterpolate2;
    case 7:
      return Identifiers.propertyInterpolate3;
    case 9:
      return Identifiers.propertyInterpolate4;
    case 11:
      return Identifiers.propertyInterpolate5;
    case 13:
      return Identifiers.propertyInterpolate6;
    case 15:
      return Identifiers.propertyInterpolate7;
    case 17:
      return Identifiers.propertyInterpolate8;
    default:
      return Identifiers.propertyInterpolateV;
  }
}
function getAttributeInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 3:
      return Identifiers.attributeInterpolate1;
    case 5:
      return Identifiers.attributeInterpolate2;
    case 7:
      return Identifiers.attributeInterpolate3;
    case 9:
      return Identifiers.attributeInterpolate4;
    case 11:
      return Identifiers.attributeInterpolate5;
    case 13:
      return Identifiers.attributeInterpolate6;
    case 15:
      return Identifiers.attributeInterpolate7;
    case 17:
      return Identifiers.attributeInterpolate8;
    default:
      return Identifiers.attributeInterpolateV;
  }
}
function getTextInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.textInterpolate;
    case 3:
      return Identifiers.textInterpolate1;
    case 5:
      return Identifiers.textInterpolate2;
    case 7:
      return Identifiers.textInterpolate3;
    case 9:
      return Identifiers.textInterpolate4;
    case 11:
      return Identifiers.textInterpolate5;
    case 13:
      return Identifiers.textInterpolate6;
    case 15:
      return Identifiers.textInterpolate7;
    case 17:
      return Identifiers.textInterpolate8;
    default:
      return Identifiers.textInterpolateV;
  }
}
function parseTemplate(template, templateUrl, options = {}) {
  const { interpolationConfig, preserveWhitespaces, enableI18nLegacyMessageIdFormat } = options;
  const bindingParser = makeBindingParser(interpolationConfig);
  const htmlParser = new HtmlParser();
  const parseResult = htmlParser.parse(template, templateUrl, Object.assign(Object.assign({ leadingTriviaChars: LEADING_TRIVIA_CHARS }, options), { tokenizeExpansionForms: true }));
  if (!options.alwaysAttemptHtmlToR3AstConversion && parseResult.errors && parseResult.errors.length > 0) {
    const parsedTemplate2 = {
      interpolationConfig,
      preserveWhitespaces,
      errors: parseResult.errors,
      nodes: [],
      styleUrls: [],
      styles: [],
      ngContentSelectors: []
    };
    if (options.collectCommentNodes) {
      parsedTemplate2.commentNodes = [];
    }
    return parsedTemplate2;
  }
  let rootNodes = parseResult.rootNodes;
  const i18nMetaVisitor = new I18nMetaVisitor(interpolationConfig, !preserveWhitespaces, enableI18nLegacyMessageIdFormat);
  const i18nMetaResult = i18nMetaVisitor.visitAllWithErrors(rootNodes);
  if (!options.alwaysAttemptHtmlToR3AstConversion && i18nMetaResult.errors && i18nMetaResult.errors.length > 0) {
    const parsedTemplate2 = {
      interpolationConfig,
      preserveWhitespaces,
      errors: i18nMetaResult.errors,
      nodes: [],
      styleUrls: [],
      styles: [],
      ngContentSelectors: []
    };
    if (options.collectCommentNodes) {
      parsedTemplate2.commentNodes = [];
    }
    return parsedTemplate2;
  }
  rootNodes = i18nMetaResult.rootNodes;
  if (!preserveWhitespaces) {
    rootNodes = visitAll(new WhitespaceVisitor(), rootNodes);
    if (i18nMetaVisitor.hasI18nMeta) {
      rootNodes = visitAll(new I18nMetaVisitor(interpolationConfig, false), rootNodes);
    }
  }
  const { nodes, errors, styleUrls, styles, ngContentSelectors, commentNodes } = htmlAstToRender3Ast(rootNodes, bindingParser, { collectCommentNodes: !!options.collectCommentNodes });
  errors.push(...parseResult.errors, ...i18nMetaResult.errors);
  const parsedTemplate = {
    interpolationConfig,
    preserveWhitespaces,
    errors: errors.length > 0 ? errors : null,
    nodes,
    styleUrls,
    styles,
    ngContentSelectors
  };
  if (options.collectCommentNodes) {
    parsedTemplate.commentNodes = commentNodes;
  }
  return parsedTemplate;
}
var elementRegistry = new DomElementSchemaRegistry();
function makeBindingParser(interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
  return new BindingParser(new Parser$1(new Lexer()), interpolationConfig, elementRegistry, []);
}
function resolveSanitizationFn(context, isAttribute) {
  switch (context) {
    case SecurityContext.HTML:
      return importExpr(Identifiers.sanitizeHtml);
    case SecurityContext.SCRIPT:
      return importExpr(Identifiers.sanitizeScript);
    case SecurityContext.STYLE:
      return isAttribute ? importExpr(Identifiers.sanitizeStyle) : null;
    case SecurityContext.URL:
      return importExpr(Identifiers.sanitizeUrl);
    case SecurityContext.RESOURCE_URL:
      return importExpr(Identifiers.sanitizeResourceUrl);
    default:
      return null;
  }
}
function trustedConstAttribute(tagName, attr) {
  const value = asLiteral(attr.value);
  if (isTrustedTypesSink(tagName, attr.name)) {
    switch (elementRegistry.securityContext(tagName, attr.name, true)) {
      case SecurityContext.HTML:
        return taggedTemplate(importExpr(Identifiers.trustConstantHtml), new TemplateLiteral([new TemplateLiteralElement(attr.value)], []), void 0, attr.valueSpan);
      case SecurityContext.RESOURCE_URL:
        return taggedTemplate(importExpr(Identifiers.trustConstantResourceUrl), new TemplateLiteral([new TemplateLiteralElement(attr.value)], []), void 0, attr.valueSpan);
      default:
        return value;
    }
  } else {
    return value;
  }
}
function isSingleElementTemplate(children) {
  return children.length === 1 && children[0] instanceof Element$1;
}
function isTextNode(node) {
  return node instanceof Text$3 || node instanceof BoundText || node instanceof Icu$1;
}
function hasTextChildrenOnly(children) {
  return children.every(isTextNode);
}
function getBindingFunctionParams(deferredParams, name, eagerParams) {
  return () => {
    const value = deferredParams();
    const fnParams = Array.isArray(value) ? value : [value];
    if (eagerParams) {
      fnParams.push(...eagerParams);
    }
    if (name) {
      fnParams.unshift(literal(name));
    }
    return fnParams;
  };
}
var NG_I18N_CLOSURE_MODE = "ngI18nClosureMode";
function getTranslationDeclStmts(message, variable2, closureVar, params = {}, transformFn) {
  const statements = [
    declareI18nVariable(variable2),
    ifStmt(createClosureModeGuard(), createGoogleGetMsgStatements(variable2, message, closureVar, params), createLocalizeStatements(variable2, message, formatI18nPlaceholderNamesInMap(params, false)))
  ];
  if (transformFn) {
    statements.push(new ExpressionStatement(variable2.set(transformFn(variable2))));
  }
  return statements;
}
function createClosureModeGuard() {
  return typeofExpr(variable(NG_I18N_CLOSURE_MODE)).notIdentical(literal("undefined", STRING_TYPE)).and(variable(NG_I18N_CLOSURE_MODE));
}
function flatten(list2) {
  return list2.reduce((flat, item) => {
    const flatItem = Array.isArray(item) ? flatten(item) : item;
    return flat.concat(flatItem);
  }, []);
}
var ATTR_REGEX = /attr\.([^\]]+)/;
var COMPONENT_VARIABLE = "%COMP%";
var HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
var CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
function baseDirectiveFields(meta, constantPool, bindingParser) {
  const definitionMap = new DefinitionMap();
  const selectors = parseSelectorToR3Selector(meta.selector);
  definitionMap.set("type", meta.internalType);
  if (selectors.length > 0) {
    definitionMap.set("selectors", asLiteral(selectors));
  }
  if (meta.queries.length > 0) {
    definitionMap.set("contentQueries", createContentQueriesFunction(meta.queries, constantPool, meta.name));
  }
  if (meta.viewQueries.length) {
    definitionMap.set("viewQuery", createViewQueriesFunction(meta.viewQueries, constantPool, meta.name));
  }
  definitionMap.set("hostBindings", createHostBindingsFunction(meta.host, meta.typeSourceSpan, bindingParser, constantPool, meta.selector || "", meta.name, definitionMap));
  definitionMap.set("inputs", conditionallyCreateMapObjectLiteral(meta.inputs, true));
  definitionMap.set("outputs", conditionallyCreateMapObjectLiteral(meta.outputs));
  if (meta.exportAs !== null) {
    definitionMap.set("exportAs", literalArr(meta.exportAs.map((e) => literal(e))));
  }
  if (meta.isStandalone) {
    definitionMap.set("standalone", literal(true));
  }
  return definitionMap;
}
function addFeatures(definitionMap, meta) {
  var _a;
  const features = [];
  const providers = meta.providers;
  const viewProviders = meta.viewProviders;
  if (providers || viewProviders) {
    const args = [providers || new LiteralArrayExpr([])];
    if (viewProviders) {
      args.push(viewProviders);
    }
    features.push(importExpr(Identifiers.ProvidersFeature).callFn(args));
  }
  if (meta.usesInheritance) {
    features.push(importExpr(Identifiers.InheritDefinitionFeature));
  }
  if (meta.fullInheritance) {
    features.push(importExpr(Identifiers.CopyDefinitionFeature));
  }
  if (meta.lifecycle.usesOnChanges) {
    features.push(importExpr(Identifiers.NgOnChangesFeature));
  }
  if (meta.hasOwnProperty("template") && meta.isStandalone) {
    features.push(importExpr(Identifiers.StandaloneFeature));
  }
  if ((_a = meta.hostDirectives) === null || _a === void 0 ? void 0 : _a.length) {
    features.push(importExpr(Identifiers.HostDirectivesFeature).callFn([createHostDirectivesFeatureArg(meta.hostDirectives)]));
  }
  if (features.length) {
    definitionMap.set("features", literalArr(features));
  }
}
function compileDirectiveFromMetadata(meta, constantPool, bindingParser) {
  const definitionMap = baseDirectiveFields(meta, constantPool, bindingParser);
  addFeatures(definitionMap, meta);
  const expression = importExpr(Identifiers.defineDirective).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createDirectiveType(meta);
  return { expression, type, statements: [] };
}
function compileComponentFromMetadata(meta, constantPool, bindingParser) {
  const definitionMap = baseDirectiveFields(meta, constantPool, bindingParser);
  addFeatures(definitionMap, meta);
  const selector = meta.selector && CssSelector.parse(meta.selector);
  const firstSelector = selector && selector[0];
  if (firstSelector) {
    const selectorAttributes = firstSelector.getAttrs();
    if (selectorAttributes.length) {
      definitionMap.set("attrs", constantPool.getConstLiteral(literalArr(selectorAttributes.map((value) => value != null ? literal(value) : literal(void 0))), true));
    }
  }
  const templateTypeName = meta.name;
  const templateName = templateTypeName ? `${templateTypeName}_Template` : null;
  const changeDetection = meta.changeDetection;
  const template = meta.template;
  const templateBuilder = new TemplateDefinitionBuilder(constantPool, BindingScope.createRootScope(), 0, templateTypeName, null, null, templateName, Identifiers.namespaceHTML, meta.relativeContextFilePath, meta.i18nUseExternalIds);
  const templateFunctionExpression = templateBuilder.buildTemplateFunction(template.nodes, []);
  const ngContentSelectors = templateBuilder.getNgContentSelectors();
  if (ngContentSelectors) {
    definitionMap.set("ngContentSelectors", ngContentSelectors);
  }
  definitionMap.set("decls", literal(templateBuilder.getConstCount()));
  definitionMap.set("vars", literal(templateBuilder.getVarCount()));
  const { constExpressions, prepareStatements } = templateBuilder.getConsts();
  if (constExpressions.length > 0) {
    let constsExpr = literalArr(constExpressions);
    if (prepareStatements.length > 0) {
      constsExpr = fn([], [...prepareStatements, new ReturnStatement(constsExpr)]);
    }
    definitionMap.set("consts", constsExpr);
  }
  definitionMap.set("template", templateFunctionExpression);
  if (meta.declarations.length > 0) {
    definitionMap.set("dependencies", compileDeclarationList(literalArr(meta.declarations.map((decl2) => decl2.type)), meta.declarationListEmitMode));
  }
  if (meta.encapsulation === null) {
    meta.encapsulation = ViewEncapsulation.Emulated;
  }
  if (meta.styles && meta.styles.length) {
    const styleValues = meta.encapsulation == ViewEncapsulation.Emulated ? compileStyles(meta.styles, CONTENT_ATTR, HOST_ATTR) : meta.styles;
    const styleNodes = styleValues.reduce((result, style) => {
      if (style.trim().length > 0) {
        result.push(constantPool.getConstLiteral(literal(style)));
      }
      return result;
    }, []);
    if (styleNodes.length > 0) {
      definitionMap.set("styles", literalArr(styleNodes));
    }
  } else if (meta.encapsulation === ViewEncapsulation.Emulated) {
    meta.encapsulation = ViewEncapsulation.None;
  }
  if (meta.encapsulation !== ViewEncapsulation.Emulated) {
    definitionMap.set("encapsulation", literal(meta.encapsulation));
  }
  if (meta.animations !== null) {
    definitionMap.set("data", literalMap([{ key: "animation", value: meta.animations, quoted: false }]));
  }
  if (changeDetection != null && changeDetection !== ChangeDetectionStrategy.Default) {
    definitionMap.set("changeDetection", literal(changeDetection));
  }
  const expression = importExpr(Identifiers.defineComponent).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createComponentType(meta);
  return { expression, type, statements: [] };
}
function createComponentType(meta) {
  const typeParams = createBaseDirectiveTypeParams(meta);
  typeParams.push(stringArrayAsType(meta.template.ngContentSelectors));
  typeParams.push(expressionType(literal(meta.isStandalone)));
  typeParams.push(createHostDirectivesType(meta));
  return expressionType(importExpr(Identifiers.ComponentDeclaration, typeParams));
}
function compileDeclarationList(list2, mode) {
  switch (mode) {
    case 0:
      return list2;
    case 1:
      return fn([], [new ReturnStatement(list2)]);
    case 2:
      const resolvedList = list2.prop("map").callFn([importExpr(Identifiers.resolveForwardRef)]);
      return fn([], [new ReturnStatement(resolvedList)]);
  }
}
function prepareQueryParams(query, constantPool) {
  const parameters = [getQueryPredicate(query, constantPool), literal(toQueryFlags(query))];
  if (query.read) {
    parameters.push(query.read);
  }
  return parameters;
}
function toQueryFlags(query) {
  return (query.descendants ? 1 : 0) | (query.static ? 2 : 0) | (query.emitDistinctChangesOnly ? 4 : 0);
}
function convertAttributesToExpressions(attributes) {
  const values = [];
  for (let key of Object.getOwnPropertyNames(attributes)) {
    const value = attributes[key];
    values.push(literal(key), value);
  }
  return values;
}
function createContentQueriesFunction(queries, constantPool, name) {
  const createStatements = [];
  const updateStatements = [];
  const tempAllocator = temporaryAllocator(updateStatements, TEMPORARY_NAME);
  for (const query of queries) {
    createStatements.push(importExpr(Identifiers.contentQuery).callFn([variable("dirIndex"), ...prepareQueryParams(query, constantPool)]).toStmt());
    const temporary = tempAllocator();
    const getQueryList = importExpr(Identifiers.loadQuery).callFn([]);
    const refresh = importExpr(Identifiers.queryRefresh).callFn([temporary.set(getQueryList)]);
    const updateDirective = variable(CONTEXT_NAME).prop(query.propertyName).set(query.first ? temporary.prop("first") : temporary);
    updateStatements.push(refresh.and(updateDirective).toStmt());
  }
  const contentQueriesFnName = name ? `${name}_ContentQueries` : null;
  return fn([
    new FnParam(RENDER_FLAGS, NUMBER_TYPE),
    new FnParam(CONTEXT_NAME, null),
    new FnParam("dirIndex", null)
  ], [
    renderFlagCheckIfStmt(1, createStatements),
    renderFlagCheckIfStmt(2, updateStatements)
  ], INFERRED_TYPE, null, contentQueriesFnName);
}
function stringAsType(str) {
  return expressionType(literal(str));
}
function stringMapAsLiteralExpression(map) {
  const mapValues = Object.keys(map).map((key) => {
    const value = Array.isArray(map[key]) ? map[key][0] : map[key];
    return {
      key,
      value: literal(value),
      quoted: true
    };
  });
  return literalMap(mapValues);
}
function stringArrayAsType(arr) {
  return arr.length > 0 ? expressionType(literalArr(arr.map((value) => literal(value)))) : NONE_TYPE;
}
function createBaseDirectiveTypeParams(meta) {
  const selectorForType = meta.selector !== null ? meta.selector.replace(/\n/g, "") : null;
  return [
    typeWithParameters(meta.type.type, meta.typeArgumentCount),
    selectorForType !== null ? stringAsType(selectorForType) : NONE_TYPE,
    meta.exportAs !== null ? stringArrayAsType(meta.exportAs) : NONE_TYPE,
    expressionType(stringMapAsLiteralExpression(meta.inputs)),
    expressionType(stringMapAsLiteralExpression(meta.outputs)),
    stringArrayAsType(meta.queries.map((q) => q.propertyName))
  ];
}
function createDirectiveType(meta) {
  const typeParams = createBaseDirectiveTypeParams(meta);
  typeParams.push(NONE_TYPE);
  typeParams.push(expressionType(literal(meta.isStandalone)));
  typeParams.push(createHostDirectivesType(meta));
  return expressionType(importExpr(Identifiers.DirectiveDeclaration, typeParams));
}
function createViewQueriesFunction(viewQueries, constantPool, name) {
  const createStatements = [];
  const updateStatements = [];
  const tempAllocator = temporaryAllocator(updateStatements, TEMPORARY_NAME);
  viewQueries.forEach((query) => {
    const queryDefinition = importExpr(Identifiers.viewQuery).callFn(prepareQueryParams(query, constantPool));
    createStatements.push(queryDefinition.toStmt());
    const temporary = tempAllocator();
    const getQueryList = importExpr(Identifiers.loadQuery).callFn([]);
    const refresh = importExpr(Identifiers.queryRefresh).callFn([temporary.set(getQueryList)]);
    const updateDirective = variable(CONTEXT_NAME).prop(query.propertyName).set(query.first ? temporary.prop("first") : temporary);
    updateStatements.push(refresh.and(updateDirective).toStmt());
  });
  const viewQueryFnName = name ? `${name}_Query` : null;
  return fn([new FnParam(RENDER_FLAGS, NUMBER_TYPE), new FnParam(CONTEXT_NAME, null)], [
    renderFlagCheckIfStmt(1, createStatements),
    renderFlagCheckIfStmt(2, updateStatements)
  ], INFERRED_TYPE, null, viewQueryFnName);
}
function createHostBindingsFunction(hostBindingsMetadata, typeSourceSpan, bindingParser, constantPool, selector, name, definitionMap) {
  const bindingContext = variable(CONTEXT_NAME);
  const styleBuilder = new StylingBuilder(bindingContext);
  const { styleAttr, classAttr } = hostBindingsMetadata.specialAttributes;
  if (styleAttr !== void 0) {
    styleBuilder.registerStyleAttr(styleAttr);
  }
  if (classAttr !== void 0) {
    styleBuilder.registerClassAttr(classAttr);
  }
  const createInstructions = [];
  const updateInstructions = [];
  const updateVariables = [];
  const hostBindingSourceSpan = typeSourceSpan;
  const eventBindings = bindingParser.createDirectiveHostEventAsts(hostBindingsMetadata.listeners, hostBindingSourceSpan);
  if (eventBindings && eventBindings.length) {
    createInstructions.push(...createHostListeners(eventBindings, name));
  }
  const bindings = bindingParser.createBoundHostProperties(hostBindingsMetadata.properties, hostBindingSourceSpan);
  const allOtherBindings = [];
  let totalHostVarsCount = 0;
  bindings && bindings.forEach((binding) => {
    const stylingInputWasSet = styleBuilder.registerInputBasedOnName(binding.name, binding.expression, hostBindingSourceSpan);
    if (stylingInputWasSet) {
      totalHostVarsCount += MIN_STYLING_BINDING_SLOTS_REQUIRED;
    } else {
      allOtherBindings.push(binding);
      totalHostVarsCount++;
    }
  });
  let valueConverter;
  const getValueConverter = () => {
    if (!valueConverter) {
      const hostVarsCountFn = (numSlots) => {
        const originalVarsCount = totalHostVarsCount;
        totalHostVarsCount += numSlots;
        return originalVarsCount;
      };
      valueConverter = new ValueConverter(constantPool, () => error("Unexpected node"), hostVarsCountFn, () => error("Unexpected pipe"));
    }
    return valueConverter;
  };
  const propertyBindings = [];
  const attributeBindings = [];
  const syntheticHostBindings = [];
  for (const binding of allOtherBindings) {
    const value = binding.expression.visit(getValueConverter());
    const bindingExpr = bindingFn(bindingContext, value);
    const { bindingName, instruction, isAttribute } = getBindingNameAndInstruction(binding);
    const securityContexts = bindingParser.calcPossibleSecurityContexts(selector, bindingName, isAttribute).filter((context) => context !== SecurityContext.NONE);
    let sanitizerFn = null;
    if (securityContexts.length) {
      if (securityContexts.length === 2 && securityContexts.indexOf(SecurityContext.URL) > -1 && securityContexts.indexOf(SecurityContext.RESOURCE_URL) > -1) {
        sanitizerFn = importExpr(Identifiers.sanitizeUrlOrResourceUrl);
      } else {
        sanitizerFn = resolveSanitizationFn(securityContexts[0], isAttribute);
      }
    }
    const instructionParams = [literal(bindingName), bindingExpr.currValExpr];
    if (sanitizerFn) {
      instructionParams.push(sanitizerFn);
    }
    updateVariables.push(...bindingExpr.stmts);
    if (instruction === Identifiers.hostProperty) {
      propertyBindings.push(instructionParams);
    } else if (instruction === Identifiers.attribute) {
      attributeBindings.push(instructionParams);
    } else if (instruction === Identifiers.syntheticHostProperty) {
      syntheticHostBindings.push(instructionParams);
    } else {
      updateInstructions.push({ reference: instruction, paramsOrFn: instructionParams, span: null });
    }
  }
  for (const bindingParams of propertyBindings) {
    updateInstructions.push({ reference: Identifiers.hostProperty, paramsOrFn: bindingParams, span: null });
  }
  for (const bindingParams of attributeBindings) {
    updateInstructions.push({ reference: Identifiers.attribute, paramsOrFn: bindingParams, span: null });
  }
  for (const bindingParams of syntheticHostBindings) {
    updateInstructions.push({ reference: Identifiers.syntheticHostProperty, paramsOrFn: bindingParams, span: null });
  }
  const hostAttrs = convertAttributesToExpressions(hostBindingsMetadata.attributes);
  styleBuilder.assignHostAttrs(hostAttrs, definitionMap);
  if (styleBuilder.hasBindings) {
    styleBuilder.buildUpdateLevelInstructions(getValueConverter()).forEach((instruction) => {
      for (const call of instruction.calls) {
        totalHostVarsCount += Math.max(call.allocateBindingSlots - MIN_STYLING_BINDING_SLOTS_REQUIRED, 0);
        updateInstructions.push({
          reference: instruction.reference,
          paramsOrFn: convertStylingCall(call, bindingContext, bindingFn),
          span: null
        });
      }
    });
  }
  if (totalHostVarsCount) {
    definitionMap.set("hostVars", literal(totalHostVarsCount));
  }
  if (createInstructions.length > 0 || updateInstructions.length > 0) {
    const hostBindingsFnName = name ? `${name}_HostBindings` : null;
    const statements = [];
    if (createInstructions.length > 0) {
      statements.push(renderFlagCheckIfStmt(1, getInstructionStatements(createInstructions)));
    }
    if (updateInstructions.length > 0) {
      statements.push(renderFlagCheckIfStmt(2, updateVariables.concat(getInstructionStatements(updateInstructions))));
    }
    return fn([new FnParam(RENDER_FLAGS, NUMBER_TYPE), new FnParam(CONTEXT_NAME, null)], statements, INFERRED_TYPE, null, hostBindingsFnName);
  }
  return null;
}
function bindingFn(implicit, value) {
  return convertPropertyBinding(null, implicit, value, "b");
}
function convertStylingCall(call, bindingContext, bindingFn2) {
  return call.params((value) => bindingFn2(bindingContext, value).currValExpr);
}
function getBindingNameAndInstruction(binding) {
  let bindingName = binding.name;
  let instruction;
  const attrMatches = bindingName.match(ATTR_REGEX);
  if (attrMatches) {
    bindingName = attrMatches[1];
    instruction = Identifiers.attribute;
  } else {
    if (binding.isAnimation) {
      bindingName = prepareSyntheticPropertyName(bindingName);
      instruction = Identifiers.syntheticHostProperty;
    } else {
      instruction = Identifiers.hostProperty;
    }
  }
  return { bindingName, instruction, isAttribute: !!attrMatches };
}
function createHostListeners(eventBindings, name) {
  const listenerParams = [];
  const syntheticListenerParams = [];
  const instructions = [];
  for (const binding of eventBindings) {
    let bindingName = binding.name && sanitizeIdentifier(binding.name);
    const bindingFnName = binding.type === 1 ? prepareSyntheticListenerFunctionName(bindingName, binding.targetOrPhase) : bindingName;
    const handlerName = name && bindingName ? `${name}_${bindingFnName}_HostBindingHandler` : null;
    const params = prepareEventListenerParameters(BoundEvent.fromParsedEvent(binding), handlerName);
    if (binding.type == 1) {
      syntheticListenerParams.push(params);
    } else {
      listenerParams.push(params);
    }
  }
  for (const params of syntheticListenerParams) {
    instructions.push({ reference: Identifiers.syntheticHostListener, paramsOrFn: params, span: null });
  }
  for (const params of listenerParams) {
    instructions.push({ reference: Identifiers.listener, paramsOrFn: params, span: null });
  }
  return instructions;
}
var HOST_REG_EXP = /^(?:\[([^\]]+)\])|(?:\(([^\)]+)\))$/;
function parseHostBindings(host) {
  const attributes = {};
  const listeners = {};
  const properties = {};
  const specialAttributes = {};
  for (const key of Object.keys(host)) {
    const value = host[key];
    const matches = key.match(HOST_REG_EXP);
    if (matches === null) {
      switch (key) {
        case "class":
          if (typeof value !== "string") {
            throw new Error(`Class binding must be string`);
          }
          specialAttributes.classAttr = value;
          break;
        case "style":
          if (typeof value !== "string") {
            throw new Error(`Style binding must be string`);
          }
          specialAttributes.styleAttr = value;
          break;
        default:
          if (typeof value === "string") {
            attributes[key] = literal(value);
          } else {
            attributes[key] = value;
          }
      }
    } else if (matches[1] != null) {
      if (typeof value !== "string") {
        throw new Error(`Property binding must be string`);
      }
      properties[matches[1]] = value;
    } else if (matches[2] != null) {
      if (typeof value !== "string") {
        throw new Error(`Event binding must be string`);
      }
      listeners[matches[2]] = value;
    }
  }
  return { attributes, listeners, properties, specialAttributes };
}
function verifyHostBindings(bindings, sourceSpan) {
  const bindingParser = makeBindingParser();
  bindingParser.createDirectiveHostEventAsts(bindings.listeners, sourceSpan);
  bindingParser.createBoundHostProperties(bindings.properties, sourceSpan);
  return bindingParser.errors;
}
function compileStyles(styles, selector, hostSelector) {
  const shadowCss = new ShadowCss();
  return styles.map((style) => {
    return shadowCss.shimCssText(style, selector, hostSelector);
  });
}
function createHostDirectivesType(meta) {
  var _a;
  if (!((_a = meta.hostDirectives) === null || _a === void 0 ? void 0 : _a.length)) {
    return NONE_TYPE;
  }
  return expressionType(literalArr(meta.hostDirectives.map((hostMeta) => literalMap([
    { key: "directive", value: typeofExpr(hostMeta.directive.type), quoted: false },
    { key: "inputs", value: stringMapAsLiteralExpression(hostMeta.inputs || {}), quoted: false },
    { key: "outputs", value: stringMapAsLiteralExpression(hostMeta.outputs || {}), quoted: false }
  ]))));
}
function createHostDirectivesFeatureArg(hostDirectives) {
  const expressions = [];
  let hasForwardRef = false;
  for (const current of hostDirectives) {
    if (!current.inputs && !current.outputs) {
      expressions.push(current.directive.type);
    } else {
      const keys = [{ key: "directive", value: current.directive.type, quoted: false }];
      if (current.inputs) {
        const inputsLiteral = createHostDirectivesMappingArray(current.inputs);
        if (inputsLiteral) {
          keys.push({ key: "inputs", value: inputsLiteral, quoted: false });
        }
      }
      if (current.outputs) {
        const outputsLiteral = createHostDirectivesMappingArray(current.outputs);
        if (outputsLiteral) {
          keys.push({ key: "outputs", value: outputsLiteral, quoted: false });
        }
      }
      expressions.push(literalMap(keys));
    }
    if (current.isForwardReference) {
      hasForwardRef = true;
    }
  }
  return hasForwardRef ? new FunctionExpr([], [new ReturnStatement(literalArr(expressions))]) : literalArr(expressions);
}
function createHostDirectivesMappingArray(mapping) {
  const elements = [];
  for (const publicName in mapping) {
    if (mapping.hasOwnProperty(publicName)) {
      elements.push(literal(publicName), literal(mapping[publicName]));
    }
  }
  return elements.length > 0 ? literalArr(elements) : null;
}
var ResourceLoader = class {
};
var CompilerFacadeImpl = class {
  constructor(jitEvaluator = new JitEvaluator()) {
    this.jitEvaluator = jitEvaluator;
    this.FactoryTarget = FactoryTarget$1;
    this.ResourceLoader = ResourceLoader;
    this.elementSchemaRegistry = new DomElementSchemaRegistry();
  }
  compilePipe(angularCoreEnv, sourceMapUrl, facade) {
    const metadata = {
      name: facade.name,
      type: wrapReference(facade.type),
      internalType: new WrappedNodeExpr(facade.type),
      typeArgumentCount: 0,
      deps: null,
      pipeName: facade.pipeName,
      pure: facade.pure,
      isStandalone: facade.isStandalone
    };
    const res = compilePipeFromMetadata(metadata);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compilePipeDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const meta = convertDeclarePipeFacadeToMetadata(declaration);
    const res = compilePipeFromMetadata(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileInjectable(angularCoreEnv, sourceMapUrl, facade) {
    var _a;
    const { expression, statements } = compileInjectable({
      name: facade.name,
      type: wrapReference(facade.type),
      internalType: new WrappedNodeExpr(facade.type),
      typeArgumentCount: facade.typeArgumentCount,
      providedIn: computeProvidedIn(facade.providedIn),
      useClass: convertToProviderExpression(facade, "useClass"),
      useFactory: wrapExpression(facade, "useFactory"),
      useValue: convertToProviderExpression(facade, "useValue"),
      useExisting: convertToProviderExpression(facade, "useExisting"),
      deps: (_a = facade.deps) === null || _a === void 0 ? void 0 : _a.map(convertR3DependencyMetadata)
    }, true);
    return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, statements);
  }
  compileInjectableDeclaration(angularCoreEnv, sourceMapUrl, facade) {
    var _a;
    const { expression, statements } = compileInjectable({
      name: facade.type.name,
      type: wrapReference(facade.type),
      internalType: new WrappedNodeExpr(facade.type),
      typeArgumentCount: 0,
      providedIn: computeProvidedIn(facade.providedIn),
      useClass: convertToProviderExpression(facade, "useClass"),
      useFactory: wrapExpression(facade, "useFactory"),
      useValue: convertToProviderExpression(facade, "useValue"),
      useExisting: convertToProviderExpression(facade, "useExisting"),
      deps: (_a = facade.deps) === null || _a === void 0 ? void 0 : _a.map(convertR3DeclareDependencyMetadata)
    }, true);
    return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, statements);
  }
  compileInjector(angularCoreEnv, sourceMapUrl, facade) {
    const meta = {
      name: facade.name,
      type: wrapReference(facade.type),
      internalType: new WrappedNodeExpr(facade.type),
      providers: facade.providers && facade.providers.length > 0 ? new WrappedNodeExpr(facade.providers) : null,
      imports: facade.imports.map((i) => new WrappedNodeExpr(i))
    };
    const res = compileInjector(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileInjectorDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const meta = convertDeclareInjectorFacadeToMetadata(declaration);
    const res = compileInjector(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileNgModule(angularCoreEnv, sourceMapUrl, facade) {
    const meta = {
      type: wrapReference(facade.type),
      internalType: new WrappedNodeExpr(facade.type),
      adjacentType: new WrappedNodeExpr(facade.type),
      bootstrap: facade.bootstrap.map(wrapReference),
      declarations: facade.declarations.map(wrapReference),
      publicDeclarationTypes: null,
      imports: facade.imports.map(wrapReference),
      includeImportTypes: true,
      exports: facade.exports.map(wrapReference),
      selectorScopeMode: R3SelectorScopeMode.Inline,
      containsForwardDecls: false,
      schemas: facade.schemas ? facade.schemas.map(wrapReference) : null,
      id: facade.id ? new WrappedNodeExpr(facade.id) : null
    };
    const res = compileNgModule(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileNgModuleDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const expression = compileNgModuleDeclarationExpression(declaration);
    return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileDirective(angularCoreEnv, sourceMapUrl, facade) {
    const meta = convertDirectiveFacadeToMetadata(facade);
    return this.compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta);
  }
  compileDirectiveDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const typeSourceSpan = this.createParseSourceSpan("Directive", declaration.type.name, sourceMapUrl);
    const meta = convertDeclareDirectiveFacadeToMetadata(declaration, typeSourceSpan);
    return this.compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta);
  }
  compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta) {
    const constantPool = new ConstantPool();
    const bindingParser = makeBindingParser();
    const res = compileDirectiveFromMetadata(meta, constantPool, bindingParser);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, constantPool.statements);
  }
  compileComponent(angularCoreEnv, sourceMapUrl, facade) {
    const { template, interpolation } = parseJitTemplate(facade.template, facade.name, sourceMapUrl, facade.preserveWhitespaces, facade.interpolation);
    const meta = Object.assign(Object.assign(Object.assign({}, facade), convertDirectiveFacadeToMetadata(facade)), { selector: facade.selector || this.elementSchemaRegistry.getDefaultComponentElementName(), template, declarations: facade.declarations.map(convertDeclarationFacadeToMetadata), declarationListEmitMode: 0, styles: [...facade.styles, ...template.styles], encapsulation: facade.encapsulation, interpolation, changeDetection: facade.changeDetection, animations: facade.animations != null ? new WrappedNodeExpr(facade.animations) : null, viewProviders: facade.viewProviders != null ? new WrappedNodeExpr(facade.viewProviders) : null, relativeContextFilePath: "", i18nUseExternalIds: true });
    const jitExpressionSourceMap = `ng:///${facade.name}.js`;
    return this.compileComponentFromMeta(angularCoreEnv, jitExpressionSourceMap, meta);
  }
  compileComponentDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const typeSourceSpan = this.createParseSourceSpan("Component", declaration.type.name, sourceMapUrl);
    const meta = convertDeclareComponentFacadeToMetadata(declaration, typeSourceSpan, sourceMapUrl);
    return this.compileComponentFromMeta(angularCoreEnv, sourceMapUrl, meta);
  }
  compileComponentFromMeta(angularCoreEnv, sourceMapUrl, meta) {
    const constantPool = new ConstantPool();
    const bindingParser = makeBindingParser(meta.interpolation);
    const res = compileComponentFromMetadata(meta, constantPool, bindingParser);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, constantPool.statements);
  }
  compileFactory(angularCoreEnv, sourceMapUrl, meta) {
    const factoryRes = compileFactoryFunction({
      name: meta.name,
      type: wrapReference(meta.type),
      internalType: new WrappedNodeExpr(meta.type),
      typeArgumentCount: meta.typeArgumentCount,
      deps: convertR3DependencyMetadataArray(meta.deps),
      target: meta.target
    });
    return this.jitExpression(factoryRes.expression, angularCoreEnv, sourceMapUrl, factoryRes.statements);
  }
  compileFactoryDeclaration(angularCoreEnv, sourceMapUrl, meta) {
    const factoryRes = compileFactoryFunction({
      name: meta.type.name,
      type: wrapReference(meta.type),
      internalType: new WrappedNodeExpr(meta.type),
      typeArgumentCount: 0,
      deps: Array.isArray(meta.deps) ? meta.deps.map(convertR3DeclareDependencyMetadata) : meta.deps,
      target: meta.target
    });
    return this.jitExpression(factoryRes.expression, angularCoreEnv, sourceMapUrl, factoryRes.statements);
  }
  createParseSourceSpan(kind, typeName, sourceUrl) {
    return r3JitTypeSourceSpan(kind, typeName, sourceUrl);
  }
  jitExpression(def, context, sourceUrl, preStatements) {
    const statements = [
      ...preStatements,
      new DeclareVarStmt("$def", def, void 0, StmtModifier.Exported)
    ];
    const res = this.jitEvaluator.evaluateStatements(sourceUrl, statements, new R3JitReflector(context), true);
    return res["$def"];
  }
};
function convertToR3QueryMetadata(facade) {
  return Object.assign(Object.assign({}, facade), { predicate: convertQueryPredicate(facade.predicate), read: facade.read ? new WrappedNodeExpr(facade.read) : null, static: facade.static, emitDistinctChangesOnly: facade.emitDistinctChangesOnly });
}
function convertQueryDeclarationToMetadata(declaration) {
  var _a, _b, _c, _d;
  return {
    propertyName: declaration.propertyName,
    first: (_a = declaration.first) !== null && _a !== void 0 ? _a : false,
    predicate: convertQueryPredicate(declaration.predicate),
    descendants: (_b = declaration.descendants) !== null && _b !== void 0 ? _b : false,
    read: declaration.read ? new WrappedNodeExpr(declaration.read) : null,
    static: (_c = declaration.static) !== null && _c !== void 0 ? _c : false,
    emitDistinctChangesOnly: (_d = declaration.emitDistinctChangesOnly) !== null && _d !== void 0 ? _d : true
  };
}
function convertQueryPredicate(predicate) {
  return Array.isArray(predicate) ? predicate : createMayBeForwardRefExpression(new WrappedNodeExpr(predicate), 1);
}
function convertDirectiveFacadeToMetadata(facade) {
  const inputsFromMetadata = parseInputOutputs(facade.inputs || []);
  const outputsFromMetadata = parseInputOutputs(facade.outputs || []);
  const propMetadata = facade.propMetadata;
  const inputsFromType = {};
  const outputsFromType = {};
  for (const field in propMetadata) {
    if (propMetadata.hasOwnProperty(field)) {
      propMetadata[field].forEach((ann) => {
        if (isInput(ann)) {
          inputsFromType[field] = ann.bindingPropertyName ? [ann.bindingPropertyName, field] : field;
        } else if (isOutput(ann)) {
          outputsFromType[field] = ann.bindingPropertyName || field;
        }
      });
    }
  }
  return Object.assign(Object.assign({}, facade), { typeArgumentCount: 0, typeSourceSpan: facade.typeSourceSpan, type: wrapReference(facade.type), internalType: new WrappedNodeExpr(facade.type), deps: null, host: extractHostBindings(facade.propMetadata, facade.typeSourceSpan, facade.host), inputs: Object.assign(Object.assign({}, inputsFromMetadata), inputsFromType), outputs: Object.assign(Object.assign({}, outputsFromMetadata), outputsFromType), queries: facade.queries.map(convertToR3QueryMetadata), providers: facade.providers != null ? new WrappedNodeExpr(facade.providers) : null, viewQueries: facade.viewQueries.map(convertToR3QueryMetadata), fullInheritance: false, hostDirectives: convertHostDirectivesToMetadata(facade) });
}
function convertDeclareDirectiveFacadeToMetadata(declaration, typeSourceSpan) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  return {
    name: declaration.type.name,
    type: wrapReference(declaration.type),
    typeSourceSpan,
    internalType: new WrappedNodeExpr(declaration.type),
    selector: (_a = declaration.selector) !== null && _a !== void 0 ? _a : null,
    inputs: (_b = declaration.inputs) !== null && _b !== void 0 ? _b : {},
    outputs: (_c = declaration.outputs) !== null && _c !== void 0 ? _c : {},
    host: convertHostDeclarationToMetadata(declaration.host),
    queries: ((_d = declaration.queries) !== null && _d !== void 0 ? _d : []).map(convertQueryDeclarationToMetadata),
    viewQueries: ((_e = declaration.viewQueries) !== null && _e !== void 0 ? _e : []).map(convertQueryDeclarationToMetadata),
    providers: declaration.providers !== void 0 ? new WrappedNodeExpr(declaration.providers) : null,
    exportAs: (_f = declaration.exportAs) !== null && _f !== void 0 ? _f : null,
    usesInheritance: (_g = declaration.usesInheritance) !== null && _g !== void 0 ? _g : false,
    lifecycle: { usesOnChanges: (_h = declaration.usesOnChanges) !== null && _h !== void 0 ? _h : false },
    deps: null,
    typeArgumentCount: 0,
    fullInheritance: false,
    isStandalone: (_j = declaration.isStandalone) !== null && _j !== void 0 ? _j : false,
    hostDirectives: convertHostDirectivesToMetadata(declaration)
  };
}
function convertHostDeclarationToMetadata(host = {}) {
  var _a, _b, _c;
  return {
    attributes: convertOpaqueValuesToExpressions((_a = host.attributes) !== null && _a !== void 0 ? _a : {}),
    listeners: (_b = host.listeners) !== null && _b !== void 0 ? _b : {},
    properties: (_c = host.properties) !== null && _c !== void 0 ? _c : {},
    specialAttributes: {
      classAttr: host.classAttribute,
      styleAttr: host.styleAttribute
    }
  };
}
function convertHostDirectivesToMetadata(metadata) {
  var _a;
  if ((_a = metadata.hostDirectives) === null || _a === void 0 ? void 0 : _a.length) {
    return metadata.hostDirectives.map((hostDirective) => {
      return typeof hostDirective === "function" ? {
        directive: wrapReference(hostDirective),
        inputs: null,
        outputs: null,
        isForwardReference: false
      } : {
        directive: wrapReference(hostDirective.directive),
        isForwardReference: false,
        inputs: hostDirective.inputs ? parseInputOutputs(hostDirective.inputs) : null,
        outputs: hostDirective.outputs ? parseInputOutputs(hostDirective.outputs) : null
      };
    });
  }
  return null;
}
function convertOpaqueValuesToExpressions(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    result[key] = new WrappedNodeExpr(obj[key]);
  }
  return result;
}
function convertDeclareComponentFacadeToMetadata(decl2, typeSourceSpan, sourceMapUrl) {
  var _a, _b, _c, _d;
  const { template, interpolation } = parseJitTemplate(decl2.template, decl2.type.name, sourceMapUrl, (_a = decl2.preserveWhitespaces) !== null && _a !== void 0 ? _a : false, decl2.interpolation);
  const declarations = [];
  if (decl2.dependencies) {
    for (const innerDep of decl2.dependencies) {
      switch (innerDep.kind) {
        case "directive":
        case "component":
          declarations.push(convertDirectiveDeclarationToMetadata(innerDep));
          break;
        case "pipe":
          declarations.push(convertPipeDeclarationToMetadata(innerDep));
          break;
      }
    }
  } else if (decl2.components || decl2.directives || decl2.pipes) {
    decl2.components && declarations.push(...decl2.components.map((dir) => convertDirectiveDeclarationToMetadata(dir, true)));
    decl2.directives && declarations.push(...decl2.directives.map((dir) => convertDirectiveDeclarationToMetadata(dir)));
    decl2.pipes && declarations.push(...convertPipeMapToMetadata(decl2.pipes));
  }
  return Object.assign(Object.assign({}, convertDeclareDirectiveFacadeToMetadata(decl2, typeSourceSpan)), { template, styles: (_b = decl2.styles) !== null && _b !== void 0 ? _b : [], declarations, viewProviders: decl2.viewProviders !== void 0 ? new WrappedNodeExpr(decl2.viewProviders) : null, animations: decl2.animations !== void 0 ? new WrappedNodeExpr(decl2.animations) : null, changeDetection: (_c = decl2.changeDetection) !== null && _c !== void 0 ? _c : ChangeDetectionStrategy.Default, encapsulation: (_d = decl2.encapsulation) !== null && _d !== void 0 ? _d : ViewEncapsulation.Emulated, interpolation, declarationListEmitMode: 2, relativeContextFilePath: "", i18nUseExternalIds: true });
}
function convertDeclarationFacadeToMetadata(declaration) {
  return Object.assign(Object.assign({}, declaration), { type: new WrappedNodeExpr(declaration.type) });
}
function convertDirectiveDeclarationToMetadata(declaration, isComponent = null) {
  var _a, _b, _c;
  return {
    kind: R3TemplateDependencyKind.Directive,
    isComponent: isComponent || declaration.kind === "component",
    selector: declaration.selector,
    type: new WrappedNodeExpr(declaration.type),
    inputs: (_a = declaration.inputs) !== null && _a !== void 0 ? _a : [],
    outputs: (_b = declaration.outputs) !== null && _b !== void 0 ? _b : [],
    exportAs: (_c = declaration.exportAs) !== null && _c !== void 0 ? _c : null
  };
}
function convertPipeMapToMetadata(pipes) {
  if (!pipes) {
    return [];
  }
  return Object.keys(pipes).map((name) => {
    return {
      kind: R3TemplateDependencyKind.Pipe,
      name,
      type: new WrappedNodeExpr(pipes[name])
    };
  });
}
function convertPipeDeclarationToMetadata(pipe) {
  return {
    kind: R3TemplateDependencyKind.Pipe,
    name: pipe.name,
    type: new WrappedNodeExpr(pipe.type)
  };
}
function parseJitTemplate(template, typeName, sourceMapUrl, preserveWhitespaces, interpolation) {
  const interpolationConfig = interpolation ? InterpolationConfig.fromArray(interpolation) : DEFAULT_INTERPOLATION_CONFIG;
  const parsed = parseTemplate(template, sourceMapUrl, { preserveWhitespaces, interpolationConfig });
  if (parsed.errors !== null) {
    const errors = parsed.errors.map((err) => err.toString()).join(", ");
    throw new Error(`Errors during JIT compilation of template for ${typeName}: ${errors}`);
  }
  return { template: parsed, interpolation: interpolationConfig };
}
function convertToProviderExpression(obj, property) {
  if (obj.hasOwnProperty(property)) {
    return createMayBeForwardRefExpression(new WrappedNodeExpr(obj[property]), 0);
  } else {
    return void 0;
  }
}
function wrapExpression(obj, property) {
  if (obj.hasOwnProperty(property)) {
    return new WrappedNodeExpr(obj[property]);
  } else {
    return void 0;
  }
}
function computeProvidedIn(providedIn) {
  const expression = typeof providedIn === "function" ? new WrappedNodeExpr(providedIn) : new LiteralExpr(providedIn !== null && providedIn !== void 0 ? providedIn : null);
  return createMayBeForwardRefExpression(expression, 0);
}
function convertR3DependencyMetadataArray(facades) {
  return facades == null ? null : facades.map(convertR3DependencyMetadata);
}
function convertR3DependencyMetadata(facade) {
  const isAttributeDep = facade.attribute != null;
  const rawToken = facade.token === null ? null : new WrappedNodeExpr(facade.token);
  const token = isAttributeDep ? new WrappedNodeExpr(facade.attribute) : rawToken;
  return createR3DependencyMetadata(token, isAttributeDep, facade.host, facade.optional, facade.self, facade.skipSelf);
}
function convertR3DeclareDependencyMetadata(facade) {
  var _a, _b, _c, _d, _e;
  const isAttributeDep = (_a = facade.attribute) !== null && _a !== void 0 ? _a : false;
  const token = facade.token === null ? null : new WrappedNodeExpr(facade.token);
  return createR3DependencyMetadata(token, isAttributeDep, (_b = facade.host) !== null && _b !== void 0 ? _b : false, (_c = facade.optional) !== null && _c !== void 0 ? _c : false, (_d = facade.self) !== null && _d !== void 0 ? _d : false, (_e = facade.skipSelf) !== null && _e !== void 0 ? _e : false);
}
function createR3DependencyMetadata(token, isAttributeDep, host, optional, self2, skipSelf) {
  const attributeNameType = isAttributeDep ? literal("unknown") : null;
  return { token, attributeNameType, host, optional, self: self2, skipSelf };
}
function extractHostBindings(propMetadata, sourceSpan, host) {
  const bindings = parseHostBindings(host || {});
  const errors = verifyHostBindings(bindings, sourceSpan);
  if (errors.length) {
    throw new Error(errors.map((error2) => error2.msg).join("\n"));
  }
  for (const field in propMetadata) {
    if (propMetadata.hasOwnProperty(field)) {
      propMetadata[field].forEach((ann) => {
        if (isHostBinding(ann)) {
          bindings.properties[ann.hostPropertyName || field] = getSafePropertyAccessString("this", field);
        } else if (isHostListener(ann)) {
          bindings.listeners[ann.eventName || field] = `${field}(${(ann.args || []).join(",")})`;
        }
      });
    }
  }
  return bindings;
}
function isHostBinding(value) {
  return value.ngMetadataName === "HostBinding";
}
function isHostListener(value) {
  return value.ngMetadataName === "HostListener";
}
function isInput(value) {
  return value.ngMetadataName === "Input";
}
function isOutput(value) {
  return value.ngMetadataName === "Output";
}
function parseInputOutputs(values) {
  return values.reduce((results, value) => {
    const [field, property] = value.split(":", 2).map((str) => str.trim());
    results[field] = property || field;
    return results;
  }, {});
}
function convertDeclarePipeFacadeToMetadata(declaration) {
  var _a, _b;
  return {
    name: declaration.type.name,
    type: wrapReference(declaration.type),
    internalType: new WrappedNodeExpr(declaration.type),
    typeArgumentCount: 0,
    pipeName: declaration.name,
    deps: null,
    pure: (_a = declaration.pure) !== null && _a !== void 0 ? _a : true,
    isStandalone: (_b = declaration.isStandalone) !== null && _b !== void 0 ? _b : false
  };
}
function convertDeclareInjectorFacadeToMetadata(declaration) {
  return {
    name: declaration.type.name,
    type: wrapReference(declaration.type),
    internalType: new WrappedNodeExpr(declaration.type),
    providers: declaration.providers !== void 0 && declaration.providers.length > 0 ? new WrappedNodeExpr(declaration.providers) : null,
    imports: declaration.imports !== void 0 ? declaration.imports.map((i) => new WrappedNodeExpr(i)) : []
  };
}
function publishFacade(global2) {
  const ng = global2.ng || (global2.ng = {});
  ng.\u0275compilerFacade = new CompilerFacadeImpl();
}
var VERSION = new Version("15.0.0-rc.1");
var _VisitorMode;
(function(_VisitorMode2) {
  _VisitorMode2[_VisitorMode2["Extract"] = 0] = "Extract";
  _VisitorMode2[_VisitorMode2["Merge"] = 1] = "Merge";
})(_VisitorMode || (_VisitorMode = {}));
var XmlTagDefinition = class {
  constructor() {
    this.closedByParent = false;
    this.isVoid = false;
    this.ignoreFirstLf = false;
    this.canSelfClose = true;
    this.preventNamespaceInheritance = false;
  }
  requireExtraParent(currentParent) {
    return false;
  }
  isClosedByChild(name) {
    return false;
  }
  getContentType() {
    return TagContentType.PARSABLE_DATA;
  }
};
var _TAG_DEFINITION = new XmlTagDefinition();
var FactoryTarget;
(function(FactoryTarget2) {
  FactoryTarget2[FactoryTarget2["Directive"] = 0] = "Directive";
  FactoryTarget2[FactoryTarget2["Component"] = 1] = "Component";
  FactoryTarget2[FactoryTarget2["Injectable"] = 2] = "Injectable";
  FactoryTarget2[FactoryTarget2["Pipe"] = 3] = "Pipe";
  FactoryTarget2[FactoryTarget2["NgModule"] = 4] = "NgModule";
})(FactoryTarget || (FactoryTarget = {}));
publishFacade(_global);

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/tree-traversal.js
function visitElements(nodes, preorderCallback = () => {
}, postorderCallback = () => {
}) {
  for (let i = nodes.length - 1; i > -1; i--) {
    const node = nodes[i];
    const isElement = node instanceof Element$1;
    if (isElement) {
      preorderCallback(node);
    }
    if (isElement || node instanceof Template) {
      visitElements(node.children, preorderCallback, postorderCallback);
    }
    if (isElement) {
      postorderCallback(node);
    }
  }
}
function parseTemplate2(template, templateUrl = "") {
  return parseTemplate(template, templateUrl, {
    preserveWhitespaces: true,
    preserveLineEndings: true,
    leadingTriviaChars: []
  });
}
function replaceStartTag(html, node, tag) {
  return replaceAt(html, node.startSourceSpan.start.offset + 1, node.name, tag);
}
function replaceEndTag(html, node, tag) {
  if (!node.endSourceSpan) {
    return html;
  }
  return replaceAt(html, node.endSourceSpan.start.offset + 2, node.name, tag);
}
function updateAttribute(html, node, name, update) {
  var _a;
  const existingAttr = node.attributes.find((currentAttr) => currentAttr.name === name);
  if (existingAttr && existingAttr.keySpan) {
    const updatedValue = update(((_a = existingAttr.valueSpan) == null ? void 0 : _a.toString()) || "");
    if (updatedValue == null) {
      return html.slice(0, existingAttr.sourceSpan.start.offset).trimEnd() + html.slice(existingAttr.sourceSpan.end.offset);
    } else if (updatedValue == "") {
      return html.slice(0, existingAttr.keySpan.end.offset) + html.slice(existingAttr.sourceSpan.end.offset);
    } else {
      if (existingAttr.valueSpan) {
        return html.slice(0, existingAttr.valueSpan.start.offset) + updatedValue + html.slice(existingAttr.valueSpan.end.offset);
      } else {
        return html.slice(0, existingAttr.keySpan.end.offset) + `="${updatedValue}"` + html.slice(existingAttr.keySpan.end.offset);
      }
    }
  }
  const newValue = update(null);
  if (newValue == null) {
    return html;
  }
  const index2 = node.startSourceSpan.start.offset + node.name.length + 1;
  const prefix = html.slice(0, index2);
  const suffix = html.slice(index2);
  const attrText = newValue ? `${name}="${newValue}"` : `${name}`;
  if (node.startSourceSpan.start.line === node.startSourceSpan.end.line) {
    return `${prefix} ${attrText}${suffix}`;
  }
  const attr = node.attributes[0];
  const ctx = attr.sourceSpan.start.getContext(attr.sourceSpan.start.col + 1, 1);
  const indentation = ctx.before;
  return prefix + indentation + attrText + suffix;
}
function replaceAt(str, offset, oldSubstr, newSubstr) {
  const index2 = offset;
  const prefix = str.slice(0, index2);
  const suffix = str.slice(index2 + oldSubstr.length);
  return prefix + newSubstr + suffix;
}

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/card/card-template.js
var CardTemplateMigrator = class extends TemplateMigrator {
  getUpdates(ast) {
    const updates = [];
    visitElements(ast.nodes, (node) => {
      if (node.name !== "mat-card") {
        return;
      }
      updates.push({
        offset: node.startSourceSpan.start.offset,
        updateFn: (html) => updateAttribute(html, node, "appearance", () => "outlined")
      });
    });
    return updates;
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/checkbox/checkbox-styles.js
var CheckboxStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "checkbox";
    this.deprecatedPrefixes = ["mat-checkbox"];
    this.mixinChanges = [
      {
        old: "legacy-checkbox-theme",
        new: ["checkbox-theme"]
      },
      {
        old: "legacy-checkbox-color",
        new: ["checkbox-color"]
      },
      {
        old: "legacy-checkbox-typography",
        new: ["checkbox-typography"]
      }
    ];
    this.classChanges = [{ old: ".mat-checkbox", new: ".mat-mdc-checkbox" }];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/chips/chips-styles.js
var ChipsStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "chips";
    this.deprecatedPrefixes = ["mat-chip"];
    this.mixinChanges = [
      {
        old: "legacy-chips-theme",
        new: ["chips-theme"]
      },
      {
        old: "legacy-chips-color",
        new: ["chips-color"]
      },
      {
        old: "legacy-chips-typography",
        new: ["chips-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-chip-set", new: ".mat-mdc-chip-set" },
      { old: ".mat-chip-grid", new: ".mat-mdc-chip-grid" },
      { old: ".mat-chip", new: ".mat-mdc-chip" },
      { old: ".mat-basic-chip", new: ".mat-mdc-basic-chip" },
      { old: ".mat-standard-chip", new: ".mat-mdc-standard-chip" },
      { old: ".mat-chip-input", new: ".mat-mdc-chip-input" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/chips/chips-template.js
var ChipsTemplateMigrator = class extends TemplateMigrator {
  constructor() {
    super(...arguments);
    this.chipMaps = [];
    this.standaloneChips = [];
    this.chipInputs = [];
  }
  getUpdates(ast) {
    this._gatherDomData(ast);
    const updates = [];
    this.chipMaps.forEach((chipMap) => {
      if (this._isChipGrid(chipMap.chipList)) {
        updates.push(...this._buildUpdatesForChipMap(chipMap, "mat-chip-grid", "mat-chip-row"));
        return;
      }
      updates.push(...this._buildUpdatesForChipMap(chipMap, "mat-chip-listbox", "mat-chip-option"));
    });
    this.standaloneChips.forEach((chip) => {
      updates.push(...this._buildTagUpdates(chip, "mat-chip-option"));
    });
    return updates;
  }
  _gatherDomData(ast) {
    this.chipMap = void 0;
    this.chipMaps = [];
    this.standaloneChips = [];
    this.chipInputs = [];
    visitElements(ast.nodes, (node) => {
      switch (node.name) {
        case "input":
          this._handleInputNode(node);
          break;
        case "mat-chip-list":
          this.chipMap = { chipList: node, chips: [] };
          break;
        case "mat-chip":
          this.chipMap ? this.chipMap.chips.push(node) : this.standaloneChips.push(node);
      }
    }, (node) => {
      if (node.name === "mat-chip-list") {
        this.chipMaps.push(this.chipMap);
        this.chipMap = void 0;
      }
    });
  }
  _buildUpdatesForChipMap(chipMap, chipListTagName, chipTagName) {
    const updates = [];
    updates.push(...this._buildTagUpdates(chipMap.chipList, chipListTagName));
    chipMap.chips.forEach((chip) => updates.push(...this._buildTagUpdates(chip, chipTagName)));
    return updates;
  }
  _buildTagUpdates(node, tagName) {
    return [
      {
        offset: node.startSourceSpan.start.offset,
        updateFn: (html) => replaceStartTag(html, node, tagName)
      },
      {
        offset: node.endSourceSpan.start.offset,
        updateFn: (html) => replaceEndTag(html, node, tagName)
      }
    ];
  }
  _handleInputNode(node) {
    node.inputs.forEach((attr) => {
      if (attr.name === "matChipInputFor") {
        this.chipInputs.push(attr);
      }
    });
  }
  _isChipGrid(node) {
    return node.references.some((ref) => {
      return this.chipInputs.some((attr) => {
        return ref.name === attr.value.source;
      });
    });
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/dialog/dialog-styles.js
var DialogStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "dialog";
    this.deprecatedPrefixes = ["mat-dialog"];
    this.mixinChanges = [
      {
        old: "legacy-dialog-theme",
        new: ["dialog-theme"]
      },
      {
        old: "legacy-dialog-color",
        new: ["dialog-color"]
      },
      {
        old: "legacy-dialog-typography",
        new: ["dialog-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-dialog", new: ".mat-mdc-dialog" },
      { old: ".mat-dialog-title", new: ".mat-mdc-dialog-title" },
      { old: ".mat-dialog-container", new: ".mat-mdc-dialog-container" },
      { old: ".mat-dialog-content", new: ".mat-mdc-dialog-content" },
      { old: ".mat-dialog-actions", new: ".mat-mdc-dialog-actions" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/form-field/form-field-styles.js
var FormFieldStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "form-field";
    this.deprecatedPrefixes = [
      ".mat-form-field-can-float",
      ".mat-form-field-should-float",
      ".mat-form-field-has-label",
      ".mat-form-field-wrapper",
      ".mat-form-field-flex",
      ".mat-form-field-outline",
      ".mat-form-field-prefix",
      ".mat-form-field-infix",
      ".mat-form-field-suffix",
      ".mat-form-field-label",
      ".mat-form-field-required-marker",
      ".mat-form-field-underline",
      ".mat-form-field-ripple",
      ".mat-form-field-subscript-wrapper",
      ".mat-form-field-hint-wrapper",
      ".mat-form-field-hint-hint-spacer"
    ];
    this.mixinChanges = [
      {
        old: "legacy-form-field-theme",
        new: ["form-field-theme"],
        checkForDuplicates: true
      },
      {
        old: "legacy-form-field-color",
        new: ["form-field-color"],
        checkForDuplicates: true
      },
      {
        old: "legacy-form-field-typography",
        new: ["form-field-typography"],
        checkForDuplicates: true
      }
    ];
    this.classChanges = [
      {
        old: ".mat-form-field",
        new: ".mat-mdc-form-field"
      },
      {
        old: ".mat-hint",
        new: ".mat-mdc-form-field-hint"
      },
      {
        old: ".mat-error",
        new: ".mat-mdc-form-field-error"
      }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/input/input-styles.js
var InputStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "input";
    this.deprecatedPrefixes = ["mat-input"];
    this.mixinChanges = [
      {
        old: "legacy-input-theme",
        new: ["input-theme"]
      },
      {
        old: "legacy-input-color",
        new: ["input-color"]
      },
      {
        old: "legacy-input-typography",
        new: ["input-typography"]
      }
    ];
    this.classChanges = [{ old: ".mat-input-element", new: ".mat-mdc-input-element" }];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/list/list-styles.js
var ListStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "list";
    this.deprecatedPrefixes = ["mat-list"];
    this.mixinChanges = [
      {
        old: "legacy-list-theme",
        new: ["list-theme"]
      },
      {
        old: "legacy-list-color",
        new: ["list-color"]
      },
      {
        old: "legacy-list-typography",
        new: ["list-typography"]
      }
    ];
    this.classChanges = [
      { old: `.mat-list-base`, new: `.mat-mdc-list-base` },
      { old: `.mat-list`, new: `.mat-mdc-list` },
      { old: `.mat-list-avatar`, new: `.mat-mdc-list-item-avatar` },
      { old: `.mat-list-icon`, new: `.mat-mdc-list-item-icon` },
      { old: `.mat-subheader`, new: `.mat-mdc-subheader` },
      { old: `.mat-list-item`, new: `.mat-mdc-list-item` }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/menu/menu-styles.js
var MenuStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "menu";
    this.deprecatedPrefixes = ["mat-menu"];
    this.mixinChanges = [
      {
        old: "legacy-menu-theme",
        new: ["menu-theme"]
      },
      {
        old: "legacy-menu-color",
        new: ["menu-color"]
      },
      {
        old: "legacy-menu-typography",
        new: ["menu-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-menu-item", new: ".mat-mdc-menu-item" },
      { old: ".mat-menu-trigger", new: ".mat-mdc-menu-trigger" },
      { old: ".mat-menu-panel", new: ".mat-mdc-menu-panel" },
      { old: ".mat-menu-content", new: ".mat-mdc-menu-content" },
      {
        old: ".mat-menu-item-submenu-trigger",
        new: ".mat-mdc-menu-item-submenu-trigger"
      }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/paginator/paginator-styles.js
var PaginatorStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "paginator";
    this.deprecatedPrefixes = ["mat-paginator"];
    this.mixinChanges = [
      {
        old: "legacy-paginator-theme",
        new: ["paginator-theme", "icon-button-theme", "form-field-theme", "select-theme"],
        checkForDuplicates: true
      },
      {
        old: "legacy-paginator-color",
        new: ["paginator-color", "icon-button-color", "form-field-color", "select-color"],
        checkForDuplicates: true
      },
      {
        old: "legacy-paginator-typography",
        new: [
          "paginator-typography",
          "icon-button-typography",
          "form-field-typography",
          "select-typography"
        ],
        checkForDuplicates: true
      }
    ];
    this.classChanges = [
      { old: ".mat-paginator", new: ".mat-mdc-paginator" },
      { old: ".mat-paginator-outer-container", new: ".mat-mdc-paginator-outer-container" },
      { old: ".mat-paginator-container", new: ".mat-mdc-paginator-container" },
      { old: ".mat-paginator-page-size", new: ".mat-mdc-paginator-page-size" },
      { old: ".mat-paginator-page-size-label", new: ".mat-mdc-paginator-page-size-label" },
      { old: ".mat-paginator-page-size-value", new: ".mat-mdc-paginator-page-size-value" },
      { old: ".mat-paginator-range-actions", new: ".mat-mdc-paginator-range-actions" },
      { old: ".mat-paginator-range-label", new: ".mat-mdc-paginator-range-label" },
      { old: ".mat-paginator-navigation-first", new: ".mat-mdc-paginator-navigation-first" },
      { old: ".mat-paginator-navigation-previous", new: ".mat-mdc-paginator-navigation-previous" },
      { old: ".mat-paginator-navigation-next", new: ".mat-mdc-paginator-navigation-next" },
      { old: ".mat-paginator-navigation-last", new: ".mat-mdc-paginator-navigation-last" },
      { old: ".mat-paginator-icon", new: ".mat-mdc-paginator-icon" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/progress-bar/progress-bar-styles.js
var ProgressBarStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "progress-bar";
    this.deprecatedPrefixes = ["mat-progress-bar"];
    this.mixinChanges = [
      {
        old: "legacy-progress-bar-theme",
        new: ["progress-bar-theme"]
      },
      {
        old: "legacy-progress-bar-color",
        new: ["progress-bar-color"]
      },
      {
        old: "legacy-progress-bar-typography",
        new: ["progress-bar-typography"]
      }
    ];
    this.classChanges = [{ old: ".mat-progress-bar", new: ".mat-mdc-progress-bar" }];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/progress-spinner/progress-spinner-styles.js
var ProgressSpinnerStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "progress-spinner";
    this.deprecatedPrefixes = [];
    this.mixinChanges = [
      {
        old: "legacy-progress-spinner-theme",
        new: ["progress-spinner-theme"]
      },
      {
        old: "legacy-progress-spinner-color",
        new: ["progress-spinner-color"]
      },
      {
        old: "legacy-progress-spinner-typography",
        new: ["progress-spinner-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-progress-spinner", new: ".mat-mdc-progress-spinner" },
      { old: ".mat-spinner", new: ".mat-mdc-progress-spinner" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/radio/radio-styles.js
var RadioStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "radio";
    this.deprecatedPrefixes = ["mat-radio"];
    this.mixinChanges = [
      {
        old: "legacy-radio-theme",
        new: ["radio-theme"]
      },
      {
        old: "legacy-radio-color",
        new: ["radio-color"]
      },
      {
        old: "legacy-radio-typography",
        new: ["radio-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-radio-group", new: ".mat-mdc-radio-group" },
      { old: ".mat-radio-button", new: ".mat-mdc-radio-button" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/select/select-styles.js
var SelectStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "select";
    this.deprecatedPrefixes = ["mat-select", "mat-option"];
    this.mixinChanges = [
      {
        old: "legacy-select-theme",
        new: ["select-theme"],
        checkForDuplicates: true
      },
      {
        old: "legacy-select-color",
        new: ["select-color"],
        checkForDuplicates: true
      },
      {
        old: "legacy-select-typography",
        new: ["select-typography"],
        checkForDuplicates: true
      }
    ];
    this.classChanges = [
      { old: ".mat-select", new: ".mat-mdc-select" },
      { old: ".mat-select-panel", new: ".mat-mdc-select-panel" },
      { old: ".mat-option", new: ".mat-mdc-option" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/slide-toggle/slide-toggle-styles.js
var SlideToggleStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "slide-toggle";
    this.deprecatedPrefixes = ["mat-slide-toggle"];
    this.mixinChanges = [
      {
        old: "legacy-slide-toggle-theme",
        new: ["slide-toggle-theme"]
      },
      {
        old: "legacy-slide-toggle-color",
        new: ["slide-toggle-color"]
      },
      {
        old: "legacy-slide-toggle-typography",
        new: ["slide-toggle-typography"]
      }
    ];
    this.classChanges = [{ old: ".mat-slide-toggle", new: ".mat-mdc-slide-toggle" }];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/slider/slider-styles.js
var SliderStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "slider";
    this.deprecatedPrefixes = ["mat-slider"];
    this.mixinChanges = [
      {
        old: "legacy-slider-theme",
        new: ["slider-theme"]
      },
      {
        old: "legacy-slider-color",
        new: ["slider-color"]
      },
      {
        old: "legacy-slider-typography",
        new: ["slider-typography"]
      }
    ];
    this.classChanges = [{ old: ".mat-slider", new: ".mat-mdc-slider" }];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/snack-bar/snack-bar-styles.js
var SnackBarMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "snack-bar";
    this.deprecatedPrefixes = [];
    this.mixinChanges = [
      {
        old: "legacy-snack-bar-theme",
        new: ["snack-bar-theme", "button-theme"],
        checkForDuplicates: true
      },
      {
        old: "legacy-snack-bar-color",
        new: ["snack-bar-color", "button-color"],
        checkForDuplicates: true
      },
      {
        old: "legacy-snack-bar-typography",
        new: ["snack-bar-typography", "button-typography"],
        checkForDuplicates: true
      }
    ];
    this.classChanges = [
      { old: ".mat-snack-bar-container", new: ".mat-mdc-snack-bar-container" },
      { old: ".mat-snack-bar-handset", new: ".mat-mdc-snack-bar-handset" },
      { old: ".mat-simple-snackbar", new: ".mat-mdc-simple-snack-bar" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/table/table-styles.js
var TableStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "table";
    this.deprecatedPrefixes = [];
    this.mixinChanges = [
      {
        old: "legacy-table-theme",
        new: ["table-theme"]
      },
      {
        old: "legacy-table-color",
        new: ["table-color"]
      },
      {
        old: "legacy-table-typography",
        new: ["table-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-table", new: ".mat-mdc-table" },
      { old: ".mat-table-sticky", new: ".mat-mdc-table-sticky" },
      { old: ".mat-header-cell", new: ".mat-mdc-header-cell" },
      { old: ".mat-footer-cell", new: ".mat-mdc-footer-cell" },
      { old: ".mat-cell", new: ".mat-mdc-cell" },
      { old: ".mat-header-row", new: ".mat-mdc-header-row" },
      { old: ".mat-footer-row", new: ".mat-mdc-footer-row" },
      { old: ".mat-row", new: ".mat-mdc-row" },
      {
        old: ".mat-table-sticky-border-elem-left",
        new: ".mat-mdc-table-sticky-border-elem-left"
      },
      {
        old: ".mat-table-sticky-border-elem-right",
        new: ".mat-mdc-table-sticky-border-elem-right"
      }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/tabs/tabs-styles.js
var TabsStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "tabs";
    this.deprecatedPrefixes = ["mat-tabs", "mat-tab"];
    this.mixinChanges = [
      {
        old: "legacy-tabs-theme",
        new: ["tabs-theme"]
      },
      {
        old: "legacy-tabs-color",
        new: ["tabs-color"]
      },
      {
        old: "legacy-tabs-typography",
        new: ["tabs-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-tab", new: ".mat-mdc-tab" },
      { old: ".mat-tab-body", new: ".mat-mdc-tab-body" },
      { old: ".mat-tab-group", new: ".mat-mdc-tab-group" },
      { old: ".mat-tab-header", new: ".mat-mdc-tab-header" },
      { old: ".mat-tab-nav-bar", new: ".mat-mdc-tab-nav-bar" },
      { old: ".mat-tab-link", new: ".mat-mdc-tab-link" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/tooltip/tooltip-styles.js
var TooltipStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "tooltip";
    this.deprecatedPrefixes = ["mat-tooltip"];
    this.mixinChanges = [
      {
        old: "legacy-tooltip-theme",
        new: ["tooltip-theme"]
      },
      {
        old: "legacy-tooltip-color",
        new: ["tooltip-color"]
      },
      {
        old: "legacy-tooltip-typography",
        new: ["tooltip-typography"]
      }
    ];
    this.classChanges = [
      { old: ".mat-tooltip", new: ".mat-mdc-tooltip" },
      { old: ".mat-tooltip-trigger", new: ".mat-mdc-tooltip-trigger" },
      { old: ".mat-tooltip-panel", new: ".mat-mdc-tooltip-panel" },
      { old: ".mat-tooltip-panel-above", new: ".mat-mdc-tooltip-panel-above" },
      { old: ".mat-tooltip-panel-below", new: ".mat-mdc-tooltip-panel-below" },
      { old: ".mat-tooltip-panel-left", new: ".mat-mdc-tooltip-panel-left" },
      { old: ".mat-tooltip-panel-right", new: ".mat-mdc-tooltip-panel-right" },
      { old: ".mat-tooltip-panel-before", new: ".mat-mdc-tooltip-panel-before" },
      { old: ".mat-tooltip-panel-after", new: ".mat-mdc-tooltip-panel-after" }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/optgroup/optgroup-styles.js
var OptgroupStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "optgroup";
    this.deprecatedPrefixes = ["mat-optgroup"];
    this.mixinChanges = [
      {
        old: "legacy-optgroup-theme",
        new: ["optgroup-theme"]
      },
      {
        old: "legacy-optgroup-color",
        new: ["optgroup-color"]
      },
      {
        old: "legacy-optgroup-typography",
        new: ["optgroup-typography"]
      }
    ];
    this.classChanges = [
      {
        old: ".mat-optgroup",
        new: ".mat-mdc-optgroup"
      },
      {
        old: ".mat-optgroup-label",
        new: ".mat-mdc-optgroup-label"
      }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/option/option-styles.js
var OptionStylesMigrator = class extends StyleMigrator {
  constructor() {
    super(...arguments);
    this.component = "option";
    this.deprecatedPrefixes = ["mat-option"];
    this.mixinChanges = [
      {
        old: "legacy-option-theme",
        new: ["option-theme"]
      },
      {
        old: "legacy-option-color",
        new: ["option-color"]
      },
      {
        old: "legacy-option-typography",
        new: ["option-typography"]
      },
      {
        old: "legacy-core-theme",
        new: ["core-theme"]
      },
      {
        old: "legacy-core-color",
        new: ["core-color"]
      },
      {
        old: "legacy-core-typography",
        new: ["core-typography"]
      }
    ];
    this.classChanges = [
      {
        old: ".mat-option",
        new: ".mat-mdc-option"
      },
      {
        old: ".mat-option-multiple",
        new: ".mat-mdc-option-multiple"
      },
      {
        old: ".mat-option-pseudo-checkbox",
        new: ".mat-mdc-option-pseudo-checkbox"
      },
      {
        old: ".mat-option-ripple",
        new: ".mat-mdc-option-ripple"
      }
    ];
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/form-field/form-field-template.js
var FormFieldTemplateMigrator = class extends TemplateMigrator {
  getUpdates(ast) {
    const updates = [];
    visitElements(ast.nodes, (node) => {
      if (node.name !== "mat-form-field") {
        return;
      }
      updates.push({
        offset: node.startSourceSpan.start.offset,
        updateFn: (html) => updateAttribute(html, node, "appearance", (old) => ["legacy", "standard"].includes(old || "") ? null : old)
      });
    });
    return updates;
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/slider/slider-template.js
var SliderTemplateMigrator = class extends TemplateMigrator {
  getUpdates(ast) {
    const updates = [];
    visitElements(ast.nodes, (node) => {
      if (node.name === "mat-slider") {
        const originalHtml = node.sourceSpan.start.file.content;
        const bindings = this._getBindings(node);
        const inputBindings = [];
        const comments = [];
        let alreadyAppendedTemplateVars = false;
        for (let i = 0; i < bindings.length; i++) {
          const binding = bindings[i];
          if (binding.name === "value") {
            const sourceSpan = binding.node.sourceSpan;
            inputBindings.push(originalHtml.slice(sourceSpan.start.offset, sourceSpan.end.offset));
            updates.push(this._removeBinding(originalHtml, binding.node));
          }
          if (binding.name === "invert" || binding.name === "vertical" || binding.name === "tickInterval" || binding.name === "valueText") {
            comments.push(`<!-- TODO: The '${binding.name}' property no longer exists -->`);
            updates.push(this._removeBinding(originalHtml, binding.node));
          }
          if (binding.name === "displayValue") {
            comments.push(`<!-- TODO: The '${binding.name}' property no longer exists. Use 'displayWith' instead. -->`);
            updates.push(this._removeBinding(originalHtml, binding.node));
          }
          if (binding.name === "input" || binding.name === "change") {
            const sourceSpan = binding.node.sourceSpan;
            const oldBindingStr = originalHtml.slice(sourceSpan.start.offset, sourceSpan.end.offset);
            const newBindingStr = oldBindingStr.replace("$event", "{source: ngSliderThumb, parent: ngSlider, value: ngSliderThumb.value}");
            inputBindings.push(newBindingStr);
            updates.push(this._removeBinding(originalHtml, binding.node));
            if (!alreadyAppendedTemplateVars) {
              inputBindings.push('#ngSliderThumb="matSliderThumb"');
              updates.push(this._insertTemplateVar(node, "ngSlider"));
              alreadyAppendedTemplateVars = true;
            }
          }
        }
        if (comments.length) {
          updates.push(this._addComments(node, comments));
        }
        const matSliderThumb = inputBindings.length ? `<input matSliderThumb ${inputBindings.join(" ")} />` : "<input matSliderThumb />";
        updates.push({
          offset: node.startSourceSpan.end.offset,
          updateFn: (html) => html.slice(0, node.startSourceSpan.end.offset) + matSliderThumb + html.slice(node.startSourceSpan.end.offset)
        });
      }
    });
    return updates;
  }
  _insertTemplateVar(node, varName) {
    return {
      offset: node.startSourceSpan.end.offset - 1,
      updateFn: (html) => html.slice(0, node.startSourceSpan.end.offset - 1) + ` #${varName}` + html.slice(node.startSourceSpan.end.offset - 1)
    };
  }
  _addComments(node, comments) {
    const whitespace = this._parseIndentation(node);
    const indentation = "\n" + this._parseIndentation(node);
    const commentStr = whitespace.length === node.sourceSpan.start.col ? comments.join(indentation) : indentation + comments.join(indentation);
    return {
      offset: node.sourceSpan.start.offset,
      updateFn: (html) => html.slice(0, node.sourceSpan.start.offset) + commentStr + `${indentation}${html.slice(node.sourceSpan.start.offset)}`
    };
  }
  _parseIndentation(node) {
    const html = node.sourceSpan.start.file.content;
    const before = html.slice(node.sourceSpan.start.offset - node.sourceSpan.start.col, node.sourceSpan.start.offset);
    return before.slice(0, before.length - before.trimStart().length);
  }
  _removeBinding(originalHtml, binding) {
    let charIndex = binding.sourceSpan.start.offset - 1;
    while (/\s/.test(originalHtml.charAt(charIndex)) && charIndex > -1) {
      charIndex--;
    }
    return {
      offset: charIndex + 1,
      updateFn: (html) => html.slice(0, charIndex + 1) + html.slice(binding.sourceSpan.end.offset)
    };
  }
  _getBindings(node) {
    const allInputs = this._getInputs(node);
    const allOutputs = this._getOutputs(node);
    const attributes = this._getAttributes(node);
    const twoWayBindings = this._getTwoWayBindings(allInputs, allOutputs);
    const inputs = allInputs.filter((input) => !twoWayBindings.some((binding) => binding.name === input.name));
    const outputs = allOutputs.filter((output) => !twoWayBindings.some((binding) => binding.name === output.name));
    return inputs.concat(outputs).concat(attributes).concat(twoWayBindings);
  }
  _getTwoWayBindings(inputs, outputs) {
    return inputs.filter((input) => outputs.some((output) => output.name === input.name)).map((input) => __spreadProps(__spreadValues({}, input), { type: 3 }));
  }
  _getOutputs(node) {
    return node.outputs.map((output) => ({
      node: output,
      type: 1,
      name: node.sourceSpan.start.file.content.slice(output.keySpan.start.offset, output.keySpan.end.offset),
      value: node.sourceSpan.start.file.content.slice(output.handlerSpan.start.offset, output.handlerSpan.end.offset)
    }));
  }
  _getInputs(node) {
    return node.inputs.map((input) => ({
      node: input,
      type: 0,
      name: node.sourceSpan.start.file.content.slice(input.keySpan.start.offset, input.keySpan.end.offset),
      value: node.sourceSpan.start.file.content.slice(input.value.sourceSpan.start, input.value.sourceSpan.end)
    }));
  }
  _getAttributes(node) {
    return node.attributes.map((attribute) => ({
      node: attribute,
      type: 2,
      name: attribute.name,
      value: attribute.value
    }));
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/typography-hierarchy/constants.js
var mappings = [
  ["display-4", "headline-1"],
  ["display-3", "headline-2"],
  ["display-2", "headline-3"],
  ["display-1", "headline-4"],
  ["headline", "headline-5"],
  ["title", "headline-6"],
  ["subheading-2", "subtitle-1"],
  ["body-2", "subtitle-2"],
  ["subheading-1", "body-1"],
  ["body-1", "body-2"]
];
var RENAMED_TYPOGRAPHY_LEVELS = new Map(mappings);
var RENAMED_TYPOGRAPHY_CLASSES = new Map(mappings.map((m) => ["mat-" + m[0], "mat-" + m[1]]));
var COMBINED_TYPOGRAPHY_LEVELS = /* @__PURE__ */ new Map([["input", "body-1"]]);

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/typography-hierarchy/typography-hierarchy-template.js
var TypographyHierarchyTemplateMigrator = class extends TemplateMigrator {
  getUpdates(ast) {
    const updates = [];
    visitElements(ast.nodes, (node) => {
      this._addStaticClassUpdates(node, updates);
      this._addClassBindingUpdates(node, updates);
    });
    return updates;
  }
  _addStaticClassUpdates(node, updates) {
    const classAttr = node.attributes.find((attr) => attr.name === "class");
    if (classAttr && classAttr.keySpan && classAttr.valueSpan && classAttr.value.includes("mat-")) {
      const classes = classAttr.value.split(" ");
      let hasChanged = false;
      classes.forEach((current, index2) => {
        if (RENAMED_TYPOGRAPHY_CLASSES.has(current)) {
          hasChanged = true;
          classes[index2] = RENAMED_TYPOGRAPHY_CLASSES.get(current);
        }
      });
      if (hasChanged) {
        updates.push({
          offset: classAttr.keySpan.start.offset,
          updateFn: (html) => html.slice(0, classAttr.valueSpan.start.offset) + classes.join(" ") + html.slice(classAttr.valueSpan.end.offset)
        });
      }
    }
  }
  _addClassBindingUpdates(node, updates) {
    node.inputs.forEach((input) => {
      if (input.type === 2 && RENAMED_TYPOGRAPHY_CLASSES.has(input.name)) {
        updates.push({
          offset: input.keySpan.start.offset,
          updateFn: (html) => {
            return html.slice(0, input.keySpan.start.offset) + "class." + RENAMED_TYPOGRAPHY_CLASSES.get(input.name) + html.slice(input.keySpan.end.offset);
          }
        });
      }
    });
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/components/typography-hierarchy/typography-hierarchy-styles.js
var TypographyHierarchyStylesMigrator = class extends StyleMigrator {
  constructor() {
    super();
    this.component = "typography-hierarchy";
    this.deprecatedPrefixes = [];
    this.classChanges = [];
    this.mixinChanges = [
      {
        old: "legacy-typography-hierarchy",
        new: ["typography-hierarchy"],
        checkForDuplicates: false
      }
    ];
    RENAMED_TYPOGRAPHY_CLASSES.forEach((newClass, oldClass) => {
      const wrappedNewClass = RENAMED_TYPOGRAPHY_CLASSES.has(newClass) ? `.${StyleMigrator.wrapValue(newClass)}` : `.${newClass}`;
      this.classChanges.push({ new: wrappedNewClass, old: "." + oldClass });
    });
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/index.js
var LEGACY_MODULES = new Set([
  "legacy-autocomplete",
  "legacy-autocomplete/testing",
  "legacy-button",
  "legacy-button/testing",
  "legacy-card",
  "legacy-card/testing",
  "legacy-checkbox",
  "legacy-checkbox/testing",
  "legacy-chips",
  "legacy-chips/testing",
  "legacy-core",
  "legacy-core/testing",
  "legacy-dialog",
  "legacy-dialog/testing",
  "legacy-form-field",
  "legacy-form-field/testing",
  "legacy-input",
  "legacy-input/testing",
  "legacy-list",
  "legacy-list/testing",
  "legacy-menu",
  "legacy-menu/testing",
  "legacy-paginator",
  "legacy-paginator/testing",
  "legacy-progress-bar",
  "legacy-progress-bar/testing",
  "legacy-progress-spinner",
  "legacy-progress-spinner/testing",
  "legacy-radio",
  "legacy-radio/testing",
  "legacy-select",
  "legacy-select/testing",
  "legacy-slide-toggle",
  "legacy-slide-toggle/testing",
  "legacy-slider",
  "legacy-slider/testing",
  "legacy-snack-bar",
  "legacy-snack-bar/testing",
  "legacy-table",
  "legacy-table/testing",
  "legacy-tabs",
  "legacy-tabs/testing",
  "legacy-tooltip",
  "legacy-tooltip/testing"
].map((name) => `@angular/material/${name}`));
var MIGRATORS = [
  {
    component: "autocomplete",
    styles: new AutocompleteStylesMigrator()
  },
  {
    component: "button",
    styles: new ButtonStylesMigrator()
  },
  {
    component: "card",
    styles: new CardStylesMigrator(),
    template: new CardTemplateMigrator()
  },
  {
    component: "checkbox",
    styles: new CheckboxStylesMigrator()
  },
  {
    component: "chips",
    styles: new ChipsStylesMigrator(),
    template: new ChipsTemplateMigrator()
  },
  {
    component: "dialog",
    styles: new DialogStylesMigrator()
  },
  {
    component: "form-field",
    styles: new FormFieldStylesMigrator(),
    template: new FormFieldTemplateMigrator()
  },
  {
    component: "input",
    styles: new InputStylesMigrator()
  },
  {
    component: "list",
    styles: new ListStylesMigrator()
  },
  {
    component: "menu",
    styles: new MenuStylesMigrator()
  },
  {
    component: "optgroup",
    styles: new OptgroupStylesMigrator()
  },
  {
    component: "option",
    styles: new OptionStylesMigrator()
  },
  {
    component: "paginator",
    styles: new PaginatorStylesMigrator()
  },
  {
    component: "progress-bar",
    styles: new ProgressBarStylesMigrator()
  },
  {
    component: "progress-spinner",
    styles: new ProgressSpinnerStylesMigrator()
  },
  {
    component: "radio",
    styles: new RadioStylesMigrator()
  },
  {
    component: "select",
    styles: new SelectStylesMigrator()
  },
  {
    component: "slide-toggle",
    styles: new SlideToggleStylesMigrator()
  },
  {
    component: "slider",
    styles: new SliderStylesMigrator(),
    template: new SliderTemplateMigrator()
  },
  {
    component: "snack-bar",
    styles: new SnackBarMigrator()
  },
  {
    component: "table",
    styles: new TableStylesMigrator()
  },
  {
    component: "tabs",
    styles: new TabsStylesMigrator()
  },
  {
    component: "tooltip",
    styles: new TooltipStylesMigrator()
  }
];
var PERMANENT_MIGRATORS = [
  {
    component: "typography-hierarchy",
    template: new TypographyHierarchyTemplateMigrator(),
    styles: new TypographyHierarchyStylesMigrator()
  }
];

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/index.mjs
var import_schematics4 = require("@angular/cdk/schematics");

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/ts-migration/runtime-migration.js
var import_schematics3 = require("@angular/cdk/schematics");
var ts = __toESM(require("typescript"));

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/theming-styles.js
var import_schematics = require("@angular/cdk/schematics");

// node_modules/postcss/lib/postcss.mjs
var import_postcss = __toESM(require_postcss(), 1);
var stringify2 = import_postcss.default.stringify;
var fromJSON = import_postcss.default.fromJSON;
var plugin = import_postcss.default.plugin;
var parse2 = import_postcss.default.parse;
var list = import_postcss.default.list;
var document = import_postcss.default.document;
var comment = import_postcss.default.comment;
var atRule = import_postcss.default.atRule;
var rule = import_postcss.default.rule;
var decl = import_postcss.default.decl;
var root = import_postcss.default.root;
var CssSyntaxError = import_postcss.default.CssSyntaxError;
var Declaration = import_postcss.default.Declaration;
var Container2 = import_postcss.default.Container;
var Processor = import_postcss.default.Processor;
var Document = import_postcss.default.Document;
var Comment2 = import_postcss.default.Comment;
var Warning = import_postcss.default.Warning;
var AtRule = import_postcss.default.AtRule;
var Result = import_postcss.default.Result;
var Input = import_postcss.default.Input;
var Rule = import_postcss.default.Rule;
var Root = import_postcss.default.Root;
var Node = import_postcss.default.Node;

// node_modules/postcss-scss/lib/scss-syntax.mjs
var scss_syntax_exports = {};
__export(scss_syntax_exports, {
  default: () => scss_syntax_default,
  parse: () => parse3,
  stringify: () => stringify3
});
var import_scss_syntax = __toESM(require_scss_syntax(), 1);
var scss_syntax_default = import_scss_syntax.default;
var stringify3 = import_scss_syntax.default.stringify;
var parse3 = import_scss_syntax.default.parse;

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/theming-styles.js
var COMPONENTS_MIXIN_NAME = /\.([^(;]*)/;
var ThemingStylesMigration = class extends import_schematics.Migration {
  constructor() {
    super(...arguments);
    this.enabled = true;
  }
  visitStylesheet(stylesheet) {
    let migratedContent = this.migrate(stylesheet.content, stylesheet.filePath);
    if (this._namespace) {
      migratedContent = migrateTypographyConfigs(migratedContent, this._namespace);
    }
    this.fileSystem.edit(stylesheet.filePath).remove(stylesheet.start, stylesheet.content.length).insertRight(stylesheet.start, migratedContent);
  }
  migrate(styles, filename) {
    const processor = new Processor([
      {
        postcssPlugin: "theming-styles-migration-plugin",
        AtRule: {
          use: this._atUseHandler.bind(this),
          include: (atRule2) => this._atIncludeHandler(atRule2)
        },
        Rule: (rule2) => this._ruleHandler(rule2)
      }
    ]);
    try {
      const result = processor.process(styles, { syntax: scss_syntax_exports }).toString();
      return result === styles ? styles : StyleMigrator.unwrapAllValues(result);
    } catch (e) {
      this.context.logger.error(`${e}`);
      this.context.logger.warn(`Failed to process stylesheet: ${filename} (see error above).`);
      return styles;
    }
  }
  _atUseHandler(atRule2) {
    if (isAngularMaterialImport(atRule2)) {
      this._namespace = parseNamespace(atRule2);
    }
  }
  _atIncludeHandler(atRule2) {
    const migrator = this.upgradeData.find((m) => {
      return m.styles.isLegacyMixin(this._namespace, atRule2);
    });
    if (migrator) {
      const mixinChange = migrator.styles.getMixinChange(this._namespace, atRule2);
      if (mixinChange) {
        if (mixinChange.new) {
          replaceAtRuleWithMultiple(atRule2, mixinChange.old, mixinChange.new);
        } else {
          atRule2.remove();
        }
      }
    } else if (atRule2.parent && this.isCrossCuttingMixin(atRule2.params)) {
      if (this.isPartialMigration()) {
        const mixinName = atRule2.params.match(COMPONENTS_MIXIN_NAME)[1];
        const comment2 = `TODO(mdc-migration): Remove ${mixinName} once all legacy components are migrated`;
        if (!addLegacyCommentForPartialMigrations(atRule2, comment2)) {
          return;
        }
      }
      replaceCrossCuttingMixin(atRule2, this._namespace);
    }
  }
  isCrossCuttingMixin(mixinText) {
    return [
      `${this._namespace}\\.all-legacy-component-`,
      `${this._namespace}\\.legacy-core([^-]|$)`
    ].some((r) => new RegExp(r).test(mixinText));
  }
  isPartialMigration() {
    return this.upgradeData.length !== MIGRATORS.length + PERMANENT_MIGRATORS.length;
  }
  _ruleHandler(rule2) {
    let isLegacySelector = false;
    let isDeprecatedSelector = false;
    const migrator = this.upgradeData.find((m) => {
      isLegacySelector = m.styles.isLegacySelector(rule2);
      isDeprecatedSelector = m.styles.isDeprecatedSelector(rule2);
      return isLegacySelector || isDeprecatedSelector;
    });
    if (!migrator) {
      return;
    }
    if (isLegacySelector) {
      migrator.styles.replaceLegacySelector(rule2);
    } else if (isDeprecatedSelector) {
      addCommentBeforeNode(rule2, `TODO(mdc-migration): The following rule targets internal classes of ${migrator.component} that may no longer apply for the MDC version.`);
    }
  }
};
function isAngularMaterialImport(atRule2) {
  const params = list.space(atRule2.params);
  return params[0] === "'@angular/material'";
}
function parseNamespace(atRule2) {
  const params = list.space(atRule2.params);
  return params[params.length - 1];
}
function addLegacyCommentForPartialMigrations(atRule2, legacyComment) {
  var _a;
  let hasAddedComment = false;
  (_a = atRule2.parent) == null ? void 0 : _a.walkComments((comment2) => {
    if (comment2.text.includes(legacyComment)) {
      hasAddedComment = true;
    }
  });
  if (hasAddedComment) {
    return false;
  }
  addCommentBeforeNode(atRule2.cloneBefore(), legacyComment);
  return true;
}
function addCommentBeforeNode(node, comment2) {
  var _a;
  let commentNode = comment({
    text: comment2
  });
  const indentation = (_a = node.raws.before) == null ? void 0 : _a.split("\n").pop();
  commentNode.raws.before = "\n" + indentation;
  node.parent.insertBefore(node, commentNode);
  node.raws.before = "\n" + indentation;
}
function replaceCrossCuttingMixin(atRule2, namespace) {
  atRule2.cloneBefore({
    params: atRule2.params.replace(`${namespace}.all-legacy-component`, `${namespace}.all-component`).replace(`${namespace}.legacy-core`, `${namespace}.core`)
  });
  atRule2.remove();
}
function replaceAtRuleWithMultiple(atRule2, textToReplace, replacements) {
  var _a;
  atRule2.cloneBefore({
    params: atRule2.params.replace(textToReplace, replacements[0])
  });
  const indentation = (_a = atRule2.raws.before) == null ? void 0 : _a.split("\n").pop();
  atRule2.raws.before = "\n" + indentation;
  for (let i = 1; i < replacements.length; i++) {
    atRule2.cloneBefore({
      params: atRule2.params.replace(textToReplace, replacements[i])
    });
  }
  atRule2.remove();
}
function migrateTypographyConfigs(content, namespace) {
  const calls = extractFunctionCalls(`${namespace}.define-legacy-typography-config`, content);
  const newFunctionName = `${namespace}.define-typography-config`;
  const replacements = [];
  calls.forEach(({ name, args }) => {
    const parameters = extractNamedParameters(content, args);
    const addedParameters = /* @__PURE__ */ new Set();
    RENAMED_TYPOGRAPHY_LEVELS.forEach((newName, oldName) => {
      const correspondingParam = parameters.get(oldName);
      if (correspondingParam) {
        addedParameters.add(newName);
        replacements.push({
          start: correspondingParam.key.start + 1,
          end: correspondingParam.key.end,
          text: newName
        });
      }
    });
    COMBINED_TYPOGRAPHY_LEVELS.forEach((newName, oldName) => {
      const correspondingParam = parameters.get(oldName);
      if (correspondingParam) {
        if (addedParameters.has(newName)) {
          const fullContent = content.slice(correspondingParam.key.start, correspondingParam.value.fullEnd);
          replacements.push({
            start: correspondingParam.key.start,
            end: correspondingParam.value.fullEnd,
            text: `/* TODO(mdc-migration): No longer supported. Use \`${newName}\` instead. ${fullContent} */`
          });
        } else {
          addedParameters.add(newName);
          replacements.push({
            start: correspondingParam.key.start + 1,
            end: correspondingParam.key.end,
            text: newName
          });
        }
      }
    });
    replacements.push({ start: name.start, end: name.end, text: newFunctionName });
  });
  replacements.sort((a, b) => b.start - a.start).forEach(({ start, end, text }) => content = content.slice(0, start) + text + content.slice(end));
  return content;
}
function extractFunctionCalls(name, content) {
  const results = [];
  const callString = name + "(";
  let index2 = content.indexOf(callString);
  while (index2 > -1) {
    let openParens = 0;
    let endIndex = -1;
    let nameEnd = index2 + callString.length - 1;
    for (let i = nameEnd; i < content.length; i++) {
      const char = content[i];
      if (char === "(") {
        openParens++;
      } else if (char === ")") {
        openParens--;
        if (openParens === 0) {
          endIndex = i;
          break;
        }
      }
    }
    if (endIndex === -1) {
      index2 = content.indexOf(callString, nameEnd + 1);
    } else {
      results.push({ name: { start: index2, end: nameEnd }, args: { start: nameEnd + 1, end: endIndex } });
      index2 = content.indexOf(callString, endIndex);
    }
  }
  return results;
}
function extractNamedParameters(content, argsRange) {
  let escapeCount = 0;
  const args = content.slice(argsRange.start, argsRange.end).replace(/\(.*\)/g, (current) => ++escapeCount + "\u25EC".repeat(current.length - 1));
  let colonIndex = args.indexOf(":");
  const params = /* @__PURE__ */ new Map();
  while (colonIndex > -1) {
    const keyRange = extractKeyRange(args, colonIndex);
    const valueRange = extractValueRange(args, colonIndex);
    if (keyRange && valueRange) {
      params.set(args.slice(keyRange.start + 1, keyRange.end), {
        key: { start: keyRange.start + argsRange.start, end: keyRange.end + argsRange.start },
        value: {
          start: valueRange.start + argsRange.start,
          end: valueRange.end + argsRange.start,
          fullEnd: valueRange.fullEnd + argsRange.start
        }
      });
    }
    colonIndex = args.indexOf(":", colonIndex + 1);
  }
  return params;
}
function extractKeyRange(content, colonIndex) {
  let index2 = colonIndex - 1;
  let start = -1;
  let end = -1;
  while (index2 > -1) {
    const char = content[index2];
    if (char !== " " && char !== "\n") {
      if (end === -1) {
        end = index2 + 1;
      } else if (char === "$") {
        start = index2;
        break;
      }
    }
    index2--;
  }
  return start > -1 && end > -1 ? { start, end } : null;
}
function extractValueRange(content, colonIndex) {
  let index2 = colonIndex + 1;
  let start = -1;
  let end = -1;
  let fullEnd = -1;
  while (index2 < content.length) {
    const char = content[index2];
    const isWhitespace2 = char === " " || char === "\n";
    if (!isWhitespace2 && start === -1) {
      start = index2;
    } else if (start > -1 && (isWhitespace2 || char === ",")) {
      end = index2;
      fullEnd = index2 + 1;
      break;
    }
    if (start > -1 && index2 === content.length - 1) {
      fullEnd = end = content.length;
      break;
    }
    index2++;
  }
  return start > -1 && end > -1 ? { start, end, fullEnd } : null;
}

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/template-migration.js
var import_schematics2 = require("@angular/cdk/schematics");

// bazel-out/k8-fastbuild/bin/src/material/schematics/migration-utilities/update.js
function writeUpdates(content, updates) {
  updates.sort((a, b) => b.offset - a.offset);
  updates.forEach((update) => content = update.updateFn(content));
  return content;
}

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/template-migration.js
var TemplateMigration = class extends import_schematics2.Migration {
  constructor() {
    super(...arguments);
    this.enabled = true;
  }
  visitTemplate(template) {
    this.fileSystem.edit(template.filePath).remove(template.start, template.content.length).insertRight(template.start, this.migrate(template.content, template.filePath));
  }
  migrate(template, templateUrl) {
    const ast = parseTemplate2(template, templateUrl);
    const migrators = this.upgradeData.filter((m) => m.template).map((m) => m.template);
    const updates = [];
    migrators.forEach((m) => updates.push(...m.getUpdates(ast)));
    return writeUpdates(template, updates);
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/rules/ts-migration/runtime-migration.js
var RuntimeCodeMigration = class extends import_schematics3.Migration {
  constructor() {
    super(...arguments);
    this.enabled = true;
    this._printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    this._hasPossibleTemplateMigrations = true;
  }
  visitNode(node) {
    if (ts.isSourceFile(node)) {
      this._migrateSourceFileReferences(node);
    } else if (this._isComponentDecorator(node)) {
      this._migrateComponentDecorator(node);
    } else if (this._isImportExpression(node)) {
      this._migrateModuleSpecifier(node.arguments[0]);
    } else if (this._isTypeImportExpression(node)) {
      this._migrateModuleSpecifier(node.argument.literal);
    }
  }
  _migrateSourceFileReferences(sourceFile) {
    const { importSpecifiersToNewNames, identifiersToImportSpecifiers, moduleSpecifiers } = this._findImportsToMigrate(sourceFile);
    [
      ...this._renameModuleSpecifiers(moduleSpecifiers),
      ...this._renameReferences(sourceFile, identifiersToImportSpecifiers, importSpecifiersToNewNames)
    ].sort(([a], [b]) => b.getStart() - a.getStart()).forEach(([currentNode, newName]) => {
      this._printAndUpdateNode(sourceFile, currentNode, newName);
    });
  }
  _findImportsToMigrate(sourceFile) {
    var _a;
    const importSpecifiersToNewNames = /* @__PURE__ */ new Map();
    const moduleSpecifiers = /* @__PURE__ */ new Map();
    const identifiersToImportSpecifiers = /* @__PURE__ */ new Map();
    for (const statement of sourceFile.statements) {
      if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && ((_a = statement.importClause) == null ? void 0 : _a.namedBindings) && ts.isNamedImports(statement.importClause.namedBindings) && LEGACY_MODULES.has(statement.moduleSpecifier.text)) {
        statement.importClause.namedBindings.elements.forEach((element) => {
          const oldName = (element.propertyName || element.name).text;
          const newName = this._removeLegacy(oldName);
          if (newName) {
            importSpecifiersToNewNames.set(element, newName);
            if (!element.propertyName) {
              identifiersToImportSpecifiers.set(oldName, element);
            }
          }
        });
        const newModuleSpecifier = this._removeLegacy(statement.moduleSpecifier.text);
        if (newModuleSpecifier) {
          moduleSpecifiers.set(statement.moduleSpecifier, newModuleSpecifier);
        }
      }
    }
    return { importSpecifiersToNewNames, identifiersToImportSpecifiers, moduleSpecifiers };
  }
  _renameReferences(sourceFile, identifiersToImportSpecifiers, importSpecifiersToNewNames) {
    if (importSpecifiersToNewNames.size === 0) {
      return [];
    }
    const replacements = [];
    const walk = (node) => {
      if (ts.isImportDeclaration(node)) {
        return;
      }
      if (ts.isIdentifier(node)) {
        const specifier = identifiersToImportSpecifiers.get(node.text);
        if (specifier && this._isReferenceToImport(node, specifier)) {
          replacements.push([node, importSpecifiersToNewNames.get(specifier)]);
        }
      }
      node.forEachChild(walk);
    };
    sourceFile.forEachChild(walk);
    importSpecifiersToNewNames.forEach((newName, specifier) => {
      if (specifier.propertyName) {
        replacements.push([
          specifier.name.text === newName ? specifier : specifier.propertyName,
          newName
        ]);
      } else {
        replacements.push([specifier.name, newName]);
      }
    });
    return replacements;
  }
  _renameModuleSpecifiers(moduleSpecifiers) {
    const replacements = [];
    for (const [specifier, newName] of moduleSpecifiers.entries()) {
      const quoteStyle = specifier.getText()[0];
      replacements.push([specifier, quoteStyle + newName + quoteStyle]);
    }
    return replacements;
  }
  _migrateComponentDecorator(node) {
    if (!ts.isCallExpression(node.expression)) {
      return;
    }
    const metadata = node.expression.arguments[0];
    if (!ts.isObjectLiteralExpression(metadata)) {
      return;
    }
    for (const prop of metadata.properties) {
      if (prop.name) {
        switch ((0, import_schematics3.getPropertyNameText)(prop.name)) {
          case "styles":
            this._migrateStyles(prop);
            break;
          case "template":
            if (this._hasPossibleTemplateMigrations) {
              this._migrateTemplate(prop);
            }
            break;
        }
      }
    }
  }
  _migrateStyles(node) {
    if (!this._stylesMigration) {
      this._stylesMigration = new ThemingStylesMigration(this.program, this.typeChecker, this.targetVersion, this.context, this.upgradeData, this.fileSystem, this.logger);
    }
    node.initializer.forEachChild((stringLiteralNode) => {
      this._migratePropertyAssignment(stringLiteralNode, this._stylesMigration);
    });
  }
  _migrateTemplate(node) {
    if (!this._templateMigration) {
      const templateUpgradeData = this.upgradeData.filter((component) => component.template);
      if (templateUpgradeData.length === 0) {
        this._hasPossibleTemplateMigrations = false;
        return;
      } else {
        this._templateMigration = new TemplateMigration(this.program, this.typeChecker, this.targetVersion, this.context, templateUpgradeData, this.fileSystem, this.logger);
      }
    }
    this._migratePropertyAssignment(node.initializer, this._templateMigration);
  }
  _migratePropertyAssignment(node, migration) {
    let migratedText = migration.migrate(node.text, node.getSourceFile().fileName);
    let migratedTextLines = migratedText.split("\n");
    if (migratedTextLines.length > 1) {
      migratedText = migratedTextLines.map((line, index2) => {
        if (index2 !== 0 && line != "\n") {
          const leadingWidth = node.getLeadingTriviaWidth();
          if (leadingWidth > 0) {
            line = " ".repeat(leadingWidth - 1) + line;
          }
        }
        return line;
      }).join("\n");
      migratedText = "`" + migratedText + "`";
    } else {
      const quotation = node.getText().trimStart()[0];
      migratedText = quotation + migratedText + quotation;
    }
    this._printAndUpdateNode(node.getSourceFile(), node, ts.factory.createRegularExpressionLiteral(migratedText));
  }
  _migrateModuleSpecifier(specifier) {
    const newName = this._removeLegacy(specifier.text);
    if (newName) {
      const quoteStyle = specifier.getText()[0];
      this._printAndUpdateNode(specifier.getSourceFile(), specifier, quoteStyle + newName + quoteStyle);
    }
  }
  _isComponentDecorator(node) {
    if (!ts.isDecorator(node)) {
      return false;
    }
    const call = node.expression;
    if (!ts.isCallExpression(call) || !ts.isIdentifier(call.expression)) {
      return false;
    }
    return call.expression.text === "Component";
  }
  _isImportExpression(node) {
    return ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length === 1 && ts.isStringLiteralLike(node.arguments[0]);
  }
  _isTypeImportExpression(node) {
    return ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteralLike(node.argument.literal);
  }
  _printAndUpdateNode(sourceFile, oldNode, newNode) {
    const filePath = this.fileSystem.resolve(sourceFile.fileName);
    const newNodeText = typeof newNode === "string" ? newNode : this._printer.printNode(ts.EmitHint.Unspecified, newNode, sourceFile);
    const start = oldNode.getStart();
    const width = oldNode.getWidth();
    this.fileSystem.edit(filePath).remove(start, width).insertRight(start, newNodeText);
  }
  _isReferenceToImport(node, importSpecifier) {
    var _a, _b, _c, _d;
    if ((importSpecifier.propertyName || importSpecifier.name).text !== node.text) {
      return false;
    }
    const nodeSymbol = this.typeChecker.getTypeAtLocation(node).getSymbol();
    const importSymbol = this.typeChecker.getTypeAtLocation(importSpecifier).getSymbol();
    if (!nodeSymbol && !importSymbol) {
      return ((_b = (_a = this.typeChecker.getSymbolAtLocation(node)) == null ? void 0 : _a.declarations) == null ? void 0 : _b[0]) === importSpecifier;
    }
    return !!(((_c = nodeSymbol == null ? void 0 : nodeSymbol.declarations) == null ? void 0 : _c[0]) && ((_d = importSymbol == null ? void 0 : importSymbol.declarations) == null ? void 0 : _d[0])) && nodeSymbol.declarations[0] === importSymbol.declarations[0];
  }
  _removeLegacy(name) {
    const legacyRegex = /legacy[_-]?/i;
    return legacyRegex.test(name) ? name.replace(legacyRegex, "") : null;
  }
};

// bazel-out/k8-fastbuild/bin/src/material/schematics/ng-generate/mdc-migration/index.mjs
var migrationGroups = [
  ["autocomplete", "form-field", "input", "option", "optgroup", "select"],
  ["button"],
  ["card"],
  ["checkbox"],
  ["chips"],
  ["dialog"],
  ["list"],
  ["menu"],
  ["paginator"],
  ["progress-bar"],
  ["progress-spinner"],
  ["radio"],
  ["slide-toggle"],
  ["slider"],
  ["snack-bar"],
  ["table"],
  ["tabs"],
  ["tooltip"]
];
function getComponentsToMigrate(requested) {
  const componentsToMigrate = new Set(requested);
  if (componentsToMigrate.has("all")) {
    componentsToMigrate.clear();
    migrationGroups.forEach((group) => group.forEach((component) => componentsToMigrate.add(component)));
  } else {
    for (const group of migrationGroups) {
      if (group.some((component) => componentsToMigrate.has(component))) {
        group.forEach((component) => componentsToMigrate.add(component));
      }
    }
  }
  return componentsToMigrate;
}
function runMigrations(context, fileSystem, tsconfigPath, migrators, analyzedFiles, additionalStylesheetPaths, limitToDirectory) {
  const program = import_schematics4.UpdateProject.createProgramFromTsconfig(tsconfigPath, fileSystem);
  const project = new import_schematics4.UpdateProject(context, program, fileSystem, analyzedFiles, context.logger);
  return !project.migrate([ThemingStylesMigration, TemplateMigration, RuntimeCodeMigration], null, migrators, additionalStylesheetPaths, limitToDirectory).hasFailures;
}
function mdc_migration_default(options) {
  return (tree, context) => __async(this, null, function* () {
    const logger = context.logger;
    const workspace = yield (0, import_schematics4.getWorkspaceConfigGracefully)(tree);
    if (workspace === null) {
      logger.error("Could not find workspace configuration file.");
      return;
    }
    const projectNames = workspace.projects.keys();
    const fileSystem = new import_schematics4.DevkitFileSystem(tree);
    const analyzedFiles = /* @__PURE__ */ new Set();
    const componentsToMigrate = getComponentsToMigrate(options.components);
    const migrators = [
      ...MIGRATORS.filter((m) => componentsToMigrate.has(m.component)),
      ...PERMANENT_MIGRATORS
    ];
    let success = true;
    if (options.directory) {
      logger.info(`Limiting migration to: ${options.directory}`);
    }
    logger.info(`Migrating components:
${[...componentsToMigrate].join("\n")}`);
    for (const projectName of projectNames) {
      const project = workspace.projects.get(projectName);
      const tsconfigPaths = [
        (0, import_schematics4.getTargetTsconfigPath)(project, "build"),
        (0, import_schematics4.getTargetTsconfigPath)(project, "test")
      ].filter((p) => !!p);
      if (!tsconfigPaths.length) {
        logger.warn(`Skipping migration for project ${projectName}. Unable to determine 'tsconfig.json' file in workspace config.`);
        continue;
      }
      const additionalStylesheetPaths = (0, import_schematics4.findStylesheetFiles)(tree, project.root);
      logger.info(`Migrating project: ${projectName}`);
      for (const tsconfigPath of tsconfigPaths) {
        success && (success = runMigrations(context, fileSystem, tsconfigPath, migrators, analyzedFiles, additionalStylesheetPaths, options.directory || void 0));
      }
    }
    fileSystem.commitEdits();
    if (!success) {
      logger.error("Unable to migrate project. See errors above.");
    } else {
      logger.info("Successfully migrated the project.");
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license Angular v15.0.0-rc.1
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */
//# sourceMappingURL=index_bundled.js.map
