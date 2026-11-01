// Simple Trail 0.1.0
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
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
  var __toBinary = Uint8Array.fromBase64 || /* @__PURE__ */ (() => {
    var table = new Uint8Array(128);
    for (var i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
    return (base642) => {
      var n = base642.length, bytes = new Uint8Array((n - (base642[n - 1] == "=") - (base642[n - 2] == "=")) * 3 / 4 | 0);
      for (var i2 = 0, j = 0; i2 < n; ) {
        var c0 = table[base642.charCodeAt(i2++)], c1 = table[base642.charCodeAt(i2++)];
        var c2 = table[base642.charCodeAt(i2++)], c3 = table[base642.charCodeAt(i2++)];
        bytes[j++] = c0 << 2 | c1 >> 4;
        bytes[j++] = c1 << 4 | c2 >> 2;
        bytes[j++] = c2 << 6 | c3;
      }
      return bytes;
    };
  })();

  // node_modules/jszip/dist/jszip.min.js
  var require_jszip_min = __commonJS({
    "node_modules/jszip/dist/jszip.min.js"(exports, module) {
      !(function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
        }
      })(function() {
        return (function s(a, o, h) {
          function u(r, e2) {
            if (!o[r]) {
              if (!a[r]) {
                var t2 = "function" == typeof __require && __require;
                if (!e2 && t2) return t2(r, true);
                if (l) return l(r, true);
                var n = new Error("Cannot find module '" + r + "'");
                throw n.code = "MODULE_NOT_FOUND", n;
              }
              var i = o[r] = { exports: {} };
              a[r][0].call(i.exports, function(e3) {
                var t3 = a[r][1][e3];
                return u(t3 || e3);
              }, i, i.exports, s, a, o, h);
            }
            return o[r].exports;
          }
          for (var l = "function" == typeof __require && __require, e = 0; e < h.length; e++) u(h[e]);
          return u;
        })({ 1: [function(e, t2, r) {
          "use strict";
          var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function(e2) {
            for (var t3, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t3 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t3 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t3 >> 2, s = (3 & t3) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
            return h.join("");
          }, r.decode = function(e2) {
            var t3, r2, n, i, s, a, o = 0, h = 0, u = "data:";
            if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
            var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
            if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t3 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t3, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
            return l;
          };
        }, { "./support": 30, "./utils": 32 }], 2: [function(e, t2, r) {
          "use strict";
          var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
          function o(e2, t3, r2, n2, i2) {
            this.compressedSize = e2, this.uncompressedSize = t3, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
          }
          o.prototype = { getContentWorker: function() {
            var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t3 = this;
            return e2.on("end", function() {
              if (this.streamInfo.data_length !== t3.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), e2;
          }, getCompressedWorker: function() {
            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          } }, o.createWorkerFrom = function(e2, t3, r2) {
            return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t3.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t3);
          }, t2.exports = o;
        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t2, r) {
          "use strict";
          var n = e("./stream/GenericWorker");
          r.STORE = { magic: "\0\0", compressWorker: function() {
            return new n("STORE compression");
          }, uncompressWorker: function() {
            return new n("STORE decompression");
          } }, r.DEFLATE = e("./flate");
        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t2, r) {
          "use strict";
          var n = e("./utils");
          var o = (function() {
            for (var e2, t3 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t3[r2] = e2;
            }
            return t3;
          })();
          t2.exports = function(e2, t3) {
            return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? (function(e3, t4, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t4[a])];
              return -1 ^ e3;
            })(0 | t3, e2, e2.length, 0) : (function(e3, t4, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t4.charCodeAt(a))];
              return -1 ^ e3;
            })(0 | t3, e2, e2.length, 0) : 0;
          };
        }, { "./utils": 32 }], 5: [function(e, t2, r) {
          "use strict";
          r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}], 6: [function(e, t2, r) {
          "use strict";
          var n = null;
          n = "undefined" != typeof Promise ? Promise : e("lie"), t2.exports = { Promise: n };
        }, { lie: 37 }], 7: [function(e, t2, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
          function h(e2, t3) {
            a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t3, this.meta = {};
          }
          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
            this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
          }, h.prototype.flush = function() {
            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
          }, h.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function() {
            this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
            var t3 = this;
            this._pako.onData = function(e2) {
              t3.push({ data: e2, meta: t3.meta });
            };
          }, r.compressWorker = function(e2) {
            return new h("Deflate", e2);
          }, r.uncompressWorker = function() {
            return new h("Inflate", {});
          };
        }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t2, r) {
          "use strict";
          function A(e2, t3) {
            var r2, n2 = "";
            for (r2 = 0; r2 < t3; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
            return n2;
          }
          function n(e2, t3, r2, n2, i2, s2) {
            var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
            t3 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
            var S = 0;
            t3 && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0, C = 0;
            w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= (function(e3, t4) {
              var r3 = e3;
              return e3 || (r3 = t4 ? 16893 : 33204), (65535 & r3) << 16;
            })(h.unixPermissions, w)) : (C = 20, z |= (function(e3) {
              return 63 & (e3 || 0);
            })(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p };
          }
          var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
          function s(e2, t3, r2, n2) {
            i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t3, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          I.inherits(s, i), s.prototype.push = function(e2) {
            var t3 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
            this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t3 + 100 * (r2 - n2 - 1)) / r2 : 100 } }));
          }, s.prototype.openedSource = function(e2) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
            var t3 = this.streamFiles && !e2.file.dir;
            if (t3) {
              var r2 = n(e2, t3, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({ data: r2.fileRecord, meta: { percent: 0 } });
            } else this.accumulate = true;
          }, s.prototype.closedSource = function(e2) {
            this.accumulate = false;
            var t3 = this.streamFiles && !e2.file.dir, r2 = n(e2, t3, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r2.dirRecord), t3) this.push({ data: (function(e3) {
              return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
            })(e2), meta: { percent: 100 } });
            else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function() {
            for (var e2 = this.bytesWritten, t3 = 0; t3 < this.dirRecords.length; t3++) this.push({ data: this.dirRecords[t3], meta: { percent: 100 } });
            var r2 = this.bytesWritten - e2, n2 = (function(e3, t4, r3, n3, i2) {
              var s2 = I.transformTo("string", i2(n3));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t4, 4) + A(r3, 4) + A(s2.length, 2) + s2;
            })(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
            this.push({ data: n2, meta: { percent: 100 } });
          }, s.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function(e2) {
            this._sources.push(e2);
            var t3 = this;
            return e2.on("data", function(e3) {
              t3.processChunk(e3);
            }), e2.on("end", function() {
              t3.closedSource(t3.previous.streamInfo), t3._sources.length ? t3.prepareNextSource() : t3.end();
            }), e2.on("error", function(e3) {
              t3.error(e3);
            }), this;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
          }, s.prototype.error = function(e2) {
            var t3 = this._sources;
            if (!i.prototype.error.call(this, e2)) return false;
            for (var r2 = 0; r2 < t3.length; r2++) try {
              t3[r2].error(e2);
            } catch (e3) {
            }
            return true;
          }, s.prototype.lock = function() {
            i.prototype.lock.call(this);
            for (var e2 = this._sources, t3 = 0; t3 < e2.length; t3++) e2[t3].lock();
          }, t2.exports = s;
        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t2, r) {
          "use strict";
          var u = e("../compressions"), n = e("./ZipFileWorker");
          r.generateWorker = function(e2, a, t3) {
            var o = new n(a.streamFiles, t3, a.platform, a.encodeFileName), h = 0;
            try {
              e2.forEach(function(e3, t4) {
                h++;
                var r2 = (function(e4, t5) {
                  var r3 = e4 || t5, n3 = u[r3];
                  if (!n3) throw new Error(r3 + " is not a valid compression method !");
                  return n3;
                })(t4.options.compression, a.compression), n2 = t4.options.compressionOptions || a.compressionOptions || {}, i = t4.dir, s = t4.date;
                t4._compressWorker(r2, n2).withStreamInfo("file", { name: e3, dir: i, date: s, comment: t4.comment || "", unixPermissions: t4.unixPermissions, dosPermissions: t4.dosPermissions }).pipe(o);
              }), o.entriesCount = h;
            } catch (e3) {
              o.error(e3);
            }
            return o;
          };
        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t2, r) {
          "use strict";
          function n() {
            if (!(this instanceof n)) return new n();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
              var e2 = new n();
              for (var t3 in this) "function" != typeof this[t3] && (e2[t3] = this[t3]);
              return e2;
            };
          }
          (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function(e2, t3) {
            return new n().loadAsync(e2, t3);
          }, n.external = e("./external"), t2.exports = n;
        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t2, r) {
          "use strict";
          var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
          function f(n2) {
            return new i.Promise(function(e2, t3) {
              var r2 = n2.decompressed.getContentWorker().pipe(new a());
              r2.on("error", function(e3) {
                t3(e3);
              }).on("end", function() {
                r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t3(new Error("Corrupted zip : CRC32 mismatch")) : e2();
              }).resume();
            });
          }
          t2.exports = function(e2, o) {
            var h = this;
            return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), l.isNode && l.isStream(e2) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
              var t3 = new s(o);
              return t3.load(e3), t3;
            }).then(function(e3) {
              var t3 = [i.Promise.resolve(e3)], r2 = e3.files;
              if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t3.push(f(r2[n2]));
              return i.Promise.all(t3);
            }).then(function(e3) {
              for (var t3 = e3.shift(), r2 = t3.files, n2 = 0; n2 < r2.length; n2++) {
                var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
                h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
              }
              return t3.zipComment.length && (h.comment = t3.zipComment), h;
            });
          };
        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t2, r) {
          "use strict";
          var n = e("../utils"), i = e("../stream/GenericWorker");
          function s(e2, t3) {
            i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t3);
          }
          n.inherits(s, i), s.prototype._bindStream = function(e2) {
            var t3 = this;
            (this._stream = e2).pause(), e2.on("data", function(e3) {
              t3.push({ data: e3, meta: { percent: 0 } });
            }).on("error", function(e3) {
              t3.isPaused ? this.generatedError = e3 : t3.error(e3);
            }).on("end", function() {
              t3.isPaused ? t3._upstreamEnded = true : t3.end();
            });
          }, s.prototype.pause = function() {
            return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
          }, t2.exports = s;
        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t2, r) {
          "use strict";
          var i = e("readable-stream").Readable;
          function n(e2, t3, r2) {
            i.call(this, t3), this._helper = e2;
            var n2 = this;
            e2.on("data", function(e3, t4) {
              n2.push(e3) || n2._helper.pause(), r2 && r2(t4);
            }).on("error", function(e3) {
              n2.emit("error", e3);
            }).on("end", function() {
              n2.push(null);
            });
          }
          e("../utils").inherits(n, i), n.prototype._read = function() {
            this._helper.resume();
          }, t2.exports = n;
        }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t2, r) {
          "use strict";
          t2.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t3) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t3);
            if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
            return new Buffer(e2, t3);
          }, allocBuffer: function(e2) {
            if (Buffer.alloc) return Buffer.alloc(e2);
            var t3 = new Buffer(e2);
            return t3.fill(0), t3;
          }, isBuffer: function(e2) {
            return Buffer.isBuffer(e2);
          }, isStream: function(e2) {
            return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
          } };
        }, {}], 15: [function(e, t2, r) {
          "use strict";
          function s(e2, t3, r2) {
            var n2, i2 = u.getTypeOf(t3), s2 = u.extend(r2 || {}, f);
            s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n2 = _(e2)) && b.call(this, n2, true);
            var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
            r2 && void 0 !== r2.binary || (s2.binary = !a2), (t3 instanceof c && 0 === t3.uncompressedSize || s2.dir || !t3 || 0 === t3.length) && (s2.base64 = false, s2.binary = true, t3 = "", s2.compression = "STORE", i2 = "string");
            var o2 = null;
            o2 = t3 instanceof c || t3 instanceof l ? t3 : p.isNode && p.isStream(t3) ? new m(e2, t3) : u.prepareContent(e2, t3, s2.binary, s2.optimizedBinaryString, s2.base64);
            var h2 = new d(e2, o2, s2);
            this.files[e2] = h2;
          }
          var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
            "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
            var t3 = e2.lastIndexOf("/");
            return 0 < t3 ? e2.substring(0, t3) : "";
          }, g = function(e2) {
            return "/" !== e2.slice(-1) && (e2 += "/"), e2;
          }, b = function(e2, t3) {
            return t3 = void 0 !== t3 ? t3 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t3 }), this.files[e2];
          };
          function h(e2) {
            return "[object RegExp]" === Object.prototype.toString.call(e2);
          }
          var n = { load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, forEach: function(e2) {
            var t3, r2, n2;
            for (t3 in this.files) n2 = this.files[t3], (r2 = t3.slice(this.root.length, t3.length)) && t3.slice(0, this.root.length) === this.root && e2(r2, n2);
          }, filter: function(r2) {
            var n2 = [];
            return this.forEach(function(e2, t3) {
              r2(e2, t3) && n2.push(t3);
            }), n2;
          }, file: function(e2, t3, r2) {
            if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t3, r2), this;
            if (h(e2)) {
              var n2 = e2;
              return this.filter(function(e3, t4) {
                return !t4.dir && n2.test(e3);
              });
            }
            var i2 = this.files[this.root + e2];
            return i2 && !i2.dir ? i2 : null;
          }, folder: function(r2) {
            if (!r2) return this;
            if (h(r2)) return this.filter(function(e3, t4) {
              return t4.dir && r2.test(e3);
            });
            var e2 = this.root + r2, t3 = b.call(this, e2), n2 = this.clone();
            return n2.root = t3.name, n2;
          }, remove: function(r2) {
            r2 = this.root + r2;
            var e2 = this.files[r2];
            if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
            else for (var t3 = this.filter(function(e3, t4) {
              return t4.name.slice(0, r2.length) === r2;
            }), n2 = 0; n2 < t3.length; n2++) delete this.files[t3[n2].name];
            return this;
          }, generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, generateInternalStream: function(e2) {
            var t3, r2 = {};
            try {
              if ((r2 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
              u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
              var n2 = r2.comment || this.comment || "";
              t3 = o.generateWorker(this, r2, n2);
            } catch (e3) {
              (t3 = new l("error")).error(e3);
            }
            return new a(t3, r2.type || "string", r2.mimeType);
          }, generateAsync: function(e2, t3) {
            return this.generateInternalStream(e2).accumulate(t3);
          }, generateNodeStream: function(e2, t3) {
            return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t3);
          } };
          t2.exports = n;
        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t2, r) {
          "use strict";
          t2.exports = e("stream");
        }, { stream: void 0 }], 17: [function(e, t2, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
            for (var t3 = 0; t3 < this.data.length; t3++) e2[t3] = 255 & e2[t3];
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data[this.zero + e2];
          }, i.prototype.lastIndexOfSignature = function(e2) {
            for (var t3 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t3 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
            return -1;
          }, i.prototype.readAndCheckSignature = function(e2) {
            var t3 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
            return t3 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
          }, i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return [];
            var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t3;
          }, t2.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t2, r) {
          "use strict";
          var n = e("../utils");
          function i(e2) {
            this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
          }
          i.prototype = { checkOffset: function(e2) {
            this.checkIndex(this.index + e2);
          }, checkIndex: function(e2) {
            if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
          }, setIndex: function(e2) {
            this.checkIndex(e2), this.index = e2;
          }, skip: function(e2) {
            this.setIndex(this.index + e2);
          }, byteAt: function() {
          }, readInt: function(e2) {
            var t3, r2 = 0;
            for (this.checkOffset(e2), t3 = this.index + e2 - 1; t3 >= this.index; t3--) r2 = (r2 << 8) + this.byteAt(t3);
            return this.index += e2, r2;
          }, readString: function(e2) {
            return n.transformTo("string", this.readData(e2));
          }, readData: function() {
          }, lastIndexOfSignature: function() {
          }, readAndCheckSignature: function() {
          }, readDate: function() {
            var e2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
          } }, t2.exports = i;
        }, { "../utils": 32 }], 19: [function(e, t2, r) {
          "use strict";
          var n = e("./Uint8ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t3;
          }, t2.exports = i;
        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t2, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data.charCodeAt(this.zero + e2);
          }, i.prototype.lastIndexOfSignature = function(e2) {
            return this.data.lastIndexOf(e2) - this.zero;
          }, i.prototype.readAndCheckSignature = function(e2) {
            return e2 === this.readData(4);
          }, i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t3;
          }, t2.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t2, r) {
          "use strict";
          var n = e("./ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
            var t3 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t3;
          }, t2.exports = i;
        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t2, r) {
          "use strict";
          var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
          t2.exports = function(e2) {
            var t3 = n.getTypeOf(e2);
            return n.checkSupport(t3), "string" !== t3 || i.uint8array ? "nodebuffer" === t3 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
          };
        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t2, r) {
          "use strict";
          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}], 24: [function(e, t2, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../utils");
          function s(e2) {
            n.call(this, "ConvertWorker to " + e2), this.destType = e2;
          }
          i.inherits(s, n), s.prototype.processChunk = function(e2) {
            this.push({ data: i.transformTo(this.destType, e2.data), meta: e2.meta });
          }, t2.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t2, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../crc32");
          function s() {
            n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
            this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
          }, t2.exports = s;
        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t2, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
          }
          n.inherits(s, i), s.prototype.processChunk = function(e2) {
            if (e2) {
              var t3 = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = t3 + e2.data.length;
            }
            i.prototype.processChunk.call(this, e2);
          }, t2.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t2, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataWorker");
            var t3 = this;
            this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
              t3.dataIsReady = true, t3.data = e3, t3.max = e3 && e3.length || 0, t3.type = n.getTypeOf(e3), t3.isPaused || t3._tickAndRepeat();
            }, function(e3) {
              t3.error(e3);
            });
          }
          n.inherits(s, i), s.prototype.cleanUp = function() {
            i.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
          }, s.prototype._tickAndRepeat = function() {
            this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
          }, s.prototype._tick = function() {
            if (this.isPaused || this.isFinished) return false;
            var e2 = null, t3 = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
              case "string":
                e2 = this.data.substring(this.index, t3);
                break;
              case "uint8array":
                e2 = this.data.subarray(this.index, t3);
                break;
              case "array":
              case "nodebuffer":
                e2 = this.data.slice(this.index, t3);
            }
            return this.index = t3, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
          }, t2.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t2, r) {
          "use strict";
          function n(e2) {
            this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
          }
          n.prototype = { push: function(e2) {
            this.emit("data", e2);
          }, end: function() {
            if (this.isFinished) return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (e2) {
              this.emit("error", e2);
            }
            return true;
          }, error: function(e2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
          }, on: function(e2, t3) {
            return this._listeners[e2].push(t3), this;
          }, cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          }, emit: function(e2, t3) {
            if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t3);
          }, pipe: function(e2) {
            return e2.registerPrevious(this);
          }, registerPrevious: function(e2) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
            var t3 = this;
            return e2.on("data", function(e3) {
              t3.processChunk(e3);
            }), e2.on("end", function() {
              t3.end();
            }), e2.on("error", function(e3) {
              t3.error(e3);
            }), this;
          }, pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          }, resume: function() {
            if (!this.isPaused || this.isFinished) return false;
            var e2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
          }, flush: function() {
          }, processChunk: function(e2) {
            this.push(e2);
          }, withStreamInfo: function(e2, t3) {
            return this.extraStreamInfo[e2] = t3, this.mergeStreamInfo(), this;
          }, mergeStreamInfo: function() {
            for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
          }, lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          }, toString: function() {
            var e2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + e2 : e2;
          } }, t2.exports = n;
        }, {}], 29: [function(e, t2, r) {
          "use strict";
          var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
          if (n.nodestream) try {
            o = e("../nodejs/NodejsStreamOutputAdapter");
          } catch (e2) {
          }
          function l(e2, o2) {
            return new a.Promise(function(t3, r2) {
              var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
              e2.on("data", function(e3, t4) {
                n2.push(e3), o2 && o2(t4);
              }).on("error", function(e3) {
                n2 = [], r2(e3);
              }).on("end", function() {
                try {
                  var e3 = (function(e4, t4, r3) {
                    switch (e4) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", t4), r3);
                      case "base64":
                        return u.encode(t4);
                      default:
                        return h.transformTo(e4, t4);
                    }
                  })(s2, (function(e4, t4) {
                    var r3, n3 = 0, i3 = null, s3 = 0;
                    for (r3 = 0; r3 < t4.length; r3++) s3 += t4[r3].length;
                    switch (e4) {
                      case "string":
                        return t4.join("");
                      case "array":
                        return Array.prototype.concat.apply([], t4);
                      case "uint8array":
                        for (i3 = new Uint8Array(s3), r3 = 0; r3 < t4.length; r3++) i3.set(t4[r3], n3), n3 += t4[r3].length;
                        return i3;
                      case "nodebuffer":
                        return Buffer.concat(t4);
                      default:
                        throw new Error("concat : unsupported type '" + e4 + "'");
                    }
                  })(i2, n2), a2);
                  t3(e3);
                } catch (e4) {
                  r2(e4);
                }
                n2 = [];
              }).resume();
            });
          }
          function f(e2, t3, r2) {
            var n2 = t3;
            switch (t3) {
              case "blob":
              case "arraybuffer":
                n2 = "uint8array";
                break;
              case "base64":
                n2 = "string";
            }
            try {
              this._internalType = n2, this._outputType = t3, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
            } catch (e3) {
              this._worker = new s("error"), this._worker.error(e3);
            }
          }
          f.prototype = { accumulate: function(e2) {
            return l(this, e2);
          }, on: function(e2, t3) {
            var r2 = this;
            return "data" === e2 ? this._worker.on(e2, function(e3) {
              t3.call(r2, e3.data, e3.meta);
            }) : this._worker.on(e2, function() {
              h.delay(t3, arguments, r2);
            }), this;
          }, resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          }, pause: function() {
            return this._worker.pause(), this;
          }, toNodejsStream: function(e2) {
            if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
          } }, t2.exports = f;
        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t2, r) {
          "use strict";
          if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
          else {
            var n = new ArrayBuffer(0);
            try {
              r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
            } catch (e2) {
              try {
                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
              } catch (e3) {
                r.blob = false;
              }
            }
          }
          try {
            r.nodestream = !!e("readable-stream").Readable;
          } catch (e2) {
            r.nodestream = false;
          }
        }, { "readable-stream": 16 }], 31: [function(e, t2, s) {
          "use strict";
          for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
          u[254] = u[254] = 1;
          function a() {
            n.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function l() {
            n.call(this, "utf-8 encode");
          }
          s.utf8encode = function(e2) {
            return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : (function(e3) {
              var t3, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
              for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
              for (t3 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t3[s2++] = r2 : (r2 < 2048 ? t3[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t3[s2++] = 224 | r2 >>> 12 : (t3[s2++] = 240 | r2 >>> 18, t3[s2++] = 128 | r2 >>> 12 & 63), t3[s2++] = 128 | r2 >>> 6 & 63), t3[s2++] = 128 | 63 & r2);
              return t3;
            })(e2);
          }, s.utf8decode = function(e2) {
            return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
              var t3, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
              for (t3 = r2 = 0; t3 < s2; ) if ((n2 = e3[t3++]) < 128) a2[r2++] = n2;
              else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t3 += i2 - 1;
              else {
                for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t3 < s2; ) n2 = n2 << 6 | 63 & e3[t3++], i2--;
                1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
              }
              return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
            })(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
          }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
            var t3 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r2 = t3;
                (t3 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t3.set(r2, this.leftOver.length);
              } else t3 = this.leftOver.concat(t3);
              this.leftOver = null;
            }
            var n2 = (function(e3, t4) {
              var r3;
              for ((t4 = t4 || e3.length) > e3.length && (t4 = e3.length), r3 = t4 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
              return r3 < 0 ? t4 : 0 === r3 ? t4 : r3 + u[e3[r3]] > t4 ? r3 : t4;
            })(t3), i2 = t3;
            n2 !== t3.length && (h.uint8array ? (i2 = t3.subarray(0, n2), this.leftOver = t3.subarray(n2, t3.length)) : (i2 = t3.slice(0, n2), this.leftOver = t3.slice(n2, t3.length))), this.push({ data: s.utf8decode(i2), meta: e2.meta });
          }, a.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
            this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
          }, s.Utf8EncodeWorker = l;
        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t2, a) {
          "use strict";
          var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
          function n(e2) {
            return e2;
          }
          function l(e2, t3) {
            for (var r2 = 0; r2 < e2.length; ++r2) t3[r2] = 255 & e2.charCodeAt(r2);
            return t3;
          }
          e("setimmediate"), a.newBlob = function(t3, r2) {
            a.checkSupport("blob");
            try {
              return new Blob([t3], { type: r2 });
            } catch (e2) {
              try {
                var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return n2.append(t3), n2.getBlob(r2);
              } catch (e3) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var i = { stringifyByChunk: function(e2, t3, r2) {
            var n2 = [], i2 = 0, s2 = e2.length;
            if (s2 <= r2) return String.fromCharCode.apply(null, e2);
            for (; i2 < s2; ) "array" === t3 || "nodebuffer" === t3 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
            return n2.join("");
          }, stringifyByChar: function(e2) {
            for (var t3 = "", r2 = 0; r2 < e2.length; r2++) t3 += String.fromCharCode(e2[r2]);
            return t3;
          }, applyCanBeUsed: { uint8array: (function() {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (e2) {
              return false;
            }
          })(), nodebuffer: (function() {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (e2) {
              return false;
            }
          })() } };
          function s(e2) {
            var t3 = 65536, r2 = a.getTypeOf(e2), n2 = true;
            if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t3; ) try {
              return i.stringifyByChunk(e2, r2, t3);
            } catch (e3) {
              t3 = Math.floor(t3 / 2);
            }
            return i.stringifyByChar(e2);
          }
          function f(e2, t3) {
            for (var r2 = 0; r2 < e2.length; r2++) t3[r2] = e2[r2];
            return t3;
          }
          a.applyFromCharCode = s;
          var c = {};
          c.string = { string: n, array: function(e2) {
            return l(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.string.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return l(e2, new Uint8Array(e2.length));
          }, nodebuffer: function(e2) {
            return l(e2, r.allocBuffer(e2.length));
          } }, c.array = { string: s, array: n, arraybuffer: function(e2) {
            return new Uint8Array(e2).buffer;
          }, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.arraybuffer = { string: function(e2) {
            return s(new Uint8Array(e2));
          }, array: function(e2) {
            return f(new Uint8Array(e2), new Array(e2.byteLength));
          }, arraybuffer: n, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(new Uint8Array(e2));
          } }, c.uint8array = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return e2.buffer;
          }, uint8array: n, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.nodebuffer = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.nodebuffer.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return f(e2, new Uint8Array(e2.length));
          }, nodebuffer: n }, a.transformTo = function(e2, t3) {
            if (t3 = t3 || "", !e2) return t3;
            a.checkSupport(e2);
            var r2 = a.getTypeOf(t3);
            return c[r2][e2](t3);
          }, a.resolve = function(e2) {
            for (var t3 = e2.split("/"), r2 = [], n2 = 0; n2 < t3.length; n2++) {
              var i2 = t3[n2];
              "." === i2 || "" === i2 && 0 !== n2 && n2 !== t3.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
            }
            return r2.join("/");
          }, a.getTypeOf = function(e2) {
            return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && e2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function(e2) {
            if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
            var t3, r2, n2 = "";
            for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t3 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t3.toString(16).toUpperCase();
            return n2;
          }, a.delay = function(e2, t3, r2) {
            setImmediate(function() {
              e2.apply(r2 || null, t3 || []);
            });
          }, a.inherits = function(e2, t3) {
            function r2() {
            }
            r2.prototype = t3.prototype, e2.prototype = new r2();
          }, a.extend = function() {
            var e2, t3, r2 = {};
            for (e2 = 0; e2 < arguments.length; e2++) for (t3 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t3) && void 0 === r2[t3] && (r2[t3] = arguments[e2][t3]);
            return r2;
          }, a.prepareContent = function(r2, e2, n2, i2, s2) {
            return u.Promise.resolve(e2).then(function(n3) {
              return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) && "undefined" != typeof FileReader ? new u.Promise(function(t3, r3) {
                var e3 = new FileReader();
                e3.onload = function(e4) {
                  t3(e4.target.result);
                }, e3.onerror = function(e4) {
                  r3(e4.target.error);
                }, e3.readAsArrayBuffer(n3);
              }) : n3;
            }).then(function(e3) {
              var t3 = a.getTypeOf(e3);
              return t3 ? ("arraybuffer" === t3 ? e3 = a.transformTo("uint8array", e3) : "string" === t3 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = (function(e4) {
                return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
              })(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t2, r) {
          "use strict";
          var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
          function h(e2) {
            this.files = [], this.loadOptions = e2;
          }
          h.prototype = { checkSignature: function(e2) {
            if (!this.reader.readAndCheckSignature(e2)) {
              this.reader.index -= 4;
              var t3 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t3) + ", expected " + i.pretty(e2) + ")");
            }
          }, isSignature: function(e2, t3) {
            var r2 = this.reader.index;
            this.reader.setIndex(e2);
            var n2 = this.reader.readString(4) === t3;
            return this.reader.setIndex(r2), n2;
          }, readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var e2 = this.reader.readData(this.zipCommentLength), t3 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t3, e2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          }, readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var e2, t3, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t3 = this.reader.readInt(4), r2 = this.reader.readData(t3), this.zip64ExtensibleData[e2] = { id: e2, length: t3, value: r2 };
          }, readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          }, readLocalFiles: function() {
            var e2, t3;
            for (e2 = 0; e2 < this.files.length; e2++) t3 = this.files[e2], this.reader.setIndex(t3.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t3.readLocalPart(this.reader), t3.handleUTF8(), t3.processAttributes();
          }, readCentralDir: function() {
            var e2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          }, readEndOfCentral: function() {
            var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(e2);
            var t3 = e2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var n2 = t3 - r2;
            if (0 < n2) this.isSignature(t3, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
            else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
          }, prepareReader: function(e2) {
            this.reader = n(e2);
          }, load: function(e2) {
            this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          } }, t2.exports = h;
        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t2, r) {
          "use strict";
          var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
          function l(e2, t3) {
            this.options = e2, this.loadOptions = t3;
          }
          l.prototype = { isEncrypted: function() {
            return 1 == (1 & this.bitFlag);
          }, useUTF8: function() {
            return 2048 == (2048 & this.bitFlag);
          }, readLocalPart: function(e2) {
            var t3, r2;
            if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if (null === (t3 = (function(e3) {
              for (var t4 in h) if (Object.prototype.hasOwnProperty.call(h, t4) && h[t4].magic === e3) return h[t4];
              return null;
            })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t3, e2.readData(this.compressedSize));
          }, readCentralPart: function(e2) {
            this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
            var t3 = e2.readInt(2);
            if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            e2.skip(t3), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
          }, processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var e2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
          }, parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var e2 = n(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          }, readExtraFields: function(e2) {
            var t3, r2, n2, i2 = e2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t3 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t3] = { id: t3, length: r2, value: n2 };
            e2.setIndex(i2);
          }, handleUTF8: function() {
            var e2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var t3 = this.findExtraFieldUnicodePath();
              if (null !== t3) this.fileNameStr = t3;
              else {
                var r2 = s.transformTo(e2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var n2 = this.findExtraFieldUnicodeComment();
              if (null !== n2) this.fileCommentStr = n2;
              else {
                var i2 = s.transformTo(e2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(i2);
              }
            }
          }, findExtraFieldUnicodePath: function() {
            var e2 = this.extraFields[28789];
            if (e2) {
              var t3 = n(e2.value);
              return 1 !== t3.readInt(1) ? null : a(this.fileName) !== t3.readInt(4) ? null : o.utf8decode(t3.readData(e2.length - 5));
            }
            return null;
          }, findExtraFieldUnicodeComment: function() {
            var e2 = this.extraFields[25461];
            if (e2) {
              var t3 = n(e2.value);
              return 1 !== t3.readInt(1) ? null : a(this.fileComment) !== t3.readInt(4) ? null : o.utf8decode(t3.readData(e2.length - 5));
            }
            return null;
          } }, t2.exports = l;
        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t2, r) {
          "use strict";
          function n(e2, t3, r2) {
            this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t3, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
          }
          var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
          n.prototype = { internalStream: function(e2) {
            var t3 = null, r2 = "string";
            try {
              if (!e2) throw new Error("No output type specified.");
              var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
              "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t3 = this._decompressWorker();
              var i2 = !this._dataBinary;
              i2 && !n2 && (t3 = t3.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t3 = t3.pipe(new a.Utf8DecodeWorker()));
            } catch (e3) {
              (t3 = new h("error")).error(e3);
            }
            return new s(t3, r2, "");
          }, async: function(e2, t3) {
            return this.internalStream(e2).accumulate(t3);
          }, nodeStream: function(e2, t3) {
            return this.internalStream(e2 || "nodebuffer").toNodejsStream(t3);
          }, _compressWorker: function(e2, t3) {
            if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t3);
          }, _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
          } };
          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
          t2.exports = n;
        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l, t2) {
          (function(t3) {
            "use strict";
            var r, n, e2 = t3.MutationObserver || t3.WebKitMutationObserver;
            if (e2) {
              var i = 0, s = new e2(u), a = t3.document.createTextNode("");
              s.observe(a, { characterData: true }), r = function() {
                a.data = i = ++i % 2;
              };
            } else if (t3.setImmediate || void 0 === t3.MessageChannel) r = "document" in t3 && "onreadystatechange" in t3.document.createElement("script") ? function() {
              var e3 = t3.document.createElement("script");
              e3.onreadystatechange = function() {
                u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
              }, t3.document.documentElement.appendChild(e3);
            } : function() {
              setTimeout(u, 0);
            };
            else {
              var o = new t3.MessageChannel();
              o.port1.onmessage = u, r = function() {
                o.port2.postMessage(0);
              };
            }
            var h = [];
            function u() {
              var e3, t4;
              n = true;
              for (var r2 = h.length; r2; ) {
                for (t4 = h, h = [], e3 = -1; ++e3 < r2; ) t4[e3]();
                r2 = h.length;
              }
              n = false;
            }
            l.exports = function(e3) {
              1 !== h.push(e3) || n || r();
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 37: [function(e, t2, r) {
          "use strict";
          var i = e("immediate");
          function u() {
          }
          var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
          function o(e2) {
            if ("function" != typeof e2) throw new TypeError("resolver must be a function");
            this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
          }
          function h(e2, t3, r2) {
            this.promise = e2, "function" == typeof t3 && (this.onFulfilled = t3, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
          }
          function f(t3, r2, n2) {
            i(function() {
              var e2;
              try {
                e2 = r2(n2);
              } catch (e3) {
                return l.reject(t3, e3);
              }
              e2 === t3 ? l.reject(t3, new TypeError("Cannot resolve promise with itself")) : l.resolve(t3, e2);
            });
          }
          function c(e2) {
            var t3 = e2 && e2.then;
            if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t3) return function() {
              t3.apply(e2, arguments);
            };
          }
          function d(t3, e2) {
            var r2 = false;
            function n2(e3) {
              r2 || (r2 = true, l.reject(t3, e3));
            }
            function i2(e3) {
              r2 || (r2 = true, l.resolve(t3, e3));
            }
            var s2 = p(function() {
              e2(i2, n2);
            });
            "error" === s2.status && n2(s2.value);
          }
          function p(e2, t3) {
            var r2 = {};
            try {
              r2.value = e2(t3), r2.status = "success";
            } catch (e3) {
              r2.status = "error", r2.value = e3;
            }
            return r2;
          }
          (t2.exports = o).prototype.finally = function(t3) {
            if ("function" != typeof t3) return this;
            var r2 = this.constructor;
            return this.then(function(e2) {
              return r2.resolve(t3()).then(function() {
                return e2;
              });
            }, function(e2) {
              return r2.resolve(t3()).then(function() {
                throw e2;
              });
            });
          }, o.prototype.catch = function(e2) {
            return this.then(null, e2);
          }, o.prototype.then = function(e2, t3) {
            if ("function" != typeof e2 && this.state === a || "function" != typeof t3 && this.state === s) return this;
            var r2 = new this.constructor(u);
            this.state !== n ? f(r2, this.state === a ? e2 : t3, this.outcome) : this.queue.push(new h(r2, e2, t3));
            return r2;
          }, h.prototype.callFulfilled = function(e2) {
            l.resolve(this.promise, e2);
          }, h.prototype.otherCallFulfilled = function(e2) {
            f(this.promise, this.onFulfilled, e2);
          }, h.prototype.callRejected = function(e2) {
            l.reject(this.promise, e2);
          }, h.prototype.otherCallRejected = function(e2) {
            f(this.promise, this.onRejected, e2);
          }, l.resolve = function(e2, t3) {
            var r2 = p(c, t3);
            if ("error" === r2.status) return l.reject(e2, r2.value);
            var n2 = r2.value;
            if (n2) d(e2, n2);
            else {
              e2.state = a, e2.outcome = t3;
              for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t3);
            }
            return e2;
          }, l.reject = function(e2, t3) {
            e2.state = s, e2.outcome = t3;
            for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t3);
            return e2;
          }, o.resolve = function(e2) {
            if (e2 instanceof this) return e2;
            return l.resolve(new this(u), e2);
          }, o.reject = function(e2) {
            var t3 = new this(u);
            return l.reject(t3, e2);
          }, o.all = function(e2) {
            var r2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var n2 = e2.length, i2 = false;
            if (!n2) return this.resolve([]);
            var s2 = new Array(n2), a2 = 0, t3 = -1, o2 = new this(u);
            for (; ++t3 < n2; ) h2(e2[t3], t3);
            return o2;
            function h2(e3, t4) {
              r2.resolve(e3).then(function(e4) {
                s2[t4] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
              }, function(e4) {
                i2 || (i2 = true, l.reject(o2, e4));
              });
            }
          }, o.race = function(e2) {
            var t3 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var r2 = e2.length, n2 = false;
            if (!r2) return this.resolve([]);
            var i2 = -1, s2 = new this(u);
            for (; ++i2 < r2; ) a2 = e2[i2], t3.resolve(a2).then(function(e3) {
              n2 || (n2 = true, l.resolve(s2, e3));
            }, function(e3) {
              n2 || (n2 = true, l.reject(s2, e3));
            });
            var a2;
            return s2;
          };
        }, { immediate: 36 }], 38: [function(e, t2, r) {
          "use strict";
          var n = {};
          (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t2.exports = n;
        }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t2, r) {
          "use strict";
          var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
          function p(e2) {
            if (!(this instanceof p)) return new p(e2);
            this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
            var t3 = this.options;
            t3.raw && 0 < t3.windowBits ? t3.windowBits = -t3.windowBits : t3.gzip && 0 < t3.windowBits && t3.windowBits < 16 && (t3.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r2 = a.deflateInit2(this.strm, t3.level, t3.method, t3.windowBits, t3.memLevel, t3.strategy);
            if (r2 !== l) throw new Error(i[r2]);
            if (t3.header && a.deflateSetHeader(this.strm, t3.header), t3.dictionary) {
              var n2;
              if (n2 = "string" == typeof t3.dictionary ? h.string2buf(t3.dictionary) : "[object ArrayBuffer]" === u.call(t3.dictionary) ? new Uint8Array(t3.dictionary) : t3.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
              this._dict_set = true;
            }
          }
          function n(e2, t3) {
            var r2 = new p(t3);
            if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
            return r2.result;
          }
          p.prototype.push = function(e2, t3) {
            var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
            if (this.ended) return false;
            n2 = t3 === ~~t3 ? t3 : true === t3 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
            do {
              if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
              0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
            } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
            return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
          }, p.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, p.prototype.onEnd = function(e2) {
            e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t3) {
            return (t3 = t3 || {}).raw = true, n(e2, t3);
          }, r.gzip = function(e2, t3) {
            return (t3 = t3 || {}).gzip = true, n(e2, t3);
          };
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t2, r) {
          "use strict";
          var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
          function a(e2) {
            if (!(this instanceof a)) return new a(e2);
            this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
            var t3 = this.options;
            t3.raw && 0 <= t3.windowBits && t3.windowBits < 16 && (t3.windowBits = -t3.windowBits, 0 === t3.windowBits && (t3.windowBits = -15)), !(0 <= t3.windowBits && t3.windowBits < 16) || e2 && e2.windowBits || (t3.windowBits += 32), 15 < t3.windowBits && t3.windowBits < 48 && 0 == (15 & t3.windowBits) && (t3.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
            var r2 = c.inflateInit2(this.strm, t3.windowBits);
            if (r2 !== m.Z_OK) throw new Error(n[r2]);
            this.header = new s(), c.inflateGetHeader(this.strm, this.header);
          }
          function o(e2, t3) {
            var r2 = new a(t3);
            if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
            return r2.result;
          }
          a.prototype.push = function(e2, t3) {
            var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
            if (this.ended) return false;
            n2 = t3 === ~~t3 ? t3 : true === t3 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
            do {
              if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
              h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
            } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
            return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, a.prototype.onEnd = function(e2) {
            e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t3) {
            return (t3 = t3 || {}).raw = true, o(e2, t3);
          }, r.ungzip = o;
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t2, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
          r.assign = function(e2) {
            for (var t3 = Array.prototype.slice.call(arguments, 1); t3.length; ) {
              var r2 = t3.shift();
              if (r2) {
                if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
                for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
              }
            }
            return e2;
          }, r.shrinkBuf = function(e2, t3) {
            return e2.length === t3 ? e2 : e2.subarray ? e2.subarray(0, t3) : (e2.length = t3, e2);
          };
          var i = { arraySet: function(e2, t3, r2, n2, i2) {
            if (t3.subarray && e2.subarray) e2.set(t3.subarray(r2, r2 + n2), i2);
            else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t3[r2 + s2];
          }, flattenChunks: function(e2) {
            var t3, r2, n2, i2, s2, a;
            for (t3 = n2 = 0, r2 = e2.length; t3 < r2; t3++) n2 += e2[t3].length;
            for (a = new Uint8Array(n2), t3 = i2 = 0, r2 = e2.length; t3 < r2; t3++) s2 = e2[t3], a.set(s2, i2), i2 += s2.length;
            return a;
          } }, s = { arraySet: function(e2, t3, r2, n2, i2) {
            for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t3[r2 + s2];
          }, flattenChunks: function(e2) {
            return [].concat.apply([], e2);
          } };
          r.setTyped = function(e2) {
            e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(n);
        }, {}], 42: [function(e, t2, r) {
          "use strict";
          var h = e("./common"), i = true, s = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (e2) {
            i = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (e2) {
            s = false;
          }
          for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
          function l(e2, t3) {
            if (t3 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t3));
            for (var r2 = "", n2 = 0; n2 < t3; n2++) r2 += String.fromCharCode(e2[n2]);
            return r2;
          }
          u[254] = u[254] = 1, r.string2buf = function(e2) {
            var t3, r2, n2, i2, s2, a = e2.length, o = 0;
            for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t3 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t3[s2++] = r2 : (r2 < 2048 ? t3[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t3[s2++] = 224 | r2 >>> 12 : (t3[s2++] = 240 | r2 >>> 18, t3[s2++] = 128 | r2 >>> 12 & 63), t3[s2++] = 128 | r2 >>> 6 & 63), t3[s2++] = 128 | 63 & r2);
            return t3;
          }, r.buf2binstring = function(e2) {
            return l(e2, e2.length);
          }, r.binstring2buf = function(e2) {
            for (var t3 = new h.Buf8(e2.length), r2 = 0, n2 = t3.length; r2 < n2; r2++) t3[r2] = e2.charCodeAt(r2);
            return t3;
          }, r.buf2string = function(e2, t3) {
            var r2, n2, i2, s2, a = t3 || e2.length, o = new Array(2 * a);
            for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
            else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
            else {
              for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
              1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
            }
            return l(o, n2);
          }, r.utf8border = function(e2, t3) {
            var r2;
            for ((t3 = t3 || e2.length) > e2.length && (t3 = e2.length), r2 = t3 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
            return r2 < 0 ? t3 : 0 === r2 ? t3 : r2 + u[e2[r2]] > t3 ? r2 : t3;
          };
        }, { "./common": 41 }], 43: [function(e, t2, r) {
          "use strict";
          t2.exports = function(e2, t3, r2, n) {
            for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
              for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t3[n++] | 0) | 0, --a; ) ;
              i %= 65521, s %= 65521;
            }
            return i | s << 16 | 0;
          };
        }, {}], 44: [function(e, t2, r) {
          "use strict";
          t2.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
        }, {}], 45: [function(e, t2, r) {
          "use strict";
          var o = (function() {
            for (var e2, t3 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t3[r2] = e2;
            }
            return t3;
          })();
          t2.exports = function(e2, t3, r2, n) {
            var i = o, s = n + r2;
            e2 ^= -1;
            for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t3[a])];
            return -1 ^ e2;
          };
        }, {}], 46: [function(e, t2, r) {
          "use strict";
          var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
          function R(e2, t3) {
            return e2.msg = n[t3], t3;
          }
          function T(e2) {
            return (e2 << 1) - (4 < e2 ? 9 : 0);
          }
          function D2(e2) {
            for (var t3 = e2.length; 0 <= --t3; ) e2[t3] = 0;
          }
          function F(e2) {
            var t3 = e2.state, r2 = t3.pending;
            r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t3.pending_buf, t3.pending_out, r2, e2.next_out), e2.next_out += r2, t3.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t3.pending -= r2, 0 === t3.pending && (t3.pending_out = 0));
          }
          function N(e2, t3) {
            u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t3), e2.block_start = e2.strstart, F(e2.strm);
          }
          function U(e2, t3) {
            e2.pending_buf[e2.pending++] = t3;
          }
          function P(e2, t3) {
            e2.pending_buf[e2.pending++] = t3 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t3;
          }
          function L(e2, t3) {
            var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
            do {
              if (u2[(r2 = t3) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
                s2 += 2, r2++;
                do {
                } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
                if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                  if (e2.match_start = t3, o2 <= (a2 = n2)) break;
                  d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
                }
              }
            } while ((t3 = f2[t3 & l2]) > h2 && 0 != --i2);
            return a2 <= e2.lookahead ? a2 : e2.lookahead;
          }
          function j(e2) {
            var t3, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
            do {
              if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
                for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t3 = r2 = e2.hash_size; n2 = e2.head[--t3], e2.head[t3] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                for (t3 = r2 = f2; n2 = e2.prev[--t3], e2.prev[t3] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                i2 += f2;
              }
              if (0 === e2.strm.avail_in) break;
              if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
            } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
          }
          function Z(e2, t3) {
            for (var r2, n2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t3 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
                for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
                e2.strstart++;
              } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
              else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
              if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t3 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function W(e2, t3) {
            for (var r2, n2, i2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t3 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
                for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
                if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
              } else if (e2.match_available) {
                if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
              } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
            }
            return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t3 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function M(e2, t3, r2, n2, i2) {
            this.good_length = e2, this.max_lazy = t3, this.nice_length = r2, this.max_chain = n2, this.func = i2;
          }
          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D2(this.dyn_ltree), D2(this.dyn_dtree), D2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D2(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function G(e2) {
            var t3;
            return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t3 = e2.state).pending = 0, t3.pending_out = 0, t3.wrap < 0 && (t3.wrap = -t3.wrap), t3.status = t3.wrap ? C : E, e2.adler = 2 === t3.wrap ? 0 : 1, t3.last_flush = l, u._tr_init(t3), m) : R(e2, _);
          }
          function K(e2) {
            var t3 = G(e2);
            return t3 === m && (function(e3) {
              e3.window_size = 2 * e3.w_size, D2(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
            })(e2.state), t3;
          }
          function Y(e2, t3, r2, n2, i2, s2) {
            if (!e2) return _;
            var a2 = 1;
            if (t3 === g && (t3 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t3 < 0 || 9 < t3 || s2 < 0 || b < s2) return R(e2, _);
            8 === n2 && (n2 = 9);
            var o2 = new H();
            return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t3, o2.strategy = s2, o2.method = r2, K(e2);
          }
          h = [new M(0, 0, 0, 0, function(e2, t3) {
            var r2 = 65535;
            for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
              if (e2.lookahead <= 1) {
                if (j(e2), 0 === e2.lookahead && t3 === l) return A;
                if (0 === e2.lookahead) break;
              }
              e2.strstart += e2.lookahead, e2.lookahead = 0;
              var n2 = e2.block_start + r2;
              if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
              if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = 0, t3 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e2, t3) {
            return Y(e2, t3, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t3) {
            return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t3, m) : _;
          }, r.deflate = function(e2, t3) {
            var r2, n2, i2, s2;
            if (!e2 || !e2.state || 5 < t3 || t3 < 0) return e2 ? R(e2, _) : _;
            if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t3 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
            if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t3, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
            else {
              var a2 = v + (n2.w_bits - 8 << 4) << 8;
              a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P(n2, a2), 0 !== n2.strstart && (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), e2.adler = 1;
            }
            if (69 === n2.status) if (n2.gzhead.extra) {
              for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
            } else n2.status = 73;
            if (73 === n2.status) if (n2.gzhead.name) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
            } else n2.status = 91;
            if (91 === n2.status) if (n2.gzhead.comment) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
            } else n2.status = 103;
            if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
              if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
            } else if (0 === e2.avail_in && T(t3) <= T(r2) && t3 !== f) return R(e2, -5);
            if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
            if (0 !== e2.avail_in || 0 !== n2.lookahead || t3 !== l && 666 !== n2.status) {
              var o2 = 2 === n2.strategy ? (function(e3, t4) {
                for (var r3; ; ) {
                  if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                    if (t4 === l) return A;
                    break;
                  }
                  if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t4 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t3) : 3 === n2.strategy ? (function(e3, t4) {
                for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                  if (e3.lookahead <= S) {
                    if (j(e3), e3.lookahead <= S && t4 === l) return A;
                    if (0 === e3.lookahead) break;
                  }
                  if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                    s3 = e3.strstart + S;
                    do {
                    } while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                    e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                  }
                  if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t4 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t3) : h[n2.level].func(n2, t3);
              if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
              if (o2 === I && (1 === t3 ? u._tr_align(n2) : 5 !== t3 && (u._tr_stored_block(n2, 0, 0, false), 3 === t3 && (D2(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
            }
            return t3 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
          }, r.deflateEnd = function(e2) {
            var t3;
            return e2 && e2.state ? (t3 = e2.state.status) !== C && 69 !== t3 && 73 !== t3 && 91 !== t3 && 103 !== t3 && t3 !== E && 666 !== t3 ? R(e2, _) : (e2.state = null, t3 === E ? R(e2, -3) : m) : _;
          }, r.deflateSetDictionary = function(e2, t3) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t3.length;
            if (!e2 || !e2.state) return _;
            if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
            for (1 === s2 && (e2.adler = d(e2.adler, t3, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D2(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t3, l2 - r2.w_size, r2.w_size, 0), t3 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t3, j(r2); r2.lookahead >= x; ) {
              for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
              r2.strstart = n2, r2.lookahead = x - 1, j(r2);
            }
            return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t2, r) {
          "use strict";
          t2.exports = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
          };
        }, {}], 48: [function(e, t2, r) {
          "use strict";
          t2.exports = function(e2, t3) {
            var r2, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
            r2 = e2.state, n = e2.next_in, z = e2.input, i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t3 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
            e: do {
              p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
              t: for (; ; ) {
                if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (d & (1 << y) - 1)];
                      continue t;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break e;
                    }
                    e2.msg = "invalid literal/length code", r2.mode = 30;
                    break e;
                  }
                  w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                  r: for (; ; ) {
                    if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                      if (0 == (64 & y)) {
                        v = _[(65535 & v) + (d & (1 << y) - 1)];
                        continue r;
                      }
                      e2.msg = "invalid distance code", r2.mode = 30;
                      break e;
                    }
                    if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (d >>>= y, p -= y, (y = s - a) < k) {
                      if (l < (y = k - y) && r2.sane) {
                        e2.msg = "invalid distance too far back", r2.mode = 30;
                        break e;
                      }
                      if (S = c, (x = 0) === f) {
                        if (x += u - y, y < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      } else if (f < y) {
                        if (x += u + f - y, (y -= f) < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          if (x = 0, f < w) {
                            for (w -= y = f; C[s++] = c[x++], --y; ) ;
                            x = s - k, S = C;
                          }
                        }
                      } else if (x += f - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                      for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                      w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                    } else {
                      for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                      w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                    }
                    break;
                  }
                }
                break;
              }
            } while (n < i && s < o);
            n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
          };
        }, {}], 49: [function(e, t2, r) {
          "use strict";
          var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D2 = 1, F = 2, N = 0, U = -2, P = 1, n = 852, i = 592;
          function L(e2) {
            return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
          }
          function s() {
            this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function a(e2) {
            var t3;
            return e2 && e2.state ? (t3 = e2.state, e2.total_in = e2.total_out = t3.total = 0, e2.msg = "", t3.wrap && (e2.adler = 1 & t3.wrap), t3.mode = P, t3.last = 0, t3.havedict = 0, t3.dmax = 32768, t3.head = null, t3.hold = 0, t3.bits = 0, t3.lencode = t3.lendyn = new I.Buf32(n), t3.distcode = t3.distdyn = new I.Buf32(i), t3.sane = 1, t3.back = -1, N) : U;
          }
          function o(e2) {
            var t3;
            return e2 && e2.state ? ((t3 = e2.state).wsize = 0, t3.whave = 0, t3.wnext = 0, a(e2)) : U;
          }
          function h(e2, t3) {
            var r2, n2;
            return e2 && e2.state ? (n2 = e2.state, t3 < 0 ? (r2 = 0, t3 = -t3) : (r2 = 1 + (t3 >> 4), t3 < 48 && (t3 &= 15)), t3 && (t3 < 8 || 15 < t3) ? U : (null !== n2.window && n2.wbits !== t3 && (n2.window = null), n2.wrap = r2, n2.wbits = t3, o(e2))) : U;
          }
          function u(e2, t3) {
            var r2, n2;
            return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t3)) !== N && (e2.state = null), r2) : U;
          }
          var l, f, c = true;
          function j(e2) {
            if (c) {
              var t3;
              for (l = new I.Buf32(512), f = new I.Buf32(32), t3 = 0; t3 < 144; ) e2.lens[t3++] = 8;
              for (; t3 < 256; ) e2.lens[t3++] = 9;
              for (; t3 < 280; ) e2.lens[t3++] = 7;
              for (; t3 < 288; ) e2.lens[t3++] = 8;
              for (T(D2, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t3 = 0; t3 < 32; ) e2.lens[t3++] = 5;
              T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
            }
            e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
          }
          function Z(e2, t3, r2, n2) {
            var i2, s2 = e2.state;
            return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t3, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t3, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t3, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
          }
          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
            return u(e2, 15);
          }, r.inflateInit2 = u, r.inflate = function(e2, t3) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
            12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
            e: for (; ; ) switch (r2.mode) {
              case P:
                if (0 === r2.wrap) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && 35615 === u2) {
                  E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  e2.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if (8 != (15 & u2)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
                else if (k > r2.wbits) {
                  e2.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, 8 != (255 & r2.flags)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  e2.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                } else r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    e2.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                e2.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (5 === t3 || 6 === t3) break e;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, 6 !== t3) break;
                    u2 >>>= 2, l2 -= 2;
                    break e;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    e2.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  e2.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t3) break e;
              case 15:
                r2.mode = 16;
              case 16:
                if (d = r2.length) {
                  if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                  I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  e2.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                  else {
                    if (16 === b) {
                      for (z = _ + 2; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                        e2.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _ + 7; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + d > r2.nlen + r2.ndist) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; d--; ) r2.lens[r2.have++] = k;
                  }
                }
                if (30 === r2.mode) break;
                if (0 === r2.lens[256]) {
                  e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D2, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  e2.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, 6 === t3) break e;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o2 && 258 <= h2) {
                  e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                  e2.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (0 === h2) break e;
                if (d = c2 - h2, r2.offset > d) {
                  if ((d = r2.offset - d) > r2.whave && r2.sane) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
                } else m = i2, p = a2 - r2.offset, d = r2.length;
                for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
                0 === r2.length && (r2.mode = 21);
                break;
              case 26:
                if (0 === h2) break e;
                i2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 |= n2[s2++] << l2, l2 += 8;
                  }
                  if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    e2.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    e2.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break e;
              case 30:
                x = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
            return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t3)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t3) && x === N && (x = -5), x);
          }, r.inflateEnd = function(e2) {
            if (!e2 || !e2.state) return U;
            var t3 = e2.state;
            return t3.window && (t3.window = null), e2.state = null, N;
          }, r.inflateGetHeader = function(e2, t3) {
            var r2;
            return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t3).done = false, N) : U;
          }, r.inflateSetDictionary = function(e2, t3) {
            var r2, n2 = t3.length;
            return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t3, n2, 0) !== r2.check ? -3 : Z(e2, t3, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t2, r) {
          "use strict";
          var D2 = e("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          t2.exports = function(e2, t3, r2, n, i, s, a, o) {
            var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D2.Buf16(16), B = new D2.Buf16(16), R = null, T = 0;
            for (b = 0; b <= 15; b++) O[b] = 0;
            for (v = 0; v < n; v++) O[t3[r2 + v]]++;
            for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
            if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
            for (y = 1; y < w && 0 === O[y]; y++) ;
            for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
            if (0 < z && (0 === e2 || 1 !== w)) return -1;
            for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
            for (v = 0; v < n; v++) 0 !== t3[r2 + v] && (a[B[t3[r2 + v]]++] = v);
            if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
            for (; ; ) {
              for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
              for (h = 1 << b - 1; E & h; ) h >>= 1;
              if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                if (b === w) break;
                b = t3[r2 + a[v]];
              }
              if (k < b && (E & f) !== l) {
                for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
                if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
                i[l = E & f] = k << 24 | x << 16 | c - s | 0;
              }
            }
            return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, { "../utils/common": 41 }], 51: [function(e, t2, r) {
          "use strict";
          t2.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
        }, {}], 52: [function(e, t2, r) {
          "use strict";
          var i = e("../utils/common"), o = 0, h = 1;
          function n(e2) {
            for (var t3 = e2.length; 0 <= --t3; ) e2[t3] = 0;
          }
          var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
          n(z);
          var C = new Array(2 * f);
          n(C);
          var E = new Array(512);
          n(E);
          var A = new Array(256);
          n(A);
          var I = new Array(a);
          n(I);
          var O, B, R, T = new Array(f);
          function D2(e2, t3, r2, n2, i2) {
            this.static_tree = e2, this.extra_bits = t3, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
          }
          function F(e2, t3) {
            this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t3;
          }
          function N(e2) {
            return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
          }
          function U(e2, t3) {
            e2.pending_buf[e2.pending++] = 255 & t3, e2.pending_buf[e2.pending++] = t3 >>> 8 & 255;
          }
          function P(e2, t3, r2) {
            e2.bi_valid > d - r2 ? (e2.bi_buf |= t3 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t3 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t3 << e2.bi_valid & 65535, e2.bi_valid += r2);
          }
          function L(e2, t3, r2) {
            P(e2, r2[2 * t3], r2[2 * t3 + 1]);
          }
          function j(e2, t3) {
            for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t3; ) ;
            return r2 >>> 1;
          }
          function Z(e2, t3, r2) {
            var n2, i2, s2 = new Array(g + 1), a2 = 0;
            for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
            for (i2 = 0; i2 <= t3; i2++) {
              var o2 = e2[2 * i2 + 1];
              0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
            }
          }
          function W(e2) {
            var t3;
            for (t3 = 0; t3 < l; t3++) e2.dyn_ltree[2 * t3] = 0;
            for (t3 = 0; t3 < f; t3++) e2.dyn_dtree[2 * t3] = 0;
            for (t3 = 0; t3 < c; t3++) e2.bl_tree[2 * t3] = 0;
            e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
          }
          function M(e2) {
            8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
          }
          function H(e2, t3, r2, n2) {
            var i2 = 2 * t3, s2 = 2 * r2;
            return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t3] <= n2[r2];
          }
          function G(e2, t3, r2) {
            for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t3, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t3, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
            e2.heap[r2] = n2;
          }
          function K(e2, t3, r2) {
            var n2, i2, s2, a2, o2 = 0;
            if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t3) : (L(e2, (s2 = A[i2]) + u + 1, t3), 0 !== (a2 = w[s2]) && P(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
            L(e2, m, t3);
          }
          function Y(e2, t3) {
            var r2, n2, i2, s2 = t3.dyn_tree, a2 = t3.stat_desc.static_tree, o2 = t3.stat_desc.has_stree, h2 = t3.stat_desc.elems, u2 = -1;
            for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
            for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
            for (t3.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
            for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
            e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t4) {
              var r3, n3, i3, s3, a3, o3, h3 = t4.dyn_tree, u3 = t4.max_code, l2 = t4.stat_desc.static_tree, f2 = t4.stat_desc.has_stree, c2 = t4.stat_desc.extra_bits, d2 = t4.stat_desc.extra_base, p2 = t4.stat_desc.max_length, m2 = 0;
              for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
              for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
              if (0 !== m2) {
                do {
                  for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                  e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
                } while (0 < m2);
                for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
              }
            })(e2, t3), Z(s2, u2, e2.bl_count);
          }
          function X(e2, t3, r2) {
            var n2, i2, s2 = -1, a2 = t3[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), t3[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t3[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
          }
          function V(e2, t3, r2) {
            var n2, i2, s2 = -1, a2 = t3[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t3[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
              if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
              else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P(e2, o2 - 11, 7));
              s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
            }
          }
          n(T);
          var q = false;
          function J(e2, t3, r2, n2) {
            P(e2, (s << 1) + (n2 ? 1 : 0), 3), (function(e3, t4, r3, n3) {
              M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t4, r3, e3.pending), e3.pending += r3;
            })(e2, t3, r2, true);
          }
          r._tr_init = function(e2) {
            q || ((function() {
              var e3, t3, r2, n2, i2, s2 = new Array(g + 1);
              for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
              for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
              for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
              for (t3 = 0; t3 <= g; t3++) s2[t3] = 0;
              for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
              for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
              for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
              O = new D2(z, w, u + 1, l, g), B = new D2(C, k, 0, f, g), R = new D2(new Array(0), x, 0, c, p);
            })(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
          }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t3, r2, n2) {
            var i2, s2, a2 = 0;
            0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
              var t4, r3 = 4093624447;
              for (t4 = 0; t4 <= 31; t4++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t4]) return o;
              if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
              for (t4 = 32; t4 < u; t4++) if (0 !== e3.dyn_ltree[2 * t4]) return h;
              return o;
            })(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = (function(e3) {
              var t4;
              for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t4 = c - 1; 3 <= t4 && 0 === e3.bl_tree[2 * S[t4] + 1]; t4--) ;
              return e3.opt_len += 3 * (t4 + 1) + 5 + 5 + 4, t4;
            })(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t3 ? J(e2, t3, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P(e2, 4 + (n2 ? 1 : 0), 3), (function(e3, t4, r3, n3) {
              var i3;
              for (P(e3, t4 - 257, 5), P(e3, r3 - 1, 5), P(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P(e3, e3.bl_tree[2 * S[i3] + 1], 3);
              V(e3, e3.dyn_ltree, t4 - 1), V(e3, e3.dyn_dtree, r3 - 1);
            })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
          }, r._tr_tally = function(e2, t3, r2) {
            return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t3 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t3, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t3 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t3--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t3)]++), e2.last_lit === e2.lit_bufsize - 1;
          }, r._tr_align = function(e2) {
            P(e2, 2, 3), L(e2, m, z), (function(e3) {
              16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
            })(e2);
          };
        }, { "../utils/common": 41 }], 53: [function(e, t2, r) {
          "use strict";
          t2.exports = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}], 54: [function(e, t2, r) {
          (function(e2) {
            !(function(r2, n) {
              "use strict";
              if (!r2.setImmediate) {
                var i, s, t3, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
                e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                  process.nextTick(function() {
                    c(e4);
                  });
                } : (function() {
                  if (r2.postMessage && !r2.importScripts) {
                    var e4 = true, t4 = r2.onmessage;
                    return r2.onmessage = function() {
                      e4 = false;
                    }, r2.postMessage("", "*"), r2.onmessage = t4, e4;
                  }
                })() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                  r2.postMessage(a + e4, "*");
                }) : r2.MessageChannel ? ((t3 = new MessageChannel()).port1.onmessage = function(e4) {
                  c(e4.data);
                }, function(e4) {
                  t3.port2.postMessage(e4);
                }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                  var t4 = l.createElement("script");
                  t4.onreadystatechange = function() {
                    c(e4), t4.onreadystatechange = null, s.removeChild(t4), t4 = null;
                  }, s.appendChild(t4);
                }) : function(e4) {
                  setTimeout(c, 0, e4);
                }, e3.setImmediate = function(e4) {
                  "function" != typeof e4 && (e4 = new Function("" + e4));
                  for (var t4 = new Array(arguments.length - 1), r3 = 0; r3 < t4.length; r3++) t4[r3] = arguments[r3 + 1];
                  var n2 = { callback: e4, args: t4 };
                  return h[o] = n2, i(o), o++;
                }, e3.clearImmediate = f;
              }
              function f(e4) {
                delete h[e4];
              }
              function c(e4) {
                if (u) setTimeout(c, 0, e4);
                else {
                  var t4 = h[e4];
                  if (t4) {
                    u = true;
                    try {
                      !(function(e5) {
                        var t5 = e5.callback, r3 = e5.args;
                        switch (r3.length) {
                          case 0:
                            t5();
                            break;
                          case 1:
                            t5(r3[0]);
                            break;
                          case 2:
                            t5(r3[0], r3[1]);
                            break;
                          case 3:
                            t5(r3[0], r3[1], r3[2]);
                            break;
                          default:
                            t5.apply(n, r3);
                        }
                      })(t4);
                    } finally {
                      f(e4), u = false;
                    }
                  }
                }
              }
              function d(e4) {
                e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
              }
            })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}] }, {}, [10])(10);
      });
    }
  });

  // lang/en.json
  var en_default = {
    "trail.description": "Create animated trails for Bedrock attachables.",
    "trail.mode": "Trail",
    "trail.structure": "Trail",
    "trail.properties": "Trail Properties",
    "trail.browser": "Trail Attachables",
    "trail.pack": "Resource Pack",
    "trail.choose_pack": "Choose a Resource Pack",
    "trail.no_pack": "No resource pack loaded",
    "trail.import_pack": "Import Trail Resource Pack",
    "trail.export_pack": "Export Trail Resource Pack",
    "trail.example": "Sword Trail Example",
    "trail.open": "Open",
    "trail.close": "Close",
    "trail.error": "Simple Trail",
    "trail.available": "Available",
    "trail.configured": "Configured",
    "trail.unavailable": "Unavailable",
    "trail.browser_tip": "Double-click to configure. Checked entries are exported. Select one geometry per attachable.",
    "trail.include_export": "Include in export",
    "trail.point_a": "Start A",
    "trail.point_b": "End B",
    "trail.point_root": "Move the whole attachable",
    "trail.import_config": "Import Trail Configuration",
    "trail.export_config": "Export Trail Configuration",
    "trail.config": "Trail Configuration",
    "trail.reimport": "Import the original resource pack to export this saved project.",
    "trail.preview": "Preview",
    "trail.preview_tip": "Select the whole attachable and drag its move/rotate handle. Preview emission is controlled below, independently of the game Molang condition.",
    "trail.pause": "Pause",
    "trail.play": "Play Preview",
    "trail.swing": "Test Swing",
    "trail.reset": "Reset",
    "trail.preview_emit": "Record new trail positions",
    "trail.helpers": "Show sample points",
    "trail.wireframe": "Show triangle edges",
    "trail.empty": "Import a resource pack or open the Sword Trail example.",
    "trail.points": "Sample Points",
    "trail.position": "Position",
    "trail.reference_root": "Reference root",
    "trail.emission": "Emission",
    "trail.condition": "Molang condition",
    "trail.condition_tip": "v.trail_attack is the player attack progress. Use 1 for continuous emission. The preview switch does not evaluate arbitrary game queries.",
    "trail.lifetime": "Lifetime (s)",
    "trail.interval": "Sample interval (s)",
    "trail.cost": "%0 history segments · %1 triangles · %2 render controllers",
    "trail.width_curve": "Width over lifetime",
    "trail.alpha_curve": "Opacity over lifetime",
    "trail.exponent": "Curve exponent",
    "trail.anchor": "Width anchor",
    "trail.anchor_tip": "0: start · 0.5: center · 1: end",
    "trail.opacity": "Base opacity",
    "trail.color": "Color",
    "trail.blend": "Blending",
    "trail.additive": "Additive",
    "trail.alpha": "Alpha",
    "trail.unlit": "Ignore lighting",
    "trail.advanced": "Advanced",
    "trail.fp_space": "First-person space",
    "trail.view_model": "View model",
    "trail.world": "World",
    "trail.world_scale": "Actor model scale",
    "trail.teleport": "Teleport reset (blocks)",
    "trail.texture": "Trail texture path",
    "trail.texture_tip": "Empty uses the bundled triangle mask. Custom PNGs must use the same triangular UV mask.",
    "trail.curve_help": "Drag keys. Double-click to add. Arrow keys adjust the focused key.",
    "trail.remove_key": "Remove Selected Key",
    "trail.move": "Move",
    "trail.rotate": "Rotate",
    "trail.edit": "Edit Trail",
    "trail.config_target": "This configuration targets a different attachable or geometry.",
    "trail.import_first": "Import a resource pack first.",
    "trail.no_config": "Configure and select at least one attachable in the browser before exporting.",
    "trail.missing_geometry": "Missing geometry: %0",
    "trail.error.expression": "Invalid Molang expression: %0"
  };

  // lang/zh.json
  var zh_default = {
    "trail.description": "为基岩版附着物制作动态拖尾",
    "trail.mode": "拖尾",
    "trail.structure": "拖尾",
    "trail.properties": "拖尾属性",
    "trail.browser": "拖尾附着物",
    "trail.pack": "资源包",
    "trail.choose_pack": "选择资源包",
    "trail.no_pack": "尚未导入资源包",
    "trail.import_pack": "导入拖尾资源包",
    "trail.export_pack": "导出拖尾资源包",
    "trail.example": "Sword Trail 示例",
    "trail.open": "打开",
    "trail.close": "关闭",
    "trail.error": "Simple Trail",
    "trail.available": "可配置",
    "trail.configured": "已配置",
    "trail.unavailable": "不可用",
    "trail.browser_tip": "双击配置拖尾，勾选要导出的项目，每个附着物选择一个模型",
    "trail.include_export": "加入导出",
    "trail.point_a": "起点 A",
    "trail.point_b": "终点 B",
    "trail.point_root": "操纵整个附着物",
    "trail.import_config": "导入拖尾配置",
    "trail.export_config": "导出拖尾配置",
    "trail.config": "拖尾配置",
    "trail.reimport": "导入原资源包后，即可导出这个已保存的项目",
    "trail.preview": "模拟预览",
    "trail.preview_tip": "选择整个附着物，用移动或旋转手柄模拟挥动。预览是否产生轨迹由下方开关控制，独立于游戏中的 Molang 条件",
    "trail.pause": "暂停",
    "trail.play": "运行模拟",
    "trail.swing": "试挥一次",
    "trail.reset": "复位",
    "trail.preview_emit": "记录新的轨迹",
    "trail.helpers": "显示采样点",
    "trail.wireframe": "显示三角面网格",
    "trail.empty": "导入资源包，或打开 Sword Trail 示例",
    "trail.points": "采样点",
    "trail.position": "位置",
    "trail.reference_root": "参考根骨骼",
    "trail.emission": "轨迹采样",
    "trail.condition": "Molang 条件",
    "trail.condition_tip": "v.trail_attack 为玩家攻击进度，填 1 可持续产生轨迹。预览开关不执行任意游戏查询",
    "trail.lifetime": "保留时间（秒）",
    "trail.interval": "采样间隔（秒）",
    "trail.cost": "%0 段历史 · %1 个三角面 · %2 个渲染控制器",
    "trail.width_curve": "宽度随寿命变化",
    "trail.alpha_curve": "不透明度随寿命变化",
    "trail.exponent": "曲线指数",
    "trail.anchor": "收缩中心",
    "trail.anchor_tip": "0：起点 · 0.5：中点 · 1：终点",
    "trail.opacity": "基础不透明度",
    "trail.color": "颜色",
    "trail.blend": "混合方式",
    "trail.additive": "发光叠加",
    "trail.alpha": "透明混合",
    "trail.unlit": "忽略环境光照",
    "trail.advanced": "高级设置",
    "trail.fp_space": "第一人称空间",
    "trail.view_model": "手持模型空间",
    "trail.world": "世界空间",
    "trail.world_scale": "角色模型缩放",
    "trail.teleport": "瞬移重置距离（格）",
    "trail.texture": "拖尾贴图路径",
    "trail.texture_tip": "留空使用内置三角形贴图，自定义 PNG 需遵循相同的三角形 UV 遮罩",
    "trail.curve_help": "拖动关键点，双击添加，方向键调整焦点关键点",
    "trail.remove_key": "删除选中关键点",
    "trail.move": "移动",
    "trail.rotate": "旋转",
    "trail.edit": "编辑拖尾",
    "trail.config_target": "这个配置指向其他附着物或模型",
    "trail.import_first": "请先导入资源包",
    "trail.no_config": "请先配置附着物，并在列表中勾选至少一个导出项目",
    "trail.missing_geometry": "缺少模型：%0",
    "trail.error.expression": "无效的 Molang 表达式：%0"
  };

  // src/i18n.js
  function registerTranslations() {
    Language.addTranslations("en", en_default);
    Language.addTranslations("zh", zh_default);
  }
  function t(key, args = []) {
    const id = "trail." + key, fallback = (en_default[id] ?? key).replace(/%(\d+)/g, (_, n) => args[n] ?? "");
    return typeof globalThis.tl === "function" ? tl(id, args, fallback) : fallback;
  }
  function fail(key, args = []) {
    throw new Error(t("error." + key, args));
  }

  // src/core/parse.mjs
  var forbidden = /* @__PURE__ */ new Set(["constructor", "prototype", "__proto__"]);
  var aliases = { variable: "v", temp: "t", query: "q", context: "c" };
  var precedence = { "??": 1, "||": 2, "&&": 3, "==": 4, "!=": 4, "<": 5, ">": 5, "<=": 5, ">=": 5, "+": 6, "-": 6, "*": 7, "/": 7, "%": 7 };
  function parseExpression(source) {
    if (typeof source === "number" || typeof source === "boolean") {
      if (!Number.isFinite(Number(source))) fail("expression", [String(source)]);
      return { kind: "value", value: Number(source) };
    }
    source = String(source);
    const tokens = [];
    let offset = 0, index = 0;
    const pattern = /\s*(?:(\d*\.\d+|\d+\.?\d*)([eE][+-]?\d+)?|([a-zA-Z_]\w*)|'([^'\r\n]*)'|(\?\?|\|\||&&|==|!=|<=|>=|[+\-*/%<>()!?:.,]))/y;
    while (offset < source.length) {
      pattern.lastIndex = offset;
      const token = pattern.exec(source);
      if (!token) {
        if (!source.slice(offset).trim()) break;
        fail("expression", [source.slice(offset, offset + 80)]);
      }
      offset = pattern.lastIndex;
      tokens.push(token[1] !== void 0 ? { type: "value", value: Number(token[1] + (token[2] ?? "")) } : token[3] ? { type: "name", value: token[3] } : token[4] !== void 0 ? { type: "value", value: token[4] } : { type: "op", value: token[5] });
    }
    const invalid = () => fail("expression", [source.slice(0, 80)]);
    const peek = (value) => tokens[index]?.value === value;
    const take = (value) => {
      if (!peek(value)) invalid();
      index++;
    };
    const primary = () => {
      const token = tokens[index++];
      if (!token) invalid();
      if (token.type === "value") {
        if (typeof token.value === "number" && !Number.isFinite(token.value)) invalid();
        return { kind: "value", value: token.value };
      }
      if (token.type === "op" && ["-", "+", "!"].includes(token.value)) return { kind: "unary", op: token.value, value: primary() };
      if (token.value === "(") {
        const result2 = parse(0);
        take(")");
        return result2;
      }
      if (token.type !== "name") invalid();
      if (token.value === "true" || token.value === "false") return { kind: "value", value: Number(token.value === "true") };
      const path = [aliases[token.value] ?? token.value];
      while (peek(".")) {
        index++;
        const part = tokens[index++];
        if (part?.type !== "name" || forbidden.has(part.value)) invalid();
        path.push(part.value);
      }
      if (!["v", "t", "q", "math", "c"].includes(path[0]) || path.length < 2) invalid();
      if (!peek("(")) return { kind: "read", path };
      if (!["math", "q"].includes(path[0]) || path.length !== 2) invalid();
      index++;
      const args = [];
      if (!peek(")")) {
        do {
          args.push(parse(0));
          if (!peek(",")) break;
          index++;
        } while (true);
      }
      take(")");
      return { kind: "call", path, args };
    };
    const parse = (min) => {
      let left = primary();
      while (index < tokens.length) {
        const op = tokens[index].value, p = precedence[op];
        if (p === void 0 || p < min) break;
        index++;
        left = { kind: "binary", op, left, right: parse(p + 1) };
      }
      if (min === 0 && peek("?")) {
        index++;
        const test = left, yes = parse(0);
        take(":");
        left = { kind: "if", test, yes, no: parse(0) };
      }
      return left;
    };
    const result = parse(0);
    if (index !== tokens.length) invalid();
    return result;
  }

  // src/config.js
  var clone = (value) => JSON.parse(JSON.stringify(value));
  var DEFAULT_CONDITION = "c.item_slot=='main_hand'&&v.trail_attack>0.015&&v.trail_attack<0.88";
  var curveValue = (curve, u) => {
    u = Math.max(0, Math.min(1, u));
    const keys = curve.keys;
    let i = 1;
    while (i < keys.length - 1 && u > keys[i][0]) i++;
    const [a, b] = [keys[i - 1], keys[i]], v = a[1] + (b[1] - a[1]) * (u - a[0]) / (b[0] - a[0]);
    return Math.pow(Math.max(0, v), curve.exponent);
  };
  function curveMolang(curve, u) {
    const keys = curve.keys;
    let out = String(keys.at(-1)[1]);
    for (let i = keys.length - 2; i >= 0; i--) {
      const a = keys[i], b = keys[i + 1];
      out = `${u}<${b[0]}?math.lerp(${a[1]},${b[1]},(${u}-${a[0]})/${b[0] - a[0]}):(${out})`;
    }
    return `math.pow(math.max(0,(${out})),${curve.exponent})`;
  }
  function defaults(attachable, geometry, model) {
    const roots = model.bones.filter((b2) => !b2.parent), root = roots[0]?.name ?? "root";
    const bone = model.bones.find((b2) => b2.name === "sword") ?? model.bones.find((b2) => b2.cubes?.length || b2.texture_meshes?.length) ?? roots[0];
    const a = model.bones.find((b2) => b2.name === "st_blade_base"), b = model.bones.find((b2) => b2.name === "st_blade_tip");
    return {
      format_version: 1,
      attachable,
      geometry,
      root,
      points: { a: { bone: a?.parent ?? bone.name, position: clone(a?.pivot ?? bone.pivot ?? [0, 0, 0]) }, b: { bone: b?.parent ?? bone.name, position: clone(b?.pivot ?? [...bone.pivot ?? [0, 0, 0]].map((v, i) => v + (i === 1 ? 10 : 0))) } },
      emitCondition: DEFAULT_CONDITION,
      lifetime: 0.2,
      sampleInterval: 0.025,
      width: { keys: [[0, 1], [1, 0]], exponent: 2, anchor: 0.5 },
      opacity: { keys: [[0, 1], [1, 1]], exponent: 1, value: 0.38 },
      color: "#b8e0ff",
      texture: "",
      blend: "additive",
      unlit: true,
      firstPersonSpace: "view_model",
      worldScale: 0.9375,
      teleportDistance: 2
    };
  }
  function validate(config, model) {
    const c = clone(config);
    const bad = (message) => {
      throw new Error(message);
    };
    if (c.format_version !== 1) bad("Unsupported trail configuration version.");
    for (const k of ["attachable", "geometry", "root"]) if (typeof c[k] !== "string" || !c[k]) bad(`Missing ${k}.`);
    const names = new Set(model.bones.map((b) => b.name));
    for (const name of names) if (typeof name !== "string" || !name || /[\x00-\x1f'\\]/.test(name)) bad("Bone names cannot contain control characters, quotes or backslashes.");
    if (names.size !== model.bones.length) bad("Duplicate bone names.");
    const map = new Map(model.bones.map((b) => [b.name, b]));
    for (const b of model.bones) {
      const seen = /* @__PURE__ */ new Set();
      let n = b;
      while (n) {
        if (seen.has(n.name)) bad("Cyclic bone hierarchy.");
        seen.add(n.name);
        if (n.parent && !map.has(n.parent)) bad(`Missing parent: ${n.parent}`);
        n = map.get(n.parent);
      }
    }
    if (!names.has(c.root) || map.get(c.root).parent) bad("The reference root must be a top-level bone.");
    for (const end of ["a", "b"]) {
      const p = c.points?.[end];
      if (!p || !names.has(p.bone)) bad(`Missing endpoint bone: ${p?.bone ?? end}`);
      if (!Array.isArray(p.position) || p.position.length !== 3 || p.position.some((v) => !Number.isFinite(v))) bad("Endpoint positions must contain three finite numbers.");
    }
    const range = (v, a, b, key) => {
      if (!Number.isFinite(v) || v < a || v > b) bad(`${key}: ${a}–${b}`);
    };
    range(c.lifetime, 0.025, 2, "lifetime");
    range(c.sampleInterval, 8e-3, 0.1, "sampleInterval");
    if (Math.ceil(c.lifetime / c.sampleInterval) > 32) bad("Use at most 32 history segments. Increase the sampling interval or shorten the lifetime.");
    range(c.width?.anchor, 0, 1, "anchor");
    range(c.opacity?.value, 0, 1, "opacity");
    range(c.worldScale, 0.01, 10, "worldScale");
    range(c.teleportDistance, 0.1, 128, "teleportDistance");
    for (const name of ["width", "opacity"]) {
      const v = c[name];
      range(v.exponent, 0.1, 8, `${name} exponent`);
      if (!Array.isArray(v.keys) || v.keys.length < 2 || v.keys.length > 12) bad("Curves need 2–12 keys.");
      let last = -1;
      for (const p of v.keys) {
        if (!Array.isArray(p) || p.length !== 2) bad("Invalid curve key.");
        range(p[0], 0, 1, "key time");
        range(p[1], 0, name === "width" ? 4 : 1, "key value");
        if (p[0] <= last) bad("Curve times must increase.");
        last = p[0];
      }
      if (v.keys[0][0] !== 0 || v.keys.at(-1)[0] !== 1) bad("Curves must start at 0 and end at 1.");
    }
    if (!/^#[0-9a-f]{6}$/i.test(c.color)) bad("Invalid color.");
    if (!["additive", "alpha"].includes(c.blend) || !["view_model", "world"].includes(c.firstPersonSpace) || typeof c.unlit !== "boolean") bad("Invalid rendering settings.");
    if (typeof c.emitCondition !== "string" || !c.emitCondition.trim() || c.emitCondition.length > 2e3) bad("Invalid emission expression.");
    parseExpression(c.emitCondition);
    if (typeof c.texture !== "string" || c.texture.includes("..") || c.texture.includes(":")) bad("Invalid texture path.");
    return c;
  }

  // src/resources.js
  var import_jszip = __toESM(require_jszip_min(), 1);
  function parseJson(source, label = "JSON") {
    let text = "", quoted = false, escaped = false;
    for (let i = 0; i < source.length; i++) {
      const c = source[i], n = source[i + 1];
      if (quoted) {
        text += c;
        if (escaped) escaped = false;
        else if (c === "\\") escaped = true;
        else if (c === '"') quoted = false;
        continue;
      }
      if (c === '"') {
        quoted = true;
        text += c;
        continue;
      }
      if (c === "/" && n === "/") {
        while (i < source.length && source[i] !== "\n") i++;
        text += "\n";
        continue;
      }
      if (c === "/" && n === "*") {
        i += 2;
        while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) i++;
        i++;
        text += " ";
        continue;
      }
      text += c;
    }
    try {
      return JSON.parse(text.replace(/^\uFEFF/, ""));
    } catch {
      throw new Error(`Invalid JSON: ${label}`);
    }
  }
  var descriptionOf = (r) => r.value["minecraft:attachable"].description;
  function indexResources(files) {
    const r = { files, json: /* @__PURE__ */ new Map(), attachables: /* @__PURE__ */ new Map(), geometries: /* @__PURE__ */ new Map(), geometryFiles: /* @__PURE__ */ new Map(), animations: /* @__PURE__ */ new Map() };
    for (const [path, bytes] of files) {
      if (!/\.json$/i.test(path) || !(/^(attachables|models|animations|animation_controllers|render_controllers|simple_trail)\//.test(path) || path === "manifest.json")) continue;
      const v = parseJson(typeof bytes === "string" ? bytes : new TextDecoder().decode(bytes), path);
      r.json.set(path, v);
      const d = v["minecraft:attachable"]?.description;
      if (d) {
        if (r.attachables.has(d.identifier)) throw new Error(`Duplicate attachable: ${d.identifier}`);
        r.attachables.set(d.identifier, { file: path, value: v });
      }
      for (const g of v["minecraft:geometry"] ?? []) {
        const id = g.description.identifier;
        if (r.geometries.has(id)) throw new Error(`Duplicate geometry: ${id}`);
        r.geometries.set(id, g);
        r.geometryFiles.set(id, path);
      }
      for (const [id, a] of Object.entries(v.animations ?? {})) r.animations.set(id, a);
    }
    return r;
  }
  async function importPacks(data) {
    const found = [], budget = { bytes: 0, count: 0 };
    async function walk(data2, depth = 0, label = "") {
      if (depth > 2) throw new Error("Archive nesting exceeds two levels.");
      const zip = await import_jszip.default.loadAsync(data2), files = /* @__PURE__ */ new Map();
      for (const e of Object.values(zip.files)) {
        if (e.dir) continue;
        const p = e.unsafeOriginalName ?? e.name;
        if (p.startsWith("/") || p.includes("\\") || p.includes(":") || p.split("/").some((s) => s === ".." || !s)) throw new Error(`Invalid archive path: ${p}`);
        budget.bytes += e._data?.uncompressedSize ?? 0;
        if (++budget.count > 2e4 || budget.bytes > 256 * 1024 * 1024) throw new Error("Archive exceeds 256 MB or 20,000 entries.");
        files.set(e.name, await e.async("uint8array"));
      }
      const roots = [];
      for (const [p, b] of files) if (/(^|\/)manifest.json$/.test(p)) {
        const m = parseJson(new TextDecoder().decode(b), p);
        if (m.modules?.some((x) => x.type === "resources")) roots.push({ prefix: p.slice(0, -13), manifest: m });
      }
      for (const { prefix, manifest } of roots) {
        const part = new Map([...files].filter(([p]) => p.startsWith(prefix) && !roots.some((x) => x.prefix !== prefix && x.prefix.startsWith(prefix) && p.startsWith(x.prefix))).map(([p, b]) => [p.slice(prefix.length), b]));
        const r = indexResources(part);
        if (r.attachables.size) found.push({ name: manifest.header?.name ?? label, resources: r });
      }
      if (!roots.length && [...files.keys()].some((p) => p.startsWith("attachables/"))) {
        const r = indexResources(files);
        if (r.attachables.size) found.push({ name: label || "Resource Pack", resources: r });
      }
      for (const [p, b] of files) if (/\.(mcpack|zip|mcaddon)$/i.test(p)) await walk(b, depth + 1, p);
    }
    await walk(data);
    if (!found.length) throw new Error("No resource packs with attachables were found.");
    return found;
  }

  // src/export.js
  var import_jszip2 = __toESM(require_jszip_min(), 1);

  // src/core/syntax.mjs
  var precedence2 = { "??": 1, "||": 2, "&&": 3, "==": 4, "!=": 4, "<": 5, ">": 5, "<=": 5, ">=": 5, "+": 6, "-": 6, "*": 7, "/": 7, "%": 7 };
  var rank = (n) => n.kind === "if" ? 0 : n.kind === "binary" ? precedence2[n.op] : n.kind === "unary" ? 8 : 9;
  function printExpression(n, min = -1) {
    const print = printExpression;
    let text;
    if (n.kind === "value") text = typeof n.value === "string" ? "'" + n.value + "'" : String(n.value);
    else if (n.kind === "read") text = n.path.join(".");
    else if (n.kind === "call") text = n.path.join(".") + "(" + n.args.map((a) => print(a)).join(",") + ")";
    else if (n.kind === "unary") text = n.op + print(n.value, 8);
    else if (n.kind === "binary") text = print(n.left, rank(n)) + n.op + print(n.right, rank(n) + 1);
    else text = print(n.test, 1) + "?" + print(n.yes) + ":" + print(n.no);
    return rank(n) < min ? "(" + text + ")" : text;
  }
  function expressionCompactor() {
    const cache = /* @__PURE__ */ new Map();
    return (source) => {
      if (typeof source !== "string") return String(Number(source));
      if (cache.has(source)) return cache.get(source);
      const result = printExpression(parseExpression(source));
      if (cache.size >= 16384) cache.clear();
      cache.set(source, result);
      return result;
    };
  }

  // src/core/molanguage.js
  var compactExpression = expressionCompactor();
  var set = (name, expr) => ({ kind: "set", name, expr: String(expr) });
  var when = (cond, yes, no = []) => ({ kind: "if", cond: String(cond), yes: [yes].flat(Infinity), no: [no].flat(Infinity) });
  var loop = (count, body) => ({ kind: "loop", count: String(count), body: [body].flat(Infinity) });
  var flat = (...nodes) => nodes.flat(Infinity).filter(Boolean);
  function num(n) {
    if (!Number.isFinite(n)) throw new Error("non-finite constant " + n);
    let s = (Math.abs(n) < 1e-9 ? 0 : n).toFixed(5).replace(/0+$/, "").replace(/\.$/, "");
    if (s === "-0") s = "0";
    s = s.replace(/^(-?)0\./, "$1.");
    return n < 0 ? `(${s})` : s;
  }
  function toMolang(nodes) {
    const out = [];
    for (const node of flat(nodes)) {
      const n = node.kind === "if" ? { ...node, cond: compactExpression(node.cond) } : node.kind === "loop" ? { ...node, count: compactExpression(node.count) } : node;
      if (n.kind === "set") out.push(`${n.name}=${compactExpression(n.expr)};`);
      else if (n.kind === "if") out.push(`${n.cond.includes("?") ? "(" + n.cond + ")" : n.cond}?{${toMolang(n.yes)}}${n.no.length ? `:{${toMolang(n.no)}}` : ""};`);
      else if (n.kind === "loop") out.push(`loop(${n.count},{${toMolang(n.body)}});`);
    }
    return out.join("").replace(/(?<![a-z0-9_])0\.(\d)/g, ".$1");
  }
  var D = Math.PI / 180;
  var ARITY = {
    abs: 1,
    acos: 1,
    asin: 1,
    atan: 1,
    atan2: 2,
    ceil: 1,
    clamp: 3,
    cos: 1,
    exp: 1,
    floor: 1,
    lerp: 3,
    ln: 1,
    max: 2,
    min: 2,
    mod: 2,
    pow: 2,
    round: 1,
    sin: 1,
    sqrt: 1,
    trunc: 1
  };
  function checkMolang(text, where) {
    const tokens = text.replace(/'(?:\\.|[^'\\])*'/g, "''").match(/[a-z_][a-z0-9_]*(?:\.[a-z_][a-z0-9_]*)*|(?:\d*\.\d+|\d+)|\?\?|&&|\|\||==|!=|<=|>=|[^\s]/gi) ?? [];
    const startsOperand = /* @__PURE__ */ new Set(["(", ",", "=", ";", "{", "}", "?", ":", "??", "return"]);
    for (let i = 0; i < tokens.length; i++) if (tokens[i] === "??") {
      const left = tokens[i - 1] ?? "", before = tokens[i - 2];
      if (!/^(?:v|variable|t|temp|c|context)\.[a-z_][a-z0-9_]*$/i.test(left) || before !== void 0 && !startsOperand.has(before)) {
        throw new Error(`${where}: ?? requires a direct variable on its left: ${tokens.slice(Math.max(0, i - 3), i + 2).join("")}`);
      }
    }
    const re = /math\.([a-z_]+)\(/g;
    for (let m; m = re.exec(text); ) {
      if (!(m[1] in ARITY)) throw new Error(`${where}: unknown function math.${m[1]}`);
      let depth = 0, args = 1, i = m.index + m[0].length;
      for (; i < text.length; i++) {
        const ch = text[i];
        if (ch === "(") depth++;
        else if (ch === ")") {
          if (depth-- === 0) break;
        } else if (ch === "," && depth === 0) args++;
      }
      if (args !== ARITY[m[1]]) throw new Error(`${where}: math.${m[1]} takes ${ARITY[m[1]]} arguments, got ${args}: ${text.slice(m.index, i + 1).slice(0, 100)}`);
    }
    return text;
  }

  // src/core/runtime.js
  function createRuntime(config, names) {
    const SEGMENTS = Math.ceil(config.lifetime / config.sampleInterval), INTERVAL = config.sampleInterval, LIFETIME = config.lifetime;
    const AX = ["x", "y", "z"], ENDS = ["a", "b"];
    const slots = ["live", ...Array.from({ length: SEGMENTS }, (_, i) => "h" + i)];
    const point = (slot, end, a) => `v.st_${slot}_${end}${a}`;
    const age = (slot) => `v.st_${slot}_age`;
    const field = (i, key) => `v.st_mesh${i}_${key}`;
    const vector = (prefix, values) => AX.map((a, i) => set(prefix + a, values[i]));
    const length = (p) => `math.sqrt(${AX.map((a) => `${p}${a}*${p}${a}`).join("+")})`;
    const dot = (a, b) => AX.map((k) => `${a}${k}*${b}${k}`).join("+");
    function initialize() {
      return flat([
        ...["ready", "warm", "active", "attack", "previous_attack", "fp", "previous_fp", "emit", "previous_emit", "acc", "stamp", "frame"].map((k) => set("v.st_" + k, 0)),
        set("v.st_last_time", -1),
        set("v.st_bone_clock", 1e4),
        ...["x", "y", "z", "yaw", "pitch"].map((a) => set("v.st_owner_" + a, 0)),
        slots.map((s) => [set(age(s), LIFETIME + 1), ENDS.map((e) => AX.map((a) => set(point(s, e, a), 0)))]),
        Array.from({ length: SEGMENTS * 2 }, (_, i) => [
          set(field(i, "stamp"), -1),
          set(field(i, "visible"), 0),
          ...["rx", "ry", "rz", "px", "py", "pz", "sx", "sy", "iz"].map((k) => set(field(i, k), 0))
        ])
      ]);
    }
    const clear = () => [set("v.st_ready", 0), set("v.st_acc", 0), slots.map((s) => set(age(s), LIFETIME + 1))];
    const preAnimation = "v.st_active=0;v.st_emit=0;v.st_attack=0;v.trail_attack=0;v.st_fp=c.is_first_person;!q.is_in_ui&&!(v.is_paperdoll??0)&&q.is_attached?{q.is_owner_identifier_any('minecraft:player')?{v.st_active=1;v.trail_attack=c.owning_entity->v.attack_time;v.st_attack=v.trail_attack;v.st_emit=(" + config.emitCondition + ");};};";
    function captureFrame() {
      return [
        set("t.base", `q.bone_orientation_trs('${names.a}')`),
        set("t.tip", `q.bone_orientation_trs('${names.b}')`),
        set("t.root", `q.bone_orientation_trs('${config.root}')`),
        set("t.ca", "math.cos(t.root.r.x)"),
        set("t.sa", "-math.sin(t.root.r.x)"),
        set("t.cb", "math.cos(t.root.r.y)"),
        set("t.sb", "math.sin(t.root.r.y)"),
        set("t.cc", "math.cos(t.root.r.z)"),
        set("t.sc", "-math.sin(t.root.r.z)"),
        ...[
          ["t.cc*t.cb", "t.cc*t.sb*t.sa-t.sc*t.ca", "t.cc*t.sb*t.ca+t.sc*t.sa"],
          ["t.sc*t.cb", "t.sc*t.sb*t.sa+t.cc*t.ca", "t.sc*t.sb*t.ca-t.cc*t.sa"],
          ["-t.sb", "t.cb*t.sa", "t.cb*t.ca"]
        ].flatMap((row, i) => row.map((value, j) => set(`v.st_root${i}${j}`, value))),
        AX.map((a) => [set("v.st_root_" + a, "t.root.t." + a), set("v.st_root_s" + a, `(t.root.s.${a}<0?-1:1)*math.max(math.abs(t.root.s.${a}),0.00001)`)]),
        AX.map((a) => [set("t.a" + a, `t.base.t.${a}`), set("t.b" + a, `t.tip.t.${a}`)]),
        set("t.dt", "math.clamp(q.life_time-v.st_last_time,0,0.1)"),
        vector("t.pos", AX.map((_, i) => `q.position(${i})`)),
        set("t.yaw", config.firstPersonSpace === "world" ? "v.st_fp?q.camera_rotation(1):(q.is_riding?q.head_y_rotation(0)-q.target_y_rotation:q.body_y_rotation)" : "q.is_riding?q.head_y_rotation(0)-q.target_y_rotation:q.body_y_rotation"),
        set("t.pitch", config.firstPersonSpace === "world" ? "v.st_fp?q.camera_rotation(0):0" : "0"),
        set("t.reset", "!v.st_ready||v.st_previous_fp!=v.st_fp||q.life_time-v.st_last_time>0.15||q.life_time<v.st_last_time"),
        // Reset on teleports; never connect an old trail to a different location.
        set("t.displacement", AX.map((a) => `(t.pos${a}-v.st_owner_${a})*(t.pos${a}-v.st_owner_${a})`).join("+")),
        when(`t.displacement>${config.teleportDistance ** 2}`, set("t.reset", 1)),
        when("t.reset", [clear(), set("v.st_ready", 1), set("t.dt", 0)]),
        // Third person: bring earlier points into the current actor model frame.
        // Yaw and the model/world Z flip match ClothPhysics / Simple Ragdoll.
        // The default first-person mode keeps view-model history. World mode also
        // compensates the camera pitch/yaw; it shares the same history and mesh fit.
        when(config.firstPersonSpace === "world" ? "!t.reset" : "!t.reset&&!v.st_fp", [
          set("t.cp0", "math.cos(v.st_owner_pitch)"),
          set("t.sp0", "math.sin(v.st_owner_pitch)"),
          set("t.cp1", "math.cos(t.pitch)"),
          set("t.sp1", "math.sin(t.pitch)"),
          set("t.cy", "math.cos(t.yaw)"),
          set("t.sy", "math.sin(t.yaw)"),
          set("t.cd", "math.cos(v.st_owner_yaw-t.yaw)"),
          set("t.sd", "math.sin(v.st_owner_yaw-t.yaw)"),
          AX.map((a) => set("t.d" + a, `(v.st_owner_${a}-t.pos${a})*${num(16 / config.worldScale)}`)),
          set("t.ox", "t.cy*t.dx+t.sy*t.dz"),
          set("t.oz", "t.sy*t.dx-t.cy*t.dz"),
          slots.map((s) => ENDS.map((e) => [
            set("t.x", point(s, e, "x")),
            set("t.y", "t.cp0*" + point(s, e, "y") + "+t.sp0*" + point(s, e, "z")),
            set("t.z", "-t.sp0*" + point(s, e, "y") + "+t.cp0*" + point(s, e, "z")),
            set("t.y", "t.y+t.dy"),
            set("t.nz", "-t.sd*t.x+t.cd*t.z+t.oz"),
            set(point(s, e, "x"), "t.cd*t.x+t.sd*t.z+t.ox"),
            set(point(s, e, "y"), "t.cp1*t.y-t.sp1*t.nz"),
            set(point(s, e, "z"), "t.sp1*t.y+t.cp1*t.nz")
          ]))
        ]),
        slots.map((s) => set(age(s), `math.min(${age(s)}+t.dt,${LIFETIME + 1})`)),
        set("t.swing", "v.st_emit"),
        set("t.start", "t.swing&&(!v.st_previous_emit||t.reset" + (config.emitCondition.includes("v.trail_attack") ? "||v.st_attack<v.st_previous_attack-0.25" : "") + ")"),
        when("t.start", [
          slots.map((s) => [set(age(s), LIFETIME + 1), ENDS.map((e) => AX.map((a) => set(point(s, e, a), `t.${e}${a}`)))]),
          set(age("live"), 0),
          set(age("h0"), 0),
          set("v.st_acc", 0),
          set("t.dt", 0)
        ]),
        when("t.swing", [
          // Even at 30 FPS, sample at 40 Hz by interpolating the two captured poses.
          // The live front edge follows the latest capture between fixed samples.
          ENDS.map((e) => AX.map((a) => set(`t.previous_${e}${a}`, point("live", e, a)))),
          set("t.old_acc", "v.st_acc"),
          set("t.total", "v.st_acc+t.dt"),
          set("t.steps", `math.min(${Math.ceil(0.1 / INTERVAL)},math.floor((t.total+0.000001)/${INTERVAL}))`),
          set("t.step", 0),
          loop("t.steps", [
            set("t.u", `math.clamp((${INTERVAL}-t.old_acc+t.step*${INTERVAL})/math.max(t.dt,0.000001),0,1)`),
            Array.from({ length: SEGMENTS - 1 }, (_, k) => SEGMENTS - 1 - k).map((i) => [
              set(age("h" + i), age("h" + (i - 1))),
              ENDS.map((e) => AX.map((a) => set(point("h" + i, e, a), point("h" + (i - 1), e, a))))
            ]),
            ENDS.map((e) => AX.map((a) => set(point("h0", e, a), `math.lerp(t.previous_${e}${a},t.${e}${a},t.u)`))),
            set(age("h0"), "t.dt*(1-t.u)"),
            set("t.step", "t.step+1")
          ]),
          set("v.st_acc", `math.max(0,t.total-t.steps*${INTERVAL})`),
          ENDS.map((e) => AX.map((a) => set(point("live", e, a), `t.${e}${a}`))),
          set(age("live"), 0)
        ]),
        AX.map((a) => set("v.st_owner_" + a, "t.pos" + a)),
        set("v.st_owner_yaw", "t.yaw"),
        set("v.st_owner_pitch", "t.pitch"),
        set("v.st_previous_emit", "v.st_emit"),
        set("v.st_previous_attack", "v.st_attack"),
        set("v.st_previous_fp", "v.st_fp"),
        set("v.st_last_time", "q.life_time"),
        set("v.st_frame", "v.st_frame+1")
      ];
    }
    function captureNodes() {
      return flat(when("v.st_active", [
        when("q.anim_time<v.st_bone_clock", [clear(), set("v.st_warm", 0)]),
        set("v.st_bone_clock", "q.anim_time"),
        when("q.life_time!=v.st_stamp", [
          set("v.st_stamp", "q.life_time"),
          when("v.st_warm<0.1", [
            set("v.st_warm", "v.st_warm+math.clamp(q.delta_time,0,0.05)"),
            clear()
          ], when(`v.st_emit||(v.st_ready&&v.st_live_age<${LIFETIME})`, captureFrame(), [
            clear(),
            set("v.st_last_time", "q.life_time"),
            set("v.st_previous_attack", "v.st_attack")
          ]))
        ])
      ], [clear(), set("v.st_warm", 0)]));
    }
    function triangleFit(i) {
      return flat([
        AX.map((a) => set("t.m" + a, `(t.p${a}+(t.q${a}+t.r${a})*.5)*.5`)),
        AX.map((a) => set("t.h" + a, `t.r${a}-t.q${a}`)),
        AX.map((a) => set("t.i" + a, `t.p${a}-(t.q${a}+t.r${a})*.5`)),
        set("t.la", length("t.h")),
        when("t.la>0.0001", [
          AX.map((a) => set("t.f" + a, `t.h${a}/t.la`)),
          set("t.lb", dot("t.i", "t.f")),
          AX.map((a) => set("t.i" + a, `t.i${a}-t.lb*t.f${a}`)),
          set("t.ld", length("t.i")),
          when("t.ld>0.0001", [
            AX.map((a) => set("t.k" + a, `t.i${a}/t.ld`)),
            set("t.se", "(t.la+t.ld)*.5"),
            set("t.sf", "(t.la-t.ld)*.5"),
            set("t.sg", "t.lb*.5"),
            set("t.sq", "math.sqrt(t.se*t.se+t.sg*t.sg)"),
            set("t.sw", "math.sqrt(t.sf*t.sf+t.sg*t.sg)"),
            set("t.a1", "math.atan2(t.sg,t.sf)"),
            set("t.a2", "math.atan2(-t.sg,t.se)"),
            set("t.ph", "(t.a2+t.a1)*.5"),
            set("t.cp", "math.cos(t.ph)"),
            set("t.sp", "math.sin(t.ph)"),
            set("t.u0", "t.cp*t.fx+t.sp*t.kx"),
            set("t.u1", "t.cp*t.fy+t.sp*t.ky"),
            set("t.u2", "t.cp*t.fz+t.sp*t.kz"),
            set("t.u3", "t.cp*t.kz-t.sp*t.fz"),
            set("t.u4", "t.fx*t.ky-t.fy*t.kx"),
            // Stable Euler extraction at the vertical singularity.
            when("math.abs(t.u2)>0.999999", [
              set(field(i, "rx"), "(t.u2<0?-1:1)*math.atan2(t.cp*t.kx-t.sp*t.fx,t.cp*t.ky-t.sp*t.fy)"),
              set(field(i, "ry"), "t.u2<0?90:-90"),
              set(field(i, "rz"), 0)
            ], [
              set(field(i, "rx"), "-math.atan2(t.u3,t.u4)"),
              set(field(i, "ry"), "math.asin(math.clamp(-t.u2,-1,1))"),
              set(field(i, "rz"), "-math.atan2(t.u1,t.u0)")
            ]),
            AX.map((a) => set(field(i, "p" + a), "t.m" + a)),
            set(field(i, "sx"), "t.sq+t.sw"),
            set(field(i, "sy"), "math.max(t.sq-t.sw,0)"),
            set(field(i, "iz"), "(t.a1-t.a2)*.5"),
            set(field(i, "visible"), 1)
          ])
        ])
      ]);
    }
    function meshNodes(i) {
      const s = i >> 1, newer = s === 0 ? "live" : "h" + (s - 1), older = "h" + s;
      return flat(when(`(${field(i, "stamp")}??-1)!=(v.st_frame??0)`, [
        set(field(i, "stamp"), "v.st_frame"),
        set(field(i, "visible"), 0),
        set(field(i, "sx"), 0),
        set(field(i, "sy"), 0),
        when(`v.st_active&&v.st_ready&&${age(newer)}<${LIFETIME}&&${age(older)}<${LIFETIME}`, [
          // Taper old cross-sections about their centres, so the tail vanishes
          // continuously without using separate render controllers per segment.
          ...[[newer, "a", "b"], [older, "c", "d"]].map(([slot, aName, bName]) => [
            set("t.width", curveMolang(config.width, `math.clamp(${age(slot)}/${LIFETIME},0,1)`)),
            AX.map((a) => [
              set("t.mid", `math.lerp(${point(slot, "a", a)},${point(slot, "b", a)},${config.width.anchor})`),
              set("t.half", `(${point(slot, "b", a)}-${point(slot, "a", a)})*t.width`),
              set(`t.${aName}${a}`, `t.mid-t.half*${config.width.anchor}`),
              set(`t.${bName}${a}`, `t.mid+t.half*${1 - config.width.anchor}`)
            ])
          ]),
          ...["p", "q", "r"].map((dest, k) => AX.map((a) => set("t." + dest + a, "t." + (i % 2 ? ["b", "d", "c"] : ["a", "b", "c"])[k] + a))),
          // Query positions include the parent's animated root. Undo it once,
          // because these geometry bones inherit that root again at render time.
          ...["p", "q", "r"].map((dest) => [
            AX.map((a) => set("t.d" + a, `t.${dest}${a}-v.st_root_${a}`)),
            AX.map((a, k) => set("t." + dest + a, `(${AX.map((d, j) => `v.st_root${j}${k}*t.d${d}`).join("+")})/v.st_root_s${a}`))
          ]),
          triangleFit(i)
        ])
      ]));
    }
    function animatedBones() {
      const bones = {};
      for (let i = 0; i < SEGMENTS * 2; i++) {
        const prefix = toMolang(meshNodes(i));
        const value = (key, fallback = 0) => `${prefix}return (v.st_active??0)&&(v.st_ready??0)?(${field(i, key)}??${fallback}):${fallback};`;
        bones["st_strip" + i] = { position: AX.map((a) => value("p" + a)), rotation: ["rx", "ry", "rz"].map((k) => value(k)) };
        bones["st_strip" + i + "_scale"] = { scale: [value("sx"), value("sy"), 1] };
        bones["st_strip" + i + "_mesh"] = { rotation: [0, 0, value("iz")] };
      }
      return bones;
    }
    return { initialize, captureNodes, animatedBones, triangleFit, meshNodes, preAnimation };
  }

  // src/assets.js
  var triangle = Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAkFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+WABnwAAAAMHRSTlMA//z38ezm4dvV0MrFv7q0r6mknpiTjYiCfXdybGdhW1ZQS0VAOjUvKiQeGRMOCAPwGkhtAAABeUlEQVR42u3OBW4DURDA0LjMzMwM979duU3Shb9SZqxK9QX8er0/Hth/WWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNgBkgQ0AWWADQBbYAJAFNmBs5HUEjI+8bv+JgDoBJgPq8p8KqQNgOqTy/0xQxYDZoEr/c2EVAubDKvsvBFYEWAys5L8UWgFgObT2/0pwrYDV4Nr+a+G1ANbDa/5vJNQI2Eyo6b+VUgNgO6X6/05StYDdpOr+e2nVAPbTqv4fJFYJOEys6n+UWgXgOLXf/5PkfgFOkxv+n6U3BDhPb/B/ITQAuBTq/18p9QGulX7+N1LfgFupr/+d1ifgXuvj/yD2DngUe/s/qb0CntV6/70ADMT2Vqi/8bQAAAAASUVORK5CYII="), (c) => c.charCodeAt(0));

  // src/export.js
  var encode = (v) => new TextEncoder().encode(JSON.stringify(v, null, 2) + "\n");
  var materialPath = "materials/entity.material";
  var base64 = (bytes) => btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""));
  var hash = (s) => {
    let h = 2166136261;
    for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return (h >>> 0).toString(16);
  };
  var resourceKey = (c) => "st_" + hash(c.attachable + "|" + c.geometry);
  function unwrapResources(resources) {
    const meta = resources.json.get("simple_trail/project.json");
    if (!meta) return resources;
    if (meta.format_version !== 1 || !Array.isArray(meta.files) || !meta.originals) throw new Error("Invalid generated trail metadata.");
    const files = new Map(resources.files);
    for (const p of meta.files) {
      if (!/^(models\/entity|animations|animation_controllers|render_controllers|materials|textures)\/simple_trail\//.test(p) || p.includes("..")) throw new Error("Invalid generated resource path.");
      files.delete(p);
    }
    for (const [p, v] of Object.entries(meta.originals)) {
      if (!/^attachables\/.+\.json$/.test(p) || p.includes("..")) throw new Error("Invalid attachable backup.");
      files.set(p, encode(v));
    }
    if (Object.hasOwn(meta, "materialBackup")) {
      if (meta.materialBackup === null) files.delete(materialPath);
      else if (typeof meta.materialBackup === "string") files.set(materialPath, Uint8Array.from(atob(meta.materialBackup), (c) => c.charCodeAt(0)));
      else throw new Error("Invalid material backup.");
    }
    files.delete("simple_trail/project.json");
    const clean = indexResources(files);
    clean.savedConfigs = clone(meta.configs);
    for (const [id, model] of Object.entries(meta.models ?? {})) if (clean.geometries.has(id)) clean.geometries.set(id, clone(model));
    return clean;
  }
  function generate(resources, configs) {
    if (!resources.json.get("manifest.json")?.modules?.some((m) => m.type === "resources")) throw new Error("Export requires a resource pack manifest.json. Include it in the imported archive.");
    const files = new Map(resources.files), written = [], originals = {}, models = {};
    const materialBytes = files.get(materialPath), materialDoc = materialBytes ? parseJson(new TextDecoder().decode(materialBytes), materialPath) : { materials: { version: "1.0.0" } };
    if (!materialDoc.materials || typeof materialDoc.materials !== "object" || Array.isArray(materialDoc.materials)) throw new Error("Invalid materials/entity.material.");
    const addMaterial = (key, value) => {
      const name = key.split(":")[0];
      if (Object.keys(materialDoc.materials).some((k) => k.split(":")[0] === name)) throw new Error(`Material name already exists: ${name}`);
      materialDoc.materials[key] = value;
    };
    const write = (p, v) => {
      if (files.has(p)) throw new Error(`Generated path already exists: ${p}`);
      files.set(p, v instanceof Uint8Array ? v : encode(v));
      written.push(p);
    };
    const seen = /* @__PURE__ */ new Set();
    for (const input of configs) {
      const record = resources.attachables.get(input.attachable);
      if (!record) throw new Error(`Missing attachable: ${input.attachable}`);
      if (seen.has(input.attachable)) throw new Error("Configure one query geometry per attachable.");
      seen.add(input.attachable);
      const source = descriptionOf(record), geometry = resources.geometries.get(source.geometry?.[input.geometry]);
      if (!geometry) throw new Error(`Missing geometry: ${input.geometry}`);
      const c = validate(input, geometry), id = resourceKey(c), N = Math.ceil(c.lifetime / c.sampleInterval), names = { a: id + "_a", b: id + "_b" };
      models[geometry.description.identifier] = clone(geometry);
      const runtime = createRuntime(c, names);
      const remap = (value) => typeof value === "string" ? value.replace(/\bv\.st_/g, "v." + id + "_").replace(/\bst_strip/g, id + "_strip") : Array.isArray(value) ? value.map(remap) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([k, v]) => [remap(k), remap(v)])) : value;
      const model = clone(geometry);
      model.description.identifier = "geometry." + id + ".source";
      for (const end of ["a", "b"]) {
        if (model.bones.some((b) => b.name === names[end])) throw new Error("Marker name collision.");
        model.bones.push({ name: names[end], parent: c.points[end].bone, pivot: c.points[end].position });
      }
      write(`models/entity/simple_trail/${id}.source.geo.json`, { format_version: "1.16.0", "minecraft:geometry": [model] });
      const root = clone(geometry.bones.find((b) => b.name === c.root));
      delete root.cubes;
      delete root.texture_meshes;
      delete root.locators;
      const pivot = root.pivot ?? [0, 0, 0];
      const ribbon = { description: { identifier: "geometry." + id + ".ribbon", texture_width: 16, texture_height: 16, visible_bounds_width: 16, visible_bounds_height: 16, visible_bounds_offset: [0, 0, 0] }, bones: [root] };
      for (let i = 0; i < N * 2; i++) {
        const n = id + "_strip" + i;
        ribbon.bones.push({ name: n, parent: c.root, pivot: clone(pivot) }, { name: n + "_scale", parent: n, pivot: clone(pivot) }, { name: n + "_mesh", parent: n + "_scale", pivot: clone(pivot), cubes: [{ origin: [pivot[0] - 0.5, pivot[1] - 0.5, pivot[2]], size: [1, 1, 0], uv: { north: { uv: [0, 0], uv_size: [16, 16] } } }] });
      }
      write(`models/entity/simple_trail/${id}.ribbon.geo.json`, { format_version: "1.21.0", "minecraft:geometry": [ribbon] });
      const capture = remap(toMolang(runtime.captureNodes())), initialize = remap(toMolang(runtime.initialize())), bones = remap(runtime.animatedBones());
      for (const s of [capture, initialize, remap(runtime.preAnimation), ...Object.values(bones).flatMap((b) => Object.values(b).flat())]) if (typeof s === "string") {
        checkMolang(s, id);
        if (s.length > 61500) throw new Error("A Molang expression exceeds 61,500 characters. Reduce sampling density or curve keys.");
      }
      write(`animations/simple_trail/${id}.json`, { format_version: "1.10.0", animations: { ["animation." + id + ".display"]: { loop: true, bones } } });
      write(`animation_controllers/simple_trail/${id}.json`, { format_version: "1.10.0", animation_controllers: { ["controller.animation." + id + ".capture"]: { initial_state: "a", states: { a: { transitions: [{ b: "1" }], on_exit: [capture] }, b: { transitions: [{ a: "1" }], on_exit: [capture] } } } } });
      const doc = clone(record.value), d = doc["minecraft:attachable"].description;
      originals[record.file] = clone(record.value);
      d.geometry[c.geometry] = model.description.identifier;
      if (d.geometry[id] || d.animations?.[id + "_display"] || d.materials?.[id]) throw new Error("Generated alias collision.");
      d.geometry[id] = ribbon.description.identifier;
      d.queryable_geometry = c.geometry;
      d.animations = { ...d.animations, [id + "_display"]: "animation." + id + ".display", [id + "_capture"]: "controller.animation." + id + ".capture" };
      d.scripts ??= {};
      for (const k of ["initialize", "pre_animation", "animate"]) if (d.scripts[k] !== void 0 && !Array.isArray(d.scripts[k])) throw new Error(`Expected scripts.${k} to be an array.`);
      d.scripts.initialize = [...d.scripts.initialize ?? [], initialize];
      d.scripts.pre_animation = [...d.scripts.pre_animation ?? [], remap(runtime.preAnimation)];
      d.scripts.animate = [...d.scripts.animate ?? [], id + "_display", id + "_capture"];
      const texturePath = c.texture.replace(/\.png$/i, "") || "textures/simple_trail/" + id;
      if (c.texture && !resources.files.has(texturePath + ".png")) throw new Error(`Missing trail texture: ${texturePath}.png`);
      if (!c.texture) write(texturePath + ".png", triangle);
      d.textures = { ...d.textures, [id]: texturePath };
      d.materials = { ...d.materials, [id]: id + "_ribbon" };
      addMaterial(id + "_base:" + (c.unlit ? "entity_emissive" : "entity"), { "+states": ["Blending", "DisableCulling", "DisableDepthWrite"], "+defines": ["USE_UV_ANIM"], "-defines": ["FANCY"], blendSrc: "One", blendDst: c.blend === "additive" ? "One" : "OneMinusSourceAlpha" });
      addMaterial(id + "_repeat:" + id + "_base", { blendSrc: "SourceAlpha", "+samplerStates": [{ samplerIndex: 0, textureWrap: "Repeat" }] });
      addMaterial(id + "_ribbon:" + id + "_repeat", { "+samplerStates": [{ samplerIndex: 0, textureFilter: "Bilinear" }] });
      const color = c.color.match(/\w\w/g).map((h) => parseInt(h, 16) / 255), controllers = {};
      const variableAlpha = c.opacity.keys.some((k) => k[1] !== c.opacity.keys[0][1]);
      for (let s = 0; s < (variableAlpha ? N : 1); s++) {
        const age = s === 0 ? "live" : "h" + (s - 1), controller2 = "controller.render." + id + ".segment" + s;
        const alpha = `(${c.opacity.value})*(${curveMolang(c.opacity, `math.clamp((v.${id}_${age}_age??${c.lifetime})/${c.lifetime},0,1)`)})`;
        const visibility = Array.from({ length: N * 2 }, (_, i) => ({ [id + "_strip" + i + "_mesh"]: !variableAlpha || i >> 1 === s ? `(v.${id}_active??0)&&(v.${id}_ready??0)` : false }));
        controllers[controller2] = { geometry: "Geometry." + id, rebuild_animation_matrices: true, materials: [{ "*": "Material." + id }], textures: ["Texture." + id], part_visibility: visibility, color: { r: color[0], g: color[1], b: color[2], a: alpha }, ignore_lighting: c.unlit };
        d.render_controllers = [...d.render_controllers ?? [], controller2];
      }
      write(`render_controllers/simple_trail/${id}.json`, { format_version: "1.8.0", render_controllers: controllers });
      files.set(record.file, encode(doc));
    }
    files.set(materialPath, encode(materialDoc));
    files.set("simple_trail/project.json", encode({ format_version: 1, configs: clone(configs), files: written, originals, models, materialBackup: materialBytes ? base64(materialBytes) : null }));
    return { files, generated: written };
  }
  async function exportPack(resources, configs) {
    const result = generate(resources, configs), zip = new import_jszip2.default();
    for (const [p, b] of result.files) zip.file(p, b);
    return zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });
  }

  // src/preview/history.js
  var lerp = (a, b, u) => a.map((v, i) => v + (b[i] - v) * u);
  var TrailHistory = class {
    constructor(config) {
      this.config = config;
      this.reset();
    }
    reset() {
      this.live = null;
      this.samples = [];
      this.acc = 0;
      this.emitting = false;
      this.time = 0;
    }
    update(dt, a, b, emit = true) {
      const c = this.config;
      dt = Math.max(0, dt);
      if (dt > 0.15) this.reset();
      this.time += dt;
      if (emit) {
        if (!this.live || !this.emitting) {
          this.samples = [];
          this.acc = 0;
          this.live = { a: [...a], b: [...b], time: this.time };
          this.samples.push({ ...this.live });
        } else {
          let at = c.sampleInterval - this.acc;
          while (at <= dt + 1e-8) {
            const u = dt ? at / dt : 1;
            this.samples.unshift({ a: lerp(this.live.a, a, u), b: lerp(this.live.b, b, u), time: this.time - dt + at });
            at += c.sampleInterval;
          }
          const total = this.acc + dt;
          this.acc = Math.max(0, total - Math.floor((total + 1e-8) / c.sampleInterval) * c.sampleInterval);
          this.samples.length = Math.min(this.samples.length, Math.ceil(c.lifetime / c.sampleInterval));
          this.live = { a: [...a], b: [...b], time: this.time };
        }
      }
      this.emitting = emit;
    }
    segments() {
      const c = this.config, all = [this.live, ...this.samples].filter(Boolean), out = [];
      const shrink = (s) => {
        const u = (this.time - s.time) / c.lifetime, w = curveValue(c.width, u), mid = lerp(s.a, s.b, c.width.anchor);
        return { a: lerp(mid, s.a, w), b: lerp(mid, s.b, w), alpha: c.opacity.value * curveValue(c.opacity, u), age: u };
      };
      for (let i = 0; i < all.length - 1; i++) {
        const n = shrink(all[i]), o = shrink(all[i + 1]);
        if (n.age >= 1 || o.age >= 1) continue;
        out.push({ triangles: [[n.a, n.b, o.a], [n.b, o.b, o.a]], alpha: n.alpha });
      }
      return out;
    }
  };

  // src/blockbench/preview.js
  var TrailPreview = class {
    constructor(controller2) {
      this.controller = controller2;
      this.running = false;
      this.state = null;
      this.markers = {};
      this.raf = 0;
    }
    setup() {
      this.disposeScene();
      if (!Project?.simple_trail?.config) return;
      const config = Project.simple_trail.config;
      this.project = Project;
      this.wrapper = new THREE.Group();
      this.wrapper.name = "simple_trail_preview";
      const tops = Group.all.filter((g) => !(g.parent instanceof Group));
      this.saved = tops.map((g) => ({ mesh: g.mesh, parent: g.mesh.parent }));
      (this.saved[0]?.parent ?? Project.model_3d).add(this.wrapper);
      for (const x of this.saved) this.wrapper.add(x.mesh);
      this.history = new TrailHistory(config);
      this.group = new THREE.Group();
      scene.add(this.group);
      for (const [key, p] of Object.entries(config.points)) {
        const bone = Group.all.find((g) => g.name === p.bone);
        if (!bone) continue;
        const marker = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 8), new THREE.MeshBasicMaterial({ color: key === "a" ? 3656093 : 16036431, depthTest: false, transparent: true, opacity: 0.9 }));
        marker.position.set(-p.position[0] - bone.origin[0], p.position[1] - bone.origin[1], p.position[2] - bone.origin[2]);
        marker.userData.trailPoint = key;
        marker.renderOrder = 1e3;
        bone.mesh.add(marker);
        this.markers[key] = marker;
      }
      this.meshes = [];
      for (let i = 0; i < Math.ceil(config.lifetime / config.sampleInterval); i++) {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(18), 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0.5, 1, 0, 0, 1, 0, 0.5, 1, 0, 0, 1, 0]), 2));
        const Material = config.unlit ? THREE.MeshBasicMaterial : THREE.MeshLambertMaterial;
        const mat = new Material({ color: config.color, transparent: true, opacity: config.opacity.value, side: THREE.DoubleSide, depthWrite: false, blending: config.blend === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.frustumCulled = false;
        mesh.visible = false;
        this.group.add(mesh);
        this.meshes.push(mesh);
      }
      const bytes = config.texture ? this.controller.resources?.files.get(config.texture.replace(/\.png$/i, "") + ".png") : triangle;
      if (bytes) {
        const url = URL.createObjectURL(new Blob([bytes], { type: "image/png" })), group = this.group;
        new THREE.TextureLoader().load(url, (texture) => {
          URL.revokeObjectURL(url);
          if (this.group !== group) {
            texture.dispose();
            return;
          }
          texture.minFilter = texture.magFilter = THREE.LinearFilter;
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.generateMipmaps = false;
          this.texture = texture;
          for (const mesh of this.meshes) {
            mesh.material.map = texture;
            mesh.material.needsUpdate = true;
          }
        }, void 0, () => URL.revokeObjectURL(url));
      }
      this.state = { project: Project };
      this.updateMarkers();
    }
    updateMarkers() {
      for (const m of Object.values(this.markers)) m.visible = !!this.controller.state.helpers;
      for (const m of this.meshes ?? []) m.material.wireframe = !!this.controller.state.wireframe;
    }
    start() {
      if (!this.state) this.setup();
      if (!this.state) return;
      this.running = true;
      this.last = performance.now();
      this.tick();
    }
    pause() {
      this.running = false;
      cancelAnimationFrame(this.raf);
      this.controller.state.running = false;
    }
    tick() {
      if (!this.running || Project !== this.project) {
        this.pause();
        return;
      }
      const time = performance.now(), dt = Math.min((time - this.last) / 1e3, 0.2);
      this.last = time;
      if (this.demoStart) {
        const u = Math.min((time - this.demoStart) / 600, 1);
        this.wrapper.rotation.set(0.2 * Math.sin(u * Math.PI), 0.35 * Math.sin(u * Math.PI), (-65 + 130 * u) * Math.PI / 180);
        if (u === 1) this.demoStart = 0;
      }
      this.wrapper.updateMatrixWorld(true);
      const a = this.markers.a?.getWorldPosition(new THREE.Vector3()), b = this.markers.b?.getWorldPosition(new THREE.Vector3());
      if (a && b) {
        this.history.update(dt, a.toArray(), b.toArray(), this.controller.state.emit);
        const segments = this.history.segments();
        this.meshes.forEach((mesh, i) => {
          const s = segments[i];
          mesh.visible = !!s;
          if (!s) return;
          mesh.geometry.attributes.position.array.set(s.triangles.flat(2));
          mesh.geometry.attributes.position.needsUpdate = true;
          if (!mesh.material.isMeshBasicMaterial) mesh.geometry.computeVertexNormals();
          mesh.material.opacity = s.alpha;
        });
      }
      this.raf = requestAnimationFrame(() => this.tick());
    }
    swing() {
      if (!this.state) this.setup();
      this.demoStart = performance.now();
      if (!this.running) this.start();
    }
    clearTrail() {
      this.history?.reset();
      for (const mesh of this.meshes ?? []) mesh.visible = false;
    }
    reset() {
      this.pause();
      this.clearTrail();
      if (this.wrapper) {
        this.wrapper.position.set(0, 0, 0);
        this.wrapper.rotation.set(0, 0, 0);
        this.wrapper.updateMatrixWorld(true);
      }
      this.demoStart = 0;
    }
    disposeScene() {
      this.pause();
      for (const marker of Object.values(this.markers)) {
        marker.removeFromParent();
        marker.geometry.dispose();
        marker.material.dispose();
      }
      this.markers = {};
      for (const m of this.meshes ?? []) {
        m.geometry.dispose();
        m.material.dispose();
      }
      this.texture?.dispose();
      this.texture = null;
      this.group?.removeFromParent();
      this.group = null;
      for (const s of this.saved ?? []) s.parent?.add(s.mesh);
      this.wrapper?.removeFromParent();
      this.saved = [];
      this.state = null;
      this.wrapper = null;
    }
    dispose() {
      this.disposeScene();
    }
  };

  // src/vendor/transform-controls.js
  var {
    BoxGeometry,
    BufferGeometry,
    Color,
    CylinderGeometry,
    DoubleSide,
    Euler,
    Float32BufferAttribute,
    Line,
    LineBasicMaterial,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    OctahedronGeometry,
    PlaneGeometry,
    Quaternion,
    Raycaster,
    SphereGeometry,
    TorusGeometry,
    Vector3
  } = globalThis.THREE;
  var _raycaster = new Raycaster();
  var _tempVector = new Vector3();
  var _tempVector2 = new Vector3();
  var _tempQuaternion = new Quaternion();
  var _unit = {
    X: new Vector3(1, 0, 0),
    Y: new Vector3(0, 1, 0),
    Z: new Vector3(0, 0, 1)
  };
  var _changeEvent = { type: "change" };
  var _mouseDownEvent = { type: "mouseDown" };
  var _mouseUpEvent = { type: "mouseUp", mode: null };
  var _objectChangeEvent = { type: "objectChange" };
  var TransformControls = class extends Object3D {
    constructor(camera, domElement) {
      super();
      if (domElement === void 0) {
        console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.');
        domElement = document;
      }
      this.visible = false;
      this.domElement = domElement;
      const _gizmo = new TransformControlsGizmo();
      this._gizmo = _gizmo;
      this.add(_gizmo);
      const _plane = new TransformControlsPlane();
      this._plane = _plane;
      this.add(_plane);
      const scope = this;
      function defineProperty(propName, defaultValue) {
        let propValue = defaultValue;
        Object.defineProperty(scope, propName, {
          get: function() {
            return propValue !== void 0 ? propValue : defaultValue;
          },
          set: function(value) {
            if (propValue !== value) {
              propValue = value;
              _plane[propName] = value;
              _gizmo[propName] = value;
              scope.dispatchEvent({ type: propName + "-changed", value });
              scope.dispatchEvent(_changeEvent);
            }
          }
        });
        scope[propName] = defaultValue;
        _plane[propName] = defaultValue;
        _gizmo[propName] = defaultValue;
      }
      defineProperty("camera", camera);
      defineProperty("object", void 0);
      defineProperty("enabled", true);
      defineProperty("axis", null);
      defineProperty("mode", "translate");
      defineProperty("translationSnap", null);
      defineProperty("rotationSnap", null);
      defineProperty("scaleSnap", null);
      defineProperty("space", "world");
      defineProperty("size", 1);
      defineProperty("dragging", false);
      defineProperty("showX", true);
      defineProperty("showY", true);
      defineProperty("showZ", true);
      const worldPosition = new Vector3();
      const worldPositionStart = new Vector3();
      const worldQuaternion = new Quaternion();
      const worldQuaternionStart = new Quaternion();
      const cameraPosition = new Vector3();
      const cameraQuaternion = new Quaternion();
      const pointStart = new Vector3();
      const pointEnd = new Vector3();
      const rotationAxis = new Vector3();
      const rotationAngle = 0;
      const eye = new Vector3();
      defineProperty("worldPosition", worldPosition);
      defineProperty("worldPositionStart", worldPositionStart);
      defineProperty("worldQuaternion", worldQuaternion);
      defineProperty("worldQuaternionStart", worldQuaternionStart);
      defineProperty("cameraPosition", cameraPosition);
      defineProperty("cameraQuaternion", cameraQuaternion);
      defineProperty("pointStart", pointStart);
      defineProperty("pointEnd", pointEnd);
      defineProperty("rotationAxis", rotationAxis);
      defineProperty("rotationAngle", rotationAngle);
      defineProperty("eye", eye);
      this._offset = new Vector3();
      this._startNorm = new Vector3();
      this._endNorm = new Vector3();
      this._cameraScale = new Vector3();
      this._parentPosition = new Vector3();
      this._parentQuaternion = new Quaternion();
      this._parentQuaternionInv = new Quaternion();
      this._parentScale = new Vector3();
      this._worldScaleStart = new Vector3();
      this._worldQuaternionInv = new Quaternion();
      this._worldScale = new Vector3();
      this._positionStart = new Vector3();
      this._quaternionStart = new Quaternion();
      this._scaleStart = new Vector3();
      this._getPointer = getPointer.bind(this);
      this._onPointerDown = onPointerDown.bind(this);
      this._onPointerHover = onPointerHover.bind(this);
      this._onPointerMove = onPointerMove.bind(this);
      this._onPointerUp = onPointerUp.bind(this);
      this.domElement.addEventListener("pointerdown", this._onPointerDown);
      this.domElement.addEventListener("pointermove", this._onPointerHover);
      this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp);
    }
    // updateMatrixWorld  updates key transformation variables
    updateMatrixWorld() {
      if (this.object !== void 0) {
        this.object.updateMatrixWorld();
        if (this.object.parent === null) {
          console.error("TransformControls: The attached 3D object must be a part of the scene graph.");
        } else {
          this.object.parent.matrixWorld.decompose(this._parentPosition, this._parentQuaternion, this._parentScale);
        }
        this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this._worldScale);
        this._parentQuaternionInv.copy(this._parentQuaternion).invert();
        this._worldQuaternionInv.copy(this.worldQuaternion).invert();
      }
      this.camera.updateMatrixWorld();
      this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this._cameraScale);
      this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize();
      super.updateMatrixWorld(this);
    }
    pointerHover(pointer) {
      if (this.object === void 0 || this.dragging === true) return;
      _raycaster.setFromCamera(pointer, this.camera);
      const intersect = intersectObjectWithRay(this._gizmo.picker[this.mode], _raycaster);
      if (intersect) {
        this.axis = intersect.object.name;
      } else {
        this.axis = null;
      }
    }
    pointerDown(pointer) {
      if (this.object === void 0 || this.dragging === true || pointer.button !== 0) return;
      if (this.axis !== null) {
        _raycaster.setFromCamera(pointer, this.camera);
        const planeIntersect = intersectObjectWithRay(this._plane, _raycaster, true);
        if (planeIntersect) {
          let space = this.space;
          if (this.mode === "scale") {
            space = "local";
          } else if (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") {
            space = "world";
          }
          if (space === "local" && this.mode === "rotate") {
            const snap = this.rotationSnap;
            if (this.axis === "X" && snap) this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;
            if (this.axis === "Y" && snap) this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;
            if (this.axis === "Z" && snap) this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;
          }
          this.object.updateMatrixWorld();
          this.object.parent.updateMatrixWorld();
          this._positionStart.copy(this.object.position);
          this._quaternionStart.copy(this.object.quaternion);
          this._scaleStart.copy(this.object.scale);
          this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart);
          this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
        }
        this.dragging = true;
        _mouseDownEvent.mode = this.mode;
        this.dispatchEvent(_mouseDownEvent);
      }
    }
    pointerMove(pointer) {
      const axis = this.axis;
      const mode = this.mode;
      const object = this.object;
      let space = this.space;
      if (mode === "scale") {
        space = "local";
      } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
        space = "world";
      }
      if (object === void 0 || axis === null || this.dragging === false || pointer.button !== -1) return;
      _raycaster.setFromCamera(pointer, this.camera);
      const planeIntersect = intersectObjectWithRay(this._plane, _raycaster, true);
      if (!planeIntersect) return;
      this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);
      if (mode === "translate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        if (space === "local" && axis !== "XYZ") {
          this._offset.applyQuaternion(this._worldQuaternionInv);
        }
        if (axis.indexOf("X") === -1) this._offset.x = 0;
        if (axis.indexOf("Y") === -1) this._offset.y = 0;
        if (axis.indexOf("Z") === -1) this._offset.z = 0;
        if (space === "local" && axis !== "XYZ") {
          this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale);
        } else {
          this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale);
        }
        object.position.copy(this._offset).add(this._positionStart);
        if (this.translationSnap) {
          if (space === "local") {
            object.position.applyQuaternion(_tempQuaternion.copy(this._quaternionStart).invert());
            if (axis.search("X") !== -1) {
              object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
            }
            if (axis.search("Y") !== -1) {
              object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
            }
            if (axis.search("Z") !== -1) {
              object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
            }
            object.position.applyQuaternion(this._quaternionStart);
          }
          if (space === "world") {
            if (object.parent) {
              object.position.add(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
            }
            if (axis.search("X") !== -1) {
              object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
            }
            if (axis.search("Y") !== -1) {
              object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
            }
            if (axis.search("Z") !== -1) {
              object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
            }
            if (object.parent) {
              object.position.sub(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
            }
          }
        }
      } else if (mode === "scale") {
        if (axis.search("XYZ") !== -1) {
          let d = this.pointEnd.length() / this.pointStart.length();
          if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;
          _tempVector2.set(d, d, d);
        } else {
          _tempVector.copy(this.pointStart);
          _tempVector2.copy(this.pointEnd);
          _tempVector.applyQuaternion(this._worldQuaternionInv);
          _tempVector2.applyQuaternion(this._worldQuaternionInv);
          _tempVector2.divide(_tempVector);
          if (axis.search("X") === -1) {
            _tempVector2.x = 1;
          }
          if (axis.search("Y") === -1) {
            _tempVector2.y = 1;
          }
          if (axis.search("Z") === -1) {
            _tempVector2.z = 1;
          }
        }
        object.scale.copy(this._scaleStart).multiply(_tempVector2);
        if (this.scaleSnap) {
          if (axis.search("X") !== -1) {
            object.scale.x = Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
          }
          if (axis.search("Y") !== -1) {
            object.scale.y = Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
          }
          if (axis.search("Z") !== -1) {
            object.scale.z = Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
          }
        }
      } else if (mode === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const ROTATION_SPEED = 20 / this.worldPosition.distanceTo(_tempVector.setFromMatrixPosition(this.camera.matrixWorld));
        if (axis === "E") {
          this.rotationAxis.copy(this.eye);
          this.rotationAngle = this.pointEnd.angleTo(this.pointStart);
          this._startNorm.copy(this.pointStart).normalize();
          this._endNorm.copy(this.pointEnd).normalize();
          this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1;
        } else if (axis === "XYZE") {
          this.rotationAxis.copy(this._offset).cross(this.eye).normalize();
          this.rotationAngle = this._offset.dot(_tempVector.copy(this.rotationAxis).cross(this.eye)) * ROTATION_SPEED;
        } else if (axis === "X" || axis === "Y" || axis === "Z") {
          this.rotationAxis.copy(_unit[axis]);
          _tempVector.copy(_unit[axis]);
          if (space === "local") {
            _tempVector.applyQuaternion(this.worldQuaternion);
          }
          this.rotationAngle = this._offset.dot(_tempVector.cross(this.eye).normalize()) * ROTATION_SPEED;
        }
        if (this.rotationSnap) this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap;
        if (space === "local" && axis !== "E" && axis !== "XYZE") {
          object.quaternion.copy(this._quaternionStart);
          object.quaternion.multiply(_tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize();
        } else {
          this.rotationAxis.applyQuaternion(this._parentQuaternionInv);
          object.quaternion.copy(_tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle));
          object.quaternion.multiply(this._quaternionStart).normalize();
        }
      }
      this.dispatchEvent(_changeEvent);
      this.dispatchEvent(_objectChangeEvent);
    }
    pointerUp(pointer) {
      if (pointer.button !== 0) return;
      if (this.dragging && this.axis !== null) {
        _mouseUpEvent.mode = this.mode;
        this.dispatchEvent(_mouseUpEvent);
      }
      this.dragging = false;
      this.axis = null;
    }
    dispose() {
      this.domElement.removeEventListener("pointerdown", this._onPointerDown);
      this.domElement.removeEventListener("pointermove", this._onPointerHover);
      this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove);
      this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp);
      this.traverse(function(child) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
    // Set current object
    attach(object) {
      this.object = object;
      this.visible = true;
      return this;
    }
    // Detatch from object
    detach() {
      this.object = void 0;
      this.visible = false;
      this.axis = null;
      return this;
    }
    // TODO: deprecate
    getMode() {
      return this.mode;
    }
    setMode(mode) {
      this.mode = mode;
    }
    setTranslationSnap(translationSnap) {
      this.translationSnap = translationSnap;
    }
    setRotationSnap(rotationSnap) {
      this.rotationSnap = rotationSnap;
    }
    setScaleSnap(scaleSnap) {
      this.scaleSnap = scaleSnap;
    }
    setSize(size) {
      this.size = size;
    }
    setSpace(space) {
      this.space = space;
    }
    update() {
      console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
    }
  };
  TransformControls.prototype.isTransformControls = true;
  function getPointer(event) {
    if (this.domElement.ownerDocument.pointerLockElement) {
      return {
        x: 0,
        y: 0,
        button: event.button
      };
    } else {
      const pointer = event.changedTouches ? event.changedTouches[0] : event;
      const rect = this.domElement.getBoundingClientRect();
      return {
        x: (pointer.clientX - rect.left) / rect.width * 2 - 1,
        y: -(pointer.clientY - rect.top) / rect.height * 2 + 1,
        button: event.button
      };
    }
  }
  function onPointerHover(event) {
    if (!this.enabled) return;
    switch (event.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(event));
        break;
    }
  }
  function onPointerDown(event) {
    if (!this.enabled) return;
    this.domElement.style.touchAction = "none";
    this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove);
    this.pointerHover(this._getPointer(event));
    this.pointerDown(this._getPointer(event));
  }
  function onPointerMove(event) {
    if (!this.enabled) return;
    this.pointerMove(this._getPointer(event));
  }
  function onPointerUp(event) {
    if (!this.enabled) return;
    this.domElement.style.touchAction = "";
    this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove);
    this.pointerUp(this._getPointer(event));
  }
  function intersectObjectWithRay(object, raycaster, includeInvisible) {
    const allIntersections = raycaster.intersectObject(object, true);
    for (let i = 0; i < allIntersections.length; i++) {
      if (allIntersections[i].object.visible || includeInvisible) {
        return allIntersections[i];
      }
    }
    return false;
  }
  var _tempEuler = new Euler();
  var _alignVector = new Vector3(0, 1, 0);
  var _zeroVector = new Vector3(0, 0, 0);
  var _lookAtMatrix = new Matrix4();
  var _tempQuaternion2 = new Quaternion();
  var _identityQuaternion = new Quaternion();
  var _dirVector = new Vector3();
  var _tempMatrix = new Matrix4();
  var _unitX = new Vector3(1, 0, 0);
  var _unitY = new Vector3(0, 1, 0);
  var _unitZ = new Vector3(0, 0, 1);
  var _v1 = new Vector3();
  var _v2 = new Vector3();
  var _v3 = new Vector3();
  var TransformControlsGizmo = class extends Object3D {
    constructor() {
      super();
      this.type = "TransformControlsGizmo";
      const gizmoMaterial = new MeshBasicMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        side: DoubleSide,
        fog: false,
        toneMapped: false
      });
      const gizmoLineMaterial = new LineBasicMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        linewidth: 1,
        fog: false,
        toneMapped: false
      });
      const matInvisible = gizmoMaterial.clone();
      matInvisible.opacity = 0.15;
      const matHelper = gizmoMaterial.clone();
      matHelper.opacity = 0.33;
      const matRed = gizmoMaterial.clone();
      matRed.color.set(16711680);
      const matGreen = gizmoMaterial.clone();
      matGreen.color.set(65280);
      const matBlue = gizmoMaterial.clone();
      matBlue.color.set(255);
      const matWhiteTransparent = gizmoMaterial.clone();
      matWhiteTransparent.opacity = 0.25;
      const matYellowTransparent = matWhiteTransparent.clone();
      matYellowTransparent.color.set(16776960);
      const matCyanTransparent = matWhiteTransparent.clone();
      matCyanTransparent.color.set(65535);
      const matMagentaTransparent = matWhiteTransparent.clone();
      matMagentaTransparent.color.set(16711935);
      const matYellow = gizmoMaterial.clone();
      matYellow.color.set(16776960);
      const matLineRed = gizmoLineMaterial.clone();
      matLineRed.color.set(16711680);
      const matLineGreen = gizmoLineMaterial.clone();
      matLineGreen.color.set(65280);
      const matLineBlue = gizmoLineMaterial.clone();
      matLineBlue.color.set(255);
      const matLineCyan = gizmoLineMaterial.clone();
      matLineCyan.color.set(65535);
      const matLineMagenta = gizmoLineMaterial.clone();
      matLineMagenta.color.set(16711935);
      const matLineYellow = gizmoLineMaterial.clone();
      matLineYellow.color.set(16776960);
      const matLineGray = gizmoLineMaterial.clone();
      matLineGray.color.set(7895160);
      const matLineYellowTransparent = matLineYellow.clone();
      matLineYellowTransparent.opacity = 0.25;
      const arrowGeometry = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false);
      const scaleHandleGeometry = new BoxGeometry(0.125, 0.125, 0.125);
      const lineGeometry = new BufferGeometry();
      lineGeometry.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
      function CircleGeometry(radius, arc) {
        const geometry = new BufferGeometry();
        const vertices = [];
        for (let i = 0; i <= 64 * arc; ++i) {
          vertices.push(0, Math.cos(i / 32 * Math.PI) * radius, Math.sin(i / 32 * Math.PI) * radius);
        }
        geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        return geometry;
      }
      function TranslateHelperGeometry() {
        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3));
        return geometry;
      }
      const gizmoTranslate = {
        X: [
          [new Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, -Math.PI / 2], null, "fwd"],
          [new Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, Math.PI / 2], null, "bwd"],
          [new Line(lineGeometry, matLineRed)]
        ],
        Y: [
          [new Mesh(arrowGeometry, matGreen), [0, 1, 0], null, null, "fwd"],
          [new Mesh(arrowGeometry, matGreen), [0, 1, 0], [Math.PI, 0, 0], null, "bwd"],
          [new Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2]]
        ],
        Z: [
          [new Mesh(arrowGeometry, matBlue), [0, 0, 1], [Math.PI / 2, 0, 0], null, "fwd"],
          [new Mesh(arrowGeometry, matBlue), [0, 0, 1], [-Math.PI / 2, 0, 0], null, "bwd"],
          [new Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0]]
        ],
        XYZ: [
          [new Mesh(new OctahedronGeometry(0.1, 0), matWhiteTransparent.clone()), [0, 0, 0], [0, 0, 0]]
        ],
        XY: [
          [new Mesh(new PlaneGeometry(0.295, 0.295), matYellowTransparent.clone()), [0.15, 0.15, 0]],
          [new Line(lineGeometry, matLineYellow), [0.18, 0.3, 0], null, [0.125, 1, 1]],
          [new Line(lineGeometry, matLineYellow), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]
        ],
        YZ: [
          [new Mesh(new PlaneGeometry(0.295, 0.295), matCyanTransparent.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]],
          [new Line(lineGeometry, matLineCyan), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]],
          [new Line(lineGeometry, matLineCyan), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ],
        XZ: [
          [new Mesh(new PlaneGeometry(0.295, 0.295), matMagentaTransparent.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]],
          [new Line(lineGeometry, matLineMagenta), [0.18, 0, 0.3], null, [0.125, 1, 1]],
          [new Line(lineGeometry, matLineMagenta), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ]
      };
      const pickerTranslate = {
        X: [
          [new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0.6, 0, 0], [0, 0, -Math.PI / 2]]
        ],
        Y: [
          [new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0.6, 0]]
        ],
        Z: [
          [new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0, 0.6], [Math.PI / 2, 0, 0]]
        ],
        XYZ: [
          [new Mesh(new OctahedronGeometry(0.2, 0), matInvisible)]
        ],
        XY: [
          [new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible), [0.2, 0.2, 0]]
        ],
        YZ: [
          [new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]
        ],
        XZ: [
          [new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]
        ]
      };
      const helperTranslate = {
        START: [
          [new Mesh(new OctahedronGeometry(0.01, 2), matHelper), null, null, null, "helper"]
        ],
        END: [
          [new Mesh(new OctahedronGeometry(0.01, 2), matHelper), null, null, null, "helper"]
        ],
        DELTA: [
          [new Line(TranslateHelperGeometry(), matHelper), null, null, null, "helper"]
        ],
        X: [
          [new Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
        ],
        Y: [
          [new Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
        ],
        Z: [
          [new Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
        ]
      };
      const gizmoRotate = {
        X: [
          [new Line(CircleGeometry(1, 0.5), matLineRed)],
          [new Mesh(new OctahedronGeometry(0.04, 0), matRed), [0, 0, 0.99], null, [1, 3, 1]]
        ],
        Y: [
          [new Line(CircleGeometry(1, 0.5), matLineGreen), null, [0, 0, -Math.PI / 2]],
          [new Mesh(new OctahedronGeometry(0.04, 0), matGreen), [0, 0, 0.99], null, [3, 1, 1]]
        ],
        Z: [
          [new Line(CircleGeometry(1, 0.5), matLineBlue), null, [0, Math.PI / 2, 0]],
          [new Mesh(new OctahedronGeometry(0.04, 0), matBlue), [0.99, 0, 0], null, [1, 3, 1]]
        ],
        E: [
          [new Line(CircleGeometry(1.25, 1), matLineYellowTransparent), null, [0, Math.PI / 2, 0]],
          [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 1e-3]],
          [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 1e-3]],
          [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 1e-3]],
          [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, 1.17, 0], [0, 0, 0], [1, 1, 1e-3]]
        ],
        XYZE: [
          [new Line(CircleGeometry(1, 1), matLineGray), null, [0, Math.PI / 2, 0]]
        ]
      };
      const helperRotate = {
        AXIS: [
          [new Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
        ]
      };
      const pickerRotate = {
        X: [
          [new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
        ],
        Y: [
          [new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [Math.PI / 2, 0, 0]]
        ],
        Z: [
          [new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, 0, -Math.PI / 2]]
        ],
        E: [
          [new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), matInvisible)]
        ],
        XYZE: [
          [new Mesh(new SphereGeometry(0.7, 10, 8), matInvisible)]
        ]
      };
      const gizmoScale = {
        X: [
          [new Mesh(scaleHandleGeometry, matRed), [0.8, 0, 0], [0, 0, -Math.PI / 2]],
          [new Line(lineGeometry, matLineRed), null, null, [0.8, 1, 1]]
        ],
        Y: [
          [new Mesh(scaleHandleGeometry, matGreen), [0, 0.8, 0]],
          [new Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]
        ],
        Z: [
          [new Mesh(scaleHandleGeometry, matBlue), [0, 0, 0.8], [Math.PI / 2, 0, 0]],
          [new Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]
        ],
        XY: [
          [new Mesh(scaleHandleGeometry, matYellowTransparent), [0.85, 0.85, 0], null, [2, 2, 0.2]],
          [new Line(lineGeometry, matLineYellow), [0.855, 0.98, 0], null, [0.125, 1, 1]],
          [new Line(lineGeometry, matLineYellow), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]
        ],
        YZ: [
          [new Mesh(scaleHandleGeometry, matCyanTransparent), [0, 0.85, 0.85], null, [0.2, 2, 2]],
          [new Line(lineGeometry, matLineCyan), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]],
          [new Line(lineGeometry, matLineCyan), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ],
        XZ: [
          [new Mesh(scaleHandleGeometry, matMagentaTransparent), [0.85, 0, 0.85], null, [2, 0.2, 2]],
          [new Line(lineGeometry, matLineMagenta), [0.855, 0, 0.98], null, [0.125, 1, 1]],
          [new Line(lineGeometry, matLineMagenta), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]
        ],
        XYZX: [
          [new Mesh(new BoxGeometry(0.125, 0.125, 0.125), matWhiteTransparent.clone()), [1.1, 0, 0]]
        ],
        XYZY: [
          [new Mesh(new BoxGeometry(0.125, 0.125, 0.125), matWhiteTransparent.clone()), [0, 1.1, 0]]
        ],
        XYZZ: [
          [new Mesh(new BoxGeometry(0.125, 0.125, 0.125), matWhiteTransparent.clone()), [0, 0, 1.1]]
        ]
      };
      const pickerScale = {
        X: [
          [new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0.5, 0, 0], [0, 0, -Math.PI / 2]]
        ],
        Y: [
          [new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0.5, 0]]
        ],
        Z: [
          [new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0, 0.5], [Math.PI / 2, 0, 0]]
        ],
        XY: [
          [new Mesh(scaleHandleGeometry, matInvisible), [0.85, 0.85, 0], null, [3, 3, 0.2]]
        ],
        YZ: [
          [new Mesh(scaleHandleGeometry, matInvisible), [0, 0.85, 0.85], null, [0.2, 3, 3]]
        ],
        XZ: [
          [new Mesh(scaleHandleGeometry, matInvisible), [0.85, 0, 0.85], null, [3, 0.2, 3]]
        ],
        XYZX: [
          [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [1.1, 0, 0]]
        ],
        XYZY: [
          [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 1.1, 0]]
        ],
        XYZZ: [
          [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 1.1]]
        ]
      };
      const helperScale = {
        X: [
          [new Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
        ],
        Y: [
          [new Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
        ],
        Z: [
          [new Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
        ]
      };
      function setupGizmo(gizmoMap) {
        const gizmo = new Object3D();
        for (const name in gizmoMap) {
          for (let i = gizmoMap[name].length; i--; ) {
            const object = gizmoMap[name][i][0].clone();
            const position = gizmoMap[name][i][1];
            const rotation = gizmoMap[name][i][2];
            const scale = gizmoMap[name][i][3];
            const tag = gizmoMap[name][i][4];
            object.name = name;
            object.tag = tag;
            if (position) {
              object.position.set(position[0], position[1], position[2]);
            }
            if (rotation) {
              object.rotation.set(rotation[0], rotation[1], rotation[2]);
            }
            if (scale) {
              object.scale.set(scale[0], scale[1], scale[2]);
            }
            object.updateMatrix();
            const tempGeometry = object.geometry.clone();
            tempGeometry.applyMatrix4(object.matrix);
            object.geometry = tempGeometry;
            object.renderOrder = Infinity;
            object.position.set(0, 0, 0);
            object.rotation.set(0, 0, 0);
            object.scale.set(1, 1, 1);
            gizmo.add(object);
          }
        }
        return gizmo;
      }
      this.gizmo = {};
      this.picker = {};
      this.helper = {};
      this.add(this.gizmo["translate"] = setupGizmo(gizmoTranslate));
      this.add(this.gizmo["rotate"] = setupGizmo(gizmoRotate));
      this.add(this.gizmo["scale"] = setupGizmo(gizmoScale));
      this.add(this.picker["translate"] = setupGizmo(pickerTranslate));
      this.add(this.picker["rotate"] = setupGizmo(pickerRotate));
      this.add(this.picker["scale"] = setupGizmo(pickerScale));
      this.add(this.helper["translate"] = setupGizmo(helperTranslate));
      this.add(this.helper["rotate"] = setupGizmo(helperRotate));
      this.add(this.helper["scale"] = setupGizmo(helperScale));
      this.picker["translate"].visible = false;
      this.picker["rotate"].visible = false;
      this.picker["scale"].visible = false;
    }
    // updateMatrixWorld will update transformations and appearance of individual handles
    updateMatrixWorld(force) {
      const space = this.mode === "scale" ? "local" : this.space;
      const quaternion = space === "local" ? this.worldQuaternion : _identityQuaternion;
      this.gizmo["translate"].visible = this.mode === "translate";
      this.gizmo["rotate"].visible = this.mode === "rotate";
      this.gizmo["scale"].visible = this.mode === "scale";
      this.helper["translate"].visible = this.mode === "translate";
      this.helper["rotate"].visible = this.mode === "rotate";
      this.helper["scale"].visible = this.mode === "scale";
      let handles = [];
      handles = handles.concat(this.picker[this.mode].children);
      handles = handles.concat(this.gizmo[this.mode].children);
      handles = handles.concat(this.helper[this.mode].children);
      for (let i = 0; i < handles.length; i++) {
        const handle = handles[i];
        handle.visible = true;
        handle.rotation.set(0, 0, 0);
        handle.position.copy(this.worldPosition);
        let factor;
        if (this.camera.isOrthographicCamera) {
          factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
        } else {
          factor = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7);
        }
        handle.scale.set(1, 1, 1).multiplyScalar(factor * this.size / 7);
        if (handle.tag === "helper") {
          handle.visible = false;
          if (handle.name === "AXIS") {
            handle.position.copy(this.worldPositionStart);
            handle.visible = !!this.axis;
            if (this.axis === "X") {
              _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, 0));
              handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
              if (Math.abs(_alignVector.copy(_unitX).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                handle.visible = false;
              }
            }
            if (this.axis === "Y") {
              _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, Math.PI / 2));
              handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
              if (Math.abs(_alignVector.copy(_unitY).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                handle.visible = false;
              }
            }
            if (this.axis === "Z") {
              _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
              handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
              if (Math.abs(_alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                handle.visible = false;
              }
            }
            if (this.axis === "XYZE") {
              _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
              _alignVector.copy(this.rotationAxis);
              handle.quaternion.setFromRotationMatrix(_lookAtMatrix.lookAt(_zeroVector, _alignVector, _unitY));
              handle.quaternion.multiply(_tempQuaternion);
              handle.visible = this.dragging;
            }
            if (this.axis === "E") {
              handle.visible = false;
            }
          } else if (handle.name === "START") {
            handle.position.copy(this.worldPositionStart);
            handle.visible = this.dragging;
          } else if (handle.name === "END") {
            handle.position.copy(this.worldPosition);
            handle.visible = this.dragging;
          } else if (handle.name === "DELTA") {
            handle.position.copy(this.worldPositionStart);
            handle.quaternion.copy(this.worldQuaternionStart);
            _tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
            _tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert());
            handle.scale.copy(_tempVector);
            handle.visible = this.dragging;
          } else {
            handle.quaternion.copy(quaternion);
            if (this.dragging) {
              handle.position.copy(this.worldPositionStart);
            } else {
              handle.position.copy(this.worldPosition);
            }
            if (this.axis) {
              handle.visible = this.axis.search(handle.name) !== -1;
            }
          }
          continue;
        }
        handle.quaternion.copy(quaternion);
        if (this.mode === "translate" || this.mode === "scale") {
          const AXIS_HIDE_TRESHOLD = 0.99;
          const PLANE_HIDE_TRESHOLD = 0.2;
          const AXIS_FLIP_TRESHOLD = 0;
          if (handle.name === "X" || handle.name === "XYZX") {
            if (Math.abs(_alignVector.copy(_unitX).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }
          if (handle.name === "Y" || handle.name === "XYZY") {
            if (Math.abs(_alignVector.copy(_unitY).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }
          if (handle.name === "Z" || handle.name === "XYZZ") {
            if (Math.abs(_alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }
          if (handle.name === "XY") {
            if (Math.abs(_alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }
          if (handle.name === "YZ") {
            if (Math.abs(_alignVector.copy(_unitX).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }
          if (handle.name === "XZ") {
            if (Math.abs(_alignVector.copy(_unitY).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }
          if (handle.name.search("X") !== -1) {
            if (_alignVector.copy(_unitX).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
              if (handle.tag === "fwd") {
                handle.visible = false;
              } else {
                handle.scale.x *= -1;
              }
            } else if (handle.tag === "bwd") {
              handle.visible = false;
            }
          }
          if (handle.name.search("Y") !== -1) {
            if (_alignVector.copy(_unitY).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
              if (handle.tag === "fwd") {
                handle.visible = false;
              } else {
                handle.scale.y *= -1;
              }
            } else if (handle.tag === "bwd") {
              handle.visible = false;
            }
          }
          if (handle.name.search("Z") !== -1) {
            if (_alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
              if (handle.tag === "fwd") {
                handle.visible = false;
              } else {
                handle.scale.z *= -1;
              }
            } else if (handle.tag === "bwd") {
              handle.visible = false;
            }
          }
        } else if (this.mode === "rotate") {
          _tempQuaternion2.copy(quaternion);
          _alignVector.copy(this.eye).applyQuaternion(_tempQuaternion.copy(quaternion).invert());
          if (handle.name.search("E") !== -1) {
            handle.quaternion.setFromRotationMatrix(_lookAtMatrix.lookAt(this.eye, _zeroVector, _unitY));
          }
          if (handle.name === "X") {
            _tempQuaternion.setFromAxisAngle(_unitX, Math.atan2(-_alignVector.y, _alignVector.z));
            _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion);
            handle.quaternion.copy(_tempQuaternion);
          }
          if (handle.name === "Y") {
            _tempQuaternion.setFromAxisAngle(_unitY, Math.atan2(_alignVector.x, _alignVector.z));
            _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion);
            handle.quaternion.copy(_tempQuaternion);
          }
          if (handle.name === "Z") {
            _tempQuaternion.setFromAxisAngle(_unitZ, Math.atan2(_alignVector.y, _alignVector.x));
            _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion);
            handle.quaternion.copy(_tempQuaternion);
          }
        }
        handle.visible = handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
        handle.visible = handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
        handle.visible = handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
        handle.visible = handle.visible && (handle.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ);
        handle.material._opacity = handle.material._opacity || handle.material.opacity;
        handle.material._color = handle.material._color || handle.material.color.clone();
        handle.material.color.copy(handle.material._color);
        handle.material.opacity = handle.material._opacity;
        if (!this.enabled) {
          handle.material.opacity *= 0.5;
          handle.material.color.lerp(new Color(1, 1, 1), 0.5);
        } else if (this.axis) {
          if (handle.name === this.axis) {
            handle.material.opacity = 1;
            handle.material.color.lerp(new Color(1, 1, 1), 0.5);
          } else if (this.axis.split("").some(function(a) {
            return handle.name === a;
          })) {
            handle.material.opacity = 1;
            handle.material.color.lerp(new Color(1, 1, 1), 0.5);
          } else {
            handle.material.opacity *= 0.25;
            handle.material.color.lerp(new Color(1, 1, 1), 0.5);
          }
        }
      }
      super.updateMatrixWorld(force);
    }
  };
  TransformControlsGizmo.prototype.isTransformControlsGizmo = true;
  var TransformControlsPlane = class extends Mesh {
    constructor() {
      super(
        new PlaneGeometry(1e5, 1e5, 2, 2),
        new MeshBasicMaterial({ visible: false, wireframe: true, side: DoubleSide, transparent: true, opacity: 0.1, toneMapped: false })
      );
      this.type = "TransformControlsPlane";
    }
    updateMatrixWorld(force) {
      let space = this.space;
      this.position.copy(this.worldPosition);
      if (this.mode === "scale") space = "local";
      _v1.copy(_unitX).applyQuaternion(space === "local" ? this.worldQuaternion : _identityQuaternion);
      _v2.copy(_unitY).applyQuaternion(space === "local" ? this.worldQuaternion : _identityQuaternion);
      _v3.copy(_unitZ).applyQuaternion(space === "local" ? this.worldQuaternion : _identityQuaternion);
      _alignVector.copy(_v2);
      switch (this.mode) {
        case "translate":
        case "scale":
          switch (this.axis) {
            case "X":
              _alignVector.copy(this.eye).cross(_v1);
              _dirVector.copy(_v1).cross(_alignVector);
              break;
            case "Y":
              _alignVector.copy(this.eye).cross(_v2);
              _dirVector.copy(_v2).cross(_alignVector);
              break;
            case "Z":
              _alignVector.copy(this.eye).cross(_v3);
              _dirVector.copy(_v3).cross(_alignVector);
              break;
            case "XY":
              _dirVector.copy(_v3);
              break;
            case "YZ":
              _dirVector.copy(_v1);
              break;
            case "XZ":
              _alignVector.copy(_v3);
              _dirVector.copy(_v2);
              break;
            case "XYZ":
            case "E":
              _dirVector.set(0, 0, 0);
              break;
          }
          break;
        case "rotate":
        default:
          _dirVector.set(0, 0, 0);
      }
      if (_dirVector.length() === 0) {
        this.quaternion.copy(this.cameraQuaternion);
      } else {
        _tempMatrix.lookAt(_tempVector.set(0, 0, 0), _dirVector, _alignVector);
        this.quaternion.setFromRotationMatrix(_tempMatrix);
      }
      super.updateMatrixWorld(force);
    }
  };
  TransformControlsPlane.prototype.isTransformControlsPlane = true;

  // src/blockbench/gizmo.js
  var Gizmo = class {
    constructor(controller2) {
      this.controller = controller2;
      this.events = [];
      this.controls = null;
      this.drag = null;
      for (const kind of ["down", "move", "up"]) {
        const fn = (e) => this.pointer(e, kind);
        document.addEventListener("pointer" + kind, fn, true);
        this.events.push(["pointer" + kind, fn]);
      }
      const cancel = () => this.cancel();
      document.addEventListener("pointercancel", cancel, true);
      this.events.push(["pointercancel", cancel]);
      const escape = (e) => {
        if (e.key === "Escape" && this.drag) {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.cancel();
        }
      };
      document.addEventListener("keydown", escape, true);
      this.events.push(["keydown", escape]);
    }
    attach() {
      if (!this.controller.active()) return this.clear();
      const p = this.controller.preview;
      if (!p.state) return;
      const selected = this.controller.state.selected, target = selected === "root" ? p.wrapper : p.markers[selected];
      if (!target) return this.clear();
      if (!this.controls) {
        const surface = document.createElement("canvas");
        this.controls = new TransformControls(Preview.selected.camera, surface);
        surface.ownerDocument.removeEventListener("pointerup", this.controls._onPointerUp);
        scene.add(this.controls);
        this.controls.setSize(0.8);
        this.controls.addEventListener("mouseDown", () => {
          this.drag = { preview: this.currentPreview, orbit: this.currentPreview.controls.enabled, position: this.controls.object.position.clone(), quaternion: this.controls.object.quaternion.clone() };
          this.currentPreview.controls.enabled = false;
        });
        this.controls.addEventListener("mouseUp", () => this.finish());
      }
      this.controls.attach(target);
      this.controls.setMode(selected === "root" && this.controller.state.tool === "rotate" ? "rotate" : "translate");
      this.controls.setSpace("world");
      this.controls.camera = Preview.selected.camera;
      Transformer.visible = false;
    }
    clear() {
      this.controls?.detach();
    }
    pointer(e, kind) {
      if (!this.controller.active()) return;
      const preview = this.drag?.preview ?? Preview.all.find((p) => !p.offscreen && p.canvas === e.target);
      if (!preview) return;
      const rect = preview.canvas.getBoundingClientRect(), pointer = { x: (e.clientX - rect.left) / rect.width * 2 - 1, y: -(e.clientY - rect.top) / rect.height * 2 + 1, button: kind === "move" ? -1 : e.button };
      const controls = this.controls;
      if (controls?.object) {
        controls.camera = preview.camera;
        controls.updateMatrixWorld(true);
        if (!this.drag) controls.pointerHover(pointer);
        if (this.drag || controls.axis && (kind === "move" || e.button === 0)) {
          e.stopImmediatePropagation();
          e.preventDefault();
          if (kind === "down") {
            this.currentPreview = preview;
            controls.pointerDown(pointer);
          } else if (kind === "move") controls.pointerMove(pointer);
          else controls.pointerUp(pointer);
          return;
        }
      }
      if (kind === "down" && e.button === 0) {
        const ray = new THREE.Raycaster();
        ray.setFromCamera(pointer, preview.camera);
        const hit = ray.intersectObjects(Object.values(this.controller.preview.markers))[0];
        if (hit) {
          e.stopImmediatePropagation();
          e.preventDefault();
          this.controller.select(hit.object.userData.trailPoint);
        }
      }
    }
    finish() {
      if (!this.drag) return;
      this.drag.preview.controls.enabled = this.drag.orbit;
      this.drag = null;
      const key = this.controller.state.selected;
      if (key !== "root") {
        const config = Project.simple_trail.config, p = config.points[key], bone = Group.all.find((g) => g.name === p.bone), node = this.controller.preview.markers[key];
        this.controller.change("points." + key + ".position", [-node.position.x - bone.origin[0], node.position.y + bone.origin[1], node.position.z + bone.origin[2]]);
      }
    }
    cancel() {
      if (!this.drag) return;
      this.controls.object.position.copy(this.drag.position);
      this.controls.object.quaternion.copy(this.drag.quaternion);
      this.drag.preview.controls.enabled = this.drag.orbit;
      this.drag = null;
      this.controls.dragging = false;
      this.controls.axis = null;
    }
    dispose() {
      this.cancel();
      this.clear();
      this.controls?.removeFromParent();
      this.controls?.dispose();
      for (const [event, fn] of this.events) document.removeEventListener(event, fn, true);
    }
  };

  // src/blockbench/dialogs.js
  function browserDialog(controller2) {
    if (controller2.browser) {
      controller2.browser.show();
      return;
    }
    controller2.browser = new Dialog("trail_browser", {
      title: t("browser"),
      width: 650,
      component: {
        data: () => ({ s: controller2.state }),
        computed: { rows() {
          const q = this.s.search.toLowerCase();
          return this.s.rows.filter((r) => (r.id + " " + r.alias).toLowerCase().includes(q));
        } },
        methods: { t, open(r) {
          controller2.safe(() => controller2.openRow(r));
        }, enable(r, v) {
          controller2.setEnabled(r, v);
        }, importPack() {
          controller2.choosePack();
        }, example() {
          controller2.safe(() => controller2.openExample());
        }, exportPack() {
          controller2.safe(() => controller2.export());
        } },
        template: `<div class="st-browser"><div class="st-browser-bar"><span class="st-grow st-ellipsis">{{s.packName||t('no_pack')}}</span><button @click="importPack" :disabled="s.busy">{{t('import_pack')}}</button><button @click="example" :disabled="s.busy">Sword Trail</button><button @click="exportPack" :disabled="s.busy||!s.rows.some(r=>r.enabled)">{{t('export_pack')}}</button></div><search-bar v-model="s.search"></search-bar><ul class="st-entity-list" role="listbox"><li v-for="r in rows" :key="r.key" :title="r.error" :class="{selected:s.current===r.key,'st-unavailable':!!r.error}" @click="s.current=r.key" @dblclick="open(r)"><input type="checkbox" :aria-label="t('include_export')+' '+r.id" :title="t('include_export')" :checked="r.enabled" :disabled="!r.configured||!!r.error" @click.stop @dblclick.stop @change="enable(r,$event.target.checked)"><i class="material-icons">sports_martial_arts</i><span class="st-grow">{{r.id}} · {{r.alias}}</span><span>{{r.error?t('unavailable'):r.configured?t('configured'):t('available')}}</span></li></ul><p class="st-note">{{t('browser_tip')}}</p></div>`
      },
      buttons: [t("open"), t("close")],
      onConfirm() {
        const r = controller2.state.rows.find((r2) => r2.key === controller2.state.current);
        if (!r || r.error) return false;
        controller2.safe(() => controller2.openRow(r));
      }
    });
    controller2.browser.show();
  }

  // examples/sword_trail.mcpack
  var sword_trail_default = __toBinary("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");

  // src/blockbench/controller.js
  var Controller = class {
    constructor() {
      this.resources = null;
      this.configs = /* @__PURE__ */ new Map();
      this.enabled = /* @__PURE__ */ new Set();
      this.browser = null;
      this.state = { packName: "", rows: [], search: "", current: "", busy: false, configured: false, config: null, bones: [], selected: "a", tool: "move", running: false, emit: true, helpers: true, wireframe: false, error: "", linked: false };
      this.preview = new TrailPreview(this);
      this.gizmo = new Gizmo(this);
    }
    safe(fn) {
      try {
        const result = fn();
        if (result?.catch) result.catch((e) => this.error(e));
        return result;
      } catch (e) {
        this.error(e);
      }
    }
    error(e) {
      console.error(e);
      Blockbench.showMessageBox({ title: t("error"), message: e.message ?? String(e), buttons: [t("close")] });
    }
    active() {
      return Modes.selected?.id === "trail" && !!Project?.simple_trail?.config;
    }
    get data() {
      return Project?.simple_trail?.config ? Project.simple_trail : null;
    }
    key(r) {
      return r.id + "|" + r.alias;
    }
    async importFile(file) {
      this.state.busy = true;
      try {
        const packs = await importPacks(file.content);
        if (packs.length === 1) this.usePack(packs[0], file.name);
        else new Dialog("trail_pack_select", { title: t("choose_pack"), form: { pack: { label: t("pack"), type: "select", options: Object.fromEntries(packs.map((p, i) => [i, p.name])), value: "0" } }, onConfirm: (v) => {
          this.usePack(packs[Number(v.pack)], file.name);
          browserDialog(this);
        } }).show();
      } finally {
        this.state.busy = false;
      }
    }
    usePack(pack, name) {
      this.preview.disposeScene();
      this.gizmo.clear();
      this.resources = unwrapResources(pack.resources);
      this.packKey = this.resources.json.get("manifest.json")?.header?.uuid ?? name;
      this.configs = new Map((this.resources.savedConfigs ?? []).map((c) => [c.attachable + "|" + c.geometry, c]));
      this.state.packName = name;
      this.state.rows = [];
      this.enabled = new Set(this.configs.keys());
      for (const [id, r] of this.resources.attachables) {
        const d = descriptionOf(r);
        for (const [alias, gid] of Object.entries(d.geometry ?? {})) {
          const model = this.resources.geometries.get(gid);
          const row = { id, alias, key: id + "|" + alias, geometry: gid, configured: false, enabled: false, error: "" };
          if (!model?.bones?.length) row.error = t("missing_geometry", [gid]);
          else {
            try {
              validate(this.configs.get(row.key) ?? defaults(id, alias, model), model);
            } catch (e) {
              row.error = e.message;
            }
          }
          this.state.rows.push(row);
        }
      }
      for (const project of ModelProject.all) {
        const d = project.simple_trail;
        if (d?.config && d.packKey === this.packKey && this.state.rows.some((r) => r.key === d.key)) {
          this.configs.set(d.key, clone(d.config));
          this.resources.geometries.set(d.model.description.identifier, clone(d.model));
          if (!this.state.rows.some((r) => r.id === d.config.attachable && this.enabled.has(r.key))) this.enabled.add(d.key);
        }
      }
      this.refresh();
    }
    choosePack() {
      Blockbench.import({ type: t("pack"), extensions: ["mcpack", "zip", "mcaddon"], readtype: "buffer", resource_id: "simple_trail_pack" }, (files) => {
        if (files[0]) this.safe(async () => {
          await this.importFile(files[0]);
          browserDialog(this);
        });
      });
    }
    setEnabled(row, enabled) {
      if (row.error || !this.configs.has(row.key)) return;
      if (enabled) {
        for (const other of this.state.rows) if (other.id === row.id) this.enabled.delete(other.key);
        this.enabled.add(row.key);
      } else this.enabled.delete(row.key);
      for (const r of this.state.rows) r.enabled = this.enabled.has(r.key);
    }
    async openExample() {
      await this.importFile({ name: "Sword Trail.mcpack", content: sword_trail_default });
      await this.openRow(this.state.rows.find((r) => !r.error));
    }
    async openRow(row) {
      if (!row || row.error) return;
      this.state.busy = true;
      try {
        const existing = ModelProject.all.find((p) => p.simple_trail?.key === row.key && p.simple_trail.packKey === this.packKey);
        if (existing) {
          existing.select();
          Modes.options.trail.select();
          this.refresh();
          this.browser?.hide();
          return;
        }
        this.preview.disposeScene();
        this.gizmo.clear();
        const model = clone(this.resources.geometries.get(row.geometry)), record = this.resources.attachables.get(row.id), client = clone(descriptionOf(record));
        const config = validate(this.configs.get(row.key) ?? defaults(row.id, row.alias, model), model);
        newProject(Formats.bedrock);
        Project.name = row.id.replace(":", "_");
        Project.export_path = "trail://" + row.key;
        Codecs.bedrock.parse({ format_version: "1.16.0", "minecraft:geometry": [model] }, "");
        Project.export_path = "";
        Project.simple_trail = { packKey: this.packKey, key: row.key, client, model, config };
        this.configs.set(row.key, clone(config));
        this.setEnabled(row, true);
        const animations = Object.fromEntries(Object.values(client.animations ?? {}).filter((id) => this.resources.animations.has(id)).map((id) => [id, this.resources.animations.get(id)]));
        if (Object.keys(animations).length) (typeof AnimationCodec === "undefined" ? Animator : AnimationCodec.codecs.bedrock).loadFile({ path: "", json: { format_version: "1.10.0", animations } });
        const texPath = Object.values(client.textures ?? {}).find((p) => this.resources.files.has(p + ".png"));
        if (texPath) {
          const bytes = this.resources.files.get(texPath + ".png"), url = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(new Blob([bytes], { type: "image/png" }));
          });
          const texture = new Texture({ name: "texture.png", keep_size: true });
          await new Promise((resolve) => {
            texture.load_callback = resolve;
            texture.img.addEventListener("error", resolve, { once: true });
            texture.fromDataURL(url).add(false);
          });
          for (const cube of Cube.all) cube.applyTexture(texture, true);
        }
        Project.saved = false;
        Canvas.updateAll();
        Preview.selected?.loadAnglePreset?.({ position: [-32, 22, -40], target: [0, 11, 0], projection: "perspective" });
        Modes.options.trail.select();
        this.browser?.hide();
        this.refresh();
      } finally {
        this.state.busy = false;
      }
    }
    model() {
      return this.data?.model;
    }
    syncGeometry() {
      if (!this.data || Format?.id !== "bedrock") return;
      const model = Codecs.bedrock.compile({ raw: true, visible_box: false })["minecraft:geometry"][0];
      if (!model) return;
      const old = this.data.model;
      for (const b of model.bones) {
        const previous = old.bones.find((x) => x.name === b.name);
        if (previous) {
          for (const key of ["binding", "texture_meshes"]) if (b[key] === void 0 && previous[key] !== void 0) b[key] = clone(previous[key]);
        }
      }
      model.description = { ...old.description, ...model.description, identifier: old.description.identifier };
      this.data.model = model;
      if (this.resources && this.data.packKey === this.packKey) this.resources.geometries.set(model.description.identifier, clone(model));
    }
    refresh() {
      const d = this.data;
      this.state.configured = !!d;
      this.state.config = d ? clone(d.config) : null;
      this.state.bones = d ? d.model.bones.map((b) => b.name) : [];
      this.state.linked = !!d && this.packKey === d.packKey;
      this.state.error = "";
      if (d) {
        try {
          validate(d.config, d.model);
        } catch (e) {
          this.state.error = e.message;
        }
        if (this.state.linked) this.configs.set(d.key, clone(d.config));
      }
      for (const r of this.state.rows) {
        r.configured = this.configs.has(r.key);
        r.enabled = this.enabled.has(r.key);
      }
      this.state.running = this.preview.running;
      if (this.active() && !this.gizmo.drag) {
        this.preview.setup();
        this.gizmo.attach();
      }
      updateInterfacePanels();
    }
    select(key) {
      this.state.selected = key;
      this.gizmo.attach();
    }
    change(path, value) {
      this.safe(() => {
        const d = this.data;
        if (!d) return;
        const config = clone(d.config), parts = path.split(".");
        let node = config;
        for (const p of parts.slice(0, -1)) node = node[p];
        node[parts.at(-1)] = value;
        validate(config, d.model);
        const running = this.preview.running;
        Undo.initEdit({ trail: true });
        d.config = config;
        Undo.finishEdit(t("edit"));
        Project.saved = false;
        this.refresh();
        if (running) {
          this.preview.start();
          this.state.running = true;
        }
      });
    }
    setPointBone(key, bone) {
      this.change("points." + key, { bone, position: clone(this.data.model.bones.find((b) => b.name === bone)?.pivot ?? [0, 0, 0]) });
    }
    importConfig() {
      Blockbench.import({ type: t("config"), extensions: ["json"], readtype: "text" }, (files) => {
        if (!files[0]) return;
        this.safe(() => {
          const c = parseJson(files[0].content, files[0].name);
          if (c.attachable !== this.data.config.attachable || c.geometry !== this.data.config.geometry) throw new Error(t("config_target"));
          validate(c, this.model());
          Undo.initEdit({ trail: true });
          this.data.config = c;
          Undo.finishEdit(t("import_config"));
          Project.saved = false;
          this.refresh();
        });
      });
    }
    exportConfig() {
      if (!this.data) return;
      Blockbench.export({ type: t("config"), extensions: ["json"], name: this.data.config.attachable.replace(":", "_") + ".trail", content: JSON.stringify(this.data.config, null, 2) });
    }
    async export() {
      this.state.busy = true;
      try {
        if (!this.resources) throw new Error(t("import_first"));
        this.syncGeometry();
        this.refresh();
        const configs = [...this.configs].filter(([key]) => this.enabled.has(key)).map(([, c]) => c);
        if (!configs.length) throw new Error(t("no_config"));
        const bytes = await exportPack(this.resources, configs);
        Blockbench.export({ type: t("pack"), extensions: ["mcpack"], name: this.state.packName.replace(/\.(mcpack|mcaddon|zip)$/i, "") + " Trail", savetype: "zip", content: new Blob([bytes], { type: "application/zip" }) });
      } finally {
        this.state.busy = false;
      }
    }
    play() {
      if (this.preview.running) this.preview.pause();
      else this.preview.start();
      this.state.running = this.preview.running;
    }
    swing() {
      this.preview.swing();
      this.state.running = this.preview.running;
    }
    reset() {
      this.preview.reset();
      this.state.running = false;
      this.gizmo.attach();
    }
    enterMode() {
      this.refresh();
    }
    leaveMode() {
      this.gizmo.cancel();
      this.gizmo.clear();
      this.preview.disposeScene();
    }
    dispose() {
      this.leaveMode();
      this.gizmo.dispose();
      this.browser?.delete?.();
    }
  };

  // src/blockbench/fields.js
  var numericId = 0;
  var NumberInput = {
    props: ["value", "min", "max", "step", "axis", "label"],
    data() {
      return { draft: null };
    },
    mounted() {
      const vm = this;
      this.slider = new NumSlider("trail_value_" + ++numericId, {
        name: this.axis ? `${this.label} ${this.axis}` : this.label,
        private: true,
        color: this.axis?.toLowerCase(),
        settings: { min: this.min, max: this.max, default: Math.max(this.min ?? 0, 0) },
        getInterval(event = {}) {
          return (vm.step ?? 0.1) * (event.shiftKey ? 0.25 : 1) * (event.ctrlOrCmd ? 0.1 : 1);
        },
        get() {
          return vm.draft ?? vm.value ?? 0;
        },
        onBefore() {
          vm.start = vm.value ?? 0;
          vm.draft = vm.start;
        },
        change(modify) {
          const next = modify(vm.draft ?? vm.value ?? 0);
          if (!Number.isFinite(next)) return;
          vm.draft = Math.min(vm.max ?? Infinity, Math.max(vm.min ?? -Infinity, next));
          vm.$emit("preview", vm.draft);
        },
        onAfter() {
          const value = vm.draft;
          vm.draft = null;
          if (value !== null && value !== vm.start) vm.$emit("change", value);
          else vm.$emit("cancel");
          vm.$nextTick(() => vm.slider?.update());
        }
      });
      this.$el.append(this.slider.node);
      this.slider.update();
    },
    watch: {
      value() {
        this.slider?.update();
      },
      min(value) {
        if (this.slider) {
          this.slider.settings.min = value;
          this.slider.update();
        }
      },
      max(value) {
        if (this.slider) {
          this.slider.settings.max = value;
          this.slider.update();
        }
      }
    },
    beforeDestroy() {
      this.slider?.delete();
      this.slider = null;
    },
    template: `<div class="st-number-input"></div>`
  };
  var Field = {
    components: { "st-input": NumberInput },
    props: ["label", "value", "min", "max", "step", "tip"],
    template: `<div class="st-field" :title="tip"><span>{{ label }}</span><st-input :label="label" :value="value" :min="min" :max="max" :step="step" @preview="$emit('preview',$event)" @change="$emit('change',$event)" @cancel="$emit('cancel')"></st-input></div>`
  };
  var Vector = {
    components: { "st-input": NumberInput },
    props: ["label", "value", "min", "step", "reset", "resetTip", "note"],
    methods: { compose(i, n) {
      const v = [...this.value];
      v[i] = n;
      return v;
    } },
    template: `<div class="st-vector"><div class="st-vector-label"><span>{{ label }}</span><span v-if="note" class="st-tag">{{ note }}</span><i v-if="reset" class="material-icons st-reset" :title="resetTip" @click="$emit('reset')">replay</i></div>
    <div><st-input v-for="(axis,i) in ['X','Y','Z']" :key="axis" :axis="axis" :label="label" :value="value[i]" :min="min" :step="step" @preview="$emit('preview',compose(i,$event))" @change="$emit('change',compose(i,$event))" @cancel="$emit('cancel')"></st-input></div></div>`
  };

  // src/blockbench/curve.js
  var CurveEditor = {
    props: ["value", "maximum", "label"],
    data() {
      return { draft: null, active: 0 };
    },
    computed: { curve() {
      return this.draft ?? this.value;
    }, path() {
      return Array.from({ length: 81 }, (_, i) => `${i ? "L" : "M"}${12 + i / 80 * 216},${116 - curveValue(this.curve, i / 80) / this.maximum * 100}`).join(" ");
    } },
    methods: {
      t,
      x(p) {
        return 12 + p[0] * 216;
      },
      y(p) {
        return 116 - p[1] / this.maximum * 100;
      },
      coords(e) {
        const r = this.$refs.svg.getBoundingClientRect();
        return [Math.max(0, Math.min(1, ((e.clientX - r.left) / r.width * 240 - 12) / 216)), Math.max(0, Math.min(this.maximum, (116 - (e.clientY - r.top) / r.height * 140) / 100 * this.maximum))];
      },
      begin(e, index) {
        e.preventDefault();
        this.active = index;
        this.draft = clone(this.value);
        this.$refs.svg.setPointerCapture(e.pointerId);
      },
      move(e) {
        if (!this.draft) return;
        const p = this.coords(e), k = this.draft.keys, i = this.active;
        p[0] = i === 0 ? 0 : i === k.length - 1 ? 1 : Math.max(k[i - 1][0] + 0.01, Math.min(k[i + 1][0] - 0.01, p[0]));
        this.$set(k, i, p);
      },
      finish() {
        if (!this.draft) return;
        const result = this.draft;
        this.draft = null;
        this.$emit("change", result);
      },
      add(e) {
        if (this.value.keys.length >= 12) return;
        const p = this.coords(e);
        if (p[0] <= 0.01 || p[0] >= 0.99 || this.value.keys.some((k) => Math.abs(k[0] - p[0]) < 0.01)) return;
        const c = clone(this.value);
        c.keys.push(p);
        c.keys.sort((a, b) => a[0] - b[0]);
        this.$emit("change", c);
      },
      remove() {
        if (this.active <= 0 || this.active >= this.value.keys.length - 1) return;
        const c = clone(this.value);
        c.keys.splice(this.active, 1);
        this.active = 0;
        this.$emit("change", c);
      },
      key(e, i) {
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) return;
        e.preventDefault();
        this.active = i;
        if (e.key === "Delete") return this.remove();
        const c = clone(this.value), p = c.keys[i];
        if (e.key === "ArrowUp" || e.key === "ArrowDown") p[1] = Math.max(0, Math.min(this.maximum, p[1] + (e.key === "ArrowUp" ? 0.05 : -0.05)));
        else if (i > 0 && i < c.keys.length - 1) p[0] = Math.max(c.keys[i - 1][0] + 0.01, Math.min(c.keys[i + 1][0] - 0.01, p[0] + (e.key === "ArrowRight" ? 0.01 : -0.01)));
        this.$emit("change", c);
      }
    },
    template: `<div class="st-curve"><div>{{label}}</div><svg ref="svg" viewBox="0 0 240 140" role="img" :aria-label="label" @pointermove="move" @pointerup="finish" @pointercancel="draft=null" @dblclick="add"><path d="M12 16V116H228" class="st-axis"/><path :d="path" class="st-curve-line"/><circle v-for="(p,i) in curve.keys" :key="i" :cx="x(p)" :cy="y(p)" r="5" tabindex="0" role="slider" :aria-label="label+' '+i" :aria-valuenow="p[1]" :aria-valuemin="0" :aria-valuemax="maximum" @pointerdown="begin($event,i)" @keydown="key($event,i)"/><text x="12" y="134">0</text><text x="228" y="134" text-anchor="end">1</text></svg><p class="st-note">{{t('curve_help')}}</p><button @click="remove" :disabled="active===0||active>=value.keys.length-1">{{t('remove_key')}}</button></div>`
  };

  // src/blockbench/panels.js
  function createPanels(controller2) {
    const run = (method, ...args) => controller2.safe(() => controller2[method](...args));
    const structure = new Panel("trail_structure", {
      name: t("structure"),
      icon: "timeline",
      resizable: true,
      growable: true,
      condition: { modes: ["trail"] },
      default_position: { slot: "left_bar", float_position: [0, 0], float_size: [300, 400], height: 400 },
      component: {
        data: () => ({ s: controller2.state }),
        methods: { t, run, browser() {
          browserDialog(controller2);
        }, select(key) {
          controller2.select(key);
        }, helpers() {
          controller2.preview.updateMarkers();
        } },
        template: `<div class="st-structure"><div class="st-buttons"><button @click="browser">{{t('browser')}}</button><button @click="run('openExample')">Sword Trail</button></div><template v-if="s.configured"><h3 class="st-heading">{{s.config.attachable}}</h3><ul class="st-tree"><li v-for="key in ['a','b','root']" :key="key" class="st-row" :class="{selected:s.selected===key}" @click="select(key)"><i class="material-icons">{{key==='root'?'open_with':'adjust'}}</i>{{t('point_'+key)}}</li></ul><div class="st-buttons"><button @click="run('importConfig')">{{t('import_config')}}</button><button @click="run('exportConfig')">{{t('export_config')}}</button><button @click="run('export')" :disabled="!s.linked||s.busy">{{t('export_pack')}}</button></div><p class="st-note" v-if="!s.linked">{{t('reimport')}}</p><section class="st-preview-controls"><h4>{{t('preview')}}</h4><p class="st-note">{{t('preview_tip')}}</p><div class="st-buttons"><button @click="run('play')">{{s.running?t('pause'):t('play')}}</button><button @click="run('swing')">{{t('swing')}}</button><button @click="run('reset')">{{t('reset')}}</button></div><label class="st-check-row"><input type="checkbox" v-model="s.emit">{{t('preview_emit')}}</label><label class="st-check-row"><input type="checkbox" v-model="s.helpers" @change="helpers">{{t('helpers')}}</label><label class="st-check-row"><input type="checkbox" v-model="s.wireframe" @change="helpers">{{t('wireframe')}}</label></section></template><div v-else class="st-empty-state"><p>{{t('empty')}}</p><button @click="run('choosePack')">{{t('import_pack')}}</button></div></div>`
      }
    });
    const properties = new Panel("trail_properties", {
      name: t("properties"),
      icon: "tune",
      resizable: true,
      growable: true,
      condition: { modes: ["trail"], method: () => controller2.state.configured },
      default_position: { slot: "right_bar", float_position: [0, 0], float_size: [320, 650], height: 650 },
      component: {
        components: { "st-field": Field, "st-vector": Vector, "st-curve": CurveEditor },
        data: () => ({ s: controller2.state }),
        computed: { c() {
          return this.s.config;
        }, boneOptions() {
          return Object.fromEntries(this.s.bones.map((n) => [n, n]));
        }, segments() {
          return Math.ceil(this.c.lifetime / this.c.sampleInterval);
        } },
        methods: { t, set(path, v) {
          controller2.change(path, v);
        }, bone(key, v) {
          controller2.setPointBone(key, v);
        } },
        template: `<div class="st-properties"><template v-if="c"><p v-if="s.error" class="st-error">{{s.error}}</p><section><h4>{{t('points')}}</h4><template v-for="key in ['a','b']"><label class="st-field" :key="key"><span>{{t('point_'+key)}}</span><select-input :value="c.points[key].bone" :options="boneOptions" @input="bone(key,$event)"></select-input></label><st-vector :key="key+'_position'" :label="t('position')" :value="c.points[key].position" :step=".25" @change="set('points.'+key+'.position',$event)"></st-vector></template><label class="st-field"><span>{{t('reference_root')}}</span><select-input :value="c.root" :options="boneOptions" @input="set('root',$event)"></select-input></label></section>
        <section><h4>{{t('emission')}}</h4><label class="st-expression"><span>{{t('condition')}}</span><input class="dark_bordered focusable_input" :value="c.emitCondition" @change="set('emitCondition',$event.target.value)"></label><p class="st-note">{{t('condition_tip')}}</p><st-field :label="t('lifetime')" :value="c.lifetime" :min=".025" :max="2" :step=".025" @change="set('lifetime',$event)"></st-field><st-field :label="t('interval')" :value="c.sampleInterval" :min=".008" :max=".1" :step=".005" @change="set('sampleInterval',$event)"></st-field><p class="st-note">{{t('cost',[segments,segments*2,c.opacity.keys.some(k=>k[1]!==c.opacity.keys[0][1])?segments:1])}}</p></section>
        <section><st-curve :label="t('width_curve')" :value="c.width" :maximum="2" @change="set('width',$event)"></st-curve><st-field :label="t('exponent')" :value="c.width.exponent" :min=".1" :max="8" @change="set('width.exponent',$event)"></st-field><st-field :label="t('anchor')" :value="c.width.anchor" :min="0" :max="1" @change="set('width.anchor',$event)"></st-field><p class="st-note">{{t('anchor_tip')}}</p></section>
        <section><st-curve :label="t('alpha_curve')" :value="c.opacity" :maximum="1" @change="set('opacity',$event)"></st-curve><st-field :label="t('exponent')" :value="c.opacity.exponent" :min=".1" :max="8" @change="set('opacity.exponent',$event)"></st-field><st-field :label="t('opacity')" :value="c.opacity.value" :min="0" :max="1" @change="set('opacity.value',$event)"></st-field><label class="st-field"><span>{{t('color')}}</span><input type="color" :value="c.color" @change="set('color',$event.target.value)"></label><label class="st-field"><span>{{t('blend')}}</span><select-input :value="c.blend" :options="{additive:t('additive'),alpha:t('alpha')}" @input="set('blend',$event)"></select-input></label><label class="st-check-row"><input type="checkbox" :checked="c.unlit" @change="set('unlit',$event.target.checked)">{{t('unlit')}}</label></section>
        <details><summary>{{t('advanced')}}</summary><label class="st-field"><span>{{t('fp_space')}}</span><select-input :value="c.firstPersonSpace" :options="{view_model:t('view_model'),world:t('world')}" @input="set('firstPersonSpace',$event)"></select-input></label><st-field :label="t('world_scale')" :value="c.worldScale" :min=".01" :max="10" :step=".01" @change="set('worldScale',$event)"></st-field><st-field :label="t('teleport')" :value="c.teleportDistance" :min=".1" :max="128" @change="set('teleportDistance',$event)"></st-field><label class="st-expression"><span>{{t('texture')}}</span><input class="dark_bordered focusable_input" :value="c.texture" @change="set('texture',$event.target.value)"></label><p class="st-note">{{t('texture_tip')}}</p></details></template></div>`
      }
    });
    return [structure, properties];
  }
  var extraStyles = `.st-preview-controls{padding:10px}.st-curve svg{width:100%;display:block;touch-action:none}.st-curve .st-axis{fill:none;stroke:var(--color-border)}.st-curve .st-curve-line{fill:none;stroke:var(--color-accent);stroke-width:2}.st-curve circle{fill:var(--color-accent);cursor:move}.st-curve text{fill:var(--color-subtle_text);font-size:11px}.st-curve circle:focus{outline:2px solid var(--color-text)}.st-properties details{margin-top:12px}.st-properties input[type=color]{width:100%;height:26px}.st-browser-bar{flex-wrap:wrap}`;

  // src/blockbench/styles.js
  var styles = `
#panel_trail_structure,#panel_trail_properties {overflow-y:auto;overflow-x:hidden;min-height:0;}
#panel_trail_structure>.panel_vue_wrapper,#panel_trail_properties>.panel_vue_wrapper {flex:0 0 auto;overflow:visible;}
.st-structure {padding:0 0 6px;}
.st-tree {list-style:none;margin:0;padding:2px 0;}
.st-row {display:flex;align-items:center;gap:4px;min-height:28px;padding:0 6px;cursor:pointer;color:var(--color-text);}
.st-row:hover {background:var(--color-button);}
.st-row.selected {background:var(--color-selected);}
.st-empty-state {padding:12px;display:flex;flex-direction:column;gap:8px;color:var(--color-subtle_text);white-space:normal;}
.st-properties {padding:4px 10px 10px;}
.st-properties section {margin:10px 0;padding-top:6px;border-top:1px solid var(--color-border);}
.st-properties h4 {margin:0 0 4px;font-size:1em;color:var(--color-subtle_text);font-weight:normal;}
.st-heading {margin:4px 6px 8px;font-size:1.1em;font-weight:normal;overflow-wrap:anywhere;}
.st-field {display:grid;grid-template-columns:minmax(70px,42%) minmax(0,1fr);align-items:center;gap:8px;margin:5px 0;min-height:24px;}
.st-field>.bb-select {min-width:0;width:100%;height:24px;line-height:24px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.st-vector {margin:8px 0;}
.st-vector-label {display:flex;align-items:center;gap:6px;margin-bottom:2px;color:var(--color-subtle_text);}
.st-vector>div:last-child {display:flex;gap:4px;}
.st-tag {font-size:.85em;padding:0 5px;border-radius:3px;background:var(--color-back);}
.st-reset {margin-left:auto;font-size:16px;cursor:pointer;}
.st-reset:hover {color:var(--color-light);}
.st-number-input {display:flex;flex:1;min-width:0;}
.st-number-input .nslide_tool {width:100%;min-width:0;margin:0;height:24px;}
.st-number-input .nslide {width:100%;min-width:0;height:24px;line-height:24px;text-align:center;}
.st-expression {display:block;margin:6px 0;}
.st-expression input {display:block;width:100%;margin-top:3px;}
.st-note {margin:4px 0;color:var(--color-subtle_text);white-space:normal;font-size:.92em;}
.st-error {margin:6px 8px;color:var(--color-error);white-space:normal;}
.st-buttons {display:flex;flex-wrap:wrap;gap:4px;margin:10px 6px 0;}
.st-check-row {display:flex;align-items:center;gap:6px;margin:3px 0;cursor:pointer;}
.st-properties details summary {cursor:pointer;color:var(--color-subtle_text);margin:6px 0 2px;}
.st-grow {flex:1;min-width:0;overflow-wrap:anywhere;}
.st-ellipsis {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.st-browser {display:flex;flex-direction:column;gap:6px;}
.st-browser-bar {display:flex;align-items:center;gap:6px;}
.st-entity-list {list-style:none;margin:0;padding:0;max-height:48vh;min-height:120px;overflow:auto;border:1px solid var(--color-border);background:var(--color-back);}
.st-entity-list li {display:flex;align-items:center;gap:8px;padding:4px 8px;cursor:default;}
.st-entity-list li:hover {background:var(--color-button);}
.st-entity-list li.selected {background:var(--color-selected);}
.st-entity-list li.st-unavailable {opacity:.55;}
`;

  // src/blockbench/interface.js
  function registerInterface(c) {
    const items = [], mode = new Mode("trail", { name: t("mode"), icon: "timeline", default_tool: "trail_move_tool", selectElements: false, condition: () => Format?.id === "bedrock", onSelect: () => c.enterMode(), onUnselect: () => c.leaveMode() });
    Modes.vue?.$forceUpdate();
    for (const [name, key, icon] of [["move", "v", "icon-gizmo"], ["rotate", "r", "sync"]]) {
      const id = "trail_" + name + "_tool";
      while (Toolbars.tools.children.some((x) => x.id === id)) Toolbars.tools.remove(id);
      const item = new Tool(id, { name: t(name), icon, category: "tools", modes: ["trail"], selectElements: false, transformerMode: "hidden", keybind: new Keybind({ key }), onSelect() {
        c.state.tool = name;
        c.gizmo.attach();
      } });
      items.push(item);
      Toolbars.tools.add(item);
    }
    const action = (id, name, icon, fn, menu, extra = {}) => {
      const item = new Action(id, { name: t(name), icon, category: "file", click: () => c.safe(fn), ...extra });
      items.push(item);
      if (menu) MenuBar.addAction(item, menu);
    };
    action("trail_import_pack", "import_pack", "file_upload", () => c.choosePack(), "file.import");
    action("trail_export_pack", "export_pack", "file_download", () => c.export(), "file.export");
    action("trail_browser", "browser", "inventory_2", () => browserDialog(c), "tools");
    action("trail_example", "example", "sports_martial_arts", () => c.openExample(), "tools");
    action("trail_play", "play", "play_arrow", () => c.play(), null, { keybind: new Keybind({ key: 32 }), condition: { modes: ["trail"], method: () => c.state.configured } });
    const panels = createPanels(c), css = Blockbench.addCSS(styles + extraStyles);
    return () => {
      if (Modes.selected?.id === "trail") Modes.options.edit.select();
      for (const item of items) {
        Toolbars.tools.remove(item);
        item.delete();
      }
      for (const p of panels) {
        p.vue?.$destroy();
        p.delete();
      }
      css.delete();
      mode.delete();
      const i = Keybinds.actions.indexOf(mode);
      if (i >= 0) Keybinds.actions.splice(i, 1);
      Modes.vue?.$forceUpdate();
      updateInterfacePanels();
    };
  }

  // src/index.js
  var controller;
  var property;
  var disposeInterface;
  var listeners = [];
  var on = (event, listener, target = Blockbench) => {
    target.on(event, listener);
    listeners.push([target, event, listener]);
  };
  registerTranslations();
  Plugin.register("simple_trail", {
    title: "Simple Trail",
    author: "MCSCPCB",
    description: t("description"),
    icon: "timeline",
    version: "0.1.0",
    min_version: "4.12.0",
    variant: "both",
    tags: ["Minecraft: Bedrock Edition", "Animation"],
    onload() {
      property = new Property(ModelProject, "object", "simple_trail", { default: {}, exposed: false, merge(project, data) {
        if (data.simple_trail?.config) project.simple_trail = clone(data.simple_trail);
      } });
      controller = new Controller();
      disposeInterface = registerInterface(controller);
      on("select_project", () => controller.refresh());
      on("select_no_project", () => controller.refresh());
      on("unselect_project", () => controller.leaveMode());
      on("finished_edit", () => controller.safe(() => {
        controller.syncGeometry();
        controller.refresh();
      }));
      on("create_undo_save", ({ save, aspects }) => {
        if (aspects.trail) save.trail = clone(Project.simple_trail ?? {});
      });
      on("load_undo_save", ({ save }) => {
        if (save.trail) {
          controller.leaveMode();
          Project.simple_trail = clone(save.trail);
          controller.refresh();
        }
      });
      on("save_project", ({ model }) => {
        if (Project.simple_trail?.config) {
          controller.syncGeometry();
          model.simple_trail = clone(Project.simple_trail);
        }
      });
      on("parsed", () => controller.refresh(), Codecs.project);
      controller.refresh();
    },
    onunload() {
      for (const [target, event, fn] of listeners.splice(0)) target.removeListener(event, fn);
      disposeInterface?.();
      controller?.dispose();
      property?.delete();
    }
  });
})();
/* Three.js TransformControls
The MIT License

Copyright © 2010-2021 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* JSZip
JSZip is dual licensed. At your choice you may use it under the MIT license *or* the GPLv3
license.

The MIT License
===============

Copyright (c) 2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger, António Afonso

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


*/
/* Pako
(The MIT License)

Copyright (C) 2014-2017 by Vitaly Puzrin and Andrei Tuputcyn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
