define(["dojo/_base/declare","dojo/_base/lang"],function(b,c){return b(null,{generateSearchLinkPayload:function a(){var m={type:"SHARE_PAGE_RELATIVE",target:"CURRENT",url:null};var j=c.getObject("type",false,this.currentItem),e=c.getObject("site.shortName",false,this.currentItem);switch(j){case"folder":var n=c.getObject("path",false,this.currentItem),f=c.getObject("name",false,this.currentItem);if(e!=null){m.url="site/"+e+"/documentlibrary?path="+n+"/"+f}else{if(n!=null){n="/"+n.split("/").slice(2).join("/");m.url="repository?path="+n+"/"+f}}break;case"wikipage":var k=c.getObject("name",false,this.currentItem);if(e!=null){m.url="site/"+e+"/wiki-page?title="+k}break;case"blogpost":var d=c.getObject("name",false,this.currentItem);if(e!=null){m.url="site/"+e+"/blog-postview?postId="+d}break;case"forumpost":var h=c.getObject("name",false,this.currentItem);if(e!=null){m.url="site/"+e+"/discussions-topicview?topicId="+h}break;case"link":var i=c.getObject("name",false,this.currentItem);if(e!=null){m.url="site/"+e+"/links-view?linkId="+i}break;case"datalist":var g=c.getObject("name",false,this.currentItem);if(e!=null){m.url="site/"+e+"/data-lists?list="+g}break;case"calendarevent":if(e!=null){m.url="site/"+e+"/calendar"}break;case"datalist":var g=c.getObject("name",false,this.currentItem);if(e!=null){m.url="site/"+e+"/data-lists?list="+g}break;case"calendarevent":if(e!=null){m.url="site/"+e+"/calendar"}break;default:var l=c.getObject("nodeRef",false,this.currentItem);if(e!=null){m.url="site/"+e+"/document-details?nodeRef="+l}else{m.url="document-details?nodeRef="+l}}return m}})});