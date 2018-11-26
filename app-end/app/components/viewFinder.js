import React, {
    Component,
    PropTypes,
} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native';
import px2dp from '../common/px2dp';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    viewfinder: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    topLeftEdge: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    topRightEdge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftEdge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomRightEdge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});

class Viewfinder extends Component {
    constructor(props) {
        super(props);
    }

    getBackgroundColor() {
        return ({
            backgroundColor: this.props.backgroundColor,
        });
    }

    getEdgeColor() {
        return ({
            borderColor: this.props.color,
        });
    }

    getSizeStyles() {
        return ({
            height: px2dp(this.props.height),
            width: px2dp(this.props.width),
        });
    }

    getEdgeSizeStyles() {
        return ({
            height: px2dp(this.props.borderLength),
            width: px2dp(this.props.borderLength),
        });
    }

    renderLoadingIndicator() {
        if (!this.props.isLoading) {
            return null;
        }

        return (
            <ActivityIndicator
                animating={this.props.isLoading}
                color={this.props.color}
                size="large"
            />
        );
    }

    render() {
        const thz = this;
        const borderWidth = px2dp(thz.props.borderWidth)
        return (
            <View style={[styles.container, thz.getBackgroundColor()]}>
                <View style={[styles.viewfinder, this.getSizeStyles()]}>
                    <View
                        style={[
              thz.getEdgeColor(),
              thz.getEdgeSizeStyles(),
              styles.topLeftEdge,
              {
                borderLeftWidth: borderWidth,
                borderTopWidth: borderWidth,
              },
            ]}
                    />
                    <View
                        style={[
              thz.getEdgeColor(),
              thz.getEdgeSizeStyles(),
              styles.topRightEdge,
              {
                borderRightWidth: borderWidth,
                borderTopWidth: borderWidth,
              },
            ]}
                    />
                    {thz.renderLoadingIndicator()}
                    <View
                        style={[
             thz.getEdgeColor(),
              thz.getEdgeSizeStyles(),
              styles.bottomLeftEdge,
              {
                borderLeftWidth: borderWidth,
                borderBottomWidth: borderWidth,
              },
            ]}
                    />
                    <View
                        style={[
              thz.getEdgeColor(),
              thz.getEdgeSizeStyles(),
              styles.bottomRightEdge,
              {
                borderRightWidth: borderWidth,
                borderBottomWidth: borderWidth,
              },
            ]}
                    />
                </View>
            </View>
        );
    }
}

export default Viewfinder
