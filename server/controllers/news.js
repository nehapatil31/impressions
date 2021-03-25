const request = require('request');

const newsapi = '4a8f8ef1af1c42899b1878906219d650';

const getNews = async (req, res) => {
    try {
        request.get('https://newsapi.org/v2/everything?q=Apple&from=2021-03-22&sortBy=popularity&apiKey=4a8f8ef1af1c42899b1878906219d650', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200).json(JSON.parse(body));
            }
            if (error) {
                res.json({ "error": "Something is wrong in News api." });
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = getNews;