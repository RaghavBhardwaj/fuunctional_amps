define(["dojo/_base/declare","alfresco/core/Core","alfresco/documentlibrary/_AlfDocumentListTopicMixin","alfresco/renderers/_PublishPayloadMixin","alfresco/menus/AlfMenuItem","dojo/_base/array","dojo/_base/lang","service/constants/Default","alfresco/core/ArrayUtils"],function(j,c,h,i,e,l,b,d,k){return j([c,h,i],{filterActions:false,allowedActions:null,allowedActionsString:null,postCreate:function a(){this.inherited(arguments);if(this.allowedActionsString!=null){try{this.allowedActions=JSON.parse(this.allowedActionsString)}catch(m){this.alfLog("warn","A non-parsable 'allowedActionsString' was configured",this,this.allowedActionsString)}}},addActions:function g(){if(this.customActions!=null&&this.customActions.length>0){l.forEach(this.customActions,b.hitch(this,"addAction"))}else{if(this.currentItem.actions&&this.currentItem.actions.length>0){l.forEach(this.currentItem.actions,b.hitch(this,"addAction"))}}},addAction:function f(o,m){if(this.filterActions===false||k.arrayContains(this.allowedActions,o.id)){this.alfLog("log","Adding action",o);var p=(o.publishPayload!=null)?o.publishPayload:{document:this.currentItem,action:o};var n=new e({label:o.label,iconImage:d.URL_RESCONTEXT+"components/documentlibrary/actions/"+o.icon+"-16.png",type:o.type,pubSubScope:this.pubSubScope,parentPubSubScope:this.parentPubSubScope,publishTopic:(o.publishTopic!=null)?o.publishTopic:this.singleDocumentActionTopic,publishPayload:this.generatePayload(p,this.currentItem,null,o.publishPayloadType,o.publishPayloadItemMixin,o.publishPayloadModifiers),publishGlobal:this.publishGlobal,publishToParent:this.publishToParent});this.actionsGroup.addChild(n)}else{this.alfLog("log","Skipping action as it's missing from whitelist: "+o)}}})});