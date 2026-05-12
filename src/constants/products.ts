import hoodieImg from "../assets/images/mnt/data/hoodie.png";
import oldMoneyImg from "../assets/images/OLD MONEY.jpg";
import zipupImg from "../assets/images/ZIPUP.jpg";
import compShirt2Img from "../assets/images/mnt/data/COMPRESSED SHIRT 2.png";
import shoesImg from "../assets/images/mnt/data/shoes.png";
import capImg from "../assets/images/mnt/data/cap.jpeg";

export const PRODUCTS = [
  { 
    id: "1", 
    name: "RYVA Hoodie", 
    category: "Streetwear", 
    price: 189, 
    tagline: "Boxy fit, 400GSM",
    images: [
      hoodieImg,
      hoodieImg
    ],
    description: "The Sovereign Hoodie defines the high-end streetwear aura. Crafted from 400GSM heavy diagonal fleece, features a signature boxy silhouette and dropped shoulders. Hand-finished silver aglets and discreet RYVA embroidery.",
    details: ["100% Organic Cotton", "Heavyweight 400GSM", "Boxy Fit", "Made in Tunisia"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Onyx Black", "Storm Gray"]
  },
  { 
    id: "2", 
    name: "Old money", 
    category: "Old Money", 
    price: 149, 
    tagline: "Pima Cotton, Slim",
    images: [
      oldMoneyImg,
      oldMoneyImg
    ],
    description: "Timeless sophistication. The Heritage Polo is made from premium Pima cotton, offering an ultra-soft feel and structured drape. Perfect for a refined Old Money aesthetic.",
    details: ["Pima Cotton", "Breathable Knit", "Tailored Fit", "Mother of Pearl Buttons"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Classic White", "Navy Blue"]
  },
  { 
    id: "3", 
    name: "Zip up shirt", 
    category: "Old Money", 
    price: 169, 
    tagline: "Slim fit, Quarter-zip",
    images: [
      zipupImg,
      zipupImg
    ],
    description: "The Zip up shirt combines technical precision with high-fashion aesthetics. Featuring a tailored quarter-zip closure and breathable performance fabric.",
    details: ["Tech Fleece", "Tailored Fit", "Hand-finished Zipper", "Signature Embroidery"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Graphite", "Alpine"]
  },
  { 
    id: "4", 
    name: "Compressed T-shirt", 
    category: "Sportswear", 
    price: 129, 
    tagline: "Second-skin fit, Tech-knit",
    images: [
      compShirt2Img,
      compShirt2Img
    ],
    description: "Our Compressed T-shirt is engineered for the high-performance lifestyle. Featuring high-rebound compression fabric that accentuates the physique while providing maximum mobility.",
    details: ["80% Polyamide, 20% Elastane", "Ultra-compression", "Seamless Finish", "Fast-drying Tech"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Desert Sand", "Carbon"]
  },
  { 
    id: "5", 
    name: "Velocity Runners", 
    category: "Sportswear", 
    price: 329, 
    tagline: "Propulsion Sole",
    images: [
      shoesImg,
      shoesImg
    ],
    description: "Future-proof footwear. The Velocity Runners feature a high-rebound propulsion sole and a breathable mesh upper for maximum aura and performance.",
    details: ["Enginereed Mesh", "Rebound Tech", "Reflective Hits", "Lightweight"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Sonic White", "Midnight"]
  },
  { 
    id: "6", 
    name: "RYVA CAP", 
    category: "Streetwear", 
    price: 89, 
    tagline: "Drop shoulder",
    images: [
      capImg,
      capImg
    ],
    description: "The definitive finishing touch. The RYVA CAP is constructed from premium heavy-weight twill with a structured 6-panel design. Features the signature RYVA metallic emblem and an adjustable leather strap for a bespoke fit.",
    details: ["Premium Cotton Twill", "Structured 6-Panel", "Metallic Brand Emblem", "Leather Adjustable Strap"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pure Black", "Eggshell"]
  }
];
