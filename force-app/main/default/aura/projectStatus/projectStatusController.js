({
    handlePubsubReady: function (component) {
        debugger
        var pubsub = component.find('pubsub');
        var callback = $A.getCallback(function (projectId) {
            component.set('v.recordId', projectId);
            var picklistPath = component.find('picklistPath');
            debugger
            // service.reloadRecord();
        });
        pubsub.registerListener('projectselected', callback);
    },

    handleDestroy: function (component) {
        debugger
        var pubsub = component.find('pubsub');
        pubsub.unregisterAllListeners();
    },

    handleSelect: function (component, event, helper) {
        debugger
        var stepName = event.getParam("detail").value;
        console.log(stepName);
        console.log(component.get("v.recordId"));
        var action = component.get("c.updateStage");
        action.setParams({ projectStatus: stepName, projectId: component.get("v.recordId") });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                if (state === 'SUCCESS') {
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": " Status is Updated Succesfully !."
                    });
                }
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
    }
});