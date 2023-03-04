import express from 'express'
import type {ChatContext, ChatMessage} from './chatgpt'
import {chatConfig, chatReply, chatReplyProcess} from './chatgpt'

const app = express()
const router = express.Router()

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
res.header('Access-Control-Allow-Headers', 'Content-Type')
res.header('Access-Control-Allow-Methods', '*')
  next()
})

  router.post('/chat', async (req, res) => {
    try {
      const {prompt, options = {}} = req.body as {
        prompt: string;
        options?: ChatContext
      }
      const response = await chatReply(prompt, options)
      res.send(response)
    } catch (error) {
      res.send(error)
    }
  })

  router.post('/chat-process', async (req, res) => {
    res.setHeader('Content-type', 'application/octet-stream')

    try {
      const {prompt, options = {}} = req.body as {
        prompt: string;
        options?: ChatContext
      }
    let firstChunk = true
    await chatReplyProcess(prompt, options, (chat: ChatMessage) => {
      res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
      firstChunk = false
    })
    } catch (error) {
      res.write(JSON.stringify(error))
    } finally {
      res.end()
    }
  })

  router.post('/config', async (req, res) => {
    try {
      const response = await chatConfig()
      res.send(response)
    } catch (error) {
      res.send(error)
    }
  })

  router.post('/login', async (req, res) => {
    const account = process.env.ACCOUNT
    const password = process.env.PASSWORD
    console.log('env account: %s password: %s', account, password)

    const rA = req.body.account
    const rP = req.body.password
    // const { rA, rP } = req.body as { account: String; password: String }
    console.log('req rA: %s rP: %s', rA, rP)

    if (account === rA && password === rP) {
      // res.send({type: 'Success', data: {msg: 'login'}})
      res.status(200).send('login Success')
    }
    else {
      res.status(403).send('login Failed')
      // res.send({type: 'Fail', data: {msg: 'No Authority'}})
    }
    //
    // }
    // catch (error: any) {
    //   return sendResponse({ type: 'Fail', message: error.message })
    // if (account === rA && password === rP)
    //   return res.status(200).send({'status': 200, 'msg': 'Success'})
    // else
    //   return res.status(403).send({'status': 0, 'msg': 'faild'})
  })

  app.use('', router)
  app.use('/api', router)

  app.listen(
      3002, () => globalThis.console.log('Server is running on port 3002'))
