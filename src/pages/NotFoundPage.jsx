import * as React from 'react';

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

function NotFoundPage() {
  const goHome = () => {
    window.location.href = '/';
  };

  const goShop = () => {
    window.location.href = '/shop';
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: LIGHT_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 7, md: 10 },
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 250, md: 420 },
          height: { xs: 250, md: 420 },
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.15)',
          top: { xs: -130, md: -190 },
          right: { xs: -100, md: -130 },
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: { xs: 220, md: 350 },
          height: { xs: 220, md: 350 },
          borderRadius: '50%',
          border: '1px solid rgba(18,60,43,0.08)',
          bottom: { xs: -120, md: -170 },
          left: { xs: -100, md: -140 },
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack
          alignItems="center"
          textAlign="center"
          spacing={3}
        >
          {/* 404 */}
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: '7rem',
                  sm: '9rem',
                  md: '12rem',
                },
                lineHeight: 0.85,
                fontWeight: 950,
                letterSpacing: '-0.08em',
                color: DARK_GREEN,
                textShadow:
                  '8px 8px 0px rgba(212,175,55,0.22)',
              }}
            >
              404
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                right: { xs: -8, md: -15 },
                bottom: { xs: -3, md: 2 },
                width: { xs: 48, md: 65 },
                height: { xs: 48, md: 65 },
                borderRadius: '50%',
                background: GOLD,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  '0 10px 30px rgba(212,175,55,0.3)',
              }}
            >
              <SentimentDissatisfiedIcon
                sx={{
                  color: DARK_GREEN,
                  fontSize: { xs: 28, md: 38 },
                }}
              />
            </Box>
          </Box>

          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 2,
              py: 0.8,
              borderRadius: 10,
              background: 'rgba(31,111,80,0.08)',
              border:
                '1px solid rgba(31,111,80,0.15)',
            }}
          >
            <Typography
              sx={{
                color: GREEN,
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              PAGE NOT FOUND
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              color: DARK_GREEN,
              fontWeight: 900,
              fontSize: {
                xs: '2rem',
                sm: '2.5rem',
                md: '3rem',
              },
              lineHeight: 1.2,
            }}
          >
            Looks like you took a wrong turn
          </Typography>

          <Typography
            sx={{
              maxWidth: 600,
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: {
                xs: '0.95rem',
                md: '1.05rem',
              },
            }}
          >
            The page you're looking for doesn't exist or may
            have been moved. Don't worry, there's plenty more
            to explore at VoldiMart.
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
            sx={{
              mt: 1,
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={goHome}
              sx={{
                minWidth: 170,
                py: 1.4,
                px: 3,
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 800,
                background: DARK_GREEN,
                boxShadow:
                  '0 10px 25px rgba(18,60,43,0.2)',
                '&:hover': {
                  background: GREEN,
                  boxShadow:
                    '0 12px 28px rgba(18,60,43,0.28)',
                },
              }}
            >
              Back to Home
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<SearchIcon />}
              onClick={goShop}
              sx={{
                minWidth: 170,
                py: 1.4,
                px: 3,
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 800,
                color: DARK_GREEN,
                borderColor: GOLD_DARK,
                '&:hover': {
                  borderColor: GOLD,
                  background:
                    'rgba(212,175,55,0.08)',
                },
              }}
            >
              Explore Shop
            </Button>
          </Stack>

          {/* Bottom brand */}
          <Typography
            sx={{
              mt: 3,
              fontSize: '0.72rem',
              letterSpacing: 2,
              color: 'rgba(18,60,43,0.45)',
              fontWeight: 800,
            }}
          >
            VOLDIMART • PREMIUM SHOPPING
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default NotFoundPage;