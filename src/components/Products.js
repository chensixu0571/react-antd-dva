import React, { Component, PropTypes} from 'react';
import $ from "jquery"
import SelectList from "./selectList"
import SelectedList from "./selectedList"
import Styles from "./selectCar.less"
class Products extends Component{
           state={
           	  carData:[],
           	  selectedList:[],
           	  carList:[]
           }
           componentDidMount(){
                 var me=this;
           	      $.ajax({
	            type:"get",
	            url: 'http://m.qccr.com/api/datacenter/car/getCarByParentIdBatch?api=superapi&&parentIds=["1"]',
	            dataType: "jsonp",
	            jsonp: "callback",
	            success: function (data) {
	                    if(data.code==0 && data.info.length>0){
	                    	  me.setState({
	                    	  	  carData:data.info
	                    	  })
	                    }
	            }
	        });
           }
           deleteCar(index,i){
                      var carArr=this.state.carList;
                     var selectedList=this.state.selectedList;
                       carArr.splice(i,1)
                       selectedList.splice(i,1)
                       this.setState({
                       	   carList:carArr,
                       	   selectedList:selectedList
                       })
           }
           addCar(index,item){
                var arr=this.state.selectedList;
                var carArr=this.state.carList;
                carArr.push(item)
                arr.push(index)
           	   this.setState({
           	   	selectedList:arr,
           	   	carList:carArr
           	   })
           }
	 render(){
                        var  carData=this.state.carData;
                        var  selectedList=this.state.selectedList
                    return(
                    	<div className={Styles.selectBox}>
                    	  <SelectedList
                              carIndex={selectedList}
                              carList={this.state.carList}
                              deleteCar={this.deleteCar.bind(this)}
                             ></SelectedList>

                    	    <SelectList 
                    	    selectedList={selectedList}
                    	    addCar={this.addCar.bind(this)} 
                    	    carData={carData}></SelectList>
		</div>
		  )

	 }
}


export default Products;

