export const productImages = {
  tomato: "/images/tomato.avif",
  potato: "/images/potato.avif",
  onion: "/images/onion.avif",
  banana: "/images/banana.avif",
  milk: "/images/milk.avif",
  apple: "/images/apple.avif",
  carrot: "/images/carrot.avif",
  capsicum: "/images/capsicum.avif",
  cucumber: "/images/cucumber.avif",
  garlic: "/images/garlic.avif",
  mango: "/images/mango.avif",
  orange: "/images/orange.avif",
  rice: "/images/rice.avif",
  pulses: "/images/pulses.avif",
  oil: "/images/oil.avif",
  honey: "/images/honey.avif",
  eggs: "/images/eggs.avif",
  coffee: "/images/coffee.avif",
  salt: "/images/salt.avif",
  atta: "/images/atta.avif",
  avocado: "/images/avocado.avif",
  kiwi: "/images/kiwi.avif",
  litchi: "/images/litchi.avif",
  raspberry: "/images/raspberry.avif",
  strawberry: "/images/strawberry.avif",
  cabbage: "/images/cabbage.avif",
  chilli: "/images/chilli.avif",
  cumin: "/images/cumin.avif",
  brown_sugar: "/images/brown_sugar.avif",
  turmeric: "/images/turmeric.avif",
};

export const getProductImage = (
  productName
) => {

  if (!productName)
    return "/images/tomato.avif";

  const key =
    productName
      .toLowerCase()
      .replace(/\s+/g, "_");

  return (
    productImages[key] ||
    "/images/tomato.avif"
  );
};