import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import {
  getUserById,
  getUserEmail,
  registerUser,
} from "../services/user.service.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;

export const initializarPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { confirmPassword } = req.body;

          if (password !== confirmPassword) {
            console.log("No coinciden las contraseñas");
            return done(null, false);
          }
          const user = await getUserEmail(username);

          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }

          req.body.password = createHash(password);

          const newUser = await registerUser({ ...req.body });

          if (newUser) {
            return done(null, newUser);
          }
          return done(null, false);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await getUserEmail(username);
  
          if (!user) {
            console.log("El usuario no existe");
            return done(null, false, { message: "El usuario no existe" });
          }
  
          if (!isValidPassword(password, user.password)) {
            console.log("Las contraseñas no coinciden");
            return done(null, false, { message: "Las contraseñas no coinciden" });
          }
  
          return done(null, user);
        } catch (error) {
          console.error("Error en la estrategia de login: ", error);
          return done(error);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    done(null, user);
  });

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.email;
          let user = await getUserEmail(email);

          if (user) {
            return done(null, user);
          }

          const newUser = {
            name: profile._json.name,
            email,
            password: ".$",
            avatar: profile._json.avatar_url,
            github: true,
          };

          const result = await registerUser({ ...newUser });

          return done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};