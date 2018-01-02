import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';


// visitedCount
// LastVisitedAt null

export default class AddLink extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: '',
        isOpen: false,
        error: ''
      };
    }
    onSubmit(e) {
    //const url = this.refs.url.value.trim();
    const { url } = this.state;
    //stops page reload
    e.preventDefault();
    
    if(url) {
      
      Meteor.call('links.insert', url, () => (err, res) =>{
        if(!err) {
          this.handleModalClose.bind(this);
        } else {
          this.setState({ error: err.reason });
        }
      });
      //insecure database add below
      //Links.insert({ url, userId: Meteor.userId() });
     // this.refs.url.value = '';
    }
    
  }
  
  onChange(e) {
    this.setState({
      url: e.target.value.trim()

    });
  }
  
  handleModalClose(){
    this.setState({
      isOpen: false, 
      url: '', 
      error: ''})
  }
  
  render() {
    return (
      <div>
      <button className="button" onClick={() => this.setState({isOpen :true})}>+ Add Links</button>
     
      <Modal 
      isOpen={this.state.isOpen} 
      contentLabel="Add Link"
      onAfterOpen={() => this.refs.url.focus()}
      onRequestClose={this.handleModalClose.bind(this)}
      className="boxed-view__box"
      overlayClassName="boxed-view boxed-view--modal"
      ariaHideApp={false}>
      <h1>Add Link</h1>
      {this.state.error ? <p>{this.state.error}</p> : undefined}
      <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
        <input 
        type="text" 
        placeholder="URL"
        ref="url"
        value={this.state.url}
        onChange={this.onChange.bind(this)}/>
        <button className="button">Add Link</button>
        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>
        Cancel
        </button>
      </form>
      
          </Modal>
  
      
      

     
     
      </div>

    );
  }
  
}
    
     /*
      <Modal 
      isOpen={this.state.isOpen} 
      contentLabel="Add Link"
      onAfterOpen={() => this.refs.url.focus()}
      onRequestClose={this.handleModalClose.bind(this)}
      className="boxed-view__box"
      overlayClassName="boxed-view boxed-view--modal"
      ariaHideApp={false}>
      <h1>Add Link</h1>
      {this.state.error ? <p>{this.state.error}</p> : undefined}
      <form onSubmit={this.onSubmit.bind(this)}>
        <input 
        type="text" 
        placeholder="URL"
        ref="url"
        value={this.state.url}
        onChange={this.onChange.bind(this)}/>
        <button>Add Link</button>
        
      </form>
      <button onClick={this.handleModalClose.bind(this)}>
        Cancel
        </button>
          </Modal>
         */