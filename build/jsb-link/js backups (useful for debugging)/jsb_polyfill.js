(function() {
function t(t) {
return t && t.toString && "[object CallbackConstructor]" === t.toString() ? "function" : "object";
}
(function(i, n, r) {
function o(r, c) {
var a = n[r];
if (!a) {
var u = i[r];
if (!u) {
var l = "function" == ("object" == (e = typeof require) ? t(require) : e) && require;
if (!c && l) return l(r, !0);
if (s) return s(r, !0);
var h = new Error("Cannot find module '" + r + "'");
h.code = "MODULE_NOT_FOUND";
throw h;
}
var f = {};
a = n[r] = {
exports: f
};
u[0]((function(t) {
return o(u[1][t] || t);
}), a, f);
}
return a.exports;
}
for (var s = "function" == ("object" == (e = typeof require) ? t(require) : e) && require, c = 0; c < r.length; c++) o(r[c]);
})({
1: [ (function(t, e, i) {}), {} ],
2: [ (function(t, e, i) {
function n(t, e) {
return function(i) {
"use strict";
if (1 !== arguments.length) {
var n = "";
2 === arguments.length ? n = "Arguments: " + arguments[1] : arguments.length > 2 && (n = "Arguments: " + cc.js.shiftArguments.apply(null, arguments).join(", "));
t(e + " " + i + ", please go to " + o + "#" + i + " to see details. " + n);
} else t(e + " " + i + ", please go to " + o + "#" + i + " to see details.");
};
}
var r = t("./cocos2d/core/platform/CCEnum");
cc.DebugMode = r({
NONE: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
INFO_FOR_WEB_PAGE: 4,
WARN_FOR_WEB_PAGE: 5,
ERROR_FOR_WEB_PAGE: 6
});
cc._initDebugSetting = function(t) {
cc.log = cc.logID = cc.warn = cc.warnID = cc.error = cc.errorID = cc.assert = cc.assertID = function() {};
if (t !== cc.DebugMode.NONE) {
if (console && console.log.apply) {
console.error || (console.error = console.log);
console.warn || (console.warn = console.log);
console.error.bind ? cc.error = console.error.bind(console) : cc.error = console.error;
cc.assert = function(t, e) {
if (!t) {
e && (e = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments)));
0;
throw new Error(e);
}
};
}
t !== cc.DebugMode.ERROR && (console.warn.bind ? cc.warn = console.warn.bind(console) : cc.warn = console.warn);
if (t === cc.DebugMode.INFO) {
"JavaScriptCore" === scriptEngineType ? cc.log = function() {
return console.log.apply(console, arguments);
} : cc.log = console.log;
cc.info = "JavaScriptCore" === scriptEngineType ? function() {
(console.info || console.log).apply(console, arguments);
} : console.info || console.log;
}
cc.warnID = n(cc.warn, "Warning");
cc.errorID = n(cc.error, "Error");
cc.logID = n(cc.log, "Log");
var e = n((function() {
for (var t = [ !1 ], e = 0; e < arguments.length; ++e) t.push(arguments[e]);
cc.assert.apply(null, t);
}), "Assert");
cc.assertID = function(t) {
"use strict";
t || e.apply(null, cc.js.shiftArguments.apply(null, arguments));
};
}
};
cc._throw = function(t) {
var e = t.stack;
e ? cc.error(t + "\n" + e) : cc.error(t);
};
var o = "https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md";
}), {
"./cocos2d/core/platform/CCEnum": 80
} ],
3: [ (function(t, e, i) {}), {} ],
4: [ (function(i, n, r) {
function o(t, e) {
a.call(this);
this.target = t;
this.animation = e;
this._anims = new c.array.MutableForwardIterator([]);
}
function s(i, n) {
function r(t) {
if (!Array.isArray(t)) return !1;
for (var e = 0, i = t.length; e < i; e++) {
var n = t[e];
if (!Array.isArray(n) || 6 !== n.length) return !1;
}
return !0;
}
function o(i, o, s) {
var a = i instanceof cc.Node && "position" === o, f = [], d = new u();
d.target = i;
var _, g = o.indexOf(".");
-1 !== g ? i[_ = o.slice(0, g)] : _ = o;
d.prop = _;
d.subProps = (function(t) {
var e = t.split(".");
e.shift();
return e.length > 0 ? e : null;
})(o);
for (var v = 0, m = s.length; v < m; v++) {
var y = s[v], C = y.frame / n.duration;
d.ratios.push(C);
if (a) {
var E = y.motionPath;
if (E && !r(E)) {
cc.errorID(3904, i.name, o, v);
E = null;
}
f.push(E);
}
var b = y.value;
d.values.push(b);
var T = y.curve;
if (T) {
if ("string" === ("object" == (e = typeof T) ? t(T) : e)) {
d.types.push(T);
continue;
}
if (Array.isArray(T)) {
T[0] === T[1] && T[2] === T[3] ? d.types.push(u.Linear) : d.types.push(u.Bezier(T));
continue;
}
}
d.types.push(u.Linear);
}
a && h(f, d, c.duration, c.sample);
for (var S, A, O = d.ratios, I = !0, x = 1, N = O.length; x < N; x++) {
S = O[x] - O[x - 1];
if (1 === x) A = S; else if (Math.abs(S - A) > 1e-6) {
I = !1;
break;
}
}
d._findFrameIndex = I ? l : p;
return d;
}
function s(t, e) {
var i = e.props, n = e.comps;
if (i) for (var r in i) {
var s = o(t, r, i[r]);
a.push(s);
}
if (n) for (var c in n) {
var u = t.getComponent(c);
if (u) {
var l = n[c];
for (var r in l) {
s = o(u, r, l[r]);
a.push(s);
}
}
}
}
var c = n.clip, a = n.curves;
a.length = 0;
n.duration = c.duration;
n.speed = c.speed;
n.wrapMode = c.wrapMode;
n.frameRate = c.sample;
(n.wrapMode & _.Loop) === _.Loop ? n.repeatCount = Infinity : n.repeatCount = 1;
var g = c.curveData, v = g.paths;
s(i, g);
for (var m in v) {
var y = cc.find(m, i);
if (y) {
s(y, v[m]);
}
}
var C = c.events;
if (C) for (var E, b = 0, T = C.length; b < T; b++) {
if (!E) {
(E = new f()).target = i;
a.push(E);
}
var S, A = C[b], O = A.frame / n.duration, I = p(E.ratios, O);
if (I >= 0) S = E.events[I]; else {
S = new d();
E.ratios.push(O);
E.events.push(S);
}
S.add(A.func, A.params);
}
}
var c = cc.js, a = i("./playable"), u = i("./animation-curves").DynamicAnimCurve, l = i("./animation-curves").quickFindIndex, h = i("./motion-path-helper").sampleMotionPaths, f = i("./animation-curves").EventAnimCurve, d = i("./animation-curves").EventInfo, _ = i("./types").WrapModeMask, p = i("../core/utils/binary-search").binarySearchEpsilon;
c.extend(o, a);
var g = o.prototype;
g.playState = function(i, n) {
if (i.clip) {
i.curveLoaded || s(this.target, i);
i.animator = this;
i.play();
"number" === ("object" == (e = typeof n) ? t(n) : e) && i.setTime(n);
this.play();
}
};
g.stopStatesExcept = function(t) {
var e = this._anims, i = e.array;
for (e.i = 0; e.i < i.length; ++e.i) {
var n = i[e.i];
n !== t && this.stopState(n);
}
};
g.addAnimation = function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
t._setListeners(this.animation);
};
g.removeAnimation = function(t) {
var e = this._anims.array.indexOf(t);
if (e >= 0) {
this._anims.fastRemoveAt(e);
0 === this._anims.array.length && this.stop();
} else cc.errorID(3908);
t.animator = null;
};
g.sample = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].sample();
}
};
g.stopState = function(t) {
t && t.stop();
};
g.pauseState = function(t) {
t && t.pause();
};
g.resumeState = function(t) {
t && t.resume();
this.isPaused && this.resume();
};
g.setStateTime = function(t, e) {
if (void 0 !== e) {
if (t) {
t.setTime(e);
t.sample();
}
} else {
e = t;
for (var i = this._anims.array, n = 0; n < i.length; ++n) {
var r = i[n];
r.setTime(e);
r.sample();
}
}
};
g.onStop = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].stop();
}
};
g.onPause = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.pause();
i.animator = null;
}
};
g.onResume = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.animator = this;
i.resume();
}
};
g._reloadClip = function(t) {
s(this.target, t);
};
0;
0;
n.exports = o;
}), {
"../core/utils/binary-search": 100,
"./animation-curves": 6,
"./motion-path-helper": 12,
"./playable": 13,
"./types": 14
} ],
5: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AnimationClip",
extends: cc.Asset,
properties: {
_duration: {
default: 0,
type: "Float"
},
duration: {
get: function() {
return this._duration;
}
},
sample: {
default: 60
},
speed: {
default: 1
},
wrapMode: {
default: cc.WrapMode.Normal
},
curveData: {
default: {},
visible: !1
},
events: {
default: [],
visible: !1
}
},
statics: {
createWithSpriteFrames: function(t, e) {
if (!Array.isArray(t)) {
cc.errorID(3905);
return null;
}
var i = new n();
i.sample = e || i.sample;
i._duration = t.length / i.sample;
for (var r = [], o = 1 / i.sample, s = 0, c = t.length; s < c; s++) r[s] = {
frame: s * o,
value: t[s]
};
i.curveData = {
comps: {
"cc.Sprite": {
spriteFrame: r
}
}
};
return i;
}
}
});
cc.AnimationClip = e.exports = n;
}), {} ],
6: [ (function(i, n, r) {
function o(i, n) {
if ("string" === ("object" == (e = typeof n) ? t(n) : e)) {
var r = cc.Easing[n];
r ? i = r(i) : cc.errorID(3906, n);
} else Array.isArray(n) && (i = s(n, i));
return i;
}
var s = i("./bezier").bezierByTime, c = i("../core/utils/binary-search").binarySearchEpsilon, a = i("./types").WrapModeMask, u = i("./types").WrappedInfo, l = cc.Class({
name: "cc.AnimCurve",
sample: function(t, e, i) {},
onTimeChangedManually: void 0
}), h = cc.Class({
name: "cc.DynamicAnimCurve",
extends: l,
properties: {
target: null,
prop: "",
values: [],
ratios: [],
types: [],
subProps: null
},
_findFrameIndex: c,
sample: function(i, n, r) {
var s = this.values, c = this.ratios, a = c.length;
if (0 !== a) {
var u, l = this._findFrameIndex(c, n);
if (l < 0) if ((l = ~l) <= 0) u = s[0]; else if (l >= a) u = s[a - 1]; else {
var h = s[l - 1], f = "number" === ("object" == (e = typeof h) ? t(h) : e), d = h && h.lerp;
if (f || d) {
var _ = c[l - 1], p = c[l], g = this.types[l - 1], v = (n - _) / (p - _);
g && (v = o(v, g));
var m = s[l];
f ? u = h + (m - h) * v : d && (u = h.lerp(m, v));
} else u = h;
} else u = s[l];
var y = this.subProps;
if (y) {
for (var C = this.target[this.prop], E = C, b = 0; b < y.length - 1; b++) {
var T = y[b];
if (!E) return;
E = E[T];
}
var S = y[y.length - 1];
if (!E) return;
E[S] = u;
u = C;
}
this.target[this.prop] = u;
}
}
});
h.Linear = null;
h.Bezier = function(t) {
return t;
};
var f = function() {
this.events = [];
};
f.prototype.add = function(t, e) {
this.events.push({
func: t || "",
params: e || []
});
};
var d = cc.Class({
name: "cc.EventAnimCurve",
extends: l,
properties: {
target: null,
ratios: [],
events: [],
_wrappedInfo: {
default: function() {
return new u();
}
},
_lastWrappedInfo: null,
_ignoreIndex: NaN
},
_wrapIterations: function(t) {
t - (0 | t) == 0 && (t -= 1);
return 0 | t;
},
sample: function(t, e, i) {
var n = this.ratios.length, r = i.getWrappedInfo(i.time, this._wrappedInfo), o = r.direction, s = c(this.ratios, r.ratio);
if (s < 0) {
s = ~s - 1;
o < 0 && (s += 1);
}
this._ignoreIndex !== s && (this._ignoreIndex = NaN);
r.frameIndex = s;
if (this._lastWrappedInfo) {
var l = i.wrapMode, h = this._wrapIterations(r.iterations), f = this._lastWrappedInfo, d = this._wrapIterations(f.iterations), _ = f.frameIndex, p = f.direction, g = -1 !== d && h !== d;
if (_ === s && g && 1 === n) this._fireEvent(0); else if (_ !== s || g) {
o = p;
do {
if (_ !== s) {
if (-1 === o && 0 === _ && s > 0) {
(l & a.PingPong) === a.PingPong ? o *= -1 : _ = n;
d++;
} else if (1 === o && _ === n - 1 && s < n - 1) {
(l & a.PingPong) === a.PingPong ? o *= -1 : _ = -1;
d++;
}
if (_ === s) break;
if (d > h) break;
}
_ += o;
cc.director.getAnimationManager().pushDelayEvent(this, "_fireEvent", [ _ ]);
} while (_ !== s && _ > -1 && _ < n);
}
this._lastWrappedInfo.set(r);
} else {
this._fireEvent(s);
this._lastWrappedInfo = new u(r);
}
},
_fireEvent: function(t) {
if (!(t < 0 || t >= this.events.length || this._ignoreIndex === t)) {
var e = this.events[t].events;
if (this.target.isValid) for (var i = this.target._components, n = 0; n < e.length; n++) for (var r = e[n], o = r.func, s = 0; s < i.length; s++) {
var c = i[s], a = c[o];
a && a.apply(c, r.params);
}
}
},
onTimeChangedManually: function(t, e) {
this._lastWrappedInfo = null;
this._ignoreIndex = NaN;
var i = e.getWrappedInfo(t, this._wrappedInfo), n = i.direction, r = c(this.ratios, i.ratio);
if (r < 0) {
r = ~r - 1;
n < 0 && (r += 1);
this._ignoreIndex = r;
}
}
});
0;
n.exports = {
AnimCurve: l,
DynamicAnimCurve: h,
EventAnimCurve: d,
EventInfo: f,
computeRatioByType: o,
quickFindIndex: function(t, e) {
var i = t.length - 1;
if (0 === i) return 0;
var n = t[0];
if (e < n) return 0;
var r = t[i];
if (e > r) return i;
var o = (e = (e - n) / (r - n)) / (1 / i), s = 0 | o;
return o - s < 1e-6 ? s : ~(s + 1);
}
};
}), {
"../core/utils/binary-search": 100,
"./bezier": 9,
"./types": 14
} ],
7: [ (function(t, e, n) {
var r = cc.js, o = cc.Class({
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._anims = new r.array.MutableForwardIterator([]);
this._delayEvents = [];
},
update: function(t) {
var e = this._anims, n = e.array;
for (e.i = 0; e.i < n.length; ++e.i) {
var r = n[e.i];
r._isPlaying && !r._isPaused && r.update(t);
}
var o = this._delayEvents;
for (i = 0, l = o.length; i < l; i++) {
var s = o[i];
s.target[s.func].apply(s.target, s.args);
}
o.length = 0;
},
destruct: function() {},
addAnimation: function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
},
removeAnimation: function(t) {
var e = this._anims.array.indexOf(t);
e >= 0 ? this._anims.fastRemoveAt(e) : cc.errorID(3907);
},
pushDelayEvent: function(t, e, i) {
this._delayEvents.push({
target: t,
func: e,
args: i
});
}
});
cc.AnimationManager = e.exports = o;
}), {} ],
8: [ (function(t, e, i) {
function n(t, e) {
c.call(this);
cc.EventTarget.call(this);
this._currentFramePlayed = !1;
this._delay = 0;
this._delayTime = 0;
this._wrappedInfo = new u();
this._lastWrappedInfo = null;
this._process = r;
this._clip = t;
this._name = e || t && t.name;
this.animator = null;
this.curves = [];
this.delay = 0;
this.repeatCount = 1;
this.duration = 1;
this.speed = 1;
this.wrapMode = l.Normal;
this.time = 0;
this._emit = this.emit;
this.emit = function() {
for (var t = new Array(arguments.length), e = 0, i = t.length; e < i; e++) t[e] = arguments[e];
cc.director.getAnimationManager().pushDelayEvent(this, "_emit", t);
};
}
function r() {
var t = this.sample(), e = this._hasListenerCache;
if (e && e.lastframe) {
var i;
i = this._lastWrappedInfo ? this._lastWrappedInfo : this._lastWrappedInfo = new u(t);
this.repeatCount > 1 && (0 | t.iterations) > (0 | i.iterations) && this.emit("lastframe", this);
i.set(t);
}
if (t.stopped) {
this.stop();
this.emit("finished", this);
}
}
function o() {
var t = this.time, e = this.duration;
t > e ? 0 === (t %= e) && (t = e) : t < 0 && 0 !== (t %= e) && (t += e);
for (var i = t / e, n = this.curves, r = 0, o = n.length; r < o; r++) {
n[r].sample(t, i, this);
}
var s = this._hasListenerCache;
if (s && s.lastframe) {
void 0 === this._lastIterations && (this._lastIterations = i);
(this.time > 0 && this._lastIterations > i || this.time < 0 && this._lastIterations < i) && this.emit("lastframe", this);
this._lastIterations = i;
}
}
var s = cc.js, c = t("./playable"), a = t("./types"), u = a.WrappedInfo, l = a.WrapMode, h = a.WrapModeMask;
s.extend(n, c);
var f = n.prototype;
cc.js.mixin(f, cc.EventTarget.prototype);
f._setListeners = function(t) {
this._capturingListeners = t ? t._capturingListeners : null;
this._bubblingListeners = t ? t._bubblingListeners : null;
this._hasListenerCache = t ? t._hasListenerCache : null;
};
f.onPlay = function() {
this.setTime(0);
this._delayTime = this._delay;
cc.director.getAnimationManager().addAnimation(this);
this.animator && this.animator.addAnimation(this);
this.emit("play", this);
};
f.onStop = function() {
this.isPaused || cc.director.getAnimationManager().removeAnimation(this);
this.animator && this.animator.removeAnimation(this);
this.emit("stop", this);
};
f.onResume = function() {
cc.director.getAnimationManager().addAnimation(this);
this.emit("resume", this);
};
f.onPause = function() {
cc.director.getAnimationManager().removeAnimation(this);
this.emit("pause", this);
};
f.setTime = function(t) {
this._currentFramePlayed = !1;
this.time = t || 0;
for (var e = this.curves, i = 0, n = e.length; i < n; i++) {
var r = e[i];
r.onTimeChangedManually && r.onTimeChangedManually(t, this);
}
};
f.update = function(t) {
if (this._delayTime > 0) {
this._delayTime -= t;
if (this._delayTime > 0) return;
}
this._currentFramePlayed ? this.time += t * this.speed : this._currentFramePlayed = !0;
this._process();
};
f._needRevers = function(t) {
var e = this.wrapMode, i = !1;
if ((e & h.PingPong) === h.PingPong) {
t - (0 | t) == 0 && t > 0 && (t -= 1);
1 & t && (i = !i);
}
(e & h.Reverse) === h.Reverse && (i = !i);
return i;
};
f.getWrappedInfo = function(t, e) {
e = e || new u();
var i = !1, n = this.duration, r = this.repeatCount, o = t > 0 ? t / n : -t / n;
if (o >= r) {
o = r;
i = !0;
var s = r - (0 | r);
0 === s && (s = 1);
t = s * n * (t > 0 ? 1 : -1);
}
if (t > n) {
var c = t % n;
t = 0 === c ? n : c;
} else t < 0 && 0 !== (t %= n) && (t += n);
var a = !1, l = this._wrapMode & h.ShouldWrap;
l && (a = this._needRevers(o));
var f = a ? -1 : 1;
this.speed < 0 && (f *= -1);
l && a && (t = n - t);
e.ratio = t / n;
e.time = t;
e.direction = f;
e.stopped = i;
e.iterations = o;
return e;
};
f.sample = function() {
for (var t = this.getWrappedInfo(this.time, this._wrappedInfo), e = this.curves, i = 0, n = e.length; i < n; i++) {
e[i].sample(t.time, t.ratio, this);
}
return t;
};
s.get(f, "clip", (function() {
return this._clip;
}));
s.get(f, "name", (function() {
return this._name;
}));
s.obsolete(f, "AnimationState.length", "duration");
s.getset(f, "curveLoaded", (function() {
return this.curves.length > 0;
}), (function() {
this.curves.length = 0;
}));
s.getset(f, "wrapMode", (function() {
return this._wrapMode;
}), (function(t) {
this._wrapMode = t;
0;
this.time = 0;
t & h.Loop ? this.repeatCount = Infinity : this.repeatCount = 1;
}));
s.getset(f, "repeatCount", (function() {
return this._repeatCount;
}), (function(t) {
this._repeatCount = t;
var e = this._wrapMode & h.ShouldWrap, i = (this.wrapMode & h.Reverse) === h.Reverse;
this._process = Infinity !== t || e || i ? r : o;
}));
s.getset(f, "delay", (function() {
return this._delay;
}), (function(t) {
this._delayTime = this._delay = t;
}));
cc.AnimationState = e.exports = n;
}), {
"./playable": 13,
"./types": 14
} ],
9: [ (function(t, e, i) {
function n(t, e, i, n, r) {
var o = 1 - r;
return t * o * o * o + 3 * e * o * o * r + 3 * i * o * r * r + n * r * r * r;
}
function r(t) {
return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
}
function o(t, e) {
var i = (function(t, e) {
var i, n, o, h, f = e - 0, d = e - t[0], _ = 3 * f, p = 3 * d, g = 3 * (e - t[2]), v = 1 / (-f + p - g + (e - 1)), m = (_ - 6 * d + g) * v, y = m * (1 / 3), C = (-_ + p) * v, E = 1 / 3 * (3 * C - m * m), b = E * (1 / 3), T = (2 * m * m * m - 9 * m * C + f * v * 27) / 27, S = T / 2, A = S * S + b * b * b;
if (A < 0) {
var O = 1 / 3 * -E, I = l(O * O * O), x = -T / (2 * I), N = c(x < -1 ? -1 : x > 1 ? 1 : x), w = 2 * r(I);
n = w * s(N * (1 / 3)) - y;
o = w * s((N + u) * (1 / 3)) - y;
h = w * s((N + 2 * u) * (1 / 3)) - y;
return 0 <= n && n <= 1 ? 0 <= o && o <= 1 ? 0 <= h && h <= 1 ? a(n, o, h) : a(n, o) : 0 <= h && h <= 1 ? a(n, h) : n : 0 <= o && o <= 1 ? 0 <= h && h <= 1 ? a(o, h) : o : h;
}
if (0 === A) {
o = -(i = S < 0 ? r(-S) : -r(S)) - y;
return 0 <= (n = 2 * i - y) && n <= 1 ? 0 <= o && o <= 1 ? a(n, o) : n : o;
}
var R = l(A);
return n = (i = r(-S + R)) - r(S + R) - y;
})(t, e), n = 1 - i;
return 0 * n * n * n + 3 * t[1] * i * n * n + 3 * t[3] * i * i * n + 1 * i * i * i;
}
var s = Math.cos, c = Math.acos, a = Math.max, u = 2 * Math.PI, l = Math.sqrt;
0;
e.exports = {
bezier: n,
bezierByTime: o
};
}), {} ],
10: [ (function(t, e, i) {
function n(t, e) {
return function(i) {
return i < .5 ? e(2 * i) / 2 : t(2 * i - 1) / 2 + .5;
};
}
var r = {
constant: function() {
return 0;
},
linear: function(t) {
return t;
},
quadIn: function(t) {
return t * t;
},
quadOut: function(t) {
return t * (2 - t);
},
quadInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
},
cubicIn: function(t) {
return t * t * t;
},
cubicOut: function(t) {
return --t * t * t + 1;
},
cubicInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
},
quartIn: function(t) {
return t * t * t * t;
},
quartOut: function(t) {
return 1 - --t * t * t * t;
},
quartInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
},
quintIn: function(t) {
return t * t * t * t * t;
},
quintOut: function(t) {
return --t * t * t * t * t + 1;
},
quintInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
},
sineIn: function(t) {
return 1 - Math.cos(t * Math.PI / 2);
},
sineOut: function(t) {
return Math.sin(t * Math.PI / 2);
},
sineInOut: function(t) {
return .5 * (1 - Math.cos(Math.PI * t));
},
expoIn: function(t) {
return 0 === t ? 0 : Math.pow(1024, t - 1);
},
expoOut: function(t) {
return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
},
expoInOut: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
},
circIn: function(t) {
return 1 - Math.sqrt(1 - t * t);
},
circOut: function(t) {
return Math.sqrt(1 - --t * t);
},
circInOut: function(t) {
return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
},
elasticIn: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4);
},
elasticOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1;
},
elasticInOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return (t *= 2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1;
},
backIn: function(t) {
return t * t * (2.70158 * t - 1.70158);
},
backOut: function(t) {
return --t * t * (2.70158 * t + 1.70158) + 1;
},
backInOut: function(t) {
return (t *= 2) < 1 ? t * t * (3.5949095 * t - 2.5949095) * .5 : .5 * ((t -= 2) * t * (3.5949095 * t + 2.5949095) + 2);
},
bounceOut: function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
},
smooth: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
},
fade: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * t * (t * (6 * t - 15) + 10);
}
};
r.quadOutIn = n(r.quadIn, r.quadOut);
r.cubicOutIn = n(r.cubicIn, r.cubicOut);
r.quartOutIn = n(r.quartIn, r.quartOut);
r.quintOutIn = n(r.quintIn, r.quintOut);
r.sineOutIn = n(r.sineIn, r.sineOut);
r.expoOutIn = n(r.expoIn, r.expoOut);
r.circOutIn = n(r.circIn, r.circOut);
r.backOutIn = n(r.backIn, r.backOut);
r.backOutIn = n(r.backIn, r.backOut);
r.bounceIn = function(t) {
return 1 - r.bounceOut(1 - t);
};
r.bounceInOut = function(t) {
return t < .5 ? .5 * r.bounceIn(2 * t) : .5 * r.bounceOut(2 * t - 1) + .5;
};
r.bounceOutIn = n(r.bounceIn, r.bounceOut);
cc.Easing = e.exports = r;
}), {} ],
11: [ (function(t, e, i) {
t("./bezier");
t("./easing");
t("./types");
t("./motion-path-helper");
t("./animation-curves");
t("./animation-clip");
t("./animation-manager");
t("./animation-state");
t("./animation-animator");
}), {
"./animation-animator": 4,
"./animation-clip": 5,
"./animation-curves": 6,
"./animation-manager": 7,
"./animation-state": 8,
"./bezier": 9,
"./easing": 10,
"./motion-path-helper": 12,
"./types": 14
} ],
12: [ (function(t, e, i) {
function n(t) {
this.points = t || [];
this.beziers = [];
this.ratios = [];
this.progresses = [];
this.length = 0;
this.computeBeziers();
}
function r() {
this.start = l();
this.end = l();
this.startCtrlPoint = l();
this.endCtrlPoint = l();
}
function o(t, e, i, r) {
function o(t) {
return t instanceof cc.Vec2 ? {
in: t,
pos: t,
out: t
} : Array.isArray(t) && 6 === t.length ? {
in: l(t[2], t[3]),
pos: l(t[0], t[1]),
out: l(t[4], t[5])
} : {
in: cc.Vec2.ZERO,
pos: cc.Vec2.ZERO,
out: cc.Vec2.ZERO
};
}
function a(t, e, i) {
_.push(t);
p.push(e);
g.push(i);
}
var h = e.values;
if (0 !== t.length && 0 !== h.length) if (1 !== (h = h.map((function(t) {
return l(t[0], t[1]);
}))).length) {
for (var f = e.types, d = e.ratios, _ = e.values = [], p = e.types = [], g = e.ratios = [], v = 0, m = s.Linear, y = 0, C = t.length; y < C - 1; y++) {
var E, b = t[y], T = d[y], S = d[y + 1] - T, A = h[y], O = h[y + 1], I = f[y], x = [], N = v / S, w = 1 / (S * i * r);
if (b && b.length > 0) {
var R = [];
R.push(o(A));
for (var L = 0, P = b.length; L < P; L++) {
var F = o(b[L]);
R.push(F);
}
R.push(o(O));
var M = new n(R);
M.computeBeziers();
for (var D = M.progresses; 1 - N > 1e-6; ) {
var B, j, z, V;
if ((E = c(E = N, I)) < 0) {
V = (0 - E) * (j = M.beziers[0]).getLength();
z = j.start.sub(j.endCtrlPoint).normalize();
B = j.start.add(z.mul(V));
} else if (E > 1) {
V = (E - 1) * (j = M.beziers[M.beziers.length - 1]).getLength();
z = j.end.sub(j.startCtrlPoint).normalize();
B = j.end.add(z.mul(V));
} else {
var U = u(D, E);
U < 0 && (U = ~U);
E -= U > 0 ? D[U - 1] : 0;
E /= M.ratios[U];
B = M.beziers[U].getPointAt(E);
}
x.push(B);
N += w;
}
} else for (;1 - N > 1e-6; ) {
E = c(E = N, I);
x.push(A.lerp(O, E));
N += w;
}
m = "constant" === I ? I : s.Linear;
for (L = 0, P = x.length; L < P; L++) {
var k = T + v + w * L * S;
a(x[L], m, k);
}
v = Math.abs(N - 1) > 1e-6 ? (N - 1) * S : 0;
}
d[d.length - 1] !== g[g.length - 1] && a(h[h.length - 1], m, d[d.length - 1]);
} else e.values = h;
}
var s = t("./animation-curves").DynamicAnimCurve, c = t("./animation-curves").computeRatioByType, a = t("./bezier").bezier, u = t("../core/utils/binary-search").binarySearchEpsilon, l = cc.v2;
n.prototype.computeBeziers = function() {
this.beziers.length = 0;
this.ratios.length = 0;
this.progresses.length = 0;
this.length = 0;
for (var t, e = 1; e < this.points.length; e++) {
var i = this.points[e - 1], n = this.points[e];
(t = new r()).start = i.pos;
t.startCtrlPoint = i.out;
t.end = n.pos;
t.endCtrlPoint = n.in;
this.beziers.push(t);
this.length += t.getLength();
}
var o = 0;
for (e = 0; e < this.beziers.length; e++) {
t = this.beziers[e];
this.ratios[e] = t.getLength() / this.length;
this.progresses[e] = o += this.ratios[e];
}
return this.beziers;
};
r.prototype.getPointAt = function(t) {
var e = this.getUtoTmapping(t);
return this.getPoint(e);
};
r.prototype.getPoint = function(t) {
var e = a(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t), i = a(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
return new l(e, i);
};
r.prototype.getLength = function() {
var t = this.getLengths();
return t[t.length - 1];
};
r.prototype.getLengths = function(t) {
t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1) return this.cacheArcLengths;
var e, i, n = [], r = this.getPoint(0), o = 0;
n.push(0);
for (i = 1; i <= t; i++) {
e = this.getPoint(i / t);
o += cc.pDistance(e, r);
n.push(o);
r = e;
}
this.cacheArcLengths = n;
return n;
};
r.prototype.getUtoTmapping = function(t, e) {
var i, n = this.getLengths(), r = 0, o = n.length;
i = e || t * n[o - 1];
for (var s, c = 0, a = o - 1; c <= a; ) if ((s = n[r = Math.floor(c + (a - c) / 2)] - i) < 0) c = r + 1; else {
if (!(s > 0)) {
a = r;
break;
}
a = r - 1;
}
if (n[r = a] === i) {
return r / (o - 1);
}
var u = n[r];
return (r + (i - u) / (n[r + 1] - u)) / (o - 1);
};
0;
e.exports = {
sampleMotionPaths: o,
Curve: n,
Bezier: r
};
}), {
"../core/utils/binary-search": 100,
"./animation-curves": 6,
"./bezier": 9
} ],
13: [ (function(t, e, i) {
function n() {
this._isPlaying = !1;
this._isPaused = !1;
this._stepOnce = !1;
}
var r = cc.js, o = n.prototype;
r.get(o, "isPlaying", (function() {
return this._isPlaying;
}), !0);
r.get(o, "isPaused", (function() {
return this._isPaused;
}), !0);
var s = function() {};
o.onPlay = s;
o.onPause = s;
o.onResume = s;
o.onStop = s;
o.onError = s;
o.play = function() {
if (this._isPlaying) if (this._isPaused) {
this._isPaused = !1;
this.onResume();
} else this.onError("already-playing"); else {
this._isPlaying = !0;
this.onPlay();
}
};
o.stop = function() {
if (this._isPlaying) {
this._isPlaying = !1;
this.onStop();
this._isPaused = !1;
}
};
o.pause = function() {
if (this._isPlaying && !this._isPaused) {
this._isPaused = !0;
this.onPause();
}
};
o.resume = function() {
if (this._isPlaying && this._isPaused) {
this._isPaused = !1;
this.onResume();
}
};
o.step = function() {
this.pause();
this._stepOnce = !0;
this._isPlaying || this.play();
};
e.exports = n;
}), {} ],
14: [ (function(t, e, i) {
function n(t) {
if (t) this.set(t); else {
this.ratio = 0;
this.time = 0;
this.direction = 1;
this.stopped = !0;
this.iterations = 0;
this.frameIndex = void 0;
}
}
cc.js;
var r = {
Loop: 2,
ShouldWrap: 4,
PingPong: 22,
Reverse: 36
}, o = cc.Enum({
Default: 0,
Normal: 1,
Reverse: r.Reverse,
Loop: r.Loop,
LoopReverse: r.Loop | r.Reverse,
PingPong: r.PingPong,
PingPongReverse: r.PingPong | r.Reverse
});
cc.WrapMode = o;
n.prototype.set = function(t) {
this.ratio = t.ratio;
this.time = t.time;
this.direction = t.direction;
this.stopped = t.stopped;
this.iterations = t.iterations;
this.frameIndex = t.frameIndex;
};
e.exports = {
WrapModeMask: r,
WrapMode: o,
WrappedInfo: n
};
}), {} ],
15: [ (function(t, e, i) {
var n = cc.js;
i.removed = function(t) {
function e() {
cc.errorID(1403);
}
n.getset(t, "willPlayMusic", e, e);
};
i.deprecated = function(t) {
var e = -1, i = 1, r = 1, o = 1, s = 1;
n.get(t, "playMusic", (function() {
return function(n, s) {
t.stop(e);
e = t.play(n, s, o);
i = n;
r = s;
return e;
};
}));
n.get(t, "stopMusic", (function() {
return function() {
t.stop(e);
return e;
};
}));
n.get(t, "pauseMusic", (function() {
return function() {
t.pause(e);
return e;
};
}));
n.get(t, "resumeMusic", (function() {
return function() {
t.resume(e);
return e;
};
}));
n.get(t, "rewindMusic", (function() {
return function() {
t.setCurrentTime(e, 0);
return e;
};
}));
n.get(t, "getMusicVolume", (function() {
return function() {
return o;
};
}));
n.get(t, "setMusicVolume", (function() {
return function(i) {
o = i;
t.setVolume(e, o);
return o;
};
}));
n.get(t, "isMusicPlaying", (function() {
return function() {
return t.getState(e) === t.AudioState.PLAYING;
};
}));
n.get(t, "playEffect", (function() {
return function(e, i, n) {
return t.play(e, i || !1, void 0 === n ? s : n);
};
}));
n.get(t, "setEffectsVolume", (function(i) {
return function(i) {
s = i;
var n = t._id2audio;
for (var r in n) r !== e && t.setVolume(r, i);
};
}));
n.get(t, "getEffectsVolume", (function() {
return function() {
return s;
};
}));
n.get(t, "pauseEffect", (function() {
return function(e) {
return t.pause(e);
};
}));
n.get(t, "pauseAllEffects", (function() {
return function() {
var i = t.getState(e) === t.AudioState.PLAYING;
t.pauseAll();
i && t.resume(e);
};
}));
n.get(t, "resumeEffect", (function() {
return function(e) {
t.resume(e);
};
}));
n.get(t, "resumeAllEffects", (function() {
return function() {
var i = t.getState(e) === t.AudioState.PAUSED;
t.resumeAll();
i && t.getState(e) === t.AudioState.PLAYING && t.pause(e);
};
}));
n.get(t, "stopEffect", (function() {
return function(e) {
return t.stop(e);
};
}));
n.get(t, "stopAllEffects", (function() {
return function() {
var n = t.getState(e) === t.AudioState.PLAYING, o = t.getCurrentTime(e);
t.stopAll();
if (n) {
e = t.play(i, r);
t.setCurrentTime(e, o);
}
};
}));
n.get(t, "unloadEffect", (function() {
return function(e) {
return t.stop(e);
};
}));
0;
};
}), {} ],
16: [ (function(i, n, r) {
"use strict";
function o(t) {
var e = cc.Mask;
if (e) for (var i = 0, n = t; n && cc.Node.isNode(n); n = n._parent, ++i) if (n.getComponent(e)) return {
index: i,
node: n
};
return null;
}
var s = i("./utils/prefab-helper"), c = i("./utils/scene-graph-helper"), a = i("./event-manager"), u = cc.Object.Flags.Destroying, l = "position-changed", h = "size-changed", f = "anchor-changed", d = "rotation-changed", _ = "scale-changed", p = i("./utils/misc"), g = i("./event/event"), v = !!cc.ActionManager, m = function() {}, y = cc.Enum({
TOUCH_START: "touchstart",
TOUCH_MOVE: "touchmove",
TOUCH_END: "touchend",
TOUCH_CANCEL: "touchcancel",
MOUSE_DOWN: "mousedown",
MOUSE_MOVE: "mousemove",
MOUSE_ENTER: "mouseenter",
MOUSE_LEAVE: "mouseleave",
MOUSE_UP: "mouseup",
MOUSE_WHEEL: "mousewheel"
}), C = [ y.TOUCH_START, y.TOUCH_MOVE, y.TOUCH_END, y.TOUCH_CANCEL ], E = [ y.MOUSE_DOWN, y.MOUSE_ENTER, y.MOUSE_MOVE, y.MOUSE_LEAVE, y.MOUSE_UP, y.MOUSE_WHEEL ], b = null, T = function(t, e) {
var i = t.getLocation(), n = this.owner;
if (n._hitTest(i, this)) {
(e = g.EventTouch.pool.get(e)).type = y.TOUCH_START;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
return !0;
}
return !1;
}, S = function(t, e) {
e = g.EventTouch.pool.get(e);
var i = this.owner;
e.type = y.TOUCH_MOVE;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
}, A = function(t, e) {
e = g.EventTouch.pool.get(e);
var i = t.getLocation(), n = this.owner;
n._hitTest(i, this) ? e.type = y.TOUCH_END : e.type = y.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
}, O = function(t, e) {
e = g.EventTouch.pool.get(e);
t.getLocation();
var i = this.owner;
e.type = y.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
}, I = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = g.EventMouse.pool.get(t)).type = y.MOUSE_DOWN;
t.bubbles = !0;
i.dispatchEvent(t);
g.EventMouse.pool.put(t);
}
}, x = function(t) {
var e = t.getLocation(), i = this.owner, n = i._hitTest(e, this);
if (n || this._previousIn) {
t.stopPropagation();
t = g.EventMouse.pool.get(t);
}
if (n) {
if (!this._previousIn) {
if (b) {
t.type = y.MOUSE_LEAVE;
b.dispatchEvent(t);
b._mouseListener._previousIn = !1;
}
b = this.owner;
t.type = y.MOUSE_ENTER;
i.dispatchEvent(t);
this._previousIn = !0;
}
t.type = y.MOUSE_MOVE;
t.bubbles = !0;
i.dispatchEvent(t);
} else {
if (!this._previousIn) return;
t.type = y.MOUSE_LEAVE;
i.dispatchEvent(t);
this._previousIn = !1;
b = null;
}
g.EventMouse.pool.put(t);
}, N = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = g.EventMouse.pool.get(t)).type = y.MOUSE_UP;
t.bubbles = !0;
i.dispatchEvent(t);
g.EventMouse.pool.put(t);
}
}, w = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = g.EventMouse.pool.get(t)).type = y.MOUSE_WHEEL;
t.bubbles = !0;
i.dispatchEvent(t);
g.EventMouse.pool.put(t);
}
}, R = cc.Class({
name: "cc.Node",
extends: i("./utils/base-node"),
properties: {
_opacity: 255,
_color: cc.Color.WHITE,
_cascadeOpacityEnabled: !0,
_anchorPoint: cc.p(.5, .5),
_contentSize: cc.size(0, 0),
_rotationX: 0,
_rotationY: 0,
_scaleX: 1,
_scaleY: 1,
_position: cc.p(0, 0),
_skewX: 0,
_skewY: 0,
_localZOrder: 0,
_globalZOrder: 0,
_opacityModifyRGB: !1,
groupIndex: {
default: 0,
type: cc.Integer
},
group: {
get: function() {
return cc.game.groupList[this.groupIndex] || "";
},
set: function(t) {
this.groupIndex = cc.game.groupList.indexOf(t);
this.emit("group-changed");
}
},
x: {
get: function() {
return this._position.x;
},
set: function(t) {
var e = this._position;
if (t !== e.x) {
e.x = t;
this._sgNode.setPositionX(t);
var i = this._hasListenerCache;
i && i[l] && this.emit(l);
}
}
},
y: {
get: function() {
return this._position.y;
},
set: function(t) {
var e = this._position;
if (t !== e.y) {
e.y = t;
this._sgNode.setPositionY(t);
var i = this._hasListenerCache;
i && i[l] && this.emit(l);
}
}
},
rotation: {
get: function() {
this._rotationX !== this._rotationY && cc.logID(1602);
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t || this._rotationY !== t) {
this._rotationX = this._rotationY = t;
this._sgNode.rotation = t;
var e = this._hasListenerCache;
e && e[d] && this.emit(d);
}
}
},
rotationX: {
get: function() {
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t) {
this._rotationX = t;
this._sgNode.rotationX = t;
var e = this._hasListenerCache;
e && e[d] && this.emit(d);
}
}
},
rotationY: {
get: function() {
return this._rotationY;
},
set: function(t) {
if (this._rotationY !== t) {
this._rotationY = t;
this._sgNode.rotationY = t;
var e = this._hasListenerCache;
e && e[d] && this.emit(d);
}
}
},
scaleX: {
get: function() {
return this._scaleX;
},
set: function(t) {
if (this._scaleX !== t) {
this._scaleX = t;
this._sgNode.scaleX = t;
var e = this._hasListenerCache;
e && e[_] && this.emit(_);
}
}
},
scaleY: {
get: function() {
return this._scaleY;
},
set: function(t) {
if (this._scaleY !== t) {
this._scaleY = t;
this._sgNode.scaleY = t;
var e = this._hasListenerCache;
e && e[_] && this.emit(_);
}
}
},
skewX: {
get: function() {
return this._skewX;
},
set: function(t) {
this._skewX = t;
this._sgNode.skewX = t;
}
},
skewY: {
get: function() {
return this._skewY;
},
set: function(t) {
this._skewY = t;
this._sgNode.skewY = t;
}
},
opacity: {
get: function() {
return this._opacity;
},
set: function(t) {
if (this._opacity !== t) {
this._opacity = t;
this._sgNode.setOpacity(t);
if (!this._cascadeOpacityEnabled) {
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacity(t);
}
}
},
range: [ 0, 255 ]
},
cascadeOpacity: {
get: function() {
return this._cascadeOpacityEnabled;
},
set: function(t) {
if (this._cascadeOpacityEnabled !== t) {
this._cascadeOpacityEnabled = t;
this._sgNode.cascadeOpacity = t;
var e = t ? 255 : this._opacity, i = this._sizeProvider;
i instanceof _ccsg.Node && i.setOpacity(e);
}
}
},
color: {
get: function() {
return this._color.clone();
},
set: function(t) {
if (!this._color.equals(t)) {
this._color.fromColor(t);
0;
this._sizeProvider instanceof _ccsg.Node && this._sizeProvider.setColor(t);
}
}
},
anchorX: {
get: function() {
return this._anchorPoint.x;
},
set: function(t) {
var e = this._anchorPoint;
if (e.x !== t) {
e.x = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit(f);
}
}
},
anchorY: {
get: function() {
return this._anchorPoint.y;
},
set: function(t) {
var e = this._anchorPoint;
if (e.y !== t) {
e.y = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit(f);
}
}
},
width: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getWidth();
this._contentSize.width = t;
return t;
}
return this._contentSize.width;
},
set: function(t) {
if (t !== this._contentSize.width) {
var e = this._sizeProvider;
e && e.setContentSize(t, e._getHeight());
this._contentSize.width = t;
this.emit(h);
}
}
},
height: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getHeight();
this._contentSize.height = t;
return t;
}
return this._contentSize.height;
},
set: function(t) {
if (t !== this._contentSize.height) {
var e = this._sizeProvider;
e && e.setContentSize(e._getWidth(), t);
this._contentSize.height = t;
this.emit(h);
}
}
},
zIndex: {
get: function() {
return this._localZOrder;
},
set: function(t) {
if (this._localZOrder !== t) {
this._localZOrder = t;
this._sgNode.zIndex = t;
this._parent && (function(t) {
t._parent._delaySort();
})(this);
}
}
}
},
ctor: function(t) {
var e = this._sgNode = new _ccsg.Node();
e.retain();
e._entity = this;
e.onEnter = function() {
_ccsg.Node.prototype.onEnter.call(this);
if (this._entity && !this._entity._active) {
v && cc.director.getActionManager().pauseTarget(this);
a.pauseTarget(this);
}
};
cc.game._isCloning || (e.cascadeOpacity = !0);
this._sizeProvider = null;
this._reorderChildDirty = !1;
this._widget = null;
this._touchListener = null;
this._mouseListener = null;
this._retainedActions = [];
},
statics: {
isNode: function(t) {
return t instanceof R && (t.constructor === R || !(t instanceof cc.Scene));
}
},
_onSetParent: function(t) {
var e = this._sgNode;
e.parent && e.parent.removeChild(e, !1);
if (t) {
t._sgNode.addChild(e);
t._delaySort();
}
},
_onSiblingIndexChanged: function(t) {
var e, i = this._parent, n = i._children, r = 0, o = n.length;
if (cc.runtime) for (;r < o; r++) {
var s = (e = n[r]._sgNode).getLocalZOrder();
e.setLocalZOrder(s + 1);
e.setLocalZOrder(s);
} else {
i._sgNode.removeChild(this._sgNode, !1);
if (t + 1 < n.length) {
var c = n[t + 1], a = this._sgNode.getLocalZOrder();
i._sgNode.insertChildBefore(this._sgNode, c._sgNode);
a !== this._sgNode.getLocalZOrder() && this._sgNode.setLocalZOrder(a);
} else i._sgNode.addChild(this._sgNode);
}
},
_onPreDestroy: function() {
var t = this._onPreDestroyBase();
v && cc.director.getActionManager().removeAllActionsFromTarget(this);
b === this && (b = null);
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._releaseAllActions();
if (this._touchListener) {
this._touchListener.release();
this._touchListener.owner = null;
this._touchListener.mask = null;
this._touchListener = null;
}
if (this._mouseListener) {
this._mouseListener.release();
this._mouseListener.owner = null;
this._mouseListener.mask = null;
this._mouseListener = null;
}
this._reorderChildDirty && cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
a.removeListeners(this);
if (t) {
this._sgNode._entity = null;
this._sgNode = null;
} else {
this._removeSgNode();
0;
}
},
_onPostActivated: function(t) {
var e = v ? cc.director.getActionManager() : null;
if (t) {
e && e.resumeTarget(this);
a.resumeTarget(this);
if (this._touchListener) {
var i = this._touchListener.mask = o(this);
this._mouseListener && (this._mouseListener.mask = i);
} else this._mouseListener && (this._mouseListener.mask = o(this));
} else {
e && e.pauseTarget(this);
a.pauseTarget(this);
}
},
_onHierarchyChanged: function(t) {
this._onHierarchyChangedBase(t);
cc._widgetManager._nodesOrderDirty = !0;
},
_onBatchCreated: function() {
var t = this._prefab;
t && t.sync && !t._synced && t.root === this && s.syncWithPrefab(this);
this._updateDummySgNode();
this._parent && this._parent._sgNode.addChild(this._sgNode);
if (!this._activeInHierarchy) {
v && cc.director.getActionManager().pauseTarget(this);
a.pauseTarget(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
on: function(t, e, i, n) {
var r = !1;
if (-1 !== C.indexOf(t)) {
if (!this._touchListener) {
this._touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
owner: this,
mask: o(this),
onTouchBegan: T,
onTouchMoved: S,
onTouchEnded: A,
onTouchCancelled: O
});
this._touchListener.retain();
a.addListener(this._touchListener, this);
r = !0;
}
} else if (-1 !== E.indexOf(t) && !this._mouseListener) {
this._mouseListener = cc.EventListener.create({
event: cc.EventListener.MOUSE,
_previousIn: !1,
owner: this,
mask: o(this),
onMouseDown: I,
onMouseMove: x,
onMouseUp: N,
onMouseScroll: w
});
this._mouseListener.retain();
a.addListener(this._mouseListener, this);
r = !0;
}
r && !this._activeInHierarchy && cc.director.getScheduler().schedule((function() {
this._activeInHierarchy || a.pauseTarget(this);
}), this, 0, 0, 0, !1);
return this._EventTargetOn(t, e, i, n);
},
off: function(t, e, i, n) {
this._EventTargetOff(t, e, i, n);
-1 !== C.indexOf(t) ? this._checkTouchListeners() : -1 !== E.indexOf(t) && this._checkMouseListeners();
},
targetOff: function(t) {
this._EventTargetTargetOff(t);
this._checkTouchListeners();
this._checkMouseListeners();
},
pauseSystemEvents: function(t) {
a.pauseTarget(this, t);
},
resumeSystemEvents: function(t) {
a.resumeTarget(this, t);
},
_checkTouchListeners: function() {
if (!(this._objFlags & u) && this._touchListener) {
var t = 0;
if (this._bubblingListeners) for (;t < C.length; ++t) if (this._bubblingListeners.has(C[t])) return;
if (this._capturingListeners) for (;t < C.length; ++t) if (this._capturingListeners.has(C[t])) return;
a.removeListener(this._touchListener);
this._touchListener = null;
}
},
_checkMouseListeners: function() {
if (!(this._objFlags & u) && this._mouseListener) {
var t = 0;
if (this._bubblingListeners) for (;t < E.length; ++t) if (this._bubblingListeners.has(E[t])) return;
if (this._capturingListeners) for (;t < E.length; ++t) if (this._capturingListeners.has(E[t])) return;
b === this && (b = null);
a.removeListener(this._mouseListener);
this._mouseListener = null;
}
},
_hitTest: function(t, e) {
var i = this.width, n = this.height, r = t, o = cc.Camera;
o && o.main && o.main.containsNode(this) && (r = o.main.getCameraToWorldPoint(r));
var s = cc.affineTransformInvertIn(this._sgNode.getNodeToWorldTransform());
(r = cc.pointApplyAffineTransform(r, s)).x += this._anchorPoint.x * i;
r.y += this._anchorPoint.y * n;
var c = r.x, a = i - r.x, u = r.y, l = n - r.y;
if (c >= 0 && a >= 0 && l >= 0 && u >= 0) {
if (e && e.mask) {
for (var h = e.mask, f = this, d = 0; f && d < h.index; ++d, f = f.parent) ;
if (f === h.node) {
var _ = f.getComponent(cc.Mask);
return !_ || !_.enabledInHierarchy || _._hitTest(t);
}
e.mask = null;
return !0;
}
return !0;
}
return !1;
},
_getCapturingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t, !0) && e.push(i);
i = i.parent;
}
},
_getBubblingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
isRunning: function() {
return this._activeInHierarchy;
},
runAction: v ? function(t) {
if (this.active) {
cc.assertID(t, 1618);
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._retainAction(t);
this._sgNode._owner = this;
cc.director.getActionManager().addAction(t, this, !1);
return t;
}
} : m,
pauseAllActions: v ? function() {
cc.director.getActionManager().pauseTarget(this);
} : m,
resumeAllActions: v ? function() {
cc.director.getActionManager().resumeTarget(this);
} : m,
stopAllActions: v ? function() {
cc.director.getActionManager().removeAllActionsFromTarget(this);
} : m,
stopAction: v ? function(t) {
cc.director.getActionManager().removeAction(t);
} : m,
stopActionByTag: v ? function(t) {
t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612);
} : m,
getActionByTag: v ? function(t) {
if (t === cc.Action.TAG_INVALID) {
cc.logID(1613);
return null;
}
return cc.director.getActionManager().getActionByTag(t, this);
} : function() {
return null;
},
getNumberOfRunningActions: v ? function() {
return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
} : function() {
return 0;
},
_retainAction: function(t) {
if (t instanceof cc.Action && -1 === this._retainedActions.indexOf(t)) {
this._retainedActions.push(t);
t.retain();
}
},
_releaseAllActions: function() {
for (var t = 0; t < this._retainedActions.length; ++t) this._retainedActions[t].release();
this._retainedActions.length = 0;
},
setTag: function(t) {
this._tag = t;
this._sgNode.tag = t;
},
getPosition: function() {
return new cc.Vec2(this._position);
},
setPosition: function(i, n) {
var r;
if ("undefined" === ("object" == (e = typeof n) ? t(n) : e)) {
r = i.x;
n = i.y;
} else r = i;
var o = this._position;
if (o.x !== r || o.y !== n) {
o.x = r;
o.y = n;
this._sgNode.setPosition(r, n);
var s = this._hasListenerCache;
s && s[l] && this.emit(l);
}
},
getScale: function() {
this._scaleX !== this._scaleY && cc.logID(1603);
return this._scaleX;
},
setScale: function(i, n) {
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
} else n = n || 0 === n ? n : i;
if (this._scaleX !== i || this._scaleY !== n) {
this._scaleX = i;
this._scaleY = n;
this._sgNode.setScale(i, n);
var r = this._hasListenerCache;
r && r[_] && this.emit(_);
}
},
getContentSize: function(t) {
if (this._sizeProvider && !t) {
var e = this._sizeProvider.getContentSize();
this._contentSize = e;
return cc.size(e);
}
return cc.size(this._contentSize);
},
setContentSize: function(t, e) {
var i = this._contentSize;
if (void 0 === e) {
if (t.width === i.width && t.height === i.height) return;
0;
i.width = t.width;
i.height = t.height;
} else {
if (t === i.width && e === i.height) return;
0;
i.width = t;
i.height = e;
}
this._sizeProvider && this._sizeProvider.setContentSize(i);
this.emit(h);
},
setOpacityModifyRGB: function(t) {
if (this._opacityModifyRGB !== t) {
this._opacityModifyRGB = t;
this._sgNode.setOpacityModifyRGB(t);
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacityModifyRGB(t);
}
},
isOpacityModifyRGB: function() {
return this._opacityModifyRGB;
},
setGlobalZOrder: function(t) {
this._globalZOrder = t;
this._sgNode.setGlobalZOrder(t);
},
getGlobalZOrder: function() {
this._globalZOrder = this._sgNode.getGlobalZOrder();
return this._globalZOrder;
},
getAnchorPoint: function() {
return cc.p(this._anchorPoint);
},
setAnchorPoint: function(t, e) {
var i = this._anchorPoint;
if (void 0 === e) {
if (t.x === i.x && t.y === i.y) return;
i.x = t.x;
i.y = t.y;
} else {
if (t === i.x && e === i.y) return;
i.x = t;
i.y = e;
}
var n = this._sizeProvider;
n instanceof _ccsg.Node && n.setAnchorPoint(i);
this.emit(f);
},
getAnchorPointInPoints: function() {
return this._sgNode.getAnchorPointInPoints();
},
getDisplayedOpacity: function() {
return this._sgNode.getDisplayedOpacity();
},
_updateDisplayedOpacity: function(t) {
this._sgNode.updateDisplayedOpacity(t);
},
getDisplayedColor: function() {
return this._sgNode.getDisplayedColor();
},
getNodeToParentTransformAR: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, r = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(r, e);
}
return e;
},
getBoundingBox: function() {
var t = this.getContentSize(), e = cc.rect(0, 0, t.width, t.height);
return cc._rectApplyAffineTransformIn(e, this.getNodeToParentTransform());
},
getBoundingBoxToWorld: function() {
var t;
this.parent && (t = this.parent.getNodeToWorldTransformAR());
return this._getBoundingBoxTo(t);
},
_getBoundingBoxTo: function(t) {
var e = this.getContentSize(), i = e.width, n = e.height, r = cc.rect(-this._anchorPoint.x * i, -this._anchorPoint.y * n, i, n), o = cc.affineTransformConcat(this.getNodeToParentTransformAR(), t);
cc._rectApplyAffineTransformIn(r, o);
if (!this._children) return r;
for (var s = this._children, c = 0; c < s.length; c++) {
var a = s[c];
if (a && a.active) {
var u = a._getBoundingBoxTo(o);
u && (r = cc.rectUnion(r, u));
}
}
return r;
},
getNodeToParentTransform: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, r = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(r, e);
}
return e;
},
getNodeToWorldTransform: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, r = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(r, e);
}
return e;
},
getNodeToWorldTransformAR: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, r = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(r, e);
}
return e;
},
getParentToNodeTransform: function() {
return this._sgNode.getParentToNodeTransform();
},
getWorldToNodeTransform: function() {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.getWorldToNodeTransform();
},
_isSgTransformArToMe: function(t) {
var e = this._sgNode.getContentSize();
return 0 === e.width && 0 === e.height && (0 !== t.width || 0 !== t.height) || !!this._sgNode.isIgnoreAnchorPointForPosition();
},
convertToNodeSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.convertToNodeSpace(t);
return cc.pAdd(e, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height));
},
convertToWorldSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = t.x - this._anchorPoint.x * this._contentSize.width, i = t.y - this._anchorPoint.y * this._contentSize.height;
return cc.v2(this._sgNode.convertToWorldSpace(cc.v2(e, i)));
},
convertToNodeSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToNodeSpace(t)) : this._sgNode.convertToNodeSpaceAR(t);
},
convertToWorldSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToWorldSpace(t)) : cc.v2(this._sgNode.convertToWorldSpaceAR(t));
},
convertTouchToNodeSpace: function(t) {
return this.convertToNodeSpace(t.getLocation());
},
convertTouchToNodeSpaceAR: function(t) {
return this.convertToNodeSpaceAR(t.getLocation());
},
setNodeDirty: function() {
this._sgNode.setNodeDirty();
},
addChild: function(i, n, r) {
n = void 0 === n ? i._localZOrder : n;
var o, s = !1;
if ("undefined" === ("object" == (e = typeof r) ? t(r) : e)) {
r = void 0;
o = i._name;
} else if (cc.js.isString(r)) {
o = r;
r = void 0;
} else if (cc.js.isNumber(r)) {
s = !0;
o = "";
}
0;
cc.assertID(i, 1606);
cc.assertID(null === i._parent, 1605);
i.parent = this;
i.zIndex = n;
s ? i.setTag(r) : i.setName(o);
},
cleanup: function() {
v && cc.director.getActionManager().removeAllActionsFromTarget(this);
a.removeListeners(this);
var t, e, i = this._children.length;
for (t = 0; t < i; ++t) (e = this._children[t]) && e.cleanup();
},
sortAllChildren: function() {
if (this._reorderChildDirty) {
this._reorderChildDirty = !1;
var t = this._children;
if (t.length > 1) {
var e, i, n, r = t.length;
for (e = 1; e < r; e++) {
n = t[e];
i = e - 1;
for (;i >= 0; ) {
if (n._localZOrder < t[i]._localZOrder) t[i + 1] = t[i]; else {
if (!(n._localZOrder === t[i]._localZOrder && n._sgNode._arrivalOrder < t[i]._sgNode._arrivalOrder)) break;
t[i + 1] = t[i];
}
i--;
}
t[i + 1] = n;
}
this.emit("child-reorder");
}
cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_delaySort: function() {
if (!this._reorderChildDirty) {
this._reorderChildDirty = !0;
cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_updateDummySgNode: function() {
var t = this._sgNode;
t.setPosition(this._position);
t.setRotationX(this._rotationX);
t.setRotationY(this._rotationY);
t.setScale(this._scaleX, this._scaleY);
t.setSkewX(this._skewX);
t.setSkewY(this._skewY);
var e = t._arrivalOrder;
t.setLocalZOrder(this._localZOrder);
t._arrivalOrder = e;
t.setGlobalZOrder(this._globalZOrder);
t.setColor(this._color);
t.setOpacity(this._opacity);
t.setOpacityModifyRGB(this._opacityModifyRGB);
t.setCascadeOpacityEnabled(this._cascadeOpacityEnabled);
t.setTag(this._tag);
},
_updateSgNode: function() {
this._updateDummySgNode();
var t = this._sgNode;
t.setAnchorPoint(this._anchorPoint);
t.setVisible(this._active);
t.setColor(this._color);
var e = v ? cc.director.getActionManager() : null;
if (this._activeInHierarchy) {
e && e.resumeTarget(this);
a.resumeTarget(this);
} else {
e && e.pauseTarget(this);
a.pauseTarget(this);
}
},
_removeSgNode: c.removeSgNode,
onRestore: !1
}), L = function() {
this._activeInHierarchy || a.pauseTarget(this);
};
cc.js.getset(R.prototype, "_sgNode", (function() {
return this.__sgNode;
}), (function(t) {
this.__sgNode = t;
if (this._touchListener || this._mouseListener) {
if (this._touchListener) {
this._touchListener.retain();
a.removeListener(this._touchListener);
a.addListener(this._touchListener, this);
this._touchListener.release();
}
if (this._mouseListener) {
this._mouseListener.retain();
a.removeListener(this._mouseListener);
a.addListener(this._mouseListener, this);
this._mouseListener.release();
}
cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, L, this);
}
}), !0);
p.propertyDefine(R, [ "parent", "tag", "skewX", "skewY", "position", "rotation", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "opacity", "color" ], {
x: [ "getPositionX", "setPositionX" ],
y: [ "getPositionY", "setPositionY" ],
zIndex: [ "getLocalZOrder", "setLocalZOrder" ],
opacityModifyRGB: [ "isOpacityModifyRGB", "setOpacityModifyRGB" ],
cascadeOpacity: [ "isCascadeOpacityEnabled", "setCascadeOpacityEnabled" ]
});
R.EventType = y;
cc.Node = n.exports = R;
}), {
"./event-manager": 50,
"./event/event": 53,
"./utils/base-node": 99,
"./utils/misc": 103,
"./utils/prefab-helper": 105,
"./utils/scene-graph-helper": 106
} ],
17: [ (function(t, e, i) {
cc.Scene = cc.Class({
name: "cc.Scene",
extends: t("./CCNode"),
properties: {
autoReleaseAssets: {
default: void 0,
type: cc.Boolean
}
},
ctor: function() {
var t = this._sgNode = new _ccsg.Scene();
t.retain();
t.setAnchorPoint(0, 0);
this._anchorPoint.x = 0;
this._anchorPoint.y = 0;
this._activeInHierarchy = !1;
this._inited = !cc.game._isCloning;
this.dependAssets = null;
},
destroy: function() {
this._super();
this._activeInHierarchy = !1;
},
_onHierarchyChanged: function() {},
_instantiate: null,
_load: function() {
if (!this._inited) {
0;
this._onBatchCreated();
this._inited = !0;
}
},
_activate: function(t) {
t = !1 !== t;
0;
cc.director._nodeActivator.activateNode(this, t);
}
});
e.exports = cc.Scene;
}), {
"./CCNode": 16
} ],
18: [ (function(t, e, i) {
var n = t("./CCRawAsset");
cc.Asset = cc.Class({
name: "cc.Asset",
extends: n,
properties: {
rawUrl: {
get: function() {
if (this._rawFiles) {
if (cc.AssetLibrary) return cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/" + this._rawFiles[0];
cc.errorID(6400);
}
return "";
},
visible: !1
},
rawUrls: {
get: function() {
if (this._rawFiles) {
if (cc.AssetLibrary) {
var t = cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/";
return this._rawFiles.map((function(e) {
return t + e;
}));
}
cc.errorID(6401);
}
return [];
},
visible: !1
},
_rawFiles: null
},
statics: {
deserialize: function(t) {
return cc.deserialize(t);
},
preventDeferredLoadDependents: !1
},
serialize: function() {
return Editor.serialize(this);
},
createNode: null,
_setRawFiles: function(t) {
this._rawFiles = t.length > 0 ? t : null;
},
_preloadRawFiles: null
});
e.exports = cc.Asset;
}), {
"./CCRawAsset": 24
} ],
19: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AudioClip",
extends: cc.RawAsset
});
cc.AudioClip = n;
e.exports = n;
}), {} ],
20: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.BitmapFont",
extends: cc.Font,
properties: {
fntDataStr: {
default: ""
},
spriteFrame: {
default: null,
type: cc.SpriteFrame
},
fontSize: {
default: -1
},
_fntConfig: null
}
});
cc.BitmapFont = n;
e.exports = n;
}), {} ],
21: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Font",
extends: cc.Asset
});
cc.Font = n;
e.exports = n;
}), {} ],
22: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.LabelAtlas",
extends: cc.BitmapFont
});
cc.LabelAtlas = n;
e.exports = n;
}), {} ],
23: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Prefab",
extends: cc.Asset,
properties: {
data: null,
asyncLoadAssets: void 0,
_createFunction: {
default: null,
serializable: !1
}
},
createNode: !1,
compileCreateFunction: function() {
var e = t("../platform/instantiate-jit");
this._createFunction = e.compile(this.data);
},
_doInstantiate: function(t) {
this.data._prefab ? this.data._prefab._synced = !0 : cc.warnID(3700);
this._createFunction || this.compileCreateFunction();
return this._createFunction(t);
},
_instantiate: function() {
var t;
t = this._doInstantiate();
this.data._instantiate(t);
0;
return t;
}
});
cc.Prefab = e.exports = n;
cc.js.obsolete(cc, "cc._Prefab", "Prefab");
}), {
"../platform/instantiate-jit": 91
} ],
24: [ (function(t, e, i) {
var n = t("../platform/CCObject");
cc.RawAsset = cc.Class({
name: "cc.RawAsset",
extends: n,
ctor: function() {
Object.defineProperty(this, "_uuid", {
value: "",
writable: !0
});
},
statics: {
createNodeByInfo: null
}
});
Object.defineProperty(cc.RawAsset, "isRawAssetType", {
value: function(t) {
return cc.isChildClassOf(t, cc.RawAsset) && !cc.isChildClassOf(t, cc.Asset);
}
});
e.exports = cc.RawAsset;
}), {
"../platform/CCObject": 82
} ],
25: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SceneAsset",
extends: cc.Asset,
properties: {
scene: null,
asyncLoadAssets: void 0
}
});
cc.SceneAsset = n;
e.exports = n;
}), {} ],
26: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Script",
extends: cc.Asset
});
cc._Script = n;
var r = cc.Class({
name: "cc.JavaScript",
extends: n
});
cc._JavaScript = r;
var o = cc.Class({
name: "cc.CoffeeScript",
extends: n
});
cc._CoffeeScript = o;
var s = cc.Class({
name: "cc.TypeScript",
extends: n
});
cc._TypeScript = s;
}), {} ],
27: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SpriteAtlas",
extends: cc.Asset,
properties: {
_spriteFrames: {
default: {}
}
},
getTexture: function() {
var t = Object.keys(this._spriteFrames);
if (t.length > 0) {
var e = this._spriteFrames[t[0]];
return e ? e.getTexture() : null;
}
return null;
},
getSpriteFrame: function(t) {
return this._spriteFrames[t];
},
getSpriteFrames: function() {
var t = [], e = this._spriteFrames;
for (var i in e) t.push(e[i]);
return t;
}
});
cc.SpriteAtlas = n;
e.exports = n;
}), {} ],
28: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TTFFont",
extends: cc.Font
});
cc.TTFFont = n;
e.exports = n;
}), {} ],
29: [ (function(t, e, i) {
t("./CCRawAsset");
t("./CCAsset");
t("./CCFont");
t("./CCPrefab");
t("./CCAudioClip");
t("./CCScripts");
t("./CCSceneAsset");
t("../sprites/CCSpriteFrame");
t("../textures/CCTexture2D");
t("./CCTTFFont");
t("./CCSpriteAtlas");
t("./CCBitmapFont");
t("./CCLabelAtlas");
}), {
"../sprites/CCSpriteFrame": 1,
"../textures/CCTexture2D": 1,
"./CCAsset": 18,
"./CCAudioClip": 19,
"./CCBitmapFont": 20,
"./CCFont": 21,
"./CCLabelAtlas": 22,
"./CCPrefab": 23,
"./CCRawAsset": 24,
"./CCSceneAsset": 25,
"./CCScripts": 26,
"./CCSpriteAtlas": 27,
"./CCTTFFont": 28
} ],
30: [ (function(t, e, i) {
function n(t) {
return t instanceof cc.Scene ? cc.visibleRect : !t._sizeProvider || t._sizeProvider instanceof _ccsg.Node ? t._contentSize : t.getContentSize();
}
function r(t, e, i, n) {
for (var r = t._parent._scaleX, o = t._parent._scaleY, s = 0, c = 0, a = t._parent; ;) {
var u = a._position;
s += u.x;
c += u.y;
if (!(a = a._parent)) {
i.x = i.y = 0;
n.x = n.y = 1;
return;
}
if (a === e) break;
var l = a._scaleX, h = a._scaleY;
s *= l;
c *= h;
r *= l;
o *= h;
}
n.x = 0 !== r ? 1 / r : 1;
n.y = 0 !== o ? 1 / o : 1;
i.x = -s;
i.y = -c;
}
function o(t, e) {
var i, o, s, c = e._target;
c ? r(t, i = c, o = h, s = f) : i = t._parent;
var a = n(i), d = i._anchorPoint, _ = i instanceof cc.Scene, p = t._position.x, g = t._position.y, v = t._anchorPoint;
if (e._alignFlags & u) {
var m, y, C = a.width;
if (_) {
m = cc.visibleRect.left.x;
y = cc.visibleRect.right.x;
} else y = (m = -d.x * C) + C;
m += e._isAbsLeft ? e._left : e._left * C;
y -= e._isAbsRight ? e._right : e._right * C;
if (c) {
m += o.x;
m *= s.x;
y += o.x;
y *= s.x;
}
var E, b = v.x, T = t._scaleX;
if (T < 0) {
b = 1 - b;
T = -T;
}
if (e.isStretchWidth) {
E = y - m;
0 !== T && (t.width = E / T);
p = m + b * E;
} else {
E = t.width * T;
if (e.isAlignHorizontalCenter) {
var S = e._isAbsHorizontalCenter ? e._horizontalCenter : e._horizontalCenter * C, A = (.5 - d.x) * a.width;
if (c) {
S *= s.x;
A += o.x;
A *= s.x;
}
p = A + (b - .5) * E + S;
} else p = e.isAlignLeft ? m + b * E : y + (b - 1) * E;
}
}
if (e._alignFlags & l) {
var O, I, x = a.height;
if (_) {
I = cc.visibleRect.bottom.y;
O = cc.visibleRect.top.y;
} else O = (I = -d.y * x) + x;
I += e._isAbsBottom ? e._bottom : e._bottom * x;
O -= e._isAbsTop ? e._top : e._top * x;
if (c) {
I += o.y;
I *= s.y;
O += o.y;
O *= s.y;
}
var N, w = v.y, R = t._scaleY;
if (R < 0) {
w = 1 - w;
R = -R;
}
if (e.isStretchHeight) {
N = O - I;
0 !== R && (t.height = N / R);
g = I + w * N;
} else {
N = t.height * R;
if (e.isAlignVerticalCenter) {
var L = e._isAbsVerticalCenter ? e._verticalCenter : e._verticalCenter * x, P = (.5 - d.y) * a.height;
if (c) {
L *= s.y;
P += o.y;
P *= s.y;
}
g = P + (w - .5) * N + L;
} else g = e.isAlignBottom ? I + w * N : O + (w - 1) * N;
}
}
t.setPosition(p, g);
}
function s(t) {
var e = t._widget;
if (e) {
o(t, e);
e.isAlignOnce ? e.enabled = !1 : d.push(e);
}
for (var i = t._children, n = 0; n < i.length; n++) {
var r = i[n];
r._active && s(r);
}
}
function c() {
var t = cc.director.getScene();
if (t) {
_.isAligning = !0;
if (_._nodesOrderDirty) {
d.length = 0;
s(t);
_._nodesOrderDirty = !1;
} else {
var e, i = _._activeWidgetsIterator;
for (i.i = 0; i.i < d.length; ++i.i) o((e = d[i.i]).node, e);
}
_.isAligning = !1;
}
0;
}
function a(t) {
var e = t._parent;
cc.Node.isNode(e) && a(e);
var i = t._widget || t.getComponent(cc.Widget);
i && o(t, i);
}
var u = 56, l = 7, h = cc.Vec2.ZERO, f = cc.Vec2.ONE, d = [], _ = cc._widgetManager = e.exports = {
_AlignFlags: {
TOP: 1,
MID: 2,
BOT: 4,
LEFT: 8,
CENTER: 16,
RIGHT: 32
},
isAligning: !1,
_nodesOrderDirty: !1,
_activeWidgetsIterator: new cc.js.array.MutableForwardIterator(d),
init: function(t) {
t.on(cc.Director.EVENT_BEFORE_VISIT, c);
},
add: function(t) {
t.node._widget = t;
this._nodesOrderDirty = !0;
0;
},
remove: function(t) {
t.node._widget = null;
this._activeWidgetsIterator.remove(t);
0;
},
updateAlignment: a
};
0;
}), {} ],
31: [ (function(t, e, i) {
0;
var n = cc.Class({
name: "cc.Camera",
extends: cc._RendererUnderSG,
ctor: function() {
this.viewMatrix = cc.affineTransformMake();
this.invertViewMatrix = cc.affineTransformMake();
this._lastViewMatrix = cc.affineTransformMake();
this._sgTarges = [];
this._checkedTimes = 0;
this.visibleRect = {
left: cc.v2(),
right: cc.v2(),
top: cc.v2(),
bottom: cc.v2()
};
this.viewPort = cc.rect();
},
editor: !1,
properties: {
_targets: {
default: [],
type: cc.Node,
visible: !0
},
zoomRatio: 1
},
statics: {
main: null
},
_createSgNode: function() {
if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
cc.errorID(8301);
var t = new _ccsg.Node();
t.setTransform = t.addTarget = t.removeTarget = function() {};
return t;
}
return new _ccsg.CameraNode();
},
_initSgNode: function() {
this._sgNode.setContentSize(this.node.getContentSize(!0));
},
_addSgTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && !e._cameraInfo) {
e._cameraInfo = {
touched: this._checkedTimes
};
this._sgNode.addTarget(e);
this._sgTarges.push(e);
}
},
_removeTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && e._cameraInfo) {
this._sgNode.removeTarget(e);
delete e._cameraInfo;
cc.js.array.remove(this._sgTarges, e);
}
},
onEnable: function() {
if (n.main) cc.errorID(8300); else {
n.main = this;
this._sgNode.setEnable(!0);
for (var t = this._targets, e = 0, i = t.length; e < i; e++) this._addSgTargetInSg(t[e]);
}
},
onDisable: function() {
if (n.main === this) {
n.main = null;
this._sgNode.setEnable(!1);
for (var t = this._sgTarges, e = t.length - 1; e >= 0; e--) this._removeTargetInSg(t[e]);
}
},
addTarget: function(t) {
if (-1 === this._targets.indexOf(t)) {
this._addSgTargetInSg(t);
this._targets.push(t);
}
},
removeTarget: function(t) {
if (-1 !== this._targets.indexOf(t)) {
this._removeTargetInSg(t);
cc.js.array.remove(this._targets, t);
}
},
getTargets: function() {
return this._targets;
},
getNodeToCameraTransform: function(t) {
var e = t.getNodeToWorldTransform();
this.containsNode(t) && (e = cc.affineTransformConcatIn(e, cc.Camera.main.viewMatrix));
return e;
},
getCameraToWorldPoint: function(t) {
cc.Camera.main && (t = cc.pointApplyAffineTransform(t, cc.Camera.main.invertViewMatrix));
return t;
},
containsNode: function(t) {
t instanceof cc.Node && (t = t._sgNode);
for (var e = this._sgTarges; t; ) {
if (-1 !== e.indexOf(t)) return !0;
t = t.parent;
}
return !1;
},
_setSgNodesCullingDirty: function() {
for (var t = this._sgTarges, e = 0; e < t.length; e++) t[e].markCullingDirty();
},
_checkSgTargets: function() {
for (var t = this._targets, e = this._sgTarges, i = ++this._checkedTimes, n = 0, r = t.length; n < r; n++) {
var o = t[n], s = o;
o instanceof cc.Node && (s = o._sgNode) && !s._cameraInfo && this._addSgTargetInSg(s);
s && (s._cameraInfo.touched = i);
}
for (var c = e.length - 1; c >= 0; c--) {
var a = e[c];
a._cameraInfo.touched !== i && this._removeTargetInSg(a);
}
},
lateUpdate: function() {
this._checkSgTargets();
var t = this.viewMatrix, e = this.invertViewMatrix, i = this.viewPort, n = cc.visibleRect, r = this.visibleRect, o = this.node.getNodeToWorldTransformAR(), s = .5 * -(Math.atan2(o.b, o.a) + Math.atan2(-o.c, o.d)), c = 1, a = 0, u = 0, l = 1;
if (s) {
u = Math.sin(s);
c = l = Math.cos(s);
a = -u;
}
var h = this.zoomRatio;
c *= h;
a *= h;
u *= h;
l *= h;
t.a = c;
t.b = a;
t.c = u;
t.d = l;
var f = n.center;
t.tx = f.x - (c * o.tx + u * o.ty);
t.ty = f.y - (a * o.tx + l * o.ty);
cc.affineTransformInvertOut(t, e);
i.x = n.bottomLeft.x;
i.y = n.bottomLeft.y;
i.width = n.width;
i.height = n.height;
cc._rectApplyAffineTransformIn(i, e);
r.left.x = i.xMin;
r.right.x = i.xMax;
r.bottom.y = i.yMin;
r.top.y = i.yMax;
this._sgNode.setTransform(c, a, u, l, t.tx, t.ty);
var d = this._lastViewMatrix;
if (d.a !== t.a || d.b !== t.b || d.c !== t.c || d.d !== t.d || d.tx !== t.tx || d.ty !== t.ty) {
this._setSgNodesCullingDirty();
d.a = t.a;
d.b = t.b;
d.c = t.c;
d.d = t.d;
d.tx = t.tx;
d.ty = t.ty;
}
}
});
n.flags = cc.Enum({
InCamera: 1,
ParentInCamera: 2
});
e.exports = cc.Camera = n;
}), {
"./CCSGCameraNode": 1
} ],
32: [ (function(i, n, r) {
function o(t, e) {
for (var i = e.constructor._executionOrder, n = e.__instanceId, r = 0, o = t.length - 1, s = o >>> 1; r <= o; s = r + o >>> 1) {
var c = t[s], a = c.constructor._executionOrder;
if (a > i) o = s - 1; else if (a < i) r = s + 1; else {
var u = c.__instanceId;
if (u > n) o = s - 1; else {
if (!(u < n)) return s;
r = s + 1;
}
}
}
return ~r;
}
function s(t, e) {
for (var i = t.array, n = t.i + 1; n < i.length; ) {
var r = i[n];
if (r._enabled && r.node._activeInHierarchy) ++n; else {
t.removeAt(n);
e && (r._objFlags &= ~e);
}
}
}
function c(t, e) {
return t.constructor._executionOrder - e.constructor._executionOrder;
}
function a(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) return n ? function(t, e) {
var n = t.array;
for (t.i = 0; t.i < n.length; ++t.i) {
var r = n[t.i];
i(r, e);
}
} : function(t) {
var e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
var n = e[t.i];
i(n);
}
};
var r = "var a=it.array;for(it.i=0;it.i<a.length;++it.i){var c=a[it.i];" + i + "}";
return n ? Function("it", "dt", r) : Function("it", r);
}
function u() {
this.startInvoker = new m(a(_));
this.updateInvoker = new y(a(p, !0));
this.lateUpdateInvoker = new y(a(g, !0));
this.scheduleInNextFrame = [];
this._updating = !1;
}
i("./platform/CCClass");
var l = i("./platform/CCObject").Flags, h = i("./platform/js").array, f = l.IsStartCalled, d = l.IsOnEnableCalled, _ = (l.IsEditorOnEnableCalled, 
"c.start();c._objFlags|=" + f), p = "c.update(dt)", g = "c.lateUpdate(dt)", v = cc.Class({
__ctor__: function(t) {
var e = h.MutableForwardIterator;
this._zero = new e([]);
this._neg = new e([]);
this._pos = new e([]);
0;
this._invoke = t;
},
statics: {
stableRemoveInactive: s
},
add: null,
remove: null,
invoke: null
}), m = cc.Class({
extends: v,
add: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).array.push(t);
},
remove: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).fastRemove(t);
},
cancelInactive: function(t) {
s(this._zero, t);
s(this._neg, t);
s(this._pos, t);
},
invoke: function() {
var t = this._neg;
if (t.array.length > 0) {
t.array.sort(c);
this._invoke(t);
t.array.length = 0;
}
this._invoke(this._zero);
this._zero.array.length = 0;
var e = this._pos;
if (e.array.length > 0) {
e.array.sort(c);
this._invoke(e);
e.array.length = 0;
}
}
}), y = cc.Class({
extends: v,
add: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.array.push(t); else {
var i = e < 0 ? this._neg.array : this._pos.array, n = o(i, t);
n < 0 && i.splice(~n, 0, t);
}
},
remove: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.fastRemove(t); else {
var i = e < 0 ? this._neg : this._pos, n = o(i.array, t);
n >= 0 && i.removeAt(n);
}
},
invoke: function(t) {
this._neg.array.length > 0 && this._invoke(this._neg, t);
this._invoke(this._zero, t);
this._pos.array.length > 0 && this._invoke(this._pos, t);
}
}), C = cc.Class({
ctor: u,
unscheduleAll: u,
statics: {
LifeCycleInvoker: v,
OneOffInvoker: m,
createInvokeImpl: a,
invokeOnEnable: function(t) {
var e = cc.director._compScheduler, i = t.array;
for (t.i = 0; t.i < i.length; ++t.i) {
var n = i[t.i];
if (n._enabled) {
n.onEnable();
!n.node._activeInHierarchy || e._onEnabled(n);
}
}
}
},
_onEnabled: function(t) {
cc.director.getScheduler().resumeTarget(t);
t._objFlags |= d;
this._updating ? this.scheduleInNextFrame.push(t) : this._scheduleImmediate(t);
},
_onDisabled: function(t) {
cc.director.getScheduler().pauseTarget(t);
t._objFlags &= ~d;
var e = this.scheduleInNextFrame.indexOf(t);
if (e >= 0) h.fastRemoveAt(this.scheduleInNextFrame, e); else {
!t.start || t._objFlags & f || this.startInvoker.remove(t);
t.update && this.updateInvoker.remove(t);
t.lateUpdate && this.lateUpdateInvoker.remove(t);
}
},
enableComp: function(t, e) {
if (!(t._objFlags & d)) {
if (t.onEnable) {
if (e) {
e.add(t);
return;
}
t.onEnable();
if (!t.node._activeInHierarchy) return;
}
this._onEnabled(t);
}
},
disableComp: function(t) {
if (t._objFlags & d) {
t.onDisable && t.onDisable();
this._onDisabled(t);
}
},
_scheduleImmediate: function(t) {
!t.start || t._objFlags & f || this.startInvoker.add(t);
t.update && this.updateInvoker.add(t);
t.lateUpdate && this.lateUpdateInvoker.add(t);
},
_deferredSchedule: function() {
for (var t = this.scheduleInNextFrame, e = 0, i = t.length; e < i; e++) {
var n = t[e];
this._scheduleImmediate(n);
}
t.length = 0;
},
startPhase: function() {
this._updating = !0;
this.scheduleInNextFrame.length > 0 && this._deferredSchedule();
this.startInvoker.invoke();
},
updatePhase: function(t) {
this.updateInvoker.invoke(t);
},
lateUpdatePhase: function(t) {
this.lateUpdateInvoker.invoke(t);
this._updating = !1;
}
});
n.exports = C;
}), {
"./platform/CCClass": 78,
"./platform/CCObject": 82,
"./platform/js": 93,
"./utils/misc": 103
} ],
33: [ (function(t, e, i) {
function n(t, e) {
return t === e || t && e && (t.name === e.name || t._uuid === e._uuid);
}
var r = t("../../animation/animation-animator"), o = t("../../animation/animation-clip"), s = cc.Class({
name: "cc.Animation",
extends: t("./CCComponent"),
mixins: [ cc.EventTarget ],
editor: !1,
ctor: function() {
cc.EventTarget.call(this);
this._animator = null;
this._nameToState = {};
this._didInit = !1;
this._currentClip = null;
},
properties: {
_defaultClip: {
default: null,
type: o
},
defaultClip: {
type: o,
get: function() {
return this._defaultClip;
},
set: function(t) {
return;
},
tooltip: !1
},
currentClip: {
get: function() {
return this._currentClip;
},
set: function(t) {
this._currentClip = t;
},
type: o,
visible: !1
},
_clips: {
default: [],
type: [ o ],
tooltip: !1,
visible: !0
},
playOnLoad: {
default: !1,
tooltip: !1
}
},
start: function() {
if (this.playOnLoad && this._defaultClip) {
if (!(this._animator && this._animator.isPlaying)) {
var t = this.getAnimationState(this._defaultClip.name);
this._animator.playState(t);
}
}
},
onEnable: function() {
this._animator && this._animator.resume();
},
onDisable: function() {
this._animator && this._animator.pause();
},
onDestroy: function() {
this.stop();
},
getClips: function() {
return this._clips;
},
play: function(t, e) {
var i = this.playAdditive(t, e);
this._animator.stopStatesExcept(i);
return i;
},
playAdditive: function(t, e) {
this._init();
var i = this.getAnimationState(t || this._defaultClip && this._defaultClip.name);
if (i) {
this.enabled = !0;
var n = this._animator;
if (n.isPlaying && i.isPlaying) if (i.isPaused) n.resumeState(i); else {
n.stopState(i);
n.playState(i, e);
} else n.playState(i, e);
this.currentClip = i.clip;
}
return i;
},
stop: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.stopState(e);
} else this._animator.stop();
},
pause: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.pauseState(e);
} else this.enabled = !1;
},
resume: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.resumeState(e);
} else this.enabled = !0;
},
setCurrentTime: function(t, e) {
this._init();
if (e) {
var i = this._nameToState[e];
i && this._animator.setStateTime(i, t);
} else this._animator.setStateTime(t);
},
getAnimationState: function(t) {
this._init();
var e = this._nameToState[t];
0;
e && !e.curveLoaded && this._animator._reloadClip(e);
return e || null;
},
addClip: function(t, e) {
if (t) {
this._init();
cc.js.array.contains(this._clips, t) || this._clips.push(t);
e = e || t.name;
var i = this._nameToState[e];
if (i) {
if (i.clip === t) return i;
var n = this._clips.indexOf(i.clip);
-1 !== n && this._clips.splice(n, 1);
}
var r = new cc.AnimationState(t, e);
this._nameToState[e] = r;
return r;
}
cc.warnID(3900);
},
removeClip: function(t, e) {
if (t) {
this._init();
var i;
for (var n in this._nameToState) {
if ((i = this._nameToState[n]).clip === t) break;
}
if (t === this._defaultClip) {
if (!e) {
cc.warnID(3902);
return;
}
this._defaultClip = null;
}
if (i && i.isPlaying) {
if (!e) {
cc.warnID(3903);
return;
}
this.stop(i.name);
}
this._clips = this._clips.filter((function(e) {
return e !== t;
}));
i && delete this._nameToState[i.name];
} else cc.warnID(3901);
},
sample: function(t) {
this._init();
if (t) {
var e = this._nameToState[t];
e && e.sample();
} else this._animator.sample();
},
on: function(t, e, i, n) {
this._init();
for (var r = cc.EventTarget.prototype.on.call(this, t, e, i, n), o = this._animator._anims.array, s = 0; s < o.length; ++s) o[s]._setListeners(this);
return r;
},
off: function(t, e, i, n) {
this._init();
cc.EventTarget.prototype.off.call(this, t, e, i, n);
var r = this._nameToState;
for (var o in r) {
r[o]._setListeners(null);
}
},
_init: function() {
if (!this._didInit) {
this._didInit = !0;
this._animator = new r(this.node, this);
this._createStates();
}
},
_createStates: function() {
this._nameToState = {};
for (var t = null, e = !1, i = 0; i < this._clips.length; ++i) {
var r = this._clips[i];
if (r) {
t = new cc.AnimationState(r);
0;
this._nameToState[t.name] = t;
n(this._defaultClip, r) && (e = t);
}
}
if (this._defaultClip && !e) {
t = new cc.AnimationState(this._defaultClip);
0;
this._nameToState[t.name] = t;
}
}
});
cc.Animation = e.exports = s;
}), {
"../../animation/animation-animator": 4,
"../../animation/animation-clip": 5,
"./CCComponent": 38
} ],
34: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AudioSource",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this.audio = new cc.Audio();
},
properties: {
_clip: {
default: "",
url: cc.AudioClip
},
_volume: 1,
_mute: !1,
_loop: !1,
_pausedFlag: {
default: !1,
serializable: !1
},
isPlaying: {
get: function() {
if (!this.audio) return !1;
return this.audio.getState() === cc.Audio.State.PLAYING;
},
visible: !1
},
clip: {
get: function() {
return this._clip;
},
set: function(t) {
if (t !== this._clip) {
this._clip = t;
this.audio.stop();
this.audio.src = this._clip;
this.audio.preload && this.audio.preload();
}
},
url: cc.AudioClip,
tooltip: !1,
animatable: !1
},
volume: {
get: function() {
return this._volume;
},
set: function(t) {
t = cc.clamp01(t);
this._volume = t;
var e = this.audio;
if (e && !this._mute) {
e.setVolume(t);
e._loaded || e.on("load", (function() {
e.setVolume(t);
}));
}
return t;
},
tooltip: !1
},
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this.audio && this.audio.setVolume(t ? 0 : this._volume);
return t;
},
animatable: !1,
tooltip: !1
},
loop: {
get: function() {
return this._loop;
},
set: function(t) {
this._loop = t;
this.audio && this.audio.setLoop(t);
return t;
},
animatable: !1,
tooltip: !1
},
playOnLoad: {
default: !1,
tooltip: !1,
animatable: !1
},
preload: {
default: !1,
animatable: !1
}
},
_pausedCallback: function() {
var t = this.audio;
if (t && !t.paused) {
this.audio.pause();
this._pausedFlag = !0;
}
},
_restoreCallback: function() {
if (this.audio) {
this._pausedFlag && this.audio.resume();
this._pausedFlag = !1;
}
},
onEnable: function() {
this.playOnLoad && this.play();
if (this.preload) {
this.audio.src = this._clip;
this.audio.preload();
}
cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDisable: function() {
this.stop();
cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDestroy: function() {
this.stop();
this.audio.destroy();
cc.audioEngine.uncache(this._clip);
},
play: function() {
if (this._clip) {
var t = this._mute ? 0 : this._volume, e = this.audio, i = this._loop;
if (e._loaded) {
e.stop();
e.setCurrentTime(0);
e.play();
} else {
e.src = this._clip;
e.once("load", (function() {
e.setLoop(i);
e.setVolume(t);
e.play();
}));
e.preload();
}
}
},
stop: function() {
this.audio && this.audio.stop();
},
pause: function() {
this.audio && this.audio.pause();
},
resume: function() {
this.audio && this.audio.resume();
},
rewind: function() {
this.audio && this.audio.setCurrentTime(0);
},
getCurrentTime: function() {
var t = 0;
this.audio && (t = this.audio.getCurrentTime());
return t;
},
setCurrentTime: function(t) {
var e = this.audio;
if (!e) return t;
if (!e._loaded) {
e.once("load", (function() {
e.setCurrentTime(t);
}));
return t;
}
e.setCurrentTime(t);
return t;
},
getDuration: function() {
var t = 0;
this.audio && (t = this.audio.getDuration());
return t;
}
});
cc.AudioSource = e.exports = n;
}), {
"./CCComponent": 38
} ],
35: [ (function(t, e, i) {
function n(t) {
t.stopPropagation();
}
var r = [ "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseenter", "mouseleave", "mousewheel" ], o = cc.Class({
name: "cc.BlockInputEvents",
extends: t("./CCComponent"),
editor: {
menu: "i18n:MAIN_MENU.component.ui/Block Input Events",
inspector: "packages://inspector/inspectors/comps/block-input-events.js",
help: "i18n:COMPONENT.help_url.block-input-events"
},
onEnable: function() {
for (var t = 0; t < r.length; t++) this.node.on(r[t], n, this);
},
onDisable: function() {
for (var t = 0; t < r.length; t++) this.node.off(r[t], n, this);
}
});
cc.BlockInputEvents = e.exports = o;
}), {
"./CCComponent": 38
} ],
36: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
COLOR: 1,
SPRITE: 2,
SCALE: 3
}), r = cc.Class({
name: "cc.Button",
extends: t("./CCComponent"),
ctor: function() {
this._resetState();
this._fromColor = null;
this._toColor = null;
this._time = 0;
this._transitionFinished = !0;
this._fromScale = 1;
this._toScale = 1;
this._originalScale = 1;
this._sprite = null;
0;
},
_resetState: function() {
this._pressed = !1;
this._hovered = !1;
},
editor: !1,
properties: {
interactable: {
default: !0,
tooltip: !1,
notify: function(t) {
0;
this._updateState();
this.interactable || this._resetState();
},
animatable: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
},
enableAutoGrayEffect: {
default: !1,
tooltip: !1,
notify: function() {
this._updateDisabledState();
}
},
transition: {
default: n.NONE,
tooltip: !1,
type: n,
animatable: !1
},
normalColor: {
default: cc.color(214, 214, 214),
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedColor: {
default: cc.color(211, 211, 211),
displayName: "Pressed",
tooltip: !1
},
hoverColor: {
default: cc.Color.WHITE,
displayName: "Hover",
tooltip: !1
},
disabledColor: {
default: cc.color(124, 124, 124),
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
duration: {
default: .1,
range: [ 0, 10 ],
tooltip: !1
},
zoomScale: {
default: 1.2,
tooltip: !1
},
normalSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Pressed",
tooltip: !1,
formerlySerializedAs: "pressedSprite",
notify: function() {
this._updateState();
}
},
hoverSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Hover",
tooltip: !1,
formerlySerializedAs: "hoverSprite",
notify: function() {
this._updateState();
}
},
disabledSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
target: {
default: null,
type: cc.Node,
tooltip: !1,
notify: function() {
this._applyTarget();
}
},
clickEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Transition: n
},
__preload: function() {
this.target || (this.target = this.node);
this._applyTarget();
this._updateState();
},
onEnable: function() {
this.normalSprite && this.normalSprite.ensureLoadTexture();
this.hoverSprite && this.hoverSprite.ensureLoadTexture();
this.pressedSprite && this.pressedSprite.ensureLoadTexture();
this.disabledSprite && this.disabledSprite.ensureLoadTexture();
this._registerEvent();
},
update: function(t) {
var e = this.target;
if (!this._transitionFinished && (this.transition === n.COLOR || this.transition === n.SCALE)) {
this.time += t;
var i = 1;
this.duration > 0 && (i = this.time / this.duration);
if (i >= 1) {
i = 1;
this._transitionFinished = !0;
}
this.transition === n.COLOR ? e.color = this._fromColor.lerp(this._toColor, i) : this.transition === n.SCALE && (e.scale = cc.lerp(this._fromScale, this._toScale, i));
}
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getTargetSprite: function(t) {
var e = null;
t && (e = t.getComponent(cc.Sprite));
return e;
},
_applyTarget: function() {
this._sprite = this._getTargetSprite(this.target);
this.target && (this._originalScale = this.target.scale);
},
_onTouchBegan: function(t) {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !0;
this._updateState();
t.stopPropagation();
}
},
_onTouchMove: function(t) {
if (this.interactable && this.enabledInHierarchy && this._pressed) {
var e = t.touch, i = this.node._hitTest(e.getLocation());
if (this.transition === n.SCALE && this.target) if (i) {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this._transitionFinished = !1;
} else {
this.time = 0;
this._transitionFinished = !0;
this.target.scale = this._originalScale;
} else {
var r;
r = i ? "pressed" : "normal";
this._applyTransition(r);
}
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
if (this.interactable && this.enabledInHierarchy) {
if (this._pressed) {
cc.Component.EventHandler.emitEvents(this.clickEvents, t);
this.node.emit("click", this);
}
this._pressed = !1;
this._updateState();
t.stopPropagation();
}
},
_zoomUp: function() {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this.time = 0;
this._transitionFinished = !1;
},
_zoomBack: function() {
this._fromScale = this.target.scale;
this._toScale = this._originalScale;
this.time = 0;
this._transitionFinished = !1;
},
_onTouchCancel: function() {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !1;
this._updateState();
}
},
_onMouseMoveIn: function() {
if (!this._pressed && this.interactable && this.enabledInHierarchy && (this.transition !== n.SPRITE || this.hoverSprite) && !this._hovered) {
this._hovered = !0;
this._updateState();
}
},
_onMouseMoveOut: function() {
if (this._hovered) {
this._hovered = !1;
this._updateState();
}
},
_updateState: function() {
var t = this._getButtonState();
this._applyTransition(t);
this._updateDisabledState();
},
onDisable: function() {
this._hovered = !1;
this._pressed = !1;
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getButtonState: function() {
return this.interactable ? this._pressed ? "pressed" : this._hovered ? "hover" : "normal" : "disabled";
},
_updateColorTransition: function(t) {
var e = this[t + "Color"], i = this.target;
this._fromColor = i.color.clone();
this._toColor = e;
this.time = 0;
this._transitionFinished = !1;
},
_updateSpriteTransition: function(t) {
var e = this[t + "Sprite"];
this._sprite && e && (this._sprite.spriteFrame = e);
},
_updateScaleTransition: function(t) {
"pressed" === t ? this._zoomUp() : this._zoomBack();
},
_applyTransition: function(t) {
var e = this.transition;
e === n.COLOR ? this._updateColorTransition(t) : e === n.SPRITE ? this._updateSpriteTransition(t) : e === n.SCALE && this._updateScaleTransition(t);
},
_resizeNodeToTargetNode: !1,
_updateDisabledState: function() {
this._sprite && this._sprite._sgNode.setState(0);
this.enableAutoGrayEffect && this.transition !== n.COLOR && (this.transition === n.SPRITE && this.disabledSprite || this._sprite && !this.interactable && this._sprite._sgNode.setState(1));
}
});
cc.Button = e.exports = r;
}), {
"./CCComponent": 38
} ],
37: [ (function(t, e, i) {
var n = t("../event-manager"), r = {
getContentSize: function() {
return cc.visibleRect;
},
setContentSize: function(t) {},
_getWidth: function() {
return this.getContentSize().width;
},
_getHeight: function() {
return this.getContentSize().height;
}
}, o = cc.Class({
name: "cc.Canvas",
extends: t("./CCComponent"),
editor: !1,
resetInEditor: !1,
statics: {
instance: null
},
properties: {
_designResolution: cc.size(960, 640),
designResolution: {
get: function() {
return cc.size(this._designResolution);
},
set: function(t) {
this._designResolution.width = t.width;
this._designResolution.height = t.height;
this.applySettings();
},
tooltip: !1
},
_fitWidth: !1,
_fitHeight: !0,
fitHeight: {
get: function() {
return this._fitHeight;
},
set: function(t) {
if (this._fitHeight !== t) {
this._fitHeight = t;
this.applySettings();
}
},
tooltip: !1
},
fitWidth: {
get: function() {
return this._fitWidth;
},
set: function(t) {
if (this._fitWidth !== t) {
this._fitWidth = t;
this.applySettings();
}
},
tooltip: !1
}
},
ctor: function() {
this._thisOnResized = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: "window-resize",
callback: this.onResized.bind(this)
});
this._thisOnResized.retain();
},
__preload: function() {
if (o.instance) return cc.errorID(6700, this.node.name, o.instance.node.name);
o.instance = this;
if (this.node._sizeProvider) {
} else this.node._sizeProvider = r;
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
n.addListener(this._thisOnResized, 1);
this.applySettings();
this.onResized();
},
onDestroy: function() {
this.node._sizeProvider === r && (this.node._sizeProvider = null);
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
n.removeListener(this._thisOnResized);
this._thisOnResized.release();
o.instance === this && (o.instance = null);
},
alignWithScreen: function() {
var t, e = cc.visibleRect, i = 0, n = 0;
if (!this.fitHeight && !this.fitWidth) {
i = .5 * ((t = cc.view.getDesignResolutionSize()).width - e.width);
n = .5 * (t.height - e.height);
}
this.node.setPosition(.5 * e.width + i, .5 * e.height + n);
},
onResized: function() {
this.alignWithScreen();
},
applySettings: function() {
var t, e = cc.ResolutionPolicy;
t = this.fitHeight && this.fitWidth ? e.SHOW_ALL : this.fitHeight || this.fitWidth ? this.fitWidth ? e.FIXED_WIDTH : e.FIXED_HEIGHT : e.NO_BORDER;
var i = this._designResolution;
cc.view.setDesignResolutionSize(i.width, i.height, t);
}
});
cc.Canvas = e.exports = o;
}), {
"../event-manager": 50,
"./CCComponent": 38
} ],
38: [ (function(i, n, r) {
var o = i("../platform/CCObject"), s = i("../platform/js"), c = new (i("../platform/id-generater"))("Comp"), a = o.Flags.IsOnEnableCalled, u = o.Flags.IsOnLoadCalled, l = cc.Class({
name: "cc.Component",
extends: o,
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
properties: {
node: {
default: null,
visible: !1
},
name: {
get: function() {
if (this._name) return this._name;
var t = cc.js.getClassName(this), e = t.lastIndexOf(".");
e >= 0 && (t = t.slice(e + 1));
return this.node.name + "<" + t + ">";
},
set: function(t) {
this._name = t;
},
visible: !1
},
_id: {
default: "",
serializable: !1
},
uuid: {
get: function() {
var t = this._id;
if (!t) {
t = this._id = c.getNewId();
0;
}
return t;
},
visible: !1
},
__scriptAsset: !1,
_enabled: !0,
enabled: {
get: function() {
return this._enabled;
},
set: function(t) {
if (this._enabled !== t) {
this._enabled = t;
if (this.node._activeInHierarchy) {
var e = cc.director._compScheduler;
t ? e.enableComp(this) : e.disableComp(this);
}
}
},
visible: !1
},
enabledInHierarchy: {
get: function() {
return (this._objFlags & a) > 0;
},
visible: !1
},
_isOnLoadCalled: {
get: function() {
return this._objFlags & u;
}
}
},
update: null,
lateUpdate: null,
__preload: null,
onLoad: null,
start: null,
onEnable: null,
onDisable: null,
onDestroy: null,
onFocusInEditor: null,
onLostFocusInEditor: null,
resetInEditor: null,
addComponent: function(t) {
return this.node.addComponent(t);
},
getComponent: function(t) {
return this.node.getComponent(t);
},
getComponents: function(t) {
return this.node.getComponents(t);
},
getComponentInChildren: function(t) {
return this.node.getComponentInChildren(t);
},
getComponentsInChildren: function(t) {
return this.node.getComponentsInChildren(t);
},
_getLocalBounds: null,
onRestore: null,
destroy: function() {
this._super() && this._enabled && this.node._activeInHierarchy && cc.director._compScheduler.disableComp(this);
},
_onPreDestroy: function() {
this.unscheduleAllCallbacks();
for (var t = this.__eventTargets, e = 0, i = t.length; e < i; ++e) {
var n = t[e];
n && n.targetOff(this);
}
t.length = 0;
0;
cc.director._nodeActivator.destroyComp(this);
this.node._removeComponent(this);
0;
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
t.node = null;
return t;
},
isRunning: function() {
return this.enabledInHierarchy;
},
schedule: function(t, e, i, n) {
cc.assertID(t, 1619);
cc.assertID(e >= 0, 1620);
e = e || 0;
i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i;
n = n || 0;
var r = cc.director.getScheduler(), o = r.isTargetPaused(this);
r.schedule(t, this, e, i, n, o);
},
scheduleOnce: function(t, e) {
this.schedule(t, 0, 0, e);
},
unschedule: function(t) {
t && cc.director.getScheduler().unschedule(t, this);
},
unscheduleAllCallbacks: function() {
cc.director.getScheduler().unscheduleAllForTarget(this);
}
});
l._requireComponent = null;
l._executionOrder = 0;
0;
s.value(l, "_registerEditorProps", (function(i, n) {
var r = n.requireComponent;
r && (i._requireComponent = r);
var o = n.executionOrder;
o && "number" === ("object" == (e = typeof o) ? t(o) : e) && (i._executionOrder = o);
}));
l.prototype.__scriptUuid = "";
cc.Component = n.exports = l;
}), {
"../platform/CCObject": 82,
"../platform/id-generater": 89,
"../platform/js": 93
} ],
39: [ (function(i, n, r) {
cc.Component.EventHandler = cc.Class({
name: "cc.ClickEvent",
properties: {
target: {
default: null,
type: cc.Node
},
component: {
default: ""
},
handler: {
default: ""
},
customEventData: {
default: ""
}
},
statics: {
emitEvents: function(t) {
"use strict";
var e, i, n;
if (arguments.length > 0) for (i = 0, n = (e = new Array(arguments.length - 1)).length; i < n; i++) e[i] = arguments[i + 1];
for (i = 0, n = t.length; i < n; i++) {
var r = t[i];
r instanceof cc.Component.EventHandler && r.emit(e);
}
}
},
emit: function(i) {
var n = this.target;
if (cc.isValid(n)) {
var r = n.getComponent(this.component);
if (cc.isValid(r)) {
var o = r[this.handler];
if ("function" === ("object" == (e = typeof o) ? t(o) : e)) {
null != this.customEventData && "" !== this.customEventData && (i = i.slice()).push(this.customEventData);
o.apply(r, i);
}
}
}
}
});
}), {} ],
40: [ (function(i, n, r) {
i("../label/CCSGLabel");
i("../label/CCSGLabelCanvasRenderCmd");
i("../label/CCSGLabelWebGLRenderCmd");
var o = cc.TextAlignment, s = cc.VerticalTextAlignment, c = _ccsg.Label.Overflow, a = cc.Class({
name: "cc.Label",
extends: cc._RendererUnderSG,
ctor: function() {
0;
},
editor: !1,
_updateSgNodeString: function() {
this._sgNode.setString(this.string);
this._updateNodeSize();
},
_updateSgNodeFontSize: function() {
if (this._sgNode) {
this._sgNode.setFontSize(this._fontSize);
this._updateNodeSize();
}
},
properties: {
_useOriginalSize: !0,
string: {
default: "Label",
multiline: !0,
tooltip: !1,
notify: function() {
this._sgNode && this._updateSgNodeString();
}
},
horizontalAlign: {
default: o.LEFT,
type: o,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setHorizontalAlign(this.horizontalAlign);
},
animatable: !1
},
verticalAlign: {
default: s.TOP,
type: s,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setVerticalAlign(this.verticalAlign);
},
animatable: !1
},
_actualFontSize: {
default: 40
},
actualFontSize: {
displayName: "Actual Font Size",
animatable: !1,
readonly: !0,
get: function() {
this._sgNode && (this._actualFontSize = this._sgNode.getFontSize());
return this._actualFontSize;
}
},
_fontSize: 40,
fontSize: {
get: function() {
return this._fontSize;
},
set: function(t) {
this._fontSize = t;
this._updateSgNodeFontSize();
},
tooltip: !1
},
fontFamily: {
default: "Arial",
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
},
animatable: !1
},
_lineHeight: 40,
lineHeight: {
get: function() {
this._sgNode && (this._lineHeight = this._sgNode.getLineHeight());
return this._lineHeight;
},
set: function(t) {
this._lineHeight = t;
if (this._sgNode) {
this._sgNode.setLineHeight(t);
this._updateNodeSize();
}
},
tooltip: !1
},
overflow: {
default: c.NONE,
type: c,
tooltip: !1,
notify: function() {
if (this._sgNode) {
this._sgNode.setOverflow(this.overflow);
this._updateNodeSize();
}
},
animatable: !1
},
_enableWrapText: !0,
enableWrapText: {
get: function() {
this._sgNode && (this._enableWrapText = this._sgNode.isWrapTextEnabled());
return this._enableWrapText;
},
set: function(t) {
this._enableWrapText = t;
this._sgNode && this._sgNode.enableWrapText(t);
},
animatable: !1,
tooltip: !1
},
_N$file: null,
font: {
get: function() {
return this._N$file;
},
set: function(i) {
i || (this._isSystemFontUsed = !0);
0;
this._N$file = i;
this._bmFontOriginalSize = -1;
i && this._isSystemFontUsed && (this._isSystemFontUsed = !1);
if (this._sgNode) {
"string" === ("object" == (e = typeof i) ? t(i) : e) && cc.warnID(4e3);
var n = this.font;
if (n instanceof cc.BitmapFont) if (n.spriteFrame) if (n.spriteFrame.textureLoaded()) this._sgNode.setFontAsset(n); else {
cc.warnID(4012, n.name);
this._sgNode.setFontFamily("");
} else {
cc.warnID(4011, n.name);
this._sgNode.setFontFamily("");
} else this._sgNode.setFontAsset(n);
}
i instanceof cc.BitmapFont && (this._bmFontOriginalSize = i.fontSize);
},
type: cc.Font,
tooltip: !1,
animatable: !1
},
_isSystemFontUsed: !0,
useSystemFont: {
get: function() {
return this._isSystemFontUsed;
},
set: function(t) {
0;
this._isSystemFontUsed = !!t;
if (t) {
this.font = null;
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
}
},
animatable: !1,
tooltip: !1
},
_bmFontOriginalSize: {
displayName: "BMFont Original Size",
default: -1,
serializable: !1,
readonly: !0,
visible: !0,
animatable: !1
},
_spacingX: 0,
spacingX: {
get: function() {
return this._spacingX;
},
set: function(t) {
this._spacingX = t;
if (this._sgNode) {
this._sgNode.setSpacingX(this.spacingX);
this._updateNodeSize();
}
}
}
},
statics: {
HorizontalAlign: o,
VerticalAlign: s,
Overflow: c
},
__preload: function() {
this._super();
0;
this._updateNodeSize();
},
_createSgNode: function() {
return null;
},
_initSgNode: function() {
var i = this.font;
"string" === ("object" == (e = typeof i) ? t(i) : e) && cc.warnID(4e3);
var n;
if (i instanceof cc.BitmapFont) if (i.spriteFrame) if (i.spriteFrame.textureLoaded()) n = this._sgNode = new _ccsg.Label(this.string, JSON.stringify(i._fntConfig), i.spriteFrame); else {
cc.warnID(4012, i.name);
n = this._sgNode = new _ccsg.Label(this.string, null, null, this._fontSize);
} else {
cc.warnID(4011, i.name);
n = this._sgNode = _ccsg.Label.pool.get(this.string);
} else n = this._sgNode = _ccsg.Label.pool.get(this.string, i, null, this._fontSize);
n.retain();
i instanceof cc.BitmapFont && (this._bmFontOriginalSize = i.fontSize);
n.setVisible(!1);
n.setHorizontalAlign(this.horizontalAlign);
n.setVerticalAlign(this.verticalAlign);
n.setFontSize(this._fontSize);
this.useSystemFont && n.setFontFamily(this.fontFamily);
n.setOverflow(this.overflow);
n.enableWrapText(this._enableWrapText);
n.setLineHeight(this._lineHeight);
n.setString(this.string);
i instanceof cc.BitmapFont && n.setSpacingX(this.spacingX);
0;
n.setContentSize(this.node.getContentSize());
n.setColor(this.node.color);
},
_updateNodeSize: function() {
this._sgNode && this._sgNode.parent && (this.overflow !== c.NONE && this.overflow !== c.RESIZE_HEIGHT || this.node.setContentSize(this._sgNode.getContentSize()));
},
onDestroy: function() {
var t = this._sgNode;
this._super();
if (t) {
t.removeFromParent(!0);
_ccsg.Label.pool.put(t);
}
}
});
cc.Label = n.exports = a;
}), {
"../label/CCSGLabel": 1,
"../label/CCSGLabelCanvasRenderCmd": 1,
"../label/CCSGLabelWebGLRenderCmd": 1
} ],
41: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
HORIZONTAL: 1,
VERTICAL: 2,
GRID: 3
}), r = cc.Enum({
NONE: 0,
CONTAINER: 1,
CHILDREN: 2
}), o = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), s = cc.Enum({
BOTTOM_TO_TOP: 0,
TOP_TO_BOTTOM: 1
}), c = cc.Enum({
LEFT_TO_RIGHT: 0,
RIGHT_TO_LEFT: 1
}), a = cc.Class({
name: "cc.Layout",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layoutSize: cc.size(300, 200),
_layoutDirty: {
default: !0,
serializable: !1
},
_resize: r.NONE,
_N$layoutType: n.NONE,
type: {
type: n,
get: function() {
return this._N$layoutType;
},
set: function(t) {
this._N$layoutType = t;
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
resizeMode: {
type: r,
tooltip: !1,
animatable: !1,
get: function() {
return this._resize;
},
set: function(t) {
if (this.type !== n.NONE || t !== r.CHILDREN) {
this._resize = t;
this._doLayoutDirty();
}
}
},
cellSize: {
default: cc.size(40, 40),
tooltip: !1,
type: cc.Size,
notify: function() {
this._doLayoutDirty();
}
},
startAxis: {
default: o.HORIZONTAL,
tooltip: !1,
type: o,
notify: function() {
this._doLayoutDirty();
},
animatable: !1
},
_N$padding: {
default: 0
},
paddingLeft: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingRight: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingTop: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingBottom: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
spacingX: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
spacingY: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
verticalDirection: {
default: s.TOP_TO_BOTTOM,
type: s,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
horizontalDirection: {
default: c.LEFT_TO_RIGHT,
type: c,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
}
},
statics: {
Type: n,
VerticalDirection: s,
HorizontalDirection: c,
ResizeMode: r,
AxisDirection: o
},
_migratePaddingData: function() {
this.paddingLeft = this._N$padding;
this.paddingRight = this._N$padding;
this.paddingTop = this._N$padding;
this.paddingBottom = this._N$padding;
this._N$padding = 0;
},
onEnable: function() {
this._addEventListeners();
cc.sizeEqualToSize(this.node.getContentSize(), cc.size(0, 0)) && this.node.setContentSize(this._layoutSize);
0 !== this._N$padding && this._migratePaddingData();
this._doLayoutDirty();
},
onDisable: function() {
this._removeEventListeners();
},
_doLayoutDirty: function() {
this._layoutDirty = !0;
},
_addEventListeners: function() {
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.on("size-changed", this._resized, this);
this.node.on("anchor-changed", this._doLayoutDirty, this);
this.node.on("child-added", this._childAdded, this);
this.node.on("child-removed", this._childRemoved, this);
this.node.on("child-reorder", this._doLayoutDirty, this);
this._addChildrenEventListeners();
},
_removeEventListeners: function() {
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.off("size-changed", this._resized, this);
this.node.off("anchor-changed", this._doLayoutDirty, this);
this.node.off("child-added", this._childAdded, this);
this.node.off("child-removed", this._childRemoved, this);
this.node.off("child-reorder", this._doLayoutDirty, this);
this._removeChildrenEventListeners();
},
_addChildrenEventListeners: function() {
this.node.children.forEach(function(t) {
t.on("size-changed", this._doLayoutDirty, this);
t.on("position-changed", this._doLayoutDirty, this);
t.on("anchor-changed", this._doLayoutDirty, this);
t.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
}.bind(this));
},
_removeChildrenEventListeners: function() {
this.node.children.forEach(function(t) {
t.off("size-changed", this._doLayoutDirty, this);
t.off("position-changed", this._doLayoutDirty, this);
t.off("anchor-changed", this._doLayoutDirty, this);
t.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
}.bind(this));
},
_childAdded: function(t) {
var e = t.detail;
e.on("size-changed", this._doLayoutDirty, this);
e.on("position-changed", this._doLayoutDirty, this);
e.on("anchor-changed", this._doLayoutDirty, this);
e.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_childRemoved: function(t) {
var e = t.detail;
e.off("size-changed", this._doLayoutDirty, this);
e.off("position-changed", this._doLayoutDirty, this);
e.off("anchor-changed", this._doLayoutDirty, this);
e.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_resized: function() {
this._layoutSize = this.node.getContentSize();
this._doLayoutDirty();
},
_doLayoutHorizontally: function(t, e, i, o) {
var a = this.node.getAnchorPoint(), u = this.node.children, l = 1, h = this.paddingLeft, f = -a.x * t;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
l = -1;
f = (1 - a.x) * t;
h = this.paddingRight;
}
var d = f + l * h - l * this.spacingX, _ = 0, p = 0, g = 0, v = 0, m = 0, y = 0, C = this.cellSize.width;
this.type !== n.GRID && this.resizeMode === r.CHILDREN && (C = (t - (this.paddingLeft + this.paddingRight) - (u.length - 1) * this.spacingX) / u.length);
u.forEach(function(u) {
if (u.activeInHierarchy) {
if (this._resize === r.CHILDREN) {
u.width = C;
this.type === n.GRID && (u.height = this.cellSize.height);
}
var E = u.anchorX;
g > p && (p = g);
if (u.height >= p) {
g = p;
p = u.height;
y = u.getAnchorPoint().y;
}
this.horizontalDirection === c.RIGHT_TO_LEFT && (E = 1 - u.anchorX);
d = d + l * E * u.width + l * this.spacingX;
var b = l * (1 - E) * u.width;
if (e) {
var T = d + b + l * (l > 0 ? this.paddingRight : this.paddingLeft), S = this.horizontalDirection === c.LEFT_TO_RIGHT && T > (1 - a.x) * t, A = this.horizontalDirection === c.RIGHT_TO_LEFT && T < -a.x * t;
if (S || A) {
if (u.height >= p) {
0 === g && (g = p);
_ += g;
g = p;
} else {
_ += p;
g = u.height;
p = 0;
}
d = f + l * (h + E * u.width);
v++;
}
}
var O = i(u, _, v);
t >= u.width + this.paddingLeft + this.paddingRight && o && u.setPosition(cc.p(d, O));
var I, x = 1, N = 0 === p ? u.height : p;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
m = m || this.node._contentSize.height;
(I = O + (x = -1) * (N * y + this.paddingBottom)) < m && (m = I);
} else {
m = m || -this.node._contentSize.height;
(I = O + x * (N * y + this.paddingTop)) > m && (m = I);
}
d += b;
}
}.bind(this));
return m;
},
_getVerticalBaseHeight: function(t) {
var e = 0, i = 0;
if (this.resizeMode === r.CONTAINER) {
t.forEach((function(t) {
if (t.activeInHierarchy) {
i++;
e += t.height;
}
}));
e += (i - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
} else e = this.node.getContentSize().height;
return e;
},
_doLayoutVertically: function(t, e, i, o) {
var a = this.node.getAnchorPoint(), u = this.node.children, l = 1, h = this.paddingBottom, f = -a.y * t;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
l = -1;
f = (1 - a.y) * t;
h = this.paddingTop;
}
var d = f + l * h - l * this.spacingY, _ = 0, p = 0, g = 0, v = 0, m = 0, y = 0, C = this.cellSize.height;
this.type !== n.GRID && this.resizeMode === r.CHILDREN && (C = (t - (this.paddingTop + this.paddingBottom) - (u.length - 1) * this.spacingY) / u.length);
u.forEach(function(u) {
if (u.activeInHierarchy) {
if (this.resizeMode === r.CHILDREN) {
u.height = C;
this.type === n.GRID && (u.width = this.cellSize.width);
}
var E = u.anchorY;
g > p && (p = g);
if (u.width >= p) {
g = p;
p = u.width;
y = u.getAnchorPoint().x;
}
this.verticalDirection === s.TOP_TO_BOTTOM && (E = 1 - u.anchorY);
d = d + l * E * u.height + l * this.spacingY;
var b = l * (1 - E) * u.height;
if (e) {
var T = d + b + l * (l > 0 ? this.paddingTop : this.paddingBottom), S = this.verticalDirection === s.BOTTOM_TO_TOP && T > (1 - a.y) * t, A = this.verticalDirection === s.TOP_TO_BOTTOM && T < -a.y * t;
if (S || A) {
if (u.width >= p) {
0 === g && (g = p);
_ += g;
g = p;
} else {
_ += p;
g = u.width;
p = 0;
}
d = f + l * (h + E * u.height);
v++;
}
}
var O = i(u, _, v);
t >= u.height + (this.paddingTop + this.paddingBottom) && o && u.setPosition(cc.p(O, d));
var I, x = 1, N = 0 === p ? u.width : p;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
x = -1;
m = m || this.node._contentSize.width;
(I = O + x * (N * y + this.paddingLeft)) < m && (m = I);
} else {
m = m || -this.node._contentSize.width;
(I = O + x * (N * y + this.paddingRight)) > m && (m = I);
}
d += b;
}
}.bind(this));
return m;
},
_doLayoutBasic: function() {
var t = null;
this.node.children.forEach((function(e) {
e.activeInHierarchy && (t = t ? cc.rectUnion(t, e.getBoundingBoxToWorld()) : e.getBoundingBoxToWorld());
}));
if (t) {
var e = this.node.parent.convertToNodeSpaceAR(cc.p(t.x, t.y));
e = cc.pAdd(e, cc.p(-this.paddingLeft, -this.paddingBottom));
var i = this.node.parent.convertToNodeSpaceAR(cc.p(t.x + t.width, t.y + t.height));
i = cc.pAdd(i, cc.p(this.paddingRight, this.paddingTop));
var n = cc.size(parseFloat((i.x - e.x).toFixed(2)), parseFloat((i.y - e.y).toFixed(2))), r = this.node.getPosition(), o = (r.x - e.x) / n.width, s = (r.y - e.y) / n.height, c = cc.p(parseFloat(o.toFixed(2)), parseFloat(s.toFixed(2)));
this.node.setAnchorPoint(c);
this.node.setContentSize(n);
}
},
_doLayoutGridAxisHorizontal: function(t, e) {
var i = e.width, n = 1, o = -t.y * e.height, c = this.paddingBottom;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
o = (1 - t.y) * e.height;
c = this.paddingTop;
}
var a = function(t, e, i) {
return o + n * (e + t.anchorY * t.height + c + i * this.spacingY);
}.bind(this), u = 0;
if (this.resizeMode === r.CONTAINER) {
var l = this._doLayoutHorizontally(i, !0, a, !1);
(u = o - l) < 0 && (u *= -1);
o = -t.y * u;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
o = (1 - t.y) * u;
}
}
this._doLayoutHorizontally(i, !0, a, !0);
this.resizeMode === r.CONTAINER && this.node.setContentSize(i, u);
},
_doLayoutGridAxisVertical: function(t, e) {
var i = e.height, n = 1, o = -t.x * e.width, s = this.paddingLeft;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
o = (1 - t.x) * e.width;
s = this.paddingRight;
}
var a = function(t, e, i) {
return o + n * (e + t.anchorX * t.width + s + i * this.spacingX);
}.bind(this), u = 0;
if (this.resizeMode === r.CONTAINER) {
var l = this._doLayoutVertically(i, !0, a, !1);
(u = o - l) < 0 && (u *= -1);
o = -t.x * u;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
o = (1 - t.x) * u;
}
}
this._doLayoutVertically(i, !0, a, !0);
this.resizeMode === r.CONTAINER && this.node.setContentSize(u, i);
},
_doLayoutGrid: function() {
var t = this.node.getAnchorPoint(), e = this.node.getContentSize();
this.startAxis === o.HORIZONTAL ? this._doLayoutGridAxisHorizontal(t, e) : this.startAxis === o.VERTICAL && this._doLayoutGridAxisVertical(t, e);
},
_getHorizontalBaseWidth: function(t) {
var e = 0, i = 0;
if (this.resizeMode === r.CONTAINER) {
t.forEach((function(t) {
if (t.activeInHierarchy) {
i++;
e += t.width;
}
}));
e += (i - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
} else e = this.node.getContentSize().width;
return e;
},
_doLayout: function() {
if (this.type === n.HORIZONTAL) {
var t = this._getHorizontalBaseWidth(this.node.children), e = function(t) {
return t.y;
};
this._doLayoutHorizontally(t, !1, e, !0);
this.node.width = t;
} else if (this.type === n.VERTICAL) {
var i = this._getVerticalBaseHeight(this.node.children), o = function(t) {
return t.x;
};
this._doLayoutVertically(i, !1, o, !0);
this.node.height = i;
} else this.type === n.NONE ? this.resizeMode === r.CONTAINER && this._doLayoutBasic() : this.type === n.GRID && this._doLayoutGrid();
},
updateLayout: function() {
if (this._layoutDirty && this.node.children.length > 0) {
this._doLayout();
this._layoutDirty = !1;
}
}
});
Object.defineProperty(a.prototype, "padding", {
get: function() {
cc.warnID(4100);
return this.paddingLeft;
},
set: function(t) {
this._N$padding = t;
this._migratePaddingData();
this._doLayoutDirty();
}
});
cc.Layout = e.exports = a;
}), {
"./CCComponent": 38
} ],
42: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererInSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
t.setVisible(!1);
0;
t.retain();
this._plainNode = new _ccsg.Node();
this._plainNode.retain();
},
__preload: function() {
this._initSgNode();
},
onEnable: function() {
if (cc.director._actionManager && cc.director._actionManager.getNumberOfRunningActionsInTarget(this.node) > 0) {
cc.errorID(1629, this.node.name);
cc.errorID(1630);
cc.errorID(1631);
}
this._replaceSgNode(this._sgNode);
},
onDisable: function() {
this._replaceSgNode(this._plainNode);
},
onDestroy: function() {
this._removeSgNode();
var t = this.node._sgNode;
if (this._plainNode !== t) {
this._plainNode.release();
this._plainNode = null;
}
},
_replaceSgNode: function(t) {
0;
var e = this.node, i = e._sgNode;
i._entity = null;
0;
var n = i.getChildren().slice();
i.removeAllChildren(!1);
if (t.getChildrenCount() > 0) {
0;
t.removeAllChildren(!1);
}
for (var r = 0, o = n.length; r < o; ++r) t.addChild(n[r]);
var s = i.getParent();
if (s) if (cc.runtime) {
s.removeChild(i, !1);
s.addChild(t);
t.arrivalOrder = i.arrivalOrder;
} else {
s.insertChildBefore(t, i);
s.removeChild(i, !1);
}
e._sgNode = t;
e._sgNode._entity = e;
e._updateSgNode();
}
});
cc._RendererInSG = e.exports = n;
}), {
"./CCSGComponent": 44
} ],
43: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererUnderSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
if (t) {
t.retain();
t.setVisible(!1);
}
},
__preload: function() {
this._initSgNode();
this._registSizeProvider();
this._appendSgNode(this._sgNode);
},
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
},
_appendSgNode: function(t) {
if (t) {
var e = this.node;
t.setColor(e._color);
e._cascadeOpacityEnabled || t.setOpacity(e._opacity);
t.setAnchorPoint(e._anchorPoint);
t.setOpacityModifyRGB(e._opacityModifyRGB);
t.setLocalZOrder(-1);
e._sgNode.addChild(t);
}
}
});
cc._RendererUnderSG = e.exports = n;
}), {
"./CCSGComponent": 44
} ],
44: [ (function(t, e, i) {
var n = t("../utils/scene-graph-helper"), r = cc.Class({
extends: t("./CCComponent"),
name: "cc._SGComponent",
editor: !1,
properties: {
_sgNode: {
default: null,
serializable: !1
}
},
_createSgNode: null,
_initSgNode: null,
_removeSgNode: n.removeSgNode,
_registSizeProvider: function() {
if (this.node._sizeProvider) {
} else this.node._sizeProvider = this._sgNode;
}
});
cc._SGComponent = e.exports = r;
}), {
"../utils/scene-graph-helper": 106,
"./CCComponent": 38
} ],
45: [ (function(t, e, i) {
var n = t("./CCRendererUnderSG"), r = cc.Scale9Sprite.RenderingType, o = cc.Scale9Sprite.FillType, s = cc.BlendFunc.BlendFactor, c = cc.Enum({
CUSTOM: 0,
TRIMMED: 1,
RAW: 2
}), a = cc.Class({
name: "cc.Sprite",
extends: n,
editor: !1,
ctor: function() {
this._blendFunc = new cc.BlendFunc(this._srcBlendFactor, this._dstBlendFactor);
},
properties: {
_spriteFrame: {
default: null,
type: cc.SpriteFrame
},
_type: r.SIMPLE,
_sizeMode: c.TRIMMED,
_fillType: 0,
_fillCenter: cc.v2(0, 0),
_fillStart: 0,
_fillRange: 0,
_isTrimmedMode: !0,
_srcBlendFactor: s.SRC_ALPHA,
_dstBlendFactor: s.ONE_MINUS_SRC_ALPHA,
_atlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
editorOnly: !0,
visible: !0,
animatable: !1
},
spriteFrame: {
get: function() {
return this._spriteFrame;
},
set: function(t, e) {
var i = this._spriteFrame;
if (i !== t) {
this._spriteFrame = t;
this._applySpriteFrame(i);
0;
}
},
type: cc.SpriteFrame
},
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._sgNode.setRenderingType(t);
},
type: r,
animatable: !1,
tooltip: !1
},
fillType: {
get: function() {
return this._fillType;
},
set: function(t) {
this._fillType = t;
this._sgNode && this._sgNode.setFillType(t);
},
type: o,
tooltip: !1
},
fillCenter: {
get: function() {
return this._fillCenter;
},
set: function(t) {
this._fillCenter = cc.v2(t);
this._sgNode && this._sgNode.setFillCenter(this._fillCenter);
},
tooltip: !1
},
fillStart: {
get: function() {
return this._fillStart;
},
set: function(t) {
this._fillStart = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillStart(t);
},
tooltip: !1
},
fillRange: {
get: function() {
return this._fillRange;
},
set: function(t) {
this._fillRange = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillRange(t);
},
tooltip: !1
},
trim: {
get: function() {
return this._isTrimmedMode;
},
set: function(t) {
if (this._isTrimmedMode !== t) {
this._isTrimmedMode = t;
this._sgNode.enableTrimmedContentSize(t);
}
},
animatable: !1,
tooltip: !1
},
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
this._srcBlendFactor = t;
this._blendFunc.src = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
this._dstBlendFactor = t;
this._blendFunc.dst = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
sizeMode: {
get: function() {
return this._sizeMode;
},
set: function(t) {
this._sizeMode = t;
t !== c.CUSTOM && this._applySpriteSize();
},
animatable: !1,
type: c,
tooltip: !1
}
},
statics: {
FillType: o,
Type: r,
SizeMode: c
},
setVisible: function(t) {
this.enabled = t;
},
setInsetLeft: function(t) {
this._sgNode.setInsetLeft(t);
},
getInsetLeft: function() {
return this._sgNode.getInsetLeft();
},
setInsetTop: function(t) {
this._sgNode.setInsetTop(t);
},
getInsetTop: function() {
return this._sgNode.getInsetTop();
},
setInsetRight: function(t) {
this._sgNode.setInsetRight(t);
},
getInsetRight: function() {
return this._sgNode.getInsetRight();
},
setInsetBottom: function(t) {
this._sgNode.setInsetBottom(t);
},
getInsetBottom: function() {
return this._sgNode.getInsetBottom();
},
onEnable: function() {
this._sgNode && this._spriteFrame && this._spriteFrame.textureLoaded() && this._sgNode.setVisible(!0);
},
_applyAtlas: !1,
_applySpriteFrameInsets: function() {
var t = this._spriteFrame, e = this._sgNode;
e.setInsetTop(t.insetTop);
e.setInsetBottom(t.insetBottom);
e.setInsetRight(t.insetRight);
e.setInsetLeft(t.insetLeft);
},
_applySpriteSize: function() {
if (this._spriteFrame) if (c.RAW === this._sizeMode) {
var t = this._spriteFrame.getOriginalSize();
this.node.setContentSize(t);
} else if (c.TRIMMED === this._sizeMode) {
var e = this._spriteFrame.getRect();
this.node.setContentSize(e.width, e.height);
}
},
_onTextureLoaded: function(t) {
if (this.isValid) {
var e = this._sgNode;
e.setSpriteFrame(this._spriteFrame);
this._applySpriteSize();
this.enabledInHierarchy && !e.isVisible() && e.setVisible(!0);
}
},
_applySpriteFrame: function(t, e) {
var i = this._sgNode;
t && t.off && t.off("load", this._onTextureLoaded, this);
var n = this._spriteFrame;
if (n) {
e || this._applySpriteFrameInsets();
if (n.textureLoaded()) this._onTextureLoaded(null); else {
n.once("load", this._onTextureLoaded, this);
n.ensureLoadTexture();
}
} else i.setVisible(!1);
0;
},
_createSgNode: function() {
return new cc.Scale9Sprite();
},
_initSgNode: function() {
var t = this._sgNode, e = 0 !== t.getInsetLeft() || 0 !== t.getInsetRight() || 0 !== t.getInsetTop() || 0 !== t.getInsetBottom();
this._applySpriteFrame(null, e);
t.setContentSize(this.node.getContentSize(!0));
this._applySpriteSize();
t.setRenderingType(this._type);
t.setFillType(this._fillType);
t.setFillCenter(this._fillCenter);
t.setFillStart(this._fillStart);
t.setFillRange(this._fillRange);
t.enableTrimmedContentSize(this._isTrimmedMode);
this._blendFunc.src = this._srcBlendFactor;
this._blendFunc.dst = this._dstBlendFactor;
t.setBlendFunc(this._blendFunc);
},
_resized: !1
});
0;
t("../utils/misc").propertyDefine(a, [ "insetLeft", "insetTop", "insetRight", "insetBottom" ], {
type: [ null, "setRenderingType" ]
});
cc.Sprite = e.exports = a;
}), {
"../utils/misc": 103,
"./CCRendererUnderSG": 43
} ],
46: [ (function(t, e, i) {
var n = t("../base-ui/CCWidgetManager"), r = n._AlignFlags, o = r.TOP, s = r.MID, c = r.BOT, a = r.LEFT, u = r.CENTER, l = r.RIGHT, h = o | c, f = a | l, d = cc.Class({
name: "cc.Widget",
extends: t("./CCComponent"),
editor: !1,
properties: {
target: {
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
0;
},
type: cc.Node,
tooltip: !1
},
isAlignTop: {
get: function() {
return (this._alignFlags & o) > 0;
},
set: function(t) {
this._setAlign(o, t);
},
animatable: !1,
tooltip: !1
},
isAlignVerticalCenter: {
get: function() {
return (this._alignFlags & s) > 0;
},
set: function(t) {
if (t) {
this.isAlignTop = !1;
this.isAlignBottom = !1;
this._alignFlags |= s;
} else this._alignFlags &= ~s;
},
animatable: !1,
tooltip: !1
},
isAlignBottom: {
get: function() {
return (this._alignFlags & c) > 0;
},
set: function(t) {
this._setAlign(c, t);
},
animatable: !1,
tooltip: !1
},
isAlignLeft: {
get: function() {
return (this._alignFlags & a) > 0;
},
set: function(t) {
this._setAlign(a, t);
},
animatable: !1,
tooltip: !1
},
isAlignHorizontalCenter: {
get: function() {
return (this._alignFlags & u) > 0;
},
set: function(t) {
if (t) {
this.isAlignLeft = !1;
this.isAlignRight = !1;
this._alignFlags |= u;
} else this._alignFlags &= ~u;
},
animatable: !1,
tooltip: !1
},
isAlignRight: {
get: function() {
return (this._alignFlags & l) > 0;
},
set: function(t) {
this._setAlign(l, t);
},
animatable: !1,
tooltip: !1
},
isStretchWidth: {
get: function() {
return (this._alignFlags & f) === f;
},
visible: !1
},
isStretchHeight: {
get: function() {
return (this._alignFlags & h) === h;
},
visible: !1
},
top: {
get: function() {
return this._top;
},
set: function(t) {
this._top = t;
},
tooltip: !1
},
bottom: {
get: function() {
return this._bottom;
},
set: function(t) {
this._bottom = t;
},
tooltip: !1
},
left: {
get: function() {
return this._left;
},
set: function(t) {
this._left = t;
},
tooltip: !1
},
right: {
get: function() {
return this._right;
},
set: function(t) {
this._right = t;
},
tooltip: !1
},
horizontalCenter: {
get: function() {
return this._horizontalCenter;
},
set: function(t) {
this._horizontalCenter = t;
},
tooltip: !1
},
verticalCenter: {
get: function() {
return this._verticalCenter;
},
set: function(t) {
this._verticalCenter = t;
},
tooltip: !1
},
isAbsoluteHorizontalCenter: {
get: function() {
return this._isAbsHorizontalCenter;
},
set: function(t) {
this._isAbsHorizontalCenter = t;
},
animatable: !1
},
isAbsoluteVerticalCenter: {
get: function() {
return this._isAbsVerticalCenter;
},
set: function(t) {
this._isAbsVerticalCenter = t;
},
animatable: !1
},
isAbsoluteTop: {
get: function() {
return this._isAbsTop;
},
set: function(t) {
this._isAbsTop = t;
},
animatable: !1
},
isAbsoluteBottom: {
get: function() {
return this._isAbsBottom;
},
set: function(t) {
this._isAbsBottom = t;
},
animatable: !1
},
isAbsoluteLeft: {
get: function() {
return this._isAbsLeft;
},
set: function(t) {
this._isAbsLeft = t;
},
animatable: !1
},
isAbsoluteRight: {
get: function() {
return this._isAbsRight;
},
set: function(t) {
this._isAbsRight = t;
},
animatable: !1
},
isAlignOnce: {
default: !0,
tooltip: !1,
displayName: "AlignOnce"
},
_target: null,
_alignFlags: 0,
_left: 0,
_right: 0,
_top: 0,
_bottom: 0,
_verticalCenter: 0,
_horizontalCenter: 0,
_isAbsLeft: !0,
_isAbsRight: !0,
_isAbsTop: !0,
_isAbsBottom: !0,
_isAbsHorizontalCenter: !0,
_isAbsVerticalCenter: !0,
_originalWidth: 0,
_originalHeight: 0
},
onEnable: function() {
n.add(this);
},
onDisable: function() {
n.remove(this);
},
_setAlign: function(t, e) {
if (e != (this._alignFlags & t) > 0) {
var i = (t & f) > 0;
if (e) {
this._alignFlags |= t;
if (i) {
this.isAlignHorizontalCenter = !1;
if (this.isStretchWidth) {
this._originalWidth = this.node.width;
0;
}
} else {
this.isAlignVerticalCenter = !1;
if (this.isStretchHeight) {
this._originalHeight = this.node.height;
0;
}
}
0;
} else {
i ? this.isStretchWidth && (this.node.width = this._originalWidth) : this.isStretchHeight && (this.node.height = this._originalHeight);
this._alignFlags &= ~t;
}
}
},
updateAlignment: function() {
n.updateAlignment(this.node);
}
});
cc.Widget = e.exports = d;
}), {
"../base-ui/CCWidgetManager": 30,
"./CCComponent": 38
} ],
47: [ (function(t, e, i) {
t("./CCComponent");
t("./CCRendererInSG");
t("./CCRendererUnderSG");
t("./CCComponentEventHandler");
t("./missing-script");
e.exports = [ t("./CCSprite"), t("./CCWidget"), t("./CCCanvas"), t("./CCAudioSource"), t("./CCAnimation"), t("./CCButton"), t("./CCLabel"), t("./CCProgressBar"), t("./CCMask"), t("./CCScrollBar"), t("./CCScrollView"), t("./CCPageViewIndicator"), t("./CCPageView"), t("./CCSlider"), t("./CCLayout"), t("./CCEditBox"), t("./CCVideoPlayer"), t("./CCWebView"), t("./CCSpriteDistortion"), t("./CCLabelOutline"), t("./CCRichText"), t("./CCToggleContainer"), t("./CCToggleGroup"), t("./CCToggle"), t("./CCBlockInputEvents") ];
}), {
"./CCAnimation": 33,
"./CCAudioSource": 34,
"./CCBlockInputEvents": 35,
"./CCButton": 36,
"./CCCanvas": 37,
"./CCComponent": 38,
"./CCComponentEventHandler": 39,
"./CCEditBox": 1,
"./CCLabel": 40,
"./CCLabelOutline": 1,
"./CCLayout": 41,
"./CCMask": 1,
"./CCPageView": 1,
"./CCPageViewIndicator": 1,
"./CCProgressBar": 1,
"./CCRendererInSG": 42,
"./CCRendererUnderSG": 43,
"./CCRichText": 1,
"./CCScrollBar": 1,
"./CCScrollView": 1,
"./CCSlider": 1,
"./CCSprite": 45,
"./CCSpriteDistortion": 1,
"./CCToggle": 1,
"./CCToggleContainer": 1,
"./CCToggleGroup": 1,
"./CCVideoPlayer": 1,
"./CCWebView": 1,
"./CCWidget": 46,
"./missing-script": 48
} ],
48: [ (function(t, e, i) {
var n = cc.js, r = t("../utils/misc").BUILTIN_CLASSID_RE, o = cc.Class({
name: "cc.MissingClass",
properties: {
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
}
}), s = cc.Class({
name: "cc.MissingScript",
extends: cc.Component,
editor: {
inspector: "packages://inspector/inspectors/comps/missing-script.js"
},
properties: {
compiled: {
default: !1,
serializable: !1
},
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
},
ctor: !1,
statics: {
safeFindClass: function(t, e) {
var i = n._getClassById(t);
if (i) return i;
if (t) {
cc.deserialize.reportMissingClass(t);
return s.getMissingWrapper(t, e);
}
return null;
},
getMissingWrapper: function(t, e) {
return e.node && (/^[0-9a-zA-Z+/]{23}$/.test(t) || r.test(t)) ? s : o;
}
},
onLoad: function() {
cc.warnID(4600, this.node.name);
}
});
cc._MissingScript = e.exports = s;
}), {
"../utils/misc": 103
} ],
49: [ (function(t, e, i) {
var n = cc.js;
t("../event/event");
var r = function(t, e) {
cc.Event.call(this, cc.Event.MOUSE, e);
this._eventType = t;
this._button = 0;
this._x = 0;
this._y = 0;
this._prevX = 0;
this._prevY = 0;
this._scrollX = 0;
this._scrollY = 0;
};
n.extend(r, cc.Event);
var o = r.prototype;
o.setScrollData = function(t, e) {
this._scrollX = t;
this._scrollY = e;
};
o.getScrollX = function() {
return this._scrollX;
};
o.getScrollY = function() {
return this._scrollY;
};
o.setLocation = function(t, e) {
this._x = t;
this._y = e;
};
o.getLocation = function() {
return {
x: this._x,
y: this._y
};
};
o.getLocationInView = function() {
return {
x: this._x,
y: cc.view._designResolutionSize.height - this._y
};
};
o._setPrevCursor = function(t, e) {
this._prevX = t;
this._prevY = e;
};
o.getPreviousLocation = function() {
return {
x: this._prevX,
y: this._prevY
};
};
o.getDelta = function() {
return {
x: this._x - this._prevX,
y: this._y - this._prevY
};
};
o.getDeltaX = function() {
return this._x - this._prevX;
};
o.getDeltaY = function() {
return this._y - this._prevY;
};
o.setButton = function(t) {
this._button = t;
};
o.getButton = function() {
return this._button;
};
o.getLocationX = function() {
return this._x;
};
o.getLocationY = function() {
return this._y;
};
r.NONE = 0;
r.DOWN = 1;
r.UP = 2;
r.MOVE = 3;
r.SCROLL = 4;
r.BUTTON_LEFT = 0;
r.BUTTON_RIGHT = 2;
r.BUTTON_MIDDLE = 1;
r.BUTTON_4 = 3;
r.BUTTON_5 = 4;
r.BUTTON_6 = 5;
r.BUTTON_7 = 6;
r.BUTTON_8 = 7;
var s = function(t, e) {
cc.Event.call(this, cc.Event.TOUCH, e);
this._eventCode = 0;
this._touches = t || [];
this.touch = null;
this.currentTouch = null;
};
n.extend(s, cc.Event);
(o = s.prototype).getEventCode = function() {
return this._eventCode;
};
o.getTouches = function() {
return this._touches;
};
o._setEventCode = function(t) {
this._eventCode = t;
};
o._setTouches = function(t) {
this._touches = t;
};
o.setLocation = function(t, e) {
this.touch && this.touch.setTouchInfo(this.touch.getID(), t, e);
};
o.getLocation = function() {
return this.touch ? this.touch.getLocation() : cc.v2();
};
o.getLocationInView = function() {
return this.touch ? this.touch.getLocationInView() : cc.v2();
};
o.getPreviousLocation = function() {
return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
o.getStartLocation = function() {
return this.touch ? this.touch.getStartLocation() : cc.v2();
};
o.getID = function() {
return this.touch ? this.touch.getID() : null;
};
o.getDelta = function() {
return this.touch ? this.touch.getDelta() : cc.v2();
};
o.getDeltaX = function() {
return this.touch ? this.touch.getDelta().x : 0;
};
o.getDeltaY = function() {
return this.touch ? this.touch.getDelta().y : 0;
};
o.getLocationX = function() {
return this.touch ? this.touch.getLocationX() : 0;
};
o.getLocationY = function() {
return this.touch ? this.touch.getLocationY() : 0;
};
s.MAX_TOUCHES = 5;
s.BEGAN = 0;
s.MOVED = 1;
s.ENDED = 2;
s.CANCELED = 3;
var c = function(t, e) {
cc.Event.call(this, cc.Event.ACCELERATION, e);
this.acc = t;
};
n.extend(c, cc.Event);
var a = function(t, e, i) {
cc.Event.call(this, cc.Event.KEYBOARD, i);
this.keyCode = t;
this.isPressed = e;
};
n.extend(a, cc.Event);
cc.Event.EventMouse = r;
cc.Event.EventTouch = s;
cc.Event.EventAcceleration = c;
cc.Event.EventKeyboard = a;
e.exports = cc.Event;
}), {
"../event/event": 53
} ],
50: [ (function(t, e, i) {
t("./CCEvent");
var n;
n = cc.eventManager;
e.exports = n;
}), {
"./CCEvent": 49,
"./CCEventListener": 1,
"./CCEventManager": 1,
"./CCTouch": 1
} ],
51: [ (function(t, e, i) {
function n() {
o.call(this);
}
var r = cc.js, o = t("../platform/callbacks-invoker").CallbacksHandler;
r.extend(n, o);
n.prototype.invoke = function(t, e) {
var i = t.type, n = this._callbackTable[i];
if (n) {
var r = !n.isInvoking;
n.isInvoking = !0;
for (var o = n.callbacks, s = n.targets, c = 0, a = o.length; c < a; ++c) {
var u = o[c];
if (u) {
var l = s[c] || t.currentTarget;
u.call(l, t, e);
if (t._propagationImmediateStopped) break;
}
}
if (r) {
n.isInvoking = !1;
n.containCanceled && n.purgeCanceled();
}
}
};
e.exports = n;
0;
}), {
"../platform/callbacks-invoker": 86
} ],
52: [ (function(i, n, r) {
function o() {
this._capturingListeners = null;
this._bubblingListeners = null;
this._hasListenerCache = null;
}
var s = i("./event-listeners");
i("./event");
var c = cc.js.array.fastRemove, a = new Array(16);
a.length = 0;
var u = o.prototype;
u._addEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
n || (n = this._hasListenerCache = cc.js.createMap());
void 0 === n[t] && (n[t] = 0);
var r = i ? 2 : 4;
n[t] |= r;
};
u._purgeEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
if (n && !e.has(t)) {
var r = i ? 2 : 4;
n[t] &= ~r;
0 === n[t] && delete n[t];
}
};
u._resetFlagForTarget = function(t, e, i) {
var n = this._hasListenerCache;
if (n) {
var r = i ? 2 : 4;
for (var o in n) if (!e.has(o)) {
n[o] &= ~r;
0 === n[o] && delete n[o];
}
}
};
u.hasEventListener = function(t, e) {
var i = this._hasListenerCache;
if (!i) return !1;
var n = e ? 2 : 4;
return (i[t] & n) > 0;
};
u.on = function(i, n, r, o) {
if ("boolean" === ("object" == (e = typeof r) ? t(r) : e)) {
o = r;
r = void 0;
} else o = !!o;
if (n) {
var c = null;
if (!(c = o ? this._capturingListeners = this._capturingListeners || new s() : this._bubblingListeners = this._bubblingListeners || new s()).has(i, n, r)) {
c.add(i, n, r);
r && r.__eventTargets && r.__eventTargets.push(this);
this._addEventFlag(i, c, o);
}
return n;
}
cc.errorID(6800);
};
u.off = function(i, n, r, o) {
if ("boolean" === ("object" == (e = typeof r) ? t(r) : e)) {
o = r;
r = void 0;
} else o = !!o;
if (n) {
var s = o ? this._capturingListeners : this._bubblingListeners;
if (s) {
s.remove(i, n, r);
r && r.__eventTargets && c(r.__eventTargets, this);
this._purgeEventFlag(i, s, o);
}
} else {
this._capturingListeners && this._capturingListeners.removeAll(i);
this._bubblingListeners && this._bubblingListeners.removeAll(i);
this._hasListenerCache && delete this._hasListenerCache[i];
}
};
u.targetOff = function(t) {
if (this._capturingListeners) {
this._capturingListeners.removeAll(t);
this._resetFlagForTarget(t, this._capturingListeners, !0);
}
if (this._bubblingListeners) {
this._bubblingListeners.removeAll(t);
this._resetFlagForTarget(t, this._bubblingListeners, !1);
}
};
u.once = function(t, e, i, n) {
var r = "__ONCE_FLAG:" + t, o = n ? this._capturingListeners : this._bubblingListeners;
if (!(o && o.has(r, e, i))) {
var s = this, c = function(a) {
s.off(t, c, i, n);
o.remove(r, e, i);
e.call(this, a);
};
this.on(t, c, i, n);
o || (o = n ? this._capturingListeners : this._bubblingListeners);
o.add(r, e, i);
}
};
u.dispatchEvent = function(t) {
(function(t, e) {
var i, n;
e.target = t;
a.length = 0;
t._getCapturingTargets(e.type, a);
e.eventPhase = 1;
for (n = a.length - 1; n >= 0; --n) if ((i = a[n])._isTargetActive(e.type) && i._capturingListeners) {
e.currentTarget = i;
i._capturingListeners.invoke(e, a);
if (e._propagationStopped) {
a.length = 0;
return;
}
}
a.length = 0;
if (t._isTargetActive(e.type)) {
e.eventPhase = 2;
e.currentTarget = t;
t._capturingListeners && t._capturingListeners.invoke(e);
!e._propagationImmediateStopped && t._bubblingListeners && t._bubblingListeners.invoke(e);
}
if (!e._propagationStopped && e.bubbles) {
t._getBubblingTargets(e.type, a);
e.eventPhase = 3;
for (n = 0; n < a.length; ++n) if ((i = a[n])._isTargetActive(e.type) && i._bubblingListeners) {
e.currentTarget = i;
i._bubblingListeners.invoke(e);
if (e._propagationStopped) {
a.length = 0;
return;
}
}
}
a.length = 0;
})(this, t);
a.length = 0;
};
u.emit = function(t, e) {
0;
var i = this._hasListenerCache;
if (i) {
var n = i[t];
if (n) {
var r = cc.Event.EventCustom.get(t);
r.detail = e;
r.eventPhase = 2;
r.target = r.currentTarget = this;
var o = this._capturingListeners;
o && 2 & n && o.invoke(r);
var s = this._bubblingListeners;
s && 4 & n && !r._propagationImmediateStopped && s.invoke(r);
cc.Event.EventCustom.put(r);
}
}
};
u._isTargetActive = function(t) {
return !0;
};
u._getCapturingTargets = function(t, e) {};
u._getBubblingTargets = function(t, e) {};
o.prototype._EventTargetOn = o.prototype.on;
o.prototype._EventTargetOnce = o.prototype.once;
o.prototype._EventTargetOff = o.prototype.off;
o.prototype._EventTargetTargetOff = o.prototype.targetOff;
cc.EventTarget = n.exports = o;
}), {
"./event": 53,
"./event-listeners": 51
} ],
53: [ (function(t, e, i) {
var n = t("../platform/js");
cc.Event = function(t, e) {
this.type = t;
this.bubbles = !!e;
this.target = null;
this.currentTarget = null;
this.eventPhase = 0;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
};
cc.Event.prototype = {
constructor: cc.Event,
unuse: function() {
this.type = cc.Event.NO_TYPE;
this.target = null;
this.currentTarget = null;
this.eventPhase = cc.Event.NONE;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
},
reuse: function(t, e) {
this.type = t;
this.bubbles = e || !1;
},
stopPropagation: function() {
this._propagationStopped = !0;
},
stopPropagationImmediate: function() {
this._propagationImmediateStopped = !0;
},
isStopped: function() {
return this._propagationStopped || this._propagationImmediateStopped;
},
getCurrentTarget: function() {
return this.currentTarget;
},
getType: function() {
return this.type;
}
};
cc.Event.NO_TYPE = "no_type";
cc.Event.TOUCH = "touch";
cc.Event.MOUSE = "mouse";
cc.Event.KEYBOARD = "keyboard";
cc.Event.ACCELERATION = "acceleration";
cc.Event.NONE = 0;
cc.Event.CAPTURING_PHASE = 1;
cc.Event.AT_TARGET = 2;
cc.Event.BUBBLING_PHASE = 3;
var r = function(t, e) {
cc.Event.call(this, t, e);
this.detail = null;
};
n.extend(r, cc.Event);
r.prototype.reset = r;
r.prototype.setUserData = function(t) {
this.detail = t;
};
r.prototype.getUserData = function() {
return this.detail;
};
r.prototype.getEventName = cc.Event.prototype.getType;
var o = new n.Pool(10);
r.put = function(t) {
o.put(t);
};
r.get = function(t, e) {
var i = o._get();
i ? i.reset(t, e) : i = new r(t, e);
return i;
};
cc.Event.EventCustom = r;
e.exports = cc.Event;
}), {
"../platform/js": 93
} ],
54: [ (function(t, e, i) {
t("./event");
t("./event-listeners");
t("./event-target");
t("./system-event");
}), {
"./event": 53,
"./event-listeners": 51,
"./event-target": 52,
"./system-event": 55
} ],
55: [ (function(t, e, i) {
var n, r = t("../event/event-target"), o = t("../event-manager");
n = cc.inputManager;
var s = cc.Enum({
KEY_DOWN: "keydown",
KEY_UP: "keyup",
DEVICEMOTION: "devicemotion"
}), c = null, a = null, u = 0, l = cc.Class({
name: "SystemEvent",
extends: r,
statics: {
EventType: s
},
setAccelerometerEnabled: function(t) {
n.setAccelerometerEnabled(t);
},
setAccelerometerInterval: function(t) {
n.setAccelerometerInterval(t);
},
on: function(t, e, i, n) {
this._super(t, e, i, n);
if (t === s.KEY_DOWN || t === s.KEY_UP) {
c || (c = cc.EventListener.create({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(t, e) {
e.type = s.KEY_DOWN;
e.keyCode = t;
e.isPressed = !0;
cc.systemEvent.dispatchEvent(e);
},
onKeyReleased: function(t, e) {
e.type = s.KEY_UP;
e.keyCode = t;
e.isPressed = !1;
cc.systemEvent.dispatchEvent(e);
}
}));
if (!o.hasEventListener(cc._EventListenerKeyboard.LISTENER_ID)) {
var r = cc.director.getTotalFrames();
if (r !== u) {
o.addListener(c, 1);
u = r;
}
}
}
if (t === s.DEVICEMOTION) {
a || (a = cc.EventListener.create({
event: cc.EventListener.ACCELERATION,
callback: function(t, e) {
e.type = s.DEVICEMOTION;
e.acc = t;
cc.systemEvent.dispatchEvent(e);
}
}));
o.hasEventListener(cc._EventListenerAcceleration.LISTENER_ID) || o.addListener(a, 1);
}
},
off: function(t, e, i, n) {
this._super(t, e, i, n);
if (c && (t === s.KEY_DOWN || t === s.KEY_UP)) {
var r = this.hasEventListener(s.KEY_DOWN), u = this.hasEventListener(s.KEY_UP);
r || u || o.removeListener(c);
}
a && t === s.DEVICEMOTION && o.removeListener(a);
}
});
cc.SystemEvent = e.exports = l;
cc.systemEvent = new cc.SystemEvent();
}), {
"../event-manager": 50,
"../event/event-target": 52,
"../platform/CCInputManager": 1
} ],
56: [ (function(t, e, i) {
var n = t("./types").LineCap, r = t("./types").LineJoin, o = cc.Class({
name: "cc.Graphics",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_lineWidth: 1,
_strokeColor: cc.Color.BLACK,
_lineJoin: r.MITER,
_lineCap: n.BUTT,
_fillColor: cc.Color.WHITE,
_miterLimit: 10,
lineWidth: {
get: function() {
return this._lineWidth;
},
set: function(t) {
this._sgNode.lineWidth = this._lineWidth = t;
}
},
lineJoin: {
get: function() {
return this._lineJoin;
},
set: function(t) {
this._sgNode.lineJoin = this._lineJoin = t;
},
type: r
},
lineCap: {
get: function() {
return this._lineCap;
},
set: function(t) {
this._sgNode.lineCap = this._lineCap = t;
},
type: n
},
strokeColor: {
get: function() {
return this._strokeColor;
},
set: function(t) {
this._sgNode.strokeColor = this._strokeColor = t;
}
},
fillColor: {
get: function() {
return this._fillColor;
},
set: function(t) {
this._sgNode.fillColor = this._fillColor = t;
}
},
miterLimit: {
get: function() {
return this._miterLimit;
},
set: function(t) {
this._sgNode.miterLimit = this._miterLimit = t;
}
}
},
statics: {
LineJoin: r,
LineCap: n
},
_createSgNode: function() {
if (!_ccsg.GraphicsNode) {
var t = new _ccsg.Node(), e = function() {};
[ "moveTo", "lineTo", "bezierCurveTo", "quadraticCurveTo", "arc", "ellipse", "circle", "rect", "roundRect", "fillRect", "clear", "close", "stroke", "fill" ].forEach((function(i) {
t[i] = e;
}));
return t;
}
return new _ccsg.GraphicsNode();
},
_initSgNode: function() {
var t = this._sgNode;
t.lineWidth = this._lineWidth;
t.lineJoin = this._lineJoin;
t.lineCap = this._lineCap;
t.strokeColor = this._strokeColor;
t.fillColor = this._fillColor;
t.miterLimit = this._miterLimit;
t.setContentSize(this.node.getContentSize(!0));
},
moveTo: function(t, e) {
this._sgNode.moveTo(t, e);
},
lineTo: function(t, e) {
this._sgNode.lineTo(t, e);
},
bezierCurveTo: function(t, e, i, n, r, o) {
this._sgNode.bezierCurveTo(t, e, i, n, r, o);
},
quadraticCurveTo: function(t, e, i, n) {
this._sgNode.quadraticCurveTo(t, e, i, n);
},
arc: function(t, e, i, n, r, o) {
o = o || !1;
this._sgNode.arc(t, e, i, n, r, o);
},
ellipse: function(t, e, i, n) {
this._sgNode.ellipse(t, e, i, n);
},
circle: function(t, e, i) {
this._sgNode.circle(t, e, i);
},
rect: function(t, e, i, n) {
this._sgNode.rect(t, e, i, n);
},
roundRect: function(t, e, i, n, r) {
this._sgNode.roundRect(t, e, i, n, r);
},
fillRect: function(t, e, i, n) {
this._sgNode.fillRect(t, e, i, n);
},
clear: function(t) {
this._sgNode.clear(!!t);
},
close: function() {
this._sgNode.close();
},
stroke: function() {
this._sgNode.stroke();
},
fill: function() {
this._sgNode.fill();
}
});
cc.Graphics = e.exports = o;
}), {
"./types": 58
} ],
57: [ (function(t, e, i) {
"use strict";
var n;
if (n = _ccsg.GraphicsNode = cc.GraphicsNode) {
t("../utils/misc").propertyDefine(n, [ "lineWidth", "lineCap", "lineJoin", "miterLimit", "strokeColor", "fillColor" ], {});
}
t("./graphics");
}), {
"../utils/misc": 103,
"./graphics": 56,
"./graphics-node": 1
} ],
58: [ (function(t, e, i) {
"use strict";
var n = cc.Enum({
BUTT: 0,
ROUND: 1,
SQUARE: 2
}), r = cc.Enum({
BEVEL: 0,
ROUND: 1,
MITER: 2
});
e.exports = {
LineCap: n,
LineJoin: r
};
}), {} ],
59: [ (function(t, e, i) {
t("./platform");
t("./assets");
t("./CCNode");
t("./CCScene");
t("./components");
t("./graphics");
t("./collider");
t("./collider/CCIntersection");
t("./physics");
t("./camera/CCCamera");
t("./base-ui/CCWidgetManager");
}), {
"./CCNode": 16,
"./CCScene": 17,
"./assets": 29,
"./base-ui/CCWidgetManager": 30,
"./camera/CCCamera": 31,
"./collider": 1,
"./collider/CCIntersection": 1,
"./components": 47,
"./graphics": 57,
"./physics": 1,
"./platform": 90
} ],
60: [ (function(i, n, r) {
function o(i) {
var n, r, o;
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
r = i;
if (i.url) return r;
n = i.uuid;
} else {
r = {};
n = i;
}
o = r.type ? "uuid" === r.type : cc.AssetLibrary._getAssetUrl(n);
cc.AssetLibrary._getAssetInfoInRuntime(n, m);
r.url = o ? m.url : n;
if (m.url && "uuid" === r.type && m.raw) {
r.type = null;
r.isRawAsset = !0;
} else o || (r.isRawAsset = !0);
return r;
}
function s() {
var t = new l(), e = new h(), i = new f();
a.call(this, [ t, e, i ]);
this.assetLoader = t;
this.downloader = e;
this.loader = i;
this.onProgress = null;
this._autoReleaseSetting = {};
0;
}
var c = i("../platform/js"), a = i("./pipeline"), u = i("./loading-items"), l = i("./asset-loader"), h = i("./downloader"), f = i("./loader"), d = i("./asset-table"), _ = i("../platform/utils").callInNextTick, p = i("./auto-release-utils"), g = new d(), v = [ "mp3", "ogg", "wav", "m4a" ], m = {
url: null,
raw: !1
}, y = [], C = [];
c.extend(s, a);
var E = s.prototype;
E.init = function(t) {};
E.getXMLHttpRequest = function() {
return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
};
E.addDownloadHandlers = function(t) {
this.downloader.addHandlers(t);
};
E.addLoadHandlers = function(t) {
this.loader.addHandlers(t);
};
E.load = function(t, e, i) {
if (void 0 === i) {
i = e;
e = this.onProgress || null;
}
var n = this, r = !1;
if (!(t instanceof Array)) {
r = !0;
t = t ? [ t ] : [];
}
y.length = 0;
for (var s = 0; s < t.length; ++s) {
var c = t[s];
if (c && c.id) {
cc.warnID(4920, c.id);
c.uuid || c.url || (c.url = c.id);
}
var a = o(c);
if (a.url || a.uuid) {
var l = this._cache[a.url];
y.push(l || a);
}
}
var h = u.create(this, e, (function(t, e) {
_((function() {
if (i) {
if (r) {
var o = a.url;
i.call(n, e.getError(o), e.getContent(o));
} else i.call(n, t, e);
i = null;
}
e.destroy();
}));
}));
u.initQueueDeps(h);
h.append(y);
y.length = 0;
};
E.flowInDeps = function(t, e, i) {
C.length = 0;
for (var n = 0; n < e.length; ++n) {
var r = o(e[n]);
if (r.url || r.uuid) {
var s = this._cache[r.url];
s ? C.push(s) : C.push(r);
}
}
var c = u.create(this, t ? function(t, e, i) {
this._ownerQueue && this._ownerQueue.onProgress && this._ownerQueue._childOnProgress(i);
} : null, (function(e, n) {
i(e, n);
t && t.deps && (t.deps.length = 0);
n.destroy();
}));
if (t) {
var a = u.getQueue(t);
c._ownerQueue = a._ownerQueue || a;
}
var l = c.append(C, t);
C.length = 0;
return l;
};
E._resources = g;
E._getResUuid = function(t, e, i) {
if (!t) return null;
var n = t.indexOf("?");
-1 !== n && (t = t.substr(0, n));
var r = g.getUuid(t, e);
if (!r) {
var o = cc.path.extname(t);
if (o) {
t = t.slice(0, -o.length);
(r = g.getUuid(t, e)) && !i && cc.warnID(4901, t, o);
}
}
return r;
};
E._getReferenceKey = function(i) {
var n;
"object" === ("object" == (e = typeof i) ? t(i) : e) ? n = i._uuid || null : "string" === ("object" == (e = typeof i) ? t(i) : e) && (n = this._getResUuid(i, null, !0) || i);
if (!n) {
cc.warnID(4800, i);
return n;
}
cc.AssetLibrary._getAssetInfoInRuntime(n, m);
return this._cache[m.url] ? m.url : n;
};
E._urlNotFound = function(t, e, i) {
_((function() {
t = cc.url.normalize(t);
var n = (e ? c.getClassName(e) : "Asset") + ' in "resources/' + t + '" does not exist.';
i && i(new Error(n), []);
}));
};
E._parseLoadResArgs = function(t, e, i) {
if (void 0 === i) {
var n = cc.isChildClassOf(t, cc.RawAsset);
if (e) {
i = e;
n && (e = this.onProgress || null);
} else if (void 0 === e && !n) {
i = t;
e = this.onProgress || null;
t = null;
}
if (void 0 !== e && !n) {
e = t;
t = null;
}
}
return {
type: t,
onProgress: e,
onComplete: i
};
};
E.loadRes = function(t, e, i, n) {
var r = this._parseLoadResArgs(e, i, n);
e = r.type;
i = r.onProgress;
n = r.onComplete;
var o = this, s = o._getResUuid(t, e);
s ? this.load({
type: "uuid",
uuid: s
}, i, (function(t, e) {
e && o.setAutoReleaseRecursively(s, !1);
n && n(t, e);
})) : o._urlNotFound(t, e, n);
};
E._loadResUuids = function(t, e, i, n) {
if (t.length > 0) {
var r = this, o = t.map((function(t) {
return {
type: "uuid",
uuid: t
};
}));
this.load(o, e, (function(t, e) {
if (i) {
for (var s = [], c = n && [], a = 0; a < o.length; ++a) {
var u = o[a].uuid, l = this._getReferenceKey(u), h = e.getContent(l);
if (h) {
r.setAutoReleaseRecursively(u, !1);
s.push(h);
c && c.push(n[a]);
}
}
n ? i(t, s, c) : i(t, s);
}
}));
} else i && _((function() {
n ? i(null, [], []) : i(null, []);
}));
};
E.loadResArray = function(t, e, i, n) {
var r = this._parseLoadResArgs(e, i, n);
e = r.type;
i = r.onProgress;
n = r.onComplete;
for (var o = [], s = 0; s < t.length; s++) {
var c = t[s], a = this._getResUuid(c, e);
if (!a) {
this._urlNotFound(c, e, n);
return;
}
o.push(a);
}
this._loadResUuids(o, i, n);
};
E.loadResDir = function(t, e, i, n) {
var r = this._parseLoadResArgs(e, i, n);
e = r.type;
i = r.onProgress;
n = r.onComplete;
var o = [], s = g.getUuidArray(t, e, o);
this._loadResUuids(s, i, n, o);
};
E.getRes = function(t, e) {
var i = this._cache[t];
if (!i) {
var n = this._getResUuid(t, e, !0);
if (!n) return null;
var r = this._getReferenceKey(n);
i = this._cache[r];
}
i && i.alias && (i = i.alias);
return i && i.complete ? i.content : null;
};
E.getResCount = function() {
return Object.keys(this._cache).length;
};
E.getDependsRecursively = function(t) {
if (t) {
var e = this._getReferenceKey(t), i = p.getDependsRecursively(e);
i.push(e);
return i;
}
return [];
};
E.release = function(t) {
if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
var i = t[e];
this.release(i);
} else if (t) {
var n = this._getReferenceKey(t), r = this.getItem(n);
if (r) {
var o = this.removeItem(n);
if ((t = r.content) instanceof cc.Asset) {
t instanceof cc.SpriteFrame && o && t.release();
for (var s = t.rawUrls, c = 0; c < s.length; c++) this.release(s[c]);
} else t instanceof cc.Texture2D ? cc.textureCache.removeTextureForKey(r.rawUrl || r.url) : -1 !== v.indexOf(r.type) && cc.audioEngine.uncache(r.rawUrl || r.url);
0;
}
}
};
E.releaseAsset = function(t) {
var e = t._uuid;
e && this.release(e);
};
E.releaseRes = function(t, e) {
var i = this._getResUuid(t, e);
i ? this.release(i) : cc.errorID(4914, t);
};
E.releaseResDir = function(t, e) {
for (var i = g.getUuidArray(t, e), n = 0; n < i.length; n++) {
var r = i[n];
this.release(r);
}
};
E.releaseAll = function() {
for (var t in this._cache) this.release(t);
};
E.removeItem = function(t) {
var e = a.prototype.removeItem.call(this, t);
delete this._autoReleaseSetting[t];
return e;
};
E.setAutoRelease = function(t, e) {
var i = this._getReferenceKey(t);
i && (this._autoReleaseSetting[i] = !!e);
};
E.setAutoReleaseRecursively = function(t, e) {
e = !!e;
var i = this._getReferenceKey(t);
if (i) {
this._autoReleaseSetting[i] = e;
for (var n = p.getDependsRecursively(i), r = 0; r < n.length; r++) {
var o = n[r];
this._autoReleaseSetting[o] = e;
}
} else 0;
};
E.isAutoRelease = function(t) {
var e = this._getReferenceKey(t);
return !!e && !!this._autoReleaseSetting[e];
};
cc.loader = new s();
0;
n.exports = cc.loader;
}), {
"../platform/js": 93,
"../platform/utils": 97,
"./asset-loader": 61,
"./asset-table": 62,
"./auto-release-utils": 63,
"./downloader": 64,
"./loader": 67,
"./loading-items": 68,
"./pipeline": 71,
"./released-asset-checker": 72
} ],
61: [ (function(t, e, i) {
var n = t("../utils/CCPath"), r = t("./pipeline"), o = t("./loading-items"), s = function(t) {
this.id = "AssetLoader";
this.async = !0;
this.pipeline = null;
};
s.ID = "AssetLoader";
var c = [];
s.prototype.handle = function(t, e) {
var i = t.uuid;
if (!i) return t.content ? t.content : null;
cc.AssetLibrary.queryAssetInfo(i, (function(r, s, a) {
if (r) e(r); else {
t.url = t.rawUrl = s;
t.isRawAsset = a;
if (a) {
var u = n.extname(s).toLowerCase();
if (!u) {
e(new Error("Download Uuid: can not find type of raw asset[" + i + "]: " + s));
return;
}
u = u.substr(1);
var l = o.getQueue(t);
c[0] = {
queueId: t.queueId,
id: s,
url: s,
type: u,
error: null,
alias: t,
complete: !0
};
0;
l.append(c);
t.type = u;
e(null, t.content);
} else {
t.type = "uuid";
e(null, t.content);
}
}
}));
};
r.AssetLoader = e.exports = s;
}), {
"../utils/CCPath": 98,
"./loading-items": 68,
"./pipeline": 71
} ],
62: [ (function(t, e, i) {
function n() {
this._pathToUuid = {};
}
function r(t, e) {
if (t.length > e.length) {
var i = t.charCodeAt(e.length);
return 46 === i || 47 === i;
}
return !0;
}
var o = t("../utils/misc").pushToMap, s = n.prototype;
s.getUuid = function(t, e) {
t = cc.url.normalize(t);
var i = this._pathToUuid[t];
if (i) if (Array.isArray(i)) {
if (!e) return i[0].uuid;
for (var n = 0; n < i.length; n++) {
var r = i[n];
if (cc.isChildClassOf(r.type, e)) return r.uuid;
}
} else if (!e || cc.isChildClassOf(i.type, e)) return i.uuid;
return "";
};
s.getUuidArray = function(t, e, i) {
"/" === (t = cc.url.normalize(t))[t.length - 1] && (t = t.slice(0, -1));
var n = this._pathToUuid, o = [], s = cc.isChildClassOf;
for (var c in n) if (c.startsWith(t) && r(c, t) || !t) {
var a = n[c];
if (Array.isArray(a)) for (var u = 0; u < a.length; u++) {
var l = a[u];
if (!e || s(l.type, e)) {
o.push(l.uuid);
i && i.push(c);
}
} else if (!e || s(a.type, e)) {
o.push(a.uuid);
i && i.push(c);
}
}
return o;
};
s.add = function(t, e, i, n) {
t = t.substring(0, t.length - cc.path.extname(t).length);
var r = new function(t, e) {
this.uuid = t;
this.type = e;
}(e, i);
o(this._pathToUuid, t, r, n);
};
s._getInfo_DEBUG = !1;
s.reset = function() {
this._pathToUuid = {};
};
e.exports = n;
}), {
"../utils/misc": 103
} ],
63: [ (function(i, n, r) {
function o(t, e) {
var i = cc.loader.getItem(t);
if (i) {
var n = i.dependKeys;
if (n) for (var r = 0; r < n.length; r++) {
var s = n[r];
if (!e[s]) {
e[s] = !0;
o(s, e);
}
}
}
}
function s(t, e) {
var i = cc.loader._getReferenceKey(t);
if (!e[i]) {
e[i] = !0;
o(i, e);
}
}
function c(i, n) {
for (var r = Object.getOwnPropertyNames(i), o = 0; o < r.length; o++) {
var c = i[r[o]];
if ("object" === ("object" == (e = typeof c) ? t(c) : e) && c) if (Array.isArray(c)) for (var a = 0; a < c.length; a++) {
var u = c[a];
u instanceof cc.RawAsset && s(u, n);
} else if (c.constructor && c.constructor !== Object) c instanceof cc.RawAsset && s(c, n); else for (var l = Object.getOwnPropertyNames(c), h = 0; h < l.length; h++) {
var f = c[l[h]];
f instanceof cc.RawAsset && s(f, n);
}
}
}
function a(t, e) {
for (var i = 0; i < t._components.length; i++) c(t._components[i], e);
for (var n = 0; n < t._children.length; n++) a(t._children[n], e);
}
var u = i("../platform/js");
n.exports = {
autoRelease: function(t, e, i) {
var n = cc.loader._autoReleaseSetting, r = u.createMap();
if (e) for (var o = 0; o < e.length; o++) r[e[o]] = !0;
for (var s = 0; s < i.length; s++) a(i[s], r);
if (t) for (var c = 0; c < t.length; c++) {
var l = t[c];
!1 === n[l] || r[l] || cc.loader.release(l);
}
for (var h = Object.keys(n), f = 0; f < h.length; f++) {
var d = h[f];
!0 !== n[d] || r[d] || cc.loader.release(d);
}
},
getDependsRecursively: function(t) {
var e = {};
o(t, e);
return Object.keys(e);
}
};
}), {
"../platform/js": 93
} ],
64: [ (function(t, e, i) {
function n(t, e, i, r) {
void 0 === i && (i = !0);
var o = _(t.url);
r = r || l.imagePool.get();
i && "file:" !== window.location.protocol ? r.crossOrigin = "anonymous" : r.crossOrigin = null;
if (r.complete && r.naturalWidth > 0 && r.src === o) return r;
(function() {
function i() {
r.removeEventListener("load", i);
r.removeEventListener("error", s);
e(null, r);
}
function s() {
r.removeEventListener("load", i);
r.removeEventListener("error", s);
"https:" !== window.location.protocol && r.crossOrigin && "anonymous" === r.crossOrigin.toLowerCase() ? n(t, e, !1, r) : e(new Error("Load image (" + o + ") failed"));
}
r.addEventListener("load", i);
r.addEventListener("error", s);
r.src = o;
})();
}
function r(t, e, i) {
var n = document, r = document.createElement("style");
r.type = "text/css";
n.body.appendChild(r);
var o = "";
isNaN(t - 0) ? o += "@font-face { font-family:" + t + "; src:" : o += "@font-face { font-family:'" + t + "'; src:";
if (e instanceof Array) for (var s = 0, c = e.length; s < c; s++) {
var a = e[s];
i = u.extname(a).toLowerCase();
o += "url('" + e[s] + "') format('" + p[i] + "')";
o += s === c - 1 ? ";" : ",";
} else {
i = i.toLowerCase();
o += "url('" + e + "') format('" + p[i] + "');";
}
r.textContent += o + "}";
var l = document.createElement("div"), h = l.style;
h.fontFamily = t;
l.innerHTML = ".";
h.position = "absolute";
h.left = "-100px";
h.top = "-100px";
n.body.appendChild(l);
}
function o(t, e) {
var i = t.url, n = t.type, o = t.name, s = t.srcs;
if (o && s) {
-1 === s.indexOf(i) && s.push(i);
r(o, s);
} else {
n = u.extname(i);
r(o = u.basename(i, n), i, n);
}
if (!document.fonts) return null;
document.fonts.load("1em " + o).then((function() {
e(null, null);
}), (function(t) {
e(t);
}));
}
var s, c = t("../platform/js"), a = t("../platform/CCSys"), u = t("../utils/CCPath"), l = t("../utils/misc"), h = t("./pipeline"), f = t("./pack-downloader"), d = t("./text-downloader"), _ = t("./utils").urlAppendTimestamp, p = {
".eot": "embedded-opentype",
".ttf": "truetype",
".ttc": "truetype",
".woff": "woff",
".svg": "svg"
}, g = {
js: function(e, i, n) {
function r() {
u.parentNode.removeChild(u);
u.removeEventListener("load", r, !1);
u.removeEventListener("error", o, !1);
i(null, s);
}
function o() {
u.parentNode.removeChild(u);
u.removeEventListener("load", r, !1);
u.removeEventListener("error", o, !1);
i(new Error("Load " + s + " failed!"), s);
}
if (a.platform !== a.WECHAT_GAME) {
var s = e.url, c = document, u = document.createElement("script");
u.async = n;
u.src = _(s);
u.addEventListener("load", r, !1);
u.addEventListener("error", o, !1);
c.body.appendChild(u);
} else {
t(e.url);
i(null, e.url);
}
},
png: n,
jpg: n,
bmp: n,
jpeg: n,
gif: n,
ico: n,
tiff: n,
webp: function(t, e, i, r) {
return cc.sys.capabilities.webp ? n(t, e, i, r) : new Error("Load Webp ( " + t.url + " ) failed");
},
image: n,
mp3: s = t("./audio-downloader"),
ogg: s,
wav: s,
m4a: s,
txt: d,
xml: d,
vsh: d,
fsh: d,
atlas: d,
tmx: d,
tsx: d,
json: d,
ExportJson: d,
plist: d,
fnt: d,
font: o,
eot: o,
ttf: o,
woff: o,
svg: o,
ttc: o,
uuid: function(t, e) {
var i = f.load(t, e);
return void 0 === i ? this.extMap.json(t, e) : i || void 0;
},
default: d
}, v = function(t) {
this.id = "Downloader";
this.async = !0;
this.pipeline = null;
this._curConcurrent = 0;
this._loadQueue = [];
this.extMap = c.mixin(t, g);
};
v.ID = "Downloader";
v.PackDownloader = f;
v.prototype.addHandlers = function(t) {
c.mixin(this.extMap, t);
};
v.prototype._handleLoadQueue = function() {
for (;this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT; ) {
var t = this._loadQueue.shift();
if (!t) break;
var e = this.handle(t.item, t.callback);
void 0 !== e && (e instanceof Error ? t.callback(e) : t.callback(null, e));
}
};
v.prototype.handle = function(t, e) {
var i = this, n = this.extMap[t.type] || this.extMap.default, r = void 0;
if (this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT) {
this._curConcurrent++;
if (void 0 !== (r = n.call(this, t, (function(t, n) {
i._curConcurrent = Math.max(0, i._curConcurrent - 1);
i._handleLoadQueue();
e && e(t, n);
})))) {
this._curConcurrent = Math.max(0, this._curConcurrent - 1);
this._handleLoadQueue();
return r;
}
} else if (t.ignoreMaxConcurrency) {
if (void 0 !== (r = n.call(this, t, e))) return r;
} else this._loadQueue.push({
item: t,
callback: e
});
};
h.Downloader = e.exports = v;
}), {
"../platform/CCSys": 83,
"../platform/js": 93,
"../utils/CCPath": 98,
"../utils/misc": 103,
"./audio-downloader": 1,
"./pack-downloader": 70,
"./pipeline": 71,
"./text-downloader": 73,
"./utils": 74
} ],
65: [ (function(t, e, i) {
t("./downloader");
t("./loader");
t("./json-unpacker");
t("./loading-items");
t("./pipeline");
t("./CCLoader");
}), {
"./CCLoader": 60,
"./downloader": 64,
"./json-unpacker": 66,
"./loader": 67,
"./loading-items": 68,
"./pipeline": 71
} ],
66: [ (function(i, n, r) {
function o() {
this.jsons = {};
this.state = -1;
}
o.prototype.read = function(i, n) {
var r = "string" === ("object" == (e = typeof n) ? t(n) : e) ? JSON.parse(n) : n;
r.length !== i.length && cc.errorID(4915);
for (var o = 0; o < i.length; o++) {
var s = i[o], c = r[o];
this.jsons[s] = c;
}
};
o.prototype.retrieve = function(t) {
return this.jsons[t] || null;
};
0;
n.exports = o;
}), {} ],
67: [ (function(i, n, r) {
function o(i, n) {
if ("string" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("JSON Loader: Input item doesn't contain string content");
try {
return JSON.parse(i.content);
} catch (t) {
return new Error("JSON Loader: Parse json [" + i.id + "] failed : " + t);
}
}
function s(t, e) {
if (a.platform !== a.WECHAT_GAME && a.platform !== a.QQ_PLAY && !(t.content instanceof Image)) return new Error("Image Loader: Input item doesn't contain Image content");
var i = t.rawUrl, n = cc.textureCache.getTextureForKey(i) || new l();
n.url = i;
n.initWithElement(t.content);
n.handleLoadedTexture();
cc.textureCache.cacheImage(i, n);
return n;
}
var c = i("../platform/js"), a = i("../platform/CCSys"), u = i("./pipeline"), l = i("../textures/CCTexture2D"), h = i("./uuid-loader"), f = (i("../utils/misc"), 
{
png: s,
jpg: s,
bmp: s,
jpeg: s,
gif: s,
ico: s,
tiff: s,
webp: s,
image: s,
json: o,
ExportJson: o,
plist: function(i, n) {
if ("string" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("Plist Loader: Input item doesn't contain string content");
var r = cc.plistParser.parse(i.content);
return r || new Error("Plist Loader: Parse [" + i.id + "] failed");
},
uuid: h,
prefab: h,
fire: h,
scene: h,
default: function(t, e) {
return null;
}
}), d = function(t) {
this.id = "Loader";
this.async = !0;
this.pipeline = null;
this.extMap = c.mixin(t, f);
};
d.ID = "Loader";
d.prototype.addHandlers = function(t) {
this.extMap = c.mixin(this.extMap, t);
};
d.prototype.handle = function(t, e) {
return (this.extMap[t.type] || this.extMap.default).call(this, t, e);
};
u.Loader = n.exports = d;
}), {
"../platform/CCSys": 83,
"../platform/js": 93,
"../textures/CCTexture2D": 1,
"../utils/misc": 103,
"./pipeline": 71,
"./uuid-loader": 75
} ],
68: [ (function(i, n, r) {
function o(i) {
var n = i.url || i;
return "string" === ("object" == (e = typeof n) ? t(n) : e);
}
function s(i, n) {
var r = "object" === ("object" == (e = typeof i) ? t(i) : e) ? i.url : i, o = {
queueId: n,
id: r,
url: r,
rawUrl: void 0,
urlParam: (function(t) {
if (t) {
var e = t.split("?");
if (e && e[0] && e[1]) {
var i = {};
e[1].split("&").forEach((function(t) {
var e = t.split("=");
i[e[0]] = e[1];
}));
return i;
}
}
})(r),
type: "",
error: null,
content: null,
complete: !1,
states: {},
deps: null
};
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
l.mixin(o, i);
if (i.skips) for (var s = 0; s < i.skips.length; s++) {
var c = i.skips[s];
o.states[c] = _.COMPLETE;
}
}
o.rawUrl = o.url;
r && !o.type && (o.type = u.extname(r).toLowerCase().substr(1));
return o;
}
function c(t, e, i) {
if (!t || !e) return !1;
var n = !1;
g.push(e.id);
if (e.deps) {
var r, o, s = e.deps;
for (r = 0; r < s.length; r++) {
if ((o = s[r]).id === t.id) {
n = !0;
break;
}
if (!(g.indexOf(o.id) >= 0) && (o.deps && c(t, o, !0))) {
n = !0;
break;
}
}
}
i || (g.length = 0);
return n;
}
var a = i("../platform/callbacks-invoker"), u = i("../utils/CCPath"), l = i("../platform/js"), h = 0 | 998 * Math.random(), f = {}, d = [], _ = {
WORKING: 1,
COMPLETE: 2,
ERROR: 3
}, p = {}, g = [], v = function(t, e, i, n) {
a.call(this);
this._id = ++h;
f[this._id] = this;
this._pipeline = t;
this._errorUrls = [];
this._appending = !1;
this._ownerQueue = null;
this.onProgress = i;
this.onComplete = n;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
this._pipeline ? this.active = !0 : this.active = !1;
e && (e.length > 0 ? this.append(e) : this.allComplete());
};
v.ItemState = new cc.Enum(_);
v.create = function(i, n, r, o) {
if (void 0 === r) {
if ("function" === ("object" == (e = typeof n) ? t(n) : e)) {
o = n;
n = r = null;
}
} else if (void 0 === o) if ("function" === ("object" == (e = typeof n) ? t(n) : e)) {
o = r;
r = n;
n = null;
} else {
o = r;
r = null;
}
var s = d.pop();
if (s) {
s._pipeline = i;
s.onProgress = r;
s.onComplete = o;
f[s._id] = s;
s._pipeline && (s.active = !0);
n && s.append(n);
} else s = new v(i, n, r, o);
return s;
};
v.getQueue = function(t) {
return t.queueId ? f[t.queueId] : null;
};
v.itemComplete = function(t) {
var e = f[t.queueId];
e && e.itemComplete(t.id);
};
v.initQueueDeps = function(t) {
var e = p[t._id];
if (e) {
e.completed.length = 0;
e.deps.length = 0;
} else e = p[t._id] = {
completed: [],
deps: []
};
};
v.registerQueueDep = function(t, e) {
var i = t.queueId || t;
if (!i) return !1;
var n = p[i];
if (n) -1 === n.deps.indexOf(e) && n.deps.push(e); else if (t.id) for (var r in p) {
var o = p[r];
-1 !== o.deps.indexOf(t.id) && -1 === o.deps.indexOf(e) && o.deps.push(e);
}
};
v.finishDep = function(t) {
for (var e in p) {
var i = p[e];
-1 !== i.deps.indexOf(t) && -1 === i.completed.indexOf(t) && i.completed.push(t);
}
};
var m = v.prototype;
l.mixin(m, a.prototype);
m.append = function(t, e) {
if (!this.active) return [];
e && !e.deps && (e.deps = []);
this._appending = !0;
var i, n, r, a = [];
for (i = 0; i < t.length; ++i) if (!(n = t[i]).queueId || this.map[n.id]) {
if (o(n)) {
var u = (r = s(n, this._id)).id;
if (!this.map[u]) {
this.map[u] = r;
this.totalCount++;
e && e.deps.push(r);
v.registerQueueDep(e || this._id, u);
a.push(r);
}
}
} else {
this.map[n.id] = n;
e && e.deps.push(n);
if (n.complete || c(e, n)) {
this.totalCount++;
this.itemComplete(n.id);
continue;
}
var l = this, h = f[n.queueId];
if (h) {
this.totalCount++;
v.registerQueueDep(e || this._id, n.id);
h.addListener(n.id, (function(t) {
l.itemComplete(t.id);
}));
}
}
this._appending = !1;
this.completedCount === this.totalCount ? this.allComplete() : this._pipeline.flowIn(a);
return a;
};
m._childOnProgress = function(t) {
if (this.onProgress) {
var e = p[this._id];
this.onProgress(e ? e.completed.length : this.completedCount, e ? e.deps.length : this.totalCount, t);
}
};
m.allComplete = function() {
var t = 0 === this._errorUrls.length ? null : this._errorUrls;
this.onComplete && this.onComplete(t, this);
};
m.isCompleted = function() {
return this.completedCount >= this.totalCount;
};
m.isItemCompleted = function(t) {
return !!this.completed[t];
};
m.exists = function(t) {
return !!this.map[t];
};
m.getContent = function(t) {
var e = this.map[t], i = null;
e && (e.content ? i = e.content : e.alias && (i = e.alias.content));
return i;
};
m.getError = function(t) {
var e = this.map[t], i = null;
e && (e.error ? i = e.error : e.alias && (i = e.alias.error));
return i;
};
m.addListener = a.prototype.add;
m.hasListener = a.prototype.has;
m.removeListener = a.prototype.remove;
m.removeAllListeners = a.prototype.removeAll;
m.removeItem = function(t) {
var e = this.map[t];
if (e && this.completed[e.alias || t]) {
delete this.completed[t];
delete this.map[t];
if (e.alias) {
delete this.completed[e.alias.id];
delete this.map[e.alias.id];
}
this.completedCount--;
this.totalCount--;
}
};
m.itemComplete = function(t) {
var e = this.map[t];
if (e) {
var i = this._errorUrls.indexOf(t);
e.error && -1 === i ? this._errorUrls.push(t) : e.error || -1 === i || this._errorUrls.splice(i, 1);
this.completed[t] = e;
this.completedCount++;
v.finishDep(e.id);
if (this.onProgress) {
var n = p[this._id];
this.onProgress(n ? n.completed.length : this.completedCount, n ? n.deps.length : this.totalCount, e);
}
this.invoke(t, e);
this.removeAll(t);
!this._appending && this.completedCount >= this.totalCount && this.allComplete();
}
};
m.destroy = function() {
this.active = !1;
this._appending = !1;
this._pipeline = null;
this._ownerQueue = null;
this._errorUrls.length = 0;
this.onProgress = null;
this.onComplete = null;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
a.call(this);
f[this._id] = null;
if (p[this._id]) {
p[this._id].completed.length = 0;
p[this._id].deps.length = 0;
}
-1 === d.indexOf(this) && d.length < 10 && d.push(this);
};
cc.LoadingItems = n.exports = v;
}), {
"../platform/callbacks-invoker": 86,
"../platform/js": 93,
"../utils/CCPath": 98
} ],
69: [ (function(t, e, i) {
var n = t("./pipeline"), r = /(\.[^.\n\\/]*)$/, o = function(t, e, i) {
this.id = "MD5Pipe";
this.async = !1;
this.pipeline = null;
this.md5AssetsMap = t;
this.libraryBase = e;
this.rawAssetsBase = i;
};
o.ID = "MD5Pipe";
o.prototype.handle = function(t) {
t.url = this.transformURL(t.url);
return t;
};
o.prototype.transformURL = function(t) {
var e = t.indexOf("?"), i = t;
-1 !== e && (i = t.substr(0, e));
if (i.startsWith(this.libraryBase)) i = i.slice(this.libraryBase.length); else {
if (!i.startsWith(this.rawAssetsBase)) return t;
i = i.slice(this.rawAssetsBase.length);
}
var n = this.md5AssetsMap[i];
if (n) {
var o = !1;
t = t.replace(r, (function(t, e) {
o = !0;
return "." + n + e;
}));
o || (t = t + "." + n);
}
return t;
};
n.MD5Pipe = e.exports = o;
}), {
"./pipeline": 71
} ],
70: [ (function(t, e, i) {
function n(t, e) {
return new Error("Can not retrieve " + t + " from packer " + e);
}
var r = t("./json-unpacker"), o = t("../utils/misc").pushToMap, s = {}, c = {}, a = {}, u = 0, l = 2, h = 3;
e.exports = {
initPacks: function(t) {
c = t;
for (var e in t) for (var i = t[e], n = 0; n < i.length; n++) {
var r = i[n], a = 1 === i.length;
o(s, r, e, a);
}
},
_loadNewPack: function(t, e, i) {
var r = this, o = cc.AssetLibrary.getLibUrlNoExt(e) + ".json";
cc.loader.load({
url: o,
ignoreMaxConcurrency: !0
}, (function(o, s) {
if (o) {
cc.errorID(4916, t);
return i(o);
}
var c = r._doLoadNewPack(t, e, s);
c ? i(null, c) : i(n(t, e));
}));
},
_doPreload: function(t, e) {
var i = a[t];
i || (i = a[t] = new r());
if (i.state !== h) {
i.read(c[t], e);
i.state = h;
}
},
_doLoadNewPack: function(t, e, i) {
var n = a[e];
if (n.state !== h) {
n.read(c[e], i);
n.state = h;
}
return n.retrieve(t);
},
_selectLoadedPack: function(t) {
for (var e = u, i = "", n = 0; n < t.length; n++) {
var r = t[n], o = a[r];
if (o) {
var s = o.state;
if (s === h) return r;
if (s > e) {
e = s;
i = r;
}
}
}
return e !== u ? i : t[0];
},
load: function(t, e) {
var i = t.uuid, o = s[i];
if (o) {
Array.isArray(o) && (o = this._selectLoadedPack(o));
var c = a[o];
if (c && c.state === h) {
var u = c.retrieve(i);
return u || n(i, o);
}
if (!c) {
console.log("Create unpacker %s for %s", o, i);
(c = a[o] = new r()).state = l;
}
this._loadNewPack(i, o, e);
return null;
}
}
};
0;
}), {
"../utils/misc": 103,
"./json-unpacker": 66
} ],
71: [ (function(t, e, i) {
function n(t, e) {
var i = t.id, r = e.states[i], s = t.next, c = t.pipeline;
if (!e.error && r !== o.WORKING && r !== o.ERROR) if (r === o.COMPLETE) s ? n(s, e) : c.flowOut(e); else {
e.states[i] = o.WORKING;
var a = t.handle(e, (function(t, r) {
if (t) {
e.error = t;
e.states[i] = o.ERROR;
c.flowOut(e);
} else {
r && (e.content = r);
e.states[i] = o.COMPLETE;
s ? n(s, e) : c.flowOut(e);
}
}));
if (a instanceof Error) {
e.error = a;
e.states[i] = o.ERROR;
c.flowOut(e);
} else if (void 0 !== a) {
null !== a && (e.content = a);
e.states[i] = o.COMPLETE;
s ? n(s, e) : c.flowOut(e);
}
}
}
t("../platform/js");
var r = t("./loading-items"), o = r.ItemState, s = function(t) {
this._pipes = t;
this._cache = {};
for (var e = 0; e < t.length; ++e) {
var i = t[e];
if (i.handle && i.id) {
i.pipeline = this;
i.next = e < t.length - 1 ? t[e + 1] : null;
}
}
};
s.ItemState = o;
var c = s.prototype;
c.insertPipe = function(t, e) {
if (!t.handle || !t.id || e > this._pipes.length) cc.warnID(4921); else if (this._pipes.indexOf(t) > 0) cc.warnID(4922); else {
t.pipeline = this;
var i = null;
e < this._pipes.length && (i = this._pipes[e]);
var n = null;
e > 0 && (n = this._pipes[e - 1]);
n && (n.next = t);
t.next = i;
this._pipes.splice(e, 0, t);
}
};
c.insertPipeAfter = function(t, e) {
var i = this._pipes.indexOf(t);
i < 0 || this.insertPipe(e, i + 1);
};
c.appendPipe = function(t) {
if (t.handle && t.id) {
t.pipeline = this;
t.next = null;
this._pipes.length > 0 && (this._pipes[this._pipes.length - 1].next = t);
this._pipes.push(t);
}
};
c.flowIn = function(t) {
var e, i, r = this._pipes[0];
if (r) {
for (e = 0; e < t.length; e++) {
i = t[e];
this._cache[i.id] = i;
}
for (e = 0; e < t.length; e++) n(r, i = t[e]);
} else for (e = 0; e < t.length; e++) this.flowOut(t[e]);
};
c.flowInDeps = function(t, e, i) {
return r.create(this, (function(t, e) {
i(t, e);
e.destroy();
})).append(e, t);
};
c.flowOut = function(t) {
t.error ? delete this._cache[t.id] : this._cache[t.id] || (this._cache[t.id] = t);
t.complete = !0;
r.itemComplete(t);
};
c.copyItemStates = function(t, e) {
if (e instanceof Array) for (var i = 0; i < e.length; ++i) e[i].states = t.states; else e.states = t.states;
};
c.isFlowing = function() {
return !0;
};
c.getItems = function() {
return null;
};
c.getItem = function(t) {
var e = this._cache[t];
if (!e) return e;
e.alias && (e = e.alias);
return e;
};
c.removeItem = function(t) {
var e = this._cache[t];
e && e.complete && delete this._cache[t];
return e;
};
c.clear = function() {
for (var t in this._cache) {
var e = this._cache[t];
delete this._cache[t];
if (!e.complete) {
e.error = new Error("Canceled manually");
this.flowOut(e);
}
}
};
cc.Pipeline = e.exports = s;
}), {
"../platform/js": 93,
"./loading-items": 68
} ],
72: [ (function(t, e, i) {}), {
"../platform/js": 93
} ],
73: [ (function(i, n, r) {
i("../platform/CCSys");
n.exports = function(i, n) {
var r = i.url, o = jsb.fileUtils.getStringFromFile(r);
return "string" === ("object" == (e = typeof o) ? t(o) : e) && o ? o : new Error("Download text failed: " + r);
};
}), {
"../platform/CCSys": 83,
"./utils": 74
} ],
74: [ (function(i, n, r) {
var o = /\?/;
n.exports = {
urlAppendTimestamp: function(i) {
cc.game.config.noCache && "string" === ("object" == (e = typeof i) ? t(i) : e) && (o.test(i) ? i += "&_t=" + (new Date() - 0) : i += "?_t=" + (new Date() - 0));
return i;
}
};
}), {} ],
75: [ (function(i, n, r) {
function o(t) {
return t && (t[0] && "cc.Scene" === t[0].__type__ || t[1] && "cc.Scene" === t[1].__type__ || t[0] && "cc.Prefab" === t[0].__type__);
}
function s(i, n) {
0;
var r;
if ("string" === ("object" == (e = typeof i.content) ? t(i.content) : e)) try {
r = JSON.parse(i.content);
} catch (t) {
return new Error("Uuid Loader: Parse asset [" + i.id + "] failed : " + t.stack);
} else {
if ("object" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("JSON Loader: Input item doesn't contain string content");
r = i.content;
}
var s, u = o(r);
s = u ? cc._MissingScript.safeFindClass : function(t) {
var e = c._getClassById(t);
if (e) return e;
cc.warnID(4903, t);
return Object;
};
var l, h = cc.deserialize.Details.pool.get();
try {
l = cc.deserialize(r, h, {
classFinder: s,
target: i.existingAsset,
customEnv: i
});
} catch (t) {
cc.deserialize.Details.pool.put(h);
var f = t + "\n" + t.stack;
return new Error("Uuid Loader: Deserialize asset [" + i.id + "] failed : " + f);
}
l._uuid = i.uuid;
0;
(function(t, e, i, n, r, o) {
var s, c, u, l, h, f = n.uuidList, d = e.dependKeys = [];
if (r) {
s = [];
c = [];
u = [];
for (l = 0; l < f.length; l++) {
h = f[l];
var _ = n.uuidObjList[l], p = n.uuidPropList[l], g = cc.AssetLibrary._getAssetInfoInRuntime(h);
if (g.raw) {
var v = g.url;
_[p] = v;
d.push(v);
} else {
s.push(_);
c.push(p);
u.push({
type: "uuid",
uuid: h,
deferredLoadRaw: !0
});
}
}
} else {
s = n.uuidObjList;
c = n.uuidPropList;
u = new Array(f.length);
for (l = 0; l < f.length; l++) {
h = f[l];
u[l] = {
type: "uuid",
uuid: h
};
}
}
if (n.rawProp) {
s.push(i);
c.push(n.rawProp);
u.push(e.url);
}
if (i._preloadRawFiles) {
var m = o;
o = function() {
i._preloadRawFiles((function(t) {
m(t || null, i);
}));
};
}
if (0 === u.length) {
cc.deserialize.Details.pool.put(n);
return o(null, i);
}
e.content = i;
t.flowInDeps(e, u, (function(t, e) {
var r;
for (var l in e.map) (r = e.map[l]).uuid && r.content && (r.content._uuid = r.uuid);
for (var h = 0; h < u.length; h++) {
var f = u[h].uuid, _ = u[h].url, p = s[h], g = c[h];
if (r = e.map[_]) {
var v = {
obj: p,
prop: g
};
function m(t) {
var e = t.isRawAsset ? t.rawUrl : t.content;
this.obj[this.prop] = e;
t.uuid !== i._uuid && d.indexOf(t.id) < 0 && d.push(t.id);
}
if (r.complete || r.content) r.error ? cc._throw(r.error) : m.call(v, r); else {
var y = a.getQueue(r), C = y._callbackTable[f];
C ? C.unshift(m, v) : y.addListener(f, m, v);
}
}
}
cc.deserialize.Details.pool.put(n);
o(null, i);
}));
})(this.pipeline, i, l, h, !1, n);
}
var c = i("../platform/js");
i("../platform/deserialize");
var a = i("./loading-items");
n.exports = s;
s.isSceneObj = o;
}), {
"../platform/deserialize": 88,
"../platform/js": 93,
"./loading-items": 68
} ],
76: [ (function(i, n, r) {
function o(t, e, i) {
0;
e ? t._removeComponent(e) : u.array.removeAt(t._components, i);
}
function s() {
this._activatingStack = [];
}
var c = i("./component-scheduler"), a = i("./platform/CCObject").Flags, u = i("./platform/js"), l = a.IsPreloadStarted, h = a.IsOnLoadStarted, f = a.IsOnLoadCalled, d = a.Deactivating, _ = "c.onLoad();c._objFlags|=" + f, p = cc.Class({
extends: c.LifeCycleInvoker,
add: function(t) {
this._zero.array.push(t);
},
remove: function(t) {
this._zero.fastRemove(t);
},
cancelInactive: function(t) {
c.LifeCycleInvoker.stableRemoveInactive(this._zero, t);
},
invoke: function() {
this._invoke(this._zero);
this._zero.array.length = 0;
}
}), g = c.createInvokeImpl("c.__preload();"), v = c.createInvokeImpl(_), m = new u.Pool(4);
m.get = function() {
var t = this._get() || {
preload: new p(g),
onLoad: new c.OneOffInvoker(v),
onEnable: new c.OneOffInvoker(c.invokeOnEnable)
};
t.preload._zero.i = -1;
var e = t.onLoad;
e._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
(e = t.onEnable)._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
return t;
};
var y = cc.Class({
ctor: s,
reset: s,
_activateNodeRecursively: function(t, e, i, n) {
if (t._objFlags & d) cc.errorID(3816, t.name); else {
t._activeInHierarchy = !0;
for (var r = t._components.length, s = 0; s < r; ++s) {
var c = t._components[s];
if (c instanceof cc.Component) this.activateComp(c, e, i, n); else {
o(t, c, s);
--s;
--r;
}
}
for (var a = 0, u = t._children.length; a < u; ++a) {
var l = t._children[a];
l._active && this._activateNodeRecursively(l, e, i, n);
}
t._onPostActivated(!0);
}
},
_deactivateNodeRecursively: function(t) {
0;
t._objFlags |= d;
t._activeInHierarchy = !1;
for (var e = t._components.length, i = 0; i < e; ++i) {
var n = t._components[i];
if (n._enabled) {
cc.director._compScheduler.disableComp(n);
if (t._activeInHierarchy) {
t._objFlags &= ~d;
return;
}
}
}
for (var r = 0, o = t._children.length; r < o; ++r) {
var s = t._children[r];
if (s._activeInHierarchy) {
this._deactivateNodeRecursively(s);
if (t._activeInHierarchy) {
t._objFlags &= ~d;
return;
}
}
}
t._onPostActivated(!1);
t._objFlags &= ~d;
},
activateNode: function(t, e) {
if (e) {
var i = m.get();
this._activatingStack.push(i);
this._activateNodeRecursively(t, i.preload, i.onLoad, i.onEnable);
i.preload.invoke();
i.onLoad.invoke();
i.onEnable.invoke();
this._activatingStack.pop();
m.put(i);
} else {
this._deactivateNodeRecursively(t);
for (var n = this._activatingStack, r = 0; r < n.length; r++) {
var o = n[r];
o.preload.cancelInactive(l);
o.onLoad.cancelInactive(h);
o.onEnable.cancelInactive();
}
}
t.emit("active-in-hierarchy-changed", t);
},
activateComp: function(i, n, r, o) {
if (!(i._objFlags & l)) {
i._objFlags |= l;
"function" === ("object" == (e = typeof i.__preload) ? t(i.__preload) : e) && (n ? n.add(i) : i.__preload());
}
if (!(i._objFlags & h)) {
i._objFlags |= h;
if (i.onLoad) if (r) r.add(i); else {
i.onLoad();
i._objFlags |= f;
} else i._objFlags |= f;
}
if (i._enabled) {
if (!i.node._activeInHierarchy) return;
cc.director._compScheduler.enableComp(i, o);
}
},
destroyComp: function(t) {
cc.director._compScheduler.disableComp(t);
t.onDestroy && t._objFlags & f && t.onDestroy();
},
resetComp: !1
});
n.exports = y;
}), {
"./component-scheduler": 32,
"./platform/CCObject": 82,
"./platform/js": 93,
"./utils/misc": 103
} ],
77: [ (function(i, n, r) {
function o(t) {
return t && (t.constructor === cc.SceneAsset || t instanceof cc.Scene);
}
function s(t, e) {
this.url = t;
this.type = e;
}
var c = i("../assets/CCAsset"), a = i("./utils").callInNextTick, u = i("../load-pipeline/CCLoader"), l = i("../load-pipeline/pack-downloader"), h = i("../load-pipeline/auto-release-utils"), f = i("../utils/decode-uuid"), d = i("../load-pipeline/md5-pipe"), _ = "", p = "", g = {}, v = {
loadAsset: function(i, n, r) {
if ("string" !== ("object" == (e = typeof i) ? t(i) : e)) return a(n, new Error("[AssetLibrary] uuid must be string"), null);
var s = {
uuid: i,
type: "uuid"
};
r && r.existingAsset && (s.existingAsset = r.existingAsset);
u.load(s, (function(t, e) {
if (t || !e) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + (t ? t.message : "Unknown error")); else {
if (e.constructor === cc.SceneAsset) {
var r = cc.loader._getReferenceKey(i);
e.scene.dependAssets = h.getDependsRecursively(r);
}
if (o(e)) {
var s = cc.loader._getReferenceKey(i);
u.removeItem(s);
}
}
n && n(t, e);
}));
},
getLibUrlNoExt: function(t) {
t = f(t);
return _ + t.slice(0, 2) + "/" + t;
},
_queryAssetInfoInEditor: function(t, e) {
0;
},
_getAssetInfoInRuntime: function(t, e) {
e = e || {
url: null,
raw: !1
};
var i = g[t];
if (i && !cc.isChildClassOf(i.type, cc.Asset)) {
e.url = p + i.url;
e.raw = !0;
} else {
e.url = this.getLibUrlNoExt(t) + ".json";
e.raw = !1;
}
return e;
},
_getAssetUrl: function(t) {
var e = g[t];
return e ? p + e.url : null;
},
queryAssetInfo: function(t, e) {
var i = this._getAssetInfoInRuntime(t);
e(null, i.url, i.raw);
},
parseUuidInEditor: function(t) {},
loadJson: function(t, e) {
var i = "" + (new Date().getTime() + Math.random()), n = {
uuid: i,
type: "uuid",
content: t,
skips: [ u.assetLoader.id, u.downloader.id ]
};
u.load(n, (function(t, n) {
if (t) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + t.message); else {
if (n.constructor === cc.SceneAsset) {
var r = cc.loader._getReferenceKey(i);
n.scene.dependAssets = h.getDependsRecursively(r);
}
if (o(n)) {
var s = cc.loader._getReferenceKey(i);
u.removeItem(s);
}
}
n._uuid = "";
e && e(t, n);
}));
},
getAssetByUuid: function(t) {
return v._uuidToAsset[t] || null;
},
init: function(t) {
0;
var e = t.libraryPath;
e = e.replace(/\\/g, "/");
_ = cc.path.stripSep(e) + "/";
p = t.rawAssetsBase;
var i = t.md5AssetsMap;
if (i) {
var n = new d(i, _, p);
cc.loader.insertPipeAfter(cc.loader.assetLoader, n);
cc.loader.md5Pipe = n;
}
var r = u._resources;
r.reset();
var o = t.rawAssets;
if (o) {
for (var a in o) {
var h = o[a];
for (var f in h) {
var v = h[f], m = v[0], y = v[1], C = cc.js._getClassById(y);
if (C) {
g[f] = new s(a + "/" + m, C);
if ("assets" === a && m.startsWith("resources/")) {
if (cc.isChildClassOf(C, c)) {
var E = cc.path.extname(m);
m = E ? m.slice("resources/".length, -E.length) : m.slice("resources/".length);
} else m = m.slice("resources/".length);
var b = 1 === v[2];
r.add(m, f, C, !b);
}
} else cc.error("Cannot get", y);
}
}
}
t.packedAssets && l.initPacks(t.packedAssets);
var T = t.mountPaths;
T || (T = {
assets: p + "assets",
internal: p + "internal"
});
cc.url._init(T);
}
};
v._uuidToAsset = {};
n.exports = cc.AssetLibrary = v;
}), {
"../assets/CCAsset": 18,
"../load-pipeline/CCLoader": 60,
"../load-pipeline/auto-release-utils": 63,
"../load-pipeline/md5-pipe": 69,
"../load-pipeline/pack-downloader": 70,
"../utils/decode-uuid": 101,
"./utils": 97
} ],
78: [ (function(i, n, r) {
function o(t, e) {
t.indexOf(e) < 0 && t.push(e);
}
function s(t, e) {
0;
o(t.__props__, e);
}
function c(t, e, i, n, r) {
var o = n.default;
0;
b.setClassAttr(t, i, "default", o);
s(t, i);
var c = m(t, n, e, i, !1);
if (c) {
for (var a = x, u = 0; u < c.length; u++) {
var l = c[u];
b.attr(t, i, l);
l._onAfterProp && a.push(l._onAfterProp);
}
for (var h = 0; h < a.length; h++) a[h](t, i);
x.length = 0;
c.length = 0;
}
}
function a(t, e, i, n, r) {
var o = n.get, s = n.set, c = t.prototype, a = Object.getOwnPropertyDescriptor(c, i), u = !a;
if (o) {
0;
for (var l = m(t, n, e, i, !0), h = 0; h < l.length; h++) b.attr(t, i, l[h]);
l.length = 0;
b.setClassAttr(t, i, "serializable", !1);
0;
r || y.get(c, i, o, u, u);
0;
}
if (s) {
if (!r) {
0;
y.set(c, i, s, u, u);
}
0;
}
}
function u(i) {
return "function" === ("object" == (e = typeof i) ? t(i) : e) ? i() : i;
}
function l(t, e, i) {
for (var n in e) t.hasOwnProperty(n) || i && !i(n) || Object.defineProperty(t, n, y.getPropertyDescriptor(e, n));
}
function h(t, e, i, n) {
var r, s, c = n.__ctor__, a = n.ctor, u = n.__ES6__;
if (u) {
r = [ a ];
s = a;
} else {
r = c ? [ c ] : (function(t, e, i) {
function n(t) {
return v._isCCClass(t) ? t.__ctors__ || [] : [ t ];
}
for (var r = [], s = [ t ].concat(e), c = 0; c < s.length; c++) {
var a = s[c];
if (a) for (var u = n(a), l = 0; l < u.length; l++) o(r, u[l]);
}
var h = i.ctor;
h && r.push(h);
return r;
})(e, i, n);
s = w(r, e, t, n);
y.value(s, "extend", (function(t) {
t.extends = this;
return v(t);
}), !0);
}
y.value(s, "__ctors__", r.length > 0 ? r : null, !0);
var h = s.prototype;
if (e) {
if (!u) {
y.extend(s, e);
h = s.prototype;
}
y.value(s, "$super", e);
0;
}
if (i) {
for (var f = i.length - 1; f >= 0; f--) {
var d = i[f];
l(h, d.prototype);
l(s, d, (function(t) {
return d.hasOwnProperty(t) && !0;
}));
v._isCCClass(d) && l(b.getClassAttrs(s).constructor.prototype, b.getClassAttrs(d).constructor.prototype);
}
h.constructor = s;
}
u || (h.__initProps__ = _);
y.setClassName(t, s);
return s;
}
function f(i) {
for (var n = y.getClassName(i), r = i.constructor, o = "new " + n + "(", s = 0; s < r.__props__.length; s++) {
var c = i[r.__props__[s]];
if ("object" === ("object" == (e = typeof c) ? t(c) : e)) {
cc.errorID(3641, n);
return "new " + n + "()";
}
o += c;
s < r.__props__.length - 1 && (o += ",");
}
return o + ")";
}
function d(t) {
return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
function _(i) {
var n = b.getClassAttrs(i), r = i.__props__;
if (null === r) {
I.init();
r = i.__props__;
}
var o = (function(i, n) {
for (var r = [], o = "", s = 0; s < n.length; s++) {
var c = n[s], a = c + T + "default";
if (a in i) {
var u;
u = N.test(c) ? "this." + c + "=" : "this[" + d(c) + "]=";
var l, h = i[a];
if ("object" === ("object" == (e = typeof h) ? t(h) : e) && h) l = h instanceof cc.ValueType ? f(h) : Array.isArray(h) ? "[]" : "{}"; else if ("function" === ("object" == (e = typeof h) ? t(h) : e)) {
var _ = r.length;
r.push(h);
l = "F[" + _ + "]()";
} else l = "string" === ("object" == (e = typeof h) ? t(h) : e) ? d(h) : h;
o += u = u + l + ";\n";
}
}
return 0 === r.length ? Function(o) : Function("F", "return (function(){\n" + o + "})")(r);
})(n, r);
i.prototype.__initProps__ = o;
o.call(this);
}
function p(i, n, r) {
var o = !1;
for (var s in n) if (!(O.indexOf(s) >= 0)) {
var c = n[s];
if ("function" === ("object" == (e = typeof c) ? t(c) : e)) {
var a = y.getPropertyDescriptor(i.prototype, s);
if (a) {
var u = a.value;
if ("function" === ("object" == (e = typeof u) ? t(u) : e)) {
if (R.test(c)) {
o = !0;
n[s] = (function(t, e) {
return function() {
var i = this._super;
this._super = t;
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(u, c);
}
continue;
}
}
0;
}
}
return o;
}
function g(t, e, i, n, r, o) {
t.__props__ = [];
n && n.__props__ && (t.__props__ = n.__props__.slice());
if (r) for (var s = 0; s < r.length; ++s) {
var u = r[s];
u.__props__ && (t.__props__ = t.__props__.concat(u.__props__.filter((function(e) {
return t.__props__.indexOf(e) < 0;
}))));
}
if (i) {
A.preprocessAttrs(i, e, t, o);
for (var l in i) {
var h = i[l];
"default" in h ? c(t, e, l, h) : a(t, e, l, h, o);
}
}
}
function v(i) {
var n = (i = i || {}).name, r = i.extends, o = i.mixins, s = (function(t, e, i, n) {
var r = cc.Component, o = cc._RF.peek();
if (o && cc.isChildClassOf(e, r)) {
if (cc.isChildClassOf(o.cls, r)) {
cc.errorID(3615);
return null;
}
t = t || o.script;
}
var s = h(t, e, i, n);
if (o) if (cc.isChildClassOf(e, r)) {
var c = o.uuid;
c && y._setClassId(c, s);
o.cls = s;
} else cc.isChildClassOf(o.cls, r) || (o.cls = s);
return s;
})(n, r, o, i);
n || (n = cc.js.getClassName(s));
s._sealed = !0;
r && (r._sealed = !1);
var c = i.properties;
if ("function" === ("object" == (e = typeof c) ? t(c) : e) || r && null === r.__props__ || o && o.some((function(t) {
return null === t.__props__;
}))) {
I.push({
cls: s,
props: c,
mixins: o
});
s.__props__ = null;
} else g(s, n, c, r, i.mixins, i.__ES6__);
var a = i.statics;
if (a) {
var u;
0;
for (u in a) s[u] = a[u];
}
for (var l in i) if (!(O.indexOf(l) >= 0)) {
var f = i[l];
A.validateMethodWithProps(f, l, n, s, r) && y.value(s.prototype, l, f, !0, !0);
}
var d = i.editor;
d && cc.isChildClassOf(r, cc.Component) && cc.Component._registerEditorProps(s, d);
return s;
}
function m(i, n, r, o, s) {
function c() {
l = o + T;
return u = b.getClassAttrsProto(i);
}
function a(i, r) {
if (i in n) {
var o = n[i];
("object" == (e = typeof o) ? t(o) : e) === r && ((u || c())[l + i] = o);
}
}
var u = null, l = "";
P.length = 0;
var h = P, f = n.type;
if (f) {
var d = L[f];
if (d) h.push({
type: f,
_onAfterProp: S(d, "cc." + f)
}); else if ("Object" === f) 0; else if (f === b.ScriptUuid) {
var _ = b.ObjectType(cc.ScriptAsset);
_.type = "Script";
h.push(_);
} else "object" === ("object" == (e = typeof f) ? t(f) : e) ? C.isEnum(f) && h.push({
type: "Enum",
enumList: C.getList(f)
}) : "function" === ("object" == (e = typeof f) ? t(f) : e) && (n.url ? h.push({
type: "Object",
ctor: f,
_onAfterProp: S("String", "cc.String")
}) : h.push(n._short ? {
type: "Object",
ctor: f
} : b.ObjectType(f)));
}
n.editorOnly && ((u || c())[l + "editorOnly"] = !0);
0;
n.url && ((u || c())[l + "saveUrlAsAsset"] = !0);
!1 === n.serializable && ((u || c())[l + "serializable"] = !1);
a("formerlySerializedAs", "string");
0;
var p = n.range;
if (p) if (Array.isArray(p)) if (p.length >= 2) {
(u || c())[l + "min"] = p[0];
u[l + "max"] = p[1];
p.length > 2 && (u[l + "step"] = p[2]);
} else 0; else 0;
a("min", "number");
a("max", "number");
a("step", "number");
return h;
}
var y = i("./js"), C = i("./CCEnum"), E = i("./utils"), b = (E.isPlainEmptyObj_DEV, 
E.cloneable_DEV, i("./attribute")), T = b.DELIMETER, S = b.getTypeChecker, A = i("./preprocess-class");
i("./requiring-frame");
var O = [ "name", "extends", "mixins", "ctor", "__ctor__", "properties", "statics", "editor", "__ES6__" ], I = {
datas: null,
push: function(t) {
if (this.datas) this.datas.push(t); else {
this.datas = [ t ];
var e = this;
setTimeout((function() {
e.init();
}), 0);
}
},
init: function() {
var i = this.datas;
if (i) {
for (var n = 0; n < i.length; ++n) {
var r = i[n], o = r.cls, s = r.props;
"function" === ("object" == (e = typeof s) ? t(s) : e) && (s = s());
var c = y.getClassName(o);
s ? g(o, c, s, o.$super, r.mixins) : cc.errorID(3633, c);
}
this.datas = null;
}
}
}, x = [], N = /^[$A-Za-z_][0-9A-Za-z_$]*$/, w = function(t, e, i, n) {
var r = "return function CCClass(){\n";
e && p(e, n) && (r += "this._super=null;\n");
r += "this.__initProps__(CCClass);\n";
var o = t.length;
if (o > 0) {
var s = !(i && i.startsWith("cc."));
s && (r += "try{\n");
var c = "].apply(this,arguments);\n";
if (1 === o) r += "CCClass.__ctors__[0" + c; else {
r += "var cs=CCClass.__ctors__;\n";
for (var a = 0; a < o; a++) r += "cs[" + a + c;
}
s && (r += "}catch(e){\ncc._throw(e);\n}\n");
}
r += "}";
return Function(r)();
}, R = /xyz/.test((function() {
xyz;
})) ? /\b\._super\b/ : /.*/;
/xyz/.test((function() {
xyz;
}));
v._isCCClass = function(t) {
return t && t.hasOwnProperty("__ctors__");
};
v._fastDefine = function(t, e, i) {
y.setClassName(t, e);
for (var n = e.__props__ = Object.keys(i), r = b.getClassAttrsProto(e), o = 0; o < n.length; o++) {
var s = n[o];
r[s + T + "visible"] = !1;
r[s + T + "default"] = i[s];
}
};
v.Attr = b;
v.attr = b.attr;
cc.isChildClassOf = function(i, n) {
if (i && n) {
if ("function" !== ("object" == (e = typeof i) ? t(i) : e)) return !1;
if ("function" !== ("object" == (e = typeof n) ? t(n) : e)) {
0;
return !1;
}
if (i === n) return !0;
for (;;) {
if (!(i = y.getSuper(i))) return !1;
if (i === n) return !0;
}
}
return !1;
};
v.getInheritanceChain = function(t) {
for (var e = []; t = y.getSuper(t); ) t !== Object && e.push(t);
return e;
};
var L = {
Integer: "Number",
Float: "Number",
Boolean: "Boolean",
String: "String"
}, P = [];
cc.Class = v;
n.exports = {
isArray: function(t) {
t = u(t);
return Array.isArray(t);
},
fastDefine: v._fastDefine,
getNewValueTypeCode: f,
IDENTIFIER_RE: N,
escapeForJS: d,
getDefault: u
};
0;
}), {
"./CCEnum": 80,
"./attribute": 85,
"./js": 93,
"./preprocess-class": 94,
"./requiring-frame": 95,
"./utils": 97
} ],
79: [ (function(i, n, r) {
function o(t) {
return t;
}
function s(t, e) {
return t[e] || (t[e] = {});
}
function c(i) {
return function(n) {
return "function" === ("object" == (e = typeof n) ? t(n) : e) ? i(n) : function(t) {
return i(t, n);
};
};
}
function a(t, e, i) {
return function(t) {
0;
return function(i) {
return e(i, t);
};
};
}
function u(t) {
return a.bind(null, !1);
}
function l(t, e) {
0;
return s(t, g);
}
function h(i, n, r, o, s, c) {
var a = o && (_.getFullFormOfProperty(o) || o), u = n[r], l = p.mixin(u || {}, a || {});
if (s && (s.get || s.set)) {
s.get && (l.get = s.get);
s.set && (l.set = s.set);
} else {
0;
var h = void 0;
if (s) {
if (s.initializer) {
h = (function(i) {
var n;
try {
n = i();
} catch (t) {
return i;
}
return "object" !== ("object" == (e = typeof n) ? t(n) : e) || null === n ? n : i;
})(s.initializer);
!0;
}
} else {
var f = c.default || (c.default = (function(t) {
var e;
try {
e = new t();
} catch (t) {
return {};
}
return e;
})(i));
if (f.hasOwnProperty(r)) {
h = f[r];
!0;
}
}
0;
l.default = h;
}
n[r] = l;
}
function f(t, e, i) {
return t((function(t, n) {
var r = l(t);
if (r) {
var o = void 0 !== i ? i : n;
s(s(r, "proto"), "editor")[e] = o;
}
}), e);
}
function d(t) {
return t(o);
}
i("./CCClass");
var _ = i("./preprocess-class"), p = i("./js"), g = "__ccclassCache__", v = a.bind(null, !1), m = u(), y = u(), C = c((function(t, e) {
var i = p.getSuper(t);
i === Object && (i = null);
var n = {
name: e,
extends: i,
ctor: t,
__ES6__: !0
}, r = t[g];
if (r) {
var o = r.proto;
o && p.mixin(n, o);
t[g] = void 0;
}
return cc.Class(n);
})), E = d(c), b = f(v, "requireComponent"), T = d(m), S = f(y, "executionOrder"), A = d(c), O = d(c), I = d(m), x = d(m), N = d(m);
cc._decorator = n.exports = {
ccclass: C,
property: function(i, n, r) {
function o(t, e, i) {
var n = l(t.constructor);
if (n) {
var r = s(s(n, "proto"), "properties");
h(t.constructor, r, e, c, i, n);
}
}
var c = null;
if ("undefined" === ("object" == (e = typeof n) ? t(n) : e)) {
c = i;
return o;
}
o(i, n, r);
},
executeInEditMode: E,
requireComponent: b,
menu: T,
executionOrder: S,
disallowMultiple: A,
playOnFocus: O,
inspector: I,
icon: x,
help: N,
mixins: function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
return function(e) {
var i = l(e);
i && (s(i, "proto").mixins = t);
};
}
};
}), {
"./CCClass": 78,
"./js": 93,
"./preprocess-class": 94,
"./utils": 97
} ],
80: [ (function(i, n, r) {
function o(i) {
if ("__enums__" in i) return i;
s.value(i, "__enums__", null, !0);
for (var n = -1, r = Object.keys(i), o = 0; o < r.length; o++) {
var c = r[o], a = i[c];
if (-1 === a) {
a = ++n;
i[c] = a;
} else if ("number" === ("object" == (e = typeof a) ? t(a) : e)) n = a; else if ("string" === ("object" == (e = typeof a) ? t(a) : e) && Number.isInteger(parseFloat(c))) continue;
var u = "" + a;
if (c !== u) {
0;
s.value(i, u, c);
}
}
return i;
}
var s = i("./js");
o.isEnum = function(t) {
return t && t.hasOwnProperty("__enums__");
};
o.getList = function(t) {
if (t.__enums__) return t.__enums__;
var e = t.__enums__ = [];
for (var i in t) {
var n = t[i];
Number.isInteger(n) && e.push({
name: i,
value: n
});
}
e.sort((function(t, e) {
return t.value - e.value;
}));
return e;
};
n.exports = cc.Enum = o;
}), {
"./js": 93
} ],
81: [ (function(t, e, i) {
t("./_CCClass");
cc.KEY = {
none: 0,
back: 6,
menu: 18,
backspace: 8,
tab: 9,
enter: 13,
shift: 16,
ctrl: 17,
alt: 18,
pause: 19,
capslock: 20,
escape: 27,
space: 32,
pageup: 33,
pagedown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40,
select: 41,
insert: 45,
Delete: 46,
0: 48,
1: 49,
2: 50,
3: 51,
4: 52,
5: 53,
6: 54,
7: 55,
8: 56,
9: 57,
a: 65,
b: 66,
c: 67,
d: 68,
e: 69,
f: 70,
g: 71,
h: 72,
i: 73,
j: 74,
k: 75,
l: 76,
m: 77,
n: 78,
o: 79,
p: 80,
q: 81,
r: 82,
s: 83,
t: 84,
u: 85,
v: 86,
w: 87,
x: 88,
y: 89,
z: 90,
num0: 96,
num1: 97,
num2: 98,
num3: 99,
num4: 100,
num5: 101,
num6: 102,
num7: 103,
num8: 104,
num9: 105,
"*": 106,
"+": 107,
"-": 109,
numdel: 110,
"/": 111,
f1: 112,
f2: 113,
f3: 114,
f4: 115,
f5: 116,
f6: 117,
f7: 118,
f8: 119,
f9: 120,
f10: 121,
f11: 122,
f12: 123,
numlock: 144,
scrolllock: 145,
";": 186,
semicolon: 186,
equal: 187,
"=": 187,
",": 188,
comma: 188,
dash: 189,
".": 190,
period: 190,
forwardslash: 191,
grave: 192,
"[": 219,
openbracket: 219,
backslash: 220,
"]": 221,
closebracket: 221,
quote: 222,
dpadLeft: 1e3,
dpadRight: 1001,
dpadUp: 1003,
dpadDown: 1004,
dpadCenter: 1005
};
cc.ImageFormat = cc.Enum({
JPG: 0,
PNG: 1,
TIFF: 2,
WEBP: 3,
PVR: 4,
ETC: 5,
S3TC: 6,
ATITC: 7,
TGA: 8,
RAWDATA: 9,
UNKNOWN: 10
});
cc.getImageFormatByData = function(t) {
return t.length > 8 && 137 === t[0] && 80 === t[1] && 78 === t[2] && 71 === t[3] && 13 === t[4] && 10 === t[5] && 26 === t[6] && 10 === t[7] ? cc.ImageFormat.PNG : t.length > 2 && (73 === t[0] && 73 === t[1] || 77 === t[0] && 77 === t[1] || 255 === t[0] && 216 === t[1]) ? cc.ImageFormat.TIFF : cc.ImageFormat.UNKNOWN;
};
cc.macro = {
INVALID_INDEX: -1,
NODE_TAG_INVALID: -1,
PI: Math.PI,
PI2: 2 * Math.PI,
FLT_MAX: parseFloat("3.402823466e+38F"),
FLT_MIN: parseFloat("1.175494351e-38F"),
RAD: Math.PI / 180,
DEG: 180 / Math.PI,
UINT_MAX: 4294967295,
REPEAT_FOREVER: 4294967295,
FLT_EPSILON: 1.192092896e-7,
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_ALPHA_SATURATE: 776,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775,
ONE_MINUS_CONSTANT_ALPHA: 32772,
ONE_MINUS_CONSTANT_COLOR: 32770,
LINEAR: 9729,
BLEND_DST: 771,
WEB_ORIENTATION_PORTRAIT: 0,
WEB_ORIENTATION_LANDSCAPE_LEFT: -90,
WEB_ORIENTATION_PORTRAIT_UPSIDE_DOWN: 180,
WEB_ORIENTATION_LANDSCAPE_RIGHT: 90,
ORIENTATION_PORTRAIT: 1,
ORIENTATION_LANDSCAPE: 2,
ORIENTATION_AUTO: 3,
DENSITYDPI_DEVICE: "device-dpi",
DENSITYDPI_HIGH: "high-dpi",
DENSITYDPI_MEDIUM: "medium-dpi",
DENSITYDPI_LOW: "low-dpi",
VERTEX_ATTRIB_FLAG_NONE: 0,
VERTEX_ATTRIB_FLAG_POSITION: 1,
VERTEX_ATTRIB_FLAG_COLOR: 2,
VERTEX_ATTRIB_FLAG_TEX_COORDS: 4,
VERTEX_ATTRIB_FLAG_POS_COLOR_TEX: 7,
GL_ALL: 0,
VERTEX_ATTRIB_POSITION: 0,
VERTEX_ATTRIB_COLOR: 1,
VERTEX_ATTRIB_TEX_COORDS: 2,
VERTEX_ATTRIB_MAX: 3,
UNIFORM_PMATRIX: 0,
UNIFORM_MVMATRIX: 1,
UNIFORM_MVPMATRIX: 2,
UNIFORM_TIME: 3,
UNIFORM_SINTIME: 4,
UNIFORM_COSTIME: 5,
UNIFORM_RANDOM01: 6,
UNIFORM_SAMPLER: 7,
UNIFORM_MAX: 8,
SHADER_POSITION_TEXTURECOLOR: "ShaderPositionTextureColor",
SHADER_SPRITE_POSITION_TEXTURECOLOR: "ShaderSpritePositionTextureColor",
SHADER_POSITION_TEXTURECOLORALPHATEST: "ShaderPositionTextureColorAlphaTest",
SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST: "ShaderSpritePositionTextureColorAlphaTest",
SHADER_POSITION_COLOR: "ShaderPositionColor",
SHADER_SPRITE_POSITION_COLOR: "ShaderSpritePositionColor",
SHADER_POSITION_TEXTURE: "ShaderPositionTexture",
SHADER_POSITION_TEXTURE_UCOLOR: "ShaderPositionTexture_uColor",
SHADER_POSITION_TEXTUREA8COLOR: "ShaderPositionTextureA8Color",
SHADER_POSITION_UCOLOR: "ShaderPosition_uColor",
SHADER_POSITION_LENGTHTEXTURECOLOR: "ShaderPositionLengthTextureColor",
UNIFORM_PMATRIX_S: "CC_PMatrix",
UNIFORM_MVMATRIX_S: "CC_MVMatrix",
UNIFORM_MVPMATRIX_S: "CC_MVPMatrix",
UNIFORM_TIME_S: "CC_Time",
UNIFORM_SINTIME_S: "CC_SinTime",
UNIFORM_COSTIME_S: "CC_CosTime",
UNIFORM_RANDOM01_S: "CC_Random01",
UNIFORM_SAMPLER_S: "CC_Texture0",
UNIFORM_ALPHA_TEST_VALUE_S: "CC_alpha_value",
ATTRIBUTE_NAME_COLOR: "a_color",
ATTRIBUTE_NAME_POSITION: "a_position",
ATTRIBUTE_NAME_TEX_COORD: "a_texCoord",
ITEM_SIZE: 32,
CURRENT_ITEM: 3233828865,
ZOOM_ACTION_TAG: 3233828866,
NORMAL_TAG: 8801,
SELECTED_TAG: 8802,
DISABLE_TAG: 8803,
FIX_ARTIFACTS_BY_STRECHING_TEXEL: 0,
FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: 1,
DIRECTOR_STATS_POSITION: cc.p(0, 0),
DIRECTOR_FPS_INTERVAL: .5,
COCOSNODE_RENDER_SUBPIXEL: 1,
SPRITEBATCHNODE_RENDER_SUBPIXEL: 1,
AUTO_PREMULTIPLIED_ALPHA_FOR_PNG: 0,
OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA: 0,
TEXTURE_NPOT_SUPPORT: 0,
USE_LA88_LABELS: 1,
SPRITE_DEBUG_DRAW: 0,
LABELBMFONT_DEBUG_DRAW: 0,
LABELATLAS_DEBUG_DRAW: 0,
ENABLE_STACKABLE_ACTIONS: 1,
ENABLE_GL_STATE_CACHE: 1,
TOUCH_TIMEOUT: 5e3,
BATCH_VERTEX_COUNT: 2e4,
ENABLE_GC_FOR_NATIVE_OBJECTS: !0,
ENABLE_TILEDMAP_CULLING: !0,
DOWNLOAD_MAX_CONCURRENT: 64,
ENABLE_TRANSPARENT_CANVAS: !1,
ENABLE_WEBGL_ANTIALIAS: !1
};
var n = !0;
cc.defineGetterSetter(cc.macro, "ENABLE_CULLING", (function() {
return n;
}), (function(t) {
n = t;
var e = cc.director.getScene();
if (e) {
e._sgNode.markCullingDirty();
cc.director.setCullingEnabled(t);
}
}));
cc.defineGetterSetter(cc.macro, "BLEND_SRC", (function() {
return cc._renderType === cc.game.RENDER_TYPE_WEBGL && cc.macro.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? cc.macro.ONE : cc.macro.SRC_ALPHA;
}));
cc.lerp = function(t, e, i) {
return t + (e - t) * i;
};
cc.rand = function() {
return 16777215 * Math.random();
};
cc.randomMinus1To1 = function() {
return 2 * (Math.random() - .5);
};
cc.random0To1 = Math.random;
cc.degreesToRadians = function(t) {
return t * cc.macro.RAD;
};
cc.radiansToDegrees = function(t) {
return t * cc.macro.DEG;
};
cc.nodeDrawSetup = function(t) {
if (t._shaderProgram) {
t._shaderProgram.use();
t._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
}
};
cc.incrementGLDraws = function(t) {
cc.g_NumberOfDraws += t;
};
cc.checkGLErrorDebug = function() {
if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
var t = cc._renderContext.getError();
t && cc.logID(2400, t);
}
};
e.exports = cc.macro;
}), {
"./_CCClass": 84
} ],
82: [ (function(i, n, r) {
function o() {
this._name = "";
this._objFlags = 0;
}
function s() {
for (var t = l.length, e = 0; e < t; ++e) {
var i = l[e];
i._objFlags & u || i._destroyImmediate();
}
t === l.length ? l.length = 0 : l.splice(0, t);
0;
}
var c = i("./js"), a = i("./CCClass"), u = 1;
a.fastDefine("cc.Object", o, {
_name: "",
_objFlags: 0
});
c.value(o, "Flags", {
Destroyed: u,
DontSave: 8,
EditorOnly: 16,
Dirty: 32,
DontDestroy: 64,
PersistentMask: -4192741,
Destroying: 128,
Deactivating: 256,
IsPreloadStarted: 8192,
IsOnLoadStarted: 32768,
IsOnLoadCalled: 16384,
IsOnEnableCalled: 2048,
IsStartCalled: 65536,
IsEditorOnEnableCalled: 4096,
IsPositionLocked: 1 << 21,
IsRotationLocked: 1 << 17,
IsScaleLocked: 1 << 18,
IsAnchorLocked: 1 << 19,
IsSizeLocked: 1 << 20
});
var l = [];
c.value(o, "_deferredDestroy", s);
0;
var h = o.prototype;
c.getset(h, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}));
c.get(h, "isValid", (function() {
return !(this._objFlags & u);
}));
0;
h.destroy = function() {
if (this._objFlags & u) {
cc.warnID(5e3);
return !1;
}
if (4 & this._objFlags) return !1;
this._objFlags |= 4;
l.push(this);
0;
return !0;
};
0;
h._destruct = function() {
var i = this.constructor, n = i.__destruct__;
if (!n) {
n = (function(i, n) {
var r, o = {};
for (r in i) if (i.hasOwnProperty(r)) switch ("object" == (e = typeof i[r]) ? t(i[r]) : e) {
case "string":
o[r] = "";
break;

case "object":
case "function":
o[r] = null;
}
if (cc.Class._isCCClass(n)) for (var s = cc.Class.Attr.getClassAttrs(n), c = n.__props__, u = 0; u < c.length; u++) {
var l = (r = c[u]) + cc.Class.Attr.DELIMETER + "default";
if (l in s) switch ("object" == (e = typeof s[l]) ? t(s[l]) : e) {
case "string":
o[r] = "";
break;

case "object":
case "function":
o[r] = null;
break;

case "undefined":
o[r] = void 0;
}
}
var h = i instanceof cc._BaseNode || i instanceof cc.Component, f = "";
for (r in o) if (!h || "_id" !== r) {
var d;
d = a.IDENTIFIER_RE.test(r) ? "o." + r + "=" : "o[" + a.escapeForJS(r) + "]=";
var _ = o[r];
"" === _ && (_ = '""');
f += d + _ + ";\n";
}
return Function("o", f);
})(this, i);
c.value(i, "__destruct__", n, !0);
}
n(this);
};
h._onPreDestroy = null;
h._destroyImmediate = function() {
if (this._objFlags & u) cc.errorID(5e3); else {
this._onPreDestroy && this._onPreDestroy();
this._destruct();
this._objFlags |= u;
}
};
0;
h._deserialize = null;
cc.isValid = function(i, n) {
return "object" === ("object" == (e = typeof i) ? t(i) : e) ? !(!i || i._objFlags & (n ? 4 | u : u)) : "undefined" !== ("object" == (e = typeof i) ? t(i) : e);
};
0;
cc.Object = n.exports = o;
}), {
"./CCClass": 78,
"./js": 93
} ],
83: [ (function(i, n, r) {
if (!cc.sys) {
cc.sys = {};
var o = cc.sys;
o.LANGUAGE_ENGLISH = "en";
o.LANGUAGE_CHINESE = "zh";
o.LANGUAGE_FRENCH = "fr";
o.LANGUAGE_ITALIAN = "it";
o.LANGUAGE_GERMAN = "de";
o.LANGUAGE_SPANISH = "es";
o.LANGUAGE_DUTCH = "du";
o.LANGUAGE_RUSSIAN = "ru";
o.LANGUAGE_KOREAN = "ko";
o.LANGUAGE_JAPANESE = "ja";
o.LANGUAGE_HUNGARIAN = "hu";
o.LANGUAGE_PORTUGUESE = "pt";
o.LANGUAGE_ARABIC = "ar";
o.LANGUAGE_NORWEGIAN = "no";
o.LANGUAGE_POLISH = "pl";
o.LANGUAGE_TURKISH = "tr";
o.LANGUAGE_UKRAINIAN = "uk";
o.LANGUAGE_ROMANIAN = "ro";
o.LANGUAGE_BULGARIAN = "bg";
o.LANGUAGE_UNKNOWN = "unknown";
o.OS_IOS = "iOS";
o.OS_ANDROID = "Android";
o.OS_WINDOWS = "Windows";
o.OS_MARMALADE = "Marmalade";
o.OS_LINUX = "Linux";
o.OS_BADA = "Bada";
o.OS_BLACKBERRY = "Blackberry";
o.OS_OSX = "OS X";
o.OS_WP8 = "WP8";
o.OS_WINRT = "WINRT";
o.OS_UNKNOWN = "Unknown";
o.UNKNOWN = -1;
o.WIN32 = 0;
o.LINUX = 1;
o.MACOS = 2;
o.ANDROID = 3;
o.IPHONE = 4;
o.IPAD = 5;
o.BLACKBERRY = 6;
o.NACL = 7;
o.EMSCRIPTEN = 8;
o.TIZEN = 9;
o.WINRT = 10;
o.WP8 = 11;
o.MOBILE_BROWSER = 100;
o.DESKTOP_BROWSER = 101;
o.EDITOR_PAGE = 102;
o.EDITOR_CORE = 103;
o.WECHAT_GAME = 104;
o.QQ_PLAY = 105;
o.BROWSER_TYPE_WECHAT = "wechat";
o.BROWSER_TYPE_WECHAT_GAME = "wechatgame";
o.BROWSER_TYPE_WECHAT_GAME_SUB = "wechatgamesub";
o.BROWSER_TYPE_QQ_PLAY = "qqplay";
o.BROWSER_TYPE_ANDROID = "androidbrowser";
o.BROWSER_TYPE_IE = "ie";
o.BROWSER_TYPE_QQ = "qqbrowser";
o.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
o.BROWSER_TYPE_UC = "ucbrowser";
o.BROWSER_TYPE_360 = "360browser";
o.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
o.BROWSER_TYPE_BAIDU = "baidubrowser";
o.BROWSER_TYPE_MAXTHON = "maxthon";
o.BROWSER_TYPE_OPERA = "opera";
o.BROWSER_TYPE_OUPENG = "oupeng";
o.BROWSER_TYPE_MIUI = "miuibrowser";
o.BROWSER_TYPE_FIREFOX = "firefox";
o.BROWSER_TYPE_SAFARI = "safari";
o.BROWSER_TYPE_CHROME = "chrome";
o.BROWSER_TYPE_LIEBAO = "liebao";
o.BROWSER_TYPE_QZONE = "qzone";
o.BROWSER_TYPE_SOUGOU = "sogou";
o.BROWSER_TYPE_UNKNOWN = "unknown";
o.isNative = !1;
o.isBrowser = "object" === ("object" == (e = typeof window) ? t(window) : e) && "object" === ("object" == (e = typeof document) ? t(document) : e) && !0;
cc.create3DContext = function(t, e, i) {
if (!i) return cc.create3DContext(t, e, "webgl") || cc.create3DContext(t, e, "experimental-webgl") || cc.create3DContext(t, e, "webkit-3d") || cc.create3DContext(t, e, "moz-webgl") || null;
try {
return t.getContext(i, e);
} catch (t) {
return null;
}
};
var s = window, c = s.navigator, a = document, u = a.documentElement, l = c.userAgent.toLowerCase();
o.isMobile = /mobile|android|iphone|ipad/.test(l);
o.platform = o.isMobile ? o.MOBILE_BROWSER : o.DESKTOP_BROWSER;
var h = c.language;
h = (h = h || c.browserLanguage) ? h.split("-")[0] : o.LANGUAGE_ENGLISH;
o.language = h;
var f = !1, d = !1, _ = "", p = 0, g = /android (\d+(?:\.\d+)+)/i.exec(l) || /android (\d+(?:\.\d+)+)/i.exec(c.platform);
if (g) {
f = !0;
_ = g[1] || "";
p = parseInt(_) || 0;
}
if (g = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(l)) {
d = !0;
_ = g[2] || "";
p = parseInt(_) || 0;
} else if (/(iPhone|iPad|iPod)/.exec(c.platform)) {
d = !0;
_ = "";
p = 0;
}
var v = o.OS_UNKNOWN;
-1 !== c.appVersion.indexOf("Win") ? v = o.OS_WINDOWS : d ? v = o.OS_IOS : -1 !== c.appVersion.indexOf("Mac") ? v = o.OS_OSX : -1 !== c.appVersion.indexOf("X11") && -1 === c.appVersion.indexOf("Linux") ? v = o.OS_UNIX : f ? v = o.OS_ANDROID : -1 === c.appVersion.indexOf("Linux") && -1 === l.indexOf("ubuntu") || (v = o.OS_LINUX);
o.os = v;
o.osVersion = _;
o.osMainVersion = p;
o.browserType = o.BROWSER_TYPE_UNKNOWN;
(function() {
var t = /mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i.exec(l);
t || (t = /qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng/i.exec(l));
var e = t ? t[0].toLowerCase() : o.BROWSER_TYPE_UNKNOWN;
"micromessenger" === e ? e = o.BROWSER_TYPE_WECHAT : "safari" === e && f ? e = o.BROWSER_TYPE_ANDROID : "qq" === e && l.match(/android.*applewebkit/i) ? e = o.BROWSER_TYPE_ANDROID : "trident" === e ? e = o.BROWSER_TYPE_IE : "360 aphone" === e ? e = o.BROWSER_TYPE_360 : "mxbrowser" === e ? e = o.BROWSER_TYPE_MAXTHON : "opr/" === e && (e = o.BROWSER_TYPE_OPERA);
o.browserType = e;
})();
o.browserVersion = "";
(function() {
var t = l.match(/(mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|uc|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui)(mobile)?(browser)?\/?([\d.]+)/i);
t || (t = l.match(/(qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i));
o.browserVersion = t ? t[4] : "";
})();
var m = window.innerWidth || document.documentElement.clientWidth, y = window.innerHeight || document.documentElement.clientHeight, C = window.devicePixelRatio || 1;
o.windowPixelResolution = {
width: C * m,
height: C * y
};
o._checkWebGLRenderMode = function() {
if (cc._renderType !== cc.game.RENDER_TYPE_WEBGL) throw new Error("This feature supports WebGL render mode only.");
};
var E = document.createElement("canvas"), b = document.createElement("canvas");
o._supportCanvasNewBlendModes = (function() {
var t = E;
t.width = 1;
t.height = 1;
var e = t.getContext("2d");
e.fillStyle = "#000";
e.fillRect(0, 0, 1, 1);
e.globalCompositeOperation = "multiply";
var i = b;
i.width = 1;
i.height = 1;
var n = i.getContext("2d");
n.fillStyle = "#fff";
n.fillRect(0, 0, 1, 1);
e.drawImage(i, 0, 0, 1, 1);
return 0 === e.getImageData(0, 0, 1, 1).data[0];
})();
if (cc.sys.isMobile) {
var T = document.createElement("style");
T.type = "text/css";
document.body.appendChild(T);
T.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}";
}
try {
var S = o.localStorage = s.localStorage;
S.setItem("storage", "");
S.removeItem("storage");
S = null;
} catch (t) {
var A = function() {
cc.warnID(5200);
};
o.localStorage = {
getItem: A,
setItem: A,
removeItem: A,
clear: A
};
}
var O = E.toDataURL("image/webp").startsWith("data:image/webp"), I = !!E.getContext("2d"), x = !1;
if (s.WebGLRenderingContext) {
cc.create3DContext(document.createElement("CANVAS")) && (x = !0);
if (x && o.os === o.OS_ANDROID) {
var N = parseFloat(o.browserVersion);
switch (o.browserType) {
case o.BROWSER_TYPE_MOBILE_QQ:
case o.BROWSER_TYPE_BAIDU:
case o.BROWSER_TYPE_BAIDU_APP:
x = N >= 6.2;
break;

case o.BROWSER_TYPE_ANDROID:
o.osMainVersion && o.osMainVersion >= 5 && (x = !0);
break;

case o.BROWSER_TYPE_CHROME:
x = N >= 30;
break;

case o.BROWSER_TYPE_UC:
x = N > 11;

case o.BROWSER_TYPE_360:
x = !1;
}
}
}
var w = o.capabilities = {
canvas: I,
opengl: x,
webp: O
};
(void 0 !== u.ontouchstart || void 0 !== a.ontouchstart || c.msPointerEnabled) && (w.touches = !0);
void 0 !== u.onmouseup && (w.mouse = !0);
void 0 !== u.onkeyup && (w.keyboard = !0);
(s.DeviceMotionEvent || s.DeviceOrientationEvent) && (w.accelerometer = !0);
var R;
(function() {
o.browserVersion;
var t = !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
R = {
ONLY_ONE: !1,
WEB_AUDIO: t,
DELAY_CREATE_CTX: !1
};
o.os === o.OS_IOS && (R.USE_LOADER_EVENT = "loadedmetadata");
if (o.browserType === o.BROWSER_TYPE_FIREFOX) {
R.DELAY_CREATE_CTX = !0;
R.USE_LOADER_EVENT = "canplay";
}
o.os === o.OS_ANDROID && o.browserType === o.BROWSER_TYPE_UC && (R.ONE_SOURCE = !0);
!1;
})();
try {
if (R.WEB_AUDIO) {
R.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
R.DELAY_CREATE_CTX && setTimeout((function() {
R.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
}), 0);
}
} catch (t) {
R.WEB_AUDIO = !1;
cc.logID(5201);
}
R.format = (function() {
var t = [], e = document.createElement("audio");
if (e.canPlayType) {
e.canPlayType('audio/ogg; codecs="vorbis"') && t.push(".ogg");
e.canPlayType("audio/mpeg") && t.push(".mp3");
e.canPlayType('audio/wav; codecs="1"') && t.push(".wav");
e.canPlayType("audio/mp4") && t.push(".mp4");
e.canPlayType("audio/x-m4a") && t.push(".m4a");
}
return t;
})();
o.__audioSupport = R;
o.garbageCollect = function() {};
o.dumpRoot = function() {};
o.restartVM = function() {};
o.cleanScript = function(t) {};
o.isObjectValid = function(t) {
return !!t;
};
o.dump = function() {
var t = "";
t += "isMobile : " + this.isMobile + "\r\n";
t += "language : " + this.language + "\r\n";
t += "browserType : " + this.browserType + "\r\n";
t += "browserVersion : " + this.browserVersion + "\r\n";
t += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n";
t += "os : " + this.os + "\r\n";
t += "osVersion : " + this.osVersion + "\r\n";
t += "platform : " + this.platform + "\r\n";
t += "Using " + (cc._renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n";
cc.log(t);
};
o.openURL = function(t) {
window.open(t);
};
o.now = function() {
return Date.now ? Date.now() : +new Date();
};
n.exports = o;
}
}), {} ],
84: [ (function(i, n, r) {
var o = cc.ClassManager = {
instanceId: 0 | 998 * Math.random(),
getNewInstanceId: function() {
return this.instanceId++;
}
}, s = /\b_super\b/, c = function() {};
c.extend = function(i) {
var n, r = this.prototype, a = Object.create(r), u = {
writable: !0,
enumerable: !1,
configurable: !0
};
if (cc.game && cc.game.config && cc.game.config[cc.game.CONFIG_KEY.exposeClassName]) {
var l = "return (function " + (i._className || "Class") + "(arg0,arg1,arg2,arg3,arg4) {\nthis.__instanceId = cc.ClassManager.getNewInstanceId();\nif (this.ctor) {\nswitch (arguments.length) {\ncase 0: this.ctor(); break;\ncase 1: this.ctor(arg0); break;\ncase 2: this.ctor(arg0,arg1); break;\ncase 3: this.ctor(arg0,arg1,arg2); break;\ncase 4: this.ctor(arg0,arg1,arg2,arg3); break;\ncase 5: this.ctor(arg0,arg1,arg2,arg3,arg4); break;\ndefault: this.ctor.apply(this, arguments);\n}\n}\n});";
n = Function(l)();
} else n = function(t, e, i, n, r) {
this.__instanceId = o.getNewInstanceId();
if (this.ctor) switch (arguments.length) {
case 0:
this.ctor();
break;

case 1:
this.ctor(t);
break;

case 2:
this.ctor(t, e);
break;

case 3:
this.ctor(t, e, i);
break;

case 4:
this.ctor(t, e, i, n);
break;

case 5:
this.ctor(t, e, i, n, r);
break;

default:
this.ctor.apply(this, arguments);
}
};
n.prototype = a;
u.value = n;
Object.defineProperty(a, "constructor", u);
for (var h in i) {
var f = "function" === ("object" == (e = typeof i[h]) ? t(i[h]) : e);
if (f && "function" === ("object" == (e = typeof r[h]) ? t(r[h]) : e) && s.test(i[h])) {
u.value = (function(t, e) {
return function() {
var i = this._super;
this._super = r[t];
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(h, i[h]);
Object.defineProperty(a, h, u);
} else if (f) {
u.value = i[h];
Object.defineProperty(a, h, u);
} else a[h] = i[h];
}
n.extend = c.extend;
n.implement = function(t) {
for (var e in t) a[e] = t[e];
};
return n;
};
cc.defineGetterSetter = function(t, e, i, n, r, o) {
if (t.__defineGetter__) {
i && t.__defineGetter__(e, i);
n && t.__defineSetter__(e, n);
} else {
if (!Object.defineProperty) throw new Error("browser does not support getters");
var s = {
configurable: !0
};
i && (s.get = i);
n && (s.set = n);
Object.defineProperty(t, e, s);
}
};
cc.clone = function(i) {
var n = i.constructor ? new i.constructor() : {};
for (var r in i) {
var o = i[r];
"object" !== ("object" == (e = typeof o) ? t(o) : e) || !o || o instanceof _ccsg.Node ? n[r] = o : n[r] = cc.clone(o);
}
return n;
};
cc._Class = n.exports = c;
}), {} ],
85: [ (function(i, n, r) {
function o(t, e, i) {
var n;
n = function() {};
i && l.extend(n, i.constructor);
var r = new n();
l.value(t, "__attrs__", r);
return r;
}
function s(i, n, r) {
var s, a, u;
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) a = (s = c(i)).constructor.prototype; else {
var l = i;
if (!(s = l.__attrs__)) {
s = o(l, 0, c(i = l.constructor));
}
a = s;
}
if ("undefined" === ("object" == (e = typeof r) ? t(r) : e)) {
var f = n + h, d = {};
for (u in s) u.startsWith(f) && (d[u.slice(f.length)] = s[u]);
return d;
}
if ("object" === ("object" == (e = typeof r) ? t(r) : e)) for (u in r) 95 !== u.charCodeAt(0) && (a[n + h + u] = r[u]); else 0;
}
function c(t) {
return t.hasOwnProperty("__attrs__") && t.__attrs__ || (function(t) {
for (var e, i = cc.Class.getInheritanceChain(t), n = i.length - 1; n >= 0; n--) {
var r = i[n];
r.hasOwnProperty("__attrs__") && r.__attrs__ || o(r, 0, (e = i[n + 1]) && e.__attrs__);
}
o(t, 0, (e = i[0]) && e.__attrs__);
return t.__attrs__;
})(t);
}
function a(t) {
return c(t).constructor.prototype;
}
function u(t, e) {
0;
}
var l = i("./js"), h = (i("./utils").isPlainEmptyObj_DEV, "$_$");
cc.Integer = "Integer";
cc.Float = "Float";
0;
cc.Boolean = "Boolean";
cc.String = "String";
n.exports = {
attr: s,
getClassAttrs: c,
getClassAttrsProto: a,
setClassAttr: function(t, e, i, n) {
a(t)[e + h + i] = n;
},
DELIMETER: h,
getTypeChecker: u,
ObjectType: function(t) {
return {
type: "Object",
ctor: t,
_onAfterProp: !1
};
},
ScriptUuid: {}
};
}), {
"./CCClass": 78,
"./js": 93,
"./utils": 97
} ],
86: [ (function(i, n, r) {
function o() {
this.callbacks = [];
this.targets = [];
this.isInvoking = !1;
this.containCanceled = !1;
}
function s() {
this._callbackTable = c.createMap(!0);
}
var c = i("./js"), a = c.array.fastRemoveAt, u = o.prototype;
u.removeBy = function(t, e) {
for (var i = this.callbacks, n = this.targets, r = 0; r < t.length; ++r) if (t[r] === e) {
a(i, r);
a(n, r);
--r;
}
};
u.cancel = function(t) {
this.callbacks[t] = this.targets[t] = null;
this.containCanceled = !0;
};
u.cancelAll = function() {
for (var t = this.callbacks, e = this.targets, i = 0; i < t.length; i++) t[i] = e[i] = null;
this.containCanceled = !0;
};
u.purgeCanceled = function() {
this.removeBy(this.callbacks, null);
this.containCanceled = !1;
};
var l = new c.Pool(function(t) {
t.callbacks.length = 0;
t.targets.length = 0;
t.isInvoking = !1;
t.containCanceled = !1;
}, 16);
l.get = function() {
return this._get() || new o();
};
(u = s.prototype).add = function(t, e, i) {
var n = this._callbackTable[t];
n || (n = this._callbackTable[t] = l.get());
n.callbacks.push(e);
n.targets.push(i || null);
};
u.has = function(t, e, i) {
var n = this._callbackTable[t];
if (!n) return !1;
var r = n.callbacks;
if (!e) {
for (var o = 0; o < r.length; o++) if (r[o]) return !0;
return !1;
}
i = i || null;
for (var s = n.targets, c = 0; c < r.length; ++c) if (r[c] === e && s[c] === i) return !0;
return !1;
};
u.removeAll = function(i) {
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = this._callbackTable[i];
if (n) if (n.isInvoking) n.cancelAll(); else {
l.put(n);
delete this._callbackTable[i];
}
} else if (i) for (var r in this._callbackTable) {
var o = this._callbackTable[r];
if (o.isInvoking) for (var s = o.targets, c = 0; c < s.length; ++c) s[c] === i && o.cancel(c); else o.removeBy(o.targets, i);
}
};
u.remove = function(t, e, i) {
var n = this._callbackTable[t];
if (n) {
i = i || null;
for (var r = n.callbacks, o = n.targets, s = 0; s < r.length; ++s) if (r[s] === e && o[s] === i) {
if (n.isInvoking) n.cancel(s); else {
a(r, s);
a(o, s);
}
break;
}
}
};
var h = function() {
s.call(this);
};
c.extend(h, s);
0;
h.prototype.invoke = function(t, e, i, n, r, o) {
var s = this._callbackTable[t];
if (s) {
var c = !s.isInvoking;
s.isInvoking = !0;
for (var a = s.callbacks, u = s.targets, l = 0, h = a.length; l < h; ++l) {
var f = a[l];
if (f) {
var d = u[l];
d ? f.call(d, e, i, n, r, o) : f(e, i, n, r, o);
}
}
if (c) {
s.isInvoking = !1;
s.containCanceled && s.purgeCanceled();
}
}
};
h.CallbacksHandler = s;
n.exports = h;
}), {
"./js": 93
} ],
87: [ (function(t, e, i) {
function n(t, e) {
for (var i = 0; i < e.length; i++) {
var r = e[i];
Array.isArray(r) ? n(t, r) : t.push(r);
}
}
e.exports = {
flattenCodeArray: function(t) {
var e = [];
n(e, t);
return e.join("");
}
};
}), {} ],
88: [ (function(i, n, r) {
var o = i("./js"), s = (i("./CCObject"), i("./attribute")), c = i("./CCClass"), a = i("../utils/misc"), u = function() {
this.uuidList = [];
this.uuidObjList = [];
this.uuidPropList = [];
this.rawProp = "";
};
u.prototype.reset = function() {
this.uuidList.length = 0;
this.uuidObjList.length = 0;
this.uuidPropList.length = 0;
this.rawProp = "";
};
0;
u.prototype.getUuidOf = function(t, e) {
for (var i = 0; i < this.uuidObjList.length; i++) if (this.uuidObjList[i] === t && this.uuidPropList[i] === e) return this.uuidList[i];
return "";
};
u.prototype.push = function(t, e, i) {
this.uuidList.push(i);
this.uuidObjList.push(t);
this.uuidPropList.push(e);
};
(u.pool = new o.Pool(function(t) {
t.reset();
}, 10)).get = function() {
return this._get() || new u();
};
var l = (function() {
function i(t, e, i, n, r) {
this.result = t;
this.customEnv = n;
this.deserializedList = [];
this.deserializedData = null;
this._classFinder = i;
0;
this._idList = [];
this._idObjList = [];
this._idPropList = [];
}
function n(t, e, i, n, r) {
var s;
if (n.hasOwnProperty("__deserialize__")) s = n.__deserialize__; else {
s = l(t, n);
o.value(n, "__deserialize__", s, !0);
}
s(t, e, i, n, r);
0;
}
var r = i.prototype;
r.deserialize = function(t) {
if (Array.isArray(t)) {
var e = t, i = e.length;
this.deserializedList.length = i;
for (var n = 0; n < i; n++) if (e[n]) {
this.deserializedList[n] = this._deserializeObject(e[n]);
}
this.deserializedData = i > 0 ? this.deserializedList[0] : [];
} else {
this.deserializedList.length = 1;
this.deserializedData = t ? this._deserializeObject(t) : null;
this.deserializedList[0] = this.deserializedData;
}
(function(t) {
var e, i, n, r = t.deserializedList, o = t._idPropList, s = t._idList, c = t._idObjList;
t._classFinder && t._classFinder.onDereferenced;
for (e = 0; e < s.length; e++) {
i = o[e];
n = s[e];
c[e][i] = r[n];
}
})(this);
return this.deserializedData;
};
r._deserializeObject = function(i, r, s, c) {
var a, u = null, l = null, h = i.__type__;
if (h) {
if (!(l = this._classFinder(h, i, s, c))) {
this._classFinder === o._getClassById && cc.deserialize.reportMissingClass(h);
return null;
}
if ((u = new l())._deserialize) {
u._deserialize(i.content, this);
return u;
}
cc.Class._isCCClass(l) ? n(this, u, i, l, r) : this._deserializeTypedObject(u, i, l);
} else if (Array.isArray(i)) {
u = new Array(i.length);
for (var f = 0; f < i.length; f++) {
a = i[f];
"object" === ("object" == (e = typeof a) ? t(a) : e) && a ? this._deserializeObjField(u, a, "" + f) : u[f] = a;
}
} else {
u = {};
this._deserializePrimitiveObject(u, i);
}
return u;
};
r._deserializeObjField = function(i, n, r, o) {
var s = n.__id__;
if ("undefined" === ("object" == (e = typeof s) ? t(s) : e)) {
var c = n.__uuid__;
if (c) {
this.result.uuidList.push(c);
this.result.uuidObjList.push(i);
this.result.uuidPropList.push(r);
} else i[r] = this._deserializeObject(n);
} else {
var a = this.deserializedList[s];
if (a) i[r] = a; else {
this._idList.push(s);
this._idObjList.push(i);
this._idPropList.push(r);
}
}
};
r._deserializePrimitiveObject = function(i, n) {
for (var r in n) if (n.hasOwnProperty(r)) {
var o = n[r];
"object" !== ("object" == (e = typeof o) ? t(o) : e) ? "__type__" !== r && (i[r] = o) : o ? this._deserializeObjField(i, o, r) : i[r] = null;
}
};
r._deserializeTypedObject = function(i, n, r) {
if (r !== cc.Vec2) if (r !== cc.Color) if (r !== cc.Size) {
var o = r.__props__;
o || (o = Object.keys(i));
for (var s = 0; s < o.length; s++) {
var c = o[s], a = n[c];
"undefined" !== ("object" == (e = typeof a) ? t(a) : e) && n.hasOwnProperty(c) && ("object" !== ("object" == (e = typeof a) ? t(a) : e) ? i[c] = a : a ? this._deserializeObjField(i, a, c) : i[c] = null);
}
} else {
i.width = n.width || 0;
i.height = n.height || 0;
} else {
i.r = n.r || 0;
i.g = n.g || 0;
i.b = n.b || 0;
var u = n.a;
i.a = void 0 === u ? 255 : u;
} else {
i.x = n.x || 0;
i.y = n.y || 0;
}
};
var u = function(t, e, i, n, r) {
if (e instanceof cc.ValueType) {
r || t.push("if(prop){");
var s = o.getClassName(e);
t.push("s._deserializeTypedObject(o" + i + ",prop," + s + ");");
r || t.push("}else o" + i + "=null;");
} else {
t.push("if(prop){");
t.push("s._deserializeObjField(o,prop," + n + ");");
t.push("}else o" + i + "=null;");
}
}, l = function(i, n) {
for (var r = s.DELIMETER + "type", l = s.DELIMETER + "rawType", h = (s.DELIMETER, 
s.DELIMETER + "serializable"), f = s.DELIMETER + "default", d = s.DELIMETER + "saveUrlAsAsset", _ = s.DELIMETER + "formerlySerializedAs", p = s.getClassAttrs(n), g = n.__props__, v = [ "var prop;" ], m = a.BUILTIN_CLASSID_RE.test(o._getClassId(n)), y = 0; y < g.length; y++) {
var C, E = g[y];
if (p[E + l]) {
C = c.IDENTIFIER_RE.test(E) ? '"' + E + '"' : c.escapeForJS(E);
v.push('if(s.result.rawProp)\ncc.error("not support multi raw object in a file");');
v.push("s.result.rawProp=" + C + ";");
} else {
if (!1 === p[E + h]) continue;
var b;
if (c.IDENTIFIER_RE.test(E)) {
C = '"' + E + '"';
b = "." + E;
} else b = "[" + (C = c.escapeForJS(E)) + "]";
var T = b;
if (p[E + _]) {
var S = p[E + _];
T = c.IDENTIFIER_RE.test(S) ? "." + S : "[" + c.escapeForJS(S) + "]";
}
v.push("prop=d" + T + ";");
v.push('if(typeof (prop)!=="undefined"){');
var A = c.getDefault(p[E + f]);
if (m) {
var O, I = p[E + r];
if (void 0 === A && I) O = I === cc.String || I === cc.Integer || I === cc.Float || I === cc.Boolean; else {
var x = "object" == (e = typeof A) ? t(A) : e;
O = "string" === x && !p[E + d] || "number" === x || "boolean" === x;
}
O ? v.push("o" + b + "=prop;") : u(v, A, b, C, !0);
} else {
v.push('if(typeof (prop)!=="object"){o' + b + "=prop;}else{");
u(v, A, b, C, !1);
v.push("}");
}
v.push("}");
}
}
if ("_$erialized" === g[g.length - 1]) {
v.push("o._$erialized=JSON.parse(JSON.stringify(d));");
v.push("s._deserializePrimitiveObject(o._$erialized,d);");
}
return Function("s", "o", "d", "k", "t", v.join(""));
};
(i.pool = new o.Pool(function(t) {
t.result = null;
t.customEnv = null;
t.deserializedList.length = 0;
t.deserializedData = null;
t._classFinder = null;
0;
t._idList.length = 0;
t._idObjList.length = 0;
t._idPropList.length = 0;
}, 1)).get = function(t, e, n, r, o) {
var s = this._get();
if (s) {
s.result = t;
s.customEnv = r;
s._classFinder = n;
0;
return s;
}
return new i(t, e, n, r, o);
};
return i;
})();
cc.deserialize = function(i, n, r) {
var s = (r = r || {}).classFinder || o._getClassById, c = r.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE, a = r.customEnv, h = r.ignoreEditorOnly;
0;
"string" === ("object" == (e = typeof i) ? t(i) : e) && (i = JSON.parse(i));
var f = !n;
n = n || u.pool.get();
var d = l.pool.get(n, !1, s, a, h);
cc.game._isCloning = !0;
var _ = d.deserialize(i);
cc.game._isCloning = !1;
l.pool.put(d);
c && n.assignAssetsBy(Editor.serialize.asAsset);
f && u.pool.put(n);
return _;
};
cc.deserialize.Details = u;
cc.deserialize.reportMissingClass = function(t) {
cc.warnID(5302, t);
};
}), {
"../utils/misc": 103,
"./CCClass": 78,
"./CCObject": 82,
"./attribute": 85,
"./js": 93
} ],
89: [ (function(t, e, i) {
function n(t) {
this.id = 0 | 998 * Math.random();
this.prefix = t ? t + r : "";
}
var r = ".";
n.prototype.getNewId = function() {
return this.prefix + ++this.id;
};
n.global = new n("global");
e.exports = n;
}), {} ],
90: [ (function(t, e, i) {
t("./js");
t("./CCClass");
t("./CCClassDecorator");
t("./CCEnum");
t("./CCObject");
t("./callbacks-invoker");
t("./url");
t("./deserialize");
t("./instantiate");
t("./instantiate-jit");
t("./requiring-frame");
t("./CCSys");
t("./CCMacro");
t("./CCAssetLibrary");
0;
}), {
"./CCAssetLibrary": 77,
"./CCClass": 78,
"./CCClassDecorator": 79,
"./CCEnum": 80,
"./CCMacro": 81,
"./CCObject": 82,
"./CCSys": 83,
"./CCVisibleRect": 1,
"./callbacks-invoker": 86,
"./deserialize": 88,
"./instantiate": 92,
"./instantiate-jit": 91,
"./js": 93,
"./requiring-frame": 95,
"./url": 96
} ],
91: [ (function(i, n, r) {
function o(t, e) {
this.varName = t;
this.expression = e;
}
function s(t, e) {
return e instanceof o ? new o(e.varName, t + e.expression) : t + e;
}
function c(t, e, i) {
if (Array.isArray(i)) {
i[0] = s(e, i[0]);
t.push(i);
} else t.push(s(e, i) + ";");
}
function a(t) {
this._exps = [];
this._targetExp = t;
}
function u(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) try {
i = i();
} catch (t) {
return !1;
}
if (i === n) return !0;
if (i && n) {
if (i instanceof cc.ValueType && i.equals(n)) return !0;
if (Array.isArray(i) && Array.isArray(n) || i.constructor === Object && n.constructor === Object) try {
return JSON.stringify(i) === JSON.stringify(n);
} catch (t) {}
}
return !1;
}
function l(t) {
return E.test(t) ? "." + t : "[" + b(t) + "]";
}
function h(t, e) {
this.parent = e;
this.objsToClear_iN$t = [];
this.codeArray = [];
this.objs = [];
this.funcs = [];
this.funcModuleCache = g.createMap();
g.mixin(this.funcModuleCache, O);
this.globalVariables = [];
this.globalVariableId = 0;
this.localVariableId = 0;
this.codeArray.push(T + S + "," + A + ";", "if(R){", S + "=R;", "}else{", S + "=R=new " + this.getFuncModule(t.constructor, !0) + "();", "}");
t._iN$t = {
globalVar: "R"
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(this.codeArray, t);
var i;
this.globalVariables.length > 0 && (i = T + this.globalVariables.join(",") + ";");
var n = m.flattenCodeArray([ "return (function(R){", i || [], this.codeArray, "return o;", "})" ]);
this.result = Function("O", "F", n)(this.objs, this.funcs);
for (var r = 0, o = this.objsToClear_iN$t.length; r < o; ++r) this.objsToClear_iN$t[r]._iN$t = null;
this.objsToClear_iN$t.length = 0;
}
var f = i("./CCObject"), d = f.Flags.Destroyed, _ = f.Flags.PersistentMask, p = i("./attribute"), g = i("./js"), v = i("./CCClass"), m = i("./compiler"), y = p.DELIMETER + "serializable", C = p.DELIMETER + "default", E = v.IDENTIFIER_RE, b = v.escapeForJS, T = "var ", S = "o", A = "t", O = {
"cc.Node": "cc.Node",
"cc.Sprite": "cc.Sprite",
"cc.Label": "cc.Label",
"cc.Button": "cc.Button",
"cc.Widget": "cc.Widget",
"cc.Animation": "cc.Animation",
"cc.ClickEvent": !1,
"cc.PrefabInfo": !1
};
o.prototype.toString = function() {
return T + this.varName + "=" + this.expression + ";";
};
a.prototype.append = function(t, e) {
this._exps.push([ t, e ]);
};
a.prototype.writeCode = function(t) {
var e;
if (this._exps.length > 1) {
t.push(A + "=" + this._targetExp + ";");
e = A;
} else {
if (1 !== this._exps.length) return;
e = this._targetExp;
}
for (var i = 0; i < this._exps.length; i++) {
var n = this._exps[i];
c(t, e + l(n[0]) + "=", n[1]);
}
};
(a.pool = new g.Pool(function(t) {
t._exps.length = 0;
t._targetExp = null;
}, 1)).get = function(t) {
var e = this._get() || new a();
e._targetExp = t;
return e;
};
var I = h.prototype;
I.getFuncModule = function(t, e) {
var i = g.getClassName(t);
if (i) {
var n = this.funcModuleCache[i];
if (n) return n;
if (void 0 === n) {
var r = -1 !== i.indexOf(".");
if (r) try {
if (r = t === Function("return " + i)()) {
this.funcModuleCache[i] = i;
return i;
}
} catch (t) {}
}
}
var o = this.funcs.indexOf(t);
if (o < 0) {
o = this.funcs.length;
this.funcs.push(t);
}
var s = "F[" + o + "]";
e && (s = "(" + s + ")");
this.funcModuleCache[i] = s;
return s;
};
I.getObjRef = function(t) {
var e = this.objs.indexOf(t);
if (e < 0) {
e = this.objs.length;
this.objs.push(t);
}
return "O[" + e + "]";
};
I.setValueType = function(t, e, i, n) {
var r = a.pool.get(n), o = e.constructor.__props__;
o || (o = Object.keys(e));
for (var s = 0; s < o.length; s++) {
var c = o[s], u = i[c];
if (e[c] !== u) {
var l = this.enumerateField(i, c, u);
r.append(c, l);
}
}
r.writeCode(t);
a.pool.put(r);
};
I.enumerateCCClass = function(i, n, r) {
for (var o = r.__props__, s = p.getClassAttrs(r), c = 0; c < o.length; c++) {
var a = o[c];
0;
if (!1 !== s[a + y]) {
var h = n[a];
if (u(f = s[a + C], h)) continue;
if ("object" === ("object" == (e = typeof h) ? t(h) : e) && h instanceof cc.ValueType) {
var f;
if (((f = v.getDefault(f)) && f.constructor) === h.constructor) {
var d = S + l(a);
this.setValueType(i, f, h, d);
continue;
}
}
this.setObjProp(i, n, a, h);
}
}
};
I.instantiateArray = function(t) {
if (0 === t.length) return "[]";
var e = "a" + ++this.localVariableId, i = [ new o(e, "new Array(" + t.length + ")") ];
t._iN$t = {
globalVar: "",
source: i
};
this.objsToClear_iN$t.push(t);
for (var n = 0; n < t.length; ++n) {
c(i, e + "[" + n + "]=", this.enumerateField(t, n, t[n]));
}
return i;
};
I.enumerateField = function(i, n, r) {
if ("object" === ("object" == (e = typeof r) ? t(r) : e) && r) {
var o = r._iN$t;
if (o) {
var c = o.globalVar;
if (!c) {
c = o.globalVar = "v" + ++this.globalVariableId;
this.globalVariables.push(c);
var a = o.source[0];
o.source[0] = s(c + "=", a);
}
return c;
}
return Array.isArray(r) ? this.instantiateArray(r) : this.instantiateObj(r);
}
if ("function" === ("object" == (e = typeof r) ? t(r) : e)) return this.getFuncModule(r);
if ("string" === ("object" == (e = typeof r) ? t(r) : e)) return b(r);
"_objFlags" === n && i instanceof f && (r &= _);
return r;
};
I.setObjProp = function(t, e, i, n) {
c(t, S + l(i) + "=", this.enumerateField(e, i, n));
};
I.enumerateObject = function(i, n) {
var r = n.constructor;
if (cc.Class._isCCClass(r)) this.enumerateCCClass(i, n, r); else for (var o in n) if (n.hasOwnProperty(o) && (95 !== o.charCodeAt(0) || 95 !== o.charCodeAt(1) || "__type__" === o)) {
var s = n[o];
"object" === ("object" == (e = typeof s) ? t(s) : e) && s && s === n._iN$t || this.setObjProp(i, n, o, s);
}
};
I.instantiateObj = function(t) {
if (t instanceof cc.ValueType) return v.getNewValueTypeCode(t);
if (t instanceof cc.Asset) return this.getObjRef(t);
if (t._objFlags & d) return null;
var e, i = t.constructor;
if (cc.Class._isCCClass(i)) {
if (this.parent) if (this.parent instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return this.getObjRef(t);
} else if (this.parent instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(this.parent)) return this.getObjRef(t);
} else if (t instanceof cc.Component && !t.node.isChildOf(this.parent)) return this.getObjRef(t);
e = new o(S, "new " + this.getFuncModule(i, !0) + "()");
} else if (i === Object) e = new o(S, "{}"); else {
if (i) return this.getObjRef(t);
e = new o(S, "Object.create(null)");
}
var n = [ e ];
t._iN$t = {
globalVar: "",
source: n
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(n, t);
return [ "(function(){", n, "return o;})();" ];
};
n.exports = {
compile: function(t) {
return new h(t, t instanceof cc._BaseNode && t).result;
},
equalsToDefault: u
};
0;
}), {
"./CCClass": 78,
"./CCObject": 82,
"./attribute": 85,
"./compiler": 87,
"./js": 93
} ],
92: [ (function(i, n, r) {
function o(i, n) {
if (!n) {
if ("object" !== ("object" == (e = typeof i) ? t(i) : e) || Array.isArray(i)) {
0;
return null;
}
if (!i) {
0;
return null;
}
if (!cc.isValid(i)) {
0;
return null;
}
0;
}
var r;
if (i instanceof u) {
if (i._instantiate) {
cc.game._isCloning = !0;
r = i._instantiate();
cc.game._isCloning = !1;
return r;
}
if (i instanceof cc.Asset) {
0;
return null;
}
}
cc.game._isCloning = !0;
r = s(i);
cc.game._isCloning = !1;
return r;
}
function s(t, e) {
if (Array.isArray(t)) {
0;
return null;
}
0;
var i;
if (t._iN$t) i = t._iN$t; else if (t.constructor) {
i = new (0, t.constructor)();
} else i = Object.create(null);
c(t, i, e);
for (var n = 0, r = d.length; n < r; ++n) d[n]._iN$t = null;
d.length = 0;
return i;
}
function c(i, n, r) {
i._iN$t = n;
d.push(i);
var o = i.constructor;
if (cc.Class._isCCClass(o)) (function(i, n, r, o) {
for (var s = i.__props__, c = f.getClassAttrs(i), u = 0; u < s.length; u++) {
var l = s[u];
if (!1 !== c[l + _]) {
var h = n[l];
"object" === ("object" == (e = typeof h) ? t(h) : e) && h ? r[l] = h._iN$t || a(h, o) : r[l] = h;
}
}
})(o, i, n, r); else for (var s in i) if (i.hasOwnProperty(s) && (95 !== s.charCodeAt(0) || 95 !== s.charCodeAt(1) || "__type__" === s)) {
var c = i[s];
if ("object" === ("object" == (e = typeof c) ? t(c) : e) && c) {
if (c === n) continue;
n[s] = c._iN$t || a(c, r);
} else n[s] = c;
}
i instanceof u && (n._objFlags &= h);
}
function a(i, n) {
if (i instanceof cc.ValueType) return i.clone();
if (i instanceof cc.Asset) return i;
var r;
if (Array.isArray(i)) {
var o = i.length;
r = new Array(o);
i._iN$t = r;
for (var s = 0; s < o; ++s) {
var u = i[s];
"object" === ("object" == (e = typeof u) ? t(u) : e) && u ? r[s] = u._iN$t || a(u, n) : r[s] = u;
}
d.push(i);
return r;
}
if (i._objFlags & l) return null;
var h = i.constructor;
if (cc.Class._isCCClass(h)) {
if (n) if (n instanceof cc.Component) {
if (i instanceof cc._BaseNode || i instanceof cc.Component) return i;
} else if (n instanceof cc._BaseNode) if (i instanceof cc._BaseNode) {
if (!i.isChildOf(n)) return i;
} else if (i instanceof cc.Component && !i.node.isChildOf(n)) return i;
r = new h();
} else if (h === Object) r = {}; else {
if (h) return i;
r = Object.create(null);
}
c(i, r, n);
return r;
}
var u = i("./CCObject"), l = u.Flags.Destroyed, h = u.Flags.PersistentMask, f = i("./attribute"), d = (i("./utils").isDomNode, 
[]), _ = f.DELIMETER + "serializable";
o._clone = s;
cc.instantiate = o;
n.exports = o;
}), {
"./CCObject": 82,
"./attribute": 85,
"./utils": 97
} ],
93: [ (function(i, n, r) {
function o(t, e) {
for (;t; ) {
var i = Object.getOwnPropertyDescriptor(t, e);
if (i) return i;
t = Object.getPrototypeOf(t);
}
return null;
}
function s(t, e, i) {
var n = o(e, t);
Object.defineProperty(i, t, n);
}
function c(t, e) {
t.splice(e, 1);
}
function a(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
c(t, i);
return !0;
}
return !1;
}
function u(i, n) {
if ("number" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i;
i = null;
}
this.get = null;
this.count = 0;
this._pool = new Array(n);
this._cleanup = i;
}
var l = new (i("./id-generater"))("TmpCId."), h = {
isNumber: function(i) {
return "number" === ("object" == (e = typeof i) ? t(i) : e) || i instanceof Number;
},
isString: function(i) {
return "string" === ("object" == (e = typeof i) ? t(i) : e) || i instanceof String;
},
addon: function(i) {
"use strict";
i = i || {};
for (var n = 1, r = arguments.length; n < r; n++) {
var o = arguments[n];
if (o) {
if ("object" !== ("object" == (e = typeof o) ? t(o) : e)) {
cc.errorID(5402, o);
continue;
}
for (var c in o) c in i || s(c, o, i);
}
}
return i;
},
mixin: function(i) {
"use strict";
i = i || {};
for (var n = 1, r = arguments.length; n < r; n++) {
var o = arguments[n];
if (o) {
if ("object" !== ("object" == (e = typeof o) ? t(o) : e)) {
cc.errorID(5403, o);
continue;
}
for (var c in o) s(c, o, i);
}
}
return i;
},
extend: function(t, e) {
0;
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
t.prototype = Object.create(e.prototype, {
constructor: {
value: t,
writable: !0,
configurable: !0
}
});
return t;
},
getSuper: function(t) {
if (t.hasOwnProperty("$super")) return t.$super;
var e = t.prototype, i = e && Object.getPrototypeOf(e);
return i && i.constructor;
},
clear: function(t) {
for (var e = Object.keys(t), i = 0; i < e.length; i++) delete t[e[i]];
},
getPropertyDescriptor: o
}, f = {
value: void 0,
enumerable: !1,
writable: !1,
configurable: !0
};
h.value = function(t, e, i, n, r) {
f.value = i;
f.writable = n;
f.enumerable = r;
Object.defineProperty(t, e, f);
f.value = void 0;
};
var d = {
get: null,
set: null,
enumerable: !1
};
h.getset = function(i, n, r, o, s) {
if ("function" !== ("object" == (e = typeof o) ? t(o) : e)) {
s = o;
o = void 0;
}
d.get = r;
d.set = o;
d.enumerable = s;
Object.defineProperty(i, n, d);
d.get = null;
d.set = null;
};
var _ = {
get: null,
enumerable: !1,
configurable: !1
};
h.get = function(t, e, i, n, r) {
_.get = i;
_.enumerable = n;
_.configurable = r;
Object.defineProperty(t, e, _);
_.get = null;
};
var p = {
set: null,
enumerable: !1,
configurable: !1
};
h.set = function(t, e, i, n, r) {
p.set = i;
p.enumerable = n;
p.configurable = r;
Object.defineProperty(t, e, p);
p.set = null;
};
h.getClassName = function(i) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = i.prototype;
if (n && n.hasOwnProperty("__classname__") && n.__classname__) return n.__classname__;
var r = "";
i.name && (r = i.name);
if (i.toString) {
var o, s = i.toString();
(o = "[" === s.charAt(0) ? s.match(/\[\w+\s*(\w+)\]/) : s.match(/function\s*(\w+)/)) && 2 === o.length && (r = o[1]);
}
return "Object" !== r ? r : "";
}
return i && i.constructor ? h.getClassName(i.constructor) : "";
};
(function() {
function i(t, e) {
return function(i, n) {
n.prototype.hasOwnProperty(t) && delete e[n.prototype[t]];
h.value(n.prototype, t, i);
if (i) {
var r = e[i];
if (r && r !== n) {
var o = "A Class already exists with the same " + t + ' : "' + i + '".';
0;
cc.error(o);
} else e[i] = n;
}
};
}
var n = {}, r = {};
h._setClassId = i("__cid__", n);
var o = i("__classname__", r);
h.setClassName = function(t, e) {
o(t, e);
if (!e.prototype.hasOwnProperty("__cid__")) {
var i = t || l.getNewId();
i && h._setClassId(i, e);
}
};
h.unregisterClass = function() {
for (var t = 0; t < arguments.length; t++) {
var e = arguments[t].prototype, i = e.__cid__;
i && delete n[i];
var o = e.__classname__;
o && delete r[o];
}
};
h._getClassById = function(t) {
return n[t];
};
h.getClassByName = function(t) {
return r[t];
};
h._getClassId = function(i, n) {
n = "undefined" === ("object" == (e = typeof n) ? t(n) : e) || n;
if ("function" === ("object" == (e = typeof i) ? t(i) : e) && i.prototype.hasOwnProperty("__cid__")) {
0;
return i.prototype.__cid__;
}
if (i && i.constructor) {
var r = i.constructor.prototype;
if (r && r.hasOwnProperty("__cid__")) {
0;
return i.__cid__;
}
}
return "";
};
0;
})();
h.obsolete = function(t, e, i, n) {
function r() {
0;
return this[i];
}
var o = /([^.]+)$/.exec(e)[0];
n ? h.getset(t, o, r, (function(t) {
0;
this[i] = t;
})) : h.get(t, o, r);
};
h.obsoletes = function(t, e, i, n) {
for (var r in i) {
var o = i[r];
h.obsolete(t, e + "." + r, o, n);
}
};
var g = /(%d)|(%s)/, v = /%s/;
h.formatStr = function() {
var i = arguments.length;
if (0 === i) return "";
var n = arguments[0];
if (1 === i) return "" + n;
if ("string" === ("object" == (e = typeof n) ? t(n) : e) && g.test(n)) for (var r = 1; r < i; ++r) {
var o = arguments[r], s = "number" === ("object" == (e = typeof o) ? t(o) : e) ? g : v;
s.test(n) ? n = n.replace(s, o) : n += " " + o;
} else for (var c = 1; c < i; ++c) n += " " + arguments[c];
return n;
};
h.shiftArguments = function() {
for (var t = arguments.length - 1, e = new Array(t), i = 0; i < t; ++i) e[i] = arguments[i + 1];
return e;
};
h.createMap = function(t) {
var e = Object.create(null);
if (t) {
e["."] = !0;
e["/"] = !0;
delete e["."];
delete e["/"];
}
return e;
};
var m = Array.prototype.indexOf;
h.array = {
remove: a,
fastRemove: function(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
t[i] = t[t.length - 1];
--t.length;
}
},
removeAt: c,
fastRemoveAt: function(t, e) {
var i = t.length;
if (!(e < 0 || e >= i)) {
t[e] = t[i - 1];
t.length = i - 1;
}
},
contains: function(t, e) {
return t.indexOf(e) >= 0;
},
verifyType: function(t, e) {
if (t && t.length > 0) for (var i = 0; i < t.length; i++) if (!(t[i] instanceof e)) {
cc.logID(1300);
return !1;
}
return !0;
},
removeArray: function(t, e) {
for (var i = 0, n = e.length; i < n; i++) a(t, e[i]);
},
appendObjectsAt: function(t, e, i) {
t.splice.apply(t, [ i, 0 ].concat(e));
return t;
},
copy: function(t) {
var e, i = t.length, n = new Array(i);
for (e = 0; e < i; e += 1) n[e] = t[e];
return n;
},
indexOf: m,
MutableForwardIterator: i("../utils/mutable-forward-iterator")
};
u.prototype._get = function() {
if (this.count > 0) {
--this.count;
var t = this._pool[this.count];
this._pool[this.count] = null;
return t;
}
return null;
};
u.prototype.put = function(t) {
var e = this._pool;
if (this.count < e.length) {
if (this._cleanup && !1 === this._cleanup(t)) return;
e[this.count] = t;
++this.count;
}
};
u.prototype.resize = function(t) {
if (t >= 0) {
this._pool.length = t;
this.count > t && (this.count = t);
}
};
h.Pool = u;
cc.js = h;
n.exports = h;
}), {
"../utils/mutable-forward-iterator": 104,
"./id-generater": 89
} ],
94: [ (function(i, n, r) {
function o(t, e, i, n) {
if (t.get || t.set) 0; else if (t.hasOwnProperty("default")) {
var r = "_N$" + e;
t.get = function() {
return this[r];
};
t.set = function(t) {
var e = this[r];
this[r] = t;
i.call(this, e);
};
var o = {};
n[r] = o;
for (var s in u) {
var c = u[s];
if (t.hasOwnProperty(s)) {
o[s] = t[s];
c.canUsedInGet || delete t[s];
}
}
} else 0;
}
function s(t, e, i, n) {
Array.isArray(n) && n.length > 0 && (n = n[0]);
0;
t.type = n;
}
function c(t, e, i, n) {
if (Array.isArray(e)) {
if (!(e.length > 0)) return cc.errorID(5508, i, n);
if (cc.RawAsset.isRawAssetType(e[0])) {
t.url = e[0];
delete t.type;
return;
}
t.type = e = e[0];
}
0;
}
function a(t, e, i, n) {
0;
}
var u = {
url: {
canUsedInGet: !0
},
default: {},
serializable: {},
editorOnly: {},
rawType: {},
formerlySerializedAs: {}
};
r.getFullFormOfProperty = function(i) {
if (!(i && i.constructor === Object)) {
if (Array.isArray(i) && i.length > 0) return {
default: [],
type: i,
_short: !0
};
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = i;
return cc.RawAsset.isRawAssetType(n) ? {
default: "",
url: n,
_short: !0
} : {
default: cc.isChildClassOf(n, cc.ValueType) ? new n() : null,
type: n,
_short: !0
};
}
return {
default: i,
_short: !0
};
}
return null;
};
r.preprocessAttrs = function(t, e, i, n) {
for (var u in t) {
var l = t[u], h = r.getFullFormOfProperty(l);
h && (l = t[u] = h);
if (l) {
var f = l.notify;
f && o(l, u, f, t);
"type" in l && c(l, l.type, e, u);
"url" in l && s(l, 0, 0, l.url);
"type" in l && a(0, l.type);
}
}
};
0;
r.validateMethodWithProps = function(i, n, r, o, s) {
0;
if ("function" !== ("object" == (e = typeof i) ? t(i) : e) && null !== i) {
return !1;
}
0;
return !0;
};
}), {
"./CCClass": 78
} ],
95: [ (function(t, e, i) {
var n = [];
cc._RF = {
push: function(t, e, i) {
if (void 0 === i) {
i = e;
e = "";
}
n.push({
uuid: e,
script: i,
module: t,
exports: t.exports,
beh: null
});
},
pop: function() {
var t = n.pop(), e = t.module, i = e.exports;
if (i === t.exports) {
for (var r in i) return;
e.exports = i = t.cls;
}
},
peek: function() {
return n[n.length - 1];
}
};
0;
}), {} ],
96: [ (function(t, e, i) {
var n = {};
cc.url = {
_rawAssets: "",
_builtinRawAssets: "",
normalize: function(t) {
46 === t.charCodeAt(0) && 47 === t.charCodeAt(1) ? t = t.slice(2) : 47 === t.charCodeAt(0) && (t = t.slice(1));
return t;
},
raw: function(t) {
0;
(t = this.normalize(t)).startsWith("resources/") || cc.errorID(7002, t);
return this._rawAssets + t;
},
builtinRaw: !1,
_init: function(t) {
for (var e in t) {
var i = t[e];
i = cc.path.stripSep(i) + "/";
n[e] = i;
}
this._rawAssets = n.assets;
this._builtinRawAssets = n.internal;
}
};
e.exports = cc.url;
}), {} ],
97: [ (function(i, n, r) {
n.exports = {
contains: function(i, n) {
if ("function" == ("object" == (e = typeof i.contains) ? t(i.contains) : e)) return i.contains(n);
if ("function" == ("object" == (e = typeof i.compareDocumentPosition) ? t(i.compareDocumentPosition) : e)) return !!(16 & i.compareDocumentPosition(n));
var r = n.parentNode;
if (r) do {
if (r === i) return !0;
r = r.parentNode;
} while (null !== r);
return !1;
},
isDomNode: "object" === ("object" == (e = typeof window) ? t(window) : e) && ("function" === ("object" == (e = typeof Node) ? t(Node) : e) ? function(t) {
return t instanceof Node;
} : function(i) {
return i && "object" === ("object" == (e = typeof i) ? t(i) : e) && "number" === ("object" == (e = typeof i.nodeType) ? t(i.nodeType) : e) && "string" === ("object" == (e = typeof i.nodeName) ? t(i.nodeName) : e);
}),
callInNextTick: function(t, e, i) {
t && cc.director.once(cc.Director._EVENT_NEXT_TICK, (function() {
t(e, i);
}));
}
};
0;
0;
}), {} ],
98: [ (function(t, e, i) {
t("../platform/CCSys");
var n = /(\.[^\.\/\?\\]*)(\?.*)?$/, r = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/, o = /[^\.\/]+\/\.\.\//;
cc.path = {
join: function() {
for (var t = arguments.length, e = "", i = 0; i < t; i++) e = (e + ("" === e ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
return e;
},
extname: function(t) {
var e = n.exec(t);
return e ? e[1] : "";
},
mainFileName: function(t) {
if (t) {
var e = t.lastIndexOf(".");
if (-1 !== e) return t.substring(0, e);
}
return t;
},
basename: function(t, e) {
var i = t.indexOf("?");
i > 0 && (t = t.substring(0, i));
var n = /(\/|\\\\)([^(\/|\\\\)]+)$/g.exec(t.replace(/(\/|\\\\)$/, ""));
if (!n) return null;
var r = n[2];
return e && t.substring(t.length - e.length).toLowerCase() === e.toLowerCase() ? r.substring(0, r.length - e.length) : r;
},
dirname: function(t) {
var e = r.exec(t);
return e ? e[2] : "";
},
changeExtname: function(t, e) {
e = e || "";
var i = t.indexOf("?"), n = "";
if (i > 0) {
n = t.substring(i);
t = t.substring(0, i);
}
return (i = t.lastIndexOf(".")) < 0 ? t + e + n : t.substring(0, i) + e + n;
},
changeBasename: function(t, e, i) {
if (0 === e.indexOf(".")) return this.changeExtname(t, e);
var n = t.indexOf("?"), r = "", o = i ? this.extname(t) : "";
if (n > 0) {
r = t.substring(n);
t = t.substring(0, n);
}
n = (n = t.lastIndexOf("/")) <= 0 ? 0 : n + 1;
return t.substring(0, n) + e + o + r;
},
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(o, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
};
e.exports = cc.path;
}), {
"../platform/CCSys": 83
} ],
99: [ (function(i, n, r) {
function o(i) {
if (!i) {
cc.errorID(3804);
return null;
}
return "string" === ("object" == (e = typeof i) ? t(i) : e) ? d.getClassByName(i) : i;
}
function s(t, e) {
if (e._sealed) for (var i = 0; i < t._components.length; ++i) {
var n = t._components[i];
if (n.constructor === e) return n;
} else for (var r = 0; r < t._components.length; ++r) {
var o = t._components[r];
if (o instanceof e) return o;
}
return null;
}
function c(t, e, i) {
if (e._sealed) for (var n = 0; n < t._components.length; ++n) {
var r = t._components[n];
r.constructor === e && i.push(r);
} else for (var o = 0; o < t._components.length; ++o) {
var s = t._components[o];
s instanceof e && i.push(s);
}
}
function a(t, e) {
for (var i = 0; i < t.length; ++i) {
var n = t[i], r = s(n, e);
if (r) return r;
if (n._children.length > 0 && (r = a(n._children, e))) return r;
}
return null;
}
function u(t, e, i) {
for (var n = 0; n < t.length; ++n) {
var r = t[n];
c(r, e, i);
r._children.length > 0 && u(r._children, e, i);
}
}
var l = i("../platform/CCObject").Flags, h = i("./misc"), f = i("../platform/id-generater"), d = (i("../event-manager"), 
cc.js), _ = l.Destroying, p = l.DontDestroy, g = new f("Node"), v = cc.Class({
name: "cc._BaseNode",
extends: cc.Object,
mixins: [ cc.EventTarget ],
properties: {
_parent: null,
_children: [],
_tag: cc.macro.NODE_TAG_INVALID,
_active: !0,
_components: [],
_prefab: null,
_persistNode: {
get: function() {
return (this._objFlags & p) > 0;
},
set: function(t) {
t ? this._objFlags |= p : this._objFlags &= ~p;
}
},
name: {
get: function() {
return this._name;
},
set: function(t) {
0;
this._name = t;
}
},
_id: {
default: "",
editorOnly: !0
},
uuid: {
get: function() {
var t = this._id;
t || (t = this._id = g.getNewId());
return t;
}
},
children: {
get: function() {
return this._children;
}
},
childrenCount: {
get: function() {
return this._children.length;
}
},
active: {
get: function() {
return this._active;
},
set: function(t) {
t = !!t;
if (this._active !== t) {
this._active = t;
var e = this._parent;
if (e) {
e._activeInHierarchy && cc.director._nodeActivator.activateNode(this, t);
}
}
}
},
activeInHierarchy: {
get: function() {
return this._activeInHierarchy;
}
}
},
ctor: function(i) {
this._name = "undefined" !== ("object" == (e = typeof i) ? t(i) : e) ? i : "New Node";
this._activeInHierarchy = !1;
this.__instanceId = this._id || cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
getTag: function() {
return this._tag;
},
setTag: function(t) {
this._tag = t;
},
getParent: function() {
return this._parent;
},
setParent: function(t) {
if (this._parent !== t) {
0;
var e = this._parent;
this._parent = t || null;
this._onSetParent(t);
if (t) {
0;
t._children.push(this);
t.emit("child-added", this);
}
if (e) {
if (!(e._objFlags & _)) {
var i = e._children.indexOf(this);
0;
e._children.splice(i, 1);
e.emit("child-removed", this);
this._onHierarchyChanged(e);
}
} else t && this._onHierarchyChanged(null);
}
},
init: function() {
return !0;
},
attr: function(t) {
d.mixin(this, t);
},
getChildByTag: function(t) {
var e = this._children;
if (null !== e) for (var i = 0; i < e.length; i++) {
var n = e[i];
if (n && n._tag === t) return n;
}
return null;
},
getChildByUuid: function(t) {
if (!t) {
cc.log("Invalid uuid");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._id === t) return e[i];
return null;
},
getChildByName: function(t) {
if (!t) {
cc.log("Invalid name");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._name === t) return e[i];
return null;
},
addChild: function(t) {
0;
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.setParent(this);
},
insertChild: function(t, e) {
t.parent = this;
t.setSiblingIndex(e);
},
getSiblingIndex: function() {
return this._parent ? this._parent._children.indexOf(this) : 0;
},
setSiblingIndex: function(t) {
if (this._parent) {
var e = this._parent._children;
t = -1 !== t ? t : e.length - 1;
var i = e.indexOf(this);
if (t !== i) {
e.splice(i, 1);
t < e.length ? e.splice(t, 0, this) : e.push(this);
this._onSiblingIndexChanged && this._onSiblingIndexChanged(t);
}
}
},
cleanup: function() {},
removeFromParent: function(t) {
if (this._parent) {
void 0 === t && (t = !0);
this._parent.removeChild(this, t);
}
},
removeChild: function(t, e) {
if (this._children.indexOf(t) > -1) {
(e || void 0 === e) && t.cleanup();
t.parent = null;
}
},
removeChildByTag: function(t, e) {
t === cc.macro.NODE_TAG_INVALID && cc.logID(1609);
var i = this.getChildByTag(t);
i ? this.removeChild(i, e) : cc.logID(1610, t);
},
removeAllChildren: function(t) {
var e = this._children;
void 0 === t && (t = !0);
for (var i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n) {
t && n.cleanup();
n.parent = null;
}
}
this._children.length = 0;
},
isChildOf: function(t) {
var e = this;
do {
if (e === t) return !0;
e = e._parent;
} while (e);
return !1;
},
getComponent: function(t) {
var e = o(t);
return e ? s(this, e) : null;
},
getComponents: function(t) {
var e = o(t), i = [];
e && c(this, e, i);
return i;
},
getComponentInChildren: function(t) {
var e = o(t);
return e ? a(this._children, e) : null;
},
getComponentsInChildren: function(t) {
var e = o(t), i = [];
if (e) {
c(this, e, i);
u(this._children, e, i);
}
return i;
},
_checkMultipleComp: !1,
addComponent: function(i) {
0;
var n;
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
if (!(n = d.getClassByName(i))) {
cc.errorID(3807, i);
cc._RFpeek() && cc.errorID(3808, i);
return null;
}
} else {
if (!i) {
cc.errorID(3804);
return null;
}
n = i;
}
if ("function" !== ("object" == (e = typeof n) ? t(n) : e)) {
cc.errorID(3809);
return null;
}
if (!cc.isChildClassOf(n, cc.Component)) {
cc.errorID(3810);
return null;
}
0;
var r = n._requireComponent;
if (r && !this.getComponent(r)) {
if (!this.addComponent(r)) return null;
}
var o = new n();
o.node = this;
this._components.push(o);
this._activeInHierarchy && cc.director._nodeActivator.activateComp(o);
return o;
},
_addComponentAt: !1,
removeComponent: function(t) {
if (t) {
t instanceof cc.Component || (t = this.getComponent(t));
t && t.destroy();
} else cc.errorID(3813);
},
_getDependComponent: !1,
_removeComponent: function(t) {
if (t) {
if (!(this._objFlags & _)) {
var e = this._components.indexOf(t);
-1 !== e ? this._components.splice(e, 1) : t.node !== this && cc.errorID(3815);
}
} else cc.errorID(3814);
},
_disableChildComps: function() {
var t, e = this._components.length;
for (t = 0; t < e; ++t) {
var i = this._components[t];
i._enabled && cc.director._compScheduler.disableComp(i);
}
for (t = 0, e = this._children.length; t < e; ++t) {
var n = this._children[t];
n._active && n._disableChildComps();
}
},
destroy: function() {
cc.Object.prototype.destroy.call(this) && this._activeInHierarchy && this._disableChildComps();
},
destroyAllChildren: function() {
for (var t = this._children, e = 0; e < t.length; ++e) t[e].destroy();
},
_onSetParent: function(t) {},
_onPostActivated: function() {},
_onHierarchyChanged: function(t) {
var e = this._parent;
if (this._persistNode && !(e instanceof cc.Scene)) {
cc.game.removePersistRootNode(this);
0;
}
var i = this._active && !(!e || !e._activeInHierarchy);
this._activeInHierarchy !== i && cc.director._nodeActivator.activateNode(this, i);
},
_onBatchCreated: function() {
var t = this._prefab;
t && t.sync && !t._synced && t.root === this && PrefabHelper.syncWithPrefab(this);
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
var e = this._prefab;
0;
e && this === e.root && e.sync && (t._prefab._synced = e._synced);
t._parent = null;
t._onBatchCreated();
return t;
},
_registerIfAttached: !1,
_onPreDestroy: function() {
var t, e;
this._objFlags |= _;
var i = this._parent, n = i && i._objFlags & _;
0;
var r = this._children;
for (t = 0, e = r.length; t < e; ++t) r[t]._destroyImmediate();
for (t = 0, e = this._components.length; t < e; ++t) {
this._components[t]._destroyImmediate();
}
var o = this.__eventTargets;
for (t = 0, e = o.length; t < e; ++t) {
var s = o[t];
s && s.targetOff(this);
}
o.length = 0;
this._persistNode && cc.game.removePersistRootNode(this);
if (!n && i) {
var c = i._children.indexOf(this);
i._children.splice(c, 1);
i.emit("child-removed", this);
}
return n;
},
onRestore: !1
});
v.prototype._onPreDestroyBase = v.prototype._onPreDestroy;
0;
v.prototype._onHierarchyChangedBase = v.prototype._onHierarchyChanged;
0;
h.propertyDefine(v, [ "name", "children", "childrenCount" ], {});
0;
cc._BaseNode = n.exports = v;
}), {
"../event-manager": 50,
"../platform/CCObject": 82,
"../platform/id-generater": 89,
"./misc": 103
} ],
100: [ (function(t, e, i) {
var n = 1e-6;
e.exports = {
binarySearchEpsilon: function(t, e) {
for (var i = 0, r = t.length - 1, o = r >>> 1; i <= r; o = i + r >>> 1) {
var s = t[o];
if (s > e + n) r = o - 1; else {
if (!(s < e - n)) return o;
i = o + 1;
}
}
return ~i;
}
};
}), {} ],
101: [ (function(t, e, i) {
var n = t("./misc").BASE64_VALUES, r = "0123456789abcdef".split(""), o = [ "", "", "", "" ], s = o.concat(o, "-", o, "-", o, "-", o, "-", o, o, o), c = s.map((function(t, e) {
return "-" === t ? NaN : e;
})).filter(isFinite);
e.exports = function(t) {
if (22 !== t.length) return t;
s[0] = t[0];
s[1] = t[1];
for (var e = 2, i = 2; e < 22; e += 2) {
var o = n[t.charCodeAt(e)], a = n[t.charCodeAt(e + 1)];
s[c[i++]] = r[o >> 2];
s[c[i++]] = r[(3 & o) << 2 | a >> 4];
s[c[i++]] = r[15 & a];
}
return s.join("");
};
0;
}), {
"./misc": 103
} ],
102: [ (function(t, e, i) {
cc.find = e.exports = function(t, e) {
if (null == t) {
cc.errorID(5600);
return null;
}
if (e) 0; else {
var i = cc.director.getScene();
if (!i) {
0;
return null;
}
0;
e = i;
}
for (var n = e, r = "/" !== t[0] ? 0 : 1, o = t.split("/"), s = r; s < o.length; s++) {
var c = o[s], a = n._children;
n = null;
for (var u = 0, l = a.length; u < l; ++u) {
var h = a[u];
if (h.name === c) {
n = h;
break;
}
}
if (!n) return null;
}
return n;
};
}), {} ],
103: [ (function(t, e, i) {
var n = t("../platform/js"), r = t("../platform/CCSys"), o = i;
o.propertyDefine = function(t, e, i) {
function n(t, e, i, n) {
var r = Object.getOwnPropertyDescriptor(t, e);
if (r) {
r.get && (t[i] = r.get);
r.set && n && (t[n] = r.set);
} else {
var o = t[i];
cc.js.getset(t, e, o, t[n]);
}
}
for (var r, o = t.prototype, s = 0; s < e.length; s++) {
var c = (r = e[s])[0].toUpperCase() + r.slice(1);
n(o, r, "get" + c, "set" + c);
}
for (r in i) {
var a = i[r];
n(o, r, a[0], a[1]);
}
};
o.NextPOT = function(t) {
t -= 1;
t |= t >> 1;
t |= t >> 2;
t |= t >> 4;
t |= t >> 8;
return (t |= t >> 16) + 1;
};
0;
o.imagePool = new n.Pool(function(t) {
if (t instanceof HTMLImageElement) {
t.src = this._smallImg;
return !0;
}
return !1;
}, 10);
o.imagePool.get = function() {
return this._get() || new Image();
};
o.imagePool._smallImg = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
r.os !== r.OS_WINDOWS && r.os !== r.OS_LINUX || r.browserType === r.BROWSER_TYPE_CHROME || o.imagePool.resize(0);
o.BUILTIN_CLASSID_RE = /^(?:cc|dragonBones|sp|ccsg)\..+/;
for (var s = new Array(123), c = 0; c < 123; ++c) s[c] = 64;
for (var a = 0; a < 64; ++a) s["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(a)] = a;
o.BASE64_VALUES = s;
o.pushToMap = function(t, e, i, n) {
var r = t[e];
if (r) if (Array.isArray(r)) if (n) {
r.push(r[0]);
r[0] = i;
} else r.push(i); else t[e] = n ? [ i, r ] : [ r, i ]; else t[e] = i;
};
}), {
"../platform/CCSys": 83,
"../platform/js": 93
} ],
104: [ (function(t, e, i) {
function n(t) {
this.i = 0;
this.array = t;
}
var r = n.prototype;
r.remove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.removeAt(e);
};
r.removeAt = function(t) {
this.array.splice(t, 1);
t <= this.i && --this.i;
};
r.fastRemove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.fastRemoveAt(e);
};
r.fastRemoveAt = function(t) {
var e = this.array;
e[t] = e[e.length - 1];
--e.length;
t <= this.i && --this.i;
};
r.push = function(t) {
this.array.push(t);
};
e.exports = n;
}), {} ],
105: [ (function(t, e, i) {
cc._PrefabInfo = cc.Class({
name: "cc.PrefabInfo",
properties: {
root: null,
asset: null,
fileId: "",
sync: !1,
_synced: {
default: !1,
serializable: !1
}
}
});
e.exports = {
syncWithPrefab: function(t) {
var e = t._prefab;
e._synced = !0;
if (e.asset) {
var i = t._objFlags, n = t._parent, r = t._id, o = t._name, s = t._active, c = t._position.x, a = t._position.y, u = t._rotationX, l = t._rotationY, h = t._localZOrder, f = t._globalZOrder;
cc.game._isCloning = !0;
e.asset._doInstantiate(t);
cc.game._isCloning = !1;
t._objFlags = i;
t._parent = n;
t._id = r;
t._prefab = e;
t._name = o;
t._active = s;
t._position.x = c;
t._position.y = a;
t._rotationX = u;
t._rotationY = l;
t._localZOrder = h;
t._globalZOrder = f;
} else {
cc.errorID(3701, t.name);
t._prefab = null;
}
}
};
}), {} ],
106: [ (function(t, e, i) {
var n = {
removeSgNode: function() {
var t = this._sgNode;
if (t) {
var e = t._parent;
e ? e.removeChild(t) : t.cleanup();
t._entity && (t._entity = null);
}
}
};
0;
e.exports = n;
}), {} ],
107: [ (function(t, e, i) {
cc.AffineTransform = function(t, e, i, n, r, o) {
this.a = t;
this.b = e;
this.c = i;
this.d = n;
this.tx = r;
this.ty = o;
};
cc.affineTransformMake = function(t, e, i, n, r, o) {
return {
a: t,
b: e,
c: i,
d: n,
tx: r,
ty: o
};
};
cc.affineTransformClone = function(t) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx,
ty: t.ty
};
};
cc.pointApplyAffineTransform = function(t, e, i) {
var n, r;
if (void 0 === i) {
i = e;
n = t.x;
r = t.y;
} else {
n = t;
r = e;
}
return {
x: i.a * n + i.c * r + i.tx,
y: i.b * n + i.d * r + i.ty
};
};
cc._pointApplyAffineTransformIn = function(t, e, i, n) {
var r, o, s;
if (void 0 === n) {
s = e;
r = t.x;
o = t.y;
n = i;
} else {
r = t;
o = e;
s = i;
}
n.x = s.a * r + s.c * o + s.tx;
n.y = s.b * r + s.d * o + s.ty;
};
cc._pointApplyAffineTransform = function(t, e, i) {
return cc.pointApplyAffineTransform(t, e, i);
};
cc.sizeApplyAffineTransform = function(t, e) {
return {
width: e.a * t.width + e.c * t.height,
height: e.b * t.width + e.d * t.height
};
};
cc.affineTransformMakeIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.affineTransformIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.rectApplyAffineTransform = function(t, e) {
var i = t.x, n = t.y, r = i + t.width, o = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * r + e.c * n + e.tx, u = e.b * r + e.d * n + e.ty, l = e.a * i + e.c * o + e.tx, h = e.b * i + e.d * o + e.ty, f = e.a * r + e.c * o + e.tx, d = e.b * r + e.d * o + e.ty, _ = Math.min(s, a, l, f), p = Math.max(s, a, l, f), g = Math.min(c, u, h, d), v = Math.max(c, u, h, d);
return cc.rect(_, g, p - _, v - g);
};
cc._rectApplyAffineTransformIn = function(t, e) {
var i = t.x, n = t.y, r = i + t.width, o = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * r + e.c * n + e.tx, u = e.b * r + e.d * n + e.ty, l = e.a * i + e.c * o + e.tx, h = e.b * i + e.d * o + e.ty, f = e.a * r + e.c * o + e.tx, d = e.b * r + e.d * o + e.ty, _ = Math.min(s, a, l, f), p = Math.max(s, a, l, f), g = Math.min(c, u, h, d), v = Math.max(c, u, h, d);
t.x = _;
t.y = g;
t.width = p - _;
t.height = v - g;
return t;
};
cc.obbApplyAffineTransform = function(t, e, i, n, r, o) {
var s = t.x, c = t.y, a = t.width, u = t.height, l = e.a * s + e.c * c + e.tx, h = e.b * s + e.d * c + e.ty, f = e.a * a, d = e.b * a, _ = e.c * u, p = e.d * u;
n.x = l;
n.y = h;
r.x = f + l;
r.y = d + h;
i.x = _ + l;
i.y = p + h;
o.x = f + _ + l;
o.y = d + p + h;
};
cc.affineTransformTranslate = function(t, e, i) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx + t.a * e + t.c * i,
ty: t.ty + t.b * e + t.d * i
};
};
cc.affineTransformScale = function(t, e, i) {
return {
a: t.a * e,
b: t.b * e,
c: t.c * i,
d: t.d * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformRotate = function(t, e) {
var i = Math.sin(e), n = Math.cos(e);
return {
a: t.a * n + t.c * i,
b: t.b * n + t.d * i,
c: t.c * n - t.a * i,
d: t.d * n - t.b * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformConcat = function(t, e) {
return {
a: t.a * e.a + t.b * e.c,
b: t.a * e.b + t.b * e.d,
c: t.c * e.a + t.d * e.c,
d: t.c * e.b + t.d * e.d,
tx: t.tx * e.a + t.ty * e.c + e.tx,
ty: t.tx * e.b + t.ty * e.d + e.ty
};
};
cc.affineTransformConcatIn = function(t, e) {
var i = t.a, n = t.b, r = t.c, o = t.d, s = t.tx, c = t.ty;
t.a = i * e.a + n * e.c;
t.b = i * e.b + n * e.d;
t.c = r * e.a + o * e.c;
t.d = r * e.b + o * e.d;
t.tx = s * e.a + c * e.c + e.tx;
t.ty = s * e.b + c * e.d + e.ty;
return t;
};
cc.affineTransformEqualToTransform = function(t, e) {
return t.a === e.a && t.b === e.b && t.c === e.c && t.d === e.d && t.tx === e.tx && t.ty === e.ty;
};
cc.affineTransformInvert = function(t) {
var e = 1 / (t.a * t.d - t.b * t.c);
return {
a: e * t.d,
b: -e * t.b,
c: -e * t.c,
d: e * t.a,
tx: e * (t.c * t.ty - t.d * t.tx),
ty: e * (t.b * t.tx - t.a * t.ty)
};
};
cc.affineTransformInvertIn = function(t) {
var e = t.a, i = t.b, n = t.c, r = t.d, o = 1 / (e * r - i * n), s = t.tx, c = t.ty;
t.a = o * r;
t.b = -o * i;
t.c = -o * n;
t.d = o * e;
t.tx = o * (n * c - r * s);
t.ty = o * (i * s - e * c);
return t;
};
cc.affineTransformInvertOut = function(t, e) {
var i = t.a, n = t.b, r = t.c, o = t.d, s = 1 / (i * o - n * r);
e.a = s * o;
e.b = -s * n;
e.c = -s * r;
e.d = s * i;
e.tx = s * (r * t.ty - o * t.tx);
e.ty = s * (n * t.tx - i * t.ty);
};
}), {} ],
108: [ (function(i, n, r) {
var o = i("./CCValueType"), s = i("../platform/js"), c = (function() {
function n(i, n, r, o) {
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.g;
r = i.b;
o = i.a;
i = i.r;
}
i = i || 0;
n = n || 0;
r = r || 0;
o = "number" === ("object" == (e = typeof o) ? t(o) : e) ? o : 255;
this._val = (~~i << 24 >>> 0) + (~~n << 16) + (~~r << 8) + ~~o;
}
s.extend(n, o);
i("../platform/CCClass").fastDefine("cc.Color", n, {
r: 0,
g: 0,
b: 0,
a: 255
});
var r = {
WHITE: [ 255, 255, 255, 255 ],
BLACK: [ 0, 0, 0, 255 ],
TRANSPARENT: [ 0, 0, 0, 0 ],
GRAY: [ 127.5, 127.5, 127.5 ],
RED: [ 255, 0, 0 ],
GREEN: [ 0, 255, 0 ],
BLUE: [ 0, 0, 255 ],
YELLOW: [ 255, 235, 4 ],
ORANGE: [ 255, 127, 0 ],
CYAN: [ 0, 255, 255 ],
MAGENTA: [ 255, 0, 255 ]
};
for (var c in r) s.get(n, c, (function(t) {
return function() {
return new n(t[0], t[1], t[2], t[3]);
};
})(r[c]));
var a = n.prototype;
a.clone = function() {
var t = new n();
t._val = this._val;
return t;
};
a.equals = function(t) {
return t && this._val === t._val;
};
a.lerp = function(t, e, i) {
i = i || new n();
var r = this.r, o = this.g, s = this.b, c = this.a;
i.r = r + (t.r - r) * e;
i.g = o + (t.g - o) * e;
i.b = s + (t.b - s) * e;
i.a = c + (t.a - c) * e;
return i;
};
a.toString = function() {
return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
};
a.getR = function() {
return (4278190080 & this._val) >>> 24;
};
a.setR = function(t) {
this._val = (16777215 & this._val | ~~t << 24 >>> 0) >>> 0;
return this;
};
a.getG = function() {
return (16711680 & this._val) >> 16;
};
a.setG = function(t) {
this._val = (4278255615 & this._val | ~~t << 16) >>> 0;
return this;
};
a.getB = function() {
return (65280 & this._val) >> 8;
};
a.setB = function(t) {
this._val = (4294902015 & this._val | ~~t << 8) >>> 0;
return this;
};
a.getA = function() {
return 255 & this._val;
};
a.setA = function(t) {
this._val = (4294967040 & this._val | ~~t) >>> 0;
return this;
};
s.getset(a, "r", a.getR, a.setR, !0);
s.getset(a, "g", a.getG, a.setG, !0);
s.getset(a, "b", a.getB, a.setB, !0);
s.getset(a, "a", a.getA, a.setA, !0);
a.toCSS = function(t) {
return "rgba" === t ? "rgba(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + "," + (this.a / 255).toFixed(2) + ")" : "rgb" === t ? "rgb(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + ")" : "#" + this.toHEX(t);
};
a.clamp = function() {};
a.fromHEX = function(t) {
t.length < 8 && (t += "FF");
var e = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16);
this._val = (0 & this._val | e) >>> 0;
return this;
};
a.toHEX = function(t) {
var e = [ (0 | this.r).toString(16), (0 | this.g).toString(16), (0 | this.b).toString(16) ], i = -1;
if ("#rgb" === t) for (i = 0; i < e.length; ++i) e[i].length > 1 && (e[i] = e[i][0]); else if ("#rrggbb" === t) for (i = 0; i < e.length; ++i) 1 === e[i].length && (e[i] = "0" + e[i]);
return e.join("");
};
a.toRGBValue = function() {
return 16777215 & this._val;
};
a.fromHSV = function(t, e, i) {
var r = n.hsv2rgb(t, e, i);
this._val = (r.r << 24 >>> 0) + (r.g << 16) + (r.b << 8) + this.a;
return this;
};
a.toHSV = function() {
return n.rgb2hsv(this.r, this.g, this.b);
};
a.fromColor = function(t) {
if (t._val) this._val = t._val; else {
this.r = t.r;
this.g = t.g;
this.b = t.b;
this.a = t.a;
}
};
return n;
})();
c.rgb2hsv = function(t, e, i) {
t /= 255;
e /= 255;
i /= 255;
var n = {
h: 0,
s: 0,
v: 0
}, r = Math.max(t, e, i), o = Math.min(t, e, i), s = 0;
n.v = r;
n.s = r ? (r - o) / r : 0;
if (n.s) {
s = r - o;
n.h = t === r ? (e - i) / s : e === r ? 2 + (i - t) / s : 4 + (t - e) / s;
n.h /= 6;
n.h < 0 && (n.h += 1);
} else n.h = 0;
return n;
};
c.hsv2rgb = function(t, e, i) {
var n = {
r: 0,
g: 0,
b: 0
};
if (0 === e) n.r = n.g = n.b = i; else if (0 === i) n.r = n.g = n.b = 0; else {
1 === t && (t = 0);
t *= 6;
e = e;
i = i;
var r = Math.floor(t), o = t - r, s = i * (1 - e), c = i * (1 - e * o), a = i * (1 - e * (1 - o));
switch (r) {
case 0:
n.r = i;
n.g = a;
n.b = s;
break;

case 1:
n.r = c;
n.g = i;
n.b = s;
break;

case 2:
n.r = s;
n.g = i;
n.b = a;
break;

case 3:
n.r = s;
n.g = c;
n.b = i;
break;

case 4:
n.r = a;
n.g = s;
n.b = i;
break;

case 5:
n.r = i;
n.g = s;
n.b = c;
}
}
n.r *= 255;
n.g *= 255;
n.b *= 255;
return n;
};
cc.Color = c;
cc.color = function(i, n, r, o) {
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
return new cc.Color().fromHEX(i);
}
return "object" === ("object" == (e = typeof i) ? t(i) : e) ? new cc.Color(i.r, i.g, i.b, i.a) : new cc.Color(i, n, r, o);
};
cc.colorEqual = function(t, e) {
return void 0 !== t._val && void 0 !== e._val ? t._val === e._val : t.r === e.r && t.g === e.g && t.b === e.b;
};
cc.hexToColor = function(t) {
t = t.replace(/^#?/, "0x");
var e = parseInt(t), i = e >> 16, n = (65280 & e) >> 8, r = 255 & e;
return cc.color(i, n, r);
};
cc.colorToHex = function(t) {
var e = t.r.toString(16), i = t.g.toString(16), n = t.b.toString(16);
return "#" + (t.r < 16 ? "0" + e : e) + (t.g < 16 ? "0" + i : i) + (t.b < 16 ? "0" + n : n);
};
n.exports = cc.Color;
}), {
"../platform/CCClass": 78,
"../platform/js": 93,
"./CCValueType": 114
} ],
109: [ (function(t, e, i) {
var n = parseFloat("1.192092896e-07F");
cc.pNeg = function(t) {
return cc.p(-t.x, -t.y);
};
cc.pAdd = function(t, e) {
return cc.p(t.x + e.x, t.y + e.y);
};
cc.pSub = function(t, e) {
return cc.p(t.x - e.x, t.y - e.y);
};
cc.pMult = function(t, e) {
return cc.p(t.x * e, t.y * e);
};
cc.pMidpoint = function(t, e) {
return cc.pMult(cc.pAdd(t, e), .5);
};
cc.pDot = function(t, e) {
return t.x * e.x + t.y * e.y;
};
cc.pCross = function(t, e) {
return t.x * e.y - t.y * e.x;
};
cc.pPerp = function(t) {
return cc.p(-t.y, t.x);
};
cc.pRPerp = function(t) {
return cc.p(t.y, -t.x);
};
cc.pProject = function(t, e) {
return cc.pMult(e, cc.pDot(t, e) / cc.pDot(e, e));
};
cc.pLengthSQ = function(t) {
return cc.pDot(t, t);
};
cc.pDistanceSQ = function(t, e) {
return cc.pLengthSQ(cc.pSub(t, e));
};
cc.pLength = function(t) {
return Math.sqrt(cc.pLengthSQ(t));
};
cc.pDistance = function(t, e) {
return cc.pLength(cc.pSub(t, e));
};
cc.pNormalize = function(t) {
var e = cc.pLength(t);
return 0 === e ? cc.p(t) : cc.pMult(t, 1 / e);
};
cc.pForAngle = function(t) {
return cc.p(Math.cos(t), Math.sin(t));
};
cc.pToAngle = function(t) {
return Math.atan2(t.y, t.x);
};
cc.clampf = function(t, e, i) {
if (e > i) {
var n = e;
e = i;
i = n;
}
return t < e ? e : t < i ? t : i;
};
cc.clamp01 = function(t) {
return t < 0 ? 0 : t < 1 ? t : 1;
};
cc.pClamp = function(t, e, i) {
return cc.p(cc.clampf(t.x, e.x, i.x), cc.clampf(t.y, e.y, i.y));
};
cc.pFromSize = function(t) {
return cc.p(t.width, t.height);
};
cc.pCompOp = function(t, e) {
return cc.p(e(t.x), e(t.y));
};
cc.pLerp = function(t, e, i) {
return cc.pAdd(cc.pMult(t, 1 - i), cc.pMult(e, i));
};
cc.pFuzzyEqual = function(t, e, i) {
return t.x - i <= e.x && e.x <= t.x + i && t.y - i <= e.y && e.y <= t.y + i;
};
cc.pCompMult = function(t, e) {
return cc.p(t.x * e.x, t.y * e.y);
};
cc.pAngleSigned = function(t, e) {
var i = cc.pNormalize(t), r = cc.pNormalize(e), o = Math.atan2(i.x * r.y - i.y * r.x, cc.pDot(i, r));
return Math.abs(o) < n ? 0 : o;
};
cc.pAngle = function(t, e) {
var i = Math.acos(cc.pDot(cc.pNormalize(t), cc.pNormalize(e)));
return Math.abs(i) < n ? 0 : i;
};
cc.pRotateByAngle = function(t, e, i) {
var n = cc.pSub(t, e), r = Math.cos(i), o = Math.sin(i), s = n.x;
n.x = s * r - n.y * o + e.x;
n.y = s * o + n.y * r + e.y;
return n;
};
cc.pLineIntersect = function(t, e, i, n, r) {
if (t.x === e.x && t.y === e.y || i.x === n.x && i.y === n.y) return !1;
var o = e.x - t.x, s = e.y - t.y, c = n.x - i.x, a = n.y - i.y, u = t.x - i.x, l = t.y - i.y, h = a * o - c * s;
r.x = c * l - a * u;
r.y = o * l - s * u;
if (0 === h) return 0 === r.x || 0 === r.y;
r.x = r.x / h;
r.y = r.y / h;
return !0;
};
cc.pSegmentIntersect = function(t, e, i, n) {
var r = cc.p(0, 0);
return !!(cc.pLineIntersect(t, e, i, n, r) && r.x >= 0 && r.x <= 1 && r.y >= 0 && r.y <= 1);
};
cc.pIntersectPoint = function(t, e, i, n) {
var r = cc.p(0, 0);
if (cc.pLineIntersect(t, e, i, n, r)) {
var o = cc.p(0, 0);
o.x = t.x + r.x * (e.x - t.x);
o.y = t.y + r.x * (e.y - t.y);
return o;
}
return cc.p(0, 0);
};
cc.pSameAs = function(t, e) {
return null != t && null != e && (t.x === e.x && t.y === e.y);
};
cc.pZeroIn = function(t) {
t.x = 0;
t.y = 0;
};
cc.pIn = function(t, e) {
t.x = e.x;
t.y = e.y;
};
cc.pMultIn = function(t, e) {
t.x *= e;
t.y *= e;
};
cc.pSubIn = function(t, e) {
t.x -= e.x;
t.y -= e.y;
};
cc.pAddIn = function(t, e) {
t.x += e.x;
t.y += e.y;
};
cc.pNormalizeIn = function(t) {
cc.pMultIn(t, 1 / Math.sqrt(t.x * t.x + t.y * t.y));
};
}), {} ],
110: [ (function(i, n, r) {
function o(i, n, r, o) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
r = i.width;
o = i.height;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
this.width = r || 0;
this.height = o || 0;
}
var s = i("./CCValueType"), c = i("../platform/js");
c.extend(o, s);
i("../platform/CCClass").fastDefine("cc.Rect", o, {
x: 0,
y: 0,
width: 0,
height: 0
});
o.fromMinMax = function(t, e) {
var i = Math.min(t.x, e.x), n = Math.min(t.y, e.y);
return new o(i, n, Math.max(t.x, e.x) - i, Math.max(t.y, e.y) - n);
};
o.contain = function(t, e) {
return t.x < e.x && t.x + t.width > e.x + e.width && t.y < e.y && t.y + t.height > e.y + e.height ? 1 : e.x < t.x && e.x + e.width > t.x + t.width && e.y < t.y && e.y + e.height > t.y + t.height ? -1 : 0;
};
var a = o.prototype;
a.clone = function() {
return new o(this.x, this.y, this.width, this.height);
};
a.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new o();
var n = this.x, r = this.y, s = this.width, c = this.height;
i.x = n + (t.x - n) * e;
i.y = r + (t.y - r) * e;
i.width = s + (t.width - s) * e;
i.height = c + (t.height - c) * e;
return i;
};
a.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
c.getset(a, "xMin", (function() {
return this.x;
}), (function(t) {
this.width += this.x - t;
this.x = t;
}));
c.getset(a, "yMin", (function() {
return this.y;
}), (function(t) {
this.height += this.y - t;
this.y = t;
}));
c.getset(a, "xMax", (function() {
return this.x + this.width;
}), (function(t) {
this.width = t - this.x;
}));
c.getset(a, "yMax", (function() {
return this.y + this.height;
}), (function(t) {
this.height = t - this.y;
}));
c.getset(a, "center", (function() {
return new cc.Vec2(this.x + .5 * this.width, this.y + .5 * this.height);
}), (function(t) {
this.x = t.x - .5 * this.width;
this.y = t.y - .5 * this.height;
}));
c.getset(a, "origin", (function() {
return new cc.Vec2(this.x, this.y);
}), (function(t) {
this.x = t.x;
this.y = t.y;
}));
c.getset(a, "size", (function() {
return new cc.Size(this.width, this.height);
}), (function(t) {
this.width = t.width;
this.height = t.height;
}));
a.intersects = function(t) {
return cc.rectIntersectsRect(this, t);
};
a.contains = function(t) {
return this.x <= t.x && this.x + this.width >= t.x && this.y <= t.y && this.y + this.height >= t.y;
};
a.containsRect = function(t) {
return this.x <= t.x && this.x + this.width >= t.x + t.width && this.y <= t.y && this.y + this.height >= t.y + t.height;
};
cc.Rect = o;
cc.rect = function(t, e, i, n) {
return new o(t, e, i, n);
};
cc.rectEqualToRect = function(t, e) {
return t && e && t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
};
cc._rectEqualToZero = function(t) {
return t && 0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height;
};
cc.rectContainsRect = function(t, e) {
return !(!t || !e) && !(t.x >= e.x || t.y >= e.y || t.x + t.width <= e.x + e.width || t.y + t.height <= e.y + e.height);
};
cc.rectGetMaxX = function(t) {
return t.x + t.width;
};
cc.rectGetMidX = function(t) {
return t.x + t.width / 2;
};
cc.rectGetMinX = function(t) {
return t.x;
};
cc.rectGetMaxY = function(t) {
return t.y + t.height;
};
cc.rectGetMidY = function(t) {
return t.y + t.height / 2;
};
cc.rectGetMinY = function(t) {
return t.y;
};
cc.rectContainsPoint = function(t, e) {
return e.x >= cc.rectGetMinX(t) && e.x <= cc.rectGetMaxX(t) && e.y >= cc.rectGetMinY(t) && e.y <= cc.rectGetMaxY(t);
};
cc.rectIntersectsRect = function(t, e) {
var i = t.x + t.width, n = t.y + t.height, r = e.x + e.width, o = e.y + e.height;
return !(i < e.x || r < t.x || n < e.y || o < t.y);
};
cc.rectOverlapsRect = function(t, e) {
return !(t.x + t.width < e.x || e.x + e.width < t.x || t.y + t.height < e.y || e.y + e.height < t.y);
};
cc.rectUnion = function(t, e) {
var i = cc.rect(0, 0, 0, 0);
i.x = Math.min(t.x, e.x);
i.y = Math.min(t.y, e.y);
i.width = Math.max(t.x + t.width, e.x + e.width) - i.x;
i.height = Math.max(t.y + t.height, e.y + e.height) - i.y;
return i;
};
cc.rectIntersection = function(t, e) {
var i = cc.rect(Math.max(cc.rectGetMinX(t), cc.rectGetMinX(e)), Math.max(cc.rectGetMinY(t), cc.rectGetMinY(e)), 0, 0);
i.width = Math.min(cc.rectGetMaxX(t), cc.rectGetMaxX(e)) - cc.rectGetMinX(i);
i.height = Math.min(cc.rectGetMaxY(t), cc.rectGetMaxY(e)) - cc.rectGetMinY(i);
return i;
};
n.exports = cc.Rect;
}), {
"../platform/CCClass": 78,
"../platform/js": 93,
"./CCValueType": 114
} ],
111: [ (function(i, n, r) {
function o(i, n) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.height;
i = i.width;
}
this.width = i || 0;
this.height = n || 0;
}
var s = i("./CCValueType"), c = i("../platform/js");
c.extend(o, s);
i("../platform/CCClass").fastDefine("cc.Size", o, {
width: 0,
height: 0
});
c.get(o, "ZERO", (function() {
return new o(0, 0);
}));
var a = o.prototype;
a.clone = function() {
return new o(this.width, this.height);
};
a.equals = function(t) {
return t && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new o();
var n = this.width, r = this.height;
i.width = n + (t.width - n) * e;
i.height = r + (t.height - r) * e;
return i;
};
a.toString = function() {
return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
cc.size = function(t, e) {
return new o(t, e);
};
cc.sizeEqualToSize = function(t, e) {
return t && e && t.width === e.width && t.height === e.height;
};
cc.Size = n.exports = o;
}), {
"../platform/CCClass": 78,
"../platform/js": 93,
"./CCValueType": 114
} ],
112: [ (function(t, e, i) {
cc.Acceleration = function(t, e, i, n) {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.timestamp = n || 0;
};
cc.BlendFunc = function(t, e) {
this.src = t;
this.dst = e;
};
var n = cc.Enum({
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775
});
cc.BlendFunc._disable = function() {
return new cc.BlendFunc(n.ONE, n.ZERO);
};
cc.BlendFunc._alphaPremultiplied = function() {
return new cc.BlendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._alphaNonPremultiplied = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._additive = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE);
};
cc.BlendFunc.BlendFactor = n;
cc.BlendFunc.DISABLE;
cc.js.get(cc.BlendFunc, "DISABLE", cc.BlendFunc._disable);
cc.BlendFunc.ALPHA_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_PREMULTIPLIED", cc.BlendFunc._alphaPremultiplied);
cc.BlendFunc.ALPHA_NON_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_NON_PREMULTIPLIED", cc.BlendFunc._alphaNonPremultiplied);
cc.BlendFunc.ADDITIVE;
cc.js.get(cc.BlendFunc, "ADDITIVE", cc.BlendFunc._additive);
cc.blendFuncDisable = cc.BlendFunc._disable;
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
113: [ (function(i, n, r) {
cc.WebGLColor = function(i, n, r, o, s, c) {
this._arrayBuffer = s || new ArrayBuffer(cc.WebGLColor.BYTES_PER_ELEMENT);
this._offset = c || 0;
var a = this._arrayBuffer, u = this._offset;
this._view = new Uint8Array(a, u, 4);
this._view[0] = i || 0;
this._view[1] = n || 0;
this._view[2] = r || 0;
if ("number" === ("object" == (e = typeof o) ? t(o) : e)) this._view[3] = o; else {
this._view[3] = 255;
this.a_undefined = !0;
}
};
cc.WebGLColor.BYTES_PER_ELEMENT = 4;
(o = cc.WebGLColor.prototype)._getR = function() {
return this._view[0];
};
o._setR = function(t) {
this._view[0] = t < 0 ? 0 : t;
};
o._getG = function() {
return this._view[1];
};
o._setG = function(t) {
this._view[1] = t < 0 ? 0 : t;
};
o._getB = function() {
return this._view[2];
};
o._setB = function(t) {
this._view[2] = t < 0 ? 0 : t;
};
o._getA = function() {
return this._view[3];
};
o._setA = function(t) {
this._view[3] = t < 0 ? 0 : t;
};
o.r;
cc.js.getset(o, "r", o._getR, o._setR);
o.g;
cc.js.getset(o, "g", o._getG, o._setG);
o.b;
cc.js.getset(o, "b", o._getB, o._setB);
o.a;
cc.js.getset(o, "a", o._getA, o._setA);
cc.Vertex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Vertex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Vertex2F.BYTES_PER_ELEMENT = 8;
var o;
(o = cc.Vertex2F.prototype)._getX = function() {
return this._view[0];
};
o._setX = function(t) {
this._view[0] = t;
};
o._getY = function() {
return this._view[1];
};
o._setY = function(t) {
this._view[1] = t;
};
cc.js.getset(o, "x", o._getX, o._setX);
cc.js.getset(o, "y", o._getY, o._setY);
cc.Vertex3F = function(t, e, i, n, r) {
this._arrayBuffer = n || new ArrayBuffer(cc.Vertex3F.BYTES_PER_ELEMENT);
this._offset = r || 0;
var o = this._arrayBuffer, s = this._offset;
this._view = new Float32Array(o, s, 3);
this._view[0] = t || 0;
this._view[1] = e || 0;
this._view[2] = i || 0;
};
cc.Vertex3F.BYTES_PER_ELEMENT = 12;
(o = cc.Vertex3F.prototype)._getX = function() {
return this._view[0];
};
o._setX = function(t) {
this._view[0] = t;
};
o._getY = function() {
return this._view[1];
};
o._setY = function(t) {
this._view[1] = t;
};
o._getZ = function() {
return this._view[2];
};
o._setZ = function(t) {
this._view[2] = t;
};
cc.js.getset(o, "x", o._getX, o._setX);
cc.js.getset(o, "y", o._getY, o._setY);
cc.js.getset(o, "z", o._getZ, o._setZ);
cc.Tex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Tex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Tex2F.BYTES_PER_ELEMENT = 8;
(o = cc.Tex2F.prototype)._getU = function() {
return this._view[0];
};
o._setU = function(t) {
this._view[0] = t;
};
o._getV = function() {
return this._view[1];
};
o._setV = function(t) {
this._view[1] = t;
};
cc.js.getset(o, "u", o._getU, o._setU);
cc.js.getset(o, "v", o._getV, o._setV);
cc.Quad2 = function(t, e, i, n, r, o) {
this._arrayBuffer = r || new ArrayBuffer(cc.Quad2.BYTES_PER_ELEMENT);
this._offset = o || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.Vertex2F(t.x, t.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._tr = e ? new cc.Vertex2F(e.x, e.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._bl = i ? new cc.Vertex2F(i.x, i.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._br = n ? new cc.Vertex2F(n.x, n.y, s, c) : new cc.Vertex2F(0, 0, s, c);
};
cc.Quad2.BYTES_PER_ELEMENT = 32;
(o = cc.Quad2.prototype)._getTL = function() {
return this._tl;
};
o._setTL = function(t) {
this._tl._view[0] = t.x;
this._tl._view[1] = t.y;
};
o._getTR = function() {
return this._tr;
};
o._setTR = function(t) {
this._tr._view[0] = t.x;
this._tr._view[1] = t.y;
};
o._getBL = function() {
return this._bl;
};
o._setBL = function(t) {
this._bl._view[0] = t.x;
this._bl._view[1] = t.y;
};
o._getBR = function() {
return this._br;
};
o._setBR = function(t) {
this._br._view[0] = t.x;
this._br._view[1] = t.y;
};
cc.js.getset(o, "tl", o._getTL, o._setTL);
cc.js.getset(o, "tr", o._getTR, o._setTR);
cc.js.getset(o, "bl", o._getBL, o._setBL);
cc.js.getset(o, "br", o._getBR, o._setBR);
cc.Quad3 = function(t, e, i, n, r, o) {
this._arrayBuffer = r || new ArrayBuffer(cc.Quad3.BYTES_PER_ELEMENT);
this._offset = o || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex3F.BYTES_PER_ELEMENT;
this.bl = bl ? new cc.Vertex3F(bl.x, bl.y, bl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.br = br ? new cc.Vertex3F(br.x, br.y, br.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tl = tl ? new cc.Vertex3F(tl.x, tl.y, tl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tr = tr ? new cc.Vertex3F(tr.x, tr.y, tr.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
};
cc.Quad3.BYTES_PER_ELEMENT = 48;
cc.V3F_C4B_T2F = function(t, e, i, n, r) {
this._arrayBuffer = n || new ArrayBuffer(cc.V3F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = r || 0;
var o = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex3F(t.x, t.y, t.z, o, s) : new cc.Vertex3F(0, 0, 0, o, s);
s += cc.Vertex3F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, o, s) : new cc.WebGLColor(0, 0, 0, 0, o, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, o, s) : new cc.Tex2F(0, 0, o, s);
};
cc.V3F_C4B_T2F.BYTES_PER_ELEMENT = 24;
(o = cc.V3F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
o._setVertices = function(t) {
var e = this._vertices;
e._view[0] = t.x;
e._view[1] = t.y;
e._view[2] = t.z;
};
o._getColor = function() {
return this._colors;
};
o._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
o._getTexCoords = function() {
return this._texCoords;
};
o._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(o, "vertices", o._getVertices, o._setVertices);
cc.js.getset(o, "colors", o._getColor, o._setColor);
cc.js.getset(o, "texCoords", o._getTexCoords, o._setTexCoords);
cc.V3F_C4B_T2F_Quad = function(t, e, i, n, r, o) {
this._arrayBuffer = r || new ArrayBuffer(cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT);
this._offset = o || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.V3F_C4B_T2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.V3F_C4B_T2F(t.vertices, t.colors, t.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._bl = e ? new cc.V3F_C4B_T2F(e.vertices, e.colors, e.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._tr = i ? new cc.V3F_C4B_T2F(i.vertices, i.colors, i.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._br = n ? new cc.V3F_C4B_T2F(n.vertices, n.colors, n.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
};
cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT = 96;
(o = cc.V3F_C4B_T2F_Quad.prototype)._getTL = function() {
return this._tl;
};
o._setTL = function(t) {
var e = this._tl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
o._getBL = function() {
return this._bl;
};
o._setBL = function(t) {
var e = this._bl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
o._getTR = function() {
return this._tr;
};
o._setTR = function(t) {
var e = this._tr;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
o._getBR = function() {
return this._br;
};
o._setBR = function(t) {
var e = this._br;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
o._getArrayBuffer = function() {
return this._arrayBuffer;
};
cc.js.getset(o, "tl", o._getTL, o._setTL);
cc.js.getset(o, "tr", o._getTR, o._setTR);
cc.js.getset(o, "bl", o._getBL, o._setBL);
cc.js.getset(o, "br", o._getBR, o._setBR);
cc.js.get(o, "arrayBuffer", o._getArrayBuffer);
cc.V3F_C4B_T2F_QuadZero = function() {
return new cc.V3F_C4B_T2F_Quad();
};
cc.V3F_C4B_T2F_QuadCopy = function(t) {
if (!t) return cc.V3F_C4B_T2F_QuadZero();
var e = t.tl, i = t.bl, n = t.tr, r = t.br;
return {
tl: {
vertices: {
x: e.vertices.x,
y: e.vertices.y,
z: e.vertices.z
},
colors: {
r: e.colors.r,
g: e.colors.g,
b: e.colors.b,
a: e.colors.a
},
texCoords: {
u: e.texCoords.u,
v: e.texCoords.v
}
},
bl: {
vertices: {
x: i.vertices.x,
y: i.vertices.y,
z: i.vertices.z
},
colors: {
r: i.colors.r,
g: i.colors.g,
b: i.colors.b,
a: i.colors.a
},
texCoords: {
u: i.texCoords.u,
v: i.texCoords.v
}
},
tr: {
vertices: {
x: n.vertices.x,
y: n.vertices.y,
z: n.vertices.z
},
colors: {
r: n.colors.r,
g: n.colors.g,
b: n.colors.b,
a: n.colors.a
},
texCoords: {
u: n.texCoords.u,
v: n.texCoords.v
}
},
br: {
vertices: {
x: r.vertices.x,
y: r.vertices.y,
z: r.vertices.z
},
colors: {
r: r.colors.r,
g: r.colors.g,
b: r.colors.b,
a: r.colors.a
},
texCoords: {
u: r.texCoords.u,
v: r.texCoords.v
}
}
};
};
cc.V3F_C4B_T2F_QuadsCopy = function(t) {
if (!t) return [];
for (var e = [], i = 0; i < t.length; i++) e.push(cc.V3F_C4B_T2F_QuadCopy(t[i]));
return e;
};
cc.V2F_C4B_T2F = function(t, e, i, n, r) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = r || 0;
var o = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex2F(t.x, t.y, o, s) : new cc.Vertex2F(0, 0, o, s);
s += cc.Vertex2F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, o, s) : new cc.WebGLColor(0, 0, 0, 0, o, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, o, s) : new cc.Tex2F(0, 0, o, s);
};
cc.V2F_C4B_T2F.BYTES_PER_ELEMENT = 20;
(o = cc.V2F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
o._setVertices = function(t) {
this._vertices._view[0] = t.x;
this._vertices._view[1] = t.y;
};
o._getColor = function() {
return this._colors;
};
o._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
o._getTexCoords = function() {
return this._texCoords;
};
o._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(o, "vertices", o._getVertices, o._setVertices);
cc.js.getset(o, "colors", o._getColor, o._setColor);
cc.js.getset(o, "texCoords", o._getTexCoords, o._setTexCoords);
cc.V2F_C4B_T2F_Triangle = function(t, e, i, n, r) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT);
this._offset = r || 0;
var o = this._arrayBuffer, s = this._offset, c = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
this._a = t ? new cc.V2F_C4B_T2F(t.vertices, t.colors, t.texCoords, o, s) : new cc.V2F_C4B_T2F(null, null, null, o, s);
s += c;
this._b = e ? new cc.V2F_C4B_T2F(e.vertices, e.colors, e.texCoords, o, s) : new cc.V2F_C4B_T2F(null, null, null, o, s);
s += c;
this._c = i ? new cc.V2F_C4B_T2F(i.vertices, i.colors, i.texCoords, o, s) : new cc.V2F_C4B_T2F(null, null, null, o, s);
};
cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT = 60;
(o = cc.V2F_C4B_T2F_Triangle.prototype)._getA = function() {
return this._a;
};
o._setA = function(t) {
var e = this._a;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
o._getB = function() {
return this._b;
};
o._setB = function(t) {
var e = this._b;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
o._getC = function() {
return this._c;
};
o._setC = function(t) {
var e = this._c;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
cc.js.getset(o, "a", o._getA, o._setA);
cc.js.getset(o, "b", o._getB, o._setB);
cc.js.getset(o, "c", o._getC, o._setC);
}), {} ],
114: [ (function(t, e, i) {
function n() {}
var r = t("../platform/js");
r.setClassName("cc.ValueType", n);
var o = n.prototype;
0;
o.toString = function() {
return "" + {};
};
cc.ValueType = n;
e.exports = n;
}), {
"../platform/js": 93
} ],
115: [ (function(i, n, r) {
function o(i, n) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
}
var s = i("./CCValueType"), c = i("../platform/js"), a = i("../platform/CCClass");
c.extend(o, s);
a.fastDefine("cc.Vec2", o, {
x: 0,
y: 0
});
var u = o.prototype;
u.clone = function() {
return new o(this.x, this.y);
};
u.set = function(t) {
this.x = t.x;
this.y = t.y;
return this;
};
u.equals = function(t) {
return t && this.x === t.x && this.y === t.y;
};
u.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
};
u.lerp = function(t, e, i) {
i = i || new o();
var n = this.x, r = this.y;
i.x = n + (t.x - n) * e;
i.y = r + (t.y - r) * e;
return i;
};
u.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
u.add = function(t, e) {
(e = e || new o()).x = this.x + t.x;
e.y = this.y + t.y;
return e;
};
u.subSelf = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
u.sub = function(t, e) {
(e = e || new o()).x = this.x - t.x;
e.y = this.y - t.y;
return e;
};
u.mulSelf = function(t) {
this.x *= t;
this.y *= t;
return this;
};
u.mul = function(t, e) {
(e = e || new o()).x = this.x * t;
e.y = this.y * t;
return e;
};
u.scaleSelf = function(t) {
this.x *= t.x;
this.y *= t.y;
return this;
};
u.scale = function(t, e) {
(e = e || new o()).x = this.x * t.x;
e.y = this.y * t.y;
return e;
};
u.divSelf = function(t) {
this.x /= t;
this.y /= t;
return this;
};
u.div = function(t, e) {
(e = e || new o()).x = this.x / t;
e.y = this.y / t;
return e;
};
u.negSelf = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
u.neg = function(t) {
(t = t || new o()).x = -this.x;
t.y = -this.y;
return t;
};
u.dot = function(t) {
return this.x * t.x + this.y * t.y;
};
u.cross = function(t) {
return this.y * t.x - this.x * t.y;
};
u.mag = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
u.magSqr = function() {
return this.x * this.x + this.y * this.y;
};
u.normalizeSelf = function() {
var t = this.x * this.x + this.y * this.y;
if (1 === t) return this;
if (0 === t) {
console.warn("Can't normalize zero vector");
return this;
}
var e = 1 / Math.sqrt(t);
this.x *= e;
this.y *= e;
return this;
};
u.normalize = function(t) {
(t = t || new o()).x = this.x;
t.y = this.y;
t.normalizeSelf();
return t;
};
u.angle = function(t) {
var e = this.magSqr(), i = t.magSqr();
if (0 === e || 0 === i) {
console.warn("Can't get angle between zero vector");
return 0;
}
var n = this.dot(t) / Math.sqrt(e * i);
n = cc.clampf(n, -1, 1);
return Math.acos(n);
};
u.signAngle = function(t) {
return Math.atan2(this.y, this.x) - Math.atan2(t.y, t.x);
};
u.rotate = function(t, e) {
(e = e || new o()).x = this.x;
e.y = this.y;
return e.rotateSelf(t);
};
u.rotateSelf = function(t) {
var e = Math.sin(t), i = Math.cos(t), n = this.x;
this.x = i * n - e * this.y;
this.y = e * n + i * this.y;
return this;
};
c.get(o, "ONE", (function() {
return new o(1, 1);
}));
c.get(o, "ZERO", (function() {
return new o(0, 0);
}));
c.get(o, "UP", (function() {
return new o(0, 1);
}));
c.get(o, "RIGHT", (function() {
return new o(1, 0);
}));
cc.Vec2 = o;
cc.v2 = function(t, e) {
return new o(t, e);
};
cc.p = cc.v2;
cc.pointEqualToPoint = function(t, e) {
return t && e && t.x === e.x && t.y === e.y;
};
n.exports = cc.Vec2;
}), {
"../platform/CCClass": 78,
"../platform/js": 93,
"./CCValueType": 114
} ],
116: [ (function(t, e, i) {
t("./CCValueType");
t("./CCVec2");
t("./CCPointExtension");
t("./CCSize");
t("./CCRect");
t("./CCColor");
t("./CCTypes");
t("./CCAffineTransform");
t("./CCTypesWebGL");
}), {
"./CCAffineTransform": 107,
"./CCColor": 108,
"./CCPointExtension": 109,
"./CCRect": 110,
"./CCSize": 111,
"./CCTypes": 112,
"./CCTypesWebGL": 113,
"./CCValueType": 114,
"./CCVec2": 115
} ],
117: [ (function(t, e, i) {
cc.js;
}), {} ],
118: [ (function(t, e, i) {
t("./cocos2d/core");
t("./cocos2d/animation");
t("./cocos2d/particle/CCParticleSystem");
t("./cocos2d/tilemap/CCTiledMap");
t("./cocos2d/motion-streak/CCMotionStreak");
t("./cocos2d/core/components/CCStudioComponent");
t("./extensions/ccpool/CCNodePool");
t("./extensions/ccpool/CCPool");
0;
t("./extensions/spine");
t("./extensions/dragonbones");
t("./cocos2d/deprecated");
}), {
"./cocos2d/actions": 1,
"./cocos2d/animation": 11,
"./cocos2d/core": 59,
"./cocos2d/core/components/CCStudioComponent": 1,
"./cocos2d/deprecated": 117,
"./cocos2d/motion-streak/CCMotionStreak": 1,
"./cocos2d/particle/CCParticleAsset": 1,
"./cocos2d/particle/CCParticleSystem": 1,
"./cocos2d/tilemap/CCTiledMap": 1,
"./cocos2d/tilemap/CCTiledMapAsset": 1,
"./extensions/ccpool/CCNodePool": 119,
"./extensions/ccpool/CCPool": 120,
"./extensions/dragonbones": 1,
"./extensions/spine": 1,
"./external/chipmunk/chipmunk": 1
} ],
119: [ (function(t, e, i) {
cc.NodePool = function(t) {
this.poolHandlerComp = t;
this._pool = [];
};
cc.NodePool.prototype = {
constructor: cc.NodePool,
size: function() {
return this._pool.length;
},
clear: function() {
for (var t = this._pool.length, e = 0; e < t; ++e) this._pool[e].destroy();
this._pool.length = 0;
},
put: function(t) {
if (t && -1 === this._pool.indexOf(t)) {
t.removeFromParent(!1);
var e = this.poolHandlerComp ? t.getComponent(this.poolHandlerComp) : null;
e && e.unuse && e.unuse();
this._pool.push(t);
}
},
get: function() {
var t = this._pool.length - 1;
if (t < 0) return null;
var e = this._pool[t];
this._pool.length = t;
var i = this.poolHandlerComp ? e.getComponent(this.poolHandlerComp) : null;
i && i.reuse && i.reuse.apply(i, arguments);
return e;
}
};
e.exports = cc.NodePool;
}), {} ],
120: [ (function(t, e, i) {
var n = [];
cc.pool = {
_pool: {},
_releaseCB: function() {
this.release();
},
_autoRelease: function(t) {
var e = void 0 !== t._running && !t._running;
cc.director.getScheduler().schedule(this._releaseCB, t, 0, 0, 0, e);
},
putInPool: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
this._pool[e] || (this._pool[e] = []);
t.retain && t.retain();
t.unuse && t.unuse();
this._pool[e].push(t);
}
},
hasObject: function(t) {
var e = cc.js._getClassId(t), i = this._pool[e];
return !(!i || 0 === i.length);
},
removeObject: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
var i = this._pool[e];
if (i) for (var n = 0; n < i.length; n++) if (t === i[n]) {
t.release && t.release();
i.splice(n, 1);
}
}
},
getFromPool: function(t) {
if (this.hasObject(t)) {
var e = cc.js._getClassId(t), i = this._pool[e];
n.length = arguments.length - 1;
for (var r = 0; r < n.length; r++) n[r] = arguments[r + 1];
var o = i.pop();
o.reuse && o.reuse.apply(o, n);
o.release && this._autoRelease(o);
n.length = 0;
return o;
}
},
drainAllPools: function() {
for (var t in this._pool) for (var e = 0; e < this._pool[t].length; e++) {
var i = this._pool[t][e];
i.release && i.release();
}
this._pool = {};
}
};
}), {} ],
121: [ (function(i, n, r) {
"use strict";
function o(i, n) {
"undefined" === ("object" == (e = typeof window[i]) ? t(window[i]) : e) && (window[i] = n);
}
function s(i) {
return "object" === ("object" == (e = typeof window[i]) ? t(window[i]) : e);
}
o("CC_TEST", s("tap") || s("QUnit"));
o("CC_EDITOR", s("Editor") && s("process") && "electron" in process.versions);
o("CC_PREVIEW", !0);
o("CC_DEV", !0);
o("CC_DEBUG", !0);
o("CC_JSB", s("jsb"));
o("CC_BUILD", !1);
o("CC_WECHATGAME", !1);
o("CC_QQPLAY", !1);
o("CC_SUPPORT_JIT", !0);
cc.ClassManager || (cc.ClassManager = window.ClassManager);
0;
i("../polyfill/misc");
i("../polyfill/string");
i("../polyfill/typescript");
i("../cocos2d/core/platform/js");
i("../cocos2d/core/value-types");
i("../cocos2d/core/utils/find");
i("../cocos2d/core/utils/mutable-forward-iterator");
i("../cocos2d/core/event");
i("../cocos2d/core/event-manager/CCEvent");
i("../CCDebugger");
0;
var c = i("../cocos2d/core/platform/CCMacro");
void 0 !== window.__ENABLE_GC_FOR_NATIVE_OBJECTS__ && (c.ENABLE_GC_FOR_NATIVE_OBJECTS = window.__ENABLE_GC_FOR_NATIVE_OBJECTS__);
i("./jsb-game");
i("./jsb-loader");
i("./jsb-director");
i("./jsb-tex-sprite-frame");
i("./jsb-scale9sprite");
i("./jsb-label");
i("./jsb-editbox");
i("./jsb-videoplayer");
i("./jsb-webview");
i("./jsb-particle");
i("./jsb-spine");
i("./jsb-enums");
i("./jsb-event");
i("./jsb-action");
i("./jsb-etc");
i("./jsb-audio");
i("./jsb-tiledmap");
i("./jsb-box2d");
i("./jsb-dragonbones");
i("../extends");
}), {
"../CCDebugger": 2,
"../DebugInfos": 3,
"../cocos2d/core/event": 54,
"../cocos2d/core/event-manager/CCEvent": 49,
"../cocos2d/core/platform/CCMacro": 81,
"../cocos2d/core/platform/js": 93,
"../cocos2d/core/utils/find": 102,
"../cocos2d/core/utils/mutable-forward-iterator": 104,
"../cocos2d/core/value-types": 116,
"../extends": 118,
"../polyfill/misc": 135,
"../polyfill/string": 136,
"../polyfill/typescript": 137,
"./jsb-action": 122,
"./jsb-audio": 123,
"./jsb-box2d": 1,
"./jsb-director": 124,
"./jsb-dragonbones": 1,
"./jsb-editbox": 1,
"./jsb-enums": 125,
"./jsb-etc": 126,
"./jsb-event": 127,
"./jsb-game": 128,
"./jsb-label": 129,
"./jsb-loader": 130,
"./jsb-particle": 131,
"./jsb-scale9sprite": 132,
"./jsb-spine": 1,
"./jsb-tex-sprite-frame": 133,
"./jsb-tiledmap": 134,
"./jsb-videoplayer": 1,
"./jsb-webview": 1
} ],
122: [ (function(t, e, i) {
function n(t, e, i) {
if (t) for (var n = t._owner.getComponentsInChildren(cc._SGComponent), r = 0; r < n.length; ++r) {
var o = n[r];
o.enabled = e ? !o.enabled : i;
}
}
function r(t) {
t instanceof cc.Component ? t = t.node._sgNode : t instanceof cc.Node ? t = t._sgNode : t instanceof _ccsg.Node || (t = null);
return t;
}
function o(t, e) {
var i = cc.ActionManager.prototype, n = i[t];
i[t] = function() {
for (var t = [], i = 0; i < arguments.length; i++) t[i] = i === e ? r(arguments[i]) : arguments[i];
return t[e] ? n.apply(this, t) : void 0;
};
}
function s(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.x = e.getPositionX();
e._owner.y = e.getPositionY();
}
}
function c(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.rotationX = e.getRotationX();
e._owner.rotationY = e.getRotationY();
}
}
function a(t) {
var e = this._getSgTarget();
e._owner && (e._owner.opacity = e.getOpacity());
}
function u(t) {
var e = this._getSgTarget();
if (e._owner) {
var i = e.getColor();
e._owner.color = i;
}
}
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS;
cc.Action.prototype._getSgTarget = cc.Action.prototype.getTarget;
cc.Action.prototype.getTarget = function() {
var t = this._getSgTarget();
return t._owner || t;
};
cc.targetedAction = function(t, e) {
return new cc.TargetedAction(t, e);
};
cc.TargetedAction.prototype._ctor = function(t, e) {
var i = t._sgNode || t;
i._owner = t;
e && this.initWithTarget(i, e);
};
cc.follow = function(t, e) {
return new cc.Follow(t, e);
};
cc.Follow = cc.BaseJSAction.extend({
_followedNode: null,
_boundarySet: !1,
_boundaryFullyCovered: !1,
_halfScreenSize: null,
_fullScreenSize: null,
_worldRect: null,
leftBoundary: 0,
rightBoundary: 0,
topBoundary: 0,
bottomBoundary: 0,
ctor: function(t, e) {
cc.BaseJSAction.prototype.ctor.call(this);
this._followedNode = null;
this._boundarySet = !1;
this._boundaryFullyCovered = !1;
this._halfScreenSize = null;
this._fullScreenSize = null;
this.leftBoundary = 0;
this.rightBoundary = 0;
this.topBoundary = 0;
this.bottomBoundary = 0;
this._worldRect = cc.rect(0, 0, 0, 0);
t && (e ? this.initWithTarget(t, e) : this.initWithTarget(t));
},
clone: function() {
var t = new cc.Follow(), e = this._worldRect, i = new cc.Rect(e.x, e.y, e.width, e.height);
t.initWithTarget(this._followedNode, i);
return t;
},
isBoundarySet: function() {
return this._boundarySet;
},
setBoudarySet: function(t) {
this._boundarySet = t;
},
initWithTarget: function(t, e) {
if (!t) throw new Error("cc.Follow.initWithAction(): followedNode must be non nil");
e = e || cc.rect(0, 0, 0, 0);
this._followedNode = t;
this._worldRect = e;
this._boundarySet = !cc._rectEqualToZero(e);
this._boundaryFullyCovered = !1;
var i = cc.director.getWinSize();
this._fullScreenSize = cc.p(i.width, i.height);
this._halfScreenSize = cc.pMult(this._fullScreenSize, .5);
if (this._boundarySet) {
this.leftBoundary = -(e.x + e.width - this._fullScreenSize.x);
this.rightBoundary = -e.x;
this.topBoundary = -e.y;
this.bottomBoundary = -(e.y + e.height - this._fullScreenSize.y);
this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2);
this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2);
this.topBoundary === this.bottomBoundary && this.leftBoundary === this.rightBoundary && (this._boundaryFullyCovered = !0);
}
return !0;
},
step: function(t) {
var e = this.getTarget(), i = e.convertToWorldSpaceAR(cc.Vec2.ZERO), n = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO), r = cc.pSub(i, n), o = e.parent.convertToNodeSpaceAR(cc.pAdd(r, this._halfScreenSize));
if (this._boundarySet) {
if (this._boundaryFullyCovered) return;
e.setPosition(cc.clampf(o.x, this.leftBoundary, this.rightBoundary), cc.clampf(o.y, this.bottomBoundary, this.topBoundary));
} else e.setPosition(o.x, o.y);
},
isDone: function() {
return !this._followedNode.isRunning();
},
stop: function() {
this.setTarget(null);
cc.Action.prototype.stop.call(this);
}
});
var l = cc.FlipX;
cc.FlipX = l.extend({
_flippedX: !1,
ctor: function(t) {
l.prototype.ctor.call(this);
this.initWithFlipX(t);
},
initWithFlipX: function(t) {
this._flippedX = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleX = Math.abs(e.scaleX) * (this._flippedX ? -1 : 1);
},
reverse: function() {
return new cc.FlipX(!this._flippedX);
},
clone: function() {
return new cc.FlipX(this._flippedX);
}
});
cc.flipX = function(t) {
return new cc.FlipX(t);
};
var h = cc.FlipY;
cc.FlipY = h.extend({
_flippedY: !1,
ctor: function(t) {
h.prototype.ctor.call(this);
this.initWithFlipY(t);
},
initWithFlipY: function(t) {
this._flippedY = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleY = Math.abs(e.scaleY) * (this._flippedY ? -1 : 1);
},
reverse: function() {
return new cc.FlipY(!this._flippedY);
},
clone: function() {
return new cc.FlipY(this._flippedY);
}
});
cc.flipY = function(t) {
return new cc.FlipY(t);
};
cc.Show.prototype.update = function(t) {
n(this._getSgTarget(), !1, !0);
};
cc.Hide.prototype.update = function(t) {
n(this._getSgTarget(), !1, !1);
};
cc.ToggleVisibility.prototype.update = function(t) {
n(this._getSgTarget(), !0);
};
cc.callFunc = function(t, e, i) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
return e ? cc.CallFunc.create(n, e) : cc.CallFunc.create(n);
};
cc.CallFunc.prototype._ctor = function(t, e, i) {
if (void 0 !== t) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
void 0 === e ? this.initWithFunction(n) : this.initWithFunction(n, e);
}
};
var f = cc.ActionManager.prototype.addAction;
cc.ActionManager.prototype.addAction = function(t, e, i) {
(e = r(e)) && f.call(this, t, e, i);
};
for (var d = [ [ "removeAllActionsFromTarget", 0 ], [ "removeActionByTag", 1 ], [ "getActionByTag", 1 ], [ "getNumberOfRunningActionsInTarget", 0 ], [ "pauseTarget", 0 ], [ "resumeTarget", 0 ] ], _ = 0; _ < d.length; ++_) o.apply(null, d[_]);
cc.ActionManager.prototype.resumeTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.resumeTarget(t[e]);
};
cc.ActionManager.prototype.pauseTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.pauseTarget(t[e]);
};
var p = {
MoveBy: s,
JumpBy: s,
Place: s,
CardinalSplineTo: s,
RotateTo: c,
RotateBy: c,
ScaleTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.scaleX = e.getScaleX();
e._owner.scaleY = e.getScaleY();
}
},
RemoveSelf: function(t) {
var e = this._getSgTarget();
e._owner && e._owner.removeFromParent();
},
SkewTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.skewX = e.getSkewX();
e._owner.skewY = e.getSkewY();
}
},
Blink: a,
FadeIn: a,
FadeOut: a,
FadeTo: a,
TintTo: u,
TintBy: u,
BezierBy: s
};
for (var g in p) {
var v = cc[g].prototype;
v.update = p[g];
v.speed = function(t) {
return new cc.Speed(this, t);
};
v.repeat = function(t) {
return new cc.Repeat(this, t);
};
v.repeatForever = function() {
return new cc.RepeatForever(this);
};
}
}), {} ],
123: [ (function(t, e, i) {
cc.Audio = function(t) {
this.src = t;
this.volume = 1;
this.loop = !1;
this.id = -1;
this._eventList = {};
this.type = cc.Audio.Type.NATIVE;
};
cc.Audio.Type = {
DOM: "AUDIO",
WEBAUDIO: "WEBAUDIO",
NATIVE: "NATIVE",
UNKNOWN: "UNKNOWN"
};
(function(e, i) {
cc.audioEngine = i;
i.play = i.play2d;
i.setMaxWebAudioSize = function() {};
var n = t("../cocos2d/audio/deprecated");
n.removed(i);
n.deprecated(i);
e.State = i.AudioState;
e.play = function() {
i.stop(this.id);
this.id = i.play2d(this.src, this.loop, this.volume);
};
e.pause = function() {
i.pause(this.id);
};
e.resume = function() {
i.resume(this.id);
};
e.stop = function() {
i.stop(this.id);
};
e.destroy = function() {};
e.setLoop = function(t) {
this.loop = t;
i.setLoop(this.id, t);
};
e.getLoop = function() {
return i.getLoop(this.id);
};
e.setVolume = function(t) {
this.volume = t;
return i.setVolume(this.id, t);
};
e.getVolume = function() {
return i.getVolume(this.id);
};
e.setCurrentTime = function(t) {
i.setCurrentTime(this.id, t);
};
e.getCurrentTime = function() {
return i.getCurrentTime(this.id);
};
e.getDuration = function() {
return i.getDuration(this.id);
};
e.getState = function() {
return i.getState(this.id);
};
e.preload = function() {
this._loaded = !0;
this.emit("load");
};
e.on = function(t, e) {
var i = this._eventList[t];
i || (i = this._eventList[t] = []);
i.push(e);
};
e.once = function(t, e) {
var i = function(n) {
e.call(this, n);
this.off(t, i);
};
this.on(t, i);
};
e.emit = function(t) {
var e = this._eventList[t];
if (e) for (var i = 0; i < e.length; i++) e[i].call(this, this);
};
e.off = function(t, e) {
var i = this._eventList[t];
if (!i) return !1;
if (!e) {
this._eventList[t] = [];
return !0;
}
for (var n = 0; n < i.length; n++) if (i[n] === e) {
i.splice(n, 1);
break;
}
return !0;
};
})(cc.Audio.prototype, jsb.AudioEngine);
}), {
"../cocos2d/audio/deprecated": 15
} ],
124: [ (function(i, n, r) {
"use strict";
var o = i("../cocos2d/core/load-pipeline/auto-release-utils"), s = i("../cocos2d/core/component-scheduler"), c = i("../cocos2d/core/node-activator"), a = i("../cocos2d/core/event/event-listeners");
cc.director._purgeDirector = cc.director.purgeDirector;
cc.js.mixin(cc.director, {
sharedInit: function() {
this._compScheduler = new s();
this._nodeActivator = new c();
var t = this.getScheduler();
if (cc.AnimationManager) {
this._animationManager = new cc.AnimationManager();
t.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._animationManager = null;
if (cc.CollisionManager) {
this._collisionManager = new cc.CollisionManager();
t.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._collisionManager = null;
if (cc.PhysicsManager) {
this._physicsManager = new cc.PhysicsManager();
this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._physicsManager = null;
cc._widgetManager.init(this);
cc.loader.init(this);
},
purgeDirector: function() {
this._compScheduler.unscheduleAll();
this._nodeActivator.reset();
this._purgeDirector();
},
reset: function() {
this.purgeDirector();
cc.eventManager && cc.eventManager.setEnabled(!0);
this._animationManager && this.getScheduler().scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._collisionManager && this.getScheduler().scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._physicsManager && this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this.startAnimation();
},
getActionManager: function() {
return this._actionManager;
},
setActionManager: function(t) {
if (this._actionManager !== t) {
this._actionManager && this._scheduler.unscheduleUpdate(this._actionManager);
this._actionManager = t;
this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
}
},
getAnimationManager: function() {
return this._animationManager;
},
getCollisionManager: function() {
return this._collisionManager;
},
getPhysicsManager: function() {
return this._physicsManager;
},
getScene: function() {
return this._scene;
},
runSceneImmediate: function(t, e, i) {
var n = window.console;
if (t instanceof cc.Scene) {
n.time("I");
t._load();
n.timeEnd("I");
}
for (var r = cc.game, s = Object.keys(r._persistRootNodes).map((function(t) {
return r._persistRootNodes[t];
})), c = 0; c < s.length; c++) {
var a = s[c];
r._ignoreRemovePersistNode = a;
a.parent = null;
r._ignoreRemovePersistNode = null;
}
var u = this._scene;
n.time("AR");
var l = u && u.autoReleaseAssets && u.dependAssets;
o.autoRelease(l, t.dependAssets, s);
n.timeEnd("AR");
n.time("D");
cc.isValid(u) && u.destroy();
this._scene = null;
cc.Object._deferredDestroy();
n.timeEnd("D");
e && e();
this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, t);
var h = t;
if (t instanceof cc.Scene) {
this._scene = t;
h = t._sgNode;
n.time("AP");
for (var f = 0; f < s.length; f++) {
var d = s[f], _ = t.getChildByUuid(d.uuid);
if (_) {
var p = _.getSiblingIndex();
_._destroyImmediate();
t.insertChild(d, p);
} else d.parent = t;
}
n.timeEnd("AP");
n.time("A");
t._activate();
n.timeEnd("A");
}
this.getRunningScene() ? this.replaceScene(h) : this.runWithScene(h);
i && i(null, t);
this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, t);
},
runScene: function(t, e, i) {
cc.assertID(t, 1205);
t instanceof cc.Scene && t._load();
this.once(cc.Director.EVENT_AFTER_UPDATE, (function() {
this.runSceneImmediate(t, e, i);
}));
},
_getSceneUuid: function(i) {
var n = cc.game._sceneInfos;
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
i.endsWith(".fire") || (i += ".fire");
"/" === i[0] || i.startsWith("db://assets/") || (i = "/" + i);
for (var r = 0; r < n.length; r++) {
var o = n[r];
if (o.url.endsWith(i)) return o;
}
} else if ("number" === ("object" == (e = typeof i) ? t(i) : e)) {
if (0 <= i && i < n.length) return n[i];
cc.errorID(1211, i);
} else cc.errorID(1212, i);
return null;
},
setRuntimeLaunchScene: function(t) {
var e = this._getSceneUuid(t);
this._launchSceneUuid = e.uuid;
},
loadScene: function(t, e, i) {
if (this._loadingScene) {
cc.errorID(1213, t, this._loadingScene);
return !1;
}
var n = this._getSceneUuid(t);
if (n) {
var r = n.uuid;
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
this._loadingScene = t;
if (cc.runtime && r !== this._launchSceneUuid) {
var o = this, s = cc.path.basename(n.url) + "_" + n.uuid;
console.log("==> start preload: " + s);
var c = !1;
cc.LoaderLayer.preload([ s ], (function() {
console.log("==> end preload: " + s);
c ? o._loadSceneByUuid(r, e, i) : setTimeout((function() {
o._loadSceneByUuid(r, e, i);
}), 0);
}));
c = !0;
} else this._loadSceneByUuid(r, e, i);
return !0;
}
cc.errorID(1214, t);
return !1;
},
preloadScene: function(t, e) {
var i = this._getSceneUuid(t);
if (i) {
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
cc.loader.load({
uuid: i.uuid,
type: "uuid"
}, (function(i, n) {
i && cc.errorID(1215, t, i.message);
e && e(i, n);
}));
} else {
var n = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
e(new Error(n));
cc.error("preloadScene: " + n);
}
},
_loadSceneByUuid: function(t, e, i, n) {
0;
console.time("LoadScene " + t);
cc.AssetLibrary.loadAsset(t, (function(n, r) {
console.timeEnd("LoadScene " + t);
var o = cc.director;
o._loadingScene = "";
if (n) {
n = "Failed to load scene: " + n;
cc.error(n);
} else {
if (r instanceof cc.SceneAsset) {
var s = r.scene;
s._id = r._uuid;
s._name = r._name;
o.runSceneImmediate(s, i, e);
return;
}
n = "The asset " + t + " is not a scene";
cc.error(n);
}
e && e(n);
}));
},
__fastOn: function(t, e, i) {
var n = this._bubblingListeners;
n || (n = this._bubblingListeners = new a());
n.add(t, e, i);
this._addEventFlag(t, n, !1);
},
__fastOff: function(t, e, i) {
var n = this._bubblingListeners;
if (n) {
n.remove(t, e, i);
this._purgeEventFlag(t, n, !1);
}
}
});
cc.defineGetterSetter(cc.director, "actionManager", cc.director.getActionManager, cc.director.setActionManager);
cc.EventTarget.call(cc.director);
cc.js.addon(cc.director, cc.EventTarget.prototype);
cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
cc.Director.EVENT_BEFORE_VISIT = "director_before_visit";
cc.Director.EVENT_AFTER_VISIT = "director_after_visit";
cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
cc.Director._EVENT_NEXT_TICK = "_director_next_tick";
cc.Director._beforeUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_BEFORE_UPDATE,
callback: function() {
cc.director.emit(cc.Director._EVENT_NEXT_TICK);
cc.director.emit(cc.Director.EVENT_BEFORE_UPDATE);
cc.director._compScheduler.startPhase();
var t = cc.director.getDeltaTime();
cc.director._compScheduler.updatePhase(t);
}
});
cc.Director._afterUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_UPDATE,
callback: function() {
var t = cc.director.getDeltaTime();
cc.director._compScheduler.lateUpdatePhase(t);
cc.director.emit(cc.Director.EVENT_AFTER_UPDATE);
cc.Object._deferredDestroy();
cc.director.emit(cc.Director.EVENT_BEFORE_VISIT, this);
}
});
cc.Director._afterVisitListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_VISIT,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_VISIT, this);
}
});
cc.Director._afterDrawListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_DRAW,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_DRAW, this);
}
});
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._beforeUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterVisitListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterDrawListener, 1);
}), {
"../cocos2d/core/component-scheduler": 32,
"../cocos2d/core/event/event-listeners": 51,
"../cocos2d/core/load-pipeline/auto-release-utils": 63,
"../cocos2d/core/node-activator": 76
} ],
125: [ (function(t, e, i) {
"use strict";
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
126: [ (function(i, n, r) {
"use strict";
cc.sys.now = function() {
return Date.now();
};
var o = /[^\.\/]+\/\.\.\//;
cc.js.mixin(cc.path, {
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(o, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
});
var s = cc.Node.prototype;
cc.defineGetterSetter(s, "_parent", s.getParent, s.setParent);
cc.view.isViewReady = cc.view.isOpenGLReady;
cc.view.setOrientation = function() {};
var c = 0, a = {}, u = function(t) {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._intervalId = c++;
this._code = t;
};
u.prototype.fun = function() {
if (this._code) {
var i = this._code;
"string" === ("object" == (e = typeof i) ? t(i) : e) ? Function(i)() : "function" === ("object" == (e = typeof i) ? t(i) : e) && i.apply(null, this._args);
}
};
window.setTimeout = function(t, e) {
var i = new u(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
var n = i.fun;
i.fun = function() {
n.apply(this, arguments);
clearTimeout(i._intervalId);
};
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, 0, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.setInterval = function(t, e) {
var i = new u(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, cc.macro.REPEAT_FOREVER, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.clearInterval = function(t) {
var e = a[t];
if (e) {
cc.director.getScheduler().unschedule(e.fun, e);
delete a[t];
}
};
window.clearTimeout = clearInterval;
if (window.SocketIO) {
window.io = window.SocketIO;
SocketIO.prototype._jsbEmit = SocketIO.prototype.emit;
SocketIO.prototype.emit = function(i, n) {
"object" === ("object" == (e = typeof n) ? t(n) : e) && (n = JSON.stringify(n));
this._jsbEmit(i, n);
};
}
cc.Node.prototype.setIgnoreAnchorPointForPosition = cc.Node.prototype.ignoreAnchorPointForPosition;
window._ccsg = {
Node: cc.Node,
Scene: cc.Scene,
Sprite: cc.Sprite,
ParticleSystem: cc.ParticleSystem,
Label: cc.Label,
EditBox: cc.EditBox,
VideoPlayer: cc.VideoPlayer,
WebView: cc.WebView,
TMXTiledMap: cc.TMXTiledMap,
TMXObjectGroup: cc.TMXObjectGroup,
TMXObject: cc.TMXObject,
TMXObjectImage: cc.TMXObjetImage,
TMXObjectShape: cc.TMXObjectShape,
TMXLayer: cc.TMXLayer,
MotionStreak: cc.MotionStreak,
CameraNode: cc.CameraNode
};
cc.formatStr = cc.js.formatStr;
cc.Image && cc.Image.setPNGPremultipliedAlphaEnabled && cc.Image.setPNGPremultipliedAlphaEnabled(!1);
window.__cleanup = function() {
cc.director.getScene().destroy();
cc.Object._deferredDestroy();
cc.js._registeredClassIds = {};
cc.js._registeredClassNames = {};
cc.loader.releaseAll();
cc.textureCache.removeAllTextures();
};
}), {} ],
127: [ (function(i, n, r) {
"use strict";
var o = i("../cocos2d/core/platform/js").Pool, s = i("../cocos2d/core/event/event");
i("../cocos2d/core/event-manager/CCEvent");
s.EventMouse.pool = new o(5);
s.EventMouse.pool.get = function(t, e) {
var i = this._get() || new s.EventMouse(e, !0);
i._button = t.getButton();
var n = t.getLocation();
i._x = n.x;
i._y = n.y;
var r = t._listener;
if (r) {
i._prevX = r._previousX;
i._prevY = r._previousY;
}
i._scrollX = t.getScrollX();
i._scrollY = t.getScrollY();
i._target = null;
i._currentTarget = null;
i.eventPhase = cc.Event.NONE;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
s.EventTouch.pool = new o(5);
s.EventTouch.pool.get = function(t) {
var e = t.getTouches(), i = this._get() || new s.EventTouch(e, !0);
i.eventPhase = cc.Event.NONE;
i._eventCode = t.getEventCode();
i._touches = e;
i._target = null;
i._currentTarget = null;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
cc.eventManager.addListener = function(i, n) {
i instanceof cc.EventListener || (i = cc.EventListener.create(i));
if ("number" === ("object" == (e = typeof n) ? t(n) : e)) {
if (0 === n) {
cc.logID(3500);
return;
}
cc.eventManager.addEventListenerWithFixedPriority(i, n);
} else {
var r = n;
if (n instanceof cc._BaseNode) r = n._sgNode; else if (!(r instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
cc.eventManager.addEventListenerWithSceneGraphPriority(i, r);
}
return i;
};
cc.eventManager._removeListeners = cc.eventManager.removeListeners;
cc.eventManager.removeListeners = function(t, e) {
t instanceof cc._BaseNode && (t = t._sgNode);
t instanceof _ccsg.Node || cc.js.isNumber(t) ? this._removeListeners(t, e || !1) : cc.warnID(3506);
};
cc.eventManager._pauseTarget = cc.eventManager.pauseTarget;
cc.eventManager.pauseTarget = function(t, e) {
var i = t;
t._eventPaused = !0;
if (t instanceof cc._BaseNode) i = t._sgNode; else if (!(i instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
if (i !== t && !i.isRunning()) {
var n = i.onEnter;
i.onEnter = function() {
n.call(this);
t._eventPaused && cc.eventManager._pauseTarget(this, e || !1);
this.onEnter = n;
};
}
this._pauseTarget(i, e || !1);
};
cc.eventManager._resumeTarget = cc.eventManager.resumeTarget;
cc.eventManager.resumeTarget = function(t, e) {
t._eventPaused = !1;
if (t instanceof cc._BaseNode) t = t._sgNode; else if (!(t instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
this._resumeTarget(t, e || !1);
};
cc._EventListenerKeyboard = cc.EventListenerKeyboard;
cc._EventListenerKeyboard.LISTENER_ID = "__cc_keyboard";
cc._EventListenerAcceleration = cc.EventListenerAcceleration;
cc._EventListenerAcceleration.LISTENER_ID = "__cc_acceleration";
cc._EventListenerTouchAllAtOnce = cc.EventListenerTouchAllAtOnce;
cc._EventListenerTouchAllAtOnce.LISTENER_ID = "__cc_touch_all_at_once";
cc._EventListenerTouchOneByOne = cc.EventListenerTouchOneByOne;
cc._EventListenerTouchOneByOne.LISTENER_ID = "__cc_touch_one_by_one";
cc._EventListenerMouse = cc.EventListenerMouse;
cc._EventListenerMouse.LISTENER_ID = "__cc_mouse";
}), {
"../cocos2d/core/event-manager/CCEvent": 49,
"../cocos2d/core/event/event": 53,
"../cocos2d/core/platform/js": 93
} ],
128: [ (function(i, n, r) {
"use strict";
cc.game = {
DEBUG_MODE_NONE: 0,
DEBUG_MODE_INFO: 1,
DEBUG_MODE_WARN: 2,
DEBUG_MODE_ERROR: 3,
DEBUG_MODE_INFO_FOR_WEB_PAGE: 4,
DEBUG_MODE_WARN_FOR_WEB_PAGE: 5,
DEBUG_MODE_ERROR_FOR_WEB_PAGE: 6,
EVENT_HIDE: "game_on_hide",
EVENT_SHOW: "game_on_show",
EVENT_RESIZE: "game_on_resize",
_onShowListener: null,
_onHideListener: null,
_paused: !1,
_prepareCalled: !1,
_prepared: !1,
config: null,
onStart: null,
_sceneInfos: [],
_persistRootNodes: {},
_ignoreRemovePersistNode: null,
RENDER_TYPE_CANVAS: 0,
RENDER_TYPE_WEBGL: 1,
RENDER_TYPE_OPENGL: 2,
EVENT_GAME_INITED: "game_inited",
CONFIG_KEY: {
width: "width",
height: "height",
modules: "modules",
debugMode: "debugMode",
showFPS: "showFPS",
frameRate: "frameRate",
id: "id",
renderMode: "renderMode",
registerSystemEvent: "registerSystemEvent",
jsList: "jsList",
scenes: "scenes"
},
setFrameRate: function(t) {
this.config[this.CONFIG_KEY.frameRate] = t;
cc.director.setAnimationInterval(1 / t);
},
step: function() {
cc.director.mainLoop();
},
pause: function() {
this._paused = !0;
cc.director.pause();
},
resume: function() {
this._paused = !1;
cc.director.resume();
},
isPaused: function() {
return this._paused;
},
restart: function() {
__restartVM();
},
end: function() {
close();
},
prepare: function(t) {
var e = this, i = e.config, n = e.CONFIG_KEY;
this._loadConfig();
if (this._prepared) t && t(); else if (!this._prepareCalled) {
this._prepareCalled = !0;
cc._renderType = cc.game.RENDER_TYPE_OPENGL;
cc.director.sharedInit();
var r = i[n.jsList];
if (r) cc.loader.load(r, (function(i) {
if (i) throw new Error(JSON.stringify(i));
e._prepared = !0;
t && t();
e.emit(e.EVENT_GAME_INITED);
})); else {
t && t();
e.emit(e.EVENT_GAME_INITED);
}
}
},
run: function(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) cc.game.onStart = i; else {
i && (cc.game.config = i);
"function" === ("object" == (e = typeof n) ? t(n) : e) && (cc.game.onStart = n);
}
cc.director.startAnimation();
this.prepare(cc.game.onStart && cc.game.onStart.bind(cc.game));
},
addPersistRootNode: function(t) {
if (cc.Node.isNode(t) && t.uuid) {
var e = t.uuid;
if (!this._persistRootNodes[e]) {
var i = cc.director._scene;
if (cc.isValid(i)) {
if (t.parent) {
if (!(t.parent instanceof cc.Scene)) {
cc.warnID(3801);
return;
}
if (t.parent !== i) {
cc.warnID(3802);
return;
}
} else t.parent = i;
this._persistRootNodes[e] = t;
t._persistNode = !0;
}
}
} else cc.warnID(3803);
},
removePersistRootNode: function(t) {
if (t !== this._ignoreRemovePersistNode) {
var e = t._id || "";
if (t === this._persistRootNodes[e]) {
delete this._persistRootNodes[e];
t._persistNode = !1;
}
}
},
isPersistRootNode: function(t) {
return t._persistNode;
},
_loadConfig: function() {
if (this.config) this._initConfig(this.config); else try {
var t = jsb.fileUtils.getStringFromFile("project.json"), e = JSON.parse(t);
this._initConfig(e || {});
} catch (t) {
console.log("Failed to read or parse project.json");
this._initConfig({});
}
},
_initConfig: function(i) {
var n = this.CONFIG_KEY;
"number" !== ("object" == (e = typeof i[n.debugMode]) ? t(i[n.debugMode]) : e) && (i[n.debugMode] = 0);
"number" !== ("object" == (e = typeof i[n.frameRate]) ? t(i[n.frameRate]) : e) && (i[n.frameRate] = 60);
"number" !== ("object" == (e = typeof i[n.renderMode]) ? t(i[n.renderMode]) : e) && (i[n.renderMode] = 0);
i[n.showFPS] = !(n.showFPS in i) || !!i[n.showFPS];
this.groupList = i.groupList || [];
this.collisionMatrix = i.collisionMatrix || [];
this._sceneInfos = i[n.scenes] || [];
cc.director.setDisplayStats(i[n.showFPS]);
cc.director.setAnimationInterval(1 / i[n.frameRate]);
cc._initDebugSetting(i[n.debugMode]);
this.config = i;
}
};
cc.EventTarget.call(cc.game);
cc.js.addon(cc.game, cc.EventTarget.prototype);
cc.game._onHideListener = cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, (function() {
cc.game.emit(cc.game.EVENT_HIDE, cc.game);
}));
cc.game._onShowListener = cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, (function() {
cc.game.emit(cc.game.EVENT_SHOW, cc.game);
}));
cc._initDebugSetting(cc.game.DEBUG_MODE_INFO);
}), {} ],
129: [ (function(i, n, r) {
"use strict";
var o = cc.Label;
!o.createWithTTF && o.prototype.createWithTTF && (o.createWithTTF = o.prototype.createWithTTF);
o.prototype.setHorizontalAlign = o.prototype.setHorizontalAlignment;
o.prototype.setVerticalAlign = o.prototype.setVerticalAlignment;
o.prototype.setBMFontSize || (o.prototype.setBMFontSize = function() {});
o.prototype.getBMFontSize || (o.prototype.getBMFontSize = function() {});
o.prototype.setOverflow || (o.prototype.setOverflow = function() {});
o.prototype.getOverflow || (o.prototype.getOverflow = function() {});
o.prototype._setOverflow = o.prototype.setOverflow;
o.prototype.setOverflow = function(t) {
this._overFlow = t;
this._setOverflow(this._overFlow);
};
o.prototype.getOverflow = function() {
return this._overFlow;
};
o.prototype._enableBold = o.prototype.enableBold;
o.prototype.enableBold = function(t) {
t ? this._enableBold() : this.disableEffect(5);
};
o.prototype._enableItalics = o.prototype.enableItalics;
o.prototype.enableItalics = function(t) {
t ? this._enableItalics() : this.disableEffect(4);
};
o.prototype._enableUnderline = o.prototype.enableUnderline;
o.prototype.enableUnderline = function(t) {
t ? this._enableUnderline() : this.disableEffect(6);
};
o.prototype.setFontSize = function(t) {
this._fontSize = t;
if (this._labelType === _ccsg.Label.Type.SystemFont) this.setSystemFontSize(t); else if (this._labelType === _ccsg.Label.Type.BMFont) this.setBMFontSize(t); else if (this._labelType === _ccsg.Label.Type.TTF) {
var e = this.getTTFConfig();
e.fontSize = t;
this.setTTFConfig(e);
}
};
o.prototype.getFontSize = function() {
return this._fontSize;
};
o.prototype.enableWrapText = o.prototype.enableWrap || function() {};
o.prototype.isWrapTextEnabled = o.prototype.isWrapEnabled || function() {};
o.prototype._setLineHeight = o.prototype.setLineHeight;
o.prototype.setLineHeight = function(t) {
this._labelType !== _ccsg.Label.Type.SystemFont ? this._setLineHeight(t) : 40 !== t && cc.warnID(4013);
};
o.prototype._setColor = o.prototype.setColor;
o.prototype.setColor = function(t) {
this._labelType === _ccsg.Label.Type.BMFont ? this._setColor(t) : this.setTextColor(t);
};
o.prototype.setSpacingX = o.prototype.setAdditionalKerning;
o.prototype._setTTFConfig = o.prototype.setTTFConfig;
o.prototype.setTTFConfig = function(t) {
this._setTTFConfig(t);
this._ttfConfig = t;
};
o.prototype.getTTFConfig = function() {
return this._ttfConfig;
};
o.prototype._setContentSize = o.prototype.setContentSize;
o.prototype.setContentSize = function(i, n) {
var r = "number" === ("object" == (e = typeof i.width) ? t(i.width) : e) ? i.width : i, o = "number" === ("object" == (e = typeof i.height) ? t(i.height) : e) ? i.height : n;
if (this.getOverflow() === cc.Label.Overflow.NONE) {
r = 0;
o = 0;
} else this._setContentSize(r, o);
this.setDimensions(r, o);
};
o.prototype.setFontAsset = function(t) {
this._fontAsset = t;
var e = t instanceof cc.Font;
if (e) {
var i = e ? t.rawUrl : "";
if (".ttf" === cc.path.extname(i)) {
var n = this.isOutlined() ? this.getOutlineWidth() : 0;
if (this._ttfConfig) {
this._ttfConfig.outlineSize = n;
this._ttfConfig.fontFilePath = i;
} else this._ttfConfig = {
fontFilePath: i,
fontSize: this._fontSize,
outlineSize: n,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
this._labelType = _ccsg.Label.Type.TTF;
this.setTTFConfig(this._ttfConfig);
} else if (t.spriteFrame) {
this._labelType = _ccsg.Label.Type.BMFont;
this.setBMFontFilePath(JSON.stringify(t._fntConfig), t.spriteFrame);
this.setFontSize(this.getFontSize());
}
this.getContentSize();
} else this.setFontFamily("Arial");
};
o.prototype.setFontFamily = function(t) {
t = t || "";
this._labelType = _ccsg.Label.Type.SystemFont;
this.setSystemFontName(t);
this._isSystemFontUsed = !0;
this.getContentSize();
};
o.prototype.setOutlined = function(t) {
this._outlined = !!t;
this._outlined ? this.enableOutline(this.getOutlineColor(), this.getOutlineWidth()) : this.disableEffect(1);
};
o.prototype.setOutlineWidth = function(t) {
this._outlineWidth = t;
if (this._outlined) {
var e = this.getOutlineWidth();
if (this._labelType === _ccsg.Label.Type.TTF) {
var i = this.getTTFConfig();
if (i.outlineSize !== e) {
i.outlineSize = e;
this.setTTFConfig(i);
}
} else this.enableOutline(this.getOutlineColor(), e);
}
};
o.prototype.setOutlineColor = function(t) {
this._outlineColor = cc.color(t);
this._outlined && this.enableOutline(this.getOutlineColor(), this.getOutlineWidth());
};
o.prototype.setMargin = function() {};
o.prototype.isOutlined = function() {
return this._outlined;
};
o.prototype.getOutlineWidth = function() {
return this._outlineWidth || 1;
};
o.prototype.getOutlineColor = function() {
return this._outlineColor || cc.color(255, 255, 255, 255);
};
cc.Label = function(t, e, i, n) {
e = e || "Arial";
var r = cc.path.extname(e), s = _ccsg.Label.Type.TTF;
this._fontSize = n;
var c;
if (".ttf" === r) {
var a = {
fontFilePath: e,
fontSize: this._fontSize,
outlineSize: 0,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
(c = o.createWithTTF(a, t))._ttfConfig = a;
} else if (i) {
c = o.createWithBMFont(e, t, i);
s = _ccsg.Label.Type.BMFont;
} else {
c = o.createWithSystemFont(t || "", e, this._fontSize);
s = _ccsg.Label.Type.SystemFont;
c._isSystemFontUsed = !0;
}
c._labelType = s;
return c;
};
cc.Label.Type = cc.Enum({
TTF: 0,
BMFont: 1,
SystemFont: 2
});
cc.Label.Overflow = cc.Enum({
NONE: 0,
CLAMP: 1,
SHRINK: 2,
RESIZE_HEIGHT: 3
});
cc.Label.pool = new cc.js.Pool(0);
cc.Label.pool.get = function(t, e, i, n) {
this._fontAsset = e;
n = n || 40;
var r = e instanceof cc.Font;
if (!r) return new _ccsg.Label(t, null, null, n);
var o = r ? e.rawUrl : "";
return new _ccsg.Label(t, o, i, n);
};
}), {} ],
130: [ (function(t, e, i) {
"use strict";
function n(t, e) {
return null;
}
function r(e, i) {
t(e.url);
return null;
}
function o(t, e) {
return t.url;
}
function s(t, e) {
var i = t.url, n = cc.textureCache.getTextureForKey(i);
if (n) return n;
if (i.match(jsb.urlRegExp)) jsb.loadRemoteImg(i, (function(t, n) {
if (t) {
n.url = i;
e && e(null, n);
} else e && e(new Error("Load image failed: " + i));
})); else {
var r = function(t) {
if (t instanceof cc.Texture2D) {
t.url = i;
e && e(null, t);
} else e && e(new Error("Load image failed: " + i));
};
cc.textureCache._addImageAsync(i, r);
}
}
t("../cocos2d/core/load-pipeline");
cc.loader.addDownloadHandlers({
js: r,
jsc: r,
png: n,
jpg: n,
bmp: n,
jpeg: n,
gif: n,
ico: n,
tiff: n,
webp: n,
image: n,
mp3: o,
ogg: o,
wav: o,
mp4: o,
m4a: o,
font: n,
eot: n,
ttf: n,
woff: n,
svg: n,
ttc: n
});
cc.loader.addLoadHandlers({
png: s,
jpg: s,
bmp: s,
jpeg: s,
gif: s,
ico: s,
tiff: s,
webp: s,
image: s,
default: n
});
}), {
"../cocos2d/core/load-pipeline": 65
} ],
131: [ (function(t, e, i) {
"use strict";
function n(t, e) {
return function(i) {
this.getEmitterMode() === e && t.call(this, i);
};
}
cc.ParticleSystem.Mode = cc.Enum({
GRAVITY: 0,
RADIUS: 1
});
cc.ParticleSystem.Type = cc.Enum({
FREE: 0,
RELATIVE: 1,
GROUPED: 2
});
for (var r = [ {
tangentialAccel: "setTangentialAccel",
tangentialAccelVar: "setTangentialAccelVar",
radialAccel: "setRadialAccel",
radialAccelVar: "setRadialAccelVar",
rotationIsDir: "setRotationIsDir",
gravity: "setGravity",
speed: "setSpeed",
speedVar: "setSpeedVar"
}, {
startRadius: "setStartRadius",
startRadiusVar: "setStartRadiusVar",
endRadius: "setEndRadius",
endRadiusVar: "setEndRadiusVar",
rotatePerS: "setRotatePerSecond",
rotatePerSVar: "setRotatePerSecondVar"
} ], o = cc.ParticleSystem.prototype, s = 0; s < r.length; s++) {
var c = r[s];
for (var a in c) {
var u = c[a], l = o[u];
o[u] = n(l, s);
var h = u.replace("set", "get");
cc.defineGetterSetter(o, a, o[h], o[u]);
}
}
}), {} ],
132: [ (function(t, e, i) {
"use strict";
var n = !1;
if (cc.Scale9SpriteV2) {
n = !0;
cc.Scale9Sprite = cc.Scale9SpriteV2;
}
cc.Scale9Sprite.state = {
NORMAL: 0,
GRAY: 1,
DISTORTION: 2
};
cc.Scale9Sprite.RenderingType = cc.Enum({
SIMPLE: 0,
SLICED: 1,
TILED: 2,
FILLED: 3
});
cc.Scale9Sprite.FillType = cc.Enum({
Horizontal: 0,
Vertical: 1,
RADIAL: 2
});
var r = cc.Scale9Sprite.prototype;
if (n) {
var o = r.setContentSize;
r.setContentSize = function(t, e) {
void 0 !== e && (t = new cc.Size(t, e));
o.call(this, t);
};
var s = r.setAnchorPoint;
r.setAnchorPoint = function(t, e) {
void 0 !== e && (t = new cc.Vec2(t, e));
s.call(this, t);
};
} else {
r.setFillType = function() {};
r.setFillCenter = function() {};
r.setFillStart = function() {};
r.setFillRange = function() {};
r.enableTrimmedContentSize = function() {};
r._lazyInit = function() {
if (!this._onceInit) {
this._onceInit = !0;
this._insets = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._trim = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._contentSizeTrimmed = new cc.Size(0, 0);
this._anchorPointTrimmed = new cc.Vec2(0, 0);
this._sizeAfterTrimmed = new cc.Size(0, 0);
}
};
r._applyInsetsContentAnchor = function() {
var t = 1, e = 1;
if ((this._renderingType || this.getRenderingType && this.getRenderingType()) === cc.Scale9Sprite.RenderingType.SIMPLE) {
t = this._contentSizeTrimmed.width / this._sizeAfterTrimmed.width;
e = this._contentSizeTrimmed.height / this._sizeAfterTrimmed.height;
}
var i = new cc.Size(0, 0);
i.width = this._contentSizeTrimmed.width + (this._trim.left + this._trim.right) * t;
i.height = this._contentSizeTrimmed.height + (this._trim.top + this._trim.bottom) * e;
this._setContentSize(i);
var n = new cc.Vec2(0, 0);
n.x = this._contentSizeTrimmed.width * this._anchorPointTrimmed.x + this._trim.left * t;
n.y = this._contentSizeTrimmed.height * this._anchorPointTrimmed.y + this._trim.bottom * e;
n.x = n.x / i.width;
n.y = n.y / i.height;
this._setAnchorPoint(n);
var r = new cc.Rect(0, 0, 0, 0);
r.x = this._trim.left + this._insets.left;
r.y = this._trim.top + this._insets.top;
r.width = this._sizeAfterTrimmed.width - this._insets.left - this._insets.right;
r.height = this._sizeAfterTrimmed.height - this._insets.top - this._insets.bottom;
this.setCapInsets(r);
};
r._setBlendFunc = r.setBlendFunc;
r.setBlendFunc = function(t, e) {
void 0 !== e && (t = {
src: t,
dst: e
});
this._setBlendFunc && this._setBlendFunc(t);
};
r._getContentSize = r.getContentSize;
r.getContentSize = function() {
return new cc.Size(this._contentSizeTrimmed);
};
r._setContentSize = r.setContentSize;
r.setContentSize = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Size(t, e));
this._contentSizeTrimmed = new cc.Size(t);
this._applyInsetsContentAnchor();
};
r._getAnchorPoint = r.getAnchorPoint;
r.getAnchorPoint = function() {
return new cc.Vec2(this._anchorPointTrimmed);
};
r._setAnchorPoint = r.setAnchorPoint;
r.setAnchorPoint = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Vec2(t, e));
this._anchorPointTrimmed = new cc.Vec2(t);
this._applyInsetsContentAnchor();
};
r._getInsetLeft = r.getInsetLeft;
r._getInsetRight = r.getInsetRight;
r._getInsetBottom = r.getInsetBottom;
r._getInsetTop = r.getInsetTop;
r.getInsetLeft = function() {
return this._insets.left;
};
r.getInsetRight = function() {
return this._insets.right;
};
r.getInsetBottom = function() {
return this._insets.bottom;
};
r.getInsetTop = function() {
return this._insets.top;
};
r._setInsetLeft = r.setInsetLeft;
r.setInsetLeft = function(t) {
this._lazyInit();
this._insets.left = t;
this._applyInsetsContentAnchor();
};
r._setInsetRight = r.setInsetRight;
r.setInsetRight = function(t) {
this._lazyInit();
this._insets.right = t;
this._applyInsetsContentAnchor();
};
r._setInsetTop = r.setInsetTop;
r.setInsetTop = function(t) {
this._lazyInit();
this._insets.top = t;
this._applyInsetsContentAnchor();
};
r._setInsetBottom = r.setInsetBottom;
r.setInsetBottom = function(t) {
this._lazyInit();
this._insets.bottom = t;
this._applyInsetsContentAnchor();
};
r._setSpriteFrame = r.setSpriteFrame;
r.setSpriteFrame = function(t) {
this._lazyInit();
var e = t.getOriginalSize(), i = t.getRect(), n = t.getOffset(), r = (e.width + 2 * n.x - i.width) / 2, o = e.width - r - i.width, s = (e.height + 2 * n.y - i.height) / 2, c = e.height - s - i.height;
this._trim.left = r;
this._trim.right = o;
this._trim.top = c;
this._trim.bottom = s;
this._sizeAfterTrimmed = new cc.Size(i.width, i.height);
this._setSpriteFrame(t);
this._applyInsetsContentAnchor();
};
}
}), {} ],
133: [ (function(i, n, r) {
"use strict";
i("../cocos2d/core/platform/CCClass");
i("../cocos2d/core/assets/CCAsset");
cc.TextureCache.prototype._addImageAsync || (cc.TextureCache.prototype._addImageAsync = cc.TextureCache.prototype.addImageAsync);
cc.TextureCache.prototype.addImageAsync = function(t, e, i) {
var n = null;
cc.loader.load(t, (function(t, r) {
t && (r = null);
e && e.call(i, r);
n = r;
}));
return n;
};
cc.TextureCache.prototype._addImage || (cc.TextureCache.prototype._addImage = cc.TextureCache.prototype.addImage);
cc.TextureCache.prototype.addImage = function(i, n, r) {
return "function" === ("object" == (e = typeof n) ? t(n) : e) ? this.addImageAsync(i, n, r) : n ? this._addImage(i, n) : this._addImage(i);
};
cc.textureCache._textures = {};
cc.textureCache.cacheImage = function(t, e) {
e instanceof cc.Texture2D && (this._textures[t] = e);
};
cc.textureCache._getTextureForKey = cc.textureCache.getTextureForKey;
cc.textureCache.getTextureForKey = function(t) {
var e = this._getTextureForKey(t);
e || (e = this._textures[t]);
return e || null;
};
cc.textureCache._removeTextureForKey = cc.textureCache.removeTextureForKey;
cc.textureCache.removeTextureForKey = function(t) {
this._textures[t] && delete this._textures[t];
this._removeTextureForKey(t);
};
cc.Class._fastDefine("cc.Texture2D", cc.Texture2D, []);
cc.js.value(cc.Texture2D, "$super", cc.RawAsset);
cc.Texture2D.PixelFormat = cc.Enum({
RGB565: cc.Texture2D.PIXEL_FORMAT_RGB565,
RGB5A1: cc.Texture2D.PIXEL_FORMAT_RGB5A1,
RGBA4444: cc.Texture2D.PIXEL_FORMAT_RGBA4444,
RGB888: cc.Texture2D.PIXEL_FORMAT_RGB888,
RGBA8888: cc.Texture2D.PIXEL_FORMAT_RGBA8888,
A8: cc.Texture2D.PIXEL_FORMAT_A8,
I8: cc.Texture2D.PIXEL_FORMAT_I8,
AI8: cc.Texture2D.PIXEL_FORMAT_AI8
});
cc.Texture2D.WrapMode = cc.Enum({
REPEAT: 10497,
CLAMP_TO_EDGE: 33071,
MIRRORED_REPEAT: 33648
});
cc.Texture2D.Filter = cc.Enum({
LINEAR: 9729,
NEAREST: 9728
});
var o = cc.Texture2D.prototype;
o.loaded = !0;
o.update = function(t) {
var e = !1, i = !1;
if (t) {
if (void 0 !== t.minFilter) {
this._minFilter = t.minFilter;
e = !0;
}
if (void 0 !== t.magFilter) {
this._magFilter = t.magFilter;
e = !0;
}
if (void 0 !== t.wrapS) {
this._wrapS = t.wrapS;
e = !0;
}
if (void 0 !== t.wrapT) {
this._wrapT = t.wrapT;
e = !0;
}
void 0 !== t.mipmap && (i = this._hasMipmap = t.mipmap);
}
e && this.setTexParameters(t);
i && this.generateMipmap();
};
o.isLoaded = function() {
return !0;
};
o.getPixelWidth = o.getPixelsWide;
o.getPixelHeight = o.getPixelsHigh;
o.description = o.getDescription;
cc.js.get(o, "pixelWidth", o.getPixelWidth);
cc.js.get(o, "pixelHeight", o.getPixelHeight);
cc.js.get(o, "_glID", o.getName);
cc.Class._fastDefine("cc.SpriteFrame", cc.SpriteFrame, []);
cc.js.value(cc.SpriteFrame, "$super", cc.Asset);
(o = cc.SpriteFrame.prototype)._setTexture = o.setTexture;
o._initWithTexture = o.initWithTexture;
cc.js.mixin(o, cc.EventTarget.prototype);
o._ctor = function(t, e, i, n, r) {
this._name = "";
this.insetTop = 0;
this.insetBottom = 0;
this.insetLeft = 0;
this.insetRight = 0;
void 0 !== t && this.initWithTexture(t, e, i, n, r);
};
o.textureLoaded = function() {
return null !== this.getTexture();
};
o.setTexture = function(t, e, i, n, r) {
e && this.setRect(e);
n && this.setOffset(n);
r && this.setOriginalSize(r);
this.setRotated(i || !1);
var o = t;
if (cc.js.isString(t)) {
this._textureFilename = t;
this._loadTexture();
} else o instanceof cc.Texture2D && this._refreshTexture(o);
return !0;
};
o.initWithTexture = o.setTexture;
o._loadTexture = function() {
if (this._textureFilename) {
var t = cc.textureCache.addImage(this._textureFilename);
this._refreshTexture(t);
}
};
o.ensureLoadTexture = function() {
this._texture || this._loadTexture();
};
o.clearTexture = function() {
this._setTexture(null);
};
o._refreshTexture = function(t) {
if (this.getTexture() !== t) {
var e = t.width, i = t.height, n = this.getRect();
0 === n.width || 0 === n.height ? n = cc.rect(0, 0, e, i) : this._checkRect(t);
var r = this.getOriginalSize();
0 !== r.width && 0 !== r.height || (r = cc.size(e, i));
var o = this.getOffset(), s = this.isRotated();
this._initWithTexture(t, n, s, o, r);
this.emit("load");
}
};
o._deserialize = function(t, e) {
var i = t.rect;
i && this.setRect(new cc.Rect(i[0], i[1], i[2], i[3]));
t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1]));
t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1]));
this.setRotated(1 === t.rotated);
this._name = t.name;
var n = t.capInsets;
if (n) {
this.insetLeft = n[0];
this.insetTop = n[1];
this.insetRight = n[2];
this.insetBottom = n[3];
}
var r = t.texture;
if (r) {
var o = e.customEnv && e.customEnv.deferredLoadRaw ? "_textureFilename" : "_textureFilenameSetter";
e.result.push(this, o, r);
}
};
o._checkRect = function(t) {
var e = this.getRect(), i = e.x, n = e.y;
if (this.isRotated()) {
i += e.height;
n += e.width;
} else {
i += e.width;
n += e.height;
}
i > t.getPixelWidth() && cc.errorID(3300, t.url);
n > t.getPixelHeight() && cc.errorID(3400, t.url);
};
o._getTexture = o.getTexture;
o.getTexture = function() {
var t = this._getTexture();
this._texture = t;
return t;
};
o._clone = o.clone;
o.clone = function() {
var t = this._clone();
t._name = this._name;
t.insetTop = this.insetTop;
t.insetBottom = this.insetBottom;
t.insetLeft = this.insetLeft;
t.insetRight = this.insetRight;
return t;
};
cc.js.set(o, "_textureFilenameSetter", (function(t) {
this._textureFilename = t;
t && this._loadTexture();
}));
cc.js.getset(o, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}));
}), {
"../cocos2d/core/assets/CCAsset": 18,
"../cocos2d/core/platform/CCClass": 78
} ],
134: [ (function(t, e, i) {
"use strict";
if (!cc.runtime) {
var n = cc.TMXObject.prototype;
cc.defineGetterSetter(n, "type", n.getType, null);
cc.defineGetterSetter(n, "name", n.getObjectName, n.setObjectName);
cc.defineGetterSetter(n, "id", n.getId, null);
cc.defineGetterSetter(n, "gid", n.getGid, null);
cc.defineGetterSetter(n, "offset", n.getOffset, null);
cc.defineGetterSetter(n, "objectSize", n.getObjectSize, null);
cc.defineGetterSetter(n, "objectVisible", n.getObjectVisible, null);
cc.defineGetterSetter(n, "objectRotation", n.getObjectRotation, null);
cc.defineGetterSetter(n, "sgNode", n.getNode, null);
}
}), {} ],
135: [ (function(i, n, r) {
Math.sign || (Math.sign = function(t) {
return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
});
Number.isInteger || (Number.isInteger = function(i) {
return "number" === ("object" == (e = typeof i) ? t(i) : e) && isFinite(i) && Math.floor(i) === i;
});
var o = window.performance || Date, s = Object.create(null);
console.time = function(t) {
s[t] = o.now();
};
console.timeEnd = function(t) {
var e = s[t], i = o.now() - e;
console.log(t + ": " + i + "ms");
};
}), {} ],
136: [ (function(i, n, r) {
String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
e = e || 0;
return this.lastIndexOf(t, e) === e;
});
String.prototype.endsWith || (String.prototype.endsWith = function(i, n) {
("undefined" === ("object" == (e = typeof n) ? t(n) : e) || n > this.length) && (n = this.length);
n -= i.length;
var r = this.indexOf(i, n);
return -1 !== r && r === n;
});
}), {} ],
137: [ (function(i, n, r) {
var o = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
};
window.__extends = function(t, e) {
function i() {
this.constructor = t;
}
o(t, e);
t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
};
window.__assign = Object.assign || function(t) {
for (var e, i = 1, n = arguments.length; i < n; i++) {
e = arguments[i];
for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
}
return t;
};
window.__rest = function(i, n) {
var r = {};
for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && n.indexOf(o) < 0 && (r[o] = i[o]);
if (null != i && "function" === ("object" == (e = typeof Object.getOwnPropertySymbols) ? t(Object.getOwnPropertySymbols) : e)) {
var s = 0;
for (o = Object.getOwnPropertySymbols(i); s < o.length; s++) n.indexOf(o[s]) < 0 && (r[o[s]] = i[o[s]]);
}
return r;
};
window.__decorate = function(i, n, r, o) {
var s, c = arguments.length, a = c < 3 ? n : null === o ? o = Object.getOwnPropertyDescriptor(n, r) : o;
if ("object" === ("object" == (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" == (e = typeof Reflect.decorate) ? t(Reflect.decorate) : e)) a = Reflect.decorate(i, n, r, o); else for (var u = i.length - 1; u >= 0; u--) (s = i[u]) && (a = (c < 3 ? s(a) : c > 3 ? s(n, r, a) : s(n, r)) || a);
return c > 3 && a && Object.defineProperty(n, r, a), a;
};
window.__param = function(t, e) {
return function(i, n) {
e(i, n, t);
};
};
window.__metadata = function(i, n) {
if ("object" === ("object" == (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" == (e = typeof Reflect.metadata) ? t(Reflect.metadata) : e)) return Reflect.metadata(i, n);
};
window.__awaiter = function(t, e, i, n) {
return new (i || (i = Promise))(function(r, o) {
function s(t) {
try {
a(n.next(t));
} catch (t) {
o(t);
}
}
function c(t) {
try {
a(n.throw(t));
} catch (t) {
o(t);
}
}
function a(t) {
t.done ? r(t.value) : new i(function(e) {
e(t.value);
}).then(s, c);
}
a((n = n.apply(t, e || [])).next());
});
};
window.__generator = function(i, n) {
function r(t) {
return function(e) {
return (function(t) {
if (o) throw new TypeError("Generator is already executing.");
for (;u; ) try {
if (o = 1, s && (c = s[2 & t[0] ? "return" : t[0] ? "throw" : "next"]) && !(c = c.call(s, t[1])).done) return c;
(s = 0, c) && (t = [ 0, c.value ]);
switch (t[0]) {
case 0:
case 1:
c = t;
break;

case 4:
u.label++;
return {
value: t[1],
done: !1
};

case 5:
u.label++;
s = t[1];
t = [ 0 ];
continue;

case 7:
t = u.ops.pop();
u.trys.pop();
continue;

default:
if (!(c = u.trys, c = c.length > 0 && c[c.length - 1]) && (6 === t[0] || 2 === t[0])) {
u = 0;
continue;
}
if (3 === t[0] && (!c || t[1] > c[0] && t[1] < c[3])) {
u.label = t[1];
break;
}
if (6 === t[0] && u.label < c[1]) {
u.label = c[1];
c = t;
break;
}
if (c && u.label < c[2]) {
u.label = c[2];
u.ops.push(t);
break;
}
c[2] && u.ops.pop();
u.trys.pop();
continue;
}
t = n.call(i, u);
} catch (e) {
t = [ 6, e ];
s = 0;
} finally {
o = c = 0;
}
if (5 & t[0]) throw t[1];
return {
value: t[0] ? t[1] : void 0,
done: !0
};
})([ t, e ]);
};
}
var o, s, c, a, u = {
label: 0,
sent: function() {
if (1 & c[0]) throw c[1];
return c[1];
},
trys: [],
ops: []
};
return a = {
next: r(0),
throw: r(1),
return: r(2)
}, "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && (a[Symbol.iterator] = function() {
return this;
}), a;
};
window.__exportStar = function(t, e) {
for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i]);
};
window.__values = function(i) {
var n = "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator], r = 0;
return n ? n.call(i) : {
next: function() {
i && r >= i.length && (i = void 0);
return {
value: i && i[r++],
done: !i
};
}
};
};
window.__read = function(i, n) {
var r = "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator];
if (!r) return i;
var o, s, c = r.call(i), a = [];
try {
for (;(void 0 === n || n-- > 0) && !(o = c.next()).done; ) a.push(o.value);
} catch (t) {
s = {
error: t
};
} finally {
try {
o && !o.done && (r = c.return) && r.call(c);
} finally {
if (s) throw s.error;
}
}
return a;
};
window.__spread = function() {
for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
return t;
};
window.__await = function(t) {
return this instanceof __await ? (this.v = t, this) : new __await(t);
};
window.__asyncGenerator = function(t, e, i) {
function n(t) {
u[t] && (a[t] = function(e) {
return new Promise(function(i, n) {
l.push([ t, e, i, n ]) > 1 || r(t, e);
});
});
}
function r(t, e) {
try {
(function(t) {
t.value instanceof __await ? Promise.resolve(t.value.v).then(o, s) : c(l[0][2], t);
})(u[t](e));
} catch (t) {
c(l[0][3], t);
}
}
function o(t) {
r("next", t);
}
function s(t) {
r("throw", t);
}
function c(t, e) {
(t(e), l.shift(), l.length) && r(l[0][0], l[0][1]);
}
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var a, u = i.apply(t, e || []), l = [];
return a = {}, n("next"), n("throw"), n("return"), a[Symbol.asyncIterator] = function() {
return this;
}, a;
};
window.__asyncDelegator = function(t) {
function e(e, r) {
t[e] && (i[e] = function(i) {
return (n = !n) ? {
value: __await(t[e](i)),
done: "return" === e
} : r ? r(i) : i;
});
}
var i, n;
return i = {}, e("next"), e("throw", (function(t) {
throw t;
})), e("return"), i[Symbol.iterator] = function() {
return this;
}, i;
};
window.__asyncValues = function(i) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var n = i[Symbol.asyncIterator];
return n ? n.call(i) : "function" === ("object" == (e = typeof __values) ? t(__values) : e) ? __values(i) : i[Symbol.iterator]();
};
}), {} ]
}, {}, [ 121 ]);
var e = "";
})();