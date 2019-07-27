import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'
import { deleteProject } from '../../store/actions/projectActions'

class Dashboard extends Component {
  constructor(props){
    super(props);
  
    this.state = this.props;
    this.handleDelete=this.handleDelete.bind(this);
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState !== nextProps ) {
      return { projects: nextProps.projects };
    }
    else{ 
      return null;
    }
  }
  handleDelete(id){
    this.props.deleteProject(id);
    console.log(id);
    this.props.history.push('/');
  }

 
  render() {
    
    // console.log(this.props);
    const { auth, notifications} = this.props;
    
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={this.state.projects} handleDelete={this.handleDelete.bind(this)}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    
    deleteProject: (id) => dispatch(deleteProject(id))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects', orderBy:['createdAt','desc'] },
    {collection: 'notifications', limit: 3, orderBy:['time','desc']}
  ])
)(Dashboard)
