import React, { Component, PropTypes} from 'react';
import { Table, Icon , Button ,Pagination , Popconfirm,Spin,Row, Col  } from 'antd';
import $ from "jquery"
import Styles from "./selectCar.less"

class SelectedList extends Component{
	state={
		carIndex:this.props.carIndex,
		carArr:this.props.carList
	}
	delCar(carIndex,i){
                       this.props.deleteCar(carIndex,i)
	}
	render(){
                  var carIndex=this.props.carIndex;
		return(
                              <div>
                              	<div>已选车型</div>
                                     <ul className={Styles.delCarList}>
                                         {
                                         	this.state.carArr.map(function(item,index){
                                                        return (
                                                        	<li key={index}>{item.carCategoryName}
                                                        	<span onClick={this.delCar.bind(this,carIndex[index],index)} className={Styles.delCarBtn}>
                                                        	<Icon  type="close" /></span>
                                                        	</li>
                                                        	)
                                         	}.bind(this))
                                         }
                                     </ul>
                              </div>
			)
	}
}

export default SelectedList;
