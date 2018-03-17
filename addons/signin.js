handleSignin = (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
        .where({
            email: req.body.email
        })
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                res.json(data[0].email);
            }
        })
        .catch(err => res.json(err));
};

module.exports = {
    handleSignin: handleSignin
};