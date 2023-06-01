// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET'){
    res.status(200).json({ message: req.message })

  }
  else{
    res.status(200).json({ message: 'John Doe' })

  }
  
}
