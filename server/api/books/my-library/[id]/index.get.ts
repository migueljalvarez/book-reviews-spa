export default defineEventHandler(async event => {
  const { apiUrl } = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  try {
    const book = await $fetch(`${apiUrl}/books/my-library/${id}`)
    return book
  } catch (error) {
    console.error('Error fetching from OpenLibrary:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error searching books'
    })
  }
})
