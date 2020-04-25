// Basic method to post and receive json response.
// returns a POST promise 
// async/await is not used, as it is not supported in all browsers (including IE all versions)

export const httpPost = function (url, data) {

    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? data : JSON.stringify({})
    })
        .then(checkStatus)
        .then(getBody)
        .then(parseBody)
        .then(parseJson)
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

function parseJson(response) {

    response = response.response;

    if (response.infoID !== "0") {
        var msg = response.infoMsg;
        var error = new Error(msg);
        error.infoID = response.infoID;
        error.data = response.data;
        throw error;
    }

    return response;
}


// ==========================================================================
// Common request for all features

export const placeRequest = function (url, request, successCallback, errorCallback) {
    let req = request.toS();
    return httpPost(url, req)
        .then(function (respobj) {
            if (successCallback)
                successCallback(respobj);
        })
        .catch(function (error) {
            if (errorCallback)
                errorCallback(error);
        });
}

// ==========================================================================