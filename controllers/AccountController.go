package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/leewill1120/vDocker/models"
	"encoding/json"
	"strconv"
	"github.com/golibs/uuid"
	"encoding/base64"
	"github.com/astaxie/beego/cache"
	"time"
	"errors"
	"fmt"
)

var (
	//注册验证码，密码重置token超时时间(秒)
	timeout int = 600

	//密码重置token缓存
	bm cache.Cache

	//注册验证码缓存
	rm cache.Cache
)

func init()  {
	var err error
	bm, err = cache.NewCache("memory", "")
	if nil != err{
		logs.Error("[NewCache]", err)
	}

	rm, err = cache.NewCache("memory", "")
	if nil != err{
		logs.Error("[NewCache]", err)
	}

	timeout, err  = beego.AppConfig.Int("user::accountcachetime")
	if nil != err{
		logs.Error("user::accountcachetime", err)
	}
}

type AccountController struct {
	beego.Controller
}

func (c *AccountController) Get() {
	action := c.GetString(":action")
	c.Data["AppName"] = beego.AppConfig.String("appname")

	if "register" == action{
		c.TplName = "register.tpl"
	}else if "forgotpassword" == action{
		c.TplName = "forgot-password.tpl"
	}else if "resetpassword" == action{
		user := c.GetString("user")
		if err := c.resetPasswordCheck(); nil != err{
			logs.Error(err)
			c.TplName = "reset-password-invalid.tpl"
		}else{
			c.TplName = "reset-password.tpl"
		}
		c.Data["UserName"] = user
	}

	c.Render()
}

func (c *AccountController) Post(){
	resp := make(map[string]interface{})
	action := c.GetString(":action")
	var err error

	if "register" == action{
		err = c.register()
	}else if "forgotpassword" == action{
		err = c.forgotpassword()
	}else if "resetpassword" == action{
		err = c.resetpassword()
	}else if "getregisterauthcode" == action{
		err = c.getregisterauthcode()
	}else if "modifypassword" == action{
		err = c.modifypassword()
	}else{
		err = errors.New(action + " not support")
	}

	if nil != err{
		resp["ErrorInfo"] = err.Error()
	}

	b, _ := json.Marshal(resp)
	c.Ctx.Output.Body(b)
}

func (c *AccountController) register() error {
	if err := c.registerAuthCodeCheck(); nil != err{
		return err
	}else{
		username := c.GetString("username")
		password := c.GetString("password")
		email := c.GetString("email")

		err := models.AddAccount(username, password, email)
		if nil != err{
			logs.Error(err)
			return err
		}else{
			rm.Delete(email)
			return nil
		}
	}
}

func (c *AccountController) forgotpassword() error {
	email := c.GetString("email")
	user, err := models.QueryUserByEmail(email)
	if nil != err {
		return err
	}else{
		token := base64.StdEncoding.EncodeToString([]byte(uuid.Rand().Hex()))
		bm.Put(user, token, time.Duration(timeout) * time.Second)
		resetlink := c.Ctx.Input.Scheme() + "://" + c.Ctx.Input.Host() + ":" + strconv.Itoa(c.Ctx.Input.Port()) + "/account/resetpassword/?token=" + token + "&user=" + user
		if err := models.SendResetMail(email, resetlink, timeout); nil != err{
			logs.Error(err)
			return errors.New("邮件发送失败")
		}else{
			return nil
		}
	}
}

func (c *AccountController) resetpassword() error {
	username := c.GetString("username")
	password := c.GetString("password")
	if err := models.UpdateUserPassword(username, password); nil != err{
		logs.Error(err)
		return errors.New("密码重置失败")
	}else{
		bm.Delete(username)
		return nil
	}
}

func (c *AccountController) getregisterauthcode() error {
	email := c.GetString("email")
	if models.CheckEmailExist(email){
		return errors.New("该邮箱已被注册")
	}else{
		AuthCode := uuid.Rand().Hex()[0:6]
		rm.Put(email, AuthCode, time.Duration(timeout) * time.Second)
		if err := models.SendRegAuthCodeMail(email, AuthCode, timeout); nil != err{
			logs.Error(err)
			return errors.New("邮件发送失败")
		}else{
			return nil
		}
	}
}

func (c *AccountController) modifypassword() error {
	username := c.GetString("username")
	password := c.GetString("password")
	if err := models.UpdateUserPassword(username, password); nil != err{
		logs.Error(err)
		return errors.New("密码修改失败")
	}else{
		return nil
	}
}

func (c *AccountController) resetPasswordCheck() error {
	user := c.GetString("user")
	token := c.GetString("token")

	token1 := bm.Get(user)
	if nil == token1{
		return errors.New("token not exist")
	}

	if token != token1.(string){
		return errors.New(fmt.Sprintf("token doesn't match, t1:%s, t2:%s", token1.(string), token))
	}

	return nil
}

func (c *AccountController) registerAuthCodeCheck() error {
	authcode := c.GetString("authcode")
	email := c.GetString("email")

	if !rm.IsExist(email) || nil == rm.Get(email) || rm.Get(email).(string) != authcode{
		return errors.New("验证码无效")
	}else{
		return nil
	}
}
