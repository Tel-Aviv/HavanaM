import axios from 'axios';

export function getUserFromHtml() {

    let elem = document.getElementById('USER_NAME');
    const userName = elem ? elem.textContent : '';
    elem = document.getElementById('USER_ACCOUNT_NAME');
    const accountName = elem ? elem.textContent : '';
    elem = document.getElementById('USER_ID');
    const userID = elem ? elem.textContent : '';
    elem = elem ? document.getElementById('USER_THUMBNAIL') : '';
    const imageData = elem ? elem.textContent  : '';

    return {
        name: userName,
        account_name: accountName,
        userID:  userID,
        imageData: imageData
    }
}

export function getHost() {
    const elem = document.getElementById('HOST');
    return elem? elem.textContent : 'bizdev01/ps';
}

export function getProtocol() {
    const elem = document.getElementById('PROTOCOL');
    return elem ? elem.textContent : 'http';
}

export const API = axios.create({
        baseURL: `${getProtocol()}://${getHost()}`,
        //responseType: "json"
})