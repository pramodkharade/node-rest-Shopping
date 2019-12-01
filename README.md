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
******************************************
  Name: Get Single Product
  Method: GET
  http://127.0.0.1:3000/products/productID
  
  ***************************************
  Name: GET All products
  Method: GET
  http://127.0.0.1:3000/products

****************************************
  Name: Add Product
  Method: POST
  http://127.0.0.1:3000/products
    Body:
    {
        "name":"Soap",
        "price": 50
    }
***************************************
Name: Delete Single Product
http://127.0.0.1:3000/products/productID
Method: DELETE
***************************************
