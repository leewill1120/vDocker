package models

import (
	"github.com/astaxie/beego"
	"bytes"
	"strings"
	"net/smtp"
	"fmt"
	"encoding/base64"
	"math"
)

//timeout 失效时间，秒
func SendResetMail(to string, resetlink string, timeout int) error {
	data := make(map[string]interface{})
	data["AppName"] = beego.AppConfig.String("appname")
	data["Maintainer"] = beego.AppConfig.String("user::maintainer")
	data["ResetLink"] = resetlink
	data["TimeOut"] = math.Floor(float64(timeout / 60))
	subject := beego.AppConfig.String("appname") + "账号密码重置"
	body := new(bytes.Buffer)
	if err:= beego.ExecuteTemplate(body, "reset-email.tpl", data); nil != err{
		return err
	}
	return sendToMail(beego.AppConfig.String("sysemail::email"), beego.AppConfig.String("sysemail::password"),beego.AppConfig.String("sysemail::server"), to, subject, body.String())
}

//发送注册验证码邮件
//timeout 失效时间，秒
func SendRegAuthCodeMail(to string, AuthCode string, timeout int) error {
	data := make(map[string]interface{})
	data["AppName"] = beego.AppConfig.String("appname")
	data["Maintainer"] = beego.AppConfig.String("maintainer")
	data["AuthCode"] = AuthCode
	data["TimeOut"] = math.Floor(float64(timeout / 60))
	subject := beego.AppConfig.String("appname") + "注册验证码"
	body := new(bytes.Buffer)
	if err:= beego.ExecuteTemplate(body, "register-auth-code-email.tpl", data); nil != err{
		return err
	}
	return sendToMail(beego.AppConfig.String("sysemail::email"), beego.AppConfig.String("sysemail::password"),beego.AppConfig.String("sysemail::server"), to, subject, body.String())
}

func sendToMail(user, password, host, to, subject, body string) error {
	hp := strings.Split(host, ":")
	auth := smtp.PlainAuth("", user, password, hp[0])
	var content_type string
	content_type = "Content-Type: text/html;charset=UTF-8"

	msg := []byte("To: " + to + "\r\nFrom: " + user + "\r\nSubject: " + fmt.Sprintf("=?UTF-8?B?%s?=", base64.StdEncoding.EncodeToString([]byte(subject))) + "\r\n" + content_type + "\r\n\r\n" + body)
	send_to := strings.Split(to, ";")
	err := smtp.SendMail(host, auth, user, send_to, msg)
	return err
}
