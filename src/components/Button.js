export default function Button({ children, classes }){
    return(
        <button className={classes + ' p-4 rounded-xl cursor-pointer text-white text-xl font-medium'}>
            {children}
        </button>
    )
}