import React, { Component, PropTypes } from 'react';
import { Table, Icon , Button ,Pagination , Popconfirm,Spin  } from 'antd';
import createLoading from 'dva-loading';
import $ from "jquery"
import styles from "./User.less"

class CarList extends Component{
     constructor(props) {
     	super(props);
     	this.state={
                 carList:[],
                 carData:{
                 	parentIds:"['1']"
                 },
                 pagination:{
                    pageSize:5
                 }
     	}
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
                  url: this.props.source,
                  dataType: "jsonp",
                  jsonp: "callback",
                  success: function (data) {
                       if(data.code==0){
                             const pagination = { ...this.state.pagination };
                             pagination.total =data.info.length
                            
                                me.setState({
                                     carList:data.info,
                                     pagination
                                 })                            

                       }
                  }.bind(this)
              });
    }
    changePage(pag,filters,sorter){
           var pager={...this.state.pagination}
            pager.current = pag.current;
             this.setState({
               pagination: pager
            });
    }
    deleteCar(carId){
          var newCarList=this.state.carList;
          newCarList.forEach(function(item,index){
                if(item.carCategoryId==carId){
                    newCarList.splice(index,1)
                }
            })
        this.setState({
            carList:newCarList
        })
    }
     render(){
            var dataList=this.state.carList;
            var columns=
             [{
              title: '车型',
              dataIndex: 'carCategoryName',
              key: 'carCategoryName',
              render: (text, record) => {
                  return (
                    <div>
                    <img className={styles.logoImg}  src={'http://static.qichechaoren.com/upload/logo/' + record.logoImg} />
                         <span >{text}</span>
                     </div>
                            )
                        }
                      },{
                        title: '操作',
                        key: 'action',
                        render: (text, record,index) => {
                             return (
                               <Popconfirm title="确定要删除车型吗?" onConfirm={this.deleteCar.bind(this, record.carCategoryId)}>
                                   <Icon  type="delete" />
                                </Popconfirm>
                              )
                        }
                      }];

                     if(dataList.length>0){
                        return (
                            <div>
                                   {this.props.children}
                              <Table  
                                rowKey="uid"
                                pagination={this.state.pagination}
                                columns={columns} 
                                dataSource={dataList} 
                                onChange={this.changePage.bind(this)}
                                 />
                            </div>
                        )
                     }else{
                         return (
                             <div className={styles.loading}>
                              <Spin size="large" />
                              </div>
                           )
                     }
                    
         }
    }

export default CarList;
