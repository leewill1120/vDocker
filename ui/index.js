import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon , Dropdown, Button, Modal, message, Input, Form, Alert} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const FormItem = Form.Item;
import Summary from './summary';
import Container from './container';
import Image from './image';
import Network from './network';
import Volume from './volume';

import './index.css';

class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      mode: 'inline',
      modifyPassVisible: false,
      modifyPassLoading: false,
      current: 'summary'
    }

    this.onCollapse = (collapsed) => {
      this.setState({
        collapsed,
        mode: collapsed ? 'vertical' : 'inline',
      });
    }

    this.modifyPassSubmit = ()=>{
      var newpasswd = $("#newpasswd").val()
      var newpasswd_confirm = $("#newpasswd_confirm").val()
      if(!newpasswd || !newpasswd_confirm){
        message.error("请输入密码")
        return
      }

      if(newpasswd != newpasswd_confirm){
        message.error("两次输入的密码不一致")
        return
      }
      
      this.setState({modifyPassLoading: true})

      this.modifyPassword(sessionStorage.username, newpasswd)
    }

    this.menuItemClick = (obj)=>{
        this.setState({current: obj.key})
    }

    this.modifyPassCancel = ()=>{
      this.setState({modifyPassVisible: false})
      $("#newpasswd").val("")
      $("#newpasswd_confirm").val("")
    }

    this.modifyPassword = (username, password, cb)=>{
      $.ajax({
        url:"/account/modifypassword",
        type: "post",
        dataType: "json",
        data:{
          username: username,
          password: sha256_digest(password)
        },
        success: (data, status, res)=>{
          if(200 == res.status){
            if(data["ErrorInfo"]){
              this.setState({modifyPassLoading: false})
              message.error(data["ErrorInfo"]);
            }else{
              this.setState({modifyPassVisible: false, modifyPassLoading: false})
              Modal.success({
                title: "修改成功",
                content: "请使用新密码重新登录",
                onOk:()=>{
                    delete localStorage.password
                    window.location.href = "/login/out"
                }
              })
            }
          }else{
            message.error("unreached")
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          console.log(XMLHttpRequest, textStatus, errorThrown)
          if(401 == XMLHttpRequest.status){
            window.location.href = "/login/in"
          }else{
            cb("网络错误，请检查网络是否通畅。")
          }
        }
      })
    }

  }

  render() {
    const accountMenu = (
      <Menu>
        <Menu.Item key="0">
          <a href="#"><Icon type="setting" /> 个人设置</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a onClick={()=>{
            this.setState({modifyPassVisible: true})
          }}><Icon type="key" /> 修改密码</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/login/out"><Icon type="logout" /> 注销登录</a>
        </Menu.Item>
      </Menu>
    );

    var content = null
    switch(this.state.current){
      case 'summary':
        content = (<Summary />)
        break
      case 'container':
        content = (<Container />)
        break
      case 'image':
        content = (<Image />)
        break
      case 'network':
        content = (<Network />)
        break
      case 'volume':
        content = (<Volume />)
        break
    }

    return (
        <Layout style={{height:"100%"}}>
          <Sider
            collapsible
            onCollapse={this.onCollapse}
            collapsed={this.state.collapsed}
          >
            <div className="logo">{document.title}</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['summary']} onClick={this.menuItemClick}>
              <Menu.Item key="summary">
                <Icon type="home" />
                <span className="nav-text">总览</span>
              </Menu.Item>
              <Menu.Item key="container">
                <Icon type="appstore-o" />
                <span className="nav-text">容器</span>
              </Menu.Item>
              <Menu.Item key="image">
                <Icon type="tags-o" />
                <span className="nav-text">镜像</span>
              </Menu.Item>
              <Menu.Item key="network">
                <Icon type="cloud-o" />
                <span className="nav-text">网络</span>
              </Menu.Item>
              <Menu.Item key="volume">
                <Icon type="hdd" />
                <span className="nav-text">存储</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#537', padding: 0 }}>
              <div className="accountMenu">
                <Dropdown overlay={accountMenu} trigger={['click']}>
                  <Button style={{ marginLeft: 8 }}>
                    <span style={{marginRight:8}}>
                      {"true" == sessionStorage.isAdmin ? (<i className="iconfont icon-admin"></i>) : (<i className="iconfont icon-admin1"></i>)}
                    </span>
                    {sessionStorage.username} <Icon type="down" />
                  </Button>
                </Dropdown>
              </div>
            </Header>
            <Content>
              <div style={{ margin: 10, padding:10, background: '#fff'}}>
                {content}
              </div>
            </Content>
          </Layout>
          <Modal
            visible={this.state.modifyPassVisible}
            title="修改密码"
            onOk={this.modifyPassSubmit}
            onCancel={this.modifyPassCancel}
            maskClosable={false}
            footer={[
              <Button key="back" size="large" onClick={this.modifyPassCancel}>取消</Button>,
              <Button key="submit" type="primary" size="large" loading={this.state.modifyPassLoading} onClick={this.modifyPassSubmit}>
                提交
              </Button>,
            ]}
          >
            <Alert message="注意：密码修改成功后会强制您使用新密码重新登录。"
              type="warning"
              closable
            />
            <Input.Group>
              <Input type="password" placeholder="新密码" style={{marginBottom: 20}} id="newpasswd"/>
              <Input type="password" placeholder="确认密码" id="newpasswd_confirm"/>              
            </Input.Group>
          </Modal>
        </Layout>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));