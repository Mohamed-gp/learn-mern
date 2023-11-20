// const { MongoClient } = require('mongodb');


// // Connection URL




// async function main() {
//     const url = 'mongodb+srv://mohamedterba6:LrAc7rJqKs2M0RVR@cluster0.w2sdpyk.mongodb.net/?retryWrites=true&w=majority';
//     const client = new MongoClient(url);
    
// // Database Name
// const dbName = 'learning';
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('MERN');
  
//   // the following code examples can be pasted here...
//   console.log(collection.find())

//   console.log(collection.find().toArray())
// }

// main()

const { MongoClient } = require('mongodb');

// Connection URL
async function main() {
  const url = 'mongodb+srv://mohamedterba6:LrAc7rJqKs2M0RVR@cluster0.w2sdpyk.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);

  // Database Name
  const dbName = 'learning';

  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('MERN');

  // Use toArray() to get the documents as an array
  const documentsArray = await collection.find().toArray();

  // Now you can log the array
  console.log(documentsArray);
}

main();
