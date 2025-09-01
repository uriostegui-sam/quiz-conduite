const TitleComponent = (props: { title?: string }) => {
  return (
    <h2 className="text-center text-3xl font-semibold text-cyan-700">
      {props.title}
    </h2>
  );
};

export default TitleComponent;