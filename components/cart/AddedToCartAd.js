import checkPNG from "./../assets/comprobado.png"
import { Link } from "react-router-dom"

const AddedToCartAd = ( { itemTitle }) => {
    return (
        <div className="container d-flex flex-column mt-5 p-3 fs-3 justify-content-center align-items-center">
            <img src={checkPNG} className="PNGsuccess" alt="Success adding items to cart" />
            Product successfully added to cart !
            <Link className="linkButton" to={"/"}>
                <button className="btn btn-primary mb-2">Keep buying</button>
            </Link>
            <Link className="linkButton" to={"/cart"}>
                <button className="btn btn-success">Go to cart</button>
            </Link>
        </div>
    )
}

export default AddedToCartAd;