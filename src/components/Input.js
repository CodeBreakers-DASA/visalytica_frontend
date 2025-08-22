import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

function Input({ label, placeHolder, type, value = '', disabled }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label>{label}</label>
            <input
                disabled={disabled}
                type={type} 
                placeholder={placeHolder} 
                className={`${inter.className} appearance-none bg-cinza_medio border-cinza border px-4 py-3 rounded-xl  stroke-cinza`} 
            />
        </div>
    );
}

export default Input;