import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='home-section'>
      <h1 className='home-heading'>
        Discover & Share
        <br className='home-break' />
        <span className='home-span'>AI powered prompts</span>
      </h1>
      <p className='home-desc'>
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share prompts.
      </p>

      <Feed />
    </section>
  )
}

export default Home
