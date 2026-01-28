import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title: string;
}

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="card w-full max-w-md bg-[#1d232a] shadow-2xl p-4">
      <div className="card-body items-center text-center gap-8">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Card;
