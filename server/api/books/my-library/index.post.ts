import { createError } from 'h3'

export default defineEventHandler(async event => {
  const { apiUrl } = useRuntimeConfig()
  const body = await readBody(event)
  const method = event._method

  try {
    const book = await $fetch(`${apiUrl}/books/my-library`, {
      method,
      body
    })
    return book
  } catch (error: any) {
    console.error('Error fetching book:', error)

    // Lanza un error real para que $fetch lo considere
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?.statusText || 'Internal Server Error',
      data: error?.data || null
    })
  }
})
