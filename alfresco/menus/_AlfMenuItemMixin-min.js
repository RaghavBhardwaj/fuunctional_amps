define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreRwd","alfresco/menus/_AlfPopupCloseMixin","alfresco/services/_NavigationServiceTopicMixin","alfresco/renderers/_PublishPayloadMixin","alfresco/navigation/_HtmlAnchorMixin","service/constants/Default","dojo/dom-class","dojo/dom-style","dojo/dom-construct","dojo/on","dojo/_base/lang","dojo/_base/event","dojo/has"],function(r,i,q,d,a,b,s,h,f,n,e,g,t,o,c){return r([i,q,d,a,b,s],{cssRequirements:[{cssFile:"./css/_AlfMenuItemMixin.css"},{cssFile:"../core/css/Icons.css"}],iconImageWidth:"16px",iconImageHeight:"16px",iconAltText:"",targetUrl:null,targetUrlType:"SHARE_PAGE_RELATIVE",targetUrlLocation:"CURRENT",publishOnRender:false,postMixInProperties:function j(){if(this.label){this.label=this.encodeHTML(this.message(this.label))}this.inherited(arguments)},postCreate:function p(){this.set("label",this.label);this.inherited(arguments);g(this.domNode,"contextmenu",t.hitch(this,"onContextMenu"));this.makeAnchor(this.targetUrl,this.targetUrlType)},getAnchorTargetSelectors:function m(){return["td.dijitMenuItemLabel","span.alf-menu-bar-label-node"]},onContextMenu:function(u){},setupIconNode:function k(){if(this.iconClass&&this.iconClass!="dijitNoIcon"&&this.iconNode){var u=this.iconNode.parentNode;e.destroy(this.iconNode);this.iconNode=e.create("img",{role:"presentation",className:"dijitInline dijitIcon dijitMenuItemIcon "+this.iconClass,src:h.URL_RESCONTEXT+"/js/alfresco/menus/css/images/transparent-20.png",title:this.message(this.iconAltText),alt:this.message(this.iconAltText),tabIndex:0},u,"first")}else{if(this.iconImage&&this.iconNode){if(c("ie")===8){if(location.protocol.indexOf("https")!==-1){this.iconImage=location.protocol+"//"+location.host+this.iconImage}}n.set(this.iconNode,{backgroundImage:"url("+this.iconImage+")",width:this.iconImageWidth,height:this.iconImageHeight,display:"inline-block",verticalAlign:"middle"})}else{if(this.iconNode!=null){n.set(this.iconNode.parentNode,{width:"auto"})}}}},onClick:function l(u){this.alfLog("log","AlfMenuBarItem clicked");var y=this.targetUrlLocation;if(c("mac")&&u.metaKey){y="NEW"}this.emitClosePopupEvent();if(this.targetUrl!=null){o.stop(u);this.alfPublish("ALF_NAVIGATE_TO_PAGE",{url:this.targetUrl,type:this.targetUrlType,target:y})}else{if(this.publishTopic!=null){var w=(this.publishGlobal!=null)?this.publishGlobal:false;var v=(this.publishToParent!=null)?this.publishToParent:false;var x=this.generatePayload((this.publishPayload)?this.publishPayload:{document:this.currentItem},this.currentItem,null,this.publishPayloadType,this.publishPayloadItemMixin);this.alfPublish(this.publishTopic,x,w,v)}else{this.alfLog("error","An AlfMenuBarItem was clicked but did not define a 'targetUrl' or 'publishTopic' attribute",u)}}}})});