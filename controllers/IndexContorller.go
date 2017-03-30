package controllers

import (
	"github.com/astaxie/beego"
)

type IndexContorller struct {
	beego.Controller
}

func (c *IndexContorller) Get() {
	user := c.GetSession("user")
	if nil == user{
		c.Redirect("/login/in", 302)
		return
	}

	c.Data["AppName"] = beego.AppConfig.String("appname")
	c.TplName = "index.tpl"
	c.Render()
}
