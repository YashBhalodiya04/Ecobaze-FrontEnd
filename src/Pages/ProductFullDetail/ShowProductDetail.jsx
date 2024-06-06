import React, { useEffect, useState } from "react";
import { ProductImage3 } from "../../assets/ProductImage";
import { GoStar } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../Redux/Slices/productSlices";
import { Footer } from "../../Components";
import { addToCart } from "../../Redux/Slices/cartSlices";
import { toast, ToastContainer } from "react-toastify";

const buttons = [
  {
    label: "Discription",
  },
  {
    label: "Additional Information",
  },
  {
    label: "Customer Feedback",
  },
];

const ShowProductDetail = () => {
  const [isActive, setIsActive] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const { product } = useSelector((state) => state?.products);

  const handleaddproduct = (productId, price) => {
    dispatch(addToCart({ productId, price ,quantity}));
  };

  const { isAdded, isError, message } = useSelector(
    (state) => state?.cartSlices
  );

  useEffect(() => {
    if (isAdded) {
      toast.success(message.message);
    }
    if (isError) {
      toast.error(isError?.response?.statusText);
    }
  }, [isAdded, isError]);
  return (
    <>
      <div className="w-full h-full flex flex-col items-start justify-between  mt-7 font-Poppins ">
        <div className="w-full h-full flex flex-col items-start justify-between px-20 sm:px-4">
          <div className=" w-full sm:h-[500px] px-48  grid grid-cols-2  gap-12 bg-white items-start justify-between sm:place-content-start sm:place-items-start sm:px-0 md:px-0 md:gap-2  sm:grid-cols-1 sm:gap-4">
            <div className="bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden  px-1  py-10 sm:p-2 sm:h-full sm:w-full">
              <img
                src={product.image}
                alt="Product Image"
                className=" w-[200px]  sm:h-full rounded-lg object-fill "
              />
            </div>
            <div className=" px-5 py-2 flex flex-col items-start justify-between gap-2 sm:h-1/2 sm:w-full">
              <h1 className="flex items-center justify-start text-lg gap-2 ">
                {product.name}
                <span className="text-xs bg-green-200 px-2 rounded-lg">
                  {product.stock ? "In Stock" : "Out Of Stock"}
                </span>
              </h1>
              <div className="flex justify-start items-center">
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
                <GoStar className="sm:text-xs" />
                <p className="ml-3">4 Reviews</p>
              </div>
              <h1 className="flex items-center justify-start text-base gap-2 text-green-900  font-semibold">
                {/* <span className="opacity-80 text line-through text-black font-light">
                  $48.00
                </span> */}
                ${product?.price}
                {/* <span className="text-[10px] bg-red-200 px-2 rounded-full text-red-600 font-semibold">
                  64% Off
                </span> */}
              </h1>

              <p className="text-sm  border-y-2 border-black py-5 border-opacity-25 text-justify w-full">
                {product?.description?.slice(0, 100)} ...
              </p>

              <div className=" w-full flex items-center justify-between gap-7 md:gap-3">
                <div className=" w-2/6 md:w-[150px] flex items-center justify-between border rounded-3xl border-black px-2 py-1">
                  <button
                    className="bg-gray-400 px-2 rounded-full"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity < 2}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-400 px-2 rounded-full"
                    disabled={quantity > 10}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleaddproduct(product?._id, product?.price,quantity)}
                  className="w-4/6 bg-green-600 rounded-full py-1 text-white"
                >
                  Add to cart
                </button>
              </div>

              <div>
                category :{" "}
                <span
                  className={`${
                    product.category == "vegetables"
                      ? "text-green-500"
                      : "text-black"
                  }`}
                >
                  {product.category}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-5 mt-10 sm:hidden">
            <div className="w-full flex items-center justify-center gap-5">
              {buttons.map((link, index) => {
                return (
                  <button
                    className={`${
                      isActive === index ? "border-green-500 " : ""
                    } border-b-2 transition-all delay-50 px-3 `}
                    key={index}
                    onClick={() => setIsActive(index)}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-start justify-start w-1/2 text-justify ">
              <div className={`${isActive === 0 ? "block" : "hidden"} `}>
                {product?.description}
              </div>
              <div className={`${isActive === 1 ? "block" : "hidden"}`}>
                Lorem ipsum dolor sit amet.
              </div>
              <div className={`${isActive === 2 ? "block" : "hidden"}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quaerat at non cumque repudiandae expedita, illum
                quae? Facere, sequi totam expedita molestias inventore
                repudiandae ullam repellat hic et? Saepe, ipsum?
              </div>
            </div>
          </div>
          <div className="sm:opacity-1 lg:hidden md:hidden w-full h-auto flex flex-col items-start justify-start gap-6 mt-4">
            <div className=" w-full h-1/3 flex flex-col items-start justify-start">
              <h1 className=" w-full text-center font-semibold text-xl border-y-2 p-2 ">
                Discription
              </h1>
              <p className=" w-full mt-2">{product.description}</p>
            </div>
            <div className=" w-full h-1/3 flex flex-col items-start justify-start">
              <h1 className=" w-full text-center font-semibold text-xl border-y-2 p-2">
                Additional Information
              </h1>
              <p className="mt-2">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className=" w-full h-1/3 flex flex-col items-start justify-start">
              <h1 className=" w-full text-center font-semibold text-xl border-y-2 p-2 ">
                Customer Feedback
              </h1>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quaerat at non cumque repudiandae expedita, illum
                quae? Facere, sequi totam expedita molestias inventore
                repudiandae ullam repellat hic et? Saepe, ipsum?
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default ShowProductDetail;
