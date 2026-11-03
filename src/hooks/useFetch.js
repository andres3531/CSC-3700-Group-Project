import { useState, useEffect } from 'react'

function useFetch(url) {

    const [data, setData] = useState(null)

    const [isPending, setIsPending] = useState(true)

    const [error, setError] = useState(null)


    useEffect(() => {
            fetch(url)
                .then(resp => {
                    if (!resp.ok) {
                        console.log(`Bad response : ${resp.status}`)
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
                    setError(err.message)
                    setIsPending(false)
                })
    }, [url])

    return { data, isPending, error }
}

export default useFetch