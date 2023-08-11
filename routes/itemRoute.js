const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const dataUrl = "./data/todoList.json"

function readList() {
    const todoListData = fs.readFileSync(dataUrl);
    return JSON.parse(todoListData);
}

function writeList(newTodoListData) {
    fs.writeFileSync(dataUrl, JSON.stringify(newTodoListData));
}


router.route("/")
    .get((req, res) => {
        const currentList = readList();
        res.json(currentList);
    })

    .post((req, res) => {
        const currentList = readList();
        const {title, priority, dueDate} = req.body;
        if (!title || !priority || !dueDate) {
            return res.status(400);
        }

        const newListItem = {
            id: uuid(),
            title: title,
            priority: priority,
            dueDate: dueDate
        }
        currentList.push(newListItem);
        writeList(currentList);
        res.status(204).send("Done!");
    })

router.route("/:id")
    .get((req, res) => {

    })

    .put((req, res) => {

    })

    .delete((req, res) => {
        req.params
    })

module.exports = router;