'use strict';

//Reference: https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
//Reference: https://www.raywenderlich.com/247-react-native-tutorial-building-android-apps-with-javascript

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    Linking,
} from 'react-native';
import {Header, ListItem} from "react-native-elements";
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = '11f5a557061c349f92722d986a62af8072bc1f21';

type Props = {};
export default class Repositories extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        }
    }

    componentDidMount(){
        axios.get('https://api.github.com/users/jamesyang1025/repos')
            .then(response => {
                this.setState({
                    isLoading: false,
                    data: response.data,
                });
            })
            .catch(error => this.setState({
                isLoading: false,
                message: 'Get request failed ' + error
            }));
    }

    renderItem = ({item}) => (
        <ListItem
            title={
                <View style={{flex: 1}}>
                    <Text style={styles.repoName}>{item.name}</Text>
                </View>
            }
            subtitle={
                <View style={{flex: 1}}>
                    <Text style={styles.ownerName}>{item.owner.login}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            }
            onPress={() => Linking.openURL(item.html_url)}
        />
    );

    keyExtractor = (item) => item.name;

    render(){
        if(this.state.isLoading){
            return (
                <View style={{ flex: 1}}>
                    <Header
                        centerComponent={{ text: 'Repositories', style: styles.header }}
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1}}>
                <Header
                    centerComponent={{ text: 'Repositories', style: styles.header }}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        color: '#fff',
    },
    repoName: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    ownerName: {
        fontSize: 18,
    },
    description: {
        fontSize: 18,
    }
});