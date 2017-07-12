import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import ModelList from './ModelList';

const Products = ({ dispatch, products }) => {
      function handleDelete(id) {
          dispatch({
              type: 'products/delete',
              payload: id,
          });
  }
  return (
    <div>
      <ModelList onDelete={handleDelete}  products={products} />
      
    </div>
  );
};


export default connect(({ products }) => ({
  products,
}))(Products);
