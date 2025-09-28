'use-client'

import { Inter } from "next/font/google";
import { twMerge } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

function Input({ label, placeHolder, type = 'text', value, defaultValue, disabled, onChange, hasError, hasSuccess, className, ...props }) {
    return (
        <div className={`flex flex-col w-full ${label ? 'gap-2 ' : ''}`}>
            <label className={
                hasError ? 'text-vermelho' : 
                hasSuccess ? 'text-green-600' : ''
            }>{label}</label>
            <input
                disabled={disabled}
                type={type} 
                placeholder={placeHolder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                className={twMerge( 'appearance-none bg-cinza_medio px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500', inter.className,
                    hasError ? 'border-vermelho text-vermelho placeholder-vermelho' : 
                    hasSuccess ? 'border-green-600 text-green-600 placeholder-green-600' :
                    'border-cinza placeholder-cinza_escuro', className    )}
                {...props}
            />
        </div>
    );
}

export default Input;