import React, { useState } from 'react';
import './Product.css';
import { useHistory } from 'react-router';
import { BsBoxArrowRight } from 'react-icons/bs';




function Product({id, img, name, size, price, category, quantity}) {
    const [clicked, setClick ] = useState(false)
    const history = useHistory();

    const handleClick = () => {
        history.push( `/detail/id:${id}`)
    }

    return (
        <div className="product">
            <img className="product__img" src={img} alt={name} />

            <div className="product__info">
                <h4 className="product__h4">{name}</h4>
                <p className="product__size">{size}</p>

                <div>
                    <p className="product__price">${price}</p>

                    

                    <button onClick={handleClick} type="submit" className={clicked === true ? "product__btn activeLoading": "product__btn"}> 
                        <BsBoxArrowRight />
                    </button>
                   
                </div>
            </div>
        </div>
    )
}

export default Product
