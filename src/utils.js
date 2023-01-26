exports.toJSON = obj => JSON.stringify(obj);

exports.parseURL = req => {
    const urlParts = req.url.split('/');
    const route = urlParts[1];
    const id = urlParts[2];
    return { route, id };
}

exports.onReceivedBody = (req, handler) => {
    let body = "";
    req.on("data", chunk => {
            body += chunk.toString();
        })
        .on("end", () => handler(body));
}