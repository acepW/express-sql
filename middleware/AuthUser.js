import Users from "../model/Usermodel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) return res.status(401).json({ msg: "Pliss Login" });
    const users = await Users.findOne({

        where: {
            uuid: req.session.userId
        }
    });
    if (!users) return res.status(404).json({ msg: "User Not Found" });
    req.userId = users.id;
    req.role = users.role;
    next();
}

export const superAdminOnly = async (req, res, next) => {

    const users = await Users.findOne({

        where: {
            uuid: req.session.userId
        }
    });
    if (!users) return res.status(404).json({ msg: "User Not Found" });
    if (users.role !== "super admin") return res.status(404).json({ msg: "you don't have access" })
    next();
}