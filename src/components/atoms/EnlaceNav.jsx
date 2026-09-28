function EnlaceNav(props) {
  return (
    <a href={props.href} className="enlace-nav" onClick={props.alHacerClick}>
      {props.texto}
    </a>
  );
}
export default EnlaceNav;