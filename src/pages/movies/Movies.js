import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/singleContent/SingleContent";
import Genres from "../../components/genres/Genres";
import useGenres from "../../hooks/useGenres";
import { Typography } from "@mui/material";

function Movies() {
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [numOfPages, setNumOfPages] = useState(1);

  const [content, setContent] = useState([]);

  const genreforURL = useGenres(selectedGenres);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchTrending();
  }, [page, genreforURL]);
  return (
    <div>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <span className="pageTitle">
        <Typography variant="h3">Movies</Typography>
      </span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination numOfPages={numOfPages} setPage={setPage} />
      )}
    </div>
  );
}

export default Movies;
