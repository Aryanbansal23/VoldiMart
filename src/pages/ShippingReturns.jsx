import * as React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ReplayIcon from '@mui/icons-material/Replay';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

const shippingSteps = [
  {
    title: 'Order confirmed',
    icon: <VerifiedIcon sx={{ color: GREEN }} fontSize="small" />,
    summary:
      'Inventory is allocated instantly and you receive your confirmation email with the FE order number.',
    details: [
      'Payment is verified in real time to lock in limited-release items.',
      'Any personalised engraving or bundle notes are routed to the production queue.',
    ],
  },
  {
    title: 'Packed at our HQ',
    icon: <ChecklistIcon sx={{ color: GREEN }} fontSize="small" />,
    summary:
      'Products move through our smart line for protective packaging and quality checks.',
    details: [
      'Technicians run diagnostics on smart devices and capture serial numbers for your warranty locker.',
      'Impact-tested packaging and climate inserts are added based on the gear in your cart.',
    ],
  },
  {
    title: 'In transit',
    icon: (
      <AirportShuttleIcon
        sx={{ color: GREEN }}
        fontSize="small"
      />
    ),
    summary:
      'The carrier begins the journey and hands off milestone scans to your tracking dashboard.',
    details: [
      'You receive SMS/email updates for each hub the parcel visits.',
      'Need a delivery hold? Reply to any notification and our concierge will coordinate it for you.',
    ],
  },
  {
    title: 'Out for delivery',
    icon: <HomeIcon sx={{ color: GREEN }} fontSize="small" />,
    summary:
      'The final courier run happens and proof of delivery is captured where available.',
    details: [
      'Choose doorstep, mailroom, or signature-required drop-offs in the tracking portal.',
      'We keep a delivery photo on file for 14 days in case you need additional verification.',
    ],
  },
];

