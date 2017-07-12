import dva from 'dva';
import './index.css';
import 'antd/dist/antd.less';
import Routes from '../routes'
import createLoading from 'dva-loading';
import Models from '../models'

// 1. Initialize
 const app = dva({
  initialState: {
     products: [
       { name: 'dva', id: 1 },
       { name: 'antd', id: 2 },
     ],
   },
 });

 
// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

app.model(require('../models/index'));

// Object.keys(Models).forEach((item) => {
//    app.model(Models[item]);
// })

// 4. Router
app.router(Routes);

// 5. Start
app.start('#root');
