import Users from "../model/Usermodel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const users = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!users) return res.status(404).json({ msg: "User Not Found" });
    console.log(req.body.password)


    const mach = await argon2.verify(users.password, req.body.password);
    if (!mach) return res.status(400).json({ msg: "Wrong Password" });

    req.session.userId = users.uuid;

    const uuid = users.uuid;
    const name = users.name;
    const email = users.email;
    const role = users.role;

    res.status(200).json({ uuid, name, email, role })
}

export const Me = async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ msg: "Pliss Login" });
    const users = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!users) return res.status(404).json({ msg: "User Not Found" });
    res.status(200).json({ msg: users })

}

export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ mesg: "Cannot Logout" });
        res.status(200).json({ msg: "Logout Successfuly" })
    })
}