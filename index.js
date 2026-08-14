const express = require('express')
const app = express()
app.use(express.json())
let students = [
    {studentId: 101, name:"Nguyen Van A", class:"5A1", parentName:"Nguyen Duc A", parentPhone:"0122134812"}
]
const notifications = [
    {id: 400, content:"Dong hoc phi", date:"10-8-2026"}
]
const messages = [
    {id:300, studentId:101, content:"Khong lam bai", date:"10-8-2026"}
]
app.get('/students', (req, res) => {
    res.json(students)
})
app.get('/students/:studentId', (req, res) =>{
    console.log(req.params.studentId)
    const student = students.find((item) => item.studentId === Number(req.params.studentId))
    if(!student){
        res.status(404).json({error: "khong tim thay hoc sinh"})
    }else{
        res.json(student)
    }
})
app.post('/students', (req,res) =>{
    const {name, class:className, parentName, parentPhone} = req.body
    const newStudent = {studentId: students.length+1, name, class: className, parentName, parentPhone}
    students.push(newStudent)
    res.status(201).json(newStudent)
})
app.put('/students/:studentId', (req,res)=>{
    console.log(req.params.studentId)
    const student = students.find((item) => item.studentId === Number(req.params.studentId))
    if(!student){
        res.status(404).json({error: "Khong tim thay hoc sinh"})
    } else {
        const {name, class:className, parentName, parentPhone} = req.body
        student.name = name
        student.class = className
        student.parentName = parentName
        student.parentPhone = parentPhone
        res.json(student)
    }
})
app.delete('/students/:studentId', (req, res) =>{
    console.log(req.params.studentId)
    const student = students.find((item) => item.studentId === Number(req.params.studentId))
    if(!student){
        res.status(404).json({error:"Khong tim thay hoc sinh"})
    }else{
        students = students.filter((item) => item.studentId !== Number(req.params.studentId))
        res.json({message: "Da xoa hoc sinh"})
    }
})

app.get('/notifications', (req,res) =>{
    res.json(notifications)
})
app.get('/notifications/:id', (req, res) =>{
    console.log(req.params.id)
    const notification = notifications.find((item) => item.id === Number(req.params.id))
    if(!notification){
        res.status(404).json({error: "khong thay tin nhan"})
    } else{
        res.json(notification)
    }
})
app.post('/notifications',(req, res) =>{
    const {content, date} = req.body
    const newNotification = {id: notifications.length +1, content, date}
    notifications.push(newNotification)
    res.status(201).json(newNotification)
})

app.get('/messages', (req,res) =>{
    res.json(messages)
})
app.get('/messages/:id', (req, res) => {
    console.log(req.params.id)
    const message = messages.find((item) => item.id === Number(req.params.id))
    if(!message){
        res.status(404).json({error: "khong thay tin nhan"})
    } else {
        res.json(message)
    }
})
app.post('/messages', (req, res) => {
    const {studentId, content, date} = req.body
    const newMessage = {id: messages.length +1, studentId, content, date}
    messages.push(newMessage)
    res.status(201).json(newMessage)
})
app.listen(3001)