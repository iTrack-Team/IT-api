function send(res, data) {
  res.status(200).send(data);
}

function response(res, err, data) {
  if (err) {
    const message = err.message || err.errmsg || err || 'Something goes wrong!';
    send(res, message);
  } else {
    send(res, data);
  }
}

module.exports = response;
