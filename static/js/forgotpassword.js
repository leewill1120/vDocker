$(document).ready(function(){
	$("form").submit(function(event){
		event.preventDefault()

		var email = $("#email").val()

		if(!email){
			toastr.error("请填写注册邮箱")
			return
		}

		$.ajax({
			url:"/account/forgotpassword",
			type: "post",
			dataType: "json",
			data:{
				email: email
			},
			success: function(data, status, res){
				if(200 == res.status){
					if(data["ErrorInfo"]){
						toastr.error(data["ErrorInfo"])
					}else{
						$("#templatemo_modal").modal('show')
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