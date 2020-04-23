const kinveyBaseUrl = "https://baas.kinvey.com";
const kinveyAppKey = "kid_Hkpgn7ytU";
const kinveyAppSecret = "05d1339087944924ab8f19108d429e4f";

function handleError(x) {
    if (!x.ok) {
        throw new Error(x.statusText);
    }

    return x;
}

function desterializeData(x) {
    if (x.status == 204){
        return x;
    }
    return x.json();
}

function fetchData(kinveyModule, endpoint, header){
    const url = `${kinveyBaseUrl}/${kinveyModule}/${kinveyAppKey}/${endpoint}`;

    return fetch(url, header)
                .then(handleError)
                .then(desterializeData);
}

function makeAuth(authType = 'Basic'){
    if (authType === 'Basic') {
        return `Basic ${btoa(`${kinveyAppKey}:${kinveyAppSecret}`)}`
    }
    return `Kinvey ${sessionStorage.getItem('authtoken')}`
}

function createHeader(method, authType, data){
    const headers = {
        method,
        headers: {
            'Authorization': makeAuth(authType),
            'Content-Type': 'application/json'
        }
    }

    if (method === 'POST' || method === 'PUT') {
        if (data !== undefined) {
            headers.body = JSON.stringify(data);
        }
    }

    return headers;
}

export function get(kinveyModule, endpoint, authType){
    const header = createHeader('GET', authType);
    return fetchData(kinveyModule, endpoint, header);
}

export function post(kinveyModule, endpoint, authType, data){
    const header = createHeader('POST', authType, data);
    return fetchData(kinveyModule, endpoint, header);
}

export function del(kinveyModule, endpoint, authType){
    const header = createHeader('DELETE', authType);
    return fetchData(kinveyModule, endpoint, header);
}

export function put(kinveyModule, endpoint, authType, data){
    const header = createHeader('PUT', authType, data);
    return fetchData(kinveyModule, endpoint, header);
}