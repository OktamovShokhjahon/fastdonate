import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import BASE_URL from "../config.js";
import { useTranslation } from "react-i18next";

const Balance = () => {
  const [userData, setUserData] = useState(null);
  const [prices, setPrices] = useState({});
  const { t } = useTranslation();

  const handleLogout = () => {
    Cookies.remove("token");
    location.href = "/login";
  };

  useEffect(() => {
    const token1 = Cookies.get("token");

    async function getData() {
      if (token1) {
        await axios
          .get(`${BASE_URL}/auth/me`, {
            headers: {
              Authorization: `${token1}`,
            },
          })
          .then((res) => {
            setUserData(res.data);
          })
          .catch((err) => {
            toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik");
          });

        await axios
          .get(`${BASE_URL}/merchant/orders`, {
            headers: {
              Authorization: `${token1}`,
            },
          })
          .then((res) => {})
          .catch((err) => {
            toast.error(
              "Qandaydir xatolik yuz berdi, sahifani yangilab ko'ring"
            );
          });
      }

      await axios
        .get(`${BASE_URL}/topup`)
        .then((res) => {
          setPrices(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getData();
  }, []);

  return userData ? (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex-grow flex flex-col md:flex-row">
        {/* <div className="w-full md:w-64 bg-gray-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                <span>👤</span>
              </div>
              <div className="ml-3">
                <p className="text-white font-semibold">
                  {userData.username || "Aspect07"}
                </p>
                <p className="text-gray-400 text-sm">
                  {userData.email || "habibullayevferuz2001@gmail.com"}
                </p>
                <p className="text-yellow-400 text-sm flex items-center">
                  {userData.balance} <span className="ml-1">uzs</span>
                </p>
              </div>
            </div>
            <nav>
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                  >
                    Shaxsiy ma'lumotlar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/balance"
                    className="block py-2 px-4 bg-blue-500 text-white rounded mb-2"
                  >
                    Balans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                  >
                    Xarid tarixi
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400 transition-colors flex items-center"
          >
            <span className="mr-2">⏎</span> Chiqish
          </button>
        </div> */}
        <div className="w-full md:w-64 bg-gray-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                <span>
                  {userData && userData.photo ? (
                    <img
                      src={`https://assets.fastdonate.su${userData.photo}`}
                      className="rounded-full w-[50px] h-[50px]"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-white font-semibold">
                  {userData.username || t("default_username")}
                </p>
                {/* <p className="text-gray-400 text-sm">
                  {userData.email || t("default_email")}
                </p> */}
                <p className="text-yellow-400 text-sm flex items-center">
                  {userData.balance} <span className="ml-1">uzs</span>
                </p>
              </div>
            </div>
            <nav>
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                  >
                    {t("personal_info")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/balance"
                    className="block py-2 px-4 bg-blue-500 text-white rounded mb-2"
                  >
                    {t("balance")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                  >
                    {t("purchase_history")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400 transition-colors flex items-center"
          >
            <span className="mr-2">⏎</span> {t("logout")}
          </button>
        </div>

        <div className="flex-grow px-6 mt-6 md:mt-0">
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col gap-[15px]">
            <h1>{t("balance")}</h1>
            {prices &&
              Object.keys(prices).map((price, idx) => {
                return (
                  <a
                    key={idx}
                    href="https://t.me/FastDonate_Admin"
                    target="_blank"
                    className="rounded-[15px] transition hover:text-black hover:bg-white items-center cursor-pointer flex gap-[10px]"
                    style={{
                      border: "1px solid white",
                      padding: "10px",
                    }}
                  >
                    <p className="flex gap-[5px] items-center">{price} uzs</p>{" "}
                    <span>=</span>
                    {prices[price]}
                  </a>
                );
              })}
            <p className="rounded-[15px] transition items-center cursor-pointer flex gap-[10px]">
              {t("balance")}: {userData.balance} uzs
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Balance;
