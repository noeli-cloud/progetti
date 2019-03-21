({
    handlePubsubReady: function(component) {
        var pubsub = component.find('pubsub');
        var callback = $A.getCallback(function(projectId) {
            component.set('v.projectId', projectId);
            var picklistPath = component.find('picklistPath');
            debugger
            // service.reloadRecord();
        });
        pubsub.registerListener('projectselected', callback);
    },

    handleDestroy: function(component) {
        var pubsub = component.find('pubsub');
        pubsub.unregisterAllListeners();
    },

    handleSelect:function(comment){
        debugger
    }
});