const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv/config');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.CONNECTION_STRING);

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to Todo List"
})

const item2 = new Item({
  name: "Hit + button to add new item"
})

const item3 = new Item({
  name: "<-- Hit this to delete an item"
})

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);


const defaultItems = [item1, item2, item3];


app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Default items successfully added.");
          }
        });
        res.redirect("/");
      } else {
        res.render("list", { listTitle: "Today", newListItems: foundItems });
      }

    }
  })
});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;
  if (itemName.length > 0) {
    const item = new Item({
      name: itemName
    });
    if (listName === "Today") {
      item.save();
      res.redirect("/");
    } else {
      List.findOne({name: listName}, function(err, foundList) {
        if(!err) {
          foundList.items.push(item);
          foundList.save();
          res.redirect("/" + listName);
        }
      })
    }
  } else {
    if (listName === "Today") {
      res.redirect("/");
    } else {
      res.redirect("/" + listName);
    }
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name:listName}, {$pull: {items:{_id: checkedItemId}}}, function(err, foundList) {
      res.redirect("/" + listName);
    })
  }

})

// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new List
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an exisitng List
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    }
  });
})

app.get("/about", function (req, res) {
  res.render("about");
});

let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully");
});
