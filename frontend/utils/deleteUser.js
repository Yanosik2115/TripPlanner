import { connectToDatabase } from '/database';
import User from '@models/user';

const removeUserByEmail = async (email) => {
    try {
        await connectToDatabase();
        const result = await User.deleteOne({ email: email });

        if (result.deletedCount === 0) {
            console.log('No users found with the given email.');
        } else {
            console.log('User deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

// Usage
removeUserByEmail('user@example.com');