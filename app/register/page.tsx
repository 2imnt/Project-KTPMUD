"use client";

import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Đăng ký:", form);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/sanbong.jpg')",
      }}
    >
      <div className="w-1/2 h-[680px] overflow-hidden rounded-2xl shadow-2xl flex">
        {/* Left side */}
        <div className="flex flex-col justify-center items-center flex-1 min-w-1/2 p-10 bg-[#2c3e50] text-white">
          <h1 className="text-4xl mb-2">Đăng ký tài khoản</h1>
          <p className="text-lg mb-8">Đặt sân nhanh chóng và tiện lợi</p>
        </div>

        {/* Right side (Form) */}
        <div className="flex flex-col justify-center bg-white p-10 flex-1">
          <div className="flex justify-center mb-5">
            <FaCircleUser size={60} color="#2980b9" />
          </div>
          <h2 className="text-center text-2xl font-semibold text-[#2c3e50] mb-5">
            Đăng ký
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Họ tên:</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Nhập họ tên"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Mật khẩu:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Xác nhận mật khẩu:</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 mt-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}