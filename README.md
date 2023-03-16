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
    'proxy': 'you proxy or None',
    'ip': '127.0.0.1',              # "127.0.0.1" or your server's internal network ip or your server's public ip
    'port': 5000,
}
```
### 运行项目, 注意，命令端要在项目的根目录下
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