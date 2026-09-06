import * as React from 'react';

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Tooltip,
  Divider,
} from '@mui/material';

import ReplayIcon from '@mui/icons-material/Replay';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useSearchParams } from 'react-router-dom';
import { useNotifier } from '../context/NotificationProvider';
import { apiClient, withRetry } from '../services/apiClient';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

const fallbackFlow = [
  {
    code: 'ORDER_PLACED',
    label: 'Order placed',
    description: 'We received your order and secured the inventory.',
  },
  {
    code: 'PAYMENT_VERIFIED',
    label: 'Payment verified',
    description: 'Payment cleared securely and your order is locked in.',
  },
  {
    code: 'PICKING_ITEMS',
    label: 'Picking items',
    description:
      'Fulfillment specialists are pulling your products from the shelves.',
  },
  {
    code: 'PACKED_FOR_SHIPMENT',
    label: 'Packed for shipment',
    description:
      'Everything is sealed with tamper protection and ready for carrier pickup.',
  },
  {
    code: 'HANDOFF_TO_CARRIER',
    label: 'Handed to carrier',
    description:
      'Carrier has scanned the parcel and left our facility.',
  },
  {
    code: 'IN_TRANSIT',
    label: 'In transit',
    description:
      'The shipment is moving through regional hubs on the way to you.',
  },
  {
    code: 'AT_LOCAL_DEPOT',
    label: 'Arrived locally',
    description:
      'Package is at your local distribution center awaiting final sort.',
  },
  {
    code: 'OUT_FOR_DELIVERY',
    label: 'Out for delivery',
    description:
      'A courier is heading your way with the package on board.',
  },
  {
    code: 'DELIVERED',
    label: 'Delivered',
    description:
      'The courier marked the parcel as delivered. Enjoy your new gear!',
  },
  {
    code: 'DELIVERY_CONFIRMED',
    label: 'Delivery verified',
    description:
      'Delivery confirmation logged with proof for your records.',
  },
];

const iconBase = {
  fontSize: 24,
  color: GREEN,
};

const successIconBase = {
  ...iconBase,
  color: GOLD_DARK,
};

const statusIcons = {
  ORDER_PLACED: <InventoryIcon sx={iconBase} />,
  PAYMENT_VERIFIED: <HandshakeIcon sx={iconBase} />,
  PICKING_ITEMS: <WarehouseIcon sx={iconBase} />,
  QUALITY_CHECK: <QueryBuilderIcon sx={iconBase} />,
  PACKED_FOR_SHIPMENT: <InventoryIcon sx={iconBase} />,
  HANDOFF_TO_CARRIER: <DeliveryDiningIcon sx={iconBase} />,
  IN_TRANSIT: <LocalShippingIcon sx={iconBase} />,
  AT_LOCAL_DEPOT: <WarehouseIcon sx={iconBase} />,
  OUT_FOR_DELIVERY: <HomeIcon sx={iconBase} />,
  DELIVERED: <CheckCircleOutlineIcon sx={successIconBase} />,
  DELIVERY_CONFIRMED: <CheckCircleOutlineIcon sx={successIconBase} />,
};

const defaultIcon = <QueryBuilderIcon sx={iconBase} />;

const getStatusIcon = (code, size = 24) => {
  const baseIcon = statusIcons[code] || defaultIcon;

  return React.cloneElement(baseIcon, {
    sx: {
      ...(baseIcon.props.sx || {}),
      fontSize: size,
    },
  });
};

const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;

function formatTimestamp(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    return '';
  }
}

