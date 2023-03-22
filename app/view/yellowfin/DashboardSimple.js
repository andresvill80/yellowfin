Ext.define('App.view.yellowfin.DashboardSimple', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboardsimple',

    title: 'Example',
    layout: { 
        type: 'vbox',  
        align: 'stretch'
    },

    items: [],
    
    
        /**
         * Creates the Dashboard by simply adding it, will need to login
         * @param {*} dashKey 
         * @returns 
         */
        simpleEmbed: function (dashKey) {
            let apiUrl = "http://yellowfin.sencha.local:8080/RunDashboard.i4?dashUUID="+dashKey+"&primaryOrg=1&clientOrg=1"

            return {
                xtype: 'component',
                flex: 1,
                autoEl: {
                    tag: 'iframe',
                    src: apiUrl,
                }
            }
        },
    
    initComponent: function () {
        let item = this.simpleEmbed("e7409ff2-f846-44e1-a603-b78ec51b20b9");
        this.items = [ item ];



        this.callParent(arguments);
    }
});