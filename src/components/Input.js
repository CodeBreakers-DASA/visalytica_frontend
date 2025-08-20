import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

function Input({ label, placeHolder, type, value = '', disabled, onChange, hasError, hasSuccess }) {
    return (
        <div className="flex flex-col gap-2">
            <label className={
                hasError ? 'text-vermelho' : 
                hasSuccess ? 'text-green-600' : ''
            }>{label}</label>
            <input
                disabled={disabled}
                type={type} 
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                className={`${inter.className} appearance-none bg-cinza_medio px-4 py-3 rounded-xl border ${
                    hasError ? 'border-vermelho text-vermelho placeholder-vermelho' : 
                    hasSuccess ? 'border-green-600 text-green-600 placeholder-green-600' :
                    'border-cinza placeholder-cinza_escuro'
                }`} 
            />
        </div>
    );
}

export default Input;