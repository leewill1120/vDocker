package models

import (
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/logs"
	"errors"
)

type Account struct {
	UserName string `orm:"pk" json:"UserName"`
	Password string `json:"-"`
	Email    string `orm:"unique" json:"Email"`
	IsAdmin bool `orm:"default(false)"`
}

func init()  {
	orm.RegisterModel(new(Account))
}

func IsAdmin(username string) (bool, error) {
	o := orm.NewOrm()
	account := &Account{
		UserName: username,
	}

	err := o.Read(account)
	if orm.ErrNoRows == err{
		return false, errors.New("用户不存在")
	}else if nil == err{
		return account.IsAdmin, nil
	}else{
		logs.Error(err)
		return false, errors.New("数据库操作异常")
	}
}

func AddAccount(username, password, email string) error {
	o := orm.NewOrm()
	if o.QueryTable("account").Filter("user_name", username).Exist(){
		return errors.New("用户名已存在")
	}

	a := &Account{
		UserName:username,
		Password:password,
		Email:email,
	}
	_, err := o.Insert(a)
	if nil != err{
		logs.Error(err)
		return errors.New("数据库操作异常")
	}

	return nil
}

func CheckUserPassword(username, password string) (*Account, error) {
	o := orm.NewOrm()
	account := &Account{
		UserName: username,
	}

	err := o.Read(account)
	if orm.ErrNoRows == err{
		return nil, errors.New("用户不存在")
	}else if nil == err{
		if password == account.Password{
			return account, nil
		}else{
			return nil, errors.New("密码错误")
		}
	}else{
		logs.Error(err)
		return nil, errors.New("数据库操作异常")
	}
}

func CheckUserExist(username string) bool {
	o := orm.NewOrm()
	return o.QueryTable("account").Filter("user_name", username).Exist()
}

func CheckEmailExist(email string) bool {
	o := orm.NewOrm()
	return o.QueryTable("account").Filter("email", email).Exist()
}

func UpdateUserPassword(username, password string)  error {
	o := orm.NewOrm()
	account := &Account{
		UserName: username,
		Password: password,
	}
	_, err := o.Update(account, "password")
	return err
}

func QueryUserByEmail(email string) (string, error)  {
	o := orm.NewOrm()
	var account Account
	err := o.QueryTable("account").Filter("email", email).One(&account)
	if orm.ErrMultiRows == err{
		logs.Error(err)
		return "", errors.New("数据库数据异常")
	}else if orm.ErrNoRows == err{
		return "", errors.New("该邮箱未注册")
	}else if nil == err{
		return account.UserName, nil
	}else{
		logs.Error(err)
		return "", errors.New("数据库操作异常")
	}
}