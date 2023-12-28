import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Rating,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function HomeAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  let navigate = useNavigate();
  const { logout, search, setSearch } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    logout();
    // navigate("/login", { replace: true });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="Show Product in cart"
          color="inherit"
        >
          <Badge badgeContent={7} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  console.log("Search: ", search);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Products
          </Typography>
          <Search
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={67} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export function HomePage() {
  return (
    <>
      {/* <HomeAppBar /> */}
      <ProductList />
    </>
  );
}
function ProductCard(props) {
  const { search, setCart } = useAuth();
  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <p
        style={{
          fontSize: 14,
          position: "absolute",
          top: 0,
          left: 10,
          color: "white",
          backgroundColor: "red",
          height: 40,
          width: 40,
          borderRadius: 20,
          textAlign: "center",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          zIndex: 2,
        }}
      >
        {Math.floor(props.data.discountPercentage)} %
      </p>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.data.images[0]}
          style={{
            objectFit: "contain",
          }}
          alt="Interior Design"
        />
        <CardContent>
          <div>
            <Typography>$ {props.data.price}</Typography>
          </div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              minHeight: "4rem", // Adjust this value based on your design requirements
              lineHeight: "2rem", // Limit to two lines
            }}
          >
            {props.data.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2, // Limit to two lines
            }}
          >
            {props.data.description}
          </Typography>
          <Rating readOnly name="simple-controlled" value={props.data.rating} />
        </CardContent>
      </CardActionArea>

      <CardActions>
        <IconButton
          size="small"
          color="primary"
          variant="standard"
          onClick={() =>
            setCart((prevCart) => {
              // Assuming you want to add a new item to the cart

              // Use the spread operator to create a new array with the new item
              return [...prevCart, props.data];
            })
          }
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { search, setCart } = useAuth();
  React.useEffect(() => {
    getProducts();
  }, [search, pageNo]);

  const getProducts = async () => {
    let response = await fetch(
      search.trim() != "" && search
        ? `https://dummyjson.com/products/search?q=${search}`
        : `https://dummyjson.com/products?limit=10&skip=${pageNo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTcwMzY5MDcyMSwiZXhwIjoxNzAzNjk0MzIxfQ.bcZE0VAq-bKOIhKWU4xk3Sz2jzt_op-hOrVqzmDbWLE",
        },
        // body: JSON.stringify({}),
      }
    );

    if (response.ok) {
      // If login is successful, parse the response JSON
      const result = await response.json();
      setCount(result.total);
      setProducts(result.products);
    } else {
      console.error("Login failed. Please check your credentials.");
    }

    // localStorage.setItem('userData', rs.)
  };

  return (
    <Container sx={{ marginY: 5 }}>
      <Grid2 container spacing={1}>
        <Grid2 sm={2}>
          <Typography>Price</Typography>
          <FormGroup sx={{ pl: 2 }}>
            {[100, 500, 1000, 5000].map((price) => (
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={price}
              />
            ))}
          </FormGroup>
          <Button variant="contained" style={{ textTransform: "none" }}>
            Apply Filter
          </Button>
        </Grid2>
        <Grid2 container spacing={2} sm={10}>
          {products.map((product) => (
            <Grid2 xs={12} md={6} lg={3}>
              <ProductCard data={product} addToCart={setCart} />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>

      <Stack
        spacing={2}
        sx={{ textAlign: "center", alignItems: "center", margin: 3 }}
      >
        <Pagination
          count={count / 10}
          onChange={(e, p) => {
            console.log(e, p);
            setPageNo(p);
          }}
        />
      </Stack>
    </Container>
  );
}
