import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  //loading data
  useEffect(() => {
    //fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error while fetching data");
      }
    };
    //Call fetch function
    fetchData();
  }, []);

  //filtering data base on categories
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data

  const showAll = () => {
    setFilteredItems(menu);
    selectedCategory("all");
    setCurrentPage(1);
  };

  // sorting base on A-Z, Z-A, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItems, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-40 flex flex-col justify-center items-center">
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the love of Delicious{" "}
              <span className="text-success">Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] py-2 md:w-4/5 mx-auto">
              Come with family and friends to feel the joy of mouthwatering food
              such as Salad, Ice-cream, Sharwama, Samosa, Butternut, Pizza,
              Milky-Doughnut, Fried Rice, Chicken and many more for a moderate
              cost
            </p>
            <button className="btn bg-success px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* Menu List Section */}
      <div className="section-container">
        {/* filter btn and sort */}
        <div className="flex  flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* List btn */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("Sharwama")}
              className={selectedCategory === "Sharwama" ? "active" : ""}
            >
              Sharwama
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soup
            </button>
            <button
              onClick={() => filterItems("Ice-cream")}
              className={selectedCategory === "Ice-cream" ? "active" : ""}
            >
              Ice-cream
            </button>
            <button
              onClick={() => filterItems("Rice")}
              className={selectedCategory === "Rice" ? "active" : ""}
            >
              Rice
            </button>
            <button
              onClick={() => filterItems("Milky-Doughnut")}
              className={selectedCategory === "Milky-Doughnut" ? "active" : ""}
            >
              Milk-Doughnut
            </button>
          </div>

          {/* sorting filter */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>
            {/* sorting options */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-2 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
      {/* Paginations */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-success text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
