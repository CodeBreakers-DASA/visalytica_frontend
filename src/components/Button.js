export default function Button({ 
  children, 
  classes = "", 
  onClick, 
  type = "button",
  disabled = false,
  ...props 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        font-medium
        text-xs xs:text-sm sm:text-base
        py-2 xs:py-2.5 sm:py-3
        px-3 xs:px-4 sm:px-5
        rounded-md xs:rounded-lg sm:rounded-xl
        ${classes}
      `}
      {...props}
    >
      {children}
    </button>
  );
}