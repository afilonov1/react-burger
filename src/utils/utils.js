

export function getData(url, setData, setIsError) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                setIsError(true);
            }
            return response.json()
        })
        .then(result => {
            setData(result.data);
        })
        .catch(err => {
            setIsError(true);
        });
}