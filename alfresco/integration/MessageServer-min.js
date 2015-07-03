(function(a,b){if(typeof define==="function"&&define.amd){define([],b)}else{a.MessageServer=b()}}(this,function(){var b={};function a(e,d,c){if(!e||!d){throw new Error('MessageServer constructor requires all ("origins" and "channel") parameters to be set')}if(b[d]){throw new Error('Cannot construct MessageServer since channel "'+d+'"already is in use')}b[d]=true;this._origins=e||[];this._channel=d;this._messageHandlerResolver=c||this._messageHandlerResolver;this._addEventListener(window,"message",this._receiveMessage)}a.prototype={_messageHandlerResolver:function(c){return this[c]},_receiveMessage:function(h){var k=false;for(var e=0,c=this._origins.length;e<c;e++){if(h.origin==this._origins[e]){k=true;break}}if(k){var j=JSON.parse(h.data);if(j.name&&j.channel==this._channel){var d=j.name;var f=this._messageHandlerResolver(d);if(typeof f=="function"){f(j.value,function(i){var l={callback:j.callback,success:true,result:i};l=JSON.stringify(l);h.source.postMessage(l,h.origin)},function(l,i){var i={callback:j.callback,failure:true,code:l,message:i};i=JSON.stringify(i);h.source.postMessage(i,h.origin)})}else{var g={callback:j.callback,failure:true,code:1,message:'Message named "'+d+'" was not recognized.'};g=JSON.stringify(g);h.source.postMessage(g,h.origin)}}}},_bind:function(d){var c=Array.prototype.slice.call(arguments).slice(2);var e=this;return(function(){return d.apply(e,c.concat(Array.prototype.slice.call(arguments)))})},_addEventListener:function(c,d,e){if(typeof c.addEventListener=="function"){c.addEventListener(d,this._bind(e),false)}else{c.attachEvent("on"+d,this._bind(e))}}};return a}));