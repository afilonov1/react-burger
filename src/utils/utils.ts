

export function Fetch(url: string, setData: any, setIsError: any) {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
            setData(result.data);
        })
        .catch(err => {
            console.log(err);
            setIsError(true);
        });
}