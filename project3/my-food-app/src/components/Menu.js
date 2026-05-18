import "./Menu.css";
import { useState, useEffect } from "react";

function Menu() {
  const [menuItems, setMenuItems] = useState({
    appetizers: [],
    sideDishes: [],
    mainCourses: [],
    desserts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loadingCategory, setLoadingCategory] = useState(false);

  // Define meal course categories
  const mealCategories = [
    { id: 'appetizers', name: 'Appetizers', apiParam: 'Starter' },
    { id: 'side-dish', name: 'Side Dish', apiParam: 'Side' },
    { id: 'main-course', name: 'Main Course', apiParam: 'Beef' }, // Using Beef as main course example
    { id: 'desserts', name: 'Desserts', apiParam: 'Dessert' },
    { id: 'beverages', name: 'Beverages', apiParam: 'Drink' },
    { id: 'breakfast', name: 'Breakfast', apiParam: 'Breakfast' },
    { id: 'lunch', name: 'Lunch', apiParam: 'Chicken' }, // Using Chicken as lunch example
    { id: 'dinner', name: 'Dinner', apiParam: 'Seafood' } // Using Seafood as dinner example
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        
        // Fetch appetizers
        const appetizersRes = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=appetizers");
        const appetizersData = await appetizersRes.json();
        
        // Fetch side dishes
        const sideDishesRes = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Side");
        const sideDishesData = await sideDishesRes.json();
        
        // Fetch main courses
        const mainCoursesRes = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
        const mainCoursesData = await mainCoursesRes.json();
        
        // Fetch desserts
        const dessertsRes = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert");
        const dessertsData = await dessertsRes.json();

        setMenuItems({
          appetizers: (appetizersData.meals || []).slice(0, 3),
          sideDishes: (sideDishesData.meals || []).slice(0, 3),
          mainCourses: (mainCoursesData.meals || []).slice(0, 3),
          desserts: (dessertsData.meals || []).slice(0, 3),
        });
        
        setError(null);
      } catch (err) {
        setError("Failed to load menu items. Please try again later.");
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
    // Removed fetchCategories since we're using static meal categories
  }, []);

  const fetchItemDetails = async (mealId) => {
    try {
      setLoadingDetails(true);
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setItemDetails(data.meals[0]);
      }
    } catch (err) {
      console.error("Error fetching item details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    fetchItemDetails(item.idMeal);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setItemDetails(null);
  };

  const getIngredients = () => {
    if (!itemDetails) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = itemDetails[`strIngredient${i}`];
      const measure = itemDetails[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      // If no search query but category is selected, show category meals
      if (selectedCategory) {
        handleCategoryChange(selectedCategory);
      } else {
        setResults([]);
      }
      return;
    }
    
    setLoadingSearch(true);
    try {
      let url;
      if (selectedCategory) {
        // If category is selected, search within that category
        const selectedCat = mealCategories.find(cat => cat.id === selectedCategory);
        if (selectedCat) {
          // First get all meals from the category, then filter by search query
          const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCat.apiParam)}`;
          const categoryResponse = await fetch(categoryUrl);
          const categoryData = await categoryResponse.json();
          
          if (categoryData.meals) {
            // Filter meals that match the search query
            const filteredMeals = categoryData.meals.filter(meal => 
              meal.strMeal.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredMeals);
          } else {
            setResults([]);
          }
        }
      } else {
        // No category selected, search all meals
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.meals || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Check console for details.');
      setResults([]);
    }
    setLoadingSearch(false);
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    if (!categoryId) {
      // Clear category selection
      // If there's a search query, search all meals
      if (query.trim()) {
        handleSearch();
      } else {
        setResults([]);
      }
      return;
    }
    
    const selectedCat = mealCategories.find(cat => cat.id === categoryId);
    if (!selectedCat) return;
    
    setLoadingCategory(true);
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCat.apiParam)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const meals = data.meals || [];
      
      // If there's a search query, filter the category meals
      let filteredMeals = meals;
      if (query.trim()) {
        filteredMeals = meals.filter(meal => 
          meal.strMeal.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      setResults(filteredMeals);
    } catch (error) {
      console.error('Error fetching category meals:', error);
      alert('Error fetching category meals. Check console for details.');
      setResults([]);
    }
    setLoadingCategory(false);
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemToAdd = {
      id: item.idMeal,
      name: item.strMeal,
      image: item.strMealThumb,
      price: 599,
      quantity: 1
    };

    const existingItem = cart.find(cartItem => cartItem.id === item.idMeal);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(itemToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${item.strMeal} added to cart!`);
    closeModal();
  };

  if (loading) {
    return <div className="menu"><h1>Our Menu</h1><p>Loading menu items...</p></div>;
  }

  if (error) {
    return <div className="menu"><h1>Our Menu</h1><p>{error}</p></div>;
  }

  const renderMenuSection = (title, items) => {
    if (!items || items.length === 0) return null;

    return (
      <section className="menu-section">
        <h2>{title}</h2>
        <div className="menu-items">
          {items.map((item) => (
            <div 
              className="menu-item" 
              key={item.idMeal}
              onClick={() => handleItemClick(item)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.strMealThumb} alt={item.strMeal} />
              <h3>{item.strMeal}</h3>
              <p>{item.strCategory || "Delicious dish from our kitchen"}</p>
              <span>₱599</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="menu" id="menu">
      <h1>Our Menu</h1>

      <div className="additional-food-container">
        <h2>Search for Additional Food</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for food items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loadingSearch}>
            {loadingSearch ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="category-selector">
          <div className="category-buttons">
            <button
              className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('')}
            >
              All Categories
            </button>
            {mealCategories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="results">
          {results.map((item) => (
            <div key={item.idMeal} className="result-item" onClick={() => handleItemClick(item)} style={{ cursor: "pointer" }}>
              <img src={item.strMealThumb} alt={item.strMeal} />
              <h3>{item.strMeal}</h3>
              {selectedCategory && (
                <p className="result-category">
                  {mealCategories.find(cat => cat.id === selectedCategory)?.name}
                </p>
              )}
            </div>
          ))}
        </div>

        {loadingCategory && <p>Loading category meals...</p>}

        {selectedCategory && results.length === 0 && !loadingCategory && query.trim() && (
          <p>No meals found matching "{query}" in {mealCategories.find(cat => cat.id === selectedCategory)?.name}.</p>
        )}

        {selectedCategory && results.length === 0 && !loadingCategory && !query.trim() && (
          <p>No meals found in {mealCategories.find(cat => cat.id === selectedCategory)?.name} category.</p>
        )}
      </div>

      {renderMenuSection("Appetizers", menuItems.appetizers)}
      {renderMenuSection("Popular Side Dishes", menuItems.sideDishes)}
      {renderMenuSection("Popular Main Courses", menuItems.mainCourses)}
      {renderMenuSection("Popular Desserts", menuItems.desserts)}

      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {loadingDetails ? (
              <p>Loading details...</p>
            ) : itemDetails ? (
              <>
                <img src={itemDetails.strMealThumb} alt={itemDetails.strMeal} className="modal-image" />
                <h2>{itemDetails.strMeal}</h2>
                <p className="modal-category"><strong>Category:</strong> {itemDetails.strCategory}</p>
                <p className="modal-cuisine"><strong>Cuisine:</strong> {itemDetails.strArea}</p>
                
                <div className="modal-section">
                  <h3>Ingredients</h3>
                  <ul className="ingredients-list">
                    {getIngredients().map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h3>Instructions</h3>
                  <p>{itemDetails.strInstructions}</p>
                </div>

                <div className="modal-footer">
                  <span className="modal-price">₱599</span>
                  <button
                    className="add-to-order-btn"
                    onClick={() => addToCart(itemDetails)}
                  >
                    Add to Order
                  </button>
                </div>
              </>
            ) : (
              <p>Unable to load item details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;