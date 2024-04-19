import React, { useState, useEffect } from "react";
import { FAddButton } from "./assets";
import { demo, deletebtn, updatebtn } from "./assets";
import {
  createCategory,
  fetchAllCategory,
  deleteCategory,
  updateCategory,
} from "../../Redux/Slices/categorySlices";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../utils/Notification";
import { Toast } from "toaster-js";

const Category = () => {
  const dispatch = useDispatch();

  // Form Data
  const [categoryData, setCategory] = useState({
    name: "",
    image: "",
  });

  const [isUpdatecheck, setIsUpdateCheck] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  // For Add Button
  const [isChecked, setIsChecked] = useState(false);
  const handleFormOpen = () => {
    setIsChecked(!isChecked);
  };

  // File review
  const [isFile, setFile] = useState(false);
  const [poster, setPoster] = useState("");

  // handle Image
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setPoster(URL.createObjectURL(file));
    setFile(true);
    setCategory({ ...categoryData, image: file });
  };

  const resetData = () => {
    setIsChecked(!isChecked);
    setFile(false);
    setCategory({ ...categoryData, name: "" });
  };

  const handledeletebutton = (id) => {
    if (window.alert("Are you sure to delete this category ?")) {
      dispatch(deleteCategory(id));
    }
  };

  // Handle Form Data
  const handlesubmitdata = (e) => {
    e.preventDefault();
    dispatch(createCategory(categoryData));
    setIsChecked(!isChecked);
    setFile(false);
    setCategory({ name: "", image: "" });
  };

  const { categories, category, isAdded, isUpdated, isDeleted, isLoading } =
    useSelector((state) => state.categories);

  const handleupdatebutton = (category) => {
    setIsUpdateCheck(!isUpdatecheck);
    setIsChecked(!isChecked);
    setCategory({ name: category.name, image: category.image });
    setFile(true);
    setPoster(category.image);
    setCategoryId(category._id);
  };
  const handleupdatedata = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ categoryData, categoryId }));
    setIsChecked(!isChecked);
    setIsUpdateCheck(!isUpdatecheck);
    setFile(false);
    setCategory({ ...categoryData, name: "" });
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
    if (isAdded) {
      getNotification("Category Added", Toast.TYPE_DONE, Toast.TIME_SHORT);
    }
    if (isDeleted) {
      getNotification("Category Deleted", Toast.TYPE_DONE, Toast.TIME_SHORT);
    }
    if (isUpdated) {
      getNotification("Category Updated", Toast.TYPE_DONE, Toast.TIME_SHORT);
    }
  }, [isAdded, isDeleted, isUpdated, dispatch]);

  return (
    <div className="flex flex-col mt-4 sm:px-8 w-full h-full ">
      <div className="flex justify-between items-center border-y-2 w-full ">
        <h1 className="font-Poppins text-lg font-semibold">Handle Category</h1>
        <img
          src={FAddButton}
          alt="Add-category"
          className="w-12 cursor-pointer select-none"
          onClick={handleFormOpen}
        />
      </div>

      <div
        className={`${
          isChecked ? "block" : "hidden"
        } top-0 left-0 w-full h-full flex items-center absolute justify-center backdrop-blur-[2px] z-10 `}
      >
        <form
          onSubmit={handlesubmitdata}
          className={`w-auto h-auto bg-white fle flex-col items-center justify-center py-3 px-6 `}
        >
          <h1 className="text-center font-bold text-xl font-Poppins">
            Add Category
          </h1>
          <div className="w-full grid grid-cols-2 gap-3 px-4 mt-4 h-60 ">
            <div className=" flex flex-col items-start justify-start gap-2 h-60 ">
              <input type="file" name="file" onChange={handleChangeImage} />
              <div
                className={`${
                  isFile ? "block" : "hidden"
                } w-full h-full flex justify-start items-start  overflow-hidden`}
              >
                <img
                  src={poster}
                  alt="Product_Image"
                  className="w-full h-full object-contain "
                  onChange={onchange}
                />
              </div>
            </div>
            <div className="w-full">
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  setCategory({ ...categoryData, name: e.target.value })
                }
                value={categoryData.name}
                placeholder="Enter Category Name"
                className="w-full h-10 px-4 py-2 text-gray-700 bg-gray-200 border border-gray-200 rounded-m outline-none rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center justify-around gap-4 mt-5">
            {isUpdatecheck ? (
              <button
                type="submit"
                onClick={handleupdatedata}
                className="bg-blue-600 text-white font-bold py-2 px-4 border border-blue-600 rounded-md w-full hover:text-blue-600 hover:bg-white hover:shadow-2xl hover:border-black hover:border"
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                onClick={handlesubmitdata}
                className="bg-blue-600 text-white font-bold py-2 px-4 border border-blue-600 rounded-md w-full hover:text-blue-600 hover:bg-white hover:shadow-2xl hover:border-black hover:border"
              >
                Add
              </button>
            )}
            <button
              type="reset"
              className="bg-blue-600 text-white font-bold py-2 border border-blue-600 px-4 rounded-md w-full hover:text-blue-600 hover:bg-white hover:shadow-2xl hover:border-black hover:border"
              onClick={resetData}
            >
              cancle
            </button>
          </div>
        </form>
      </div>

      <div className="w-full h-full grid grid-cols-4 gap-6 bg-gray-200 mt-3 px-6 py-3">
        {categories.map((category) => {
          return (
            <div
              className=" h-[200px] flex flex-col gap-2 items-center relative justify-center border border-black py-3 px-4 rounded-lg group "
              key={category._id}
            >
              <div className="w-full rounded-lg">
                <img
                  src={category.image}
                  alt="Category Image"
                  className="w-[400px]  h-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <p className="text-lg font-medium font-Poppins">
                  {category.name}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 absolute opacity-0 group-hover:opacity-100 transition-all delay-100 backdrop-blur-[2px] w-full h-full px-5 rounded-lg ">
                <button
                  type="button"
                  onClick={() => handleupdatebutton(category)}
                  className="h-11 flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 border border-blue-600 rounded-md w-full hover:text-blue-600 hover:bg-white hover:shadow-2xl hover:border-black hover:border"
                >
                  <img src={updatebtn} alt="Delete" className="h-full w-full" />
                </button>
                <button
                  type="button"
                  onClick={() => handledeletebutton(category._id)}
                  className="h-11 flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4  border border-blue-600 rounded-md w-full hover:text-blue-600 hover:bg-white hover:shadow-2xl hover:border-black hover:border"
                >
                  <img src={deletebtn} alt="Delete" className="h-full w-full" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
