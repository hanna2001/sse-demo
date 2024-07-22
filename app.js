import express from 'express';

const app=express();

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
});

app.get('/sse',async (req,res)=>{
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
    res.writeHead(200, headers);
    const data = `data: this is send using SSE\n\n`;
    res.write(data);

    for (let index = 0; index < 10000; index++) {
        
        if(index%10==0){
            setTimeout(()=>{
                res.write(`data: this is send using SSE - ${index}\n\n`);
            },10000)
            
            
        }
        
    }
});

app.listen('5001',(req,res)=>{
    console.log('Running on port 5001');
})