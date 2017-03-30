package models

import (
	"github.com/astaxie/beego/orm"
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