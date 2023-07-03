import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error("Error show categories", error);
        res.status(500).json({error: "Error show categories"})
    }
});

router.post("/categories", async (req, res) => {
    try {
        const category = await prisma.category.create({
            data: {
                name: req.body.name
            } 
        })
    
        res.json(category)
    } catch (error) {
        console.error("Error create categorie", error);
        res.status(500).json({error: "Error create categorie"})
    }

});

router.delete("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        })
    
        res.json(category)
    } catch (error) {
        console.error("Error delete categorie", error);
        res.status(500).json({error: "Error delete categorie"})
    }   
});

export default router;