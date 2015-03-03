/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014, Groupon, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import React from "react";
import FluxComponent from 'flummox/component';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import IconLink from '../lib/IconLink.jsx';
import ConfirmationModal from '../lib/ConfirmationModal.jsx';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import BuildHistory from './BuildHistory.jsx';
import BuildMetrics from './BuildMetrics.jsx';
import Widgets from '../lib/Widgets.jsx'

var Header = React.createClass({
    render(){
        var settingsTitle = <span className="fa fa-cog btn-label">Settings</span>;
        return (
            <div className="row">
                <ButtonToolbar justified>
                    <IconLink href={this.props.githubUrl} className="octicon octicon-mark-github">{this.props.fullName}</IconLink>
                    <IconLink href="build?delay=0sec" className="fa fa-rocket"> Build Now</IconLink>
                    <DropdownButton title={settingsTitle}   bsSize="small" className="btn-labeled" pullRight>
                        <MenuItem href="configure">Configure</MenuItem>
                        <ConfirmationModal onConfirm={this.deleteJob}>
                            <MenuItem>Delete</MenuItem>
                        </ConfirmationModal>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
        )
    },
    deleteJob(){
        let actions = this.props.flux.getActions('app');
        actions.deleteProject();
    }
})

var JobWidgets = React.createClass({
    render(){
        return(
            <Widgets>
                <BuildHistory  name="Build History" tabs={this.props.buildHistoryTabs} builds={this.props.builds} flux={this.props.flux}/>
                <BuildMetrics  name="Metrics"/>
            </Widgets>
        );

    }
});

export default React.createClass({
    render(){
        return (
            <FluxComponent connectToStores={['job']} flux={this.props.flux}>
                <Header/>
                <JobWidgets/>
            </FluxComponent>
        )
    }
});