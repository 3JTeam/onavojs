/**
 * onavojs v0.19 
 * @ 开发 p_jiewwang p_dainli p_miyagong
 * { JavaScript 工具库 }
 * github@ https://github.com/jiayi2/onavo
 * email:email@ahthw.com
 * @Organizations https://github.com/3JTeam
 * $$代表onavojs库/Object的对象
 */

//; 防止多个文件压缩合并的语法错误
;
var $$, $$T, $$TB, $$A, $$S, $$D, $$jx, $$F, $$E, $$CE;
//匿名的函数，为undefined是window的属性，声明为局部变量之后，在函数中如果再有变量与undefined做比较的话，程序就可以不用搜索undefined到window，可以提高程序的性能。
(function(undefined) {
	//代码开始
	/* polyfill */
	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement, fromIndex) {
			var k;
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if (len === 0) {
				return -1
			}
			var n = +fromIndex || 0;
			if (Math.abs(n) === Infinity) {
				n = 0
			}
			if (n >= len) {
				return -1
			}
			k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
			while (k < len) {
				if (k in O && O[k] === searchElement) {
					return k
				}
				k++
			}
			return -1
		}
	}
	/* polyfill */
	var O, T, TB, A, S, D, jx, F, E, CE;

	O = function(id) {
		return "string" == typeof id ? document.getElementById(id) : id;
	};
	/* 对象检测 */
	O.type = {
		getType: function(ele) {
			if (!ele) return undefined;
			if (window == document && document != window) {
				return 'window';
			} else if (ele.nodeType === 9) {
				return 'document';
			} else if (ele.callee) {
				return 'arguments';
			} else if (isFinite(ele.length) && ele.item) {
				return 'nodeList';
			} else {
				var temp = Object.prototype.toString.call(ele),
					reg = /\[object (.*)\]/,
					arr = reg.exec(temp);
				return arr[1].toLowerCase();
			}
		},
		isArray: function(ele) {
			return (this.getType(ele) === 'array') ? true : false;
		},
		isFunction: function(ele) {
			return (this.getType(ele) === 'function') ? true : false;
		},
		isObject: function(ele) {
			return (this.getType(ele) === 'object') ? true : false;
		},
		isString: function(ele) {
			return (this.getType(ele) === 'string') ? true : false;
		},
		isNumber: function(ele) {
			return (this.getType(ele) === 'number') ? true : false;
		},
		isBoolen: function(ele) {
			return (this.getType(ele) === 'boolean') ? true : false;
		},
		isUndefined: function(ele) {
			return (this.getType(ele) === 'undefined') ? true : false;
		},
		isNull: function(ele) {
			return (this.getType(ele) === 'null') ? true : false;
		}
	};
	/* 扩展对象 */
	//防止非prototype属性方法的继承
	O.emptyFun = function() {};
	O.extend = function(destination, source, override) {
		if (override === undefined) override = true;
		for (var property in source) {
			if (override || !(property in destination)) {
				destination[property] = source[property];
			}
		}
		return destination;
	};
	/** 数组深扩展 **/
	//参考jQuery的extend
	O.deepextend = function(destination, source) {
		for (var property in source) {
			var copy = source[property];
			if (destination === copy) continue;
			if (typeof copy === "object") {
				destination[property] = arguments.callee(destination[property] || {}, copy);
			} else {
				destination[property] = copy;
			}
		}
		return destination;
	};
	//参考的$extends
	O.warpp = function(me, parent) {
		var ins = function() {
			me.apply(this, arguments);
		};
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		ins.prototype = new subclass;
		return ins;
	};
	/* tools s */
	T = {
		//jsload 
		jsload: function(name, callback) {
			var newJs = document.createElement('script');
			// ie
			newJs.onreadystatechange = function() {
				if (newJs.readyState === 'loaded' || newJs.readyState === 'complete') {
					newJs.onreadystatechange = null;
					callback && callback();
				};
			};
			// 正常
			newJs.onload = function() {
				callback && callback();
			};
			newJs.src = name;
			// document.documentElement 特指 head
			document.documentElement.firstChild.appendChild(newJs);
		},
		//jsload 
		//cssload
		cssload: function(url, callback) {
				if (!url) {
					showError('cssload=>异步加载的url地址不正确');
				}
				if (document.createStyleSheet) {
					document.createStyleSheet(url);
					callback && callback();
				} else {
					var link = document.createElement('link');
					link.rel = 'stylesheet';
					link.type = 'text/css';
					link.href = url;
					callback && callback();
					document.documentElement.firstChild.appendChild(link);
				};
			}
			//cssload
	};
	//$$TB专门用于 浏览器检测S
	TB = (function(ua) {
		var B = {
			mobile: (/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(ua)), //是否为移动终端
			ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: ua.match(/android/i) == "android", //android终端或者uc浏览器
			iPhone: ua.match(/iphone os/i) == "iphone os", //是否为iPhone或者QQHD浏览器
			iPad: ua.match(/ipad/i) == "ipad", //是否iPad
			webApp: ua.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			chrome: /chrome/.test(ua),
			firefox: /firefox/.test(ua),
			safari: /webkit/.test(ua) && !/chrome/.test(ua),
			opera: /opera/.test(ua)
		};
		//IE11的userAgent里是没有MSIE标志，加上IE版本差别多，所以单独$$TB.IE()方法
		var IE = function() {
			var sys = {};
			var s;
			(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
				(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] : 0;
			var _version = parseInt(sys.ie, 10);
			if (sys.ie) {
				return {
					is: true,
					version: _version
				}
			};
			return false;
		};
		var weixin = function() {
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				return true;
			} else {
				return false;
			};
		};
		var cookie = function() {
			function _extend() {
				var i = 0;
				var result = {};
				for (; i < arguments.length; i++) {
					var attributes = arguments[i];
					for (var key in attributes) {
						result[key] = attributes[key];
					}
				}
				return result;
			}

			function init(converter) {
				function api(key, value, attributes) {
					var result;
					if (typeof document === 'undefined') {
						return;
					}
					if (arguments.length > 1) {
						attributes = _extend({
							path: '/'
						}, api.defaults, attributes);

						if (typeof attributes.expires === 'number') {
							var expires = new Date();
							expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
							attributes.expires = expires;
						}

						try {
							result = JSON.stringify(value);
							if (/^[\{\[]/.test(result)) {
								value = result;
							}
						} catch (e) {}

						if (!converter.write) {
							value = encodeURIComponent(String(value))
								.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
						} else {
							value = converter.write(value, key);
						}

						key = encodeURIComponent(String(key));
						key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
						key = key.replace(/[\(\)]/g, escape);

						return (document.cookie = [
							key, '=', value,
							attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '',
							attributes.path ? '; path=' + attributes.path : '',
							attributes.domain ? '; domain=' + attributes.domain : '',
							attributes.secure ? '; secure' : ''
						].join(''));
					}
					if (!key) {
						result = {};
					}
					var cookies = document.cookie ? document.cookie.split('; ') : [];
					var rdecode = /(%[0-9A-Z]{2})+/g;
					var i = 0;

					for (; i < cookies.length; i++) {
						var parts = cookies[i].split('=');
						var cookie = parts.slice(1).join('=');

						if (cookie.charAt(0) === '"') {
							cookie = cookie.slice(1, -1);
						}

						try {
							var name = parts[0].replace(rdecode, decodeURIComponent);
							cookie = converter.read ?
								converter.read(cookie, name) : converter(cookie, name) ||
								cookie.replace(rdecode, decodeURIComponent);

							if (this.json) {
								try {
									cookie = JSON.parse(cookie);
								} catch (e) {}
							}

							if (key === name) {
								result = cookie;
								break;
							}

							if (!key) {
								result[name] = cookie;
							}
						} catch (e) {}
					}

					return result;
				}

				api.set = api;
				api.get = function(key) {
					return api.call(api, key);
				};
				api.getJSON = function() {
					return api.apply({
						json: true
					}, [].slice.call(arguments));
				};
				api.defaults = {};

				api.remove = function(key, attributes) {
					api(key, '', _extend(attributes, {
						expires: -1
					}));
				};

				api.withConverter = init;

				return api;
			}
			return init(function() {});
		};
		return {
			B: B,
			IE: IE,
			weixin: weixin,
			cookie: cookie
		}
	})(window.navigator.userAgent.toLowerCase());
	if (TB.IE().version == 6) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
	};
	// 移掉ie6图像闪烁
	//浏览器检测E
	/* tools e */
	/*数组方法 s */
	//除了es5 forEach, map, filter, every, some, indexOf, lastIndexOf 新增的方法外
	//isArray unique random 都是自己实现的
	A = function() {
		var ret = {
			isArray: function(obj) {
				return Object.prototype.toString.call(obj) === "[object Array]";
			},
			//数组去重
			unique: function(target) {
				var temp = [];
				_that: for (var i = 0, len = target.length; i < len; i++) {
					for (var j = i + 1; j < len; j++) {
						if (target[i] === target[j]) {
							continue _that;
						}
					}
					temp.push(target[i])
				}
				return temp;
			},
			//在数组中随机取一个
			random: function(target) {
				return target[Math.floor(Math.random() * target.length)];
			},
			//打乱数组返回新数组
			shuffle: function(target) {
				if (!target.length == 0) {
					var temp = target,
						j,
						x,
						i = target.length;
					for (; i > 0; j = parseInt(Math.random() * i), x = target[--i], target[i] = target[j], target[j] = x) {

					}
					return temp;
					//target.sort(function(){return 0.5 - Math.random()});	
				};
				return;
			},
			//是否包含指定元素
			contains: function(target, item) {
				return target.indexOf(item) > -1;
			},
			//在参数1中删除参数2指定位的元素返回布尔
			removeAt: function(target, index) {
				return !!target.splice(index, 1).length;
			},
			//在参数1中删除参数2返回布尔
			remove: function(target, item) {
				var index = target.indexOf(item);
				return index > -1 ? this.removeAt(target, index) : false;
			},
			//去除数组中的undefined和Null
			compact: function(target) {
				if (!type.isArray(target)) {
					throw new Error('target error type');
				}
				return target.filter(function(item) {
					return item != undefined;
				})
			},
			//获取数组对象中的属性值，组合成新数组
			pluck: function(target, name) {
				var result = [],
					temp;
				target.forEach(function(item) {
					temp = item[name];
					if (temp != null) {
						result.push(temp);
					}
				});
				return result;
			},
			//2个数组的并集
			union: function(t1, t2) {
				return this.unique(t1.concat(t2));
			},
			// 取2个数组的交集
			intersect: function(t1, t2) {
				return t1.filter(function(item) {
					return ~t2.indexOf(item);
				});
			},
			//取差集
			diff: function(t1, t2) {
				var r = t1;
				for (var i = 0; i < t1.length; i++) {
					for (var j = 0; j < t2.length; j++) {
						if (r[i] === t2[j]) {
							r.splice(i, 1);
							i--;
							break;
						}
					}
				}
				return r;
			},
			// 
			max: function(target) {
				return Array.max.apply(0, target);
			},
			//min
			min: function(target) {
				return Array.min.apply(0, target);
			},
			//以下es5新增
			indexOf: function(array, elt, from) {
				if (array.indexOf) {
					return isNaN(from) ? array.indexOf(elt) : array.indexOf(elt, from);
				} else {
					var len = array.length;
					from = isNaN(from) ? 0 : from < 0 ? Math.ceil(from) + len : Math.floor(from);

					for (; from < len; from++) {
						if (array[from] === elt) return from;
					}
					return -1;
				}
			},
			lastIndexOf: function(array, elt, from) {
				if (array.lastIndexOf) {
					return isNaN(from) ? array.lastIndexOf(elt) : array.lastIndexOf(elt, from);
				} else {
					var len = array.length;
					from = isNaN(from) || from >= len - 1 ? len - 1 : from < 0 ? Math.ceil(from) + len : Math.floor(from);

					for (; from > -1; from--) {
						if (array[from] === elt) return from;
					}
					return -1;
				}
			}
		};

		function each(object, callback) {
			if (undefined === object.length) {
				for (var name in object) {
					if (false === callback(object[name], name, object)) break;
				}
			} else {
				for (var i = 0, len = object.length; i < len; i++) {
					if (i in object) {
						if (false === callback(object[i], i, object)) break;
					}
				}
			}
		};

		each({
			forEach: function(object, callback, thisp) {
				each(object, function() {
					callback.apply(thisp, arguments);
				});
			},
			map: function(object, callback, thisp) {
				var ret = [];
				each(object, function() {
					ret.push(callback.apply(thisp, arguments));
				});
				return ret;
			},
			filter: function(object, callback, thisp) {
				var ret = [];
				each(object, function(item) {
					callback.apply(thisp, arguments) && ret.push(item);
				});
				return ret;
			},
			every: function(object, callback, thisp) {
				var ret = true;
				each(object, function() {
					if (!callback.apply(thisp, arguments)) {
						ret = false;
						return false;
					};
				});
				return ret;
			},
			some: function(object, callback, thisp) {
				var ret = false;
				each(object, function() {
					if (callback.apply(thisp, arguments)) {
						ret = true;
						return false;
					};
				});
				return ret;
			}
		}, function(method, name) {
			ret[name] = function(object, callback, thisp) {
				if (object[name]) {
					return object[name](callback, thisp);
				} else {
					return method(object, callback, thisp);
				}
			}
		});

		return ret;

	}();
	/* 数组方法 e */
	/* 字符串s */
	S = {
		// 去空格
		trim: function(str) {
			str = str.replace(/^\s+/, '');
			for (var i = str.length - 1; i >= 0; i--) {
				if (/\S/.test(str.charAt(i))) {
					str = str.slice(0, i + 1);
					break;
				}
			}
			return str;
		},
		// 模仿C语言print方法
		print: function(str, object) {
			var arr = [].slice.call(arguments, 1),
				index;
			return str.replace(/#{([^{}]+)}/gm, function(match, name) {
				index = Number(name);
				if (index >= 0) {
					return arr[index];
				}
				if (object && object[name] !== '') {
					return object[name];
				}
				return '';
			})
		},
		//补零
		fillZero: function(target, n) {
			var z = new Array(n).join('0'),
				str = z + target,
				result = str.slice(-n);
			return result;
			//return (Math.pow(10,n) + '' + target).slice(-n);
		},
		// 去掉script内部的html标签
		stripTags: function(target) {
			if (type.getType(target) === 'String') {
				return target.replace(/<script[^>]*>(\S\s*?)<\/script>/img, '').replace(/<[^>]+>/g, '');
			}
		},
		//首字母大写
		capitalize: function(target) {
			return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
		},
		//驼峰转化（备用） 如margin-top转化为marginTop
		// camelize: function(s) {
		// 	return s.replace(/-([a-z])/ig, function(all, letter) {
		// 		return letter.toUpperCase();
		// 	});
		// },
		//_ - 转驼峰命名
		camelize: function(target) {
			if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
				return target;
			}
			return target.replace(/[-_][^-_]/g, function(match) {
				//console.log(match) 匹配测试
				return match.charAt(1).toUpperCase();
			})
		},
		// 把驼峰转换成_
		underscored: function(target) {
			return target.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
		},
		//把字符串中的_转成-
		dasherize: function(target) {
			return this.underscored(target).replace(/_/g, '-');
		},
		//字符串截断方法 目标 长度默认30，截断后符号默认...
		truncate: function(target, len, truncation) {
			len = len || 30;
			truncation = truncation ? truncation : '...';
			return (target.length > len) ? target.slice(0, (len - truncation.length)) + truncation : target.toString();
		},
		//获得字符串字节长度 参数2 utf-8 utf8 utf-16 utf16
		byteLen: function(str, charset) {
			var target = 0,
				charCode,
				i,
				len;
			charset = charset ? charset.toLowerCase() : '';
			if (charset === 'utf-16' || charset === 'utf16') {
				for (i = 0, len = str.length; i < len; i++) {
					charCode = str.charCodeAt(i);
					if (charCode <= 0xffff) {
						target += 2;
					} else {
						target += 4;
					}
				}
			} else {
				for (i = 0, len = str.length; i < len; i++) {
					charCode = str.charCodeAt(i);
					if (charCode <= 0x007f) {
						target += 1;
					} else if (charCode <= 0x07ff) {
						target += 2;
					} else if (charCode <= 0xffff) {
						target += 3;
					} else {
						target += 4;
					}
				}
			}
			return target;
		},
		//重复item,times次
		repeat: function(item, times) {
			var s = item,
				target = '';
			while (times > 0) {
				if (times % 2 == 1) {
					target += s;
				}
				if (times == 1) {
					break;
				}
				s += s;
				times = times >> 1;
			}
			return target;
			//retrun new Array(times).join(item)
		},
		//参2是参1的结尾么？参数3忽略大小写
		endsWith: function(target, item, ignorecase) {
			var str = target.slice(-(item.length));
			return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
		},
		//参数2是参数1的开头么？参数3忽略大小写
		startsWith: function(target, item, ignorecase) {
			var str = target.slice(0, item.length);
			return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
		},
		// 类名中，参数1 是否包含参数2，类名中的分隔符
		containsClass: function(target, item, separator) {
			return separator ? (separator + target + separator).indexOf(separator + item + separator) > -1 : this.contains(target, item);
		},
		//判定一个字符串是否包含另一个字符串
		contains: function(target, item) {
			return target.indexOf(item) != -1;
			//return target.indexOf(item) > -1;
		}
	};
	/* 字符串e */
	/* dom s */
	D = {
		//滚动的scrollTop
		getScrollTop: function(node) {
			var doc = node ? node.ownerDocument : document;
			return doc.documentElement.scrollTop || doc.body.scrollTop;
		},
		//滚动的scrollLeft
		getScrollLeft: function(node) {
			var doc = node ? node.ownerDocument : document;
			return doc.documentElement.scrollLeft || doc.body.scrollLeft;
		},
		//扩展 NodeA.compareDocumentPosition(NodeB)
		// 000000         0              元素一致
		// 000001         1              节点在不同的文档（或者一个在文档之外）
		// 000010         2              节点 B 在节点 A 之前
		// 000100         4              节点 A 在节点 B 之前
		// 001000         8              节点 B 包含节点 A
		// 010000         16             节点 A 包含节点 B
		// 100000         32             浏览器的私有使用
		contains: document.defaultView ? function(a, b) {
			return !!(a.compareDocumentPosition(b) & 16);
		} : function(a, b) {
			return a != b && a.contains(b);
		},
		getRect: function(node) {
			var left = 0,
				top = 0,
				right = 0,
				bottom = 0;
			if (!node.getBoundingClientRect || TB.IE().version == 8) {
				var n = node;
				while (n) {
					left += n.offsetLeft, top += n.offsetTop;
					n = n.offsetParent;
				};
				right = left + node.offsetWidth;
				bottom = top + node.offsetHeight;
			} else {
				var rect = node.getBoundingClientRect();
				left = right = D.getScrollLeft(node);
				top = bottom = D.getScrollTop(node);
				left += rect.left;
				right += rect.right;
				top += rect.top;
				bottom += rect.bottom;
			};
			return {
				"left": left,
				"top": top,
				"right": right,
				"bottom": bottom
			};
		},
		getClientRect: function(node) {
			var rect = D.getRect(node),
				sLeft = D.getScrollLeft(node),
				sTop = D.getScrollTop(node);
			rect.left -= sLeft;
			rect.right -= sLeft;
			rect.top -= sTop;
			rect.bottom -= sTop;
			return rect;
		},
		curStyle: document.defaultView ? function(elem) {
			return document.defaultView.getComputedStyle(elem, null);
		} : function(elem) {
			return elem.currentStyle;
		},
		getStyle: document.defaultView ? function(elem, name) {
			var style = document.defaultView.getComputedStyle(elem, null);
			return name in style ? style[name] : style.getPropertyValue(name);
		} : function(elem, name) {
			var style = elem.style,
				curStyle = elem.currentStyle;
			//透明度 from youa
			if (name == "opacity") {
				if (/alpha\(opacity=(.*)\)/i.test(curStyle.filter)) {
					var opacity = parseFloat(RegExp.$1);
					return opacity ? opacity / 100 : 0;
				}
				return 1;
			}
			if (name == "float") {
				name = "styleFloat";
			}
			var ret = curStyle[name] || curStyle[S.camelize(name)];
			//单位转换 from jqury
			if (!/^-?\d+(?:px)?$/i.test(ret) && /^\-?\d/.test(ret)) {
				var left = style.left,
					rtStyle = elem.runtimeStyle,
					rsLeft = rtStyle.left;

				rtStyle.left = curStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + "px";

				style.left = left;
				rtStyle.left = rsLeft;
			}
			return ret;
		},
		setStyle: function(elems, style, value) {
			if (!elems.length) {
				elems = [elems];
			}
			if (typeof style == "string") {
				var s = style;
				style = {};
				style[s] = value;
			}
			A.forEach(elems, function(elem) {
				for (var name in style) {
					var value = style[name];
					if (name == "opacity" && B.ie) {
						//ie透明度设置 from jquery
						elem.style.filter = (elem.currentStyle && elem.currentStyle.filter || "").replace(/alpha\([^)]*\)/, "") + " alpha(opacity=" + (value * 100 | 0) + ")";
					} else if (name == "float") {
						elem.style[B.ie ? "styleFloat" : "cssFloat"] = value;
					} else {
						elem.style[S.camelize(name)] = value;
					}
				};
			});
		},
		getSize: function(elem) {
			var width = elem.offsetWidth,
				height = elem.offsetHeight;
			if (!width && !height) {
				var repair = !D.contains(document.body, elem),
					parent;
				if (repair) { //如果元素不在body上
					parent = elem.parentNode;
					document.body.insertBefore(elem, document.body.childNodes[0]);
				}
				var style = elem.style,
					cssShow = {
						position: "absolute",
						visibility: "hidden",
						display: "block",
						left: "-9999px",
						top: "-9999px"
					},
					cssBack = {
						position: style.position,
						visibility: style.visibility,
						display: style.display,
						left: style.left,
						top: style.top
					};
				D.setStyle(elem, cssShow);
				width = elem.offsetWidth;
				height = elem.offsetHeight;
				D.setStyle(elem, cssBack);
				if (repair) {
					parent ? parent.appendChild(elem) : document.body.removeChild(elem);
				}
			}
			return {
				"width": width,
				"height": height
			};
		},
		//下一个兄弟元素
		nextB: function(el) {
			return (el.nextElementSibling) ? el.nextElementSibling : el.nextSibling;
		},
		//上一个兄弟元素
		prevB: function(el) {
			return (el.previousElementSibling) ? el.previousElementSibling : el.previousSibling;
		},
		// 本身后面的所有兄弟元素,不包括本身
		nextBs: function(el) {
			var arr = [],
				curr = this.nextB(el);
			while (curr && curr.nodeType === 1) {
				arr.push(curr);
				curr = this.nextB(curr);
			}
			return arr;
		},
		// 本身前面的所有兄弟元素,不包括本身
		prevBs: function(el) {
			var arr = [],
				curr = this.prevB(el);
			while (curr && curr.nodeType === 1) {
				arr.push(curr);
				curr = this.prevB(curr);
			}
			return arr;
		}
	};
	/* dom e*/
	/* ajax */
	jx = {
		getHTTPObject: function() {
			var http = false;
			if (typeof ActiveXObject != 'undefined') {
				try {
					http = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						http = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (E) {
						http = false;
					};
				};
			} else if (window.XMLHttpRequest) {
				try {
					http = new XMLHttpRequest();
				} catch (e) {
					http = false;
				};
			};
			return http;
		},
		load: function(url, callback, format) {
			var http = this.init();
			if (!http || !url) return;
			if (http.overrideMimeType) http.overrideMimeType('text/xml');

			if (!format) var format = "text";
			format = format.toLowerCase();

			var now = "uid=" + new Date().getTime();
			url += (url.indexOf("?") + 1) ? "&" : "?";
			url += now;

			http.open("GET", url, true);

			http.onreadystatechange = function() {
				if (http.readyState == 4) {
					if (http.status == 200) {
						var result = "";
						if (http.responseText) result = http.responseText;

						if (format.charAt(0) == "j") {
							result = result.replace(/[\n\r]/g, "");
							result = eval('(' + result + ')');
						};

						if (callback) callback(result);
					} else {
						if (error) error(http.status);
					};
				};
			};
			http.send(null);
		},
		init: function() {
			return this.getHTTPObject();
		}
	};
	/* ajax */
	/* Function s*/
	F = (function() {
		var slice = Array.prototype.slice;
		return {
			//绑定this,返回function的实例，这个实例和源function的结构一样，但是它已被绑定给了参数中提供的object，就是说，function中的this指针指向参数object。
			bind: function(fun, thisp) {
				var args = slice.call(arguments, 2);
				return function() {
					return fun.apply(thisp, args.concat(slice.call(arguments)));
				}
			},
			//绑定this,用法和上面的bind一样，区别在于用来绑定事件。
			bindAsEventListener: function(fun, thisp) {
				var args = slice.call(arguments, 2);
				return function(event) {
					return fun.apply(thisp, [E.fixEvent(event)].concat(args));
				}
			}
		};
	})();
	/* Function s*/
	/* Event */
	E = (function() {
		/*from dean edwards*/
		var addEvent, removeEvent, guid = 1,
			storage = function(element, type, handler) {
				if (!handler.$$guid) handler.$$guid = guid++;
				if (!element.events) element.events = {};
				var handlers = element.events[type];
				if (!handlers) {
					handlers = element.events[type] = {};
					if (element["on" + type]) {
						handlers[0] = element["on" + type];
					}
				}
			};
		if (window.addEventListener) {
			var fix = {
				"mouseenter": "mouseover",
				"mouseleave": "mouseout"
			};
			addEvent = function(element, type, handler) {
				if (type in fix) {
					storage(element, type, handler);
					var fixhandler = element.events[type][handler.$$guid] = function(event) {
						var related = event.relatedTarget;
						if (!related || (element != related && !(element.compareDocumentPosition(related) & 16))) {
							handler.call(this, event);
						}
					};
					element.addEventListener(fix[type], fixhandler, false);
				} else {
					element.addEventListener(type, handler, false);
				};
			};
			removeEvent = function(element, type, handler) {
				if (type in fix) {
					if (element.events && element.events[type]) {
						element.removeEventListener(fix[type], element.events[type][handler.$$guid], false);
						delete element.events[type][handler.$$guid];
					}
				} else {
					element.removeEventListener(type, handler, false);
				};
			};
		} else {
			addEvent = function(element, type, handler) {
				storage(element, type, handler);
				element.events[type][handler.$$guid] = handler;
				element["on" + type] = handleEvent;
			};
			removeEvent = function(element, type, handler) {
				if (element.events && element.events[type]) {
					delete element.events[type][handler.$$guid];
				}
			};

			function handleEvent() {
				var returnValue = true,
					event = fixEvent();
				var handlers = this.events[event.type];
				for (var i in handlers) {
					this.$$handleEvent = handlers[i];
					if (this.$$handleEvent(event) === false) {
						returnValue = false;
					}
				}
				return returnValue;
			};
		}
		//可参看jQuery的fix
		//http://dean.edwards.name/weblog/2005/10/add-event2/
		function fixEvent(event) {
			if (event) return event;
			event = window.event;
			event.pageX = event.clientX + D.getScrollLeft(event.srcElement);
			event.pageY = event.clientY + D.getScrollTop(event.srcElement);
			event.target = event.srcElement;
			event.stopPropagation = stopPropagation;
			event.preventDefault = preventDefault;
			var relatedTarget = {
				"mouseout": event.toElement,
				"mouseover": event.fromElement
			}[event.type];
			if (relatedTarget) {
				event.relatedTarget = relatedTarget;
			}

			return event;
		};

		function stopPropagation() {
			this.cancelBubble = true;
		};

		function preventDefault() {
			this.returnValue = false;
		};

		return {
			"addEvent": addEvent,
			"removeEvent": removeEvent,
			"fixEvent": fixEvent
		};
	})();
	/* Event */

	/* 自定义事件 CustomEvent */
	CE = (function() {
		var guid = 1;
		return {
			addEvent: function(object, type, handler) {
				if (!handler.$$$guid) handler.$$$guid = guid++;
				if (!object.cusevents) object.cusevents = {};
				if (!object.cusevents[type]) object.cusevents[type] = {};
				object.cusevents[type][handler.$$$guid] = handler;
			},
			removeEvent: function(object, type, handler) {
				if (object.cusevents && object.cusevents[type]) {
					delete object.cusevents[type][handler.$$$guid];
				}
			},
			fireEvent: function(object, type) {
				if (!object.cusevents) return;
				var args = Array.prototype.slice.call(arguments, 2),
					handlers = object.cusevents[type];
				for (var i in handlers) {
					handlers[i].apply(object, args);
				}
			},
			clearEvent: function(object) {
				if (!object.cusevents) return;
				for (var type in object.cusevents) {
					var handlers = object.cusevents[type];
					for (var i in handlers) {
						handlers[i] = null;
					}
					object.cusevents[type] = null;
				}
				object.cusevents = null;
			}
		};
	})();
	/* 自定义事件 */
	//代码结束

	/*定义*/
	$$ = O;
	$$T = T;
	$$TB = TB;
	$$A = A;
	$$S = S;
	$$D = D;
	$$jx = jx;
	$$F = F;
	$$E = E;
	$$CE = CE;
})();