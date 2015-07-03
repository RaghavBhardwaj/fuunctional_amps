define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/AlfDocumentPreview.html","alfresco/core/Core","service/constants/Default","dojo/_base/lang","dojo/_base/array","dojo/on","dojo/sniff"],function(declare,_Widget,_Templated,template,Core,AlfConstants,lang,array,on,sniff){return declare([_Widget,_Templated,Core],{i18nRequirements:[{i18nFile:"./i18n/AlfDocumentPreview.properties"}],cssRequirements:[{cssFile:"/components/preview/web-preview.css"},{cssFile:"/components/preview/WebPreviewerHTML.css"},{cssFile:"/components/preview/Audio.css"},{cssFile:"/components/preview/Image.css"},{cssFile:"/components/preview/StrobeMediaPlayback.css"},{cssFile:"./css/AlfDocumentPreview.css"}],nonAmdDependencies:["/js/flash/extMouseWheel.js"],templateString:template,plugin:null,thumbnailModification:null,nodeRef:"",size:"0",name:"",mimeType:"",thumbnails:null,api:"api",proxy:"alfresco",avoidCachedThumbnail:false,postCreate:function alfresco_preview_AlfDocumentPreview__postCreate(){this.alfSubscribe("ALF_DOCUMENT_PREVIEW_UPDATE",lang.hitch(this,"onPreviewChanged"));this.alfSubscribe("ALF_METADATA_REFRESH",lang.hitch(this,"doRefresh"));if(this.currentItem!=null){this.nodeRef=this.currentItem.node.nodeRef;this.name=this.currentItem.node.properties["cm:name"]||this.currentItem.node.properties["cm:title"];this.mimeType=this.currentItem.node.mimetype;this.size=this.currentItem.node.size;this.thumbnails=this.currentItem.thumbnailDefinitions;this.thumbnailModification=this.currentItem.node.properties["cm:lastThumbnailModification"]}if(this.thumbnails==null){this.thumbnails=[]}if(this.thumbnailModification==null){this.thumbnailModification=[]}this.plugins={};if(this.pluginConditions!=null){this.pluginConditions=eval(this.pluginConditions)}else{this.alfLog("warn","No 'pluginConditions' attribute provided for document preview",this)}YAHOO.deconcept.SWFObject.prototype.getVariablePairs=function(){var variablePairs=[],key,variables=this.getVariables();for(key in variables){if(variables.hasOwnProperty(key)){variablePairs[variablePairs.length]=key+"="+encodeURIComponent(variables[key])}}return variablePairs};this.setupPlugins();this.setupPreview(false)},widgetsForPlugins:[{id:"PdfJs",name:"alfresco/preview/PdfJs"},{id:"WebPreviewer",name:"alfresco/preview/WebPreviewer"},{id:"Image",name:"alfresco/preview/Image"},{id:"Video",name:"alfresco/preview/Video"},{id:"Audio",name:"alfresco/preview/Audio"},{id:"Flash",name:"alfresco/preview/Video"},{id:"StrobeMediaPlayback",name:"alfresco/preview/StrobeMediaPlayback"}],setupPlugins:function alfresco_preview_AlfDocumentPreview__setupPlugins(){this.plugins={};array.forEach(this.widgetsForPlugins,function(plugin,index){if(plugin.id!=null&&plugin.name!=null){this.alfLog("log","Creating plugin: ",plugin.id);try{var pluginModule=[plugin.name];require(pluginModule,lang.hitch(this,"createPlugin",plugin.id))}catch(e){this.alfLog("error","An error occurred creating a preview plugin",e)}}else{this.alfLog("warn","A preview plugin was incorrectly defined - it was either missing an 'id' or 'name' attribute",plugin,this)}},this)},createPlugin:function alfresco_preview_AlfDocumentPreview__createPlugin(pluginName,pluginType){var config={previewManager:this};var plugin=new pluginType(config);this.plugins[pluginName]=plugin;this.alfLog("log","Created plugin: ",pluginName,plugin);return plugin},plugins:null,plugin:null,setupPreview:function alfresco_preview_AlfDocumentPreview__setupPreview(){this.messageNode.innerHTML=this.message("label.preparingPreviewer");if(this.nodeRef===undefined){throw new Error("A nodeRef must be provided")}if(this.size=="0"){this.previewerNode.innerHTML='<div class="message">'+this.message("label.noContent")+"</div>"}else{var condition,pluginDescriptor,plugin,messages=[];for(var i=0,il=this.pluginConditions.length;i<il;i++){condition=this.pluginConditions[i];if(!this.conditionsMatch(condition)){this.alfLog("log","Plugin condition does not match",condition);continue}for(var pi=0,pil=condition.plugins.length;pi<pil;pi++){pluginDescriptor=condition.plugins[pi];this.alfLog("log","Checking plugin:",pluginDescriptor);if(this.plugins[pluginDescriptor.name]!=null){plugin=this.plugins[pluginDescriptor.name];plugin.setAttributes(pluginDescriptor.attributes);if(sniff("ios")&&pluginDescriptor.name==="WebPreviewer"){continue}var report=plugin.report();if(report){messages.push(report)}else{this.plugin=plugin;var markup;try{Dom.addClass(this.previewerNode,pluginDescriptor.name);markup=plugin.display();if(markup){this.previewerNode.innerHTML=markup}this.alfLog("log","Found a suitable plugin: ",pluginDescriptor.name);return}catch(e){this.alfLog("error","Error:"+pluginDescriptor.name+" failed to display: "+e);messages.push(this.message("label.error",pluginDescriptor.name,e.message))}}}else{this.alfLog("error","Error, Alfresco.WebPreview.Plugins."+pluginDescriptor.name+" does not exist");messages.push(this.message("label.errorMissing",pluginDescriptor.name))}}}var noPreviewLabel="label.noPreview";if(sniff("ios")){noPreviewLabel="label.noPreview.ios"}var message=this.message(noPreviewLabel,this.getContentUrl(true));for(i=0,il=messages.length;i<il;i++){message+="<br/>"+messages[i]}this.previewerNode.innerHTML='<div class="message">'+message+"</div>"}},onPreviewChanged:function alfresco_preview_AlfDocumentPreview__onPreviewChanged(payload){this.avoidCachedThumbnail=true},conditionsMatch:function alfresco_preview_AlfDocumentPreview__conditionsMatch(condition){if(condition.attributes.mimeType&&condition.attributes.mimeType!=this.mimeType){return false}if(condition.attributes.thumbnail&&!Alfresco.util.arrayContains(this.thumbnails,condition.attributes.thumbnail)){return false}return true},getContentUrl:function alfresco_preview_AlfDocumentPreview__getContentUrl(download){var proxy=window.location.protocol+"//"+window.location.host+AlfConstants.URL_CONTEXT+"proxy/"+this.proxy+"/",nodeRefAsLink=this.nodeRef.replace(":/",""),noCache="noCache="+new Date().getTime();download=download?"a=true":"a=false";return proxy+this.api+"/node/"+nodeRefAsLink+"/content/"+encodeURIComponent(this.name)+"?c=force&"+noCache+"&"+download},getThumbnailUrl:function alfresco_preview_AlfDocumentPreview__getThumbnailUrl(thumbnail,fileSuffix){var proxy=window.location.protocol+"//"+window.location.host+AlfConstants.URL_CONTEXT+"proxy/"+this.proxy+"/",nodeRefAsLink=this.nodeRef.replace(":/",""),noCache="noCache="+new Date().getTime(),force="c=force";for(var i=0;i<this.thumbnailModification.length;i++){if(this.thumbnailModification[i].indexOf(thumbnail)!=-1){var timestampPostfix=noCache;noCache="lastModified="+encodeURIComponent(this.thumbnailModification[i]);if(this.avoidCachedThumbnail){noCache+="&"+timestampPostfix;this.avoidCachedThumbnail=false}break}}return proxy+this.api+"/node/"+nodeRefAsLink+"/content/thumbnails/"+thumbnail+(fileSuffix?"/suffix"+fileSuffix:"")+"?"+force+"&"+noCache},getPreviewerElement:function alfresco_preview_AlfDocumentPreview__getPreviewerElement(){return this.previewerNode},doRefresh:function alfresco_preview_AlfDocumentPreview__doRefresh(){if(this.plugin){this.plugin.display()}},pluginConditions:[{attributes:{mimeType:"application/pdf"},plugins:[{name:"PdfJs",attributes:{}}]},{attributes:{thumbnail:"pdf"},plugins:[{name:"PdfJs",attributes:{src:"pdf",progressiveLoading:false}}]},{attributes:{thumbnail:"imgpreview",mimeType:"video/mp4"},plugins:[{name:"StrobeMediaPlayback",attributes:{poster:"imgpreview",posterFileSuffix:".png"}},{name:"Video",attributes:{poster:"imgpreview",posterFileSuffix:".png"}}]},{attributes:{thumbnail:"imgpreview",mimeType:"video/m4v"},plugins:[{name:"StrobeMediaPlayback",attributes:{poster:"imgpreview",posterFileSuffix:".png"}},{name:"Video",attributes:{poster:"imgpreview",posterFileSuffix:".png"}}]},{attributes:{thumbnail:"imgpreview",mimeType:"video/x-flv"},plugins:[{name:"StrobeMediaPlayback",attributes:{poster:"imgpreview",posterFileSuffix:".png"}}]},{attributes:{thumbnail:"imgpreview",mimeType:"video/quicktime"},plugins:[{name:"StrobeMediaPlayback",attributes:{poster:"imgpreview",posterFileSuffix:".png"}}]},{attributes:{thumbnail:"imgpreview",mimeType:"video/ogg"},plugins:[{name:"Video",attributes:{poster:"imgpreview",posterFileSuffix:".png"}}]},{attributes:{thumbnail:"imgpreview",mimeType:"video/webm"},plugins:[{name:"Video",attributes:{poster:"imgpreview",posterFileSuffix:".png"}}]},{attributes:{mimeType:"video/mp4"},plugins:[{name:"StrobeMediaPlayback",attributes:{}},{name:"Video",attributes:{}}]},{attributes:{mimeType:"video/x-m4v"},plugins:[{name:"StrobeMediaPlayback",attributes:{}},{name:"Video",attributes:{}}]},{attributes:{mimeType:"video/x-flv"},plugins:[{name:"StrobeMediaPlayback",attributes:{}}]},{attributes:{mimeType:"video/quicktime"},plugins:[{name:"StrobeMediaPlayback",attributes:{}}]},{attributes:{mimeType:"video/ogg"},plugins:[{name:"Video",attributes:{}}]},{attributes:{mimeType:"video/webm"},plugins:[{name:"Video",attributes:{}}]},{attributes:{mimeType:"audio/mpeg"},plugins:[{name:"StrobeMediaPlayback",attributes:{}},{name:"Audio",attributes:{}}]},{attributes:{mimeType:"audio/x-wav"},plugins:[{name:"Audio",attributes:{}}]},{attributes:{thumbnail:"webpreview"},plugins:[{name:"WebPreviewer",attributes:{paging:"true",src:"webpreview"}}]},{attributes:{thumbnail:"imgpreview"},plugins:[{name:"Image",attributes:{src:"imgpreview"}}]},{attributes:{mimeType:"image/jpeg"},plugins:[{name:"Image",attributes:{srcMaxSize:"2000000"}}]},{attributes:{mimeType:"image/png"},plugins:[{name:"Image",attributes:{srcMaxSize:"2000000"}}]},{attributes:{mimeType:"image/gif"},plugins:[{name:"Image",attributes:{srcMaxSize:"2000000"}}]}]})});