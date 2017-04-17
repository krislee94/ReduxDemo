/**
 * Created by air on 2017/4/17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
TouchableOpacity,
Dimensions,
TextInput,
ListView,
} from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default class List extends Component{
    constructor(props){
        super(props);

        this.state ={
            text:'',
            placeholder:'写下你要添加的内容',
        }

    }
    // 加载数据
    componentDidMount(){

        console.log('执行了。');
        const {loadTodos} = this.props.actions;
        loadTodos();
        console.log('取得了数据');
    }
    appendTodoList(){
        const text = this.state.text;
        const { appendTodo } = this.props.actions;
        appendTodo(text);
        this.setState({
            text:'',
        })
    }

    renderFirst(){
        return(
            <View style={styles.header}>
            <TextInput
                value={this.state.text}
                placeholder={this.state.placeholder}
                onChangeText={(text)=>this.setState({text})}
                style={styles.ti_size}
            />
            <TouchableOpacity onPress={this.appendTodoList.bind(this)} >
                <Text style={styles.t_size}>添加</Text>

            </TouchableOpacity>

                </View>
        );
    }

    renderRow(dataRow){
        const {selectTodo} = this.props.actions;
        console.log('1111111111111111111111111111'+dataRow);
        return(
            <View>
                <Text style={dataRow.selected ? styles.todoTextDone :styles.todoText}>{dataRow.text}</Text>
                <TouchableOpacity onPress={() => selectTodo(dataRow)}>
                    { dataRow.selected ?

                        <Text style={styles.success}>完成</Text>

                        : <Text style={styles.pendding}>待办</Text> }
                </TouchableOpacity>

            </View>
        );
    }

    renderList(){
        const {todo} = this.props.state;
        return(
            <ListView
                style={styles.container_ListView}
                dataSource={todo.dataSource}
                renderHeader={this.renderFirst.bind(this)}
                renderRow = {this.renderRow.bind(this)}
            />
        )
    }

    renderIndicator(){
        return(
            <View style={styles.init_data}>
                <Text>数据加载中</Text>
            </View>
        );
    }

    render(){

        const { todo } = this.props.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                { todo.type != 'INITIAL_TODOS' ? this.renderList() : this.renderIndicator() }

            </View>

        );

    }
}
const styles = StyleSheet.create({
    container: {
        marginTop:35,

    },
    header:{

        flexDirection:'row',
        justifyContent:'space-between',
        height:0.16*fullHeight,

    },
    ti_size:{
      width:0.75*fullWidth,
        height:0.05*fullHeight,
        borderWidth:0.7,
        borderRadius:0.25,
    },
    t_size:{
      fontSize:21,
        color:'gray',
    },
        todoText: {
        fontSize: 16,
        color: '#666666',
    },
        todoTextDone: {
        fontSize: 16,
        color: '#999999',
        textDecorationColor: '#999999',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    success: {
        color: 'green',
    },
    pendding: {
        color: 'blue',
    },
    container_ListView: {
        flex: 1,
        marginTop: 20,
    },
    init_data:{
      marginTop:0.2*fullHeight,
    },

});