import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Delete as DeleteIcon, Star as StarIcon } from "@mui/icons-material";

const ProductCart = (props) => {
  console.log(props);
  return (
    <Card key={props.product.id} sx={{ marginBottom: 2 }}>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <img
            src={props.product.thumbnail}
            alt={props.product.title}
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {props.product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.product.description}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              $
              {props.product.price -
                (props.product.price * props.product.discountPercentage) / 100}
              <span style={{ textDecoration: "line-through", marginLeft: 8 }}>
                ${props.product.price}
              </span>
              <span style={{ color: "green", marginLeft: 4 }}>
                ({props.product.discountPercentage}% Off)
              </span>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Rating: {props.product.rating}{" "}
              <StarIcon style={{ fontSize: "inherit", color: "gold" }} />
            </Typography>
            <IconButton
              onClick={() => props.handleRemoveItem(props.index)}
              sx={{ marginTop: 2 }}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductCart;
