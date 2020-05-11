import React, { Component } from 'react';

import classes from './Project.module.css';

class Project extends Component {
    state = {
        reveal: false,
    }

    showDetail = () => {
        this.setState({ reveal: true });
    }

    closeDetail = () => {
        this.setState({ reveal: false });
    }

    render() {
        const show = this.state.reveal ? classes.Show : null;
        return ( 
            <article className={["dib br2 relative ba dark-gray b--black-10 mv3 shadow-4", classes.Project].join(' ')}>
                <div className="hide-child relative center v-mid" style={{maxHeight:'300px', overflow:'hidden'}}>
                    <div className="child absolute dib w-100 h-100 bg-black-40 pointer" style={{top: 0, left: 0, zIndex:2}} onClick={() => this.showDetail()}>
                        <span className="white dtc v-mid center absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} >Click for more</span>
                    </div>
                    <img className="db w-100 br2 br--top dim" src={this.props.img} alt={this.props.alt} />
                </div>
                <div className="pa4 ph4-ns pb4-ns">
                    <div className="dt w-100 mt1">
                        <div className="dtc">
                            <h1 className="f4 black-70 f4-ns fw1 mv0">{this.props.title}</h1>
                            <p className="f5 black-70 lh-copy measure mt2 mid-gray fw1">{this.props.description}</p>
                            <p className="f5 fw1 black-70 v-btm"><span className="fw6">Tech Stack</span>: {this.props.stack}</p>
                        </div>
                    </div>
                </div>
                <div className={[classes.Reveal, show].join(' ')} style={{transition: 'all .5s'}}>
                    <div onClick={() => this.closeDetail()}>
                        <span className="f3 fw1">{this.props.title}<i className="fr pointer">&times;</i></span>
                        <div className="f5" dangerouslySetInnerHTML={{__html: this.props.detail}} />
                    </div>
                    <div className={classes.Buttons}>
                        <a className="f5 link dim ba ph3 pv2 mb2 dib black mh4 mb4" target="_blank" href={this.props.demo}>Demo</a>
                        <a className="f5 link dim ba ph3 pv2 mb2 dib black mh4 mb4" target="_blank" href={this.props.repo}>View on Github</a>
                    </div>
                </div>
            </article>
        )
    }
}

export default Project;