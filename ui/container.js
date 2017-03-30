import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon , Dropdown, Button, Modal, message, Input, Form, Alert, notification, Table} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
const FormItem = Form.Item;
const { Column, ColumnGroup } = Table;

class Container extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			containers: [],
			totalCount: 0,
			loading: false,
			searchResult: [],
		}

		this.refresh = ()=>{
			this.setState({
				loading: true
			})

			$.ajax({
				url:"/container/list",
				type: "get",
				dataType: "json",
				success: (data, status, res)=>{
					this.setState({loading: false})
					if(200 == res.status){
						if(data["ErrorInfo"]){
							notification.error({message:data["ErrorInfo"]})
							this.setState({loading: false})
						}else{
							this.setState({
								containers: data['containers'],
								totalCount: data['totalCount']
							})
						}
					}else{
						console.log("unreached")
					}
				},
				error: (XMLHttpRequest, textStatus, errorThrown)=>{
					this.setState({loading: false})

					console.log(XMLHttpRequest, textStatus, errorThrown)
					if(401 == XMLHttpRequest.status){
						Modal.warning({
							title: "登录超时，请重新登录",
							onOk: ()=>{
								window.location.href = "/login/in"
							}
						})
					}else if(404 == XMLHttpRequest.status){
						notification.error({
							message: "操作失败",
							description: "不支持该操作。"
						})		
					}else{
						notification.error({
							message: "操作失败",
							description: "网络错误，请检查网络是否通畅。"
						})			
					}
				}
			})
		}

		this.container_op = {
			start: ()=>{
				if(!this.selection){
					notification.error({
						message: "未选中任何对象"
					})
					return
				}
				$.ajax({
					url:"/container/start",
					type: "post",
					dataType: "json",
					contentType: "json",
					data: JSON.stringify(this.selection),
					success: (data, status, res)=>{
						if(200 == res.status){
							if(data["ErrorInfo"]){
								notification.error({
									message: data["container"].Names + " 启动失败",
									description: data["ErrorInfo"]
								})
							}else{
								notification.success({
									message: data["container"].Names + " 启动成功",
									duration: 1
								})
								this.refresh()
							}
						}else{
							console.log("unreached")
						}
					},
					error: (XMLHttpRequest, textStatus, errorThrown)=>{
						console.log(XMLHttpRequest, textStatus, errorThrown)
						if(401 == XMLHttpRequest.status){
							Modal.warning({
								title: "登录超时，请重新登录",
								onOk: ()=>{
									window.location.href = "/login/in"
								}
							})
						}else if(404 == XMLHttpRequest.status){
							notification.error({
								message: "操作失败",
								description: "不支持该操作。"
							})		
						}else{
							notification.error({
								message: "操作失败",
								description: "网络错误，请检查网络是否通畅。"
							})			
						}
					}
				})
			},
			restart: ()=>{
				if(!this.selection){
					notification.error({
						message: "未选中任何对象"
					})
					return
				}

				var do_restart = ()=>{
					$.ajax({
						url:"/container/restart",
						type: "post",
						dataType: "json",
						contentType: "json",
						data: JSON.stringify(this.selection),
						success: (data, status, res)=>{
							if(200 == res.status){
								if(data["ErrorInfo"]){
									notification.error({
										message: data["container"].Names + " 重启失败",
										description: data["ErrorInfo"]
									})
								}else{
									notification.success({
										message: data["container"].Names + " 重启成功",
										duration: 1
									})
									this.refresh()
								}
							}else{
								console.log("unreached")
							}
						},
						error: (XMLHttpRequest, textStatus, errorThrown)=>{
							console.log(XMLHttpRequest, textStatus, errorThrown)
							if(401 == XMLHttpRequest.status){
								Modal.warning({
									title: "登录超时，请重新登录",
									onOk: ()=>{
										window.location.href = "/login/in"
									}
								})
							}else if(404 == XMLHttpRequest.status){
								notification.error({
									message: "操作失败",
									description: "不支持该操作。"
								})		
							}else{
								notification.error({
									message: "操作失败",
									description: "网络错误，请检查网络是否通畅。"
								})			
							}
						}
					})
				}

				Modal.confirm({
					title: "确认",
					content: "确定要重启 " + this.selection.Names + " 吗",
					onOk: do_restart
				})
			},
			stop: ()=>{
				if(!this.selection){
					notification.error({
						message: "未选中任何对象"
					})
					return
				}

				var do_stop = ()=>{
					$.ajax({
						url:"/container/stop",
						type: "post",
						dataType: "json",
						contentType: "json",
						data: JSON.stringify(this.selection),
						success: (data, status, res)=>{
							if(200 == res.status){
								if(data["ErrorInfo"]){
									notification.error({
										message: data["container"].Names + " 停止失败",
										description: data["ErrorInfo"]
									})
								}else{
									notification.success({
										message: data["container"].Names + " 停止成功",
										duration: 1
									})
									this.refresh()
								}
							}else{
								console.log("unreached")
							}
						},
						error: (XMLHttpRequest, textStatus, errorThrown)=>{
							console.log(XMLHttpRequest, textStatus, errorThrown)
							if(401 == XMLHttpRequest.status){
								Modal.warning({
									title: "登录超时，请重新登录",
									onOk: ()=>{
										window.location.href = "/login/in"
									}
								})
							}else if(404 == XMLHttpRequest.status){
								notification.error({
									message: "操作失败",
									description: "不支持该操作。"
								})		
							}else{
								notification.error({
									message: "操作失败",
									description: "网络错误，请检查网络是否通畅。"
								})			
							}
						}
					})
				}

				Modal.confirm({
					title: "确认",
					content: "确定要停止 " + this.selection.Names + " 吗",
					onOk: do_stop
				})
			},
			clone: ()=>{

			},
			upgrade: ()=>{

			},
			modify: ()=>{

			},
			console: ()=>{

			},
			log: ()=>{

			},
			detail: ()=>{

			},
			delete: ()=>{

			}
		}

		this.search = (value)=>{
			this.state.searchResult = []
			var r = []
			for (var i = 0; i < this.state.containers.length; i++) {
				for (var j = this.state.containers[i].Names.length - 1; j >= 0; j--) {
					if ( -1 != this.state.containers[i].Names[j].indexOf(value)){
						r.push(this.state.containers[i])
						break
					}
				}
			}
			this.setState({searchResult: r})
		}

		this.componentDidMount = ()=>{
  			this.refresh()
  		}
	}

	render() {
		const menu = (
		      <Menu>
		        <Menu.Item key="0">
		          <a onClick={this.container_op.start}><i className="iconfont icon-start"></i> 启动</a>
		        </Menu.Item>
		        <Menu.Item key="1">
		          <a onClick={this.container_op.restart}><i className="iconfont icon-plyrrestart-copy"></i> 重启</a>
		        </Menu.Item>
		        <Menu.Item key="2">
		          <a onClick={this.container_op.stop}><i className="iconfont icon-zanting"></i> 停止</a>
		        </Menu.Item>
		        <Menu.Item key="3">
		          <a onClick={this.container_op.clone}><i className="iconfont icon-CIT-clone"></i> 克隆</a>
		        </Menu.Item>
		        <Menu.Item key="4">
		          <a onClick={this.container_op.upgrade}><i className="iconfont icon-update"></i> 升级</a>
		        </Menu.Item>
		        <Menu.Item key="5">
		          <a onClick={this.container_op.modify}><i className="iconfont icon-modify"></i> 修改</a>
		        </Menu.Item>
		        <Menu.Item key="6">
		          <a onClick={this.container_op.console}><i className="iconfont icon-console"></i> 控制台</a>
		        </Menu.Item>
		        <Menu.Item key="7">
		          <a onClick={this.container_op.log}><i className="iconfont icon-rizhi"></i> 日志</a>
		        </Menu.Item>
		        <Menu.Item key="8">
		          <a onClick={this.container_op.detail}><i className="iconfont icon-detail"></i> 详细信息</a>
		        </Menu.Item>
		        <Menu.Item key="9">
		          <a onClick={this.container_op.delete}><i className="iconfont icon-delete"></i> 删除</a>
		        </Menu.Item>
		      </Menu>
		);

		var images = []
		var creators = [{
			text: "未知",
			value: "unknow"
		}]
		for (var i = this.state.containers.length - 1; i >= 0; i--) {
			if(this.state.containers[i].Creator){
				creators.push({
					text: this.state.containers[i].Creator,
					value: this.state.containers[i].Creator
				})				
			}

			images.push({
				text: this.state.containers[i].Image,
				value: this.state.containers[i].Image
			})
		}

		return (
			<div>
				<div style={dashboard}>
					<Button type="primary" style={{marginRight: 10}}><Icon type="folder-add" /> 增加</Button>
					<Button type="primary" style={{marginRight: 10}} onClick={this.refresh}><Icon type="reload" /> 刷新</Button>
					<Search
						placeholder="输入容器名"
						style={{ width: 300, float:'right' }}
						onSearch={this.search}
					/>
				</div>
				<Table 
					dataSource={this.state.searchResult.length != 0 ? this.state.searchResult : this.state.containers}
					pagination={{
						total: this.state.totalCount,
						showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
						showQuickJumper: true,
						showSizeChanger: true,
						pageSizeOptions: ['10', '20', '30', '40'],
					}}
					loading={this.state.loading}
				>
					<Column
						title="序号"
						key="No"
						render={(text, record, index)=>{
							return this.state.containers.indexOf(record) + 1
						}}
					/>
					<Column
						title="名称"
						dataIndex="Names"
						key="Names"
					/>
					<Column
						title="镜像"
						dataIndex="Image"
						key="Image"
						filters={images}
						onFilter={(value, record)=> value == record.Image}
					/>
					<Column
						title="创建时间"
						dataIndex="Created"
						key="Created"
					/>
					<Column
						title="创建者"
						dataIndex="Labels"
						key="Creator"
						filters={creators}
						onFilter={(value, record) => {
							if("unknow" == value && (record.Creator === undefined || "" == record.Creator)) {
								return true
							}

							return record.Creator == value
						}}
						filterMultiple={true}
						render={(text, record, index)=> record.Creator }
					/>
					<Column
						title="状态"
						dataIndex="State"
						key="State"
						filters={[
							{text:"已创建", value:"created"},
							{text:"运行中", value:"running"},
							{text:"已停止", value:"exited"},
							{text:"重启中", value:"restarting"},
							{text:"删除中", value:"deleting"},
							{text:"已暂停", value:"paused"},
							{text:"死亡", value:"dead"},
							{text:"其他", value:"other"}
						]}
						filterMultiple={true}
						onFilter={(value, record) => {
							if(value == "other" && record.State != "created" && record.State != "running" && record.State != "exited" && record.State != "restarting" && record.State != "deleting" && record.State != "paused" && record.State != "dead"){
								return true
							}

							return value == record.State
						}}
						render={(text)=>{
							return(
								<span style={{backgroundColor:state_color[text], padding: 2, borderRadius: 3, fontWeight:'bold', color:"#FFF"}}>{text}</span>
							)
						}}
					/>
					<Column
						title="操作"
						key="action"
						render={(text, record) => (
							<Dropdown overlay={menu} trigger={['click']}>
								<a className="ant-dropdown-link" onClick={()=>{
									this.selection = record
								}}>
								  <Icon type="windows" />
								</a>
							</Dropdown>
						)}
					/>
				</Table>
			</div>
		)
	}
}

module.exports = Container;

const dashboard = {
	marginBottom: 10,
}

const state_color = {
	running: "#33CC66",
	created:"#0033CC",
	exited:"#FF0000",
	restarting: "#CC6600",
	paused:"#33CCFF",
	deleting:"#606060",
	dead:"#606060",
	other:"#CC0099"
}