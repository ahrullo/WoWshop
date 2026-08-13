import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function placeholder(bg: string, text: string) {
  return `https://placehold.co/600x600/${bg}/ffffff?font=roboto&text=${encodeURIComponent(text)}`;
}

const products = [
  // Светильники
  {
    slug: "nochnik-luna-3d",
    name: 'Ночник "Луна" 3D',
    description:
      "Светильник в форме Луны с реалистичной 3D-печатью поверхности. 16 цветов подсветки, пульт ДУ, работает от USB.",
    price: 1490,
    category: "lamps",
    imageUrl: placeholder("6d28d9", "Луна"),
    featured: true,
  },
  {
    slug: "lampa-oblako-molnii",
    name: "Лампа-облако с молниями",
    description:
      "Настольный светильник в виде грозового облака с эффектом молний внутри и звуком дождя. Отличный подарок.",
    price: 2290,
    category: "lamps",
    imageUrl: placeholder("4c1d95", "Облако"),
  },
  {
    slug: "proektor-zvezdnoe-nebo",
    name: 'Проектор "Звёздное небо"',
    description:
      "Проекционный светильник создаёт эффект звёздного неба и северного сияния на потолке. Управление со смартфона.",
    price: 1990,
    category: "lamps",
    imageUrl: placeholder("312e81", "Звезды"),
    featured: true,
  },

  // Игрушки
  {
    slug: "popit-unicorn",
    name: "Поп-ит антистресс Единорог",
    description:
      "Силиконовая игрушка-антистресс в форме единорога. Приятно щёлкает, снимает напряжение, безопасна для детей.",
    price: 390,
    category: "toys",
    imageUrl: placeholder("db2777", "Pop It"),
  },
  {
    slug: "slime-svetyashiysya",
    name: "Слайм светящийся в темноте",
    description: "Мягкий тягучий слайм, светится в темноте после зарядки светом. Не пачкает руки.",
    price: 350,
    category: "toys",
    imageUrl: placeholder("be185d", "Slime"),
  },
  {
    slug: "neocube-magnit",
    name: "Неокуб — магнитный конструктор",
    description:
      "216 магнитных шариков 5мм для сборки бесконечных фигур. Тренирует мелкую моторику и снимает стресс.",
    price: 690,
    category: "toys",
    imageUrl: placeholder("9d174d", "Neocube"),
  },

  // Канцтовары
  {
    slug: "ruchka-10-tsvetov",
    name: "Ручка-многоцветка 10 в 1",
    description: "Шариковая ручка с 10 цветными стержнями в одном корпусе. Удобное переключение цвета.",
    price: 290,
    category: "stationery",
    imageUrl: placeholder("047857", "10в1"),
  },
  {
    slug: "bloknot-nevidimye-chernila",
    name: "Блокнот с невидимыми чернилами",
    description: "Пишите секретные записи ручкой с УФ-фонариком — текст виден только под ультрафиолетом.",
    price: 590,
    category: "stationery",
    imageUrl: placeholder("065f46", "Секрет"),
    featured: true,
  },
  {
    slug: "tochilka-melnitsa",
    name: "Точилка-мельница с подсветкой",
    description: "Электрическая точилка для карандашей в виде мельницы, с автоотключением и LED-подсветкой.",
    price: 890,
    category: "stationery",
    imageUrl: placeholder("064e3b", "Точилка"),
  },

  // Аниме-товары
  {
    slug: "breloc-mech-samuraya",
    name: "Брелок «Меч самурая»",
    description: "Металлический брелок-катана в ножнах, длина 15см. Клинок вынимается. Подарочная упаковка.",
    price: 490,
    category: "anime",
    imageUrl: placeholder("b91c1c", "Катана"),
  },
  {
    slug: "plush-totoro",
    name: "Плюшевый Тоторо 30см",
    description: "Мягкая игрушка любимого персонажа, 30 см, супермягкий плюш, гипоаллергенный наполнитель.",
    price: 1290,
    category: "anime",
    imageUrl: placeholder("991b1b", "Totoro"),
    featured: true,
  },
  {
    slug: "kruzhka-hameleon-anime",
    name: "Кружка-хамелеон с аниме-принтом",
    description: "Меняет рисунок при заливке горячим напитком. Керамика, объём 350мл.",
    price: 690,
    category: "anime",
    imageUrl: placeholder("7f1d1d", "Кружка"),
  },

  // Необычная техника
  {
    slug: "mini-proektor-smartfon",
    name: "Мини-проектор для смартфона",
    description: "Карманный проектор с подключением по HDMI/Wi-Fi, диагональ проекции до 100 дюймов.",
    price: 3490,
    category: "gadgets",
    imageUrl: placeholder("1d4ed8", "Проектор"),
    featured: true,
  },
  {
    slug: "portativny-ventilyator-ozherelye",
    name: "Портативный вентилятор-ожерелье",
    description: "Беспроводной шейный вентилятор с 3 скоростями, работает до 8 часов от аккумулятора.",
    price: 1190,
    category: "gadgets",
    imageUrl: placeholder("1e40af", "Вентилятор"),
  },
  {
    slug: "bespro-zaryadka-oblako",
    name: "Беспроводная зарядка «Облако»",
    description: "Стильная беспроводная зарядная станция в форме облака с ночником-подсветкой по краям.",
    price: 1590,
    category: "gadgets",
    imageUrl: placeholder("1e3a8a", "Зарядка"),
  },

  // Аксессуары для телефонов
  {
    slug: "chehol-popsocket-unicorn",
    name: "Чехол с попсокетом «Единорог»",
    description: "Силиконовый чехол с объёмным 3D попсокетом-единорогом. Защита от ударов.",
    price: 590,
    category: "phone-accessories",
    imageUrl: placeholder("ea580c", "Чехол"),
  },
  {
    slug: "derzhatel-koltso-svetyashiysya",
    name: "Держатель-кольцо светящийся",
    description: "Кольцо-держатель для телефона, светится в темноте, вращается на 360°, есть подставка.",
    price: 290,
    category: "phone-accessories",
    imageUrl: placeholder("c2410c", "Кольцо"),
  },
  {
    slug: "remeshok-businy-telefon",
    name: "Ремешок для телефона с бусинами",
    description: "Трендовый плечевой ремешок-цепочка с яркими бусинами. Подходит под чехлы с отверстиями.",
    price: 450,
    category: "phone-accessories",
    imageUrl: placeholder("9a3412", "Ремешок"),
    featured: true,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
