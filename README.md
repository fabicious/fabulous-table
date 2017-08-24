# Fabulous-Table

This is a component supporting table component for ember apps. It features sorting and endless scrolling.

[![npm version](https://badge.fury.io/js/fabulous-table.svg)](https://badge.fury.io/js/fabulous-table)
[![Download Total](https://img.shields.io/npm/dt/fabulous-table.svg)](http://badge.fury.io/js/fabulous-table)

The usage may look a little complicated. This is because you can use any template code you would normally use outside of
this component.

## Installation

* `npm install fabulous-table`

## Usage

```handlebars
{{#fabulous-table headers=(array
    (my-hash label='' headerClass='col-2')
    (my-hash label='Surname' headerClass='col-5' orderPath='surname')
    (my-hash label='Firstname' headerClass='col-5' orderPath='firstname')
) orderBy=orderBy
  orderDirection=orderDirection
  changedOrder=(action 'findUsers')
  modelName='user'
  limit=50
  rowAction=(action 'navigateToUser')
  fixedHeader=true
  noSpinner=true
  model=users as |item|}}
    {{#fabulous-cell cellClass='col-2'}}
        {{profile-photo value=item.photo}}
    {{/fabulous-cell}}
    {{#fabulous-cell cellClass='col-5'}}
        {{item.surname}}
    {{/fabulous-cell}}
    {{#fabulous-cell cellClass='col-5'}}
        {{item.firstname}}
    {{/fabulous-cell}}
{{/fabulous-table}}
```

* `headerClass` adds a CSS class to the header of a column.
* `orderPath` defines the key of an item by which this column will sort. If you omit `orderPath` this column is not
sortable.
* `orderBy` specifies the default key by which the table will be sorted on rendering.
* `orderDirection` specifies the default direction for the sorting on rendering.
* `changeOrder` is the action which is called on a click on a header.
* `modelName` is the ember model's name of the records.
* `limit` specifies the maximum amount of items for the initial rendering. Also this enables endless scrolling: This
amount is fetched if you scrolled to bottom.
* `rowAction` is the action which is called on a click on a row.
* `fixedHeader` fixes the header at the top of the table if the table itself will scroll
* `noSpinner` Hides the spinner at the bottom of the page
* `model` contain the records.
* `cellClass` adds a CSS class to each cell of this column.

As you can see the headers are separated from the cells. You can use a different `orderPath` as you use in the cell.

The table provides the normal table layout (it uses ``table`` tags inside) but you can add layout classes like bootstrap
or whatever you are using.