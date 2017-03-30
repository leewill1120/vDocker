package api

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/client"
)

var (
	swarmAddr string
	cli *client.Client
)


func init()  {
	var err error
	swarmAddr = beego.AppConfig.String("docker::swarmaddr")
	logs.Info("swarm host:%s", swarmAddr)

	cli, err = client.NewClient(swarmAddr, "1.22", nil, nil)
	if err != nil {
		panic(err)
	}
}