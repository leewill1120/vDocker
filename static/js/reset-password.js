$(document).ready(function(){
	$("form").submit(function(event){
		event.preventDefault()

		var username = $("#username").val()
		var password = $("#password").val()
		var password_confirm = $("#password_confirm").val()

		if(!username || !password || !password_confirm){
			toastr.error("注册信息不完整")
			return
		}

		if(password_confirm != password){
			toastr.warning("两次输入的密码不一致")
			return
		}

		$.ajax({
			url:"/account/resetpassword",
			type: "post",
			dataType: "json",
			data:{
				username: username,
				password: sha256_digest(password)
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