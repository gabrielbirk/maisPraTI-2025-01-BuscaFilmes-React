//importa a base URL e a API KEY do .env
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL
const apiKey = import.meta.env.VITE_TMDB_API_KEY

//cria função para buscar filme pelo termo digitado
async function searchMovies(term, page) {
    const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${term}&page=${page}`

    try {
        const response = await fetch(url)
        const responseJson = await response.json()
        
        //retorna apenas o array de filmes 
        return {
            results: responseJson.results,
            totalPages: responseJson.total_pages
        }

    } catch (error) {
        console.log("Erro na requisição:", error)
        
        //em caso de erro retorna array vazio
        return []
    }
}

async function getMovieDetail(id) {
    const url = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=pt-BR`

    try {
        const response = await fetch(url)
        const responseJson = await response.json()

        return responseJson
    } catch (error) {
        console.log("Erro ao buscar detalhes do filme:", error)

        return null
    }

}

export {searchMovies, getMovieDetail}
