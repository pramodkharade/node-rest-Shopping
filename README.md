# node-rest-Shopping
REST API  with nodejs , mongodb


# Install Express 

npm i --save express

# Install Morgan to Log the api request

 npm i --save morgan

 # install body-parser for parse the request 

  npm i --save body-parser

  # Install Mongodb library 

  npm i --save mongoose


  # Products END POINT
  Name: Update Product
  Method: Patch
  http://127.0.0.1:3000/products/productID
   body:
   [
       {
	    "propName":"name",
	    "propValue":" Fire of the wing 3"
      },
      {
	    "propName":"price",
	    "propValue":350
     }
   ]

  Name: Update Product
  Method: GET
  http://127.0.0.1:3000/products/productID
