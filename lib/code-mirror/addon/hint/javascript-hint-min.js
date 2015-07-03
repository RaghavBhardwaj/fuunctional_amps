(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(d){var k=d.Pos;function g(o,q){for(var p=0,r=o.length;p<r;++p){q(o[p])}}function e(o,q){if(!Array.prototype.indexOf){var p=o.length;while(p--){if(o[p]===q){return true}}return false}return o.indexOf(q)!=-1}function h(t,s,v,p){var u=t.getCursor(),r=v(t,u),o=r;if(/\b(?:string|comment)\b/.test(r.type)){return}r.state=d.innerMode(t.getMode(),r.state).state;if(!/^[\w$_]*$/.test(r.string)){r=o={start:u.ch,end:u.ch,string:"",state:r.state,type:r.string=="."?"property":null}}while(o.type=="property"){o=v(t,k(u.line,o.start));if(o.string!="."){return}o=v(t,k(u.line,o.start));if(!q){var q=[]}q.push(o)}return{list:i(r,q,s,p),from:k(u.line,r.start),to:k(u.line,r.end)}}function a(p,o){return h(p,c,function(q,r){return q.getTokenAt(r)},o)}d.registerHelper("hint","javascript",a);function b(p,q){var o=p.getTokenAt(q);if(q.ch==o.start+1&&o.string.charAt(0)=="."){o.end=o.start;o.string=".";o.type="property"}else{if(/^\.[\w$_]*$/.test(o.string)){o.type="property";o.start++;o.string=o.string.replace(/\./,"")}}return o}function j(p,o){return h(p,m,b,o)}d.registerHelper("hint","coffeescript",j);var l=("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search").split(" ");var n=("length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");var f="prototype apply call bind".split(" ");var c=("break case catch continue debugger default delete do else false finally for function if in instanceof new null return switch throw true try typeof var void while with").split(" ");var m=("and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");function i(s,q,w,z){var y=[],p=s.string;function t(v){if(v.lastIndexOf(p,0)==0&&!e(y,v)){y.push(v)}}function r(A){if(typeof A=="string"){g(l,t)}else{if(A instanceof Array){g(n,t)}else{if(A instanceof Function){g(f,t)}}}for(var v in A){t(v)}}if(q&&q.length){var u=q.pop(),o;if(u.type&&u.type.indexOf("variable")===0){if(z&&z.additionalContext){o=z.additionalContext[u.string]}if(!z||z.useGlobalScope!==false){o=o||window[u.string]}}else{if(u.type=="string"){o=""}else{if(u.type=="atom"){o=1}else{if(u.type=="function"){if(window.jQuery!=null&&(u.string=="$"||u.string=="jQuery")&&(typeof window.jQuery=="function")){o=window.jQuery()}else{if(window._!=null&&(u.string=="_")&&(typeof window._=="function")){o=window._()}}}}}}while(o!=null&&q.length){o=o[q.pop().string]}if(o!=null){r(o)}}else{for(var x=s.state.localVars;x;x=x.next){t(x.name)}for(var x=s.state.globalVars;x;x=x.next){t(x.name)}if(!z||z.useGlobalScope!==false){r(window)}g(w,t)}return y}});