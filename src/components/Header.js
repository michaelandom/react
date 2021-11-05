import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router';
const Header = ({title,showAdd,showAddTask}) => {
    const location=useLocation();
    
    return (
        <header className='header'>
            <h1 >
                {title}
            </h1>
            {location.pathname==="/" &&
                <Button text={ showAdd ? "close":"Add"} color={ showAdd ? 'red': 'blue' } onClick={showAddTask}/>}
            
        </header>
    )
}
// const headingStyle={
//     color: 'blue',backgroundColor:'red'
// }
Header.defaultProps ={
    title: 'task is here',
}

Header.prototype={
    title : PropTypes.string
}

export default Header
