import React from 'react';


import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { Link } from 'react-router-dom';


class PanelItem extends React.Component {


    render() {

        let { costCentre } = this.props;

        let participants = costCentre.participants.reduce((currentValue, element) => {
            return currentValue + element.name + " ";
        }, [])

        return (

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{costCentre.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {costCentre.description} mit {participants}
                    </Typography>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Link
                        to={'/costcentre/' + costCentre.id + '/cost'}>
                        <Button size="small" color="primary">
                            öffnen
          </Button>
                    </Link>
                </ExpansionPanelActions>
            </ExpansionPanel>

        );
    }
}

export default PanelItem;