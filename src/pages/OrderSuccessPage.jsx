import { useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccessPage() {
   const params = useParams() 
   const dispatch = useDispatch();
   const navigate = useNavigate()
   
   useEffect(()=>{
    dispatch(resetCartAsync())
    dispatch(resetOrder())
   },[dispatch])
   
  return (
    <>
    {!params.id &&  <Navigate to='/' replace={true}></Navigate>}
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base sm:text-lg font-semibold text-indigo-600">Order Successfully Placed !!</p>
        <div className="mt-4 flex flex-col justify-center items-center lg:flex-row">
        <h1 className=" text-xl sm:3xl font-bold tracking-tight text-gray-900 ">
          Order Number
        </h1>
        <h1 className="mt-4 text-xl sm:3xl font-bold tracking-tight text-gray-900">
            #{params?.id}
        </h1>
        </div>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {"You can check your order."}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={()=>navigate("/", {replace:true})}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </button>
        </div>
      </div>
    </main>
    </>
  );
}

export default OrderSuccessPage;