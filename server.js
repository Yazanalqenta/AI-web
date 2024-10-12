const { OpenAI } = require("openai")
const express =  require('express')
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://ai-web-b078.onrender.com'
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log("Server is active")
})

const openai = new OpenAI({
    // replace your-api-key with your API key from ChatGPT
    apiKey: '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'
})

app.post('/chat', async (req, res)=> { 
  console.log(req.body);
  console.log(res);  

    try {
      const resp = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: req.body.question}
          ]  
      })           
  
      res.status(200).json({message: resp.choices[0].message.content})
    } catch(e) {
        res.status(400).json({message: e.message})
    }
  })