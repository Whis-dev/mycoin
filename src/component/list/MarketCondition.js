import { useState, useEffect } from "react";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import StarIcon from '@material-ui/icons/Star';

import Loader from '../common/Loader';
import { baseUrl } from '../../config/api';
import { menus } from '../../config/menus';
import useLocalStorage from '../../hooks/useLocalStorage';
import { generateCurrency, percentage } from '../../utils/format';

const currencyData = {
    'krw': '₩',
    'usd': '$'
}

const useStyles = makeStyles(() => ({
    select: {
        margin: '1rem',
        minWidth: 120,
        textAlign: 'center'
    }
}))

const MarketCondition = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listSee, setListSee] = useState('total');
    const [currency, setCurrency] = useState('krw')
    const [perPage, setPerPage] = useState(50);
    const [page, setPage] = useState(1);
    const [listData, setListData] = useState([]);

    const c = useStyles();

    const getCoinMarketList = async (
        vs_currency,
        per_page,
        page
    ) => {
        const options = {
            method: 'GET',
            url: baseUrl + '/coins/markets',
            params: {
                vs_currency,
                order: 'market_cap_rank',
                per_page,
                page,
                price_change_percentage: '1h,24h,7d'
            }
        }

        try {
            setIsLoading(true);
            const { data } = await axios(options);
            console.log(data)

            page === 1
                ? setListData(data)
                : setListData(listData => [...listData, ...data]);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCoinMarketList(currency, perPage, page);
    }, [currency, perPage, page])

    const generateTableRows = () => {
        return listData.map(({
            id,
            name,
            symbol,
            current_price,
            price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,
            price_change_percentage_7d_in_currency,
            total_volume,
            market_cap_rank
        }) => (
            <TableRow key={market_cap_rank}>
                <TableCell>
                    <IconButton>
                        <StarIcon />
                    </IconButton>
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{symbol}</TableCell>
                <TableCell>{generateCurrency(current_price, currencyData[currency])}</TableCell>
                <TableCell>{percentage(price_change_percentage_1h_in_currency)}</TableCell>
                <TableCell>{percentage(price_change_percentage_24h_in_currency)}</TableCell>
                <TableCell>{percentage(price_change_percentage_7d_in_currency)}</TableCell>
                <TableCell>{generateCurrency(total_volume, currencyData[currency])}</TableCell>
            </TableRow>
        )
        )
    }

    return (
        isLoading
            ? <Loader />
            :
            (
                <Box>
                    <Box style={{ textAlign: 'right' }}>
                        <Select
                            className={c.select}
                            value={listSee}
                            onChange={(event) => setListSee(event.target.value)}
                        >
                            {
                                menus.listSee.map(({label, value}) => {
                                    return(
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Select
                            className={c.select}
                            value={currency}
                            onChange={(event) => setCurrency(event.target.value)}
                        >
                            {
                                menus.currency.map(({label, value}) => {
                                    return(
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Select
                            className={c.select}
                            value={perPage}
                            onChange={(event) => setPerPage(event.target.value)}
                        >
                            {
                                menus.perPage.map(item => {
                                    return(
                                        <MenuItem key={item} value={item}>{item}개 보기</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>자산</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>1H</TableCell>
                                    <TableCell>24H</TableCell>
                                    <TableCell>7D</TableCell>
                                    <TableCell>24H Volume</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {generateTableRows()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box>
                        <Button onClick={() => setPage(page + 1)}>+ 더보기</Button>
                    </Box>
                </Box>
            )
    )
}

export default MarketCondition;