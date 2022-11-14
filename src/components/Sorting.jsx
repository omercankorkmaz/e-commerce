import React, { useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';
import { selectTable, setFilter } from '../redux/tableSlice';

const useStyles = createUseStyles({
    sorting: {
        flex: '0 0 auto',
        width: '18.5rem',
        marginTop: '2.398rem',
        marginRight: '1rem',
        '& .sorting-header': {
            color: 'var(--secondary-text-color)',
        },
        '& .sorting-wrapper': {
            marginTop: '.75rem',
            marginBottom: '1.5rem',
            backgroundColor: 'var(--primary-white)',
            padding: '1.5rem',
            height: '11.5rem',
            borderRadius: '2px',
            '& .field-radiobutton:last-child': {
                marginBottom: 0,
            },
        },
    },
});

const Sorting = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const table = useSelector(selectTable);

    const sortingTypes = [
        { key: 'plh', name: 'Price low to high', field: 'price', order: 1 },
        { key: 'phl', name: 'Price high to low', field: 'price', order: -1 },
        { key: 'dno', name: 'New to old', field: 'added', order: -1 },
        { key: 'don', name: 'Old to new', field: 'added', order: 1 },
    ];

    useEffect(() => {
        dispatch(setFilter(sortingTypes[0]));
    }, []);

    return (
        <div className={classes.sorting}>
            <span className="sorting-header">Sorting</span>
            <div className="sorting-wrapper">
                {sortingTypes.map((sortingType) => (
                    <div key={sortingType.key} className="field-radiobutton">
                        <RadioButton
                            inputId={sortingType.key}
                            name="sortingType"
                            value={sortingType}
                            onChange={(e) => dispatch(setFilter(e.value))}
                            checked={table.sorting.key === sortingType.key}
                        />
                        <label htmlFor={sortingType.key}>
                            {sortingType.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sorting;
