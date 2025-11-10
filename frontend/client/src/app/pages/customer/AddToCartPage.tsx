"use client";

import { useNavigate } from "react-router-dom";
import CartModal from "../../components/CartModal";

const AddToCartPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return <CartModal isOpen={true} onClose={handleClose} />;
};

export default AddToCartPage;