function OrderTracking() {
  const { notify } = useNotifier();
  const [searchParams] = useSearchParams();

  const lastOrder = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('fusionLastOrder')) || {};
    } catch (error) {
      return {};
    }
  }, []);

  const initialForm = React.useMemo(() => {
    const paramOrderNumber = searchParams.get('orderNumber') || '';
    const paramEmail = searchParams.get('email') || '';

    return {
      orderNumber:
        paramOrderNumber || lastOrder.orderNumber || '',
      email: paramEmail || lastOrder.email || '',
    };
  }, [lastOrder.email, lastOrder.orderNumber, searchParams]);

  const [form, setForm] = React.useState(initialForm);
  const [loading, setLoading] = React.useState(false);
  const [trackingData, setTrackingData] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const fetchTracking = React.useCallback(
    async (payload, { silent = false } = {}) => {
      const sanitizedOrderNumber =
        payload.orderNumber?.trim().toUpperCase();

      const sanitizedEmail =
        payload.email?.trim().toLowerCase();

      if (!sanitizedOrderNumber || !sanitizedEmail) {
        notify({
          severity: 'warning',
          message:
            'Enter both your email and order number to continue.',
        });
        return;
      }

      if (!emailPattern.test(sanitizedEmail)) {
        notify({
          severity: 'warning',
          message:
            'Enter a valid email associated with the order.',
        });
        return;
      }

      setLoading(true);
      setErrorMessage('');

      if (!silent) {
        notify({
          severity: 'info',
          message: 'Fetching your order status…',
          autoHideDuration: 2000,
        });
      }

      try {
        const { data } = await withRetry(() =>
          apiClient.post('orders/track', {
            orderNumber: sanitizedOrderNumber,
            email: sanitizedEmail,
          })
        );

        setTrackingData(data);

        try {
          localStorage.setItem(
            'fusionLastOrder',
            JSON.stringify({
              orderNumber: data.orderNumber,
              email: data.email,
            })
          );
        } catch (storageError) {
          console.warn(
            'Unable to persist last order reference',
            storageError
          );
        }

        if (!silent && data?.currentStatus?.label) {
          notify({
            severity: 'success',
            message: `Status updated: ${data.currentStatus.label}`,
          });
        }
      } catch (error) {
        console.error('Error fetching order status:', error);

        const message =
          error?.response?.data?.error ||
          'We could not locate that order. Double-check the details and try again.';

        setErrorMessage(message);

        notify({
          severity: 'error',
          message,
        });
      } finally {
        setLoading(false);
      }
    },
    [notify]
  );

  React.useEffect(() => {
    setForm(initialForm);

    if (initialForm.orderNumber && initialForm.email) {
      fetchTracking(initialForm, { silent: true });
    }
  }, [fetchTracking, initialForm]);

  const handleChange = event => {
    const { name, value } = event.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchTracking(form);
  };

  const hasTracking = Boolean(trackingData);

  const activeFlow = React.useMemo(() => {
    if (!hasTracking) return [];

    const provided = trackingData?.statusFlow;

    if (Array.isArray(provided) && provided.length) {
      return provided;
    }

    return fallbackFlow;
  }, [hasTracking, trackingData]);

  const history = React.useMemo(() => {
    if (!hasTracking) return [];

    return trackingData?.statusHistory || [];
  }, [hasTracking, trackingData]);

  const historyMap = React.useMemo(() => {
    const entries = new Map();

    history.forEach(status => {
      entries.set(status.code, status);
    });

    return entries;
  }, [history]);

  const currentStatus = hasTracking
    ? trackingData?.currentStatus
    : null;

  const historyCodes = history.map(status => status.code);
  const activeCode = currentStatus?.code;

  const activeIndex = hasTracking
    ? activeFlow.findIndex(step => step.code === activeCode)
    : -1;

  const resolvedActiveIndex = hasTracking
    ? activeIndex >= 0
      ? activeIndex
      : Math.max(historyCodes.length - 1, 0)
    : -1;

  const stepperActiveIndex =
    resolvedActiveIndex >= 0
      ? resolvedActiveIndex
      : 0;

  const renderStatusAvatar = React.useCallback(
    (code, isActive) => {
      const iconElement = getStatusIcon(code, 22);

      return (
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            alignSelf: 'center',
            background: isActive
              ? 'rgba(212,175,55,0.14)'
              : 'rgba(31,111,80,0.08)',
            border: isActive
              ? `2px solid ${GOLD}`
              : '1px solid rgba(31,111,80,0.15)',
            boxShadow: isActive
              ? '0 6px 20px rgba(212,175,55,0.18)'
              : 'none',
          }}
        >
          {iconElement}
        </Box>
      );
    },
    []
  );

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: LIGHT_BG,
        py: { xs: 5, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          width: 360,
          height: 360,
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.10)',
          top: -180,
          right: -100,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          border: '1px solid rgba(18,60,43,0.07)',
          bottom: -130,
          left: -100,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Hero */}
        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
          sx={{ mb: 5 }}
        >
          <Chip
            icon={
              <LocalShippingIcon
                sx={{
                  color: `${GOLD} !important`,
                }}
              />
            }
            label="ORDER TRACKING"
            sx={{
              px: 1,
              py: 0.5,
              height: 38,
              fontWeight: 800,
              letterSpacing: 1.2,
              color: DARK_GREEN,
              background: 'rgba(212,175,55,0.12)',
              border: `1px solid rgba(212,175,55,0.4)`,
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: DARK_GREEN,
              fontSize: {
                xs: '2.1rem',
                sm: '2.7rem',
                md: '3.4rem',
              },
              lineHeight: 1.1,
            }}
          >
            Track Your{' '}
            <Box
              component="span"
              sx={{
                color: GOLD_DARK,
              }}
            >
              Order
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 680,
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
            }}
          >
            Get real-time visibility from checkout to doorstep.
            Enter your order details below to see every step of
            your delivery journey.
          </Typography>
        </Stack>

        {/* Search Card */}
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: 5,
            border: '1px solid rgba(18,60,43,0.10)',
            background: '#fff',
            boxShadow: '0 20px 55px rgba(18,60,43,0.10)',
            mb: 5,
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${DARK_GREEN}, #0d2d21)`,
              px: { xs: 3, md: 5 },
              py: 3,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(212,175,55,0.14)',
                  border: `1px solid rgba(212,175,55,0.35)`,
                }}
              >
                <SearchIcon sx={{ color: GOLD }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}
                >
                  Find your order
                </Typography>

                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '0.8rem',
                  }}
                >
                  Enter the details used during checkout
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2.2}>
                    <TextField
                      label="Order number"
                      name="orderNumber"
                      value={form.orderNumber}
                      onChange={handleChange}
                      placeholder="e.g. FE-482019"
                      required
                      fullWidth
                      InputProps={{
                        sx: {
                          textTransform: 'uppercase',
                          borderRadius: 2,
                        },
                      }}
                      sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: GREEN,
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: GREEN,
                          },
                      }}
                    />

                    <TextField
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="you@example.com"
                      required
                      fullWidth
                      sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: GREEN,
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: GREEN,
                          },
                      }}
                    />

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={<SearchIcon />}
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
                          },
                        }}
                      >
                        {loading
                          ? 'Updating…'
                          : 'Track My Order'}
                      </Button>

                      {trackingData && (
                        <Tooltip title="Refresh status" arrow>
                          <IconButton
                            onClick={() => fetchTracking(form)}
                            disabled={loading}
                            sx={{
                              width: 46,
                              height: 46,
                              color: GREEN,
                              border: `1px solid rgba(31,111,80,0.25)`,
                              '&:hover': {
                                color: GOLD_DARK,
                                background:
                                  'rgba(212,175,55,0.08)',
                              },
                            }}
                          >
                            <ReplayIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      Having trouble locating your ID? Search
                      your inbox for the subject{' '}
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 700,
                          color: DARK_GREEN,
                        }}
                      >
                        “VoldiMart Order Confirmation”
                      </Box>
                      .
                    </Typography>
                  </Stack>
                </form>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    background: LIGHT_BG,
                    border: '1px solid rgba(18,60,43,0.08)',
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <SupportAgentIcon
                        sx={{ color: GOLD_DARK }}
                      />

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: DARK_GREEN,
                        }}
                      >
                        Concierge Assistance
                      </Typography>
                    </Stack>

                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      For delivery holds, reroutes, or signature
                      requests, reach out to our logistics team and
                      we will coordinate directly with the carrier.
                    </Typography>

                    <Divider />

                    <Typography
                      variant="body2"
                      sx={{
                        color: DARK_GREEN,
                        fontWeight: 700,
                      }}
                    >
                      support@voldimart.com
                    </Typography>

                    {trackingData?.estimatedDelivery && (
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background:
                            'rgba(212,175,55,0.10)',
                          border: `1px solid rgba(212,175,55,0.22)`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: GOLD_DARK,
                            fontWeight: 800,
                          }}
                        >
                          ESTIMATED DELIVERY
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.3,
                            color: DARK_GREEN,
                            fontWeight: 700,
                          }}
                        >
                          {formatTimestamp(
                            trackingData.estimatedDelivery
                          )}
                        </Typography>
                      </Box>
                    )}

                    {errorMessage && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#b42318',
                          fontWeight: 600,
                        }}
                      >
                        {errorMessage}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Journey */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            background: '#fff',
            border: '1px solid rgba(18,60,43,0.10)',
            boxShadow: '0 18px 50px rgba(18,60,43,0.08)',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <VerifiedIcon
                sx={{
                  color: GOLD_DARK,
                  fontSize: 27,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: DARK_GREEN,
                }}
              >
                {hasTracking
                  ? 'Live Order Journey'
                  : 'What to Expect Along the Way'}
              </Typography>
            </Stack>

            {trackingData?.orderNumber && (
              <Chip
                label={`Order #${trackingData.orderNumber}`}
                sx={{
                  color: DARK_GREEN,
                  fontWeight: 700,
                  border: `1px solid rgba(212,175,55,0.5)`,
                  background: 'rgba(212,175,55,0.08)',
                }}
              />
            )}
          </Stack>

          {hasTracking ? (
            <Stepper
              orientation="vertical"
              activeStep={stepperActiveIndex}
              sx={{
                '& .MuiStepConnector-line': {
                  borderColor: 'rgba(31,111,80,0.18)',
                },
              }}
            >
              {activeFlow.map((step, index) => {
                const statusEntry = historyMap.get(step.code);

                const isActive =
                  index === resolvedActiveIndex;

                const completed =
                  index < resolvedActiveIndex;

                return (
                  <Step
                    key={step.code || step.label}
                    completed={completed}
                  >
                    <StepLabel
                      slotProps={{
                        iconContainer: {
                          sx: {
                            display: 'none',
                          },
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                        sx={{
                          py: 0.8,
                        }}
                      >
                        {renderStatusAvatar(
                          step.code,
                          isActive || completed
                        )}

                        <Box sx={{ pt: 0.3 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 800,
                              color: isActive
                                ? GOLD_DARK
                                : completed
                                ? GREEN
                                : '#1f2937',
                            }}
                          >
                            {step.label}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              lineHeight: 1.6,
                              mt: 0.3,
                            }}
                          >
                            {step.description}
                          </Typography>

                          {statusEntry?.enteredAt && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                mt: 0.7,
                                color: GREEN,
                                fontWeight: 600,
                              }}
                            >
                              Updated{' '}
                              {formatTimestamp(
                                statusEntry.enteredAt
                              )}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          ) : (
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                background: LIGHT_BG,
                border: '1px dashed rgba(31,111,80,0.25)',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  background: 'rgba(212,175,55,0.12)',
                }}
              >
                <LocalShippingIcon
                  sx={{
                    color: GOLD_DARK,
                    fontSize: 30,
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: DARK_GREEN,
                  mb: 1,
                }}
              >
                Ready when you are
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 620,
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                Enter your order number and the email used at
                checkout to unlock real-time tracking. Once we
                locate your order, the full journey timeline will
                appear here with live updates.
              </Typography>
            </Box>
          )}
        </Paper>

        {/* History */}
        {hasTracking && history.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mt: 5,
              p: { xs: 3, md: 5 },
              borderRadius: 5,
              background: '#fff',
              border: '1px solid rgba(18,60,43,0.10)',
              boxShadow:
                '0 18px 50px rgba(18,60,43,0.07)',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <QueryBuilderIcon
                sx={{
                  color: GOLD_DARK,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: DARK_GREEN,
                }}
              >
                Recent Status Updates
              </Typography>
            </Stack>

            <List dense disablePadding>
              {[...history].reverse().map((status, index) => (
                <React.Fragment
                  key={`${status.code}-${status.enteredAt}`}
                >
                  <ListItem
                    disableGutters
                    sx={{
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                          'rgba(31,111,80,0.08)',
                        flexShrink: 0,
                      }}
                    >
                      {getStatusIcon(status.code, 20)}
                    </Box>

                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: DARK_GREEN,
                          }}
                        >
                          {status.label}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.6,
                          }}
                        >
                          {formatTimestamp(
                            status.enteredAt
                          )}{' '}
                          • {status.description}
                        </Typography>
                      }
                    />
                  </ListItem>

                  {index < history.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        )}

        <Typography
          sx={{
            textAlign: 'center',
            mt: 4,
            fontSize: '0.75rem',
            letterSpacing: 1.5,
            color: 'rgba(18,60,43,0.45)',
            fontWeight: 700,
          }}
        >
          VOLDIMART • PREMIUM SHOPPING
        </Typography>
      </Container>
    </Box>
  );
}

export default OrderTracking;