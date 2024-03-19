/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  addAddressAsync,
  fetchLoggedInUserAsync,
  updateAddressAsync,
  removeAddressAsync,
  selectUserInfoStatus,
  updateUserAsync,
  changePasswordAsync,
} from "./userSlice";
import { useForm } from "react-hook-form";
import { Grid } from "react-loader-spinner";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const status = useSelector(selectUserInfoStatus);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
  }, []);

  const handleEdit = (address, id) => {
    const data = { address, id };
    dispatch(updateAddressAsync(data));
    setSelectedEditIndex(-1);
    setTimeout(() => {
      dispatch(fetchLoggedInUserAsync());
    }, 1000);
  };

  const handleRemove = (e, addressId) => {
    dispatch(removeAddressAsync({ addressId }));
    setTimeout(() => {
      dispatch(fetchLoggedInUserAsync());
    }, 1000);
  };

  const handleEditAddressForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pin", address.pin);
    setValue("phone", address.phone);
    setValue("area", address.area);
  };

  const handleEditProfileForm = () => {
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
    setValue("phone", userInfo.phone);
  };

  const handleAdd = (address) => {
    setShowAddAddressForm(false);
    dispatch(addAddressAsync(address));
    setTimeout(() => {
      dispatch(fetchLoggedInUserAsync());
    }, 1000);
  };

  const handleEditProfile = (data) => {
    setShowEditProfileForm(false);
    dispatch(updateUserAsync(data));
    setTimeout(() => {
      dispatch(fetchLoggedInUserAsync());
    }, 1000);
  };

  const handlepasswordChange = (data) => {
    setShowPasswordChangeForm(false);
     dispatch(changePasswordAsync(data));
  };

  return (
    <div>
      <div className="flex justify-start items-center px-3 mt-4 gap-2">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!showEditProfileForm && !showPasswordChangeForm && (
          <>
            <button
              type="button"
              onClick={() => {
                setShowEditProfileForm(true);
                handleEditProfileForm();
              }}
              className={
                "rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              }>
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                setShowPasswordChangeForm(true);
              }}
              className={
                "rounded-md bg-slate-400 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              }>
              Change Password
            </button>
          </>
        )}
      </div>

      {showPasswordChangeForm && (
        <div className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <form
            className="bg-white px-5 pb-6 pt-2 "
            noValidate
            onSubmit={handleSubmit((data) => {
              handlepasswordChange({
                oldpassword: data.oldpassword,
                newpassword: data.newpassword,
              });
              reset();
            })}>
            <div className="space-y-12 border-b border-gray-900/10">
              <div className="pb-20">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">
                  Change Your Password
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="oldpassword"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Old Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        {...register("oldpassword", {
                          required: "Old Password is required",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: `- at least 8 characters\n
                            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                            - Can contain special characters`,
                          },
                        })}
                        id="oldpassword"
                        className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                      />
                      {errors.oldpassword && (
                        <p className="text-red-500">
                          {errors.oldpassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="newpassword"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      New Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="newpassword"
                        {...register("newpassword", {
                          required: "New Password is required",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: `- at least 8 characters\n
                            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                            - Can contain special characters`,
                          },
                        })}
                        type="password"
                        className="appearance-none block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                      />
                      {errors.newpassword && (
                        <p className="text-red-500">
                          {errors.newpassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="confirmnewpassword"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm New Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmnewpassword"
                        {...register("confirmnewpassword", {
                          required: "email is required",
                          validate: (value, formValues) =>
                            value === formValues.newpassword ||
                            "password not matching",
                        })}
                        type="password"
                        className="appearance-none block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                      />
                      {errors.confirmnewpassword && (
                        <p className="text-red-500">
                          {errors.confirmnewpassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-center gap-x-6">
                    <button
                      onClick={() => {
                        setShowPasswordChangeForm(false);
                      }}
                      type="reset"
                      className="rounded-md mb-2 bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md mb-2 bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {!showPasswordChangeForm && (
        <div className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          {!showEditProfileForm && (
            <div className="border-t border-gray-200 px-4 pb-6 sm:px-6 pt-4 flex justify-between items-center gap-1">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {userInfo?.name ? userInfo?.name : "New User"}{" "}
                  {userInfo?.role === "admin" ? "(Admin)" : ""}
                </h1>
                {userInfo?.phone && (
                  <h3 className="text-sm mt-2 font-bold tracking-tight text-red-900">
                    phone : {userInfo?.phone}
                  </h3>
                )}
                <h3 className="text-sm break-words mt-2 text-wrap whitespace-break-spaces font-bold tracking-tight text-red-900">
                  email : {userInfo?.email}
                </h3>
              </div>
              <Grid
                height="40"
                width="40"
                color="rgb(79, 70, 229) "
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={status === "loading" ? true : false}
              />
            </div>
          )}

          {showEditProfileForm && (
            <div>
              <form
                className="bg-white px-5 pb-6 pt-2 "
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleEditProfile(data);
                  reset();
                })}>
                <div className="space-y-12 border-b border-gray-900/10">
                  <div className="pb-2">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">
                      Edit Your Profile
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                              value: userInfo.name,
                              pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message: "invalid name",
                              },
                            })}
                            id="name"
                            className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                          />
                          {errors.name && (
                            <p className="text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required",
                              value: userInfo.phone,
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid mobile number format",
                              },
                            })}
                            type="tel"
                            className="appearance-none block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                          />
                          {errors.phone && (
                            <p className="text-red-500">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                              value: userInfo.email,
                              pattern: {
                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                message: "email not valid",
                              },
                            })}
                            type="email"
                            className="appearance-none block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                          />
                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="hidden sm:block sm:col-span-3">
                        <label
                          htmlFor="other"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Other
                        </label>
                        <div className="mt-2">
                          <input
                            id="other"
                            disabled={true}
                            type="other"
                            value="NA"
                            className="appearance-none block px-2 w-full rounded-md border-0 py-1 text-gray-900 bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-x-6">
                    <button
                      onClick={() => {
                        setShowEditProfileForm(false);
                      }}
                      type="reset"
                      className="rounded-md mb-2 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-md mb-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {userInfo?.role !== "admin" && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => {
                    setShowAddAddressForm(true);
                    setSelectedEditIndex(-1);
                  }}
                  type="submit"
                  className="rounded-md mb-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Add New Address
                </button>

                {showAddAddressForm && (
                  <button
                    onClick={() => {
                      setShowAddAddressForm(false);
                    }}
                    type="button"
                    className="rounded-md mb-5 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Cancel
                  </button>
                )}
              </div>

              {showAddAddressForm ? (
                <form
                  className="bg-white px-5 py-6 "
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    handleAdd(data);
                    reset();
                  })}>
                  <div className="space-y-12 border-b border-gray-900/10">
                    <div className="pb-2">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Add Your Address:
                      </h2>

                      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                                pattern: {
                                  value: /^[a-zA-Z\s]+$/,
                                  message: "invalid name",
                                },
                              })}
                              id="name"
                              className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                            />
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone is required",
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: "Invalid mobile number format",
                                },
                              })}
                              type="tel"
                              className="appearance-none block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="area"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Area Address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("area", {
                                required: "area address is required",
                              })}
                              id="area"
                              className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                            />
                            {errors.area && (
                              <p className="text-red-500">
                                {errors.area.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                            />
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state/province is required",
                              })}
                              id="state"
                              className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                            />
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3 sm:col-start-1">
                          <label
                            htmlFor="pin "
                            className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pin", {
                                required: "pinCode is required",
                                pattern: {
                                  value: /^[0-9]{6}$/,
                                  message: "Invalid pin number format",
                                },
                              })}
                              id="pin"
                              className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                            />
                            {errors.pin && (
                              <p className="text-red-500">
                                {errors.pin.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Country
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("country", {})}
                              disabled={true}
                              value={"India"}
                              id="country"
                              className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-x-6">
                      {showAddAddressForm && (
                        <button
                          onClick={() => {
                            setShowAddAddressForm(false);
                          }}
                          type="reset"
                          className="rounded-md mb-2 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Cancel
                        </button>
                      )}

                      <button
                        type="submit"
                        className="rounded-md mb-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              <p className="mt-0.5 text-sm text-gray-500 bg-blue-">
                Your Addresses :
              </p>
              {userInfo?.addresses.map((address, index) => (
                <div key={index}>
                  {selectedEditIndex === index ? (
                    <form
                      className="bg-white px-5 py-6"
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        handleEdit(data, address.id);
                        reset();
                      })}>
                      <div className="space-y-12 border-b border-gray-900/10 pb-6">
                        <div className="">
                          <div className="flex gap-3 items-center justify-between">
                            <h2 className="text-xl font-semibold leading-7 text-gray-900">
                              Edit Your Address:
                            </h2>
                            <button
                              onClick={() => {
                                setSelectedEditIndex(-1);
                              }}
                              type="button"
                              className="rounded-md mb-5 bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              Cancel
                            </button>
                          </div>
                          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "name is required",
                                    value: address.name,
                                    pattern: {
                                      value: /^[a-zA-Z\s]+$/,
                                      message: "invalid name",
                                    },
                                  })}
                                  id="name"
                                  className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                                />
                                {errors.name && (
                                  <p className="text-red-500">
                                    {errors.name.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                              </label>
                              <div className="mt-2">
                                <input
                                  id="phone"
                                  {...register("phone", {
                                    required: "phone is required",
                                    value: address.phone,
                                    pattern: {
                                      value: /^[0-9]{10}$/,
                                      message: "Invalid mobile number format",
                                    },
                                  })}
                                  type="tel"
                                  className="appearance-none block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                                />
                                {errors.phone && (
                                  <p className="text-red-500">
                                    {errors.phone.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="area"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Area Address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("area", {
                                    required: "area address is required",
                                    value: address.area,
                                  })}
                                  id="area"
                                  className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                                />
                                {errors.area && (
                                  <p className="text-red-500">
                                    {errors.area.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "city is required",
                                    value: address.city,
                                  })}
                                  id="city"
                                  autoComplete="address-level2"
                                  className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                                />
                                {errors.city && (
                                  <p className="text-red-500">
                                    {errors.city.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "state/province is required",
                                    value: address.state,
                                  })}
                                  id="state"
                                  className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                                />
                                {errors.state && (
                                  <p className="text-red-500">
                                    {errors.state.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3 sm:col-start-1">
                              <label
                                htmlFor="pin "
                                className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pin", {
                                    value: address.pin,
                                    required: "pinCode is required",
                                    pattern: {
                                      value: /^[0-9]{6}$/,
                                      message: "Invalid pin number format",
                                    },
                                  })}
                                  id="pin"
                                  className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                                />
                                {errors.pin && (
                                  <p className="text-red-500">
                                    {errors.pin.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Country
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("country", {})}
                                  disabled={true}
                                  value={"India"}
                                  id="country"
                                  className="block px-2 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={() => {
                              setSelectedEditIndex(-1);
                            }}
                            type="button"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Update Address
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : null}
                  <div className="flex flex-col sm:flex-row justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <div className="sm:flex items-center gap-2">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className=" text-sm leading-5 text-gray-700">
                            +91 {address.phone}
                          </p>
                        </div>
                        <p className="mt-1 text-sm leading-5 text-gray-500">
                          {address.area}
                        </p>
                        <p className="mt-1 text-sm leading-5 text-gray-500">
                          {address.city + " " + address.pin}
                        </p>
                        <p className="mt-1 text-sm leading-5 text-gray-500">
                          {address.state + "  " + address.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:items-start sm:mt-0 items-end gap-4 mt-3">
                      <button
                        onClick={() => handleEditAddressForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500">
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, address.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
