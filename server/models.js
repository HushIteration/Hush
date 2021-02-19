const mongoose = require("mongoose");

//mongoose ---------

const MONGO_URI =
  "mongodb+srv://judy:hush@hush.u9hai.mongodb.net/chat?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "chat",
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  conversations: {
    type: Schema.Types.ObjectId,
    ref: "Conversation"
  }
});

const conversationSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  participants: [Object],
  messages: [Object],
  users: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});


// {name: 'ross'} {name: 'matt'}

const Conversation = mongoose.model("Conversation", conversationSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Conversation,
};
