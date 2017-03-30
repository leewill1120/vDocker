$(document).ready(function(){
	$("#btn_auth_code").click(function(){
		var email = $("#email").val()
		if(!email){
			toastr.error("请输入邮箱地址")
			return
		}

		function SendMailBtnReset(){
			$("#btn_auth_code").attr("disabled", false)
			$("#btn_auth_code").text("获取验证码")
		}

		$("#btn_auth_code").text("正在发送...")
		//发送验证码请求
		$.ajax({
			url:"/account/getregisterauthcode",
			type: "post",
			dataType: "json",
			data:{
				email: email
			},
			success: function(data, status, res){
				if(200 == res.status){
					if(data["ErrorInfo"]){
						toastr.error(data["ErrorInfo"])
						SendMailBtnReset()
					}else{
						toastr.success("邮件已发送")

						var timeout = 30
						$("#btn_auth_code").attr("disabled", true)
						var timer = setInterval(function(){
							timeout--
							if(timeout <= 0){
								clearInterval(timer)
								SendMailBtnReset()
							}else{
								$("#btn_auth_code").text("重新发送(" + timeout + "s)")
							}
						}, 1000)
					}

				}else{
					toastr.error("unreached")
					SendMailBtnReset()
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(XMLHttpRequest, textStatus, errorThrown)
				toastr.error("未知错误")
				SendMailBtnReset()
			}
		})
	})

	$("form").submit(function(event){
		event.preventDefault()

		var username = $("#username").val()
		var password = $("#password").val()
		var password_confirm = $("#password_confirm").val()
		var email = $("#email").val()
		var auth_code = $("#auth_code").val()

		if(!username || !password || !password_confirm || !email || !auth_code){
			toastr.error("注册信息不完整")
			return
		}

		if(password_confirm != password){
			toastr.warning("两次输入的密码不一致")
			return
		}

		$.ajax({
			url:"/account/register",
			type: "post",
			dataType: "json",
			data:{
				username: username,
				password: sha256_digest(password),
				email: email,
				authcode: auth_code
			},
			success: function(data, status, res){
				if(200 == res.status){
					if(data["ErrorInfo"]){
						toastr.error(data["ErrorInfo"])
					}else{
						$("#templatemo_modal").modal('show')
						setTimeout(function(){
							window.location.href = "/login/in"
						}, 3000)
					}

				}else{
					toastr.error("unreached")
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(XMLHttpRequest, textStatus, errorThrown)
				toastr.error("未知错误")
			}
		})
	})
})