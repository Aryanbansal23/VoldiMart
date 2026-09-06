import * as React from 'react';

import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Avatar,
  Divider,
  Box,
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';
const LIGHT_BG = '#F7FAF7';

const milestones = [
  {
    year: '2024',
    title: 'Launch',
    description:
      'Started VoldiMart with a mission to curate gear that empowers creators and everyday innovators.',
  },
  {
    year: '2025',
    title: 'Global Warehouses',
    description:
      'Opened regional fulfillment hubs in Austin, Berlin, and Singapore to ship faster than ever.',
  },
  {
    year: '2025',
    title: 'Creator Collective',
    description:
      'Introduced our invite-only creator program to co-design exclusive bundles and gear edits.',
  },
  {
    year: '2026',
    title: '50k+ Members',
    description:
      'Celebrated 50,000 VIP members and expanded our line to include modular smart home ecosystems.',
  },
];

const pillars = [
  {
    icon: <EmojiObjectsIcon fontSize="large" />,
    title: 'Curated Tech Intelligence',
    description:
      'Every product we list goes through hands-on testing by our lab team. If it doesn’t elevate your setup, it doesn’t make the cut.',
  },
  {
    icon: <PrecisionManufacturingIcon fontSize="large" />,
    title: 'Responsible Innovation',
    description:
      'We partner with makers focused on energy efficiency, recycled materials, and ethical manufacturing.',
  },
  {
    icon: <FavoriteBorderIcon fontSize="large" />,
    title: 'Delightful Experiences',
    description:
      'From packaging to post-purchase support, we obsess over surprise-and-delight moments that keep customers inspired.',
  },
  {
    icon: <RocketLaunchIcon fontSize="large" />,
    title: 'Future-Ready Roadmap',
    description:
      'We collaborate with venture labs and indie builders to pilot limited-run drops before they hit mainstream shelves.',
  },
];

