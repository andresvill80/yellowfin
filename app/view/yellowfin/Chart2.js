Ext.define('App.view.yellowfin.Chart2', {
    extend: 'Ext.panel.Panel',

    xtype: 'chart-example-2',

    requires: [
        'App.yellowfin.Yellowfin'
    ],

    title: 'Report Example w/ Singleton Class',
    layout: { 
        type: 'vbox',  
        align: 'stretch'
    },

    items: [],
    
    initComponent: function () {
        let me=this;

        // Uses singleton
        App.yellowfin.Yellowfin.loadReport({
            url: 'http://yellowfin.sencha.local:8080', //Required
            reportKey: "80162f66-b23e-4a2b-b209-497a960d96d5",
            callback: function (newDashboard) {
                me.add(newDashboard);
            }
        });

        this.callParent(arguments);
    }
});