import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})

    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success("Add to card")
    }

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity
        setCartItems(cartData)
        toast.success("Update cart")
    }

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        setCartItems(cartData)
        toast.success("Remove from cart")
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const value = { navigate, products, user,cartItems, addToCart, removeFromCart, updateCartItem, setUser, currency, isSeller, setIsSeller, showUserLogin, setShowUserLogin }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}