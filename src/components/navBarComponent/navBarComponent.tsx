import './navBarComponent.css';

interface NavBarComponentProps {
  title: string
}

function NavBarComponent({ title }: NavBarComponentProps) {
  return (
    <div className="navBar">
      {title}
    </div>
  )
}

export default NavBarComponent;
