import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import { img_500, unavailable } from "../../config/config";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import Carousel from "../carousel/Carousel";
import { YouTube } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledPaper = styled("div")(({ theme }) => ({
  width: "80%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "2px solid #000",
  borderRadius: 10,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  overflow: "auto",
}));

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.error("Error fetching content data:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
      fetchVideo();
    }
  }, [open]);

  return (
    <>
      <button type="button" onClick={handleOpen} className="media">
        {children}
      </button>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          {content ? (
            <StyledPaper>
              <Grid container spacing={2}>
                {/* Image Column */}
                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                  >
                    <CardMedia
                      component="img"
                      image={
                        content.poster_path
                          ? `${img_500}/${content.poster_path}`
                          : unavailable
                      }
                      alt={content.name || content.title}
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                </Grid>

                {/* Content Column */}
                <Grid item xs={12} md={8}>
                  <Typography variant="h3" gutterBottom>
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </Typography>

                  {content.tagline && (
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                      {content.tagline}
                    </Typography>
                  )}

                  <Typography variant="body2" paragraph>
                    {content.overview}
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    sx={{ marginBottom: 2 }}
                  >
                    Watch the Trailer
                  </Button>

                  <Carousel media_type={media_type} id={id} />
                </Grid>
              </Grid>
            </StyledPaper>
          ) : (
            <div>Loading...</div>
          )}
        </Fade>
      </StyledModal>
    </>
  );
}
