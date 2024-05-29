'use client'

import { useRouter } from 'next/navigation';
import UsernameForm from '../../../components/UsernameForm';
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
            <UsernameForm onSubmit={handleUsernameSubmit} />
        </div>
    );
};

export default UsernamePage;