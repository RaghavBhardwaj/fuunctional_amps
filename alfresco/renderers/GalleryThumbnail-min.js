define(["dojo/_base/declare","alfresco/renderers/Thumbnail","dojo/text!./templates/GalleryThumbnail.html","dojo/_base/lang","dojo/dom-style","dojo/dom-class","alfresco/layout/LeftAndRight","alfresco/renderers/Selector","alfresco/renderers/MoreInfo","service/constants/Default"],function(h,e,o,d,i,m,f,b,a,g){return h([e],{nonAmdDependencies:["/js/yui-common.js","/js/alfresco.js"],cssRequirements:[{cssFile:"./css/GalleryThumbnail.css"}],templateString:o,customClasses:"gallery",getFolderImage:function l(){return g.URL_RESCONTEXT+"components/documentlibrary/images/folder-256.png"},renditionName:"imgpreview",dimensions:null,resize:function n(q){if(this.imgNode!=null&&q&&q.w){var p=q.w;i.set(this.thumbnailNode,"width",p);i.set(this.thumbnailNode,"height",p);i.set(this.imgNode,"width",p);i.set(this.imgNode,"minHeight",p);i.set(this.selectBarNode,"width",p);i.set(this.displayNameNode,"width",p)}},postCreate:function c(){this.inherited(arguments);if(this.widgetsForSelectBar){this.selectBarWidget=new f({currentItem:this.currentItem,pubSubScope:this.pubSubScope,parentPubSubScope:this.parentPubSubScope,widgets:d.clone(this.widgetsForSelectBar)},this.selectBarNode)}else{i.set(this.titleNode,"display","none")}if(this.dimensions!=null){this.resize(this.dimensions)}},widgetsForSelectBar:[{name:"alfresco/renderers/Selector",align:"left"},{name:"alfresco/renderers/MoreInfo",align:"right"}],focus:function k(){this.domNode.focus();m.remove(this.titleNode,"share-hidden")},blur:function j(){m.add(this.titleNode,"share-hidden")}})});