'use client'

import { useRouter } from 'next/navigation';
import UserSetupForm from '../../../components/UserSetupForm';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const UsernamePage = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const user = session?.user;
    const handleUsernameSubmit = (username) => {
        console.log('Username submitted:', username);
        router.push('/');
    };

    return (
        <div>
            <h1>Choose a Username</h1>
            <UserSetupForm onSubmit={handleUsernameSubmit} />
        </div>
    );
};

export default UsernamePage;