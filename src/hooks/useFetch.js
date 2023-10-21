import axios from 'axios'
import { useEffect, useState } from 'react'

function useFetch({ url }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    useEffect(async () => {
        setLoading(true)
        try {
            const resp = await axios.get(url)
            setData(resp.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }, [url])
    const reFetch = async () => {
        setLoading(true)
        try {
            const resp = await axios.get(url)
            setData(resp.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return { loading, error, data, reFetch }
}

export default useFetch