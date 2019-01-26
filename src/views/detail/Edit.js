import React from 'react';





class Edit extends React.Component {


    render() {
        const { positionId } = this.props.match.params
        if (!positionId) {
            return <div />;
        }
        const { costCentre } = this.props;
        let position = costCentre.costs.filter(element => element.id === positionId)[0];;


        return (

            <div>
                Edit
            </div>

        );
    }
}

export default Edit;