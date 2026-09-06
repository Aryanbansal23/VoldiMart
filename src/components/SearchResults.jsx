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

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';

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
    borderRadius: 3.5,

    background: `linear-gradient(
      145deg,
      rgba(18, 60, 43, 0.98),
      rgba(9, 39, 28, 0.99)
    )`,

    border: `1px solid ${GOLD}45`,

    boxShadow: `
      0 24px 70px rgba(0, 0, 0, 0.35),
      0 0 35px ${GOLD}12
    `,

    backdropFilter: 'blur(18px)',

    '&::-webkit-scrollbar': {
      width: 6,
    },

    '&::-webkit-scrollbar-thumb': {
      background: `${GOLD}70`,
      borderRadius: 10,
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  };

  const listItemSx = {
    width: '100%',
    borderRadius: 2.5,
    mb: 0.5,
    px: isModal ? 2 : 1.5,
    py: 1.2,

    textDecoration: 'none',
    color: 'inherit',

    transition:
      'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',

    '&:hover': {
      background: `linear-gradient(
        90deg,
        ${GOLD}18,
        rgba(255,255,255,0.025)
      )`,
      transform: 'translateX(4px)',
      boxShadow: `inset 3px 0 0 ${GOLD}`,
    },
  };

  return (
    <Paper elevation={0} sx={paperSx}>
      {results.length > 0 ? (
        <>
          {/* Header */}
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
                color: 'rgba(255,255,255,0.58)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 800,
              }}
            >
              Search Results
            </Typography>

            <Chip
              label={`${Math.min(results.length, limit)} found`}
              size="small"
              sx={{
                height: 23,
                fontSize: '0.7rem',
                fontWeight: 800,
                color: GOLD,
                bgcolor: `${GOLD}14`,
                border: `1px solid ${GOLD}40`,
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
                  {/* Product Image */}
                  <ListItemAvatar sx={{ minWidth: 64 }}>
                    <Avatar
                      alt={product.name}
                      src={product.image}
                      variant="rounded"
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2.5,
                        bgcolor: `${GOLD}12`,
                        border: `1px solid ${GOLD}35`,
                        objectFit: 'cover',
                      }}
                    />
                  </ListItemAvatar>

                  {/* Product Details */}
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
                            fontWeight: 800,
                            color: '#fff',
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
                            color: GOLD,
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
                            fontSize: '0.84rem',
                            fontWeight: 800,
                            color: GOLD,
                            mb: 0.35,
                          }}
                        >
                          ${Number(product.price || 0).toFixed(2)}
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

          {/* More Results Indicator */}
          {results.length > limit && (
            <Box
              sx={{
                mt: 0.5,
                pt: 1,
                pb: 0.5,
                textAlign: 'center',
                borderTop: `1px solid ${GOLD}18`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: `${GOLD}CC`,
                  fontWeight: 700,
                }}
              >
                Showing {limit} of {results.length} results
              </Typography>
            </Box>
          )}
        </>
      ) : (
        /* Empty State */
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
              width: 62,
              height: 62,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              mb: 2,

              color: GOLD,

              background: `linear-gradient(
                135deg,
                ${GOLD}20,
                ${GOLD}06
              )`,

              border: `1px solid ${GOLD}40`,
              boxShadow: `0 8px 30px ${GOLD}12`,
            }}
          >
            <SearchOffRoundedIcon sx={{ fontSize: 29 }} />
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              color: '#fff',
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