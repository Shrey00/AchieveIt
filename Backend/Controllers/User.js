import User from '../DbModel/model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;  //for password encryption
export const signUp = async (req, res) => {
        const { firstName, lastName, email, password } = req.body; //gets the signUp details

        if (!firstName || !lastName || !email || !password) {
                res.status(400).json({ status: 400, error: 'Please enter all the fields' });
        }
        else {
                const user = await User.findOne({ email: email }); //checks if the user already exists
                if (!user) {       //if the user does not exist, the user can sign up
                        bcrypt.hash(password, saltRounds, async (err, hash) => {   //hash the password entered by user
                                try {
                                        const createdUser = await User.create({                   //saves the details entered by user to db and the sign up is done
                                                firstName: firstName,
                                                lastName: lastName,
                                                email: email,
                                                password: hash,
                                        })
                                        const token = generateAccessToken(createdUser);
                                        res.status(200).json({ token: token })
                                } catch (err) {
                                        res.status(400).json({status:400, error:'Invalid Credentials'});
                                        console.log(err.message);
                                }
                        });
                }
        }
}



//@desc for Login 
//@access : public
export const signin = async (req, res) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
                bcrypt.compare(password, existingUser.password, (err, result) => {
                        if (result) {
                                const token = generateAccessToken(existingUser);
                                res.json({ token: token })
                        } else {
                                res.status(400).json({status:400, error:'Invalid Credentials'});
                        }
                })
        }
}

//generates jsonwebtoken
function generateAccessToken(existingUser) {
        return jwt.sign({
                id: existingUser.id     
        }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export const getMe = (req, res) => {
        res.status(200).json(req.user);
}