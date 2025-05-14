import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../config";
import { useTranslation } from "react-i18next";

const ProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
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
            toast.error(t("error_fetching_user_data"));
          });
      }
    }

    getData();
  }, [t]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error(t("please_select_image"));
      return;
    }
    const token1 = Cookies.get("token");
    const formData = new FormData();
    formData.append("photo", image);

    try {
      await axios.post(`${BASE_URL}/profile/update_photo`, formData, {
        headers: {
          Authorization: `${token1}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(t("profile_pic_updated"));
      setImage(null);
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `${token1}` },
      });
      setUserData(res.data);
    } catch (err) {
      toast.error(t("error_updating_profile_pic"));
    }
  };

  return userData ? (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex-grow flex flex-col md:flex-row">
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
                    className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
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
                <li>
                  <Link
                    to="/profile-settings"
                    className="block py-2 px-4 bg-blue-500 text-white rounded mb-2"
                  >
                    {t("profile_settings")}
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
            <h1 className="text-[24px] font-medium">
              {t("change_profile_pic")}
            </h1>

            <form onSubmit={handleSubmit}>
              <label className="flex flex-col gap-[10px]">
                <span>{t("change_profile_pic")}</span>
                <div className="relative w-full max-w-xs">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-300
                                                                                file:mr-4 file:py-2 file:px-4
                                                                                file:rounded-full file:border-0
                                                                                file:text-sm file:font-semibold
                                                                                file:bg-blue-600 file:text-white
                                                                                hover:file:bg-blue-700
                                                                                transition-colors duration-200
                                                                                cursor-pointer
                                                                        "
                  />
                </div>
                {image && (
                  <div className="mt-2">
                    <span className="text-gray-400 text-sm">{image.name}</span>
                  </div>
                )}
              </label>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {t("update")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProfileSettings;
