import React from 'react';
import ListItem from './listItemComponent';

export default class DropDownList extends React.Component {
    render() {
        var listItem = this.props.items;

        listItem = listItem.map(function (a, i) {
            return <ListItem item={a} key={a.id} />
        })

        return (
            <select className="form-control">
                {listItem}
            </select>
        )
    }
}