// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET'){
    console.log(req.body)
    res.status(200).json({ message: JSON.parse(req.body) })

  }
  else{
    res.status(200).json({ message: JSON.parse(req.body) })

  }
  
}