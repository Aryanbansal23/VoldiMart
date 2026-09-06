import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
} from "@mui/material";

import {
  ShoppingCartOutlined,
  Inventory2Outlined,
  StarOutline,
  ArrowForward,
  FilterList,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useNotifier } from "../context/NotificationProvider";

const GOLD = "#D4AF37";
const GOLD_DARK = "#B08D20";
const DARK_GREEN = "#123C2B";
const GREEN = "#1F6F50";
const LIGHT_GREEN = "#F7FAF7";

const Shop = ({ products = [], addToCart, loading, error }) => {
  const navigate = useNavigate();
  const { notify } = useNotifier();

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [page, setPage] = useState(1);

  const productsPerPage = 12;

  const categories = useMemo(() => {
    const values = products
      .map((product) => product?.category)
      .filter(Boolean)
      .map((value) => String(value));

    return ["all", ...Array.from(new Set(values))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter(
        (product) =>
          String(product?.category || "").toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (availability === "in-stock") {
      result = result.filter(
        (product) =>
          Number(product?.stock || 0) > 0 ||
          Number(product?.countInStock || 0) > 0 ||
          product?.inStock === true
      );
    }

    if (availability === "featured") {
      result = result.filter(
        (product) =>
          product?.featured === true ||
          product?.isFeatured === true ||
          Number(product?.rating || 0) >= 4.5
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) => Number(a?.price || 0) - Number(b?.price || 0)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => Number(b?.price || 0) - Number(a?.price || 0)
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => Number(b?.rating || 0) - Number(a?.rating || 0)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        String(a?.name || "").localeCompare(String(b?.name || ""))
      );
    }

    return result;
  }, [products, category, availability, sort]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * productsPerPage;

    return filteredProducts.slice(
      start,
      start + productsPerPage
    );
  }, [filteredProducts, page]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleAvailabilityChange = (_event, value) => {
    if (!value) return;

    setAvailability(value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handleAddToCart = (product) => {
    try {
      addToCart(product);

      notify({
        severity: "success",
        message: `${product?.name || "Product"} added to cart`,
      });
    } catch (err) {
      console.error("Add to cart error:", err);

      notify({
        severity: "error",
        message: "Could not add product to cart.",
      });
    }
  };

  const clearFilters = () => {
    setCategory("all");
    setAvailability("all");
    setSort("default");
    setPage(1);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: LIGHT_GREEN,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress
            size={48}
            thickness={4}
            sx={{ color: GOLD }}
          />

          <Typography
            sx={{
              color: DARK_GREEN,
              fontWeight: 700,
            }}
          >
            Loading VoldiMart collection...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 5,
            border: "1px solid rgba(18,60,43,0.12)",
            background: "#fff",
          }}
        >
          <Inventory2Outlined
            sx={{
              fontSize: 60,
              color: GOLD,
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: DARK_GREEN,
              mb: 1,
            }}
          >
            Products unavailable
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mb: 3,
            }}
          >
            We couldn't load the shop right now. Please try again.
          </Typography>

          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              background: DARK_GREEN,
              borderRadius: 2,
              px: 4,
              py: 1.2,
              fontWeight: 800,
              "&:hover": {
                background: GREEN,
              },
            }}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #F7FAF7 0%, #FFFFFF 48%, #F9F8F2 100%)",
        pb: 8,
      }}
    >
      {/* HERO */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #123C2B 0%, #1F6F50 55%, #2F8A63 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          mb: 5,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(212,175,55,0.12)",
            top: -150,
            right: -80,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.25)",
            bottom: -100,
            left: "8%",
          }}
        />

        <Container maxWidth="xl">
          <Box
            sx={{
              py: {
                xs: 6,
                md: 8,
              },
              position: "relative",
              zIndex: 1,
            }}
          >
            <Chip
              label="VOLDIMART COLLECTION"
              sx={{
                mb: 2,
                color: GOLD,
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.45)",
                fontWeight: 800,
                letterSpacing: 1,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                lineHeight: 1.05,
                fontSize: {
                  xs: "2.5rem",
                  md: "4rem",
                },
                maxWidth: 760,
                mb: 2,
              }}
            >
              Discover something{" "}
              <Box
                component="span"
                sx={{
                  color: GOLD,
                }}
              >
                exceptional.
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 650,
                color: "rgba(255,255,255,0.78)",
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.7,
              }}
            >
              Explore our curated collection of premium products,
              designed for people who expect quality, style and
              reliability.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* FILTER BAR */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              md: 2.5,
            },
            mb: 4,
            borderRadius: 4,
            border: "1px solid rgba(18,60,43,0.10)",
            background: "rgba(255,255,255,0.95)",
            boxShadow:
              "0 12px 35px rgba(18,60,43,0.06)",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            spacing={2}
            alignItems={{
              xs: "stretch",
              lg: "center",
            }}
            justifyContent="space-between"
          >
            {/* CATEGORIES */}
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={1}
              alignItems={{
                xs: "stretch",
                sm: "center",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mr: 1 }}
              >
                <FilterList
                  sx={{
                    color: GOLD,
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 800,
                    color: DARK_GREEN,
                  }}
                >
                  Categories
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {categories.map((item) => (
                  <Chip
                    key={item}
                    label={
                      item === "all"
                        ? "All Products"
                        : String(item)
                            .charAt(0)
                            .toUpperCase() +
                          String(item).slice(1)
                    }
                    onClick={() =>
                      handleCategoryChange(item)
                    }
                    sx={{
                      fontWeight: 700,
                      borderRadius: 2,
                      color:
                        category === item
                          ? "#fff"
                          : DARK_GREEN,
                      background:
                        category === item
                          ? DARK_GREEN
                          : "#F2F6F2",
                      border:
                        category === item
                          ? `1px solid ${DARK_GREEN}`
                          : "1px solid rgba(18,60,43,0.08)",
                      "&:hover": {
                        background:
                          category === item
                            ? GREEN
                            : "#E8F0EA",
                      },
                    }}
                  />
                ))}
              </Box>
            </Stack>

            {/* SORT + AVAILABILITY */}
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              alignItems={{
                xs: "stretch",
                sm: "center",
              }}
            >
              <ToggleButtonGroup
                value={availability}
                exclusive
                onChange={handleAvailabilityChange}
                size="small"
                sx={{
                  "& .MuiToggleButton-root": {
                    textTransform: "none",
                    fontWeight: 700,
                    color: DARK_GREEN,
                    borderColor:
                      "rgba(18,60,43,0.15)",
                  },

                  "& .Mui-selected": {
                    backgroundColor:
                      `${GOLD} !important`,
                    color: "#fff !important",
                  },
                }}
              >
                <ToggleButton value="all">
                  All
                </ToggleButton>

                <ToggleButton value="in-stock">
                  In Stock
                </ToggleButton>

                <ToggleButton value="featured">
                  Featured
                </ToggleButton>
              </ToggleButtonGroup>

              <FormControl
                size="small"
                sx={{
                  minWidth: 180,
                }}
              >
                <InputLabel
                  sx={{
                    color: DARK_GREEN,
                  }}
                >
                  Sort By
                </InputLabel>

                <Select
                  value={sort}
                  label="Sort By"
                  onChange={handleSortChange}
                  sx={{
                    borderRadius: 2,
                    color: DARK_GREEN,

                    "& .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor:
                          "rgba(18,60,43,0.15)",
                      },

                    "&:hover .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: GOLD,
                      },
                  }}
                >
                  <MenuItem value="default">
                    Recommended
                  </MenuItem>

                  <MenuItem value="price-low">
                    Price: Low to High
                  </MenuItem>

                  <MenuItem value="price-high">
                    Price: High to Low
                  </MenuItem>

                  <MenuItem value="rating">
                    Highest Rated
                  </MenuItem>

                  <MenuItem value="name">
                    Name
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Paper>

        {/* RESULTS HEADER */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          sx={{
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: DARK_GREEN,
              }}
            >
              Shop Collection
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              found
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<ShoppingCartOutlined />}
            onClick={() => navigate("/cart")}
            sx={{
              borderColor: GOLD,
              color: DARK_GREEN,
              borderRadius: 2,
              fontWeight: 800,
              px: 2.5,

              "&:hover": {
                borderColor: GOLD,
                background:
                  "rgba(212,175,55,0.08)",
              },
            }}
          >
            View Cart
          </Button>
        </Stack>

        {/* PRODUCTS */}
        {paginatedProducts.length > 0 ? (
          <Grid container spacing={3}>
            {paginatedProducts.map(
              (product, index) => (
                <Grid
                  item
                  key={
                    product?._id ||
                    product?.id ||
                    index
                  }
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Box
                    sx={{
                      height: "100%",
                      transition:
                        "transform 0.25s ease",

                      "&:hover": {
                        transform:
                          "translateY(-5px)",
                      },
                    }}
                  >
                    <ProductCard
                      product={product}
                      addToCart={() =>
                        handleAddToCart(product)
                      }
                    />
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{
              py: 10,
              px: 3,
              textAlign: "center",
              borderRadius: 5,
              border:
                "1px solid rgba(18,60,43,0.10)",
              background: "#fff",
            }}
          >
            <Inventory2Outlined
              sx={{
                fontSize: 64,
                color: GOLD,
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: DARK_GREEN,
                mb: 1,
              }}
            >
              No products found
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mb: 3,
              }}
            >
              Try changing your category or
              filter selection.
            </Typography>

            <Button
              variant="contained"
              onClick={clearFilters}
              sx={{
                background: DARK_GREEN,
                borderRadius: 2,
                fontWeight: 800,
                px: 4,

                "&:hover": {
                  background: GREEN,
                },
              }}
            >
              Clear Filters
            </Button>
          </Paper>
        )}

        {/* PAGINATION */}
        {filteredProducts.length >
          productsPerPage && (
          <Stack
            alignItems="center"
            sx={{
              mt: 6,
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_event, value) => {
                setPage(value);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: DARK_GREEN,
                  fontWeight: 700,
                },

                "& .Mui-selected": {
                  backgroundColor:
                    `${GOLD} !important`,
                  color: "#fff",
                },
              }}
            />
          </Stack>
        )}

        {/* BOTTOM CTA */}
        <Paper
          elevation={0}
          sx={{
            mt: 8,
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 5,
            background:
              "linear-gradient(135deg, #123C2B 0%, #1F6F50 100%)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              border:
                "1px solid rgba(212,175,55,0.25)",
              right: -80,
              top: -100,
            }}
          />

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={3}
            alignItems={{
              xs: "flex-start",
              md: "center",
            }}
            justifyContent="space-between"
            position="relative"
            zIndex={1}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mb: 1,
                }}
              >
                <StarOutline
                  sx={{
                    color: GOLD,
                  }}
                />

                <Typography
                  sx={{
                    color: GOLD,
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  PREMIUM SHOPPING
                </Typography>
              </Stack>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  mb: 1,
                }}
              >
                Can't decide what to choose?
              </Typography>

              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,0.72)",
                }}
              >
                Explore our complete collection
                and find your next favorite.
              </Typography>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={clearFilters}
              sx={{
                background: GOLD,
                color: "#fff",
                borderRadius: 2,
                px: 3,
                py: 1.3,
                fontWeight: 900,
                whiteSpace: "nowrap",

                "&:hover": {
                  background: GOLD_DARK,
                },
              }}
            >
              Explore All
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Shop;