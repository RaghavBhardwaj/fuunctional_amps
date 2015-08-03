var widget, widgetsToRemove = ["HEADER_REPOSITORY" ,"HEADER_MY_FILES","HEADER_ADMIN_CONSOLE"], idx, max;
 
if (user.isAdmin)
{
  widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_MY_FILES");
  
}

if (user.isAdmin)
{
  widgetUtils.deleteObjectFromArray(model.jsonModel, "id","HEADER_REPOSITORY");
}





for (idx = 0, max = widgetsToRemove.length; idx < max; idx++)
{  
	
	if (!user.isAdmin){

    findAndRemoveIn(model.jsonModel.widgets, null, null, widgetsToRemove[idx]);
} 


}


function findAndRemoveIn(obj, arrContext, arrIdx, id) {
var idx, max, key;

if (obj !== undefined && obj !== null) {
    if (Object.prototype.toString.apply(obj) === "[object Object]") {
        if (obj.hasOwnProperty("id") && obj.id === id) {
            if (arrContext !== null && arrIdx !== null)
            { arrContext.splice(arrIdx, 1); }

            else
            { logger .debug("Unexpected match outside of array structure: " + jsonUtils.toJSONString(obj)); }

        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key))
                { findAndRemoveIn(obj[key], null, null, id); }

            }
        }
    } else if (Object.prototype.toString.apply(obj) === "[object Array]") {
        for (idx = 0, max = obj.length; idx < max; idx++)
        { findAndRemoveIn(obj[idx], obj, idx, id); }

    }
  }
}   
var sitesMenu = 
	  widgetUtils.findObject(model.jsonModel, "id", "HEADER_SITES_MENU");
	if (sitesMenu != null)
	{

		// Hide the site finder...
	  sitesMenu.config.showSiteFinder = false;
	  sitesMenu.config.showCreateSite = true;
	  sitesMenu.config.showFavourites = false;
	  sitesMenu.config.showUsefulGroup = false;
	  sitesMenu.config.showRecentSites = true;

	}                    

 	           