"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const productService_1 = require("./services/productService");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config(); // load environment variables from .env file
const app = (0, express_1.default)(); // initialize express app
app.use((0, cors_1.default)()); // enable CORS
const PORT = 3000; // define port number
app.use(express_1.default.json()); // middleware to parse json request body
//connect to mongodb
mongoose_1.default
    .connect(process.env.DATABASE_URL || "")
    .then(() => console.log("MongoDB connected!"))
    .catch((error) => console.log("failed to connect to MongoDB", error));
//seed initail products 
(0, productService_1.seedInitailProducts)();
app.use("/user", userRoute_1.default); // user route
app.use('/product', productRoute_1.default); // product route
app.use('/cart', cartRoute_1.default); // cart route
// app listen to port
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
//# sourceMappingURL=index.js.map