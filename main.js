var Bind = require("github/jxmono/bind");
var Events = require("github/jxmono/events");

module.exports = function(config) {

    // get self (the module)
    var self = this;

    // set the config
    self.config = config;
    processConfig(config);

    // hide all elements on THE PAGE that has classes containg
    // preffix + role_name
    for (var i = 0; i < config.roles.length; ++i) {
        $("." + getRoleWithPrefix.call(self, config.roles[i])).hide();
    }

    /*
     *  updateLinks
     *
     *  This function is called via Events module using the listen -> handler
     *  configuration from the descriptor file.
     *
     *  At least one function call must
     *  contain the userInfo sent by the Login module ('userInfo' event)
     *
     * */
    self.updateLinks = function(userInfo) {

        // create the ca cache
        self.cache = self.cache || userInfo;

        // get the user data
        var userData = self.cache || {};

        // get the user data role
        userData.role = userData.role || config.publicRole;

        // show the elements that has classes containing the role name
        $("." + getRoleWithPrefix.call(self, userData.role)).show();

        // get the index of the current role
        var index = config.roles.indexOf(userData.role);

        // if userinfo is not defined and index is not -1
        if (userInfo && index !== -1) {
            // remove the role from roles
            config.roles.splice(index, 1);
        }

        // remove all elements that contain the roles and not the current role
        if (userInfo) {
            for (var i = 0; i < config.roles.length; ++i) {
                $(
                    "." +
                    getRoleWithPrefix.call(self, config.roles[i]) +
                    ":not('." +
                    getRoleWithPrefix.call(self, userData.role) +
                    "')"
                ).remove();
            }
        }

        // emit 'updatedLinks' event
        self.emit("updatedLinks", userData);
    };

    // call Events
    Events.call(self, config);

    // emit 'ready' event
    self.emit("ready");
};

/*
 *  This returns the role with its prefix set in the
 *  module configuration
 *
 * */
function getRoleWithPrefix(role) {
    return this.config.options.prefix + role;
}

/*
 * Process config function
 *
 * */
function processConfig(config) {
    config.options = config.options || {};
    config.options.prefix = config.options.prefix || "role-";
    config.roles = config.roles || [];
}
