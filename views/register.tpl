<!DOCTYPE html>
<head>
	<title>注册账号</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link href="/static/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/templatemo_style.css" rel="stylesheet" type="text/css">
	<link href="/static/css/toastr.min.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="/static/js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="/static/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/static/js/toastr.min.js"></script>
	<script type="text/javascript" src="/static/js/sha256.js"></script>
	<script type="text/javascript" src="/static/js/register.js"></script>
</head>
<body class="templatemo-bg-gray">
	<h1 class="margin-bottom-15">注册账号</h1>
	<div class="container">
		<div class="col-md-12">			
			<form class="form-horizontal templatemo-create-account templatemo-container" role="form" action="#" method="post">
				<div class="form-inner">
			        <div class="form-group">
			          <div class="col-md-6">		          	
			            <label for="username" class="control-label">用户名</label>
			            <input type="text" class="form-control" id="username" placeholder="">
			          </div>
			        </div>
			        <div class="form-group">
			          <div class="col-md-6">
			            <label for="password" class="control-label">密码</label>
			            <input type="password" class="form-control" id="password" placeholder="">
			          </div>
			          <div class="col-md-6">
			            <label for="password" class="control-label">确认密码</label>
			            <input type="password" class="form-control" id="password_confirm" placeholder="">
			          </div>
			        </div>
			        <div class="form-group">
			        	<div class="col-md-12">
			        		<label for="" class="control-label">邮箱</label>
					        <div class="form-group">
					          <div class="col-md-8">
					            <input type="email" class="form-control" id="email" placeholder="">
					          </div>
					          <div class="col-md-4">
					            <button type="button" class="btn btn-default form-control" id="btn_auth_code">获取验证码</button>
					          </div>
					        </div>
			        	</div>
			        </div>
			        <div class="form-group">
			          <div class="col-md-6">		          	
			            <label for="username" class="control-label">验证码</label>
			            <input type="text" class="form-control" id="auth_code" placeholder="">
			          </div>
			        </div>
			        <div class="form-group">
			          <div class="col-md-12">
			            <input type="submit" value="注册" class="btn btn-info">
			            <a href="/login/in" class="pull-right">登录</a>
			          </div>
			        </div>
				</div>				    	
		      </form>		      
		</div>
	</div>
	<!-- Modal -->
	<div class="modal fade" id="templatemo_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-body">
	      	注册成功，稍后将自动跳转到<a href="/login/in">登录页面</a>。
	      </div>
	    </div>
	  </div>
	</div>
</body>
</html>