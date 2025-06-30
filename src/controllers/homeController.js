
let getHomePage = (req, res) => {
    return res.render("homepage.ejs");
}

let getAboutMe = (req, res) => {
    return res.render("info/aboutme.ejs");
}

module.exports = {
    getHomePage: getHomePage,
    getAboutMe: getAboutMe,
}