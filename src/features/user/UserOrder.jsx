/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectStatus,
  selectOrders,
} from "../order/orderSlice";
import { Grid } from "react-loader-spinner";
import { updateOrderAsync } from "../order/orderSlice";
import Modal from "../common/Modal";
import { Link } from "react-router-dom";

function UserOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(selectStatus);
  const [openModal, setOpenModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState();

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, []);

  const handleCancel = () => {
    setOpenModal(false);
    dispatch(updateOrderAsync({ status: "cancelled", id: deleteOrderId }));
  };

  return (
    <div>
      {orders &&
        orders?.map((order, index) => (
          <>
            <div key={index}>
              <div>
                <div className="sm:shadow-custom relative mx-auto mt-6 mb-2 sm:mt-9 sm:mb-3 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 rounded-md ">
                  {!(
                    order?.status === "delivered" ||
                    order?.status === "cancelled" ||
                    order?.status === "failed"
                  ) && (
                    <button
                      className="text-sm  py-1 absolute right-2 top-11 sm:right-16 px-2 bg-red-600 rounded-sm text-white hover:bg-red-400"
                      onClick={() => {
                        setOpenModal(false);
                        setTimeout(() => {
                          setDeleteOrderId(order.id);
                          setOpenModal(true);
                        }, 100);
                      }}>
                      Cancel
                    </button>
                  )}
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-lg sm:text-2xl my-5 font-bold tracking-tight text-gray-900">
                      Order # {order.id}
                    </h1>
                    <p className="text-sm sm:text-lg -mt-4 mb-2 font-bold tracking-tight text-slate-900">
                      {order.createdAt &&
                        "Order Date : " +
                          new Date(order.createdAt).toLocaleString()}
                    </p>
                    <h3
                      className={`text-lg mt-5 font-bold tracking-tight ${
                        "failed cancelled".includes(order?.status)
                          ? "text-red-900"
                          : "text-green-700"
                      }`}>
                      Order Status : {order.status}
                    </h3>
                    <h4 className="text-lg mt-1 mb-5 font-bold tracking-tight text-slate-700">
                      Payment : {order.paymentMethod.toUpperCase()}
                    </h4>
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Link to={`/product-detail/${item.product.id}`}>
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </Link>
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link
                                      to={`/product-detail/${item.product.id}`}>
                                      {item.product.title}
                                    </Link>
                                  </h3>
                                  <p className="ml-4">
                                    {(
                                      Math.round(
                                        item?.product?.price -
                                          item?.product?.price *
                                            (item?.product?.discountPercentage /
                                              100)
                                      ) * item?.quantity
                                    ).toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                    })}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <p className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                    Qty :{item.quantity}
                                  </p>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {order?.totalAmount?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                    </div>
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Total Items in Cart</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Shipping Address :
                    </p>
                    <div className="mt-2 flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.area}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.pin}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {order.selectedAddress.city}{" "}
                          {order.selectedAddress.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {openModal && (
              <Modal
                title={`Cancel Order ${deleteOrderId}`}
                message="Are you sure you want to cancel it ?"
                dangerOption="Cancel"
                cancelOption="No"
                dangerAction={() => handleCancel()}
                cancelAction={() => setOpenModal(false)}
                showModal={openModal}></Modal>
            )}
          </>
        ))}
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
    </div>
  );
}

export default UserOrder;
