define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","alfresco/renderers/_JsNodeMixin","dojo/text!./templates/FileType.html","alfresco/core/Core","dojo/_base/lang"],function(e,f,m,g,k,c,b){return e([f,m,g,c],{templateString:k,size:"large",altText:"",postMixInProperties:function i(){var n=this.defaultTypeMappings;if(this.customTypeMappings!=null){b.mixin(n,this.customTypeMappings)}var p=this.defaultExtnMappings;if(this.customExtnMappings!=null){b.mixin(p,this.customExtnMappings)}var o=this.getImageType(n);this.img=require.toUrl("alfresco/renderers/css/images/filetypes/"+this.getImagePrefix(p)+"-"+o+"-"+this.getImageSize()+".png");this.alfText=this.message("fileType."+this.getExtension()+".altText")},getImageType:function h(n){var o="file";var p=b.getObject("node.type",false,this.currentItem);if(p!=null&&n[p]!=null){o=n[p]}return o},getExtension:function j(){var n="";if(this.currentItem!=null&&this.currentItem.fileName!=null&&this.currentItem.fileName.lastIndexOf(".")!=-1){n=this.currentItem.fileName.substring(this.currentItem.fileName.lastIndexOf(".")+1).toLowerCase()}else{this.alfLog("warn","The current item either is not defined, has no 'fileName' attribute or the 'fileName' attribute contains no '.' characters",this)}return n},getImagePrefix:function d(p){var n="generic";var o=this.getExtension();if(o in p){n=p[o]}return n},getImageSize:function a(){var n="48";if(this.size=="large"){}else{if(this.size=="medium"){n="32"}else{if(this.size=="small"){n="16"}}}return n},postCreate:function l(){},customTypeMappings:null,defaultTypeMappings:{"{http://www.alfresco.org/model/content/1.0}cmobject":"file","cm:cmobject":"file","{http://www.alfresco.org/model/content/1.0}content":"file","cm:content":"file","{http://www.alfresco.org/model/content/1.0}thumbnail":"file","cm:thumbnail":"file","{http://www.alfresco.org/model/content/1.0}folder":"folder","cm:folder":"folder","{http://www.alfresco.org/model/content/1.0}category":"category","cm:category":"category","{http://www.alfresco.org/model/content/1.0}person":"user","cm:person":"user","{http://www.alfresco.org/model/content/1.0}authorityContainer":"group","cm:authorityContainer":"group",tag:"tag","{http://www.alfresco.org/model/site/1.0}sites":"site","st:sites":"site","{http://www.alfresco.org/model/site/1.0}site":"site","st:site":"site","{http://www.alfresco.org/model/transfer/1.0}transferGroup":"server-group","trx:transferGroup":"server-group","{http://www.alfresco.org/model/transfer/1.0}transferTarget":"server","trx:transferTarget":"server"},customExtnMappings:null,defaultExtnMappings:{aep:"aep",ai:"ai",aiff:"aiff",asf:"video",asnd:"asnd",asx:"video",au:"audio",avi:"video",avx:"video",bmp:"img",css:"text",divx:"video",doc:"doc",docx:"doc",docm:"doc",dotx:"doc",dotm:"doc",eml:"eml",eps:"eps",fla:"fla",flv:"video",fxp:"fxp",gif:"img",htm:"html",html:"html",indd:"indd",jpeg:"img",jpg:"img",key:"key",mkv:"video",mov:"video",movie:"video",mp3:"mp3",mp4:"video",mpeg:"video",mpeg2:"video",mpv2:"video",msg:"eml",numbers:"numbers",odg:"odg",odp:"odp",ods:"ods",odt:"odt",ogg:"video",ogv:"video",pages:"pages",pdf:"pdf",png:"img",ppj:"ppj",ppt:"ppt",pptx:"ppt",pptm:"ppt",pps:"ppt",ppsx:"ppt",ppsm:"ppt",pot:"ppt",potx:"ppt",potm:"ppt",ppam:"ppt",sldx:"ppt",sldm:"ppt",psd:"psd",qt:"video",rtf:"rtf",snd:"audio",spx:"audio",svg:"img",swf:"swf",tif:"img",tiff:"img",txt:"text",wav:"audio",webm:"video",wmv:"video",xls:"xls",xlsx:"xls",xltx:"xls",xlsm:"xls",xltm:"xls",xlam:"xls",xlsb:"xls",xml:"xml",xvid:"video",zip:"zip"}})});