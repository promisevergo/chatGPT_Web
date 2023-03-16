import os
import platform
import json
from recvChatGPT_V3 import Chatbot_V3
from flask import Flask, request, render_template, Response

app = Flask(__name__)


#config set
config = {
    "key": "your openai key",
    'proxy': 'you proxy or None',
    'ip': '127.0.0.1',              # "127.0.0.1" or your server's internal network ip or your server's public ip
    'port': 5000,
}

URL_API = "https://api.openai.com/v1/chat/completions"

headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {config['key']}"
    }

#init chat bot
chatbot = Chatbot_V3(config['key'], "gpt-3.5-turbo", proxy=config['proxy'])

#Routing, rendering chat interface
@app.route('/')
def index():
    chatbot.reset()
    return render_template('chat.html')

#Routing, normal chat，not SSE
@app.route('/chat', methods=['POST'])
def chat():
    postData = request.get_json()           #Get data from POST request
    print(postData)
    query = postData.get('query', 'Hello')
    max_token = postData.get('max_token', '3000')       #nouse
    temperature = postData.get('temperature', 0.5)
    top_p = postData.get('top_p', 1.0)
    role = postData.get('role', 'user')
    convo_id = postData.get('convo_id', 'default')
    n = postData.get('n', 1)
    try:
        response = chatbot.ask(prompt=query, role=role, convo_id=convo_id, top_p=top_p,temperature=temperature, n=n)
        print(response)
        return response
    except Exception as e:
        return e

#Routing, SSE chat
@app.route('/chatstream', methods=['GET', 'POST'])
def chat_stream():
    query = request.args.get('query', 'Hello')
    max_token = float(request.args.get('max_token', '3000'))       #nNouse
    temperature = float(request.args.get('temperature', '0.5'))
    top_p = float(request.args.get('top_p', '1.0'))
    role = request.args.get('role', 'user')
    convo_id = request.args.get('convo_id', 'default')
    n = int(request.args.get('n', '1'))
    return Response(chatbot.ask_stream_text(prompt=query, role=role, convo_id=convo_id, top_p=top_p,temperature=temperature, n=n), mimetype='text/event-stream')
    
if __name__ == '__main__':
    app.run(debug=True, host=config['ip'], port=config['5000'])
    