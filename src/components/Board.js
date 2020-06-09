import React, {useEffect, useState} from 'react';
import MaterialTable, {MTableToolbar} from 'material-table';
import {Button, Grid, TextField, Typography} from "@material-ui/core";

import {forwardRef} from 'react';

import {BOARD_PAGE_SIZE} from '../static/constant';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {clickRow} from "../store/modules/board/action";
import {makeStyles} from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Board({pageNumber, pageSize, selectedData, columns, data, accountId, handleChangePageNumber, handleChangePageSize, handleRowClick, handleWriteButtonClick}) {
    const classes = useStyles();


    return (
        <MaterialTable
            onChangePage={handleChangePageNumber}
            onChangeRowsPerPage={handleChangePageSize}
            icons={tableIcons}
            columns={columns}
            data={selectedData}
            options={{
                search: false,
                paginationType: "stepped",
                pageSize: BOARD_PAGE_SIZE
            }}
            onRowClick={(event, rowData) => {
                handleRowClick(rowData);
            }}
            components={{
                Toolbar: props => (
                    <Grid container>
                        <Grid item xs={6}>
                            {typeof accountId != 'undefined' && accountId != null ?
                                <Grid className={classes.margin}>
                                    <Button color="primary" size="medium" variant="outlined"
                                            onClick={() => handleWriteButtonClick()}>글쓰기</Button>
                                </Grid>
                                : null
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" justify="flex-end" direction="row">
                                <Grid className={classes.margin}>
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <SearchIcon/>
                                        </Grid>
                                        <Grid item>
                                            <TextField id="input-with-icon-grid"/>
                                        </Grid>
                                        <Grid>
                                            <Button color="primary" size="medium">Search</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }}
        />
    );
}