function About() {
  return (
    <Box
      sx={{
        background: LIGHT_BG,
        minHeight: '100vh',
        pb: 10,
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${DARK_GREEN} 0%, ${GREEN} 65%, #2B7A5A 100%)`,
          color: '#FFFFFF',
          py: { xs: 7, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: `1px solid rgba(212,175,55,0.18)`,
            right: '-80px',
            top: '-100px',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '50%',
            border: `1px solid rgba(212,175,55,0.12)`,
            left: '-70px',
            bottom: '-80px',
          }}
        />

        <Container maxWidth="lg">
          <Stack
            spacing={2.5}
            alignItems="center"
            sx={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Chip
              icon={
                <AutoAwesomeIcon
                  sx={{
                    color: `${GOLD} !important`,
                  }}
                />
              }
              label="ABOUT VOLDIMART"
              sx={{
                color: GOLD,
                borderColor: GOLD,
                fontWeight: 800,
                letterSpacing: 1.2,
                backgroundColor: 'rgba(212,175,55,0.08)',
              }}
              variant="outlined"
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: '-1.5px',
                fontSize: {
                  xs: '2.3rem',
                  md: '4rem',
                },
              }}
            >
              We exist to help you
              <Box
                component="span"
                sx={{
                  color: GOLD,
                  display: { xs: 'block', md: 'inline' },
                  ml: { md: 1 },
                }}
              >
                curate the future.
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 760,
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.9,
                fontSize: '1.05rem',
              }}
            >
              VoldiMart is a collective of engineers, industrial designers,
              and experience strategists. We scout the highest performing
              gadgets, stress-test them in our lab, and package them into
              delightful experiences so you can focus on creating.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Pillars */}
        <Box sx={{ mt: { xs: 5, md: 7 } }}>
          <Stack
            spacing={1}
            sx={{
              mb: 4,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: GOLD_DARK,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              WHAT DRIVES US
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: DARK_GREEN,
              }}
            >
              Built around better choices
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {pillars.map((pillar) => (
              <Grid
                item
                xs={12}
                md={6}
                key={pillar.title}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    height: '100%',
                    border:
                      '1px solid rgba(18, 60, 43, 0.1)',
                    backgroundColor: '#FFFFFF',
                    transition:
                      'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow:
                        '0 16px 35px rgba(18,60,43,0.12)',
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2.5}
                    alignItems="flex-start"
                  >
                    <Avatar
                      sx={{
                        width: 58,
                        height: 58,
                        flexShrink: 0,
                        bgcolor: DARK_GREEN,
                        color: GOLD,
                        border:
                          `1px solid ${GOLD}`,
                      }}
                    >
                      {pillar.icon}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                          color: DARK_GREEN,
                          mb: 1,
                        }}
                      >
                        {pillar.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.8,
                        }}
                      >
                        {pillar.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Journey */}
        <Box sx={{ mt: { xs: 7, md: 10 } }}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: GOLD_DARK,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              OUR STORY
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: DARK_GREEN,
              }}
            >
              Our Journey
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
              }}
            >
              From humble beginnings to a global community of builders,
              here’s how we’ve evolved.
            </Typography>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border:
                '1px solid rgba(18, 60, 43, 0.1)',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Grid container spacing={4}>
              {milestones.map((step, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={step.year}
                >
                  <Stack spacing={1.5}>
                    <Chip
                      label={step.year}
                      sx={{
                        alignSelf: 'flex-start',
                        backgroundColor: DARK_GREEN,
                        color: GOLD,
                        fontWeight: 800,
                        border:
                          `1px solid ${GOLD}`,
                      }}
                    />

                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{
                        color: DARK_GREEN,
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                      }}
                    >
                      {step.description}
                    </Typography>

                    {index < milestones.length - 1 && (
                      <Box
                        sx={{
                          display: {
                            xs: 'none',
                            sm: 'block',
                          },
                          width: 50,
                          height: 2,
                          backgroundColor: GOLD,
                          mt: 1,
                        }}
                      />
                    )}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* Team Section */}
        <Paper
          elevation={0}
          sx={{
            mt: { xs: 7, md: 10 },
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            border:
              '1px solid rgba(18, 60, 43, 0.1)',
            background: `linear-gradient(135deg, #FFFFFF 0%, #F0F6F2 100%)`,
          }}
        >
          <Grid
            container
            spacing={5}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  mx: {
                    xs: 'auto',
                    md: 0,
                  },
                  mb: 2,
                  bgcolor: DARK_GREEN,
                  color: GOLD,
                  border: `1px solid ${GOLD}`,
                }}
              >
                <GroupsOutlinedIcon fontSize="large" />
              </Avatar>

              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  color: DARK_GREEN,
                  mb: 2,
                }}
              >
                The collective behind the brand
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                Our team spans hardware engineers, firmware wizards,
                service designers, and stylists obsessed with making
                tech effortless. We source directly from makers and
                run micro-batch pilots before scaling popular
                favourites.
              </Typography>

              <Stack
                direction="row"
                spacing={{ xs: 2, md: 4 }}
                justifyContent={{
                  xs: 'center',
                  md: 'flex-start',
                }}
              >
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    sx={{ color: DARK_GREEN }}
                  >
                    38
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    Specialists
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    sx={{ color: DARK_GREEN }}
                  >
                    72%
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    4.5★+ Products
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    sx={{ color: DARK_GREEN }}
                  >
                    12
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    Partner Labs
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  backgroundColor: DARK_GREEN,
                  color: '#FFFFFF',
                  border: `1px solid rgba(212,175,55,0.35)`,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{
                    color: GOLD,
                    mb: 2,
                  }}
                >
                  What we believe
                </Typography>

                <Divider
                  sx={{
                    mb: 2.5,
                    borderColor:
                      'rgba(212,175,55,0.3)',
                  }}
                />

                <Stack spacing={2}>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        'rgba(255,255,255,0.78)',
                      lineHeight: 1.7,
                    }}
                  >
                    • Technology should feel warm, human, and
                    designed for real life.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        'rgba(255,255,255,0.78)',
                      lineHeight: 1.7,
                    }}
                  >
                    • Transparency matters. We publish sourcing
                    notes and lifecycle scores.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        'rgba(255,255,255,0.78)',
                      lineHeight: 1.7,
                    }}
                  >
                    • Community wins. Co-designing with our
                    members leads to breakthrough ideas.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${DARK_GREEN}, ${GREEN})`,
            color: '#FFFFFF',
            boxShadow:
              '0 18px 45px rgba(18,60,43,0.18)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              mb: 1.5,
            }}
          >
            Ready to discover something better?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.75)',
              mb: 3,
            }}
          >
            Explore our curated collection and find your next
            favourite.
          </Typography>

          <Box
            component="a"
            href="/shop"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              backgroundColor: GOLD,
              color: DARK_GREEN,
              fontWeight: 900,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#E2C34D',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Explore VoldiMart
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;