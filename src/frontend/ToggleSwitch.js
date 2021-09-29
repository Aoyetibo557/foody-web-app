import React from 'react';
import './ToggleSwitch.css';
import PropTypes from 'prop-types'



function ToggleSwitch({selected, toggleSelected}) {

    return (
        <div className="toggle-container" onClick = {toggleSelected}>
            <div  className={`dialog-button ${selected ? "" : "disabled"}`} >
                {selected ? "CLOSE" : "OPEN"}
            </div>
        </div>
    )
    
}

ToggleSwitch.propTypes = {
    selected: PropTypes.bool.isRequired,
    toggleSelected: PropTypes.func.isRequired

}

export default ToggleSwitch;
