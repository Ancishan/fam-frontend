
import { useEffect, useState } from "react"


const useProducts = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://fam-backend-49mw.onrender.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    },[])
    return {products}
}

export default useProducts