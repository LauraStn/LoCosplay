const validator = require("validator");

const verifRegisterData = async (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const address = req.body.adress;

  if (!validator.isAlpha(last_name, undefined, { ignore: " -" })) {
    return res.json({ message: "le nom doit contenir que des lettres" });
  }
  if (!validator.isAlpha(first_name, undefined, { ignore: " -" })) {
    return res.json({ message: "le nom doit contenir que des lettres" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ message: "L'email doit avoir un format d'email" });
  }
  // if(!validator.isAlphanumeric(address, undefined, {ignore:" -"})){
  //   return res.json({ message: "adress incorrecte" });
  // }

  req.first_name = first_name;
  req.last_name = last_name;
  req.email = email;
  req.address = address;

  next();
};

const verifUserUpdate = async (req, res, next) => {
  const verify = await verifyToken(req);
  if (!verify) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const id = verify.id;
  const { first_name, last_name, email, address } = req.body;
  let data = [];
  let values = [];
  if (first_name) {
    data.push("first_name= ?");
    values.push(first_name);
  }
  if (last_name) {
    data.push("last_name= ?");
    values.push(last_name);
  }
  if (email) {
    data.push("email= ?");
    values.push(email);
  }
  if (address) {
    data.push("adress= ?");
    values.push(address);
  }
  console.log(values);
  if (data.length == 0) {
    return res.json({ message: "vous avez modifier aucune donnée" });
  }
  values.push(id);
  data = data.join(",");
  req.data = data;
  req.values = values;
  next();
};

const verifAddProductData = async (req, res, next) => {
  const name = req.body.name;
  const size = req.body.size;
  const price = req.body.price;
  const stock = req.body.stock;

  if (!validator.isAlpha(size)) {
    return res.json({ message: "la taille doit contenir que des lettres" });
  }
  if (!validator.isFloat(price)) {
    return res.json({ message: "wrong price" });
  }
  if (!validator.isNumeric(stock)) {
    return res.json({ message: "wrong stock" });
  }
  // if(!validator.isAlphanumeric(name)) {
  //   return res.json({ message: "la taille doit contenir que des lettres" });
  // }
  req.size = size;
  req.price = price;
  req.stock = stock;
  req.name = name;

  next();
};
module.exports = { verifRegisterData, verifUserUpdate, verifAddProductData };
