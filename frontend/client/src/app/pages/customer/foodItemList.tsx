"use client";

/* eslint-disable @next/next/no-img-element */

import { SyntheticEvent, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartModal from "../../components/CartModal";
import Toast from "../../components/Toast";
import { CartContext } from "../contexts/CartContext";
import { buildRestaurantServiceUrl } from "../../../config/api";
import styles from "../../styles/foodList.module.css";

export type FoodItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
};

const FoodItemList = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [restaurantName, setRestaurantName] = useState("Restaurant");
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isCartOpen, setCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const hasFoods = useMemo(() => foods.length > 0, [foods]);

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    const fetchRestaurantFoods = async () => {
      try {
        const res = await axios.get<FoodItem[]>(
          buildRestaurantServiceUrl(`/api/food-items/restaurant/${restaurantId}`),
        );
        setFoods(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load food items.");
      }
    };

    const fetchRestaurantDetails = async () => {
      try {
        const res = await axios.get<{ restaurant: { _id: string; name: string } }>(
          buildRestaurantServiceUrl(`/api/restaurant/details/${restaurantId}`),
        );
        setRestaurantName(res.data.restaurant?.name ?? "Restaurant");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          try {
            const fallback = await axios.get<{ restaurants: { _id: string; name: string }[] }>(
              buildRestaurantServiceUrl("/api/restaurant/all"),
            );
            const restaurant = fallback.data.restaurants?.find((item) => item._id === restaurantId);
            setRestaurantName(restaurant?.name ?? "Restaurant");
            return;
          } catch (fallbackError) {
            console.error(fallbackError);
          }
        } else {
          console.error(err);
        }

        setRestaurantName("Restaurant");
      }
    };

    fetchRestaurantFoods();
    fetchRestaurantDetails();
  }, [restaurantId]);

  const toggleFavorite = (foodId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [foodId]: !prev[foodId],
    }));
  };

  const normalizedRestaurantId = Array.isArray(restaurantId) ? restaurantId[0] : restaurantId ?? null;

  const handleAddToCart = (food: FoodItem) => {
    addToCart(food, normalizedRestaurantId ?? null);
    setToastMessage(`${food.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => {
      setCartOpen(true);
    }, 400);
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://placehold.co/300x180?text=Food+Image";
  };

  return (
    <div className={styles.page}>
      <Header />

      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} type="success" />

      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.breadcrumbs}>
            <button type="button" onClick={() => navigate("/")}>
              <FaHome size={14} aria-hidden="true" /> Home
            </button>
            <span>/</span>
            <span>{restaurantName}</span>
          </div>
          <h1 className={styles.heroTitle}>{restaurantName}</h1>
          <p className={styles.heroSubtitle}>
            Discover signature dishes crafted with fresh ingredients and served with care.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.contentInner}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Available dishes</h2>
            <span className={styles.sectionCount}>
              {hasFoods ? `${foods.length} item${foods.length === 1 ? "" : "s"} ready to order` : "No dishes yet"}
            </span>
          </header>

          {error && <div className={styles.errorBanner}>{error}</div>}

          {!hasFoods ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Menu coming soon</p>
              <p className={styles.emptySubtitle}>
                This restaurant hasn&apos;t published their menu yet. Try visiting another restaurant or check back later.
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {foods.map((food) => (
                <article key={food._id} className={styles.card}>
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={
                        food.image
                          ? buildRestaurantServiceUrl(food.image)
                          : "https://placehold.co/300x180?text=Food+Image"
                      }
                      alt={food.name}
                      className={styles.cardImage}
                      onError={handleImageError}
                    />
                    <button
                      type="button"
                      className={styles.favoriteButton}
                      onClick={() => toggleFavorite(food._id)}
                      aria-pressed={favorites[food._id] ?? false}
                    >
                      {favorites[food._id] ? "❤" : "♡"}
                    </button>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{food.name}</h3>
                    <p className={styles.cardDescription}>{food.description}</p>
                    <div className={styles.metaRow}>
                      <span className={styles.price}>{food.price.toLocaleString()} VND</span>
                      <span className={styles.tag}>{food.category}</span>
                    </div>
                  </div>

                  <footer className={styles.actions}>
                    <button type="button" className={styles.secondaryButton} onClick={() => toggleFavorite(food._id)}>
                      {favorites[food._id] ? "Saved" : "Save for later"}
                    </button>
                    <button type="button" className={styles.primaryButton} onClick={() => handleAddToCart(food)}>
                      Add to cart
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FoodItemList;
