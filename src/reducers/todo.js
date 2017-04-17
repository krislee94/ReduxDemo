/**
 * Created by air on 2017/4/17.
 */
import React,{
    ListView,
} from 'react-native'

const defaultTodos=[
    {text:'写代码'},
    {text:'写日记'},
    {text:'洗衣服'},
    {text:'做家务'},
]


module.exports = function (state,action) {

        state = state || {
            type:'INITIAL_TODOS',
                todos:[]
            }

        switch (action.type){
            case 'LOAD_TODOS':{

                var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                dataSource = dataSource.cloneWithRows(defaultTodos);

                return{
                    ...state,
                    ...action,
                    todos:defaultTodos,
                    dataSource

                }
            }

            case 'APPEND_TODO':{

                var todos = [...state.todos];
                todos.unshift(action.todo); //unshift 是js语法里的 将参数插入arrayObject的头部，，要添加到尾部用push的方法。unshift直接修改原有的数组。
                dataSource = state.dataSource.cloneWithRows(todos);
                return{
                    ...state,
                    ...action,
                    todos,
                    dataSource,

                }

            }

            case 'SELECT_TODO':{
                var selected = action.selected;
                var todos = [...state.todos];
                var index = todos.indexOf(selected);

                if (todos[index].selected){
                    todos[index] = {text:todos[index].text}
                }
                else{
                    todos[index] = {text:todos[index].text,selected:true}
                }

                dataSource = state.dataSource.cloneWithRows(todos);
                return{
                    ...state,
                    ...action,
                    todos,
                    dataSource,
                }


            }
        }

        return {
            ...state
        }
}