import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NetInfo,
    Navigator,
    TouchableHighlight,
    ScrollView,
    Image,
} from 'react-native';
import { Container, Header, Tabs, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';

import Actualites from './Actualites';
import ProgrammeSalon from './ProgrammeSalon';
import InformationsPratiques from './InformationsPratiques';
import MainTabBar from '../components/MainTabBar';

var GLOBAL = require('../global/GlobalVariables');

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';



const propTypes = {
    articlesInfosContent: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            category: PropTypes.string,
            date: PropTypes.string,
            id: PropTypes.number,
            intro: PropTypes.string,
            title: PropTypes.string,
        }
        )),
    articlesHtmlContent: React.PropTypes.arrayOf(PropTypes.string),
    fetchBackendToUpdateAll: React.PropTypes.func.isRequired,
    infosPratiquesContent: React.PropTypes.shape({
        lieux: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                addr1: PropTypes.string,
                name: PropTypes.string,
                gps_addr: PropTypes.string,
            }
            )),
    }),
    programmeContent: React.PropTypes.object,
    currentlyFetchingContent: React.PropTypes.bool.isRequired,
    goToActualitesDetails: React.PropTypes.func.isRequired,
    goToProgrammeDetails: React.PropTypes.func.isRequired,
};

const defaultProps = {
};


class MainTabView extends Component {
    render() {
        return (
            <ScrollableTabView
                style={{}}
                initialPage={0}
                renderTabBar={() => <MainTabBar />}
                tabBarPosition='bottom'
                tabBarBackgroundColor={GLOBAL.THEME_COLOR}>

                <Actualites
                    tabLabel="Actualites"
                    articlesInfo={this.props.articlesInfosContent}
                    articlesContent={this.props.articlesHtmlContent}
                    fetchBackendToUpdateAll={this.props.fetchBackendToUpdateAll}
                    loading={this.props.currentlyFetchingContent}
                    goToActualitesDetails={(article_info, article_html) => this.props.goToActualitesDetails(article_info, article_html)}
                />

                <ProgrammeSalon
                    tabLabel="ProgrammeSalon"
                    programmeContent={this.props.programmeContent}
                    goToProgrammeDetails={(programmeElement) => this.props.goToProgrammeDetails(programmeElement)}
                />

                <InformationsPratiques
                    tabLabel="InformationsPratiques"
                    textFieldsContent={this.props.infosPratiquesContent}
                    currentlyFetchingContent={this.props.currentlyFetchingContent}
                />

            </ScrollableTabView>
        );
    }
}




MainTabView.propTypes = propTypes;
MainTabView.defaultProps = defaultProps;

export default MainTabView;
