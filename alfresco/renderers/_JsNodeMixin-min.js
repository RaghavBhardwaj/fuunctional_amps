define(["dojo/_base/declare","dojo/_base/lang","alfresco/core/JsNode"],function(a,d,b){return a(null,{constructor:function c(e){d.mixin(this,e);if(this.currentItem!=null){if(typeof this.currentItem.jsNode==="undefined"&&this.currentItem.node!=null){this.currentItem.jsNode=new b(this.currentItem.node)}}}})});