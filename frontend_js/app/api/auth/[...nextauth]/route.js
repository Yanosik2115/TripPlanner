import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
require('dotenv').config();

import { connectToDatabase } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDatabase();
    } catch (error) {}
  },
});

export { handler as GET, handler as POST };
