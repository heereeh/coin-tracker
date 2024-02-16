interface IProps {
  title: string;
  content: string | number;
}

export default function SingleInfo(props: IProps) {
  return (
    <>
      <div className="text-center">
        <div className="text-xs">{props.title.toUpperCase()} :</div>
        <div>{props.content}</div>
      </div>
    </>
  );
}
