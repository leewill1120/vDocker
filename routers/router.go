package routers

import (
	"github.com/leewill1120/vDocker/controllers"
	"github.com/astaxie/beego"
	"github.com/leewill1120/vDocker/controllers/api"
	"github.com/astaxie/beego/context"
)

func init() {
	beego.Router("/", &controllers.IndexContorller{}, "*:Get")

	beego.Router("/login/:action([A-Za-z]+)/", &controllers.LoginController{})

	beego.Router("/account/:action([A-Za-z]+)/", &controllers.AccountController{})
	beego.InsertFilter("/account/modifypassword/", beego.BeforeExec, auth)

	beego.AutoRouter(&api.ContainerController{})
	beego.InsertFilter("/container/*.*/", beego.BeforeExec, auth)
}


func auth(c *context.Context)  {
	_, ok := c.Input.Session("user").(string)
	if !ok{
		c.Output.SetStatus(401)
		c.Output.Body([]byte("{\"ErrorInfo\":\"Unauthorized\"}"))
	}
}
