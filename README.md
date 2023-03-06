# ChatGPT Web

## 介绍

支持双模型，提供了两种非官方 `ChatGPT API` 方法

| 方式                                          | 免费？ | 可靠性     | 质量 |
| --------------------------------------------- | ------ | ---------- | ---- |
| `ChatGPTAPI(gpt-3.5-turbo-0301)`                           | 否     | 可靠       | 相对较笨 |
| `ChatGPTUnofficialProxyAPI(网页 accessToken)` | 是     | 相对不可靠 | 聪明 |

对比：
1. `ChatGPTAPI` 使用 `gpt-3.5-turbo-0301` 通过官方`OpenAI`补全`API`模拟`ChatGPT`（最稳健的方法，但它不是免费的，并且没有使用针对聊天进行微调的模型）
2. `ChatGPTUnofficialProxyAPI` 使用非官方代理服务器访问 `ChatGPT` 的后端`API`，绕过`Cloudflare`（使用真实的的`ChatGPT`，非常轻量级，但依赖于第三方服务器，并且有速率限制）

[查看详情](https://github.com/Chanzhaoyu/chatgpt-web/issues/138)

切换方式：
1. 进入 `service/.env` 文件
2. 使用 `OpenAI API Key` 请填写 `OPENAI_API_KEY` 字段 [(获取 apiKey)](https://platform.openai.com/overview)
3. 使用 `Web API` 请填写 `OPENAI_ACCESS_TOKEN` 字段 [(获取 accessToken)](https://chat.openai.com/api/auth/session)
4. 同时存在时以 `OpenAI API Key` 优先

### 使用 Docker
#### Docker 参数示例

- `OPENAI_API_KEY` 二选一
- `OPENAI_ACCESS_TOKEN`  二选一，同时存在时，`OPENAI_API_KEY` 优先
- `OPENAI_API_BASE_URL`  可选，设置 `OPENAI_API_KEY` 时可用
- `API_REVERSE_PROXY` 可选，设置 `OPENAI_ACCESS_TOKEN` 时可用 [参考](#介绍)
- `TIMEOUT_MS` 超时，单位毫秒，可选
- `SOCKS_PROXY_HOST` 可选，和 SOCKS_PROXY_PORT 一起时生效
- `SOCKS_PROXY_PORT` 可选，和 SOCKS_PROXY_HOST 一起时生效
- `ACCOUNT` 登录页面用户，默认:`admin`
- `PASSWORD` 登录页面密码, 默认:`pwd`



#### Docker  Run

```bash
# 拉取image
docker pull hasengentle/chatgpt-web-login

# 以下两种方式2选1
# 1. 以官方OPENAI_API_KEY方式运行
docker run --name chatgpt -d -p 3002:3002 --env OPENAI_API_KEY=your_api_key --env ACCOUNT=root --env PASSWORD=abc123 hasengentle/chatgpt-web-login

# 2. 以第三方OPENAI_ACCESS_TOKEN方式运行
docker run --name chatgpt -d -p 3002:3002 --env OPENAI_ACCESS_TOKEN=your_access_token --env ACCOUNT=root --env PASSWORD=abc123 hasengentle/chatgpt-web-login

# 浏览器访问地址
http://localhost:3002/
```

使用 `OpenAI API` 所需的 `apiKey` [(获取 apiKey)](https://platform.openai.com/overview)            
使用 `Web API` 所需的 `accessToken` [(获取 accessToken)](https://chat.openai.com/api/auth/session) 
Docker hub的镜像地址 [(chatget-web-login))](https://hub.docker.com/r/hasengentle/chatgpt-web-login) 


