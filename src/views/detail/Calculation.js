import React from 'react';

import GUVItem from './GUVItem';



class Calculation extends React.Component {


    render() {

        console.log();

        return (

            <div>
                {this.props.costCentre.chargings.map(charge => {
                    return <GUVItem charge={charge} />
                })}
            </div>

        );
    }
}

export default Calculation;