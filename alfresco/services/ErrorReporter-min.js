define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","service/constants/Default","dojo/_base/lang"],function(b,d,c,g,f){return b([d,c],{constructor:function a(h){f.mixin(this,h);this.alfSubscribe(this.alfLoggingTopic,f.hitch(this,"onLogRequest"))},errorReportingUrl:null,onLogRequest:function e(j){if(j&&j.severity==="error"&&j.messageArgs){var i=this.errorReportingUrl;if(i==null){i=g.URL_SERVICECONTEXT+"aikau/error-report"}var h={callerName:(j.callerName)?j.callerName:"unknown-caller",messageArgs:(j.messageArgs)?j.messageArgs:[],userName:g.USERNAME,location:window.location.href};this.serviceXhr({url:i,data:h,method:"POST"})}}})});