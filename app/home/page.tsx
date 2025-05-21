"use client";

import React from "react";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const dummyFields = [
  { id: 1, status: "Trống", price: 400000, image: "/images/san1.jpg" },
  { id: 2, status: "Đã đặt", price: 400000, image: "/images/san2.jpg" },
  { id: 3, status: "Trống", price: 450000, image: "/images/san3.jpg" },
  { id: 4, status: "Trống", price: 420000, image: "/images/san4.jpg" },
  { id: 5, status: "Đã đặt", price: 430000, image: "/images/san5.jpg" },
  { id: 6, status: "Trống", price: 410000, image: "/images/san6.jpg" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background + Content */}
      <div
        className="flex-1 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/sanbong.jpg')" }}
      >
        {/* Navbar */}
        <div className="w-full flex items-center justify-between bg-black/60 text-white px-8 py-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt size={24} />
            <span className="text-xl font-semibold">Football Field</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Lịch sử đặt sân</span>
            <span>Tên người dùng</span>
            <FaUserCircle size={28} />
          </div>
        </div>

        {/* Overlay text */}
        <div className="flex justify-center items-center h-[300px] bg-black/40 text-white text-3xl font-bold">
          Đặt lịch sân bóng nhanh và tiện lợi
        </div>

        {/* Field Grid */}
        <div className="bg-white/90 py-8 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dummyFields.map((field) => (
              <div
                key={field.id}
                className="relative rounded-xl overflow-hidden shadow-md bg-white"
              >
                {/* Field Label */}
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Sân 7
                </div>

                {/* Field Image */}
                <div className="h-48 bg-gray-300">
                  <Image
                    src={field.image}
                    alt={`Sân ${field.id}`}
                    width={600}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Field Info */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p
                      className={
                        field.status === "Trống"
                          ? "text-green-600 font-medium text-lg"
                          : "text-red-500 font-medium text-lg"
                      }
                    >
                      {field.status}
                    </p>
                    <span className="text-gray-610 font-medium tracking-wide text-lg">
                      Sân {field.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {field.price.toLocaleString()}đ/h
                    </span>
                    <button className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-24 text-sm">
          <div>
            <h3 className="font-bold text-lg mb-2">Football Field Booking</h3>
            <p>Địa chỉ: 1 Đ. Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
            <p>Email: support@footballfield.vn</p>
            <p>Điện thoại: 0123 456 789</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Liên kết</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hỗ trợ khách hàng
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Bản quyền</h4>
            <p>© 2025 Football Field Booking</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
