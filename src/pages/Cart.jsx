import React from 'react';

import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Typography,
  Divider,
  Paper,
  Stack,
  Box,
  Chip,
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import { useNavigate } from 'react-router-dom';
import { useNotifier } from '../context/NotificationProvider';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const { notify } = useNotifier();

  const removeFromCart = productId => {
    setCart(cart.filter(item => item.id !== productId));

    notify({
      severity: 'info',
      message: 'Removed from cart.',
    });
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => {
      const price =
        typeof item.price === 'number' ? item.price : 0;

      return total + price;
    }, 0);

  const handleCheckout = () => {
    if (!cart.length) {
      notify({
        severity: 'warning',
        message: 'Add items before checking out.',
      });
      return;
    }

    navigate('/checkout');
  };

  const total = calculateTotal();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #F7FAF7 0%, #FFFFFF 55%, #F9F8F2 100%)',
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          justifyContent="space-between"
          alignItems={{
            xs: 'flex-start',
            sm: 'center',
          }}
          spacing={2}
          sx={{
            py: {
              xs: 3,
              md: 5,
            },
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: '#B08D20',
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              VOLDIMART
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#123C2B',
                letterSpacing: '-0.03em',
                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },
              }}
            >
              Your Cart
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mt: 0.5,
              }}
            >
              Everything you've picked, ready when you are.
            </Typography>
          </Box>

          <Chip
            icon={
              <ShoppingBagIcon
                sx={{
                  color: '#D4AF37 !important',
                }}
              />
            }
            label={`${cart.length} ${
              cart.length === 1 ? 'item' : 'items'
            }`}
            sx={{
              px: 1,
              py: 2.2,
              borderRadius: 3,
              fontWeight: 700,
              color: '#123C2B',
              backgroundColor: '#FFFFFF',
              border:
                '1px solid rgba(31,111,80,0.18)',
              boxShadow:
                '0 8px 25px rgba(18,60,43,0.06)',
            }}
          />
        </Stack>

        {/* EMPTY CART */}

        {cart.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 4,
                md: 8,
              },
              textAlign: 'center',
              borderRadius: 5,
              border:
                '1px solid rgba(31,111,80,0.12)',
              backgroundColor: '#FFFFFF',
              boxShadow:
                '0 20px 50px rgba(18,60,43,0.07)',
            }}
          >
            <Box
              sx={{
                width: 90,
                height: 90,
                mx: 'auto',
                mb: 3,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background:
                  'linear-gradient(135deg, #123C2B, #2F8A63)',
                boxShadow:
                  '0 15px 35px rgba(31,111,80,0.25)',
              }}
            >
              <ShoppingBagIcon
                sx={{
                  fontSize: 42,
                  color: '#D4AF37',
                }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#123C2B',
                mb: 1,
              }}
            >
              Your cart is waiting
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 480,
                mx: 'auto',
                mb: 3,
              }}
            >
              Your shopping bag is currently empty.
              Explore our latest gadgets and find something
              worth bringing home.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/shop')}
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: 2.5,
                background:
                  'linear-gradient(135deg, #1F6F50, #2F8A63)',
                boxShadow:
                  '0 12px 28px rgba(31,111,80,0.25)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #16513B, #246B4D)',
                },
              }}
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 340px',
              },
              gap: 3,
              alignItems: 'start',
            }}
          >
            {/* CART ITEMS */}

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 1.5,
                  md: 3,
                },
                borderRadius: 5,
                border:
                  '1px solid rgba(31,111,80,0.12)',
                backgroundColor: '#FFFFFF',
                boxShadow:
                  '0 15px 40px rgba(18,60,43,0.06)',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  px: {
                    xs: 1,
                    md: 1.5,
                  },
                  pb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{
                    color: '#123C2B',
                  }}
                >
                  Cart Items
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {cart.length} selected
                </Typography>
              </Stack>

              <Divider
                sx={{
                  borderColor:
                    'rgba(31,111,80,0.1)',
                }}
              />

              <List sx={{ py: 0 }}>
                {cart.map((item, index) => (
                  <React.Fragment
                    key={item.id || item._id || index}
                  >
                    <ListItem
                      disableGutters
                      sx={{
                        py: 2.5,
                        px: {
                          xs: 1,
                          md: 1.5,
                        },
                        alignItems: 'center',
                      }}
                    >
                      <ListItemAvatar
                        sx={{
                          minWidth: {
                            xs: 70,
                            sm: 90,
                          },
                        }}
                      >
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          variant="rounded"
                          sx={{
                            width: {
                              xs: 58,
                              sm: 72,
                            },
                            height: {
                              xs: 58,
                              sm: 72,
                            },
                            borderRadius: 2.5,
                            backgroundColor: '#F3F6F4',
                            border:
                              '1px solid rgba(31,111,80,0.1)',
                          }}
                        />
                      </ListItemAvatar>

                      <ListItemText
                        sx={{
                          mr: {
                            xs: 1,
                            sm: 2,
                          },
                        }}
                        primary={
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              color: '#123C2B',
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
                              display: 'block',
                              mt: 0.5,
                              color: '#B08D20',
                              fontWeight: 800,
                            }}
                          >
                            $
                            {typeof item.price === 'number'
                              ? item.price.toFixed(2)
                              : 'Price not available'}
                          </Typography>
                        }
                      />

                      <Button
                        onClick={() =>
                          removeFromCart(
                            item.id || item._id
                          )
                        }
                        startIcon={
                          <DeleteOutlineIcon />
                        }
                        color="error"
                        size="small"
                        sx={{
                          minWidth: 'auto',
                          borderRadius: 2,
                          fontWeight: 600,
                          px: {
                            xs: 1,
                            sm: 1.5,
                          },
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            display: {
                              xs: 'none',
                              sm: 'inline',
                            },
                          }}
                        >
                          Remove
                        </Box>
                      </Button>
                    </ListItem>

                    {index < cart.length - 1 && (
                      <Divider
                        component="li"
                        sx={{
                          borderColor:
                            'rgba(31,111,80,0.08)',
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </List>

              <Divider
                sx={{
                  my: 2,
                  borderColor:
                    'rgba(31,111,80,0.1)',
                }}
              />

              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/shop')}
                sx={{
                  color: '#1F6F50',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor:
                      'rgba(31,111,80,0.06)',
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Paper>

            {/* ORDER SUMMARY */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                position: {
                  md: 'sticky',
                },
                top: 100,
                color: '#FFFFFF',
                background:
                  'linear-gradient(145deg, #123C2B 0%, #1F6F50 100%)',
                border:
                  '1px solid rgba(212,175,55,0.25)',
                boxShadow:
                  '0 20px 45px rgba(18,60,43,0.2)',
                overflow: 'hidden',
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: '#D4AF37',
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                ORDER SUMMARY
              </Typography>

              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  mt: 0.5,
                  mb: 3,
                }}
              >
                Ready to checkout?
              </Typography>

              <Stack
                spacing={2}
                sx={{
                  mb: 3,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      color:
                        'rgba(255,255,255,0.7)',
                    }}
                  >
                    Items
                  </Typography>

                  <Typography fontWeight={600}>
                    {cart.length}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      color:
                        'rgba(255,255,255,0.7)',
                    }}
                  >
                    Shipping
                  </Typography>

                  <Typography
                    sx={{
                      color: '#D4AF37',
                      fontWeight: 700,
                    }}
                  >
                    FREE
                  </Typography>
                </Stack>

                <Divider
                  sx={{
                    borderColor:
                      'rgba(255,255,255,0.15)',
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={700}>
                    Total
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      color: '#D4AF37',
                      fontWeight: 800,
                    }}
                  >
                    ${total.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={handleCheckout}
                sx={{
                  py: 1.5,
                  borderRadius: 2.5,
                  background:
                    'linear-gradient(135deg, #D4AF37, #E5C45A)',
                  color: '#123C2B',
                  fontWeight: 800,
                  boxShadow:
                    '0 12px 30px rgba(212,175,55,0.25)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #C29D27, #D4AF37)',
                  },
                }}
              >
                Proceed to Checkout
              </Button>

              <Stack
                spacing={1.5}
                sx={{
                  mt: 3,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <LocalShippingOutlinedIcon
                    sx={{
                      color: '#D4AF37',
                      fontSize: 20,
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        'rgba(255,255,255,0.72)',
                    }}
                  >
                    Fast and reliable delivery
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <SecurityIcon
                    sx={{
                      color: '#D4AF37',
                      fontSize: 20,
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        'rgba(255,255,255,0.72)',
                    }}
                  >
                    Secure checkout & payment
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Cart;