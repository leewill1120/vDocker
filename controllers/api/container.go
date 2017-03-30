package api

import (
	"github.com/astaxie/beego"
	"github.com/docker/docker/api/types"
	"golang.org/x/net/context"
	"encoding/json"
	"github.com/astaxie/beego/logs"
	"github.com/leewill1120/vDocker/models"
	"time"
)

type ContainerController struct {
	beego.Controller
}

func (c *ContainerController) List()  {
	resp := make(map[string]interface{})
	defer func() {
		b, _ := json.Marshal(resp)
		c.Ctx.Output.Body(b)
	}()

	var (
		user string
		mycontainers []*models.Container
		isAdmin bool
		err error
	)

	if nil == c.GetSession("user"){
		resp["ErrorInfo"] = "Unauthorized"
		return
	}
	user = c.GetSession("user").(string)
	isAdmin, err = models.IsAdmin(user)
	if nil != err{
		resp["ErrorInfo"] = err.Error()
		return
	}

	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{All: true,})
	if err != nil {
		logs.Error(err)
		resp["ErrorInfo"] = err.Error()
		return
	}

	for _, c := range containers{
		if isAdmin || models.GetContainerCreator(c.ID) == user {
			mycontainers = append(mycontainers, &models.Container{
				Id: c.ID,
				Names: c.Names,
				Image: c.Image,
				ImageId: c.ImageID,
				State: c.State,
				Created: time.Unix(c.Created, 0).String(),
				Creator: models.GetContainerCreator(c.ID),
			})
		}
	}

	resp["containers"] = mycontainers
	return
}

func (c *ContainerController) Start()  {
	resp := make(map[string]interface{})
	defer func() {
		b, _ := json.Marshal(resp)
		c.Ctx.Output.Body(b)
	}()

	var (
		err error
		container models.Container
	)

	err = json.Unmarshal(c.Ctx.Input.RequestBody, &container)
	if nil != err{
		resp["ErrorInfo"] = err.Error()
		return
	}
	resp["container"] = container

	err = cli.ContainerStart(context.Background(), container.Id, types.ContainerStartOptions{})
	if nil != err{
		resp["ErrorInfo"] = err.Error()
		return
	}
}

func (c *ContainerController) Stop()  {
	resp := make(map[string]interface{})
	defer func() {
		b, _ := json.Marshal(resp)
		c.Ctx.Output.Body(b)
	}()

	var (
		err error
		container models.Container
	)

	err = json.Unmarshal(c.Ctx.Input.RequestBody, &container)
	if nil != err{
		resp["ErrorInfo"] = err.Error()
		return
	}
	resp["container"] = container

	err = cli.ContainerStop(context.Background(), container.Id, nil)
	if nil != err{
		resp["ErrorInfo"] = err.Error()
		return
	}
}
