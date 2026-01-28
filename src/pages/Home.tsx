import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import HeroPreview from '../components/HeroPreview';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pt-20 px-6 pb-32">
      <div className="text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="badge badge-primary badge-outline py-4 px-6 gap-2 font-black italic uppercase tracking-widest animate-bounce">
          <Flame size={16} /> Start Your Streak Today
        </div>

        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
          Commit to <br />
          <span className="text-primary">Your Life</span>
        </h1>

        <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto">
          Track habits, visualize progress, and build the best version of
          yourself through consistent daily commits.
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            to="/register"
            className="btn btn-primary btn-lg rounded-2xl px-8 font-black italic uppercase tracking-tighter gap-3 shadow-xl shadow-primary/20"
          >
            Get Started <ArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="btn btn-ghost btn-lg rounded-2xl px-8 font-black italic uppercase tracking-tighter"
          >
            Login
          </Link>
        </div>
      </div>

      <HeroPreview />
    </div>
  );
};

export default Home;
