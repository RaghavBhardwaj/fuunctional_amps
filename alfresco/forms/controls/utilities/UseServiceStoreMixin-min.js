define(["dojo/_base/declare","dojo/_base/lang","alfresco/forms/controls/utilities/ServiceStore"],function(d,f,c){return d([],{createServiceStore:function b(){var l=f.getObject("optionsConfig.publishTopic",false,this);var m=f.getObject("optionsConfig.publishPayload",false,this);var k=f.getObject("optionsConfig.queryAttribute",false,this);var j=f.getObject("optionsConfig.labelAttribute",false,this);var g=f.getObject("optionsConfig.valueAttribute",false,this);var h=f.getObject("optionsConfig.fixed",false,this);var i=new c({idProperty:(g!=null)?g:"value",queryAttribute:(k!=null)?k:"name",labelAttribute:(j!=null)?j:"label",valueAttribute:(g!=null)?g:"value",publishTopic:l,publishPayload:m,fixed:h});return i},showOptionsBasedOnValue:function e(g){g._startSearchAll=f.hitch(g,this.searchAll)},searchAll:function a(){this._startSearch(this.getValue())}})});