define(["dojo/_base/declare","alfresco/core/Core","dojo/_base/lang","dojo/on","dojo/dom-class","dojo/has","dojo/_base/window"],function(r,k,t,j,h,b,d){var a="alfresco-core-FullScreenMixin-fullScreen",f="alfresco-core-FullScreenMixin-fullWindow",g="alfresco-core-FullScreenMixin-enteringFullScreen",c="alfresco-core-FullScreenMixin-enteringTrueFullScreen",o="alfresco-core-FullScreenMixin-trueFullScreen";return r([k],{cssRequirements:[{cssFile:"./css/FullScreenMixin.css"}],isWindowOnly:true,fullWindowTopic:"ALF_FULL_WINDOW",fullScreenTopic:"ALF_FULL_SCREEN",toggleFullScreen:function m(v,u){if(u.selected===true){if(this.domNode!=null){if(!dojo.doc.fullscreen&&!dojo.doc.mozFullScreen&&!dojo.doc.webkitFullScreen){this.requestFullScreen(v)}else{this.cancelFullScreen()}}}else{this.cancelFullScreen()}},requestFullScreen:function n(v){this.isWindowOnly=(v!=null)?v:false;this.toggleFullWindow(true);if(!v){var u=d.body();if(u.requestFullscreen||u.mozRequestFullScreen||u.webkitRequestFullScreen){h.add(this.domNode,a);h.add(this.domNode,g)}if(u.requestFullscreen){u.requestFullscreen()}else{if(u.mozRequestFullScreen){u.mozRequestFullScreen()}else{if(this.domNode.webkitRequestFullScreen){if(b("safari")&&!b("chrome")){u.webkitRequestFullScreen()}else{u.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)}}else{}}}}},cancelFullScreen:function i(){if(dojo.doc.exitFullscreen){dojo.doc.exitFullscreen()}else{if(dojo.doc.mozCancelFullScreen){dojo.doc.mozCancelFullScreen()}else{if(dojo.doc.webkitCancelFullScreen){dojo.doc.webkitCancelFullScreen()}}}this.toggleFullWindow(false)},onFullScreenChange:function e(){if(this.domNode!=null){if(h.contains(this.domNode,g)){h.remove(this.domNode,c);var u=this;setTimeout(function(){h.add(u.domNode,o)},1000)}else{if(h.contains(this.domNode,o)){if(h.contains(this.domNode,a)){h.remove(this.domNode,a);h.remove(this.domNode,o);this.onFullScreenExitComplete()}}else{if(!h.contains(this.domNode,a)){h.add(this.domNode,a);this.onFullScreenEnterComplete()}else{h.remove(this.domNode,a);this.onFullScreenExitComplete()}}}}},onFullScreenEnterComplete:function l(){},onFullScreenExitComplete:function s(){},toggleFullWindow:function q(u){if(this.domNode!=null){if(u===true&&!h.contains(this.domNode,f)){h.add(this.domNode,f);j.once(d.body(),"keyup",t.hitch(this,this.onKeyUp))}else{h.remove(this.domNode,f)}this.onFullScreenChange()}},onKeyUp:function p(u){if(u.keyCode==27){this.alfPublish(this.fullScreenTopic,{selected:false});this.alfPublish(this.fullWindowTopic,{selected:false});this.toggleFullWindow(false)}}})});