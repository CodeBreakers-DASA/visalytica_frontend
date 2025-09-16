import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

function Input({ label, placeHolder, type = 'text', value, defaultValue, disabled, onChange, hasError, hasSuccess, ...props }) {
    return (
        <div className="flex flex-col gap-2 w-full">
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
                className={`${inter.className} appearance-none bg-cinza_medio px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    hasError ? 'border-vermelho text-vermelho placeholder-vermelho' : 
                    hasSuccess ? 'border-green-600 text-green-600 placeholder-green-600' :
                    'border-cinza placeholder-cinza_escuro'
                }`}
                {...props}
            />
        </div>
    );
}

export default Input;