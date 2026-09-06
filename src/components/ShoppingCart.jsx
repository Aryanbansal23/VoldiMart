import * as React from 'react';

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Typography,
  Divider,
  Box,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const PAGE_BG = '#F7FAF7';

function ShoppingCart({ cart, setCart }) {
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Box
      sx={{
        minHeight: '75vh',
        background: PAGE_BG,
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{
              color: GOLD_DARK,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            YOUR BAG
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mt: 0.5,
              fontWeight: 900,
              color: DARK_GREEN,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Shopping Cart
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: 'text.secondary',
              fontSize: '1rem',
            }}
          >
            Review your selected products before checkout.
          </Typography>
        </Box>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              py: 8,
              px: 3,
              textAlign: 'center',
              borderRadius: 4,
              border: `1px solid ${GOLD}35`,
              background:
                'linear-gradient(145deg, #ffffff 0%, #f8fbf8 100%)',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${GOLD}18`,
                color: GOLD_DARK,
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 40 }} />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: DARK_GREEN,
                mb: 1,
              }}
            >
              Your cart is empty
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Looks like you haven't added anything yet.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate('/shop')}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                px: 3,
                py: 1.3,
                borderRadius: 2.5,
                fontWeight: 800,
                textTransform: 'none',
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
                color: DARK_GREEN,
                boxShadow: `0 8px 24px ${GOLD}40`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                  boxShadow: `0 10px 28px ${GOLD}55`,
                },
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 330px',
              },
              gap: 3,
              alignItems: 'start',
            }}
          >
            {/* Cart Items */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: `1px solid ${GOLD}30`,
                background: '#fff',
              }}
            >
              <Box
                sx={{
                  px: { xs: 2, md: 3 },
                  py: 2,
                  background: DARK_GREEN,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                  }}
                >
                  Cart Items
                </Typography>

                <Chip
                  label={`${cart.length} ${cart.length === 1 ? 'Item' : 'Items'}`}
                  size="small"
                  sx={{
                    background: `${GOLD}20`,
                    color: GOLD,
                    border: `1px solid ${GOLD}55`,
                    fontWeight: 700,
                  }}
                />
              </Box>

              <List sx={{ p: 0 }}>
                {cart.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      sx={{
                        px: { xs: 2, md: 3 },
                        py: 2.5,
                        display: 'flex',
                        gap: 1,
                        transition: 'background 0.2s ease',
                        '&:hover': {
                          background: '#F7FAF7',
                        },
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: 75 }}>
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          variant="rounded"
                          sx={{
                            width: 62,
                            height: 62,
                            borderRadius: 2,
                            border: `1px solid ${GOLD}35`,
                            background: '#f5f8f5',
                          }}
                        />
                      </ListItemAvatar>

                      <ListItemText
                        sx={{
                          mr: 1,
                          minWidth: 0,
                        }}
                        primary={
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: DARK_GREEN,
                              fontSize: { xs: '0.95rem', md: '1rem' },
                            }}
                          >
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            component="span"
                            sx={{
                              display: 'block',
                              mt: 0.5,
                              fontWeight: 800,
                              color: GOLD_DARK,
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                        }
                      />

                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        sx={{
                          color: '#a94442',
                          border: '1px solid #a9444230',
                          borderRadius: 2,
                          '&:hover': {
                            color: '#8b2927',
                            background: '#a9444210',
                            borderColor: '#a9444255',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>

                    {index < cart.length - 1 && (
                      <Divider
                        sx={{
                          borderColor: `${GOLD}18`,
                          mx: { xs: 2, md: 3 },
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            {/* Order Summary */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                border: `1px solid ${GOLD}35`,
                overflow: 'hidden',
                background: '#fff',
                position: { md: 'sticky' },
                top: { md: 90 },
              }}
            >
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${DARK_GREEN}, #1a513b)`,
                  px: 3,
                  py: 2.5,
                }}
              >
                <Typography
                  sx={{
                    color: GOLD,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                  }}
                >
                  ORDER SUMMARY
                </Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography color="text.secondary">
                    Subtotal
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: DARK_GREEN,
                    }}
                  >
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography color="text.secondary">
                    Shipping
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: GREEN,
                    }}
                  >
                    FREE
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    my: 2,
                    borderColor: `${GOLD}30`,
                  }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: DARK_GREEN,
                      fontSize: '1.1rem',
                    }}
                  >
                    Total
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: GOLD_DARK,
                      fontSize: '1.4rem',
                    }}
                  >
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCheckout}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2.5,
                    fontWeight: 900,
                    textTransform: 'none',
                    fontSize: '1rem',
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
                    color: DARK_GREEN,
                    boxShadow: `0 8px 24px ${GOLD}35`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                      boxShadow: `0 10px 30px ${GOLD}50`,
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  fullWidth
                  onClick={() => navigate('/shop')}
                  sx={{
                    mt: 1,
                    py: 1,
                    borderRadius: 2,
                    color: GREEN,
                    fontWeight: 700,
                    textTransform: 'none',
                    '&:hover': {
                      background: `${GREEN}08`,
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ShoppingCart;