import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import RNRestart from 'react-native-restart';

import Carousel from './Carousel';

class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevention: [
                "https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/carousel%2FStay%20Home.jpg?alt=media&token=ed1ca1ac-acfa-4f19-8aa4-60ccfd188975",
                "https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/carousel%2FPhysical%20Distancing.jpg?alt=media&token=e27fad3e-30d1-4b99-82d3-0e65e7d8b957",
                "https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/carousel%2FHand%20Wash.jpg?alt=media&token=5638d723-006e-4c72-a4b4-684679bf80fe",
                "https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/carousel%2FMasker.jpg?alt=media&token=0a8b3213-aff3-461c-aace-b41c24c4cc9d",
            ],
            arrayData: this.props.route.params.arrayData,
            selectId: 0
        }
        this.onRefresh = this.onRefresh.bind(this)
    }

    parsingNumber(num) {
        var currency = '';
        var numrev = num.toString().split('').reverse().join('');
        for (var i = 0; i < numrev.length; i++) if (i % 3 === 0) currency += numrev.substr(i, 3) + '.';
        return '' + currency.split('', currency.length - 1).reverse().join('');
    }

    onRefresh() {
        RNRestart.Restart();
    }

    render() {
        console.disableYellowBox = true;
        const { prevention, arrayData, selectId } = this.state;
        const { loading, global, country } = this.props;
        const LoadingGetApiGlobal = () => {
            if (loading === true) {
                return (
                    <>
                        <View style={[styles.global_content, { paddingTop: 6 }]}>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>New Confirmed</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FConfirmed%20Icon.png?alt=media&token=070e2071-af3a-4ade-a68d-76e880fcc31a' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(global.NewConfirmed)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>New Deaths</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FDeath%20Icon.png?alt=media&token=181d8218-b715-4925-8835-5d13ba6a5dd8' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(global.NewDeaths)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>New Recovered</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FRecovered%20Icon.png?alt=media&token=75c9a438-dd9e-4024-97e8-8126bf31d189' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(global.NewRecovered)}</Text>
                            </View>
                        </View>
                        <View style={styles.global_content}>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>Total Confirmed</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FConfirmed%20People.png?alt=media&token=1f694321-2bbe-43b9-ac53-24f4e7559f52' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(global.TotalConfirmed)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>Total Deaths</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FDeath%20People.png?alt=media&token=077d4082-08df-4e4c-bdc8-b5ee5f90b924' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(global.TotalDeaths)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>Total Recovered</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FRecovered%20People.png?alt=media&token=babece89-2a7d-468e-87e7-89676f944ee2' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(global.TotalRecovered)}</Text>
                            </View>
                        </View>
                    </>
                )
            } else {
                return (
                    <>
                        <View style={styles.loading}>
                            <Text style={styles.loading_text}>GETTING DATA..</Text>
                            <ActivityIndicator size="large" color="#333333" />
                            <TouchableOpacity style={styles.refresh} onPress={this.onRefresh}><Text style={styles.refresh_text}>REFRESH</Text></TouchableOpacity>
                        </View>
                    </>
                )
            }
        }
        const LoadingGetApiCountry = () => {
            if (loading === true) {
                return (
                    <>
                        <View style={[styles.global_content, { paddingTop: 6 }]}>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>New Confirmed</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FConfirmed%20Icon.png?alt=media&token=070e2071-af3a-4ade-a68d-76e880fcc31a' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(country[selectId].NewConfirmed)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>New Deaths</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FDeath%20Icon.png?alt=media&token=181d8218-b715-4925-8835-5d13ba6a5dd8' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(country[selectId].NewDeaths)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>New Recovered</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FRecovered%20Icon.png?alt=media&token=75c9a438-dd9e-4024-97e8-8126bf31d189' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(country[selectId].NewRecovered)}</Text>
                            </View>
                        </View>
                        <View style={styles.global_content}>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>Total Confirmed</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FConfirmed%20People.png?alt=media&token=1f694321-2bbe-43b9-ac53-24f4e7559f52' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(country[selectId].TotalConfirmed)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>Total Deaths</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FDeath%20People.png?alt=media&token=077d4082-08df-4e4c-bdc8-b5ee5f90b924' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(country[selectId].TotalDeaths)}</Text>
                            </View>
                            <View style={styles.image_dimension}>
                                <Text style={styles.image_text}>Total Recovered</Text>
                                <Image style={styles.image_show} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/covid19-e1e5c.appspot.com/o/icon%2FRecovered%20People.png?alt=media&token=babece89-2a7d-468e-87e7-89676f944ee2' }} />
                                <Text style={[styles.image_text, { letterSpacing: 0.5 }]}>{this.parsingNumber(country[selectId].TotalRecovered)}</Text>
                            </View>
                        </View>
                    </>
                )
            } else {
                return (
                    <>
                        <View style={styles.loading}>
                            <Text style={styles.loading_text}>GETTING DATA..</Text>
                            <ActivityIndicator size="large" color="#333333" />
                            <TouchableOpacity style={styles.refresh} onPress={this.onRefresh}><Text style={styles.refresh_text}>REFRESH</Text></TouchableOpacity>
                        </View>
                    </>
                )
            }
        }
        return (
            <>
                <StatusBar backgroundColor="#333333" />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.header_text}>COVID-19</Text>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={styles.content}>
                            <View style={styles.carousel_col}>
                                <Carousel images={prevention} />
                            </View>
                            <View style={styles.global_col}>
                                <View style={styles.global_header}>
                                    <Text style={styles.global_header_text}>GLOBAL</Text>
                                </View>
                                <LoadingGetApiGlobal />
                            </View>
                            <View style={styles.country_col}>
                                <View style={styles.country_header}>
                                    <Text style={styles.country_header_text}>COUNTRY</Text>
                                </View>
                                <Picker
                                    style={{ height: 50, width: '100%', alignItems: 'center', alignContent: 'center' }}
                                    selectedValue={selectId}
                                    onValueChange={(itemValue) =>
                                        this.setState({ selectId: itemValue })
                                    }>
                                    {this.state && arrayData.map((item, index) => {
                                        return (
                                            <Picker.Item key={index} value={item.id} label={item.name} />
                                        )
                                    })}
                                </Picker>
                                <LoadingGetApiCountry />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 57
    },
    loading_text: {
        fontSize: 30,
        marginBottom: 10
    },
    refresh: {
        marginTop: 16,
        backgroundColor: '#333333',
        borderRadius: 8
    },
    refresh_text: {
        fontSize: 24,
        color: 'white',
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333'
    },
    header_text: {
        color: 'white',
        fontSize: 28
    },
    content: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    carousel_col: {
        flex: 1,
        height: 210
    },
    global_col: {
        flex: 1,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        borderColor: '#58595b',
        borderWidth: 0.1,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: 'white'
    },
    global_header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderColor: 'gray',
        borderBottomWidth: 0.2
    },
    global_header_text: {
        fontSize: 24,
        padding: 8,
        color: 'white'
    },
    global_content: {
        flex: 1,
        flexDirection: 'row',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 8
    },
    country_col: {
        flex: 1,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        borderColor: '#58595b',
        borderWidth: 0.1,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: 'white'
    },
    country_header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderColor: 'gray',
        borderBottomWidth: 0.2
    },
    country_header_text: {
        fontSize: 24,
        padding: 8,
        color: 'white'
    },
    country_content: {
        flex: 1,
        flexDirection: 'row',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 8
    },
    image_dimension: {
        flex: 1,
        height: (Dimensions.get('screen').width - 120) / 2,
        width: (Dimensions.get('screen').width - 120) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image_text: {
        color: 'black'
    },
    image_show: {
        width: 65,
        height: 65,
        marginVertical: 8,
        resizeMode: 'stretch',
        backgroundColor: 'transparent'
    }
})

mapStateToProps = state => ({
    loading: state.api.loading,
    global: state.api.global,
    country: state.api.country
})

export default connect(mapStateToProps)(Statistic);