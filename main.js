var Bind = require("github/jillix/bind");
var Events = require("github/jillix/events");

module.exports = function(config) {

    var self = this;
    Events.call(self, config);

    self.updateLinks = function () {
        self.emit("getUserInfo", function (err, data) {
            debugger;
        });
    };
};
