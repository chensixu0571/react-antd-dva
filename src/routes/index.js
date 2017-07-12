import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'dva/router';
import App from '../components/IndexPage';
import Products  from '../components/Products';
import Home       from '../components/car';
import Table       from '../components/List';
import ModelTable  from '../components/ModelTable';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/"  component={App} >
                 <Route path="home"      component={Home} />
	           <Route path="products" component={Products} />
	           <Route path="table"       component={Table} />
	           <Route path="modelTable"  component={ModelTable}  />
	       // 初始化首页
	       <IndexRoute component={Home} />
        </Route>
      

    </Router>
  );
}

export default RouterConfig;
