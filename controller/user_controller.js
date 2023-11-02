const user = require('../model/user')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.signup = (req, res, next) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    console.log(name, email, password);


    user.findOne({ user_email: email })
        .then((getuser) => {
            if (getuser) {


                return res.status(500).json({
                    message: 'Already has this Email!',
                });
            }

            return bcrypt.
                hash(password, 12)
                .then(hashedpassword => {
                    const newuser = new user({
                        user_name: name,
                        user_email: email,
                        user_password: hashedpassword
                    });
                    return newuser.save();
                }).then(result => {
                    res.status(201).json({
                        message: 'user created !',
                        post: { name: name, email: email, password: password }
                    });
                });
        }).catch(err => {
            console.log(err);
        });




}

exports.login = (req, res, next) => {


    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);




    user.findOne({ user_email: email }).then((getuser) => {
        if (!getuser) {
            console.log('4');

            return res.status(500).json({
                message: 'No user found!',
            });
        }
        bcrypt.compare(password, getuser.user_password).
            then((match) => {
                if (match) {
                    console.log('1');
                    return res.status(201).json({
                        message: 'user matched !',
                        post: { email: email, password: password }
                    });
                }

                else {
                    res.status(500).json({
                        message: 'No user found!',
                    });
                }


            }).catch(err => {
               console.log(err);


            });
})
.catch(err => console.log(err));


}