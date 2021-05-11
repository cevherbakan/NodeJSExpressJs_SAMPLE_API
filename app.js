const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const products = [
  {
    id: 1,
    name: 'OneNumberProduct',
  },
  {
    id: 2,
    name: 'TwoNumberProduct'
  },
  {
    id: 3,
    name: 'ThreeNumberProduct'
  }
]

app.get('/', (req, res) => {
  res.json({message: 'Main Page'})
})

app.get('/product/', (req, res) => {
  res.json(products)
})

app.get('/product/:id', (req, res) => {
  const product = products.find(product => product.id === parseInt(req.params.id))
  product ? res.json(product) : res.status(404).json({message: 'Wrong Id For Product'})
})

app.post('/product/create', (req, res) => {
  products.push(req.body)
  res.status(201).json(req.body)
})

app.put('/product/update/:id', (req,res)=>{
  const product = products.find(product => product.id === parseInt(req.params.id))
  product.name = req.body.name;
  res.json(products)
})

app.delete('/product/delete/:id', (req,res)=>{
  const product = products.find(product => product.id === parseInt(req.params.id))
  products.pop(product)
  res.json(products)
})

app.listen(3000)