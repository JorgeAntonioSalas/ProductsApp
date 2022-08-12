import React from 'react';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';



const ProductsDetail = () => {

    const allProducts = useSelector(state => state.products);
    const [ productsDetail, setProductsDetail] = useState({});

    const { id } = useParams();

    const dispatch = useDispatch();


    useEffect(()=> 
    {
        const products = allProducts.find(productsItem => productsItem.id === Number(id));
        setProductsDetail(products);
    },[allProducts])


    useEffect(()=> {
        dispatch(getProductsThunk());
    },[])

    return (
        <div>
            <h1><b> {productsDetail.title} </b></h1>
            <h4>Price: $ {productsDetail.price}</h4>
            <h7>Description: {productsDetail.description}</h7>
            <h5>{productsDetail.status}</h5>
            
            <img src={productsDetail.productImgs} alt="" />
        </div>
    );
};

export default ProductsDetail;