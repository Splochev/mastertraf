export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  altBg: string;
  category: string;
  type: "image" | "video";
  videoUrl?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/gallery/remont-telopodavashto.jpg",
    alt: "Repair of wire feeder device",
    altBg: "Ремонт на телоподаващо устройство",
    category: "repairs",
    type: "image",
  },
  {
    id: "g2",
    src: "/images/gallery/remont-elektrozhen.jpg",
    alt: "Repair of arc welder",
    altBg: "Ремонт на електрожен",
    category: "repairs",
    type: "image",
  },
  {
    id: "g3",
    src: "/images/gallery/prenavivane-transformator.jpg",
    alt: "Transformer rewinding",
    altBg: "Пренавиване на трансформатор",
    category: "manufacturing",
    type: "image",
  },
  {
    id: "g4",
    src: "/images/gallery/usilване-amperazh.jpg",
    alt: "Amperage boosting of arc welder",
    altBg: "Усилване ампеража на електрожен",
    category: "repairs",
    type: "image",
  },
  {
    id: "g5",
    src: "/images/gallery/spoter-proizvodstvo.jpg",
    alt: "Spotter production",
    altBg: "Производство на спотер",
    category: "manufacturing",
    type: "image",
  },
  {
    id: "g6",
    src: "/images/gallery/aparat-nagryavane-metal.jpg",
    alt: "Metal heating device in action",
    altBg: "Апарат за нагряване на метал в действие",
    category: "manufacturing",
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=TYx1Ebo1eso",
  },
  {
    id: "g7",
    src: "/images/gallery/szu-1400a-test.jpg",
    alt: "Starter-charger 1400A three-phase stress test",
    altBg: "Стартерно-зарядно устройство 1400А трифазен стрес тест",
    category: "products",
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=4aCjWXCOTDE",
  },
  {
    id: "g8",
    src: "/images/gallery/transformatori-custom.jpg",
    alt: "Custom-built transformers",
    altBg: "Трансформатори по поръчка",
    category: "manufacturing",
    type: "image",
  },
  {
    id: "g9",
    src: "/images/gallery/telopodavashto-350a.jpg",
    alt: "Wire feeder 350A three-phase",
    altBg: "Телоподаващо устройство 350А трифазно",
    category: "products",
    type: "image",
  },
  {
    id: "g10",
    src: "/images/gallery/reciklirane.jpg",
    alt: "Recycling hobby equipment to professional grade",
    altBg: "Рециклиране на хоби техника за професионална употреба",
    category: "repairs",
    type: "image",
  },
];

export const galleryCategories = [
  { slug: "all", name: "Всички", nameEn: "All" },
  { slug: "repairs", name: "Ремонти", nameEn: "Repairs" },
  { slug: "manufacturing", name: "Производство", nameEn: "Manufacturing" },
  { slug: "products", name: "Продукти", nameEn: "Products" },
];
