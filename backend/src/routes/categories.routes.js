import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});

router.post("/categories", async (req, res) => {
    const category = await prisma.category.create({
        data: {
            name: req.body.name
        } 
    })

    res.json(category)

});

router.delete("/categories/:id", async (req, res) => {
    const { id } = req.params;
    const category = await prisma.category.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.json(category)
});

export default router;