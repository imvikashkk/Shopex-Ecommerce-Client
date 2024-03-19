import { useEffect } from "react";
import {
  useNavigate,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { resetOrder } from "../features/order/orderSlice";

function OrderFailedPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useLocation().state;

  useEffect(() => {
    if (!data) {
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">Order Failed !!</p>
          <div className="mt-4 flex flex-col justify-center items-center lg:flex-row lg:gap-2">
            <h1 className="text-xl sm:3xl font-bold tracking-tight text-red-700">
              Order Number
            </h1>
            <h1 className="text-xl sm:3xl font-bold tracking-tight text-red-700 ">
              #{params?.id}
            </h1>
          </div>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Code:{data?.code}
          </p>
          <p className="text-base leading-7 text-gray-600">
            Description: {data?.description}
          </p>
          <p className="text-base leading-7 text-gray-600">
            Source: {data?.source}
          </p>
          <p className="text-base leading-7 text-gray-600">
            Step: {data?.step}
          </p>
          <p className="text-base leading-7 text-gray-600">
            Reason: {data?.reason}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => navigate("/", { replace: true })}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
              Go back home
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderFailedPage;
