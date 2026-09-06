import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';

function formatDate(dateString) {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return null;
  }
}

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const fallbackMeta = React.useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('fusionLastOrder'));
      return stored || null;
    } catch (error) {
      return null;
    }
  }, []);

  const stateMeta = location.state || {};

  const orderNumber =
    stateMeta.orderNumber || fallbackMeta?.orderNumber;

  const email = stateMeta.email || fallbackMeta?.email;

  const estimatedDelivery = stateMeta.estimatedDelivery;

  const items = Array.isArray(stateMeta.items)
    ? stateMeta.items
    : [];

  const total =
    typeof stateMeta.total === 'number'
      ? stateMeta.total
      : null;

  const formattedETA = formatDate(estimatedDelivery);

  const handleTrackOrder = () => {
    if (!orderNumber || !email) {
      navigate('/order-tracking');
      return;
    }

    const params = new URLSearchParams({
      orderNumber,
      email,
    }).toString();

    navigate(`/order-tracking?${params}`);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: '#F7FAF7',
        py: { xs: 5, md: 8 },
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: `1px solid rgba(212,175,55,0.12)`,
          top: -160,
          right: -100,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '50%',
          border: `1px solid rgba(18,60,43,0.08)`,
          bottom: -120,
          left: -100,
        }}
      />

      <Box
        sx={{
          maxWidth: 720,
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: 5,
            border: '1px solid rgba(18,60,43,0.10)',
            background: '#fff',
            boxShadow: '0 25px 70px rgba(18,60,43,0.12)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${DARK_GREEN} 0%, #0d2d21 100%)`,
              px: { xs: 3, md: 6 },
              py: { xs: 5, md: 6 },
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 180,
                height: 180,
                borderRadius: '50%',
                border: '1px solid rgba(212,175,55,0.12)',
                top: -100,
                left: -70,
              }}
            />

            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  mx: 'auto',
                  mb: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(212,175,55,0.12)',
                  border: `2px solid ${GOLD}`,
                  boxShadow: `0 0 35px rgba(212,175,55,0.18)`,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize: 58,
                    color: GOLD,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  color: GOLD,
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  mb: 1,
                }}
              >
                Order Confirmed
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  mb: 1.5,
                }}
              >
                Thank You!
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  maxWidth: 500,
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                Your order has been placed successfully. We're
                getting everything ready for you.
              </Typography>
            </Box>
          </Box>

          {/* Main content */}
          <Box
            sx={{
              p: { xs: 3, md: 5 },
            }}
          >
            {orderNumber && (
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Chip
                  label={`Order #${orderNumber}`}
                  sx={{
                    height: 38,
                    px: 1,
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: DARK_GREEN,
                    background: 'rgba(212,175,55,0.16)',
                    border: `1px solid rgba(212,175,55,0.5)`,
                  }}
                />

                {email && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                    }}
                  >
                    Confirmation sent to{' '}
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: DARK_GREEN,
                      }}
                    >
                      {email}
                    </Box>
                  </Typography>
                )}

                {formattedETA && (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      background: 'rgba(31,111,80,0.07)',
                    }}
                  >
                    <LocalShippingIcon
                      sx={{
                        color: GREEN,
                        fontSize: 20,
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        color: DARK_GREEN,
                        fontWeight: 700,
                      }}
                    >
                      Estimated delivery: {formattedETA}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            )}

            {/* Items */}
            {items.length > 0 && (
              <Box
                sx={{
                  textAlign: 'left',
                  mb: 4,
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  background: '#F7FAF7',
                  border: '1px solid rgba(18,60,43,0.08)',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <ShoppingBagOutlinedIcon
                    sx={{ color: GOLD_DARK }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: DARK_GREEN,
                    }}
                  >
                    Items in this shipment
                  </Typography>
                </Stack>

                <List dense disablePadding>
                  {items.map((item, index) => (
                    <React.Fragment
                      key={`${item.productId}-${item.name}-${index}`}
                    >
                      <ListItem
                        disableGutters
                        sx={{
                          py: 1.2,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: '#1f2937',
                              }}
                            >
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                              }}
                            >
                              Qty {item.quantity} • $
                              {Number(item.price || 0).toFixed(2)}
                            </Typography>
                          }
                        />
                      </ListItem>

                      {index < items.length - 1 && (
                        <Divider />
                      )}
                    </React.Fragment>
                  ))}
                </List>

                {typeof total === 'number' && (
                  <>
                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: DARK_GREEN,
                        }}
                      >
                        Order Total
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 900,
                          color: GREEN,
                        }}
                      >
                        ${total.toFixed(2)}
                      </Typography>
                    </Stack>
                  </>
                )}
              </Box>
            )}

            {/* Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent="center"
            >
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/shop')}
                sx={{
                  px: 3,
                  py: 1.4,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  textTransform: 'none',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${GREEN}, ${DARK_GREEN})`,
                  boxShadow:
                    '0 8px 20px rgba(18,60,43,0.20)',
                  '&:hover': {
                    background: DARK_GREEN,
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Continue Shopping
              </Button>

              <Button
                variant="outlined"
                onClick={handleTrackOrder}
                sx={{
                  px: 3,
                  py: 1.4,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  textTransform: 'none',
                  color: DARK_GREEN,
                  borderColor: GREEN,
                  '&:hover': {
                    borderColor: GOLD_DARK,
                    background: 'rgba(212,175,55,0.06)',
                  },
                }}
              >
                Track Order
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate('/support')}
                sx={{
                  px: 3,
                  py: 1.4,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  textTransform: 'none',
                  color: GOLD_DARK,
                  borderColor: 'rgba(212,175,55,0.65)',
                  '&:hover': {
                    borderColor: GOLD,
                    background: 'rgba(212,175,55,0.07)',
                  },
                }}
              >
                Need Support?
              </Button>
            </Stack>
          </Box>
        </Paper>

        <Typography
          sx={{
            textAlign: 'center',
            mt: 3,
            fontSize: '0.75rem',
            letterSpacing: 1.5,
            color: 'rgba(18,60,43,0.5)',
            fontWeight: 700,
          }}
        >
          VOLDIMART • PREMIUM SHOPPING
        </Typography>
      </Box>
    </Box>
  );
}

export default OrderSuccess;