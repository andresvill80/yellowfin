/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Ext.ux.IFrame',

        'App.view.main.MainController',
        'App.view.main.MainModel',
        'App.view.main.List',

        'App.view.yellowfin.Dashboard',
        
        'App.view.setup.YFConnection'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Dashboard',
        iconCls: 'fa-tachometer-alt fa-half',
        layout: 'fit',
        items: [{
            xtype: 'dashboard'
        }]
    }, {
        title: 'Setup',
        iconCls: 'fa-user fa-half',
        layout: 'fit',
        items: [{
            xtype: 'yf-connection'
        }]
    // }, {
    //     title: 'Chart',
    //     iconCls: 'fa-chart-line fa-half',
    //     layout: 'fit',
    //     items: [{
    //         xtype: 'chart-example'
    //     }]
    // }, {
    //     title: 'Chart 2',
    //     iconCls: 'fa-chart-bar fa-half',
    //     layout: 'fit',
    //     items: [{
    //         xtype: 'chart-example-2'
    //     }]
    // }, {
    //     title: 'Chart 3',
    //     iconCls: 'fa-chart-bar fa-half',
    //     layout: 'fit',
    //     items: [{
    //         xtype: 'chart-example-3'
    //     }]
    // }, {
    //     title: 'Dashboard Embed',
    //     iconCls: 'fa-shoe-prints fa-half',
    //     layout: 'fit',
    //     items: [{
    //         xtype: 'dashboardsimple'
    //     }]
    }]
});
