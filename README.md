# vDocker
A docker web console.

### Required
  * golang
  * beego tool [Reference: https://beego.me/docs/install/bee.md]
  * nodejs npm

### Quick start
First, create a mysql db instance called "vDocker" </br>

[root@10-254-0-111 ~]# git clone https://github.com/leewill1120/vDocker.git </br>
[root@10-254-0-111 ~]# cd vDocker </br>
[root@10-254-0-111 vDocker]# vi conf/app.conf \#write your mysql address into it </br>
[root@10-254-0-111 vDocker]# bee run </br>
visit to http://your-host:8080/ </br>

### Build UI
[root@10-254-0-111 ~]# cd vDocker/ui </br>
[root@10-254-0-111 ui]# npm install </br>
[root@10-254-0-111 ui]# npm run build </br>

### Packet
[root@10-254-0-111 vDocker]# bee pack
