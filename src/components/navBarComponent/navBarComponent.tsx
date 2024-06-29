interface NavBarComponentProps {
  title: string
}

function NavBarComponent({ title }: NavBarComponentProps) {
  return (
    <div className="w-full h-10 flex justify-center items-center text-white bg-backgroundNavBar">
      {title}
    </div>
  )
}

export default NavBarComponent;
