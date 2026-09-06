import * as React from 'react';

import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid,
  Paper,
  Stack,
  Chip,
  Box,
  Divider,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShieldIcon from '@mui/icons-material/Shield';
import VerifiedIcon from '@mui/icons-material/Verified';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

import { useNotifier } from '../context/NotificationProvider';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

const faqs = [
  {
    question: 'How quickly do you ship orders?',
    answer:
      'Orders placed before 2 PM local warehouse time ship the same day. US orders arrive in 2 business days, international orders within 4-7 days.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'You have 30 days from delivery to initiate a return. We provide prepaid labels and instant store credit or refunds back to your original payment method.',
  },
  {
    question: 'Do products come with warranties?',
    answer:
      'Most of our gear includes a 1-year manufacturer warranty. For Fusion-branded collections we extend that to 24 months automatically.',
  },
  {
    question: 'Can I speak with a product specialist before ordering?',
    answer:
      'Absolutely. Book a complimentary 15-minute virtual consult with our team to get tailored recommendations.',
  },
  {
    question: 'Do you offer setup or installation support?',
    answer:
      'Yes. Our concierge partners cover in-home setup in 180+ metro areas. Let us know your ZIP code in the contact form and we will coordinate scheduling.',
  },
  {
    question: 'Can I finance my purchase?',
    answer:
      'We partner with Affirm and Klarna to provide flexible financing at checkout. Most approvals happen instantly with 0% APR promotional plans available.',
  },
  {
    question: 'Will you price match other retailers?',
    answer:
      'If you find an identical product in stock at an authorized retailer within 14 days of purchase, reach out with the link and we will match it.',
  },
  {
    question: 'How can I see the status of my support ticket?',
    answer:
      'Every request receives a confirmation email with a tracking number. Reply to that thread or log into your dashboard to see updates in real time.',
  },
];

