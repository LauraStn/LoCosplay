const extractToken = async (req) => {
    const tokenHeaders = req.headers.authorization
    console.log(tokenHeaders);

    if (tokenHeaders !== undefined || !tokenHeaders) {
        const bearer = tokenHeaders.split(' ')
        const token = bearer[1]
        return token
    }
}

module.exports = { extractToken }


