import React, { useEffect, useState } from "react";
import { fetchAllCategory } from "../Redux/Slices/categorySlices";
import { fetchAllProduct } from "../Redux/Slices/productSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { Down, Up } from "../assets";
import { Footer } from "../Components";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(8);

  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showDownCategory, setShowDownCategory] = useState(false);
  const [showDownPrice, setShowDownPrice] = useState(false);
  // console.log(categories);
  // console.log(products);

  const priceOptions = [
    {
      amount: "0-20",
    },
    {
      amount: "21-30",
    },
    {
      amount: "30-120",
    },
    {
      amount: "2500-5000",
    },
    {
      amount: "5000 above",
    },
  ];
  const sortOptions = [
    {
      label: "Price: Low to High",
    },
    {
      label: "Price: High to Low",
    },
    {
      label: "Newest",
    },
    {
      label: "Oldest",
    },
    {
      label: "Best Rating",
    },
  ];

  const [selectedPriceRange, setSelectedpriceRange] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handlePriceChange = (e) => {
    setSelectedpriceRange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    if (selectedCategory.includes(e.target.value)) {
      setSelectedCategory(
        selectedCategory?.filter((cat) => cat !== e.target.value)
      );
    } else {
      setSelectedCategory([...selectedCategory, e.target.value]);
    }
  };

  const filteredProducts = products?.filter((product) => {
    if (selectedPriceRange === "") {
      if (selectedCategory !== "") {
        return (
          selectedCategory.length === 0 ||
          selectedCategory.some((c) => product?.category?.includes(c))
        );
      } else {
        return true;
      }
    } else {
      if (selectedPriceRange === "5000 above") {
        return (
          product.price >= 5000 &&
          (selectedCategory.length === 0 ||
            selectedCategory.some((c) => product?.category?.includes(c)))
        );
      } else {
        const [min, max] = selectedPriceRange?.split("-").map(Number);
        return (
          product.price >= min &&
          product.price <= max &&
          (selectedCategory.length === 0 ||
            selectedCategory.some((c) => product?.category?.includes(c)))
        );
      }
    }
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (selectedSortOption === "Price: Low to High") {
      return a.price - b.price;
    } else if (selectedSortOption === "Price: High to Low") {
      return b.price - a.price;
    } else if (selectedSortOption === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (selectedSortOption === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (selectedSortOption === "Best Rating") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  const resetFilters = () => {
    setSelectedpriceRange("");
    setSelectedSortOption("");
    setSelectedCategory([]);
  };

  // pagination logic and handling changes
  const totalPages = Math.ceil(sortedProducts?.length / perPageLimit);

  const startIndex = (currentPage - 1) * perPageLimit;
  const endIndex = startIndex + perPageLimit;

  const paginatedProducts = sortedProducts?.slice(startIndex, endIndex);

  // handling pagination change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const DownArrowCategory = () => {
    setShowCategory(!showCategory);
    setShowDownCategory(!showDownCategory);
  };
  const DownArrowPrice = () => {
    setShowPrice(!showPrice);
    setShowDownPrice(!showDownPrice);
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
    dispatch(fetchAllProduct());
  }, [dispatch, selectedCategory, selectedPriceRange]);

  return (
    <>
      <div className="w-full flex items-start justify-between gap-4 px-20 mt-7 font-Poppins sm:px-10">
        {/* Side Select Bar */}
        <div className="w-1/5 flex flex-col items-start justify-between gap-2 border rounded-lg py-1 px-3 sm:hidden md:hidden">
          <div className="flex flex-col items-start justify-between gap-2 ">
            <h1 className="text-xl font-semibold">All Categories</h1>
            <div className="flex flex-col justify-around items-start gap-1">
              {categories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-1">
                    <input
                      type="checkbox"
                      name="Category"
                      value={category.name}
                      onChange={handleCategoryChange}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={category.name}
                      className="cursor-pointer text-base uppercase">
                      {category.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-2 ">
            <h1 className="text-xl font-semibold">Price</h1>
            <div className="flex flex-col justify-around items-start gap-1">
              {priceOptions.map((amount) => {
                return (
                  <div
                    key={amount.amount}
                    className="flex items-center justify-center gap-1">
                    <input
                      type="radio"
                      name="Price"
                      value={amount.amount}
                      onChange={handlePriceChange}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={amount.amount}
                      className="cursor-pointer text-base uppercase">
                      {amount.amount}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Category , Price and Shorting For Small Size Component */}
        <div className="w-4/5 flex flex-col items-start justify-between gap-2 sm:w-full md:w-full">
          <div className="w-full flex items-center justify-between  border-2 py-1 rounded-lg px-2 sm:h-[30px] md:h-[40px]">
            {/* Reset Button */}
            <button
              className="bg-green-600 px-3 py-1 rounded-lg sm:hidden md:hidden"
              onClick={resetFilters}>
              Reset Filters
            </button>

            {/* Small Size Category DropDown */}
            <div className="w-[90px] md:w-[120px] flex flex-col items-center justify-between gap-2 sm:block md:block lg:hidden h-full z-30  ">
              <div className=" w-full flex items-center justify-between text-sm  gap-2  ">
                <h1 className="text-xs md:text-sm">Categories</h1>
                <img
                  src={Down}
                  alt=""
                  onClick={DownArrowCategory}
                  className={`${
                    showDownCategory ? "hidden" : "block"
                  } w-3 cursor-pointer`}
                />
                <img
                  src={Up}
                  alt=""
                  onClick={DownArrowCategory}
                  className={`${
                    showDownCategory ? "block" : "hidden"
                  } w-3 cursor-pointer`}
                />
              </div>
              <div
                className={`${
                  showCategory ? "block" : "hidden"
                } w-[120px] md:w-[160px] md:mt-4 flex flex-col justify-around items-start gap-2 mt-3 py-2 rounded-lg -ml-2 px-2 bg-green-200 `}>
                {categories.map((category, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-1 ">
                      <input
                        type="checkbox"
                        checked={
                          selectedCategory.includes(category.name)
                            ? false
                            : true
                        }
                        name="Category"
                        value={category.name}
                        onChange={handleCategoryChange}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={category.name}
                        className="cursor-pointer text-[10px] md:text-sm uppercase">
                        {category.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Small Size Price DroapDown */}
            <div className="w-[60px] md:w-[100px] h-full  flex flex-col items-center justify-between gap-2 sm:block lg:hidden z-30 ">
              <div className=" w-full flex items-center justify-between text-sm  gap-2 ">
                <h1 className="text-xs md:text-sm">Price</h1>
                <img
                  src={Down}
                  alt=""
                  onClick={DownArrowPrice}
                  className={`${
                    showDownPrice ? "hidden" : "block"
                  } w-3 cursor-pointer`}
                />
                <img
                  src={Up}
                  alt=""
                  onClick={DownArrowPrice}
                  className={`${
                    showDownPrice ? "block" : "hidden"
                  } w-3 cursor-pointer`}
                />
              </div>
              <div
                className={`${
                  showPrice ? "block" : "hidden"
                } w-[100px] md:w-[130px] flex flex-col justify-around items-start gap-2 md:mt-2  mt-3 py-2 rounded-lg px-3 -ml-2 z-20 bg-green-200`}>
                {priceOptions.map((amount) => {
                  return (
                    <div
                      key={amount.amount}
                      className="flex items-center justify-center gap-1">
                      <input
                        type="radio"
                        name="Price"
                        value={amount.amount}
                        onChange={handlePriceChange}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor={amount.amount}
                        className="cursor-pointer text-[10px] md:text-sm uppercase">
                        {amount.amount}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Shorting  */}
            <div className="sm:h-full sm:w-[90px] md:h-full sm:flex sm:items-end lg:justify-end rounded-lg ">
              <select
                name="sort"
                onChange={handleSortChange}
                className="font-[Poppins] text-sm sm:text-xs border outline-none p-1 -mt-6 rounded-lg cursor-pointer w-full sm:h-full md:h-full  sm:p-0 sm:border-none md:border-none">
                <option>Sort</option>
                {sortOptions?.map((option, index) => {
                  return (
                    <option value={option.label} key={index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Show All Product */}
          <div className=" grid grid-cols-4 gap-4 bg-[#EDF2EE] p-2 rounded-lg sm:grid-cols-2 md:grid-cols-3">
            {paginatedProducts?.map((item) => {
              return (
                <div
                  // onClick={() => navigate(`/showproductdetail/${item._id}`)}
                  key={item._id}
                  className="w-full h-[300px] sm:h-[200px]">
                  <ProductCard
                    key={item._id}
                    src={item.image}
                    Price={item.price}
                    Product={item.name}
                    productId={item._id}
                  />
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="join w-full flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`join-item btn border-none rounded-l-md ${
                currentPage === 1 && "bg-gray"
              }`}
              disabled={currentPage === 1}>
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`join-item btn border-none w-10 h-10 font-[Poppins] rounded-lg font-semibold flex items-center justify-center ${
                    currentPage === pageNum &&
                    "bg-green-600 text-white hover:bg-green-800 hover:text-white"
                  }`}>
                  {pageNum}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`join-item btn border-none rounded-r-md ${
                currentPage === totalPages && "bg-gray"
              }`}
              disabled={currentPage === totalPages}>
              »
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
