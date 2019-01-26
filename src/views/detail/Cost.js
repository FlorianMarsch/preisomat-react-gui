import React from 'react';



import { withStyles } from '@material-ui/core/styles';
import PanelItem from './PanelItem';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        margin: theme.spacing.unit * 2
    }, summary: {
        ...theme.mixins.gutters(),
        padding: 0,
        marginBottom: theme.spacing.unit * 2
    },
});

class Cost extends React.Component {

    state = {
        list: [],
        total: 0
    }

    componentDidMount() {
        const { costCentre, tabChanged } = this.props;

        const { list, total } = this.state;

        const panelItems = costCentre.costs.map((cost) => {
            return <PanelItem cost={cost} key={cost.id} tabChanged={tabChanged} />
        });


        const calced = costCentre.costs.map(cost => cost.price).reduce((currentValue, element) => {
            return currentValue + element;
        }, 0);


        this.setState({ list: panelItems, total: calced });
    }



    render() {

        const { classes } = this.props;
        const { list, total } = this.state;



        return (

            <div className={classes.root}>
                <Typography className={classes.summary}>Insgesamt {total} €</Typography>
                {list.reverse()}

            </div>

        );
    }
}

export default withStyles(styles)(Cost);