# windows wsl + ubuntu + vscode配置linux开发环境

- 必须具备的前提条件：win10或者以上，开启了cpu虚拟化

    这里就不展开怎么开启cpu虚拟化了，需要找自己电脑和cpu对应的方法才行

## step1 启用wsl和虚拟机平台

这里可能需要重启电脑

## step2 安装wsl

直接在命令行安装就行了
```cmd
wsl --install
```
安装好之后应该会提示选Ubuntu版本安装
这个时候先不急着安装Ubuntu，我们先更新一下wsl
```cmd
wsl --upadate
```

## step3 安装Ubuntu系统，这里不能够从官网下载iso光盘映射文件，必须下载能给wsl用的，一样可以直接在命令行终端完成

```cmd
wsl --install -d Ubuntu
```
一般来说我们直接选择第一个版本就行了

## step4 下载完成就会进入系统了，这个时候需要按照提示设置好账号密码

注意这里尽量不要忘记自己的账号名和密码，不然很难办，linux你懂的。还有就是输入密码的时候是不会显示输入的情况的属于正常现象。

--------

到这里为止wsl和ubuntu的安装配置就已经完成了，我们可以先试试

```cmd
wsl --version
```
来检查wsl安装情况

### 如何登录和退出（不是关机），关机

通过`wsl`来开机，输入密码即可登入系统
在系统内可以通过linux的关机指令关机
```bash
sudo apt shutdown now
```
也可以`exit`来退出（**不是关机**）来退出wsl回到windows命令行
在cmd或者powershell中通过
```cmd
wsl --shutdown
```
来关机

并且通过
```cmd
wsl -l -v
```
来查看wsl和系统的运行情况

## step5 最后我们再上vscode
- 安装wsl插件
- `code .`启动！（或者再vscode中开启连接）
- 最后通过wsl开出来的vscode是需要重新在wsl上安装插件的（本地的不能直接用）