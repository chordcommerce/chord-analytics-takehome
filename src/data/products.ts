export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  sku: string;
  categories: string[];
  images: string[];
};

export const products: Product[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    description:
      "The iconic Swiss Cheese Plant with stunning split leaves. A statement piece for any room that thrives in bright, indirect light. Easy to care for and a fast grower that can reach impressive sizes.",
    price: 45.99,
    brand: "Tropical Greens",
    sku: "TG-MONSTERA-001",
    categories: ["Indoor Plants", "Tropical", "Large Plants"],
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Fiddle Leaf Fig",
    description:
      "Elegant tree with large, violin-shaped leaves that makes a bold architectural statement. Perfect for bright corners and modern interiors. Requires consistent watering and bright filtered light.",
    price: 89.99,
    brand: "Urban Jungle",
    sku: "UJ-FIDDLE-001",
    categories: ["Indoor Plants", "Trees", "Large Plants"],
    images: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "3",
    name: "Snake Plant",
    description:
      "Nearly indestructible succulent with striking upright leaves. Perfect for beginners and low-light spaces. Known for its air-purifying qualities and ability to thrive on neglect.",
    price: 29.99,
    brand: "Desert Dwellers",
    sku: "DD-SNAKE-001",
    categories: ["Indoor Plants", "Succulents", "Low Light"],
    images: [
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "4",
    name: "Pothos Golden",
    description:
      "Classic trailing vine with heart-shaped leaves splashed with golden variegation. Incredibly easy to grow and perfect for hanging baskets or shelves. Tolerates low light and irregular watering.",
    price: 18.99,
    brand: "Tropical Greens",
    sku: "TG-POTHOS-001",
    categories: ["Indoor Plants", "Trailing", "Beginner Friendly"],
    images: [
      "https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=800&auto=format&fit=crop",
    ],
  },
];
