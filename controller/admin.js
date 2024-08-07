import Admin from "../model/AdminModel";

export const createAdmin = async (req, res) => {
   const {nama, email, password} = req.body;
    try {
       const admin = await Admin.create ({
         nama : nama,
         email : email,
         password : password
       }) 
       res.json({admin})
    } catch (error) {
        res.json({ message :error});
    }
}
