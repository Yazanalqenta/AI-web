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
    apiKey:'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'
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