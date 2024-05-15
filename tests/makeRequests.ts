export default async function makeRequest<T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, options)
    return response
  } catch (error) {
    throw new Error(`Error making request to ${url}: ${error}`)
  }
}
