/* const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

/* GET home page 
router.get("/", (req, res, next) => {
  res.render("index");
});


router.post("/componentsearch", async (req, res) => {
  const searchTerms = req.body.component; // retrieve search terms from the request body

  const endpoint = `https://api.mouser.com/api/v1/search/keyword?apiKey=2b79b383-3bc0-46fc-a650-5005afd1f402${searchTerms}`;
  // replace <your API key> with your actual API key
  //console.log(searchTerms)
  


  try {
    const response = await fetch(endpoint);
    const data = await response.json(); // parse the JSON response

   console.log(data)
  } catch (error) {
    console.log(error);
    res.render("", {
      errorMessage: "An error occurred while searching for components.",
    });
  } 
});



module.exports = router;
 */

/* const express = require('express');

const router = express.Router();
const bodyParser = require("body-parser");
const fetch = import('node-fetch');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

/* GET home page 
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/componentsearch", async (req, res) => {
  const searchTerms = req.body.component; // retrieve search terms from the request body

  const endpoint = `https://api.mouser.com/api/v1/search/keyword?apiKey=2b79b383-3bc0-46fc-a650-5005afd1f402`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({
      SearchByKeywordRequest: {
        keyword: searchTerms,
        records: 10,
        startingRecord: 0,
        searchOptions: '',
        searchWithYourSignUpLanguage: '',
      },
    }),
  };

  try {
    const response = await fetch(endpoint);
    const data = await response.json(); // parse the JSON response
    res.render("csr", data);
  } catch (error) {
    console.log(error);
    res.render("csr", {
      errorMessage: "An error occurred while searching for components.",
    });
  } 
});
    // You can pass the fetched data to the template engine of your choice
    module.exports = router; */

 const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require('axios');
const app = express();
require('dotenv').config();

const mKey= process.env.MOUSERKEY


app.use(bodyParser.urlencoded({ extended: true }));

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/componentsearch", async (req, res) => {
  const searchTerms = req.body.component; // retrieve search terms from the request body

 // const endpoint = `https://api.mouser.com/api/v1/search/keyword?apiKey=2b79b383-3bc0-46fc-a650-5005afd1f402`;
  const endpoint = `https://api.mouser.com/api/v1/search/keyword?apiKey=${mKey}`;
  const options =  {
      SearchByKeywordRequest: {
        keyword: searchTerms,
        records: 40,
        startingRecord: 0,
        searchOptions: '',
        searchWithYourSignUpLanguage: '',
    },
  };

  try {
    const response = await axios.post(endpoint, options);
    const data = response.data; // parse the JSON response
    console.log(data.SearchResults.Parts)
    
    res.render("csr", {result: data.SearchResults.Parts} );
  } catch (error) {
    console.log(error);
    res.render("csr", {
      errorMessage: "An error occurred while searching for components.",
    });
  } 
});

module.exports = router;
