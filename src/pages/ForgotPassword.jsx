import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Divider,
} from '@mui/material';

import {
  LockResetOutlined,
  ShoppingBagOutlined,
  ArrowBackOutlined,
} from '@mui/icons-material';

import { apiClient } from '../services/apiClient';

import { useNotifier } from '../context/NotificationProvider';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { notify } = useNotifier();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await apiClient.post('auth/verify-email', { email });

      notify({
        severity: 'success',
        message: 'Email verified! Please set your new password.',
      });

      setTimeout(() => navigate('/reset-password'), 400);
    } catch (err) {
      const message =
        err.response?.data?.msg || 'Failed to verify email';

      setError(message);

      notify({
        severity: 'error',
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background:
          'linear-gradient(135deg, #F7FAF7 0%, #EEF5F0 50%, #F7FAF7 100%)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            border: '1px solid rgba(18, 60, 43, 0.12)',
            boxShadow: '0 20px 60px rgba(18, 60, 43, 0.12)',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${DARK_GREEN}, ${GREEN})`,
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            <Box
              sx={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                margin: '0 auto 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: `1px solid ${GOLD}`,
              }}
            >
              <LockResetOutlined
                sx={{
                  fontSize: 34,
                  color: GOLD,
                }}
              />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              Forgot Password?
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: 'rgba(255,255,255,0.78)',
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              Don't worry. Verify your email and we'll help you
              create a new password.
            </Typography>
          </Box>

          {/* Form */}
          <Box
            sx={{
              p: { xs: 3, md: 5 },
            }}
          >
            {error && (
              <Box
                sx={{
                  mb: 2,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#FFF4F4',
                  border: '1px solid #F1CACA',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#C62828',
                    fontWeight: 600,
                  }}
                >
                  {error}
                </Typography>
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="Enter your registered email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,

                    '&.Mui-focused fieldset': {
                      borderColor: GOLD_DARK,
                      borderWidth: 2,
                    },
                  },

                  '& .MuiInputLabel-root.Mui-focused': {
                    color: DARK_GREEN,
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                startIcon={!loading ? <LockResetOutlined /> : null}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 800,
                  fontSize: '1rem',
                  textTransform: 'none',
                  background: `linear-gradient(135deg, ${DARK_GREEN}, ${GREEN})`,
                  boxShadow:
                    '0 8px 20px rgba(18, 60, 43, 0.22)',

                  '&:hover': {
                    background: `linear-gradient(135deg, ${GREEN}, ${DARK_GREEN})`,
                    boxShadow:
                      '0 10px 25px rgba(18, 60, 43, 0.3)',
                  },

                  '&.Mui-disabled': {
                    backgroundColor: '#DDE7E1',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      color: '#FFFFFF',
                    }}
                  />
                ) : (
                  'Verify Email'
                )}
              </Button>
            </form>

            <Divider
              sx={{
                my: 3,

                '&::before, &::after': {
                  borderColor: 'rgba(18, 60, 43, 0.12)',
                },
              }}
            >
              <ShoppingBagOutlined
                sx={{
                  fontSize: 18,
                  color: GOLD_DARK,
                }}
              />
            </Divider>

            <Stack spacing={1.5} alignItems="center">
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Remember your password?
              </Typography>

              <Button
                href="/login"
                variant="outlined"
                fullWidth
                startIcon={<ArrowBackOutlined />}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  borderColor: GOLD_DARK,
                  color: DARK_GREEN,
                  fontWeight: 800,
                  textTransform: 'none',

                  '&:hover': {
                    borderColor: GOLD,
                    backgroundColor:
                      'rgba(212, 175, 55, 0.08)',
                  },
                }}
              >
                Back to Login
              </Button>
            </Stack>
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

export default ForgotPassword;