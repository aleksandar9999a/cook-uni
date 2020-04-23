export function getSessionInfo(ctx) {
    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
    if (ctx.loggedIn) {
        ctx.name = sessionStorage.getItem('name');
    }
}

export function setSessionInfo(data) {
    sessionStorage.setItem('authtoken', data._kmd.authtoken);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('id', data._id);
    sessionStorage.setItem('name', `${data.firstName} ${data.lastName}`);
}

export function clearSessionData(){
    sessionStorage.clear();
}