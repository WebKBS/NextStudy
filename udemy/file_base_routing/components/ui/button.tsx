import Link from 'next/link';
import classes from './button.module.css';

function Buttons(props: any) {
  return (
    <Link className={classes.btn} href={props.link}>
      {props.children}
    </Link>
  );
}

export default Buttons;
