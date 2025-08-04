function Input({ label, placeHolder, type, value = '' }) {
    return (
        <div className="flex flex-col gap-2">
            <label>{label}</label>
            <input type={type} placeholder={placeHolder} className="appearance-none bg-[#F3F3F3] border-[#CFCFCF] border px-4 py-3 rounded-xl font-inter text-[#CFCFCF] stroke-[#CFCFCF]" />
        </div>
    );
}

export default Input;