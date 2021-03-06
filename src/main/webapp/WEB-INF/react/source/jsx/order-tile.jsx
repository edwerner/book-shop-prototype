var React = require('react');
var CartAddWidget = require('./cart-add-widget.jsx');
var CartItem = require('../javascripts/cart-item');
import _ from 'underscore';
import sass from '../scss/order.scss';
import Products from'../javascripts/products';
import {renderProductDetails} from './product-details.jsx';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      closeButtonHover: '',
      expandedTile: ''
    }
  },
	render: function() {
    var order = this.props.order;
    var products = this.props.products;
    if (!order || !products) {
      return null;
    }
    var orderProducts = this.getOrderProducts(order, products);
    if (!orderProducts) {
      return null;
    }
    var _this = this;
		return(
      <div onClick={_this.state.expandedTile ? _this.hideOrderDetails : _this.showOrderDetails}
          className={_this.state.expandedTile ? 'expanded__tile expandable__order-tile' : 'expandable__order-tile'}> 
        {orderProducts.models.map(function(product, index) {

          var image = product.get('image');
          var title = product.get('title');
          var subtitle = product.get('subtitle');
          var author = product.get('author');
          var isbn = product.get('isbn');
          var publishDate = product.get('publishDate');
          var language = product.get('language');
          var price = product.get('price');
          var description = product.get('description');
          var genre = product.get('genre');
          var pageCount = product.get('pageCount');
          var publisher = product.get('publisher');

          return <div className='width__100 flex flex-row' key={index}>
            <div className={image ? 'flex-start' : 'hidden'}>
              <img className='order__tile-image' src={image}/>
            </div>
            <div className='flex flex-end flex-column'>
              <div className={title ? 'order__tile-title' : 'hidden'}>
                <label>Title &nbsp;</label> 
                {title}
              </div>
              <div className={subtitle ? 'order__tile-title' : 'hidden'}>
                <label>Subtitle &nbsp;</label> 
                {subtitle}
              </div>
              <div className={author ? 'order__tile-title' : 'hidden'}>
                <label>Author &nbsp;</label> 
                {author}
              </div>
              <div className={isbn ? 'order__tile-title' : 'hidden'}>
                <label>ISBN &nbsp;</label> 
                {isbn}
              </div>
              <div className={publishDate ? 'order__tile-title' : 'hidden'}>
                <label>Publish Date &nbsp;</label> 
                {publishDate}
              </div>
              <div className={language ? 'order__tile-title' : 'hidden'}>
                <label> Language &nbsp;</label> 
                {language}
              </div>
              <div className={price ? 'order__tile-title' : 'hidden'}>
                <label>Price &nbsp;</label> 
                {price}
              </div>
              <div className={description ? 'order__tile-title' : 'hidden'}>
                <label>Description &nbsp;</label> 
                {description}
              </div>
              <div className={genre ? 'order__tile-title' : 'hidden'}>
                <label>Genre &nbsp;</label> 
                {genre}
              </div>
              <div className={pageCount ? 'order__tile-title' : 'hidden'}>
                <label>Page Count&nbsp;</label> 
                {pageCount}
              </div>
              <div className={publisher ? 'order__tile-title' : 'hidden'}>
                <label>Publisher&nbsp;</label> 
                {publisher}
              </div>
            </div>
          </div>;
        })}
      </div>
		);
	},
  getOrderProducts: function(order, products) {
    var productList = order.get('productList');
    var _products = new Products();
    for (var i = 0; i < productList.length; i++) {
      var productMatch = _.find(products, function(product) {
        return product.get('id') == productList[i];
      });
      if (productMatch != undefined) {
        _products.add(productMatch);
      }
      if (i == productList.length - 1) {
        return _products;
      }
    }
  },
  showOrderDetails: function() {
    this.setState({expandedTile: 'expanded'});
  },
  hideOrderDetails: function() {
    this.setState({expandedTile: ''});
  },
  onProductImageMouseEnter: function() {
    this.setState({'closeButtonHover': 'mouseenter'});
  },
  onProductImageMouseLeave: function() {
    this.setState({'closeButtonHover': ''});
  },
  showProductDetails: function() {
      renderProductDetails(this.props.product);
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({cartItems: nextProps.cartItems});
    this.setState({products: nextProps.products});
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
  getInitialState: function() {
    return {
      fulltext: '',
      cartItems: this.props.cartItems,
      products: this.props.products
    }
  },
  createCartItem: function(id) {
    var cartItem = new CartItem();
    cartItem.set('productId', id);
    return cartItem;
  },
  truncateString: function(length, string) {
    var substring = "";
    if (string) {
      substring = (string.length > length) ? string.substr(0, length - 1) + ' ...' : string;
    }
    return  substring;
  },
  toggleDescription: function() {
    if (this.state.fulltext) {
      this.setState({'fulltext': ''});
    } else {
      this.setState({'fulltext': 'fulltext'});
    }
  },
  decodeHTMLEntities: function (string) {
    if(string && typeof string === 'string') {
      string = string.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      string = string.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    }
    return string;
  },
  formatPrice: function(price) {
    var formattedPrice = '';
    if (price.length) {
      formattedPrice = '$' + product.get('price');
    }
    return formattedPrice;
  }
});