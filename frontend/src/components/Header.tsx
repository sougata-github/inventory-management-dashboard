interface Props {
  name: string;
}

const Header = ({ name }: Props) => {
  return <h1 className="text-2xl font-semibold">{name}</h1>;
};

export default Header;
