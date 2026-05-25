import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    name: 'Official Light Stick',
    price: 35.99,
    category: 'Light Stick',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-1-front.jpeg', 'product-1-back.jpeg', 'product-1-detail.jpeg', 'product-1-label.jpeg'],
  },
  {
    name: 'Hoodie - Black',
    price: 59.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-2-front.jpeg', 'product-2-back.jpeg', 'product-2-detail.jpeg'],
  },
  {
    name: 'Graphic T-Shirt',
    price: 29.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-3-front.jpeg', 'product-3-back.jpeg', 'product-3-detail.jpeg'],
  },
  {
    name: 'Baseball Cap',
    price: 24.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-4-front.jpeg', 'product-4-back.jpeg', 'product-4-label.jpeg'],
  },
  {
    name: 'Crossbody Bag',
    price: 44.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-5-front.jpeg', 'product-5-back.jpeg', 'product-5-detail.jpeg', 'product-5-label.jpeg'],
  },
  {
    name: 'Beanie Hat',
    price: 19.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-6-front.jpeg', 'product-6-back.jpeg'],
  },
  {
    name: 'Crew Socks Pack',
    price: 15.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-7-front.jpeg', 'product-7-detail.jpeg'],
  },
  {
    name: 'Phone Case',
    price: 19.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-8-front.jpeg', 'product-8-back.jpeg', 'product-8-detail.jpeg'],
  },
  {
    name: 'Tote Bag',
    price: 22.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-9-front.jpeg', 'product-9-back.jpeg', 'product-9-detail.jpeg'],
  },
  {
    name: 'Slap Bracelet',
    price: 9.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-10-front.jpeg'],
  },
  {
    name: 'Zip Hoodie',
    price: 64.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-11-front.jpeg', 'product-11-back.jpeg', 'product-11-detail.jpeg'],
  },
  {
    name: 'Long Sleeve Tee',
    price: 34.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-12-front.jpeg', 'product-12-back.jpeg', 'product-12-detail.jpeg'],
  },
  {
    name: 'Sweatpants',
    price: 54.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-13-front.jpeg', 'product-13-back.jpeg', 'product-13-detail.jpeg'],
  },
  {
    name: 'Baseball Jersey',
    price: 49.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-14-front.jpeg', 'product-14-back.jpeg', 'product-14-label.jpeg'],
  },
  {
    name: 'Oversized Tee',
    price: 32.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-15-front.jpeg', 'product-15-back.jpeg', 'product-15-detail.jpeg'],
  },
  {
    name: 'Bucket Hat',
    price: 27.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-16-front.jpeg', 'product-16-back.jpeg', 'product-16-label.jpeg'],
  },
  {
    name: 'Keychain',
    price: 7.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-17-front.jpeg', 'product-17-detail.jpeg'],
  },
  {
    name: 'Water Bottle',
    price: 18.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-18-front.jpeg', 'product-18-side.jpeg'],
  },
  {
    name: 'Scarf',
    price: 34.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-19-front.jpeg', 'product-19-folded.jpeg'],
  },
  {
    name: 'Hair Clip Set',
    price: 12.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-20-front.jpeg', 'product-20-detail.jpeg'],
  },
  {
    name: 'Track Pants',
    price: 52.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-21-front.jpeg', 'product-21-back.jpeg', 'product-21-detail.jpeg'],
  },
  {
    name: 'Graphic Hoodie',
    price: 62.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-22-front.jpeg', 'product-22-back.jpeg', 'product-22-detail.jpeg', 'product-22-label.jpeg'],
  },
  {
    name: 'Crop Top',
    price: 26.99,
    category: 'Apparel',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-23-front.jpeg', 'product-23-back.jpeg', 'product-23-detail.jpeg'],
  },
  {
    name: 'Backpack',
    price: 74.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-24-front.jpeg', 'product-24-back.jpeg', 'product-24-detail.jpeg', 'product-24-side.jpeg'],
  },
  {
    name: 'Beaded Necklace',
    price: 16.99,
    category: 'Accessories',
    badges: ['EXCLUSIVE', 'LIMITED'],
    images: ['product-25-front.jpeg', 'product-25-detail.jpeg'],
  },
];

async function main() {
  console.log('Starting database seed...');

  // Clear existing products
  await prisma.product.deleteMany();
  console.log('Cleared existing products');

  // Create products
  for (const product of PRODUCTS) {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        category: product.category,
        badge1: product.badges[0] || null,
        badge2: product.badges[1] || null,
        images: JSON.stringify(product.images),
      },
    });
    console.log(`✓ Created: ${created.name}`);
  }

  console.log('\nDatabase seed completed successfully!');
  console.log(`Total products: ${PRODUCTS.length}`);
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
