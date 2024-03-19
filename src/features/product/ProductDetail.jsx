import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../alert/alertSlice";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from "./productSlice";
import {
  addToCartAsync,
  selectItems,
  fetchItemsByUserIdAsync,
} from "../cart/cartSlice";
import { useParams } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { selectUserInfo } from "../user/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetail() {
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const status = useSelector(selectProductListStatus);
  const [cartItems, setCartItems] = useState(items);

  const handleCart = () => {
    let isAdded = cartItems?.filter((item) => {
      return item == params.id;
    });
    if (isAdded.length == 0) {
      dispatch(addToCartAsync({ itemId: params.id }));
      setCartItems([...cartItems, params.id]);
      dispatch(showAlert({ message: "Added to Cart", severity: "success" }));
    } else {
      dispatch(
        showAlert({ message: "Error: Already Added", severity: "error" })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync());
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {status === "loading" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
      {product && (
        <div className="pt-6">
          <div className="mx-auto flex justify-center mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {
              product?.images[0] && (
                <div className="aspect-h-4 shadow-photo aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product?.images[0]}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              )
            }
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            {
              product?.images[1] && (  
              <div className="aspect-h-2 shadow-photo aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product?.images[1]}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              )
            }
            {
              product?.images[2] && (  
              <div className="aspect-h-2 shadow-photo aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product?.images[2]}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              )
            }
            </div>
            {
            product?.images[3] &&  (
                <div className="aspect-h-5 shadow-photo aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product?.images[3]}
                alt={product?.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
              )
            }
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl line-through tracking-tight text-gray-900">
                {product?.price?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              <p className="text-3xl tracking-tight text-gray-900">
                {Math.round(
                  product?.price -
                    product?.price * (product?.discountPercentage / 100)
                ).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>

              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          Math.round(product?.rating) > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product?.rating} out of 5 stars</p>
                </div>
              </div>

              {user?.role === "admin" ? (
                <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  YOU ARE AN ADMIN
                </button>
              ) : (
                <>
                  {" "}
                  <div className="mt-10">
                    {product?.stock > 0 ? (
                      <button
                        onClick={handleCart}
                        type="submit"
                        className="mt-10 flex w-full shadow-button items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        {cartItems?.find((item) => item == params.id)
                          ? "Already Added"
                          : "Add to cart"}
                      </button>
                    ) : (
                      <div className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Sorry Out Of Stock
                      </div>
                    )}
                  </div>{" "}
                </>
              )}
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
