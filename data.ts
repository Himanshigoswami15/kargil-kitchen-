import { MenuCategory } from './types';

export const MENU_DATA: MenuCategory[] = [
  {
    id: 'starters',
    title: 'Starters',
    items: [
      {
        id: 's1',
        name: 'Truffle Arancini',
        description: 'Crispy risotto balls infused with black truffle oil, served with a garlic aioli and shaved parmesan.',
        price: '$14',
        image: 'https://picsum.photos/id/1080/400/300',
        tags: ['V']
      },
      {
        id: 's2',
        name: 'Scallop Carpaccio',
        description: 'Thinly sliced Hokkaido scallops, citrus vinaigrette, pink peppercorns, and micro cilantro.',
        price: '$22',
        image: 'https://picsum.photos/id/292/400/300',
        tags: ['GF']
      },
      {
        id: 's3',
        name: 'Wagyu Beef Tartare',
        description: 'Hand-cut Wagyu beef, cured egg yolk, capers, shallots, served with toasted sourdough crisps.',
        price: '$26',
        image: 'https://picsum.photos/id/431/400/300',
      }
    ]
  },
  {
    id: 'mains',
    title: 'Main Course',
    items: [
      {
        id: 'm1',
        name: 'Pan-Seared Duck Breast',
        description: 'Succulent duck breast with a cherry reduction, fondant potatoes, and sautéed kale.',
        price: '$38',
        image: 'https://picsum.photos/id/835/400/300',
        tags: ['GF']
      },
      {
        id: 'm2',
        name: 'Wild Mushroom Risotto',
        description: 'Arborio rice slow-cooked with porcini mushrooms, white wine, and finished with truffle butter.',
        price: '$28',
        image: 'https://picsum.photos/id/493/400/300',
        tags: ['V', 'GF']
      },
      {
        id: 'm3',
        name: 'Herb-Crusted Lamb Rack',
        description: 'Served pink with a red wine jus, minted pea purée, and roasted root vegetables.',
        price: '$45',
        image: 'https://picsum.photos/id/674/400/300',
      },
      {
        id: 'm4',
        name: 'Miso Glazed Black Cod',
        description: 'Sustainably sourced black cod marinated in sweet miso, served with bok choy and ginger dashi.',
        price: '$42',
        image: 'https://picsum.photos/id/225/400/300',
        tags: ['GF']
      }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      {
        id: 'd1',
        name: 'Dark Chocolate Fondant',
        description: 'Molten center chocolate cake served with Madagascar vanilla bean ice cream.',
        price: '$16',
        image: 'https://picsum.photos/id/1060/400/300',
        tags: ['V']
      },
      {
        id: 'd2',
        name: 'Lemon Basil Tart',
        description: 'Zesty lemon curd in a buttery pastry shell, topped with italian meringue and fresh basil.',
        price: '$14',
        image: 'https://picsum.photos/id/429/400/300',
        tags: ['V']
      }
    ]
  },
  {
    id: 'beverages',
    title: 'Beverages',
    items: [
      {
        id: 'b1',
        name: 'Signature Old Fashioned',
        description: 'Bourbon, smoked maple syrup, angostura bitters, orange peel.',
        price: '$18',
        image: 'https://picsum.photos/id/433/400/300',
      },
      {
        id: 'b2',
        name: 'Artisan Kombucha',
        description: 'House-fermented peach and ginger kombucha.',
        price: '$8',
        image: 'https://picsum.photos/id/326/400/300',
        tags: ['V', 'GF']
      }
    ]
  }
];