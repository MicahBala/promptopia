'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProvider } from 'next-auth/react'
import style from './nav.module.css'

const Nav = () => {
  const isUserLogedIn = true
  return (
    <nav className={style.navBar}>
      <Link className={style.logoLink} href='/'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
        />
        <p className={style.logoText}>Promptopia</p>
      </Link>

      {/* Mobile Navigation */}
      <div className={style.desktopNav}>
        {isUserLogedIn ? (
          <div className={style.createPrompt}>
            <Link href='/create-prompt' className={style.createPromptLink}>
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className={style.btnSignOut}
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='assets/images/logo.svg'
                width={37}
                height={37}
                className={style.imgProfile}
              />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  )
}

export default Nav
