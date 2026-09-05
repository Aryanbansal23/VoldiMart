import React from 'react';
import { Link } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Box,
  Stack,
  Chip,
} from '@mui/material';

import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

function SearchResults({
  results,
  onResultClick,
  setSearchResults,
  variant = 'popover',
}) {
  const handleItemClick = () => {
    onResultClick?.();
    setSearchResults?.([]);
  };

  const isModal = variant === 'modal';
  const limit = isModal ? 6 : 3;

  const paperSx = {
    width: '100%',
    maxWidth: isModal ? '100%' : '520px',
    maxHeight: isModal ? '60vh' : '50vh',
    overflowY: 'auto',
    p: isModal ? 1 : 1.25,
    borderRadius: 4,

    background:
      'linear-gradient(145deg, rgba(16, 42, 35, 0.98), rgba(8, 28, 23, 0.98))',

    border: '1px solid rgba(201, 162, 39, 0.28)',

    boxShadow:
      '0 24px 70px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255,255,255,0.02)',

    backdropFilter: 'blur(18px)',

    '&::-webkit-scrollbar': {
      width: 6,
    },

    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(201, 162, 39, 0.45)',
      borderRadius: 10,
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  };

  const listItemSx = {
    width: '100%',
    borderRadius: 3,
    mb: 0.5,
    px: isModal ? 2 : 1.5,
    py: 1.2,
    textDecoration: 'none',
    color: 'inherit',
    transition:
      'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',

    '&:hover': {
      background:
        'linear-gradient(90deg, rgba(201,162,39,0.12), rgba(255,255,255,0.025))',

      transform: 'translateX(4px)',

      boxShadow: 'inset 3px 0 0 #c9a227',
    },
  };

  return (
    <Paper elevation={0} sx={paperSx}>
      {results.length > 0 ? (
        <>
          <Box
            sx={{
              px: 1.5,
              pt: 0.75,
              pb: 1.25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700,
              }}
            >
              Search Results
            </Typography>

            <Chip
              label={`${Math.min(results.length, limit)} found`}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#e5c96a',
                bgcolor: 'rgba(201,162,39,0.12)',
                border: '1px solid rgba(201,162,39,0.25)',
              }}
            />
          </Box>

          <List disablePadding>
            {results.slice(0, limit).map((product) => {
              const pid = product._id || product.id;

              return (
                <ListItem
                  key={pid}
                  alignItems="center"
                  component={Link}
                  to={`/product/${pid}`}
                  onClick={handleItemClick}
                  sx={listItemSx}
                >
                  <ListItemAvatar sx={{ minWidth: 64 }}>
                    <Avatar
                      alt={product.name}
                      src={product.image}
                      variant="rounded"
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2.5,
                        bgcolor: 'rgba(201,162,39,0.1)',
                        border: '1px solid rgba(201,162,39,0.2)',
                      }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: '#f8fafc',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {product.name}
                        </Typography>

                        <ArrowOutwardRoundedIcon
                          sx={{
                            fontSize: 17,
                            color: '#c9a227',
                            flexShrink: 0,
                          }}
                        />
                      </Stack>
                    }
                    secondary={
                      <Box sx={{ mt: 0.4 }}>
                        <Typography
                          component="span"
                          sx={{
                            display: 'block',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: '#e5c96a',
                            mb: 0.35,
                          }}
                        >
                          ${product.price}
                        </Typography>

                        <Typography
                          component="span"
                          sx={{
                            display: 'block',
                            fontSize: '0.76rem',
                            color: 'rgba(255,255,255,0.52)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {product.description
                            ? `${product.description.slice(0, 55)}...`
                            : 'Premium product available now'}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      ) : (
        <Box
          sx={{
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 3,
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              mb: 2,
              color: '#c9a227',
              background:
                'linear-gradient(135deg, rgba(201,162,39,0.18), rgba(201,162,39,0.05))',
              border: '1px solid rgba(201,162,39,0.25)',
            }}
          >
            <SearchOffRoundedIcon />
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: '#f8fafc',
              mb: 0.5,
            }}
          >
            No products found
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Try searching with a different keyword.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default SearchResults;