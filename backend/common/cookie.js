function bakeCookie(name, value) {
    var cookie = [
        name,
        '=',
        JSON.stringify(value),
        '; domain=.',
        window.location.host.toString(),
        '; path=/;'
    ].join('');
    document.cookie = cookie;
}

function readCookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

module.exports = {
    bakeCookie,
    readCookie
}