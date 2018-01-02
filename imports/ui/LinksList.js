import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move'

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          links: []  
        };
    }
    //lifecycle method fires after the render
    //calls an internal render
    componentDidMount(){
        console.log('componeentDidMount');
        this.linksTracker = Tracker.autorun(() => {
        //subscribe to the published data
        Meteor.subscribe('links');
        const links = Links.find({
            visible: Session.get('showVisible')
        }).fetch();
        this.setState({ links });
});
    }
    
    //lifecycle method fires after component is removed
    componentWillUnmount(){
        console.log('componentWillUnmount Linkslist');
        this.linksTracker.stop();
    }
    
    renderLinksListItems() {
        // 
        
        if (this.state.links.length === 0) {
            return (
                <div className="item">
                <p className="item__status-message">No Links Found</p>
                </div>
                );
        }
        
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
            // return <p key={link._id}>{link.url}</p>
        
        });
    }
    
    render(){
        return (
            <div>
            <FlipMove maintainContainerHeight={true}>
                {this.renderLinksListItems()}
            </FlipMove>
            </div>
            );
    }
};