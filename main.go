package main

import (
	_ "github.com/leewill1120/vDocker/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"github.com/leewill1120/vDocker/models"
)

func init()  {
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.RegisterDataBase("default", "mysql", beego.AppConfig.String("user::datasource"))
	if err := orm.RunSyncdb("default", false, true); nil != err{
		panic(err)
	}

	models.LoadCreaterMap()
}

func main() {
	beego.Run()
}

