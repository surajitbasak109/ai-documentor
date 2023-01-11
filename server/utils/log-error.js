import fs from "fs";
const path = `${process.env.PWD}/storage/logs/error.log`;

console.log(process.env.PWD);

export const logError = (data) => {
  if (fs.existsSync(path)) {
    const stat = fs.statSync(path);
    if (stat.size > 0) {
      data = `\n${data}`;
    }
    fs.promises
      .appendFile(path, data)
      .then(() => {
        console.log("Error logged");
      })
      .catch((err) => {
        console.log("Error occurred during logging error");
        console.log(err);
      });
  } else {
    fs.promises
      .writeFile(path, data)
      .then(() => {
        console.log("Error logged");
      })
      .catch((err) => {
        console.log("Error occurred during logging error");
        console.log(err);
      });
  }
};
