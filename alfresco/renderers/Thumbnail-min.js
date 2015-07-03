define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","alfresco/renderers/_JsNodeMixin","alfresco/node/DraggableNodeMixin","alfresco/node/NodeDropTargetMixin","alfresco/renderers/_PublishPayloadMixin","dijit/_OnDijitClickMixin","dojo/text!./templates/Thumbnail.html","alfresco/core/Core","alfresco/renderers/_ItemLinkMixin","alfresco/documentlibrary/_AlfDndDocumentUploadMixin","service/constants/Default","dojo/_base/lang","dojo/_base/event","dojo/dom-style","alfresco/core/NodeUtils","dojo/window"],function(x,d,s,e,g,a,b,o,y,n,l,m,k,z,t,r,j,f){return x([d,s,o,e,g,a,n,l,m,b],{cssRequirements:[{cssFile:"./css/Thumbnail.css"}],templateString:y,customClasses:"",postMixInProperties:function i(){this.imgId="";this.thumbnailUrl="";this.imgAltText="";this.imgTitle="";if(this.currentItem!=null&&this.currentItem.jsNode){var B=this.currentItem.jsNode;this.thumbnailUrl=this.generateThumbnailUrl();if(this.currentItem.displayName==null){this.currentItem.displayName=B.properties["cm:name"]}this.setImageTitle()}else{if(this.currentItem!=null&&this.currentItem.nodeRef!=null){this.imageIdProperty="nodeRef";this.setImageTitle();var A=j.processNodeRef(this.currentItem.nodeRef);if(this.currentItem.type==="folder"){this.thumbnailUrl=k.URL_RESCONTEXT+"components/search/images/folder.png"}else{if(this.currentItem.type==="document"){this.thumbnailUrl=this.generateRenditionSpecificThumbnailUrl(A.uri);if(this.thumbnailUrl===null){this.thumbnailUrl=k.PROXY_URI+"api/node/"+A.uri+"/content/thumbnails/"+this.renditionName+"/?c=queue&ph=true&lastModified="+this.currentItem.modifiedOn}}else{this.thumbnailUrl=this.generateFallbackThumbnailUrl()}}}}},imageTitleProperty:"displayName",imageIdProperty:"jsNode.nodeRef.nodeRef",setImageTitle:function v(){var A=this.currentItem[this.imageTitleProperty];if(A){this.imgTitle=this.encodeHTML(A);this.imgAltText=(A!=null)?A.substring(A.lastIndexOf(".")):""}var B=this.currentItem[this.imageIdProperty];if(B){this.imgId=B}},generateFallbackThumbnailUrl:function p(){return k.URL_RESCONTEXT+"components/search/images/generic-result.png"},folderImage:"folder-64.png",getFolderImage:function w(){return require.toUrl("alfresco/renderers")+"/css/images/"+this.folderImage},renditionName:"doclib",lastThumbnailModificationProperty:"jsNode.properties.cm:lastThumbnailModification",generateThumbnailUrl:function h(){var A=null;if(this.renditionName==null){this.renditionName="doclib"}if(this.currentItem!=null&&this.currentItem.jsNode){var C=this.currentItem.jsNode;if(C.isContainer||(C.isLink&&C.linkedNode.isContainer)){A=this.getFolderImage()}else{var B=C.isLink?C.linkedNode.nodeRef:C.nodeRef;A=this.generateRenditionSpecificThumbnailUrl(B.uri)}}if(A==null){A=k.PROXY_URI+"api/node/"+B.uri+"/content/thumbnails/"+this.renditionName+"?c=queue&ph=true"}return A},generateRenditionSpecificThumbnailUrl:function q(D){var A=null;var C=z.getObject(this.lastThumbnailModificationProperty,false,this.currentItem);if(C){for(var B=0;B<C.length;B++){if(C[B].indexOf(this.renditionName)!=-1){A=k.PROXY_URI+"api/node/"+D+"/content/thumbnails/"+this.renditionName+"?c=queue&ph=true&lastModified="+C[B];break}}}return A},postCreate:function u(){this.inherited(arguments);if(this.hasUploadPermissions()===true){this.addUploadDragAndDrop(this.imgNode);this.addNodeDropTarget(this.imgNode)}var C=z.getObject("node.type",false,this.currentItem),A=z.getObject("node.mimetype",false,this.currentItem);if(this.showDocumentPreview&&C==="cm:content"){this.publishGlobal=true;if(A&&A.indexOf("image/")===0){var B=z.getObject(this.lastThumbnailModificationProperty,false,this.currentItem)||1;this.publishTopic="ALF_DISPLAY_LIGHTBOX";this.publishPayload={src:k.PROXY_URI+"api/node/"+z.getObject("nodeRef",false,this.currentItem).replace(":/","")+"/content/thumbnails/imgpreview?c=force&lastModified="+encodeURIComponent(B),title:z.getObject("displayName",false,this.currentItem)}}else{var D=f.getBox();this.publishTopic="ALF_CREATE_DIALOG_REQUEST";this.publishPayload={contentWidth:(D.w*0.7)+"px",contentHeight:(D.h-64)+"px",handleOverflow:false,dialogTitle:this.currentItem.displayName,additionalCssClasses:"no-padding",widgetsContent:[{name:"alfresco/documentlibrary/AlfDocument",config:{widgets:[{name:"alfresco/preview/AlfDocumentPreview"}]}}],widgetsButtons:[{name:"alfresco/buttons/AlfButton",config:{label:this.message("searchThumbnail.preview.dialog.close"),publishTopic:"NO_OP"}}],publishOnShow:[{publishTopic:"ALF_RETRIEVE_SINGLE_DOCUMENT_REQUEST",publishPayload:{nodeRef:this.currentItem.nodeRef}}]}}}else{if(this.publishTopic==null){this.publishPayload={};this.publishTopic=this.generateFileFolderLink(this.publishPayload);this.publishGlobal=true}else{if(this.publishPayload!=null){this.publishPayload=this.getGeneratedPayload(false,null)}}}},onLinkClick:function c(A){t.stop(A);if(this.publishTopic==null||z.trim(this.publishTopic)===""){this.alfLog("warn","No publishTopic provided for PropertyLink",this)}else{var C=(this.publishGlobal!=null)?this.publishGlobal:false;var B=(this.publishToParent!=null)?this.publishToParent:false;this.alfPublish(this.publishTopic,this.publishPayload,C,B)}}})});