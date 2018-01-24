# Fabulous-Table

This is a component supporting table component for ember apps. It features sorting and endless scrolling.

[![npm version](https://badge.fury.io/js/fabulous-table.svg)](https://badge.fury.io/js/fabulous-table)
[![Download Total](https://img.shields.io/npm/dt/fabulous-table.svg)](http://badge.fury.io/js/fabulous-table)

The usage may look a little complicated. This is because you can use any template code you would normally use outside of
this component. You even could use another fabulous table inside a cell of your first usage of fabulous table.

## Installation

`yarn add fabulous-table` (or `npm install fabulous-table`)

## Usage

```handlebars
{{#fabulous-table headers=(array
    (hash label='' headerClass='user-image-header')
    (hash label='Surname' orderPath='surname')
    (hash label='Firstname' orderPath='firstname')
) orderBy=orderBy
  orderDirection=orderDirection
  changedOrder=(action 'findUsers')
  modelName='user'
  limit=50
  rowAction=(action 'navigateToUser')
  fixedHeader=true
  noSpinner=true
  model=users as |item|}}
    {{#fabulous-cell cellClass='user-image'}}
        {{profile-photo value=item.photo}}
    {{/fabulous-cell}}
    {{#fabulous-cell}}
        {{item.surname}}
    {{/fabulous-cell}}
    {{#fabulous-cell}}
        {{item.firstname}}
    {{/fabulous-cell}}
{{/fabulous-table}}
```

* `headerClass` adds a CSS class to the header of a column. (String)
* `orderPath` defines the key of an item by which this column will sort. If you omit `orderPath` this column is not
sortable. (String)
* `orderBy` specifies the default key by which the table will be sorted on rendering. (String)
* `orderDirection` specifies the default direction for the sorting on rendering. (String)
* `changeOrder` is the action which is called on a click on a header. ('asc' or 'desc')
* `modelName` is the ember model's name of the records. (String)
* `limit` specifies the maximum amount of items for the initial rendering. Also this enables endless scrolling: This
amount is fetched if you scrolled to bottom. (Number)
* `rowAction` is the action which is called on a click on a row. (`(action 'actionName')`)
* `fixedHeader` fixes the header at the top of the table if the table itself will scroll (`true` or `false`)
* `noSpinner` Hides the spinner at the bottom of the page (`true` or `false`)
* `model` contain the records. (Object)
* `cellClass` adds a CSS class to each cell of this column. (String)

As you can see the headers are separated from the cells. You can use a different `orderPath` as you use in the cell.

The table provides the normal table layout (it uses ``table`` tags inside) but you can add layout classes like bootstrap
or whatever you are using.
