Ext.define('App.view.yellowfin.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard',

    requires: [
        'App.yellowfin.YellowfinV2'
    ],

    title: 'Dashboard with Yellowfin Object',
    layout: { 
        type: 'vbox',  
        align: 'stretch'
    },

    items: [],
    
    
    initComponent: function () {
        let me=this;
      
        debugger;
        

        // // Initialize
        let yellowfin = Ext.create('App.yellowfin.YellowfinV2',{
            url: 'http://yellowfin.sencha.local', //Required
            port: '8080',
            username: (Ext.util.Cookies.get('username')) || "",
            password: (Ext.util.Cookies.get('password')) || "",
            container: me
        });

        yellowfin.loadDashboard("e7409ff2-f846-44e1-a603-b78ec51b20b9");

        // // Call/Create
        // yellowfin.loadDashboard("e7409ff2-f846-44e1-a603-b78ec51b20b9", function (newDashboard) {
        //     me.add(newDashboard);
        // });


        this.callParent(arguments);
    }
});