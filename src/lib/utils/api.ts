export const fetcher = async (url: string, options = {}) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    })

    if (!response.ok) throw new Error('Failed to fetch data')
        return response.json()
}