import React, { Component } from 'react';

// Externals
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
    Button, IconButton,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';

// Shared components
import { SearchInput } from 'components';

// Material icons
import {
    Delete as DeleteIcon, Filter8Sharp
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Toolbar extends Component {
    render() {
        const { classes, className, selectedUsers, buttonAdd, filters, filterValue, onChangeFilter } = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <div className={rootClassName}>
                <div className={classes.row}>
                    {this.props.placeholder && (
                        <SearchInput
                            className={classes.searchInput}
                            placeholder={this.props.placeholder}
                            onChange={this.props.onChange}
                        />
                    )}
                    <span className={classes.spacer} />
                    {selectedUsers?.length > 0 && (
                        <IconButton
                            className={classes.deleteButton}
                            onClick={this.handleDeleteUsers}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                    {filters && (
                        <FormControl className={classes.formControl} style={{ marginRight: 20 }}>
                            <InputLabel id="demo-controlled-open-select-label">Filter</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                onChange={e => onChangeFilter(e, "filterValue")}
                                native
                                value={filterValue}
                            >
                                {filters.map((e) =>
                                    <option value={e.value}>{e.text}</option>
                                )
                                }
                            </Select>
                        </FormControl>
                    )}
                    {buttonAdd && (
                        <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            onClick={this.props.onClick}
                        >
                            {buttonAdd}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Toolbar);
