(function(a,b){if(typeof define==="function"&&define.amd){define([],b)}else{a.MessageClient=b()}}(this,function(){function a(b,c,d){if(!b||!c||!d){throw new Error('MessageClient constructor requires all ("otherWindow", "origin" and "channel") parameters to be set')}this._otherWindow=b;this._origin=c;this._channel=d;this._callbacks={};this._addEventListener(window,"message",this._receiveMessage)}a.prototype={_CALLBACK_ID_SEQUENCE:1,sendMessage:function(c,f,g,b){var d={channel:this._channel,name:c};if(typeof f!="undefined"){d.value=f}if(g||b){var e=this._CALLBACK_ID_SEQUENCE++;this._callbacks[""+e]=[g,b];d.callback=e}d=JSON.stringify(d);this._otherWindow.postMessage(d,this._origin)},_receiveMessage:function(b){if(b.origin!==this._origin){return}var c=JSON.parse(b.data);if(c.callback){var d=this._callbacks[c.callback];delete this._callbacks[c.callback];if(c.success&&typeof d[0]=="function"){d[0](c.result)}else{if(c.failure&&typeof d[1]=="function"){d[1](c.code,c.message)}}}},_bind:function(c){var b=Array.prototype.slice.call(arguments).slice(2);var d=this;return(function(){return c.apply(d,b.concat(Array.prototype.slice.call(arguments)))})},_addEventListener:function(b,c,d){if(typeof b.addEventListener=="function"){b.addEventListener(c,this._bind(d),false)}else{b.attachEvent("on"+c,this._bind(d))}}};return a}));