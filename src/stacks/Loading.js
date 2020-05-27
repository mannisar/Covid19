import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { API } from '../redux/actions/api';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalId: [],
            selectId: 0,
            totalCountry: [],
            arrayData: []
        }
    }

    async componentDidMount() {
        await this.getData()
        await this.timeout(10000);
        await this.getId()
        await this.getCountry()
        await this.mergeData()
        await this.props.navigation.navigate('Statistic', { arrayData: this.state.arrayData })
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        return true;
    }

    async timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async mergeData() {
        for (let i = 0; i < this.state.totalId.length; i++) {
            let obj = {}
            obj.id = i;
            obj.name = this.props.country[i].Country;
            this.state.arrayData.push(obj);
        }
    }

    async getId() {
        const { country } = this.props;
        let countId = []
        for (let i = 0; i < country.length; i++) {
            countId[i] = i
        }
        this.setState({
            totalId: countId
        })
    }

    async getCountry() {
        const { country } = this.props;
        const { totalId, totalCountry } = this.state;
        totalId.map(i => totalCountry.push(country[i].Country))
    }

    async getData() {
        const { dispatch } = this.props;
        dispatch(API())
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#333333" />
                <Text style={styles.text}>PLEASE WAIT...</Text>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333'
    },
    text: {
        fontSize: 30,
        marginBottom: 10,
        color: 'white'
    }
});

mapStateToProps = state => ({
    country: state.api.country
})

export default connect(mapStateToProps)(Loading);