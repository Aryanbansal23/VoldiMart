import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

import { apiClient, withRetry } from '../services/apiClient';
import { useNotifier } from '../context/NotificationProvider';

const GOLD = '#C9A227';
const DARK_GREEN = '#12372A';
const GREEN = '#1F6F4A';
const LIGHT_GREEN = '#EAF4EE';

function SimilarProductsError({ onRetry }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Alert
      severity="warning"
      variant="outlined"
      icon={<CloudOffIcon />}
      sx={{
        borderRadius: 4,
        borderWidth: 1.5,
        background: '#fffdf5',
        '& .MuiAlert-message': { width: '100%' },
      }}
      action={
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Retry
          </Button>

          <Button
            size="small"
            component="a"
            href="https://weaviate.io"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            Docs
          </Button>
        </Stack>
      }
    >
      <AlertTitle>Similar products unavailable</AlertTitle>

      We couldn't load recommendations right now. Please try again shortly.

      <Box sx={{ mt: 1 }}>
        <Button
          size="small"
          endIcon={
            <ExpandMoreIcon
              sx={{
                transform: showDetails ? 'rotate(180deg)' : 'none',
                transition: '0.2s',
              }}
            />
          }
          onClick={() => setShowDetails(value => !value)}
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </Button>

        <Collapse in={showDetails}>
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              mt: 1,
              bgcolor: '#f8fafc',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 12,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            The recommendation service is currently unavailable.
          </Paper>
        </Collapse>
      </Box>
    </Alert>
  );
}

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotifier();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const [recommended, setRecommended] = useState([]);
  const [recLoading, setRecLoading] = useState(true);
  const [similarError, setSimilarError] = useState(false);

  const normalizeProduct = useCallback(prod => {
    if (!prod || typeof prod !== 'object') return null;

    const candidate =
      prod._id ??
      prod.id ??
      prod.mongoId ??
      prod?.metadata?.mongoId;

    const normalizedId =
      candidate !== undefined && candidate !== null
        ? `${candidate}`
        : undefined;

    return normalizedId
      ? {
          ...prod,
          id: normalizedId,
          _id: normalizedId,
        }
      : { ...prod };
  }, []);

  const recordVisit = useCallback(
    prod => {
      try {
        const normalized = normalizeProduct(prod);

        if (!normalized?.id) return;

        const key = 'visitedProducts';
        const raw = localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        const stored = Array.isArray(parsed) ? parsed : [];

        const filtered = stored.filter(
          item => item.id !== normalized.id
        );

        const next = [
          ...filtered,
          {
            id: normalized.id,
            name: normalized.name,
            image: normalized.image,
            price: normalized.price,
            visitedAt: Date.now(),
          },
        ].slice(-12);

        localStorage.setItem(key, JSON.stringify(next));
      } catch (storageError) {
        console.warn(
          'Unable to track visited product',
          storageError
        );
      }
    },
    [normalizeProduct]
  );

  const fetchRecommended = useCallback(async () => {
    setRecLoading(true);
    setSimilarError(false);

    try {
      const { data: recs } = await withRetry(() =>
        apiClient.get(`products/${id}/similar`)
      );

      if (!Array.isArray(recs)) {
        setRecommended([]);
        return;
      }

      const normalized = recs
        .map(item => normalizeProduct(item))
        .filter(Boolean)
        .filter(
          (item, index, self) =>
            item.id &&
            self.findIndex(other => other.id === item.id) === index
        )
        .filter(item => item.id !== `${id}`);

      setRecommended(normalized);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setSimilarError(true);
      setRecommended([]);
    } finally {
      setRecLoading(false);
    }
  }, [id, normalizeProduct]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await withRetry(() =>
        apiClient.get(`products/${id}`)
      );

      const normalized = normalizeProduct(data);

      if (!normalized?.id) {
        throw new Error('Product not found');
      }

      setProduct(normalized);
      setUserRating(normalized.rating || 0);

      recordVisit(normalized);
      fetchRecommended();
    } catch (err) {
      console.error('Error fetching product details:', err);

      setProduct(null);
      setError(err);

      if (err?.response?.status === 404) {
        try {
          const key = 'visitedProducts';
          const raw = localStorage.getItem(key);

          if (raw) {
            const parsed = JSON.parse(raw);

            if (Array.isArray(parsed)) {
              const filtered = parsed.filter(
                item => item?.id !== id
              );

              localStorage.setItem(
                key,
                JSON.stringify(filtered)
              );
            }
          }
        } catch (storageError) {
          console.warn(
            'Unable to prune visitedProducts cache',
            storageError
          );
        }
      }
    } finally {
      setLoading(false);
    }
  }, [
    fetchRecommended,
    id,
    normalizeProduct,
    recordVisit,
  ]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const formatCategory = value => {
    if (typeof value !== 'string' || !value.length) {
      return 'Uncategorized';
    }

    return (
      value.charAt(0).toUpperCase() +
      value.slice(1)
    );
  };

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    addToCart(product);

    notify({
      severity: 'success',
      message: `${product.name} added to your cart.`,
    });
  }, [addToCart, notify, product]);

  const handleRatingChange = async (_event, newRating) => {
    if (!newRating) return;

    const previousRating = userRating;

    setUserRating(newRating);

    try {
      await apiClient.put(
        `products/${id}/rating`,
        { rating: newRating }
      );

      setProduct(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          rating: newRating,
          numReviews: (prev.numReviews || 0) + 1,
        };
      });

      notify({
        severity: 'success',
        message: 'Thanks for the feedback!',
      });
    } catch (err) {
      console.error(
        'Error updating rating:',
        err
      );

      setUserRating(previousRating);

      notify({
        severity: 'error',
        message: 'Could not update your rating right now.',
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '65vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress
            size={44}
            sx={{ color: GREEN }}
          />

          <Typography
            color="text.secondary"
            fontWeight={600}
          >
            Loading product...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container
        maxWidth="sm"
        sx={{ py: 12 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            textAlign: 'center',
            borderRadius: 5,
            border: '1px solid rgba(18,55,42,0.10)',
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              mx: 'auto',
              mb: 2,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: LIGHT_GREEN,
              color: GREEN,
            }}
          >
            <ShoppingBagOutlinedIcon fontSize="large" />
          </Box>

          <Typography
            variant="h4"
            fontWeight={800}
            gutterBottom
          >
            Product unavailable
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            This product may have been removed or is
            temporarily unavailable.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={fetchProduct}
              sx={{
                bgcolor: DARK_GREEN,
                '&:hover': {
                  bgcolor: GREEN,
                },
              }}
            >
              Try again
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/shop"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                borderColor: GREEN,
                color: GREEN,
              }}
            >
              Back to shop
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const isInStock = Number(product.stock) > 0;

  return (
    <Box
      sx={{
        background:
          'linear-gradient(180deg, #f8fbf9 0%, #ffffff 35%)',
        minHeight: '100vh',
        pb: 10,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ pt: { xs: 2, md: 4 } }}
      >
        {/* Breadcrumb */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Button
            size="small"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate('/shop')}
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
            }}
          >
            Back to shop
          </Button>

          <Typography color="text.disabled">
            /
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {formatCategory(product.category)}
          </Typography>
        </Stack>

        {/* Main product */}
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: { xs: 3, md: 5 },
            border: '1px solid rgba(18,55,42,0.09)',
            background: '#fff',
            boxShadow:
              '0 25px 70px rgba(18,55,42,0.08)',
          }}
        >
          <Grid container>
            {/* Product image */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background:
                  'radial-gradient(circle at 50% 35%, #ffffff 0%, #f2f7f4 70%, #e9f1ec 100%)',
              }}
            >
              <Box
                sx={{
                  minHeight: { xs: 360, md: 580 },
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  p: { xs: 4, md: 7 },
                }}
              >
                <Chip
                  icon={
                    <VerifiedRoundedIcon
                      sx={{ fontSize: 18 }}
                    />
                  }
                  label="Verified product"
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    bgcolor: '#fff',
                    color: DARK_GREEN,
                    fontWeight: 700,
                    border:
                      '1px solid rgba(18,55,42,0.12)',
                    boxShadow:
                      '0 8px 24px rgba(18,55,42,0.08)',
                  }}
                />

                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    maxWidth: 540,
                    maxHeight: { xs: 340, md: 500 },
                    objectFit: 'contain',
                    transition:
                      'transform 0.45s cubic-bezier(.22,1,.36,1)',
                    filter:
                      'drop-shadow(0 25px 30px rgba(18,55,42,0.13))',
                    '&:hover': {
                      transform: 'scale(1.04)',
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Product information */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: { xs: 3, sm: 4, md: 6 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ mb: 2 }}
                >
                  <Chip
                    label={formatCategory(product.category)}
                    size="small"
                    sx={{
                      bgcolor: LIGHT_GREEN,
                      color: DARK_GREEN,
                      fontWeight: 700,
                    }}
                  />

                  {product.brand && (
                    <Chip
                      label={product.brand}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor:
                          'rgba(18,55,42,0.18)',
                        color: DARK_GREEN,
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Stack>

                <Typography
                  variant="h2"
                  fontWeight={850}
                  sx={{
                    fontSize: {
                      xs: '2rem',
                      sm: '2.6rem',
                      md: '3.2rem',
                    },
                    lineHeight: 1.08,
                    letterSpacing: '-0.035em',
                    color: '#12251d',
                    mb: 2,
                  }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Rating
                    value={Number(userRating) || 0}
                    precision={0.5}
                    onChange={handleRatingChange}
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: GOLD,
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.secondary"
                  >
                    {Number(product.rating || 0).toFixed(1)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    ({product.numReviews || 0} reviews)
                  </Typography>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* Price */}
                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={1.5}
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant="h3"
                    fontWeight={850}
                    sx={{
                      color: DARK_GREEN,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    ${Number(product.price || 0).toFixed(2)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    inclusive of product pricing
                  </Typography>
                </Stack>

                {/* Stock */}
                <Box sx={{ mb: 3 }}>
                  <Chip
                    label={
                      isInStock
                        ? `${product.stock} available`
                        : 'Out of stock'
                    }
                    sx={{
                      bgcolor: isInStock
                        ? LIGHT_GREEN
                        : '#fff1f2',
                      color: isInStock
                        ? DARK_GREEN
                        : '#be123c',
                      fontWeight: 800,
                    }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.85,
                    fontSize: '1.02rem',
                    mb: 4,
                  }}
                >
                  {product.description}
                </Typography>

                {/* Add to cart */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={!isInStock}
                  startIcon={<ShoppingBagOutlinedIcon />}
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    py: 1.7,
                    borderRadius: 2.5,
                    bgcolor: DARK_GREEN,
                    fontSize: '1rem',
                    fontWeight: 800,
                    boxShadow:
                      '0 14px 30px rgba(18,55,42,0.22)',
                    '&:hover': {
                      bgcolor: GREEN,
                      boxShadow:
                        '0 18px 38px rgba(18,55,42,0.28)',
                    },
                    '&.Mui-disabled': {
                      bgcolor: '#d7ddd9',
                    },
                  }}
                >
                  {isInStock
                    ? 'Add to Cart'
                    : 'Currently Unavailable'}
                </Button>

                {/* Trust benefits */}
                <Grid
                  container
                  spacing={1.5}
                  sx={{ mt: 3 }}
                >
                  {[
                    {
                      icon: <LocalShippingOutlinedIcon />,
                      title: 'Fast delivery',
                      text: 'Reliable shipping',
                    },
                    {
                      icon: <SecurityOutlinedIcon />,
                      title: 'Secure checkout',
                      text: 'Protected payments',
                    },
                    {
                      icon: <WorkspacePremiumRoundedIcon />,
                      title: 'Quality assured',
                      text: 'Verified products',
                    },
                  ].map(item => (
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      key={item.title}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          height: '100%',
                          borderRadius: 2.5,
                          bgcolor: '#f8faf9',
                          border:
                            '1px solid rgba(18,55,42,0.07)',
                        }}
                      >
                        <Box
                          sx={{
                            color: GOLD,
                            display: 'flex',
                            mb: 0.5,
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Typography
                          variant="caption"
                          fontWeight={800}
                          display="block"
                          color={DARK_GREEN}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Product details strip */}
        <Grid
          container
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 4,
                border:
                  '1px solid rgba(18,55,42,0.08)',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: LIGHT_GREEN,
                    color: GREEN,
                  }}
                >
                  <LocalShippingOutlinedIcon />
                </Box>

                <Box>
                  <Typography fontWeight={800}>
                    Fast & reliable shipping
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Carefully packed and shipped to you.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 4,
                border:
                  '1px solid rgba(18,55,42,0.08)',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: '#fff8df',
                    color: GOLD,
                  }}
                >
                  <SecurityOutlinedIcon />
                </Box>

                <Box>
                  <Typography fontWeight={800}>
                    Secure shopping
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Your checkout stays protected.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 4,
                border:
                  '1px solid rgba(18,55,42,0.08)',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: '#fff8df',
                    color: GOLD,
                  }}
                >
                  <VerifiedRoundedIcon />
                </Box>

                <Box>
                  <Typography fontWeight={800}>
                    Authentic products
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Quality-first product selection.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Recommendations */}
        <Box sx={{ mt: 10 }}>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            justifyContent="space-between"
            alignItems={{
              xs: 'flex-start',
              sm: 'flex-end',
            }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: GOLD,
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                }}
              >
                Curated for you
              </Typography>

              <Typography
                variant="h4"
                fontWeight={850}
                sx={{
                  color: DARK_GREEN,
                  letterSpacing: '-0.025em',
                }}
              >
                You may also like
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Discover products similar to what you're viewing.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/shop"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                color: DARK_GREEN,
                fontWeight: 800,
              }}
            >
              Browse all
            </Button>
          </Stack>

          {recLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                py: 8,
              }}
            >
              <CircularProgress
                sx={{ color: GREEN }}
              />
            </Box>
          ) : recommended.length === 0 ? (
            similarError ? (
              <SimilarProductsError
                onRetry={fetchRecommended}
              />
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center',
                  border:
                    '1px solid rgba(18,55,42,0.08)',
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  We're still curating recommendations
                  for you. Check back soon.
                </Typography>
              </Paper>
            )
          ) : (
            <Grid container spacing={3}>
              {recommended.map(rec => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={rec.id}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      border:
                        '1px solid rgba(18,55,42,0.08)',
                      transition:
                        'transform .3s ease, box-shadow .3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow:
                          '0 20px 45px rgba(18,55,42,0.13)',
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() =>
                        navigate(
                          `/product/${rec.id}`
                        )
                      }
                      sx={{ height: '100%' }}
                    >
                      <Box
                        sx={{
                          bgcolor: '#f6faf7',
                          p: 2,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="210"
                          image={rec.image}
                          alt={rec.name}
                          sx={{
                            objectFit: 'contain',
                            transition:
                              'transform .3s ease',
                            '&:hover': {
                              transform: 'scale(1.04)',
                            },
                          }}
                        />
                      </Box>

                      <CardContent sx={{ p: 2.5 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={750}
                          gutterBottom
                          noWrap
                        >
                          {rec.name}
                        </Typography>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="h6"
                            fontWeight={850}
                            sx={{
                              color: DARK_GREEN,
                            }}
                          >
                            ${Number(
                              rec.price || 0
                            ).toFixed(2)}
                          </Typography>

                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: LIGHT_GREEN,
                              color: GREEN,
                              '&:hover': {
                                bgcolor: '#d9ecdf',
                              },
                            }}
                          >
                            <ArrowForwardRoundedIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ProductDetails;