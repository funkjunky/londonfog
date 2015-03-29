require('passport');

var User = function(user) {
    this.user = user;
    return this;
};

User.prototype.get = function(authorization) {
    if(authorization) this.authorization = authorization;
    this.get('/api/authentication/user').then(function(user) {
        this.user = user;
    });
};

User.prototype.login = function(credentials) {
    return setUser( $.post('/api/authenticate/login', credentials) );
};

User.prototype.register = function(info) {
    return setUser( $.post('/api/user', info) );
};

User.prototype.updateInfo = function(info) {
    return setUser( this.put('/api/user', info) );
};

User.prototype.get = function() {
    //TODO: try putting this in one line, not sure if setRequestHeader returns the xhr or not.
    var xhr = $.get(arguments);
    xhr.setRequestHeader('authorization', this.authorization);
    return xhr;
};

User.prototype.put = function() {
    var xhr = $.put(arguments);
    xhr.setRequestHeader('authorization', this.authorization);
    return xhr;
};

User.prototype.ajax = function() {
    var xhr = $.ajax(arguments);
    xhr.setRequestHeader('authorization', this.authorization);
    return xhr;
};


function setUser(userPromise) {
    return userPromise.success(function(result) {
            this.authorization = userPromise.getResponseHeader('authorization');
            return this.user = result;
        }.bind(this))
        .failure(function(error) {
            this.error = error;
            console.log('setUser Call failed: ', error);
        }.bind(this));
}

module.exports = User;
