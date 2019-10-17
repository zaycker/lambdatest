const mongooseInstance = require('./services/mongooseInstance');
const convert = require('xml-js');
const https = require('https');
const js2xmlparser = require('js2xmlparser');
const getTravelers = require('./config');
require('dotenv').config();

exports.lambdaHandler = async (event, context) => {
  try {
    const { id: orderNumber } = JSON.parse(event.body);
    await connectToMongoDB();
    const db = mongooseInstance.connection;
    const data = await db.collection('deals')
      .findOne({ orderNumber });

    const before = js2xmlparser.parse('LeadCloud', getTravelers(data));

    const result = await callAxios(before);
    const options = {ignoreComment: true, alwaysChildren: true, compact: true};

    return {
      statusCode: 200,
      body: convert.xml2json(result, options)
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: e
    }
  }
};

const connectToMongoDB = async () => {
  try {
    mongooseInstance.set('useCreateIndex', true);
    await mongooseInstance.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
    console.log(`Connected to MongoDB`)
  } catch (err) {
    console.log(`During connecting to MongoDB an error occured. ${err.toString()}`);
  }
};

const callAxios = async data => new Promise((resolve, reject) => {
  const options = {
    hostname: process.env.LEADCLOUD_URI_HOST,
    path: process.env.LEADCLOUD_URI_PATH,
    method: 'POST',
    port: 443,
    headers: {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(options, (res) => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      console.log('we are here!!!!');
      return reject(new Error('statusCode=' + res.statusCode));
    }
    let body = [];
    res.on('data', chunk => {
      body.push(chunk);
    });
    res.on('end', () => {
      try {
        body = Buffer.concat(body).toString();
      } catch (e) {
        reject(e)
      }
      resolve(body);
    });
  });

  req.on('error', (e) => {
    reject(e.message);
  });
  req.write(data);
  req.end();
});
