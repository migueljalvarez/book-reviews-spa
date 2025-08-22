export default defineEventHandler(async event => {
  const { apiUrl } = useRuntimeConfig()
  const query = getQuery(event)
  const searchTerm = query.q

  if (!searchTerm) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search term is required'
    })
  }

  try {
    const books = await $fetch(
      `${apiUrl}/books/search?q=${encodeURIComponent(String(searchTerm))}&limit=10`
    )

    return books
  } catch (error) {
    console.error('Error fetching from OpenLibrary:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error searching books'
    })
  }
})
