import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import WriteReview from "../components/cardIcons/writeReview";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const {mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  const isPending = mustWatchMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <WriteReview movie={movie} />
            <RemoveFromMustWatchIcon movie={movie} />
          </>
        );
      }}
    />
  );

};

export default MustWatchMoviesPage;
