import  {searchMovies}  from '../services/api.js'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchPage.module.css'

const SearchPage = () => {

//armazena o termo digitado no input
const [searchTerm, setSearchTerm] = useState("")
//armazena o array de filmes que retorna da API
const [movies, setMovies] = useState([])
//armazena a página atual
const [page, setPage] = useState(1)
//armazena o total de páginas
const [totalPages, setTotalPages] = useState(1)

//função para buscar os filmes
const findMovie = async () => {
    const {results, totalPages} = await searchMovies(searchTerm, page)

    setMovies(results)
    setTotalPages(totalPages)
}

// chama a função apenas quando muda o termo ou página
useEffect(() => {
    if(searchTerm) {
        findMovie()
    }
},[page, searchTerm])

    return (
        <div>

            {/* campo para usuário digitar o filme */}
            <section className={styles.searchContainer}>
                <input className={styles.searchInput} type="text" placeholder='Digite aqui o filme...' value={searchTerm} onChange={(event) => {
                    setSearchTerm(event.target.value)
                    setPage(1)
                    }} />
                {/* botão para buscar resultado */}
                <button className={styles.searchButton} onClick={findMovie}>Buscar</button>
            </section>

            {/* exibe resultado do filme digitado */}
            <div className={styles.grid}>
                {movies.map((movie) => (
                    <div className={styles.card} key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "/no-image.png"} alt={movie.title} />
                            <p>{movie.title}</p>
                            <p>{movie.release_date?.slice(0,4)}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                {page > 1 && (
                    <button onClick={() => setPage((prev) => prev -1)}>Anterior</button>
                )}

                {page < totalPages && (
                    <button onClick={() => setPage((prev) => prev + 1)}>Próximo</button>
                )}
            </div>
        </div>

        
    )
}

export default SearchPage