import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import clientPromise from '../../../../utils/db';
import { use } from 'bcrypt/promises';
import { randomInt } from 'crypto';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDatabase();
        // check if user already exists
        const userExists = await User.findOne({ email: user.email });

        console.log(userExists)

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          console.log("debugggg")
          await User.create({
            email: user.email,
            username: user.name.replace(' ', '').toLowerCase() + randomInt(1000, 9999),
            image: user.image,
          });
        }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
