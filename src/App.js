import Search from './componentes/Search'; 
import OpcionMenu from './componentes/Menu';
import MenuCategoria from './componentes/MenuCategoria'
import './App.css';
import axios from 'axios'; // libreria que nos ayuda a hacer peticiones al contenido de un enlace http
import YouTube from 'react-youtube';
import React, {useDebugValue, useEffect, useState} from 'react';
import { useDebounce } from './componentes/hooks/useDebounce';


if (process.env.NODE_ENV === 'production'){
  require ('dotenv').config()
}

function App() {
  const API_URL = process.env.API_URL || 'https://api.themoviedb.org/3';
  const API_KEY = process.env.API_KEY || 'b3409e5f1b6ac61f00368b8fd6e42c62';
  const IMAGE_PATH = process.env.IMAGE_PATH || 'https://image.tmdb.org/t/p/w500';
  const URL_IMAGE = process.env.URL_IMAGE || 'https://image.tmdb.org/t/p/w500';

  console.log(process.env.API_KEY)

  const [films, setFilms] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [film, setFilm] = useState({title: "Loading movies"})
  const [selectedYear, setSelectedYear] = useState('');
  const [categoria, setCategoria] = useState('')
  const debouncevalue= useDebounce(searchKey, 1000);

  //funcion para poder hacer la peticion get y traer pelicula de la API
  const fetchFilms = async(searchKey) => {
    const type = searchKey ? 'search' : 'discover'
    const {data : {results},
  }  = await axios.get(`${API_URL}/${type}/movie`,{
    params : {
      api_key : API_KEY,
      query : searchKey
    },
  });
    setFilms(results)
    setFilm(results[0])
  }
  
 
  const discoverFilms = async (selectedYear)=>{
      const response = await axios.get(`${API_URL}/discover/movie`,{
       params:{
        api_key : API_KEY,
        sort_by: 'popularity.desc',
        primary_release_year: selectedYear

       },
      });
      const movies = response.data.results;
      setFilms(movies);
      setFilm(movies[0]);
      console.log('Movies:', movies)

  
    }
  
  const categoriaFilms = async (categoria) =>{
    const response = await axios.get(`${API_URL}/discover/movie`,{
      params:{
        api_key : API_KEY,
        with_genres: categoria,
        sort_by : 'popularity.desc',
      },
    });
    const categoriaMovie = response.data.results;
    setFilms(categoriaMovie);
    setFilm(categoriaMovie[0])
   
  }

  // funcion para consultar peliculas por categoria 

  const seachCategoria =  (e)=>{
    e.preventDefault();
    categoriaFilms(parseInt(categoria))
  }
  //funcion para consultar peliculas 
  const searchFilms =  (e)=>{
    e.preventDefault();
    fetchFilms(debouncevalue)
  }
  
  //funtion para mostrar peliculas por fechas
   
  const yearFilms = (e)=>{
    e.preventDefault()
    discoverFilms(2023)
  }

  useEffect(()=>{
    fetchFilms(debouncevalue);
  }, [debouncevalue])

  useEffect(() => {
    discoverFilms(selectedYear);
  }, [selectedYear]); // Este useEffect se ejecutará al montar el componente

  useEffect(()=>{
    categoriaFilms(categoria);
  }, [categoria])


  return (
    <div className="App">
      <div className='container-search'>  
          <Search OnSubmit={searchFilms} onChange= {(e)=> setSearchKey(e.target.value) }/>
      </div>
      <div className='container-menu'>
        <MenuCategoria OnSubmit={seachCategoria} onChange={(e)=> setCategoria(e.target.value)}/>
        <OpcionMenu OnSubmit={yearFilms} onChange={(e) => setSelectedYear(e.target.value)}/>
      </div>
      <div className='container-film m-20'>
          <div className='  flex flex-wrap -mx-4'>
            {films.map((film)=>(
              <div key={film.id} className='container w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  px-2   mb-10'>
                  <img className=' films cursor-pointer ' src={`${URL_IMAGE + film.poster_path}`} alt={film.title}/>
                  <h4 className='title-films  text-zinc-200  text-center'>{film.title}</h4>
                  
              </div>
            ))}  
          </div>
         
      </div>
    </div>
  );
}

export default App;
