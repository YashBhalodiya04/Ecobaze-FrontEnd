import React, { useEffect, useState } from "react";
import { FAddButton } from "./assets";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchAllProduct,
  deleteProduct,
  updateProduct,
} from "../../Redux/Slices/productSlices";
import { fetchAllCategory } from "../../Redux/Slices/categorySlices";
import { getNotification } from "../../utils/Notification";
import { Toast } from "toaster-js";

const formInput = [
  {
    name: "name",
    label: "ProductName",
    type: "text",
    Placeholder: "Enter Product Name",
  },
  {
    name: "description",
    label: "Descripion",
    type: "text",
    Placeholder: "Enter description",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    Placeholder: "Enter category",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    Placeholder: "Enter Price number",
  },
  {
    name: "stock",
    label: "Stock",
    type: "number",
    Placeholder: "Enter stock number",
  },
];

const Products = () => {
  // Form Data
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState({});

  // For Add Button
  const [isChecked, setIsChecked] = useState(false);
  const handleFormOpen = () => {
    setIsChecked(!isChecked);
  };

  // On form Submit
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(fetchProducts({ data, imageFile }));
      setIsChecked(!isChecked);
      setImageFile({});
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // File review
  const [isFile, setFile] = useState(false);
  const [image, setImage] = useState();

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setFile(true);
    setImageFile(file);
    previewFile(file);
  };

  
  const { isAdded, isUpdated, isDeleted } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProduct());

    if (isAdded) {
      getNotification("Product Added", Toast.TYPE_DONE, Toast.TIME_SHORT);
      setData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
      });
      setImage("");
      setFile(false);
    }
    if (isDeleted) {
      dispatch(fetchAllProduct());
      getNotification("Product Deleted", Toast.TYPE_DONE, Toast.TIME_SHORT);
    }
    if (isUpdated) {
      getNotification("Product Updated", Toast.TYPE_DONE, Toast.TIME_SHORT);
      setData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
      });
    }
  }, [isAdded, isDeleted, isUpdated]);

  const { products } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);
  const { categories } = useSelector((state) => state?.categories);

  // Delete Product
  const handleDeleteproduct = (id) => {
    if (window.confirm("Are you sure to Delete this Product?")) {
      dispatch(deleteProduct(id));
    }
  };
  // Update Product
  const [isUpdateCheck, setIsUpdateCheck] = useState(false);
  const [productId, setProductId] = useState("");
  const handleupdateproduct = (product) => {
    setIsUpdateCheck(!isUpdateCheck);
    setIsChecked(!isChecked);
    setFile(true);
    setProductId(product._id);
    setData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setImage(product.image);
  };

  const handleupdatenbutton = (e) => {
    e.preventDefault();
    console.log(data.category);
    dispatch(updateProduct({ data, imageFile, productId }));
    setIsUpdateCheck(!isUpdateCheck);
    setIsChecked(!isChecked);
    setFile(false);
    setImage("");
    setImageFile({});
    setProductId("");
  };
  const handlecanclebtn = () => {
    setIsUpdateCheck(!isUpdateCheck);
    setIsChecked(false);
    setFile(false);
    setImage("");
    setImageFile({});
    setProductId("");
    setData({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  return (
    <div className="flex flex-col mt-4 sm:px-8 ">
      {/* Add Butoon */}
      <div
        className={` ${
          isChecked ? "hidden" : "block"
        } flex justify-between items-center border-y-2  `}
      >
        <h1 className="font-Poppins text-lg font-semibold">Add Product</h1>
        <img
          src={FAddButton}
          alt="Add-Product"
          className="w-12 cursor-pointer select-none"
          onClick={handleFormOpen}
        />
      </div>

      {/* Product Form */}
      <form
        onSubmit={handleFormSubmit}
        className={`${isChecked ? "block" : "hidden"} flex flex-col gap-5`}
      >
        <div className="grid grid-cols-2 justify-between items-center gap-2 sm:grid-cols-1 sm:gap-6 sm:mt-5">
          <div className=" flex flex-col gap-2 border h-full">
            <input
              type="file"
              name="file"
              onChange={handleChangeImage}
              required
              accept="image/png, image/jpeg, image/jpg, image/jfif"
            />
            <div
              className={`${
                isFile ? "block" : "hidden"
              } w-full flex justify-center items-center`}
            >
              <img
                src={image}
                alt="Product_Image"
                className="w-[70%] h-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full  gap-3 sm">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="name">ProductName</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product name"
                onChange={onChange}
                value={data.name}
                className="border outline-none py-3 px-3 text-md w-full bg-gray-100 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="description">Descripion</label>
              <textarea
                type="text"
                name="description"
                placeholder="Enter description"
                onChange={onChange}
                value={data.description}
                className="border outline-none py-3 px-3 text-md w-full bg-gray-100 rounded-lg"
                rows="5"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={data.category}
                onChange={onChange}
                className="border outline-none py-3 px-3 text-md w-full bg-gray-100 rounded-lg"
              >
                <option defaultValue>Select Category</option>
                {categories.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter Price of Product"
                onChange={onChange}
                value={data.price}
                className="border outline-none py-3 px-3 text-md w-full bg-gray-100 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Enter stock"
                onChange={onChange}
                value={data.stock}
                className="border outline-none py-3 px-3 text-md w-full bg-gray-100 rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 ">
          {!isUpdateCheck ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-5 text-white font-Poppins font-medium"
              onClick={handleFormSubmit}
            >
              Add Product
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-5 text-white font-Poppins font-medium"
              onClick={handleupdatenbutton}
            >
              Update Product
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-5 text-white font-Poppins font-medium"
            onClick={handlecanclebtn}
          >
            Cancle
          </button>
        </div>
      </form>

      {/* Product Table */}
      <div className="w-full mt-8 py-3 px-4 sm:overflow-x-scroll md:overflow-x-scroll bg-gray-100">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-9 items-center gap-1 sm:gap-20 md:gap-20 w-full border-b">
              <th className=" border-gray-500 text-left sm:text-sm">No.</th>

              <th className=" border-gray-500 text-left sm:text-sm ">
                Product
              </th>

              <th className=" border-gray-500 text-left sm:text-sm ">Image</th>

              <th className=" border-gray-500 text-left sm:text-sm ">
                Category
              </th>

              <th className=" border-gray-500 text-left sm:text-sm md:ml-3">
                Price
              </th>

              <th className=" border-gray-500 text-left sm:text-sm ">
                description
              </th>

              <th className=" border-gray-500 text-left sm:text-sm sm:ml-7 md:ml-7 lg:ml-11">
                Stock
              </th>
              <th className=" border-gray-500 text-left sm:text-sm  sm:ml-7 md:ml-7">
                Update
              </th>
              <th className=" border-gray-500 text-left sm:text-sm  sm:ml-7 md:ml-12">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="w-full  h-full">
            {products.map((product, index) => {
              return (
                <tr
                  className="grid grid-cols-9 items-center gap-1 sm:gap-20 md:gap-20 w-full border-b my-3 py-3 h-[70px]"
                  key={product._id}
                >
                  <td className=" border-gray-500 text-left">{index + 1}</td>
                  <td className=" border-gray-500 text-left">{product.name}</td>
                  <td className=" border-gray-500 text-left w-10">
                    <div className="w-[60px] overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt=""
                        className="w-[60px] rounded-lg"
                      />
                    </div>
                  </td>
                  <td className=" border-gray-500 text-left">
                    {product.category}
                  </td>
                  <td className=" border-gray-500 text-left  md:ml-3">
                    {product.price}
                  </td>
                  <td className=" border-gray-500  sm:w-[100px] md:w-[100px] text-left">
                    {product.description.slice(0, 30)} ...
                  </td>
                  <td className=" border-gray-500 text-left lg:ml-11 sm:ml-7 md:ml-7">
                    {product.stock}
                  </td>
                  <td className=" border-gray-500 text-left sm:ml-7 md:ml-7">
                    <button
                      className="sm:text-sm bg-blue-400 py-2 px-4 rounded-lg"
                      onClick={() => handleupdateproduct(product)}
                    >
                      Update
                    </button>
                  </td>
                  <td className=" border-gray-500 text-left sm:ml-7 md:ml-12">
                    <button
                      className="sm:text-sm bg-red-400 py-2 px-4 rounded-lg"
                      onClick={() => handleDeleteproduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
