import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// GET /api/products - list all products with only first image for grid
app.get('/api/products', async (req, res) => {
  try {
    const category = req.query.category as string;
    
    const products = await prisma.product.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'asc' },
    });

    const formattedProducts = products.map((p) => {
      const images = JSON.parse(p.images);
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        firstImage: images[0] || '/images/placeholder.jpg', // Only first image for grid
        category: p.category,
        badges: JSON.parse(p.badges),
        stock: p.stock,
        countdownEnd: p.countdownEnd,
        shippingTag: p.shippingTag,
      };
    });

    res.json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - get full product with all images for detail page
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      id: product.id,
      name: product.name,
      price: product.price,
      images: JSON.parse(product.images), // All images for gallery
      category: product.category,
      badges: JSON.parse(product.badges),
      stock: product.stock,
      countdownEnd: product.countdownEnd,
      shippingTag: product.shippingTag,
      description: product.description,
      sizes: JSON.parse(product.sizes),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // For demo purposes, we'll use a simple hash
    const passwordHash = await require('bcryptjs').hash(password, 10);
    
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });

    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const bcrypt = require('bcryptjs');
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// GET /api/cart
app.get('/api/cart', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    const formatted = items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        firstImage: JSON.parse(item.product.images)[0],
      },
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart
app.post('/api/cart', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { productId, quantity, size } = req.body;

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId_size: { userId, productId, size } },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
      return res.json(updated);
    }

    const item = await prisma.cartItem.create({
      data: { userId, productId, quantity, size },
    });

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:itemId
app.delete('/api/cart/:itemId', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { itemId } = req.params;
    
    await prisma.cartItem.deleteMany({
      where: { id: itemId, userId },
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

// POST /api/checkout
app.post('/api/checkout', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { shippingInfo, paymentMethod } = req.body;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      total += item.product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        price: item.product.price,
      });

      // Decrement stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        items: JSON.stringify(orderItems),
        total,
        status: 'completed',
        shippingInfo: JSON.stringify(shippingInfo),
      },
    });

    // Create order items for reference
    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        },
      });
    }

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    res.json({
      orderId: order.id,
      orderNumber: `ORD-${Date.now()}`,
      total,
      status: 'completed',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for ${FRONTEND_URL}`);
});
