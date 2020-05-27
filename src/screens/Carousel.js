import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';

const DEVICE_WIDTH = Dimensions.get("window").width;

export default class Carousel extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
        this.scrollRef = React.createRef();
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState(prev => ({
                selectedIndex:
                    prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1
            }), () => {
                this.scrollRef.current.scrollTo({
                    animated: true,
                    x: DEVICE_WIDTH * this.state.selectedIndex,
                    y: 0
                });
            });
        }, 4000);
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    setSelectedIndex = event => {
        const contentOffset = event.nativeEvent.contentOffset;
        const viewSize = event.nativeEvent.layoutMeasurement;

        const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
        this.setState({ selectedIndex });
    }

    render() {
        const { images } = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={{ height: "100%", width: "100%" }}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    onMomentumScrollEnd={this.setSelectedIndex}
                    showsHorizontalScrollIndicator={false}
                    ref={this.scrollRef}
                >
                    {images.map(image => (
                        <Image
                            style={styles.backgroundImage}
                            source={{ uri: image }}
                            key={image}
                        />
                    ))}
                </ScrollView>
                <View style={styles.circleDiv}>
                    {images.map((image, i) => (
                        <View
                            style={[
                                styles.whiteCircle,
                                { opacity: i === selectedIndex ? 0.5 : 1 }
                            ]}
                            key={image}
                            active={i === selectedIndex}
                        />
                    ))}
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: "100%",
        width: Dimensions.get("window").width,
        resizeMode: 'stretch'
    },
    circleDiv: {
        position: "absolute",
        bottom: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 10
    },
    whiteCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: "#fff"
    }
});