import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CategoryCard.css';


function CategoryCard({src,img, name, onClick}) {
    const [clicked, setClicked] = useState(false);

    // const history = useHistory();

    // const handleClick = () => {
    //     history.push(`/shop${src}`);
    // }
    return (
        <Link onClick = {onClick} className={ clicked === true ? "cat__card active" : "cat__card" }>
            <img className="cat__card-img" src={img} alt={name}/>
            <h4>{name}</h4>
        </Link>
        // to={`${src}`}
    )
}

export default CategoryCard
