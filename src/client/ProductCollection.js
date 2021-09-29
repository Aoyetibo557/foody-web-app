/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect } from 'react';
import { db } from '../backend/firebase';
import Product from '../frontend/Product';
import SkeletonCard from '../skeleton/SkeletonCard';
import NotFound from './NotFound';
import './ProductCollection.css';

function ProductCollection({cat}) {
    const [products, setProducts] = useState([]);
    const productRef = db.collection("products");
    


    useEffect(() => {

        setTimeout(async () => {
            if(cat === "all") {
                await getProducts()
            }else {
                await getCatProducts()
            }
        },2000)

    }, [cat])

    const getProducts = () => {
        productRef.onSnapshot((doc) => {
            const newArr = [];
            if(doc.empty) {
                console.log("No Products in Database!");
            }else{ 
                doc.forEach(coll => {
                    const {img, name, size, price, category, quantity} = coll.data()

                    newArr.push({
                        key:coll.id,
                        coll,
                        img, name, price, size, category, quantity
                    });
                });
                setProducts(newArr);
            }
        })
    };

    const getCatProducts = () => {
        productRef.where("category", "==", cat).onSnapshot((doc) => {
            const newArr = [];
            if(doc.empty) {
                console.log(cat, " products does not exist!");
                setProducts(newArr)
            }else {
                doc.forEach(coll => {
                    const {img, name, size, price, category, quantity} = coll.data()
                    newArr.push({
                        key:coll.id,
                        coll,
                        img, name, price, size, category, quantity
                    });

                    console.log("Collection Id", coll.id)
                })

                setProducts(newArr)
            }
        })
    }

    return (
        <div className="productCollection">
            
            {products.length === 0 && (
                [1,2,3,4,5].map((n) => (
                    <SkeletonCard key={n} />
                ))
            )}

           {products && (
               <div className="productCollection-wrapper">
                {products.map((product, idx) => (
                    
                    <Product key={idx} 
                        id={product.key}
                        img = {product.img}
                        name={product.name}
                        size = {product.size}
                        price = {product.price}
                    />
                ))}
               </div>
            )}

            
        </div>
    )
}

export default ProductCollection
