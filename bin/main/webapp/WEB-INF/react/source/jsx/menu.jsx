import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {routeToShopPage, renderOverlayModal} from './overlay.jsx';

var Menu = React.createClass({
	renderLoginTab: function() {
		Backbone.history.navigate('signin', {trigger:true});
	},
	renderIndexTab: function() {
		Backbone.history.navigate('', {trigger:true});
	},
	renderRegisterTab: function() {
		Backbone.history.navigate('signup', {trigger:true});
	},
	renderOrdersTab: function() {
		// routeToShopPage();
		Backbone.history.navigate('orders', {trigger:true});
	},
	renderLogoutTab: function() {
		window.localStorage.removeItem('shop-token');
      	renderOverlayModal('Logout Success', 'You have successfully logged out', true);
	},
	render: function() {
		return (
			<div className='index-container'>
		      <nav className="navbar navbar-default">
		        <div className="container-fluid">
		          <div id="navbar" className="navbar-collapse">
		            <ul className="nav navbar-nav">
		              <li className={this.props.activeIndex}><a href="javascript:void(0)" onClick={this.renderIndexTab}>Home</a></li>
		              <li className={this.props.activeLogin}><a href="javascript:void(0)" onClick={this.renderLoginTab}>Sign In</a></li>
		              <li className={this.props.activeCreate}><a href="javascript:void(0)" onClick={this.renderRegisterTab}>Sign Up</a></li>
		              <li className={this.props.activeLogout}><a href="javascript:void(0)" onClick={this.renderLogoutTab}>Sign Out</a></li>
		              <li className={this.props.activeOrders}><a href="javascript:void(0)" onClick={this.renderOrdersTab}>Orders</a></li>
		            </ul>
		          </div>
		        </div>
		        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
		        </button>
		      </nav>
			</div>
		);
	}
});

export function renderMenu(activeLogin, activeIndex, activeCreate, activeShop) {
	ReactDOM.render(<Menu activeLogin={activeLogin} activeIndex={activeIndex} activeCreate={activeCreate} activeShop={activeShop}/>,
		document.getElementById('navigation__menu'));
}