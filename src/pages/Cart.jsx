import React from "react";
import { Container, Typography, Divider } from "@mui/material";
import ProductCart from "../components/ProductCart";
import { useAuth } from "../AuthProvider";

const Cart = () => {
  const { cart, setCart } = useAuth();

  const handleRemoveItem = (productIndex) => {
    const newCartItems = [...cart]
      .slice(0, productIndex)
      .concat([...cart].slice(productIndex + 1));
    setCart(newCartItems);

    console.log(`Item with id ${productIndex} removed from the cart`);
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) =>
        total +
        (product.price - (product.price * product.discountPercentage) / 100),
      0
    );
  };

  console.log(cart);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {cart.length > 0 ? (
        <>
          {cart.map((product, index) => (
            <ProductCart
              key={index}
              index={index}
              product={product}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </Typography>
        </>
      ) : (
        <Typography>Your cart is empty, start adding some.</Typography>
      )}
    </Container>
  );
};

export default Cart;
