Ext.define('App.view.setup.YFConnection', {
    extend: 'Ext.panel.Panel',
    xtype: 'yf-connection',

    title: 'Setup Connection',
    bodyPadding: 16,

    items: [{
        xtype: 'form',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Username',
            name: 'username',
            id: 'username',
            value: (Ext.util.Cookies.get('username')) || "",
        }, {
            xtype: 'textfield',
            inputType: 'password',
            fieldLabel: 'Password',
            name: 'userpassword',
            id: 'userpassword',
            value: (Ext.util.Cookies.get('password')) || "",
        }, {
            xtype: 'textfield',
            fieldLabel: 'jwtToken',
            name: 'jwtToken',
            id: 'jwtToken',
            value: (Ext.util.Cookies.get('jwtToken')) || "",
        }],
        bbar: [{
            xtype: 'button',
            text: 'Save user Data',
            id: 'credentials-button',
            handler: function (btn) {
                debugger;
                let form = btn.up('form');
                let values = form.getValues();
                Ext.util.Cookies.set('username',values.username);
                Ext.util.Cookies.set('password',values.userpassword);
                Ext.util.Cookies.set('jwtToken',values.jwtToken);

                Ext.Msg.alert('Credentials', 'Your credentials have been saved');
            },
        }]
    }],
    
});