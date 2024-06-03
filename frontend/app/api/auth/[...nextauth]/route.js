import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import clientPromise from '../../../../utils/db';
import bcrypt from 'bcryptjs';
import { error } from 'next/dist/build/output/log';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {

          try {
            await connectToDatabase();

            const user = await User.findOne({ email: credentials.email }).select('+password');
            if (!user) {
              throw new Error('No user found');
            }

            console.log('user', user);

            const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

            if (!isPasswordMatch) {
              throw new Error('Password does not match');
            }

            return user;
          } catch (error) {
            console.error('Error finding user:', error);
          }
        },
      },
    ),
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

      console.log('signIn', account.provider);

      if (account.provider === 'credentials') {
        console.log('credentialdasdasds', credentials);
        return true; // Already handled in authorize callback
      }

      try {
        await connectToDatabase();
        // check if user already exists
        const userExists = await User.findOne({ email: user.email });

        console.log({ user: userExists });
        console.log({ credentials: credentials });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: user.email,
            username: user.email.split('@')[0].replace(' ', '').toLowerCase(),
            image: user.image,
            firstName: '',
            lastName: '',
            password: '',
          });
          //
          return { redirect: '/profile/setup' };
        }


        return { redirect: '/' };
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    register: '/signup',
    // signOut: '/login',
    error: '/login/error',
    // verifyRequest: '/login',
    // newUser: null,
  },
});

export { handler as GET, handler as POST };