function ShippingReturns() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: LIGHT_BG,
        py: { xs: 5, md: 9 },
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
          bottom: -140,
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
          spacing={2.5}
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
            label="SHIPPING & RETURNS"
            sx={{
              height: 38,
              px: 1,
              fontWeight: 800,
              letterSpacing: 1.3,
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
                xs: '2rem',
                sm: '2.6rem',
                md: '3.3rem',
              },
              lineHeight: 1.15,
              maxWidth: 850,
            }}
          >
            From Our Warehouse to Your{' '}
            <Box
              component="span"
              sx={{
                color: GOLD_DARK,
              }}
            >
              Setup
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 700,
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
            }}
          >
            Precision logistics, proactive updates, and a
            no-drama return policy make gearing up with VoldiMart
            effortless.
          </Typography>
        </Stack>

        {/* Delivery cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                background: '#fff',
                border:
                  '1px solid rgba(18,60,43,0.10)',
                boxShadow:
                  '0 18px 45px rgba(18,60,43,0.08)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow:
                    '0 24px 55px rgba(18,60,43,0.13)',
                  borderColor:
                    'rgba(212,175,55,0.35)',
                },
              }}
            >
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        'rgba(31,111,80,0.08)',
                      border:
                        '1px solid rgba(31,111,80,0.14)',
                    }}
                  >
                    <LocalShippingIcon
                      sx={{
                        fontSize: 32,
                        color: GREEN,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: DARK_GREEN,
                    }}
                  >
                    Fast, insured delivery
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Orders ship within 24 hours on business days.
                  We partner with UPS Premier, FedEx Priority,
                  and DHL Express to guarantee rapid, insured
                  delivery in over 190 markets.
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Tracking links are sent automatically via email
                  and SMS. Preferred delivery windows are
                  available in select metro areas—look for the
                  “white glove” badge at checkout.
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    mt: 'auto',
                    p: 1.5,
                    borderRadius: 2.5,
                    background:
                      'rgba(212,175,55,0.08)',
                    border:
                      '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  <SecurityIcon
                    sx={{
                      color: GOLD_DARK,
                      fontSize: 20,
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color: DARK_GREEN,
                      fontWeight: 700,
                    }}
                  >
                    Secure & insured shipments
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                background: '#fff',
                border:
                  '1px solid rgba(18,60,43,0.10)',
                boxShadow:
                  '0 18px 45px rgba(18,60,43,0.08)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow:
                    '0 24px 55px rgba(18,60,43,0.13)',
                  borderColor:
                    'rgba(212,175,55,0.35)',
                },
              }}
            >
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        'rgba(212,175,55,0.10)',
                      border:
                        '1px solid rgba(212,175,55,0.22)',
                    }}
                  >
                    <FlightTakeoffIcon
                      sx={{
                        fontSize: 32,
                        color: GOLD_DARK,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: DARK_GREEN,
                    }}
                  >
                    International ready
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Duties and taxes are calculated and paid up
                  front for most destinations, eliminating
                  surprise fees at delivery. For remote regions we
                  ship via consolidated weekly flights to ensure
                  consistent timelines.
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Need expedited delivery for a launch or event?
                  Contact Support and our logistics desk will
                  orchestrate the best route.
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    mt: 'auto',
                    p: 1.5,
                    borderRadius: 2.5,
                    background: LIGHT_BG,
                    border:
                      '1px solid rgba(31,111,80,0.12)',
                  }}
                >
                  <PublicIcon
                    sx={{
                      color: GREEN,
                      fontSize: 20,
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color: DARK_GREEN,
                      fontWeight: 700,
                    }}
                  >
                    Global delivery coverage
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Packaging & returns */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            background: '#fff',
            border:
              '1px solid rgba(18,60,43,0.10)',
            boxShadow:
              '0 18px 50px rgba(18,60,43,0.08)',
          }}
        >
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'rgba(31,111,80,0.08)',
                  border:
                    '1px solid rgba(31,111,80,0.14)',
                }}
              >
                <Inventory2Icon
                  sx={{
                    fontSize: 31,
                    color: GREEN,
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: DARK_GREEN,
                }}
              >
                Packaging that protects
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              Every shipment leaves our facility with
              impact-tested packaging and tamper seals. If your
              gear arrives damaged, document it within 48 hours
              and we will handle the claim end-to-end.
            </Typography>

            <Divider />

            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <ReplayIcon
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
                  Our return promise
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                }}
              >
                Returns are simple. Initiate a return within 30
                days for a prepaid label. Refunds are issued 2-3
                business days after inspection. Exchanges ship
                immediately subject to inventory availability.
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                }}
              >
                For bundles or limited releases, we offer instant
                store credit so you can pick an alternative
                without waiting for payment processing.
              </Typography>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  background:
                    'rgba(212,175,55,0.08)',
                  border:
                    '1px solid rgba(212,175,55,0.2)',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <ReplayIcon
                    sx={{
                      color: GOLD_DARK,
                      fontSize: 20,
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color: DARK_GREEN,
                      fontWeight: 700,
                      lineHeight: 1.6,
                    }}
                  >
                    Pro tip: keep original packaging for the
                    smoothest return experience.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        {/* Journey */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            background: '#fff',
            border:
              '1px solid rgba(18,60,43,0.10)',
            boxShadow:
              '0 18px 50px rgba(18,60,43,0.08)',
          }}
        >
          <Stack spacing={1}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: DARK_GREEN,
              }}
            >
              Standard delivery journey
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 2,
                lineHeight: 1.7,
              }}
            >
              Tap any milestone to see what happens behind the
              scenes and how we keep you updated.
            </Typography>
          </Stack>

          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {shippingSteps.map((step, index) => (
              <Accordion
                key={step.title}
                disableGutters
                elevation={0}
                sx={{
                  borderRadius: '12px !important',
                  overflow: 'hidden',
                  border:
                    '1px solid rgba(18,60,43,0.10)',
                  background: LIGHT_BG,
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    borderColor:
                      'rgba(212,175,55,0.35)',
                    background: '#fff',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: GREEN,
                      }}
                    />
                  }
                  sx={{
                    px: { xs: 2, md: 2.5 },
                    minHeight: 64,
                    '&.Mui-expanded': {
                      minHeight: 64,
                    },
                    '& .MuiAccordionSummary-content': {
                      my: 1.5,
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                  >
                    <Chip
                      label={index + 1}
                      size="small"
                      sx={{
                        minWidth: 30,
                        height: 30,
                        fontWeight: 900,
                        color: DARK_GREEN,
                        background:
                          'rgba(212,175,55,0.16)',
                        border:
                          '1px solid rgba(212,175,55,0.35)',
                      }}
                    />

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {step.icon}

                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 800,
                          color: DARK_GREEN,
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Box>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: { xs: 2, md: 2.5 },
                    pb: 3,
                    pt: 0,
                  }}
                >
                  <Box
                    sx={{
                      ml: { xs: 0, md: 5.5 },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mb: 2,
                        lineHeight: 1.8,
                      }}
                    >
                      {step.summary}
                    </Typography>

                    <Stack
                      component="ul"
                      spacing={1.2}
                      sx={{
                        pl: 2.5,
                        m: 0,
                      }}
                    >
                      {step.details.map(detail => (
                        <Typography
                          component="li"
                          variant="body2"
                          color="text.secondary"
                          key={detail}
                          sx={{
                            lineHeight: 1.7,
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Paper>

        {/* Bottom trust strip */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${DARK_GREEN}, #0d2d21)`,
            textAlign: 'center',
            border:
              '1px solid rgba(212,175,55,0.25)',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems="center"
            justifyContent="center"
          >
            <VerifiedIcon
              sx={{
                color: GOLD,
                fontSize: 24,
              }}
            />

            <Typography
              sx={{
                color: '#fff',
                fontWeight: 700,
              }}
            >
              Reliable delivery. Simple returns. Premium
              experience.
            </Typography>
          </Stack>
        </Box>

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

export default ShippingReturns;