export default function Button({ children, classes }){
    return(
        <button className={classes + ' rounded-xl cursor-pointer text-white text-xl font-medium'}>
            {children}
        </button>
    )
}