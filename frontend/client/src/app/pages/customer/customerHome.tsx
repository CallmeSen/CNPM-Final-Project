"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, KeyboardEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaSearch, FaUtensils } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { buildRestaurantServiceUrl } from "../../../config/api";
import styles from "../../styles/customerHome.module.css";

export type Restaurant = {
  id: string;
  name: string;
  location: string;
  contactNumber: string;
  profilePicture?: string;
};

type RawRestaurant = Partial<
  Restaurant & {
    _id?: string;
    restName?: string;
    address?: string;
    contact?: string;
    phone?: string;
    image?: string;
  }
>;

const FALLBACK_IMAGE = "https://via.placeholder.com/320x200?text=Restaurant";

const normaliseRestaurant = (restaurant: RawRestaurant): Restaurant | null => {
  if (!restaurant) {
    return null;
  }

  const idCandidate =
    (typeof restaurant.id === "string" && restaurant.id.trim()) ||
    (typeof restaurant._id === "string" && restaurant._id.trim());

  const nameCandidate =
    (typeof restaurant.name === "string" && restaurant.name.trim()) ||
    (typeof restaurant.restName === "string" && restaurant.restName.trim()) ||
    "";

  if (!idCandidate || !nameCandidate) {
    return null;
  }

  const locationCandidate =
    (typeof restaurant.location === "string" && restaurant.location.trim()) ||
    (typeof restaurant.address === "string" && restaurant.address.trim()) ||
    "";

  const contactCandidate =
    (typeof restaurant.contactNumber === "string" && restaurant.contactNumber.trim()) ||
    (typeof restaurant.contact === "string" && restaurant.contact.trim()) ||
    (typeof restaurant.phone === "string" && restaurant.phone.trim()) ||
    "";

  const profileCandidate =
    (typeof restaurant.profilePicture === "string" && restaurant.profilePicture.trim()) ||
    (typeof restaurant.image === "string" && restaurant.image.trim()) ||
    "";

  return {
    id: idCandidate,
    name: nameCandidate,
    location: locationCandidate,
    contactNumber: contactCandidate,
    profilePicture: profileCandidate || undefined,
  };
};

const CustomerHome = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError("");
    setStatusMessage("");

    try {
      const response = await fetch(buildRestaurantServiceUrl("/api/restaurant/all"));
      const data = await response.json();

      if (!response.ok) {
        const fallbackMessage =
          (typeof data?.message === "string" && data.message) || "We could not fetch restaurants right now.";
        throw new Error(fallbackMessage);
      }

      const rawRestaurants = Array.isArray(data)
        ? data
        : Array.isArray(data?.restaurants)
        ? data.restaurants
        : [];

      const normalised: Restaurant[] = rawRestaurants
        .map((entry: RawRestaurant) => normaliseRestaurant(entry))
        .filter((item): item is Restaurant => Boolean(item));

      setRestaurants(normalised);

      if (normalised.length === 0) {
        setStatusMessage("No restaurants are available right now. Please check back shortly.");
      }
    } catch (fetchError) {
      console.error("Failed to load restaurants", fetchError);
      setError(fetchError instanceof Error ? fetchError.message : "Something went wrong while loading restaurants.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRestaurants();
  }, [fetchRestaurants]);

  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return restaurants;
    }

    return restaurants.filter((restaurant) => {
      const nameMatch = restaurant.name.toLowerCase().includes(query);
      const locationMatch = restaurant.location.toLowerCase().includes(query);
      return nameMatch || locationMatch;
    });
  }, [restaurants, searchQuery]);

  const uniqueLocations = useMemo(() => {
    const unique = new Set<string>();
    restaurants.forEach((restaurant) => {
      if (restaurant.location) {
        unique.add(restaurant.location.toLowerCase());
      }
    });
    return unique.size;
  }, [restaurants]);

  const handleCardClick = (restaurantId: string) => {
    navigate(`/customer/restaurant/${restaurantId}/foods`);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, restaurantId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick(restaurantId);
    }
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const showEmptyState = !loading && !error && restaurants.length === 0;
  const showSearchEmpty = !loading && !error && restaurants.length > 0 && filteredRestaurants.length === 0;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Discover and order</span>
            <h1 className={styles.heroTitle}>Find something delicious near you</h1>
            <p className={styles.heroSubtitle}>
              Explore curated restaurants across the city and build your next order in just a few taps.
            </p>

            <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
              <FaSearch size={18} color="#2563eb" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className={styles.searchInput}
                placeholder="Search by restaurant name or neighborhood"
                aria-label="Search restaurants"
              />
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
            </form>
          </div>

          <div className={styles.heroHighlights}>
            <div className={styles.highlightCard}>
              <span className={styles.highlightValue}>{restaurants.length}</span>
              <span className={styles.highlightCaption}>restaurants ready to serve you</span>
            </div>
            <div className={styles.highlightCard}>
              <span className={styles.highlightValue}>{uniqueLocations}</span>
              <span className={styles.highlightCaption}>neighborhoods covered today</span>
            </div>
          </div>
        </section>

        <section className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Featured restaurants</h2>
            <span className={styles.resultsCount}>
              {loading
                ? "Loading..."
                : `${filteredRestaurants.length} option${filteredRestaurants.length === 1 ? "" : "s"} available`}
            </span>
          </div>

          {loading ? (
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-${index}`} className={styles.skeletonCard} />
              ))}
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <p className={styles.emptyTitle}>We hit a snag</p>
              <p className={styles.emptySubtitle}>{error}</p>
              <button type="button" className={styles.tryAgainButton} onClick={() => fetchRestaurants()}>
                Try again
              </button>
            </div>
          ) : showEmptyState ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nothing to show just yet</p>
              <p className={styles.emptySubtitle}>{statusMessage}</p>
              <button type="button" className={styles.tryAgainButton} onClick={() => fetchRestaurants()}>
                Refresh list
              </button>
            </div>
          ) : showSearchEmpty ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>No matches found</p>
              <p className={styles.emptySubtitle}>
                We could not find a restaurant that matches &quot;{searchQuery}&quot;. Try a different name or
                neighborhood.
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={styles.card}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardClick(restaurant.id)}
                  onKeyDown={(event) => handleCardKeyDown(event, restaurant.id)}
                >
                  <img
                    src={
                      restaurant.profilePicture
                        ? buildRestaurantServiceUrl(restaurant.profilePicture)
                        : FALLBACK_IMAGE
                    }
                    alt={restaurant.name}
                    className={styles.cardImage}
                    onError={handleImageError}
                  />

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{restaurant.name}</h3>
                    <div className={styles.cardMeta}>
                      <span>
                        <span className={styles.metaLabel}>Location:</span>
                        {restaurant.location || "Not specified"}
                      </span>
                      <span>
                        <span className={styles.metaLabel}>Contact:</span>
                        {restaurant.contactNumber || "Unavailable"}
                      </span>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.ctaLink}>
                        View menu
                        <FaArrowRight size={12} aria-hidden="true" />
                      </span>
                      <FaUtensils size={16} color="#2563eb" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerHome;
