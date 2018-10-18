import React, {
  Component,    
} from 'react';
import Svg, {
  Rect,G,Path, Text, TSpan, Defs, ClipPath, Circle, Image, Symbol, Use
} from 'react-native-svg';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import * as constVal from '../constant/constant'
const width = constVal.dimens.DEV_WIDTH - 90;
const height = constVal.dimens.DEV_HEIGHT - 150;
const flIndicatorSize = 25;
const flFontsize = 15;
const fontsize = 9;
class RoundOverflowRect extends Component{    
    static propTypes = {
        data : PropTypes.any
    }
    state = {
        floor : 1
    }
    constructor(props){
        super(props);
        this.onLoadFloor = this.onLoadFloor.bind(this);
        this.onLoadFloorIndicater = this.onLoadFloorIndicater.bind(this);
    }    
    onLoadFloorIndicater(){  
        //      
        return (
            <G>
                <Rect x = "11" y = {height - 75} width = "31" rx="4" ry="4" height = "85" stroke={constVal.colors.MBLUE} strokeWidth = "1" fill="white" onPress={() => alert('Floor 1')}></Rect>
                   
                    <Rect x="14" y={height - 73} width={flIndicatorSize} height={flIndicatorSize} 
                        rx="4" ry="4" fill={ this.state.floor === 1 ? constVal.colors.MTEXT : constVal.colors.MBLUE } 
                        onPressIn={() => this.setState({floor : 1})}/> 
                        <Text x="25" y={height - 73 + 17} textAnchor="middle" fontSize={flFontsize} fontWeight="bold" fill="white">1</Text>
                    <Rect x="14" y={height - 73 + 28} width={flIndicatorSize} height={flIndicatorSize} 
                        rx="4" ry="4" fill={ this.state.floor === 2 ? constVal.colors.MTEXT : constVal.colors.MBLUE } 
                        onPressIn={() => this.setState({ floor : 2 })}/> 
                        <Text x="25" y={height - 73 + 17 + 28} textAnchor="middle" fontSize={flFontsize} fontWeight="bold" fill="white">2</Text>
                    <Rect x="14" y={height - 73 + 56} width={flIndicatorSize} height={flIndicatorSize} 
                        rx="4" ry="4" fill={ this.state.floor === 3 ? constVal.colors.MTEXT : constVal.colors.MBLUE } 
                        onPressIn={() => this.setState({ floor : 3 }) }/> 
                        <Text x="25" y={height - 73 + 56 + 17} textAnchor="middle" fontSize={flFontsize} fontWeight="bold" fill="white">3</Text>
            </G>
        )

    }
    onLoadFloor(){
        
        return (
            <Svg
                width={constVal.dimens.DEV_WIDTH}
                height={constVal.dimens.DEV_HEIGHT}
            >
            <G>
                <Text x = "20" y ="15">{`Floor ${this.state.floor}`}</Text>
                {/* Total react */}
                <Rect
                    x="20"
                    y="20"
                    // ry="40"
                    // rx="40"
                    width={width}
                    height={height}
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                    onPress = {() => alert('Front Door')}
                />


                    {/* Bound 2 */}
                    <Rect
                        x={width/3*2 + 20}
                        y={20}
                        width={width/3}
                        height={height}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Bound 2 room')}
                    />
                    {/* Master room */}
                    <Rect
                        x={20}
                        y={20}
                        width={width/3}
                        height={height/3}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Master room')}
                    />
                    {/* Study */}
                    <Rect
                        x={width/3 + 20}
                        y={20}
                        width={width/3}
                        height={height/3}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Study room')}
                    />
                    {/* Small Bathroom1 */}
                        <Rect
                        x={width/3 * 2 - 30}
                        y={height/3 - 30}
                        width={50}
                        height={50}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Small Bath room')}
                    />
                    {/* Garage */}
                    <Rect
                        x={20}
                        y={height/3 *2}
                        width={width/3 + 30}
                        height={height/3 + 20}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        
                    />
                    {/* Large Bathroom2 */}
                    <Rect
                        x={20}
                        y={height/3 + 20}
                        width={width/3}
                        height={height / 3 - 20}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Large Bath room')}
                    />
                    {/* TV Room */}
                    <Rect
                        x={width/3*2 + 20}
                        y={20}
                        width={width/3}
                        height={height/2.5}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('TV room')}
                    />
                    {/* Kitchen */}
                    <Rect
                        x={width/3*2 + 20}
                        y={height/2.5}
                        width={width/3}
                        height={height/6}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Kitchen room')}
                    />
                    {/* Dining Room */}
                    <Rect
                        x={width/3*2 + 20}
                        y={height/6 + height/2.5}
                        width={width/3}
                        height={height/6}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Dining room')}
                    />

                    {/* Sun Room */}
                    <Rect
                        x={width + 20}
                        y={height/6 + height/2.5}
                        width={50}
                        height={height/6}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Sun room')}
                    />
                    {/* Living Room */}
                    <Rect
                        x={width/3*2 + 20}
                        y={height/3 + height/2.5}
                        width={width/3}
                        height={height - height/3 - height/2.5 + 20}
                        fill="white"
                        stroke="black"
                        strokeWidth="0.5"
                        onPress = {() => alert('Living room')}
                    />
                    {/* Master room title*/}
                    <Text
                        x={width/6 + 20}
                        y={height/6 + 20}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Master Room</Text>
                    {/* Large Bath room title*/}
                    <Text
                        x={width/6 + 20}
                        y={height/6 * 3 + 20}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Bath Room</Text>

                    {/* Garage room title*/}
                    <Text
                        x={width/6 + 20}
                        y={height/6 * 5 + 20}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Garage</Text>

                    {/* Study room title*/}
                    <Text
                        x={width/2 + 20}
                        y={height/6 + 20}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Study Room</Text>

                    {/* Small bath room title*/}
                    <Text
                        x={width/2 + 45}
                        y={height/3}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Bath Room</Text>
                        {/* Front door title*/}
                    <Text
                        x={width/2 + 35}
                        y={height/6 * 5 + 20}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Front Door</Text>

                    {/* TV room title*/}
                    <Text
                        x={width/6 * 5 + 20}
                        y={height/6 + 20}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >TV Room</Text>
                    {/* Kitchen room title*/}
                    <Text
                        x={width/6 * 5 + 20}
                        y={height/2 }
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Kitchen</Text>
                    {/* Dining room title*/}
                    <Text
                        x={width/6 * 5 + 20}
                        y={height/6 * 4}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Dining Room</Text>
                    {/* Living title*/}
                    <Text
                        x={width/6 * 5 + 20}
                        y={height/6 * 5 + 20}
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                    >Living Room</Text>

                    {/* Sun Room Title*/}
                    <Text
                        x={width + 45}
                        y={height/6 * 4}  
                        // x={width + 20}
                        // y={height/6 + height/2.5}                  
                        textAnchor="middle"                    
                        fontSize={fontsize}
                        fill="black"
                        
                    >Sun Room</Text>
                        <Defs>
                            <ClipPath id="clip">
                                <Circle 
                                cx="70" 
                                cy="-95" 
                                r="25"                 
                                stroke="purple"
                                strokeWidth="2.5"
                                fill="none"
                                />
                            </ClipPath>
                        </Defs>
                        <Image
                            x="45"
                            y="-120"
                            width="50"
                            height="50"
                            href={{uri : this.props.data[0].photo === undefined ? 'https://randomuser.me/api/portraits/med/men/4.jpg' : this.props.data[0].photo}}
                            clipPath="url(#clip)"
                            preserveAspectRatio = 'xMidYMid slice'
                            
                        />
                        {
                            this.onLoadFloorIndicater()
                        }
                    </G>
            </Svg>
        )
    }
  render() {   
      Toast.show(this.state.floor.toString());      
      return this.onLoadFloor()
  }
}

export default RoundOverflowRect;


