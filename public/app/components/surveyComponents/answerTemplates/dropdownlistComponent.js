import React from 'react';
import ListItem from './listItemComponent';

export default class DropDownList extends React.Component {
    render() {
        var listItem = this.props.items;

        listItem = listItem.map(function (a, i) {
            return <ListItem item={a} key={a.id} />
        })

        return (
            <div className="input-group-btn">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select
                </button>
                <div className="dropdown-menu">
                    {listItem}
                </div>
            </div>
        )
    }
}