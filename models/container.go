package models

import (
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/logs"
)

var (
	creatorMap map[string]string
)
func init()  {
	orm.RegisterModel(new(Container))
	creatorMap = make(map[string]string)
}

type Container struct {
	Id      string   `orm:"pk"`
	Names []string `orm:"-"`
	Image string `orm:"-"`
	ImageId string `orm:"-"`
	Created string `orm:"-"`
	Creator string
	State string `orm:"-"`
}

func GetContainerCreator(id string) string {
	return creatorMap[id]
}

func LoadCreaterMap()  {
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