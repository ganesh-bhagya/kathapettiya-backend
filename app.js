// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db.js");
const cors = require("cors");
const app = express();
const port = 8000;

const userRouter = require('./routes/UserRoutes');
const categoryRouter = require('./routes/CategoryRoutes');
const tagRouter = require('./routes/TagRoutes');
const seriesRouter = require('./routes/SeriesRoutes');
const roleRouter = require('./routes/RoleRoutes');
const storyRouter = require('./routes/StoryRoutes');
const queueRouter = require('./routes/QueueRoutes');
const favouriteRouter = require('./routes/FavouriteRoutes');

const corsOptions = {
  // origin: "https://www.supershinecarcare.lk",
  origin: "http://localhost:3000",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//databse config
connectDB();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/tags", tagRouter);
app.use("/api/series", seriesRouter);
app.use("/api/stories", storyRouter);
app.use("/api/queues", queueRouter);
app.use("/api/favourites", favouriteRouter);

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
