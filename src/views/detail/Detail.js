import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route } from 'react-router-dom';

import ReactPullToRefresh from 'react-pull-to-refresh';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Cost from './Cost';
import Calculation from './Calculation';
import Edit from './Edit';


import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }

});


class Detail extends React.Component {

    state = {
        costCentre: {},
        loading: true,
        activeTab: 'cost'
    }

    handleTabChange = (event, value) => {
        this.props.history.push('./' + value);
        this.setState({ ...this.state, activeTab: value });
    };

    componentDidMount() {
        const { costId, tab } = this.props.match.params

        fetch('/api/costCentres/' + costId, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ costCentre: data, loading: false, activeTab: tab });
            });
    }

    handleRefresh = () => {
        this.setState({ ...this.state, loading: true });
        const { costId, tab } = this.props.match.params
        fetch('/api/costCentres/' + costId, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ costCentre: data, loading: false, activeTab: tab });
            });
    }

    render() {

        const { loading, costCentre } = this.state;
        const { classes, theme } = this.props;
        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
        };


        let tabbar = (<Tabs
            value={this.props.match.params.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >

            <Tab label="Kosten" value="cost" />

            <Tab label="Verechnung" value="calculation" />

        </Tabs>);

        return (
            <div ><AppBar position="sticky">
                <Toolbar variant="dense">

                    <Typography variant="h6" color="inherit">
                        {costCentre.name}
                    </Typography>
                </Toolbar>
            </AppBar>
                <ReactPullToRefresh

                    onRefresh={this.handleRefresh}
                    style={{ position: 'relative', top: '-50px', padding: '-50px', }}
                    distanceToRefresh={150}
                    loading={
                        <div style={{ textAlign: 'center' }}>
                            <RefreshIcon />
                            <Typography>Pull to refresh</Typography>
                        </div>
                    }>





                    {loading &&
                        <React.Fragment>
                            <Dialog open={true}>
                                <div style={{ margin: '10px' }}>
                                    <Grid container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                        spacing={16}>
                                        <Grid item>
                                            <CircularProgress />
                                        </Grid>
                                        <Grid item>
                                            Loading...
                                    </Grid>
                                    </Grid>
                                </div>
                            </Dialog>
                        </React.Fragment>}

                    {costCentre.costs &&
                        <React.Fragment>

                            <Switch>
                                <Route exact path='/costcentre/:costId/cost' render={routeProps => tabbar} />
                                <Route exact path='/costcentre/:costId/calculation' render={routeProps => tabbar} />

                            </Switch>

                            <Divider />

                            <Switch>
                                <Route exact path='/costcentre/:costId/cost' render={routeProps => {
                                    return <Cost costCentre={costCentre} tabChanged={(tab)=>{
                                        this.setState({...this.state, activeTab:tab});
                                    }}/>;
                                }} />
                                <Route exact path='/costcentre/:costId/calculation' render={routeProps => {
                                    return <Calculation costCentre={costCentre} />;
                                }} />
                                <Route exact path='/costcentre/:costId/edit-:positionId' render={routeProps => {
                                    return <Edit costCentre={costCentre} {...routeProps} />;
                                }} />

                            </Switch>



                        </React.Fragment>}
                </ReactPullToRefresh>
                <Zoom
                    in={!loading && this.state.activeTab === 'cost'}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${this.state.activeTab === 'cost' ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab className={classes.fab} color={'primary'}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Detail);