import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/tasks", async (req, res) => {
    const tasks = await prisma.tasks.findMany({
        include: {
            category: true
        },
        where: {
            status: false
        }
    });
    res.json(tasks)
});

router.get("/completed", async (req, res) => {
    const tasks = await prisma.tasks.findMany({
        where: {
            status: true
        },
        include: {
            category: true
        }
    })
    res.json(tasks)
})

router.put("/checktask/:id", async (req, res) => {
    const {id} = req.params
    await prisma.tasks.update({
        data: {
            status: true
        }, where: {
            id: parseInt(id)
        }
    })
    res.json(true)
})

router.get("/task/:id", async (req, res) => {
    const {id} = req.params
    const showTask = await prisma.tasks.findFirst({
        where: {
            id: parseInt(id)
        }, include: {
            category: true
        }
    })
    res.json(showTask)
})

router.post("/tasks", async (req, res) => {
    const task = await prisma.tasks.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            categoryId: parseInt(req.body.categoryId)
        } 
    })
    res.json(task)
})

router.put("/task/:id", async (req, res) => {
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
})

router.delete("/tasks/:id", async (req, res) => {
    const {id} = req.params
    const deleted_task = await prisma.tasks.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.json(deleted_task)
})

export default router;