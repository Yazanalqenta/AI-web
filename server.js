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
  console.log(res.body);  

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