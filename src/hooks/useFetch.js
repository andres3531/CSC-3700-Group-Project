import { useState, useEffect } from 'react'

function useFetch(url) {

    const [data, setData] = useState(null)

    const [isPending, setIsPending] = useState(true)

    const [error, setError] = useState(null)


    useEffect(() => {
        setTimeout(() =>{
            fetch(url)
                .then(resp => {
                    // Check HTTP status — 404 and 500 do not throw automatically
                    // resp.ok is true for 200-299 status codes
                    if (!resp.ok) {
                        console.log(`Bad response : ${resp.status}`) //webserver throws this error the http protocol
                        throw new Error(`HTTP error: ${resp.status}`)
                    }
                    return resp.json()
                })
                .then(data => {
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    console.log(`CATCH HAPPENED response : ${err.message}`)
                    // .catch() handles both network errors and the thrown HTTP errors
                    setError(err.message)
                    setIsPending(false)
                })

        },2000, [url])
    }) //WE CAN REMOVE TIMEOUT AFTER WE ARE DONE ITS FOR TESTING NOW

    return { data, isPending, error }
}

export default useFetch