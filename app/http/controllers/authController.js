const passport = require("passport");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

function authController() {
  return {
    login(req, res) {
      
      res.render("auth/login");
  

    },
    
    postLogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          return res.redirect("/");
        });
      })(req, res, next);
    },

    register(req, res) {
      res.render("auth/register");
    },

    async postRegister(req, res) {
      const { name, email, password } = req.body;

      // Validate request
      if (!name || !email || !password) {
        req.flash("error", "All fields are required!");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      // Check if the user already exists
      try {
        const userExists = await User.exists({ email });
        if (userExists) {
          req.flash("error", "Email is already in use!");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      } catch (err) {
        req.flash("error", "Something went wrong while checking for existing user.");
        return res.redirect("/register");
      }

      // Hashing the password
      try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.redirect("/"); // Final response
      } catch (err) {
        req.flash("error", "Something went wrong while creating the user!");
        return res.redirect("/register");
      }
    },

    logout(req, res, next) {
      req.logOut((err) => {
        if (err) {
          req.flash("error", "Something went wrong while logging out.");
          return next(err);
        }
        
        req.flash("success", "You have logged out successfully.");
        return res.redirect("/login");
      });
    }
  };
}

module.exports = authController;
