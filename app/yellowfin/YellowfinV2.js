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
        url: null,
        port: null,
        username: null,
        password: null,
        jwtToken: null,
        container: null,
        callback: null,
    },

    
    _getFullURL: function (file='') {
        let url = this.url + ((this.port !==null) ? ':'+this.port : '') + file;
        return url;
    },

    _getLoginString: function () {
        let pass="";
        if (this.username !== null && this.password !== null) {
            pass = '&username=' + this.username + '&password=' + this.password;
        } else if (this.jwtToken !== null) {
            pass = "&jwtToken=" + this.jwtToken;
        }
        return pass;
    },

    setupConnection: function (config) {
        this.url = config.url || this.url;
        this.port = config.port || this.port;
        this.username = config.username || this.username;
        this.password = config.password || this.password;
        this.jwtToken = config.jwtToken || this.jwtToken;
        this.container = config.container || this.container;
    },

    /**
     * SHOULD BE v2 instead of v3
     * http://yellowfin.sencha.local:8080/JsAPI/v3?dashUUID=[XXXX]&username=test@test.com&password=1234
     * http://yellowfin.sencha.local:8080/JsAPI/v3?dashUUID=[XXXX]&jwtToken=[TOKEN.2.3]
     * @param {*} dashUUID 
     * @param {*} options 
     */
    loadDashboard: function (dashUUID, options) {
        let me=this;
        let apiUrl = me._getFullURL()+"/JsAPI/v3?dashUUID="+dashUUID+this._getLoginString();
        debugger;
        this.loadYellowfinView(apiUrl);
    },

    loadYellowfinView: function (apiUrl) {
        let me=this;
        let frameWidth='100%', frameHeight='100%';
        let objId=me.id+"-yf";

        debugger;

        Ext.Ajax.request({
            url: apiUrl+'&elementId='+objId,
            method: 'GET',
            // THIS WILL ALLOW CORS CONNECTIONS
            disableCaching: false,
            withCredentials: false,
            useDefaultXhrHeader: false,

            success: function (response, opts) {
                let itemCode="<html><body><script type='text/javascript'>"+response.responseText+"</script></body></html>";
                let item = Ext.create('Ext.ux.IFrame', {
                    src: 'about:blank',
                    width: frameWidth,
                    height: frameHeight,
                    scrolling: 'no',
                    id: objId,

                    listeners: {
                        afterrender: function(frame) {
                            var doc = frame.getDoc();
                            doc.write(itemCode);
                            doc.close();
                        }
                    },
                    style: 'overflow: hidden;'
                });
                if (me.container!==undefined && me.container!==null) me.container.add(item);
                if (me.callback!==undefined && me.callback!==null) me.callback(item);
            },
            failure: function (response) {
                console.log('%cUnable to load Yellowfin dashboard/report.','color:#933;');
            }

        });
    }


   

});