import * as React from 'react';

import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

const termsSections = [
  {
    title: 'Using our platform',
    copy: 'VoldiMart delivers a curated digital storefront for premium consumer technology. By visiting our site you agree to engage respectfully, refrain from malicious activity, and only submit accurate personal details. Accounts may be suspended when suspicious behaviour is detected to keep the community safe.',
    icon: (
      <VerifiedUserIcon
        sx={{ fontSize: 34, color: GREEN }}
      />
    ),
  },
  {
    title: 'Orders, billing, and pricing',
    copy: 'Checkout totals are confirmed at the point of payment, inclusive of taxes and shipping where applicable. We reserve the right to cancel or refund orders in the rare case of pricing errors or inventory constraints. Any promotional pricing or bundles will state clear eligibility criteria.',
    icon: (
      <PaymentsIcon
        sx={{ fontSize: 34, color: GOLD_DARK }}
      />
    ),
  },
  {
    title: 'Shipping commitments',
    copy: 'Most in-stock products ship within one business day from our fulfillment hubs. Delivery timeframes shared at checkout are estimates subject to carrier performance. Please verify your shipping address carefully—undeliverable packages may incur reshipment fees.',
    icon: (
      <LocalShippingIcon
        sx={{ fontSize: 34, color: GREEN }}
      />
    ),
  },
  {
    title: 'Returns and exchanges',
    copy: 'We proudly stand behind the hardware we curate. Eligible products can be returned within 30 days of delivery so long as they remain in like-new condition with original packaging. Certain hygiene or final-sale items will be clearly marked as non-returnable before purchase.',
    icon: (
      <AutorenewIcon
        sx={{ fontSize: 34, color: GOLD_DARK }}
      />
    ),
  },
  {
    title: 'Support and escalation',
    copy: 'Our concierge team loves solving tough problems. If an issue arises, contact us through the Support Centre so we can document the details and provide a resolution timeline. Emergencies impacting device safety will always receive priority routing.',
    icon: (
      <SupportAgentIcon
        sx={{ fontSize: 34, color: GREEN }}
      />
    ),
  },
];

const responsibilities = [
  'Provide accurate account and billing details so orders arrive without delay.',
  'Respect intellectual property and only use site content for personal shopping.',
  'Notify us quickly if you believe your account has been accessed without permission.',
];

function Terms() {
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
              <GavelIcon
                sx={{
                  color: `${GOLD} !important`,
                }}
              />
            }
            label="TERMS OF SERVICE"
            sx={{
              height: 38,
              px: 1,
              fontWeight: 800,
              letterSpacing: 1.4,
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
            The Agreement That Powers Our{' '}
            <Box
              component="span"
              sx={{
                color: GOLD_DARK,
              }}
            >
              Partnership
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
            These terms ensure every VoldiMart order is handled
            with integrity, transparency, and the level of care
            you expect from a premium retailer.
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
            }}
          >
            Last updated: April 7, 2025
          </Typography>
        </Stack>

        {/* Terms card */}
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: 5,
            background: '#fff',
            border:
              '1px solid rgba(18,60,43,0.10)',
            boxShadow:
              '0 22px 60px rgba(18,60,43,0.10)',
          }}
        >
          {/* Card header */}
          <Box
            sx={{
              px: { xs: 3, md: 5 },
              py: 3,
              background: `linear-gradient(135deg, ${DARK_GREEN}, #0d2d21)`,
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <SecurityIcon
                sx={{
                  color: GOLD,
                  fontSize: 28,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                  }}
                >
                  VoldiMart Terms
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  Please review before using our platform
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              p: { xs: 3, md: 5 },
            }}
          >
            <Stack spacing={4}>
              {termsSections.map((section, index) => (
                <React.Fragment key={section.title}>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      sx={{
                        display: 'flex',
                        justifyContent: {
                          xs: 'center',
                          sm: 'center',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background:
                            index % 2 === 0
                              ? 'rgba(31,111,80,0.08)'
                              : 'rgba(212,175,55,0.10)',
                          border:
                            index % 2 === 0
                              ? '1px solid rgba(31,111,80,0.14)'
                              : '1px solid rgba(212,175,55,0.22)',
                        }}
                      >
                        {section.icon}
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: DARK_GREEN,
                          mb: 1,
                          textAlign: {
                            xs: 'center',
                            sm: 'left',
                          },
                        }}
                      >
                        {section.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.8,
                          textAlign: {
                            xs: 'center',
                            sm: 'left',
                          },
                        }}
                      >
                        {section.copy}
                      </Typography>
                    </Grid>
                  </Grid>

                  {index < termsSections.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}

              <Divider />

              {/* Responsibilities */}
              <Box>
                <Stack
                  direction="row"
                  spacing={1.2}
                  alignItems="center"
                  sx={{
                    mb: 2,
                  }}
                >
                  <GavelIcon
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
                    Your responsibilities
                  </Typography>
                </Stack>

                <List
                  dense
                  disablePadding
                  sx={{
                    pl: { xs: 0, md: 1 },
                  }}
                >
                  {responsibilities.map(responsibility => (
                    <ListItem
                      key={responsibility}
                      disableGutters
                      sx={{
                        alignItems: 'flex-start',
                        py: 1,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 34,
                          mt: 0.2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 23,
                            height: 23,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background:
                              'rgba(212,175,55,0.14)',
                          }}
                        >
                          <GavelIcon
                            sx={{
                              fontSize: 14,
                              color: GOLD_DARK,
                            }}
                          />
                        </Box>
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              lineHeight: 1.7,
                            }}
                          >
                            {responsibility}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Agreement note */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: LIGHT_BG,
                  border:
                    '1px solid rgba(31,111,80,0.10)',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                >
                  <VerifiedUserIcon
                    sx={{
                      color: GREEN,
                      mt: 0.2,
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: DARK_GREEN,
                      lineHeight: 1.7,
                      fontWeight: 600,
                    }}
                  >
                    By continuing to use VoldiMart, you
                    acknowledge that you have read and agree to
                    these terms of service.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Paper>

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

export default Terms;