sap.ui5Watcher = function(that, objectToWatch){
    sap.ui5WatcherOModel = new sap.ui.model.json.JSONModel();
	var getWatchingData = function(pObje){
		return pObje;
	}
	var copyToUniqueObject = function(pObje){
	return JSON.parse(JSON.stringify(pObje));
	}

	var watchObject = function(that, objectToWatch){
    if(typeof that['last_object_ui5_watcher_'+objectToWatch] === "undefined"){
    	that['last_object_ui5_watcher_'+objectToWatch] = {};
    }
	setInterval(function(){
				var oView = that.getView();
				//A LOOP TO REMOVE AJAX MODEL DATA THIS IS FOR PREFENTING RECURSIVE LOOPS
				for(var key in that.data){
					if(typeof key !== "undefined"){
					 if(typeof that[objectToWatch][key].getJSON === "function"){
					 	that[objectToWatch][key] = JSON.parse(that[objectToWatch][key].getJSON());
					 }
					}
				}
				//LOOP IF DATA HAS BEEN CHANGED
				for(key in that[objectToWatch]){
				  var dataPart 		= 	getWatchingData(that[objectToWatch][key]);
				  var dataPartLast 	= 	getWatchingData(that['last_object_ui5_watcher_'+objectToWatch][key]);

				  if(JSON.stringify(dataPart) !== JSON.stringify(dataPartLast)){
					//DATA CHANGED
					
					//oModel2.setData(that[objectToWatch]);
					sap.ui5WatcherOModel.setProperty("/"+key, that[objectToWatch][key]); 
					
					oView.setModel(sap.ui5WatcherOModel);
					console.log("data changed for: ", objectToWatch+"."+key);
				  }
				}
				that['last_object_ui5_watcher_'+objectToWatch] = copyToUniqueObject(that[objectToWatch]);
	}, 300);
	}
watchObject(that, objectToWatch);
}
