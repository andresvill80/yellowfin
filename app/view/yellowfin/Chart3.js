Ext.define('App.view.yellowfin.Chart3', {
    extend: 'Ext.panel.Panel',

    xtype: 'chart-example-3',

    requires: [
        'App.yellowfin.Yellowfin',
        // 'App.yellowfin.YellowfinNew'
    ],

    title: 'Example',
    layout: { 
        type: 'vbox',  
        align: 'stretch'
    },

    items: [],
    
    initComponent: function () {
        // let operation = Ext.create('Ext.data.Operation', {
        //     action: 'Get',
        //     params: {
        //         id: 1
        //     }
        // });
        
        // let client = Ext.create('App.yellowfin.YellowfinNew');
        // client.doRequest(operation, function(operation) {
        //     console.log(operation.getResultSet().getRecords());
        // });

        let me=this;

        // Uses singleton
        App.yellowfin.Yellowfin.loadReport({
            url: 'http://yellowfin.sencha.local:8080', //Required
            reportKey: "8fb84dc7-9e61-426d-be1a-629f310104f9",
            callback: function (newDashboard) {
                me.add(newDashboard);
            }
        });

        this.callParent(arguments);
    }
});