import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size: string;
  product: {
    id: string;
    name: string;
    price: number;
    firstImage: string;
  };
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.size === item.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existing.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, id: Math.random().toString() }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: 'weverse-cart',
    }
  )
);

interface AuthStore {
  userId: string | null;
  user: { id: string; email: string; name: string } | null;
  setUser: (user: { id: string; email: string; name: string } | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  userId: null,
  user: null,
  setUser: (user) => set({ user, userId: user?.id || null }),
  logout: () => set({ user: null, userId: null }),
}));

interface UIStore {
  showCart: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  showToast: boolean;
  toastMessage: string;
  showToastMessage: (message: string) => void;
  hideToast: () => void;
}

export const useUI = create<UIStore>((set) => ({
  showCart: false,
  toggleCart: () => set((state) => ({ showCart: !state.showCart })),
  closeCart: () => set({ showCart: false }),
  showToast: false,
  toastMessage: '',
  showToastMessage: (message) => set({ showToast: true, toastMessage: message }),
  hideToast: () => set({ showToast: false, toastMessage: '' }),
}));
