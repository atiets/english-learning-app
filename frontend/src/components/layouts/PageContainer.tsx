type Props = {
  children: React.ReactNode;
};

const PageContainer = ({ children }: Props) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {children}
    </div>
  );
};

export default PageContainer;