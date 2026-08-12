import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import User from "./models/User";

export const authOptions = {
  providers: [
    // =========================
    // GOOGLE LOGIN
    // =========================
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // =========================
    // EMAIL + PASSWORD LOGIN
    // =========================
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials: any) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        });

        if (!user || !user.password) {
          return null;
        }

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!valid) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.profilePicture || null,
        };
      },
    }),
  ],

  // =========================
  // SESSION
  // =========================
  session: {
    strategy: "jwt" as const,
  },

  // =========================
  // CALLBACKS
  // =========================
  callbacks: {
    // -------------------------
    // SIGN IN
    // -------------------------
    async signIn({ user, account }: any) {
      // Google authentication
      if (account?.provider === "google") {
        await connectDB();

        if (!user.email) {
          return false;
        }

        // Look for an existing Smart Campus account
        let existingUser = await User.findOne({
          email: user.email,
        });

        // Create a new account if this Google email
        // doesn't already exist
        if (!existingUser) {
          existingUser = await User.create({
            name: user.name || "Student",
            email: user.email,
            role: "student",
            profilePicture: user.image || "",
          });
        } else {
          // If the account already exists, don't change
          // its existing role.
          if (user.image && !existingUser.profilePicture) {
            existingUser.profilePicture = user.image;
            await existingUser.save();
          }
        }

        // Attach MongoDB user information to NextAuth user
        user.id = existingUser._id.toString();
        user.role = existingUser.role;

        return true;
      }

      // Credentials login
      return true;
    },

    // -------------------------
    // JWT
    // -------------------------
    async jwt({ token, user }: any) {
      // First login
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // Always retrieve the latest user role
      // from MongoDB using the email in the token.
      if (token.email) {
        await connectDB();

        const dbUser = await User.findOne({
          email: token.email,
        }).select("_id role profilePicture");

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;

          if (dbUser.profilePicture) {
            token.picture = dbUser.profilePicture;
          }
        }
      }

      return token;
    },

    // -------------------------
    // SESSION
    // -------------------------
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture || null;
      }

      return session;
    },

    // -------------------------
    // REDIRECT
    // -------------------------
    async redirect({ url, baseUrl }: any) {
      // Allow relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Allow URLs belonging to our application
      if (url.startsWith(baseUrl)) {
        return url;
      }

      // Otherwise stay on our application
      return baseUrl;
    },
  },

  // =========================
  // CUSTOM LOGIN PAGE
  // =========================
  pages: {
    signIn: "/login",
  },
};