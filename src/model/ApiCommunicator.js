// Basic method to post and receive json response.
// returns a POST promise 
// async/await is not used, as it is not supported in all browsers (including IE all versions)

export const httpPost = function (url, method, data) {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // let wholeUrl = proxyurl + url
    return fetch((url), {
        method: method,
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? data : JSON.stringify({})
    })
        .then(checkStatus)
        .then(getBody)
        .then(parseBody)
        .catch(function (error) {
            throw error
        })
}

export const httpPut = function (url, method, data) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let wholeUrl = proxyurl + url
    return fetch((proxyurl + url), {
        method: method,
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT"
        },
        body: data ? data : JSON.stringify({})
    })
        .then(checkStatus)
        .then(getBody)
        .then(parseBody)
        .catch(function (error) {
            throw error
        })
}

export const httpGet = function (url) {
    return fetch(url)
        .then(checkStatus)
        .then(getBody)
        .then(parseBody)
        .catch(function (error) {
            throw error
        })
}

export const httpDelete = function (url, method) {
    return fetch(url, {
        method: method
    })
        .then(checkStatus)
        .then(getBody)
        .then(parseBody)
        .catch(function (error) {
            throw error
        })
}

// checks for Http Status 
function checkStatus(response) {
    if (response.status === 200) {
        return response
    } else {
        var error = "API Service is not available"
        throw error
    }
}

function getBody(response) {
    return response.text();
}

function parseBody(response) {
    return JSON.parse(response);
}

// ==========================================================================
// Common request for all features

export const placeRequest = function (url, method, request, successCallback, errorCallback) {
    let req = ''
    if (method === "POST") {
        req = JSON.stringify(request);
        return httpPost(url, method, req)
            .then(function (respobj) {
                if (successCallback)
                    successCallback(respobj);
            })
            .catch(function (error) {
                if (errorCallback)
                    errorCallback(error);
            });
    } else if (method === "PUT") {
        req = JSON.stringify(request);
        return httpPut(url, method, req)
            .then(function (respobj) {
                if (successCallback)
                    successCallback(respobj);
            })
            .catch(function (error) {
                if (errorCallback)
                    errorCallback(error);
            });
    } else if (method === "GET") {
        return httpGet(url)
            .then(function (respobj) {
                if (successCallback)
                    successCallback(respobj);
            })
            .catch(function (error) {
                if (errorCallback)
                    errorCallback(error);
            });
    }
    else if (method === "DELETE") {
        return httpDelete(url, method)
            .then(function (respobj) {
                if (successCallback)
                    successCallback(respobj);
            })
            .catch(function (error) {
                if (errorCallback)
                    errorCallback(error);
            });
    }
}

// ==========================================================================