import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Env from "@configs/env";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      displayName?: string;
    }
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: Env.google.clientID,
      clientSecret: Env.google.clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can check if the user is already registered in your database
      // If not, you can create a new user using the information in the `profile` object
      // Then, you can call the `done` function with the user object
      // For example:
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0].value as string,
      };
      done(null, user);
    }
  )
);

// Configure Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: Env.facebook.clientID,
      clientSecret: Env.facebook.clientSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can check if the user is already registered in your database
      // If not, you can create a new user using the information in the `profile` object
      // Then, you can call the `done` function with the user object
      // For example:
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0].value,
      };
      done(null, user);
    }
  )
);

// Configure Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      // Here, you can check if the user is registered in your database
      // If the user is found, you can call the `done` function with the user object
      // If the user is not found or the password is incorrect, you can call the `done` function with an error message
      // For example:
      const user = {
        id: "1",
        email: "user@example.com",
        password: "password",
      };
      if (email === user.email && password === user.password) {
        done(null, user);
      } else {
        done("Invalid email or password");
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  // Here, you can retrieve the user object from your database using the `id`
  // Then, you can call the `done` function with the user object
  // For example:
  const user = {
    id: "1",
    email: "user@example.com",
  };
  done(null, user);
});
