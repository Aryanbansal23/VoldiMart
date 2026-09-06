import * as React from 'react';

import {
  Box,
  Chip,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

const dataPractices = [
  {
    title: 'What we collect',
    body: 'Account details (name, email, password hash), shipping addresses, order history, and optional preferences when you opt into personalization.',
    icon: <AnalyticsIcon sx={{ fontSize: 32, color: GREEN }} />,
  },
  {
    title: 'How we protect it',
    body: 'All sensitive data is encrypted in transit and at rest. We partner with SOC 2 Type II certified providers and review access logs weekly.',
    icon: <LockIcon sx={{ fontSize: 32, color: GREEN }} />,
  },
  {
    title: 'Your controls',
    body: 'Export or delete your account anytime from the profile dashboard. Marketing preferences can be adjusted at the bottom of every email.',
    icon: (
      <SettingsBackupRestoreIcon
        sx={{ fontSize: 32, color: GREEN }}
      />
    ),
  },
];

function Privacy() {
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
      {/* Decorative circles */}
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
              <ShieldIcon
                sx={{
                  color: `${GOLD} !important`,
                }}
              />
            }
            label="PRIVACY POLICY"
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
              maxWidth: 800,
            }}
          >
            Your Trust Is the Most Valuable{' '}
            <Box
              component="span"
              sx={{
                color: GOLD_DARK,
              }}
            >
              Tech We Protect
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
            We collect only what we need to ship exceptional
            products and continuously improve the VoldiMart
            experience. The details below outline exactly how it
            works.
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

        {/* Main Privacy Card */}
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: 5,
            background: '#fff',
            border: '1px solid rgba(18,60,43,0.10)',
            boxShadow: '0 22px 60px rgba(18,60,43,0.10)',
          }}
        >
          {/* Security Header */}
          <Box
            sx={{
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
              background: `linear-gradient(135deg, ${DARK_GREEN} 0%, #0d2d21 100%)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '1px solid rgba(212,175,55,0.12)',
                top: -120,
                right: -70,
              }}
            />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Stack
                spacing={1}
                textAlign={{ xs: 'center', sm: 'left' }}
              >
                <Typography
                  sx={{
                    color: GOLD,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: 1.5,
                  }}
                >
                  YOUR DATA. YOUR CONTROL.
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                  }}
                >
                  Data lifecycle in plain English
                </Typography>

                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.7,
                    maxWidth: 570,
                  }}
                >
                  From checkout to delivery alerts, our systems
                  keep your information close and locked. We will
                  never sell or rent your personal data.
                </Typography>
              </Stack>

              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: 'rgba(212,175,55,0.12)',
                  border: `1px solid rgba(212,175,55,0.35)`,
                }}
              >
                <ShieldIcon
                  sx={{
                    fontSize: 48,
                    color: GOLD,
                  }}
                />
              </Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                mt: 3,
                height: 7,
                borderRadius: 5,
                background: 'rgba(255,255,255,0.12)',
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${GREEN}, ${GOLD})`,
                  borderRadius: 5,
                },
              }}
            />
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            {/* Data practices */}
            <Stack spacing={4}>
              {dataPractices.map((section, index) => (
                <React.Fragment key={section.title}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2.5}
                    alignItems={{
                      xs: 'center',
                      sm: 'flex-start',
                    }}
                    textAlign={{
                      xs: 'center',
                      sm: 'left',
                    }}
                  >
                    <Box
                      sx={{
                        width: 62,
                        height: 62,
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: 'rgba(31,111,80,0.08)',
                        border:
                          '1px solid rgba(31,111,80,0.14)',
                      }}
                    >
                      {section.icon}
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: DARK_GREEN,
                          mb: 0.7,
                        }}
                      >
                        {section.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.75,
                        }}
                      >
                        {section.body}
                      </Typography>
                    </Box>
                  </Stack>

                  {index < dataPractices.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}
            </Stack>

            <Divider sx={{ my: 5 }} />

            {/* Third party services */}
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
              >
                <VerifiedUserIcon
                  sx={{
                    color: GOLD_DARK,
                  }}
                />

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: DARK_GREEN,
                  }}
                >
                  Third-party services we rely on
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                }}
              >
                Trusted partners such as Stripe, Pinecone, and
                Google Cloud act as processors under strict data
                processing agreements. Only the bare minimum
                required to power payments, recommendations, or
                analytics is shared.
              </Typography>
            </Stack>

            <Divider sx={{ my: 5 }} />

            {/* Access / deletion */}
            <Stack spacing={2}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: DARK_GREEN,
                }}
              >
                Requesting access or deletion
              </Typography>

              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: LIGHT_BG,
                  border:
                    '1px solid rgba(18,60,43,0.08)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Email{' '}
                  <Box
                    component="span"
                    sx={{
                      color: GREEN,
                      fontWeight: 800,
                    }}
                  >
                    privacy@voldimart.com
                  </Box>{' '}
                  with the subject{' '}
                  <Box
                    component="span"
                    sx={{
                      color: DARK_GREEN,
                      fontWeight: 700,
                    }}
                  >
                    “Data Request”
                  </Box>{' '}
                  and our privacy desk will validate your identity
                  before fulfilling the request within 30 days.
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 5 }} />

            {/* Contact */}
            <Stack spacing={2.5}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: DARK_GREEN,
                }}
              >
                Questions about this policy?
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                }}
              >
                Reach out through the Support Centre or email{' '}
                <Box
                  component="span"
                  sx={{
                    color: GREEN,
                    fontWeight: 800,
                  }}
                >
                  privacy@voldimart.com
                </Box>{' '}
                so we can help.
              </Typography>

              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  background:
                    'rgba(212,175,55,0.08)',
                  border:
                    '1px solid rgba(212,175,55,0.2)',
                }}
              >
                <VisibilityOffIcon
                  sx={{
                    color: GOLD_DARK,
                    fontSize: 21,
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: DARK_GREEN,
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  We routinely review this policy to keep it
                  aligned with new regulations and features.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Paper>

        {/* Footer note */}
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
          VOLDIMART • YOUR PRIVACY MATTERS
        </Typography>
      </Container>
    </Box>
  );
}

export default Privacy;