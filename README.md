# Simple Caluculator dApp with MERN Stack
The main focus in this app is to validate the request from client side, postman and curl and only allow whitelisted origins.

## Backend Installation
Use the package manager [NPM](https://nodejs.org/en/) to install all dependencies.

```bash
npm install 
```

## Usage

```python
const express = require ('express');
const bodyParser = require('body-parser');
const app = express();

# creates log
const logger = require('morgan');

# Its validates the origin of requests
const cors = require('cors')
```

### Origins Validation
```javascript
const whitelist = ['http://localhost:3001']
let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    callback(null, corsOptions) // callback expects two parameters: error and options
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}
```
It avalidate all requests *GET, HEAD, PUT, PATCH, POST, DELETE* on postman, client side server and curl



## Front Installation
```bash
npm install
```

### For retrieving data from backend
```bash
axios.get("http://localhost:4100/getData?wallet=" + yourWalletAddress)
```

### For sending data to backed
```bash
await axios.post("http://localhost:4100/saveData", {
   wallet: walletAddress,
   value: dataToSave,
   transaction: tx // your blockchain transaction data
then((result) => {
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)