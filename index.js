//const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
app.use(express.json());

const URL = "https://atcoder.jp/home?lang=en";
let upcoming = [];
let beginner = [];

function updateContests() {
    axios(URL)
        .then((response) => {
            const htmlParser = response.data;
            const $ = cheerio.load(htmlParser);

            $('#contest-table-upcoming tr').each(function () {
                const time = $(this).find('td:first-child .fixtime-short').text().trim();
                const title = $(this).find('td:last-child a').text().trim();
                let link = $(this).find('td:last-child a').attr('href');
                link = "https://atcoder.jp" + link + "?lang=en";

                // Add duration calculation
                const unixTime = new Date(time).getTime(); // UNIX time in milliseconds
                const currentTime = Date.now(); // Current UNIX time in milliseconds
                const duration = Math.floor((unixTime - currentTime) / 1000); // Remove last 3 digits

                upcoming.push({ time: time, title: title, link: link, unixTime, duration });
            });

            $('#contest-table-upcoming .user-blue').each(function () {
                const time = $(this).parent().parent().prev().find('.fixtime-short').text().trim();
                const title = $(this).parent().find('a').text().trim();
                let link = $(this).parent().find('a').attr('href');
                link = "https://atcoder.jp" + link + "?lang=en";

                // Add duration calculation
                const unixTime = new Date(time).getTime(); // UNIX time in milliseconds
                const currentTime = Date.now(); // Current UNIX time in milliseconds
                const duration = Math.floor((unixTime - currentTime) / 1000); // Remove last 3 digits

                beginner.push({ time: time, title: title, link: link, unixTime, duration });
            });

            upcoming.shift(); // Delete first element

            console.log("Contests updated");
        })
        .catch((error) => console.log(error));
}

// Initial update
updateContests();

setInterval(function () {
    updateContests();
}, 1800000);

// Update duration every second
setInterval(function () {
    upcoming.forEach((contest) => {
        contest.duration = Math.floor((contest.unixTime - Date.now()) / 1000); // Update duration
    });
    beginner.forEach((contest) => {
        contest.duration = Math.floor((contest.unixTime - Date.now()) / 1000); // Update duration
    });
}, 1000); // Update interval in milliseconds (1 second)

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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Graceful shutdown on SIGINT or SIGTERM
process.on('SIGINT', () => {
    console.log('Stopping server...');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('Stopping server on SIGTERM...');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});
