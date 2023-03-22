/**
 * Yellowfin Object
 ***************************************
 * Class that allows to create a yellowfin connection object
 *
 * 1. CREATE THE OBJECT 
 * To connect to the server, the object must be first created and the credentials stablished with one of the following options
 *  // OPTION A.
 *      let myObject = Ext.create('App.yellowfin.YellowfinObj',{
 *          url: 'http://myYellowfinServer',    // set your actual yellowfin server url including the port
 *          token: YELLOWFIN_TOKEN,             // Must be match the yellowfin user token that will be used to validate the connection
 *                                              // OPTIONAL for reports, REQUIRED for dashboards
 *      });
 *  // OPTION B.
 *      let myObject = Ext.create('App.yellowfin.YellowfinObj');
 *      myObject.setupConnection({
 *          url: 'http://myYellowfinServer',    // set your actual yellowfin server url including the port
 *          token: YELLOWFIN_TOKEN,             // Must be match the yellowfin user token that will be used to validate the connection
 *                                              // OPTIONAL for reports, REQUIRED for dashboards
 *      });
 * 
 * 2. LOAD REPORT OR DASHBOARD
 *  // DASHBOARD
 *      yellowfin.loadDashboard(DASHBOARD_KEY, CALLBACK_METHOD);
 *          // DASHBOARD_KEY                // set the Dashboard ID
 *          // CALLBACK_METHOD              // Callback methond that will return the dashboard object inside an iframe
 *                                          // Usually all that is needed is to add the dashboard inside a panel: 
 *                                          //      function (dashObj) { panel.add(dashObj); }
 * // REPORT
 *      yellowfin.loadReport(REPORT_KEY, CALLBACK_METHOD);
 *          // REPORT_KEY                   // set the Report ID
 *          // CALLBACK_METHOD              // Callback methond that will return the report object inside an iframe
 *                                          // Usually all that is needed is to add the report inside a panel: 
 *                                          //      function (reportObj) { panel.add(reportObj); }
 * 
 */


Ext.define('App.yellowfin.YellowfinObj', {
    extend: 'Ext.Component',

    url: null, //Required
    token: null, // Optional (depends on setup)

    /**
     * Allows to setup or change the connection url and token
     * @param {string} url 
     * @param {string} token 
     */
    setupConnection: function (url, token=null) {
        this.url=url;
        this.token=token;
    },


    /**
     * Will connect to the yellowfin server and get the requested Report
     * It is required to first call setupConnection.
     * 
     * @param {String} reportKey 
     * @param {Function} callback Returns the new iframe item. It can be inserted into any panel
     * @param {Number} width optional
     * @param {Number} height optional
     */
    loadReport: function (reportKey, callback, width='100%', height='100%') {
        let me=this;
        let apiUrl = me.url+"/JsAPI/v3?reportUUID="+reportKey+"&width="+width+"&height="+height;

        if (me.url === null) {
            console.log('%cTo load a Yellowfin report you must first set the YellowfinURL using the setupConnection Method.','color:#933;');
        } else {
            this.loadYellowfinView(apiUrl,callback,'100%','100%');
        }
    },

    /**
     * Will connect to the yellowfin server and get the requested Dashboard
     * It is required to first call setupConnection.
     * 
     * @param {String} dashKey 
     * @param {Function} callback Returns the new iframe item. It can be inserted into any panel
     * @param {Number} frameWidth optional
     * @param {Number} frameHeight optional
     */
    loadDashboard: function (dashKey, callback, frameWidth='100%', frameHeight='100%') {
        let me=this;
        let apiUrl = me.url+"/JsAPI/v3?dashUUID="+dashKey+"&jwtToken="+me.key;

        if (me.url === null || me.key === null) {
            console.log('%cTo load a Yellowfin dashboard you must first set the URL and KEY using the setupConnection Method.','color:#933;');
        } else {
            this.loadYellowfinView(apiUrl,callback,frameWidth,frameHeight);
        }

    },


     /**
     * Will connect to the yellowfin server and get the requested Dashboard/Report
     * It is required to first call setupConnection.
     * 
     * @param {String} dashKey 
     * @param {Function} callback Returns the new iframe item. It can be inserted into any panel
     * @param {Number} frameWidth optional
     * @param {Number} frameHeight optional
     */
    loadYellowfinView: function (apiUrl, callback, frameWidth, frameHeight) {
        Ext.Ajax.request({
            url: apiUrl,
            method: 'GET',
            // THIS WILL ALLOW CORS CONNECTIONS
            disableCaching: false,
            withCredentials: false,
            useDefaultXhrHeader: false,

            success: function (response, opts) {
                // debugger;
                let obj = response.responseText;
                let itemCode="<html><body><script type='text/javascript'>"+obj+"</script></body></html>";
                let item = Ext.create('Ext.ux.IFrame', {
                    src: 'about:blank',
                    width: frameWidth,
                    height: frameHeight,
                    scrolling: 'no',

                    listeners: {
                        afterrender: function(frame) {
                            var doc = frame.getDoc();
                            doc.write(itemCode);
                            doc.close();
                        }
                    },
                    style: 'overflow: hidden;'
                });
                if (callback!==undefined && callback!==null) callback(item);
            },
            failure: function (response) {
                console.log('%cUnable to load Yellowfin dashboard/report.','color:#933;');
            }

        });
    }
    

});