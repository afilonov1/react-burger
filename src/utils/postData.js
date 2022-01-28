export const postData = (url, data) => {

    const promise = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)
    })
        .then(
            response => {
                return response.json();
            }
        )

        .catch((error) => {
            console.error('Error:', error);
        });
    return promise;
};