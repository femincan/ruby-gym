import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchData } from '../utils/fetchData';

const ExerciseVideos = ({ exerciseName }) => {
  const [exerciseVideos, setExerciseVideos] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchExerciseVideos = async () => {
      const exerciseVideosData = await fetchData(
        'https://youtube-search-and-download.p.rapidapi.com/search',
        'youtube-search-and-download.p.rapidapi.com',
        {
          params: {
            query: `${exerciseName} exercise`,
            type: 'v',
            sort: 'r',
            hl: 'en',
            gl: 'US',
          },
          signal: controller.signal,
        }
      );

      setExerciseVideos(exerciseVideosData);
    };

    fetchExerciseVideos();

    return () => {
      controller.abort();
    };
  }, [exerciseName]);

  return (
    <Box my={10} p={1}>
      <Typography
        variant="h5"
        component="h2"
        sx={(theme) => ({
          mb: 5,
          textAlign: { xs: 'center', md: 'left' },
          fontSize: { md: theme.typography.h4.fontSize },
        })}
      >
        How to do{' '}
        <Typography
          variant="inherit"
          component="span"
          color="redRYB.main"
          textTransform="capitalize"
        >
          {exerciseName}
        </Typography>{' '}
        exercise?
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        gap={5}
        width={1}
      >
        {exerciseVideos.contents?.slice(0, 3).map(({ video }) => (
          <Box
            key={video.videoId}
            component="iframe"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              flex: 1,
              width: { xs: 0.8, sm: 0.5, md: 'none' },
              minWidth: 0,
              border: 'none',
              borderRadius: 1,
              aspectRatio: '16 / 9',
            }}
          ></Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;