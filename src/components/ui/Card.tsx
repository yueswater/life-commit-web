import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title: string;
}

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-xl p-4 transition-all duration-300">
      <div className="card-body items-center text-center gap-8">
        <h2 className="text-3xl font-bold text-base-content">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default Card;