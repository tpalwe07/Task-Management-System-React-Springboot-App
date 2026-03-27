const Title = ({ title }: { title: React.ReactNode | string }) => {
  return (
    <>
      <h1 className='page-title'>{title}</h1>
    </>
  );
};
Title.displayName = 'Title';

export default Title;
