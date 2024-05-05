import './style.scss';
import { Link } from 'react-router-dom';
import RightArrowIcon from '../../assets/images/right-arrow.png';

const ListItem = ({
  url, 
  label
}: {
  url: string,
  label: string
}) => {
  return (
    <Link to={url} className="list-item">
      {label}

      <img src={RightArrowIcon} alt="Arrow" />
    </Link>
  )
}
export default ListItem;