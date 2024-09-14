import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/singleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/pagination/CustomPagination";
import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 to get user information

function Trending() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const { user, isAuthenticated } = useAuth0(); // Destructure user and authentication status

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      {/* Display the user's name if authenticated */}
      {isAuthenticated && (
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Welcome, {user.name}!
        </Typography>
      )}

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
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
