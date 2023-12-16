function validatingfornext(req, res, next) {
  const email = req.body.email;
  const password = req.body.pass;
  const username = req.body.uname;
  console.log(username);
  console.log(email);
  console.log(password);
  const checkemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validemail = checkemail.test(email);

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}<>])[A-Za-z\d!@#$%^&*(),.?":{}<>]{8,}$/;

  const validpattern = passwordPattern.test(password);
  console.log(validemail, validpattern);
  if (validemail && validpattern) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = validatingfornext;
