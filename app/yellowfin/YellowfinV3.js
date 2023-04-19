/**
 * Yellowfin API v2 Object
 ***************************************
 * Class that allows to create a yellowfin connection object
 *
 * 
 */


 Ext.define('App.yellowfin.YellowfinV2', {
    extend: 'Ext.Component',
    xtype: 'yellowfin-v2',

    config: {
        url: 'http://yellowfin.sencha.local',
        port: '8080',
        username: 'test@test.com',
        password: '1234',
        initialized: false,
        callback: null
    },

    
    _getFullURL: function (file='') {
        return this.url + ((this.port !==null) ? ':'+this.port : '') + file;
    },

    newSession: function () {
        let me=this;
        if (me.initialized) {
            me.yellowfinAPI.newSession({
                username: me.username,
                password: me.password,
                url: me._getFullURL(),
                onSuccess: function () {
                    debugger;
                },
                onFailure: function () {
                    debugger;
                }
            });
        }
    },

    loadDashboard: function (dashUUID,el) {
        let me=this;
        debugger;
        if (me.initialized) {
            me.yellowfinAPI.loadDashboard({
                dashboardUUID: dashUUID,
                element: el
            }).then();
        }
    },


    initComponent: function () {
        let me=this;
        debugger;
        me.yellowfinAPI=window.yellowfin;

        me.yellowfinAPI.init().then(() => {
            me.initialized=true;
            if (me.callback!==null) me.callback();
        });
        this.callParent();
    }



   

});