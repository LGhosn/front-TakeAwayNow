import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"
import CartPNG from "../assets/cart.png"

function CartWidget() {

    const { itemsTotal, hasProducts } = useContext(CartContext)

    return (
        <div className={`CartWidgetContainer container ${ hasProducts() ? "d-flex align-items-center justify-content-center rounded" : "d-none"} `}>
            <img src={CartPNG} alt="CartPNG-Icon" />
            <strong className="rounded">{itemsTotal}</strong>
        </div>
    )  
}

export default CartWidget