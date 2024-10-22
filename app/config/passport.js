const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

function init(passport) {
  // Configure the local strategy for username and password login
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Check if the email exists
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "No User Found!" });
          }

          // Compare passwords
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            return done(null, user, { message: "Logged in successfully" });
          }
          return done(null, false, {
            message: "Invalid username or password!",
          });
        } catch (err) {
          return done(err); // Pass any errors to done
        }
      }
    )
  );

  // Serialize the user into the session
  passport.serializeUser((user, done) => {
    done(null, user._id); // Store user ID in session
  });

  // Deserialize the user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(new Error("User not found")); // Handle case where user is not found
      }
      done(null, user); // Pass user object back
    } catch (err) {
      done(err); // Handle any errors
    }
  });
}

module.exports = init;
