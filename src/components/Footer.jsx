import * as React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Stack,
  TextField,
  IconButton,
  Divider,
  Chip,
  Tooltip,
  InputAdornment,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationSearchingRoundedIcon from '@mui/icons-material/LocationSearchingRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import { useNotifier } from '../context/NotificationProvider';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Support', to: '/support' },
  { label: 'Cart', to: '/cart' },
];

const helpLinks = [
  { label: 'Order Tracking', to: '/order-tracking' },
  { label: 'Shipping & Returns', to: '/shipping-returns' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'FAQ', to: '/support#faq' },
  { label: 'Contact Us', to: '/support#contact' },
];

const socialLinks = [
  {
    icon: <GitHubIcon fontSize="small" />,
    label: 'GitHub',
    href: 'https://github.com/Aryanbansal23',
  },
  {
    icon: <LinkedInIcon fontSize="small" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aryanadityabansal125/',
  },
  {
    icon: <LanguageRoundedIcon fontSize="small" />,
    label: 'Portfolio',
    href: 'https://portfolio-pi-dun-jxevqmxdyh.vercel.app/',
  },
  {
    icon: <EmailOutlinedIcon fontSize="small" />,
    label: 'Email',
    href: 'mailto:aryanbansal125@gmail.com',
  },
];

const policyLinks = [
  {
    label: 'Privacy',
    to: '/privacy',
    icon: <PrivacyTipOutlinedIcon fontSize="small" />,
  },
  {
    label: 'Terms',
    to: '/terms',
    icon: <GavelRoundedIcon fontSize="small" />,
  },
  {
    label: 'Shipping',
    to: '/shipping-returns',
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
  },
  {
    label: 'Track Order',
    to: '/order-tracking',
    icon: <LocationSearchingRoundedIcon fontSize="small" />,
  },
  {
    label: 'Contact',
    to: '/support#contact',
    icon: <SupportAgentRoundedIcon fontSize="small" />,
  },
];

function Footer() {
  const [email, setEmail] = React.useState('');
  const { notify } = useNotifier();

  const handleSubmit = event => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      notify({
        severity: 'warning',
        message: 'Please enter your email address.',
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      notify({
        severity: 'warning',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    notify({
      severity: 'success',
      message: 'Welcome to the VoldiMart insider list!',
    });

    setEmail('');
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        position: 'relative',
        overflow: 'hidden',
        color: '#f8fafc',
        background:
          'linear-gradient(135deg, #061c16 0%, #0a2f25 45%, #062119 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.35)',
      }}
    >
      {/* Premium gold glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -250,
          right: -180,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.03) 45%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top decorative line */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: { xs: 2, md: 4 },
          pt: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.55))',
          }}
        />

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            color: '#f6cf72',
            border: '1px solid rgba(212,175,55,0.65)',
            background: 'rgba(212,175,55,0.08)',
            boxShadow: '0 0 25px rgba(212,175,55,0.14)',
          }}
        >
          <AutoAwesomeRoundedIcon />
        </Box>

        <Box
          sx={{
            flex: 1,
            height: '1px',
            background:
              'linear-gradient(90deg, rgba(212,175,55,0.55), transparent)',
          }}
        />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: { xs: 5, md: 7 },
        }}
      >
        <Grid container spacing={{ xs: 5, md: 4 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2.2}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    color: '#f3c969',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  VoldiMart
                </Typography>

                <Box
                  sx={{
                    width: 62,
                    height: 2,
                    mt: 1.2,
                    borderRadius: 10,
                    background:
                      'linear-gradient(90deg, #d4af37 0%, #f6cf72 100%)',
                  }}
                />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 380,
                  color: 'rgba(226,232,240,0.82)',
                  lineHeight: 1.8,
                }}
              >
                Curating cutting-edge gadgets, smart home essentials, and
                premium accessories to help you live smarter every day.
              </Typography>

              <Stack direction="row" spacing={1.2}>
                {socialLinks.map(link => (
                  <Tooltip key={link.label} title={link.label} arrow>
                    <IconButton
                      component="a"
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      sx={{
                        width: 44,
                        height: 44,
                        color: '#f6cf72',
                        border: '1px solid rgba(212,175,55,0.45)',
                        background: 'rgba(255,255,255,0.025)',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          color: '#081d16',
                          background: '#f3c969',
                          borderColor: '#f3c969',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 24px rgba(212,175,55,0.22)',
                        },
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: '#caa84f',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                }}
              >
                Ideas ✦ Innovation ✦ Smarter Tomorrow
              </Typography>
            </Stack>
          </Grid>

          {/* Explore */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#f3d17b',
                mb: 2.5,
                fontFamily: 'Georgia, serif',
              }}
            >
              Explore
            </Typography>

            <Stack spacing={1.35}>
              {quickLinks.map(link => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  sx={{
                    width: 'fit-content',
                    color: 'rgba(226,232,240,0.78)',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#f3c969',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Customer Care */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#f3d17b',
                mb: 2.5,
                fontFamily: 'Georgia, serif',
              }}
            >
              Customer Care
            </Typography>

            <Stack spacing={1.35}>
              {helpLinks.map(link => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  sx={{
                    width: 'fit-content',
                    color: 'rgba(226,232,240,0.78)',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#f3c969',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#f3d17b',
                    mb: 1,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Join the Insider List
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(226,232,240,0.78)',
                    lineHeight: 1.7,
                  }}
                >
                  Unlock early access to product drops, curated buying guides,
                  and exclusive VIP offers.
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  width: '100%',
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  border: '1px solid rgba(212,175,55,0.45)',
                  background: 'rgba(0,0,0,0.15)',
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon
                          sx={{
                            color: '#d4af37',
                            fontSize: 20,
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    px: 1.5,
                    '& input': {
                      color: '#fff',
                      py: 1.4,
                    },
                    '& input::placeholder': {
                      color: 'rgba(226,232,240,0.45)',
                      opacity: 1,
                    },
                  }}
                />

                <IconButton
                  type="submit"
                  aria-label="Subscribe"
                  sx={{
                    m: 0.5,
                    width: 46,
                    height: 42,
                    borderRadius: 2,
                    color: '#10251c',
                    background:
                      'linear-gradient(135deg, #d4af37 0%, #f6cf72 100%)',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #e2bd4c 0%, #ffe39a 100%)',
                    },
                  }}
                >
                  <SendRoundedIcon fontSize="small" />
                </IconButton>
              </Box>

              <Chip
                label="We respect your inbox"
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  color: 'rgba(243,209,123,0.9)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  background: 'rgba(212,175,55,0.06)',
                }}
              />
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: { xs: 5, md: 6 },
            borderColor: 'rgba(212,175,55,0.3)',
          }}
        />

        {/* Bottom section */}
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', lg: 'center' }}
            spacing={2}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(226,232,240,0.7)',
              }}
            >
              © {new Date().getFullYear()} VoldiMart. Crafted with passion by
              Aryan Bansal.
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1}
              justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}
            >
              {policyLinks.map(link => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.6,
                    px: 1.1,
                    py: 0.7,
                    borderRadius: 1.5,
                    color: 'rgba(226,232,240,0.72)',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#f3c969',
                      background: 'rgba(212,175,55,0.08)',
                    },
                  }}
                >
                  {link.icon}
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Stack>

          <Box
            sx={{
              height: 2,
              borderRadius: 10,
              background:
                'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f6cf72 50%, #d4af37 70%, transparent 100%)',
              opacity: 0.7,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;