import Products from "../model/ProductModel.js";
import Users from "../model/Usermodel.js";
import { Op } from "sequelize"

export const getProducts = async (req, res) => {
    try {
        let response;
        if (req.role === "super admin") {
            response = await Products.findAll({
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role'],
                }]
            })
        } else {
            response = await Products.findAll({
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role'],
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getProductsById = async (req, res) => {

    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ msg: "Product Not Found" });

        let response;
        if (req.role === "super admin") {
            response = await Products.findOne({
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role'],
                }]
            })
        } else {
            response = await Products.findOne({
                where: {
                    [Op.and]: [{ userId: req.userId }, { id: product.id }]
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role'],
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const createProducts = async (req, res) => {
    const { name, price } = req.body
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId,
        }),
            res.status(200).json({ msg: "Product Created Successfuly" });
    } catch (error) {
        res.status(200).json({ msg: error.message });
    }
}

export const updateProducts = async (req, res) => {
    const { name, price } = req.body
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ msg: "Product Not Found" });

        if (req.role === "super admin") {
            await Products.update({
                name, price
            }, {
                where: {
                    id: product.id
                }
            })
        } else {
            if (req.id !== product.userId) return res.status(403).json({ msg: "you don't have access" })
            await Products.update({
                name, price
            }, {
                where: {
                    [Op.and]: [{ userId: req.userId }, { id: product.id }]
                },
            })
        }
        res.status(200).json({ msg: "Product Update Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteProducts = async (req, res) => {
    try {
        console.log(req.params.id)
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ msg: "Product Not Found" });

        if (req.role === "super admin") {
            await Products.destroy({
                where: {
                    id: product.id
                }
            })
        } else {
            if (req.id !== product.userId) return res.status(403).json({ msg: "you don't have access" })
            await Products.destroy({
                where: {
                    [Op.and]: [{ userId: req.userId }, { id: product.id }]
                },
            })
        }
        res.status(200).json({ msg: "Product Delete Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}