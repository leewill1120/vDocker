<!DOCTYPE html>
<head>
	<title>Forgot Password</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link href="/static/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
	<link href="/static/css/templatemo_style.css" rel="stylesheet" type="text/css">	
	<link href="/static/css/toastr.min.css" rel="stylesheet" type="text/css">
	
	<script type="text/javascript" src="/static/js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="/static/js/toastr.min.js"></script>
	<script type="text/javascript" src="/static/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/static/js/forgotpassword.js"></script>
</head>
<body class="templatemo-bg-gray">
	<div class="container">
		<div class="col-md-12">
			<h1 class="margin-bottom-15">密码重置</h1>
			<form class="form-horizontal templatemo-forgot-password-form templatemo-container" role="form" action="#" method="post">	
				<div class="form-group">
		          <div class="col-md-12">
		          	请输入注册邮箱
		          </div>
		        </div>		
		        <div class="form-group">
		          <div class="col-md-12">
		            <input type="text" class="form-control" id="email" placeholder="注册邮箱">	            
		          </div>              
		        </div>
		        <div class="form-group">
		          <div class="col-md-12">
		            <input type="submit" value="提交" class="btn btn-danger">
                    <a href="/login/in" class="pull-right">登录</a>
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
	      	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	      	邮件发送成功，请查收。<a href="/login/in">登录页面</a>
	      </div>
	    </div>
	  </div>
	</div>
</body>
</html>