export interface Product {
  id: string;
  slug: string;
  name: string;
  nameBg: string;
  shortDescription: string;
  shortDescriptionBg: string;
  description: string;
  descriptionBg: string;
  specs: { label: string; labelBg: string; value: string }[];
  features: string[];
  featuresBg: string[];
  image: string;
  images: string[];
  price?: string;
  availability: "in-stock" | "made-to-order" | "contact";
  warranty: string;
  category: string;
  categorySlug: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "spoter-tochkova-zavarka",
    name: "SPOTTER – Spot Welding Device",
    nameBg: "СПОТЕР – Апарат за точкова заварка",
    shortDescription:
      "Transformer-based reverse hammer spotter for professional auto body repair.",
    shortDescriptionBg:
      "Трансформаторен спотер – обратен чук за професионален автотенекеджийски ремонт.",
    description:
      "Transformer-based spot welding device designed for auto body shop services – pulling dents and straightening sheet metal elements. Features manual and automatic welding modes with potentiometer-controlled weld time (0.2–0.8 seconds). Bulgarian-made, powerful, reliable, designed for professional use.",
    descriptionBg:
      "Спотер – обратен чук. Апаратът е трансформаторен и е предназначен за автотенекеджийски услуги – за изтегляне на вдлъбнатини и изпъване на елементи от ламарина. Има няколко режима на работа. Възможност за избор на ръчен и автоматичен режим. Апаратът е български, мощен, надежден, предназначен и за професионална употреба.",
    specs: [
      { label: "Supply Voltage", labelBg: "Захранващо напрежение", value: "220V" },
      { label: "Open Circuit Voltage", labelBg: "Напрежение на празен ход", value: "7V" },
      { label: "Weight", labelBg: "Тегло", value: "25 кг" },
      { label: "Work Cable", labelBg: "Работен кабел", value: "2м" },
      { label: "Ground Cable", labelBg: "Кабел маса", value: "2м" },
    ],
    features: [
      "Reverse hammer – pulling via star welding",
      "Welding combs, bolts, nuts, rings, hooks, claws, rivets & accessories",
      "Sheet metal heating via copper tip",
      "Heating with carbon electrode",
      "Manual mode – weld determined by button press duration",
      "Automatic mode – potentiometer sets weld time 0.2–0.8 seconds",
    ],
    featuresBg: [
      "Работа с обратен чук – изтегляне посредством заваряване на звезди",
      "Заваряване на гребени, болтове, гайки, халки, куки, лапи, нитове и др. аксесоари",
      "Подгряване на ламарината посредством меден накрайник",
      "Нагряване с коксов (въгленов) електрод",
      "Ръчен режим – заварката се определя от продължителността на натиск върху бутона",
      "Автоматичен режим – чрез потенциометър се определя времето на заварка от 0,2 до 0,8 секунди",
    ],
    image: "/images/products/spoter-1.jpg",
    images: ["/images/products/spoter-1.jpg", "/images/products/spoter-1-alt.jpg"],
    availability: "in-stock",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Спотери",
    categorySlug: "spoteri",
  },
  {
    id: "2",
    slug: "spoter-s-regulator",
    name: "SPOTTER – Spot Welding Device with Regulator",
    nameBg: "СПОТЕР – Апарат за точкова заварка с регулатор",
    shortDescription:
      "Spotter with power regulator – ideal for very thin sheet metal and stainless steel from 0.08mm.",
    shortDescriptionBg:
      "Спотер с регулатор на мощността – идеален за много тънка ламарина и неръждаема стомана от 0.08мм.",
    description:
      "Transformer-based spot welding device with power regulation via potentiometer. Designed for very thin sheet metal and stainless steel from 0.08mm thickness. Includes manual and automatic welding modes. Bulgarian-made, powerful, reliable, for professional use.",
    descriptionBg:
      "Спотер – обратен чук с регулатор. Апаратът е трансформаторен и е предназначен за автотенекеджийски услуги. Предназначен и за много тънка ламарина, също и за заваряване на неръждаема стомана с дебелина от 0.08 мм. Възможност за регулиране на мощността посредством потенциометър.",
    specs: [
      { label: "Supply Voltage", labelBg: "Захранващо напрежение", value: "220V" },
      { label: "Open Circuit Voltage", labelBg: "Напрежение на празен ход", value: "7V" },
      { label: "Weight", labelBg: "Тегло", value: "25 кг" },
      { label: "Work Cable", labelBg: "Работен кабел", value: "2м" },
      { label: "Ground Cable", labelBg: "Кабел маса", value: "2м" },
    ],
    features: [
      "Power regulation via potentiometer",
      "Suitable for very thin sheet metal (from 0.08mm)",
      "Works with stainless steel",
      "Reverse hammer – pulling via star welding",
      "Manual and automatic welding modes",
      "Heating with carbon electrode and copper tip",
    ],
    featuresBg: [
      "Регулиране на мощността посредством потенциометър",
      "Подходящ за много тънка ламарина (от 0.08мм)",
      "Работи с неръждаема стомана",
      "Работа с обратен чук – изтегляне посредством заваряване на звезди",
      "Ръчен и автоматичен режим на заваряване",
      "Нагряване с коксов електрод и меден накрайник",
    ],
    image: "/images/products/spoter-2.jpg",
    images: ["/images/products/spoter-2.jpg"],
    availability: "in-stock",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Спотери",
    categorySlug: "spoteri",
  },
  {
    id: "3",
    slug: "spoter-tochkovo-chelno-zavaryavane",
    name: "SPOTTER – Spot & Butt Welding Device",
    nameBg: "СПОТЕР – Апарат за точково и челно заваряване",
    shortDescription:
      "Three-phase transformer spotter for spot and butt welding. Professional grade, 380V.",
    shortDescriptionBg:
      "Трифазен трансформаторен спотер за точково и челно заваряване. Професионален клас, 380V.",
    description:
      "Three-phase transformer spot and butt welding device for professional auto body shops. Features butt welding mode for welding sheet metal along fenders, sills, and chassis areas. Power and time regulation adjustable to sheet metal thickness. Can also be used by sculptors for metal art.",
    descriptionBg:
      "Апарат за точково и челно заваряване – Спотер – обратен чук. Трансформаторен, трифазен. Предназначен за автотенекеджийски услуги, заваряване на детайли от ламарина в режим на пункшвайц. Възможност за регулиране на времето и силата за заваряване в зависимост от дебелината на ламарината.",
    specs: [
      { label: "Supply Voltage", labelBg: "Захранващо напрежение", value: "380V" },
      { label: "Open Circuit Voltage", labelBg: "Напрежение на празен ход", value: "7V" },
      { label: "Weight", labelBg: "Тегло", value: "55 кг" },
      { label: "Cable", labelBg: "Кабел", value: "95 кв.мм – 2м" },
    ],
    features: [
      "Three-phase transformer design",
      "Spot welding and butt welding modes",
      "Power and time regulation",
      "Suitable for sculptors and metal art",
      "Reverse hammer with star welding",
      "Carbon and copper electrode heating",
    ],
    featuresBg: [
      "Трифазен трансформаторен дизайн",
      "Режим на точково и челно заваряване (пункшвайц)",
      "Регулиране на мощността и времето на заваряване",
      "Подходящ за скулптори и метално изкуство",
      "Обратен чук с заваряване на звезди",
      "Нагряване с коксов и меден електрод",
    ],
    image: "/images/products/spoter-3.jpg",
    images: ["/images/products/spoter-3.jpg"],
    availability: "made-to-order",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Спотери",
    categorySlug: "spoteri",
  },
  {
    id: "4",
    slug: "kleshti-za-spoter",
    name: "Spotter Pliers – Hail Damage Repair",
    nameBg: "Клещи за спотер – градушка",
    shortDescription:
      "Pliers for spotter, designed for straightening sheet metal from light dents or hail damage.",
    shortDescriptionBg:
      "Клещи за спотер, предназначени за изправяне на ламарина от леки вдлъбнатини или градушка.",
    description:
      "Specialized pliers for spotter use, designed for straightening sheet metal from light dents or hail damage. Can also be used independently without a spotter by using a hook instead of a triangle.",
    descriptionBg:
      "Клещи за спотер, предназначени за изправяне на ламарина от леки вдлъбнатини или градушка. Могат да бъдат използвани и без спотер – с кука вместо триъгълник.",
    specs: [],
    features: [
      "Works with spotter devices",
      "Can be used independently with a hook",
      "Ideal for hail damage repair",
      "Professional sheet metal straightening",
    ],
    featuresBg: [
      "Работи със спотер апарати",
      "Може да се използва самостоятелно с кука",
      "Идеален за ремонт след градушка",
      "Професионално изправяне на ламарина",
    ],
    image: "/images/products/kleshti-1.jpg",
    images: ["/images/products/kleshti-1.jpg"],
    availability: "in-stock",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Аксесоари",
    categorySlug: "aksesoari",
  },
  {
    id: "5",
    slug: "startreno-zaradno-ustroistvo-12v",
    name: "Starter-Charger 12V – 600A",
    nameBg: "Стартерно–зарядно устройство 12V",
    shortDescription:
      "Transformer starter-charger for 12V batteries with 600A starter current.",
    shortDescriptionBg:
      "Трансформаторно стартерно-зарядно устройство за 12V акумулатори с 600A стартерен ток.",
    description:
      "Transformer device for charging and starting batteries of cars, vans, and other vehicles. Delivers powerful 600A starter current for reliable engine starting even in cold conditions.",
    descriptionBg:
      "Трансформаторно устройство за зареждане и стартиране на акумулатори на автомобили, бусове и др. Мощен стартерен ток 600А за надеждно стартиране на двигателя дори при студени условия.",
    specs: [
      { label: "Voltage", labelBg: "Напрежение", value: "12V" },
      { label: "Starter Current", labelBg: "Стартерен ток", value: "600A" },
    ],
    features: [
      "600A starter current",
      "Charging and starting function",
      "For cars, vans, and light vehicles",
      "Transformer-based reliability",
    ],
    featuresBg: [
      "600A стартерен ток",
      "Функция за зареждане и стартиране",
      "За автомобили, бусове и леки превозни средства",
      "Трансформаторна надеждност",
    ],
    image: "/images/products/szu-12v.jpg",
    images: ["/images/products/szu-12v.jpg"],
    availability: "in-stock",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Стартерно-зарядни устройства",
    categorySlug: "starterno-zaradni",
  },
  {
    id: "6",
    slug: "starterno-zaradno-ustroistvo-12-24v-1400a",
    name: "Starter-Charger 12/24V – 1400A",
    nameBg: "Стартерно–зарядно устройство 12/24V 1400A",
    shortDescription:
      "Heavy-duty single/three-phase starter-charger with 1400A for trucks and heavy equipment.",
    shortDescriptionBg:
      "Мощно моно/трифазно стартерно-зарядно устройство с 1400А за камиони и тежка техника.",
    description:
      "Professional single-phase/three-phase starter-charger with 1400A current and smooth charging regulation. Designed for cars, vans, trucks, excavators, and other heavy equipment. 12/24V selectable voltage output.",
    descriptionBg:
      "Професионално моно/трифазно стартерно-зарядно устройство с 1400А ток и плавна регулировка на зарядния ток. Предназначено за автомобили, бусове, камиони, багери и друга тежка техника. Възможност за избор на 12/24V изходно напрежение.",
    specs: [
      { label: "Voltage", labelBg: "Напрежение", value: "12/24V" },
      { label: "Starter Current", labelBg: "Стартерен ток", value: "1400A" },
      { label: "Phases", labelBg: "Фази", value: "Mono/Three-phase" },
    ],
    features: [
      "1400A starter current",
      "12/24V selectable output",
      "Smooth charging current regulation",
      "For trucks, excavators, and heavy equipment",
      "Single-phase and three-phase operation",
    ],
    featuresBg: [
      "1400А стартерен ток",
      "Избор на 12/24V изходно напрежение",
      "Плавна регулировка на зарядния ток",
      "За камиони, багери и тежка техника",
      "Монофазно и трифазно захранване",
    ],
    image: "/images/products/szu-1400a.jpg",
    images: ["/images/products/szu-1400a.jpg"],
    availability: "made-to-order",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Стартерно-зарядни устройства",
    categorySlug: "starterno-zaradni",
  },
  {
    id: "7",
    slug: "starterno-zaradno-ustroistvo-12-24v-900a",
    name: "Starter-Charger 12/24V – 900A",
    nameBg: "Стартерно–зарядно устройство 12/24V 900A",
    shortDescription:
      "Single/three-phase starter-charger with 900A for cars, vans, and trucks.",
    shortDescriptionBg:
      "Моно/трифазно стартерно-зарядно устройство с 900А за автомобили, бусове и камиони.",
    description:
      "Professional single-phase or three-phase starter-charger with 900A starter current. Made in Bulgaria for cars, vans, and trucks.",
    descriptionBg:
      "Професионално монофазно или трифазно стартерно-зарядно устройство с 900А стартерен ток. Произведено в България за автомобили, бусове и камиони.",
    specs: [
      { label: "Voltage", labelBg: "Напрежение", value: "12/24V" },
      { label: "Starter Current", labelBg: "Стартерен ток", value: "900A" },
    ],
    features: [
      "900A starter current",
      "12/24V selectable output",
      "Made in Bulgaria",
      "Single-phase and three-phase operation",
    ],
    featuresBg: [
      "900А стартерен ток",
      "Избор на 12/24V изходно напрежение",
      "Произведено в България",
      "Монофазно и трифазно захранване",
    ],
    image: "/images/products/szu-900a.jpg",
    images: ["/images/products/szu-900a.jpg"],
    availability: "in-stock",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Стартерно-зарядни устройства",
    categorySlug: "starterno-zaradni",
  },
  {
    id: "8",
    slug: "transformatori-100w-20kw",
    name: "Transformers 100W – 20kW",
    nameBg: "Трансформатори от 100W до 20kW",
    shortDescription:
      "Custom transformers for various applications – from battery chargers to welding equipment.",
    shortDescriptionBg:
      "Трансформатори по поръчка за различни приложения – от зарядни устройства до заваръчна техника.",
    description:
      "Range of single-phase and three-phase transformers from 100W to 20kW. Available as standard models (12V 10A, 12-24V 10A, 80V 10A) or custom-built to customer specifications for welding equipment, power supplies, and specialized applications.",
    descriptionBg:
      "Гама от монофазни и трифазни трансформатори от 100W до 20kW. Предлагат се стандартни модели (12V 10A, 12-24V 10A, 80V 10A) или изработени по поръчка по спецификации на клиента за заваръчна техника, захранващи блокове и специализирани приложения.",
    specs: [
      { label: "Power Range", labelBg: "Диапазон на мощност", value: "100W – 20kW" },
      { label: "Types", labelBg: "Видове", value: "Single-phase & Three-phase" },
    ],
    features: [
      "12V 10A – for car battery chargers",
      "12-24V 10A – for car/van/truck battery chargers",
      "80V 10A – for amplifier power supplies",
      "Custom transformers for welding equipment",
      "Range from 100W to 20kW",
      "Single-phase and three-phase options",
    ],
    featuresBg: [
      "12V 10A – за зарядни за автомобилни акумулатори",
      "12-24V 10A – за зарядни за автомобили, бусове и камиони",
      "80V 10A – за захранващи блокове на усилватели",
      "Трансформатори по поръчка за заваръчна техника",
      "Диапазон от 100W до 20kW",
      "Монофазни и трифазни опции",
    ],
    image: "/images/products/transformatori.jpg",
    images: ["/images/products/transformatori.jpg"],
    availability: "made-to-order",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Трансформатори",
    categorySlug: "transformatori",
  },
  {
    id: "9",
    slug: "telopodavashto-ustroistvo-350a",
    name: "Wire Feeder Three-Phase 350A",
    nameBg: "Телоподаващо устройство трифазно 350А",
    shortDescription:
      "Professional three-phase wire feeder with 100% duty cycle at 300A.",
    shortDescriptionBg:
      "Професионално трифазно телоподаващо устройство с 100% работен цикъл при 300A.",
    description:
      "Three-phase transformer wire feeder designed for professional use. 100% duty cycle at 300A ensures continuous welding capability for demanding industrial applications.",
    descriptionBg:
      "Трифазно трансформаторно телоподаващо устройство, предназначено за професионална употреба. 100% работен цикъл при 300А осигурява непрекъсната заваръчна способност за взискателни индустриални приложения.",
    specs: [
      { label: "Max Current", labelBg: "Максимален ток", value: "350A" },
      { label: "Duty Cycle", labelBg: "Работен цикъл", value: "100% at 300A" },
      { label: "Phases", labelBg: "Фази", value: "Three-phase" },
    ],
    features: [
      "100% duty cycle at 300A",
      "Three-phase transformer design",
      "Professional industrial use",
      "Heavy-duty continuous welding",
    ],
    featuresBg: [
      "100% работен цикъл при 300A",
      "Трифазен трансформаторен дизайн",
      "Професионална индустриална употреба",
      "Непрекъснато заваряване при тежки условия",
    ],
    image: "/images/products/telopodavashto-350a.jpg",
    images: ["/images/products/telopodavashto-350a.jpg"],
    availability: "made-to-order",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Телоподаващи устройства",
    categorySlug: "telopodavashti",
  },
  {
    id: "10",
    slug: "telopodavashto-ustroistvo-200a",
    name: "Wire Feeder Single-Phase 200A",
    nameBg: "Телоподаващо устройство монофазно 200А",
    shortDescription:
      "Single-phase wire feeder with smooth welding current regulation. Works with small and large wire rolls.",
    shortDescriptionBg:
      "Монофазно телоподаващо устройство с плавна регулировка на заваръчния ток. Работи с малки и големи ролки тел.",
    description:
      "Single-phase wire feeder with smooth welding current regulation. Compatible with both small and large wire rolls, offering flexibility for various welding applications.",
    descriptionBg:
      "Монофазно телоподаващо устройство с плавна регулировка на заваръчния ток. Съвместимо с малки и големи ролки тел, предлагащо гъвкавост за различни заваръчни приложения.",
    specs: [
      { label: "Max Current", labelBg: "Максимален ток", value: "200A" },
      { label: "Phases", labelBg: "Фази", value: "Single-phase" },
    ],
    features: [
      "Smooth welding current regulation",
      "Works with small and large wire rolls",
      "Single-phase operation (220V)",
      "Versatile for various applications",
    ],
    featuresBg: [
      "Плавна регулировка на заваръчния ток",
      "Работи с малки и големи ролки тел",
      "Монофазно захранване (220V)",
      "Универсалност за различни приложения",
    ],
    image: "/images/products/telopodavashto-200a.jpg",
    images: ["/images/products/telopodavashto-200a.jpg"],
    availability: "in-stock",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Телоподаващи устройства",
    categorySlug: "telopodavashti",
  },
  {
    id: "11",
    slug: "telopodavashto-ustroistvo-250a",
    name: "Wire Feeder 250A",
    nameBg: "Телоподаващо устройство 250А",
    shortDescription:
      "Single-phase wire feeder with 100% duty cycle at 250A and smooth current regulation.",
    shortDescriptionBg:
      "Монофазно телоподаващо устройство със 100% работен цикъл при 250A и плавна регулировка.",
    description:
      "Single-phase transformer wire feeder with smooth welding current regulation and 100% duty cycle at 250A. Reliable and efficient for professional welding tasks.",
    descriptionBg:
      "Монофазно трансформаторно телоподаващо устройство с плавна регулировка на заваръчния ток и 100% работен цикъл при 250A. Надеждно и ефективно за професионални заваръчни задачи.",
    specs: [
      { label: "Max Current", labelBg: "Максимален ток", value: "250A" },
      { label: "Duty Cycle", labelBg: "Работен цикъл", value: "100% at 250A" },
      { label: "Phases", labelBg: "Фази", value: "Single-phase" },
    ],
    features: [
      "100% duty cycle at 250A",
      "Smooth welding current regulation",
      "Single-phase transformer design",
      "Professional reliability",
    ],
    featuresBg: [
      "100% работен цикъл при 250A",
      "Плавна регулировка на заваръчния ток",
      "Монофазен трансформаторен дизайн",
      "Професионална надеждност",
    ],
    image: "/images/products/telopodavashto-250a.jpg",
    images: ["/images/products/telopodavashto-250a.jpg"],
    availability: "in-stock",
    warranty: "24 месеца гаранция и следгаранционен сервиз",
    category: "Телоподаващи устройства",
    categorySlug: "telopodavashti",
  },
];

export const categories = [
  { slug: "spoteri", name: "Спотери", nameEn: "Spotters" },
  { slug: "starterno-zaradni", name: "Стартерно-зарядни устройства", nameEn: "Starter-Chargers" },
  { slug: "transformatori", name: "Трансформатори", nameEn: "Transformers" },
  { slug: "telopodavashti", name: "Телоподаващи устройства", nameEn: "Wire Feeders" },
  { slug: "aksesoari", name: "Аксесоари", nameEn: "Accessories" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}
