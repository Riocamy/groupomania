module.exports = (req, res, next) => {
  // Verification du mot de passe avec RegExp
  function validPass(password) {
    let validPass = RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/);
    let test = validPass.test(password);
    if (test) {
      next()
    } else {
      res.status(400).json({
        message: 'Mot de passe requiert 6 caractères, un nombre, une majuscule.'
      });
    }
    return test
  }
  validPass(req.body.password);
};