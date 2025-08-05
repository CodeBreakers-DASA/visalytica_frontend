import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

function Input({ label, placeHolder, type, value = '' }) {
    return (
        <div className="flex flex-col gap-2">
            <label>{label}</label>
            <input type={type} placeholder={placeHolder} className={`${inter.className} appearance-none bg-[#F3F3F3] border-[#CFCFCF] border px-4 py-3 rounded-xl text-[#CFCFCF] stroke-[#CFCFCF]`}/>
        </div>
    );
}

export default Input;