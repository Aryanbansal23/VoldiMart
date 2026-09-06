import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CheckoutForm from '../components/CheckoutForm';

import {
  Typography,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Divider,
  Box,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
  Tooltip,
} from '@mui/material';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LockIcon from '@mui/icons-material/Lock';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SecurityIcon from '@mui/icons-material/Security';

import { useNotifier } from '../context/NotificationProvider';
import { apiClient, withRetry } from '../services/apiClient';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

function Checkout({ cartItems = [], onOrderComplete }) {
  const navigate = useNavigate();

  const [orderCreated, setOrderCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { notify } = useNotifier();
  const [showCartSummary, setShowCartSummary] = useState(false);

  const [selectedItems, setSelectedItems] = useState(() => {
    const defaults = cartItems
      .map((item) => item._id || item.id)
      .filter(Boolean);

    return new Set(defaults);
  });

  const handleSubmit = async (formData) => {
    if (!selectedItems.size) {
      notify({
        severity: 'warning',
        message: 'Select at least one item before checking out.',
      });
      return;
    }

    const itemsToPurchase = cartItems.filter((item) => {
      const id = item._id || item.id;
      return id && selectedItems.has(id);
    });

    if (!itemsToPurchase.length) {
      notify({
        severity: 'warning',
        message:
          'Selected items are unavailable. Please refresh your cart.',
      });
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const orderPayload = {
        ...formData,
        items: itemsToPurchase
          .map((item) => ({
            productId: item._id || item.id,
            quantity: item.quantity || 1,
          }))
          .filter((item) => item.productId),
      };

      if (!orderPayload.items.length) {
        setLoading(false);

        notify({
          severity: 'error',
          message:
            'Unable to place order: missing product information.',
        });

        return;
      }

      const { data } = await withRetry(() =>
        apiClient.post(
          'checkout/create-order',
          orderPayload
        )
      );

      const normalizedEmail = formData.email?.trim() || '';

      setLoading(false);
      setOrderCreated(true);

      onOrderComplete?.();

      if (data?.orderNumber) {
        try {
          localStorage.setItem(
            'fusionLastOrder',
            JSON.stringify({
              orderNumber: data.orderNumber,
              email: normalizedEmail,
            })
          );
        } catch (storageError) {
          console.warn(
            'Unable to persist last order reference',
            storageError
          );
        }
      }

      notify({
        severity: 'success',
        message:
          'Order placed successfully! Redirecting…',
      });

      navigate('/order-success', {
        state: {
          orderNumber: data?.orderNumber,
          email: normalizedEmail,
          estimatedDelivery: data?.estimatedDelivery,
          items: data?.items,
          total: data?.total,
        },
      });
    } catch (error) {
      console.error('Error creating order:', error);

      setLoading(false);

      const message =
        error?.response?.data?.error ||
        'Something went wrong while placing your order.';

      setErrorMessage(message);

      notify({
        severity: 'error',
        message,
      });
    }
  };

  const itemsToShow = cartItems.filter((item) => {
    const id = item._id || item.id;
    return id && selectedItems.has(id);
  });

  const total = itemsToShow.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) =>
      selectedItems.has(item._id || item.id)
    );

  const toggleItem = (id) => {
    if (!id) return;

    setSelectedItems((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const toggleAll = () => {
    setSelectedItems((prev) => {
      if (prev.size === cartItems.length) {
        return new Set();
      }

      return new Set(
        cartItems
          .map((item) => item._id || item.id)
          .filter(Boolean)
      );
    });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: LIGHT_BG,
        py: { xs: 4, md: 7 },
        pb: 10,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: 4,
            border:
              '1px solid rgba(18, 60, 43, 0.12)',
            boxShadow:
              '0 20px 60px rgba(18, 60, 43, 0.10)',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${DARK_GREEN}, ${GREEN})`,
              px: { xs: 3, md: 5 },
              py: { xs: 3.5, md: 4 },
              color: '#FFFFFF',
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    'rgba(212,175,55,0.12)',
                  border: `1px solid ${GOLD}`,
                  flexShrink: 0,
                }}
              >
                <ShoppingCartCheckoutIcon
                  sx={{
                    color: GOLD,
                    fontSize: 30,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: '-0.5px',
                  }}
                >
                  Checkout
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    color:
                      'rgba(255,255,255,0.75)',
                  }}
                >
                  {itemsToShow.length} item
                  {itemsToShow.length !== 1 ? 's' : ''}{' '}
                  selected
                  {' • '}
                  ${total.toFixed(2)} total
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              p: { xs: 3, md: 5 },
            }}
          >
            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  borderRadius: 3,
                  background:
                    'linear-gradient(135deg, #F5F9F6, #EEF5F0)',
                  border:
                    '1px solid rgba(18,60,43,0.10)',
                  overflow: 'hidden',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    p: 2,
                  }}
                >
                  <ShoppingBagIcon
                    sx={{
                      color: GOLD_DARK,
                    }}
                  />

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={800}
                      sx={{
                        color: DARK_GREEN,
                      }}
                    >
                      Your Items
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      {itemsToShow.length}/
                      {cartItems.length} selected
                    </Typography>
                  </Box>

                  <Tooltip
                    title={
                      allSelected
                        ? 'Deselect all items'
                        : 'Select all items'
                    }
                  >
                    <Checkbox
                      checked={allSelected}
                      indeterminate={
                        selectedItems.size > 0 &&
                        !allSelected
                      }
                      onChange={toggleAll}
                      sx={{
                        ml: 'auto',
                        color: GREEN,
                        '&.Mui-checked': {
                          color: GOLD_DARK,
                        },
                      }}
                    />
                  </Tooltip>

                  <IconButton
                    size="small"
                    onClick={() =>
                      setShowCartSummary(
                        (prev) => !prev
                      )
                    }
                    sx={{
                      color: DARK_GREEN,
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform: showCartSummary
                          ? 'rotate(180deg)'
                          : 'none',
                        transition:
                          'transform 0.2s ease',
                      }}
                    />
                  </IconButton>
                </Stack>

                <Collapse
                  in={showCartSummary}
                  timeout="auto"
                  unmountOnExit
                >
                  <Divider />

                  <List dense sx={{ px: 1, py: 1 }}>
                    {cartItems.map((item) => {
                      const id =
                        item._id || item.id;

                      if (!id) return null;

                      const checked =
                        selectedItems.has(id);

                      return (
                        <ListItem
                          key={id}
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              checked={checked}
                              onChange={() =>
                                toggleItem(id)
                              }
                              sx={{
                                color: GREEN,
                                '&.Mui-checked': {
                                  color: GOLD_DARK,
                                },
                              }}
                            />
                          }
                          sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            '&:hover': {
                              backgroundColor:
                                'rgba(18,60,43,0.04)',
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={item.image}
                              alt={item.name}
                              variant="rounded"
                              sx={{
                                border:
                                  '1px solid rgba(18,60,43,0.1)',
                              }}
                            />
                          </ListItemAvatar>

                          <ListItemText
                            primary={
                              <Typography
                                fontWeight={700}
                                sx={{
                                  color: DARK_GREEN,
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                sx={{
                                  color: GOLD_DARK,
                                  fontWeight: 700,
                                }}
                              >
                                $
                                {(item.price || 0).toFixed(
                                  2
                                )}
                              </Typography>
                            }
                          />
                        </ListItem>
                      );
                    })}

                    {selectedItems.size === 0 && (
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                color:
                                  'text.secondary',
                              }}
                            >
                              No items selected. Choose at
                              least one item to proceed.
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                  </List>
                </Collapse>
              </Paper>
            )}

            {/* Order Form */}
            {orderCreated ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 5,
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    mx: 'auto',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#EEF6F0',
                    border:
                      `2px solid ${GOLD}`,
                  }}
                >
                  <ShoppingBagIcon
                    sx={{
                      color: GOLD_DARK,
                      fontSize: 36,
                    }}
                  />
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{
                    color: DARK_GREEN,
                    mb: 1,
                  }}
                >
                  Thank you for your order!
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  You will be redirected shortly.
                </Typography>
              </Box>
            ) : (
              <>
                {loading && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <CircularProgress
                      size={30}
                      sx={{
                        color: GOLD_DARK,
                      }}
                    />
                  </Box>
                )}

                {errorMessage && (
                  <Box
                    sx={{
                      mb: 2,
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: '#FFF4F4',
                      border:
                        '1px solid #F1CACA',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#C62828',
                        fontWeight: 600,
                      }}
                    >
                      {errorMessage}
                    </Typography>
                  </Box>
                )}

                <CheckoutForm
                  onSubmit={handleSubmit}
                  submitting={loading}
                />

                {/* Security */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor:
                      'rgba(18,60,43,0.04)',
                    border:
                      '1px solid rgba(18,60,43,0.08)',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                  >
                    <SecurityIcon
                      sx={{
                        color: GOLD_DARK,
                      }}
                    />

                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          color: DARK_GREEN,
                        }}
                      >
                        Secure Checkout
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        Payments are processed securely.
                        We never store your card details.
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    mt: 2.5,
                    color: 'text.secondary',
                  }}
                >
                  <LockIcon fontSize="small" />

                  <Typography variant="caption">
                    Your information is protected with
                    secure encryption.
                  </Typography>
                </Stack>
              </>
            )}
          </Box>

          {/* Gold Bottom Line */}
          <Box
            sx={{
              height: 4,
              background: `linear-gradient(90deg, ${DARK_GREEN}, ${GOLD}, ${DARK_GREEN})`,
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default Checkout;