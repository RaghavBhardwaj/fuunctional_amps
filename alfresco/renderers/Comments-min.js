define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_OnDijitClickMixin","alfresco/renderers/_JsNodeMixin","alfresco/navigation/_HtmlAnchorMixin","alfresco/renderers/_PublishPayloadMixin","dojo/text!./templates/Comments.html","alfresco/core/Core","dojo/_base/lang","alfresco/core/UrlUtils","dojo/dom-class"],function(h,j,p,d,k,q,g,o,c,b,e,m){return h([j,p,d,k,q,c,e,g],{i18nRequirements:[{i18nFile:"./i18n/Comments.properties"}],cssRequirements:[{cssFile:"./css/Comments.css"}],templateString:o,commentCountProperty:"node.properties.fm:commentCount",targetUrlType:"FULL_PATH",linkTarget:"CURRENT",subscriptionTopic:null,postMixInProperties:function n(){this.commentLabel=this.message("comments.label");var r=b.getObject("node.isContainer",false,this.currentItem);if(r){this.label=this.message("comments.folder.tooltip")}else{this.label=this.message("comments.document.tooltip")}if(this.publishTopic==null){var s=this.getActionUrls(this.currentItem,null,null);var t=(r?"folderDetailsUrl":"documentDetailsUrl");if(s[t]){this.targetUrl=s[t]+"#comment"}else{this.targetUrl=""}}this.commentCount=b.getObject(this.commentCountProperty,false,this.currentItem);if(this.commentCount==null){this.commentCount=0}},getAnchorTargetSelectors:function i(){return["span.comment-link"]},postCreate:function f(){if(this.commentCount!=null){m.remove(this.countNode,"hidden")}this.makeAnchor(this.targetUrl,this.targetUrlType);if(this.subscriptionTopic!=null){this.alfSubscribe(this.subscriptionTopic,b.hitch(this,this.onCommentCountUpdate))}},publicationCountProperty:"totalDocuments",onCommentCountUpdate:function a(s){var r=b.getObject(this.publicationCountProperty,false,s);if(r!=null){this.countNode.innerHTML=r}},onCommentClick:function l(r){if(this.publishTopic!=null){this.publishPayload=b.clone(this.publishPayload);var s=this.getGeneratedPayload(true);this.alfPublish(this.publishTopic,s,this.publishGlobal)}else{this.alfPublish("ALF_NAVIGATE_TO_PAGE",{url:this.targetUrl,type:this.targetUrlType,target:this.linkTarget})}}})});