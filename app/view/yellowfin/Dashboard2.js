Ext.define('App.view.yellowfin.Dashboard2', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard-2',

    requires: [
        'App.yellowfin.Yellowfin'
    ],

    title: 'Dashboard w/ singleton class',
    layout: { 
        type: 'vbox',  
        align: 'stretch'
    },

    items: [],
        
    initComponent: function () {
        let me=this;

        // Uses singleton
        App.yellowfin.Yellowfin.loadDashboard({
            url: 'http://yellowfin.sencha.local:8080', //Required
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJ0ZXN0QHRlc3QuY29tIiwiZmlyc3ROYW1lIjoiRG9lIn0.nkI-ayWggv3YAydPHqH5FP94YVV0NafF2ah4bfTV89k',
            dashKey: "f20c11a1-4aa3-4a2c-925a-209ba032558f",
            callback: function (newDashboard) {
                me.add(newDashboard);
            }
        });
        

        this.callParent(arguments);
    }
});