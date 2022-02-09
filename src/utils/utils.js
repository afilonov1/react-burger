export const compareArrays = (array1, array2) => {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
};

// const postRequest = (url, body) => {
//     return fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         redirect: 'follow',
//         referrerPolicy: 'no-referrer',
//         body: JSON.stringify(body)
//     });
// };
// export const postRequestHandle = async (url, body, action) => {
//     const request = await postRequest(url, body);
//     if (request.ok) {
//         const data = await request.json();
//         if (data.success) {
//             console.log(data);
//             action(data);
//         }
//     }
// }
export function requestData ({method, url, requestAction, successAction, errorAction, body, payload}) {

    return async function(dispatch) {
        try {
            dispatch(requestAction());
            console.log("До запроса")
            const response = await fetch(url, {
                method: method,
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(body)
            });
            console.log("После запроса")

            let json;
            console.log("response = ", response);
            if (response.ok) {

                json = await response.json();
                console.log("ok, json = ", json)
                dispatch(successAction(json, payload));
            } else {
                dispatch(errorAction());
            }

        } catch {
            console.log("TRY не вышел");
            dispatch(errorAction());
        }
    }
}
