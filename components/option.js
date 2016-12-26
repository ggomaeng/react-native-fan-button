/**
 * Created by ggoma on 12/27/16.
 */
import React, {Component} from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet
} from 'react-native';

import {Ionicons} from '@exponent/vector-icons';

export default class Option extends Component {
    state = {
        move: new Animated.ValueXY(0),
        scale: new Animated.Value(1)
    };

    validRange = {
        x0: 0,
        x1: 0,
        y0: 0,
        y1: 0
    };

    componentDidMount() {
        const {number, size} = this.props;
        setTimeout(() => this.refs.view.measure((a, b, w, h, px, py) => {
            //center is (px + width) / 2, (py + h) /2
            let cX = (px + w) / 2, cY = (py + h) /2;
            let offset = {x: 0, y: 0};
            switch (number) {
                case 0:
                    offset = {x: -(size - size/4 * number), y: 0};
                    break;
                case 1:
                    offset = {x: -(size - size/2 * number), y: -(size - size/6 * number)};
                    break;
                case 2:
                    offset = {x: (size - size/4 * number), y: -(size - size/12 * number)};
                    break;
                case 3:
                    offset = {x: (size), y: 0};

            }
            this.validRange.x0 = offset.x + px;
            this.validRange.x1 = offset.x + w + px;
            this.validRange.y0 = offset.y + py;
            this.validRange.y1 = offset.y + h + py;
        }), 0);
    }

    hoverOn(x, y) {
        if(this.verify(x, y)) {
            console.log('hovering on:', this.props.number);
            this.zoomIn();
            return true;
        }

        this.zoomOut();
        return false;
    }

    releasedOn(x, y) {
        this.zoomOut();
        if(this.verify(x, y)) {
            console.log('released on:', this.props.number);

        }
    }

    zoomIn() {
        const {color, icon, number} = this.props;
        this.props.updateIcon(color, icon);
        this.props.updateIndex(number);
        Animated.spring(
            this.state.scale,
            {toValue: 1.2}
        ).start();
    }

    zoomOut() {

        Animated.spring(
            this.state.scale,
            {toValue: 1}
        ).start();

    }

    verify(x, y) {
        if((x > this.validRange.x0 && x < this.validRange.x1) && (y > this.validRange.y0 && y < this.validRange.y1)) {
            return true;
        }

        return false;
    }

    logRange() {
        console.log(this.validRange)
    }

    _getStyle() {
        const {size, color} = this.props;
        const offset = size/4;
        const {scale, move} = this.state;
        return {
            width: size/2, height: size/2, backgroundColor: color, borderRadius: size/4,
            justifyContent: 'center', alignItems: 'center',
            transform: [
                {
                    translateX: move.x
                },
                {
                    translateY: move.y
                },
                {
                    scale
                }
            ]
        }
    }

    moveOut() {
        const {number, size} = this.props;
        let offset = {x: 0, y: 0};
        switch (number) {
            case 0:
                offset = {x: -(size - size/4 * number), y: 0};
                break;
            case 1:
                offset = {x: -(size - size/2 * number), y: -(size - size/6 * number)};
                break;
            case 2:
                offset = {x: (size - size/4 * number), y: -(size - size/12 * number)};
                break;
            case 3:
                offset = {x: (size), y: 0};

        }

        Animated.timing(
            this.state.move,
            {toValue: offset}
        ).start(() => {
            console.log('i should measure now');
        });
    }

    moveIn() {
        Animated.timing(
            this.state.move,
            {toValue: 0}
        ).start();
    }

    render() {

        const {size, icon} = this.props;
        const offset = size/4;

        return (
            <View ref='view' style={{position: 'absolute', top: offset, left: offset}}>
                <Animated.View style={this._getStyle()}>
                    <Ionicons name={icon} color='white' size={size/5}/>
                </Animated.View>
            </View>
        )
    }
}