!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.AOS=e():t.AOS=e()}(this,(function(){return function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="dist/",e(0)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},r=(o(n(1)),n(6)),a=o(r),u=o(n(7)),s=o(n(8)),c=o(n(9)),d=o(n(10)),f=o(n(11)),l=o(n(14)),m=[],p=!1,b={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},v=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(t&&(p=!0),p)return m=(0,f.default)(m,b),(0,d.default)(m,b.once),m},h=function(){m=(0,l.default)(),v()};t.exports={init:function(t){b=i(b,t),m=(0,l.default)();var e=document.all&&!window.atob;return function(t){return!0===t||"mobile"===t&&c.default.mobile()||"phone"===t&&c.default.phone()||"tablet"===t&&c.default.tablet()||"function"==typeof t&&!0===t()}(b.disable)||e?void m.forEach((function(t,e){t.node.removeAttribute("data-aos"),t.node.removeAttribute("data-aos-easing"),t.node.removeAttribute("data-aos-duration"),t.node.removeAttribute("data-aos-delay")})):(b.disableMutationObserver||s.default.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),b.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",b.easing),document.querySelector("body").setAttribute("data-aos-duration",b.duration),document.querySelector("body").setAttribute("data-aos-delay",b.delay),"DOMContentLoaded"===b.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?v(!0):"load"===b.startEvent?window.addEventListener(b.startEvent,(function(){v(!0)})):document.addEventListener(b.startEvent,(function(){v(!0)})),window.addEventListener("resize",(0,u.default)(v,b.debounceDelay,!0)),window.addEventListener("orientationchange",(0,u.default)(v,b.debounceDelay,!0)),window.addEventListener("scroll",(0,a.default)((function(){(0,d.default)(m,b.once)}),b.throttleDelay)),b.disableMutationObserver||s.default.ready("[data-aos]",h),m)},refresh:v,refreshHard:h}},function(t,e){},,,,,function(t,e){(function(e){"use strict";function n(t){var e=void 0===t?"undefined":i(t);return!!t&&("object"==e||"function"==e)}function o(t){if("number"==typeof t)return t;if(function(t){return"symbol"==(void 0===t?"undefined":i(t))||function(t){return!!t&&"object"==(void 0===t?"undefined":i(t))}(t)&&v.call(t)==u}(t))return a;if(n(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=n(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(s,"");var o=d.test(t);return o||f.test(t)?l(t.slice(2),o?2:8):c.test(t)?a:+t}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r="Expected a function",a=NaN,u="[object Symbol]",s=/^\s+|\s+$/g,c=/^[-+]0x[0-9a-f]+$/i,d=/^0b[01]+$/i,f=/^0o[0-7]+$/i,l=parseInt,m="object"==(void 0===e?"undefined":i(e))&&e&&e.Object===Object&&e,p="object"==("undefined"==typeof self?"undefined":i(self))&&self&&self.Object===Object&&self,b=m||p||Function("return this")(),v=Object.prototype.toString,h=Math.max,y=Math.min,w=function(){return b.Date.now()};t.exports=function(t,e,i){var a=!0,u=!0;if("function"!=typeof t)throw new TypeError(r);return n(i)&&(a="leading"in i?!!i.leading:a,u="trailing"in i?!!i.trailing:u),function(t,e,i){function a(e){var n=l,o=m;return l=m=void 0,k=e,b=t.apply(o,n)}function u(t){return k=t,v=setTimeout(c,e),x?a(t):b}function s(t){var n=t-g;return void 0===g||n>=e||n<0||O&&t-k>=p}function c(){var t=w();return s(t)?d(t):void(v=setTimeout(c,function(t){var n=e-(t-g);return O?y(n,p-(t-k)):n}(t)))}function d(t){return v=void 0,j&&l?a(t):(l=m=void 0,b)}function f(){var t=w(),n=s(t);if(l=arguments,m=this,g=t,n){if(void 0===v)return u(g);if(O)return v=setTimeout(c,e),a(g)}return void 0===v&&(v=setTimeout(c,e)),b}var l,m,p,b,v,g,k=0,x=!1,O=!1,j=!0;if("function"!=typeof t)throw new TypeError(r);return e=o(e)||0,n(i)&&(x=!!i.leading,p=(O="maxWait"in i)?h(o(i.maxWait)||0,e):p,j="trailing"in i?!!i.trailing:j),f.cancel=function(){void 0!==v&&clearTimeout(v),k=0,l=g=m=v=void 0},f.flush=function(){return void 0===v?b:d(w())},f}(t,e,{leading:a,maxWait:e,trailing:u})}}).call(e,function(){return this}())},function(t,e){(function(e){"use strict";function n(t){var e=void 0===t?"undefined":i(t);return!!t&&("object"==e||"function"==e)}function o(t){if("number"==typeof t)return t;if(function(t){return"symbol"==(void 0===t?"undefined":i(t))||function(t){return!!t&&"object"==(void 0===t?"undefined":i(t))}(t)&&b.call(t)==a}(t))return r;if(n(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=n(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(u,"");var o=c.test(t);return o||d.test(t)?f(t.slice(2),o?2:8):s.test(t)?r:+t}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=NaN,a="[object Symbol]",u=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,d=/^0o[0-7]+$/i,f=parseInt,l="object"==(void 0===e?"undefined":i(e))&&e&&e.Object===Object&&e,m="object"==("undefined"==typeof self?"undefined":i(self))&&self&&self.Object===Object&&self,p=l||m||Function("return this")(),b=Object.prototype.toString,v=Math.max,h=Math.min,y=function(){return p.Date.now()};t.exports=function(t,e,i){function r(e){var n=f,o=l;return f=l=void 0,g=e,p=t.apply(o,n)}function a(t){return g=t,b=setTimeout(s,e),k?r(t):p}function u(t){var n=t-w;return void 0===w||n>=e||n<0||x&&t-g>=m}function s(){var t=y();return u(t)?c(t):void(b=setTimeout(s,function(t){var n=e-(t-w);return x?h(n,m-(t-g)):n}(t)))}function c(t){return b=void 0,O&&f?r(t):(f=l=void 0,p)}function d(){var t=y(),n=u(t);if(f=arguments,l=this,w=t,n){if(void 0===b)return a(w);if(x)return b=setTimeout(s,e),r(w)}return void 0===b&&(b=setTimeout(s,e)),p}var f,l,m,p,b,w,g=0,k=!1,x=!1,O=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return e=o(e)||0,n(i)&&(k=!!i.leading,m=(x="maxWait"in i)?v(o(i.maxWait)||0,e):m,O="trailing"in i?!!i.trailing:O),d.cancel=function(){void 0!==b&&clearTimeout(b),g=0,f=w=l=b=void 0},d.flush=function(){return void 0===b?p:c(y())},d}}).call(e,function(){return this}())},function(t,e){"use strict";function n(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function o(t){t&&t.forEach((function(t){var e=Array.prototype.slice.call(t.addedNodes),n=Array.prototype.slice.call(t.removedNodes);if(function t(e){var n=void 0,o=void 0;for(n=0;n<e.length;n+=1){if((o=e[n]).dataset&&o.dataset.aos)return!0;if(o.children&&t(o.children))return!0}return!1}(e.concat(n)))return i()}))}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){};e.default={isSupported:function(){return!!n()},ready:function(t,e){var r=window.document,a=new(n())(o);i=e,a.observe(r.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}}},function(t,e){"use strict";function n(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),i=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,r=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,a=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,u=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return o(t,[{key:"phone",value:function(){var t=n();return!(!i.test(t)&&!r.test(t.substr(0,4)))}},{key:"mobile",value:function(){var t=n();return!(!a.test(t)&&!u.test(t.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),t}();e.default=new s},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var n=window.pageYOffset,o=window.innerHeight;t.forEach((function(t,i){!function(t,e,n){var o=t.node.getAttribute("data-aos-once");e>t.position?t.node.classList.add("aos-animate"):void 0!==o&&("false"===o||!n&&"true"!==o)&&t.node.classList.remove("aos-animate")}(t,o+n,e)}))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){return t&&t.__esModule?t:{default:t}}(n(12));e.default=function(t,e){return t.forEach((function(t,n){t.node.classList.add("aos-init"),t.position=(0,o.default)(t.node,e.offset)})),t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){return t&&t.__esModule?t:{default:t}}(n(13));e.default=function(t,e){var n=0,i=0,r=window.innerHeight,a={offset:t.getAttribute("data-aos-offset"),anchor:t.getAttribute("data-aos-anchor"),anchorPlacement:t.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(i=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(t=document.querySelectorAll(a.anchor)[0]),n=(0,o.default)(t).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=t.offsetHeight/2;break;case"bottom-bottom":n+=t.offsetHeight;break;case"top-center":n+=r/2;break;case"bottom-center":n+=r/2+t.offsetHeight;break;case"center-center":n+=r/2+t.offsetHeight/2;break;case"top-top":n+=r;break;case"bottom-top":n+=t.offsetHeight+r;break;case"center-top":n+=t.offsetHeight/2+r}return a.anchorPlacement||a.offset||isNaN(e)||(i=e),n+i}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){for(var e=0,n=0;t&&!isNaN(t.offsetLeft)&&!isNaN(t.offsetTop);)e+=t.offsetLeft-("BODY"!=t.tagName?t.scrollLeft:0),n+=t.offsetTop-("BODY"!=t.tagName?t.scrollTop:0),t=t.offsetParent;return{top:n,left:e}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return t=t||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(t,(function(t){return{node:t}}))}}])})),function(t){"use strict";var e=e||{},n=document.querySelectorAll.bind(document);function o(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}var i={duration:750,show:function(t,e){if(2===t.button)return!1;var n=e||this,r=document.createElement("div");r.className="waves-ripple",n.appendChild(r);var a,u,s,c,d,f=(c={top:0,left:0},u=(d=(a=n)&&a.ownerDocument).documentElement,void 0!==a.getBoundingClientRect&&(c=a.getBoundingClientRect()),s=function(t){return null!==(e=t)&&e===e.window?t:9===t.nodeType&&t.defaultView;var e}(d),{top:c.top+s.pageYOffset-u.clientTop,left:c.left+s.pageXOffset-u.clientLeft}),l=t.pageY-f.top,m=t.pageX-f.left,p="scale("+n.clientWidth/100*10+")";"touches"in t&&(l=t.touches[0].pageY-f.top,m=t.touches[0].pageX-f.left),r.setAttribute("data-hold",Date.now()),r.setAttribute("data-scale",p),r.setAttribute("data-x",m),r.setAttribute("data-y",l);var b={top:l+"px",left:m+"px"};r.className=r.className+" waves-notransition",r.setAttribute("style",o(b)),r.className=r.className.replace("waves-notransition",""),b["-webkit-transform"]=p,b["-moz-transform"]=p,b["-ms-transform"]=p,b["-o-transform"]=p,b.transform=p,b.opacity="1",b["-webkit-transition-duration"]=i.duration+"ms",b["-moz-transition-duration"]=i.duration+"ms",b["-o-transition-duration"]=i.duration+"ms",b["transition-duration"]=i.duration+"ms",b["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",b["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",b["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",b["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",r.setAttribute("style",o(b))},hide:function(t){r.touchup(t);var e=this,n=null,a=e.getElementsByClassName("waves-ripple");if(!(a.length>0))return!1;var u=(n=a[a.length-1]).getAttribute("data-x"),s=n.getAttribute("data-y"),c=n.getAttribute("data-scale"),d=350-(Date.now()-Number(n.getAttribute("data-hold")));d<0&&(d=0),setTimeout((function(){n.setAttribute("style",o({top:s+"px",left:u+"px",opacity:"0","-webkit-transition-duration":i.duration+"ms","-moz-transition-duration":i.duration+"ms","-o-transition-duration":i.duration+"ms","transition-duration":i.duration+"ms","-webkit-transform":c,"-moz-transform":c,"-ms-transform":c,"-o-transform":c,transform:c})),setTimeout((function(){try{e.removeChild(n)}catch(t){return!1}}),i.duration)}),d)},wrapInput:function(t){for(var e=0;e<t.length;e++){var n=t[e];if("input"===n.tagName.toLowerCase()){var o=n.parentNode;if("i"===o.tagName.toLowerCase()&&-1!==o.className.indexOf("waves-effect"))continue;var i=document.createElement("i");i.className=n.className+" waves-input-wrapper";var r=n.getAttribute("style");r||(r=""),i.setAttribute("style",r),n.className="waves-button-input",n.removeAttribute("style"),o.replaceChild(i,n),i.appendChild(n)}}}},r={touches:0,allowEvent:function(t){var e=!0;return"touchstart"===t.type?r.touches+=1:"touchend"===t.type||"touchcancel"===t.type?setTimeout((function(){r.touches>0&&(r.touches-=1)}),500):"mousedown"===t.type&&r.touches>0&&(e=!1),e},touchup:function(t){r.allowEvent(t)}};function a(e){var n=function(t){if(!1===r.allowEvent(t))return null;for(var e=null,n=t.target||t.srcElement;null!==n.parentNode;){if(!(n instanceof SVGElement)&&-1!==n.className.indexOf("waves-effect")){e=n;break}n=n.parentNode}return e}(e);null!==n&&(i.show(e,n),"ontouchstart"in t&&(n.addEventListener("touchend",i.hide,!1),n.addEventListener("touchcancel",i.hide,!1)),n.addEventListener("mouseup",i.hide,!1),n.addEventListener("mouseleave",i.hide,!1),n.addEventListener("dragend",i.hide,!1))}e.displayEffect=function(e){"duration"in(e=e||{})&&(i.duration=e.duration),i.wrapInput(n(".waves-effect")),"ontouchstart"in t&&document.body.addEventListener("touchstart",a,!1),document.body.addEventListener("mousedown",a,!1)},e.attach=function(e){"input"===e.tagName.toLowerCase()&&(i.wrapInput([e]),e=e.parentNode),"ontouchstart"in t&&e.addEventListener("touchstart",a,!1),e.addEventListener("mousedown",a,!1)},t.Waves=e,document.addEventListener("DOMContentLoaded",(function(){e.displayEffect()}),!1)}(window);