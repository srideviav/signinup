const app = require("./index");
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`)
})