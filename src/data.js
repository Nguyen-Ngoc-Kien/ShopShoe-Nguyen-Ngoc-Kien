export const products = [
  {
    id: 1,
    name: {
      vi: "Giày Asics",
      zh: "亚瑟士鞋",
    },
    price: 50,
    releaseDate: "2024-01-15",
    isBestSeller: true,
    brand: {
      vi: "Asics",
      zh: "亚瑟士",
    },
    description: {
      vi: "Giày này đẹp",
      zh: "这双鞋子很好看",
    },
    images: {
      "Black": "/assets/Asics-Black.webp", 
      "Grey": "/assets/Asics-Grey.webp",
    },
    colorOptions: ["Black", "Grey"],
    colors: {
      "Black": {
        quantity: {
          36: 9,
          37: 8,
          38: 7,
          39: 6,
          40: 5,
          41: 0,
          42: 4,
        }
      },
      "Grey": {
        quantity: {
          36: 6,
          37: 3,
          38: 3,
          39: 3,
          40: 1,
          41: 2,
          42: 0,
        }
      },
    },
  },
  {
    id: 2,
    name: {
      vi: "Giày Bonnie-Cathy",
      zh: "邦妮-凯西鞋",
    },
    price: 60,
    releaseDate: "2024-01-15",
    isBestSeller: false,
    brand: {
      vi: "Asics",
      zh: "亚瑟士",
    },
    description: {
      vi: "Giày này đẹp",
      zh: "这双鞋子很好看",
    },
    images: {
      "Black": "/assets/Bonnie-Cathy-Black.webp", 
      "MintCream": "/assets/Bonnie-Cathy-White.webp",
    },
    colorOptions: ["Black", "MintCream"],
    colors: {
      "Black": {
        quantity: {
          36: 3,
          37: 8,
          38: 7,
          39: 6,
          40: 5,
          41: 0,
          42: 4,
        }
      },
      "MintCream": {
        quantity: {
          36: 12,
          37: 6,
          38: 2,
          39: 3,
          40: 0,
          41: 0,
          42: 0,
        }
      }
    },
  },
  {
    id: 3,
    name: {
      vi: "Giày Canvas",
      zh: "帆布鞋", 
    },
    price: 70,
    releaseDate: "2024-01-15",
    isBestSeller: true,
    brand: {
      vi: "Canvas",
      zh: "帆布品牌", 
    },
    description: {
      vi: "Giày này đẹp",
      zh: "这双鞋子很好看", 
    },
    images: {
      "Black": "/assets/Canvas-Black.webp", 
      "LightBlue": "/assets/Canvas-BlurBlue.webp",
      "White": "/assets/Canvas-White.webp"
    },
    colorOptions: ["Black", "LightBlue", "White"],
    colors: {
      "Black": {
        quantity: {
          36: 4,
          37: 7,
          38: 6,
          39: 3,
          40: 15,
          41: 20,
          42: 14,
        }
      },
      "LightBlue": {
        quantity: {
          36: 12,
          37: 6,
          38: 2,
          39: 3,
          40: 0,
          41: 8,
          42: 0,
        }
      },
      "White": {
        quantity: {
          36: 20,
          37: 21,
          38: 22,
          39: 23,
          40: 10,
          41: 8,
          42: 10,
        }
      }
    },
}
];