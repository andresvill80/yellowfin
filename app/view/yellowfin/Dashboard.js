Ext.define('App.view.yellowfin.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard',

    requires: [
        'App.yellowfin.YellowfinObj'
    ],

    title: 'Dashboard with Yellowfin Object',
    layout: { 
        type: 'vbox',  
        align: 'stretch'
    },

    items: [],
    
    
    initComponent: function () {
        let me=this;

        // Initialize
        let yellowfin = Ext.create('App.yellowfin.YellowfinObj',{
            url: 'http://yellowfin.sencha.local:8080', //Required
            key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdCI6InVzZXIiLCJsYXN0IjoidHdvIiwidXNlcklkIjoidGVzdEB0ZXN0LmNvbSJ9.R8KHeKG0eogRhvOZbyfqdZzRHtJvxPbR7NGyQ-mmWL4',
        });

        // Call/Create
        yellowfin.loadDashboard("e7409ff2-f846-44e1-a603-b78ec51b20b9", function (newDashboard) {
            me.add(newDashboard);
        });


        this.callParent(arguments);
    }
});