'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import style from './nav.module.css'

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }
    // This will allow us to signin using Google and Next-Auth
    setUpProviders()
  }, [])

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

      {/* Desktop Navigation */}
      <div className={style.desktopNav}>
        {session?.user ? (
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
                src={session?.user.image}
                width={37}
                height={37}
                className={style.imgProfile}
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type='button'
                  onClick={() => signIn(provider.id)}
                  className={style.btnSignIn}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className={style.mobileNav}>
        {session?.user ? (
          <div className={style.profileNav}>
            <Image
              src={session?.user.image}
              className={style.imgProfile}
              width={30}
              height={30}
              alt='profile'
              onClick={() => setToggleMenu((prev) => !prev)}
            />
            {toggleMenu && (
              <div className={style.dropdown}>
                <Link
                  href='/profile'
                  className={style.dropdownLink}
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>

                <Link
                  href='/create-prompt'
                  className={style.dropdownLink}
                  onClick={() => setToggleMenu(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type='button'
                  onClick={() => {
                    signOut()
                    setToggleMenu(false)
                  }}
                  className={`${style.btnSignOut} ${style.btnSignOutMobile}`}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={style.btnSignIn}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
