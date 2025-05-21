"use client";

import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/sanbong.jpg')",
      }}
    >
      <div
        className={`w-1/2 h-[480px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 flex justify-center items-center ${
          showLogin ? "w-[60%]" : ""
        }`}
      >
        <div className="flex w-full h-full">
          {/* Left side */}
          <div className="flex flex-col justify-center items-center flex-1 min-w-1/2 p-10 bg-[#2c3e50] text-white transition-all duration-500">
            <h1 className="text-4xl mb-2">Đặt lịch sân bóng</h1>
            <p className="text-lg mb-8">Đặt sân nhanh chóng và tiện lợi</p>
            <div
              className="bg-green-600 p-5 rounded-xl shadow cursor-pointer"
              onClick={() => setShowLogin(true)}
            >
              <button className="min-w-[150px] py-3 px-6 text-lg text-white bg-green-600 rounded-lg hover:bg-green-700 transition">
                Đặt sân
              </button>
            </div>
          </div>

          {/* Right side (Login box) */}
          <div
            className={`relative flex flex-col justify-center bg-white transition-all duration-1000 ${
              showLogin
                ? "flex-1 max-w-1/2 opacity-100 p-10"
                : "flex-0 max-w-0 opacity-0 p-0"
            }`}
          >
            {showLogin && (
              <>
                <button
                  className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-red-500"
                  onClick={() => setShowLogin(false)}
                >
                  &times;
                </button>
                <div className="flex justify-center mb-4">
                  <FaCircleUser size={60} color="#2980b9" />
                </div>
                <h2 className="text-center text-2xl font-semibold text-[#2c3e50] mb-5">
                  Đăng nhập
                </h2>

                <div className="mb-4">
                  <label className="block mb-1">Email hoặc SĐT:</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập email hoặc số điện thoại"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Mật khẩu:</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập mật khẩu"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember">Ghi nhớ tôi</label>
                </div>

                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Đăng nhập
                </button>

                <div className="text-center mt-4 text-sm">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    Quên mật khẩu?
                  </a>
                  <span className="mx-2">|</span>
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/register");
                    }}
                  >
                    Đăng ký
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}