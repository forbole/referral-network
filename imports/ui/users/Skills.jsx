import React, { Component } from 'react';
import { Loading } from '/imports/ui/components/ForboleComponents.jsx';
class Skills extends Component {
    constructor(props){
        super(props);
    }

    render(){
        if (this.props.loading){
            return <Loading />
        }
        else{
            if (!this.props.user.skills){
                return <div><p>{this.props.user.profile.name} has not been endorsed with any skills yet.</p></div>;
            }
            else{
                let skills = this.props.user.skills.map(function(skill, i){
                    return <span className="label label-rose" key={i}>{skill}</span> 
                });
                return <div><p>{this.props.user.profile.name} has been endorsed with the following skills.</p>
            <div className="skills">{skills}</div>
            </div>
            }
        }
    }
}

export default Skills;