import { useState,useMemo,useCallback,useEffect } from "react"
import Searchbar from "../components/Searchbar"
import MovieCard from "../components/MovieCard"
import Loader from "../components/Loader"
import { useDebounce } from "../hooks/useDebounce"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { searchMovies } from "../api/omdbApi"
const Home = () => {
  const [query,setQuery]= useState("");
  const [page,setPage]= useState(1);
  const [sortBy,setSortBy]= useState("relevance");
  const [favorites,setFavorites]= useLocalStorage("favorites",[]);

  const debouncedQuery = useDebounce(query,500);
  useEffect(()=>{
    setPage(1);
   
  },[debouncedQuery])
  const {data,loading,error}= useFetch(()=>searchMovies(debouncedQuery,page,sortBy),[debouncedQuery,page,sortBy]);

  const movies = data?.Search || [];
  const totalResults = data?.totalResults || 0;

  const totalPages = Math.ceil(totalResults / 10);
  
  return (
    <div>
      
    </div>
  )
}

export default Home
