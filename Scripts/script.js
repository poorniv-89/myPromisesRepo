const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Accepts a user id value and returns a string containing
 * the database that user's information can be found in.
 * @param {Number} id The user id.
 * @return {String} The name of the database to look up the user.
 */
async function central(id) {
  if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");
  if (id < 1 || id > 10) throw new Error("Invalid Input -- Out of Range");

  await wait(100); // Faking an "external" call here by adding a delay.
  let db = "db1";
  if (id > 4) db = "db2";
  if (id > 7) db = "db3";
  return db;
}

/**
 * Accepts a user id value and returns an object containing
 * username, website, and company data.
 * @param {Number} id The user id.
 * @return {Object} The user's username, website, and company data.
 */
async function db1(id) {
  if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");
  if (id < 1 || id > 4) throw new Error("Invalid Input -- Out of Range");

  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const json = await data.json();

  return {
    username: json.username,
    website: json.website,
    company: json.company
  };
}
/**
 * Accepts a user id value and returns an object containing
 * username, website, and company data.
 * @param {Number} id The user id.
 * @return {Object} The user's username, website, and company data.
 */
async function db2(id) {
  if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");
  if (id < 5 || id > 7) throw new Error("Invalid Input -- Out of Range");

  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const json = await data.json();

  return {
    username: json.username,
    website: json.website,
    company: json.company
  };
}
/**
 * Accepts a user id value and returns an object containing
 * username, website, and company data.
 * @param {Number} id The user id.
 * @return {Object} The user's username, website, and company data.
 */
async function db3(id) {
  if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");
  if (id < 8 || id > 10) throw new Error("Invalid Input -- Out of Range");

  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const json = await data.json();

  return {
    username: json.username,
    website: json.website,
    company: json.company
  };
}

/**
 * Accepts a user id value and returns an object containing
 * name, email, address, and phone data.
 * @param {Number} id The user id.
 * @return {Object} The user's name, email, address, and phone data.
 */
async function vault(id) {
  if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");
  if (id < 1 || id > 10) throw new Error("Invalid Input -- Out of Range");

  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const json = await data.json();

  return {
    name: json.name,
    email: json.email,
    address: json.address,
    phone: json.phone
  };
}


function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
central(id)
.then((db) => {
      return dbs[db](id);
    })
    .then((userData)=> {
      //console.log(userData);
      return vault(id)
      .then((vaultData)=>{
        // console.log(vaultData);
      let combinedData = { ...userData, ...vaultData };
      console.log(combinedData);
    });
    })
      .catch((error) => {
        console.log(error);
    });
  }

getUserData(9);

