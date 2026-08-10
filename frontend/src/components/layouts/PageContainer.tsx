type Props = {
  children: React.ReactNode;
};

const PageContainer = ({ children }: Props) => {
  return <div className="page-container page-enter">{children}</div>;
};

export default PageContainer;
