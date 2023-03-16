// Add carriage return submission support, shift+carriage return line feed
var input = document.getElementById("chatinput");
input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("sendbutton").click();
    }
});

// Add your JavaScript here
document.getElementById("sendbutton").addEventListener("click", function () {
    let loading = document.getElementById('loading');
    let title = document.getElementById("title");
    loading.style.display = 'block';
    title.style.display = 'none';
    // Get the user's message from the input field
    var message = document.getElementById("chatinput").value;
    if (message.length < 1) {
        let chatbox = document.getElementById("chatbox");
        let chatlog = document.getElementById("chatlog");
        let response = document.createElement("div");
        response.innerHTML = "🤔<br>🤖<br>Message cannot be null\n问题不能为空";
        chatlog.appendChild(response);
        //scrool the chatbox into bottom
        chatbox.scrollTop = chatbox.scrollHeight;
        loading.style.display = 'none';
    } else {
        // Clear the input field
        document.getElementById("chatinput").value = "";
        //Apeed the messenge to the chatlog
        let chatbox = document.getElementById("chatbox");
        let chatlog = document.getElementById("chatlog");
        let response = document.createElement("div");
        response.innerHTML = "🤔me<br>" + marked.parse(message);
        chatlog.appendChild(response);
        //scrool the chatbox into bottom
        chatbox.scrollTop = chatbox.scrollHeight;
        // Append the user's message
        var data = {
            query: message,
            max_token: 3000,
            temperature: 0.7,
            top_p: 0.9
        };
        // Send the user's message to the server
        function sendChat(data){
            return new Promise(function(){
                var source = new EventSource("/chatstream?"+$.param(data));
                var res_txt = '';
                var markdown_code_tail = '';
                // var source = new EventSource("/chatstream");
                //Triggered on first connection
                source.onopen = function (event) {
                    console.log("Connection opened");
                    let chatbox = document.getElementById("chatbox");
                    let chatlog = document.getElementById("chatlog");
                    let response = document.createElement('div')
                    response.setAttribute('name', 'response');
                    response.innerHTML = "🤖chatGPT<br>";
                    res_txt = '';
                    markdown_code_tail = '';
                    chatlog.appendChild(response);
                    //scrool the chatbox into bottom
                    chatbox.scrollTop = chatbox.scrollHeight;
                }
                source.onmessage = function (event) {
                    const data = JSON.parse(event.data);
                    let content = data.content
                    let chatbox = document.getElementById("chatbox");
                    let responseElements = document.getElementsByName("response");
                    let responseElement = responseElements[responseElements.length - 1];  //Take the last one
                    if(content == '[DONE]')
                    {
                        console.log("Connection closed");
                        let title = document.getElementById("title");
                        let loading = document.getElementById('loading');
                        loading.style.display = 'none';
                        title.style.display = 'block';
                        source.close();
                    }
                    else
                    {
                        res_txt += content;
                        len = res_txt.split("```").length - 1;
                        if(len%2 > 0){
                            responseElement.innerHTML = "🤖chatGPT<br>" + marked.parse(res_txt + "\r\n```");
                        }
                        else{
                            responseElement.innerHTML = "🤖chatGPT<br>" + marked.parse(res_txt);
                        }
                    }          
                    console.log(content);
                    //scrool the chatbox into bottom
                    chatbox.scrollTop = chatbox.scrollHeight;
                    
                }
                source.onerror = function (event) {
                    console.log("Connection Timeout");
                    let title = document.getElementById("title");
                    let loading = document.getElementById('loading');
                    loading.style.display = 'none';
                    title.style.display = 'block';
                    source.close();
                } 
                // 绑定停止按钮事件
                // $("#btn2").click(function () {
                //     if (source !== null) {
                //         source.close();
                //         // delete_data();
                //     }
                // }) 
            })
        }
        sendChat(data);
    }
});
