let cookie  = document.cookie;
let cookies = cookie.split('; ');

let curName = null;
let curPass = null;

cookies.forEach(element => {
    if (element.indexOf('name=') == 0) {
        curName = element.substring('name='.length);
    }
    else if (element.indexOf('pass=') == 0) {
        curPass = element.substring('pass='.length);
    }
});

_users = null;
let getUsers = async function() {
    if (_users) return _users;

    return fetch('users.json')
    .then(data => data.json())
    .then(info => {
        _users = info;
        return _users;
    });
}

let login = async function(name, pass) {
    let users = await getUsers();
    let logged = false

    users.forEach(user => {
        if (user.name == name && user.pass == pass) {
            logged = true;
        }
    })

    return logged;
}

async function start() {
    if (curName && curPass) {
        return await login(curName, curPass);
    }
    return false;
}

let vm = function() {
    var self = this;

    self.isLogged = ko.observable(false)

    self.logout = function() {
        document.cookie = 'name=';
        document.cookie = 'pass=';
        self.isLogged(false);
    }

    start()
    .then(logged => {
        self.isLogged(logged);
    });
}

ko.applyBindings(vm);