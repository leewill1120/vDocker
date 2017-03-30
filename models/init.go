package models

import (
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/logs"
)

func Init(){
	loadCreatorMap()

	insertDefaultData()
}

func loadCreatorMap()  {
	o := orm.NewOrm()
	var containers []*Container
	_, err := o.QueryTable("container").All(&containers)
	if nil != err{
		logs.Error(err)
	}else{
		for _, c := range containers{
			creatorMap[c.Id] = c.Creator
		}
	}
}

func insertDefaultData()  {
	o := orm.NewOrm()
	if !o.QueryTable("account").Filter("user_name", "admin").Exist(){
		o.Insert(&Account{
			UserName: "admin",
			Password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", //123456
			IsAdmin: true,
		})
	}
}