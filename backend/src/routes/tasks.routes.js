import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await prisma.tasks.findMany({
            include: {
                category: true
            },
            where: {
                status: false
            }
        });
        res.json(tasks)
    } catch (error) {
        console.error("Error show tasks", error);
        res.status(500).json({error: "Error show tasks"})
    }
});

router.get("/completed", async (req, res) => {
    try {
        const tasks = await prisma.tasks.findMany({
            where: {
                status: true
            },
            include: {
                category: true
            }
        })
        res.json(tasks)
    } catch (error) {
        console.error("Error show tasks completed", error);
        res.status(500).json({error: "Error show tasks completed"})
    }
})

router.put("/checktask/:id", async (req, res) => {
    try {
        const {id} = req.params
        await prisma.tasks.update({
            data: {
                status: true
            }, where: {
                id: parseInt(id)
            }
        })
        res.json(true)
    } catch (error) {
        console.error("Error update status task", error);
        res.status(500).json({error: "Error update status task"})
    }
})

router.get("/task/:id", async (req, res) => {
    try {
        const {id} = req.params
        const showTask = await prisma.tasks.findFirst({
            where: {
                id: parseInt(id)
            }, include: {
                category: true
            }
        })
        res.json(showTask)
    } catch (error) {
        console.error("Error show task", error);
        res.status(500).json({error: "Error show task"})
    }
})

router.post("/tasks", async (req, res) => {
    try {
        const task = await prisma.tasks.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                categoryId: parseInt(req.body.categoryId)
            } 
        })
        res.json(task)
    } catch (error) {
        console.error("Error create task", error);
        res.status(500).json({error: "Error create task"})
    }
})

router.put("/task/:id", async (req, res) => {
    try {
        const {id} = req.params
        const update_task = await prisma.tasks.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                categoryId: parseInt(req.body.categoryId)
            }
        });
        res.json(update_task)
    } catch (error) {
        console.error("Error update task", error);
        res.status(500).json({error: "Error update task"})
    }
})

router.delete("/tasks/:id", async (req, res) => {
    try {
        const {id} = req.params
        const deleted_task = await prisma.tasks.delete({
            where: {
                id: parseInt(id)
            }
        })
    
        res.json(deleted_task)
    } catch (error) {
        console.error("Error delete task", error);
        res.status(500).json({error: "Error delete task"})
    }
})

export default router;