// Client-side data fetching utility

/**
 * Fetch data from an API endpoint with better error handling
 */
export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Don't cache API responses
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error)
    throw error // Re-throw to be handled by the component
  }
}

/**
 * Post data to an API endpoint with better error handling
 */
export async function postData<T>(url: string, data: any): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error posting to ${url}:`, error)
    throw error // Re-throw to be handled by the component
  }
}

