import React, { Component, PropTypes } from 'react';
import {Form,Table, DatePicker, Select, InputNumber, Input, Button, Icon } from 'antd';//引用了ant design中的组件需在这里引用，如：我用了table，DatePicker等组件便需要在这里引用一下，否则将会找不到组件。
import TrModal from './addTr';
import $ from "jquery"
// 时间格式化
function FormatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}


class Details extends Component {//es6中定义的一个Details类
      constructor(props) {//构造函数
      super(props);
      this.state = {
        //初始化，初始的第一行数据
        dataSource: []
      }
      this.showModal = this.showModal.bind(this);//绑定this，这个是下面声明onClick的方法，需绑定this，在onClick事件中直接用this.handleAdd即可
      this.handleDel = this.handleDel.bind(this);
      this.handleOk= this.handleOk.bind(this);
    }
  
      showModal(){
             this.setState({ visible: true })
      }
         //删除
      handleDel() {
      const DelDataSource = this.state.dataSource;
      DelDataSource.splice(event.target.getAttribute('data-index'), 1);//data-index为获取索引，后面的1为一次去除几行
      this.setState({
          dataSource: DelDataSource,
      });
      }
      //关闭弹窗
      handleCancel(){

            this.setState({ visible: false })
      }
    // 校验通过
    handleOk(val){
       var timeVal=FormatDate(val.time._d);
       const newDataSource = this.state.dataSource;//将this.state.dateSource赋给newDataSource
      newDataSource.push(
           {       
              datatime: timeVal,//这里的this.props.datatime可直接在这里赋值，在这里赋的值为初始值，会显示在文本框中，下面同理
              applytype:val.type,
              applyproject: val.name,
              money: val.money,
              operation: "123",
              visible:false
            }
      );
       this.setState({
          dataSource: newDataSource,//将newDataSource新添加的数组给dataSource
          visible: false
        });
    }
    
   render() {
      //console.log(this.state.dataSource);
      var columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => {
      return <span  data-index={index+1}  >{index+1}</span>//data-index现在为获得index的下标，上面的删除data-index即是获取index的下标
      },
      }, {
      title: '日期',
      dataIndex: 'datatime',
      key: 'datatime'
      }, {
      title: '报销类型',
      dataIndex: 'applytype',
      key: 'applytype'
      }, {
      title: '报销项目',
      dataIndex: 'applyproject',
      key: 'applyproject'
      }, {
      title: '金额',
      dataIndex: 'money',
      key: 'money'
      }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => {
      return <Icon type="delete" data-index={index} onClick={this.handleDel} />//data-index现在为获得index的下标，上面的删除data-index即是获取index的下标
      },
      }];
      return (
              <div>
              <Icon type="book" className="ant-icon" />
              <span className="ant-title">报销明细</span>

              <Table
               rowKey="uid"
               dataSource={this.state.dataSource} columns={columns}//this.state.dataSource即为获取初始化dataSource数组
              pagination={false} bordered
              />
             <div><br/><Button  type="primary"  onClick={this.showModal}>添加</Button></div>
                <TrModal   
                  visible={this.state.visible}    
                  handleCancel={this.handleCancel.bind(this)}
                  handleOk={this.handleOk}
                   />
              </div>
             );
          }
      }

export default Details;
