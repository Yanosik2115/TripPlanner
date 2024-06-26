'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    const [toggleDropdown, setToggleDropdown] = useState(false);

    return (<nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image
                src='/assets/images/logo.svg'
                alt='Promptopia logo'
                width={30}
                height={30}
                className={'object-contain'}
            ></Image>
            <p className={'logo_text'}>Promptopia</p>
        </Link>

        {/*Desktop nav*/}

        <div className={'sm:flex hidden'}>
            {session?.user ? (<div className={'flex gap-3 md:gap-5'}>
                <Link href={'/create-prompt'} className={'black_btn'}>
                    Create Post
                </Link>

                <button type={'button'} onClick={signOut} className={'outline-btn'}>
                    Log Out
                </button>

                <Link href={'/profile'}>
                    <Image
                        src={session.user.image}
                        alt={'dupa'}
                        width={37}
                        height={37}
                        className={'rounded-full'}
                    ></Image>
                </Link>
            </div>) : (
                <div className='flex-between space-x-1'>
                    <Link href='/login'>
                        <button
                            type={'button'}
                            key={'provider.name'}
                            className={'black_btn'}
                        >
                            Log In
                        </button>
                    </Link>
                    <Link href='/signup'>
                        <button
                            type={'button'}
                            key={'provider.name'}
                            className={'black_btn'}
                        >
                            Sign In
                        </button>
                    </Link>
                </div>

            )}
        </div>

        {/*Mobile nav*/}

        <div className={'sm:hidden flex relative'}>
            {session?.user ? (<div className={'flex'}>
                <Image
                    src={session?.user.image}
                    alt={'dupa'}
                    width={37}
                    height={37}
                    className={'rounded-full'}
                    onClick={() => {
                        setToggleDropdown((prev) => !prev);
                    }}
                ></Image>

                {toggleDropdown && (<div className={'dropdown'}>
                    <Link
                        href={'/profile'}
                        className={'dropdown_link'}
                        onClick={() => {
                            setToggleDropdown(false);
                        }}
                    >
                        My profile
                    </Link>
                    <Link
                        href={'/create-prompt'}
                        className={'dropdown_link'}
                        onClick={() => {
                            setToggleDropdown(false);
                        }}
                    >
                        Create Prompt
                    </Link>
                    <button
                        type={'button'}
                        onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                        }}
                        className={'mt-5 w-full black_btn'}
                    >
                        Sign Out
                    </button>
                </div>)}
            </div>) : (<div className='flex-between space-x-1'>
                <Link href='/login'>
                    <button
                        type={'button'}
                        key={'provider.name'}
                        className={'black_btn'}
                    >
                        Log In
                    </button>
                </Link>
                <Link href='/signup'>
                    <button
                        type={'button'}
                        key={'provider.name'}
                        className={'black_btn'}
                    >
                        Sign In
                    </button>
                </Link>
            </div>)}
        </div>
    </nav>);
};

export default Nav;
