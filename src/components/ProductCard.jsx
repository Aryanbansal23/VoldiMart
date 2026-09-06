import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { useNavigate } from 'react-router-dom';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';

const GOLD_GRADIENT =
  'linear-gradient(135deg, #F6D365 0%, #D4AF37 50%, #A67C18 100%)';

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const canonicalId = product?._id || product?.id;

  const formattedCategory = product?.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : null;

  const ratingValue =
    typeof product?.rating === 'number' ? product.rating : null;

  const reviewCount =
    typeof product?.numReviews === 'number' ? product.numReviews : null;

  const handleViewDetails = () => {
    if (!canonicalId) return;

    navigate(`/product/${canonicalId}`);
  };

  const handleCardClick = event => {
    if (!canonicalId) return;

    const button = event.target.closest('button');

    if (button) return;

    handleViewDetails();
  };

  const stockAvailable =
    typeof product?.stock === 'number' ? product.stock > 0 : true;

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        cursor: canonicalId ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',

        background:
          'linear-gradient(145deg, #ffffff 0%, #fbfdfb 65%, #f4f8f5 100%)',

        border: '1px solid rgba(18,60,43,0.10)',
        borderRadius: 4,

        overflow: 'hidden',

        position: 'relative',

        transition:
          'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease',

        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: 'rgba(212,175,55,0.55)',
          boxShadow:
            '0 25px 55px rgba(18,60,43,0.15), 0 8px 22px rgba(212,175,55,0.10)',
        },

        '&:hover .product-media': {
          transform: 'scale(1.07)',
        },

        '&:hover .view-details-arrow': {
          transform: 'translateX(4px)',
        },

        '&:hover .product-image-wrapper': {
          background:
            'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.12), rgba(18,60,43,0.025) 70%)',
        },
      }}
    >
      {/* ================= PRODUCT IMAGE ================= */}
      <Box
        className="product-image-wrapper"
        sx={{
          position: 'relative',
          pt: '75%',
          overflow: 'hidden',

          background:
            'radial-gradient(circle at 50% 40%, rgba(31,111,80,0.07), rgba(18,60,43,0.025) 70%)',

          transition: 'background 0.4s ease',
        }}
      >
        <CardMedia
          component="img"
          className="product-media"
          alt={product?.name || 'Product'}
          src={product?.image}
          loading="eager"
          sx={{
            position: 'absolute',
            inset: 0,

            width: '100%',
            height: '100%',

            objectFit: 'contain',

            p: 2.5,

            transition:
              'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        />

        {/* Category badge */}
        {formattedCategory && (
          <Chip
            size="small"
            icon={
              <LocalOfferRoundedIcon
                sx={{
                  fontSize: '15px !important',
                  color: `${DARK_GREEN} !important`,
                }}
              />
            }
            label={formattedCategory}
            sx={{
              position: 'absolute',
              top: 14,
              left: 14,

              height: 30,

              background: 'rgba(255,255,255,0.94)',
              color: DARK_GREEN,

              border: `1px solid rgba(212,175,55,0.45)`,

              backdropFilter: 'blur(10px)',

              fontWeight: 800,
              fontSize: '0.72rem',

              boxShadow: '0 6px 18px rgba(18,60,43,0.10)',

              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        )}

        {/* Premium badge */}
        {product?.featured && (
          <Chip
            size="small"
            label="FEATURED"
            sx={{
              position: 'absolute',
              top: 14,
              right: 14,

              height: 28,

              background: GOLD_GRADIENT,
              color: '#171208',

              fontWeight: 900,
              fontSize: '0.65rem',
              letterSpacing: '0.06em',

              boxShadow: '0 6px 18px rgba(212,175,55,0.28)',
            }}
          />
        )}
      </Box>

      <Divider
        sx={{
          borderColor: 'rgba(18,60,43,0.08)',
        }}
      />

      {/* ================= PRODUCT CONTENT ================= */}
      <CardContent
        sx={{
          px: 2.5,
          pt: 2.4,
          pb: 1.5,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 800,
            color: DARK_GREEN,

            lineHeight: 1.25,

            letterSpacing: '-0.015em',

            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product?.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.6,
            minHeight: 44,

            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product?.description || 'Premium quality product from VoldiMart.'}
        </Typography>

        {/* Rating */}
        {ratingValue !== null && (
          <Stack
            direction="row"
            spacing={0.7}
            alignItems="center"
            sx={{
              mt: 1.5,
            }}
          >
            <Rating
              name={`rating-${canonicalId}`}
              value={ratingValue}
              precision={0.5}
              readOnly
              size="small"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: GOLD,
                },

                '& .MuiRating-iconEmpty': {
                  color: 'rgba(212,175,55,0.25)',
                },
              }}
            />

            {reviewCount !== null && (
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                }}
              >
                ({reviewCount})
              </Typography>
            )}
          </Stack>
        )}

        {/* Price + stock */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{
            mt: 1.7,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: DARK_GREEN,
              letterSpacing: '-0.02em',
            }}
          >
            ${Number(product?.price || 0).toFixed(2)}
          </Typography>

          {typeof product?.stock === 'number' && (
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                color:
                  product.stock > 5
                    ? GREEN
                    : product.stock > 0
                    ? '#A16207'
                    : '#B91C1C',
              }}
            >
              <Inventory2OutlinedIcon
                sx={{
                  fontSize: 16,
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                }}
              >
                {product.stock > 5
                  ? `${product.stock} in stock`
                  : product.stock > 0
                  ? 'Limited stock'
                  : 'Out of stock'}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>

      {/* ================= ACTIONS ================= */}
      <CardActions
        sx={{
          px: 2.5,
          pb: 2.5,
          pt: 0,
          mt: 'auto',

          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Button
          size="medium"
          variant="contained"
          disabled={!stockAvailable}
          startIcon={<AddShoppingCartRoundedIcon />}
          onClick={event => {
            event.stopPropagation();

            if (stockAvailable) {
              addToCart(product);
            }
          }}
          sx={{
            flex: 1,

            minHeight: 42,

            borderRadius: 2.5,

            background: GOLD_GRADIENT,
            color: '#171208',

            fontWeight: 900,

            boxShadow: '0 9px 20px rgba(212,175,55,0.22)',

            '&:hover': {
              background:
                'linear-gradient(135deg, #FFE58A 0%, #D4AF37 50%, #A67C18 100%)',

              boxShadow: '0 13px 28px rgba(212,175,55,0.30)',

              transform: 'translateY(-1px)',
            },

            '&.Mui-disabled': {
              background: 'rgba(18,60,43,0.10)',
              color: 'rgba(18,60,43,0.45)',
            },
          }}
        >
          {stockAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>

        <Tooltip title="See full specs" arrow>
          <Button
            size="medium"
            variant="outlined"
            onClick={event => {
              event.stopPropagation();
              handleViewDetails();
            }}
            endIcon={
              <ArrowForwardRoundedIcon
                className="view-details-arrow"
                sx={{
                  fontSize: '18px !important',
                  transition: 'transform 0.25s ease',
                }}
              />
            }
            sx={{
              minHeight: 42,

              px: 1.7,

              borderRadius: 2.5,

              borderColor: 'rgba(18,60,43,0.20)',
              color: DARK_GREEN,

              fontWeight: 800,

              '&:hover': {
                borderColor: GOLD_DARK,
                background: 'rgba(212,175,55,0.08)',
              },
            }}
          >
            Details
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}