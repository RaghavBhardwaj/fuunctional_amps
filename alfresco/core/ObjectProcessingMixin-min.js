define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","alfresco/core/ObjectTypeUtils"],function(d,b,g,l){return d(null,{setCurrentItem:function j(m){if(m==="___AlfCurrentItem"){return this.currentItem}else{return m}},processInstanceTokens:function f(m){var n=b.replace(m,b.hitch(this,this.safeReplace,this));return n},processCurrentItemTokens:function e(m){var n=b.replace(m,b.hitch(this,this.safeReplace,this.currentItem));return n},convertNodeRefToUrl:function k(m){return m.replace(":/","")},safeReplace:function i(p,o,n){var m=b.getObject(n,false,p);if(m==null){return o}else{return m}},replaceColons:function c(m){var n=m.replace(/:/g,"_");return n},processObject:function a(p,q){for(var n in q){var m=q[n];if(l.isString(m)){g.forEach(p,b.hitch(this,this.applyFunction,q,n))}else{if(l.isArray(m)){g.forEach(m,function(r,o){if(l.isString(r)){g.forEach(p,b.hitch(this,this.applyFunction,m,o))}else{this.processObject(p,r)}},this)}else{if(l.isObject(m)){q[n]=this.processObject(p,m)}}}}return q},applyFunction:function h(q,n,p){var m=q[n];if(typeof p=="function"){m=p.apply(this,[m])}else{if(typeof this[p]=="function"){m=this[p].apply(this,[m])}else{this.alfLog("warn","The supplied function was not valid",p,this)}}q[n]=m}})});