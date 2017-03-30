<!DOCTYPE html>
<head>
	<title>{{.AppName}}密码重置</title>
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
	<script type="text/javascript" src="/static/js/reset-password.js"></script>
</head>
<body class="templatemo-bg-gray">
	<h1 class="margin-bottom-15">{{.AppName}}密码重置</h1>
	<div class="container">
		<div class="col-md-12">			
			<form class="form-horizontal templatemo-create-account templatemo-container" role="form" action="#" method="post">
				<div class="form-inner">
			        <div class="form-group">
			          <div class="col-md-6">		          	
			            <label for="username" class="control-label">用户名</label>
			            <input type="text" class="form-control" id="username" placeholder="" readonly="readonly" value="{{.UserName}}">
			          </div>
			        </div>
			        <div class="form-group">
			          <div class="col-md-6">
			            <label for="password" class="control-label">新密码</label>
			            <input type="password" class="form-control" id="password" placeholder="">
			          </div>
			          <div class="col-md-6">
			            <label for="password" class="control-label">确认密码</label>
			            <input type="password" class="form-control" id="password_confirm" placeholder="">
			          </div>
			        </div>
			        <div class="form-group">
			          <div class="col-md-12">
			          	<input type="submit" value="提交" class="btn btn-info">
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
	      	密码已重置，稍后将自动跳转到<a href="/login/in">登录页面</a>。
	      </div>
	    </div>
	  </div>
	</div>
</body>
</html>