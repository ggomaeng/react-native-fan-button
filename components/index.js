/**
 * Created by ggoma on 12/27/16.
 */
import React, {Component} from 'react';
import {
    Animated,
    PanResponder,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

const BUTTON_SIZE = 100;

import colors from './colors';
import Option from './option';
import {Ionicons} from '@exponent/vector-icons';

export default class FanButton extends Component {
    state = {
        scale: new Animated.Value(1),
        pan: new Animated.ValueXY(0),
        opacity: new Animated.Value(1),
        bgColor: 'black',
        icon: 'md-add',
        options: [
            {id: 0, color: colors.blue, icon: 'md-home'},
            {id: 1, color: colors.green, icon: 'md-globe'},
            {id: 2, color: colors.yellow, icon: 'md-map'},
            {id: 3, color: colors.red, icon: 'md-happy'}
            ],
    };


    px = 0;
    py = 0;

    componentWillMount() {
        let panMover = Animated.event([
            null, {dx: this.state.pan.x, dy: this.state.pan.y},
        ]);

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e,g) => {
                const event = e.nativeEvent;
                this._hoverOn(event.pageX, event.pageY);
                // console.log(event.pageX, event.pageY);
                return panMover(e, g);
            },
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setValue({x: 0, y: 0});
                console.log('pressing!');
                this._showOptions();
                this._onPressIn();
            },
            onPanResponderRelease: (e, g) => {
                const event = e.nativeEvent;
                this._releasedOn(event.pageX, event.pageY);
                this._hideOptions();
                this._onPressOut();
            }
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.view.measure((a, b, w, h, px, py) => {
                this.px = px; this.py = py;
                console.log(this.px, this.py);
            })
        }, 0)
    }

    _onPressIn() {
        Animated.timing(
            this.state.scale,
            {toValue: 1.3}
        ).start();
        Animated.timing(
            this.state.opacity,
            {toValue: 0, duration: 500}
        ).start();
    }

    _onPressOut() {
        Animated.timing(
            this.state.scale,
            {toValue: 1}
        ).start();
        Animated.timing(
            this.state.opacity,
            {toValue: 1, duration: 500}
        ).start();
    }

    _hoverOn(x, y) {
        const {options} = this.state;
        options.map((option) => {
            this.refs[option.id].hoverOn(x, y);
        })
    }



    _releasedOn(x, y) {
        const {options} = this.state;
        options.map((option) => {
            this.refs[option.id].releasedOn(x, y);
        })
    }

    _updateIcon(color, icon) {
        this.setState({bgColor: color, icon});
    }

    _updateIndex(index) {
        this.setState({selected: index});
        this.props.updateIndex(index);
    }

    _showOptions() {
        const {options} = this.state;
        options.map((option) => {
            this.refs[option.id].moveOut();
            this.refs[option.id].logRange();
        })
    }

    _hideOptions() {
        const {options} = this.state;
        options.map((option) => {
            this.refs[option.id].moveIn();

        })
    }

    _renderOptions() {
        const {options} = this.state;
        return options.map((option, i) => {
            return <Option key={i} ref={option.id} updateIcon={this._updateIcon.bind(this)} updateIndex={this._updateIndex.bind(this)}
                           icon={option.icon} color={option.color} number={option.id} size={BUTTON_SIZE} />
        })
    }

    _getStyle() {
        const size = BUTTON_SIZE;
        const {scale, opacity} = this.state;
        return {
            width: size, height: size, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: size/2,
            borderWidth: 1,
            opacity,
            transform: [{scale : scale}]
        }
    }

    _getStyle2() {
        const size = BUTTON_SIZE;
        const {bgColor} = this.state;
        return {
            position: 'absolute', top: 0, width: size, height: size, justifyContent: 'center',
            alignItems: 'center', backgroundColor: bgColor, borderRadius: size/2,
        }
    }

    render() {
        const size = BUTTON_SIZE;
        const {icon} = this.state;
        return (
            <View ref='view' style={{justifyContent: 'center', alignItems: 'center'}}>
                {this._renderOptions()}
                <Animated.View style={this._getStyle2()}>
                    <Ionicons name={icon} color='white' size={size/3}/>
                </Animated.View>
                <Animated.View style={this._getStyle()} {...this._panResponder.panHandlers}>
                    <Image source={require('./assets/google.jpg')} style={{width: BUTTON_SIZE * 7/10, height: BUTTON_SIZE * 7/10, borderRadius: BUTTON_SIZE * 3.5/10}}/>
                </Animated.View>
            </View>
        )
    }
}
