$(document).ready(function () {
	toastr.options = {
		"positionClass": "toast-top-center"
	}

	$("#username").val(localStorage.username ? localStorage.username : "")
	if(localStorage.username && localStorage.password){
		$("#remember").prop("checked", true)
		$("#password").val($.base64.decode(localStorage.password))
	}


	//Login
	$("form").submit(function(event){
		event.preventDefault()

		var username = $("#username").val()
		var password = $("#password").val()
		if(!username || !password){
			toastr.error("登录信息不完整")
			return
		}
		
		localStorage.username = username
		if($("#remember").prop("checked")){
			localStorage.password = $.base64.encode(password)
		}else{
			delete localStorage.password
		}

		$.ajax({
			url:"/login/in",
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
						sessionStorage.username = username
						sessionStorage.isAdmin = data["isAdmin"]
						window.location.href = "/"
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
	});
})