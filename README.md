# vDocker
A docker web console.

### Required
  * golang
  * beego tool [Reference: https://beego.me/docs/install/bee.md]
  * nodejs npm
  * Email server (for new user register or reset your password)

### Quick start
First, create a mysql db instance called "vDocker"
```
[root@10-254-0-111 ~]# git clone https://github.com/leewill1120/vDocker.git

#write your mysql address into it
[root@10-254-0-111 vDocker]# vi conf/app.conf

#run
[root@10-254-0-111 vDocker]# bee run
#visit to http://your-host:8080/, default user: admin, password: 123456

#Build UI
[root@10-254-0-111 ~]# cd vDocker/ui
[root@10-254-0-111 ui]# npm install
[root@10-254-0-111 ui]# npm run build

#Packet
[root@10-254-0-111 vDocker]# bee pack -exp=.:ui
```
