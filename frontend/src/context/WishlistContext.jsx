import {
  createContext,
  useContext,
  useState
} from "react";

const WishlistContext =
  createContext();

export const WishlistProvider = ({
  children
}) => {

  const [
    wishlistItems,
    setWishlistItems
  ] = useState([]);

  const toggleWishlist = (
    product
  ) => {

    setWishlistItems(
      (prev) => {

        const exists =
          prev.find(
            (item) =>
              item.id === product.id
          );

        if (exists) {

          return prev.filter(
            (item) =>
              item.id !== product.id
          );

        }

        return [
          ...prev,
          product
        ];

      }
    );

  };

  const isWishlisted = (
    id
  ) => {

    return wishlistItems.some(
      (item) => item.id === id
    );

  };

  const clearWishlist = () => {

    setWishlistItems([]);

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
        clearWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};

export const useWishlist =
  () => useContext(
    WishlistContext
  );