
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    BackAndroid
} from 'react-native';
import { Container, Header, Tabs, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import myTheme from '../themes/myTheme';
var HTMLView = require('react-native-htmlview')

var GLOBAL = require('../global/GlobalVariables');
const TITLE_MAX_CHAR_LIMIT = 40;


/*
Charger la page et enlever le dessus => marche pas, la page devrait etre chargee en entier dabord
charger lapage deja coupée dans le json et la lire
*/


const propTypes = {
    article_infos: React.PropTypes.shape({
        category: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.number,
        intro: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
    article_html: PropTypes.string.isRequired,
};

const defaultProps = {
    // text: 'Hello World',
};



class ActualitesDetails extends Component {
    constructor(props) {
        super(props);
        this._addBackAndroidListener(props);
    }

    _addBackAndroidListener(props) {
        BackAndroid.addEventListener('hardwareBackPress', function () {
            props.goBackOneScene();
            return true
        });
    }

    get_title_string() {
        var title = this.props.article_infos.title;
        if (title.length > TITLE_MAX_CHAR_LIMIT) {
            return ((title.substring(0, TITLE_MAX_CHAR_LIMIT - 3)) + '...');
        } else {
            return title;
        }
    }

    NONONONONOrenderSourceIfExists(article) {
        if (article.source != "") {
            return (
                <View>
                    <View style={styles.separator} />
                    <Text style={styles.text}>Sources:</Text>
                    <HTMLView value={article.source} stylesheet={styles} />
                </View>
            );
        }
    }

    render() {
        let article = this.props.article_infos;
        let article_html = this.props.article_html;
        console.log('---- ArRTICLE: ', article);

        return (

            <Container theme={myTheme}>
                <Header>
                    <Button transparent onPress={() => this.props.goBackOneScene()}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title><Text style={styles.headerTitle}>{this.get_title_string()}</Text></Title>
                </Header>

                <View style={styles.main}>
                    <WebView
                        source={{ html: article_html }}
                        // source={ require('../static/html/actualites-test2.html')}
                        style={{ borderWidth: 1, flex: 1 }}
                        // scalesPageToFit={true}                     
                        renderError={() => (
                            <View style={styles.pageError}>
                                <Text style={styles.textPageError}>
                                    Toutes nos excuses, il semble qu'une erreur a eu lieu au chargement de l'article...
                                </Text>
                            </View>)}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 15,
    },
    main: {
        // margin: 10,
        // marginTop: 12,
        marginBottom: 3,
        flex: 1,
    },
    pageError: {
        margin: 10,
    },
    textPageError: {
        color: 'red',
        fontSize: 16,
    },
    text: {
        color: 'black'
    },
    categoryAndDate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryWithSquare: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'yellow',
    },
    categorySquare: {
        // color:'red',
        fontSize: 7,
        marginRight: 5,
        marginTop: 0,
    },
    category: {
        // fontStyle: 'italic',
        color: 'black',
        fontSize: 14,
        // backgroundColor:'orange',
    },
    date: {
        fontSize: 15,
        color: 'black'
    },
    titreArticle: {
        marginTop: 12,
        marginBottom: 12,
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        // textAlign:'center',
    },
    introArticle: {
        marginBottom: 5,
        color: 'black',
    },
    author: {
        textAlign: 'right',
        color: 'black',
        fontStyle: 'italic',
        marginTop: 10,
    },
    separator: {
        marginTop: 15,
        marginBottom: 8,
        height: 1,
        backgroundColor: 'black',
        marginLeft: 30,
        marginRight: 30,
    },
    h2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
    },
    ul: {
        marginBottom: 10,
        color: 'black',
    },
    p: {
        color: 'black',
    },
    li: {
        color: 'black',
    },
    b: {
        color: 'black',
        fontWeight: 'bold',
    },
    em: {
        color: 'black',
        fontStyle: 'italic',
    },
});





ActualitesDetails.propTypes = propTypes;
ActualitesDetails.defaultProps = defaultProps;

export default ActualitesDetails;