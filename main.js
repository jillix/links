var Bind = require("github/jillix/bind");
var Events = require("github/jillix/events");

module.exports = function(config) {

    var self = this;
    Events.call(self, config);

    for (var i in config.roles) {
        $("." + config.roles[i]).hide();
    }

    var cache;

    self.updateLinks = function (userInfo) {

        cache = cache || userInfo;
        var userData = cache || {};

        userData.role = userData.role || config.publicRole;

        $("." + userData.role).show();
        var index = config.roles.indexOf(userData.role);

        if (userInfo && index !== -1) {
            config.roles.splice(index, 1);
        }

        for (var i = 0; i < config.roles.length; ++i) {
            $("." + config.roles[i] + ":not('." + userData.role + "')").remove();
        }

        self.emit("updatedLinks", userData);
    };

    self.emit("ready");
};
