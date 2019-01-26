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


import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
    },
    details: {
        alignItems: 'center',
    },
    basis: {
        flexBasis: '66.66%',
    },
    conversion: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    }
});
class PanelItem extends React.Component {

    state = {
        expaned: false
    }

    render() {

        let { cost, classes, tabChanged } = this.props;
        let { expanded } = this.state;

        let shareList = expanded && Object.keys(cost.share).map(name => {
            let share = cost.share[name];
            return <ListItem
                key={name}>
                <ListItemText
                    primary={name}
                    secondary={"übernimmt " + share + "€"}
                />
            </ListItem>;
        });

        let content = expanded && [
            <ExpansionPanelDetails key={1}>

                <div className={classes.basis}>
                    <Typography>
                        {cost.payer.name} bezahlt {cost.price} €
                    </Typography>
                </div>
                {cost.priceSEK && <div className={classNames(classes.conversion, classes.helper)}>
                    <Typography variant="caption">
                        ursprünglich {cost.priceSEK} SEK
            </Typography>
                </div>}
            </ExpansionPanelDetails>,
            <ExpansionPanelDetails key={2}>
                <List>
                    {shareList}
                </List>

            </ExpansionPanelDetails>,
            <Divider key={3} />,
            <ExpansionPanelActions key={4}>
                <Link
                    to={'./edit-' + cost.id}>
                    <Button size="small" color="primary" onClick={() => { tabChanged('edit') }}>
                        ändern
                    </Button>
                </Link>

            </ExpansionPanelActions>];

        return (

            <ExpansionPanel onChange={(event, expanded) => { this.setState({ expanded }); }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{cost.description}</Typography>
                </ExpansionPanelSummary>
                {expanded && content}
            </ExpansionPanel >

        );
    }
}

export default withStyles(styles)(PanelItem);