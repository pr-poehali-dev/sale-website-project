import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  style: string;
};

type CartItem = Product & { quantity: number; selectedSize: string; selectedColor: string };

const products: Product[] = [
  {
    id: 1,
    name: 'Стильная куртка',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/1840d338-df77-4f59-b0d7-227c6e6df271/files/e370735c-95bf-45c4-8c25-9102ff2241a9.jpg',
    category: 'Одежда',
    colors: ['Черный', 'Серый', 'Бежевый'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    style: 'Casual'
  },
  {
    id: 2,
    name: 'Модные аксессуары',
    price: 2990,
    image: 'https://cdn.poehali.dev/projects/1840d338-df77-4f59-b0d7-227c6e6df271/files/a907e6d7-6296-4f02-9128-986cb98dffa4.jpg',
    category: 'Аксессуары',
    colors: ['Золото', 'Серебро'],
    sizes: ['ONE SIZE'],
    style: 'Elegant'
  },
  {
    id: 3,
    name: 'Кроссовки Urban',
    price: 7990,
    image: 'https://cdn.poehali.dev/projects/1840d338-df77-4f59-b0d7-227c6e6df271/files/e0ba62b4-93b3-413a-b19c-31b7545c68d0.jpg',
    category: 'Обувь',
    colors: ['Белый', 'Черный', 'Синий'],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    style: 'Sport'
  },
  {
    id: 4,
    name: 'Классическое пальто',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/1840d338-df77-4f59-b0d7-227c6e6df271/files/e370735c-95bf-45c4-8c25-9102ff2241a9.jpg',
    category: 'Одежда',
    colors: ['Черный', 'Бежевый', 'Серый'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    style: 'Elegant'
  },
  {
    id: 5,
    name: 'Спортивная сумка',
    price: 3490,
    image: 'https://cdn.poehali.dev/projects/1840d338-df77-4f59-b0d7-227c6e6df271/files/a907e6d7-6296-4f02-9128-986cb98dffa4.jpg',
    category: 'Аксессуары',
    colors: ['Черный', 'Серый', 'Синий'],
    sizes: ['ONE SIZE'],
    style: 'Sport'
  },
  {
    id: 6,
    name: 'Летние кеды',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/1840d338-df77-4f59-b0d7-227c6e6df271/files/e0ba62b4-93b3-413a-b19c-31b7545c68d0.jpg',
    category: 'Обувь',
    colors: ['Белый', 'Розовый', 'Мятный'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    style: 'Casual'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeSection, setActiveSection] = useState('hero');

  const allColors = ['Черный', 'Белый', 'Серый', 'Бежевый', 'Синий', 'Розовый', 'Золото', 'Серебро', 'Мятный'];
  const allStyles = ['Casual', 'Elegant', 'Sport'];

  const filteredProducts = products.filter(product => {
    const colorMatch = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c));
    const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(product.style);
    return colorMatch && styleMatch;
  });

  const addToCart = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) return;
    
    const existingItem = cart.find(
      item => item.id === selectedProduct.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === selectedProduct.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...selectedProduct, quantity: 1, selectedSize, selectedColor }]);
    }
    
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Shirt" className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FASHION STORE</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#hero" onClick={() => setActiveSection('hero')} className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
            <a href="#catalog" onClick={() => setActiveSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#about" onClick={() => setActiveSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#delivery" onClick={() => setActiveSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">Доставка</a>
            <a href="#reviews" onClick={() => setActiveSection('reviews')} className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
            <a href="#blog" onClick={() => setActiveSection('blog')} className="text-sm font-medium hover:text-primary transition-colors">Блог</a>
            <a href="#contacts" onClick={() => setActiveSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">Размер: {item.selectedSize}</p>
                              <p className="text-sm text-muted-foreground">Цвет: {item.selectedColor}</p>
                              <p className="text-sm font-medium mt-1">{item.price} ₽ × {item.quantity}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                            >
                              <Icon name="Trash2" className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Итого:</span>
                        <span className="text-xl font-bold">{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">Оформить заказ</Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Стиль, который вдохновляет
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Откройте для себя коллекцию современной одежды и аксессуаров. Выражайте себя через уникальный стиль.
            </p>
            <Button size="lg" className="group" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Каталог</h2>
          
          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <aside className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Palette" className="h-4 w-4" />
                    Цвет
                  </h3>
                  <div className="space-y-2">
                    {allColors.map(color => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                        />
                        <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Sparkles" className="h-4 w-4" />
                    Стиль
                  </h3>
                  <div className="space-y-2">
                    {allStyles.map(style => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={selectedStyles.includes(style)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedStyles([...selectedStyles, style]);
                            } else {
                              setSelectedStyles(selectedStyles.filter(s => s !== style));
                            }
                          }}
                        />
                        <Label htmlFor={`style-${style}`} className="text-sm cursor-pointer">
                          {style}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {(selectedColors.length > 0 || selectedStyles.length > 0) && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedColors([]);
                    setSelectedStyles([]);
                  }}
                >
                  Сбросить фильтры
                </Button>
              )}
            </aside>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 right-3">{product.style}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">{product.price} ₽</span>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(product);
                                setSelectedSize('');
                                setSelectedColor('');
                              }}
                            >
                              Выбрать
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>{product.name}</SheetTitle>
                            </SheetHeader>
                            {selectedProduct?.id === product.id && (
                              <div className="mt-6 space-y-6">
                                <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                                
                                <div>
                                  <h4 className="font-semibold mb-3">Размер</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(size => (
                                      <Button
                                        key={size}
                                        variant={selectedSize === size ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedSize(size)}
                                      >
                                        {size}
                                      </Button>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">Цвет</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {product.colors.map(color => (
                                      <Button
                                        key={color}
                                        variant={selectedColor === color ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedColor(color)}
                                      >
                                        {color}
                                      </Button>
                                    ))}
                                  </div>
                                </div>

                                <div className="border-t pt-4">
                                  <div className="flex justify-between items-center mb-4">
                                    <span className="text-muted-foreground">Цена:</span>
                                    <span className="text-2xl font-bold">{product.price} ₽</span>
                                  </div>
                                  <Button
                                    className="w-full"
                                    size="lg"
                                    disabled={!selectedSize || !selectedColor}
                                    onClick={addToCart}
                                  >
                                    Добавить в корзину
                                  </Button>
                                </div>
                              </div>
                            )}
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">О нас</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Fashion Store — это больше, чем просто магазин одежды. Мы создаём стиль жизни, вдохновляя людей выражать свою индивидуальность через моду.
            </p>
            <p className="text-lg text-muted-foreground">
              Наша команда тщательно отбирает каждую вещь, чтобы предложить вам качественные, трендовые и доступные решения для любого случая.
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Truck" className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-sm text-muted-foreground">Доставим ваш заказ в течение 1-3 дней по всей России</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="MapPin" className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Пункты выдачи</h3>
                <p className="text-sm text-muted-foreground">Более 2000 пунктов выдачи в городах России</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="CreditCard" className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Оплата при получении</h3>
                <p className="text-sm text-muted-foreground">Оплачивайте заказ удобным для вас способом</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Отзывы</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Анна К.', text: 'Отличное качество! Заказываю уже третий раз, всё идеально сидит.', rating: 5 },
              { name: 'Дмитрий П.', text: 'Быстрая доставка и приятные цены. Рекомендую!', rating: 5 },
              { name: 'Елена М.', text: 'Модные вещи, современный дизайн. Осталась очень довольна покупкой.', rating: 5 }
            ].map((review, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">{review.text}</p>
                  <p className="font-semibold text-sm">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Блог</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Тренды весна-лето 2025', date: '15 марта 2025' },
              { title: 'Как подобрать идеальный гардероб', date: '10 марта 2025' },
              { title: 'Уход за одеждой: советы экспертов', date: '5 марта 2025' }
            ].map((post, i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4"></div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <p className="text-sm text-muted-foreground">info@fashionstore.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Телефон</p>
                        <p className="text-sm text-muted-foreground">+7 (800) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Адрес</p>
                        <p className="text-sm text-muted-foreground">г. Москва, ул. Модная, д. 1</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Время работы</p>
                        <p className="text-sm text-muted-foreground">Пн-Вс: 9:00 - 21:00</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="icon" variant="outline">
                        <Icon name="Instagram" className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Icon name="Facebook" className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Icon name="Twitter" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 bg-foreground/5">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Fashion Store. Все права защищены.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
