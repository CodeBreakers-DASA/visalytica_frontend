'use client'

import { Inter } from "next/font/google";
import { twMerge } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

export default function Input({ 
  label, 
  placeHolder, 
  className = "", 
  type = "text", 
  value, 
  onChange, 
  hasError, 
  hasSuccess, 
  ...props 
}) {
  return (
    <div className={`flex flex-col w-full ${label ? 'gap-1.5 xs:gap-2' : ''}`}>
      <label className={twMerge(
        'text-sm xs:text-base font-medium',
        inter.className,
        hasError ? 'text-vermelho' : 
        hasSuccess ? 'text-green-600' : ''
      )}>{label}</label>
      <input
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={twMerge(`
          w-full 
          h-[40px] xs:h-[42px] sm:h-[45px] md:h-[48px] lg:h-[50px]
          px-3 xs:px-3.5 sm:px-4 md:px-4 lg:px-5
          text-xs xs:text-sm sm:text-base
          border border-cinza 
          rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl
          focus:outline-none focus:ring-2 focus:ring-azul focus:border-transparent
          placeholder:text-cinza_escuro
          transition-all duration-200
        `, className)}
        {...props}
      />
    </div>
  );
}