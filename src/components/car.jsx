import React, { Component, PropTypes} from 'react';
import { Table, Icon , Button ,Pagination , Popconfirm } from 'antd';
import $ from "jquery"
import CarList from "./carList"
import CheckCar from "./checkCar"
import styles from "./User.less"
class Car extends Component{
    state = { visible: false }
      shwoCar(){
      	this.setState({
                 visible :true,
                 outData:"",
                 carText:""
      	})
      }
      yesOk(val){
              var data=val.carData;
              var textArr=[];
             data.map(function(item,index){
             	textArr.push(item.carName)
             })
           textArr=textArr.join(" ")
           this.setState({
                 visible :false,
                 carText:"你选择的车型是 :  "+textArr+""
      	  })
      }
      handleCancel(){
      	 this.setState({
                 visible :false
      	})
      }
      render(){
       
      	 return(
      	      <div>
      	        <CheckCar
      		       visible={this.state.visible}    
      	             handleCancel={this.handleCancel.bind(this)}
      	             yesOk={this.yesOk.bind(this)}
          	         />
                     <div>
                      <Button type="primary"  onClick={this.shwoCar.bind(this)}>选择车型</Button>
                        <span className={styles.carText}>{this.state.carText}</span><br/>
                       </div>
                     
      	 	<CarList  source="http://m.qccr.com/api/datacenter/car/getCarByParentIdBatch?api=superapi">
                             <h4 style={{textAlign:"center"}}>车型列表</h4> <br/>
                   </CarList>
      	      </div>
      	 )
      }
}
export default Car;
