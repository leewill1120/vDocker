<!DOCTYPE html>
<head>
	<title>登录{{.AppName}}</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link href="/static/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/bootstrap-social.css" rel="stylesheet" type="text/css">	
	<link href="/static/css/templatemo_style.css" rel="stylesheet" type="text/css">
	<link href="/static/css/toastr.min.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="/static/js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="/static/js/jquery.base64.js"></script>
	<script type="text/javascript" src="/static/js/toastr.min.js"></script>
	<script type="text/javascript" src="/static/js/sha256.js"></script>
	<script type="text/javascript" src="/static/js/login.js"></script>
</head>
<body class="templatemo-bg-image-1">
	<div class="container">
		<div class="col-md-12">			
			<form class="form-horizontal templatemo-login-form-2" role="form">
				<div class="row">
					<div class="col-md-12">
						<h1>登录{{.AppName}}</h1>
					</div>
				</div>
				<div class="row">
					<div class="templatemo-one-signin col-md-6">
				        <div class="form-group">
				          <div class="col-md-12">		          	
				            <label for="username" class="control-label">用户名</label>
				            <div class="templatemo-input-icon-container">
				            	<i class="fa fa-user"></i>
				            	<input type="text" class="form-control" id="username" placeholder="">
				            </div>		            		            		            
				          </div>              
				        </div>
				        <div class="form-group">
				          <div class="col-md-12">
				            <label for="password" class="control-label">密码</label>
				            <div class="templatemo-input-icon-container">
				            	<i class="fa fa-lock"></i>
				            	<input type="password" class="form-control" id="password" placeholder="">
				            </div>
				          </div>
				        </div>
				        <div class="form-group">
				          <div class="col-md-12">
				            <div class="checkbox">
				                <label>
				                  <input type="checkbox" id="remember"> 记住密码
				                </label>
				            </div>
				          </div>
				        </div>
				        <div class="form-group">
				          <div class="col-md-12">
				            <input type="submit" value="登录" class="btn btn-warning">
				          </div>
				        </div>
				        <div class="form-group">
				          	<div class="col-md-12">
				          	    <a href="/account/register">注册账号</a>
				        		<a href="/account/forgotpassword" class="pull-right">无法登录</a>
				       	 	</div>
				    	</div>
					</div>
					<div class="templatemo-other-signin col-md-6">
						<label class="margin-bottom-15">
							{{.AppName}}是一个docker容器管理系统，你可以通过{{.AppName}}轻松地管理你的docker容器集群，{{.AppName}}为你提供了丰富的docker容器管理功能。
						</label>
						<a class="btn btn-block btn-social btn-facebook margin-bottom-15">
						    <i class="fa fa-facebook"></i> 使用Facebook账号登录
						</a>
						<a class="btn btn-block btn-social btn-twitter margin-bottom-15">
						    <i class="fa fa-twitter"></i> 使用Twitter账号登录
						</a>
						<a class="btn btn-block btn-social btn-google-plus">
						    <i class="fa fa-google-plus"></i> 使用Google账号登录
						</a>
					</div>   
				</div>				 	
		      </form>
		</div>
	</div>
</body>
</html>