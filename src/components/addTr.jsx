import React, { Component, PropTypes } from 'react';
import { Form, Select, Input, DatePicker,Modal,InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class AddTr extends Component {
	constructor(props) {
	    super(props);
	    this.state = {}
	}
	Ok(e){
                 const self = this;
                  this.props.form.validateFieldsAndScroll((err, values) => {
		      if (!err) {
		        self.props.handleOk(values);
		      }
	    });
	}
	close(){
		// 重置表单控件值
		this.props.form.resetFields()
	}
	 chinaTest = (rule, value, callback) => {
	          const form = this.props.form;
	          // 获取表单对应控件
	          const timename= form.getFieldValue('type');
	          // 自定义校验规则
	 	var reg = /^([\u4E00-\u9FA5]+，?)+$/;
	 	   if (value && !reg.test(value)) {
		      callback('请输入中文');
		    } else {
		      callback();
		    }
	 }
          render(){
          	     const { getFieldDecorator } = this.props.form;
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
           const config = {
	      rules: [{ type: 'object', required: true, message: '请填写报销日期' }],
	    };
             return (
          	       <Modal
	        title="新增项目" 
	        maskClosable={false}
	        visible={this.props.visible}
	        onOk={this.Ok.bind(this)} 
	        afterClose={this.close.bind(this)}
	        onCancel={this.props.handleCancel}
	       >
		<Form >
			<FormItem
			          {...formItemLayout}
			          label="报销日期"
			        >
			          {getFieldDecorator('time', config)(
			            <DatePicker />
			          )}
		        </FormItem>
     			<FormItem
		            {...formItemLayout}
		            label="报销类型"
		            hasFeedback
		          >
		            {getFieldDecorator('type', {
		              rules: [
		                { required: true, message: '请填写报销类型' }
		              ],
		                initialValue:"type1"
		            })(
		              <Select placeholder="Please select a type">
		                <Option value="type1">type1</Option>
		                <Option value="type2">type2</Option>
		              </Select>
		            )}
		          </FormItem>
		          <FormItem
		            {...formItemLayout}
		            label="报销项目"
		            hasFeedback
		            resetFields
		          >
		            {getFieldDecorator('name', {
		              rules: [
		              {required: true, message: '请填写项目名称' },
			   {validator: this.chinaTest}
		                ]

		            })(
		              <Input  />
		            )}
		          </FormItem>
		     
		          <FormItem
		            {...formItemLayout}
		            label="金额"
		            hasFeedback
		          >
		            {getFieldDecorator('money',{initialValue: 0},{
		                rules: [{
		                required: true, 
		                message: '请填写金额' }]
		            })(
		              <InputNumber  min={0} max={100} />
		            )}
		          </FormItem>
		        </Form>
	       </Modal>
	       )
          }
}

export default Form.create()(AddTr);

