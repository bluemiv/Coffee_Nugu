import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Button } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default class Nugu extends Component {
    state = {
        buttonText: "뽑기",
        memberList: [],
        clearText: React.createRef(),
        isButtonClick: false,
        result: ""
    }
    render(){
        const { buttonText, memberList, clearText, isButtonClick, result } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.upper}>
                    <Text style={styles.title}>Coffee Nugu</Text>
                    <Text style={styles.subtitle}>내가 쓰려고 만든 뽑기게임</Text>
                </View>

                { !isButtonClick ? (
                <View style={styles.lower}>
                    <View style={styles.contentBox}>
                        <View stlye={styles.inputGroup}>
                            <TextInput
                                ref={clearText}
                                style={styles.input}
                                placeholder="이름 입력"
                                onSubmitEditing={(name) => this._nameWrite(name)}
                                clearButtonMode="always"
                                returnKeyType={"done"} />
                        </View>
                        <ScrollView>
                            <View style={styles.textCenter}>
                                <Text style={styles.memberMessage}>걸리면 남자답게 사는거다!</Text>
                            </View>
                            {this._writeMemberList(memberList)}
                        </ScrollView>
                    </View>

                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPressOut={this._whosLuckyMan}>
                            <View style={styles.buttonContainer}>
                                <AntDesign name={"rest"} size={20} color="white"/>
                                <Text style={styles.buttonText}>뽑기</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={this._clearList}>
                            <View style={styles.buttonContainer}>
                                <FontAwesome name={"trash-o"} size={20} color="white"/>
                                <Text style={styles.buttonText}>다시입력</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                ):(
                <View style={styles.lower}>
                    <View style={styles.resultTextForm}>
                        <Text style={styles.title}>오늘은 당신이 주인공!</Text>
                        <Text style={styles.resultTitle}>{result}</Text>
                        <Text style={styles.title}>축하합니다.</Text>
                    </View>

                    <TouchableOpacity onPressOut={this._retryGame}>
                        <View style={styles.buttonContainer}>
                            <MaterialIcons name={"replay"} size={20} color="white"/>
                            <Text style={styles.buttonText}>다시하기</Text>
                        </View>
                    </TouchableOpacity>
                
                </View>
                )}
            </View>
        );
    };

    _writeMemberList = memberList => {
        var index = 0;
        var memberListView = [];
        memberList.forEach(member => {
            memberListView.push(<Text style={styles.member} key={index++}>{member}</Text>)
        })
        return memberListView;
    }

    _nameWrite = event => {
        this.state.clearText.current.clear();
        
        var name = event.nativeEvent.text;
        this.state.memberList.push(name)
        this.setState({
            memberList: this.state.memberList
        })
    }

    _whosLuckyMan = () => {
        var length = this.state.memberList.length;
        if (length <= 1) {
            alert("2명 이상 입력해야지...\n친구 없는거 티내니?");
            return;
        }
        var random_index = Math.floor(Math.random() * length);
        this.setState({
            isButtonClick: true,
            result: this.state.memberList[random_index]
        })
    }

    _clearList = () => {
        this.setState({
            memberList: [],
        })
    }

    _retryGame = () => {
        this.setState({
            isButtonClick: false,
            result: ""
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    lower: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: "#ffffff",
        fontSize: 38,
    },
    subtitle: {
        color: "#fefefe",
        fontSize: 15,
        marginTop: 20
    },
    contentBox: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: width - 50,
        height: 430,
        marginBottom: 25,
        padding: 10,
        fontSize:38
    },
    inputGroup: {
        flexDirection: "row",
        paddingLeft: 5
    },
    input: {
        color: "#999999",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 20,
        padding: 5
    },
    member: {
        color: "#555555",
        padding: 10,
        fontSize: 20,
        color: "#841584",
        fontWeight: "bold"
    },
    memberMessage:{
        color: "#aaaaaa",
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
    textCenter: {
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#841584",
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 5
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 20,
        paddingLeft: 8
    },
    buttonGroup:{
        flexDirection: "row"
    },
    resultTextForm: {
        padding: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    resultTitle: {
        color: "#841584",
        fontSize: 40,
    },
})