import { FETCH_PRODUCTS,FILTER_PRODUCTS_BY_PRICE ,FILTER_PRODUCTS_BY_CATEGORY  } from "../types"

export const fetchProducts = () =>async(dispatch) =>{
  const res = await fetch('/api/products')
  const data=await res.json();
  console.log(data);
    dispatch({
        type:FETCH_PRODUCTS,
        payload: data,
    });
}


export const filterProducts=(products, category) =>(dispatch) =>{
  dispatch({
    type:FILTER_PRODUCTS_BY_CATEGORY ,
    payload: {
      category:category,
      items:
      category ===""
      ? products
      : products.filter((x) => x.category.indexOf(category)>=0 ),
    },
  });
};
 


export const sortProducts=(filteredProducts, sort) =>(dispatch) =>{
  const sortedproduct = filteredProducts.slice();
  
  if(sort==="latest"){
    sortedproduct.sort((a,b)=>(a._id>b._id ? 1 : -1));
  }  else {
    sortedproduct.sort((a,b)=>
  sort === "lowest"
  ? a.price > b.price
  ? 1
  : -1
  : a.price > b.price
  ? -1
  : 1
  
  )

  }
  
  dispatch({
    type:FILTER_PRODUCTS_BY_PRICE,
    payload: {
      sort:sort,
      items:sortedproduct,
    
   
    },
  });



  };