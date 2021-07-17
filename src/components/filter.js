import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter"> 
                <div className="filterresult">
                    {this.props.count} Products
                </div>

                <div  className="filtersort">
                Order{" "} 
                <select  value={this.props.order}onChange={this.props.filterProducts}>
                <option value="">Latest</option>
                      <option value="lowest">lowest</option>
                      <option value="highest">highest</option>
         
                </select>
                </div>

                <div className="category">
                  Category{" "} 
                <select  value={this.props.category}onChange={this.props.orderProducts}>
                      <option value="">All</option>
                      <option value="Smartphone">Smartphone</option>
                      <option value="Tablette">Tablette</option>
                      <option value="Buds">Buds</option>
                      <option value="TV">Tv</option>
                      <option value="Watch">Watch</option>
                      </select>
                </div>
            </div>
        )
    }
}
