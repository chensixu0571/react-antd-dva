import React, { Component, PropTypes} from 'react';
import { Table, Icon , Button ,Pagination , Popconfirm,Spin,Row, Col  } from 'antd';
import $ from "jquery"
import Styles from "./selectCar.less"
class SelectList extends Component{
       state={
       	flag : 0
       }
       toggleCar(){
       	let carNum=this.state.flag;
       	
       	if(carNum+12>this.props.carData.length){
       		 this.setState({
       		 	flag : 0
       		 })
       	}else{
       		 this.setState({
       		 	flag : carNum+12
       		 })
       	}
       }
       selectedCar(index,item){
              var selectedList=this.props.selectedList;
                 if(selectedList.indexOf(index)>=0){
                 	 return 
                 }
                 this.props.addCar(index,item)
       }
       render(){
          var carData=this.props.carData;
          var flagCar=carData.slice(this.state.flag,this.state.flag+12);
          var selectedList=this.props.selectedList;
       	  return(  
       	     <div >
		   <div >
	                   选择分类
	                   <span onClick={this.toggleCar.bind(this)} className={Styles.taggCar}>换一换</span>
	                </div>
	                <ul className={Styles.carList}>
                                      {
			        flagCar.map(function(item,index){
				 return (       
			 	       	<li  key={index + this.state.flag} onClick={this.selectedCar.bind(this,(index + this.state.flag),item)}  >
			 	       	         {(selectedList.indexOf((index + this.state.flag)) >= 0 ?
			 	       	      	<b className={Styles.disableCar}>{item.carCategoryName}(已选中)</b>	
			 	       	    	:
			 	       		<span>{item.carCategoryName}</span>
			 	       		)}
				 	</li>

				 	)
			          }.bind(this))
			}
	                </ul>
       	     </div>
       	  )
       }
}


export default SelectList;