function Support() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const { notify } = useNotifier();

  const handleChange = event => {
    const { name, value } = event.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const topic = form.topic.trim();
    const message = form.message.trim();

    if (!name || !email || !topic || !message) {
      notify({
        severity: 'warning',
        message: 'Please complete all required fields.',
      });
      return;
    }

    const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;

    if (!emailPattern.test(email)) {
      notify({
        severity: 'warning',
        message:
          'Enter a valid email address so we can respond.',
      });
      return;
    }

    notify({
      severity: 'info',
      message: 'Submitting your request…',
      autoHideDuration: 2200,
    });

    setTimeout(() => {
      notify({
        severity: 'success',
        message:
          'Contact request submitted! A specialist will reach out within 24 hours.',
      });
    }, 350);

    setForm({
      name: '',
      email: '',
      topic: '',
      message: '',
    });
  };

  React.useEffect(() => {
    const { hash } = window.location;

    if (!hash || hash === '#faq') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const targetId = hash.replace('#', '');

    const scrollToSection = () => {
      const node = document.getElementById(targetId);

      if (node) {
        const offset = 96;

        const nodeTop =
          node.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        window.scrollTo({
          top: nodeTop,
          behavior: 'smooth',
        });
      }
    };

    const timeout = window.setTimeout(
      scrollToSection,
      120
    );

    return () => window.clearTimeout(timeout);
  }, []);

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
          bottom: -140,
          left: -100,
        }}
      />

      <Container
        maxWidth="lg"
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
          sx={{
            mb: 6,
          }}
        >
          <Chip
            icon={
              <SupportAgentIcon
                sx={{
                  color: `${GOLD} !important`,
                }}
              />
            }
            label="NEED A HAND?"
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
                xs: '2.1rem',
                sm: '2.7rem',
                md: '3.5rem',
              },
              lineHeight: 1.1,
            }}
          >
            Support That Feels{' '}
            <Box
              component="span"
              sx={{
                color: GOLD_DARK,
              }}
            >
              Human
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 680,
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: {
                xs: '0.95rem',
                md: '1.05rem',
              },
            }}
          >
            Whether you have a delivery question or want help
            planning your dream setup, our specialists are on
            standby.
          </Typography>
        </Stack>

        {/* Support cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} id="orders">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
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
                    '0 25px 55px rgba(18,60,43,0.13)',
                  borderColor:
                    'rgba(212,175,55,0.35)',
                },
              }}
            >
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    width: 58,
                    height: 58,
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
                  <PhoneForwardedIcon
                    sx={{
                      fontSize: 32,
                      color: GOLD_DARK,
                    }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: DARK_GREEN,
                  }}
                >
                  Concierge hotline
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Call +1 (833) 555-0195 from 7 AM – 11 PM PST,
                  7 days a week. We’ll resolve most issues on the
                  spot.
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} id="shipping">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
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
                    '0 25px 55px rgba(18,60,43,0.13)',
                  borderColor:
                    'rgba(212,175,55,0.35)',
                },
              }}
            >
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    width: 58,
                    height: 58,
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
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: DARK_GREEN,
                  }}
                >
                  Delivery & tracking
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Track your order in real time from the Orders
                  dashboard. Text updates available in the US, EU,
                  and APAC regions.
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} id="privacy">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
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
                    '0 25px 55px rgba(18,60,43,0.13)',
                  borderColor:
                    'rgba(212,175,55,0.35)',
                },
              }}
            >
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    width: 58,
                    height: 58,
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
                  <ShieldIcon
                    sx={{
                      fontSize: 32,
                      color: GREEN,
                    }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: DARK_GREEN,
                  }}
                >
                  Privacy first
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  We never sell personal data. Review our full
                  privacy brief and security protocols anytime.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* FAQ */}
        <Box
          id="faq"
          sx={{
            mt: { xs: 7, md: 9 },
            mb: 3,
          }}
        >
          <Stack spacing={1.2}>
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'rgba(212,175,55,0.10)',
                  border:
                    '1px solid rgba(212,175,55,0.22)',
                }}
              >
                <MessageOutlinedIcon
                  sx={{
                    color: GOLD_DARK,
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: DARK_GREEN,
                }}
              >
                Frequently asked questions
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.7,
              }}
            >
              Quick answers to common questions about orders,
              shipping, and returns.
            </Typography>
          </Stack>
        </Box>

        <Stack spacing={1.5}>
          {faqs.map((item, index) => (
            <Accordion
              key={item.question}
              disableGutters
              elevation={0}
              sx={{
                borderRadius: '14px !important',
                overflow: 'hidden',
                border:
                  '1px solid rgba(18,60,43,0.10)',
                background: '#fff',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  borderColor:
                    'rgba(212,175,55,0.35)',
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
                  px: { xs: 2, md: 3 },
                  py: 0.8,
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    gap: 1.5,
                  },
                }}
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
                      'rgba(212,175,55,0.12)',
                    border:
                      '1px solid rgba(212,175,55,0.28)',
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: DARK_GREEN,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: { xs: 2, md: 3 },
                  pb: 3,
                  pt: 0,
                }}
              >
                <Box
                  sx={{
                    ml: { xs: 0, md: 5.2 },
                    p: 2.5,
                    borderRadius: 2.5,
                    background: LIGHT_BG,
                    border:
                      '1px solid rgba(31,111,80,0.08)',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.8,
                    }}
                  >
                    {item.answer}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>

        {/* Contact */}
        <Paper
          id="contact"
          elevation={0}
          sx={{
            mt: { xs: 7, md: 9 },
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            overflow: 'hidden',
            background: '#fff',
            border:
              '1px solid rgba(18,60,43,0.10)',
            boxShadow:
              '0 22px 60px rgba(18,60,43,0.10)',
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={5}>
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                      'rgba(212,175,55,0.10)',
                    border:
                      '1px solid rgba(212,175,55,0.25)',
                  }}
                >
                  <SupportAgentIcon
                    sx={{
                      fontSize: 36,
                      color: GOLD_DARK,
                    }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: DARK_GREEN,
                  }}
                >
                  Send us a message
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  Drop your details and we’ll reach out within a
                  business day. Include links or screenshots if
                  you’re troubleshooting gear.
                </Typography>

                <Divider />

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <VerifiedIcon
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
                    Our specialists typically respond within 24
                    hours.
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={7}>
              <form
                onSubmit={handleSubmit}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: GREEN,
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: GREEN,
                          },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: GREEN,
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: GREEN,
                          },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Topic"
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      placeholder="Orders, returns, product advice"
                      fullWidth
                      required
                      sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: GREEN,
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: GREEN,
                          },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="How can we help?"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      fullWidth
                      required
                      sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: GREEN,
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: GREEN,
                          },
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<MessageOutlinedIcon />}
                  sx={{
                    mt: 3,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2.5,
                    fontWeight: 800,
                    textTransform: 'none',
                    color: '#fff',
                    background: `linear-gradient(135deg, ${GREEN}, ${DARK_GREEN})`,
                    boxShadow:
                      '0 10px 25px rgba(18,60,43,0.20)',
                    '&:hover': {
                      background: DARK_GREEN,
                      transform: 'translateY(-1px)',
                      boxShadow:
                        '0 14px 30px rgba(18,60,43,0.25)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Submit Request
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>

        {/* Bottom banner */}
        <Box
          sx={{
            mt: 5,
            p: 3,
            borderRadius: 4,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${DARK_GREEN}, #0d2d21)`,
            border:
              '1px solid rgba(212,175,55,0.25)',
          }}
        >
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 700,
            }}
          >
            Need help?{' '}
            <Box
              component="span"
              sx={{ color: GOLD }}
            >
              VoldiMart Support
            </Box>{' '}
            is here for you.
          </Typography>
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

export default Support;