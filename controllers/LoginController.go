package controllers


import (
	"github.com/astaxie/beego"
	"strings"
	"github.com/leewill1120/vDocker/models"
	"encoding/json"
)

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Get() {
	action := c.GetString(":action")

	if "out" == action{
		c.Logout()
		c.Redirect("/login/in", 302)
		return
	}else if "in" == action{
		user := c.GetSession("user")
		if nil != user{
			c.Redirect("/", 302)
			return
		}

		c.Data["AppName"] = beego.AppConfig.String("appname")
		c.TplName = "login.tpl"
		c.Render()
	}
}

func (c *LoginController) Post(){
	resp := make(map[string]interface{})
	action := c.GetString(":action")

	if "in" == action{
		username := strings.TrimSpace(c.GetString("username"))
		password := strings.TrimSpace(c.GetString("password"))
		if "" == username || "" == password{
			resp["ErrorInfo"] = "用户名或密码不能为空"
		}else{
			//校验用户名和密码
			if account, err := models.CheckUserPassword(username, password); nil != err{
				resp["ErrorInfo"] = err.Error()
			}else{
				c.SetSession("user", username)
				resp["isAdmin"] = account.IsAdmin
			}
		}
	}else{
		resp["ErrorInfo"] = "action not support"
	}

	b, _ := json.Marshal(resp)
	c.Ctx.Output.Body(b)
}

func (c *LoginController) Logout() {
	c.DelSession("user")
}
