# chatGPT_Web Private Deployment
### Using the api of gpt-3.5-turbo model, supporting markdown and continuous conversation, using flask to implement SSE service to push streaming text, and achieve similar conversation effect as the official website.
> The project is based on the implementation of two other open source projects, and I would like to thank the authors of these two projects.    

> Modified the interface of V3.py of [acheong08](https://github.com/acheong08/ChatGPT) to connect to the official api.  
> Refer to the web code of [slippersheepig](https://github.com/slippersheepig/chatgpt-web).  
# Deployment Method
## Install Dependencies
### Download this project by git
```shell
git clone "https://github.com/promisevergo/chatGPT_Web.git"
cd chatGPT_Web
```
### Use pip to read requirement.txt, it is recommended to use python 3.10 or higher.
```shell
pip install -r requirements.txt
```
### Configure the required parameters. If it is deployed locally, the default IP can be used. If it is deployed on a server, the internal network IP of the service needs to be filled in. If there is no internal network IP, fill in the public IP.
```python
config = {
    "key": "your openai key",
    'proxy': 'you proxy or None',   #like "http:127.0.0.1:7890"
    'ip': '127.0.0.1',              # "127.0.0.1" or your server's internal network ip or your server's public ip
    'port': 5000,
}
```
### Run the project. Note that the command line needs to run under the root directory of the project.
```shell
python chatGPT_Web.py
```
### Deploy using gunicorn. Note: gunicorn is not included in requirements.txt and you need to install the corresponding dependencies yourself.
```shell
gunicorn chatGPT_Web:app -c gunicorn_config.py
```
#### Open the browser and enter the displayed IP and port, such as: "127.0.0.1:5000", and you can see the conversation webpage.
![chat](https://github.com/promisevergo/chatGPT_Web/blob/main/chat.gif)  

---
<br>
<br>
<br>

# chatGPT_Web 私有化部署
### 使用gpt-3.5-turbo 模型的api，支持markdown和连续对话，使用flask实现SSE服务推送流式文本，实现与官网类似的对话效果。
> 项目基于其他两个项目开源项目的实现，在此感谢两个项目的作者  
> 修改[acheong08](https://github.com/acheong08/ChatGPT)的V3.py对接官方api的接口  
> 参考[slippersheepig](https://github.com/slippersheepig/chatgpt-web)的网页端代码

# 部署方法
## 安装依赖
### 下载本项目
```shell
git clone "https://github.com/promisevergo/chatGPT_Web.git"
cd chatGPT_Web
```

### 使用pip 读取requirement.txt, 建议python3.10及以上的版本
```shell
pip install -r requirements.txt
```

### 配置需要的参数,如果是本地部署,则使用默认的ip即可，如果部署在服务器上时，需要填入服务内网ip，如果没有，则填公网ip看看
```python
config = {
    "key": "your openai key",
    'proxy': 'you proxy or None',   #like "http:127.0.0.1:7890"
    'ip': '127.0.0.1',              # "127.0.0.1" or your server's internal network ip or your server's public ip
    'port': 5000,
}
```
### 运行项目, 注意，命令端要运行在项目的根目录下
#### 直接python部署
```shell
python chatGPT_Web.py
```
#### 使用gunicorn部署，注意：gunicorn不在requirements.txt中，需要自行安装对应的依赖
```shell
gunicorn chatGPT_Web:app -c gunicorn_config.py
```
#### 打开浏览器，输入显示的ip及端口，比如：“127.0.0.1:5000"，就可以看到对话的网页
![chat](https://github.com/promisevergo/chatGPT_Web/blob/main/chat.gif)