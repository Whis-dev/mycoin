import { useState, useEffect } from 'react';
import { Route, useHistory, useLocation } from "react-router-dom"

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';

import MarketCondition from './MarketCondition';
import Bookmark from './Bookmark';

const tabData = [
    {
        value: 'market_condition',
        label: '가상자산 시세 목록'
    },
    {
        value: 'bookmark',
        label: '북마크 목록'
    }
]

const List = () => {
    const [tabValue, setTabValue] = useState('market_condition');
    const location = useLocation();
    const history = useHistory();

    const handleChangeLocation = (event, value) => {
        setTabValue(value);
        history.push(`/${value}`)
    }

    const ListTabs = () => {

        return (
            <Tabs
                centered
                value={tabValue}
                onChange={handleChangeLocation}
            >
                {
                    tabData.map((data, i) => {
                        return <Tab key={i} {...data} />
                    })
                }
            </Tabs>
        )
    }

    const checkLocation = () => {
        const { pathname } = location;
        const paths = pathname.split('/');
        const value = !!paths[1]
            ? paths[1]
            : 'market_condition';

        handleChangeLocation(null, value);
    }

    useEffect(() => {
        checkLocation()
    },[]);

    return (
        <>
            <Container>
                <ListTabs />
                <Grid container>
                    <Grid item xs={12} align="center">
                        <Route path='/market_condition' render={() => <MarketCondition />} />
                        <Route path='/bookmark' render={() => <Bookmark />} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default List;