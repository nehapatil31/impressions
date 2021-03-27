const mongoose = require('mongoose');
const request = require('request');
const User = require('../models/user.js');
const { use } = require('../routes/posts.js');

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

const saveNews = async (req, res) => {
    try {
        const { newsId } = req.params;

        if (!req.userId) return res.json({ message: 'Unauthenticated' });

        const user = await User.findById(req.userId);

        const index = user.news.findIndex((id) => id === String(newsId));
        if (index == -1) {
            user.news.push(newsId)
        } else {
            user.news = user.news.filter((id) => id !== String(newsId));
        }

        const updatedUser = await User.findByIdAndUpdate(req.userId, user, { new: true });

        res.json({ result: updatedUser });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getNews, saveNews };