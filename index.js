// const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
app.use(express.json())

const URL = "https://atcoder.jp/home?lang=en";
let beginner = [];
let upcoming = [];

axios(URL).then((response) => {
    const htmlParser = response.data;
    const $ = cheerio.load(htmlParser);

    $('#contest-table-upcoming tr').each(function () {
        const time = $(this).find('td:first-child .fixtime-short').text().trim();
        const title = $(this).find('td:last-child a').text().trim();
        let link = $(this).find('td:last-child a').attr('href');
        link = "https://atcoder.jp" + link + "?lang=en";
        upcoming.push({ time: time, title: title, link: link });
    });


    $('#contest-table-upcoming .user-blue').each(function () {
        const time = $(this).parent().parent().prev().find('.fixtime-short').text().trim();
        const title = $(this).parent().find('a').text().trim();
        let link = $(this).parent().find('a').attr('href');
        link = "https://atcoder.jp" + link + "?lang=en";
        beginner.push({ time: time, title: title, link: link });
    });

    upcoming.shift(); // Delete first element
    console.log(upcoming);
    // console.log(beginner);
}).catch(error => console.log(error));

setInterval(function () {
    beginner = [];
    upcoming = [];

    axios(URL).then((response) => {
        const htmlParser = response.data;
        const $ = cheerio.load(htmlParser);

        $('#contest-table-upcoming tr').each(function () {
            const time = $(this).find('td:first-child .fixtime-short').text().trim();
            const title = $(this).find('td:last-child a').text().trim();
            let link = $(this).find('td:last-child a').attr('href');
            link = "https://atcoder.jp" + link + "?lang=en";
            upcoming.push({ time: time, title: title, link: link });
        });


        $('#contest-table-upcoming .user-blue').each(function () {
            const time = $(this).parent().parent().prev().find('.fixtime-short').text().trim();
            const title = $(this).parent().find('a').text().trim();
            let link = $(this).parent().find('a').attr('href');
            link = "https://atcoder.jp" + link + "?lang=en";
            beginner.push({ time: time, title: title, link: link });
        });

        upcoming.shift(); // Delete first element
        console.log(upcoming);
        // console.log(beginner);
    }).catch(error => console.log(error));
}, 1800000);



//GET - upcoming contests
app.get("/api/upcoming-contests", (req, res) => {
    res.send(upcoming);
});
//GET - upcoming contests (only ABC)
app.get("/api/upcoming-contests/ABC", (req, res) => {
    res.send(beginner);
});
//GET - upcoming contests (only next contest)
app.get("/api/upcoming-contests/next", (req, res) => {
    const nextABC = upcoming[0];
    res.send(nextABC);
});
//GET - upcoming contests (only next ABC)
app.get("/api/upcoming-contests/ABC/next", (req, res) => {
    const nextABC = beginner[0];
    res.send(nextABC);
});

// app.listen(console.log("server running!"));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
