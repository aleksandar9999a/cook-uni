import { getSessionInfo, setSessionInfo, clearSessionData } from "./sessionController.js";
import { partials } from "../partials/partials.js";
import { post } from "../requester.js";
import { redirectAfterFiveSec } from "./redirect.js";
import { showMessage } from "./messageController.js";

export function loadSignup(ctx) {
    getSessionInfo(ctx)
    this.loadPartials(partials).then(function () {
        this.partial('./templates/register/signup.hbs');
    });
}

export function loadSignin(ctx) {
    getSessionInfo(ctx)
    this.loadPartials(partials).then(function () {
        this.partial('./templates/register/signin.hbs');
    });
}

export function login(ctx) {
    const { username, password } = ctx.params;
    if (username !== '' && password !== '') {
        post('user', 'login', 'Basic', { username, password })
            .then(x => {
                setSessionInfo(x);
                showMessage('success', 'Successful login.');
                redirectAfterFiveSec(ctx, '/');
            })
    } else {
        showMessage('error', 'Try again.');
    }
}

export function createUser(ctx) {
    const { firstName, lastName, username, password, repeatPassword } = ctx.params;
    if (firstName.length > 2 && lastName.length > 2 && username.length > 3 && password.length > 6 && password === repeatPassword) {
        post('user', '', 'Basic', { firstName, lastName, username, password })
            .then(x => {
                setSessionInfo(x);
                showMessage('success', 'User registration successful.');
                redirectAfterFiveSec(ctx, '/');
            })
            .catch(x => showMessage('error', x.statusText))
    } else {
        showMessage('error', 'Try again');
    }
}

export function logout(ctx) {
    post('user', '_logout', 'Kinvey')
        .then(x => {
            clearSessionData();
            showMessage('success', 'Logout successful');
            redirectAfterFiveSec(ctx, '/');
        })
        .catch(console.error)
}