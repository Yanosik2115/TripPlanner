import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share writing prompts and stories.
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI - Power Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is a platform for writing prompts and stories. We use AI to
        generate prompts and stories. You can also create your own prompts and
        stories.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
