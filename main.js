var Bind = require("github/jillix/bind");
var Events = require("github/jillix/events");

module.exports = function(config) {

    var self = this;
    Events.call(self, config);

    for (var i in config.roles) {
        $("." + config.roles[i]).hide();
    }

    self.updateLinks = function (data) {
        data = data || {};
        data.role = data.role || config.publicRole;

        $("." + data.role).fadeIn();
        var index = config.roles.indexOf(data.role);

        config.roles.slice(index, index + 1);
        for (var i in config.roles) {
            $("." + config.roles[i]).remove();
        }
    };
};
