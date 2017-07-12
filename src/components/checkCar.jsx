import React, { Component, PropTypes } from 'react';
import { Form, Icon , Button ,Pagination , Modal ,Tabs,Input } from 'antd';
import $ from "jquery"
import styles from "./User.less"
const FormItem = Form.Item;

class CheckCar extends Component{
	state={
		newKey:Math.random(),
		carData:{
                 		parentIds:"['1']"
                 	},
		carList:[],
		carCbData:[]
	}
	// DOM生成后
   	 componentDidMount() {
       	     this.carData();
	}
	 carData(){
	          var me=this;
	          $.ajax({
	                  type:"get",
	                  data:this.state.carData,
	                  url: "http://m.qccr.com/api/datacenter/car/getCarByParentIdBatch?api=superapi",
	                  dataType: "jsonp",
	                  jsonp: "callback",
	                  success: function (data) {
	                       if(data.code==0){
	                             me.setState({
	                                 carList:data.info
	                             })
	                               if(this.state.carList.length==0){
	                               	            this.state.carData.parentIds="['1']"
			 		this.Ok();
			        }
	                       }
	                  }.bind(this)
	              });
	}
	afterClose(){
    		

		this.setState({
			carData:{
				parentIds : "['1']"
			},
			carCbData:[]
		})
                     this.carData();
                     this.props.handleCancel();
	}
	Ok(){
	                  const self = this;
	                  this.props.form.validateFieldsAndScroll((err, values) => {
			      if (!err) {
			         self.props.yesOk(values);
			      }
		    });
	}
	
	// 选择车型
	changeCar(val,index){
               var carId=val.carCategoryId;
               var carName=val.carCategoryName;
               var newCarName=this.state.carCbData;
                this.state.carData.parentIds=JSON.stringify([''+carId+''])
               newCarName.push({
               	carName : carName,
               	carId : carId
               });
             // 设置车型数据
                 this.props.form.setFields({
		              carData: {
		                value: this.state.carCbData
		              }
	      })

               this.setState({
               	carCbData:newCarName
               })
                this.carData();
	}
	 render(){
	 	var carList=this.state.carList;
	 	var keys=this.state.keys;
	 	const { getFieldDecorator } = this.props.form;
	             var defaultCar=this.state.carCbData;
	 	const formItemLayout = {
		      labelCol: {
		        xs: { span: 24 },
		        sm: { span: 6 }
		      },
		      wrapperCol: {
		        xs: { span: 24 },
		        sm: { span: 14 }
		      }
		  }; 
	 	return (
			   <Modal
			          width="650px"
			          wrapClassName={styles.modalAuto}
			          title="选择车型"
			          visible={this.props.visible}
			          onOk={this.Ok.bind(this)}
			          onCancel={this.afterClose.bind(this)}
			          maskClosable={false}
			          afterClose={this.afterClose.bind(this)}
			        >
  				<ul className={styles.carList}>
				        {
				        	carList.map(function(ele, index){
				        	    return (
					        	    <li key={index}>
					        	    <Button  onClick={this.changeCar.bind(this,ele)}>
					        	  	  {ele.carCategoryName}
					        	    </Button>
					        	    </li>
				        	           )
				                }.bind(this))
				        }
				        </ul>

			             <Form >
				        <FormItem
				       	     {...formItemLayout}
					          label=""
					        >
					          {
					          	getFieldDecorator('carData', {
					              rules: [
					                { required: false, message: '' }
					              ],
					              initialValue:{defaultCar}
		           				 })(
		           				  <div>
					               <input   type="hidden" />
					            </div>
					          )
		           				}
				        </FormItem>
				</Form >
			        </Modal>
	 		)
	 }
}

export default Form.create()(CheckCar);
