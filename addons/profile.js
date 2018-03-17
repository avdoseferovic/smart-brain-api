handleProfile = (req, res, db) => {
    const { email } = req.params;
    db.select('*').from('users').where({
        email: email
    })
        .then(response => {
            if(response.length !== 0){
                res.json(response[0])}
            else
                res.json('not found')
        })
        .catch(err => res.send(err));
};

module.exports = {
    handleProfile: handleProfile
};