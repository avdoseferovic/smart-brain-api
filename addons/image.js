const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd5d4f69809e14dfebfad9dcc793a73bd'
});
handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => console.log(err));
};
handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where({
        id: id
    })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(error => res.status(404).json('something went wrong'));
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};