export interface Service {
  id: string;
  slug: string;
  title: string;
  titleBg: string;
  description: string;
  descriptionBg: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "remont-na-zavrachna-tehnika",
    title: "Welding Equipment Repair",
    titleBg: "Ремонт на заваръчна техника",
    description:
      "Repair of all transformer welding machines and devices – wire feeders, arc welders, spot welding machines, starter and charging transformer devices.",
    descriptionBg:
      "Ремонт на всички трансформаторни заваръчни машини и апарати – телоподаващи апарати, електрожени, машини за точково заваряване, стартерни и зарядни трансформаторни устройства.",
    icon: "wrench",
  },
  {
    id: "2",
    slug: "vidove-remont",
    title: "Types of Repair",
    titleBg: "Видове ремонт",
    description:
      "Major, partial, preventive, warranty and out-of-warranty repairs. Comprehensive service for all needs.",
    descriptionBg:
      "Основен, частичен, профилактичен, гаранционен и извънгаранционен ремонт. Цялостно обслужване за всякакви нужди.",
    icon: "cog",
  },
  {
    id: "3",
    slug: "diagnostika",
    title: "Machine Diagnostics",
    titleBg: "Диагностика на машини",
    description:
      "Diagnostics of machine condition and professional recommendations for maintenance. We identify issues before they become costly problems.",
    descriptionBg:
      "Диагностика състоянието на машините и професионална препоръка за тяхната поддръжка. Идентифицираме проблеми преди да станат скъпи.",
    icon: "search",
  },
  {
    id: "4",
    slug: "remont-na-shlangove",
    title: "Hose Repair & Consumables",
    titleBg: "Ремонт на шлангове и консумативи",
    description:
      "Hose repair and supply of welding consumables. Everything you need to keep your equipment running.",
    descriptionBg:
      "Ремонт на шлангове и снабдяване с консумативи за заваряване. Всичко необходимо за поддържане на оборудването.",
    icon: "link",
  },
  {
    id: "5",
    slug: "reciklirane",
    title: "Recycling & Conversion",
    titleBg: "Рециклиране и преоборудване",
    description:
      "Recycling old machines and devices. Converting hobby equipment for professional use.",
    descriptionBg:
      "Рециклиране на стари машини и апарати. Преоборудване на хоби техника за професионална употреба.",
    icon: "recycle",
  },
  {
    id: "6",
    slug: "usilване-amperazh",
    title: "Amperage Boosting",
    titleBg: "Усилване на ампераж",
    description:
      "Amperage boosting of welding devices – increase the power output of your existing equipment.",
    descriptionBg:
      "Усилване ампеража на заваръчни апарати – повишаване мощността на съществуващото оборудване.",
    icon: "bolt",
  },
  {
    id: "7",
    slug: "izrabotka-na-transformatori",
    title: "Custom Transformer Manufacturing",
    titleBg: "Изработка на трансформатори по поръчка",
    description:
      "Repair and custom manufacturing of transformers. Design and production of specialized transformer machines and devices to customer specifications.",
    descriptionBg:
      "Ремонт и изработка по поръчка на трансформатори. Проектиране и изработка на специализирани трансформаторни машини и апарати по спецификации на клиента.",
    icon: "industry",
  },
  {
    id: "8",
    slug: "poddrzhka",
    title: "Equipment Maintenance",
    titleBg: "Поддръжка на оборудване",
    description:
      "Ongoing maintenance of welding equipment to ensure longevity and optimal performance.",
    descriptionBg:
      "Текуща поддръжка на заваръчна техника за осигуряване на дълготрайност и оптимална работа.",
    icon: "shield",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
