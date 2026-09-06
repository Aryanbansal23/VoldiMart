import React, { useState } from 'react';

import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
  Stack,
  Divider,
} from '@mui/material';

import {
  Visibility,
  VisibilityOff,
  LockResetOutlined,
  ShoppingBagOutlined,
  ArrowBackOutlined,
} from '@mui/icons-material';

import { apiClient } from '../services/apiClient';
import { useNavigate } from 'react-router-dom';
import { useNotifier } from '../context/NotificationProvider';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { notify } = useNotifier();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');

      notify({
        severity: 'error',
        message: 'Passwords do not match.',
      });

      setLoading(false);
      return;
    }

    try {
      await apiClient.post('auth/reset-password', {
        email,
        password,
      });

      setSuccess(
        'Password successfully reset. Redirecting to login...'
      );

      notify({
        severity: 'success',
        message:
          'Password updated! Sign in with your new credentials.',
      });

      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((error) => error.msg)
          .join(', ');

        setError(errorMessages);

        notify({
          severity: 'error',
          message: errorMessages,
        });
      } else {
        const message =
          err.response?.data?.msg ||
          'Failed to reset password. Please try again.';

        setError(message);

        notify({
          severity: 'error',
          message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const fieldStyles = {
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
              Reset Password
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
              Create a strong password to secure your VoldiMart
              account.
            </Typography>
          </Box>

          {/* Form */}
          <Box
            sx={{
              p: { xs: 3, md: 5 },
            }}
          >
            {success && (
              <Box
                sx={{
                  mb: 2,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#F0F8F3',
                  border: '1px solid #B8D8C3',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: DARK_GREEN,
                    fontWeight: 600,
                  }}
                >
                  {success}
                </Typography>
              </Box>
            )}

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
                sx={fieldStyles}
              />

              <TextField
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                sx={fieldStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{
                          color: DARK_GREEN,

                          '&:hover': {
                            color: GOLD_DARK,
                            backgroundColor:
                              'rgba(212, 175, 55, 0.08)',
                          },
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm New Password"
                type={
                  showConfirmPassword ? 'text' : 'password'
                }
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
                autoComplete="new-password"
                sx={fieldStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={
                          handleToggleConfirmPasswordVisibility
                        }
                        edge="end"
                        sx={{
                          color: DARK_GREEN,

                          '&:hover': {
                            color: GOLD_DARK,
                            backgroundColor:
                              'rgba(212, 175, 55, 0.08)',
                          },
                        }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                startIcon={
                  !loading ? <LockResetOutlined /> : null
                }
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
                  'Reset Password'
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

export default ResetPassword;