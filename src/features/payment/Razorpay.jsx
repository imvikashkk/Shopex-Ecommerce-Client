/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../user/userSlice";
import { BACKEND_URL } from "../../app/constant";
import { RotatingLines } from "react-loader-spinner";

function Product() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector(selectUserInfo);
  const [order, setOrder] = useState();
  const [doc, setDoc] = useState();
  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }

    const func = async () => {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");

      const response = await fetch(`${BACKEND_URL}/razorpay/order`, {
        method: "POST",
        body: JSON.stringify(state),
        headers: headers,
      });
      const { order, doc } = await response.json();
      setDoc(doc);
      setOrder(order);
    };
    func();
  }, []);

  window.onpopstate = () => {
    navigate(`/order-failed/${doc?.id}`, {
      state: {
        code: "#failed",
        description: "Try to navigate !!",
        source: "razorpay payment page",
        step: "do not pay",
        reason: "Payment not done !!",
      },
      replace: true,
    });
  };

  const paymentHandler = async (e) => {
    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: doc?.totalAmount,
      currency: "INR",
      name: "Shopex",
      description: "Test Transaction",
      image: `${BACKEND_URL}/logo.png`,
      order_id: order?.id,
      handler: async function (response) {
        const body = {
          ...response,
          doc,
        };
        const headers = new Headers();
        headers.append("authorization", localStorage.getItem("authorization"));
        headers.append("content-type", "application/json");
        const validateRes = await fetch(
          `${BACKEND_URL}/razorpay/order/validate`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
          }
        );
        if (validateRes.ok) {
          const jsonRes = await validateRes.json();
          // console.log({ jsonRes });
          navigate(`/order-success/${jsonRes?.order?.id}`);
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: `${user?.phone}`,
      },
      notes: {
        address: state?.selectedAddress,
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);

    /* Handling the razorpay event */
    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      rzp1.close();
      navigate(`/order-failed/${doc?.id}`, {
        state: {
          code: response.error.code,
          description: response.error.description,
          source: response.error.source,
          step: response.error.step,
          reason: response.error.reason,
        },
        replace: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 10);
    });

    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="product pt-[30vh]">
      <div className="flex flex-col justify-center items-center ">
        <img
          className="w-64 rounded-t-md"
          src="https://woocommerce.com/wp-content/uploads/2021/01/fb-razorpay@2x.png"
          alt="razorpay"
        />
        <button
          onClick={paymentHandler}
          disabled={!doc || !order}
          className={`w-64 px-5 py-3 text-xl font-bold rounded-sm text-white ${
            !doc || !order
              ? "bg-indigo-400"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}>
          Pay
        </button>
        <div className="mx-auto -mt-12">
          <RotatingLines
            visible={!doc || !order}
            height="40"
            width="40"
            color="#777"
            strokeColor="#1b1bb2"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
