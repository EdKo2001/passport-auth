import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import passport from "passport";
import jwt from "jsonwebtoken";

import { IUser, UserModel } from "../models";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
          return done(null, false, {
            message: "Email address already in use.",
          });
        }

        const user = new UserModel();
        user.email = email;
        user.password = await user.generateHash(password);

        await user.save();
        return done(null, user);
      } catch (err) {
        console.error("Error saving user:", err);
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        // check if user with ID exists in database
        const user = await UserModel.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { message: "User not found" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { name, emails } = profile;
        const email = emails[0].value;
        const user = await UserModel.findOne({ email });
        if (user) {
          return done(null, false, {
            message: "This email is already registered.",
          });
        }
        const newUser = await UserModel.create({
          name,
          email,
          password: "12312312",
          type: "social",
          network: "google",
        });
        // Generate JWT token here
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        // Return user and token in the response
        return done(null, { newUser, token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
