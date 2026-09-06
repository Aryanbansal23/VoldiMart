import * as React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  useMediaQuery,
  Box,
  CircularProgress,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Divider,
  InputAdornment,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CloseIcon from '@mui/icons-material/Close';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import SearchResults from './SearchResults';
import { apiClient } from '../services/apiClient';
import { useNotifier } from '../context/NotificationProvider';

const GOLD = '#D4AF37';
const GOLD_DARK = '#B08D20';
const DARK_GREEN = '#123C2B';
const GREEN = '#1F6F50';

const navLinks = [
  {
    label: 'Home',
    to: '/',
    icon: <HomeRoundedIcon fontSize="small" />,
  },
  {
    label: 'Shop',
    to: '/shop',
    icon: <StorefrontIcon fontSize="small" />,
  },
  {
    label: 'About',
    to: '/about',
    icon: <InfoOutlinedIcon fontSize="small" />,
  },
  {
    label: 'Support',
    to: '/support',
    icon: <SupportAgentIcon fontSize="small" />,
  },
];

function NavigationBar({ cartItemCount }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [searchModalOpen, setSearchModalOpen] = React.useState(false);

  const searchBarRef = React.useRef(null);
  const searchResultsRef = React.useRef(null);
  const mobileSearchFieldRef = React.useRef(null);

  const open = Boolean(anchorEl);

  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:1200px)');

  const { notify } = useNotifier();

  React.useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('MERNEcommerceToken');
      setIsLoggedIn(Boolean(token));
    };

    checkToken();

    const interval = setInterval(checkToken, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('MERNEcommerceToken');

    setIsLoggedIn(false);

    notify({
      severity: 'success',
      message: 'Signed out successfully.',
    });

    navigate('/');
  };

  const debouncedSearch = React.useMemo(
    () =>
      debounce(async (query) => {
        if (query.trim() === '') {
          setSearchResults([]);
          setLoading(false);
          return;
        }

        setLoading(true);

        try {
          const response = await apiClient.get('search', {
            params: {
              q: query,
            },
          });

          setSearchResults(response.data);

          if (
            Array.isArray(response.data) &&
            response.data.length === 0
          ) {
            notify({
              severity: 'info',
              message: 'No products matched your search yet.',
            });
          }
        } catch (error) {
          console.error('Error fetching search results:', error);

          setSearchResults([]);

          notify({
            severity: 'error',
            message: 'Search is unavailable right now.',
          });
        } finally {
          setLoading(false);
        }
      }, 320),
    [notify]
  );

  React.useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearchQuery(value);

    debouncedSearch(value);
  };

  const handleSearchModalClose = React.useCallback(() => {
    setSearchModalOpen(false);

    debouncedSearch.cancel();

    setSearchResults([]);
    setSearchQuery('');
    setLoading(false);
  }, [debouncedSearch]);

  const handleSearchModalOpen = () => {
    setSearchModalOpen(true);

    setTimeout(() => {
      mobileSearchFieldRef.current?.focus();
    }, 120);
  };

  const handleSearchResultClick = () => {
    if (searchModalOpen) {
      handleSearchModalClose();
    } else {
      setSearchResults([]);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setSearchResults([]);
  }, [location.pathname]);

  const anchorRect =
    searchBarRef.current?.getBoundingClientRect();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        mb: 4,

        background: `
          linear-gradient(
            90deg,
            ${DARK_GREEN} 0%,
            #0E3022 48%,
            #092219 100%
          )
        `,

        borderBottom: `1px solid ${GOLD}45`,

        boxShadow: `
          0 8px 30px rgba(0,0,0,0.32),
          0 2px 18px ${GOLD}10
        `,

        '& .logo-link': {
          textDecoration: 'none',
          color: '#fff',
          fontWeight: 900,
          fontSize: '1.55rem',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',

          textShadow: `0 0 22px ${GOLD}30`,

          transition: 'all 0.25s ease',

          '&:hover': {
            color: GOLD,
          },
        },

        '& .search-bar': {
          backgroundColor: 'rgba(255,255,255,0.07)',

          border: `1px solid ${GOLD}30`,

          borderRadius: 999,

          padding: '0.4rem 0.9rem',

          display: 'flex',
          alignItems: 'center',

          minWidth: {
            xs: '70%',
            md: 320,
          },

          maxWidth: 420,

          marginInline: {
            xs: 'auto',
            md: 0,
          },

          position: 'relative',

          transition: 'all 0.3s ease',

          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.18)',

          '&:focus-within': {
            backgroundColor: `${GOLD}0F`,
            borderColor: `${GOLD}90`,
            boxShadow: `0 0 0 3px ${GOLD}12`,
          },
        },

        '& .search-bar input': {
          marginLeft: '0.5rem',

          border: 'none',
          outline: 'none',

          color: '#fff',
          backgroundColor: 'transparent',

          width: '100%',

          '&::placeholder': {
            color: 'rgba(255,255,255,0.45)',
          },
        },
      }}
    >
      <Toolbar
        sx={{
          py: {
            xs: 1,
            md: 1.5,
          },

          gap: {
            xs: 1.5,
            md: 2,
          },
        }}
      >
        {isMobile ? (
          <>
            {/* Mobile Menu */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open navigation"
              onClick={handleClick}
              sx={{
                color: GOLD,

                '&:hover': {
                  backgroundColor: `${GOLD}14`,
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 210,

                  background: `
                    linear-gradient(
                      145deg,
                      ${DARK_GREEN},
                      #0A241A
                    )
                  `,

                  color: '#fff',

                  border: `1px solid ${GOLD}35`,

                  boxShadow: '0 20px 50px rgba(0,0,0,0.45)',

                  '& .MuiMenuItem-root': {
                    py: 1.2,

                    '&:hover': {
                      backgroundColor: `${GOLD}12`,
                    },

                    '& .MuiSvgIcon-root': {
                      color: GOLD,
                      marginRight: 10,
                    },
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleSearchModalOpen();
                }}
              >
                <SearchIcon />
                Search
              </MenuItem>

              <Divider
                sx={{
                  borderColor: `${GOLD}20`,
                }}
              />

              {navLinks.map((link) => (
                <MenuItem
                  key={link.to}
                  onClick={() => {
                    handleClose();
                    navigate(link.to);
                  }}
                >
                  {link.icon}
                  {link.label}
                </MenuItem>
              ))}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/cart');
                }}
              >
                <Badge
                  badgeContent={cartItemCount}
                  showZero
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: GOLD,
                      color: DARK_GREEN,
                      fontWeight: 800,
                    },
                  }}
                >
                  <Typography component="span">
                    Cart
                  </Typography>
                </Badge>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleClose();

                  isLoggedIn
                    ? handleLogout()
                    : navigate('/login');
                }}
              >
                {isLoggedIn ? (
                  <>
                    <LogoutIcon />
                    Logout
                  </>
                ) : (
                  <>
                    <LoginIcon />
                    Login
                  </>
                )}
              </MenuItem>

              {!isLoggedIn && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/register');
                  }}
                >
                  <PersonAddAltIcon />
                  Register
                </MenuItem>
              )}
            </Menu>

            {/* Mobile Logo */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                minWidth: 0,
              }}
            >
              <Link
                to="/"
                className="logo-link"
              >
                VoldiMart
              </Link>
            </Typography>

            {/* Mobile Cart */}
            <IconButton
              component={Link}
              to="/cart"
              size="small"
              sx={{
                color: GOLD,

                '&:hover': {
                  backgroundColor: `${GOLD}14`,
                },
              }}
            >
              <Badge
                badgeContent={cartItemCount}
                showZero
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: GOLD,
                    color: DARK_GREEN,
                    fontWeight: 800,
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Mobile Search */}
            <IconButton
              size="small"
              onClick={handleSearchModalOpen}
              sx={{
                color: '#fff',

                '&:hover': {
                  color: GOLD,
                  backgroundColor: `${GOLD}12`,
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </>
        ) : (
          <>
            {/* Desktop Logo */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,

                display: 'flex',
                alignItems: 'center',

                gap: 1,

                minWidth: 0,
              }}
            >
              <Link
                to="/"
                className="logo-link"
              >
                VoldiMart
              </Link>

              <Typography
                component="span"
                variant="caption"
                sx={{
                  color: `${GOLD}CC`,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                }}
              >
                Elevate Your Everyday Tech
              </Typography>
            </Typography>

            {/* Search */}
            <form
              className="search-bar"
              ref={searchBarRef}
              onSubmit={(e) => e.preventDefault()}
            >
              <SearchIcon
                sx={{
                  color: GOLD,
                }}
              />

              <InputBase
                placeholder="Search gadgets, accessories..."
                inputProps={{
                  'aria-label': 'search',
                }}
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              />

              {loading && (
                <CircularProgress
                  size={18}
                  sx={{
                    color: GOLD,
                    ml: 1,
                  }}
                />
              )}
            </form>

            {/* Desktop Actions */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                ml: 'auto',
              }}
            >
              <Stack
                direction="row"
                spacing={0.9}
                alignItems="center"
              >
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.to;

                  return (
                    <Tooltip
                      key={link.to}
                      title={link.label}
                      arrow
                      placement="bottom"
                    >
                      <IconButton
                        component={Link}
                        to={link.to}
                        size="small"
                        sx={{
                          color: isActive
                            ? GOLD
                            : 'rgba(255,255,255,0.82)',

                          backgroundColor: isActive
                            ? `${GOLD}15`
                            : 'transparent',

                          border: isActive
                            ? `1px solid ${GOLD}40`
                            : '1px solid transparent',

                          transition: 'all 0.25s ease',

                          '&:hover': {
                            color: GOLD,
                            backgroundColor: `${GOLD}12`,
                            transform: 'translateY(-1px)',
                          },
                        }}
                      >
                        {link.icon}
                      </IconButton>
                    </Tooltip>
                  );
                })}
              </Stack>

              {/* Auth */}
              {isLoggedIn ? (
                <Tooltip
                  title="Sign out"
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={handleLogout}
                    sx={{
                      color: 'rgba(255,255,255,0.75)',

                      '&:hover': {
                        color: '#ef4444',
                        backgroundColor: 'rgba(239,68,68,0.1)',
                      },
                    }}
                  >
                    <LogoutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Tooltip
                    title="Sign in"
                    arrow
                  >
                    <IconButton
                      component={Link}
                      to="/login"
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',

                        '&:hover': {
                          color: GOLD,
                          backgroundColor: `${GOLD}10`,
                        },
                      }}
                    >
                      <LoginIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title="Create account"
                    arrow
                  >
                    <IconButton
                      component={Link}
                      to="/register"
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',

                        '&:hover': {
                          color: GOLD,
                          backgroundColor: `${GOLD}10`,
                        },
                      }}
                    >
                      <PersonAddAltIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {/* Cart */}
              <Tooltip
                title="View cart"
                arrow
              >
                <IconButton
                  component={Link}
                  to="/cart"
                  size="small"
                  sx={{
                    color: GOLD,

                    '&:hover': {
                      backgroundColor: `${GOLD}15`,
                    },
                  }}
                >
                  <Badge
                    badgeContent={cartItemCount}
                    overlap="circular"
                    showZero
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: GOLD,
                        color: DARK_GREEN,
                        fontWeight: 800,
                      },
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )}
      </Toolbar>

      {/* Desktop Search Results */}
      {!isMobile &&
        searchResults.length > 0 &&
        anchorRect && (
          <Box
            ref={searchResultsRef}
            sx={{
              position: 'absolute',

              top: anchorRect.bottom + 12,
              left: anchorRect.left,

              width: 'min(420px, 85vw)',

              zIndex: (theme) =>
                theme.zIndex.modal - 1,

              background: DARK_GREEN,

              color: '#fff',

              borderRadius: 3,

              boxShadow:
                '0 22px 48px rgba(0,0,0,0.45)',

              border: `1px solid ${GOLD}35`,

              overflow: 'hidden',
            }}
          >
            <SearchResults
              results={searchResults}
              onResultClick={handleSearchResultClick}
              setSearchResults={setSearchResults}
            />
          </Box>
        )}

      {/* Mobile Search Dialog */}
      <Dialog
        open={searchModalOpen}
        onClose={handleSearchModalClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: `
              linear-gradient(
                145deg,
                ${DARK_GREEN},
                #091F17
              )
            `,

            color: '#fff',

            border: `1px solid ${GOLD}35`,

            boxShadow:
              '0 25px 70px rgba(0,0,0,0.65)',

            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            color: GOLD,
            fontWeight: 800,
          }}
        >
          Search Products

          <IconButton
            onClick={handleSearchModalClose}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.7)',

              '&:hover': {
                color: GOLD,
                backgroundColor: `${GOLD}12`,
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            borderColor: `${GOLD}20`,
          }}
        >
          <Stack spacing={2}>
            <TextField
              inputRef={mobileSearchFieldRef}
              autoFocus
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search gadgets, accessories..."
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',

                  '& fieldset': {
                    borderColor: `${GOLD}35`,
                  },

                  '&:hover fieldset': {
                    borderColor: `${GOLD}70`,
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: GOLD,
                  },
                },

                '& input::placeholder': {
                  color: 'rgba(255,255,255,0.4)',
                  opacity: 1,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: GOLD,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  py: 2,
                }}
              >
                <CircularProgress
                  size={24}
                  sx={{
                    color: GOLD,
                  }}
                />
              </Box>
            ) : searchResults.length > 0 ? (
              <SearchResults
                results={searchResults}
                onResultClick={handleSearchResultClick}
                setSearchResults={setSearchResults}
                variant="modal"
              />
            ) : searchQuery.trim() ? (
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                No products matched your search yet.
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                Start typing to explore our catalog.
              </Typography>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}

export default NavigationBar;