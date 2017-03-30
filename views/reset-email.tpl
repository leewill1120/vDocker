<head>
	<meta charset="UTF-8">
	<style type="text/css">
		.foot{
			color: #A0A0A0;
			font-style: italic;
			font-size: 14px;
			margin-top: 50px;
		}
	</style>
</head>
<body>
	<a href="{{.ResetLink}}">{{.ResetLink}}<a/>
	<div>注意：该链接将在{{.TimeOut}}分钟后失效，请及时操作。</div>
	<div class="foot">
		*** 这是{{.AppName}}系统邮件，请勿直接回复。有问题请联系{{.Maintainer}} ***
	</div>
</body>
</html>