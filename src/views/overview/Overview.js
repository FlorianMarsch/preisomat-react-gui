import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import PanelItem from './PanelItem';

class Overview extends React.Component {

    state = {
        costCentres: [],
        loading: true
    }

    componentDidMount() {
        fetch('/api/costCentres', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ costCentres: data, loading: false });
            });
    }

    render() {

        const { loading, costCentres } = this.state;
        const list = costCentres.map((costCentre) => {
            return <PanelItem costCentre={costCentre} key={costCentre.id} />
        });


        return (
            <div >
                <AppBar position="sticky">
                    <Toolbar variant="dense">

                        <Typography variant="h6" color="inherit">
                            Preis-o3-mat
                    </Typography>
                    </Toolbar>
                </AppBar>
                {loading &&
                    <React.Fragment>
                        <LinearProgress />
                        <div >
                            <Typography color="textSecondary" align="center">
                                Loading
                            </Typography>
                        </div>
                    </React.Fragment>}
                {!loading && list}
            </div>
        );
    }
}

export default Overview;