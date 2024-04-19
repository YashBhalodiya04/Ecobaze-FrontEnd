import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FCategory, FHome, FProduct, FReview } from "./assets";

const NavLinks = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: FHome,
    filePath: "/api/v1/admin/dashboard",
  },
  {
    label: "Category",
    path: "category",
    icon: FCategory,
    filePath: "/api/v1/admin/category",
  },
  {
    label: "Products",
    path: "product",
    icon: FProduct,
    filePath: "/api/v1/admin/product",
  },
  {
    label: "Reviews",
    path: "review",
    icon: FReview,
    filePath: "/api/v1/admin/review",
  },
];

const Admin = () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    for (let index = 0; index < NavLinks.length; index++) {
      if (location.pathname.includes(NavLinks[index].path)) {
        setActiveLink(index);
      }
    }
  });

  return (
    <div className="w-full flex h-[84vh] items-start justify-start gap-3 px-20 mt-6 sm:flex-col sm:justify-start sm:px-10 md:px-2 ">
      <div className="w-[200px] md:w-[160px] h-full flex flex-col items-start justify-start gap-3  sm:grid sm:grid-cols-2  sm:gap-0 sm:w-full sm:border-none sm:h-16">
        {NavLinks.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              onClick={() => setActiveLink(index)}
              className={`${
                index == activeLink
                  ? "flex items-center justify-center gap-2 text-lg font-bold ml-1 transition-all"
                  : "flex items-center justify-center gap-2 text-lg hover:font-bold hover:ml-1 transition-all"
              }`}
            >
              <img src={item.icon} alt="LOGO" className="w-7 select-none" />{" "}
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="w-full md:w-[600px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
