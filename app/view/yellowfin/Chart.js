Ext.define('App.view.yellowfin.Chart', {
    extend: 'Ext.panel.Panel',
    xtype: 'chart-example',

    requires: [
        'App.yellowfin.YellowfinObj'
    ],

    title: 'Report with Yellowfin Object',
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
            });

        // Call/Create
            yellowfin.loadReport("d0f213a1-25ea-4ee6-8d5a-52a0a3cdcf49", function (newReport) {
                me.add(newReport);
            });

        this.callParent(arguments);
    }
});