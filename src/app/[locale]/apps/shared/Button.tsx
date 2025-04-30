interface ButtonProps {
  children: React.ReactNode;
  type: 'primary' | 'alternative';
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, type, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        type === 'primary'
          ? 'bg-slate-950 text-white'
          : 'bg-[#EDF4F6] text-[#00516b]'
      } rounded-3xl px-5 py-[15px] flex items-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
