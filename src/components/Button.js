export default function Button({ children, classes, onClick }){
    return(
        <button 
            className={classes + 'rounded-xl cursor-pointer text-white text-xl font-medium'}
            onClick={onClick}
        >
            {children}
        </button>
    )
}