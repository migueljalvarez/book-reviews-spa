export default defineEventHandler(async event => {
  const { apiUrl } = useRuntimeConfig()
  const query = getQuery(event)

  const title = query.title ? String(query.title) : ''
  const author = query.author ? String(query.author) : ''
  const hasReview = query.hasReview ?? ''

  try {
    let url = `${apiUrl}/books/my-library`

    const params = new URLSearchParams()
    if (title) params.append('title', title)
    if (author) params.append('author', author)
    if (hasReview !== '') params.append('hasReview', hasReview.toString())

    if ([...params].length > 0) {
      url += `?${params.toString()}`
    }

    const book = await $fetch(url)
    return book
  } catch (error: any) {
    console.error('Error fetching from OpenLibrary:', error)
    return {
      status: error?.response?.status || 500,
      message: error?.response?.statusText || 'Error searching books',
      data: error?.data || null
    }
  }
})
