/**
 * Yellowfin BI
 ***************************************
 * Singleton class that allows to load 
 * a yellowfin report of dashboard
 * 
 * // TO LOAD A SINGLE REPORT
 * Yellowfin.loadReport({
 *      url: 'http://myYellowfinServer',    // set your actual yellowfin server url including the port
 *      reportKey: KEY,                     // set the Report ID
 *      callback: function (reportObj) {},  // Callback methond that will return the report object inside an iframe
 *                                          // Usually all that is needed is to add the report inside a panel: panel.add(reportObj)
 *      width: WIDTH,                       // OPTIONAL: The width of the chart/report (if not set, will be 100%)
 *      height: HEIGHT,                     // OPTIONAL: The height of the chart/report (if not set, will be 100%)
 * });
 * // TO LOAD A FULL DASHBOARD
 * Yellowfin.loadDashboard({
 *      url: 'http://myYellowfinServer',    // set your actual yellowfin server url including the port
 *      token: YELLOWFIN_TOKEN,             // Must be match the yellowfin user token that will be used to validate the connection
 *      dashKey: KEY,                       // set the Dashboard ID
 *      callback: function (dashboardObj) {}, // Callback methond that will return the dashboard object inside an iframe
 *                                          // Usually all that is needed is to add the dashboard inside a panel: panel.add(dashboardObj)
 *      width: WIDTH,                       // OPTIONAL: The width of the dashboard (if not set, will be 100%)
 *      height: HEIGHT,                     // OPTIONAL: The height of the dashboard (if not set, will be 100%)
 * });
 */
Ext.define('App.yellowfin.Yellowfin', {
    extend: 'Ext.Component',

    singleton: true,

    /**
     * Will connect to the yellowfin server and get the requested Report
     * It is required to first call setupConnection.
     * @param {object} config must contain the following parameters:
     * 
     * @param {String} url server url 
     * @param {String} reportKey 
     * @param {Function} callback Returns the new iframe item. It can be inserted into any panel
     * @param {Number} width optional
     * @param {Number} height optional
     */
    loadReport: function (config) {
        config = {
            url: config.url || '',
            reportKey: config.reportKey || '', 
            callback: config.callback || function () { console.log('%cYou must specify a callback method','color:#933'); },
            width: config.width || '100%', 
            height: config.height || '100%'
        };

        if (config.url === null) {
            console.log('%cTo load a Yellowfin report you must first set the YellowfinURL using the setupConnection Method.','color:#933;');
        } else {
            let apiUrl = config.url+"/JsAPI/v3?reportUUID="+config.reportKey+"&width="+config.width+"&height="+config.height;
            this.loadYellowfinView(apiUrl,config.callback,'100%','100%');
        }
    },

    /**
     * Will connect to the yellowfin server and get the requested Dashboard
     * It is required to first call setupConnection.
     * @param {object} config must contain the following parameters:
     * 
     * @param {String} url server url 
     * @param {String} token server jwtToken
     * @param {String} dashKey 
     * @param {Function} callback Returns the new iframe item. It can be inserted into any panel
     * @param {Number} width optional
     * @param {Number} height optional
     */
    loadDashboard: function (config) {
        config = {
            url: config.url || '',
            token: config.jwtToken || '',
            dashKey: config.dashKey || '', 
            callback: config.callback || function () { console.log('%cYou must specify a callback method','color:#933'); },
            width: config.width || '100%', 
            height: config.height || '100%'
        };

        if (config.url === null || config.token === null) {
            console.log('%cTo load a Yellowfin dashboard you must first set the URL and KEY using the setupConnection Method.','color:#933;');
        } else {
            let apiUrl = config.url+"/JsAPI/v3?dashUUID="+config.dashKey+"&jwtToken="+config.token;
            this.loadYellowfinView(apiUrl,config.callback,config.width,config.height);
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