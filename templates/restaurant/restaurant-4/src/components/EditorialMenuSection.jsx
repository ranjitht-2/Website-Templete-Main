import React, { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'ALL DISHES' },
  { id: 'starters', label: 'STARTERS' },
  { id: 'mains', label: 'MAINS' },
  { id: 'sea', label: 'FROM THE SEA' },
  { id: 'vegetables', label: 'VEGETABLES' },
  { id: 'dessert', label: 'DESSERT' }
];

const MENU_CATEGORIES = [
  {
    id: 'starters',
    label: 'STARTERS',
    items: [
      { id: 1, name: 'Charred Heirloom Tomato', ingredients: 'fresh burrata • garden basil • cold-pressed olive oil', price: '₹620', img: 'assets/images/dish_octopus.jpg' },
      { id: 2, name: 'Smoked Beetroot Tartare', ingredients: 'goat cheese mousse • pickled mustard seed • rye crisp', price: '₹580', img: 'assets/images/kitchen.jpg' },
      { id: 3, name: 'Crispy Zucchini Blossoms', ingredients: 'wild thyme ricotta • raw honey • lemon zest', price: '₹650', img: 'assets/images/signature.jpg' }
    ]
  },
  {
    id: 'mains',
    label: 'MAINS',
    items: [
      { id: 4, name: 'Wood-Fired Aged Lamb', ingredients: 'charred onion puree • mint jus • roasted roots', price: '₹1,350', img: 'assets/images/dish_beef.jpg' },
      { id: 5, name: 'Roasted Organic Duck Breast', ingredients: 'fig reduction • caramelized shallot • coriander broth', price: '₹1,480', img: 'assets/images/hero.jpg' }
    ]
  },
  {
    id: 'sea',
    label: 'FROM THE SEA',
    items: [
      { id: 6, name: 'Roasted Sea Bass', ingredients: 'shaved fennel • citrus reduction • garden herbs', price: '₹1,150', img: 'assets/images/kitchen.jpg' },
      { id: 7, name: 'Charred Bay Octopus', ingredients: 'smoked paprika oil • roasted fingerlings • caper berry', price: '₹1,280', img: 'assets/images/dish_octopus.jpg' }
    ]
  },
  {
    id: 'vegetables',
    label: 'VEGETABLES',
    items: [
      { id: 8, name: 'Wild Mushroom Tagliatelle', ingredients: 'thyme embers • aged parmesan • brown butter', price: '₹780', img: 'assets/images/signature.jpg' },
      { id: 9, name: 'Roasted Cauliflower Steak', ingredients: 'hazelnut pesto • pomegranate • charred herb salsa', price: '₹720', img: 'assets/images/hero.jpg' }
    ]
  },
  {
    id: 'dessert',
    label: 'DESSERT',
    items: [
      { id: 10, name: 'Smoked Dark Chocolate Tart', ingredients: 'birch syrup gelato • caramelized nibs', price: '₹480', img: 'assets/images/dish_dessert.jpg' },
      { id: 11, name: 'Cardamom Panna Cotta', ingredients: 'poached winter pear • pistachio crumble • rose water', price: '₹450', img: 'assets/images/night.jpg' }
    ]
  }
];

export default function EditorialMenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoverImgSrc, setHoverImgSrc] = useState('assets/images/dish_octopus.jpg');
  const [isHoverVisible, setIsHoverVisible] = useState(false);
  const [selectedDishModal, setSelectedDishModal] = useState(null);
  const hoverRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateHoverPosition = () => {
      if (hoverRef.current) {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        hoverRef.current.style.left = `${currentX + 20}px`;
        hoverRef.current.style.top = `${currentY}px`;
      }
      animId = requestAnimationFrame(updateHoverPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(updateHoverPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleItemMouseEnter = (e, img) => {
    if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;
    setHoverImgSrc(img);
    setIsHoverVisible(true);
  };

  const handleItemMouseLeave = () => {
    setIsHoverVisible(false);
  };

  const handleItemClick = (item) => {
    if (window.innerWidth < 1024) {
      setSelectedDishModal(item);
    }
  };

  const visibleCategories = activeCategory === 'all'
    ? MENU_CATEGORIES
    : MENU_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section id="menu" className="menu-section-editorial" style={{ padding: 'var(--section-gap) var(--site-padding)' }}>
      <div className="container">
        <div className="menu-editorial-grid">
          {/* Category Navigation Sidebar / Responsive Pills */}
          <div className="menu-category-sidebar">
            <span className="menu-sidebar-title">SEASONAL OFFERINGS</span>
            <div className="menu-category-buttons-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`menu-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  data-category={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsHoverVisible(false);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grouped List Container */}
          <div className="menu-items-list-container">
            {visibleCategories.map((catGroup) => (
              <div key={catGroup.id} className="menu-category-group flex flex-col gap-6 w-full mb-8">
                <span className="menu-category-heading text-xs uppercase tracking-widest text-stone-400 mb-2 block">
                  {catGroup.label}
                </span>

                <div className="menu-category-items-list">
                  {catGroup.items.map((item) => (
                    <div
                      key={item.id}
                      className="menu-editorial-item flex items-start justify-between w-full gap-4 py-3 border-b border-stone-200/50"
                      data-category={catGroup.id}
                      data-img={item.img}
                      data-cursor="SELECT"
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={(e) => handleItemMouseEnter(e, item.img)}
                      onMouseLeave={handleItemMouseLeave}
                    >
                      <div className="menu-item-left">
                        <h3 className="menu-item-name">{item.name}</h3>
                        <div className="menu-item-ingredients">{item.ingredients}</div>
                      </div>
                      <div className="menu-item-price-tag shrink-0">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Dish Preview Photo (Desktop Only) */}
      <div
        className={`menu-hover-photo-container ${isHoverVisible ? 'visible' : ''}`}
        id="menu-hover-photo"
        ref={hoverRef}
      >
        <img src={hoverImgSrc} alt="Dish Preview" />
      </div>

      {/* Tablet / Mobile Interactive Modal Preview */}
      {selectedDishModal && (
        <div 
          className="menu-mobile-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedDishModal(null)}
        >
          <div 
            className="menu-mobile-modal-card bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 text-xl font-bold bg-stone-100 rounded-full w-8 h-8 flex items-center justify-center border-none cursor-pointer"
              onClick={() => setSelectedDishModal(null)}
            >
              ✕
            </button>
            <div className="w-full h-48 rounded-xl overflow-hidden mb-4 shadow-md">
              <img 
                src={selectedDishModal.img} 
                alt={selectedDishModal.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80";
                }}
              />
            </div>
            <div className="flex justify-between items-baseline gap-2 mb-2">
              <h3 className="font-serif text-xl font-bold text-stone-800 m-0">{selectedDishModal.name}</h3>
              <span className="font-bold text-stone-700 text-lg shrink-0">{selectedDishModal.price}</span>
            </div>
            <p className="text-stone-500 text-sm italic m-0">{selectedDishModal.ingredients}</p>
          </div>
        </div>
      )}
    </section>
  );
}
