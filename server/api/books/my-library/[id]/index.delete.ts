export default defineEventHandler(async event => {
  const { apiUrl } = useRuntimeConfig()
  const { id } = event.context.params || {}

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Book ID is required'
    })
  }

  const book = await $fetch(`${apiUrl}/books/my-library/${id}`, {
    method: 'DELETE'
  })

  return book
})
