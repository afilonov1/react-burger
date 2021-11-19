

export function getData(url: string, setData: any, setIsError: any) {
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