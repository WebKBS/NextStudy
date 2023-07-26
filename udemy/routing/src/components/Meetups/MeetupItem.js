import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

const MeetupItem = ({ image, title, address, description }) => {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3 className={classes.title}>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button>To Favoerites</button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
