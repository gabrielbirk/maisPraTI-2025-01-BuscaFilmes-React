import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { getMovieDetail } from "../services/api.js"
import styles from './MovieDetail.module.css'

const MovieDetail = () => {

    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    //armazena se filme está na lista de favoritos
    const [isFavorite, setIsFavorite] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovie = async () => {
            //pega os detalhes do filme na API
            const responseJson = await getMovieDetail(id)
            setMovie(responseJson)
        

        //localiza a parte de favoritos
        const favorites = JSON.parse(localStorage.getItem('favorites')) || []

        //identifica se o filme está nos favoritos
        const favorite = favorites.find(fav => fav.id === responseJson.id)

        //se achou, informa que é favorito
        setIsFavorite(!!favorite)
    }

        fetchMovie()
    }, [id])

    //enquanto filme não for carregado exibe mensagem
    if(!movie) {
        return <p>Carregando...</p>
    }

    const toggleFavorite = () => {
        
        //pega os favoritos atuais do localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || []

        //procura o indice do filme na lista
        const index = favorites.findIndex(fav => fav.id === movie.id)

        //verifica se encontra o filme pelo index na lista
        if(index !== -1) {
            //se encontrou, remove da lista
            favorites.splice(index, 1)
            setIsFavorite(false)
        } else {
            //se não encontrou adiciona
            favorites.push(movie)
            setIsFavorite(true)
        }

        //atualiza o localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    return (

        <div className={styles.detailContainer}>

            <button className={styles.backButton} onClick={() => navigate("/")}>Voltar à Página Principal</button>

            <h1 className={styles.detailHeader}>{movie.title}</h1>

            <div className={styles.detailContent}>
                <div className={styles.poster}>
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/no-image.png"} alt={movie.title} />
                </div>

                <div className={styles.info}>
                    <p><strong>Data de lançamento:</strong> {movie.release_date}</p>

                    <p><strong>Sinopse:</strong> {movie.overview}</p>

                    <p><strong>Avaliação:</strong> {movie.vote_average}</p>

                    {!isFavorite && (
                        <button className={styles.favoriteButton} onClick={toggleFavorite}>☆ Favoritar</button>
                    )}
                    {isFavorite && (
                        <button className={styles.favoriteButton} onClick={toggleFavorite}>⭐Remover dos Favoritos</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieDetail